import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }
}
