import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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

  async login(credentials:LoginCredentialsDto) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new BadRequestException('Invalid credentials provided.');
    }
  
    //recupere le login et le mdp
    const{email,password}=credentials;
  
    const participant=await this.participantRepository.createQueryBuilder("participant")
    .where("participant.email= :email or participant.password= :email",
    {email})
    .getOne();
  
    if(!participant)
       throw  new NotFoundException( 'email ou password erronée');
    
    const hashedPassword= await bcrypt.hash(password, participant.salt);
    if( hashedPassword == participant.password){
      const payload=  {
        name:participant.name,
        firstname:participant.firstname,
        email:participant.email
        };
      const jwt=await this.jwtService.sign(payload);
      return {
        "access_token":jwt
      }
  
    }
    else{
      throw  new NotFoundException( 'email ou password erronée');
    
    }
  }

}