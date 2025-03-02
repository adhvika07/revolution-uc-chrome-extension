// scripts/finance.js
document.addEventListener("DOMContentLoaded", () => {
    const budgetDisplay = document.getElementById("budget");
    const expensesDisplay = document.getElementById("expenses");
    const addIncomeButton = document.getElementById("add-income");
    const addExpenseButton = document.getElementById("add-expense");
  
    let financeData = {
      income: 0,
      expenses: 0
    };
  
    chrome.storage.local.get(["financeData"], (result) => {
      if (result.financeData) {
        financeData = result.financeData;
      }
      updateUI();
    });
  
    addIncomeButton.addEventListener("click", () => {
      const amountStr = prompt("Enter income amount:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
        financeData.income += amount;
        saveFinanceData();
      }
    });
  
    addExpenseButton.addEventListener("click", () => {
      const amountStr = prompt("Enter expense amount:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
        financeData.expenses += amount;
        saveFinanceData();
      }
    });
  
    function saveFinanceData() {
      chrome.storage.local.set({ financeData }, updateUI);
    }
  
    function updateUI() {
      budgetDisplay.textContent = `Income: $${financeData.income.toFixed(2)}`;
      expensesDisplay.textContent = `Expenses: $${financeData.expenses.toFixed(2)}`;
    }
  });
  