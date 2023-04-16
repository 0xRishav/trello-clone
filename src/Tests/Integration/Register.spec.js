describe('Registration form validation', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should show an error when email is invalid', () => {
    cy.get('input[type="text"]').type('invalid-email');
    cy.get('input[type="password"]').type('Abc456@13');
    cy.get('button.primary-button').click();
    cy.get('.error').contains('Email is not valid');
  });

  it('should show an error when password is invalid', () => {
    cy.get('input[type="text"]').type('abc@gmail.com');
    cy.get('input[type="password"]').type('invalidpass');
    cy.get('button.primary-button').click();
    cy.get('.error').contains('Password is not valid');
  });

  it('should show an error when both email and password are invalid', () => {
    cy.get('input[type="text"]').type('invalid-email');
    cy.get('input[type="password"]').type('invalidpass');
    cy.get('button.primary-button').click();
    cy.get('.error').contains('Email & Password not valid');
  });

  it('should not show an error when email and password are valid', () => {
    cy.get('input[type="text"]').type('abcd@gmail.com');
    cy.get('input[type="password"]').type('Abc456@13');
    cy.get('button.primary-button').click();
    cy.get('.error').should('not.exist');
  });
});
