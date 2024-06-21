import { Test, TestingModule } from '@nestjs/testing';
import { ProtelRegionsService } from './protel-regions.service';

describe('ProtelRegionsService', () => {
  let service: ProtelRegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtelRegionsService],
    }).compile();

    service = module.get<ProtelRegionsService>(ProtelRegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
