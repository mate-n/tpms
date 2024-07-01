import { Test, TestingModule } from '@nestjs/testing';
import { ProtelStatusApiController } from './protel-status-api.controller';

describe('ProtelStatusApiController', () => {
  let controller: ProtelStatusApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtelStatusApiController],
    }).compile();

    controller = module.get<ProtelStatusApiController>(ProtelStatusApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
