/**
 * Hash-based SPA Router
 */
export class Router {
  constructor(routes) {
    this.routes = routes;
    this._currentCleanup = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  resolve() {
    const hash = location.hash.slice(1) || '/';
    let matched = null;
    let params = {};

    for (const route of this.routes) {
      const result = this._match(route.path, hash);
      if (result) {
        matched = route;
        params = result;
        break;
      }
    }

    if (!matched) {
      matched = this.routes.find(r => r.path === '*') || this.routes[0];
    }

    // Cleanup previous page
    if (this._currentCleanup && typeof this._currentCleanup === 'function') {
      this._currentCleanup();
    }

    // Render new page
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loader">Loading…</div>';

    // Update topbar title
    const titleEl = document.getElementById('topbar-title');
    if (titleEl) titleEl.textContent = matched.title || 'StoreKeep';

    // Update sidebar active link
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${hash}`);
    });

    // Render the page
    const cleanup = matched.render(app, params);
    this._currentCleanup = cleanup || null;
  }

  navigate(path) {
    location.hash = path;
  }

  _match(pattern, path) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  }
}
