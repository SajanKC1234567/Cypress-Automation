describe('registration', () => {
  it('register', () => {
    cy.apiUserRegistration()
    cy.wait(1000)
  })

  // it('login', () => {
  //   cy.login()
  //   cy.wait(1000)
  // })

  // it('update profile', () => {
  //   cy.updateprofile()
  //   cy.wait(1000)
  // })

  // it('add notes', () => {
  //   cy.addNote()
  //   cy.wait(1000)
  // })

  // it('edit notes', () => {
  //   cy.editNote()
  //   cy.wait(1000)
  // })

  // it('delete notes', () => {
  //   cy.deleteNote()
  //   cy.wait(1000)
  // })

  // it('logout', () => {
  //   cy.destroySession()
  //   cy.wait(1000)
  // })

  // it('delete account', () => {
  //   cy.deleteAccount()
  // })
})