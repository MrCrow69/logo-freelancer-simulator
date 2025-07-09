
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");
  const notifications = document.getElementById("notifications");
  const ADMIN_PASSWORD = "logolancer_admin1";

  const adminLoginModal = document.getElementById("admin-login");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminLoginCancel = document.getElementById("admin-login-cancel");
  const showPasswordCheckbox = document.getElementById("show-password");

  let activeTab = "inbox";
  let adminLoggedIn = false;

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

  function createNotification(text, type = "") {
    const div = document.createElement("div");
    div.className = `notification ${type ? "notification-" + type : ""}`;
    div.textContent = text;
    notifications.appendChild(div);
    setTimeout(() => {
      div.style.opacity = 0;
      setTimeout(() => div.remove(), 1000);
    }, 5000);
  }

  function openAdminPanel() {
    if (!adminLoggedIn) {
      adminLoginModal.classList.remove("hidden");
      adminPasswordInput.value = "";
      adminPasswordInput.focus();
    } else {
      createNotification("Admin Panel Opened", "info");
    }
  }

  adminLoginCancel.addEventListener("click", () => {
    adminLoginModal.classList.add("hidden");
  });

  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (adminPasswordInput.value === ADMIN_PASSWORD) {
      adminLoggedIn = true;
      adminLoginModal.classList.add("hidden");
      openAdminPanel();
    } else {
      alert("Incorrect password.");
    }
  });

  showPasswordCheckbox.addEventListener("change", () => {
    adminPasswordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyA") {
      e.preventDefault();
      openAdminPanel();
    }
  });

  window.LFS = {
    switchTab,
    createNotification
  };
});
