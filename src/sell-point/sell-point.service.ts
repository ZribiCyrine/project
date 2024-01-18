import { Injectable } from '@nestjs/common';
import { CreateSellPointDto } from './dto/create-sell-point.dto';
import { UpdateSellPointDto } from './dto/update-sell-point.dto';

@Injectable()
export class SellPointService {
  create(createSellPointDto: CreateSellPointDto) {
    return 'This action adds a new sellPoint';
  }

  findAll() {
    return `This action returns all sellPoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellPoint`;
  }

  update(id: number, updateSellPointDto: UpdateSellPointDto) {
    return `This action updates a #${id} sellPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellPoint`;
  }
}
