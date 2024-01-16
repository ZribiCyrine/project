import { Role } from "../enum/role.enum";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Date } from "./date.entity";

@Entity('person')
export class Person extends Date {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'varchar'})
    firstname: string;

    @Column({ type: 'bigint' })
    cin: number;

    @Column({ type: 'bigint' })
    phoneNumber: number;

    @Column({ type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    role: Role;

    constructor(name: string, firstname: string, cin: number, phoneNumber: number, email: string, role: Role){
        super();
        this.name= name;
        this.firstname= firstname;
        this.cin= cin;
        this.phoneNumber= phoneNumber;
        this.email= email;
        this.role= role;
    }
}