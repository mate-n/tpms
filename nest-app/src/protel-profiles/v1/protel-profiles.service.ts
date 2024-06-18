import { Injectable } from '@nestjs/common'
import { IProtelProfile } from 'src/shared/interfaces/protel/IProtelProfile'

@Injectable()
export class ProtelProfilesService {
  create() {
    return 'This action adds a new protelProfile'
  }

  findAll() {
    return this.getProfiles()
  }

  async findOne(id: number) {
    const profiles = await this.getProfiles()
    const profile = profiles.find((profile) => profile.profileID === id)
    return profile
  }

  update(id: number) {
    return `This action updates a #${id} protelProfile`
  }

  remove(id: number) {
    return `This action removes a #${id} protelProfile`
  }

  getProfiles() {
    return new Promise<IProtelProfile[]>((resolve) => {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer abc123')

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer abc123',
          'Content-Type': 'application/json',
        },
        redirect: 'follow' as RequestRedirect,
      }

      fetch(
        'https://ankerws.ankerdata.co.za/tpmsprofileservice/lookup.php',
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => resolve(result))
        .catch((error) => console.error(error))
    })
  }
}
