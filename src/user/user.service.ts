import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }
}
