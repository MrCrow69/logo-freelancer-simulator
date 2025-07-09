document.addEventListener("DOMContentLoaded", () => {
  // Cached DOM elements
  const tabs = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");
  const notifications = document.getElementById("notifications");

  // Admin elements
  const adminLoginModal = document.getElementById("admin-login");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminLoginCancel = document.getElementById("admin-login-cancel");
  const showPasswordCheckbox = document.getElementById("show-password");

  const ADMIN_PASSWORD = "1234"; // Dev phase testing password

  // Current active tab tracking
  let activeTab = "inbox";

  // Tab content templates (simplified for demo)
  const tabContents = {
    inbox: `<h2>Inbox</h2><p>You have no new messages.</p>`,
    store: `<h2>Store</h2><p>Buy upgrades and tools here.</p>`,
    projects: `<h2>Projects</h2><p>Work on your accepted projects here.</p>`,
    stats: `<h2>Stats</h2><p>Your performance metrics will appear here.</p>`,
    settings: `<h2>Settings</h2><p>Customize your experience.</p>`
  };

  // -- Tab switching with smooth fade --
  function switchTab(newTab) {
    if (newTab === activeTab) return;
    const oldBtn = document.querySelector(`.tab-btn[data-tab="${activeTab}"]`);
    const newBtn = document.querySelector(`.tab-btn[data-tab="${newTab}"]`);

    // Deactivate old
    if (oldBtn) {
      oldBtn.classList.remove("active");
      oldBtn.setAttribute("aria-selected", "false");
    }

    // Activate new
    if (newBtn) {
      newBtn.classList.add("active");
      newBtn.setAttribute("aria-selected", "true");
    }

    // Fade out current content
    content.style.opacity = 0;
    setTimeout(() => {
      content.innerHTML = tabContents[newTab] || "<p>Content not found.</p>";
      content.style.opacity = 1;
    }, 300);

    activeTab = newTab;
  }

  // Initial tab setup
  switchTab(activeTab);

  // Attach tab buttons listeners
  tabs.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      switchTab(tabBtn.dataset.tab);
    });
  });

  // -- Notifications system --

  function createNotification(text, options = {}) {
    const notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = text;
    if (options.type) notif.classList.add(`notification-${options.type}`);

    notifications.appendChild(notif);

    const duration = options.duration || 5000;
    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 800);
    }, duration);

    return notif;
  }

  // -- Admin panel controls --

  let adminLoggedIn = false;

  function openAdminPanel() {
    if (!adminLoggedIn) {
      openAdminLogin();
      return;
    }
    createNotification("Admin panel opened (placeholder)", { type: "info" });
  }

  function openAdminLogin() {
    adminLoginModal.classList.remove("hidden");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }

  function closeAdminLogin() {
    adminLoginModal.classList.add("hidden");
  }

  adminLoginCancel.addEventListener("click", () => {
    closeAdminLogin();
  });

  showPasswordCheckbox.addEventListener("change", () => {
    adminPasswordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (adminPasswordInput.value === ADMIN_PASSWORD) {
      adminLoggedIn = true;
      closeAdminLogin();
      openAdminPanel();
    } else {
      alert("Incorrect password.");
      adminPasswordInput.value = "";
      adminPasswordInput.focus();
    }
  });

  // -- Key combo Ctrl+Shift+A to open admin --
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyA") {
      e.preventDefault();
      openAdminPanel();
    }
  });

  // Accessibility: Focus outlines for keyboard users only
  function handleFirstTab(e) {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
      window.removeEventListener("keydown", handleFirstTab);
    }
  }
  window.addEventListener("keydown", handleFirstTab);
});
