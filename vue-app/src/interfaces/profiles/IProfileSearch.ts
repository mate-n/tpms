import type { ISearch } from '../ISearch'

export interface IProfileSearch extends ISearch {
  name: string | null
  email: string | null
  city: string | null
  profileID: number | null
  guestTypeID: number | null
}
