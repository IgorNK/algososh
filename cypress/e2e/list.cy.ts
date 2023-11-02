describe("linked list page functions correctly", function() {
    beforeEach(function() {
      cy.visit("/algososh/list");
    });
  
    it("should disable buttons when input string is empty", function() {
      cy.get("*[data-cy='input-value']")
        .invoke("val")
        .then((text) => {
          if (text === "") {
            cy.get("*[data-cy='button-add-to-head']").should("be.disabled");
            cy.get("*[data-cy='button-add-to-tail']").should("be.disabled");
            cy.get("*[data-cy='button-add-by-index']").should("be.disabled");
          }
        });
    });

    it("should disable add by index button when index string is empty", function() {
      cy.get("*[data-cy='input-index']")
        .invoke("val")
        .then((text) => {
          if (text === "") {
            cy.get("*[data-cy='button-add-by-index']").should("be.disabled");
          }
        })
    })
});