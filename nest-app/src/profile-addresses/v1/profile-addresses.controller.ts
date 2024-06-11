import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { ProfileAddressesService } from './profile-addresses.service'
import { IProfile } from 'src/shared/interfaces/profiles/IProfile'
import { IProfileSearch } from 'src/shared/interfaces/profiles/IProfileSearch'

@Controller('v1/profiles/addresses')
export class ProfileAddressesController {
  constructor(
    private readonly profileAddressesService: ProfileAddressesService,
  ) {}
  @Get()
  findAll(): any[] {
    return this.profileAddressesService.findAll()
  }

  @Post()
  create(@Body() input: any) {
    return this.profileAddressesService.findOne()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileAddressesService.findOne()
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() profile: IProfile) {
    return this.profileAddressesService.findOne()
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() profile: IProfile) {
    return this.profileAddressesService.findOne()
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return
  }

  @Post('search')
  search(@Body() profileSearch: IProfileSearch) {
    return this.profileAddressesService.findAll()
  }
}
