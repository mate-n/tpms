import type { IRatesData } from '../interfaces/protel/IRatesData'

export class RatesData implements IRatesData {
  rates_code: string
  occupancy: number
  room_rate: string
  add_on_child1: number

  constructor() {
    this.rates_code = ''
    this.occupancy = 0
    this.room_rate = '0'
    this.add_on_child1 = 0
  }
}
