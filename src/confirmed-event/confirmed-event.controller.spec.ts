import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmedEventController } from './confirmed-event.controller';
import { ConfirmedEventService } from './confirmed-event.service';

describe('ConfirmedEventController', () => {
  let controller: ConfirmedEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmedEventController],
      providers: [ConfirmedEventService],
    }).compile();

    controller = module.get<ConfirmedEventController>(ConfirmedEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
