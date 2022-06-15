import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/entitys/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    // jwtFromRequest：提供从请求中提取 JWT 的方法。我们将使用在 API 请求的授权头中提供 token 的标准方法
    // ignoreExpiration：选择默认设置 false ，它将确保 JWT 没有过期的责任委托给 Passport 模块。这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 未经授权的响应
    // secretOrkey：使用权宜的选项来提供对称的密钥来签署令牌
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'thisisasecret',
    });
  }
  // validate：对于 JWT 策略，Passport 首先验证 JWT 的签名(secretOrKey)并解码 JSON
  // 然后调用 validate 方法，该方法将解码后的 JSON 作为其单个参数传递
  // 其实这个 playload 就是我们在 getUserToken方法(auth.service.ts) 中写入到token的数据
  async validate(playload: any) {
    console.log(playload);
    // 这个返回值和 local.strategy.ts 一样，会被默认赋值到 request.user 上
    return await this.usersRepository.findOne({
      where: { username: playload.username },
    });
  }
}
