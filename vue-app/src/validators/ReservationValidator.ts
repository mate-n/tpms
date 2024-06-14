import type { IReservation } from '@/shared/interfaces/IReservation'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/shared/interfaces/IValidator'

export class ReservationValidator implements IValidator {
  private dateHelper: DateHelper = new DateHelper()

  validate(reservation: IReservation): void {
    reservation.errors = {}
    this.isGuestsPerRoomValid(reservation)
    this.isRoomsValid(reservation)
    this.isNightsValid(reservation)
    this.isPropertyIDValid(reservation)
    this.isProfileIDValid(reservation)
    this.isSelectedProtelAvailabilityValid(reservation)
  }

  isGuestsPerRoomValid(reservation: IReservation): void {
    if (reservation.numberOfGuestsPerRoom < 1) {
      reservation.errors!['numberOfGuestsPerRoom'] = 'Guests per room cannot be less than 1'
    }
  }

  isRoomsValid(reservation: IReservation): void {
    if (reservation.numberOfRooms < 1) {
      reservation.errors!['numberOfRooms'] = 'Rooms cannot be less than 1'
    }
    if (
      reservation.selectedProtelAvailability &&
      reservation.selectedProtelAvailability.availability_count
    ) {
      if (reservation.numberOfRooms > reservation.selectedProtelAvailability.availability_count) {
        reservation.errors!['numberOfRooms'] = 'Not enough rooms available for this room type'
      }
    }
  }

  isNightsValid(reservation: IReservation): void {
    const nights = this.dateHelper.calculateNightsBetweenDates(
      reservation.arrivalDate,
      reservation.departureDate
    )

    if (nights < 1) {
      reservation.errors!['nights'] = 'Nights cannot be less than 1'
    }
  }

  isRoomIDValid(reservation: IReservation): void {
    if (!reservation.roomID) {
      reservation.errors!['roomID'] = 'Room Type cannot be empty'
    }
  }

  isPropertyIDValid(reservation: IReservation): void {
    if (!reservation.propertyID) {
      reservation.errors!['propertyID'] = 'Property cannot be empty'
    }
  }

  isProfileIDValid(reservation: IReservation): void {
    if (!reservation.profileID) {
      reservation.errors!['profileID'] = 'Profile cannot be empty'
    }
  }

  isSelectedProtelAvailabilityValid(reservation: IReservation): void {
    if (!reservation.selectedProtelAvailability) {
      reservation.errors!['selectedProtelAvailability'] = 'Room Type cannot be empty'
    }
  }
}
