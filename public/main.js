// === Tab Switching ===
const tabs = document.querySelectorAll(".tab-btn");
const tabContent = document.getElementById("content");

let activeTab = "inbox";

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (tab.getAttribute("data-tab") === activeTab) return;

    tabs.forEach(t => {
      t.classList.remove("active");
      t.removeAttribute("aria-current");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-current", "page");

    activeTab = tab.getAttribute("data-tab");
    loadTabContent(activeTab);
  });
});

function loadTabContent(tab) {
  switch(tab) {
    case "inbox":
      tabContent.innerHTML = "<h2>Inbox</h2><div id='inbox-area'>Client requests will appear here.</div>";
      break;
    case "store":
      tabContent.innerHTML = "<h2>Store</h2><p>Store your design assets and upgrades here.</p>";
      break;
    case "projects":
      tabContent.innerHTML = "<h2>Projects</h2><p>Manage your current design jobs here.</p>";
      break;
    case "reviews":
      tabContent.innerHTML = "<h2>Reviews</h2><p>Client reviews and ratings go here.</p>";
      break;
    case "settings":
      tabContent.innerHTML = "<h2>Settings</h2><p>Adjust preferences and profile info.</p>";
      break;
    default:
      tabContent.innerHTML = "<p>Unknown tab.</p>";
  }
}

// Load default tab on start
loadTabContent(activeTab);

// === Admin Modal Logic ===
const adminLoginModal = document.getElementById("admin-login");
const adminPanelModal = document.getElementById("admin-panel");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginForm = document.getElementById("admin-login-form");
const adminLoginCancel = document.getElementById("admin-login-cancel");

const checkboxWrapper = document.getElementById("show-password-checkbox-wrapper");
const checkboxInput = document.getElementById("show-password-checkbox");

const btnUpdateServers = document.getElementById("btn-update-servers");
const btnGlobalMessage = document.getElementById("btn-global-message");
const btnResetLeaderboard = document.getElementById("btn-reset-leaderboard");
const btnCloseAdmin = document.getElementById("btn-close-admin");
const globalMsgInputContainer = document.getElementById("global-msg-input-container");
const globalMsgInput = document.getElementById("global-msg-input");
const btnSendGlobalMsg = document.getElementById("btn-send-global-msg");

const wrongPasswordBox = document.getElementById("wrong-password-box");

const ADMIN_PASSWORD = "1234";
let adminLoggedIn = false;
function showAdminLogin() {
  adminLoginModal.classList.add("active");
  setBodyBlur(true);
  adminPasswordInput.focus();
}

function openAdminPanel() {
  if (!adminLoggedIn) {
    showAdminLogin();
    return;
  }
  adminPanelModal.classList.add("active");
  setBodyBlur(true);
  globalMsgInputContainer.style.display = "none";
  globalMsgInput.value = "";
  globalMsgInput.setAttribute("aria-hidden", "true");
}


// Blur control applies a class on body to blur only page content
function setBodyBlur(active) {
  if (active) {
    document.body.classList.add("blur-active");
  } else {
    document.body.classList.remove("blur-active");
  }
}

// Show admin login modal
function showAdminLogin() {
  adminLoginModal.classList.add("active");
  setBodyBlur(true);
  adminPasswordInput.focus();
}

// Hide admin login modal
function hideAdminLogin() {
  adminLoginModal.classList.remove("active");
  setBodyBlur(false);
  adminPasswordInput.value = "";
  checkboxInput.checked = false;
  adminPasswordInput.type = "password";
  updateCheckboxAria();
}

// Show admin panel modal
function openAdminPanel() {
  if (!adminLoggedIn) {
    showAdminLogin();
    return;
  }
  adminPanelModal.classList.add("active");
  setBodyBlur(true);
  globalMsgInputContainer.style.display = "none";
  globalMsgInput.value = "";
  globalMsgInput.setAttribute("aria-hidden", "true");
}

// Close admin panel modal
function closeAdminPanel() {
  adminPanelModal.classList.remove("active");
  setBodyBlur(false);
}

// Animate wrong password input: shake + fade red then back to normal
function animateWrongPassword(input) {
  input.classList.add("wrong-password");
  wrongPasswordBox.classList.add("active");

  setTimeout(() => {
    input.classList.remove("wrong-password");
  }, 1000);

  setTimeout(() => {
    wrongPasswordBox.classList.remove("active");
  }, 2200);
}

// Checkbox ARIA update helper
function updateCheckboxAria() {
  checkboxWrapper.setAttribute("aria-checked", checkboxInput.checked.toString());
}

// Checkbox toggle handlers with keyboard support
checkboxWrapper.addEventListener("click", () => {
  checkboxInput.checked = !checkboxInput.checked;
  adminPasswordInput.type = checkboxInput.checked ? "text" : "password";
  updateCheckboxAria();
  adminPasswordInput.focus();
});

checkboxWrapper.addEventListener("keydown", e => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    checkboxInput.checked = !checkboxInput.checked;
    adminPasswordInput.type = checkboxInput.checked ? "text" : "password";
    updateCheckboxAria();
    adminPasswordInput.focus();
  }
});

// Sync ARIA initially
updateCheckboxAria();

adminLoginCancel.addEventListener("click", hideAdminLogin);

adminLoginForm.addEventListener("submit", e => {
  e.preventDefault();
  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    adminLoggedIn = true;
    hideAdminLogin();
    openAdminPanel();
    alert("Admin login successful.");
  } else {
    animateWrongPassword(adminPasswordInput);
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }
});

btnCloseAdmin.addEventListener("click", () => {
  adminLoggedIn = false;
  closeAdminPanel();
  alert("Logged out successfully.");
});

btnUpdateServers.addEventListener("click", () => {
  sendAdminCommand("updateServers");
  alert("Update Servers command sent.");
});

btnResetLeaderboard.addEventListener("click", () => {
  sendAdminCommand("resetLeaderboard");
  alert("Reset Leaderboard command sent.");
});

btnGlobalMessage.addEventListener("click", () => {
  globalMsgInputContainer.style.display = "flex";
  globalMsgInput.setAttribute("aria-hidden", "false");
  globalMsgInput.focus();
});

btnSendGlobalMsg.addEventListener("click", () => {
  const msg = globalMsgInput.value.trim();
  if (msg.length === 0) {
    alert("Please enter a message before sending.");
    globalMsgInput.focus();
    return;
  }
  sendAdminCommand("globalMessage", { message: msg });
  alert(`Global message sent: "${msg}"`);
  globalMsgInput.value = "";
  globalMsgInputContainer.style.display = "none";
  globalMsgInput.setAttribute("aria-hidden", "true");
});

// Keyboard shortcut Ctrl+Shift+A to open admin modal or panel
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    if (adminLoggedIn) openAdminPanel();
    else showAdminLogin();
  }
});

// --- Socket.IO Client Setup ---
const socket = io("https://54e8d8d0-27d5-47ba-a3b6-27b89ee9c980-00-1c8ney7773dr3.kirk.replit.dev", {
  transports: ["websocket"],
});

socket.on("globalMessage", message => {
  alert(`Global message: ${message}`);
});

socket.on("leaderboardReset", () => {
  alert("Leaderboard has been reset by Admin.");
  // Add leaderboard reset logic here
});

socket.on("updateServers", () => {
  alert("Server has been updated.");
  // Add server update logic here
});

// Send commands to server
function sendAdminCommand(command, payload = {}) {
  socket.emit(`admin:${command}`, payload);
}
