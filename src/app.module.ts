import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
