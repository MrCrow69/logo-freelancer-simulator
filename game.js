// === Client Generator ===
const clientNames = ["Sierra", "Kai", "Juno", "Tobias", "Nova", "Luka", "Rhea", "Ezra"];
const companies = ["Moonbyte", "Skyfield Co.", "Quantum Fox", "DeepSync", "Hexline"];
const projectTypes = ["a minimalist logo", "a futuristic emblem", "a retro-style brand mark", "a tech startup icon"];

let clientId = 0;

function generateClient() {
  const name = clientNames[Math.floor(Math.random() * clientNames.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const description = projectTypes[Math.floor(Math.random() * projectTypes.length)];
  const budget = Math.floor(Math.random() * 500) + 100;

  return {
    id: ++clientId,
    name,
    company,
    description,
    budget
  };
}

// === Notification System ===
function showNotification(client) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.innerHTML = `
    <div class="notif-header">
      <span>${client.name} — <strong>${client.company}</strong></span>
      <button class="close-btn">✕</button>
    </div>
    <div class="notif-body">${client.description}<br><strong>$${client.budget}</strong></div>
    <div class="notif-actions">
      <button class="deny-btn">Deny</button>
    </div>
  `;

  // Tilt effect
  notif.addEventListener("mousemove", (e) => {
    const rect = notif.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / 10;
    const offsetY = (e.clientY - centerY) / 10;
    notif.style.transform = `rotateX(${ -offsetY }deg) rotateY(${ offsetX }deg)`;
  });

  notif.addEventListener("mouseleave", () => {
    notif.style.transform = `rotate(0)`;
  });

  // Close behavior
  notif.querySelector(".close-btn").onclick = () => notif.remove();
  notif.querySelector(".deny-btn").onclick = () => notif.remove();

  // Click = go to Inbox and highlight
  notif.addEventListener("click", (e) => {
    if (!e.target.classList.contains("close-btn") && !e.target.classList.contains("deny-btn")) {
      document.querySelector('[data-tab="inbox"]').click();
      setTimeout(() => {
        const inbox = document.getElementById("inbox-area");
        const item = document.createElement("div");
        item.className = "client-box highlight";
        item.innerHTML = `<strong>${client.name}</strong> (${client.company}) — ${client.description} — $${client.budget}`;
        inbox.appendChild(item);
        setTimeout(() => item.classList.remove("highlight"), 1200);
      }, 300);
      notif.remove();
    }
  });

  // Add to DOM
  document.body.appendChild(notif);
  requestAnimationFrame(() => notif.classList.add("show"));

  // Play sound
  const audio = new Audio("https://freesound.org/data/previews/341/341695_6261194-lq.mp3");
  audio.volume = 0.2;
  audio.play();
}

// === Client Request Interval ===
setInterval(() => {
  const client = generateClient();
  showNotification(client);
}, 1000); // every 10 seconds

