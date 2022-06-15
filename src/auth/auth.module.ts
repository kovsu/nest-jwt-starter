import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { AuthController } from './auth.controller';
import { LoaclStrategy } from './local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [LoaclStrategy],
})
export class AuthModule {}
