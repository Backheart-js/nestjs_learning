import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    userId: string,
  ) {
    return `This action returns user ${typeof userId}`;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newDate = new Date();
    createUserDto.id = uuidv4();
    createUserDto.createdAt = newDate;
    createUserDto.updatedAt = newDate;
    // Chuyển đổi từ plain object sang class instance
    this.userService.createUser(CreateUserDto.plainToClass(createUserDto));
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
