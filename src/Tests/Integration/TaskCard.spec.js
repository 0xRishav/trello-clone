describe('TaskCard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3002/project/id1');
  });

  it('renders task information', () => {
    const mockTask = {
      id: 1,
      title: 'Test Task',
      description: 'Task description',
      assignedUser: 'John Doe',
    };

    cy.get('[data-testid="task-card"]')
      .should('contain', mockTask.title)
      .and('contain', mockTask.description)
      .and('contain', `Assigned to: ${mockTask.assignedUser}`);
  });

  it('opens and closes task detail popup', () => {
    cy.get('[data-testid="task-card"]').click();
    cy.get('[data-testid="overlay"]').should('be.visible');

    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-testid="overlay"]').should('not.be.visible');
  });
});
