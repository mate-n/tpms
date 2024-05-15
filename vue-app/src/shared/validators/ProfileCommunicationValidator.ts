import type { IValidator } from '../interfaces/IValidator'
import type { IProfileCommunication } from '../interfaces/profiles/IProfileCommunication'

export class ProfileCommunicationValidator implements IValidator {
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  validate(profileCommunicationToBeValidated: IProfileCommunication): void {
    profileCommunicationToBeValidated.errors = {}
    this.isValueEmpty(profileCommunicationToBeValidated)
    this.isEmailValid(profileCommunicationToBeValidated)
  }

  isValueEmpty(profileCommunicationToBeValidated: IProfileCommunication): void {
    if (profileCommunicationToBeValidated.value === '') {
      profileCommunicationToBeValidated.errors!['value'] = 'Value cannot be empty'
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
