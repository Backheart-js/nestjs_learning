import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MockUsersService } from './mock-users.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: process.env.USE_MOCK ? MockUsersService : UsersService,
    },
  ],
})
export class UsersModule {}
