import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/db/db.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/dto/user.dto';
import { validateCreateUserDto } from 'src/utils/dto-validation';

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
}
