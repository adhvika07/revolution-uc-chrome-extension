document.addEventListener("DOMContentLoaded", function() {
  let currentYear = new Date().getFullYear();
  let currentMonthIndex = 0;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let income = 0;
  let expenses = 0;
  let debts = 0;
  let goals = {};

  function updateMonthYearDisplay() {
      document.getElementById("yearDisplay").textContent = `${currentYear} ${months[currentMonthIndex]}`;
  }

  
  function updateUI() {
    document.getElementById("budget").textContent = `Income: $${income}`;
    document.getElementById("goalProgress").textContent = `Expenses: $${expenses}`;
    document.getElementById("rent").textContent = `Debts: $${debts}`;

    // Update the goals list
    const goalsList = document.getElementById("goalsList");
    goalsList.innerHTML = "Goals:";
    for (const [name, amount] of Object.entries(goals)) {
        const goalItem = document.createElement("div");
        goalItem.textContent = `${name}: $${amount}`;
        goalsList.appendChild(goalItem);
    }

    // Calculate water level
    const total = income + expenses + debts;
    const waterLevel = (income / total) * 100;

    // Update the water level
    document.getElementById("waterLevel").style.height = `${waterLevel}%`;
}

  updateMonthYearDisplay();
  updateUI();

  document.getElementById("prevYear").addEventListener("click", function() {
      currentMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
      if (currentMonthIndex === months.length - 1) {
          currentYear--;
      }
      updateMonthYearDisplay();
  });

  document.getElementById("nextYear").addEventListener("click", function() {
      currentMonthIndex = (currentMonthIndex + 1) % months.length;
      if (currentMonthIndex === 0) {
          currentYear++;
      }
      updateMonthYearDisplay();
  });

  document.getElementById("addIncome").addEventListener("click", function() {
      let amount = parseFloat(prompt("Enter income amount:", "0"));
      if (!isNaN(amount)) {
          income += amount;
          updateUI();
      }
  });

  document.getElementById("addExpense").addEventListener("click", function() {
      let amount = parseFloat(prompt("Enter expense amount:", "0"));
      if (!isNaN(amount)) {
          expenses += amount;
          updateUI();
      }
  });

  document.getElementById("addDebt").addEventListener("click", function() {
      let amount = parseFloat(prompt("Enter debt amount:", "0"));
      if (!isNaN(amount)) {
          debts += amount;
          updateUI();
      }
  });

  document.getElementById("setGoal").addEventListener("click", function() {
      let goalName = prompt("Enter goal name:", "");
      let goalAmount = parseFloat(prompt("Enter goal amount:", "0"));
      if (goalName && !isNaN(goalAmount)) {
          goals[goalName] = goalAmount;
          alert(`Goal "${goalName}" set to $${goalAmount}`);
          updateUI();
      }
  });
});