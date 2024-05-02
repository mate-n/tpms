import type { ISearch } from '../ISearch'

export interface IProfileSearch extends ISearch {
  name?: string
  email?: string
  city?: string
  profileID?: number
  guestTypeID?: number
}
