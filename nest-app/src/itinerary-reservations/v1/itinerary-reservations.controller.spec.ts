import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryReservationsController } from './itinerary-reservations.controller';
import { ItineraryReservationsService } from './itinerary-reservations.service';

describe('ItineraryReservationsController', () => {
  let controller: ItineraryReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryReservationsController],
      providers: [ItineraryReservationsService],
    }).compile();

    controller = module.get<ItineraryReservationsController>(ItineraryReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
