import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IActivitiesRequestBody } from '@/shared/interfaces/IActivitiesRequestBody'
import type { IActivity } from '@/shared/interfaces/IActivity'
import type { IActivityGetRequestBody } from '@/shared/interfaces/IActivityGetRequestBody'
import { type AxiosStatic } from 'axios'

export class ActivityService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
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

  getActivitiesByRequestBody(activityGetRequestBody: IActivitiesRequestBody): Promise<IActivity[]> {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/activities/get', activityGetRequestBody)
        .then((response: any) => {
          const activities = response.data.events
          resolve(activities)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
