import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from './dto/auth.dto';
import { LoginUserService } from './services/login-user.service';
import { RegisterUserService } from './services/register-user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordService } from './services/reset-password.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private loginUserService: LoginUserService,
    private registerUserService: RegisterUserService,
    private forgotPasswordService: ForgotPasswordService,
    private resetPasswordService: ResetPasswordService,
  ) {}

  @Post('signup')
  async register(@Body() body: RegisterDto) {
    const user = await this.registerUserService.create(body);
    return { success: true, message: 'User registered', data: user };
  }

  @Post('signin')
  async signin(@Body() body: RegisterDto) {
    const data = await this.loginUserService.login(body);
    return { success: true, message: 'Login successful', data };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.forgotPasswordService.execute(dto);
    return { success: true, message: 'Password reset email sent' };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.resetPasswordService.execute(dto);

    return { success: true, message: 'Password reset successful' };
  }
}
