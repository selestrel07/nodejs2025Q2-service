import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdatePasswordDto } from './dto/user-update-password.dto';
import { throwNotFoundException } from 'src/utils/throw-exception';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  getById(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throwNotFoundException(id, 'User');
    }
    return user;
  }

  create(userCreateDto: CreateUserDto): User {
    if (this.users.find((u) => u.login === userCreateDto.login)) {
      throw new HttpException(
        `User ${userCreateDto.login} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let id = '';
    const timestamp = Date.now();
    while (
      id.length === 0 ||
      this.users.find((u) => u.id === id) !== undefined
    ) {
      id = randomUUID();
    }
    const user: User = new User({
      id,
      login: userCreateDto.login,
      password: userCreateDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    this.users.push(user);
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.getById(id);
    if (
      user.password !== updatePasswordDto.oldPassword ||
      updatePasswordDto.newPassword.length === 0
    ) {
      throw new HttpException(`Wrong data was provided`, HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string): void {
    const user = this.getById(id);
    this.users.splice(this.users.indexOf(user), 1);
  }
}
