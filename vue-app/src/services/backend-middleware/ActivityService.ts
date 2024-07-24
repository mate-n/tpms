import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IActivityGetRequestBody } from '@/shared/interfaces/IActivityGetRequestBody'
import { type AxiosStatic } from 'axios'

export class ActivityService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  getActivities(activityGetRequestBody: IActivityGetRequestBody): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/activities', activityGetRequestBody)
        .then((response: any) => {
          const activities = response.data
          resolve(activities)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
