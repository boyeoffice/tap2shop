import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthPayloadDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('signup')
  async register(@Body() body:RegisterDto){

    const user = await this.authService.create(body);

    return { success: true, message: 'User registered', data: user };
    
  }


  @Post('signin')
  async signin(@Body() body:RegisterDto){

    const data = await this.authService.login(body);
    return { success: true, message: 'Login successful', data };

    
  }
  
}
