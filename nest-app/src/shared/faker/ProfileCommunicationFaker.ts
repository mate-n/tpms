import type { IProfileCommunication } from '../../shared/interfaces/profiles/IProfileCommunication'
import { faker } from '@faker-js/faker'
import { ProfileCommunication } from '../classes/ProfileCommunication'

export class ProfileCommunicationFaker {
  create(): IProfileCommunication {
    let profileCommunication = new ProfileCommunication()
    const fakeData = {
      id: faker.number.int(),
      profileID: faker.number.int(),
      type: faker.lorem.word(),
      value: faker.phone.number(),
      primary: faker.datatype.boolean(),
      communicationTypeID: faker.number.int(4)
    }
    return (profileCommunication = Object.assign(profileCommunication, fakeData))
  }
}
