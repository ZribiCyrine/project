import { BeforeInsert, Entity, Column, OneToMany } from "typeorm";
import { Ticket } from "./ticket.entity";
import { Event } from "./event.entity";

@Entity('confirmedevent')
export class ConfirmedEvent extends Event{
   
    @OneToMany(() => Ticket, ticket => ticket.confirmedEvent, {
        cascade: true 
    })
    tickets: Ticket[];
}