import type { IGuestsPerRoom } from '../interfaces/IGuestsPerRoom'
import type { ITicket } from '../interfaces/ITicket'
import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityGroup } from '../interfaces/protel/IProtelAvailabilityGroup'
import { GuestsPerRoom } from './GuestsPerRoom'

export class ProtelAvailabilityGroup implements IProtelAvailabilityGroup {
  id: number
  availabilities: IProtelAvailability[]
  roomTypeCode: string
  guestsPerRoom: IGuestsPerRoom
  tickets: ITicket[]
  numberOfRooms: number
  profileID: number | undefined
  profileName: string | undefined

  constructor() {
    this.id = new Date().getTime()
    this.availabilities = []
    this.roomTypeCode = ''
    this.guestsPerRoom = new GuestsPerRoom()
    this.tickets = []
    this.numberOfRooms = 1
  }
}
