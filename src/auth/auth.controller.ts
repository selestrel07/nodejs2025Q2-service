import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/db/db.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/dto/user.dto';
import { validateCreateUserDto } from 'src/utils/dto-validation';
import { TokenResponse } from './dto/token-response.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
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
}
