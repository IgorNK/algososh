describe("stack page functions correctly", function() {
  before(function() {
    cy.visit("http://localhost:3000/algososh/stack");
  });

  it("should disable the button when input string is empty", function() {
    cy.get("input")
      .invoke("val")
      .then((text) => {
        if (text === "") {
          cy.contains("button", "Добавить").should("be.disabled");
        }
      });
  });
});

describe("adding elements to stack animates correctly", function() {
  const firstElement = "1";
  const secondElement = "2";
  const thirdElement = "3";

  before(function() {
    cy.visit("http://localhost:3000/algososh/stack");
  });

  it("step one is ok", function() {
    cy.get("input").clear().type(firstElement);
    cy.contains("button", "Добавить").click();

    cy.get("*[data-cy='numbers']").get("*[data-cy='circle']").as("elements");
    expect(cy.get("@elements").should("have.length", 1));
    cy.get("@elements").then(($elements) => { });
    // cy.get("@numbers").should(($li) => {
    //   expect($li.get(0).textContent).to.equal("1");
    //   expect($li.get(0).className.includes("circle_changing")).to.equal(true);
    // });
  });
});
