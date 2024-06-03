import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItineraryReservationsService } from './itinerary-reservations.service';
import { IItineraryReservation } from 'src/shared/interfaces/IItineraryReservation';

@Controller('v1/itinerary-reservations')
export class ItineraryReservationsController {
  constructor(
    private readonly itineraryReservationsService: ItineraryReservationsService,
  ) {}

  @Post()
  create(@Body() itineraryReservation: IItineraryReservation) {
    return this.itineraryReservationsService.create(itineraryReservation);
  }

  @Get()
  findAll() {
    return this.itineraryReservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itineraryReservationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() itineraryReservation: IItineraryReservation,
  ) {
    return this.itineraryReservationsService.update(+id, itineraryReservation);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itineraryReservationsService.remove(+id);
  }
}
