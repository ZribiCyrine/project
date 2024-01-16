import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Ticket } from "./ticket.entity";

@Entity('participant')
export class Participant extends Person{
    @OneToMany(()=>Ticket, (tickets: Ticket)=> tickets.participant)
    tickets: Ticket[];
}