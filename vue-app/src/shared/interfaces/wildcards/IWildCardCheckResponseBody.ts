export interface IWildCardCheckResponseBody {
  validaity: string
  cluster: string
  locationFound: string
  clusterId: string
  applicationId: number
  category: string
  beneficiaries: Beneficiary[]
  categoryId: string
  wildcard: string
  errorCode?: string
  detail?: string
}

export interface Beneficiary {
  firstName: string
  lastName: string
  passport: any
  dob: string
  typeId: string
  type: string
  idNumber: string
}
