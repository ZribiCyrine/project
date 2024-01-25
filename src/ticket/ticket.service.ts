import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketStatus } from '../enum/ticketStatus.enum';
import { EventService } from '../event/event.service';
import { Role } from '../enum/role.enum';
import { Participant } from '../entities/participant.entity';

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

  async findTicketsByPurchaser(purchaserId: number): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: { purchaser: { id: purchaserId } },
      relations: ['Event'],
    });
  }

  async buyTicket(purchaser: Participant, eventId: number): Promise<Ticket> {
    if (purchaser.role !== Role.PARTICIPANT && purchaser.role !== Role.CREATOR) {
      throw new NotFoundException(`User with ID ${purchaser.id} not allowed to buy tickets`);
    }
    const event = await this.eventService.findOne(eventId);
    if (event.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    event.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.PAID,
      purchaser: purchaser,
      event: event,
    };
    const ticket = this.create(createTicketDto);
    await this.eventService.update(eventId, { capacity: event.capacity });
    return ticket;
  }

  async reserveTicket(purchaser: Participant, eventId: number): Promise<Ticket> {
    if (purchaser.role !== Role.PARTICIPANT && purchaser.role !== Role.CREATOR) {
      throw new NotFoundException(`User with ID ${purchaser.id} not allowed to buy tickets`);
    }
    const event = await this.eventService.findOne(eventId);
    if (event.capacity <= 0) {
      throw new NotFoundException('Event is sold out.');
    }
    event.capacity--;
    const createTicketDto: CreateTicketDto = {
      status: TicketStatus.RESERVED,
      purchaser: purchaser,
      event: event,
    };
    const ticket = this.create(createTicketDto);
    await this.eventService.update(eventId, { capacity: event.capacity });
    return ticket;
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id: id } })
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