import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ProtelRegionsService } from './protel-regions.service'
import { CreateProtelRegionDto } from '../dto/create-protel-region.dto'
import { UpdateProtelRegionDto } from '../dto/update-protel-region.dto'

@Controller('v1/protel-regions')
export class ProtelRegionsController {
  constructor(private readonly protelRegionsService: ProtelRegionsService) {}

  @Post()
  create(@Body() createProtelRegionDto: CreateProtelRegionDto) {
    return this.protelRegionsService.create(createProtelRegionDto)
  }

  @Get()
  findAll() {
    return this.protelRegionsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.protelRegionsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProtelRegionDto: UpdateProtelRegionDto,
  ) {
    return this.protelRegionsService.update(+id, updateProtelRegionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.protelRegionsService.remove(+id)
  }
}
