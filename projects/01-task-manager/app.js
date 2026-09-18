const STORAGE_KEY = "javascript-reference-task-manager";

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const formError = document.querySelector("#formError");
const clearCompletedButton = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filter-button");

const totalTasksElement = document.querySelector("#totalTasks");
const activeTasksElement = document.querySelector("#activeTasks");
const completedTasksElement = document.querySelector("#completedTasks");

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function addTask(title) {
  const task = createTask(title);

  tasks.unshift(task);

  saveTasks();
  render();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed
    };
  });

  saveTasks();
  render();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasks();
  render();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);

  saveTasks();
  render();
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  totalTasksElement.textContent = total;
  activeTasksElement.textContent = active;
  completedTasksElement.textContent = completed;
}

function updateEmptyState(filteredTasks) {
  if (filteredTasks.length > 0) {
    emptyState.hidden = true;
    return;
  }

  emptyState.hidden = false;

  if (tasks.length === 0) {
    emptyState.textContent = "No tasks yet. Add your first task.";
    return;
  }

  if (currentFilter === "active") {
    emptyState.textContent = "No active tasks.";
    return;
  }

  if (currentFilter === "completed") {
    emptyState.textContent = "No completed tasks.";
    return;
  }

  emptyState.textContent = "No tasks found.";
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();

  taskList.replaceChildren();

  filteredTasks.forEach((task) => {
    const listItem = document.createElement("li");

    listItem.className = "task-item";

    if (task.completed) {
      listItem.classList.add("completed");
    }

    listItem.dataset.taskId = task.id;

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.action = "toggle";
    checkbox.setAttribute(
      "aria-label",
      `Mark "${task.title}" as ${task.completed ? "active" : "completed"}`
    );

    const content = document.createElement("div");

    content.className = "task-content";

    const title = document.createElement("p");

    title.className = "task-title";
    title.textContent = task.title;

    const date = document.createElement("p");

    date.className = "task-date";
    date.textContent = `Created ${formatDate(task.createdAt)}`;

    content.append(title, date);

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute(
      "aria-label",
      `Delete "${task.title}"`
    );

    listItem.append(checkbox, content, deleteButton);

    taskList.appendChild(listItem);
  });

  updateEmptyState(filteredTasks);
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function render() {
  updateStats();
  renderTasks();
  updateFilterButtons();
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearError() {
  formError.textContent = "";
  formError.hidden = true;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  clearError();

  if (!title) {
    showError("Please enter a task.");
    taskInput.focus();
    return;
  }

  addTask(title);

  taskForm.reset();
  taskInput.focus();
});

taskList.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  const taskItem = actionElement.closest("[data-task-id]");

  if (!taskItem) {
    return;
  }

  const { taskId } = taskItem.dataset;
  const { action } = actionElement.dataset;

  if (action === "delete") {
    deleteTask(taskId);
  }
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest('[data-action="toggle"]');

  if (!checkbox) {
    return;
  }

  const taskItem = checkbox.closest("[data-task-id]");

  if (!taskItem) {
    return;
  }

  toggleTask(taskItem.dataset.taskId);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    render();
  });
});

clearCompletedButton.addEventListener("click", () => {
  clearCompletedTasks();
});

render();