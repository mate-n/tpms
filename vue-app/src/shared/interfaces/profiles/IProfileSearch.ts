import type { ISearch } from '../ISearch'

export interface IProfileSearch extends ISearch {
  name?: string
  surname?: string
  email?: string
  mobile?: string
  saIDNumber?: number
  guestTypeID?: number
  passportNumber?: number
  roomSeekerClientCode?: string
  tpmsProfileID?: number
  loyaltyMembershipNumber?: number
  wildcardMembershipNumber?: number
}
