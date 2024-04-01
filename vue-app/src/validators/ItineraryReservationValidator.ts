import type { IReservation } from '@/interfaces/IReservation'
import { TravelDistanceChecker } from '@/helpers/TravelDistanceChecker'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/interfaces/IValidator'

export class ItineraryReservationValidator implements IValidator {
  private travelDistanceChecker: TravelDistanceChecker = new TravelDistanceChecker()
  private dateHelper: DateHelper = new DateHelper()

  validate(reservations: IReservation[]): void {
    for (let i = 0; i < reservations.length; i++) {
      const issues: string[] = []
      if (i > 0) {
        const isSameDay = this.dateHelper.isSameDay(
          reservations[i].arrivalDate,
          reservations[i - 1].departureDate
        )
        if (!isSameDay) {
          issues.push('Reservation dates do not match up')
        }

        const isTravelDistancePossibleInOneDay =
          this.travelDistanceChecker.isDistanceIsPossibleToTravelWithinADay(
            reservations[i - 1].camp,
            reservations[i].camp
          )

        if (!isTravelDistancePossibleInOneDay) {
          issues.push('Travel distance is too far')
        }
      }
      reservations[i].issues = issues
    }
  }
}
