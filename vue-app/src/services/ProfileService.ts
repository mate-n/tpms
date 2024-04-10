import { type AxiosStatic } from 'axios'
import { AxiosInstanceFactory } from '../factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProfilePostBody } from '@/interfaces/IProfilePostBody'
import type { IProfile } from '@/interfaces/profiles/IProfile'

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

  post(profile: IProfile) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('profiles', profile)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  put(profile: IProfile) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put('profiles', profile)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(profilePostBody: IProfilePostBody) {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .post('profiles/search', profilePostBody)
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
