import { Module } from '@nestjs/common';
import { ProtelProfilesService } from './protel-profiles.service';
import { ProtelProfilesController } from './protel-profiles.controller';

@Module({
  controllers: [ProtelProfilesController],
  providers: [ProtelProfilesService],
})
export class ProtelProfilesModule {}
