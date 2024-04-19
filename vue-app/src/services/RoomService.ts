import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IRoom } from '@/interfaces/IRoom'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class RoomService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getRooms() {
    return new Promise<IRoom[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/room-types')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
