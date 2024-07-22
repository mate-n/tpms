import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '../interfaces/IValidator'
import type { IProtelAvailabilitySelectable } from '../interfaces/protel/IProtelAvailabilitySelectable'

export class ProtelAvailabilitiesSelecterValidator implements IValidator {
  dateHelper = new DateHelper()

  validate(availabilitySelectable: IProtelAvailabilitySelectable): void {
    availabilitySelectable.errors = {}
    this.isDateValid(availabilitySelectable)
    this.isRateValid(availabilitySelectable)
    this.isAvailabilityCountValid(availabilitySelectable)

    if (
      !availabilitySelectable.errors?.['rates_data'] &&
      !availabilitySelectable.errors?.['availability_start'] &&
      !availabilitySelectable.errors?.['availability_count']
    ) {
      availabilitySelectable.selectable = true
    } else {
      availabilitySelectable.selectable = false
    }
  }

  isDateValid({ availability, errors }: IProtelAvailabilitySelectable): void {
    const tomorrow = this.dateHelper.addDays(this.dateHelper.getTodayDate(), 1)

    if (!availability?.availability_start) {
      errors!['availability_start'] = 'availability_start is required'
    } else if (this.dateHelper.isAfter(tomorrow, availability.availability_start)) {
      errors!['availability_start'] = 'availability_start is not a day in future'
    }
  }

  isRateValid({ availability, errors }: IProtelAvailabilitySelectable): void {
    if (!availability?.rates_data?.[0]?.room_rate) {
      errors!['rates_data'] = 'rates_data is required'
    }
  }

  isAvailabilityCountValid({ availability, errors }: IProtelAvailabilitySelectable): void {
    if (!availability?.availability_count) {
      errors!['availability_count'] = 'availability_count is required'
    } else if (String(availability.availability_count) === '0') {
      errors!['availability_count'] = "availability_count is '0'"
    }
  }
}
