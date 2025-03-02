document.addEventListener("DOMContentLoaded", function () {
    const budgetDisplay = document.getElementById("budget");
    const expensesDisplay = document.getElementById("expenses");
    const addIncomeButton = document.getElementById("add-income");
    const addExpenseButton = document.getElementById("add-expense");

    let financeData = {
        income: 0,
        expenses: 0
    };

    // Load stored finance data
    chrome.storage.local.get(["financeData"], function (result) {
        if (result.financeData) {
            financeData = result.financeData;
        }
        updateFinanceUI();
    });

    // Add income
    addIncomeButton.addEventListener("click", function () {
        let amount = parseFloat(prompt("Enter income amount:", "0"));
        if (!isNaN(amount) && amount > 0) {
            financeData.income += amount;
            updateFinanceUI();
            saveFinanceData();
        }
    });

    // Add expense
    addExpenseButton.addEventListener("click", function () {
        let amount = parseFloat(prompt("Enter expense amount:", "0"));
        if (!isNaN(amount) && amount > 0) {
            financeData.expenses += amount;
            updateFinanceUI();
            saveFinanceData();
        }
    });

    // Update UI
    function updateFinanceUI() {
        budgetDisplay.innerText = `Income: $${financeData.income}`;
        expensesDisplay.innerText = `Expenses: $${financeData.expenses}`;
    }

    // Save finance data
    function saveFinanceData() {
        chrome.storage.local.set({ financeData: financeData });
    }
});
