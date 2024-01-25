import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity.js';
import { Repository } from 'typeorm';
import { InfoDto } from '../dto/info.dto';
import { Role } from '../enum/role.enum';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>
  ) { }

  async create(infoDto: InfoDto): Promise<Participant> {
    const participant = this.participantRepository.create({
      ...infoDto,
      role: Role.PARTICIPANT
    });
    return await this.participantRepository.save(participant);
  }

  async findAllByRole(role: Role): Promise<Participant[]> {
    return this.participantRepository.find({ where: { role } });
  }
}
