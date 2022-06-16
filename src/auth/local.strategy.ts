import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { Users } from 'src/entitys/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoaclStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepostory: Repository<Users>,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.usersRepostory.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(user.password, password))) {
      throw new UnauthorizedException();
    }

    // 这个返回值会被 默认赋值到 request.user 上
    return user;
  }
}
