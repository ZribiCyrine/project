import { Column, Entity, OneToMany } from "typeorm";
import { Event } from "./event.entity";
import { Person } from "./person.entity";
import { Role } from "../enum/role.enum";

@Entity('creator')
export class Creator extends Person{
    @OneToMany(type => Event, event => event.creator, {
        cascade: true 
    })
    events: Event[];

    constructor(name: string, firstname: string, cin: number, phoneNumber: number, email: string, role: Role){
        super(name, firstname, cin, phoneNumber,email, Role.CREATOR);
    }
}