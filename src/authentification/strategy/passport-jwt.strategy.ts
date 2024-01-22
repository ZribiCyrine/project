import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import {ConfigService} from "@nestjs/config"
import { PayloadInterface } from "../interfaces/payload.interface";
import { Repository } from "typeorm";
import { Participant } from "../../entities/participant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ParticipantService } from "../../participant/participant.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor( 
        private configService: ConfigService,
        private participantService: ParticipantService
    ){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get('JWT_SECRET') ,
        })
    }

async validate(payload:PayloadInterface){
    const participant = await this.participantService.getParticipantByEmail(payload.email);
      if(participant){
        return{
            id: participant.id,
            name: participant.name,
            firstname: participant.firstname,
            cin: participant.cin,
            phoneNumber: participant.phoneNumber,
            email: participant.email,
            role: participant.role
        }
    }else{
        throw new UnauthorizedException();
    }
}
}