import { ProfileCommunication } from '@/classes/ProfileCommunication'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import { faker } from '@faker-js/faker'

export class ProfileCommunicationFaker {
  create(): IProfileCommunication {
    let profileCommunication = new ProfileCommunication()
    const fakeData = {
      id: faker.datatype.number(),
      profileID: faker.datatype.number(),
      type: faker.random.word(),
      value: faker.phone.number(),
      primary: faker.datatype.boolean(),
      communicationTypeID: faker.number.int(4)
    }
    return (profileCommunication = Object.assign(profileCommunication, fakeData))
  }
}
