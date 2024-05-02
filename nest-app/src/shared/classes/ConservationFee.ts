export class ConservationFee {
  roomID: number
  item: string
  currencyName: string
  unitPrice: number
  quantity: number
  timeSpan: string
  daysOfWeek: number[]

  constructor() {
    this.roomID = 0
    this.item = ''
    this.currencyName = ''
    this.unitPrice = 0
    this.quantity = 0
    this.timeSpan = ''
    this.daysOfWeek = []
  }
}
