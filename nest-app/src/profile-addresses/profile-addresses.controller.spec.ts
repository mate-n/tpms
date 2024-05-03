import { Test, TestingModule } from '@nestjs/testing';
import { ProfileAddressesController } from './profile-addresses.controller';

describe('ProfileAddressesController', () => {
  let controller: ProfileAddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileAddressesController],
    }).compile();

    controller = module.get<ProfileAddressesController>(ProfileAddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
