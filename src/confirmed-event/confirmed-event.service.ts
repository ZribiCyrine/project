import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateConfirmedEventDto } from './dto/update-confirmed-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmedEvent } from '../entities/confirmedEvent.entity';
import { Repository } from 'typeorm';
import { CreateConfirmedEventDto } from './dto/create-confirmed-event.dto';
import { EventService } from '../event/event.service';

@Injectable()
export class ConfirmedEventService{
  private eventService: EventService | undefined; 

  constructor(
    @InjectRepository(ConfirmedEvent)
    private readonly confirmedEventRepository: Repository<ConfirmedEvent>,
  ) {}

  setEventService(eventService: EventService): void {
    this.eventService = eventService;
  }

  async create(createConfirmedEventDto: CreateConfirmedEventDto): Promise<ConfirmedEvent> {
    const confirmedEvent = this.confirmedEventRepository.create(createConfirmedEventDto);
    return await this.confirmedEventRepository.save(confirmedEvent);
  }

  async findAll(): Promise<ConfirmedEvent[]> {
    return await this.confirmedEventRepository.find();
  }

  async findOne(id: number): Promise<ConfirmedEvent> {
    const confirmedEvent = await this.confirmedEventRepository.findOne({ where: { id: id } });
    if (!confirmedEvent) {
      throw new NotFoundException(`ConfirmedEvent with ID ${id} not found`);
    }
    return confirmedEvent;
  }

  async update(id: number, updateConfirmedEventDto: UpdateConfirmedEventDto): Promise<ConfirmedEvent> {
    this.confirmedEventRepository.update(id, updateConfirmedEventDto);
    return await this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.confirmedEventRepository.softDelete(id);
  }

  async remove(id: number): Promise<void> {
    await this.confirmedEventRepository.delete(id);
  }
}