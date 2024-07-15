import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import { ProtelReservation } from '../classes/ProtelReservation'
import { DateHelper } from '@/helpers/DateHelper'
import { Rate } from '../classes/Rate'
import type { IGuestsPerRoom } from '../interfaces/IGuestsPerRoom'
import { GuestsPerRoom } from '../classes/GuestsPerRoom'

export class ProtelAvailabilityConverter {
  availabilityHelper = new AvailabilityHelper()
  dateHelper = new DateHelper()

  convertToReservations(
    protelAvailabilities: IProtelAvailability[],
    guestsPerRoom: IGuestsPerRoom | undefined
  ): IProtelReservation[] {
    const protelReservations: IProtelReservation[] = []

    const availabilitiesGroupedByRoomTypeCode =
      this.availabilityHelper.groupAvailabilitiesByRoomTypeCode(protelAvailabilities)

    for (const roomTypeCode in availabilitiesGroupedByRoomTypeCode) {
      const availabilitiesWithRoomTypeCode = availabilitiesGroupedByRoomTypeCode[roomTypeCode]

      const availabilityGroupsWithConsecutiveDates =
        this.availabilityHelper.getAvailabilitiesWithConsecutiveDates(
          availabilitiesWithRoomTypeCode
        )

      for (const availabilitiesWithConsecutiveDates of availabilityGroupsWithConsecutiveDates) {
        const startProtelAvailability = availabilitiesWithConsecutiveDates.availabilities[0]
        const endProtelAvailability =
          availabilitiesWithConsecutiveDates.availabilities[
            availabilitiesWithConsecutiveDates.availabilities.length - 1
          ]

        if (!guestsPerRoom) {
          guestsPerRoom = new GuestsPerRoom()
        }

        const protelReservation = this.convertToReservation(
          startProtelAvailability,
          endProtelAvailability,
          guestsPerRoom
        )
        protelReservations.push(protelReservation)
      }
    }

    return protelReservations
  }

  convertToReservation(
    startProtelAvailability: IProtelAvailability,
    endProtelAvailability: IProtelAvailability,
    guestsPerRoom: IGuestsPerRoom
  ): IProtelReservation {
    const protelReservation: IProtelReservation = new ProtelReservation()
    protelReservation.arrivalDate = startProtelAvailability.availability_start
    protelReservation.departureDate = this.dateHelper.addDays(
      endProtelAvailability.availability_start,
      1
    )
    protelReservation.property_code = startProtelAvailability.property_code
    protelReservation.property_name = startProtelAvailability.property_name
    protelReservation.type_code = startProtelAvailability.room_type_code
    protelReservation.roomTypeCode = startProtelAvailability.room_type_code
    protelReservation.numberOfRooms = 1
    const rate = new Rate()
    rate.value = startProtelAvailability.rates_data[0].room_rate
    protelReservation.rate = rate
    protelReservation.guestsPerRoom = guestsPerRoom
    return protelReservation
  }
}
