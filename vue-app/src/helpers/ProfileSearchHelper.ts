import { Profile } from '@/shared/classes/Profile'
import { ProfileCommunication } from '@/shared/classes/ProfileCommunication'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'

export class ProfileSearchHelper {
  convertToProfile(profileLookUpPostBody: IProfileLookUpPostBody): Profile {
    const profile = new Profile()
    if (profileLookUpPostBody.surname) profile.surname = profileLookUpPostBody.surname
    if (profileLookUpPostBody.name) profile.name = profileLookUpPostBody.name
    if (profileLookUpPostBody.email) {
      const communication = new ProfileCommunication()
      communication.communicationTypeID = 147
      communication.communicationTypeName = 'E-Mail'
      communication.value = profileLookUpPostBody.email
      communication.primary = true
      profile.communications.push(communication)
    }
    if (profileLookUpPostBody.mobile) {
      profile.phone = profileLookUpPostBody.mobile
      const communication = new ProfileCommunication()
      communication.communicationTypeID = 160
      communication.communicationTypeName = 'Mobile'
      communication.value = profileLookUpPostBody.mobile
      communication.primary = true
      profile.communications.push(communication)
    }
    if (profileLookUpPostBody.sAID) profile.sAId = profileLookUpPostBody.sAID
    if (profileLookUpPostBody.passportno) profile.passportno = profileLookUpPostBody.passportno
    if (profileLookUpPostBody.roomseekerclientcode)
      profile.roomSeekerClientCode = profileLookUpPostBody.roomseekerclientcode
    if (profileLookUpPostBody.tpmsProfileID)
      profile.tpmsProfileID = profileLookUpPostBody.tpmsProfileID
    return profile
  }
}
