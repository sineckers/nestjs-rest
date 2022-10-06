import { Injectable } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        userId: createPostDto.userId,
      },
    });
  }

  findAll(): Promise<Posts[]> {
    return this.prisma.posts.findMany();
  }

  findOne(id: string): Promise<Posts> {
    return this.prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.posts.update({
      where: {
        id: id,
      },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
      },
    });
  }

  remove(id: string) {
    return this.prisma.posts.delete({
      where: {
        id: id,
      },
    });
  }

  getComments(id: string) {
    return this.prisma.posts.findUnique({
      where: {
        id: id,
      },
      select: {
        comments: true,
      },
    });
  }

  makeComment(createCommentDto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: {
        content: createCommentDto.content,
        postId: createCommentDto.postId,
        userId: createCommentDto.userId,
      },
    });
  }

  deleteComment(id: string) {
    return this.prisma.comments.delete({
      where: {
        id: id,
      },
    });
  }
}
