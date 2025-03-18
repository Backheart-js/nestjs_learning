import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  getAllUsers(): CreateUserDto[] {
    return this.users;
  }

  createUser(data: CreateUserDto): void {
    this.users.push(data);
  }
}
