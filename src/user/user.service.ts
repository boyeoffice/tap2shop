import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash, compare } from 'bcrypt';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    console.log('Fetched user for password change:', user);
    if (!user) throw new NotFoundException('User not found');

    const valid = await compare(dto.currentPassword, user.password);
    console.log('Password valid:', valid);
    if (!valid) throw new UnauthorizedException('Invalid password');

    user.password = await hash(dto.newPassword, 10);
    await this.userRepository.save(user);
  }
}
