import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { PathParameters } from 'src/interfaces/path-params';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/user-update-password.dto';
import { validateId } from 'src/utils/validateId';
import {
  validateCreateUserDto,
  validateUpdateUserPasswordDto,
} from 'src/utils/dto-validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param() params: PathParameters): Promise<User> {
    validateId(params.id);
    const user = await this.userService.getById(params.id);
    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    validateCreateUserDto(body);
    return await this.userService.create(body);
  }

  @Put(':id')
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Param() params: PathParameters,
  ): Promise<User> {
    validateId(params.id);
    validateUpdateUserPasswordDto(body);
    return await this.userService.updatePassword(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: PathParameters): Promise<void> {
    validateId(params.id);
    await this.userService.remove(params.id);
  }
}
