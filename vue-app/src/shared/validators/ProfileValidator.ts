import type { IEntityWithErrors } from '../interfaces/IEntityWithErrors'
import type { IValidator } from '../interfaces/IValidator'
import type { IProfile } from '../interfaces/profiles/IProfile'

export class ProfileValidator implements IValidator {
  validate(profile: IProfile): void {
    profile.errors = {}
    this.isNamePresent(profile)
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
