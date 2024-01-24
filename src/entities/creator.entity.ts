import { ChildEntity, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Role } from "../enum/role.enum";
import { Person } from "./person.entity";

@ChildEntity(Role.CREATOR)
export class Creator extends Person {
    @OneToMany(type => Event, event => event.creator)
    events: Event[];
}