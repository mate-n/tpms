import { Injectable } from '@nestjs/common';
import { StationeryFaker } from 'src/shared/faker/StationeryFaker';
import { IStationery } from 'src/shared/interfaces/IStationery';

@Injectable()
export class StationeriesService {
  stationeryFaker = new StationeryFaker();
  create(stationery: IStationery) {
    return this.stationeryFaker.create();
  }

  findAll() {
    const stationery1 = this.stationeryFaker.create();
    const stationery2 = this.stationeryFaker.create();
    const stationery3 = this.stationeryFaker.create();
    return [stationery1, stationery2, stationery3];
  }

  findOne(id: number) {
    return this.stationeryFaker.create();
  }

  update(stationery: IStationery) {
    return this.stationeryFaker.create();
  }

  remove(id: number) {
    return `This action removes a #${id} stationery`;
  }
}
