import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id')
    userId: string,
  ) {
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) {
      throw new BadRequestException('Invalid user ID format');
    }
    const findUser = await this.userService.getUserById(userId);
    return findUser;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Chuyển đổi từ plain object sang class instance
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id')
    userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) {
      throw new BadRequestException('Invalid user ID format');
    }
    const formatData = UpdateUserDto.plainToClass(updateUserDto);
    console.log('data: ', formatData);
    const findUser = await this.userService.updateUser(userId, formatData);
    return findUser;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) {
      throw new BadRequestException('Invalid user ID format');
    }
    const deleteUserRes = await this.userService.deleteUser(userId);
    if (!deleteUserRes) {
      throw new HttpException('User not found', 404);
    }
    return `Delete user ${userId} successfully`;
  }
}
