import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './atuh.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LoaclStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'thisisasecret',
      signOptions: {
        expiresIn: '60m',
      },
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [LoaclStrategy, AuthService, JwtStrategy, UsersService],
})
export class AuthModule {}
