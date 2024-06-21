import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProfilesModule } from './profiles/v1/profiles.module'
import { PropertiesModule } from './properties/v1/properties.module'
import { DropdownsController } from './dropdowns/v1/dropdowns.controller'
import { RoomsController } from './rooms/v1/rooms.controller'
import { ProfileAddressesController } from './profile-addresses/v1/profile-addresses.controller'
import { ProfileAddressesService } from './profile-addresses/v1/profile-addresses.service'
import { ProfileCommunicationsController } from './profile-communications/v1/profile-communications.controller'
import { StationeriesModule } from './stationeries/v1/stationeries.module'
import { ReservationsModule } from './reservations/v1/reservations.module'
import { ItineraryReservationsModule } from './itinerary-reservations/v1/itinerary-reservations.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProtelCampsModule } from './protel-camps/v1/protel-camps.module'
import { ProtelAvailabilitiesModule } from './protel-availabilities/v1/protel-availabilities.module'
import { ProtelStatusApiController } from './protel-status-api/protel-status-api.controller'
import { ProtelProfilesModule } from './protel-profiles/v1/protel-profiles.module'
import { ProtelRegionsModule } from './protel-regions/v1/protel-regions.module'
import { ProtelParksModule } from './protel-parks/v1/protel-parks.module'

@Module({
  imports: [
    ProfilesModule,
    PropertiesModule,
    StationeriesModule,
    ReservationsModule,
    ItineraryReservationsModule,
    AuthModule,
    UsersModule,
    ProtelCampsModule,
    ProtelAvailabilitiesModule,
    ProtelProfilesModule,
    ProtelRegionsModule,
    ProtelParksModule,
  ],
  controllers: [
    AppController,
    DropdownsController,
    RoomsController,
    ProfileAddressesController,
    ProfileCommunicationsController,
    ProtelStatusApiController,
  ],
  providers: [AppService, ProfileAddressesService],
})
export class AppModule {}
