import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  //@UseGuards(JwtAuthGuard)
  @Patch('accept/:id')
  acceptEvent(@Param('id') id: number, @Req() req) {
    const admin = req.user;
    return this.eventService.acceptEvent(+id, admin);
  }

 // @UseGuards(JwtAuthGuard)
  @Patch('reject/:id')
  rejectEvent(@Param('id') id: number, @Req() req) {
    const admin = req.user;
    return this.eventService.rejectEvent(+id, admin);
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req) {
    const user= req.user;
    return this.eventService.create(createEventDto, user);
  }

  @Get('/recent')
  getRecentNonConfirmedEvents() {
    return this.eventService.getRecentNonConfirmedEvents();
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/myEvents')
  async getMyEvents(@Req() req) {
    const creatorId = req.user.id;
    const events = await this.eventService.findEventsByCreator(creatorId);
    return events;
  }

  @Get('/confirmed')
  async getConfirmedEvents() {
    return this.eventService.getConfirmedEvents();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
