import { Test, TestingModule } from '@nestjs/testing';
import { ProtelCampsController } from './protel-camps.controller';
import { ProtelCampsService } from '../protel-camps.service';

describe('ProtelCampsController', () => {
  let controller: ProtelCampsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtelCampsController],
      providers: [ProtelCampsService],
    }).compile();

    controller = module.get<ProtelCampsController>(ProtelCampsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
