// scripts/finance.js
document.addEventListener("DOMContentLoaded", () => {
  const budgetDisplay = document.getElementById("budget"); 
  const expensesDisplay = document.getElementById("expenses");
  const goalDisplay = document.getElementById("goal");
  const setGoalButton = document.getElementById("set-goal"); 
  const addIncomeButton = document.getElementById("add-income");
  const addExpenseButton = document.getElementById("add-expense");
  const deleteIncomeButton = document.getElementById("delete-income");
  const deleteExpenseButton = document.getElementById("delete-expense");

  let financeData = {
      goal: 0,
      income: 0,
      expenses: 0
  };

  // Load finance data from storage
  chrome.storage.local.get(["financeData"], (result) => {
      if (result.financeData) {
          financeData = result.financeData;
      }
      updateUI();
  });

  // Set Goal Button Event (Can set goal without income)
  setGoalButton.addEventListener("click", () => {
      const amountStr = prompt("Enter your savings goal:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
          financeData.goal = amount;
          saveFinanceData();
      } else {
          alert("Invalid amount. Please enter a valid goal.");
      }
  });

  // Add Income Button
  addIncomeButton.addEventListener("click", () => {
      const amountStr = prompt("Enter income amount:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
          financeData.income += amount;
          saveFinanceData();
      }
  });

  // Add Expense Button
  addExpenseButton.addEventListener("click", () => {
      const amountStr = prompt("Enter expense amount:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
          financeData.expenses += amount;
          saveFinanceData();
      }
  });

  // Delete Income Button
  deleteIncomeButton.addEventListener("click", () => {
      const amountStr = prompt("Enter income amount to delete:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0 && financeData.income >= amount) {
          financeData.income -= amount;
          saveFinanceData();
      } else {
          alert("Invalid amount or insufficient income.");
      }
  });

  // Delete Expense Button
  deleteExpenseButton.addEventListener("click", () => {
      const amountStr = prompt("Enter expense amount to delete:", "0");
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0 && financeData.expenses >= amount) {
          financeData.expenses -= amount;
          saveFinanceData();
      } else {
          alert("Invalid amount or insufficient expenses.");
      }
  });

  // Save finance data to storage
  function saveFinanceData() {
      chrome.storage.local.set({ financeData }, updateUI);
  }

  // Update UI with latest finance data
  function updateUI() {
      budgetDisplay.textContent = `Income: $${financeData.income.toFixed(2)}`;
      expensesDisplay.textContent = `Expenses: $${financeData.expenses.toFixed(2)}`;
      goalDisplay.textContent = `Goal: $${financeData.goal > 0 ? financeData.goal.toFixed(2) : "Not Set"}`;
  }
});
