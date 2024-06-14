import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'

export class ProfileSearchHelper {
  convertToProfile(profileSearch: IProfileSearch): IProfile {
    const profile = new Profile()
    if (profileSearch.surName) profile.lastName = profileSearch.surName
    if (profileSearch.firstName) profile.firstName = profileSearch.firstName
    if (profileSearch.email) profile.email = profileSearch.email
    if (profileSearch.mobile) profile.phone = profileSearch.mobile
    if (profileSearch.saIDNumber) profile.saIDNumber = profileSearch.saIDNumber
    if (profileSearch.passportNumber) profile.passportNumber = profileSearch.passportNumber
    if (profileSearch.roomSeekerClientCode)
      profile.roomSeekerClientCode = profileSearch.roomSeekerClientCode
    if (profileSearch.tpmsProfileID) profile.tpmsProfileID = profileSearch.tpmsProfileID
    if (profileSearch.loyaltyMembershipNumber)
      profile.loyaltyMembershipNumber = profileSearch.loyaltyMembershipNumber
    if (profileSearch.wildcardMembershipNumber)
      profile.wildcardMembershipNumber = profileSearch.wildcardMembershipNumber
    return profile
  }
}
