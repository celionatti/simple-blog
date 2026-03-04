/**
 * Sidebar Navigation Component
 */

const NAV_ITEMS = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', href: '#/', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { label: 'Products', href: '#/products', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' },
    ]
  },
  {
    section: 'Operations',
    items: [
      { label: 'Stock Entry', href: '#/stock', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
      { label: 'Sales', href: '#/sales', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>' },
      { label: 'Scanner', href: '#/scanner', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="7" y2="16"/><line x1="11" y1="8" x2="11" y2="16"/><line x1="15" y1="8" x2="15" y2="12"/><line x1="19" y1="8" x2="19" y2="16"/><line x1="3" y1="8" x2="3" y2="16"/></svg>' },
    ]
  },
  {
    section: 'Analytics',
    items: [
      { label: 'Reports', href: '#/reports', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    ]
  }
];

export function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  let html = '';
  for (const section of NAV_ITEMS) {
    html += `<div class="nav-section-title">${section.section}</div>`;
    for (const item of section.items) {
      const isActive = location.hash === item.href || (!location.hash && item.href === '#/');
      html += `
        <a href="${item.href}" class="${isActive ? 'active' : ''}">
          ${item.icon}
          <span>${item.label}</span>
        </a>
      `;
    }
  }
  nav.innerHTML = html;

  // Mobile sidebar toggle
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  const close = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  };

  hamburger?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay?.addEventListener('click', close);

  // Close sidebar on nav click (mobile)
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });
}
