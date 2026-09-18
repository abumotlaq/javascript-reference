const STORAGE_KEY = "javascript-reference-expenses";

const transactionForm = document.querySelector("#transactionForm");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

const formError = document.querySelector("#formError");
const clearAllButton = document.querySelector("#clearAll");

const transactionList = document.querySelector("#transactionList");
const emptyState = document.querySelector("#emptyState");
const transactionSubtitle = document.querySelector(
  "#transactionSubtitle"
);

const filterButtons = document.querySelectorAll(
  ".filter-button"
);

const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expensesElement = document.querySelector("#expenses");
const transactionCountElement = document.querySelector(
  "#transactionCount"
);

let transactions = loadTransactions();
let currentFilter = "all";

const currencyFormatter = new Intl.NumberFormat(
  "en-US",
  {
    style: "currency",
    currency: "USD"
  }
);

const categoryLabels = {
  food: "Food",
  transport: "Transport",
  shopping: "Shopping",
  bills: "Bills",
  entertainment: "Entertainment",
  salary: "Salary",
  freelance: "Freelance",
  other: "Other"
};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function loadTransactions() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData;
  } catch (error) {
    console.error("Failed to load transactions:", error);
    return [];
  }
}

function saveTransactions() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  } catch (error) {
    console.error("Failed to save transactions:", error);
  }
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearError() {
  formError.textContent = "";
  formError.hidden = true;
}

function createTransaction({
  description,
  amount,
  type,
  category,
  date
}) {
  return {
    id: crypto.randomUUID(),
    description,
    amount,
    type,
    category,
    date,
    createdAt: new Date().toISOString()
  };
}

function addTransaction(transactionData) {
  const transaction = createTransaction(transactionData);

  transactions.unshift(transaction);

  saveTransactions();
  render();
}

function deleteTransaction(transactionId) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== transactionId
  );

  saveTransactions();
  render();
}

function clearAllTransactions() {
  if (transactions.length === 0) {
    return;
  }

  const confirmed = window.confirm(
    "Are you sure you want to delete all transactions?"
  );

  if (!confirmed) {
    return;
  }

  transactions = [];

  saveTransactions();
  render();
}

function getFilteredTransactions() {
  if (currentFilter === "income") {
    return transactions.filter(
      (transaction) => transaction.type === "income"
    );
  }

  if (currentFilter === "expense") {
    return transactions.filter(
      (transaction) => transaction.type === "expense"
    );
  }

  return transactions;
}

function calculateSummary() {
  const income = transactions
    .filter(
      (transaction) => transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const expenses = transactions
    .filter(
      (transaction) => transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  return {
    income,
    expenses,
    balance: income - expenses,
    count: transactions.length
  };
}

function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle: "medium"
    }
  ).format(date);
}

function updateSummary() {
  const summary = calculateSummary();

  balanceElement.textContent =
    formatCurrency(summary.balance);

  incomeElement.textContent =
    formatCurrency(summary.income);

  expensesElement.textContent =
    formatCurrency(summary.expenses);

  transactionCountElement.textContent =
    summary.count;
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive =
      button.dataset.filter === currentFilter;

    button.classList.toggle(
      "active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}

function updateEmptyState(filteredTransactions) {
  if (filteredTransactions.length > 0) {
    emptyState.hidden = true;
    return;
  }

  emptyState.hidden = false;

  if (transactions.length === 0) {
    emptyState.textContent =
      "No transactions yet.";

    return;
  }

  if (currentFilter === "income") {
    emptyState.textContent =
      "No income transactions found.";

    return;
  }

  if (currentFilter === "expense") {
    emptyState.textContent =
      "No expense transactions found.";

    return;
  }

  emptyState.textContent =
    "No transactions found.";
}

function updateSubtitle(filteredTransactions) {
  const total = filteredTransactions.length;

  if (currentFilter === "all") {
    transactionSubtitle.textContent =
      `${total} transaction${total === 1 ? "" : "s"}`;
    return;
  }

  const label =
    currentFilter === "income"
      ? "income"
      : "expense";

  transactionSubtitle.textContent =
    `${total} ${label} transaction${total === 1 ? "" : "s"}`;
}

function renderTransactions() {
  const filteredTransactions =
    getFilteredTransactions();

  transactionList.replaceChildren();

  const fragment =
    document.createDocumentFragment();

  filteredTransactions.forEach((transaction) => {
    const listItem =
      document.createElement("li");

    listItem.className =
      `transaction-item ${transaction.type}`;

    listItem.dataset.transactionId =
      transaction.id;

    const main =
      document.createElement("div");

    main.className = "transaction-main";

    const description =
      document.createElement("p");

    description.className =
      "transaction-description";

    description.textContent =
      transaction.description;

    const meta =
      document.createElement("div");

    meta.className = "transaction-meta";

    const category =
      document.createElement("span");

    category.className =
      "transaction-category";

    category.textContent =
      categoryLabels[transaction.category] ||
      "Other";

    const date =
      document.createElement("span");

    date.textContent =
      formatDate(transaction.date);

    meta.append(category, date);
    main.append(description, meta);

    const amount =
      document.createElement("strong");

    amount.className = "transaction-amount";

    const sign =
      transaction.type === "income"
        ? "+"
        : "-";

    amount.textContent =
      `${sign}${formatCurrency(transaction.amount)}`;

    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className =
      "delete-button";

    deleteButton.textContent =
      "Delete";

    deleteButton.dataset.action =
      "delete";

    deleteButton.setAttribute(
      "aria-label",
      `Delete ${transaction.description}`
    );

    listItem.append(
      main,
      amount,
      deleteButton
    );

    fragment.appendChild(listItem);
  });

  transactionList.appendChild(fragment);

  updateEmptyState(filteredTransactions);
  updateSubtitle(filteredTransactions);
}

function render() {
  updateSummary();
  renderTransactions();
  updateFilterButtons();
}

transactionForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    clearError();

    const description =
      descriptionInput.value.trim();

    const amount =
      Number.parseFloat(amountInput.value);

    const type =
      typeInput.value;

    const category =
      categoryInput.value;

    const date =
      dateInput.value;

    if (!description) {
      showError(
        "Please enter a transaction description."
      );

      descriptionInput.focus();
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      showError(
        "Please enter a valid amount greater than zero."
      );

      amountInput.focus();
      return;
    }

    if (!date) {
      showError(
        "Please select a transaction date."
      );

      dateInput.focus();
      return;
    }

    addTransaction({
      description,
      amount,
      type,
      category,
      date
    });

    transactionForm.reset();
    dateInput.value = getToday();
    descriptionInput.focus();
  }
);

transactionList.addEventListener(
  "click",
  (event) => {
    const actionElement =
      event.target.closest(
        "[data-action]"
      );

    if (!actionElement) {
      return;
    }

    const transactionItem =
      actionElement.closest(
        "[data-transaction-id]"
      );

    if (!transactionItem) {
      return;
    }

    const transactionId =
      transactionItem.dataset.transactionId;

    if (
      actionElement.dataset.action ===
      "delete"
    ) {
      deleteTransaction(transactionId);
    }
  }
);

filterButtons.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      currentFilter =
        button.dataset.filter;

      render();
    }
  );
});

clearAllButton.addEventListener(
  "click",
  clearAllTransactions
);

dateInput.value = getToday();

render();