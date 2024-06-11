import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { IProfileSearch } from 'src/shared/interfaces/profiles/IProfileSearch'
import { IProfile } from 'src/shared/interfaces/profiles/IProfile'
import { IProfileAddress } from 'src/shared/interfaces/profiles/IProfileAddress'
import { ProfileAddressesService } from 'src/profile-addresses/v1/profile-addresses.service'
import { ProfileCommunicationFaker } from 'src/shared/faker/ProfileCommunicationFaker'

@Controller('v1/profiles')
export class ProfilesController {
  profileCommunicationFaker = new ProfileCommunicationFaker()
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly profileAddressesService: ProfileAddressesService,
  ) {}
  @Post()
  create(@Body() profile: IProfile) {
    return this.profilesService.create(profile)
  }

  @Get()
  findAll(): any[] {
    return this.profilesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() profile: IProfile) {
    return this.profilesService.update(+id, profile)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return
  }

  @Post('search')
  search(@Body() profileSearch: IProfileSearch) {
    return this.profilesService.search(profileSearch)
  }

  @Get(':id/addresses')
  addressses(): IProfileAddress[] {
    return this.profileAddressesService.findAll()
  }

  @Get(':id/communications')
  communications(): any[] {
    const profileCommunication1 = this.profileCommunicationFaker.create()
    const profileCommunication2 = this.profileCommunicationFaker.create()
    const profileCommunication3 = this.profileCommunicationFaker.create()
    const profileCommunications = [
      profileCommunication1,
      profileCommunication2,
      profileCommunication3,
    ]
    return profileCommunications
  }
}
