import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ProtelAvailabilitiesService } from './protel-availabilities.service'
import { CreateProtelAvailabilityDto } from '../dto/create-protel-availability.dto'
import { UpdateProtelAvailabilityDto } from '../dto/update-protel-availability.dto'

@Controller('v1/protel-availabilities')
export class ProtelAvailabilitiesController {
  constructor(
    private readonly protelAvailabilitiesService: ProtelAvailabilitiesService,
  ) {}

  @Post()
  create(@Body() createProtelAvailabilityDto: CreateProtelAvailabilityDto) {
    return this.protelAvailabilitiesService.create(createProtelAvailabilityDto)
  }

  @Post('search')
  findAll(@Body() protelAvailabilityPostBody: IProtelAvailabilityPostBody) {
    return this.protelAvailabilitiesService.findAll(protelAvailabilityPostBody)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.protelAvailabilitiesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProtelAvailabilityDto: UpdateProtelAvailabilityDto,
  ) {
    return this.protelAvailabilitiesService.update(
      +id,
      updateProtelAvailabilityDto,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.protelAvailabilitiesService.remove(+id)
  }
}
