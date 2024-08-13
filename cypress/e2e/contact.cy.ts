describe("Contact page", () => {
  it.skip("should navigate and send a form", () => {
    cy.visit("/contact");

    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type("someemail@gmail.com");

    cy.get('[data-cy="subject"]').clear();
    cy.get('[data-cy="subject"]').type("Buy");

    cy.get('[data-cy="message"]').clear();
    cy.get('[data-cy="message"]').type("I need help");

    cy.get('[data-cy="submitForm"]').click();
  });
});
