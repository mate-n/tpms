import type { IReservation } from '@/interfaces/IReservation'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/interfaces/IValidator'

export class ReservationValidator implements IValidator {
  private dateHelper: DateHelper = new DateHelper()

  validate(reservation: IReservation): void {
    reservation.errors = {}
    this.isGuestsPerRoomValid(reservation)
    this.isRoomsValid(reservation)
    this.isNightsValid(reservation)
    this.isRoomTypeIsAvailable(reservation)
  }

  isGuestsPerRoomValid(reservation: IReservation): void {
    if (reservation.guestsPerRoom < 1) {
      reservation.errors['guestsPerRoom'] = 'Guests per room cannot be less than 1'
    }
  }

  isRoomsValid(reservation: IReservation): void {
    if (reservation.rooms < 1) {
      reservation.errors['rooms'] = 'Rooms cannot be less than 1'
    }
  }

  isNightsValid(reservation: IReservation): void {
    const nights = this.dateHelper.calculateNightsBetweenDates(
      reservation.arrivalDate,
      reservation.departureDate
    )

    if (nights < 1) {
      reservation.errors['nights'] = 'Nights cannot be less than 1'
    }
  }

  isRoomTypeIsAvailable(reservation: IReservation): void {
    if (reservation.roomType === 'Standard | King') {
      reservation.errors['nights'] = 'Room Type is not available'
    }
  }
}
