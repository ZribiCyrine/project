import { Role } from "../enum/role.enum";
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from 'typeorm';
import { BaseDate } from "./baseDate.entity";

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

    @Column({ select: false })
    password: string;

    @Column({ type: 'varchar' })
    salt: string;

    @Column({ type: 'varchar' })
    role: Role;
}