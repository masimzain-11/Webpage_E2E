import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Page Tests', () => {
    test('search for product and add to cart', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.navigate();
        await checkoutPage.searchFor('combination pliers');
        expect(await checkoutPage.getProductNameText()).toContain('Combination Pliers');
        await checkoutPage.clickProductByName('Combination Pliers');
        expect(await checkoutPage.getProductNameText()).toContain('Combination Pliers');
        await checkoutPage.addToCart();
        await checkoutPage.openCart();
        expect(await checkoutPage.getProductTitleText()).toContain('Combination Pliers');
    });

    test('complete checkout process', async ({ page, browserName }) => {
        test.skip(browserName === 'firefox', 'Checkout flow has known Firefox compatibility issue with proceed-3 button — tracking for fix');
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.navigate();
        await checkoutPage.searchFor('combination pliers');
        await checkoutPage.clickProductByName('Combination Pliers');
        await checkoutPage.addToCart();
        await checkoutPage.openCart();
        await checkoutPage.proceedToCheckout();
        await checkoutPage.login('admin@practicesoftwaretesting.com', 'welcome01');
        await checkoutPage.proceedAfterLogin();
        await checkoutPage.fillShippingDetails('IN', '55555', '55');
        await checkoutPage.fillPaymentDetails('test', 'testt', '5454545454');
        expect(await checkoutPage.getPaymentSuccessMessage()).toContain('Payment was successful');
        await checkoutPage.clickconfirm();
        //expect(await checkoutPage.getOrderConfirmationText()).toContain('Thanks for your order! Your invoice number is INV');
    });
});







// await page.goto('https://practicesoftwaretesting.com/');
//     await page.locator('[data-test="search-query"]').click();
//     await page.locator('[data-test="search-query"]').fill('combination pliers');
//     await page.locator('[data-test="search-submit"]').click();
//     await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
//     await page.locator('[data-test="product-01KRKG1G8W5X7D90V8BPDG46H7"]').click();
//     await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
//     await page.locator('[data-test="add-to-cart"]').click();
//     await page.locator('[data-test="nav-cart"]').click();
//     await expect(page.locator('[data-test="product-title"]')).toContainText('Combination Pliers');
//     await page.locator('[data-test="proceed-1"]').click();
//     await page.locator('[data-test="email"]').click();
//     await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
//     await page.locator('[data-test="password"]').click();
//     await page.locator('[data-test="password"]').fill('welcome01');
//     await page.locator('[data-test="login-submit"]').click();
//     await page.locator('[data-test="proceed-2"]').click();
//     await page.locator('[data-test="country"]').selectOption('IN');
//     await page.locator('[data-test="postal_code"]').click();
//     await page.locator('[data-test="postal_code"]').fill('55555');
//     await page.locator('[data-test="house_number"]').click();
//     await page.locator('[data-test="house_number"]').fill('55');
//     await page.locator('[data-test="proceed-3"]').click();
//     await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
//     await page.locator('[data-test="bank_name"]').click();
//     await page.locator('[data-test="bank_name"]').fill('test');
//     await page.locator('[data-test="account_name"]').click();
//     await page.locator('[data-test="account_name"]').fill('testt');
//     await page.locator('[data-test="account_number"]').click();
//     await page.locator('[data-test="account_number"]').fill('5454545454');
//     await page.locator('[data-test="finish"]').click();
//     await expect(page.locator('[data-test="payment-success-message"]')).toContainText('Payment was successful');
//     await page.locator('[data-test="finish"]').click();
//     await expect(page.locator('#order-confirmation')).toContainText('Thanks for your order! Your invoice number is INV');