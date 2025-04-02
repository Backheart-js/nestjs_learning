import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException(`User with ID ${userId} not found`, 404);
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async updateUser(
    userId: string,
    data: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!user) {
      throw new HttpException(`User with ID ${userId} not found`, 404);
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new HttpException(`User with ID ${userId} not found`, 404);
    }
    return user;
  }
}
