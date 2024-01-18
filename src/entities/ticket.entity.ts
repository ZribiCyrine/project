import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant.entity";
import { ConfirmedEvent } from "./confirmedEvent.entity";

@Entity('ticket')
export class Ticket extends Date {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Participant, participant => participant.tickets)
    participant: Participant;

    @ManyToOne(() => ConfirmedEvent, confirmedEvent => confirmedEvent.tickets)
    confirmedEvent: ConfirmedEvent;

}