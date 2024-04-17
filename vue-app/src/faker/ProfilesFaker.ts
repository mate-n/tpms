import { Profile } from '@/classes/Profile'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { faker } from '@faker-js/faker'

export class ProfilesFaker {
  create(): IProfile {
    let profile = new Profile()
    const fakeData = {
      id: faker.datatype.number(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      middleName: faker.name.middleName(),
      email: faker.internet.email(),
      language: faker.location.countryCode(),
      phone: faker.phone.number(),
      deibitorAccount: faker.finance.account(),
      salesTaxNumber: faker.finance.account(),
      salesTaxNumber2: faker.finance.account(),
      salut: faker.name.prefix(),
      salutShort: faker.name.prefix(),
      vipCodeIDs: [faker.datatype.number(), faker.datatype.number()],
      inactive: faker.datatype.boolean(),
      profileType: faker.random.word(),
      isPasserby: faker.datatype.boolean(),
      communicationIDs: [faker.datatype.number(), faker.datatype.number()],
      addressIDs: [faker.datatype.number(), faker.datatype.number()],
      birthPlace: faker.address.city(),
      birthCountry: faker.address.country(),
      birthday: faker.date.past(),
      gender: faker.name.gender(),
      nationality: faker.address.countryCode(),
      company: faker.company.name(),
      occupation: faker.name.jobTitle(),
      additionalInfoDefaultRateIDs: [faker.datatype.number(), faker.datatype.number()],
      licensePlate: faker.vehicle.vin(),
      passport: faker.random.alphaNumeric(10),
      preferencesNote: faker.lorem.sentence(),
      preferencesFeatureIDs: [faker.datatype.number(), faker.datatype.number()],
      preferencesDefaultObjectID: faker.datatype.number(),
      preferencesLanguage: faker.location.countryCode(),
      marketingCodeIDs: [faker.datatype.number(), faker.datatype.number()],
      marketingTagIDs: [faker.datatype.number(), faker.datatype.number()],
      allowMarketing: faker.datatype.boolean(),
      marketingDataProcessing: faker.datatype.boolean(),
      marketingApprovalToPrintMembershipCard: faker.datatype.boolean(),
      membershipCardIDs: [faker.datatype.number(), faker.datatype.number()],
      documentIDs: [faker.datatype.number(), faker.datatype.number()],
      attachmentIDs: [faker.datatype.number(), faker.datatype.number()],
      commisionIds: [faker.datatype.number(), faker.datatype.number()],
      stationeryIds: [faker.datatype.number(), faker.datatype.number()],
      invoiceIds: [faker.datatype.number(), faker.datatype.number()],
      reservationIds: [faker.datatype.number(), faker.datatype.number()],
      traceIds: [faker.datatype.number(), faker.datatype.number()]
    }
    return (profile = Object.assign(profile, fakeData))
  }
}
