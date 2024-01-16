import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity('sellpoint')
export class SellPoint{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'varchar'})
    address: string;

    @Column({ type: 'bigint' })
    phoneNumber: number;

    @ManyToMany(()=>Event, event => event.sellPoints)
    events: Event[];
}