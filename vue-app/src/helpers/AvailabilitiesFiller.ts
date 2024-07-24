import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import { AvailabilityHelper } from './AvailabilityHelper'
import { ProtelAvailability } from '@/shared/classes/ProtelAvailability'
import { DateHelper } from './DateHelper'

export class AvailabilitiesFiller {
  availabilityHelper = new AvailabilityHelper()
  dateHelper = new DateHelper()
  addAvailabilitiesOnDaysWhereThereAreNone = (
    availabilities: IProtelAvailability[],
    arrivalDate: Date,
    departureDate: Date
  ) => {
    const uniqueRoomTypeCodes = this.availabilityHelper.getUniqueRoomTypeCodes(availabilities)

    for (const roomTypeCode of uniqueRoomTypeCodes) {
      const availabilitiesByRoomTypeCode = this.availabilityHelper.getAvailabilityByRoomTypeCode(
        availabilities,
        roomTypeCode
      )

      let currentDate = new Date(arrivalDate)

      while (currentDate < departureDate) {
        const availabilitiesOnDate = this.availabilityHelper.getAvailabilitiesByDate(
          availabilitiesByRoomTypeCode,
          currentDate
        )
        if (availabilitiesOnDate.length == 0) {
          const newAvailability = new ProtelAvailability()
          newAvailability.room_type_code = roomTypeCode
          newAvailability.availability_start = currentDate
          newAvailability.availability_end = currentDate
          availabilities.push(newAvailability)
        }
        currentDate = this.dateHelper.addDays(currentDate, 1)
      }
    }
  }
}
