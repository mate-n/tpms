import { Module } from '@nestjs/common'
import { ProtelAvailabilitiesService } from './protel-availabilities.service'
import { ProtelAvailabilitiesController } from './protel-availabilities.controller'

@Module({
  controllers: [ProtelAvailabilitiesController],
  providers: [ProtelAvailabilitiesService],
})
export class ProtelAvailabilitiesModule {}
