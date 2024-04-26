import { type AxiosStatic } from 'axios'
import { AxiosInstanceFactory } from '../factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/interfaces/profiles/IProfileSearch'
import type { IProfilePreferencesPatchBody } from '@/interfaces/profiles/IProfilePreferencesPatchBody'

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
        .post('v1/profiles', profile)
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
        .put('v1/profiles', profile)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  patchProfilePreferences(profilePreferencesPatchBody: IProfilePreferencesPatchBody) {
    return new Promise<IProfilePreferencesPatchBody>((resolve, reject) => {
      this.axiosInstance
        .patch('v1/profiles', profilePreferencesPatchBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(profilePostBody: IProfileSearch) {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/search', profilePostBody)
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
