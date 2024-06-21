import { Injectable } from '@nestjs/common'
import { CreateProtelRegionDto } from '../dto/create-protel-region.dto'
import { UpdateProtelRegionDto } from '../dto/update-protel-region.dto'

@Injectable()
export class ProtelRegionsService {
  create(createProtelRegionDto: CreateProtelRegionDto) {
    return 'This action adds a new protelRegion'
  }

  findAll() {
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

  regions = [
    'Arid Region',
    'Cape Cluster Region',
    'Frontier Region',
    'Garden Route Region',
    'Kruger Region',
    'Northern Region',
  ]
}
