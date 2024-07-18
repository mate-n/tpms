export interface IConservationFeePrices {
  camp_id: number
  adult_sa: IConservationFeePrice
  child_sa: IConservationFeePrice
  adult_sadc: IConservationFeePrice
  child_sadc: IConservationFeePrice
  adult_int: IConservationFeePrice
  child_int: IConservationFeePrice
  summary: ISummary
}

export interface IConservationFeePrice {
  count: number
  price: string
  total: number
  plankton_ticket: string
}

export interface ISummary {
  total_adult_sa: number
  total_child_sa: number
  total_adult_sadc: number
  total_child_sadc: number
  total_adult_int: number
  total_child_int: number
}
