import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Event } from "./event.entity";
import { Role } from "../enum/role.enum";

@Entity('admin')
export class Admin extends Person {
    @OneToMany(() => Event, event => event.admin, {
        cascade: true
    })
    events: Event[]

}