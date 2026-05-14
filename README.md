# Webpage E2E — Playwright Automation Framework

End-to-end UI test automation framework built with Playwright and TypeScript using the Page Object Model (POM) design pattern. Tests run against [practicesoftwaretesting.com](https://practicesoftwaretesting.com), a real e-commerce application.

---

## Tech Stack

- **Playwright** — modern browser automation
- **TypeScript** — type-safe test code
- **Node.js** — runtime
- **POM** — Page Object Model architecture
- **HTML Reporter** — built-in test reporting

---

## Architecture

```
Webpage_E2E/
├── pages/                      Page Objects (one per page/flow)
│   ├── BasePage.ts             Shared navigation and utilities
│   ├── LoginPage.ts            Authentication flow
│   ├── ProductsPage.ts         Search, filter, sort
│   ├── CartPage.ts             Product detail + cart management
│   └── CheckoutPage.ts         End-to-end purchase flow
│
├── tests/
│   └── ui/                     UI test suites
│       ├── login.spec.ts
│       ├── products.spec.ts
│       ├── CartPage.spec.ts
│       └── CheckoutPage.spec.ts
│
├── utils/                      Helpers and test data
├── playwright.config.ts        Framework configuration
└── package.json
```

---

## Design Principles

**Separation of concerns**
- Page Objects own selectors and actions
- Test files own assertions and business flows
- No raw selectors or `expect` calls in Page Objects

**Selector strategy**
- `data-test` attributes preferred (test-resilient)
- No reliance on dynamic IDs or class names
- Search-based navigation for dynamic content

**Inheritance**
- All Page Objects extend `BasePage`
- Shared methods centralized once

---

## Setup

```bash
# Clone the repo
git clone https://github.com/masimzain-11/Webpage_E2E.git
cd Webpage_E2E

# Install dependencies
npm install

# Install browsers
npx playwright install chromium
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific suite
npx playwright test tests/ui/login.spec.ts

# Run with HTML report
npx playwright test
npx playwright show-report

# Run in headed mode (see the browser)
npx playwright test --headed

# Run a single test by name
npx playwright test -g "successful login"
```

---

## Test Coverage

| Suite | Tests | Coverage |
|---|---|---|
| Login | 2 | Valid credentials, invalid credentials |
| Products | 4 | Search, listing, sort, navigation |
| Cart | 6 | Add to cart, quantity, badge count, cart visibility |
| Checkout | 2 | Full checkout flow, payment confirmation |

**Total — 14 tests across 4 suites**

---

## Configuration Highlights

```typescript
// playwright.config.ts
{
  baseURL: 'https://practicesoftwaretesting.com',
  headless: false,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  retries: 0,
  timeout: 30000,
}
```

- Screenshots captured automatically on failure
- Videos recorded for failed tests
- Single browser (Chromium) for fast feedback
- Session cleared between tests via `beforeEach` cookies cleanup

---

## Sample Page Object

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  private emailInput    = '[placeholder="Your email"]';
  private passwordInput = '[placeholder="Your password"]';
  private loginButton   = '.btnSubmit';

  async loginWith(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
```

## Sample Test

```typescript
test('successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.loginWith('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('/account');
});
```

---

## Git Workflow

Development follows a feature-branch + pull request workflow:

```
master (protected)
   ↑
   └── feature branches → PR → review → merge
```

---

## Roadmap

- [ ] API test suite against `api.practicesoftwaretesting.com`
- [ ] CI/CD integration with GitHub Actions
- [ ] Cross-browser testing (Firefox, WebKit)
- [ ] Data-driven tests with external fixtures
- [ ] Visual regression testing
- [ ] Performance baseline tests

---

## Author

**Mohammed Asim Zain** — Quality Engineer transitioning into Automation
- GitHub: [@masimzain-11](https://github.com/masimzain-11)

---

## License

MIT — feel free to use this structure as a starting point for your own projects.