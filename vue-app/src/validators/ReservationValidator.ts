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
    this.isRoomTypeAvailable(reservation)
  }

  isGuestsPerRoomValid(reservation: IReservation): void {
    if (reservation.numberOfGuestsPerRoom < 1) {
      reservation.errors['numberOfGuestsPerRoom'] = 'Guests per room cannot be less than 1'
    }
  }

  isRoomsValid(reservation: IReservation): void {
    if (reservation.numberOfRooms < 1) {
      reservation.errors['numberOfRooms'] = 'Rooms cannot be less than 1'
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

  isRoomTypeAvailable(reservation: IReservation): void {
    if (reservation.propertyAvailabilities.length === 0) return
    if (!reservation.room) return
    const foundAvailibilityDatum = reservation.propertyAvailabilities.find(
      (ad) => ad.room.type === reservation.room?.type
    )
    if (foundAvailibilityDatum && foundAvailibilityDatum.availabilityCount == 0) {
      reservation.errors['roomType'] = 'Room Type is not available'
    }
  }
}
