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
      tabContent.innerHTML = `
        <h2>Admin Panel</h2>
        <p>Access admin tools and debug panels.</p>
        <button id="update-servers-btn">Update Servers</button>
        <button id="reset-leaderboard-btn">Reset Leaderboard</button>
        <button id="send-global-msg-btn">Send Global Message</button>
        <div id="admin-status" style="margin-top: 1em; color: #0cf;"></div>
      `;
      // After injecting the buttons, add event listeners:
      setupAdminButtons();
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

// === Socket.io Client Connection ===
// Connect to backend socket server (adjust URL if needed)
const socket = io('http://localhost:3000'); 

// Listen for global message event broadcast from server
socket.on('globalMessage', message => {
  alert(`Global message: ${message}`); // or show nicely in UI
});

// Listen for leaderboard reset or server update events as needed
socket.on('leaderboardReset', () => {
  alert('Leaderboard has been reset by Admin.');
});

socket.on('serverUpdate', () => {
  alert('Server has been updated.');
});

// Emit admin commands to server
function sendAdminCommand(command, payload = {}) {
  socket.emit('adminCommand', { command, ...payload });
}

// Setup Admin Panel buttons and event listeners
function setupAdminButtons() {
  const statusDiv = document.getElementById("admin-status");

  const updateBtn = document.getElementById("update-servers-btn");
  const resetBtn = document.getElementById("reset-leaderboard-btn");
  const globalMsgBtn = document.getElementById("send-global-msg-btn");

  if (updateBtn) {
    updateBtn.onclick = () => {
      sendAdminCommand("updateServers");
      statusDiv.textContent = "Update Servers command sent.";
      clearStatusAfterDelay();
    };
  }
  if (resetBtn) {
    resetBtn.onclick = () => {
      sendAdminCommand("resetLeaderboard");
      statusDiv.textContent = "Reset Leaderboard command sent.";
      clearStatusAfterDelay();
    };
  }
  if (globalMsgBtn) {
    globalMsgBtn.onclick = () => {
      const msg = prompt("Enter the global message:");
      if (msg && msg.trim().length > 0) {
        sendAdminCommand("globalMessage", { message: msg.trim() });
        statusDiv.textContent = "Global message sent.";
        clearStatusAfterDelay();
      }
    };
  }

  function clearStatusAfterDelay() {
    setTimeout(() => {
      statusDiv.textContent = "";
    }, 3000);
  }
}
