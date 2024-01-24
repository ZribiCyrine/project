import { Role } from "../enum/role.enum";
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, TableInheritance, OneToMany } from 'typeorm';
import { BaseDate } from "./baseDate.entity";
import { Ticket } from "./ticket.entity";

@Entity('person')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class Person extends BaseDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    firstname: string;

    @Column({ type: 'bigint' })
    cin: number;

    @Column({ type: 'bigint' })
    phoneNumber: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    salt: string;

    @Column({ type: 'varchar', default: Role.PARTICIPANT})
    role: Role;

    @OneToMany(() => Ticket, ticket => ticket.purchaser)
    tickets: Ticket[];
}
