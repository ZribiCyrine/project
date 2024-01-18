import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmedEventService } from './confirmed-event.service';

describe('ConfirmedEventService', () => {
  let service: ConfirmedEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmedEventService],
    }).compile();

    service = module.get<ConfirmedEventService>(ConfirmedEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
