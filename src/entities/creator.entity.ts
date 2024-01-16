import { Column, Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Event } from "./event.entity";

@Entity('creator')
export class Creator extends Person{
    @OneToMany(type => Event, event => event.creator)
    events: Event[];
}