/*
describe ('Scenario Login', () => {
    it('TC01-Valid Login', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standar_user')
    })
})


describe ('Scenario forgot password', () => {
    it('TC02-Login dengan credential valid', () => {
        cy.visit('https://www.saucedemo.com/v1/index.html')
        cy.get('[data-test="password"]').type('testing')
        cy.get('#login-button').click()
    })
})
 */
describe ('Scenario verifikasi fungsi login', () => {
    it('TC03-Login dengan username dan password valid', () => {
        cy.visit('https://www.saucedemo.com/v1/index.html')
        cy.get('#user-name').type('standard_user').should('have.value','standard_user')
        cy.get('#password').type('secret_sauce').should('be.visible')
        cy.get('.btn_action').click()
        cy.url().should('include', 'inventory')
    })
}) 