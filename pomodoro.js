document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const drinkWaterBtn = document.getElementById("drink-water");
    const pomodoroBtn = document.getElementById("start-pomodoro");
    const stopPomodoroBtn = document.getElementById("stop-pomodoro");
    const timerDisplay = document.getElementById("timer-display");
  
    // Timer variables
    let pomodoroInterval = null;
    let pomodoroTime = 25 * 60; // 25 minutes in seconds
  
    // Format time as MM:SS
    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }
  
    // Update the timer display
    function updateTimerDisplay() {
      const minutes = Math.floor(pomodoroTime / 60);
      const seconds = pomodoroTime % 60;
      timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }
  
    // Update the timer and check if time's up
    function updatePomodoroTimer() {
      if (pomodoroTime <= 0) {
        stopPomodoro();
        // Notify the user that the session is over
        chrome.runtime.sendMessage({
          action: "notify",
          message: "Pomodoro is done! Take a break! ⏱️"
        });
      } else {
        pomodoroTime--;
        updateTimerDisplay();
      }
    }
  
    // Start the Pomodoro timer
    function startPomodoro() {
      if (!pomodoroInterval) {
        pomodoroInterval = setInterval(updatePomodoroTimer, 1000);
      }
    }
  
    // Stop the Pomodoro timer
    function stopPomodoro() {
      if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
      }
    }
  
    // Attach event listeners
    pomodoroBtn.addEventListener("click", startPomodoro);
    stopPomodoroBtn.addEventListener("click", stopPomodoro);
  
    // Additional functionality (if needed)
    drinkWaterBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "notify", message: "Time to drink water! 💧" });
    });
  
  
    // Initialize the display
    updateTimerDisplay();
  });
  