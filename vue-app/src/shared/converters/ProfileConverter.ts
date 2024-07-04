import { CloneHelper } from '@/helpers/CloneHelper'
import { Profile } from '../classes/Profile'
import type { IProfile } from '../interfaces/profiles/IProfile'
import type { IProtelProfile } from '../interfaces/protel/IProtelProfile'

export class ProfileConverter {
  cloneHelper = new CloneHelper()
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
    profile.sAId = protelProfile.SAId
    profile.passportno = protelProfile.passportno
    profile.wildcardMembershipNumber = protelProfile.wildcardnumber
    profile.loyaltyMembershipNumber = protelProfile.loyaltynumber
    return profile
  }

  convertProfileFromAPIToProfile(profileFromAPI: any): IProfile {
    this.cloneHelper.clone(profileFromAPI)
    let profile: IProfile = new Profile()
    profile = Object.assign(profile, profileFromAPI)
    if (profileFromAPI.profileID) {
      profile.id = profileFromAPI.profileID
    }
    profile.dateofbirth = new Date(profileFromAPI.dateofbirth)
    return profile
  }
}
