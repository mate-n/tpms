import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IGuestTravelDocument } from '@/shared/interfaces/IGuestTravelDocument'
import type { AxiosStatic } from 'axios'

export class GuestTravelDocumentService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
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
