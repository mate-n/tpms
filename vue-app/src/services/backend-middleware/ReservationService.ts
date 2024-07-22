import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IReservationLookupBody } from '@/shared/interfaces/IReservationLookupBody'
import type { IReservationLookUpResponseBody } from '@/shared/interfaces/IReservationLookUpResponseBody'
import type { AxiosStatic } from 'axios'

export class ReservationService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  lookup(body: IReservationLookupBody) {
    return new Promise<IReservationLookUpResponseBody[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/reservations/lookup', body)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
