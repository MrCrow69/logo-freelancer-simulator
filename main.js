document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");

  // Store clients in memory
  let clients = [];
  let activeTab = "inbox";

  // Generate dummy AI clients for demonstration
  function generateClient() {
    const names = ["Alice Carter", "Bob Smith", "Clara Johnson", "David Lee"];
    const companies = ["Nimbus Corp", "Solaris Tech", "Arcadia Ltd", "Vertex Innovations"];
    const descriptions = [
      "Needs a clean, modern logo for their new startup.",
      "Looking for a retro style emblem with a tech vibe.",
      "Requires a minimalist design for mobile app branding.",
      "Wants a bold and colorful icon for social media presence."
    ];

    const idx = Math.floor(Math.random() * names.length);
    return {
      id: Date.now(),
      name: names[idx],
      company: companies[idx],
      description: descriptions[idx],
      budget: Math.floor(Math.random() * 1000) + 200
    };
  }

  // Add a new client to inbox every 10 seconds (example)
  setInterval(() => {
    const client = generateClient();
    clients.push(client);
    if (activeTab === "inbox") {
      renderInbox();
    }
  }, 10000);

  // Render inbox content
  function renderInbox() {
    if (clients.length === 0) {
      content.innerHTML = "<p>No new clients.</p>";
      return;
    }

    let html = "<h2>Client Inbox</h2><ul>";
    clients.forEach(c => {
      html += `<li><strong>${c.name}</strong> (${c.company}): ${c.description} - Budget: $${c.budget}</li>`;
    });
    html += "</ul>";
    content.innerHTML = html;
  }

  // Render projects tab content (for accepted clients)
  function renderProjects() {
    // For now, show placeholder
    content.innerHTML = "<h2>Projects</h2><p>No active projects yet.</p>";
  }

  // Tab switching with fade
  function switchTab(tab) {
    if (tab === activeTab) return;
    document.querySelector(`.tab-btn[data-tab="${activeTab}"]`)?.classList.remove("active");
    document.querySelector(`.tab-btn[data-tab="${tab}"]`)?.classList.add("active");
    content.style.opacity = 0;
    setTimeout(() => {
      if (tab === "inbox") renderInbox();
      else if (tab === "projects") renderProjects();
      else content.innerHTML = `<p>Loading ${tab}...</p>`;
      content.style.opacity = 1;
    }, 300);
    activeTab = tab;
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Initialize default tab
  switchTab(activeTab);
});
