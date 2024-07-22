import type { IAdultsAndChildren } from '../interfaces/IAdultsAndChildren'

export class AdultsAndChildren implements IAdultsAndChildren {
  adults: number
  children: number
  infants: number

  constructor() {
    this.adults = 0
    this.children = 0
    this.infants = 0
  }
}
