import { Profile } from '@/shared/classes/Profile'
import { ProfileCommunication } from '@/shared/classes/ProfileCommunication'
import { ProfileMembershipCard } from '@/shared/classes/ProfileMembership'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'

export class ProfileSearchHelper {
  convertToProfile(profileSearch: IProfileSearch): IProfile {
    const profile = new Profile()
    if (profileSearch.surName) profile.lastName = profileSearch.surName
    if (profileSearch.firstName) profile.firstName = profileSearch.firstName
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
    if (profileSearch.loyaltyMembershipNumber) {
      const loyaltyMembership = new ProfileMembershipCard()
      loyaltyMembership.membershipName = 'Loyalty'
      loyaltyMembership.cardNumber = profileSearch.loyaltyMembershipNumber
      profile.membershipCards.push(loyaltyMembership)
    }
    if (profileSearch.wildcardMembershipNumber) {
      const wildcardmembership = new ProfileMembershipCard()
      wildcardmembership.membershipName = 'Wildcard'
      wildcardmembership.cardNumber = profileSearch.wildcardMembershipNumber
      profile.membershipCards.push(wildcardmembership)
    }

    return profile
  }
}
