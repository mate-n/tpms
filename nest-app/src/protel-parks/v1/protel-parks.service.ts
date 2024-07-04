import { Injectable } from '@nestjs/common'

import { IProtelPark } from 'src/shared/interfaces/protel/IProtelPark'
import { IProtelParkSearch } from 'src/shared/interfaces/protel/IProtelParkSearch'

@Injectable()
export class ProtelParksService {
  search(search: IProtelParkSearch) {
    const parks = this.parks.filter((park) => {
      return search.regionNames.includes(park.regionName)
    })
    return parks
  }

  create() {
    return 'This action adds a new protelPark'
  }

  findAll() {
    return this.parks
  }

  findOne(id: number) {
    return `This action returns a #${id} protelPark`
  }

  update(id: number) {
    return `This action updates a #${id} protelPark`
  }

  remove(id: number) {
    return `This action removes a #${id} protelPark`
  }

  parks: IProtelPark[] = [
    {
      regionName: 'Arid Region',
      name: 'Augrabies Falls National Park',
      id: '',
    },
    {
      regionName: 'Arid Region',
      name: 'Kgalagadi Transfrontier National Park',
      id: '',
    },
    {
      regionName: 'Arid Region',
      name: 'Mokala National Park',
      id: '',
    },
    {
      regionName: 'Arid Region',
      name: 'Namaqua National Park',
      id: '',
    },
    {
      regionName: 'Arid Region',
      name: 'Richtersveld National Park',
      id: '',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Agulhas National Park',
      id: '',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Bontebok National Park',
      id: '',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Table Mountain National Park',
      id: '',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Tankwa Karoo National Park',
      id: '',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'West Coast National Park',
      id: '',
    },
    {
      regionName: 'Frontier Region',
      name: 'Addo Elephant National Park',
      id: '',
    },
    {
      regionName: 'Frontier Region',
      name: 'Camdeboo National Park',
      id: '',
    },
    {
      regionName: 'Frontier Region',
      name: 'Karoo National Park',
      id: '',
    },
    {
      regionName: 'Frontier Region',
      name: 'Mountain Zebra National Park',
      id: '',
    },
    {
      regionName: 'Garden Route Region',
      name: 'Garden Route National Park',
      id: '',
    },
    {
      regionName: 'Kruger Region',
      name: 'Kruger National Park Southern Region (Marula)',
      id: '',
    },
    {
      regionName: 'Kruger Region',
      name: 'Kruger National Park Northern Region (Nxanatseni)',
      id: '',
    },
    {
      regionName: 'Northern Region',
      name: 'Golden Gate Highlands National Park',
      id: '',
    },
    {
      regionName: 'Northern Region',
      name: 'Mapungubwe National Park',
      id: '',
    },
    {
      regionName: 'Northern Region',
      name: 'Marakele National Park',
      id: '',
    },
  ]
}
