/**
 * Add / Edit Product Page
 */
import { api } from '../api.js';
import { showToast } from '../components/toast.js';
import { generateSKU } from '../utils/helpers.js';

export function renderAddProduct(container, params = {}) {
  const isEdit = !!params.id;

  container.innerHTML = `
    <div class="page-header">
      <h2>${isEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <a href="#/products" class="btn btn-outline">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Products
      </a>
    </div>
    <div class="card">
      <form id="product-form">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="pf-name">Product Name *</label>
            <input type="text" id="pf-name" class="form-input" required placeholder="e.g. Wireless Mouse" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-sku">SKU *</label>
            <div class="form-row">
              <input type="text" id="pf-sku" class="form-input" required placeholder="e.g. WIR-2453" />
              <button type="button" class="btn btn-outline btn-sm" id="gen-sku" title="Auto-generate SKU">Generate</button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-barcode">Barcode *</label>
            <input type="text" id="pf-barcode" class="form-input" required placeholder="e.g. 123456789012" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-category">Category</label>
            <input type="text" id="pf-category" class="form-input" placeholder="e.g. Electronics" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-cost">Cost Price *</label>
            <input type="number" id="pf-cost" class="form-input" required min="0" step="0.01" placeholder="0.00" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-price">Selling Price *</label>
            <input type="number" id="pf-price" class="form-input" required min="0" step="0.01" placeholder="0.00" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-quantity">Quantity in Stock</label>
            <input type="number" id="pf-quantity" class="form-input" min="0" value="0" placeholder="0" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pf-reorder">Reorder Level</label>
            <input type="number" id="pf-reorder" class="form-input" min="0" value="10" placeholder="10" />
          </div>
        </div>
        <div style="margin-top: var(--space-lg);">
          <button type="submit" class="btn btn-primary" id="pf-submit">
            ${isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  `;

  const form = document.getElementById('product-form');

  // Auto-generate SKU
  document.getElementById('gen-sku')?.addEventListener('click', () => {
    const nameInput = document.getElementById('pf-name');
    document.getElementById('pf-sku').value = generateSKU(nameInput?.value);
  });

  // Load existing product for edit
  if (isEdit) {
    loadProduct(params.id);
  }

  async function loadProduct(id) {
    try {
      const product = await api.getProduct(id);
      document.getElementById('pf-name').value = product.name || '';
      document.getElementById('pf-sku').value = product.sku || '';
      document.getElementById('pf-barcode').value = product.barcode || '';
      document.getElementById('pf-category').value = product.category || '';
      document.getElementById('pf-cost').value = product.costPrice || '';
      document.getElementById('pf-price').value = product.sellingPrice || '';
      document.getElementById('pf-quantity').value = product.quantity ?? 0;
      document.getElementById('pf-reorder').value = product.reorderLevel ?? 10;
    } catch (err) {
      showToast(err.message || 'Failed to load product', 'error');
    }
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('pf-name').value.trim(),
      sku: document.getElementById('pf-sku').value.trim(),
      barcode: document.getElementById('pf-barcode').value.trim(),
      category: document.getElementById('pf-category').value.trim(),
      costPrice: parseFloat(document.getElementById('pf-cost').value) || 0,
      sellingPrice: parseFloat(document.getElementById('pf-price').value) || 0,
      quantity: parseInt(document.getElementById('pf-quantity').value) || 0,
      reorderLevel: parseInt(document.getElementById('pf-reorder').value) || 10,
    };

    if (!payload.name || !payload.sku || !payload.barcode) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    const submitBtn = document.getElementById('pf-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = isEdit ? 'Updating…' : 'Creating…';

    try {
      if (isEdit) {
        await api.updateProduct(params.id, payload);
        showToast('Product updated successfully', 'success');
      } else {
        await api.createProduct(payload);
        showToast('Product created successfully', 'success');
      }
      location.hash = '/products';
    } catch (err) {
      showToast(err.message || 'Failed to save product', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = isEdit ? 'Update Product' : 'Create Product';
    }
  });
}
