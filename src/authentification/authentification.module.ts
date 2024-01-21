import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { JwtService } from '@nestjs/jwt';
import { ParticipantService } from '../participant/participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, JwtService, ParticipantService],
})
export class AuthentificationModule {}
