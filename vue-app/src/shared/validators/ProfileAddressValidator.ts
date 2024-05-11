import type { IValidator } from '../interfaces/IValidator'
import type { IProfileAddress } from '../interfaces/profiles/IProfileAddress'

export class ProfileAddressValidator implements IValidator {
  validatePromise(objectToBeValidated: IProfileAddress): Promise<void> {
    throw new Error('Method not implemented.')
  }
  validate(objectToBeValidated: IProfileAddress): void {
    throw new Error('Method not implemented.')
  }
}
