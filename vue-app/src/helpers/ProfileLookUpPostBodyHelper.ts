import { Profile } from '@/shared/classes/Profile'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'

export class ProfileLookUpPostBodyHelper {
  convertToProfile(profileLookUpPostBody: IProfileLookUpPostBody): Profile {
    const profile = new Profile()
    if (profileLookUpPostBody.surname) profile.surname = profileLookUpPostBody.surname
    if (profileLookUpPostBody.name) profile.name = profileLookUpPostBody.name
    if (profileLookUpPostBody.email) profile.email = profileLookUpPostBody.email
    if (profileLookUpPostBody.mobile) profile.mobile = profileLookUpPostBody.mobile
    if (profileLookUpPostBody.sAID) profile.sAId = profileLookUpPostBody.sAID
    if (profileLookUpPostBody.passportno) profile.passportno = profileLookUpPostBody.passportno
    if (profileLookUpPostBody.wildcardnumber)
      profile.wildcardnumber = profileLookUpPostBody.wildcardnumber
    if (profileLookUpPostBody.loyaltynumber)
      profile.loyaltynumber = profileLookUpPostBody.loyaltynumber
    if (profileLookUpPostBody.roomseekerclientcode)
      profile.roomSeekerClientCode = profileLookUpPostBody.roomseekerclientcode
    if (profileLookUpPostBody.profileID) profile.tpmsProfileID = profileLookUpPostBody.profileID
    return profile
  }
}
