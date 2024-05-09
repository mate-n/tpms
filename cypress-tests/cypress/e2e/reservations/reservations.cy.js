/// <reference types="cypress" />
describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://vue:8080')
    })

    it('displays title of frontend', () => {
        cy.get('.elevation-2 > .v-toolbar__content > .v-toolbar-title > .v-toolbar-title__placeholder').should('have.text', 'tpms-frontend')
    })
})
