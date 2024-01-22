import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { BaseDate } from "./baseDate.entity";
import { TicketStatus } from "../enum/ticketStatus.enum";
import { Event } from "./event.entity";

@Entity('ticket')
export class Ticket extends BaseDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    status: TicketStatus;

    @ManyToOne(() => Participant, participant => participant.tickets, {
        eager: true
    })
    participant: Participant;

    @ManyToOne(() => Event, event => event.tickets, {
        eager: true
    })
    event: Event;
}