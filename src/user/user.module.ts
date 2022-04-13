import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './controllers/user.controller';
import { User } from './entities/user.entity';

import { UserService } from './services/user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([ User ])
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
