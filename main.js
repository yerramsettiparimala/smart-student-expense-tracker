/**
 * Smart Student Expense Tracker - Main Frontend Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle (Light / Dark mode)
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("student_expense_theme") || "light";

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.innerHTML = "☀️";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.innerHTML = "🌙";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const active = document.documentElement.getAttribute("data-theme");
      const nextTheme = active === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("student_expense_theme", nextTheme);
      themeToggle.innerHTML = nextTheme === "dark" ? "☀️" : "🌙";
      
      // Update charts theme if available
      if (window.renderDashboardCharts) {
        window.renderDashboardCharts();
      }
    });
  }

  // 2. Mobile Sidebar Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
        sidebar.classList.remove("open");
      }
    });
  }

  // 3. Modal Controls
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  };

  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  // 4. Auto-dismiss alerts after 5 seconds
  document.querySelectorAll(".alert").forEach((alert) => {
    setTimeout(() => {
      alert.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-6px)";
      setTimeout(() => alert.remove(), 400);
    }, 5000);
  });

  // 5. Client Table Search Helper
  window.filterTableRows = function (inputElem, tableId) {
    const term = inputElem.value.toLowerCase();
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? "" : "none";
    });
  };
});
