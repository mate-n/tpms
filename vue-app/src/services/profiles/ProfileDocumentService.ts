import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import type { IProfileDocumentSearch } from '@/interfaces/profiles/IProfileDocumentSearch'
import type { IProfilesService } from '@/interfaces/profiles/IProfilesService'
import type { AxiosStatic } from 'axios'

export class ProfileDocumentService implements IProfilesService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAllByProfileID(profileID: number) {
    return new Promise<IProfileDocument>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/profiles/${profileID}/documents`)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  get(profileID: number, id: number) {
    return new Promise<IProfileDocument>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/profiles/${profileID}/documents/${id}`)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  post(model: IProfileDocument) {
    return new Promise<IProfileDocument>((resolve, reject) => {
      this.axiosInstance
        .post(`v1/profiles/${model.profileID}/documents`, model)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
  put(model: IProfileDocument) {
    return new Promise<IProfileDocument>((resolve, reject) => {
      this.axiosInstance
        .put(`v1/profiles/${model.profileID}/documents`, model)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(profileCommunicationSearch: IProfileDocumentSearch) {
    return new Promise<IProfileDocument[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/documents/search', profileCommunicationSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  delete(profileDocument: IProfileDocument) {
    return new Promise<void>((resolve, reject) => {
      this.axiosInstance
        .delete(`v1/profiles/${profileDocument.profileID}/documents/${profileDocument.id}`)
        .then(() => {
          resolve()
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
