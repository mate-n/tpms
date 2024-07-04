import type { IGuestsPerRoom } from '../interfaces/IGuestsPerRoom'

export class GuestsPerRoom implements IGuestsPerRoom {
  numberOfAdults: number
  numberOfChildren: number
  numberOfInfants: number
  numberOfSeniors: number

  constructor() {
    this.numberOfAdults = 1
    this.numberOfChildren = 0
    this.numberOfInfants = 0
    this.numberOfSeniors = 0
  }
}
