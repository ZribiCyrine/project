import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TicketStatus } from "../enum/ticketStatus.enum";
import { Participant } from "./participant.entity";
import { ConfirmedEvent } from "./confirmedEvent.entity";

@Entity('ticket')
export class Ticket extends Date {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    status: TicketStatus

    @ManyToOne(() => Participant, participant => participant.tickets)
    participant: Participant;

    @ManyToOne(() => ConfirmedEvent, confirmedEvent => confirmedEvent.tickets)
    confirmedEvent: ConfirmedEvent;

}