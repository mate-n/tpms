import { DateHelper } from '@/helpers/DateHelper'
import type { IValidator } from '../interfaces/IValidator'
import type { IProtelAvailabilitySelectable } from '../interfaces/protel/IProtelAvailabilitySelectable'
import { ProtelAvailabilitiesValidator } from './ProtelAvailabilitiesValidator'

export class ProtelAvailabilitiesSelecterValidator implements IValidator {
  dateHelper = new DateHelper()
  availabilitiesValidator = new ProtelAvailabilitiesValidator()

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
    if (this.availabilitiesValidator.isDateValid(availability)) {
      errors!['availability_start'] = this.availabilitiesValidator.isDateValid(availability)
    }
  }

  isRateValid({ availability, errors }: IProtelAvailabilitySelectable): void {
    if (this.availabilitiesValidator.isRateValid(availability)) {
      errors!['rates_data'] = this.availabilitiesValidator.isRateValid(availability)
    }
  }

  isAvailabilityCountValid({ availability, errors }: IProtelAvailabilitySelectable): void {
    if (this.availabilitiesValidator.isAvailabilityCountValid(availability)) {
      errors!['availability_count'] =
        this.availabilitiesValidator.isAvailabilityCountValid(availability)
    }
  }
}
