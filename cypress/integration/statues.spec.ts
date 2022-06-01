/// <reference types="cypress" />

describe('statues app', () => {
    beforeEach(() => {
        cy.visit('localhost:4200');
        localStorage.clear();
    })

    it('display home', () => {
        cy.get('.toolbar__title').should("have.text", "Statues");
    })

    it('should not navigate to the game without a name', () => {
        cy.get('.mat-button-wrapper > span').click();
        cy.get('.toolbar__title').should("have.text", "Statues");
    })

    it('should navigate to the game if we have a name', () => {
        cy.get('#mat-input-0').type("David");
        cy.get('.mat-button-wrapper > span').click();
        cy.get('.toolbar__title').should("have.text", "Hi David");
    })

    it('should go back to the home', () => {
        cy.get('#mat-input-0').type("David");
        cy.get('.mat-button-wrapper > span').click();
        cy.get('.toolbar__lead-button > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
        cy.get('.toolbar__title').should("have.text", "Statues");
    })

    it('should navigate to the ranking', () => {
        cy.get('.mat-button-wrapper > .mat-icon').click();
        cy.get('.toolbar__title').should("have.text", "Ranking");
    })


    it('should increase the value', () => {
        cy.get('#mat-input-0').type("David");
        cy.get('.mat-button-wrapper > span').click();
        cy.get('.toolbar__title').should("have.text", "Hi David");
        cy.wait(4000);
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 1");
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 0");
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 8");
    })

    it('should reset the value', () => {
        cy.get('#mat-input-0').type("David");
        cy.get('.mat-button-wrapper > span').click();
        cy.get('.toolbar__title').should("have.text", "Hi David");
        cy.wait(4000);
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 1");
        cy.wait(11000);
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 0");
        cy.get('.game__icon').should("have.class", "game__icon--red");
    })

    it('should update the ranking', () => {
        cy.get('#mat-input-0').type("David");
        cy.get('.mat-button-wrapper > span').click();
        cy.get('.toolbar__title').should("have.text", "Hi David");
        cy.wait(4000);
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('[trailingicon="steps-right"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 4");
        cy.get('h1').should("have.text", "High score: 4");
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('[leadingicon="steps-left"] > .mat-focus-indicator').click();
        cy.get('h2').should("have.text", "Score: 2");
        cy.get('h1').should("have.text", "High score: 4");
        cy.get('.toolbar__lead-button > .mat-focus-indicator').click();
        cy.get('.mat-button-wrapper > .mat-icon').click();
        cy.get('.mat-row > .cdk-column-name').should("have.text", "David");
        cy.get('.mat-row > .cdk-column-highScore').should("have.text", "4");
        cy.get('.mat-row > .cdk-column-currentScore').should("have.text", "2");
    })
    
})