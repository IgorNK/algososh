describe("linked list page functions correctly", function() {
  beforeEach(function() {
    cy.visit("/algososh/list");
  });

  it("should disable buttons when input string is empty", function() {
    cy.getBySel("input-value")
      .invoke("val")
      .then((text) => {
        if (text === "") {
          cy.getBySel("button-add-to-head").should("be.disabled");
          cy.getBySel("button-add-to-tail").should("be.disabled");
          cy.getBySel("button-add-by-index").should("be.disabled");
        }
      });
  });

  it("should disable add by index button when index string is empty", function() {
    cy.getBySel("input-index")
      .invoke("val")
      .then((text) => {
        if (text === "") {
          cy.getBySel("button-add-by-index").should("be.disabled");
        }
      });
  });

  it("default random list renders correctly", function() {
    cy.getBySel("elements").getBySel("circle").as("circles");
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.log(`amount of elements: ${amount}`);
      cy.wrap($elements.get(0)).getBySel("head").contains("head");
      cy.wrap($elements.get(amount - 1))
        .getBySel("tail")
        .contains("tail");
    });
  });
});

describe("elements get added and removed correctly", function() {
  const firstElement = "tst1";
  const firstIndex = "2";

  beforeEach(function() {
    cy.visit("/algososh/list");
    cy.getBySel("elements").getBySel("circle").as("circles");
  });

  it("element adds and removes from head ok", function() {
    cy.getBySel("input-value").clear().type(firstElement);
    // Step one: added element is added to the head, circle is colored as changing
    cy.get("@circles").then(($elements) => {
      cy.wrap($elements.get(0)).getChildBySel("head").as("head");
      cy.wrap($elements.get(0)).getChildBySel("tail").as("tail");
      cy.wrap($elements.get(0)).getChildBySel("letter").as("letter");
      const amount = $elements.length;
      cy.log(`amount of elements: ${amount}`);
      cy.getBySel("button-add-to-head").click();

      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
      });
      cy.get("@head").contains(firstElement);
      cy.get("@circles").should("have.length", amount + 1);
      cy.log(`reached new amount of elements (including head): ${amount + 1}`);
    });

    // Wait for head circle to disappear and "head" to be back:
    cy.get("@circles").contains("head");

    // Step two: added element is added to the circle, circle is colored as modified
    cy.get("@circles").then(($elements) => {
      cy.wrap($elements.get(0)).getChildBySel("head").as("head");
      cy.wrap($elements.get(0)).getChildBySel("tail").as("tail");
      cy.wrap($elements.get(0)).getChildBySel("letter").as("letter");
      cy.get("@letter").should("have.text", firstElement);
      cy.get("@head").contains("head");
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_modified"]`)).to.equal(true);
      });

      // Step three: circle is colored as default
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_default"]`)).to.equal(true);
      });
    });

    // Step four: removed item moves to head, circle is colored as changing
    cy.getBySel("button-remove-from-head").click();
    cy.get("@circles").then(($elements) => {
      cy.wrap($elements.get(0)).getChildBySel("head").as("head");
      cy.wrap($elements.get(0)).getChildBySel("tail").as("tail");
      cy.wrap($elements.get(0)).getChildBySel("letter").as("letter");
      const amount = $elements.length;

      cy.get("@tail").contains(firstElement);
      cy.get("@letter").invoke("text").should("be.empty");
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
      });

      cy.get("@circles").should("have.length", amount - 2);
      cy.log(`reached new amount of elements: ${amount - 2}`);
    });

    // Step five: removed item moved to circle, circle is colored as default, amount of items is reduced
    cy.get("@circles").then(($elements) => {
      cy.wrap($elements.get(0)).getChildBySel("head").as("head");
      cy.wrap($elements.get(0)).getChildBySel("tail").as("tail");
      cy.wrap($elements.get(0)).getChildBySel("letter").as("letter");
      const amount = $elements.length;
      cy.get("@head").contains("head");
      cy.get("@letter").not(firstElement);
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_default"]`)).to.equal(true);
      });
    });
  });

  it("element adds and removes from tail ok", function() {
    cy.getBySel("input-value").clear().type(firstElement);
    // Step one: added element is added to the head, circle is colored as changing
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("head")
        .as("head");
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("tail")
        .as("tail");
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("letter")
        .as("letter");
      cy.log(`amount of elements: ${amount}`);
      cy.getBySel("button-add-to-tail").click();

      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
      });
      cy.get("@head").contains(firstElement);
      cy.get("@circles").should("have.length", amount + 1);
      cy.log(`reached new amount of elements (including head): ${amount + 1}`);

      // Wait for head circle to disappear:
      cy.get("@head").invoke("text").should("be.empty");
    });

    // Step two: added element is added to the circle, circle is colored as modified
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("head")
        .as("head");
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("tail")
        .as("tail");
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("letter")
        .as("letter");
      cy.get("@tail").should("have.text", "tail");
      cy.get("@letter").should("have.text", firstElement);
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_modified"]`)).to.equal(true);
      });

      // Step three: circle is colored as default
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_default"]`)).to.equal(true);
      });
    });

    // Step four: removed item moves to head, circle is colored as changing
    cy.getBySel("button-remove-from-tail").click();
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.wrap($elements.get(amount - 2))
        .getChildBySel("head")
        .as("head");
      cy.wrap($elements.get(amount - 2))
        .getChildBySel("tail")
        .as("tail");
      cy.wrap($elements.get(amount - 2))
        .getChildBySel("letter")
        .as("letter");

      cy.get("@tail").contains(firstElement);
      cy.get("@letter").invoke("text").should("be.empty");
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
      });

      cy.get("@circles").should("have.length", amount - 2);
      cy.log(`reached new amount of elements: ${amount - 2}`);
    });

    // Step five: removed item moved to circle, circle is colored as default, amount of items is reduced
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("head")
        .as("head");
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("tail")
        .as("tail");
      cy.wrap($elements.get(amount - 1))
        .getChildBySel("letter")
        .as("letter");
      cy.get("@tail").contains("tail");
      cy.get("@letter").not(firstElement);
      cy.get("@letter").should(($el) => {
        expect($el.is(`[class*="circle_default"]`)).to.equal(true);
      });
    });
  });

  it("element adds and removes by index ok", function() {
    cy.getBySel("input-value").clear().type(firstElement);
    cy.getBySel("input-index").clear().type(firstIndex);

    // Tail with input should travel though index 0 to 2:
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.getBySel("button-add-by-index").click();
      cy.wrap($elements.get(0))
        .getChildBySel("tail")
        .should("have.text", firstElement);
      cy.wrap($elements.get(1))
        .getChildBySel("tail")
        .should("have.text", firstElement);
      cy.wrap($elements.get(2))
        .getChildBySel("tail")
        .should("have.text", firstElement);

      // Wait for amount of elements to increase:
      cy.get("@circles").should("have.length", amount + 2);
      cy.log(`reached new amount of elements: ${amount + 2}`);
    });

    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      // New element should be in changing state:
      cy.wrap($elements.get(2))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });

      // Wait for amount of elements to decrease:
      cy.get("@circles").should("have.length", amount - 1);
      cy.log(`reached new amount of elements: ${amount - 1}`);
    });

    cy.get("@circles").then(($elements) => {
      // New element is written:
      cy.wrap($elements.get(2)).getChildBySel("letter").contains(firstElement);

      // Displayed as modified:
      cy.wrap($elements.get(2))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_modified"]`)).to.equal(true);
        });

      // Displayed as default:
      cy.wrap($elements.get(2))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_default"]`)).to.equal(true);
        });
    });

    // Now for removal: when the button is clicked, changing state creeps up from index 0 through 2:
    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      cy.getBySel("button-delete-by-index").click();
      cy.wrap($elements.get(0))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });
      cy.wrap($elements.get(1))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });
      cy.wrap($elements.get(2))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });

      // Wait for amount of elements to increase:
      cy.get("@circles").should("have.length", amount + 1);
      cy.log(`reached new amount of elements: ${amount + 1}`);
    });

    cy.get("@circles").then(($elements) => {
      const amount = $elements.length;
      // Element by index 2 should have a tail with its number:
      cy.wrap($elements.get(2))
        .getChildBySel("tail")
        .should("have.text", firstElement);

      // The main circle should be empty and should be styled as changing:
      cy.wrap($elements.get(2))
        .getChildBySel("letter")
        .invoke("text")
        .should("be.empty");
      cy.wrap($elements.get(2))
        .getChildBySel("letter")
        .should(($el) => {
          expect($el.is(`[class*="circle_changing"]`)).to.equal(true);
        });

      // The amount of elements should decrease:
      cy.get("@circles").should("have.length", amount - 2);
      cy.log(`reached new amount of elements: ${amount - 2}`);
    });
  });
});
