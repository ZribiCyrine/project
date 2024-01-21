import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) { }

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':email')
  async getParticipantByEmail(@Param('email') email: string) {
    try {
      const participant = await this.participantService.getParticipantByEmail(email);
      if (participant) {
        return { success: true, participant };
      } else {
        return { success: false, message: 'Participant not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error retrieving participant' };
    }
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
