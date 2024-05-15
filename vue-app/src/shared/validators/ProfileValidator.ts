import type { IEntityWithErrors } from '../interfaces/IEntityWithErrors'
import type { IValidator } from '../interfaces/IValidator'
import type { IProfile } from '../interfaces/profiles/IProfile'

export class ProfileValidator implements IValidator {
  validate(profile: IProfile): void {
    profile.errors = {}
    this.isNamePresent(profile)
  }
  validatePromise(objectToBeValidated: IEntityWithErrors): Promise<void> {
    throw new Error('Method not implemented.')
  }

  isNamePresent(profile: IProfile): void {
    if (profile.profileType === 'Private') {
      if (!profile.lastName) {
        profile.errors!['lastName'] = 'Last name is required'
      }
    } else {
      if (!profile.name) {
        profile.errors!['name'] = 'Name is required'
      }
    }
  }
}
