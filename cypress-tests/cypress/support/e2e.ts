import './commands';

type GetOption = Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByCy(value: string, options?: GetOption): Chainable<JQuery<HTMLElement>>;

      typeTextField(dataCy: string, value: string): Chainable<JQuery<HTMLElement>>;
      expectFieldError(dataCy: string, options: { exist: boolean; message?: string }): Chainable<JQuery<HTMLElement>>;

      selectSingleSelectValue(
        dataCy: string,
        options: {
          label?: string;
          /**
           * start with "0"
           */
          eq?: number;
        }
      ): Chainable<JQuery<HTMLElement>>;

      selectMultipleSelectValue(
        dataCy: string,
        options: {
          labels?: string[];
          /**
           * start with "0"
           */
          eqs?: number[];
        }
      ): Chainable<JQuery<HTMLElement>>;

      selectDateSelecterValue(
        dataCy: string,
        options: {
          day: string;
        }
      ): Chainable<JQuery<HTMLElement>>;

      login(
        username?: string,
        options?: {
          password?: string;
          rememberMe?: boolean;
          notExpect?: boolean;
          path?: string;
        }
      ): void;
    }
  }
}
