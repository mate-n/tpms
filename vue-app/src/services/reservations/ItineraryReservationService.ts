import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { AxiosStatic } from 'axios'

export class ItineraryReservationService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  getAll() {
    return new Promise<IReservation[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/reservations')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  get(id: number) {
    return new Promise<IReservation>((resolve, reject) => {
      this.axiosInstance
        .get('v1/reservations/' + id)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  post(reservation: IReservation) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('v1/reservations', reservation)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  put(reservation: IReservation) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put('v1/reservations', reservation)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
