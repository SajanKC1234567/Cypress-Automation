// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registration', () => {
    cy.visit('https://practice.expandtesting.com/notes/app/register')

    cy.get('#email').type('test54321@gmail.com')
    cy.get('#password').type('test12345678')
    cy.get('#confirmPassword').type('test12345678')
    cy.get('#name').type('Cypress Automation')
    cy.get('button[type="submit"]').click()

    cy.get('a[data-testid="login-view"]').click()
})

Cypress.Commands.add('login', () => {
    cy.visit('https://practice.expandtesting.com/notes/app/login')
    cy.get("#email").type('test54321@gmail.com')
    cy.get("#password").type('test12345678')
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('updateprofile', () => {
    cy.login();
    cy.visit('https://practice.expandtesting.com/notes/app/profile')
    cy.get('input[name="phone"]').then($input => {
        if ($input.val()) {
            cy.get('input[name="phone"]').clear();
        }
    })
    cy.get('input[name="company"]').then($input => {
        if ($input.val()) {
            cy.get('input[name="company"]').clear();
        }
    })
    cy.get('input[name="phone"]').type('9841112233')
    cy.get('input[name="company"]').type('Automation Cypress')
    cy.get('button[data-testid="update-profile"]').click()
    if (cy.contains('Profile updated successful')) {
        cy.visit('https://practice.expandtesting.com/notes/app')
    }
})

Cypress.Commands.add('addNote', () => {
    cy.login();
    cy.visit('https://practice.expandtesting.com/notes/app')
    cy.get('button[data-testid="add-new-note"]').click()
    cy.get('#completed').click()
    cy.get('#category').select('Work')
    cy.get('#completed').click()
    cy.get('#title').type('Cypress Automation')
    cy.get('#description').type('Cypress Automation')
    cy.get('button[data-testid="note-submit"]').click()
})

Cypress.Commands.add('editNote', () => {
    cy.login();
    cy.get('div[data-testid="notes-list"]').then(($notesList) => {
        if ($notesList.find('div[data-testid="note-card"]').length > 0) {
            cy.get('button[data-testid="note-edit"]').first().click();
            cy.get('#category').select('Home')
            cy.get('#completed').click()
            cy.get('#title').type('Normal Automation')
            cy.get('#description').type('Is there any hard task?')
            cy.get('button[data-testid="note-submit"]').click()
        } else {
            cy.log('note-card is not present, skipping script...');
        }
    });
})

Cypress.Commands.add('deleteNote', () => {
    cy.login();
    cy.get('div[data-testid="notes-list"]').then(($notesList) => {
        if ($notesList.find('div[data-testid="note-card"]').length > 0) {
            cy.get('button[data-testid="note-delete"]').first().click();
            cy.get('button[data-testid="note-delete-confirm"]').click();
        } else {
            cy.log('note-card is not present, skipping script...');
        }
    });
})

Cypress.Commands.add('destroySession', () => {
    cy.login();
    cy.get('button[data-testid="logout"').click()
})

Cypress.Commands.add('deleteAccount', () => {
    cy.login();
    cy.visit('https://practice.expandtesting.com/notes/app/profile')
    cy.get('button[data-testid="delete-account"]').click()
    cy.get('button[data-testid="note-delete-confirm"]').click()
})

Cypress.Commands.add('apiUserRegistration', () => {
    const requestData = {
        name: "Sajan",
        email: "test12435@gmail.com",
        password: "Test@123"
    };
    cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/users/register',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        cy.log('-----------------------------------------------------------///////////////////////////////////////////////////////////')
        console.log('Response body:', JSON.stringify(response.body, null, 2));
        cy.log('-----------------------------------------------------------///////////////////////////////////////////////////////////')
        // expect(response.body).to.have.property('name', 'Sajan');
        // expect(response.body).to.have.property('email', 'test123675@gmail.com');
        // expect(response.body).to.have.property('password', 'Test@123');
    });
});
