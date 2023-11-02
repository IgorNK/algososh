describe("queue page functions correctly", function() {
  before(function() {
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
    cy.get("*[data-cy='elements']").get("*[data-cy='circle']").as("elements");
    expect(cy.get("@elements").should("have.length", 7));
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='head']").contains("head");
      cy.wrap($li.get(6)).get("*[data-cy='tail']").contains("tail");
    });
  })
});

describe("queue animations work correctly", function() {
  const firstElement = "1";
  const secondElement = "2";
  const thirdElement = "3";

  beforeEach(function() {
    cy.visit("/algososh/queue");
    cy.get("*[data-cy='elements']").get("*[data-cy='circle']").as("elements");
    cy.get("input").clear().as("input");
    cy.contains("button", "Добавить").as("add-button");
    cy.contains("button", "Удалить").as("delete-button");
    cy.contains("button", "Очистить").as("clear-button");
  });

  it("elements add ok", function() {
    cy.get("@input").type(firstElement);
    cy.get("@add-button").click();

    // Step one - first element is colored as changing: 
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='letter']").as("letter");
      cy.get("@letter").should($el => {
        expect($el.className.includes("circle_changing")).to.equal(true);
      })
    });

    // Step two - input string is placed in element circle, tail is moved:
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='head']").contains("head");
      cy.wrap($li.get(0)).get("*[data-cy='tail']").contains("tail");
      cy.wrap($li.get(0)).get("*[data-cy='letter']").as("letter");
      cy.get("@letter").contains(firstElement);
      cy.get("@letter").should($el => {
        expect($el.className.includes("circle_changing")).to.equal(true);
      })
    });

    
    cy.get("@elements").each(($el, ind) => {
      if (ind == 0) {
        cy.wrap($el).get("*[data-cy='letter']").contains(firstElement);
        cy.wrap($el).get("*[data-cy='head']").contains("head");
        cy.wrap($el).get("*[data-cy='tail']").contains("tail");
      }      
    })
  });
});