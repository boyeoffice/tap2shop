import { Injectable } from '@nestjs/common';
import { AuthPayloadDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { RegisterDto } from './dto/auth.dto';
import { ConflictException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
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

   async login(dto: LoginDto) {

    const user = await this.checkUserExist(dto.email);


     if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
   
    const payload = { sub: user.id, email: user.email };

    return this.jwtService.sign(payload);

  }

}
