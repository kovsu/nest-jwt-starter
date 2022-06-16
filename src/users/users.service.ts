import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/atuh.service';
import { Users } from 'src/entitys/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './input/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.retyped) {
      throw new BadRequestException(['Password are not identical']);
    }

    const userExist = this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userExist) {
      throw new BadRequestException(['User is already exist']);
    }

    const user = new Users();
    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
    return await this.usersRepository.save(user);
  }
}
