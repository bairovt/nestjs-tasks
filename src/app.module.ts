import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    JwtModule.register({
      secret: 'someSuperSecretKeyToSignJwt-slksmlvkcm',
      signOptions: {
        expiresIn: 3600 // 1 hour
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule],
})
export class AppModule { }
