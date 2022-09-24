import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users as User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as transform from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  findOne(id: string): Promise<User | null> {
    const user = this.prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
    return user.then((user) => {
      if (user) {
        transform.instanceToPlain(user);
      }
      delete user.password;

      return user;
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
}
