document.addEventListener("DOMContentLoaded", () => {
  // --- Search Overlay Logic ---
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchTriggers = [
    document.getElementById("search-trigger"),
    document.getElementById("mobile-search-trigger"),
  ].filter(Boolean); // Filter out nulls
  const closeSearch = document.getElementById("close-search");

  if (searchOverlay && searchInput) {
    // Open Search
    searchTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        searchOverlay.classList.add("active");
        document.body.classList.add("search-open");
        setTimeout(() => searchInput.focus(), 300);
      });
    });

    // Close Search Function
    const closeSearchOverlay = () => {
      searchOverlay.classList.remove("active");
      document.body.classList.remove("search-open");

      // Reset filtering if on index page
      const products = Array.from(document.querySelectorAll(".product-card"));
      const searchInfo = document.getElementById("search-info");
      if (products.length > 0) {
        products.forEach((p) => (p.style.display = "flex"));
      }
      if (searchInfo) {
        searchInfo.style.display = "none";
      }
      searchInput.value = "";
    };

    if (closeSearch) {
      closeSearch.addEventListener("click", closeSearchOverlay);
    }

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
        closeSearchOverlay();
      }
    });

    // Search Input Handling
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const productGrid = document.querySelector(".product-grid");
      const products = Array.from(document.querySelectorAll(".product-card"));
      const searchInfo = document.getElementById("search-info");
      const searchQuerySpan = document.getElementById("search-query");

      // If we are on the index page (where products are listed)
      if (productGrid && products.length > 0) {
        if (query.length > 0) {
          if (searchInfo) searchInfo.style.display = "block";
          if (searchQuerySpan) searchQuerySpan.textContent = query;

          products.forEach((p) => {
            const title = p.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
              p.style.display = "flex";
            } else {
              p.style.display = "none";
            }
          });

          const collection = document.getElementById("collection");
          if (collection) {
            collection.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          if (searchInfo) searchInfo.style.display = "none";
          products.forEach((p) => (p.style.display = "flex"));
        }
      }
    });

    // Redirect to index with search query (if on other pages)
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = e.target.value.trim();
        const isIndexPage =
          window.location.pathname.endsWith("index.html") ||
          window.location.pathname.endsWith("/shop/");
        if (query && !isIndexPage) {
          window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        }
      }
    });

    // Check for search parameter in URL (on index page)
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      searchInput.value = searchParam;
      // Trigger input event to filter
      searchInput.dispatchEvent(new Event("input"));
    }
  }

  // --- Product Gallery / Color Swatch Selection ---
  const swatches = document.querySelectorAll(".color-swatch");
  const colorNameDisplay = document.getElementById("selected-color-name");

  if (swatches.length > 0) {
    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        swatches.forEach((s) => s.classList.remove("active"));
        swatch.classList.add("active");
        if (colorNameDisplay) {
          colorNameDisplay.textContent = swatch.getAttribute("data-color");
        }

        // If there's a main image to update (mock logic)
        const mainImg = document.querySelector(".product-image-main img");
        if (mainImg && swatch.dataset.img) {
          mainImg.src = swatch.dataset.img;
        }
      });
    });
  }

  // --- Quantity Selector Logic (Used in Product and Cart) ---
  const quantitySelectors = document.querySelectorAll(".quantity-selector");
  quantitySelectors.forEach((selector) => {
    const minusBtn = selector.querySelector(".quantity-btn:first-child");
    const plusBtn = selector.querySelector(".quantity-btn:last-child");
    const input = selector.querySelector(".quantity-input");

    if (minusBtn && plusBtn && input) {
      minusBtn.addEventListener("click", () => {
        const val = parseInt(input.value);
        if (val > 1) input.value = val - 1;
      });
      plusBtn.addEventListener("click", () => {
        const val = parseInt(input.value);
        input.value = val + 1;
      });
    }
  });
});
