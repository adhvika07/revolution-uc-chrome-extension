console.log("✅ Content script loaded!");

// 🚀 Create Floating Quick-Access Button
function createFloatingButton() {
    let button = document.createElement("button");
    button.innerText = "🌿 Open Wellness Companion";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.backgroundColor = "#3498db";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.fontSize = "14px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
    button.style.zIndex = "1000";
    button.style.transition = "all 0.2s ease";

    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#2980b9";
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#3498db";
    });

    button.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "open_popup" });
    });

    document.body.appendChild(button);
}

// 🚀 Handle Messages from Other Scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "show_notification") {
        alert("🔔 Reminder: " + request.message);
        sendResponse({ status: "Alert Shown" });
    }
});

// 🚀 Initialize Floating Button on Page Load
window.addEventListener("load", createFloatingButton);
