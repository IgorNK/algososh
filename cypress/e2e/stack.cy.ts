describe("stack page functions correctly", function() {
  before(function() {
    cy.visit("/algososh/stack");
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

  beforeEach(function() {
    cy.visit("/algososh/stack");
    cy.get("*[data-cy='numbers']").get("*[data-cy='circle']").as("elements");
    cy.get("input").clear().as("input");
    cy.contains("button", "Добавить").as("button");
  });

  it("adding first element is ok", function() {
    cy.get("@input").type(firstElement);
    cy.get("@button").click();
    
    expect(cy.get("@elements").should("have.length", 1));
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='head']").as("head");
      cy.wrap($li.get(0)).get("*[data-cy='letter']").as("letter");

      cy.get("@head").contains("Top");
      cy.get("@letter").contains(firstElement);
      cy.get("@letter").should($el => {
        expect($el.className.includes("circle_changing")).to.equal(true);
      })
    });
  });

  it("adding second element is ok", function() {
    cy.get("@input").type(firstElement);
    cy.get("@button").click();
    cy.get("@input").type(secondElement);
    cy.get("@button").click();

    expect(cy.get("@elements").should("have.length", 2));
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='letter']").as("letter0");
      cy.wrap($li.get(1)).get("*[data-cy='head']").as("head");
      cy.wrap($li.get(1)).get("*[data-cy='letter']").as("letter1");

      cy.get("@letter0").contains(firstElement);
      cy.get("@letter0").should($el => {
        expect($el.className.includes("circle_default")).to.equal(true);
      })
      cy.get("@head").contains("Top");
      cy.get("@letter1").contains(secondElement);
      cy.get("@letter1").should($el => {
        expect($el.className.includes("circle_changing")).to.equal(true);
      })
    });
  })

  it("adding third element is ok", function() {
    cy.get("@input").type(firstElement);
    cy.get("@button").click();
    cy.get("@input").type(secondElement);
    cy.get("@button").click();
    cy.get("@input").type(thirdElement);
    cy.get("@button").click();

    expect(cy.get("@elements").should("have.length", 3));
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='letter']").as("letter0");
      cy.wrap($li.get(1)).get("*[data-cy='letter']").as("letter1");
      cy.wrap($li.get(2)).get("*[data-cy='head']").as("head");
      cy.wrap($li.get(2)).get("*[data-cy='letter']").as("letter2");

      cy.get("@letter0").contains(firstElement);
      cy.get("@letter0").should($el => {
        expect($el.className.includes("circle_default")).to.equal(true);
      });
      cy.get("@letter1").contains(secondElement);
      cy.get("@letter1").should($el => {
        expect($el.className.includes("circle_default")).to.equal(true);
      });
      cy.get("@head").contains("Top");
      cy.get("@letter2").contains(thirdElement);
      cy.get("@letter2").should($el => {
        expect($el.className.includes("circle_changing")).to.equal(true);
      });
    });
  });

  it("removing element is ok", function() {
    cy.get("@input").type(firstElement);
    cy.get("@button").click();
    cy.get("@input").type(secondElement);
    cy.get("@button").click();
    cy.get("@input").type(thirdElement);
    cy.get("@button").click();
    cy.contains("button", "Удалить").click();

    expect(cy.get("@elements").should("have.length", 2));
    cy.get("@elements").then(($li) => {
      cy.wrap($li.get(0)).get("*[data-cy='letter']").as("letter0");
      cy.wrap($li.get(1)).get("*[data-cy='head']").as("head");
      cy.wrap($li.get(1)).get("*[data-cy='letter']").as("letter1");

      cy.get("@letter0").contains(firstElement);
      cy.get("@letter0").should($el => {
        expect($el.className.includes("circle_default")).to.equal(true);
      })
      cy.get("@head").contains("Top");
      cy.get("@letter1").contains(secondElement);
      cy.get("@letter1").should($el => {
        expect($el.className.includes("circle_default")).to.equal(true);
      })
    });
  });

  it("clearing the stack is ok", function() {
    cy.get("@input").type(firstElement);
    cy.get("@button").click();
    cy.get("@input").type(secondElement);
    cy.get("@button").click();
    cy.contains("button", "Очистить").click();

    expect(cy.get("@elements").should("have.length", 0));
  });
});
