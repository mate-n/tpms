import { IProtelAvailability } from '../interfaces/protel/IProtelAvailability';

type AvailabilityResponse = {
  data: {
    availability_data: IProtelAvailability[];
  };
};

export const updateAvalabilitiesResponse = (
  response: AvailabilityResponse,
  index: number,
  data: Partial<IProtelAvailability>
): AvailabilityResponse => {
  return {
    data: {
      ...response.data,
      availability_data: response.data.availability_data.map((avalability, itemIndex) => {
        if (index !== itemIndex) return avalability;
        return {
          ...avalability,
          ...data,
        };
      }),
    },
  };
};
