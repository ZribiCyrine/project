import { Module } from '@nestjs/common';
import { ConfirmedEventService } from './confirmed-event.service';
import { ConfirmedEventController } from './confirmed-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmedEvent } from '../entities/confirmedEvent.entity';
import { EventService } from '../event/event.service';
import { Event } from '../entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmedEvent])],
  controllers: [ConfirmedEventController],
  providers: [ConfirmedEventService],
})
export class ConfirmedEventModule {}
