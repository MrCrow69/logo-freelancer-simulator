document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const tabs = document.querySelectorAll(".tab-btn");
  const notifications = document.getElementById("notifications");

  let activeTab = "inbox";
  const clientData = [];
  const reviews = [];

  function switchTab(tab) {
    if (tab === activeTab) return;
    tabs.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`.tab-btn[data-tab="${tab}"]`)?.classList.add("active");
    content.classList.add("fade-out");
    setTimeout(() => {
      loadTabContent(tab);
      content.classList.remove("fade-out");
      content.classList.add("fade-in");
    }, 300);
    activeTab = tab;
  }

  function loadTabContent(tab) {
    if (tab === "inbox") renderInbox();
    else if (tab === "store") content.innerHTML = "<p>Store logic coming soon.</p>";
    else if (tab === "projects") content.innerHTML = "<p>No projects in progress yet.</p>";
    else if (tab === "reviews") renderReviews();
    else if (tab === "settings") content.innerHTML = "<p>Settings coming soon.</p>";
    else content.innerHTML = "<p>Unknown tab.</p>";
  }

  function createNotification(message, options = {}) {
    const notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = message;
    if (options.type) notif.classList.add(`notification-${options.type}`);
    notifications.appendChild(notif);

    if (options.onClick) {
      notif.style.cursor = "pointer";
      notif.addEventListener("click", () => {
        options.onClick();
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 500);
      });
    }

    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 1000);
    }, options.duration || 7000);
  }

  function addClient(name, company, description, budget) {
    const id = `client-${Date.now()}`;
    clientData.push({ id, name, company, description, budget });
    if (activeTab !== "inbox") {
      createNotification(`New client: ${name}`, {
        type: "info",
        onClick: () => {
          switchTab("inbox");
          setTimeout(() => scrollToClient(id), 400);
        }
      });
    } else {
      renderInbox();
      setTimeout(() => scrollToClient(id), 400);
    }
  }

  function scrollToClient(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("highlight");
      setTimeout(() => element.classList.remove("highlight"), 2000);
    }
  }

  function renderInbox() {
    content.innerHTML = clientData.map(client => `
      <div class="client-card" id="${client.id}">
        <h3>${client.name} (${client.company})</h3>
        <p>${client.description}</p>
        <strong>$${client.budget}</strong>
      </div>
    `).join("") || "<p>No clients yet.</p>";
  }

  function renderReviews() {
    const avg = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";
    const stars = Math.round(avg);
    content.innerHTML = `
      <div class="review-summary">
        <h2>${avg} / 5</h2>
        <div class="stars">${"★".repeat(stars)}${"☆".repeat(5 - stars)}</div>
      </div>
      <div class="review-list">
        ${reviews.map(r => `
          <div class="review">
            <strong>${r.client}</strong>
            <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
            <p>${r.text}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  function simulateIncomingClient() {
    const names = ["John Doe", "Lisa Chen", "Raj Patel", "Ava Stone"];
    const companies = ["Nova Designs", "PixelPeak", "HexaCorp", "Lume Labs"];
    const descs = ["Needs a tech logo", "Wants modern minimalist design", "Looking for animated branding", "Needs urgent rebranding"];
    const name = names[Math.floor(Math.random() * names.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const description = descs[Math.floor(Math.random() * descs.length)];
    const budget = Math.floor(Math.random() * 100) + 150;
    addClient(name, company, description, budget);
  }

  // Trigger a new client every 15 seconds for demo
  setInterval(simulateIncomingClient, 15000);

  // Bind tab buttons
  tabs.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Startup
  switchTab("inbox");
});
