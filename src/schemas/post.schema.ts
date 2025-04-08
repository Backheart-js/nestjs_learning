import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
