import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { validate } from 'uuid';
import { PathParameters } from 'src/interfaces/path-params';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param() params: PathParameters): User {
    if (!validate(params.id)) {
      throw new HttpException(`'${params.id}' is not a valid UUID`, HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.getById(params.id);
    if (!user) {
      throw new HttpException(`User with id '${params.id}' was not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  create(@Body() body: CreateUserDto): User {
    if (!('login' in body && 'password' in body) || body.login.length === 0 || body.password.length === 0) {
      throw new HttpException(`Request body does not contain all required fields (login, password) or some field is empty`, HttpStatus.BAD_REQUEST);
    }
    try {
      const user = this.userService.create(body);
      return user;
    } catch {
      throw new HttpException(`User ${body.login} already exists`, HttpStatus.BAD_REQUEST);
    }
  }
}
