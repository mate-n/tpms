import { DateHelper } from '@/helpers/DateHelper'
import { Reservation } from '../classes/Reservation'
import type { IReservation } from '../interfaces/IReservation'
import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'

export class ReservationConverter {
  dateHelper = new DateHelper()

  convertToReservations(availabilities: IProtelAvailability[]) {
    const groupAvailabilitiesByRoomType = this.groupAvailabilitiesByRoomTypeCode(availabilities)
    const reservations: IReservation[] = []

    for (const roomType in groupAvailabilitiesByRoomType) {
      const availabilitiesSortedByDate = this.sortAvailabilitiesByAvailabilityStart(
        groupAvailabilitiesByRoomType[roomType]
      )

      const availability = availabilitiesSortedByDate[0]
      const reservation: IReservation = new Reservation()
      reservation.roomTypeCode = availability.room_type_code
      reservation.arrivalDate = availability.availability_start
      reservation.departureDate = availability.availability_end
      reservation.numberOfRooms = availability.availability_count
      reservation.propertyID = parseInt(availability.property_code)
      reservations.push(reservation)
    }

    return reservations
  }

  isThereAvailabilityOnNextDay(
    availability: IProtelAvailability,
    availabilities: IProtelAvailability[]
  ) {
    const nextDay = new Date(availability.availability_start)
    nextDay.setDate(nextDay.getDate() + 1)
    return availabilities.some((availability) => {
      return this.dateHelper.isSameDay(availability.availability_start, nextDay)
    })
  }

  sortAvailabilitiesByAvailabilityStart(availabilities: IProtelAvailability[]) {
    return availabilities.sort((a, b) => {
      return new Date(a.availability_start).getTime() - new Date(b.availability_start).getTime()
    })
  }

  groupAvailabilitiesByRoomTypeCode(availabilities: IProtelAvailability[]) {
    const groupedAvailabilities: { [key: string]: IProtelAvailability[] } = {}
    availabilities.forEach((availability) => {
      const key = availability.room_type_code
      if (!groupedAvailabilities[key]) {
        groupedAvailabilities[key] = []
      }
      groupedAvailabilities[key].push(availability)
    })
    return groupedAvailabilities
  }
}
