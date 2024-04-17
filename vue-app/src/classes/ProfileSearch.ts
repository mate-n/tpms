import type { IProfileSearch } from '@/interfaces/profiles/IProfileSearch'

export class ProfileSearch implements IProfileSearch {
  name: string | null
  email: string | null
  city: string | null
  profileID: number | null
  guestTypeID: number | null

  constructor() {
    this.name = null
    this.email = null
    this.city = null
    this.profileID = null
    this.guestTypeID = null
  }
}
