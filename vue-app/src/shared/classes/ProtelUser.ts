import type { IProtelUser } from '../interfaces/IProtelUser'

export class ProtelUser implements IProtelUser {
  id: string | undefined
  createdAt: Date
  updatedAt: Date
  email: string
  allowedCampIDs: string

  constructor() {
    this.id = undefined
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.email = ''
    this.allowedCampIDs = ''
  }
}
