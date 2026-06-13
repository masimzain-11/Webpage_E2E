# Webpage E2E — Playwright Automation Framework

[![Playwright Tests](https://github.com/masimzain-11/Webpage_E2E/actions/workflows/playwright.yml/badge.svg)](https://github.com/masimzain-11/Webpage_E2E/actions/workflows/playwright.yml)

End-to-end UI and API test automation framework built with Playwright and TypeScript using the Page Object Model (POM) design pattern. Tests run against [practicesoftwaretesting.com](https://practicesoftwaretesting.com), a real e-commerce application.

---

## Tech Stack

- **Playwright** — modern browser automation
- **TypeScript** — type-safe test code
- **Node.js** — runtime
- **POM** — Page Object Model architecture
- **GitHub Actions** — CI/CD pipeline
- **Claude API** — AI-powered failure analysis

---

## 🤖 AI Failure Analyst Agent

An AI-powered agent built on top of this framework that automatically analyses test failures and generates plain-English diagnostic reports using Claude API.

### How it works
1. **Reader** — extracts failures from Playwright's `results.json` output
2. **Analyst** — sends each failure to Claude API with context, gets root cause diagnosis
3. **Reporter** — writes structured markdown report to `agent-reports/`

### Agent architecture
```
agent/
├── reader.ts     ← extracts failures from results.json
├── analyst.ts    ← sends failures to Claude API, receives diagnosis
├── reporter.ts   ← writes markdown failure report
└── run.ts        ← orchestrates the pipeline
```
### CI integration
The agent runs automatically on every GitHub Actions failure via `if: failure()` condition — zero manual intervention required.

### Run locally
```bash
npx ts-node agent/run.ts
```

---

## Framework Architecture
```
Webpage_E2E/

├── agent/                      AI failure analyst agent

│   ├── reader.ts               Extracts failures from results.json

│   ├── analyst.ts              Sends failures to Claude API

│   ├── reporter.ts             Writes markdown report

│   └── run.ts                  Orchestrates the pipeline

│

├── pages/                      Page Objects (one per page/flow)

│   ├── BasePage.ts             Shared navigation and utilities

│   ├── LoginPage.ts            Authentication flow

│   ├── ProductsPage.ts         Search, filter, sort

│   ├── CartPage.ts             Product detail + cart management

│   └── CheckoutPage.ts         End-to-end purchase flow

│

├── tests/

│   ├── ui/                     UI test suites

│   │   ├── login.spec.ts

│   │   ├── products.spec.ts

│   │   ├── CartPage.spec.ts

│   │   └── CheckoutPage.spec.ts

│   └── api/                    API test suites

│       ├── auth.spec.ts

│       ├── account.spec.ts

│       └── products.spec.ts

│

├── fixtures/

│   └── testData.ts             Centralised test data

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

**Single Responsibility Principle**
- Each agent file does exactly one job
- Each Page Object maps to exactly one page

**Centralised test data**
- All credentials and constants in `fixtures/testData.ts`
- No hardcoded values in test files

---

## Setup

```bash
# Clone the repo
git clone https://github.com/masimzain-11/Webpage_E2E.git
cd Webpage_E2E

# Install dependencies
npm install

# Install browsers
npx playwright install chromium firefox
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run UI tests only
npx playwright test tests/ui/

# Run API tests only
npx playwright test tests/api/

# Run a specific suite
npx playwright test tests/ui/login.spec.ts

# Run in headed mode
npx playwright test --headed

# Run AI failure analyst
npx ts-node agent/run.ts
```

---

## Test Coverage

| Suite | Type | Tests | Coverage |
|---|---|---|---|
| Login | UI | 2 | Valid credentials, invalid credentials |
| Products | UI | 4 | Search, listing, sort, navigation |
| Cart | UI | 6 | Add to cart, quantity, badge count |
| Checkout | UI | 2 | Full checkout flow, payment confirmation |
| Auth | API | 4 | Login, token validation, error handling |
| Account | API | 3 | Profile fetch, auth guard, invalid token |
| Products | API | 4 | Listing, search, field validation, 404 |

**Total — 25 tests across 7 suites, 2 browsers**

---

## Configuration Highlights

```typescript
// playwright.config.ts
{
  baseURL: 'https://practicesoftwaretesting.com',
  retries: process.env.CI ? 1 : 0,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  timeout: 30000,
}
```

- Retries enabled on CI to handle network flakiness
- Screenshots and video captured on failure
- Cross-browser: Chromium + Firefox

---

## Roadmap

- [x] UI test suite — login, products, cart, checkout
- [x] API test suite against `api.practicesoftwaretesting.com`
- [x] CI/CD integration with GitHub Actions
- [x] Cross-browser testing (Chromium + Firefox)
- [x] Centralised test data with fixtures
- [x] AI failure analyst agent (Claude API)
- [ ] Visual regression testing
- [ ] Performance baseline tests with k6
- [ ] BDD layer with Cucumber/Gherkin

---

## Author

**Mohammed Asim Zain** — Quality Engineer transitioning to SDET, specialising in Playwright + TypeScript automation
- GitHub: [@masimzain-11](https://github.com/masimzain-11)

---

## License

MIT — feel free to use this structure as a starting point for your own projects.