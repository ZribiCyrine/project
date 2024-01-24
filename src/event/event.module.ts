import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Creator } from '../entities/creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Creator])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
