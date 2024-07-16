/// <reference types="cypress" />
describe('reservations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('displays title of frontend', () => {
        cy.get('.elevation-2 > .v-toolbar__content > .v-toolbar-title > .v-toolbar-title__placeholder').should('have.text', 'tpms-frontend')
    })
})
