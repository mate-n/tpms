import { ProfileAddress } from '@/classes/ProfileAddress'
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'
import { faker } from '@faker-js/faker'

export class ProfileAddressFaker {
  create(): IProfileAddress {
    let profileAddress = new ProfileAddress()
    const fakeData = {
      id: faker.datatype.number(),
      profileID: faker.datatype.number(),
      type: faker.random.word(),
      recipient: faker.person.fullName(),
      country: faker.address.country(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      city: faker.address.city(),
      street1: faker.address.streetAddress(),
      street2: faker.address.streetAddress(),
      street3: faker.address.streetAddress(),
      mailingAddress: faker.datatype.boolean(),
      primary: faker.datatype.boolean()
    }
    return (profileAddress = Object.assign(profileAddress, fakeData))
  }
}
