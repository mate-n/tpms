import type { ICamp } from './ICamp'

export interface IParksAndCamps {
  'Kruger National Park': KrugerNationalPark
  'Kgalagadi Transfrontier Park': KgalagadiTransfrontierPark
}

export interface KrugerNationalPark {
  parkid: string
  camps: ICamp[]
}

export interface KgalagadiTransfrontierPark {
  parkid: string
  camps: ICamp[]
}
