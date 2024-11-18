/// <reference types = "Cypress" />
import LoginPage from "../pageObjects/LoginPage";

describe('User Auth - User Login & Authentication', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.clickOnLogin();
    });
    it('Log in with a valid username and password.', () => {
        LoginPage.loginDetails('borefam3', '1234');
        cy.url().should('include', 'account/account');
        cy.get('.maintext').should('be.visible').and('have.text', ' My Account');
    });

    it('Log in, log out, and log in again using the same valid credentials.', () => {
        LoginPage.loginDetails('borefam3', '1234');
        cy.url().should('include', 'account/account');
        cy.get('.maintext').should('be.visible').and('have.text', ' My Account');
        cy.get('.nav-dash > :nth-child(9) > a').click()
        cy.wait(1000);
        cy.get('.mb40 > :nth-child(3)').should('be.visible').and('have.text','You have been logged off your account. It is now safe to leave the computer.')

        LoginPage.clickOnLogin();
        LoginPage.loginDetails('borefam3', '1234');
        cy.url().should('include', 'account/account');
        cy.get('.maintext').should('be.visible').and('have.text', ' My Account');

    });
    it('Enter a valid username and an incorrect password.', () => {
        LoginPage.loginDetails('borefam3', '123');
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')
    });
    it('Try logging in with a username/email not registered in the system.', () => {
        LoginPage.loginDetails('borefa', '1234');
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')
    });

    it('Leave both the username and password fields empty and click the login button.', () => {
        cy.get('#loginFrm > fieldset > .btn').click();
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')
    });

    it('Log in with the correct username and an incorrect password, but vary the case.', () => {
        LoginPage.loginDetails('Borefam3', '123');
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')
    });

    it('Password recovery with a case-sensitive email', () => {
        LoginPage.forgotPassword('borefam3', 'Borefam187@edectus.com');
    });

    it('Test login with a password less than minimum length and the more than maximum allowed length.', () => {
        LoginPage.loginDetails('Borefam3', '123');
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')

        LoginPage.clickOnLogin();
        LoginPage.loginDetails('Borefam3', '12345678901234567890    ');
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')
    });

    it.only('Include leading and trailing whitespaces in the username and password fields.', () => {
        LoginPage.loginDetails(' Borefam3 ', ' 1234 ');
        cy.url().should('include','account/login')
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: Incorrect login or password provided.')
    });
});