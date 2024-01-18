import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateConfirmedEventDto } from './dto/update-confirmed-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmedEvent } from '../entities/confirmedEvent.entity';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class ConfirmedEventService {
  constructor(
    @InjectRepository(ConfirmedEvent)
    private readonly confirmedEventRepository: Repository<ConfirmedEvent>,
  ) {}

  async create(event: Event): Promise<ConfirmedEvent> {
    const confirmedEvent = this.confirmedEventRepository.create(event);
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

  async remove(id: number): Promise<void> {
    await this.confirmedEventRepository.delete(id);
  }
}