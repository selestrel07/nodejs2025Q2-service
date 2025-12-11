import { Body, Controller, ForbiddenException, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/dto/user.dto';
import { validateCreateUserDto, validateRefreshTokensDto } from 'src/utils/dto-validation';
import { TokenResponse } from './dto/token-response.dto';
import { StatusCodes } from 'http-status-codes';
import { RefreshTokensDto } from './dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: CreateUserDto): Promise<User> {
    validateCreateUserDto(body);
    return this.userService.create(body);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() body: CreateUserDto): Promise<TokenResponse> {
    validateCreateUserDto(body);
    const user = await this.userService.getByLogin(body.login);
    if (!user.password || !(await this.userService.verify(user.password, body.password))) {
      throw new ForbiddenException('Wrong credentials were provided');
    }
    const response = await this.authService.generateTokens(user);
    await this.userService.updateRefreshToken(user, response.tokens.refresh.token);
    return response;
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  @HttpCode(StatusCodes.OK)
  async refreshTokens(@Headers('authorization') authHeader: string, @Body() body: RefreshTokensDto): Promise<TokenResponse> {
    validateRefreshTokensDto(body);
    const refreshTokenPayload = await this.authService.verifyToken(body.refreshToken, true);
    const accessTokenPayload = await this.authService.verifyToken(authHeader.split(' ')[1]);
    if (refreshTokenPayload.login !== accessTokenPayload.login) {
      throw new ForbiddenException('Refresh token is invalid');
    }
    const user = await this.userService.getByLogin(refreshTokenPayload.login);
    if (!user.password || !(await this.userService.verify(user.refreshToken, body.refreshToken))) {
      throw new ForbiddenException('Refresh token is invalid');
    }
    const response = await this.authService.generateTokens(user);
    await this.userService.updateRefreshToken(user, response.tokens.refresh.token);
    return response;
  }
}
