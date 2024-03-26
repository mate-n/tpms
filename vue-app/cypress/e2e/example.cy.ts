// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('Welcome to our Website')
  })
})

describe('My Second Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('Welcome to our Websitexxxxx')
  })
})
