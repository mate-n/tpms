import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import type { AxiosStatic } from 'axios'

export class LanguageService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  getAvailableLanguages() {
    return new Promise<ILanguage[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/languages')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
