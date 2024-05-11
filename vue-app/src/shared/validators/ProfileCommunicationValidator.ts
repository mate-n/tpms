import { CommunicationMethodService } from '@/services/CommunicationMethodService'
import type { IValidator } from '../interfaces/IValidator'
import type { IProfileCommunication } from '../interfaces/profiles/IProfileCommunication'

export class ProfileCommunicationValidator implements IValidator {
  communicationMethodService = new CommunicationMethodService()

  validatePromise(profileCommunicationToBeValidated: IProfileCommunication): Promise<void> {
    return new Promise((finalResolve) => {
      profileCommunicationToBeValidated.errors = {}
      this.isEmailValidPromise(profileCommunicationToBeValidated).then(() => {
        finalResolve()
      })
    })
  }

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

  isEmailValidPromise(profileCommunicationToBeValidated: IProfileCommunication): Promise<void> {
    return new Promise((finalResolve) => {
      if (profileCommunicationToBeValidated.communicationTypeID) {
        this.communicationMethodService
          .get(profileCommunicationToBeValidated.communicationTypeID)
          .then((communicationMethods) => {
            console.log(communicationMethods)
          })
      }

      if (profileCommunicationToBeValidated.communicationTypeID === 147) {
        const isEmailValid = this.emailRegex.test(profileCommunicationToBeValidated.value)
        if (!isEmailValid) {
          profileCommunicationToBeValidated.errors!['value'] = 'Invalid email address'
        }
      }
      finalResolve()
    })
  }
}
