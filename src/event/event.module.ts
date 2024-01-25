import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Participant } from '../entities/participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Participant])
  ],
  controllers: [EventController],
  providers: [EventService],

})
export class EventModule { }
