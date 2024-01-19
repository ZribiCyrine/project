import { Role } from "../enum/role.enum";
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Date } from "./date.entity";

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

    @Column({ type: 'varchar'})
    role: Role;
}