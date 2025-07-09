document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");
  const notifications = document.getElementById("notifications");

  const adminLoginModal = document.getElementById("admin-login");
  const adminLoginForm = document.getElementById("admin-login-form");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminLoginCancel = document.getElementById("admin-login-cancel");
  const showPasswordCheckbox = document.getElementById("show-password");

  const ADMIN_PASSWORD = "1234";
  let activeTab = "inbox";
  let adminLoggedIn = false;
  let clientIdCounter = 1;

  function switchTab(newTab) {
    if (newTab === activeTab) return;
    const oldBtn = document.querySelector(`.tab-btn[data-tab="${activeTab}"]`);
    const newBtn = document.querySelector(`.tab-btn[data-tab="${newTab}"]`);
    oldBtn?.classList.remove("active");
    newBtn?.classList.add("active");

    content.style.opacity = 0;
    setTimeout(() => {
      content.innerHTML = generateContent(newTab);
      content.style.opacity = 1;
    }, 300);
    activeTab = newTab;
  }

  function generateContent(tab) {
    switch (tab) {
      case "inbox": return renderInbox();
      case "store": return "<h2>Store</h2><p>Coming soon: upgrades, perks, and more!</p>";
      case "projects": return "<h2>Projects</h2><p>Work on accepted client jobs here.</p>";
      case "stats": return "<h2>Stats</h2><p>Track your progress, earnings, and milestones.</p>";
      case "settings": return "<h2>Settings</h2><p>Configure your preferences and account.</p>";
      default: return "<p>Unknown tab.</p>";
    }
  }

  function renderInbox() {
    return `
      <h2>Inbox</h2>
      <div class="inbox-list">
        ${generateClientHTML()}
      </div>
    `;
  }

  function generateClientHTML() {
    const name = getRandomName();
    const company = getRandomCompany();
    const description = getRandomDescription();
    const budget = `$${Math.floor(Math.random() * 900 + 100)}`;

    return `
      <div class="client-card">
        <strong>${name}</strong> from <em>${company}</em><br/>
        <p>${description}</p>
        <button class="btn">Accept – ${budget}</button>
      </div>
    `;
  }

  // AI-like random generators
  function getRandomName() {
    const names = ["Ava Miller", "Eli Chen", "Sofia Garcia", "Noah Patel", "Leo Smith"];
    return names[Math.floor(Math.random() * names.length)];
  }

  function getRandomCompany() {
    const companies = ["GlowTech", "Hyperloop Labs", "QuantumRise", "Nimbus Works", "PixelNet"];
    return companies[Math.floor(Math.random() * companies.length)];
  }

  function getRandomDescription() {
    const descs = [
      "We're launching a new eco-friendly product and need a minimal yet vibrant logo.",
      "Looking to rebrand our entire visual identity with a sleek, futuristic touch.",
      "We want something bold and memorable for our AI startup.",
      "A modern design for our app that's launching next month.",
      "Logo must include a subtle nod to sustainability and innovation."
    ];
    return descs[Math.floor(Math.random() * descs.length)];
  }

  function createNotification(text, type = "info", duration = 5000) {
    const notif = document.createElement("div");
    notif.className = `notification notification-${type}`;
    notif.textContent = text;
    notifications.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 500);
    }, duration);
  }

  function openAdminLogin() {
    adminLoginModal.classList.remove("hidden");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }

  function closeAdminLogin() {
    adminLoginModal.classList.add("hidden");
  }

  function openAdminPanel() {
    if (!adminLoggedIn) {
      openAdminLogin();
    } else {
      createNotification("Admin panel opened (dev placeholder)");
    }
  }

  adminLoginCancel.addEventListener("click", closeAdminLogin);

  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (adminPasswordInput.value === ADMIN_PASSWORD) {
      adminLoggedIn = true;
      closeAdminLogin();
      createNotification("Access granted", "info");
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

  tabs.forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
      switchTab(tabBtn.dataset.tab);
    });
  });

  switchTab(activeTab);
});
