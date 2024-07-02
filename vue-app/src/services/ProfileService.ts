import { type AxiosStatic } from 'axios'
import { AxiosInstanceFactory } from '../factories/AxiosInstanceFactory'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfilePreferencesPatchBody } from '@/shared/interfaces/profiles/IProfilePreferencesPatchBody'
import type { IService } from '@/interfaces/IService'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'

class ProfileService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  get(id: number) {
    return new Promise<IProfile>((resolve, reject) => {
      this.axiosInstance
        .get('v1/protel-profiles/' + id)
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

  findAll() {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/protel-profiles')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(profileLookUpPostBody: IProfileLookUpPostBody) {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/search', profileLookUpPostBody)
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
