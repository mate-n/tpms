import { Injectable } from '@nestjs/common';
import { ProfileAddressFaker } from 'src/shared/faker/ProfileAddressFaker';
import { IProfileAddress } from 'src/shared/interfaces/profiles/IProfileAddress';

@Injectable()
export class ProfileAddressesService {
  profileAddressFaker = new ProfileAddressFaker();

  findAll(): IProfileAddress[] {
    const profileAddress1 = this.profileAddressFaker.create();
    const profileAddress2 = this.profileAddressFaker.create();
    const profileAddress3 = this.profileAddressFaker.create();
    const profileAddresses = [
      profileAddress1,
      profileAddress2,
      profileAddress3,
    ];
    return profileAddresses;
  }
}
