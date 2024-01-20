import { Entity, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Person } from "./person.entity";

@Entity('creator')
export class Creator extends Person{
    @OneToMany(type => Event, event => event.creator, {
        cascade: true 
    })
    events: Event[];

}