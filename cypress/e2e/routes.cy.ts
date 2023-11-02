describe("app works correctly with routes", function() {
  before(function() {
    cy.visit("/");
  });

  it("should open front page /algososh by default", function() {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("should route to string reversal page", function() {
    cy.get('[data-cy="recursion"]').click();
    cy.contains("Строка");
    cy.contains("Развернуть");
  });

  it("should route to fibonacci sequence page", function() {
    cy.get("p").contains("К оглавлению").click();
    cy.get('[data-cy="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
    cy.contains("Рассчитать");
  });

  it("should route to sorting page", function() {
    cy.get("p").contains("К оглавлению").click();
    cy.get('[data-cy="sorting"]').click();
    cy.contains("Сортировка массива");
    cy.contains("Новый массив");
  });

  it("should route to stack page", function() {
    cy.get("p").contains("К оглавлению").click();
    cy.get('[data-cy="stack"]').click();
    cy.contains("Стек");
    cy.contains("Добавить");
  });

  it("should route to queue page", function() {
    cy.get("p").contains("К оглавлению").click();
    cy.get('[data-cy="queue"]').click();
    cy.contains("Очередь");
    cy.contains("Добавить");
  });

  it("should route to linked list page", function() {
    cy.get("p").contains("К оглавлению").click();
    cy.get('[data-cy="list"]').click();
    cy.contains("Связный список");
    cy.contains("Добавить в head");
  });
});
