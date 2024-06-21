import type { ICamp } from './ICamp'

export interface IParksAndCamps {
  'Kruger National Park': KrugerNationalPark
  'Kgalagadi Transfrontier Park': KgalagadiTransfrontierPark
}

export interface KrugerNationalPark {
  parknid: string
  camps: ICamp[]
}

export interface KgalagadiTransfrontierPark {
  parknid: string
  camps: ICamp[]
}
