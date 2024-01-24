import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseDate } from "./baseDate.entity";
import { TicketStatus } from "../enum/ticketStatus.enum";
import { Event } from "./event.entity";
import { Person } from "./person.entity";

@Entity('ticket')
export class Ticket extends BaseDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    status: TicketStatus;

    @ManyToOne(() => Person, purchaser => purchaser.tickets, {
        eager: true
    })
    purchaser: Person;

    @ManyToOne(() => Event, event => event.tickets, {
        eager: true
    })
    event: Event;
}