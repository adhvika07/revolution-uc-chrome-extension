document.addEventListener("DOMContentLoaded", function () {
    const plantImage = document.getElementById("plant-image");
    const hydrationStatus = document.getElementById("hydration-status");
    const waterButton = document.getElementById("water-btn");

    let plantData = { hydration: 50, growth: 0 };

    // Load Plant Data from Chrome Storage
    chrome.storage.local.get(["plantData"], function (result) {
        if (result.plantData) {
            plantData = result.plantData;
        }
        updatePlantUI();
    });

    // Water the Plant
    waterButton.addEventListener("click", function () {
        if (plantData.hydration < 100) {
            plantData.hydration += 10;
            plantData.growth += 5;
        }

        if (plantData.hydration >= 100) {
            plantData.hydration = 0; // Reset hydration after reaching max
            plantData.growth += 10; // Increase growth
        }

        if (plantData.growth >= 100) {
            plantData.growth = 100;
        }

        updatePlantUI();
        savePlantData();
    });

    // Update Plant UI
    function updatePlantUI() {
        hydrationStatus.innerText = `Hydration: ${plantData.hydration}%`;

        if (plantData.growth >= 100) {
            plantImage.src = "images/plant3.png";
        } else if (plantData.growth >= 50) {
            plantImage.src = "images/plant2.png";
        } else {
            plantImage.src = "images/plant1.png";
        }
    }

    // Save Data to Chrome Storage
    function savePlantData() {
        chrome.storage.local.set({ plantData: plantData });
    }
});
