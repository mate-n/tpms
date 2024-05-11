import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { ICountry } from '@/shared/interfaces/ICountry'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

export class CountryService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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
