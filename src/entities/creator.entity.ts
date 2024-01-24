import { Entity, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Role } from "../enum/role.enum";
import { Participant } from "./participant.entity";

@Entity('creator')
export class Creator extends Participant{

    @OneToMany(type => Event, event => event.creator)
    events: Event[];

    constructor(){
        super();
        this.role= Role.CREATOR;
    }
}