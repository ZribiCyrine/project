import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "../../entities/admin.entity";
import { Participant } from "../../entities/participant.ts";
import { PayloadInterface } from "../interfaces/payload.interface";
import { Role } from "../../enum/role.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    /*async validate(payload: PayloadInterface) {
        const participant = await this.participantRepository.findOne({ where: { email: payload.email } });
        if (participant) {
            return {
                ...participant,
                role: payload.role,
            };
        }
        else {
            throw new UnauthorizedException();
        }
    }*/
    async validate(payload: PayloadInterface) {
        let user: Participant | Admin;
        if (payload.role === Role.PARTICIPANT || Role.CREATOR) {
            user = await this.participantRepository.findOne({ where: { email: payload.email } });
        } else if (payload.role === Role.ADMIN) {
            user = await this.adminRepository.findOne({ where: { email: payload.email } });
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            ...user,
            role: payload.role,
        };
    }
}