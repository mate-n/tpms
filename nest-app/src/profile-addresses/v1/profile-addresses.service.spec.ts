import { Test, TestingModule } from '@nestjs/testing';
import { ProfileAddressesService } from './profile-addresses.service';

describe('ProfileAddressesService', () => {
  let service: ProfileAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileAddressesService],
    }).compile();

    service = module.get<ProfileAddressesService>(ProfileAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
