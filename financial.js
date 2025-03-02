document.addEventListener("DOMContentLoaded", () => {
// Financial Management Features
  const budgetDisplay = document.getElementById("budget");
  const addExpenseBtn = document.getElementById("addExpense");
  const setGoalBtn = document.getElementById("setGoal");
  const savingsDisplay = document.getElementById("savings");
  const goalProgressDisplay = document.getElementById("goalProgress");
  
  let totalBudget = localStorage.getItem("totalBudget") || 0;
  let savings = localStorage.getItem("savings") || 0;
  let goal = localStorage.getItem("goal") || 1000; // Default goal of $1000

  budgetDisplay.innerText = `Budget: $${totalBudget}`;
  savingsDisplay.innerText = `Savings: $${savings}`;
  goalProgressDisplay.innerText = `Goal: $${goal} | Progress: ${(savings / goal * 100).toFixed(2)}%`;

  addExpenseBtn.addEventListener("click", () => {
    const expense = parseFloat(prompt("Enter expense amount:"));
    if (!isNaN(expense) && expense > 0) {
      totalBudget = parseFloat(totalBudget) - expense;
      localStorage.setItem("totalBudget", totalBudget);
      budgetDisplay.innerText = `Budget: $${totalBudget.toFixed(2)}`;
    } else {
      alert("Please enter a valid positive number");
    }
  });

  setGoalBtn.addEventListener("click", () => {
    const newGoal = parseFloat(prompt("Set your financial goal:"));
    if (!isNaN(newGoal) && newGoal > 0) {
      goal = newGoal;
      localStorage.setItem("goal", goal);
      goalProgressDisplay.innerText = `Goal: $${goal.toFixed(2)} | Progress: ${(savings / goal * 100).toFixed(2)}%`;
    } else {
      alert("Please enter a valid positive number");
    }
  });
});
  