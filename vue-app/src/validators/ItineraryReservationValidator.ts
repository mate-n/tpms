import type { IReservation } from '@/shared/interfaces/IReservation'
import { TravelDistanceChecker } from '@/helpers/TravelDistanceChecker'
import { DateHelper } from '@/helpers/DateHelper'

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
          //reservations[i].addIssue('Reservation dates do not match up')
        } else {
          //reservations[i].removeIssue('Reservation dates do not match up')
        }
        const isTravelDistanceTooFar =
          this.travelDistanceChecker.isDistanceIsPossibleToTravelWithinADay(
            reservations[i - 1].propertyName,
            reservations[i].propertyName
          )
        if (!isTravelDistanceTooFar) {
          reservations[i].addIssue('Travel distance too far')
        } else {
          reservations[i].removeIssue('Travel distance too far')
        }
      }
    }
  }

  getErrors(reservations: IReservation[]): string[] {
    const errors: string[] = []
    for (const reservation of reservations) {
      for (const key in reservation.errors) {
        const data = reservation.errors[key]
        errors.push(data)
      }
    }
    return errors
  }
}
