import { test, expect } from '@playwright/test';

const API_BASE = 'https://api.practicesoftwaretesting.com';

test.describe('Authentication API', () => {

  test('POST /users/login returns token with valid credentials', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    expect(typeof body.access_token).toBe('string');
  });

  test('POST /users/login fails with wrong password', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: 'cusomer@practicesoftwaretesting.com',
        password: 'definitely-wrong-password'
      }
    });

    expect(response.status()).toBe(401);
  });

  test('POST /users/login fails with non-existent email', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: 'nobody@nowhere.test',
        password: 'anything'
      }
    });

    expect(response.status()).toBe(401);
  });

  test('POST /users/login requires email and password', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users/login`, {
      data: {}
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

});