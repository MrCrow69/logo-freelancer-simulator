document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");
  const notifications = document.getElementById("notifications");

  // Admin Modal Elements
  const adminLoginModal = document.getElementById("admin-login");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminLoginCancel = document.getElementById("admin-login-cancel");
  const showPasswordCheckbox = document.getElementById("show-password");

  const ADMIN_PASSWORD = "1234";

  let activeTab = "inbox";

  function switchTab(tab) {
    if (tab === activeTab) return;
    document.querySelector(`.tab-btn[data-tab="${activeTab}"]`)?.classList.remove("active");
    document.querySelector(`.tab-btn[data-tab="${tab}"]`)?.classList.add("active");
    content.style.opacity = 0;
    setTimeout(() => {
      content.innerHTML = `<p>Loading ${tab} content...</p>`;
      content.style.opacity = 1;
    }, 300);
    activeTab = tab;
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  switchTab(activeTab);

  // Notifications
  function createNotification(text, options = {}) {
    const notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = text;
    if (options.type) notif.classList.add(`notification-${options.type}`);
    notifications.appendChild(notif);

    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 500);
    }, options.duration || 5000);
  }

  // Admin Access
  function openAdminLogin() {
    adminLoginModal.classList.remove("hidden");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }

  function closeAdminLogin() {
    adminLoginModal.classList.add("hidden");
  }

  adminLoginCancel.addEventListener("click", closeAdminLogin);
  showPasswordCheckbox.addEventListener("change", () => {
    adminPasswordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (adminPasswordInput.value === ADMIN_PASSWORD) {
      closeAdminLogin();
      createNotification("Admin access granted", { type: "info" });
    } else {
      createNotification("Incorrect password", { type: "warning" });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyA") {
      e.preventDefault();
      openAdminLogin();
    }
  });

  window.LFS = { switchTab, createNotification };
});
