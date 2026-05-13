import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);

    // Selectors from the actual site
  }

  private emailInput    = '[placeholder="Your email"]';
  private passwordInput = '[placeholder="Your password"]';
  private loginButton   = '.btnSubmit';

  async navigate() {
    await this.page.goto('/auth/login');
  }

  async fillEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async loginWith(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent('.alert-danger') ?? '';
  }
}