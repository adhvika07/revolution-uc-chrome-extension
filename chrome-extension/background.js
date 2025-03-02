// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Modern Wellness Companion Installed!");
  });
  
  // Listen to messages from content script or popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "notify") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "images/plant1.png",
        title: "Reminder",
        message: request.message
      });
      sendResponse({ status: "Notification Sent" });
    }
    else if (request.action === "open_popup") {
      // Chrome MV3 has a built-in method to open the extension popup:
      chrome.action.openPopup();
      sendResponse({ status: "Opening popup..." });
    }
  });
  