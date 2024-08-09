import type { IProtelUser } from '@/shared/interfaces/IProtelUser'

export class ProtelUserHelper {
  doesProtelUserHaveAllowedID(protelUser: IProtelUser, id: number): boolean {
    const allowedCampIDs = protelUser.allowedCampIDs.split(',')
    for (const allowedCampID of allowedCampIDs) {
      if (id == parseInt(allowedCampID)) {
        return true
      }
    }
    return false
  }
}
