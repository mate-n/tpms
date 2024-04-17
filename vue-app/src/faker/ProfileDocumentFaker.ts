import { ProfileDocument } from '@/classes/ProfileDocument'
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import { faker } from '@faker-js/faker'

export class ProfileDocumentFaker {
  create(): IProfileDocument {
    let profileDocument = new ProfileDocument()
    profileDocument.validFrom = faker.date.recent()
    profileDocument.validTo = faker.date.future()
    profileDocument.city = faker.location.city()
    profileDocument.country = faker.location.country()
    profileDocument.number = faker.number.int()
    profileDocument.profileID = faker.number.int()
    profileDocument.supportNumber = faker.number.int()
    profileDocument.primary = faker.datatype.boolean()
    profileDocument.shortName = faker.lorem.word()
    profileDocument.typeID = faker.number.int()
    return profileDocument
  }
}
