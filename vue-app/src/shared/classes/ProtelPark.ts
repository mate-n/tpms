import type { IProtelPark } from '../interfaces/protel/IProtelPark'

export class ProtelPark implements IProtelPark {
  id: string
  name: string
  regionName: string

  constructor() {
    this.id = ''
    this.name = ''
    this.regionName = ''
  }
}
