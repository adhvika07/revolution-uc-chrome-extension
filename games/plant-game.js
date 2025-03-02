document.addEventListener("DOMContentLoaded", function () {
    const hydrationDisplay = document.getElementById("hydration");
    const growthDisplay = document.getElementById("growth");
    const moodDisplay = document.getElementById("mood");
    const waterButton = document.getElementById("water-btn");
    const plantImage = document.getElementById("plant-image");

    let hydration = 50; // Start hydration at 50%
    let growth = 0; // Start growth at 0%
    let mood = "Happy";

    function updateDisplay() {
        hydrationDisplay.textContent = `Hydration: ${hydration}%`;
        growthDisplay.textContent = `Growth: ${growth}%`;
        moodDisplay.textContent = `Mood: ${mood}`;

        // 🌱 Change plant image based on growth percentage
        if (growth < 20) {
            plantImage.src = "images/plant1.png";  // Wilting
        } else if (growth < 50) {
            plantImage.src = "images/plant2.png";  // Small sprout
        } else if (growth < 80) {
            plantImage.src = "images/plant3.png";  // Healthy plant
        } else {
            plantImage.src = "images/plant4.png";  // Thriving tree
        }
    }

    waterButton.addEventListener("click", function () {
        if (hydration < 100) {
            hydration += 15; // Increase hydration when watered
        }

        if (hydration >= 80) {
            mood = "Thriving 🌿";
        } else if (hydration >= 50) {
            mood = "Happy 😊";
        } else {
            mood = "Sad 😢";
        }

        if (hydration >= 60 && growth < 100) {
            growth += 10; // Increase growth when hydrated
        }

        updateDisplay();
    });

    setInterval(() => {
        if (hydration > 0) {
            hydration -= 5; // Reduce hydration over time
        }

        if (hydration < 30) {
            mood = "Wilting 😟";
        }

        updateDisplay();
    }, 5000); // Decrease hydration every 5 seconds

    updateDisplay();
});
