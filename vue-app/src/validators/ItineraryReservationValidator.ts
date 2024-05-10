import type { IReservation } from '@/shared/interfaces/IReservation'
import { TravelDistanceChecker } from '@/helpers/TravelDistanceChecker'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/shared/interfaces/IValidator'

export class ItineraryReservationValidator {
  private travelDistanceChecker: TravelDistanceChecker = new TravelDistanceChecker()
  private dateHelper: DateHelper = new DateHelper()

  validate(reservations: IReservation[]): void {
    for (let i = 0; i < reservations.length; i++) {
      if (i > 0) {
        const isSameDay = this.dateHelper.isSameDay(
          reservations[i].arrivalDate,
          reservations[i - 1].departureDate
        )
        if (!isSameDay) {
          reservations[i].addIssue('Reservation dates do not match up')
        } else {
          reservations[i].removeIssue('Reservation dates do not match up')
        }
      }
    }
  }
}
