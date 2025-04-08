import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/posts.dto';
import mongoose from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') postId: string) {
    return this.postService.getPostById(postId);
  }

  @Get('user/:userId')
  async getPostsByUserId(@Param('userId') userId: string) {
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.postService.getPostsByUserId(userId);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const isValidId = mongoose.isValidObjectId(createPostDto.userId);
    if (!isValidId) {
      throw new BadRequestException('Invalid user ID format');
    }

    return this.postService.createPost(createPostDto);
  }
}
