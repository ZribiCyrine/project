import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Ticket } from "./ticket.entity";
import { Role } from "../enum/role.enum";

@Entity('participant')
export class Participant extends Person{

    @OneToMany(()=>Ticket, ticket => ticket.participant)
    tickets: Ticket[];

    constructor(){
        super();
        this.role= Role.PARTICIPANT;
    }
}