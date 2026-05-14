import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('product name is visible on product detail page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.navigate();
    await productsPage.searchFor('pliers');
    await productsPage.clickProduct('Combination Pliers');

    const name = await cartPage.getProductName();
    expect(name.trim().length).toBeGreaterThan(0);
  });

  test('add to cart increases badge count', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.navigate();
    await productsPage.searchFor('pliers');
    await productsPage.clickProduct('Combination Pliers');
    await cartPage.addToCart();

    const badge = await cartPage.getCartBadgeCount();
    expect(parseInt(badge)).toBeGreaterThan(0);
  });

  test('cart page shows product after adding', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.navigate();
    await productsPage.searchFor('pliers');
    await productsPage.clickProduct('Combination Pliers');
    await cartPage.addToCart();
    await cartPage.openCart();

    const isVisible = await cartPage.isProductTitleVisible();
    expect(isVisible).toBe(true);
  });

  test('default quantity is 1 on product page', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.navigate();
  await productsPage.searchFor('pliers');
  await productsPage.clickProduct('Combination Pliers');

  const qty = await cartPage.getDetailPageQuantity(); // ← changed
  expect(qty).toBe('1');
});

test('increase quantity button increments value', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.navigate();
  await productsPage.searchFor('pliers');
  await productsPage.clickProduct('Combination Pliers');
  await cartPage.increaseQuantity();

  const qty = await cartPage.getDetailPageQuantity(); // ← changed
  expect(parseInt(qty)).toBeGreaterThan(1);
});

  test('set quantity to 2 and add to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.navigate();
    await productsPage.searchFor('pliers');
    await productsPage.clickProduct('Combination Pliers');
    await cartPage.setQuantity('2');
    await cartPage.addToCart();
    await cartPage.openCart();

    const qty = await cartPage.getProductQuantity();
    expect(qty).toBe('2');
  });

});