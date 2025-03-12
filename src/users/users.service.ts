import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { v4 as uuidv4 } from 'uuid';

class User extends CreateUserDto {
  id: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(data: CreateUserDto): void {
    const user = {
      id: uuidv4(),
      ...data,
    };
    this.users.push(user);
  }
}
