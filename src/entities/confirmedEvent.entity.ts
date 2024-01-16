import { BeforeInsert, Entity, Column, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Ticket } from "./ticket.entity";

@Entity('confirmedevent')
export class ConfirmedEvent extends Event{
    @Column({ type: 'timestamp', nullable: true })
    confirmedDate: Date | null;

    @BeforeInsert()
    setConfirmedDate() {
        if (!this.confirmedDate) {
            this.confirmedDate = new Date();
        }
    }

    @OneToMany(()=>Ticket, (tickets: Ticket)=> tickets.confirmedEvent)
    tickets: Ticket[];
}