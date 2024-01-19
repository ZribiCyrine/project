import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Date } from "./date.entity";
import { SellPoint } from "./sellPoint.entity";
import { Image } from "./image.entity";
import { Creator } from "./creator.entity";
import { Admin } from "./admin.entity";

@Entity('event')
export class Event extends Date{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'varchar'})
    type: string;

    @Column({ type: 'varchar'})
    address: string;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'text', nullable: true }) 
    rules: string;

    @Column({ type: 'int' })
    ticketPrice: number;

    @ManyToMany(() => SellPoint, sellPoint => sellPoint.events, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    sellPoints: SellPoint[];
    
    @OneToMany(() => Image, poster_oldPhoto => poster_oldPhoto.event, {
        cascade: true,
        eager: true
    })
    poster_oldPhotos: Image[];

    @ManyToOne(() => Creator, creator => creator.events)
    creator: Creator;

    @ManyToOne(() => Admin, admin => admin.events)
    admin: Admin

    @Column({ default: false })
    isConfirmed: boolean;
}