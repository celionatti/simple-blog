/**
 * API Client — Thin fetch wrapper for all backend calls
 */
const BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(url, config);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  // Products
  getProducts: (query = '') => request(`/products${query ? `?search=${encodeURIComponent(query)}` : ''}`),
  getProduct: (id) => request(`/products/${id}`),
  getProductByBarcode: (code) => request(`/products/barcode/${encodeURIComponent(code)}`),
  createProduct: (data) => request('/products', { method: 'POST', body: data }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: 'PUT', body: data }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),

  // Stock
  getStockEntries: () => request('/stock'),
  createStockEntry: (data) => request('/stock', { method: 'POST', body: data }),

  // Sales
  getSales: (from, to) => {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const qs = params.toString();
    return request(`/sales${qs ? `?${qs}` : ''}`);
  },
  createSale: (data) => request('/sales', { method: 'POST', body: data }),

  // Dashboard
  getDashboard: () => request('/dashboard'),
};
