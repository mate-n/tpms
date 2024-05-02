import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/v1/profiles.module';
import { PropertiesModule } from './properties/v1/properties.module';

@Module({
  imports: [ProfilesModule, PropertiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
