import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.loginWith('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL('/account');
  });

  test('login fails with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.loginWith('customer@practicesoftwaretesting.com', 'wrongpass');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid');
  });

});