import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IGuestTravelDocument } from '@/shared/interfaces/IGuestTravelDocument'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios2: AxiosStatic | undefined = inject('axios2')

export class GuestTravelDocumentService implements IService {
  axiosInstance: any
  constructor() {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios2)
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
