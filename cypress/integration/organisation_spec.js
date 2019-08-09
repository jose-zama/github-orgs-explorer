describe('home page', function () {
  beforeEach(() => {
    cy.visit('/');

    cy.server();        // enable response stubbing
    cy.route({
      method: 'GET',
      url: 'https://api.github.com/orgs/my-organisation/repos?page=1&per_page=100',
      response: [{
        name: 'one repo to rule them all',
        language: 'rust',
        stargazers_count: 23
      },
        {
          name: 'java the hut',
          language: 'java',
          description: 'nada',
          stargazers_count: 0
        }]
    })
  });

  it('should disable list repositories button if organisation field is empty', () => {
    cy.contains('List repositories').should('be.disabled');
  });

  it('should contain the org in the url when list repositories button is clicked', () => {
    cy.get('#org-input').type('my-organisation');
    cy.contains('List').click();
    cy.url()
      .should('include', '/my-organisation')
  });

  it('should list the repositories of the org entered when list repositories button is clicked', () => {
    cy.get('#org-input').type('my-organisation');
    cy.contains('List').click();

    cy.get('.homework-repos-container').find('mat-card').as('repos');

    cy.get('@repos').should('have.length', 2);

    cy.get('@repos').eq(0).contains('one repo to rule them all');
    cy.get('@repos').eq(1).contains('java the hut');
  });

  it('should filter the repositories by the selected language', () => {
    cy.get('#org-input').type('my-organisation');
    cy.contains('List').click();
    cy.contains('java').click();
    cy.get('.homework-repos-container')
      .contains('java the hut');
  });

});

