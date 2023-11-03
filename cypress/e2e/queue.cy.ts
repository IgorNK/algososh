describe("queue page functions correctly", function() {
  beforeEach(function() {
    cy.visit("/algososh/queue");
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

  it("should display an empty queue", function() {
    cy.getBySel("elements").as("elements");
    expect(cy.get("@elements").getBySel("circle").should("have.length", 7));
    cy.get("@elements")
      .getBySel("circle")
      .then(($li) => {
        cy.wrap($li.get(0)).getBySel("head").contains("head");
        cy.wrap($li.get(6)).getBySel("tail").contains("tail");
      });
  });
});

describe("queue animations work correctly", function() {
  const firstElement = "1";
  const secondElement = "2";
  const thirdElement = "3";

  beforeEach(function() {
    cy.visit("/algososh/queue");
    cy.get("*[data-cy='elements']").get("*[data-cy='circle']").as("elements");
    cy.get("input").as("input");
    cy.contains("button", "Добавить").as("add-button");
    cy.contains("button", "Удалить").as("delete-button");
    cy.contains("button", "Очистить").as("clear-button");
  });

  it("elements add ok", function() {
    cy.get("@input").clear().type(firstElement);
    cy.get("@add-button").click();

    // Step one - first element is colored as changing:
    cy.get("@elements")
      .getBySel("circle")
      .then(($li) => {
        cy.wrap($li.get(0)).getBySel("letter").as("letter");
        cy.get("@letter").should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });
      });

    // Step two - input string is placed in element circle, tail is moved:
    cy.get("@elements")
      .getBySel("circle")
      .then(($li) => {
        cy.wrap($li.get(0)).getBySel("head").contains("head");
        cy.wrap($li.get(0)).getBySel("tail").contains("tail");
        cy.wrap($li.get(0)).getBySel("letter").as("letter");
        cy.get("@letter").contains(firstElement);
        cy.get("@letter").should(($el) => {
          // expect($el.className.includes("circle_changing")).to.equal(true);
          expect($el.is(`[class*="circle_default"]`)).to.equal(true);
        });
      });

    // Step three - add second element, circle with index 1 is colored as changing:
    cy.get("@input").clear().type(secondElement);
    cy.get("@add-button").click();
    cy.get("@elements")
      .getBySel("circle")
      .then(($li) => {
        cy.wrap($li.get(1)).getBySel("letter").as("letter");
        cy.get("@letter").should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });
      });

    // Step four - tail and second number are moved to index 1
    cy.get("@elements")
      .getBySel("circle")
      .each(($el, ind) => {
        if (ind == 0) {
          cy.wrap($el).getBySel("letter").contains(firstElement);
          cy.wrap($el).getBySel("head").contains("head");
        }
        if (ind == 1) {
          cy.wrap($el).getBySel("letter").contains(secondElement);
          cy.wrap($el).getBySel("tail").contains("tail");
        }
      });

    // Step five - add third element, circle with index 2 is colored as changing:
    cy.get("@input").clear().type(thirdElement);
    cy.get("@add-button").click();
    cy.get("@elements")
      .getBySel("circle")
      .then(($li) => {
        cy.wrap($li.get(2)).getBySel("letter").as("letter");
        cy.get("@letter").should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });
      });

    // Step six - tail and second number are moved to index 2
    cy.get("@elements")
      .getBySel("circle")
      .each(($el, ind) => {
        if (ind == 0) {
          cy.wrap($el).getBySel("letter").contains(firstElement);
          cy.wrap($el).getBySel("head").contains("head");
        }
        if (ind == 1) {
          cy.wrap($el).getBySel("letter").contains(secondElement);
        }
        if (ind == 2) {
          cy.wrap($el).getBySel("letter").contains(thirdElement);
          cy.wrap($el).getBySel("tail").contains("tail");
        }
      });
  });

  it("removes elements from head ok", function() {
    cy.get("@input").clear().type(firstElement);
    cy.get("@add-button").click();
    cy.get("@input").clear().type(secondElement);
    cy.get("@add-button").click();
    cy.get("@input").clear().type(thirdElement);
    cy.get("@add-button").click();
    cy.get("@delete-button").click();

    // Expects 0-index element to mark as changing
    cy.get("@elements")
      .getBySel("circle")
      .then(($li) => {
        cy.wrap($li.get(0)).getBySel("letter").as("letter");
        cy.get("@letter").should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });
      });

    // Expects there to be no first element value in 0-index element
    cy.get("@elements")
      .getBySel("circle")
      .each(($el, ind) => {
        if (ind == 0) {
          cy.wrap($el).getBySel("letter").not(firstElement);
        }
      });

    // Expects head to move to 1-index element
    cy.get("@elements")
      .getBySel("circle")
      .each(($el, ind) => {
        if (ind == 1) {
          cy.wrap($el).getBySel("head").contains("head");
        }
      });
  });

  it("expects queue to return to default state when cleared", function() {
    cy.get("@input").clear().type(firstElement);
    cy.get("@add-button").click();
    cy.get("@input").clear().type(secondElement);
    cy.get("@add-button").click();
    cy.get("@input").clear().type(thirdElement);
    cy.get("@add-button").click();
    cy.get("@clear-button").click();

    cy.get("@elements")
      .getBySel("circle")
      .each(($el, ind) => {
        if (ind == 0) {
          cy.wrap($el).getBySel("head").contains("head");
        }
        if (ind == 5) {
          cy.wrap($el).getBySel("tail").contains("tail");
        }
        cy.wrap($el).getBySel("letter").invoke("text").should("be.empty");
      });
  });
});
