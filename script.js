document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Smooth scroll
  ========================= */
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* =========================
     Mobile menu
  ========================= */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  window.closeMobileMenu = function () {
    mobileNav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  /* =========================
     Search filter
  ========================= */
  function filterProducts(value) {
    const products = document.querySelectorAll(".product-card");
    const text = value.toLowerCase();

    products.forEach((card) => {
      const content =
        card.dataset.name +
        card.dataset.category +
        card.dataset.description;

      card.style.display = content.toLowerCase().includes(text)
        ? ""
        : "none";
    });
  }

  const searchInputs = [
    document.getElementById("product-search"),
    document.getElementById("mobile-product-search"),
  ];

  searchInputs.forEach((input) => {
    if (!input) return;
    input.addEventListener("input", (e) =>
      filterProducts(e.target.value)
    );
  });

  /* =========================
     Featured carousel
  ========================= */
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".featured-item");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!track || !items.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
  });
});
