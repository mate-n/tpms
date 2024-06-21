import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common'
import { ProtelParksService } from './protel-parks.service'

@Controller('protel-parks')
export class ProtelParksController {
  constructor(private readonly protelParksService: ProtelParksService) {}

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
