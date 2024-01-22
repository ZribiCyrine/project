import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Participant } from "../entities/participant.entity";
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { ParticipantService } from "../participant/participant.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthentificationService {
  private jwtSecret: string;
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private readonly participantService: ParticipantService,
    private jwtService: JwtService,
    private configService: ConfigService, 
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async register(participantData: ParticipantSubscribeDto): Promise<Partial<Participant>> {

    const existingParticipant = await this.participantService.getParticipantByEmail(participantData.email);

    if (existingParticipant) {
      throw new ConflictException('An account with this email already exists.');
    }

    const participant = this.participantRepository.create({
      ...participantData
    })
    participant.salt = await bcrypt.genSalt();
    participant.password = await bcrypt.hash(participant.password, participant.salt);
    await this.participantRepository.save(participant);
    delete participant.salt;
    delete participant.password;
    return participant;
  }

  async login(credentials: LoginCredentialsDto){
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
    const { email, password } = credentials;
    const participant = await this.participantService.getParticipantByEmail(email);
    if (!participant) {
      throw new NotFoundException('Email or password incorrect.');
    }
    const hashedPassword = await bcrypt.hash(password, participant.salt);
    if (participant.password === 
      
      hashedPassword) {
      const payload = {
        name: participant.name,
        firstname: participant.firstname,
        email: participant.email,
      };
      console.log(process.env.JWT_SECRET);
      const jwt = this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h',
      });
      return {
        "access_token": jwt,
      };
    } else {
      throw new NotFoundException('Email or password incorrect.');
    }
  }
}