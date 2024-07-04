import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
import { ProfileConverter } from '@/shared/converters/ProfileConverter'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileCreatePostBody } from '@/shared/interfaces/profiles/IProfileCreatePostBody'
import type { IProfileCreateResponseBody } from '@/shared/interfaces/profiles/IProfileCreateResponseBody'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'
import type { AxiosStatic } from 'axios'

export class ProfileService implements IService {
  profileConverter = new ProfileConverter()
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  get(profileId: number) {
    return new Promise<IProfile | undefined>((resolve, reject) => {
      const profileLookUpPostBody = new ProfileLookUpPostBody()
      profileLookUpPostBody.profileID = profileId
      this.axiosInstance
        .post('api/v1/profiles/lookup', profileLookUpPostBody)
        .then((response: any) => {
          if (response.data[0] && response.data[0].profileID === -1) {
            resolve(undefined)
          }
          const profile = this.profileConverter.convertProfileFromAPIToProfile(response.data[0])
          resolve(profile)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  getAll() {
    return new Promise<IProfile[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/profiles/lookup', {})
        .then((response: any) => {
          const profiles = response.data.map((profile: any) => {
            return this.profileConverter.convertProfileFromAPIToProfile(profile)
          })
          resolve(profiles)
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
          const profiles = response.data.map((profile: any) => {
            return this.profileConverter.convertProfileFromAPIToProfile(profile)
          })
          resolve(profiles)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  create(profileCreatePostBody: IProfileCreatePostBody) {
    return new Promise<IProfileCreateResponseBody>((resolve, reject) => {
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
