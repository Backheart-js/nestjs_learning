import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class UserInfo {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  address: string;
}

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  email: string;

  // @Prop({ required: true })
  // infomation: UserInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);
