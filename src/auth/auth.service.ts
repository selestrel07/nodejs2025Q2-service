import { ForbiddenException, Injectable } from '@nestjs/common';
import { TokenResponse } from './dto/token-response.dto';
import { User } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces/token-payload';

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
      accessToken,
      refreshToken,
    }
  }

  async verifyToken(token: string, isRefresh: boolean = false): Promise<Payload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: isRefresh ? process.env.JWT_SECRET_REFRESH_KEY : process.env.JWT_SECRET_KEY
      });
    } catch (e) {
      if (e instanceof Error && e.name === 'TokenExpiredError') {
        throw new ForbiddenException(`${isRefresh ? 'Refresh' : 'Access'} token is expired`);
      }
      throw new ForbiddenException(`${isRefresh ? 'Refresh' : 'Access'} token is invalid`);
    }
  }
}
