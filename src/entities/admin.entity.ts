import { ChildEntity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Event } from "./event.entity";
import { Role } from "../enum/role.enum";

@ChildEntity(Role.ADMIN)
export class Admin extends Person {
    @OneToMany(() => Event, event => event.admin)
    events: Event[]

    constructor(){
        super();
        this.role= Role.ADMIN;
    }
}