import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { validate } from 'uuid';
import { PathParameters } from 'src/interfaces/path-params';

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
}
