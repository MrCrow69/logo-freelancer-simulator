document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");

  let activeTab = "inbox";

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
});
