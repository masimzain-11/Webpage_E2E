import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // ─── SELECTORS ─────────────────────────────────────────
  private searchInput    = '[data-test="search-query"]';
  private searchButton   = '[data-test="search-submit"]';
  private searchReset    = '[data-test="search-reset"]';
  private sortDropdown   = '[data-test="sort"]';
  private productNames   = '[data-test="product-name"]';
  private productPrices  = '[data-test="product-price"]';
  private outOfStock     = '[data-test="out-of-stock"]';

  // ─── ACTIONS ───────────────────────────────────────────
  async navigate() {
    await this.page.goto('/');
  }

  async searchFor(term: string) {
    await this.page.fill(this.searchInput, term);
    await this.page.click(this.searchButton);
  }

  async resetSearch() {
    await this.page.click(this.searchReset);
  }

  async sortBy(value: string) {
    await this.page.selectOption(this.sortDropdown, value);
  }

  async filterByCategory(categoryName: string) {
    await this.page.check(`input[data-test^="category-"][value]`);
  }

  // ─── GETTERS ───────────────────────────────────────────
  async getProductNames(): Promise<string[]> {
    await this.page.waitForSelector(this.productNames);
    return await this.page.locator(this.productNames).allTextContents();
  }

  async getProductCount(): Promise<number> {
    await this.page.waitForSelector(this.productNames);
    return await this.page.locator(this.productNames).count();
  }

  async getFirstProductPrice(): Promise<string> {
    return await this.page.locator(this.productPrices).first().textContent() ?? '';
  }

  async isOutOfStockVisible(): Promise<boolean> {
    return await this.page.locator(this.outOfStock).isVisible();
  }

  async clickProduct(name: string) {
    await this.page.locator(this.productNames)
      .filter({ hasText: name })
      .first()
      .click();
  }
}