/// <reference types='cypress'/>

describe('Criando cenário de teste para o site globalsqa', () => {

  it.skip('Registrando um usuário no site com sucesso', () => {
    let userInfo = criarUsuario();

    cy.get('.ng-binding').should('contain.text', 'Registration successful')
  })

  it.skip('Registrando um usuário no site com falha (faltando senha)', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')

    cy.get('#firstName').type('Inatel');
    cy.get('#Text1').type('Inatel');
    cy.get('#username').type('Inatel');
    cy.get('#password').type('Inatel');

    cy.get('#password').clear();

    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled');
  })

  it('Fazendo login no site com sucesso', () => {
    let userInfo = criarUsuario();

    cy.get('#username').type(userInfo.user);
    cy.get('#password').type(userInfo.password);

    cy.get('.btn-primary').click();

    cy.get('h1.ng-binding').should('contain.text', `Hi ${userInfo.user}!` )
  })
})

function criarUsuario() {

  let hours  = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  let time =  new Date().getTime();

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')

  cy.get('.btn-link').click();

  cy.get('#firstName').type(hours);
  cy.get('#Text1').type(hours);
  cy.get('#username').type(hours);
  cy.get('#password').type(time);

  cy.get('.btn-primary').click();
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return {user:hours, password:time}
}