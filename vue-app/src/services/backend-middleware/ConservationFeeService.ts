import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { ICalculatePriceOfConservationFeesBody } from '@/shared/interfaces/ICalculatePriceOfConservationFeesBody'
import type { IConservationFeePrices } from '@/shared/interfaces/IConservationFeePrices'
import type { AxiosStatic } from 'axios'

export class ConservationFeeService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  calculatePriceOfConservationFees(
    calculatePriceOfConservationFeesBody: ICalculatePriceOfConservationFeesBody
  ): Promise<any> {
    return new Promise<IConservationFeePrices>((resolve, reject) => {
      this.axiosInstance
        .post(
          'api/v1/conservation-fees/calculate-price-of-conservation-fees',
          calculatePriceOfConservationFeesBody
        )
        .then((response: any) => {
          const activities = response.data
          resolve(activities)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
