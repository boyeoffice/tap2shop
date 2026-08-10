import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';


export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}$/, {
    message: 'OTP must be exactly 5 digits',
  })
  otp!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}
