import { Module } from '@nestjs/common';
import { SellPointService } from './sell-point.service';
import { SellPointController } from './sell-point.controller';

@Module({
  controllers: [SellPointController],
  providers: [SellPointService],
})
export class SellPointModule {}
