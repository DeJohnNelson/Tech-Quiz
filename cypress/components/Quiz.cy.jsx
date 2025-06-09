import Quiz from './Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      body: mockQuestions,
    }).as('getQuestions');
  });

  it('should start the quiz and display the first question', () => {
    cy.mount(<Quiz />);

    cy.contains('Start Quiz').click();

    cy.wait('@getQuestions');

    cy.contains("What is Captain America's real name?").should('exist');
  });

  it('should allow answering all questions and show score at the end', () => {
    cy.mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    
    mockQuestions.forEach((question) => {
      const correctOption = question.options.find(o => o.isCorrect);
      if (correctOption) {
        cy.contains(correctOption.option).click();
      }
    });

    cy.contains('Your Score:').should('exist');
    cy.contains(`${mockQuestions.length}`).should('exist');
  });
});
