import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import { DateHelper } from './DateHelper'
import { DateFormatter } from './DateFormatter'

export class AvailabilityHelper {
  dateFormatter = new DateFormatter()
  dateHelper = new DateHelper()
  getUniqueRoomTypeNames(availabilities: IProtelAvailability[]) {
    const uniqueRooms = new Set<string>()
    availabilities.forEach((availability) => {
      uniqueRooms.add(availability.room_type_name)
    })
    return uniqueRooms
  }

  getAvailabilityByRoomTypeName(availabilities: IProtelAvailability[], roomTypeName: string) {
    return availabilities.filter((availability) => availability.room_type_name === roomTypeName)
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

  getAvailabilitiesByDate(availabilities: IProtelAvailability[], date: Date) {
    return availabilities.filter((availability) =>
      this.dateHelper.isSameDay(availability.availability_start, date)
    )
  }

  groupAvailabilitiesByDate(availabilities: IProtelAvailability[]) {
    const groupedAvailabilities: { [key: string]: IProtelAvailability[] } = {}
    availabilities.forEach((availability) => {
      const key = this.dateFormatter.dddotmmdotyyyy(availability.availability_start)
      if (!groupedAvailabilities[key]) {
        groupedAvailabilities[key] = []
      }
      groupedAvailabilities[key].push(availability)
    })
    return groupedAvailabilities
  }

  convertToAvailability(availability: IProtelAvailability) {
    if (availability) {
      availability.date_time = new Date(availability.date_time)
      availability.availability_start = new Date(availability.availability_start)
      availability.availability_end = new Date(availability.availability_end)
    }
  }

  getTotalOfAvailabilityCount(availabilities: IProtelAvailability[]) {
    let total = 0
    availabilities.forEach((availability) => {
      total += +availability.availability_count
    })
    return total
  }
}
