const panel = document.getElementById("quick-panel");
const toggle = document.getElementById("toggle-panel");
  toggle.addEventListener("click", () => {
    const isVisible = panel.classList.contains("translate-y-0");

  if (isVisible) {
    panel.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    panel.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
  } else {
    panel.classList.remove("translate-y-full", "opacity-0", "pointer-events-none");
    panel.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
  }
});

  window.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
      panel.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
    }
  });