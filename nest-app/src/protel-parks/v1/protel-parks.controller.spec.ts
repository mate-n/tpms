import { Test, TestingModule } from '@nestjs/testing';
import { ProtelParksController } from './protel-parks.controller';
import { ProtelParksService } from './protel-parks.service';

describe('ProtelParksController', () => {
  let controller: ProtelParksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtelParksController],
      providers: [ProtelParksService],
    }).compile();

    controller = module.get<ProtelParksController>(ProtelParksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
