console.log("Content script loaded!");

// Example: Inject a floating button for quick actions
function createFloatingButton() {
    let button = document.createElement("button");
    button.innerText = "Open Tracker";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";

    button.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "open_popup" });
    });

    document.body.appendChild(button);
}

// Run the function after the page loads
window.addEventListener("load", createFloatingButton);

// Example: Listen for messages from background or popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "show_notification") {
        alert("Reminder: " + request.message);
    }
    sendResponse({ status: "Received" });
});
