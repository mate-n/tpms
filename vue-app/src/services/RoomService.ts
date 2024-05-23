import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { AxiosStatic } from 'axios'

export class RoomService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  get(id: number) {
    return new Promise<IRoom>((resolve, reject) => {
      this.axiosInstance
        .get('v1/rooms/' + id)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  getAll() {
    return new Promise<IRoom[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/rooms')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  getAllFromProperty(propertyId: number) {
    return new Promise<IRoom[]>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/properties/${propertyId}/rooms`)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
