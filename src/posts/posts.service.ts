import { Injectable } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
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

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
