import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserConfigDocument = HydratedDocument<UserConfig>;

@Schema()
export class UserConfig {
  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  receiveEmail: boolean = false;
}

export const UserConfigSchema = SchemaFactory.createForClass(UserConfig);
