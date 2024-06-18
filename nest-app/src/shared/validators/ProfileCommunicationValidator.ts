import type { IValidator } from '../interfaces/IValidator'
import type { IProfileCommunication } from '../interfaces/profiles/IProfileCommunication'

export class ProfileCommunicationValidator implements IValidator {
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  validate(profileCommunicationToBeValidated: IProfileCommunication): void {
    profileCommunicationToBeValidated.errors = {}
    this.isValueValid(profileCommunicationToBeValidated)
    this.isEmailValid(profileCommunicationToBeValidated)
    this.isCommunicationTypeIDValid(profileCommunicationToBeValidated)
  }

  isValueValid(profileCommunicationToBeValidated: IProfileCommunication): void {
    if (profileCommunicationToBeValidated.value === '') {
      profileCommunicationToBeValidated.errors!['value'] = 'Value cannot be empty'
    }
  }

  isCommunicationTypeIDValid(profileCommunicationToBeValidated: IProfileCommunication): void {
    if (profileCommunicationToBeValidated.communicationTypeID === undefined) {
      profileCommunicationToBeValidated.errors!['communicationTypeID'] =
        'Communication type cannot be empty'
    }
  }

  isEmailValid(profileCommunicationToBeValidated: IProfileCommunication): void {
    if (profileCommunicationToBeValidated.communicationTypeName === 'E-Mail') {
      const isEmailValid = this.emailRegex.test(profileCommunicationToBeValidated.value)
      if (!isEmailValid) {
        profileCommunicationToBeValidated.errors!['value'] = 'Invalid email address'
      }
    }
  }
}
