import { IsNotEmpty, IsString } from "class-validator";
import { TicketStatus } from "../../enum/ticketStatus.enum";
import { Participant } from "../../entities/participant.entity";
import { Event } from "../../entities/event.entity";

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    status: TicketStatus

    @IsNotEmpty()
    participant: Participant

    @IsNotEmpty()
    event: Event
}
