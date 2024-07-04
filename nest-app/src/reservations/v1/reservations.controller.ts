import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { IReservation } from 'src/shared/interfaces/IReservation'

@Controller('v1/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() reservation: IReservation) {
    return this.reservationsService.create(reservation)
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() reservation: IReservation) {
    return this.reservationsService.update(reservation)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id)
  }
}
