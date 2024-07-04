import { Module } from '@nestjs/common';
import { ProtelParksService } from './protel-parks.service';
import { ProtelParksController } from './protel-parks.controller';

@Module({
  controllers: [ProtelParksController],
  providers: [ProtelParksService],
})
export class ProtelParksModule {}
