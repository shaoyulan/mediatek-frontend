describe('common', () => {

  /* ==== Test Created with Cypress Studio ==== */
  it('common1', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.rs-input').type('CRS');
    cy.get('.rs-picker-toggle-textbox').click();
    cy.get(':nth-child(3) > .rs-btn').click();
    cy.get('.rs-picker-toggle-clean').click();
    cy.get('thead > tr > :nth-child(1)').click();
    cy.get('thead > tr > :nth-child(1)').click();
    cy.get('thead > tr > :nth-child(4)').click();
    cy.get('thead > tr > :nth-child(4)').click();
    cy.get('[aria-label="2"]').click();
    cy.get('[aria-label="1"]').click();
    cy.get('.rs-btn-primary').click();
    cy.get('[aria-label="11"]').click();
    cy.get('[aria-label="1"]').click();
    /* ==== End Cypress Studio ==== */
  });
})