describe("string reversal page functions correctly", function() {
  before(function() {
    cy.visit("http://localhost:3000/algososh/recursion");
  });

  it("should disable the button when input string is empty", function() {
    cy.get("input")
      .invoke("val")
      .then((text) => {
        if (text === "") {
          cy.contains("button", "Развернуть").should("be.disabled");
        }
      });
  });
});

describe("string reverse animation functions correctly", function() {
  const testString = "abcdef";

  before(function() {
    cy.visit("http://localhost:3000/algososh/recursion");
    cy.get("input").clear().type(testString);
  });

  it("should start in default state", function() {
    cy.get("*[data-cy='letters']").get("*[data-cy='letter']").as("letters");
    cy.get("@letters").each(($element) => {
      expect($element.is("[class*=circle_default]")).eq(true);
    });
  });

  it("step one is ok", function() {
    cy.contains("button", "Развернуть").click();
    cy.get("*[data-cy='letters']").get("*[data-cy='letter']").as("letters");
    cy.get("@letters").should(($li) => {
      expect($li.get(0).className.includes("circle_changing")).to.equal(true);
      expect($li.get(0).textContent?.includes("a")).to.equal(true);
      expect($li.get(1).className.includes("circle_default")).to.equal(true);
      expect($li.get(1).textContent?.includes("b")).to.equal(true);
      expect($li.get(2).className.includes("circle_default")).to.equal(true);
      expect($li.get(2).textContent?.includes("c")).to.equal(true);
      expect($li.get(3).className.includes("circle_default")).to.equal(true);
      expect($li.get(3).textContent?.includes("d")).to.equal(true);
      expect($li.get(4).className.includes("circle_default")).to.equal(true);
      expect($li.get(4).textContent?.includes("e")).to.equal(true);
      expect($li.get(5).className.includes("circle_changing")).to.equal(true);
      expect($li.get(5).textContent?.includes("f")).to.equal(true);
    });
  });

  it("step two is ok", function() {
    cy.get("*[data-cy='letters']").get("*[data-cy='letter']").as("letters");
    cy.get("@letters").should(($li) => {
      expect($li.get(0).className.includes("circle_modified")).to.equal(true);
      expect($li.get(0).textContent?.includes("f")).to.equal(true);
      expect($li.get(1).className.includes("circle_changing")).to.equal(true);
      expect($li.get(1).textContent?.includes("b")).to.equal(true);
      expect($li.get(2).className.includes("circle_default")).to.equal(true);
      expect($li.get(2).textContent?.includes("c")).to.equal(true);
      expect($li.get(3).className.includes("circle_default")).to.equal(true);
      expect($li.get(3).textContent?.includes("d")).to.equal(true);
      expect($li.get(4).className.includes("circle_changing")).to.equal(true);
      expect($li.get(4).textContent?.includes("e")).to.equal(true);
      expect($li.get(5).className.includes("circle_modified")).to.equal(true);
      expect($li.get(5).textContent?.includes("a")).to.equal(true);
    });
  });

  it("step three is ok", function() {
    cy.get("*[data-cy='letters']").get("*[data-cy='letter']").as("letters");
    cy.get("@letters").should(($li) => {
      expect($li.get(0).className.includes("circle_modified")).to.equal(true);
      expect($li.get(0).textContent?.includes("f")).to.equal(true);
      expect($li.get(1).className.includes("circle_modified")).to.equal(true);
      expect($li.get(1).textContent?.includes("e")).to.equal(true);
      expect($li.get(2).className.includes("circle_changing")).to.equal(true);
      expect($li.get(2).textContent?.includes("c")).to.equal(true);
      expect($li.get(3).className.includes("circle_changing")).to.equal(true);
      expect($li.get(3).textContent?.includes("d")).to.equal(true);
      expect($li.get(4).className.includes("circle_modified")).to.equal(true);
      expect($li.get(4).textContent?.includes("b")).to.equal(true);
      expect($li.get(5).className.includes("circle_modified")).to.equal(true);
      expect($li.get(5).textContent?.includes("a")).to.equal(true);
    });
  });

  it("step four is ok", function() {
    cy.get("*[data-cy='letters']").get("*[data-cy='letter']").as("letters");
    cy.get("@letters").should(($li) => {
      expect($li.get(0).className.includes("circle_modified")).to.equal(true);
      expect($li.get(0).textContent?.includes("f")).to.equal(true);
      expect($li.get(1).className.includes("circle_modified")).to.equal(true);
      expect($li.get(1).textContent?.includes("e")).to.equal(true);
      expect($li.get(2).className.includes("circle_modified")).to.equal(true);
      expect($li.get(2).textContent?.includes("d")).to.equal(true);
      expect($li.get(3).className.includes("circle_modified")).to.equal(true);
      expect($li.get(3).textContent?.includes("c")).to.equal(true);
      expect($li.get(4).className.includes("circle_modified")).to.equal(true);
      expect($li.get(4).textContent?.includes("b")).to.equal(true);
      expect($li.get(5).className.includes("circle_modified")).to.equal(true);
      expect($li.get(5).textContent?.includes("a")).to.equal(true);
    });
  });
});
