import { Injectable } from '@nestjs/common';
import { TokenResponse } from './dto/token-response.dto';
import { User } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(user: User): Promise<TokenResponse> {
    const payload = {
      sub: user.id,
      login: user.login,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      user,
      tokens: {
        access: {
          token: accessToken,
          expires: new Date(this.jwtService.decode(accessToken).exp * 1000).toLocaleString(),
        },
        refresh: {
          token: refreshToken,
          expires: new Date(this.jwtService.decode(refreshToken).exp * 1000).toLocaleString()
        },
      }
    }
  }
}
