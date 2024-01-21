import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ParticipantService } from '../participant/participant.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]),],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, ParticipantService, JwtService, ConfigService],
})
export class AuthentificationModule { }
