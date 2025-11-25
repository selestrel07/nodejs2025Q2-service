import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/user-update-password.dto';
import { validateId } from 'src/utils/validateId';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param() params: PathParameters): User {
    validateId(params.id);
    const user = this.userService.getById(params.id);
    return user;
  }

  @Post()
  create(@Body() body: CreateUserDto): User {
    if (!('login' in body && 'password' in body) || body.login.length === 0 || body.password.length === 0) {
      throw new HttpException(`Request body does not contain all required fields (login, password) or some field is empty`, HttpStatus.BAD_REQUEST);
    }
    return this.userService.create(body);
  }

  @Put(':id')
  updatePassword(@Body() body: UpdatePasswordDto, @Param() params: PathParameters): User {
    validateId(params.id);
    return this.userService.updatePassword(params.id, body);
  }
}
