import { Reservation } from '../classes/Reservation'
import type { IReservation } from '../interfaces/IReservation'
import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'

export class AvailabilitiesConverter {
  convertToReservations(availabilities: IProtelAvailability[]): IReservation[] {
    const reservations: IReservation[] = []
    availabilities.forEach((availability: IProtelAvailability) => {
      const reservation: IReservation = new Reservation()
      reservation.arrivalDate = availability.availability_start
      reservation.departureDate = availability.availability_end
      reservation.numberOfRooms = availability.availability_count
      reservation.roomTypeCode = availability.room_type_code
      reservations.push(reservation)
    })
    return reservations
  }
}
