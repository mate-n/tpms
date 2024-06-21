import { Module } from '@nestjs/common';
import { ProtelRegionsService } from './protel-regions.service';
import { ProtelRegionsController } from './protel-regions.controller';

@Module({
  controllers: [ProtelRegionsController],
  providers: [ProtelRegionsService],
})
export class ProtelRegionsModule {}
