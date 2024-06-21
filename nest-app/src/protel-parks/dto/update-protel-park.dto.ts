import { PartialType } from '@nestjs/mapped-types';
import { CreateProtelParkDto } from './create-protel-park.dto';

export class UpdateProtelParkDto extends PartialType(CreateProtelParkDto) {}
