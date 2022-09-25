import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users as User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: {
        id: id.toString(),
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: {
        id: id,
      },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
  }
}
