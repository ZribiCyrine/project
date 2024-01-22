import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ParticipantService } from '../participant/participant.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([Participant]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, ParticipantService, JwtService, ConfigService, JwtStrategy],
})
export class AuthentificationModule { }
