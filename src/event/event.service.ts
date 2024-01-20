import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async getRecentEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.eventDate >= :currentDate', { currentDate })
      .getMany();
  }

  async findEventsByCreator(creatorId: number): Promise<Event[]> {
    return await this.eventRepository.find({ where: { creator: { id: creatorId } } });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id: id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    this.eventRepository.update(id, updateEventDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }

  async acceptEvent(id: number): Promise<void> {
    const event = await this.findOne(id);
    event.isConfirmed = true;
    await this.eventRepository.save(event)
  }
}