import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import type { AxiosStatic } from 'axios'

export class ItineraryReservationService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  getAll() {
    return new Promise<IItineraryReservation[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/itinerary-reservations')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  get(id: number) {
    return new Promise<IItineraryReservation>((resolve, reject) => {
      this.axiosInstance
        .get('v1/itinerary-reservations/' + id)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  post(reservation: IItineraryReservation) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('v1/itinerary-reservations', reservation)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  put(reservation: IItineraryReservation) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put('v1/itinerary-reservations', reservation)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
