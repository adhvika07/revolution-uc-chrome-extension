// scripts/hydration-pomodoro.js
document.addEventListener("DOMContentLoaded", () => {
    const plantImage = document.getElementById("plant-image");
    const hydrationStatus = document.getElementById("hydration-status");
    const waterButton = document.getElementById("water-btn");
  
    let plantData = { hydration: 50, growth: 0 };
  
    // Load Plant Data
    chrome.storage.local.get(["plantData"], (result) => {
      if (result.plantData) {
        plantData = result.plantData;
      }
      updatePlantUI();
    });
  
    // Water the Plant
    waterButton.addEventListener("click", () => {
      if (plantData.hydration < 100) {
        plantData.hydration += 10;
        plantData.growth += 5;
      }
      if (plantData.hydration >= 100) {
        plantData.hydration = 0;
        plantData.growth += 10;
      }
      if (plantData.growth >= 100) {
        plantData.growth = 100;
      }
      updatePlantUI();
      chrome.storage.local.set({ plantData });
    });
  
    function updatePlantUI() {
      hydrationStatus.textContent = `Hydration: ${plantData.hydration}%`;
  
      if (plantData.growth >= 100) {
        plantImage.src = "images/plant3.png";
      } else if (plantData.growth >= 50) {
        plantImage.src = "images/plant2.png";
      } else {
        plantImage.src = "images/plant1.png";
      }
    }
  
  
    // ---- Pomodoro Timer Logic ----
    const timerDisplay = document.getElementById("timer-display");
    const startButton = document.getElementById("start-pomodoro");
    const stopButton = document.getElementById("stop-pomodoro");
  
    let pomodoroTime = 25 * 60; // 25 min
    let pomodoroInterval = null;
  
    function updateTimerDisplay() {
      const minutes = Math.floor(pomodoroTime / 60);
      const seconds = pomodoroTime % 60;
      timerDisplay.textContent =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  
    function startPomodoro() {
      if (!pomodoroInterval) {
        pomodoroInterval = setInterval(() => {
          if (pomodoroTime > 0) {
            pomodoroTime--;
            updateTimerDisplay();
          } else {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            // Optionally, send a notification
            chrome.runtime.sendMessage({
              action: "notify",
              message: "Pomodoro finished! Time to take a break."
            });
          }
        }, 1000);
      }
    }
  
    function stopPomodoro() {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      // If you'd like to reset on stop:
      pomodoroTime = 25 * 60;
      updateTimerDisplay();
    }
  
    updateTimerDisplay();
  
    startButton.addEventListener("click", startPomodoro);
    stopButton.addEventListener("click", stopPomodoro);
  });
  