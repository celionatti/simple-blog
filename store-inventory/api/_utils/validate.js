/**
 * Validation Utilities for API Payloads
 */

function validateProduct(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    errors.push('Product name is required');
  }
  if (!body.sku || typeof body.sku !== 'string' || !body.sku.trim()) {
    errors.push('SKU is required');
  }
  if (!body.barcode || typeof body.barcode !== 'string' || !body.barcode.trim()) {
    errors.push('Barcode is required');
  }
  if (body.costPrice == null || isNaN(body.costPrice) || body.costPrice < 0) {
    errors.push('Cost price must be a non-negative number');
  }
  if (body.sellingPrice == null || isNaN(body.sellingPrice) || body.sellingPrice < 0) {
    errors.push('Selling price must be a non-negative number');
  }
  return errors;
}

function validateStockEntry(body) {
  const errors = [];
  if (!body.productId) {
    errors.push('Product ID is required');
  }
  if (!body.quantity || isNaN(body.quantity) || body.quantity <= 0) {
    errors.push('Quantity must be a positive number');
  }
  return errors;
}

function validateSale(body) {
  const errors = [];
  if (!body.productId) {
    errors.push('Product ID is required');
  }
  if (!body.quantity || isNaN(body.quantity) || body.quantity <= 0) {
    errors.push('Quantity must be a positive number');
  }
  if (body.totalAmount == null || isNaN(body.totalAmount) || body.totalAmount < 0) {
    errors.push('Total amount must be a non-negative number');
  }
  return errors;
}

module.exports = { validateProduct, validateStockEntry, validateSale };
