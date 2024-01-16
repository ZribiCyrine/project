import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Event } from "./event.entity";

@Entity('admin')
export class Admin extends Person{
    @OneToMany(()=>Event, (events: Event)=>events.admin)
    events: Event[]

}