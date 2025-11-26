import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/user-update-password.dto';
import { validateId } from 'src/utils/validateId';
import { validateCreateUserDto, validateUpdateUserPasswordDto } from 'src/utils/dto-validation';

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
    validateCreateUserDto(body);
    return this.userService.create(body);
  }

  @Put(':id')
  updatePassword(@Body() body: UpdatePasswordDto, @Param() params: PathParameters): User {
    validateId(params.id);
    validateUpdateUserPasswordDto(body);
    return this.userService.updatePassword(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: PathParameters): void {
    validateId(params.id);
    this.userService.remove(params.id);
  }
}
