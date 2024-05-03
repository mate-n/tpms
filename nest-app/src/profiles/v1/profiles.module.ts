import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfileAddressesService } from 'src/profile-addresses/v1/profile-addresses.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileAddressesService],
})
export class ProfilesModule {}
