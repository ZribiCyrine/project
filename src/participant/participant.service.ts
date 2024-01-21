import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Participant } from "../entities/participant.entity";
import { Repository } from "typeorm";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) { }

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const participant = this.participantRepository.create(createParticipantDto);
    return await this.participantRepository.save(participant);
  }

  async findAll(): Promise<Participant[]> {
    return await this.participantRepository.find();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOne({ where: { id: id } });
    if (!participant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return participant;
  }

  async getParticipantByEmail(email: string): Promise<Participant> {
    return await this.participantRepository.createQueryBuilder("participant")
      .where("participant.email= :email or participant.password= :email",
        { email })
      .getOne();
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    this.participantRepository.update(id, updateParticipantDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.participantRepository.delete(id);
  }
}
