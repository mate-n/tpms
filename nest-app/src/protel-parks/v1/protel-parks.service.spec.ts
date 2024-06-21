import { Test, TestingModule } from '@nestjs/testing';
import { ProtelParksService } from './protel-parks.service';

describe('ProtelParksService', () => {
  let service: ProtelParksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtelParksService],
    }).compile();

    service = module.get<ProtelParksService>(ProtelParksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
