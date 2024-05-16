import { Test, TestingModule } from '@nestjs/testing';
import { StationeriesService } from './stationeries.service';

describe('StationeriesService', () => {
  let service: StationeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationeriesService],
    }).compile();

    service = module.get<StationeriesService>(StationeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
