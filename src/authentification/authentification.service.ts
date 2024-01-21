import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Participant } from "../entities/participant.entity";
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { ParticipantService } from "../participant/participant.service";


@Injectable()
export class AuthentificationService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private readonly participantService: ParticipantService,
    private jwtService: JwtService
  ) { }

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
    try {
      await this.participantRepository.save(participant);
    }
    catch (e) {
      throw new ConflictException('Contact details must be unique.')
    }
    delete participant.salt;
    delete participant.password;
    return participant;
  }

  async login(credentials: LoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
    const { email, password } = credentials;
    const participant = await this.participantService.getParticipantByEmail(email);
    console.log(participant);
    if (!participant) {
      throw new NotFoundException('Email or password incorrect.');
    }
    const hashedPassword = await bcrypt.hash(credentials.password, participant.salt);
    const passwordMatch = participant.password == hashedPassword;

    console.log(passwordMatch);
    if (passwordMatch) {
      const payload = {
        name: participant.name,
        firstname: participant.firstname,
        email: participant.email,
      };
      const accessToken = await this.jwtService.sign(payload);
      return {
        "access_token": accessToken,
      };
    } else {
      throw new NotFoundException('Email or password incorrect.');
    }
  }

}