document.addEventListener("DOMContentLoaded", function () {
    const star = document.getElementById('star');
    const usageInfo = document.getElementById('usage-info');
  
    // Get usage count and first use time from storage
    chrome.storage.local.get(['usageCount', 'firstUseTime'], function(result) {
      let usageCount = result.usageCount || 0;
      let firstUseTime = result.firstUseTime || Date.now();
  
      // Update the star opacity based on usage count and the time since the first use
      updateStarShine(usageCount, firstUseTime);
  
      // Inform the user how much their star has shined
      usageInfo.innerText = `Your star is shining with ${usageCount} uses!`;
  
      // Increment the usage count on each visit (not to immediately increase glow)
      chrome.storage.local.set({ usageCount: usageCount + 1 });
    });
  
    function updateStarShine(count, firstUseTime) {
      const daysSinceFirstUse = (Date.now() - firstUseTime) / (1000 * 60 * 60 * 24);  // Calculate days since first use
  
      // Gradually increase glow level: Full glow takes a month (30 days)
      const maxGlowDays = 30; // 1 month
      const timeFactor = Math.min(daysSinceFirstUse / maxGlowDays, 1); // Normalized to 1 after a month
  
      // The glow factor will be influenced by both usage and time
      const shineLevel = Math.min(count / 10 + timeFactor, 1);  // Shine level caps at 1 (full glow)
      
      // Apply the calculated opacity to the star
      star.style.opacity = shineLevel;
    }
  });
  