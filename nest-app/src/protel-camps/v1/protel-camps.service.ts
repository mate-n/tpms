import { Injectable } from '@nestjs/common'
import { ICamp } from 'src/shared/interfaces/ICamp'
import { IParksAndCamps } from 'src/shared/interfaces/IParksAndCamps'
import parksAndCamps from '../mock-data/parksAndCamps'
@Injectable()
export class ProtelCampsService {
  create() {
    return 'This action adds a new protelCamp'
  }

  findAllForMultiSelect() {
    return 'new multi select list.'
  }

  findAll() {
    return new Promise((resolve) => {
      this.getParks().then((result: ICamp[]) => {
        resolve(result)
      })
    })
  }

  findOne(id: number) {
    return new Promise((resolve) => {
      this.getParks().then((results: ICamp[]) => {
        const camp = results.find((camp) => camp.campid == id)
        resolve(camp)
      })
    })
  }

  update(id: number) {
    return `This action updates a #${id} protelCamp`
  }

  remove(id: number) {
    return `This action removes a #${id} protelCamp`
  }

  getParks() {
    return new Promise<ICamp[]>((resolve) => {
      this.getParksAndCamps().then((result: IParksAndCamps) => {
        const camps: ICamp[] = []
        result['Kgalagadi Transfrontier Park'].camps.forEach((camp) => {
          camps.push(camp)
        })
        result['Kruger National Park'].camps.forEach((camp) => {
          camps.push(camp)
        })
        resolve(camps)
      })
    })
  }

  getParksAndCamps() {
    return new Promise<IParksAndCamps>((resolve) => {
      resolve(parksAndCamps)
    })
  }

  getParksAndCampsOld() {
    return new Promise<IParksAndCamps>((resolve) => {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer 1234567890')

      const raw = ''

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 1234567890',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: raw,
        redirect: 'follow' as RequestRedirect,
      }

      fetch(
        'https://ankerws.ankerdata.co.za/getparksandcamps/index.php',
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => resolve(result))
        .catch((error) => console.error(error))
    })
  }
}
