import { type AxiosStatic } from 'axios'
import { AxiosInstanceFactory } from '../../factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import type { IProfileCommunicationSearch } from '@/interfaces/profiles/IProfileCommunicationSearch'

export class ProfileCommunicationService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAllByProfileID(profileID: number) {
    return new Promise<IProfileCommunication[]>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/profiles/${profileID}/communications`)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  post(profileCommunication: IProfileCommunication) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`v1/profiles/${profileCommunication.profileID}/communications`, profileCommunication)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  put(profileCommunication: IProfileCommunication) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(`v1/profiles/${profileCommunication.profileID}/communications`, profileCommunication)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(profileCommunicationSearch: IProfileCommunicationSearch) {
    return new Promise<IProfileCommunication[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/communications/search', profileCommunicationSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  delete(profileCommunication: IProfileCommunication) {
    return new Promise<void>((resolve, reject) => {
      this.axiosInstance
        .delete(
          `v1/profiles/${profileCommunication.profileID}/communications/${profileCommunication.id}`
        )
        .then(() => {
          resolve()
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
