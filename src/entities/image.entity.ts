import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity('image')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    url: string;

    @ManyToOne(() => Event, (event: Event) => event.poster_oldPhotos)
    event: Event;
}