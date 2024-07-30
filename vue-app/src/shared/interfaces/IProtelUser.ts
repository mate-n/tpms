export interface IProtelUser {
  id: string | undefined
  createdAt: Date
  updatedAt: Date
  email: string
  allowedCampIDs: string
}
