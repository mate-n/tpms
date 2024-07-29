import { DateHelper } from '@/helpers/DateHelper'
import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'

export class ProtelAvailabilitiesValidator {
  dateHelper = new DateHelper()

  validate(availability: IProtelAvailability) {
    return (
      this.isDateValid(availability) ||
      this.isRateValid(availability) ||
      this.isAvailabilityCountValid(availability)
    )
  }

  isDateValid(availability: IProtelAvailability) {
    const tomorrow = this.dateHelper.addDays(this.dateHelper.getTodayDate(), 1)

    if (!availability?.availability_start) {
      return 'availability_start is required'
    } else if (this.dateHelper.isAfter(tomorrow, availability.availability_start)) {
      return 'availability_start is not a day in future'
    }

    return ''
  }

  isRateValid(availability: IProtelAvailability) {
    if (!availability?.rates_data?.[0]?.room_rate) {
      return 'rates_data is required'
    }

    return ''
  }

  isAvailabilityCountValid(availability: IProtelAvailability) {
    if (!availability?.availability_count) {
      return 'availability_count is required'
    } else if (String(availability.availability_count) === '0') {
      return "availability_count is '0'"
    }

    return ''
  }
}
