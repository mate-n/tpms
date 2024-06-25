import { Injectable } from '@nestjs/common'
import { ICamp } from 'src/shared/interfaces/ICamp'
import { IParksAndCamps } from 'src/shared/interfaces/IParksAndCamps'
import parksAndCamps from '../mock-data/parksAndCamps'
import { IProtelCamp } from 'src/shared/interfaces/protel/IProtelCamp'
@Injectable()
export class ProtelCampsService {
  create() {
    return 'This action adds a new protelCamp'
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

  camps: IProtelCamp[] = [
    {
      name: 'Augrabies Rest Camp',
      parkName: 'Augrabies Falls National Park',
    },
    {
      name: 'Bitterpan Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Gharagab Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Grootkolk Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Kalahari Tent Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Kieliekrankie Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Mata Mata Rest Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Nossob Rest Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Twee Rivieren Rest Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Urikaruus Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
    },
    {
      name: 'Haak en Steek Rest Camp',
      parkName: 'Mokala National Park',
    },
    {
      name: 'Lilydale Rest Camp',
      parkName: 'Mokala National Park',
    },
    {
      name: 'Mosu Lodge',
      parkName: 'Mokala National Park',
    },
    {
      name: 'Motswedi Camp Site',
      parkName: 'Mokala National Park',
    },
    {
      name: 'Groenrivier Rest Camp',
      parkName: 'Namaqua National Park',
    },
    {
      name: 'Skilpad Rest Camp',
      parkName: 'Namaqua National Park',
    },
    {
      name: 'De Hoop Camp Site',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Gannakouriep Wilderness Camp',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Kokerboomkloof Camp Site',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Potjiespram Camp Site',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Richtersberg Camp Site',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Sendelingsdrif Rest Camp',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Tatasberg Wilderness Camp',
      parkName: 'Richtersveld National Park',
    },
    {
      name: 'Rierfontein Rest Camp',
      parkName: 'Agulhas National Park',
    },
    {
      name: 'Rhenosterkop Rest Camp',
      parkName: 'Agulhas National Park',
    },
    {
      name: 'Bergplaas Rest Camp',
      parkName: 'Agulhas National Park',
    },
    {
      name: 'Agulhas Rest Camp',
      parkName: 'Agulhas National Park',
    },
  ]
}
