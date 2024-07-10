import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import { Service } from '../Service'

export class RegionService extends Service {
  findAll() {
    return new Promise<IProtelRegion[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/regions')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
