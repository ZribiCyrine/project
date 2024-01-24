import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { ConfigService } from "@nestjs/config";
import { Person } from "../entities/person.entity";
import { Role } from "../enum/role.enum";


@Injectable()
export class AuthService {
 /* private jwtSecret: string;
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async register(participantData: ParticipantSubscribeDto): Promise<Partial<Person>> {

    const email= participantData.email;
    const existingParticipant = await this.personRepository.createQueryBuilder('person')
      .where('person.email = :email', { email })
      .andWhere('(person.role = :participant OR person.role = :creator)', {
        participant: Role.PARTICIPANT,
        creator: Role.CREATOR,
      })
      .getOne();
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
  }*/
}