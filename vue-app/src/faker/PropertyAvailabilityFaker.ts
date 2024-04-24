import { PropertyAvailability } from '@/classes/PropertyAvailability'
import type { IPropertyAvailability } from '@/interfaces/availability/IPropertyAvailability'
import { faker } from '@faker-js/faker'
import { RoomRateFaker } from './RoomRateFaker'
import { RoomFaker } from './RoomFaker'

export class PropertyAvailabilityFaker {
  roomRateFaker = new RoomRateFaker()
  roomFaker = new RoomFaker()
  create(): IPropertyAvailability {
    const propertyAvailability = new PropertyAvailability()
    propertyAvailability.availabilityCount = faker.number.int(100)
    propertyAvailability.baseRateCategory = faker.lorem.word()
    propertyAvailability.room = this.roomFaker.create()
    propertyAvailability.roomRates = [this.roomRateFaker.create(), this.roomRateFaker.create()]
    return propertyAvailability
  }
}
