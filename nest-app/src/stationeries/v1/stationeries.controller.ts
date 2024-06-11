import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { StationeriesService } from './stationeries.service'
import { IStationery } from 'src/shared/interfaces/IStationery'

@Controller('v1/stationeries')
export class StationeriesController {
  constructor(private readonly stationeriesService: StationeriesService) {}

  @Post()
  create(@Body() stationery: IStationery) {
    return this.stationeriesService.create(stationery)
  }

  @Get()
  findAll() {
    return this.stationeriesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationeriesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() stationery: IStationery) {
    return this.stationeriesService.update(stationery)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationeriesService.remove(+id)
  }
}
