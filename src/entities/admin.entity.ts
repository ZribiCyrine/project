import { Entity, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Role } from "../enum/role.enum";
import { info } from "./info.entity";

@Entity('admin')
export class Admin extends info {
    @OneToMany(() => Event, event => event.admin)
    events: Event[]

    constructor(){
        super();
        this.role= Role.ADMIN;
    }
}