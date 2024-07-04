import { Test, TestingModule } from '@nestjs/testing';
import { ProtelProfilesController } from './protel-profiles.controller';
import { ProtelProfilesService } from './protel-profiles.service';

describe('ProtelProfilesController', () => {
  let controller: ProtelProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtelProfilesController],
      providers: [ProtelProfilesService],
    }).compile();

    controller = module.get<ProtelProfilesController>(ProtelProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
