import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products Page Tests', () => {

  test('search for pliers returns results', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.navigate();
    await productsPage.searchFor('pliers');

    const names = await productsPage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names[0].toLowerCase()).toContain('plier');
  });

  test('products are visible on homepage', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.navigate();

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('sort by price low to high works', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.navigate();
    await productsPage.sortBy('price,asc');

    const firstPrice = await productsPage.getFirstProductPrice();
    expect(firstPrice).toBeTruthy();
  });

  test('clicking a product navigates to product detail', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.navigate();
    await productsPage.clickProduct('Pliers');

    await expect(page).toHaveURL(/\/product\//);
  });

});