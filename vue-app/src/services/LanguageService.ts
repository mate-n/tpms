import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { ILanguage } from '@/interfaces/ILanguage'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class LanguageService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableLanguages() {
    return new Promise<ILanguage[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/available-languages')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
