import { test, expect } from '@playwright/test';

const API_BASE = 'https://api.practicesoftwaretesting.com';

test.describe('Account API (Authenticated)', () => {

  let accessToken: string;

  // ─── Setup: Get a token BEFORE running tests ──────────────
  test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01'
      }
    });
    const body = await loginResponse.json();
    accessToken = body.access_token;
  });

  test('GET /users/me returns logged-in user profile', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.email).toBe('customer@practicesoftwaretesting.com');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
  });

  test('GET /users/me without token returns 401', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/me`);

    expect(response.status()).toBe(401);
  });

  test('GET /users/me with invalid token returns 401', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/me`, {
      headers: {
        'Authorization': 'Bearer this-is-a-fake-token-12345'
      }
    });

    expect(response.status()).toBe(401);
  });

});