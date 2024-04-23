import type { IEntityWithIdentity } from '@/interfaces/IEntityWithIdentity'

export class IdentityHelper {
  isSame<T extends IEntityWithIdentity>(entity1: T, entity2: T) {
    if (entity1.id && entity2.id) {
      return entity1.id === entity2.id
    }

    if (entity1.uniqueHash && entity2.uniqueHash) {
      return entity1.uniqueHash === entity2.uniqueHash
    }
    return false
  }

  findByIdOrUniqueHash<T extends IEntityWithIdentity>(
    entitiesToBeSearched: T[],
    id: number | undefined,
    uniqueHash: number | undefined
  ): T | undefined {
    if (id) {
      const resultById = entitiesToBeSearched.find((entity) => entity.id === id)
      if (resultById) {
        return resultById
      }
    }

    if (uniqueHash) {
      const resultByUniqueHash = entitiesToBeSearched.find(
        (entity) => entity.uniqueHash === uniqueHash
      )
      if (resultByUniqueHash) {
        return resultByUniqueHash
      }
    }

    return undefined
  }
}
