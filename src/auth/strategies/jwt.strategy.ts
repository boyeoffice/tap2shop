import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../user/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( @InjectRepository(User)
    private readonly userRepo: Repository<User>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  async validate(payload: any) {

    // const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    // if (!user) throw new UnauthorizedException();
    // return user;

    console.log('JWT payload:', payload);
    // Optionally, you can verify the user via authService here:
    // const user = await this.authService.validateUser(payload);
    // if (!user) throw new UnauthorizedException();
    // return user;

    // For now return the payload as the validated user object
    return payload;
  }
}
