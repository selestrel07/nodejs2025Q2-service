import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/user-update-password.dto';
import { throwNotFoundException } from 'src/utils/throw-exception';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return (await this.prismaService.user.findMany()).map(
      (user) => new User(user),
    );
  }

  async getById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throwNotFoundException(id, 'User');
    }
    return new User(user);
  }

  async create(userCreateDto: CreateUserDto): Promise<User> {
    if (
      (await this.findAll()).find((user) => user.login === userCreateDto.login)
    ) {
      throw new HttpException(
        `User ${userCreateDto.login} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: User = await this.prismaService.user.create({
      data: userCreateDto,
      select: {
        id: true,
        login: true,
        password: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return new User(user);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    let user = await this.getById(id);
    if (
      user.password !== updatePasswordDto.oldPassword ||
      updatePasswordDto.newPassword.length === 0
    ) {
      throw new HttpException(`Wrong data was provided`, HttpStatus.FORBIDDEN);
    }
    user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
        updatedAt: BigInt(Date.now()),
      },
      select: {
        id: true,
        login: true,
        password: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return new User(user);
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
