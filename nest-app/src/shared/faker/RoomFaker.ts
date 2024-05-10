import { Room } from '../../shared/classes/Room'
import { faker } from '@faker-js/faker'

export class RoomFaker {
  create() {
    const room = new Room()
    room.type = faker.number.int(100)
    room.minOccupancy = faker.number.int(5)
    room.maxOccupancy = faker.number.int({ min: room.minOccupancy, max: 10 })
    room.code = faker.lorem.word()
    room.name = faker.lorem.word()
    room.description = faker.lorem.word()
    room.id = faker.number.int(100)
    return room
  }
}
