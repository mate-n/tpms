import type { IReservation } from '@/interfaces/IReservation'
import { TravelDistanceChecker } from '@/helpers/TravelDistanceChecker'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/interfaces/IValidator'

export class ItineraryReservationValidator implements IValidator {
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

        const isTravelDistancePossibleInOneDay =
          this.travelDistanceChecker.isDistanceIsPossibleToTravelWithinADay(
            reservations[i - 1].camp,
            reservations[i].camp
          )

        if (!isTravelDistancePossibleInOneDay) {
          reservations[i].addIssue('Travel distance is too far')
        } else {
          reservations[i].removeIssue('Travel distance is too far')
        }
      }
    }
  }
}
