import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity('image')
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varbinary',
        length: 'max',
        nullable: false,
    })
    data: Buffer;

    @ManyToOne(() => Event, event => event.poster_oldPhotos)
    event: Event;
}