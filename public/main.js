// === Game State ===
const gameState = {
  clients: [],
  projects: [],
  storeItems: [
    { id: "brushUpgrade", name: "Brush Upgrade", price: 100, purchased: false },
    { id: "fontPack", name: "Font Pack", price: 250, purchased: false },
    { id: "colorPalette", name: "Color Palette", price: 400, purchased: false },
  ],
  achievements: [
    { id: "firstClient", name: "First Client", achieved: false },
    { id: "fiveProjects", name: "Five Projects Completed", achieved: false },
    { id: "storeMaster", name: "All Store Items Bought", achieved: false },
  ],
  reviews: [],
  settings: {
    soundOn: true,
    themeColor: "#3a6efc",
  },
};

// === Generate Sample Reviews ===
function generateReview(clientName, rating, comment) {
  return { clientName, rating, comment };
}

function loadReviews() {
  // Generate sample dynamic reviews based on game projects and clients
  gameState.reviews = [
    generateReview("Acme Corp", 5, "Fantastic logo design! Very professional."),
    generateReview("Blue Ocean Ltd", 4, "Great work, timely delivery."),
    generateReview("Red Lion", 3, "Good but expected more creativity."),
    generateReview("Green Fields", 5, "Exceeded expectations! Highly recommend."),
  ];
}

// === Tab Content Loader Updated ===
function loadTabContent(tab) {
  switch(tab) {
    case "inbox":
      tabContent.innerHTML = `<h2>Inbox</h2><div id="inbox-area">Client requests will appear here.</div>`;
      loadClientRequests();
      break;

    case "store":
      tabContent.innerHTML = `<h2>Store</h2><div id="store-area"></div>`;
      loadStore();
      break;

    case "projects":
      tabContent.innerHTML = `<h2>Projects</h2><div id="projects-area"></div>`;
      loadProjects();
      break;

    case "reviews":
      tabContent.innerHTML = `<h2>Reviews</h2><div id="reviews-area"></div>`;
      loadReviewsTab();
      break;

    case "settings":
      tabContent.innerHTML = `
        <h2>Settings</h2>
        <div id="settings-area">
          <label>
            <input type="checkbox" id="toggle-sound" ${gameState.settings.soundOn ? "checked" : ""} />
            Enable Sound Effects
          </label>
          <br/><br/>
          <label for="theme-color-picker">Theme Color:</label>
          <input type="color" id="theme-color-picker" value="${gameState.settings.themeColor}" />
        </div>
      `;
      setupSettingsHandlers();
      break;

    default:
      tabContent.innerHTML = "<p>Unknown tab.</p>";
  }
}

// === Inbox Client Requests (simplified example) ===
function loadClientRequests() {
  const inboxArea = document.getElementById("inbox-area");
  // Simulate client requests dynamically
  inboxArea.innerHTML = "";
  const clients = [
    { id: 1, name: "Acme Corp", description: "Needs a logo with a lion", budget: 500 },
    { id: 2, name: "Blue Ocean Ltd", description: "Wants a fresh ocean wave logo", budget: 350 },
  ];
  clients.forEach(client => {
    const clientDiv = document.createElement("div");
    clientDiv.classList.add("client-request");
    clientDiv.innerHTML = `
      <strong>${client.name}</strong><br/>
      ${client.description}<br/>
      Budget: $${client.budget}
      <button onclick="acceptClient(${client.id})">Accept</button>
    `;
    inboxArea.appendChild(clientDiv);
  });
}

// Example accept client logic
function acceptClient(clientId) {
  alert(`Client ${clientId} accepted! Project started.`);
  // Implement project addition logic here
}

// === Store Loader ===
function loadStore() {
  const storeArea = document.getElementById("store-area");
  storeArea.innerHTML = "";
  gameState.storeItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.style.marginBottom = "1em";
    itemDiv.innerHTML = `
      <strong>${item.name}</strong> - $${item.price}
      <button ${item.purchased ? "disabled" : ""} onclick="buyStoreItem('${item.id}')">
        ${item.purchased ? "Purchased" : "Buy"}
      </button>
    `;
    storeArea.appendChild(itemDiv);
  });
}

function buyStoreItem(itemId) {
  const item = gameState.storeItems.find(i => i.id === itemId);
  if (!item) return;
  if (item.purchased) {
    alert("You already own this item.");
    return;
  }
  // Here you would check if user has enough money - simplified:
  item.purchased = true;
  alert(`Purchased: ${item.name}`);
  loadStore();
  checkAchievements();
}

// === Projects Loader ===
function loadProjects() {
  const projectsArea = document.getElementById("projects-area");
  if (gameState.projects.length === 0) {
    projectsArea.innerHTML = "<p>No active projects.</p>";
    return;
  }
  projectsArea.innerHTML = "";
  gameState.projects.forEach(project => {
    const projDiv = document.createElement("div");
    projDiv.innerHTML = `
      <strong>${project.clientName}</strong> - ${project.status}<br/>
      Progress: ${project.progress}%
    `;
    projectsArea.appendChild(projDiv);
  });
}

// === Reviews Tab Loader ===
function loadReviewsTab() {
  const reviewsArea = document.getElementById("reviews-area");
  if (gameState.reviews.length === 0) {
    reviewsArea.innerHTML = "<p>No reviews available yet.</p>";
    return;
  }
  reviewsArea.innerHTML = "";
  gameState.reviews.forEach(review => {
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    const reviewDiv = document.createElement("div");
    reviewDiv.style.marginBottom = "1em";
    reviewDiv.innerHTML = `
      <strong>${review.clientName}</strong> &mdash; <span style="color:#ffd700">${stars}</span><br/>
      "${review.comment}"
    `;
    reviewsArea.appendChild(reviewDiv);
  });
}

// === Settings Handlers ===
function setupSettingsHandlers() {
  const soundCheckbox = document.getElementById("toggle-sound");
  const themeColorPicker = document.getElementById("theme-color-picker");

  soundCheckbox.addEventListener("change", () => {
    gameState.settings.soundOn = soundCheckbox.checked;
    alert(`Sound Effects ${gameState.settings.soundOn ? "enabled" : "disabled"}`);
  });

  themeColorPicker.addEventListener("input", () => {
    gameState.settings.themeColor = themeColorPicker.value;
    // Update CSS variable or elements color theme dynamically
    document.documentElement.style.setProperty("--theme-color", gameState.settings.themeColor);
    alert(`Theme color updated to ${gameState.settings.themeColor}`);
  });
}

// === Achievements Check ===
function checkAchievements() {
  // First Client Achievement
  if (!gameState.achievements[0].achieved && gameState.projects.length > 0) {
    gameState.achievements[0].achieved = true;
    alert("Achievement unlocked: First Client!");
  }
  // Five Projects Completed Achievement
  if (!gameState.achievements[1].achieved && gameState.projects.filter(p => p.status === "completed").length >= 5) {
    gameState.achievements[1].achieved = true;
    alert("Achievement unlocked: Five Projects Completed!");
  }
  // All Store Items Bought Achievement
  if (!gameState.achievements[2].achieved && gameState.storeItems.every(i => i.purchased)) {
    gameState.achievements[2].achieved = true;
    alert("Achievement unlocked: Store Master!");
  }
}

// Initialize reviews for first load
generateReview(); // Pre-generate reviews data (or call separately)
loadReviews();

