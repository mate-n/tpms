import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IGuestTravelDocument } from '@/shared/interfaces/IGuestTravelDocument'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

export class GuestTravelDocumentService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  getAvailableGuestTravelDocuments() {
    return new Promise<IGuestTravelDocument[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/guest-travel-documents')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
