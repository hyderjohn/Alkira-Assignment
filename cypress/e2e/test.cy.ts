describe("Teams Test", () => {
  it("Page Test and Search", () => {
    cy.visit("http://localhost:3000/");
    cy.title().should("eq", "Teams List");
    cy.get(".app");
    cy.get("[cy-data='search']").type("hawks");
    cy.get("[cy-data='Hawks']").contains("Hawks");
  });

  it("Sort Test", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[cy-data='name']").click();
    cy.get("[cy-data='Hawks']").contains("Warriors");
    cy.get("[cy-data='name']").click();
    cy.get("[cy-data='Hawks']").contains("Bulls");
  });

  it("Modal Test", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[cy-data='Celtics']").click();
    cy.get("[cy-data = 'random']");
    cy.get(".modal-title").contains("Celtics");
    cy.get("[aria-label='Close']").click();
  });

  it("Pagination Test", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[cy-data='2']").click();
    cy.get("[cy-data='teams']");
  });

  it("Get list of Teams", () => {
    cy.request("GET", "https://www.balldontlie.io/api/v1/teams").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
  it("Get game with random id", () => {
    cy.request("GET", "https://www.balldontlie.io/api/v1/games/2").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
});

export {};
