document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer-display");
    const startButton = document.getElementById("start-pomodoro");
    const stopButton = document.getElementById("stop-pomodoro");

    let pomodoroTime = 25 * 60; // 25 minutes
    let pomodoroInterval = null;

    // Update Timer Display
    function updateTimerDisplay() {
        const minutes = Math.floor(pomodoroTime / 60);
        const seconds = pomodoroTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Start Timer
    function startPomodoro() {
        if (!pomodoroInterval) {
            pomodoroInterval = setInterval(() => {
                if (pomodoroTime > 0) {
                    pomodoroTime--;
                    updateTimerDisplay();
                } else {
                    clearInterval(pomodoroInterval);
                }
            }, 1000);
        }
    }

    // Stop Timer
    function stopPomodoro() {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }

    startButton.addEventListener("click", startPomodoro);
    stopButton.addEventListener("click", stopPomodoro);
});
