import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileCreatePostBody } from '@/shared/interfaces/profiles/IProfileCreatePostBody'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'
import type { AxiosStatic } from 'axios'

export class ProfileService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  getAll() {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/profiles/lookup')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  lookup(profileLookUpPostBody: IProfileLookUpPostBody) {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/profiles/lookup', profileLookUpPostBody)
        .then((response: any) => {
          if (response.data[0] && response.data[0].profileID === -1) {
            resolve([])
          }
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  create(profileCreatePostBody: IProfileCreatePostBody) {
    return new Promise<IProfile>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/profiles', profileCreatePostBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
