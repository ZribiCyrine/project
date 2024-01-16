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

    @Column({ type: 'float' })
    ticketPrice: number;

    @ManyToMany(() => SellPoint)
    @JoinTable({
        name: "admin_events",
        joinColumn: {
        name: "event", 
        referencedColumnName: "id"
        },
        inverseJoinColumn: {
        name: "admin",
        referencedColumnName: "id"
        }
        })
    sellPoints: SellPoint[];
    
    @Column({ type: 'text', nullable: true })
    @OneToMany(() => Image, poster_oldPhotos => poster_oldPhotos.event, {
        cascade: true 
    })
    poster_oldPhotos: Image[];

    @ManyToOne(()=>Creator, (creator: Creator) => creator.events,{
        eager: true
    })
    creator: Creator;

    @ManyToOne(()=>Admin, (admin: Admin) => admin.events)
    admin: Admin

    @Column({ default: false })
    isConfirmed: boolean;
}