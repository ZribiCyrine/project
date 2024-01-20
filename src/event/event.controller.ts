import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('accept/:id')
  acceptEvent(@Param('id') id: number){
    return this.eventService.acceptEvent(+id);
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('/recent')
  getRecentEvents() {
    return this.eventService.getRecentEvents();
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/my-events')
  async getMyEvents(@Req() req) {
    const creatorId = req.user.id; 
    const events = await this.eventService.findEventsByCreator(creatorId);
    return events;
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
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
