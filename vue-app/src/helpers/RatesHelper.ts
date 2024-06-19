import type { IGuestsPerRoom } from '@/shared/interfaces/IGuestsPerRoom'
import type { IRatesData } from '@/shared/interfaces/protel/IRatesData'

export class RatesHelper {
  calculateActualRate(ratesData: IRatesData, guestsPerRoom: IGuestsPerRoom) {
    let actualRate = 0
    const occupantUnits = Math.ceil(guestsPerRoom.numberOfAdults / ratesData.occupancy)
    actualRate += parseFloat(ratesData.room_rate) * occupantUnits
    actualRate += ratesData.add_on_child1 * guestsPerRoom.numberOfChildren
    return actualRate
  }
}
