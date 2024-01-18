import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfirmedEventService } from './confirmed-event.service';
import { CreateConfirmedEventDto } from './dto/create-confirmed-event.dto';
import { UpdateConfirmedEventDto } from './dto/update-confirmed-event.dto';

@Controller('confirmed-event')
export class ConfirmedEventController {
  constructor(private readonly confirmedEventService: ConfirmedEventService) {}

  @Post()
  create(@Body() createConfirmedEventDto: CreateConfirmedEventDto) {
    return this.confirmedEventService.create(createConfirmedEventDto);
  }

  @Get()
  findAll() {
    return this.confirmedEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confirmedEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfirmedEventDto: UpdateConfirmedEventDto) {
    return this.confirmedEventService.update(+id, updateConfirmedEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confirmedEventService.remove(+id);
  }
}
