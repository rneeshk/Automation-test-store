class LoginPage{
    visit(){
        cy.visit('https://automationteststore.com/');
    }
    clickOnLogin(){
        cy.get('#customer_menu_top > li > a').click();
        cy.wait(1000);
        cy.url().should('include','account/login');
    }

    loginDetails(loginName, password){
        cy.get('#loginFrm_loginname').type(loginName);
        cy.get('#loginFrm_password').type(password);
        cy.get('#loginFrm > fieldset > .btn').click();
        cy.wait(1000);
    }

    forgotPassword(loginname, loginemail){
        cy.get('[href="https://automationteststore.com/index.php?rt=account/forgotten/password"]').click();
        cy.wait(1000);
        cy.get('#forgottenFrm_loginname').type(loginname);
        cy.get('#forgottenFrm_email').type(loginemail);
        cy.get('.col-md-12 > .btn-orange').click();
        cy.wait(1000);
        cy.get('.alert').should('be.visible').and('have.text','\n×\nError: No records found matching information your provided, please check your information and try again!');
    }
    
}

export default new LoginPage();