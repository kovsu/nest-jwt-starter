import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/entitys/users.entity';
import { AuthService } from './atuh.service';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  // 运行下面这个方法的时候 说明已经通过了验证
  // 通过验证说明 经历了 (local.strategy.ts) validate 函数
  // 所以 request 中就有了 user 参数
  async login(@CurrentUser() user: Users) {
    // console.log(requset);
    return {
      userId: user.id,
      token: this.authService.getUserToken(user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@CurrentUser() user: Users) {
    return user;
  }
}
