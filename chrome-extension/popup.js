// popup.js
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabSections = document.querySelectorAll(".tab-section");
  
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove 'active' from all buttons
        tabButtons.forEach((b) => b.classList.remove("active"));
        // Hide all tab sections
        tabSections.forEach((sec) => sec.classList.remove("active"));
  
        // Activate the clicked button
        btn.classList.add("active");
        // Show the corresponding tab section
        const targetTab = btn.getAttribute("data-tab");
        document.getElementById(targetTab).classList.add("active");
      });
    });
  });
  