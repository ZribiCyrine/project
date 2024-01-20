import { Event } from "./event.entity";
import { Entity, OneToMany } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity('confirmedevent')
export class ConfirmedEvent extends Event{
   
    @OneToMany(() => Ticket, ticket => ticket.confirmedEvent, {
        cascade: true 
    })
    tickets: Ticket[];
}