import { PartialType } from '@nestjs/mapped-types'
import { CreateProtelAvailabilityDto } from './create-protel-availability.dto'

export class UpdateProtelAvailabilityDto extends PartialType(
  CreateProtelAvailabilityDto,
) {}
