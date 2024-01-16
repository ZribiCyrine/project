import { BeforeInsert, Entity, Column, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Ticket } from "./ticket.entity";

@Entity('confirmedevent')
export class ConfirmedEvent extends Event{
    @Column({ type: 'datetime', nullable: true })
    confirmedDate: Date | null;

    @BeforeInsert()
    setConfirmedDate() {
        if (!this.confirmedDate) {
            this.confirmedDate = new Date();
        }
    }

    @OneToMany(() => Ticket, ticket => ticket.confirmedEvent)
    tickets: Ticket[];
}