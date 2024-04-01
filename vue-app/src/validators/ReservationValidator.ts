import type { IReservation } from '@/interfaces/IReservation'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/interfaces/IValidator'

export class ReservationValidator implements IValidator {
  private dateHelper: DateHelper = new DateHelper()

  validate(reservation: IReservation): void {
    reservation.errors = {}
    if (reservation.guestsPerRoom < 1) {
      reservation.errors['guestsPerRoom'] = 'Guests per room cannot be less than 1'
    }
    if (reservation.rooms < 1) {
      reservation.errors['rooms'] = 'Rooms cannot be less than 1'
    }

    const nights = this.dateHelper.calculateNightsBetweenDates(
      reservation.arrivalDate,
      reservation.departureDate
    )

    if (nights < 1) {
      reservation.errors['nights'] = 'Nights cannot be less than 1'
    }
  }
}
