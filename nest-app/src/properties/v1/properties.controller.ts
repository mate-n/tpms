import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { CreatePropertyDto } from '../dto/create-property.dto'
import { UpdatePropertyDto } from '../dto/update-property.dto'
import { IPropertyAvailabilitySearch } from 'src/shared/interfaces/availability/IPropertyAvailabilitySearch'

@Controller('v1/properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto)
  }

  @Post(':id/availabilities')
  availabilities(
    @Body() propertyAvailabilitySearch: IPropertyAvailabilitySearch,
  ) {
    return this.propertiesService.search(propertyAvailabilitySearch)
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id)
  }
}
