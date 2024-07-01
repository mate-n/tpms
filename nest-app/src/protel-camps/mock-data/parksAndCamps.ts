import { IParksAndCamps } from 'src/shared/interfaces/IParksAndCamps'

const parksAndCamps: IParksAndCamps = {
  'Kruger National Park': {
    parknid: '1',
    camps: [
      {
        campid: 3599,
        campname: 'Skukuza Rest Camp',
      },
      {
        campid: 3600,
        campname: 'Lower Sabie Rest Camp',
      },
    ],
  },
  'Kgalagadi Transfrontier Park': {
    parknid: '2',
    camps: [
      {
        campid: 19315,
        campname: 'Mata Mata',
      },
      {
        campid: 19317,
        campname: 'Kieliekrankie Wilderness Camp',
      },
      {
        campid: 19321,
        campname: 'Gharagab Wilderness Camp',
      },
      {
        campid: 19325,
        campname: 'Twee Riveren',
      },
      {
        campid: 19335,
        campname: 'Grootkolk Wilderness Camp',
      },
      {
        campid: 19337,
        campname: 'Kalahari Tent Camp',
      },
    ],
  },
}

export default parksAndCamps
