import type { IValidator } from '../interfaces/IValidator'
import type { IProfile } from '../interfaces/profiles/IProfile'
import { LuhnAlgorithmValidator } from './LuhnAlgorithmValidator'

export class ProfileValidator implements IValidator {
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  luhnAlgorithmHelper = new LuhnAlgorithmValidator()
  validate(profile: IProfile): void {
    profile.errors = {}
    this.isNamePresent(profile)
    this.isEmailOrMobilePresent(profile)
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

  isEmailOrMobilePresent(profile: IProfile): void {
    if (!profile.email && !profile.mobile) {
      profile.errors!['email'] = 'Email or Mobile is required'
      profile.errors!['mobile'] = 'Email or Mobile is required'
    }

    if (profile.email) {
      this.isEmailValid(profile)
    }

    if (profile.mobile) {
      this.isMobilePresent(profile)
    }
  }

  isEmailValid(profile: IProfile): void {
    if (!profile.email) {
      profile.errors!['email'] = 'Email is required'
    }

    if (profile.email) {
      const isEmailValid = this.emailRegex.test(profile.email)
      if (!isEmailValid) {
        profile.errors!['email'] = 'Invalid email address'
      }
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
      if (!profile.SAId) {
        profile.errors!['sAId'] = 'SA ID Number is required'
      } else {
        if (!this.isSAIDValid(profile.SAId)) {
          profile.errors!['sAId'] = 'SAID is invalid'
        }
      }
    }
  }

  isSAIDValid(said: string): boolean {
    return this.luhnAlgorithmHelper.luhnCheck(said)
  }

  isBirthdatePresent(profile: IProfile): void {
    if (profile.countryofbirth === 'ZA') {
      if (!profile.dateofbirth) {
        profile.errors!['dateofbirth'] = 'Date of Birth is required'
      }
    }
  }
}
