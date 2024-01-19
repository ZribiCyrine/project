import { Role } from "../enum/role.enum";
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from 'typeorm';
import { Date } from "./date.entity";
import * as bcrypt from 'bcrypt';

export class Person extends Date {
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

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash (this.password, salt);    
    }
    
    @Column({ type: 'varchar' })
    role: Role;
}