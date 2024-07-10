import { ProfileCreatePostBody } from '../classes/ProfileCreatePostBody'
import type { IProfile } from '../interfaces/profiles/IProfile'
import type { IProfileCreatePostBody } from '../interfaces/profiles/IProfileCreatePostBody'
import { DateFormatter } from '@/helpers/DateFormatter'

export class ProfileCreatePostBodyConverter {
  dateFormatter = new DateFormatter()
  convertToProfileCreatePostBody(profile: IProfile): IProfileCreatePostBody {
    const profileCreatePostBody = new ProfileCreatePostBody()
    profileCreatePostBody.NamePrefix = ''
    profileCreatePostBody.GivenName = profile.name
    profileCreatePostBody.MiddleName = profile.middleName
    profileCreatePostBody.Surname = profile.surname
    if (profile.dateofbirth)
      profileCreatePostBody.BirthDate = this.dateFormatter.yyyydashmmdashdd(profile.dateofbirth)
    profileCreatePostBody.Nationality = profile.countryofbirth
    profileCreatePostBody.Language = profile.language
    profileCreatePostBody.Mobile = profile.mobile
    profileCreatePostBody.Telephone = profile.telephone
    profileCreatePostBody.Email = profile.email
    profileCreatePostBody.AddressLine1 = profile.address
    profileCreatePostBody.AddressLine2 = ''
    profileCreatePostBody.AddressLine3 = ''
    profileCreatePostBody.CityName = profile.city
    profileCreatePostBody.PostalCode = profile.postalCode
    profileCreatePostBody.CountryName = profile.country
    profileCreatePostBody.CitizenCountryName = profile.countryofbirth
    profileCreatePostBody.SAIdNumber = profile.SAId
    profileCreatePostBody.PassportNumber = profile.passportno
    return profileCreatePostBody
  }
}
