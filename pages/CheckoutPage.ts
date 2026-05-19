import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    
    // Homepage 
    private searchInput: Locator;
    private searchSubmitBtn: Locator;
    private productName: Locator;

    // Product Detail Page Locators
  private addToCartBtn:         Locator;
  private navCart:              Locator;

  // Cart Page Locators
  private productTitle:         Locator;
  private proceed1Btn:           Locator;
  private emailInput:          Locator;
  private passwordInput:       Locator
    private loginSubmitBtn:     Locator;
    private proceed2Btn:        Locator;
    private countrySelect:      Locator;
    private postalCodeInput:    Locator;
    private houseNumberInput:   Locator;
    private proceed3Btn:        Locator;
    private paymentMethodSelect: Locator;
    private bankNameInput:      Locator;
    private accountNameInput:   Locator;
    private accountNumberInput: Locator;
    private finishBtn:          Locator;
    private paymentSuccessMessage: Locator;
    private confirmBtn: Locator;
    private orderConfirmation: Locator;

    constructor(page: Page) {
    super(page);  // BasePage handles this.page
      // Product Detail Page
    this.searchInput          = page.locator('[data-test="search-query"]');
    this.searchSubmitBtn      = page.locator('[data-test="search-submit"]');
    this.productName          = page.locator('[data-test="product-name"]');
    this.addToCartBtn         = page.locator('[data-test="add-to-cart"]');

    // Cart Page
    this.navCart              = page.locator('[data-test="nav-cart"]');
    this.productTitle         = page.locator('[data-test="product-title"]');
    this.proceed1Btn          = page.locator('[data-test="proceed-1"]');
    this.emailInput           = page.locator('[data-test="email"]');
    this.passwordInput        = page.locator('[data-test="password"]');
    this.loginSubmitBtn      = page.locator('[data-test="login-submit"]');
    this.proceed2Btn         = page.locator('[data-test="proceed-2"]');
    this.countrySelect       = page.locator('[data-test="country"]');
    this.postalCodeInput     = page.locator('[data-test="postal_code"]');
    this.houseNumberInput    = page.locator('[data-test="house_number"]');
    this.proceed3Btn         = page.locator('[data-test="proceed-3"]');
    this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
    this.bankNameInput       = page.locator('[data-test="bank_name"]');
    this.accountNameInput    = page.locator('[data-test="account_name"]');
    this.accountNumberInput  = page.locator('[data-test="account_number"]');
    this.finishBtn           = page.locator('[data-test="finish"]');
    this.paymentSuccessMessage = page.locator('[data-test="payment-success-message"]');
    this.confirmBtn = page.locator('[data-test="finish"]');
    this.orderConfirmation   = page.locator('#order-confirmation');  
  }

  // ─── ACTIONS ───────────────────────────────────────────
  async navigate() {
    await this.page.goto('/');
  }
  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchSubmitBtn.click();
  }
  async clickProductByDataTest(productId: string): Promise<void> {
  await this.page.locator(`[data-test="product-${productId}"]`).click();
}
async clickProductByName(productName: string): Promise<void> {
  await this.page
    .locator('[data-test="product-name"]', { hasText: productName })
    .first()
    .click();
}

    async addToCart() {
        await this.addToCartBtn.click();
    }
     
    async openCart() {
        await this.navCart.click();
    }

    async proceedToCheckout() {
        await this.proceed1Btn.click();
    }

    async clickconfirm() {
        await this.finishBtn.click();
    }
     
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginSubmitBtn.click();
    }
    async proceedAfterLogin(): Promise<void> {
  await this.proceed2Btn.click();
}


  async fillShippingDetails(
  country: string,
  postalCode: string,
  houseNumber: string
): Promise<void> {
  await this.countrySelect.selectOption(country);
  await this.postalCodeInput.fill(postalCode);
  await this.houseNumberInput.fill(houseNumber);

  // Wait for button to become enabled (max 10s)
  await this.page.waitForFunction(
    () => {
      const btn = document.querySelector('[data-test="proceed-3"]') as HTMLButtonElement;
      return btn && !btn.disabled;
    },
    { timeout: 10000 }
  );

  await this.proceed3Btn.click();
} 

    async fillPaymentDetails(bankName: string, accountName: string, accountNumber: string) {
        await this.paymentMethodSelect.selectOption('bank-transfer');
        await this.bankNameInput.fill(bankName);    
        await this.accountNameInput.fill(accountName);
        await this.accountNumberInput.fill(accountNumber);
        await this.finishBtn.click();
    }

    async getPaymentSuccessMessage(): Promise<string> {
        return await this.paymentSuccessMessage.textContent() ?? '';
    }

    async getOrderConfirmationText(): Promise<string> {
        return await this.orderConfirmation.textContent() ?? '';
    }

     async getProductNameText(): Promise<string> {
  return await this.productName.first().textContent() ?? '';
}

  async getProductTitleText(): Promise<string> {
    return await this.productTitle.textContent() ?? '';
  }
}


  