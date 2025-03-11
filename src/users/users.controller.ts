import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'This action returns all users';
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return `This action returns user ${userId}`;
  }
}
