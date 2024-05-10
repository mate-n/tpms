import { Controller, Get } from '@nestjs/common';
import { IRoom } from 'src/shared/interfaces/IRoom';

@Controller('v1/rooms')
export class RoomsController {
  @Get()
  findAll(): IRoom[] {
    return [
      {
        type: 2,
        minOccupancy: 3,
        maxOccupancy: 6,
        code: 'aliquam',
        name: 'Standard | King',
        description: 'antea',
        id: 37,
      },
      {
        type: 88,
        minOccupancy: 0,
        maxOccupancy: 3,
        code: 'debeo',
        name: 'Standard | Queen',
        description: 'beneficium',
        id: 12,
      },
      {
        type: 32,
        minOccupancy: 0,
        maxOccupancy: 9,
        code: 'aliquam',
        name: 'Standard | Twin',
        description: 'cohaero',
        id: 40,
      },
      {
        type: 16,
        minOccupancy: 3,
        maxOccupancy: 3,
        code: 'creber',
        name: 'Standard | Single',
        description: 'aufero',
        id: 95,
      },
    ];
  }

  @Get(':id')
  findOne(): IRoom {
    return {
      type: 2,
      minOccupancy: 3,
      maxOccupancy: 6,
      code: 'aliquam',
      name: 'Standard | King',
      description: 'antea',
      id: 37,
    };
  }
}
