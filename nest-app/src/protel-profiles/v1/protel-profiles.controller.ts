import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common'
import { ProtelProfilesService } from './protel-profiles.service'
import { ProfileConverter } from 'src/shared/converters/ProfileConverter'

@Controller('v1/protel-profiles')
export class ProtelProfilesController {
  profileConverter = new ProfileConverter()
  constructor(private readonly protelProfilesService: ProtelProfilesService) {}

  @Post()
  create() {
    return this.protelProfilesService.create()
  }

  @Get()
  async findAll() {
    const protelProfiles = await this.protelProfilesService.getProfiles()
    return protelProfiles.map((profile) =>
      this.profileConverter.convertToProfile(profile),
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profile = await this.protelProfilesService.findOne(+id)
    return this.profileConverter.convertToProfile(profile)
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.protelProfilesService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.protelProfilesService.remove(+id)
  }
}
