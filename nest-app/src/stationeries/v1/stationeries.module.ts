import { Module } from '@nestjs/common'
import { StationeriesService } from './stationeries.service'
import { StationeriesController } from './stationeries.controller'

@Module({
  controllers: [StationeriesController],
  providers: [StationeriesService],
})
export class StationeriesModule {}
