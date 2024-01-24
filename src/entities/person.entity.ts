import { Role } from "../enum/role.enum";
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, TableInheritance, OneToMany } from 'typeorm';
import { BaseDate } from "./baseDate.entity";
import { Ticket } from "./ticket.entity";
import { info } from "./info.entity";

@Entity('person')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class Person extends info {

    @OneToMany(() => Ticket, ticket => ticket.purchaser)
    tickets: Ticket[];

    constructor(){
        super();
        this.role= Role.PARTICIPANT;
    }
}
