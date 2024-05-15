import type { IValidator } from '../interfaces/IValidator'
import type { IProfileAddress } from '../interfaces/profiles/IProfileAddress'

export class ProfileAddressValidator implements IValidator {
  validate(profileAddressToBeValidated: IProfileAddress): void {
    profileAddressToBeValidated.errors = {}
    this.isTypeStringValid(profileAddressToBeValidated)
    this.isCountryValid(profileAddressToBeValidated)
  }

  isTypeStringValid(profileAddressToBeValidated: IProfileAddress): void {
    if (profileAddressToBeValidated.typeString === '') {
      profileAddressToBeValidated.errors!['typeString'] = 'Type cannot be empty'
    }
  }

  isCountryValid(profileAddressToBeValidated: IProfileAddress): void {
    if (profileAddressToBeValidated.country === '') {
      profileAddressToBeValidated.errors!['country'] = 'Country cannot be empty'
    }
  }
}
