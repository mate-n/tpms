import { type AxiosStatic } from 'axios'
import { AxiosInstanceFactory } from '../factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'

class ProfileService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('?lookup&email=gert@ankerdata2.co.za')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default ProfileService
