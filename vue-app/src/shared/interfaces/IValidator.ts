import type { IEntityWithErrors } from './IEntityWithErrors'

export interface IValidator {
  validate(objectToBeValidated: IEntityWithErrors): void
  validatePromise(objectToBeValidated: IEntityWithErrors): Promise<void>
}
