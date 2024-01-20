import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { ConfirmedEvent } from "./confirmedEvent.entity";
import { BaseDate } from "./baseDate.entity";
import { TicketStatus } from "../enum/ticketStatus.enum";

@Entity('ticket')
export class Ticket extends BaseDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    status: TicketStatus;

    @ManyToOne(() => Participant, participant => participant.tickets)
    participant: Participant;

    @ManyToOne(() => ConfirmedEvent, confirmedEvent => confirmedEvent.tickets)
    confirmedEvent: ConfirmedEvent;

}