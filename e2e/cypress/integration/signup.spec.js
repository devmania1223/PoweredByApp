/**
 * This was copied directly from PAVE, but hasn't been adjusted to match the PoweredBy signup flow yet.
 * If you're irritated that there's a whole file of disabled code committed to version control then fix it, Evan.
 */
describe('Sign Up', () => {
  it('these tests are disabled!', () => {
    // it('Signs up for free account, logs out, signs in, and closes the account', () => {
    //     const userName = `testuser+${Date.now()}@example.com`;
    //     const password = 'aSecurePassword';
    //     // Signs up
    //     cy.visit('sign-up/provider?plan=free');
    //     cy.get('form').within(() => {
    //       cy.get('input[name="firstName"]').type('Test');
    //       cy.get('input[name="lastName"]').type('User');
    //       cy.get('input[name="email"]').type(userName);
    //       cy.get('input[name="password"]').type(password);
    //       cy.get('input[name="password2"]').type(password);
    //     });
    //     cy.get('[data-cy=registerUser]').click();
    //     // Logs out
    //     cy.get('[data-cy=logOutLink').click();
    //     // Signs in
    //     cy.url().should('include', '/sign-in');
    //     cy.get('form').within(() => {
    //       cy.get('input[name="email"]').type(userName);
    //       cy.get('input[name="password"]').type(password);
    //     });
    //     cy.get('[data-cy=loginButton]').click();
    //     // closes the account
    //     cy.url().should('include', '/profile');
    //     cy.get('a[href="/profile/billing"]').click();
    //     cy.get('[data-cy=closeAccount]').click();
    //     cy.get('[data-cy=confirmCloseAccount]').click();
    //     cy.url().should('include', '/sign-in');
    //   });
    //   it('Signs up for plus account and closes the account', () => {
    //     cy.visit('sign-up/provider?plan=plus');
    //     cy.get('form').within(() => {
    //       cy.get('input[name="firstName"]').type('Test');
    //       cy.get('input[name="lastName"]').type('User');
    //       cy.get('input[name="email"]').type(`testuser+${Date.now()}@example.com`);
    //       cy.get('input[name="password"]').type('aSecurePassword');
    //       cy.get('input[name="password2"]').type('aSecurePassword');
    //     });
    //     cy.get('[data-cy=registerUser]').click();
    //     // Stripe form
    //     // https://github.com/cypress-io/cypress/issues/9447
    //     // can't upgrade from 5.5.0 until this issue is closed
    //     cy.wait(2000);
    //     cy.get('form').within(() => {
    //       cy.get('input[name="cardNumber"]').type('4242424242424242');
    //       cy.get('input[name="cardExpiry"]').type('0242');
    //       cy.get('input[name="cardCvc"]').type('111');
    //       cy.get('input[name="billingName"]').type('an automated test');
    //       cy.get('input[name="billingPostalCode"]').type('11111');
    //     });
    //     cy.get('button[type="submit"]').click();
    //     cy.wait(10000);
    //     cy.url().should('include', 'guided-setup');
    //     cy.get('[data-cy=ftu-modal-close]').click();
    //     cy.get('a[href="/profile/billing"]').click();
    //     cy.get('[data-cy=closeAccount]').click();
    //     cy.get('[data-cy=confirmCloseAccount]').click();
    //     cy.url().should('include', '/sign-in');
  });
});
