import type { IConservationFeePrices } from '@/shared/interfaces/IConservationFeePrices'

export class ConservationFeePricesHelper {
  isEmpty(conservationFeePrices: IConservationFeePrices): boolean {
    return (
      conservationFeePrices.adult_sa.count === 0 &&
      conservationFeePrices.child_sa.count === 0 &&
      conservationFeePrices.adult_sadc.count === 0 &&
      conservationFeePrices.child_sadc.count === 0 &&
      conservationFeePrices.adult_int.count === 0 &&
      conservationFeePrices.child_int.count === 0 &&
      conservationFeePrices.infant_sa.count === 0 &&
      conservationFeePrices.infant_sadc.count === 0 &&
      conservationFeePrices.infant_int.count === 0
    )
  }

  getTotalPrice(conservationFeePrices: IConservationFeePrices): number {
    return (
      conservationFeePrices.summary.total_adult_int +
      conservationFeePrices.summary.total_adult_sadc +
      conservationFeePrices.summary.total_adult_sa +
      conservationFeePrices.summary.total_child_int +
      conservationFeePrices.summary.total_child_sadc +
      conservationFeePrices.summary.total_child_sa
    )
  }
}
