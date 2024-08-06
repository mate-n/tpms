import { IProtelAvailability } from '../../interfaces/protel/IProtelAvailability';

const POST_ALIAS = 'api.availabilitites.post';

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

const post = (data?: Partial<IProtelAvailability>, index?: number) => {
  cy.fixture('api/availabilities/post').then((response) => {
    cy.intercept('POST', new RegExp(/v1\/availabilities/), (req) =>
      req.reply({ body: updateAvalabilitiesResponse(response, index || 0, data), delay: 500 })
    ).as(POST_ALIAS);
  });
};

const interceptAvailabilities = {
  post,
  POST_ALIAS,
};

export default interceptAvailabilities;
