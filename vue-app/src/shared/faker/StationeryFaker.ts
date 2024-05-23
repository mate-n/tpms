import { faker } from '@faker-js/faker'
import type { IStationery } from '../interfaces/IStationery'
import { Stationery } from '../classes/Stationery'

export class StationeryFaker {
  create(): IStationery {
    const stationery = new Stationery()
    stationery.id = faker.number.int(1000)
    stationery.language = faker.lorem.word()
    stationery.template = faker.lorem.word()
    stationery.type = faker.lorem.word()
    stationery.profileID = faker.number.int(1000)
    stationery.profileEmail = faker.internet.email()
    stationery.recipient = faker.lorem.word()
    stationery.addAdditionalText = faker.datatype.boolean()
    stationery.additionalText = faker.lorem.text()
    return stationery
  }
}
