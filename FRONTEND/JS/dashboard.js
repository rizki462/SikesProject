document.addEventListener("DOMContentLoaded", function () {
  /* ================= ELEMENT ================= */
  const menuLinks = document.querySelectorAll(".menu-link");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");
  const hamburger = document.getElementById("hamburger");

  const logoutBtn = document.getElementById("logout");
  const modal = document.getElementById("logoutModal");
  const cancelBtn = document.getElementById("cancelLogout");
  const confirmBtn = document.getElementById("confirmLogout");

  /* ================= MENU NAVIGASI ================= */
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetPage = this.getAttribute("href");

      sidebar.classList.remove("active");
      overlay.classList.remove("active");

      window.location.href = targetPage;
    });
  });

  /* ================= ACTIVE MENU ================= */
  const currentPage = window.location.pathname.split("/").pop();
  menuLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });

  /* ================= LOGOUT ================= */
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("active");
    });

    cancelBtn.addEventListener("click", function () {
      modal.classList.remove("active");
    });

    confirmBtn.addEventListener("click", function () {
      window.location.href = "login.html";
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  /* ================= HAMBURGER ================= */
  hamburger.addEventListener("click", function () {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    history.pushState({ sidebar: true }, "");
  });

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }

  overlay.addEventListener("click", closeSidebar);

  window.addEventListener("popstate", function () {
    closeSidebar();
  });
});
