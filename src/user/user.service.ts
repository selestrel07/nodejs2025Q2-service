import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  getById(id: string): User | undefined {
    const user = this.users.find((u) => u.id === id);
    return user;
  }
}
