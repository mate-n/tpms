import interceptDropdowns from '../utils/intercept/dropdowns';
import { ROUTE_PATHS } from '../utils/route-paths';

Cypress.on('uncaught:exception', () => {
  return false;
});

describe('profiles', () => {
  beforeEach(() => {
    interceptDropdowns.nationalities.get();
    cy.login();
  });

  it('validate required fields', () => {
    cy.visit(ROUTE_PATHS.PROFILES);

    cy.getByCy('add_profile_button').click();

    cy.getByCy('save_profile_button').should('not.exist');

    // Private profile
    cy.getByCy('private_profile_form').within(() => {
      // expect initial errors
      cy.expectFieldError('first_name_field', { exist: true });
      cy.expectFieldError('last_name_field', { exist: true });

      // // change values
      cy.typeTextField('first_name_field', 'First');
      cy.typeTextField('last_name_field', 'Last');

      // // expect no errors
      cy.expectFieldError('first_name_field', { exist: false });
      cy.expectFieldError('last_name_field', { exist: false });
    });

    // Contact details
    cy.getByCy('profile_contact_detail_form').within(() => {
      // expect initial errors
      cy.expectFieldError('email_field', { exist: true });
      cy.expectFieldError('mobile_field', { exist: true });

      // // change values
      cy.typeTextField('email_field', 'test@gmail.com');
      cy.typeTextField('mobile_field', '123456789');

      // // expect no errors
      cy.expectFieldError('email_field', { exist: false });
      cy.expectFieldError('mobile_field', { exist: false });
    });

    // Personal info
    cy.getByCy('personal_info_form').within(() => {
      // expect initial errors
      cy.expectFieldError('nationality_field', { exist: true });
      cy.expectFieldError('date_of_birth_field', { exist: false });
      cy.expectFieldError('sa_id_number_field', { exist: false });

      // change values
      cy.selectSingleSelectValue('nationality_field', { eq: 0 });

      // expect errors
      cy.expectFieldError('nationality_field', { exist: false });
      cy.expectFieldError('date_of_birth_field', { exist: true });
      cy.expectFieldError('sa_id_number_field', { exist: true });

      // change values
      cy.selectDateSelecterValue('date_of_birth_field', { day: '10' });
      cy.typeTextField('sa_id_number_field', '2222222');

      // expect errors
      cy.expectFieldError('date_of_birth_field', { exist: false });
      cy.expectFieldError('sa_id_number_field', { exist: false });
    });

    cy.getByCy('save_profile_button').should('exist');
  });
});
