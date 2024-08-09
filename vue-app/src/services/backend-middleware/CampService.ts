import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import { ProtelUser } from '@/shared/classes/ProtelUser'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import type { AxiosStatic } from 'axios'
import { ProtelUserService } from './ProtelUserService'

export class CampService implements IService {
  axiosInstance: any
  protelUserService = new ProtelUserService(undefined)
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
    this.protelUserService = new ProtelUserService(axios)
  }

  private findAll() {
    return new Promise<IProtelCamp[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/camps')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  findAllFilteredByProtelUserEmail(email: string | undefined) {
    return new Promise<IProtelCamp[]>((resolve, reject) => {
      this.findAll().then((camps: IProtelCamp[]) => {
        if (!email) {
          resolve(camps)
        } else {
          this.protelUserService
            .findByEmail(email)
            .then((protelUsers: ProtelUser[]) => {
              const protelUser = protelUsers[0]
              if (!protelUser) {
                resolve(camps)
              }
              const allowedCampIDs = protelUser.allowedCampIDs.split(',')

              const filteredCamps = []
              for (const camp of camps) {
                for (const allowedCampID of allowedCampIDs) {
                  if (camp.id == parseInt(allowedCampID)) {
                    filteredCamps.push(camp)
                  }
                }
              }

              resolve(filteredCamps)
            })
            .catch((e: any) => {
              reject(e)
            })
        }
      })
    })
  }
}
