import { PartialType } from '@nestjs/mapped-types';
import { CreateProtelProfileDto } from './create-protel-profile.dto';

export class UpdateProtelProfileDto extends PartialType(CreateProtelProfileDto) {}
