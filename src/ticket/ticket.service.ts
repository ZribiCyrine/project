import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { Participant } from '../entities/participant.entity';
import { ConfirmedEventService } from '../confirmed-event/confirmed-event.service';
import { TicketStatus } from '../enum/ticketStatus.enum';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly confirmedEventService: ConfirmedEventService
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }

  async findParticipantTickets(participantId: number): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: { participant: { id: participantId } },
      relations: ['confirmedEvent'],
    });
  }

  async buyTicket(participant: Participant, eventId: number): Promise<Ticket> {
    const confirmedEvent = await this.confirmedEventService.findOne(eventId);
    if (confirmedEvent.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    confirmedEvent.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.PAID,
      participant: participant,
      confirmedEvent: confirmedEvent,
    };
    const ticket= this.create(createTicketDto);
    await this.confirmedEventService.update(eventId, { capacity: confirmedEvent.capacity });
    return ticket;
  }

  async reserveTicket(participant: Participant, eventId: number): Promise<Ticket> {
    const confirmedEvent = await this.confirmedEventService.findOne(eventId);
    if (confirmedEvent.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    confirmedEvent.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.RESERVED,
      participant: participant,
      confirmedEvent: confirmedEvent,
    };
    const ticket= this.create(createTicketDto);
    await this.confirmedEventService.update(eventId, { capacity: confirmedEvent.capacity });
    return ticket;
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({where: {id: id}})
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    this.ticketRepository.update(id, updateTicketDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}