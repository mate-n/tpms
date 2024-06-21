import { PartialType } from '@nestjs/mapped-types';
import { CreateProtelRegionDto } from './create-protel-region.dto';

export class UpdateProtelRegionDto extends PartialType(CreateProtelRegionDto) {}
