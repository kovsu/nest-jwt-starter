import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(AuthGuard('local'))
  // 运行下面这个方法的时候 说明已经通过了验证
  // 通过验证说明 经历了 (local.strategy.ts) validate 函数
  // 所以 request 中就有了 user 参数
  async login(@Req() requset) {
    console.log(requset);
    return {
      userId: requset.user.id,
      token: 'this will go here',
    };
  }
}
