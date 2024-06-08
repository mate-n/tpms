import { Injectable } from '@nestjs/common';
import { ICamp } from 'src/shared/interfaces/ICamp';
import { IParksAndCamps } from 'src/shared/interfaces/IParksAndCamps';

@Injectable()
export class ProtelCampsService {
  create() {
    return 'This action adds a new protelCamp';
  }

  findAll() {
    return new Promise((resolve) => {
      console.log('Getting parks and camps');
      this.getParksAndCamps().then((result: IParksAndCamps) => {
        const camps: ICamp[] = [];
        result['Kgalagadi Transfrontier Park'].camps.forEach((camp) => {
          camps.push(camp);
        });
        result['Kruger National Park'].camps.forEach((camp) => {
          camps.push(camp);
        });
        resolve(camps);
      });
    });

    return `This action returns all protelCamps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} protelCamp`;
  }

  update(id: number) {
    return `This action updates a #${id} protelCamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} protelCamp`;
  }

  getParksAndCamps() {
    return new Promise<IParksAndCamps>((resolve) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer 1234567890');

      const raw = '';

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 1234567890',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: raw,
        redirect: 'follow' as RequestRedirect,
      };

      fetch(
        'https://ankerws.ankerdata.co.za/getparksandcamps/index.php',
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => resolve(result))
        .catch((error) => console.error(error));
    });
  }
}