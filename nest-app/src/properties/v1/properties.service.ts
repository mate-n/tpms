import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { IPropertyAvailabilitySearch } from 'src/shared/interfaces/availability/IPropertyAvailabilitySearch';
import { IPropertyAvailability } from 'src/shared/interfaces/availability/IPropertyAvailability';
import { IProperty } from 'src/shared/interfaces/IProperty';

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

  findOne(id: number): IProperty {
    return {
      name: 'Kalahari Tented Camp',
      id: 3599,
    };
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  search(
    propertyAvailabilitySearch: IPropertyAvailabilitySearch,
  ): IPropertyAvailability[] {
    return [
      {
        room: {
          type: 18,
          minOccupancy: 4,
          maxOccupancy: 6,
          code: 'aperte',
          name: 'voluptatum',
          description: 'contra',
          id: 17,
        },
        availabilityCount: 64,
        baseRateCategory: 'vestrum',
        roomRates: [
          {
            ratesCode: 'cimentarius',
            roomRate: 180,
          },
          {
            ratesCode: 'defluo',
            roomRate: 590,
          },
        ],
      },
      {
        room: {
          type: 4,
          minOccupancy: 4,
          maxOccupancy: 9,
          code: 'arcesso',
          name: 'canis',
          description: 'angustus',
          id: 58,
        },
        availabilityCount: 77,
        baseRateCategory: 'surculus',
        roomRates: [
          {
            ratesCode: 'audeo',
            roomRate: 486,
          },
          {
            ratesCode: 'utrimque',
            roomRate: 19,
          },
        ],
      },
      {
        room: {
          type: 51,
          minOccupancy: 1,
          maxOccupancy: 10,
          code: 'capillus',
          name: 'tamen',
          description: 'ad',
          id: 11,
        },
        availabilityCount: 69,
        baseRateCategory: 'usitas',
        roomRates: [
          {
            ratesCode: 'caelestis',
            roomRate: 256,
          },
          {
            ratesCode: 'ars',
            roomRate: 117,
          },
        ],
      },
    ];
  }
}
