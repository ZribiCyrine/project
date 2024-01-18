import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from '../entities/creator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>,
  ) {}

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const creator = this.creatorRepository.create(createCreatorDto);
    return await this.creatorRepository.save(creator);
  }

  async findAll(): Promise<Creator[]> {
    return await this.creatorRepository.find();
  }

  async findOne(id: number): Promise<Creator> {
    const creator = await this.creatorRepository.findOne({ where: { id: id } });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${id} not found`);
    }
    return creator;
  }

  async update(id: number, updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    this.creatorRepository.update(id, updateCreatorDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.creatorRepository.delete(id);
  }
}
