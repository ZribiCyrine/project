import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { PayloadInterface } from "../interfaces/payload.interface";
import { Repository } from "typeorm";
import { Participant } from "../../entities/participant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Participant)
        private participantRepository: Repository<Participant>
    ) {
        super({
            jwtFromRequest: ExtractJwt.FromAUthHeaderAsBearerTokent(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET'),
        })
    }

    async validate(payload: PayloadInterface) {
        const participant = await this.participantRepository.findOne({
            where: { email: payload.email },
        });
        if (participant) {
            const { password, salt, ...result } = participant;
            return {
                result
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}