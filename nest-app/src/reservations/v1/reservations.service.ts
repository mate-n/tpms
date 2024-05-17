import { Injectable } from '@nestjs/common';
import { ReservationFaker } from 'src/shared/faker/ReservationFaker';
import { IReservation } from 'src/shared/interfaces/IReservation';

@Injectable()
export class ReservationsService {
  reservationFaker = new ReservationFaker();
  create(reservation: IReservation) {
    return this.reservationFaker.create();
  }

  findAll() {
    const reservation1 = this.reservationFaker.create();
    const reservation2 = this.reservationFaker.create();
    return [reservation1, reservation2];
  }

  findOne(id: number) {
    return this.reservationFaker.create();
  }

  update(reservation: IReservation) {
    return this.reservationFaker.create();
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
