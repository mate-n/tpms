import { ConservationFeePrices } from '../classes/ConservationFeePrices'
import type { IConservationFeePrices } from '../interfaces/IConservationFeePrices'

export class ConservationFeePricesConverter {
  convertToConservationFeePrice(
    conservationFeePriceInput: IConservationFeePrices
  ): IConservationFeePrices {
    let conservationFeePrice: IConservationFeePrices = new ConservationFeePrices()
    conservationFeePrice = Object.assign(conservationFeePrice, conservationFeePriceInput)
    if (conservationFeePriceInput.arrivalDate) {
      conservationFeePrice.arrivalDate = new Date(conservationFeePriceInput.arrivalDate)
    }
    if (conservationFeePriceInput.departureDate) {
      conservationFeePrice.departureDate = new Date(conservationFeePriceInput.departureDate)
    }
    return conservationFeePrice
  }
}
