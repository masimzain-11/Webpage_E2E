import { test, expect } from '@playwright/test';
import { API_BASE, testUsers } from '../../fixtures/testData';

test.describe('Authentication API', () => {

  test('POST /users/login returns token with valid credentials', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: testUsers.customer.email,
        password: testUsers.customer.password,
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
        email: testUsers.customer.email,
        password: 'definitely-wrong-password',
      }
    });

    expect(response.status()).toBe(401);
  });

  test('POST /users/login fails with non-existent email', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users/login`, {
      data: {
        email: testUsers.invalid.email,
        password: testUsers.invalid.password,
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