import { IsNotEmpty, IsString } from "class-validator";
import { TicketStatus } from "../../enum/ticketStatus.enum";
import { Event } from "../../entities/event.entity";
import { Person } from "../../entities/person.entity";

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    status: TicketStatus

    @IsNotEmpty()
    purchaser: Person

    @IsNotEmpty()
    event: Event
}
