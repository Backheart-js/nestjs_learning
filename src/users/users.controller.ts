import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return `This action returns user ${userId}`;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.createUser(createUserDto);
    return 'User created successfully';
  }

  @Put(':id')
  updateUser(@Param('id') userId: string) {
    return `This action updates user ${userId}`;
  }

  @Delete(':id')
  removeUser(@Param('id') userId: string) {
    return `This action removes user ${userId}`;
  }
}
