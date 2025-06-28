const calendarPanel = document.getElementById("calendar-panel");
const calendarToggle = document.getElementById("toggle-calendar"); // Your date icon button

calendarToggle.addEventListener("click", () => {
  const isVisible = calendarPanel.classList.contains("translate-y-0");

  if (isVisible) {
    calendarPanel.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    calendarPanel.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
  } else {
    calendarPanel.classList.remove("translate-y-full", "opacity-0", "pointer-events-none");
    calendarPanel.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
    renderCalendar(); // Ensure it's updated every time it opens
  }
});

// Close calendar when clicking outside
window.addEventListener("click", (e) => {
  if (
    !calendarPanel.contains(e.target) &&
    !calendarToggle.contains(e.target)
  ) {
    calendarPanel.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    calendarPanel.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
  }
});

const monthEl = document.getElementById("calendar-month");
const daysEl = document.getElementById("calendar-days");
const todayLabel = document.getElementById("today-date");

let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  monthEl.textContent = `${monthName} ${year}`;
  daysEl.innerHTML = "";

  // Blank days before the 1st
  for (let i = 0; i < startDay; i++) {
    const blank = document.createElement("div");
    daysEl.appendChild(blank);
  }

  // Days of month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const day = document.createElement("div");
    day.textContent = d;
    day.className =
      "py-1 rounded-full hover:bg-white/20 transition-all cursor-pointer";

    // Highlight today
    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("bg-white/20", "font-bold");
    }

    daysEl.appendChild(day);
  }

  // Footer label
  todayLabel.textContent = today.toDateString();
}

// Month navigation
document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Optional: initialize on load
renderCalendar();
