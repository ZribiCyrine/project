import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Participant } from '../entities/participant.entity';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('/participant')
  async getParticipantTickets(@Req() req){
    const participantId = req.user.id; 
    const tickets = await this.ticketService.findParticipantTickets(participantId);
    return tickets;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  /*@Post('/buy/:eventId')
  async buyTicket(@Req() req, @Param('eventId') eventId: number){
    const participant = req.user;
    const ticket = await this.ticketService.buyTicket(participant, eventId);
    return ticket;
  }

  @Post('/reserve/:eventId')
  async reserveTicket(@Req() req, @Param('eventId') eventId: number){
    const participant = req.user;
    const ticket = await this.ticketService.reserveTicket(participant, eventId);
    return ticket;
  }*/
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
