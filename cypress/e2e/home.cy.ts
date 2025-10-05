
describe("Home Page E2E", () => {
  beforeEach(() => {
    cy.visit("/home"); // your route
  });

  it("should display header and cart link", () => {
    cy.get("header").should("exist");
    cy.contains("Cart").should("exist");
  });

  it("should search for products and display results", () => {
    cy.get('input[placeholder="Search products..."]').type("shirt");
    cy.wait(500); // wait for debounce
    cy.get(".grid").find(".ProductCard").should("have.length.greaterThan", 0);
  });

  it("should navigate to product details on click", () => {
    cy.get(".ProductCard").first().click();
    cy.url().should("include", "/product/");
    cy.get("h1, h2, h3").should("exist"); // check title exists
  });
});
