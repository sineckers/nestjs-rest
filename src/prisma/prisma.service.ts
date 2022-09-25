import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(async (params, next) => {
      let result: any;
      if (params.model == 'Users') {
        if (params.action == 'create') {
          params.args.data.password = await hash(params.args.data.password, 10);
          result = await next(params);
        } else if (
          params.action == 'update' &&
          params.args.data.password != null
        ) {
          params.args.data.password = await hash(params.args.data.password, 10);
          result = await next(params);
        } else if (
          params.action == 'findUnique' ||
          params.action == 'findMany' ||
          params.action == 'findFirst'
        ) {
          result = await next(params);
          if (result.length > 0) {
            result.forEach((element: any) => {
              delete element.password;
            });
          } else {
            delete result.password;
          }
        } else {
          result = await next(params);
          delete result.password;
        }
      }
      return result;
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
