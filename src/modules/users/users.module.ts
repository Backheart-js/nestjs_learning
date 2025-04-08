import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MockUsersService } from './mock-users.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserConfig, UserConfigSchema } from 'src/schemas/user-config.schema';

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: UserConfig.name,
        schema: UserConfigSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: process.env.USE_MOCK ? MockUsersService : UsersService,
    },
    {
      provide: 'GOOGLE_CONFIG',
      useValue: googleConfig,
    },
  ],
})
export class UsersModule {}
