import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { ConfigService } from "@nestjs/config";
import { Participant } from "../entities/participant.ts";
import { Admin } from "../entities/admin.entity";
import { Role } from "../enum/role.enum";


@Injectable()
export class AuthService {
  private jwtSecret: string;
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,

    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    private jwtService: JwtService,
    private configService: ConfigService,

  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async signIn(participantSubscribeDto: ParticipantSubscribeDto): Promise<Participant> {
    const email = participantSubscribeDto.email;

    const existingParticipant = await this.participantRepository.findOne({ where: { email } });

    if (existingParticipant) {
      throw new ConflictException('A person with this email already exists.');
    }

    const newParticipant = this.participantRepository.create({
      ...participantSubscribeDto,
      role: Role.PARTICIPANT
    });
    newParticipant.salt = await bcrypt.genSalt();
    newParticipant.password = await bcrypt.hash(newParticipant.password, newParticipant.salt);
    await this.participantRepository.save(newParticipant);
    delete newParticipant.salt;
    delete newParticipant.password;
    return newParticipant;
  }
}