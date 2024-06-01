import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryReservationsService } from './itinerary-reservations.service';

describe('ItineraryReservationsService', () => {
  let service: ItineraryReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItineraryReservationsService],
    }).compile();

    service = module.get<ItineraryReservationsService>(ItineraryReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
