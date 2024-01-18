import { Module } from '@nestjs/common';
import { ConfirmedEventService } from './confirmed-event.service';
import { ConfirmedEventController } from './confirmed-event.controller';

@Module({
  controllers: [ConfirmedEventController],
  providers: [ConfirmedEventService],
})
export class ConfirmedEventModule {}
