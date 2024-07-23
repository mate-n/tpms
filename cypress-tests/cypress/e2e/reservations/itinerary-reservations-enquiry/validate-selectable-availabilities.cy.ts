import { ROUTE_PATHS } from '../../../utils/route-paths';

describe('itinerary-reservations-enquiry/validate-selectable-availabilities', () => {
  beforeEach(() => {
    cy.intercept(new RegExp(/api\/v1\/camps/)).as('getCampsApi');
    cy.intercept('POST', new RegExp(/api\/v1\/availabilities/)).as('getAvalabilitiesApi');
    cy.login();
  });

  it("Can't select availability has count is 0", () => {
    cy.visit(ROUTE_PATHS.ITINERARY_RESERVATION_ENQUIRY);

    // select filters
    cy.selectMultipleSelectValue('camp_autocomplete', { eqs: [0] });

    // expand avalabilities
    cy.getByCy(`camp_availabilities_container`).within(() => {
      cy.getByCy('expand_avalabilities_button').click();
    });

    // Select "avalability" has count is 0
    cy.getByCy(`camp_availabilities_container`).within(() => {
      cy.getByCy('avalablity_item').eq(0).click();
    });

    cy.wait(1000);

    // rightbar should not be shown
    cy.getByCy('itinerary_reservation_rightbar').should('not.exist');
  });

  it("Can't select availability in the past or today", () => {
    cy.visit(ROUTE_PATHS.ITINERARY_RESERVATION_ENQUIRY);

    // select filters
    cy.selectDateSelecterValue('arrival_date_selector', { previousMonth: true, day: '10' });
    cy.selectMultipleSelectValue('camp_autocomplete', { eqs: [0] });

    // expand avalabilities
    cy.getByCy(`camp_availabilities_container`).within(() => {
      cy.getByCy('expand_avalabilities_button').click();
    });

    // Select "avalability" in the past
    cy.getByCy(`camp_availabilities_container`).within(() => {
      cy.getByCy('avalablity_item').eq(0).click();
    });

    cy.wait(1000);

    // rightbar should not be shown
    cy.getByCy('itinerary_reservation_rightbar').should('not.exist');
  });
});
