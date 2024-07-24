import type { IConservationFeePrice } from '../interfaces/IConservationFeePrices'

export class ConservationFeePrice implements IConservationFeePrice {
  count: number
  price: string
  total: number
  plankton_ticket: string

  constructor() {
    this.count = 0
    this.price = ''
    this.total = 0
    this.plankton_ticket = ''
  }
}
