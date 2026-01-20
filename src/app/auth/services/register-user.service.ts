import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dto/auth.dto';
import { ConflictException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RegisterUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(dto: RegisterDto) {
    const userExist = await this.checkUserExist(dto.email);

    if (userExist) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, 10),
    });

    return this.userRepository.save(user);
  }

  async checkUserExist(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    return user;
  }
}
