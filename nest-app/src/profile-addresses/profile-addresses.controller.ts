import { Controller, Get } from '@nestjs/common';
import { ProfileAddressesService } from './profile-addresses.service';

@Controller('v1/profile-addresses')
export class ProfileAddressesController {
  constructor(
    private readonly profileAddressesService: ProfileAddressesService,
  ) {}
  @Get()
  findAll(): any[] {
    return this.profileAddressesService.findAll();
  }
}
