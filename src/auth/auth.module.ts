import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { Admin } from '../entities/admin.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Admin]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ConfigService, JwtStrategy],
})
export class AuthModule { }
