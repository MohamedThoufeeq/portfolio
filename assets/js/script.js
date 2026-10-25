"use strict";

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    const isOpen = sidebar.classList.toggle("active");
    sidebarBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// activate a page by its data-page name
const activatePage = function (target) {
  const page = Array.from(pages).find(
    (item) => item.dataset.page === target,
  );

  if (!page) return;

  pages.forEach(function (item) {
    item.classList.toggle("active", item === page);
  });

  navigationLinks.forEach(function (link) {
    const isActive = link.textContent.trim().toLowerCase() === target;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  window.scrollTo(0, 0);
};

// add event to all nav links
navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const target = this.textContent.trim().toLowerCase();

    if (window.location.hash === "#" + target) {
      activatePage(target);
    } else {
      window.location.hash = target;
    }
  });
});

// restore the selected page on load / hash changes
activatePage(window.location.hash.slice(1).toLowerCase() || "about");
window.addEventListener("hashchange", function () {
  activatePage(window.location.hash.slice(1).toLowerCase());
});
