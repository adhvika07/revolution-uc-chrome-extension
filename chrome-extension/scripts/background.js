chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Wellness Companion Installed!");
});

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
});
