import { test, expect } from '@playwright/test';
import { API_BASE, testUsers } from '../../fixtures/testData';

test.describe('Account API (Authenticated)', () => {

  let accessToken: string;

  test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: testUsers.customer.email,
        password: testUsers.customer.password,
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
    expect(user.email).toBe(testUsers.customer.email);
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