/**
 * StoreKeep — App Entry Point
 */
import { Router } from './router.js';
import { renderSidebar } from './components/sidebar.js';
import { renderBottomNav } from './components/bottomNav.js'; // Added import
import { renderDashboard } from './pages/dashboard.js';
import { renderProducts } from './pages/products.js';
import { renderAddProduct } from './pages/addProduct.js';
import { renderStockEntry } from './pages/stockEntry.js';
import { renderSales } from './pages/sales.js';
import { renderReports } from './pages/reports.js';
import { renderScanner } from './pages/scanner.js';

// Remove Vite default styles
const defaultStyle = document.querySelector('link[href*="style.css"][href*="src"]');
if (defaultStyle) defaultStyle.remove();

// Initialize sidebar and bottom navigation
renderSidebar();
renderBottomNav(); // Added call

// Initialize router
const router = new Router([
  { path: '/',               title: 'Dashboard',    render: renderDashboard },
  { path: '/products',       title: 'Products',     render: renderProducts },
  { path: '/products/new',   title: 'Add Product',  render: renderAddProduct },
  { path: '/products/edit/:id', title: 'Edit Product', render: renderAddProduct },
  { path: '/stock',          title: 'Stock Entry',  render: renderStockEntry },
  { path: '/sales',          title: 'Sales',        render: renderSales },
  { path: '/reports',        title: 'Reports',      render: renderReports },
  { path: '/scanner',        title: 'Scanner',      render: renderScanner },
]);

// Initial render
router.resolve();
