describe("string reversal page functions correctly", function() {
  before(function() {
    cy.visit("http://localhost:3000/algososh/recursion");
  });

  it("should have an empty field and disable the button when input string is empty", function() {
    cy.get("input")
      .invoke("val")
      .then((text) => {
        if (text === "") {
          cy.get("button").should("be.disabled");
        }
      });
  });
});
