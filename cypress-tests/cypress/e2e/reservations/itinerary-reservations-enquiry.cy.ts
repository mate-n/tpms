import { DateFormatter } from '../../helpers/DateFormatter';
import { DateHelper } from '../../helpers/DateHelper';
import { PriceFormatter } from '../../helpers/PriceFormatter';

import { IProtelAvailability } from '../../interfaces/protel/IProtelAvailability';
import { ROUTE_PATHS } from '../../utils/route-paths';

const calculateTotalRate = (availability: IProtelAvailability) => {
  return availability.rates_data.reduce((acc, rate) => acc + Number(rate.room_rate), 0);
};

describe('itinerary-reservations-enquiry', () => {
  const dateFormatter = new DateFormatter();
  const dateHelper = new DateHelper();
  const priceFormatter = new PriceFormatter();

  beforeEach(() => {
    cy.intercept(new RegExp(/api\/v1\/camps/)).as('getCampsApi');
    cy.intercept('POST', new RegExp(/api\/v1\/availabilities/)).as('getAvalabilitiesApi');
    cy.login();
  });

  const expectReservationCardData = (availability: IProtelAvailability) => {
    const arrivalDate = dateHelper.getTodayDate();
    const departureDate = dateHelper.addDays(arrivalDate, 1);

    cy.getByCy('property_name').should('contain', availability.property_name);
    cy.getByCy('room_type_code').should('contain', availability.room_type_code);
    cy.getByCy('arrival_date').should('contain', dateFormatter.dddotmmdotyyyy(arrivalDate));
    cy.getByCy('departure_date').should('contain', dateFormatter.dddotmmdotyyyy(departureDate));
    cy.getByCy('total').should('contain', priceFormatter.formatPrice(calculateTotalRate(availability)));
  };

  it('add to cart', () => {
    cy.visit(ROUTE_PATHS.ITINERARY_RESERVATION_ENQUIRY);

    const numOfAvalabilities = 2;

    // select filters
    cy.selectMultipleSelectValue('camp_autocomplete', { eqs: [0] });

    cy.getByCy(`camp_availabilities_container`)
      .eq(0)
      .within(() => {
        // show availabilities
        cy.getByCy('expand_avalabilities_button').click();

        // select avalabilities
        new Array(numOfAvalabilities).fill('').forEach((_, index) => {
          cy.getByCy('avalablity_item').eq(index).click();
        });
      });

    // add to cart
    cy.getByCy('add_to_cart_button').click();

    // show cart items
    cy.getByCy('cart_icon_button').click();

    cy.wait('@getAvalabilitiesApi').then(({ response }) => {
      cy.wrap(response.body.data.availability_data).as('availabilititesData');
    });

    // expect cart items data
    cy.get('@availabilititesData').then((data) => {
      const availabilities = data as unknown as IProtelAvailability[];

      availabilities.slice(0, numOfAvalabilities).forEach((availability, index) => {
        cy.getByCy('reservation_basket_menu_card')
          .eq(index)
          .within(() => expectReservationCardData(availability));
      });

      // open basket dialog
      cy.getByCy('basket_menu_card').within(() => {
        cy.getByCy('view_cart_button').click();
      });

      // expect basket cards data
      let totalPrice = 0;
      availabilities.slice(0, numOfAvalabilities).forEach((availability, index) => {
        totalPrice += calculateTotalRate(availability);
        cy.getByCy('reservation_basket_card')
          .eq(index)
          .within(() => expectReservationCardData(availability));
      });

      cy.getByCy('basket_card').within(() => {
        cy.getByCy('total_all').should('contain', priceFormatter.formatPrice(totalPrice));
      });
    });
  });
});
