import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  // Product Detail Page Locators
  private productName:          Locator;
  private quantityInput:        Locator;
  private increaseQuantityBtn:  Locator;
  private decreaseQuantityBtn:  Locator;
  private addToCartBtn:         Locator;
  private cartQuantityBadge:    Locator;

  // Cart Page Locators
  private navCart:              Locator;
  private productTitle:         Locator;
  private productQuantityInput: Locator;
  private proceedBtn:           Locator;

  constructor(page: Page) {
    super(page);  // BasePage handles this.page

    // Product Detail Page
    this.productName          = page.locator('[data-test="product-name"]');
    this.quantityInput        = page.locator('[data-test="quantity"]');
    this.increaseQuantityBtn  = page.locator('[data-test="increase-quantity"]');
    this.decreaseQuantityBtn  = page.locator('[data-test="decrease-quantity"]');
    this.addToCartBtn         = page.locator('[data-test="add-to-cart"]');
    this.cartQuantityBadge    = page.locator('[data-test="cart-quantity"]');

    // Cart Page
    this.navCart              = page.locator('[data-test="nav-cart"]');
    this.productTitle         = page.locator('[data-test="product-title"]');
    this.productQuantityInput = page.locator('[data-test="product-quantity"]');
    this.proceedBtn           = page.locator('[data-test="proceed-1"]');
  }

  // ── Navigation ──────────────────────────────────────────
  async goToProduct(url: string) {
    await this.page.goto(url);
  }

  async openCart() {
    await this.navCart.click();
  }

  // ── Product Detail Actions ───────────────────────────────
  async setQuantity(value: string) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(value);
  }

  async increaseQuantity() {
    await this.increaseQuantityBtn.click();
  }

  async decreaseQuantity() {
    await this.decreaseQuantityBtn.click();
  }

  async addToCart(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.addToCartBtn.click();
    }
  }

  // ── Cart Page Actions ────────────────────────────────────
  async proceedToNextStep() {
    await this.proceedBtn.click();
  }

  // ── Getters (for test assertions) ───────────────────────
  async getProductName(): Promise<string> {
    return await this.productName.textContent() ?? '';
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.cartQuantityBadge.textContent() ?? '';
  }

  async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() ?? '';
  }

  async getProductQuantity(): Promise<string> {
    return await this.productQuantityInput.inputValue();
  }

  async isProductTitleVisible(): Promise<boolean> {
  return await this.productTitle.isVisible();
}
async getDetailPageQuantity(): Promise<string> {
  return await this.quantityInput.inputValue();
}

  async isProductNameVisible(expectedName: string): Promise<boolean> {
  await this.page.waitForSelector('[data-test="product-name"]', { state: 'visible' });
  const actualName = await this.productName.textContent();
  return actualName?.trim() === expectedName;
}
}