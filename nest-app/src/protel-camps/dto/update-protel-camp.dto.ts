import { PartialType } from '@nestjs/mapped-types'
import { CreateProtelCampDto } from './create-protel-camp.dto'

export class UpdateProtelCampDto extends PartialType(CreateProtelCampDto) {}
