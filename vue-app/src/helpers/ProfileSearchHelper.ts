import { Profile } from '@/shared/classes/Profile'
import { ProfileCommunication } from '@/shared/classes/ProfileCommunication'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'

export class ProfileSearchHelper {
  convertToProfile(profileSearch: IProfileSearch): Profile {
    const profile = new Profile()
    if (profileSearch.surname) profile.surname = profileSearch.surname
    if (profileSearch.name) profile.name = profileSearch.name
    if (profileSearch.email) {
      const communication = new ProfileCommunication()
      communication.communicationTypeID = 147
      communication.communicationTypeName = 'E-Mail'
      communication.value = profileSearch.email
      communication.primary = true
      profile.communications.push(communication)
    }
    if (profileSearch.mobile) {
      profile.phone = profileSearch.mobile
      const communication = new ProfileCommunication()
      communication.communicationTypeID = 160
      communication.communicationTypeName = 'Mobile'
      communication.value = profileSearch.mobile
      communication.primary = true
      profile.communications.push(communication)
    }
    if (profileSearch.saIDNumber) profile.saIDNumber = profileSearch.saIDNumber
    if (profileSearch.passportNumber) profile.passportNumber = profileSearch.passportNumber
    if (profileSearch.roomSeekerClientCode)
      profile.roomSeekerClientCode = profileSearch.roomSeekerClientCode
    if (profileSearch.tpmsProfileID) profile.tpmsProfileID = profileSearch.tpmsProfileID
    return profile
  }
}
