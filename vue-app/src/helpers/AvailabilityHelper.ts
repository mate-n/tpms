import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
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

  getUniqueRoomTypeCodes(availabilities: IProtelAvailability[]) {
    const uniqueCodes = new Set<string>()
    availabilities.forEach((availability) => {
      if (availability.room_type_code) {
        uniqueCodes.add(availability.room_type_code)
      }
    })
    return uniqueCodes
  }

  getAvailabilityByRoomTypeCode(availabilities: IProtelAvailability[], roomTypeCode: string) {
    return availabilities.filter((availability) => availability.room_type_code === roomTypeCode)
  }

  getAvailabilityByRoomTypeCodeAndByDate(
    availabilities: IProtelAvailability[],
    roomTypeCode: string,
    date: Date
  ) {
    return availabilities.find(
      (availability) =>
        availability.room_type_name === roomTypeCode &&
        this.dateHelper.isSameDay(availability.availability_start, date)
    )
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

  groupAvailabilitiesByRoomType(availabilities: IProtelAvailability[]) {
    const groupedAvailabilities: { [key: string]: IProtelAvailability[] } = {}
    availabilities.forEach((availability) => {
      const key = availability.room_type_name
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

  sortByAvailabilityStart(availabilitiesInput: IProtelAvailability[]): IProtelAvailability[] {
    return availabilitiesInput.sort((a, b) => {
      return new Date(a.availability_start).getTime() - new Date(b.availability_start).getTime()
    })
  }

  getAvailabilitiesWithConsecutiveDates(
    availabilitiesInput: IProtelAvailability[]
  ): IAvailabilitiesInGroup[] {
    const consecutiveAvailabilityGroups: IAvailabilitiesInGroup[] = []

    const availabilitiesSortedByAvailabilityStart =
      this.sortByAvailabilityStart(availabilitiesInput)

    const availabilityGroup: IAvailabilitiesInGroup = {
      availabilities: [availabilitiesSortedByAvailabilityStart[0]]
    }

    for (let i = 1; i < availabilitiesSortedByAvailabilityStart.length; i++) {
      const previousAvailability = availabilitiesInput[i - 1]
      const currentAvailability = availabilitiesInput[i]

      if (
        this.dateHelper.isSameDay(
          this.dateHelper.addDays(previousAvailability.availability_start, 1),
          currentAvailability.availability_start
        )
      ) {
        availabilityGroup.availabilities.push(currentAvailability)
      } else {
        consecutiveAvailabilityGroups.push({ ...availabilityGroup })
        availabilityGroup.availabilities = [currentAvailability]
      }
    }
    consecutiveAvailabilityGroups.push({ ...availabilityGroup })

    return consecutiveAvailabilityGroups
  }

  getConsecutiveAvailabilitiesOnDate(availabilitiesInput: IProtelAvailability[], dateInput: Date) {
    const availabilities: IProtelAvailability[] = []
    const availabilityOnSameDay = availabilitiesInput.find((availability) =>
      this.dateHelper.isSameDay(availability.availability_start, dateInput)
    )
    if (availabilityOnSameDay) {
      availabilities.push(availabilityOnSameDay)
    } else {
      return []
    }

    let currentDate = new Date(dateInput)

    while (this.isThereAnAvailabilityOnTheDayBefore(availabilitiesInput, currentDate)) {
      const availability = availabilitiesInput.find((availability) =>
        this.dateHelper.isSameDay(
          availability.availability_start,
          this.dateHelper.addDays(currentDate, -1)
        )
      )
      if (availability) {
        availabilities.unshift(availability)
        currentDate = this.dateHelper.addDays(currentDate, -1)
      } else {
        break
      }
    }

    currentDate = new Date(dateInput)

    while (this.isThereAnAvailabilityOnTheDayAfter(availabilitiesInput, currentDate)) {
      const availability = availabilitiesInput.find((availability) =>
        this.dateHelper.isSameDay(
          availability.availability_start,
          this.dateHelper.addDays(currentDate, 1)
        )
      )
      if (availability) {
        availabilities.push(availability)
        currentDate = this.dateHelper.addDays(currentDate, 1)
      } else {
        break
      }
    }

    return availabilities
  }

  isThereAnAvailabilityOnTheDayBefore = (availabilities: IProtelAvailability[], date: Date) => {
    const dayBefore = this.dateHelper.addDays(date, -1)
    return availabilities.some((availability) =>
      this.dateHelper.isSameDay(availability.availability_start, dayBefore)
    )
  }

  isThereAnAvailabilityOnTheDayAfter = (availabilities: IProtelAvailability[], date: Date) => {
    const dayAfter = this.dateHelper.addDays(date, 1)
    return availabilities.some((availability) =>
      this.dateHelper.isSameDay(availability.availability_start, dayAfter)
    )
  }

  mapPostBody = (data: {
    camp: IProtelCamp;
    departureDate: Date;
    arrivalDate: Date;
    roomTypeCode?: string;
  }) => {
    const protelAvailabilityPostBody: IProtelAvailabilityPostBody = {
      arrivaldate: this.dateFormatter.yyyydashmmdashdd(data.arrivalDate),
      departuredate: this.dateFormatter.yyyydashmmdashdd(data.departureDate),
      roomtype: data.roomTypeCode || 'null',
      propertyid: `${data.camp.id}`,
      detail: '0',
      accomodation_type: null,
    };
    return protelAvailabilityPostBody;
  }
}

interface IAvailabilitiesInGroup {
  availabilities: IProtelAvailability[]
}
