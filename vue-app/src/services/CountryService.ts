import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { ICountry } from '@/interfaces/ICountry'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class CountryService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableCountries() {
    return new Promise<ICountry[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/available-countries')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
