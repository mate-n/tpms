import type { IEntityWithProfile } from '@/shared/interfaces/IEntityWithProfile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'

export class ProfileHelper {
  changeProfile(entityWithProfile: IEntityWithProfile, profile: IProfile) {
    entityWithProfile.profileID = profile.id
    entityWithProfile.profileName = profile.name
  }
}
