import { Column, Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Event } from "./event.entity";

@Entity('creator')
export class Creator extends Person{
    @OneToMany(()=>Event, (events: Event)=> events.creator)
    events: Event[];
}