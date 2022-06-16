import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entitys/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getUserToken(user: Users): string {
    // 我们得要知道 JWT 生成的 token 由三部分组成
    // 其中中间存储数据的部分叫做 playload
    // 下面这个方法第一个参数其实就是 playload
    // 所以这里就是写入一个 username 到 token 中
    return this.jwtService.sign({
      username: user.username,
    });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
