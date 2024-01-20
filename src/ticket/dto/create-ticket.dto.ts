import { IsNotEmpty, IsString } from "class-validator";
import { TicketStatus } from "../../enum/ticketStatus.enum";
import { Participant } from "../../entities/participant.entity";
import { ConfirmedEvent } from "../../entities/confirmedEvent.entity";

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    status: TicketStatus

    @IsNotEmpty()
    participant: Participant

    @IsNotEmpty()
    confirmedEvent: ConfirmedEvent
}
