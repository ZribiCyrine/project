import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { Participant } from '../entities/participant.entity';
import { TicketStatus } from '../enum/ticketStatus.enum';
import { EventService } from '../event/event.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly eventService: EventService,
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
      relations: ['Event'],
    });
  }

  async buyTicket(participant: Participant, eventId: number): Promise<Ticket> {
    const event = await this.eventService.findOne(eventId);
    if (event.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    event.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.PAID,
      participant: participant,
      event: event,
    };
    const ticket= this.create(createTicketDto);
    await this.eventService.update(eventId, { capacity: event.capacity });
    return ticket;
  }

  async reserveTicket(participant: Participant, eventId: number): Promise<Ticket> {
    const event = await this.eventService.findOne(eventId);
    if (event.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    event.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.RESERVED,
      participant: participant,
      event: event,
    };
    const ticket= this.create(createTicketDto);
    await this.eventService.update(eventId, { capacity: event.capacity });
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