import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Participant } from "../entities/participant.entity";
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
  private jwtSecret: string;
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async register(participantData: ParticipantSubscribeDto): Promise<Partial<Participant>> {

    const existingParticipant = await this.participantRepository.findOne({ where: { email: participantData.email } });

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

  async login(credentials: LoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
    const { email, password } = credentials;
    const participant = await this.participantRepository.findOne({ where: { email: email } });
    if (!participant) {
      throw new NotFoundException('Email or password incorrect.');
    }
    const hashedPassword = await bcrypt.hash(password, participant.salt);
    console.log('match : ', participant.password === hashedPassword)
    if (participant.password === hashedPassword) {
      const payload = {
        name: participant.name,
        firstname: participant.firstname,
        email: participant.email,
        role: participant.role
      };
      console.log(process.env.JWT_SECRET);
      const jwt = this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1d',
      });
      return {
        "access_token": jwt,
      };
    } else {
      throw new NotFoundException('Email or password incorrect.');
    }
  }
}