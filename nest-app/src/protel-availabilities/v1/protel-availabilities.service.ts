import { Injectable } from '@nestjs/common'
import { CreateProtelAvailabilityDto } from '../dto/create-protel-availability.dto'
import { UpdateProtelAvailabilityDto } from '../dto/update-protel-availability.dto'
import { IProtelAvailability } from 'src/shared/interfaces/protel/IProtelAvailability'
import { IProtelAvailabilityPostBody } from 'src/shared/interfaces/protel/IProtelAvailabilityPostBody'

@Injectable()
export class ProtelAvailabilitiesService {
  create(createProtelAvailabilityDto: CreateProtelAvailabilityDto) {
    return 'This action adds a new protelAvailability'
  }

  findAll(protelAvailabilityPostBody: IProtelAvailabilityPostBody) {
    return this.getAvailabilities(protelAvailabilityPostBody)
  }

  findOne(id: number) {
    return `This action returns a #${id} protelAvailability`
  }

  update(id: number, updateProtelAvailabilityDto: UpdateProtelAvailabilityDto) {
    return `This action updates a #${id} protelAvailability`
  }

  remove(id: number) {
    return `This action removes a #${id} protelAvailability`
  }

  getAvailabilities(protelAvailabilityPostBody: IProtelAvailabilityPostBody) {
    return new Promise<IProtelAvailability[]>((resolve) => {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer 1234567890')

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 1234567890',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(protelAvailabilityPostBody),
        redirect: 'follow' as RequestRedirect,
      }

      fetch(
        'https://ankerws.ankerdata.co.za/availability/index.php?getavailability',
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          resolve(result['data']['availability_data'])
        })
        .catch((error) => console.error(error))
    })
  }
}
