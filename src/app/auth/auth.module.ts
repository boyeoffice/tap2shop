import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterUserService } from './services/register-user.service';
import { LoginUserService } from './services/login-user.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { ResetPasswordService } from './services/reset-password.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    InfrastructureModule,
    TypeOrmModule.forFeature([User, PasswordResetToken]),
    JwtModule.register({
      secret: 'secretKey', //should be in env file
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    RegisterUserService,
    LoginUserService,
    JwtStrategy,
    ForgotPasswordService,
    ResetPasswordService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
