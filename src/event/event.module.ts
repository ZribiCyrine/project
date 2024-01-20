import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { ConfirmedEventModule } from '../confirmed-event/confirmed-event.module';
import { ConfirmedEventService } from '../confirmed-event/confirmed-event.service';
import { ConfirmedEvent } from '../entities/confirmedEvent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, ConfirmedEvent]), ConfirmedEventModule],
  controllers: [EventController],
  providers: [EventService, ConfirmedEventService],
})
export class EventModule {}
