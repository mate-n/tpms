import type { IService } from './IService'

export interface IModelService extends IService {
  get(profileID: number, id: number): Promise<any>
  search(search: any): Promise<any>
  post(model: any): Promise<any>
  put(model: any): Promise<any>
  delete(model: any): Promise<void>
}
