import { PartialType } from '@nestjs/mapped-types'
import { CreateStationeryDto } from './create-stationery.dto'

export class UpdateStationeryDto extends PartialType(CreateStationeryDto) {}
