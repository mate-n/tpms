import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'

export class ProfileHelper {
  changeProfile(reservation: IReservation, profile: IProfile) {
    reservation.profileID = profile.id
    reservation.guestName = profile.name
  }
}
