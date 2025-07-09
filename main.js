// === Tab Switching ===
const tabs = document.querySelectorAll(".tab");
const tabContent = document.getElementById("tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active class from all
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Load corresponding tab content
    const selectedTab = tab.getAttribute("data-tab");
    loadTabContent(selectedTab);
  });
});

function loadTabContent(tab) {
  switch (tab) {
    case "inbox":
      tabContent.innerHTML = "<h2>Inbox</h2><div id='inbox-area'>Client requests will appear here.</div>";
      break;
    case "projects":
      tabContent.innerHTML = "<h2>Projects</h2><p>Manage your current design jobs here.</p>";
      break;
    case "reviews":
      tabContent.innerHTML = "<h2>Reviews</h2><p>Client reviews and ratings go here.</p>";
      break;
    case "admin":
      tabContent.innerHTML = "<h2>Admin</h2><p>Access admin tools and debug panels.</p>";
      break;
    case "settings":
      tabContent.innerHTML = "<h2>Settings</h2><p>Adjust preferences and profile info.</p>";
      break;
    default:
      tabContent.innerHTML = "<p>Unknown tab.</p>";
  }
}

// Load default tab on start
loadTabContent("inbox");

// === Admin Popup Shortcut (Ctrl + Shift + A) ===
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    openAdminPopup();
  }
});

function openAdminPopup() {
  document.getElementById("admin-popup").classList.remove("hidden");
}

document.getElementById("close-admin").addEventListener("click", () => {
  document.getElementById("admin-popup").classList.add("hidden");
});

// === Mouse vs Keyboard Focus Ring Handling ===
document.body.classList.add("using-mouse");

window.addEventListener("mousedown", () => {
  document.body.classList.add("using-mouse");
});

window.addEventListener("keydown", () => {
  document.body.classList.remove("using-mouse");
});
