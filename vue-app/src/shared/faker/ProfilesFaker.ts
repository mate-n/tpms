import type { IProfile } from '../../shared/interfaces/profiles/IProfile'
import { faker } from '@faker-js/faker'
import { Profile } from '../classes/Profile'

export class ProfilesFaker {
  create(): IProfile {
    let profile = new Profile()
    profile.id = faker.number.int()
    profile.firstName = faker.person.firstName()
    profile.lastName = faker.person.lastName()
    profile.middleName = faker.person.middleName()
    profile.email = faker.internet.email()
    profile.language = faker.location.countryCode()
    profile.phone = faker.phone.number()
    profile.deibitorAccount = faker.finance.accountNumber()
    profile.salesTaxNumber = faker.finance.accountNumber()
    profile.salesTaxNumber2 = faker.finance.accountNumber()
    profile.salut = faker.person.prefix()
    profile.salutShort = faker.person.prefix()
    profile.vipCodeIDs = [faker.number.int(), faker.number.int()]
    profile.inactive = faker.datatype.boolean()
    profile.profileType = faker.lorem.word()
    profile.isPasserby = faker.datatype.boolean()
    profile.communicationIDs = [faker.number.int(), faker.number.int()]
    profile.addressIDs = [faker.number.int(), faker.number.int()]
    profile.birthPlace = faker.location.city()
    profile.birthCountry = faker.location.country()
    profile.birthday = faker.date.past()
    profile.gender = faker.person.gender()
    profile.nationality = faker.location.countryCode()
    profile.company = faker.company.name()
    profile.occupation = faker.person.jobTitle()
    profile.additionalInfoDefaultRateIDs = [faker.number.int(), faker.number.int()]
    profile.licensePlate = faker.vehicle.vin()
    profile.passport = faker.number.int().toString()
    profile.preferencesNote = faker.lorem.sentence()
    profile.preferencesFeatureIDs = [faker.number.int(), faker.number.int()]
    profile.preferencesDefaultObjectID = faker.number.int()
    profile.preferencesLanguage = faker.location.countryCode()
    profile.marketingCodeIDs = [faker.number.int(), faker.number.int()]
    profile.marketingTagIDs = [faker.number.int(), faker.number.int()]
    profile.allowMarketing = faker.datatype.boolean()
    profile.marketingDataProcessing = faker.datatype.boolean()
    profile.marketingApprovalToPrintMembershipCard = faker.datatype.boolean()
    profile.membershipCardIDs = [faker.number.int(), faker.number.int()]
    profile.documentIDs = [faker.number.int(), faker.number.int()]
    profile.attachmentIDs = [faker.number.int(), faker.number.int()]
    profile.commisionIds = [faker.number.int(), faker.number.int()]
    profile.stationeryIds = [faker.number.int(), faker.number.int()]
    profile.invoiceIds = [faker.number.int(), faker.number.int()]
    profile.reservationIds = [faker.number.int(), faker.number.int()]
    profile.traceIds = [faker.number.int(), faker.number.int()]
    return profile
  }
}
