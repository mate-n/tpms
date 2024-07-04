import type { IValidator } from '../interfaces/IValidator'
import type { IProfile } from '../interfaces/profiles/IProfile'
import { LuhnAlgorithmValidator } from './LuhnAlgorithmValidator'

export class ProfileValidator implements IValidator {
  luhnAlgorithmHelper = new LuhnAlgorithmValidator()
  validate(profile: IProfile): void {
    profile.errors = {}
    this.isNamePresent(profile)
    this.isEmailPresent(profile)
    this.isMobilePresent(profile)
    this.isNationalityPresent(profile)
    this.isBirthdatePresent(profile)
  }

  isNamePresent(profile: IProfile): void {
    if (profile.profileType === 'Private') {
      if (!profile.surname) {
        profile.errors!['surname'] = 'Last name is required'
      }
      if (!profile.name) {
        profile.errors!['name'] = 'Name is required'
      }
    } else {
      if (!profile.name) {
        profile.errors!['name'] = 'Name is required'
      }
    }
  }

  isEmailPresent(profile: IProfile): void {
    if (!profile.email) {
      profile.errors!['email'] = 'Email is required'
    }
  }

  isMobilePresent(profile: IProfile): void {
    if (!profile.mobile) {
      profile.errors!['mobile'] = 'Mobile is required'
    }
  }

  isNationalityPresent(profile: IProfile): void {
    if (!profile.countryofbirth) {
      profile.errors!['countryofbirth'] = 'Nationality is required'
    }
    if (profile.countryofbirth === 'ZA') {
      if (!profile.sAId) {
        profile.errors!['sAId'] = 'SA ID Number is required'
      } else {
        if (!this.isSAIDValid(profile.sAId)) {
          profile.errors!['sAId'] = 'SAID is invalid'
        }
      }
    }
  }

  isSAIDValid(said: string): boolean {
    return this.luhnAlgorithmHelper.luhnCheck(said)
  }

  isBirthdatePresent(profile: IProfile): void {
    if (!profile.dateofbirth) {
      profile.errors!['dateofbirth'] = 'Date of Birth is required'
    }
  }
}
