import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { EventStatus } from '../enum/eventStatus.enum';
import { CreatorService } from '../creator/creator.service';
import { Admin } from '../entities/admin.entity';
import { Creator } from '../entities/creator.entity';
import { Participant } from '../entities/participant.entity';
import { Role } from '../enum/role.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>,
  ) { }

  async create(createEventDto: CreateEventDto, user: Participant | Creator): Promise<Event> {
    let creator: Creator;
      creator = await this.creatorRepository.findOne({ where: { id: user.id } });
      if (!creator) {
        creator = this.creatorRepository.create({
          ...user, 
          role: Role.CREATOR 
        });
        await this.creatorRepository.save(creator);
      }
    const event = this.eventRepository.create(createEventDto);
    event.creator = creator;
    return await this.eventRepository.save(event);
  }

  async getRecentNonConfirmedEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.eventDate >= :currentDate', { currentDate })
      .andWhere('event.isConfirmed = :isConfirmed', { isConfirmed: false })
      .getMany();
  }

  async getConfirmedEvents(): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.isConfirmed = :isConfirmed', { isConfirmed: true })
      .getMany();
  }

  async findEventsByCreator(creatorId: number): Promise<Event[]> {
    const creatorExists = await this.creatorRepository.findOne({where: {id: creatorId}});
    if (!creatorExists) {
      return [];
    }
    return await this.eventRepository.find({
      where: { creator: { id: creatorId } },
    });
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

  async rejectEvent(id: number, admin: Admin): Promise<void> {
    const event = await this.findOne(id);
    event.status = EventStatus.REJECTED;
    event.admin = admin;
    await this.eventRepository.save(event);
  }

  async acceptEvent(id: number, admin: Admin): Promise<void> {
    const event = await this.findOne(id);
    event.status = EventStatus.CONFIRMED;
    event.admin = admin;
    await this.eventRepository.save(event);
  }
}
