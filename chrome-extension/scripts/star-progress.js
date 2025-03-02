// scripts/star-progress.js
document.addEventListener("DOMContentLoaded", () => {
    const starIcon = document.getElementById("star-icon");
    const starMessage = document.getElementById("star-message");
  
    let starData = {
      usageCount: 0,
      firstUseTime: Date.now()
    };
  
    chrome.storage.local.get(["starData"], (result) => {
      if (result.starData) {
        starData = result.starData;
      }
  
      // Increment usage each time popup loads
      starData.usageCount++;
  
      // Save new usageCount
      chrome.storage.local.set({ starData }, () => {
        updateStarUI(starData);
      });
    });
  
    function updateStarUI(data) {
      const daysSinceFirstUse = (Date.now() - data.firstUseTime) / (1000 * 60 * 60 * 24);
      // We’ll say max brightness = 1 after 10 uses or 30 days
      const usageFactor = Math.min(data.usageCount / 10, 1);
      const timeFactor = Math.min(daysSinceFirstUse / 30, 1);
      const brightnessFactor = Math.min(usageFactor + timeFactor, 1);
  
      starIcon.style.opacity = brightnessFactor.toString();
      starMessage.textContent = `Your star is shining with ${data.usageCount} uses! 🌟`;
    }
  });
  