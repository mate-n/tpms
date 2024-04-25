import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IPropertyAvailability } from '@/interfaces/availability/IPropertyAvailability'
import type { IPropertyAvailabilitySearch } from '@/interfaces/availability/IPropertyAvailabilitySearch'
import type { AxiosStatic } from 'axios'

class AvailabilityService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailabilitiesByPropertyID(propertyAvailabilitySearch: IPropertyAvailabilitySearch) {
    return new Promise<IPropertyAvailability[]>((resolve, reject) => {
      this.axiosInstance
        .post(
          `v1/properties/${propertyAvailabilitySearch.propertyID}/availabilities`,
          propertyAvailabilitySearch
        )
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default AvailabilityService
