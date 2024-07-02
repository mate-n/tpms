import type { IValidator } from '../interfaces/IValidator'
import type { IProfile } from '../interfaces/profiles/IProfile'

export class ProfileValidator implements IValidator {
  validate(profile: IProfile): void {
    profile.errors = {}
    this.isNamePresent(profile)
    this.isEmailPresent(profile)
    this.isTelephonePresent(profile)
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

  isTelephonePresent(profile: IProfile): void {
    if (!profile.telephone) {
      profile.errors!['telephone'] = 'Telephone is required'
    }
  }

  isNationalityPresent(profile: IProfile): void {
    if (!profile.nationality) {
      profile.errors!['nationality'] = 'Nationality is required'
    }

    if (profile.nationality === 'ZA') {
      if (!profile.saIDNumber) {
        profile.errors!['saIDNumber'] = 'SA ID Number is required'
      }
    }
  }

  isBirthdatePresent(profile: IProfile): void {
    console.log('profile.dateofbirth', profile.dateofbirth)
    if (!profile.dateofbirth) {
      profile.errors!['dateofbirth'] = 'Date of Birth is required'
    }
  }
}
