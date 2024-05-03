import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { IProfileSearch } from 'src/shared/interfaces/profiles/IProfileSearch';
import { IProfile } from 'src/shared/interfaces/profiles/IProfile';

@Controller('v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}
  @Post()
  create(@Body() profile: IProfile) {
    return this.profilesService.create(profile);
  }

  @Get()
  findAll(): any[] {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() profile: IProfile) {
    return this.profilesService.update(+id, profile);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return;
  }

  @Post('search')
  search(@Body() profileSearch: IProfileSearch) {
    return this.profilesService.search(profileSearch);
  }
}
