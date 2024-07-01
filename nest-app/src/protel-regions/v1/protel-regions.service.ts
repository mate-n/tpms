import { Injectable } from '@nestjs/common'
import { CreateProtelRegionDto } from '../dto/create-protel-region.dto'
import { UpdateProtelRegionDto } from '../dto/update-protel-region.dto'
import { IProtelRegion } from 'src/shared/interfaces/protel/IProtelRegion'

@Injectable()
export class ProtelRegionsService {
  create(createProtelRegionDto: CreateProtelRegionDto) {
    return 'This action adds a new protelRegion'
  }

  findAll(): IProtelRegion[] {
    return this.regions
  }

  findOne(id: number) {
    return `This action returns a #${id} protelRegion`
  }

  update(id: number, updateProtelRegionDto: UpdateProtelRegionDto) {
    return `This action updates a #${id} protelRegion`
  }

  remove(id: number) {
    return `This action removes a #${id} protelRegion`
  }

  regions: IProtelRegion[] = [
    {
      name: 'Arid Region',
    },
    {
      name: 'Cape Cluster Region',
    },
    {
      name: 'Frontier Region',
    },
    {
      name: 'Garden Route Region',
    },
    {
      name: 'Kruger Region',
    },
    {
      name: 'Northern Region',
    },
  ]
}
