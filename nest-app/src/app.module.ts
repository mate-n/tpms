import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/v1/profiles.module';
import { PropertiesModule } from './properties/v1/properties.module';
import { DropdownsController } from './dropdowns/v1/dropdowns.controller';
import { RoomsController } from './rooms/v1/rooms.controller';
import { ProfileAddressesController } from './profile-addresses/v1/profile-addresses.controller';
import { ProfileAddressesService } from './profile-addresses/v1/profile-addresses.service';
import { ProfileCommunicationsController } from './profile-communications/v1/profile-communications.controller';
import { StationeriesModule } from './stationeries/v1/stationeries.module';

@Module({
  imports: [ProfilesModule, PropertiesModule, StationeriesModule],
  controllers: [
    AppController,
    DropdownsController,
    RoomsController,
    ProfileAddressesController,
    ProfileCommunicationsController,
  ],
  providers: [AppService, ProfileAddressesService],
})
export class AppModule {}
