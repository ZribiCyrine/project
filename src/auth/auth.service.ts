import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { ParticipantSubscribeDto } from "./dto/participant-subscribe.dto";
import { ConfigService } from "@nestjs/config";
import { Participant } from "../entities/participant.ts";
import { Admin } from "../entities/admin.entity";
import { Role } from "../enum/role.enum";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";


@Injectable()
export class AuthService {
  private jwtSecret: string;
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private jwtService: JwtService,
    private configService: ConfigService,

  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async signUp(participantSubscribeDto: ParticipantSubscribeDto): Promise<Participant> {
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

  async loginUser(credentials: LoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
    const { email, password } = credentials;
    const user = await this.participantRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('Email or password incorrect.');
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    console.log('match : ', user.password === hashedPassword)
    if (user.password === hashedPassword) {
      const payload = {
        name: user.name,
        firstname: user.firstname,
        email: user.email,
        role: user.role
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

  async loginAdmin(credentials: LoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
    const { email, password } = credentials;
    const admin = await this.adminRepository.findOne({ where: { email: email } });
    if (!admin) {
      throw new NotFoundException('Email or password incorrect.');
    }
    const hashedPassword = await bcrypt.hash(password, admin.salt);
    console.log('match : ', admin.password === hashedPassword)
    if (admin.password === hashedPassword) {
      const payload = {
        name: admin.name,
        firstname: admin.firstname,
        email: admin.email,
        role: admin.role
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