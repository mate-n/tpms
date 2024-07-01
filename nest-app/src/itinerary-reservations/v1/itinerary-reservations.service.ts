import { Injectable } from '@nestjs/common'
import { ItineraryReservationFaker } from 'src/shared/faker/ItineraryReservationFaker'
import { IItineraryReservation } from 'src/shared/interfaces/IItineraryReservation'

@Injectable()
export class ItineraryReservationsService {
  itineraryReservationFaker = new ItineraryReservationFaker()
  create(itineraryReservation: IItineraryReservation) {
    return this.itineraryReservationFaker.create()
  }

  findAll() {
    const itineraryReservation1 = this.itineraryReservationFaker.create()
    const itineraryReservation2 = this.itineraryReservationFaker.create()
    const itineraryReservation3 = this.itineraryReservationFaker.create()
    return [itineraryReservation1, itineraryReservation2, itineraryReservation3]
  }

  findOne(id: number) {
    return this.itineraryReservationFaker.create()
  }

  update(id: number, itineraryReservation: IItineraryReservation) {
    return this.itineraryReservationFaker.create()
  }

  remove(id: number) {
    return `This action removes a #${id} itineraryReservation`
  }
}
