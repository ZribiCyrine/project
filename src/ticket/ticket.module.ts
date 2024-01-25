import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from '../entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { EventService } from '../event/event.service';
import { Participant } from '../entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event, Participant])],
  controllers: [TicketController],
  providers: [TicketService, EventService],
})
export class TicketModule { }
