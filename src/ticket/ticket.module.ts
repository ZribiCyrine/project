import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from '../entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmedEvent } from '../entities/confirmedEvent.entity';
import { ConfirmedEventService } from '../confirmed-event/confirmed-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, ConfirmedEvent])],
  controllers: [TicketController],
  providers: [TicketService, ConfirmedEventService],
})
export class TicketModule {}
