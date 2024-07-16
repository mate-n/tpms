import type { IProfileCreatePostBody } from '../interfaces/profiles/IProfileCreatePostBody'

export class ProfileCreatePostBody implements IProfileCreatePostBody {
  profileID: string | undefined
  NamePrefix: string
  GivenName: string
  MiddleName: string
  Surname: string
  BirthDate: string
  Nationality: string
  Language: string
  Mobile: string
  Telephone: string
  Email: string
  AddressLine1: string
  AddressLine2: string
  AddressLine3: string
  CityName: string
  PostalCode: string
  CountryName: string
  CitizenCountryName: string
  SAIdNumber: string
  PassportNumber: string
  PassportDateOfIssue: string
  PassportExpiryDate: string
  PassportCountry: string

  constructor() {
    this.NamePrefix = ''
    this.GivenName = ''
    this.MiddleName = ''
    this.Surname = ''
    this.BirthDate = ''
    this.Nationality = ''
    this.Language = ''
    this.Mobile = ''
    this.Telephone = ''
    this.Email = ''
    this.AddressLine1 = ''
    this.AddressLine2 = ''
    this.AddressLine3 = ''
    this.CityName = ''
    this.PostalCode = ''
    this.CountryName = ''
    this.CitizenCountryName = ''
    this.SAIdNumber = ''
    this.PassportNumber = ''
    this.PassportDateOfIssue = ''
    this.PassportExpiryDate = ''
    this.PassportCountry = ''
  }
}
