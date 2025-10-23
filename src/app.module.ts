import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    database:"tap2shop",
    host:"localhost",
    port:5432,
    username: 'postgres',
    password: 'password',
    synchronize: true, 
    entities: [User],

  }),
  UserModule, 
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
