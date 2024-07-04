import type { IProfileLookUpPostBody } from '../interfaces/profiles/IProfileLookUpPostBody'

export class ProfileLookUpPostBody implements IProfileLookUpPostBody {
  surname: string | undefined
  name: string | undefined
  email: string | undefined
  mobile: string | undefined
  sAID: string | undefined
  passportno: string | undefined
  roomseekerclientcode: string | undefined
  profileID: number | undefined
  wildcardnumber: string | undefined
  loyaltynumber: string | undefined
}
