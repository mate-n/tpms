import type { IProfileAddress } from '../../shared/interfaces/profiles/IProfileAddress'
import { faker } from '@faker-js/faker'
import { ProfileAddress } from '../classes/ProfileAddress'

export class ProfileAddressFaker {
  create(): IProfileAddress {
    const profileAddress = new ProfileAddress()
    profileAddress.id = faker.number.int()
    profileAddress.profileID = faker.number.int()
    profileAddress.typeString = faker.lorem.word()
    profileAddress.recipient = faker.person.fullName()
    profileAddress.country = faker.location.country()
    profileAddress.state = faker.location.state()
    profileAddress.zip = faker.location.zipCode()
    profileAddress.city = faker.location.city()
    profileAddress.street1 = faker.location.streetAddress()
    profileAddress.street2 = faker.location.streetAddress()
    profileAddress.street3 = faker.location.streetAddress()
    profileAddress.mailingAddress = faker.datatype.boolean()
    profileAddress.primary = faker.datatype.boolean()
    return profileAddress
  }
}
