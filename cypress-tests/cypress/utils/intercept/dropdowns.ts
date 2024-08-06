export const DROPDOWNS_NATIONALITITES_GET_ALIAS = 'api.dropdowns.nationalities';

const nationalitiesGet = () => {
  cy.fixture('api/dropdowns/nationalities/get').then((response) => {
    cy.intercept('GET', new RegExp(/v1\/dropdowns\/nationalities/), (req) =>
      req.reply({ body: response, delay: 500 })
    ).as(DROPDOWNS_NATIONALITITES_GET_ALIAS);
  });
};

const interceptDropdowns = {
  nationalities: {
    get: nationalitiesGet,
    GET_ALIAS: DROPDOWNS_NATIONALITITES_GET_ALIAS,
  },
};

export default interceptDropdowns;
