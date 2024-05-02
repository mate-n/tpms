import { RoomRate } from '../../shared/classes/RoomRate'
import type { IRoomRate } from '../../shared/interfaces/availability/IRoomRate'
import { faker } from '@faker-js/faker'

export class RoomRateFaker {
  create(): IRoomRate {
    const roomRate = new RoomRate()
    roomRate.ratesCode = faker.lorem.word()
    roomRate.roomRate = faker.number.int(1000)
    return roomRate
  }
}
