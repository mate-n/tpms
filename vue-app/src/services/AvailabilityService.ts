import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IPropertyAvailability } from '@/shared/interfaces/availability/IPropertyAvailability'
import type { IPropertyAvailabilitySearch } from '@/shared/interfaces/availability/IPropertyAvailabilitySearch'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

class AvailabilityService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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
