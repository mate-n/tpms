import { Module } from '@nestjs/common';
import { ItineraryReservationsService } from './itinerary-reservations.service';
import { ItineraryReservationsController } from './itinerary-reservations.controller';

@Module({
  controllers: [ItineraryReservationsController],
  providers: [ItineraryReservationsService],
})
export class ItineraryReservationsModule {}
