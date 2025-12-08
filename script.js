function scrollToSection(id) {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  }
  
  function closeMobileMenu() {
    const mobileNav = document.getElementById("mobile-nav");
    const menuToggle = document.getElementById("menu-toggle");
    if (mobileNav) mobileNav.hidden = true;
    if (menuToggle) menuToggle.textContent = "☰";
  }
  
  function initMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
  
    if (!menuToggle || !mobileNav) return;
  
    menuToggle.addEventListener("click", () => {
      const isHidden = mobileNav.hidden;
      mobileNav.hidden = !isHidden;
      menuToggle.textContent = isHidden ? "✕" : "☰";
    });
  }
  
  function filterProducts(searchText) {
    const products = Array.from(
      document.querySelectorAll(".product-card")
    );
    const feedback = document.getElementById("search-feedback");
  
    const trimmed = searchText.trim().toLowerCase();
  
    if (trimmed === "") {
      products.forEach((card) => {
        card.style.display = "";
      });
      if (feedback) feedback.textContent = "";
      return;
    }
  
    let visibleCount = 0;
  
    products.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const category = (card.dataset.category || "").toLowerCase();
      const description = (card.dataset.description || "").toLowerCase();
  
      const matches =
        name.includes(trimmed) ||
        category.includes(trimmed) ||
        description.includes(trimmed);
  
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount += 1;
    });
  
    if (feedback) {
      if (visibleCount > 0) {
        feedback.textContent = `Found ${visibleCount} product${
          visibleCount !== 1 ? "s" : ""
        } for "${searchText}"`;
      } else {
        feedback.textContent = `No products found for "${searchText}"`;
      }
    }
  }
  
  function initSearch() {
    const desktopSearch = document.getElementById("product-search");
    const mobileSearch = document.getElementById("mobile-product-search");
  
    function handleInput(event) {
      filterProducts(event.target.value);
    }
  
    if (desktopSearch) {
      desktopSearch.addEventListener("input", handleInput);
    }
  
    if (mobileSearch) {
      mobileSearch.addEventListener("input", handleInput);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initSearch();
  });
  