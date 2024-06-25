import { Injectable } from '@nestjs/common'

import { IProtelPark } from 'src/shared/interfaces/protel/IProtelPark'
import { IProtelParkSearch } from 'src/shared/interfaces/protel/IProtelParkSearch'

@Injectable()
export class ProtelParksService {
  search(search: IProtelParkSearch) {
    const parks = this.parks.filter((park) => {
      return park.regionName === search.regionName
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
    },
    {
      regionName: 'Arid Region',
      name: 'Kgalagadi Transfrontier National Park',
    },
    {
      regionName: 'Arid Region',
      name: 'Mokala National Park',
    },
    {
      regionName: 'Arid Region',
      name: 'Namaqua National Park',
    },
    {
      regionName: 'Arid Region',
      name: 'Richtersveld National Park',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Agulhas National Park',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Bontebok National Park',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Table Mountain National Park',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'Tankwa Karoo National Park',
    },
    {
      regionName: 'Cape Cluster Region',
      name: 'West Coast National Park',
    },
    {
      regionName: 'Frontier Region',
      name: 'Addo Elephant National Park',
    },
    {
      regionName: 'Frontier Region',
      name: 'Camdeboo National Park',
    },
    {
      regionName: 'Frontier Region',
      name: 'Karoo National Park',
    },
    {
      regionName: 'Frontier Region',
      name: 'Mountain Zebra National Park',
    },
    {
      regionName: 'Garden Route Region',
      name: 'Garden Route National Park',
    },
    {
      regionName: 'Kruger Region',
      name: 'Kruger National Park Southern Region (Marula)',
    },
    {
      regionName: 'Kruger Region',
      name: 'Kruger National Park Northern Region (Nxanatseni)',
    },
    {
      regionName: 'Northern Region',
      name: 'Golden Gate Highlands National Park',
    },
    {
      regionName: 'Northern Region',
      name: 'Mapungubwe National Park',
    },
    {
      regionName: 'Northern Region',
      name: 'Marakele National Park',
    },
  ]
}
