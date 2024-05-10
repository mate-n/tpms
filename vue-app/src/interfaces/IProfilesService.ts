import type { IModelService } from './IModelService'

export interface IProfilesService extends IModelService {
  getAllByProfileID(profileID: number): Promise<any>
}
