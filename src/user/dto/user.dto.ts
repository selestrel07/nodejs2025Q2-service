import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: bigint;
  updatedAt: bigint;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
