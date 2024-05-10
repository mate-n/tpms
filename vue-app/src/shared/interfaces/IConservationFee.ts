export interface IConservationFee {
  roomID: number
  item: string
  currencyName: string
  unitPrice: number
  quantity: number
  timeSpan: string
  daysOfWeek: number[]
}
