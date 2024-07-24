import type { IRate } from '../interfaces/IRate'

export class Rate implements IRate {
  id: number
  value: string
  isDefault: boolean
  confidential: boolean

  constructor() {
    this.id = 0
    this.value = ''
    this.isDefault = false
    this.confidential = false
  }
}
