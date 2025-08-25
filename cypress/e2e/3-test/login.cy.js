describe('Login Feature - OrangeHRM', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC_001: Login dengan username dan password valid', () => {
    cy.get("input[name='username']").type('Admin');
    cy.get("input[name='password']").type('admin123');
    cy.get("button[type='submit']").click();
    cy.url().should('include', '/dashboard');
    cy.get('h6.oxd-text--h6.oxd-topbar-header-breadcrumb-module', { timeout: 10000 })
    .should('have.text', 'Dashboard');

  });

  it('TC_002: Login dengan username dan password salah', () => {
    cy.get("input[name='username']").type('Adamin');
    cy.get("input[name='password']").type('admin124');
    cy.get("button[type='submit']").click();
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials');
  });

  it('TC_003: Login dengan username salah', () => {
    cy.get("input[name='username']").type('Adamin');
    cy.get("input[name='password']").type('admin123');
    cy.get("button[type='submit']").click();
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials');
  });

  it('TC_004: Login dengan password salah', () => {
    cy.get("input[name='username']").type('Admin');
    cy.get("input[name='password']").type('admin124');
    cy.get("button[type='submit']").click();
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials');
  });

  it('TC_005: Login tanpa mengisi username dan password', () => {
    cy.get("button[type='submit']").click();
    cy.get('.oxd-input-field-error-message').should('have.length', 2);
    cy.get('.oxd-input-field-error-message').each(($el) => {
      cy.wrap($el).should('contain.text', 'Required');
    });
  });

  it('TC_006: Login tanpa mengisi username', () => {
    cy.get("input[name='password']").type('admin123');
    cy.get("button[type='submit']").click();
    cy.get('.oxd-input-field-error-message').first().should('contain.text', 'Required');
  });

  it('TC_007: Login tanpa mengisi password', () => {
    cy.get("input[name='username']").type('Admin');
    cy.get("button[type='submit']").click();
    cy.get('.oxd-input-field-error-message').first().should('contain.text', 'Required');
  });

  it('TC_008: Login dengan username huruf kecil semua', () => {
    cy.get("input[name='username']").type('admin');
    cy.get("input[name='password']").type('admin123');
    cy.get("button[type='submit']").click();
    cy.url().should('include', '/dashboard');
    cy.contains('Time at Work').should('be.visible');
  });

  it('TC_009: Reset password dengan username valid', () => {
    cy.contains('Forgot your password?').click();
    cy.get("input[placeholder='Username']").type('Admin');
    cy.get("button[type='submit']").click();
    cy.get('.orangehrm-card-container')
      .should('contain.text', 'Reset Password link sent successfully');
  });

  it('TC_010: Pengguna bisa klik tombol Cancel di halaman reset password', () => {
  cy.contains('Forgot your password?').click();
  cy.url().should('include', '/requestPasswordResetCode');
  cy.get('button[type="button"]').contains('Cancel').click();
  cy.url().should('include', '/auth/login');
  cy.get('.oxd-alert-content-text').should('not.exist');
});

});
