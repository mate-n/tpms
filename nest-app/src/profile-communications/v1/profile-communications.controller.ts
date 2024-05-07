import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileCommunicationFaker } from 'src/shared/faker/ProfileCommunicationFaker';
import { IProfile } from 'src/shared/interfaces/profiles/IProfile';
import { IProfileSearch } from 'src/shared/interfaces/profiles/IProfileSearch';

@Controller('v1/profiles/communications')
export class ProfileCommunicationsController {
  profileCommunicationFaker = new ProfileCommunicationFaker();
  @Get()
  findAll(): any[] {
    const profileCommunication1 = this.profileCommunicationFaker.create();
    const profileCommunication2 = this.profileCommunicationFaker.create();
    const profileCommunication3 = this.profileCommunicationFaker.create();
    const profileCommunications = [
      profileCommunication1,
      profileCommunication2,
      profileCommunication3,
    ];
    return profileCommunications;
  }

  @Post()
  create(@Body() input: any) {
    return this.profileCommunicationFaker.create();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileCommunicationFaker.create();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() profile: IProfile) {
    return this.profileCommunicationFaker.create();
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() profile: IProfile) {
    return this.profileCommunicationFaker.create();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return;
  }

  @Post('search')
  search(@Body() profileSearch: IProfileSearch) {
    const profileCommunication1 = this.profileCommunicationFaker.create();
    const profileCommunication2 = this.profileCommunicationFaker.create();
    const profileCommunication3 = this.profileCommunicationFaker.create();
    const profileCommunications = [
      profileCommunication1,
      profileCommunication2,
      profileCommunication3,
    ];
    return profileCommunications;
  }
}
