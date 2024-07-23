import { ROUTE_PATHS } from '../utils/route-paths';

Cypress.Commands.add('getByCy', (dataCy, options) => {
  return cy.get(`[data-cy="${dataCy}"]`, options);
});

Cypress.Commands.add('typeTextField', (dataCy, value) => {
  cy.getByCy(dataCy).within(() => {
    cy.get('input').type(value);
  });
});

Cypress.Commands.add('expectFieldError', (dataCy, options) => {
  cy.getByCy(dataCy).within(() => {
    if (options.exist) {
      if (options.message) {
        cy.get('div.v-messages__message').should('contain', options.message);
      } else {
        cy.get('div.v-messages__message').should('exist');
      }
    } else {
      cy.get('div.v-messages__message').should('not.exist');
    }
  });
});

Cypress.Commands.add('selectSingleSelectValue', (dataCy, options) => {
  // open dropdown
  cy.getByCy(dataCy).within(() => {
    cy.get('i.v-select__menu-icon').click();
  });

  // select options
  cy.document()
    .its('body')
    .within(() => {
      if (options?.eq !== undefined) {
        cy.get('div[role="option"]').eq(options.eq).click();
      } else if (options?.label) {
        cy.get('div[role="option"]').contains(options.label).click();
      }
    });
});

Cypress.Commands.add('selectMultipleSelectValue', (dataCy, options) => {
  // open dropdown
  cy.getByCy(dataCy).within(() => {
    cy.get('i[title="Open"]').click();
    cy.get('i[title="Close"]').should('exist');
  });

  // select options
  cy.document()
    .its('body')
    .within(() => {
      if (options?.eqs?.length) {
        options.eqs.forEach((eq) => {
          cy.get('input[type="checkbox"]').eq(eq).click();
        });
      } else if (options?.labels?.length) {
        options.labels.forEach((label) => {
          cy.get('div[role="option"]').contains(label).click();
        });
      }
    });

  // close dropdown
  cy.getByCy(dataCy).within(() => {
    cy.get('i[title="Close"]').click();
    cy.get('i[title="Open"]').should('exist');
  });
});

Cypress.Commands.add('selectDateSelecterValue', (dataCy, options) => {
  // open dropdown
  cy.getByCy(dataCy).within(() => {
    cy.get('div.v-input__control').click();
  });

  cy.document()
    .its('body')
    .within(() => {
      cy.getByCy(`${dataCy}_picker`).within(() => {
        cy.get('button.v-date-picker-month__day-btn').contains(options.day).click();
      });
    });

  // close dropdown
  cy.getByCy(dataCy).within(() => {
    cy.get('div.v-input__control').click();
  });
});

Cypress.Commands.add('login', (username = 'demo') => {
  cy.clearLocalStorage();
  cy.clearCookies();

  cy.visit(ROUTE_PATHS.LOGIN);

  cy.fixture('users').then((users) => {
    const user = users[username];
    cy.getByCy('login_card').within(() => {
      cy.typeTextField('username_field', user.username);
      cy.typeTextField('password_field', user.password);
      cy.getByCy('login_button').click();

      cy.url().should('not.contain', ROUTE_PATHS.LOGIN);
    });
  });
});
