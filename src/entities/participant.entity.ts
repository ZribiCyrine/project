import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Ticket } from "./ticket.entity";
import { Role } from "../enum/role.enum";

@Entity('participant')
export class Participant extends Person{
    @OneToMany(()=>Ticket, ticket => ticket.participant, {
        cascade: true 
    })
    tickets: Ticket[];
    constructor(name: string, firstname: string, cin: number, phoneNumber: number, email: string, role: Role){
        super(name, firstname, cin, phoneNumber,email, Role.PARTICIPANT);
    }
}