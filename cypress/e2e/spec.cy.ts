describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("has 3 inputs and 1 button", () => {
    cy.get("#username-input");
    cy.get("#email-input");
    cy.get("#password-input");
    cy.get("#signin-button");
  });
  it("should type on username input", () => {
    cy.get("#username-input").click().type("jane");
  });
  it("has error handling", () => {
    cy.get("#signin-button").click();
    cy.contains("Name must be atleast 5 letters").should("be.visible");
  });
  it("should navigate to profile on signin button click", () => {
    cy.get("#username-input").click().type("jane2 smith");
    cy.get("#email-input").click().type("jane2@gmail.com");
    cy.get("#password-input").click().type("test1234");

    cy.get("#signin-button").click();

    cy.url({ timeout: 15000 }).should("eq", "http://localhost:3000/profile");
  });
});
