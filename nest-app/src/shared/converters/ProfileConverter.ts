import { Profile } from '../classes/Profile'
import type { IProfile } from '../interfaces/profiles/IProfile'
import type { IProtelProfile } from '../interfaces/protel/IProtelProfile'

export class ProfileConverter {
  convertToProfile(protelProfile: IProtelProfile): IProfile {
    const profile: IProfile = new Profile()
    profile.id = protelProfile.profileID
    profile.firstName = protelProfile.name
    profile.lastName = protelProfile.surname
    profile.email = protelProfile.email
    profile.phone = protelProfile.mobile
    profile.birthday = new Date(protelProfile.dateofbirth)
    profile.gender = protelProfile.gender
    profile.roomSeekerClientCode = protelProfile.roomseekerclientcode
    profile.saIDNumber = protelProfile.SAId
    profile.passportNumber = protelProfile.passportno
    profile.birthCountry = protelProfile.countryofbirth
    profile.wildcardMembershipNumber = protelProfile.wildcardnumber
    profile.loyaltyMembershipNumber = protelProfile.loyaltynumber
    return profile
  }
}
