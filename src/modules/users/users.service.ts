import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserConfig, UserConfigDocument } from 'src/schemas/user-config.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserConfig.name)
    private userConfigModel: Model<UserConfigDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('userConfig');
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).populate('userConfig');
    if (!user) {
      throw new HttpException(`User with ID ${userId} not found`, 404);
    }
    return user;
  }

  async createUser({ config, ...createUserDto }: CreateUserDto): Promise<User> {
    let userConfig: UserConfigDocument | null = null;

    if (config) {
      const newConfig = new this.userConfigModel(config);
      userConfig = await newConfig.save();
    }

    const newUser = new this.userModel({
      ...createUserDto,
      userConfig: userConfig?._id,
    });

    const savedUser = await newUser.save();
    return savedUser;
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
