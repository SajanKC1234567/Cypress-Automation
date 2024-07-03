describe('registration', () => {
  it('register', () => {
    cy.apiUserRegistration()
    cy.wait(1000)
  })
})
