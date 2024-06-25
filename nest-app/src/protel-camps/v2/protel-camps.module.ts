import { Module } from '@nestjs/common'
import { ProtelCampsService } from './protel-camps.service'
import { ProtelCampsController } from './protel-camps.controller'

@Module({
  controllers: [ProtelCampsController],
  providers: [ProtelCampsService],
})
export class ProtelCampsModuleV2 {}
