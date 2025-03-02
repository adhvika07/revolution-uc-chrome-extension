document.addEventListener("DOMContentLoaded", () => {
    const drinkWaterBtn = document.getElementById("drink-water");
    const pomodoroBtn = document.getElementById("start-pomodoro");
    const gameBtn = document.getElementById("play-game");

    // Drink Water Notification
    drinkWaterBtn.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "notify", message: "Time to drink water! 💧" });
    });

    // Start Pomodoro Timer (25 mins)
    pomodoroBtn.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "start_pomodoro" });
    });

    // Launch Mini-Game (Opens a new tab)
    gameBtn.addEventListener("click", () => {
        chrome.tabs.create({ url: "https://www.nytimes.com/games/wordle/index.html" });
    });
});
