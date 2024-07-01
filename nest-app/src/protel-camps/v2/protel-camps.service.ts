import { Injectable } from '@nestjs/common'
import { ICamp } from 'src/shared/interfaces/ICamp'
import { IParksAndCamps } from 'src/shared/interfaces/IParksAndCamps'
import parksAndCamps from '../mock-data/parksAndCamps'
import { IProtelCamp } from 'src/shared/interfaces/protel/IProtelCamp'
import { IProtelCampSearch } from 'src/shared/interfaces/protel/IProtelCampSearch'
@Injectable()
export class ProtelCampsService {
  search(search: IProtelCampSearch) {
    const camp = this.camps.filter((camp) => {
      return search.parkNames.includes(camp.parkName)
    })
    return camp
  }

  create() {
    return 'This action adds a new protelCamp'
  }

  findAll() {
    return this.camps
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
    {
      name: 'Lang Elsies Kraal',
      parkName: 'Bontebok National Park',
    },
    {
      name: 'Platteklip Wash Houses',
      parkName: 'Table Mountain National Park',
    },
    {
      name: 'Cape Point Rest Camp',
      parkName: 'Table Mountain National Park',
    },
    {
      name: 'Tankwa Karoo Rest Camp',
      parkName: 'Tankwa Karoo National Park',
    },
    {
      name: 'Elandsberg Rest Camp',
      parkName: 'Tankwa Karoo National Park',
    },
    {
      name: 'West Coast Rest Camp',
      parkName: 'West Coast National Park',
    },
    {
      name: 'Addo Rest Camp',
      parkName: 'Addo Elephant National Park',
    },
    {
      name: 'Alexandria Hiking Trail',
      parkName: 'Addo Elephant National Park',
    },
    {
      name: 'Matyholweni Rest Camp',
      parkName: 'Addo Elephant National Park',
    },
    {
      name: 'Narina Rest Camp',
      parkName: 'Addo Elephant National Park',
    },
    {
      name: 'Nyathi Rest Camp',
      parkName: 'Addo Elephant National Park',
    },
    {
      name: 'Spekboom Tented Camp',
      parkName: 'Addo Elephant National Park',
    },
    {
      name: 'Camdeboo Rest Camp',
      parkName: 'Camdeboo National Park',
    },
    {
      name: 'Karoo Rest Camp',
      parkName: 'Karoo National Park',
    },
    {
      name: 'Mountain Zebra Rest Camp',
      parkName: 'Mountain Zebra National Park',
    },
    {
      name: 'Ebb & Flow Rest Camp',
      parkName: 'Garden Route National Park',
    },
    {
      name: 'Knysna Rest Camp',
      parkName: 'Garden Route National Park',
    },
    {
      name: 'Natures Valley Rest Camp',
      parkName: 'Garden Route National Park',
    },
    {
      name: 'Storms River Mouth Rest Camp',
      parkName: 'Garden Route National Park',
    },
    {
      name: 'Berg en Dal Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Biyamiti Bushveld Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Crocodile Bridge Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Lower Sabie Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Malelane Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Maroela Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Orpen Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Orpen Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Pretoriuskop Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Roodewal Bush Lodge',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Satara Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Skukuza Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Talamati Bushveld Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Tamboti Tent Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
    },
    {
      name: 'Balule Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Bateleur Bushveld Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Boulders Bush Lodge',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Letaba Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Mopani Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Olifants Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Pafuri Border Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Punda Maria Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Shimuwini Bushveld Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Shingwedzi Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Sirheni Bushveld Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Tsendze Rustic Camp Site',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      name: 'Basotho Cultural Village Rest Camp',
      parkName: 'Golden Gate Highlands National Park',
    },
    {
      name: 'Glen Reenen Rest Camp',
      parkName: 'Golden Gate Highlands National Park',
    },
    {
      name: 'Golden Gate Hotel',
      parkName: 'Golden Gate Highlands National Park',
    },
    {
      name: 'Highlands Mountain Retreat',
      parkName: 'Golden Gate Highlands National Park',
    },
    {
      name: 'Noord-Brabant',
      parkName: 'Golden Gate Highlands National Park',
    },
    {
      name: 'Leokwe Camp',
      parkName: 'Mapungubwe National Park',
    },
    {
      name: 'Limpopo Forest Tented Camp',
      parkName: 'Mapungubwe National Park',
    },
    {
      name: 'Mazhou Camping Site',
      parkName: 'Mapungubwe National Park',
    },
    {
      name: 'Tshugulu Lodge',
      parkName: 'Mapungubwe National Park',
    },
    {
      name: 'Vhembe Wilderness Camp',
      parkName: 'Mapungubwe National Park',
    },
    {
      name: 'Bontle Rest Camp',
      parkName: 'Marakele National Park',
    },
    {
      name: 'Tlopi Rest Camp',
      parkName: 'Marakele National Park',
    },
  ]
}
