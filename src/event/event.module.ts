import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { ConfirmedEvent } from '../entities/confirmedEvent.entity';
import { ConfirmedEventService } from '../confirmed-event/confirmed-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, ConfirmedEvent]), ConfirmedEvent],
  controllers: [EventController],
  providers: [EventService, ConfirmedEventService],
})
export class EventModule {}
