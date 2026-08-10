import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { User } from '../../users/entities/user.entity';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { EmailService } from '../../../infrastructure/services/email.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly tokenRepo: Repository<PasswordResetToken>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async execute(dto: ForgotPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = this._generateOTP();
    const tokenHash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const token = await this.tokenRepo.create({
      user,
      tokenHash,
      expiresAt,
    });

    await this.tokenRepo.save(token);

    await this.emailService.sendMail(
      user.email,
      'Reset your password',
      `<p>Hi ${user.firstName || ''},</p><p>Your password reset code is:</p><p style="font-size:18px; font-weight:600;">${otp}</p><p>If you didn't request this, please ignore this email.</p>`,
    );
  }

  private _generateOTP(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }
}
