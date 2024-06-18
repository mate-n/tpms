import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import { DateHelper } from './DateHelper'

export class AvailabilityHelper {
  dateHelper = new DateHelper()
  getUniqueRoomTypeNames(availabilities: IProtelAvailability[]) {
    const uniqueRooms = new Set<string>()
    availabilities.forEach((availability) => {
      uniqueRooms.add(availability.room_type_name)
    })
    return uniqueRooms
  }

  getAvailabilityByRoomTypeNameAndByDate(
    availabilities: IProtelAvailability[],
    roomTypeName: string,
    date: Date
  ) {
    return availabilities.find(
      (availability) =>
        availability.room_type_name === roomTypeName &&
        this.dateHelper.isSameDay(availability.availability_start, date)
    )
  }

  convertToAvailability(availability: IProtelAvailability) {
    availability.date_time = new Date(availability.date_time)
    availability.availability_start = new Date(availability.availability_start)
    availability.availability_end = new Date(availability.availability_end)
  }
}
