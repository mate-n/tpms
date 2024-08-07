import { IProtelAvailability } from '../../interfaces/protel/IProtelAvailability';

const POST_ALIAS = 'api.availabilitites.post';

type AvailabilityResponse = {
  data: {
    availability_data: IProtelAvailability[];
  };
};

export const updateAvalabilitiesResponse = ({
  response,
  index,
  all,
  data,
}: {
  response: AvailabilityResponse;
  index?: number;
  all?: boolean;
  data: Partial<IProtelAvailability>;
}): AvailabilityResponse => {
  return {
    data: {
      ...response.data,
      availability_data: response.data.availability_data.map((avalability, itemIndex) => {
        if (!all && index !== itemIndex) return avalability;
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
    cy.intercept('POST', new RegExp(/v1\/availabilities/), (req) => {
      const tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      tomorrow.setHours(23, 59, 0, 0);
      const body = updateAvalabilitiesResponse({
        response,
        all: true,
        data: {
          availability_start: tomorrow,
          availability_end: tomorrow,
          ...data,
        },
      });

      return req.reply({
        body: updateAvalabilitiesResponse({ response: body, index, data }),
        delay: 500,
      });
    }).as(POST_ALIAS);
  });
};

const interceptAvailabilities = {
  post,
  POST_ALIAS,
};

export default interceptAvailabilities;
