import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreatePostDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().populate('userId');
  }

  async getPostById(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId).populate('userId');
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    return post;
  }

  async getPostsByUserId(userId: string): Promise<Post[]> {
    return this.postModel.find({ userId }).populate('userId');
  }

  async createPost({ userId, ...createPost }: CreatePostDto): Promise<Post> {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      throw new HttpException(`User with ID ${userId} not found`, 404);
    }

    const newPost = new this.postModel({
      ...createPost,
      userId: findUser._id,
    });
    const savedPost = await newPost.save();

    await findUser.updateOne({
      $push: { posts: savedPost._id },
    });

    return savedPost;
  }
}
