import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/v1/profiles.module';
import { PropertiesModule } from './properties/v1/properties.module';
import { DropdownsController } from './dropdowns/v1/dropdowns.controller';
import { RoomsController } from './rooms/v1/rooms.controller';

@Module({
  imports: [ProfilesModule, PropertiesModule],
  controllers: [AppController, DropdownsController, RoomsController],
  providers: [AppService],
})
export class AppModule {}
