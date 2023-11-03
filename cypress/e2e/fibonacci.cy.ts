describe("fibonacci sequence page functions correctly", function() {
  before(function() {
    cy.visit("/algososh/fibonacci");
  });

  it("should disable the button when input string is empty", function() {
    cy.get("input")
      .invoke("val")
      .then((text) => {
        if (text === "") {
          cy.contains("button", "Рассчитать").should("be.disabled");
        }
      });
  });
});

describe("fibonacci sequence animation functions correctly", function() {
  const testString = "4";
  before(function() {
    cy.visit("/algososh/fibonacci");
    cy.get("input").clear().type(testString);
    cy.getBySel("numbers").as("numbers");
  });

  it("animation is ok", function() {
    cy.contains("button", "Рассчитать").click();

    // Step one:
    expect(cy.get("@numbers").should("have.length", 1));
    cy.get("@numbers")
      .getBySel("letter")
      .should(($li) => {
        expect($li.get(0).textContent).to.equal("1");
      });

    // Step two:
    expect(cy.get("@numbers").getBySel("letter").should("have.length", 2));
    cy.get("@numbers")
      .getBySel("letter")
      .should(($li) => {
        expect($li.get(0).textContent).to.equal("1");
        expect($li.get(1).textContent).to.equal("1");
      });

    // Step three:
    expect(cy.get("@numbers").getBySel("letter").should("have.length", 3));
    cy.get("@numbers")
      .getBySel("letter")
      .should(($li) => {
        expect($li.get(0).textContent).to.equal("1");
        expect($li.get(1).textContent).to.equal("1");
        expect($li.get(2).textContent).to.equal("2");
      });

    // Step four:
    expect(cy.get("@numbers").getBySel("letter").should("have.length", 4));
    cy.get("@numbers")
      .getBySel("letter")
      .should(($li) => {
        expect($li.get(0).textContent).to.equal("1");
        expect($li.get(1).textContent).to.equal("1");
        expect($li.get(2).textContent).to.equal("2");
        expect($li.get(3).textContent).to.equal("3");
      });

    // Step five:
    expect(cy.get("@numbers").getBySel("letter").should("have.length", 5));
    cy.get("@numbers")
      .getBySel("letter")
      .should(($li) => {
        expect($li.get(0).textContent).to.equal("1");
        expect($li.get(1).textContent).to.equal("1");
        expect($li.get(2).textContent).to.equal("2");
        expect($li.get(3).textContent).to.equal("3");
        expect($li.get(4).textContent).to.equal("5");
      });
  });
});
