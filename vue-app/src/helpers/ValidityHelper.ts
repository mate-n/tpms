import type { IEntityWithErrors } from '@/shared/interfaces/IEntityWithErrors'

export class ValidityHelper {
  hasErrors<T extends IEntityWithErrors>(entity: T): boolean {
    if (!entity.errors) {
      return false
    }
    if (Object.keys(entity.errors).length > 0) {
      return true
    }
    return false
  }

  isValid<T extends IEntityWithErrors>(entity: T): boolean {
    if (!entity.errors) {
      return false
    }
    return !this.hasErrors(entity)
  }
}
