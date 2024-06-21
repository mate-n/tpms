import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common'
import { ProtelCampsService } from './protel-camps.service'

@Controller('v1/camps')
export class ProtelCampsController {
  constructor(private readonly protelCampsService: ProtelCampsService) {}

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
    return this.protelCampsService.findOne(id)
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
