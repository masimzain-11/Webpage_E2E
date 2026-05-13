import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart Tests', () => {

  const PRODUCT_ID = 'https://practicesoftwaretesting.com/product/01KRHBC4G463BFG61HG61QS6DJ';

  test('product name is visible on product detail page', async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.goToProduct(PRODUCT_ID);

  const isVisible = await cartPage.isProductNameVisible('Combination Pliers');
  expect(isVisible).toBe(true);
});

  test('add to cart increases badge count', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goToProduct(PRODUCT_ID);
    await cartPage.addToCart();

    const badge = await cartPage.getCartBadgeCount();
    expect(parseInt(badge)).toBeGreaterThan(0);
  });

  test('cart page shows product after adding', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goToProduct(PRODUCT_ID);
    await cartPage.addToCart();
    await cartPage.openCart();

    const isVisible = await cartPage.isProductNameVisible('Combination Pliers');
    expect(isVisible).toBe(true);
  });

  // test('quantity defaults to 1 on product page', async ({ page }) => {
  //   const cartPage = new CartPage(page);

  //   await cartPage.goToProduct(PRODUCT_ID);

  //   const qty = await cartPage.getProductQuantity();
  //   expect(qty).toBe('1');
  // });

  test('set quantity to 2 and add to cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goToProduct(PRODUCT_ID);
    await cartPage.setQuantity('2');
    await cartPage.addToCart();
    await cartPage.openCart();

    const qty = await cartPage.getProductQuantity();
    expect(qty).toBe('2');
  });

});