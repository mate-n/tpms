import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common'
import { ProtelCampsService } from './protel-camps.service'
import { IProtelCampSearch } from 'src/shared/interfaces/protel/IProtelCampSearch'

@Controller('v2/protel-camps')
export class ProtelCampsController {
  constructor(private readonly protelCampsService: ProtelCampsService) {}

  @Post('search')
  search(@Body() protelCampSearch: IProtelCampSearch) {
    return this.protelCampsService.search(protelCampSearch)
  }

  @Post()
  create() {
    return this.protelCampsService.create()
  }

  @Get()
  findAll() {
    return this.protelCampsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.protelCampsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.protelCampsService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.protelCampsService.remove(+id)
  }
}
