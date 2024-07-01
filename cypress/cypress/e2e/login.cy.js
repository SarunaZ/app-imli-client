it("Register a user", () => {
  cy.visit("http://localhost:3000");
  cy.xpath('//button[@type="button"]').click();
  cy.xpath('//input[@name="username"]').type("test");
  cy.xpath('//input[@name="password"]').type("test");
  cy.xpath('//button[@type="submit"]').click();
});

it("Go to login page and login", () => {
  cy.visit("http://localhost:3000");
  cy.xpath('//input[@name="username"]').type("test");
  cy.xpath('//input[@name="password"]').type("test");
  cy.xpath('//button[@type="submit"]').click();
});
