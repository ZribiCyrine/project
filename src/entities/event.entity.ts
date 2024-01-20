import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SellPoint } from "./sellPoint.entity";
import { Image } from "./image.entity";
import { Creator } from "./creator.entity";
import { Admin } from "./admin.entity";
import { BaseDate} from "./baseDate.entity";

@Entity('event')
export class Event extends BaseDate{
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

    @Column({ type: 'varchar'}) 
    alcoholRules: string;

    @Column({ type: 'varchar'}) 
    ageRules: string;

    @Column({ type: 'varchar'}) 
    dressCode: string;

    @Column({ type: 'int' })
    ticketPrice: number;

    @Column({ type: 'datetime' })
    eventDate: Date;

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

    @ManyToOne(() => Creator, creator => creator.events, {
        eager: true
    })
    creator: Creator;

    @ManyToOne(() => Admin, admin => admin.events, {
        eager: true
    })
    admin: Admin

    @Column({ default: false })
    isConfirmed: boolean;
}