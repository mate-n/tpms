import type { IProfileContactDetail } from '@/interfaces/profiles/IProfileContactDetail'

export class ProfileContactDetail implements IProfileContactDetail {
  id: number
  type: string
  value: string
  isPrimary: boolean
  icon: string
  profileId: number

  constructor() {
    this.id = 0
    this.type = ''
    this.value = ''
    this.isPrimary = false
    this.icon = ''
    this.profileId = 0
  }
}
