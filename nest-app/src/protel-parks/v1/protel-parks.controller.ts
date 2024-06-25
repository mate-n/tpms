import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common'
import { ProtelParksService } from './protel-parks.service'
import { IProtelParkSearch } from 'src/shared/interfaces/protel/IProtelParkSearch'

@Controller('v1/protel-parks')
export class ProtelParksController {
  constructor(private readonly protelParksService: ProtelParksService) {}

  @Post('search')
  search(@Body() protelParkSearch: IProtelParkSearch) {
    console.log('search', protelParkSearch)
    return this.protelParksService.search(protelParkSearch)
  }

  @Post()
  create() {
    return this.protelParksService.create()
  }

  @Get()
  findAll() {
    return this.protelParksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.protelParksService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.protelParksService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.protelParksService.remove(+id)
  }
}
