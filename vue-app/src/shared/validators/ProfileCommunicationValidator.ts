import type { IValidator } from '../interfaces/IValidator'
import type { IProfileCommunication } from '../interfaces/profiles/IProfileCommunication'

export class ProfileCommunicationValidator implements IValidator {
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  validate(profileCommunicationToBeValidated: IProfileCommunication): void {
    profileCommunicationToBeValidated.errors = {}
    this.isEmailValid(profileCommunicationToBeValidated)
  }

  isEmailValid(profileCommunicationToBeValidated: IProfileCommunication): void {
    if (profileCommunicationToBeValidated.communicationTypeID === 147) {
      const isEmailValid = this.emailRegex.test(profileCommunicationToBeValidated.value)
      if (!isEmailValid) {
        profileCommunicationToBeValidated.errors!['value'] = 'Invalid email address'
      }
    }
  }
}
