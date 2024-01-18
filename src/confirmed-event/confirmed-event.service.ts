import { Injectable } from '@nestjs/common';
import { CreateConfirmedEventDto } from './dto/create-confirmed-event.dto';
import { UpdateConfirmedEventDto } from './dto/update-confirmed-event.dto';

@Injectable()
export class ConfirmedEventService {
  create(createConfirmedEventDto: CreateConfirmedEventDto) {
    return 'This action adds a new confirmedEvent';
  }

  findAll() {
    return `This action returns all confirmedEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confirmedEvent`;
  }

  update(id: number, updateConfirmedEventDto: UpdateConfirmedEventDto) {
    return `This action updates a #${id} confirmedEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} confirmedEvent`;
  }
}
