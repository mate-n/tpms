import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IRoom } from '@/interfaces/IRoom'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class RoomService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
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
