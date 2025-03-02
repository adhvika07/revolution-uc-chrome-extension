// content.js
console.log("✅ Content script loaded!");

// Create a floating action button
function createFloatingButton() {
  const button = document.createElement("button");
  button.innerText = "Open Wellness";
  button.style.position = "fixed";
  button.style.bottom = "30px";
  button.style.right = "30px";
  button.style.padding = "14px 18px";
  button.style.background = "#3b7cff";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "50px";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
  button.style.zIndex = "9999";
  button.style.transition = "background 0.2s ease";

  button.addEventListener("mouseover", () => {
    button.style.background = "#2f62cc";
  });
  button.addEventListener("mouseout", () => {
    button.style.background = "#3b7cff";
  });
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "open_popup" });
  });

  document.body.appendChild(button);
}

window.addEventListener("load", createFloatingButton);
