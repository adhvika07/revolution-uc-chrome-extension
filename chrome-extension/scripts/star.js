document.addEventListener("DOMContentLoaded", function () {
    const starIcon = document.getElementById("star-icon");
    const starMessage = document.getElementById("star-message");

    let starData = {
        usageCount: 0, // Tracks how many times the user opens the extension
        firstUseTime: Date.now() // Timestamp for first use
    };

    // 🚀 Load Star Progress from Storage
    chrome.storage.local.get(["starData"], function (result) {
        if (result.starData) {
            starData = result.starData;
        }
        updateStarUI();
    });

    // 🌟 Update Star Progress
    function updateStarUI() {
        let daysSinceFirstUse = (Date.now() - starData.firstUseTime) / (1000 * 60 * 60 * 24);
        let brightnessFactor = Math.min(starData.usageCount / 10 + daysSinceFirstUse / 30, 1);

        // Set star opacity based on usage and time
        starIcon.style.opacity = brightnessFactor;
        starMessage.textContent = `Your star is shining with ${starData.usageCount} uses! 🌟`;
    }

    // 🔄 Increment Usage Count
    starData.usageCount++;
    chrome.storage.local.set({ starData: starData });

    updateStarUI();
});
