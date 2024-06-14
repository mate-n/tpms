import type { IProfileMembershipCard } from '../interfaces/profiles/IProfileMembershipCard'

export class ProfileMembershipCard implements IProfileMembershipCard {
  membershipName: string
  cardNumber: number

  constructor() {
    this.membershipName = ''
    this.cardNumber = 0
  }
}
