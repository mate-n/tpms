import { Injectable } from '@nestjs/common';
import { ProfilesFaker } from 'src/shared/faker/ProfilesFaker';
import { IProfile } from 'src/shared/interfaces/profiles/IProfile';
import { IProfileSearch } from 'src/shared/interfaces/profiles/IProfileSearch';

@Injectable()
export class ProfilesService {
  profilesFaker = new ProfilesFaker();
  create(profile: IProfile) {
    return this.profilesFaker.create();
  }

  findAll(): IProfile[] {
    let profile1 = this.profilesFaker.create();
    profile1.id = 1;
    let profile2 = this.profilesFaker.create();
    profile2.id = 2;
    let profile3 = this.profilesFaker.create();
    profile3.id = 3;
    const profiles = [profile1, profile2, profile3];
    return profiles;
  }

  findOne(id: number) {
    return this.profilesFaker.create();
  }

  update(id: number, profile: IProfile) {
    return this.profilesFaker.create();
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }

  search(profileSearch: IProfileSearch) {
    let profile1 = this.profilesFaker.create();
    profile1.id = 1;
    let profile2 = this.profilesFaker.create();
    profile2.id = 2;
    let profile3 = this.profilesFaker.create();
    profile3.id = 3;
    const profiles = [profile1, profile2, profile3];
    return profiles;
  }
}
