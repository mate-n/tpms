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
      parkID: '',
    },
    {
      name: 'Bitterpan Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Gharagab Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Grootkolk Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Kalahari Tent Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Kieliekrankie Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Mata Mata Rest Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Nossob Rest Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Twee Rivieren Rest Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Urikaruus Wilderness Camp',
      parkName: 'Kgalagadi Transfrontier National Park',
      parkID: '',
    },
    {
      name: 'Haak en Steek Rest Camp',
      parkName: 'Mokala National Park',
      parkID: '',
    },
    {
      name: 'Lilydale Rest Camp',
      parkName: 'Mokala National Park',
      parkID: '',
    },
    {
      name: 'Mosu Lodge',
      parkName: 'Mokala National Park',
      parkID: '',
    },
    {
      name: 'Motswedi Camp Site',
      parkName: 'Mokala National Park',
      parkID: '',
    },
    {
      name: 'Groenrivier Rest Camp',
      parkName: 'Namaqua National Park',
      parkID: '',
    },
    {
      name: 'Skilpad Rest Camp',
      parkName: 'Namaqua National Park',
      parkID: '',
    },
    {
      name: 'De Hoop Camp Site',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Gannakouriep Wilderness Camp',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Kokerboomkloof Camp Site',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Potjiespram Camp Site',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Richtersberg Camp Site',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Sendelingsdrif Rest Camp',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Tatasberg Wilderness Camp',
      parkName: 'Richtersveld National Park',
      parkID: '',
    },
    {
      name: 'Rierfontein Rest Camp',
      parkName: 'Agulhas National Park',
      parkID: '',
    },
    {
      name: 'Rhenosterkop Rest Camp',
      parkName: 'Agulhas National Park',
      parkID: '',
    },
    {
      name: 'Bergplaas Rest Camp',
      parkName: 'Agulhas National Park',
      parkID: '',
    },
    {
      name: 'Agulhas Rest Camp',
      parkName: 'Agulhas National Park',
      parkID: '',
    },
    {
      name: 'Lang Elsies Kraal',
      parkName: 'Bontebok National Park',
      parkID: '',
    },
    {
      name: 'Platteklip Wash Houses',
      parkName: 'Table Mountain National Park',
      parkID: '',
    },
    {
      name: 'Cape Point Rest Camp',
      parkName: 'Table Mountain National Park',
      parkID: '',
    },
    {
      name: 'Tankwa Karoo Rest Camp',
      parkName: 'Tankwa Karoo National Park',
      parkID: '',
    },
    {
      name: 'Elandsberg Rest Camp',
      parkName: 'Tankwa Karoo National Park',
      parkID: '',
    },
    {
      name: 'West Coast Rest Camp',
      parkName: 'West Coast National Park',
      parkID: '',
    },
    {
      name: 'Addo Rest Camp',
      parkName: 'Addo Elephant National Park',
      parkID: '',
    },
    {
      name: 'Alexandria Hiking Trail',
      parkName: 'Addo Elephant National Park',
      parkID: '',
    },
    {
      name: 'Matyholweni Rest Camp',
      parkName: 'Addo Elephant National Park',
      parkID: '',
    },
    {
      name: 'Narina Rest Camp',
      parkName: 'Addo Elephant National Park',
      parkID: '',
    },
    {
      name: 'Nyathi Rest Camp',
      parkName: 'Addo Elephant National Park',
      parkID: '',
    },
    {
      name: 'Spekboom Tented Camp',
      parkName: 'Addo Elephant National Park',
      parkID: '',
    },
    {
      name: 'Camdeboo Rest Camp',
      parkName: 'Camdeboo National Park',
      parkID: '',
    },
    {
      name: 'Karoo Rest Camp',
      parkName: 'Karoo National Park',
      parkID: '',
    },
    {
      name: 'Mountain Zebra Rest Camp',
      parkName: 'Mountain Zebra National Park',
      parkID: '',
    },
    {
      name: 'Ebb & Flow Rest Camp',
      parkName: 'Garden Route National Park',
      parkID: '',
    },
    {
      name: 'Knysna Rest Camp',
      parkName: 'Garden Route National Park',
      parkID: '',
    },
    {
      name: 'Natures Valley Rest Camp',
      parkName: 'Garden Route National Park',
      parkID: '',
    },
    {
      name: 'Storms River Mouth Rest Camp',
      parkName: 'Garden Route National Park',
      parkID: '',
    },
    {
      name: 'Berg en Dal Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Biyamiti Bushveld Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Crocodile Bridge Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Lower Sabie Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Malelane Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Maroela Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Orpen Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Orpen Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Pretoriuskop Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Roodewal Bush Lodge',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Satara Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Skukuza Rest Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Talamati Bushveld Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Tamboti Tent Camp',
      parkName: 'Kruger National Park Southern Region (Marula)',
      parkID: '',
    },
    {
      name: 'Balule Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Bateleur Bushveld Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Boulders Bush Lodge',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Letaba Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Mopani Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Olifants Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Pafuri Border Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Punda Maria Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Shimuwini Bushveld Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Shingwedzi Rest Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Sirheni Bushveld Camp',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Tsendze Rustic Camp Site',
      parkName: 'Kruger National Park Northern Region (Nxanatseni)',
      parkID: '',
    },
    {
      name: 'Basotho Cultural Village Rest Camp',
      parkName: 'Golden Gate Highlands National Park',
      parkID: '',
    },
    {
      name: 'Glen Reenen Rest Camp',
      parkName: 'Golden Gate Highlands National Park',
      parkID: '',
    },
    {
      name: 'Golden Gate Hotel',
      parkName: 'Golden Gate Highlands National Park',
      parkID: '',
    },
    {
      name: 'Highlands Mountain Retreat',
      parkName: 'Golden Gate Highlands National Park',
      parkID: '',
    },
    {
      name: 'Noord-Brabant',
      parkName: 'Golden Gate Highlands National Park',
      parkID: '',
    },
    {
      name: 'Leokwe Camp',
      parkName: 'Mapungubwe National Park',
      parkID: '',
    },
    {
      name: 'Limpopo Forest Tented Camp',
      parkName: 'Mapungubwe National Park',
      parkID: '',
    },
    {
      name: 'Mazhou Camping Site',
      parkName: 'Mapungubwe National Park',
      parkID: '',
    },
    {
      name: 'Tshugulu Lodge',
      parkName: 'Mapungubwe National Park',
      parkID: '',
    },
    {
      name: 'Vhembe Wilderness Camp',
      parkName: 'Mapungubwe National Park',
      parkID: '',
    },
    {
      name: 'Bontle Rest Camp',
      parkName: 'Marakele National Park',
      parkID: '',
    },
    {
      name: 'Tlopi Rest Camp',
      parkName: 'Marakele National Park',
      parkID: '',
    },
  ]
}
