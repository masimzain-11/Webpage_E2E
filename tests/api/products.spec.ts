import { test, expect } from '@playwright/test';

const API_BASE = 'https://api.practicesoftwaretesting.com';

test.describe('Products API', () => {

  test('GET /products returns 200 with product list', async ({ request }) => {
    const response = await request.get(`${API_BASE}/products`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('each product has required fields', async ({ request }) => {
    const response = await request.get(`${API_BASE}/products`);
    const body = await response.json();
    const firstProduct = body.data[0];

    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
  });

  test('GET /products/search returns matching products', async ({ request }) => {
    const response = await request.get(`${API_BASE}/products/search?q=pliers`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);

    const allMatchPliers = body.data.every((p: any) =>
      p.name.toLowerCase().includes('plier')
    );
    expect(allMatchPliers).toBe(true);
  });

  test('GET /products/{invalid-id} returns 404', async ({ request }) => {
    const response = await request.get(`${API_BASE}/products/non-existent-id-12345`);

    expect(response.status()).toBe(404);
  });

});