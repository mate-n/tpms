import { Profile } from '@/classes/Profile'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { faker } from '@faker-js/faker'

export class ProfilesFaker {
  create(): IProfile {
    let profile = new Profile()
    const fakeData = {
      id: faker.number.int(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      email: faker.internet.email(),
      language: faker.location.countryCode(),
      phone: faker.phone.number(),
      deibitorAccount: faker.finance.accountNumber(),
      salesTaxNumber: faker.finance.accountNumber(),
      salesTaxNumber2: faker.finance.accountNumber(),
      salut: faker.person.prefix(),
      salutShort: faker.person.prefix(),
      vipCodeIDs: [faker.number.int(), faker.number.int()],
      inactive: faker.datatype.boolean(),
      profileType: faker.lorem.word(),
      isPasserby: faker.datatype.boolean(),
      communicationIDs: [faker.number.int(), faker.number.int()],
      addressIDs: [faker.number.int(), faker.number.int()],
      birthPlace: faker.location.city(),
      birthCountry: faker.location.country(),
      birthday: faker.date.past(),
      gender: faker.person.gender(),
      nationality: faker.location.countryCode(),
      company: faker.company.name(),
      occupation: faker.person.jobTitle(),
      additionalInfoDefaultRateIDs: [faker.number.int(), faker.number.int()],
      licensePlate: faker.vehicle.vin(),
      passport: faker.number.int(),
      preferencesNote: faker.lorem.sentence(),
      preferencesFeatureIDs: [faker.number.int(), faker.number.int()],
      preferencesDefaultObjectID: faker.number.int(),
      preferencesLanguage: faker.location.countryCode(),
      marketingCodeIDs: [faker.number.int(), faker.number.int()],
      marketingTagIDs: [faker.number.int(), faker.number.int()],
      allowMarketing: faker.datatype.boolean(),
      marketingDataProcessing: faker.datatype.boolean(),
      marketingApprovalToPrintMembershipCard: faker.datatype.boolean(),
      membershipCardIDs: [faker.number.int(), faker.number.int()],
      documentIDs: [faker.number.int(), faker.number.int()],
      attachmentIDs: [faker.number.int(), faker.number.int()],
      commisionIds: [faker.number.int(), faker.number.int()],
      stationeryIds: [faker.number.int(), faker.number.int()],
      invoiceIds: [faker.number.int(), faker.number.int()],
      reservationIds: [faker.number.int(), faker.number.int()],
      traceIds: [faker.number.int(), faker.number.int()]
    }
    return (profile = Object.assign(profile, fakeData))
  }
}
