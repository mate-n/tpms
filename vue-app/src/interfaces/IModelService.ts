import type { IService } from './IService'

export interface IModelService extends IService {
  get(profileID: number, id: number): Promise<any>
  search(search: any): Promise<any>
  create(model: any): Promise<any>
  update(model: any): Promise<any>
  createOrUpdate(model: any): Promise<any>
  delete(model: any): Promise<void>
}
