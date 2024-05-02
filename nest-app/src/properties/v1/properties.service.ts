import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class PropertiesService {
  create(createPropertyDto: CreatePropertyDto) {
    return 'This action adds a new property';
  }

  findAll() {
    return [
      {
        name: 'Kalahari Tented Camp',
        id: 3599,
      },
      {
        name: 'Kielie Krankie',
        id: 3600,
      },
      {
        name: 'Grootkolk',
        id: 3601,
      },
      {
        name: 'Urikaruus',
        id: 3602,
      },
      {
        name: 'Bitterpan',
        id: 3603,
      },
      {
        name: 'Gharagab',
        id: 3604,
      },
      {
        name: 'Nossob',
        id: 3605,
      },
      {
        name: 'Twee Rivieren',
        id: 3606,
      },
      {
        name: 'Mata-Mata',
        id: 3607,
      },
      {
        name: 'Unions End',
        id: 3608,
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
