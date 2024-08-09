import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { ICountry } from '@/shared/interfaces/ICountry'
import type { AxiosStatic } from 'axios'

export class CountryService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  getAvailableCountries() {
    return new Promise<ICountry[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/countries')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
