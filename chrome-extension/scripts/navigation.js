document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    const navButtons = document.querySelectorAll(".nav-button");
    const backButtons = document.querySelectorAll(".back-button");
    const mainMenu = document.getElementById("main-menu");

    function showPage(pageId) {
        pages.forEach(page => page.style.display = "none");
        mainMenu.style.display = "none";
        document.getElementById(pageId).style.display = "block";
    }

    function showMainMenu() {
        pages.forEach(page => page.style.display = "none");
        mainMenu.style.display = "block";
    }

    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            showPage(this.dataset.page);
        });
    });

    backButtons.forEach(button => {
        button.addEventListener("click", showMainMenu);
    });

    showMainMenu(); // Default to main menu
});
