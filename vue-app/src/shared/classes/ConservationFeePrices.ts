import type {
  IConservationFeePrice,
  IConservationFeePrices,
  ISummary
} from '../interfaces/IConservationFeePrices'
import { ConservationFeePrice } from './ConservationFeePrice'

export class ConservationFeePrices implements IConservationFeePrices {
  camp_id: number
  adult_sa: IConservationFeePrice
  child_sa: IConservationFeePrice
  adult_sadc: IConservationFeePrice
  child_sadc: IConservationFeePrice
  adult_int: IConservationFeePrice
  child_int: IConservationFeePrice
  infant_sa: IConservationFeePrice
  infant_sadc: IConservationFeePrice
  infant_int: IConservationFeePrice
  summary: ISummary
  arrivalDate: Date
  departureDate: Date

  constructor() {
    this.camp_id = 0
    this.adult_sa = new ConservationFeePrice()
    this.child_sa = new ConservationFeePrice()
    this.adult_sadc = new ConservationFeePrice()
    this.child_sadc = new ConservationFeePrice()
    this.adult_int = new ConservationFeePrice()
    this.child_int = new ConservationFeePrice()
    this.infant_sa = new ConservationFeePrice()
    this.infant_sadc = new ConservationFeePrice()
    this.infant_int = new ConservationFeePrice()
    this.summary = {
      total_adult_sa: 0,
      total_child_sa: 0,
      total_adult_sadc: 0,
      total_child_sadc: 0,
      total_adult_int: 0,
      total_child_int: 0
    }
    this.arrivalDate = new Date()
    this.departureDate = new Date()
  }
}
