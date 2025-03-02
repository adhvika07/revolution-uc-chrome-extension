document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startPomodoro");
  const timeDisplay = document.getElementById("timer");
  let timeLeft = 1500; // 25 minutes
  let timer;

  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up! Take a break.");
        updateVirtualCompanion();
      } else {
        timeLeft--;
        timeDisplay.innerText = `${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
      }
    }, 1000);
  }

  startButton.addEventListener("click", startTimer);
});
