import type { IValidator } from '../interfaces/IValidator'
import type { IProfileAddress } from '../interfaces/profiles/IProfileAddress'

export class ProfileAddressValidator implements IValidator {
  validate(objectToBeValidated: IProfileAddress): void {
    console.log(objectToBeValidated)
    throw new Error('Method not implemented.')
  }
}
