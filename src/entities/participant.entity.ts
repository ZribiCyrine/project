import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Ticket } from "./ticket.entity";

@Entity('participant')
export class Participant extends Person{

    @OneToMany(()=>Ticket, ticket => ticket.participant, {
        cascade: true 
    })
    tickets: Ticket[];

}