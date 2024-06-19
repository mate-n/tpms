import type { IReservation } from '@/shared/interfaces/IReservation'
import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '@/shared/interfaces/IValidator'
import { GuestsPerRoomHelper } from '@/helpers/GuestsPerRoomHelper'

export class ReservationValidator implements IValidator {
  private dateHelper: DateHelper = new DateHelper()
  private guestsPerRoomHelper: GuestsPerRoomHelper = new GuestsPerRoomHelper()

  validate(reservation: IReservation): void {
    reservation.errors = {}
    this.isGuestsPerRoomValid(reservation)
    this.isRoomsValid(reservation)
    this.isNightsValid(reservation)
    this.isPropertyIDValid(reservation)
    this.isProfileIDValid(reservation)
  }

  isGuestsPerRoomValid(reservation: IReservation): void {
    const numberOfGuests = this.guestsPerRoomHelper.getTotalNumberOfGuests(
      reservation.guestsPerRoom
    )
    if (numberOfGuests < 1) {
      reservation.errors!['guestsPerRoom'] = 'Guests per room cannot be less than 1'
    }
  }

  isRoomsValid(reservation: IReservation): void {
    if (reservation.numberOfRooms < 1) {
      reservation.errors!['numberOfRooms'] = 'Rooms cannot be less than 1'
    }

    for (const availability of reservation.selectedProtelAvailabilities) {
      if (availability.availability_count < reservation.numberOfRooms) {
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
}
