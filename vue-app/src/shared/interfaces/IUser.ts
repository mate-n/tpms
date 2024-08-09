import type { Role } from '@/enums/Role'

export interface IUser {
  id: string
  role: Role
  username: string
}
