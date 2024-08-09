import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import type { IService } from '@/interfaces/IService'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
import { type AxiosStatic } from 'axios'

export class AvailabilityService implements IService {
  availabilityHelper: AvailabilityHelper = new AvailabilityHelper()
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  getAvailabilities(
    protelAvailabilityPostBody: IProtelAvailabilityPostBody
  ): Promise<IProtelAvailability[]> {
    return new Promise<IProtelAvailability[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/availabilities', protelAvailabilityPostBody)
        .then((response: any) => {
          const availabilitiesData = response.data
          const availabilities: IProtelAvailability[] =
            availabilitiesData['data']['availability_data']
          const convertedAvailabilities = availabilities.map(
            (availability: IProtelAvailability) => {
              this.availabilityHelper.convertToAvailability(availability)
              return availability
            }
          )
          resolve(convertedAvailabilities)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
