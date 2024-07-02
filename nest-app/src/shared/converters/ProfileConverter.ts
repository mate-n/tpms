import { Profile } from '../classes/Profile'
import type { IProfile } from '../interfaces/profiles/IProfile'
import type { IProtelProfile } from '../interfaces/protel/IProtelProfile'

export class ProfileConverter {
  convertToProfile(protelProfile: IProtelProfile): IProfile {
    const profile: IProfile = new Profile()
    profile.id = protelProfile.profileID
    profile.name = protelProfile.name
    profile.surname = protelProfile.surname
    profile.email = protelProfile.email
    profile.mobile = protelProfile.mobile
    profile.dateofbirth = new Date(protelProfile.dateofbirth)
    profile.gender = protelProfile.gender
    profile.roomseekerclientcode = protelProfile.roomseekerclientcode
    profile.saIDNumber = protelProfile.SAId
    profile.passportNumber = protelProfile.passportno
    profile.wildcardMembershipNumber = protelProfile.wildcardnumber
    profile.loyaltyMembershipNumber = protelProfile.loyaltynumber
    return profile
  }
}
