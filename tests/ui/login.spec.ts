import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.loginWith('admin@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('login fails with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.loginWith('nobody-fake-account@nowhere.test', 'anything');

  const error = await loginPage.getErrorMessage();
  expect(error.length).toBeGreaterThan(0);  // any error is fine
});

});