describe("Go to Home", () => {
  it("should go to home page", () => {
    cy.visit("/");
  });
});

it("display home routes ", () => {
  cy.visit("/");
  cy.get("#logo").should("exist").and("have.attr", "href", "/");
  cy.get("#contact").should("exist").and("have.attr", "href", "/contact");
});

it("display home routes ", () => {
  cy.visit("/");
  cy.get('[data-cy="email"]').clear();
  cy.get('[data-cy="email"]').type("testemail@gmail.com");
  cy.get('[data-cy="btn"]').click();
});
