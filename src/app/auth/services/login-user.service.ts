import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LoginUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.checkUserExist(dto.email);

    if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };

    return this.jwtService.sign(payload);
  }

  async checkUserExist(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    return user;
  }
}
