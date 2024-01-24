import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import { BaseDate } from "./baseDate.entity";

export class info extends BaseDate{
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

    @Column({ type: 'varchar'})
    role: Role;
}