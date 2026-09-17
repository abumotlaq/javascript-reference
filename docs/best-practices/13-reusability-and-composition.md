# Reusability and Composition

## Overview

Reusable code is code that can be applied in more than one context without requiring unnecessary changes.

Composition is the practice of building larger behavior by combining smaller, focused pieces.

Good reusability is not about making everything generic. It is about identifying stable behavior, giving it a clear contract, and making it easy to combine with other parts of the system.

The goal is to create code that is:

* Focused
* Composable
* Predictable
* Testable
* Easy to adapt
* Encapsulated
* Stable at its boundaries

Good reuse reduces duplication without introducing unnecessary abstraction.

---

## 1. Reuse Behavior, Not Coincidental Similarity

Two pieces of code may look similar without representing the same concept.

```js
function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`;
}

function formatAuthorName(author) {
  return `${author.firstName} ${author.lastName}`;
}
```

The implementations are currently identical, but that does not automatically mean they should share one abstraction.

The important question is whether the two operations have the same meaning and are expected to evolve together.

Similarity is not enough.

Reuse should be based on shared semantics.

---

## 2. Prefer Stable Contracts

Reusable code should expose a clear contract.

```js
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}
```

The function has a simple contract:

* Accept a collection of items.
* Read each item's `price`.
* Return the total.

A reusable function becomes harder to use when its behavior depends on undocumented assumptions.

Avoid hidden requirements such as:

```js
function calculateTotal(items) {
  const currency = window.appConfig.currency;
  const discount = window.currentUser.discount;

  return items.reduce((total, item) => total + item.price, 0) * discount;
}
```

The function now depends on unrelated global state.

Its apparent input is incomplete.

Prefer explicit dependencies:

```js
function calculateTotal(items, discount = 1) {
  return items.reduce((total, item) => total + item.price, 0) * discount;
}
```

Explicit dependencies make reuse easier.

---

## 3. Avoid Premature Abstraction

Do not create reusable abstractions before you understand the problem.

Weak abstraction:

```js
function processData(data, mode, config, callback, options) {
  // Handles many unrelated cases.
}
```

A better approach is to start with focused code.

```js
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

function calculateAverage(values) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}
```

Abstraction should emerge from repeated and understood requirements.

Do not generalize code simply because two implementations currently have similar syntax.

---

## 4. The Rule of Three

A useful practical guideline is to tolerate some duplication until a pattern is understood.

One implementation may be specific.

Two implementations may reveal a possible pattern.

Three implementations often provide enough evidence to design a reusable abstraction.

Example:

```js
function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`;
}
```

Later:

```js
function formatCustomerName(customer) {
  return `${customer.firstName} ${customer.lastName}`;
}
```

And later:

```js
function formatAuthorName(author) {
  return `${author.firstName} ${author.lastName}`;
}
```

At this point, a shared abstraction may become reasonable:

```js
function formatPersonName(person) {
  return `${person.firstName} ${person.lastName}`;
}
```

The rule is not absolute.

The purpose is to avoid extracting abstractions based on weak evidence.

---

## 5. Composition Over Large Abstractions

Composition builds behavior from smaller pieces.

Instead of one function doing everything:

```js
function processUser(user) {
  // Validate
  // Normalize
  // Calculate
  // Format
  // Save
  // Log
}
```

Compose smaller operations:

```js
function validateUser(user) {
  return user.name.length > 0;
}

function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim()
  };
}

function formatUser(user) {
  return `${user.name}`;
}
```

Then coordinate them:

```js
function prepareUser(user) {
  if (!validateUser(user)) {
    throw new Error("Invalid user");
  }

  const normalizedUser = normalizeUser(user);

  return formatUser(normalizedUser);
}
```

Each piece has a focused responsibility.

---

## 6. Why Composition Is Useful

Composition provides several benefits.

### Smaller units

Small functions are easier to understand.

### Easier testing

Each unit can be tested independently.

### Replaceable behavior

One component can be replaced without rewriting everything else.

### Better reuse

A small function can often be used in many contexts.

### Controlled complexity

Large workflows become combinations of understandable operations.

---

## 7. Function Composition

Function composition combines functions so the output of one becomes the input of another.

```js
function trim(value) {
  return value.trim();
}

function toLowerCase(value) {
  return value.toLowerCase();
}

function addPrefix(value) {
  return `user:${value}`;
}

const username = addPrefix(
  toLowerCase(
    trim("  Osama Abu Motlaq  ")
  )
);
```

The operations are independent and composable.

A composition helper can make this pattern easier to reuse:

```js
function compose(...functions) {
  return (value) => {
    return functions.reduceRight(
      (result, fn) => fn(result),
      value
    );
  };
}

const normalizeUsername = compose(
  addPrefix,
  toLowerCase,
  trim
);

const result = normalizeUsername("  Osama Abu Motlaq  ");
```

---

## 8. Pipeline-Style Composition

A pipeline applies functions from left to right.

```js
function pipe(...functions) {
  return (value) => {
    return functions.reduce(
      (result, fn) => fn(result),
      value
    );
  };
}
```

Usage:

```js
const normalizeUsername = pipe(
  trim,
  toLowerCase,
  addPrefix
);

const result = normalizeUsername("  Osama Abu Motlaq  ");
```

Pipelines are useful when transformations naturally happen in sequence.

---

## 9. Keep Composable Functions Predictable

Functions compose well when their input and output are clear.

Good:

```js
function toUpperCase(value) {
  return value.toUpperCase();
}

function addPrefix(value) {
  return `user:${value}`;
}
```

Less composable:

```js
function updateUserAndReturnMessage(user) {
  // Changes external state.
  // Sends a request.
  // Logs information.
  // Returns a message.
}
```

The second function performs multiple unrelated actions.

Composition works best when individual operations have narrow responsibilities.

---

## 10. Pure Functions Are Highly Reusable

Pure functions are particularly easy to compose.

```js
function add(a, b) {
  return a + b;
}

function double(value) {
  return value * 2;
}

function calculate(a, b) {
  return double(add(a, b));
}
```

The functions:

* Depend only on their arguments.
* Do not modify external state.
* Produce predictable results.

This makes them easy to reuse and test.

---

## 11. Higher-Order Functions

A higher-order function accepts a function, returns a function, or both.

```js
function createMultiplier(multiplier) {
  return (value) => value * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(10);
triple(10);
```

Higher-order functions allow behavior to be parameterized.

Instead of duplicating functions:

```js
function double(value) {
  return value * 2;
}

function triple(value) {
  return value * 3;
}
```

Behavior can be generated from one reusable function:

```js
function createMultiplier(multiplier) {
  return (value) => value * multiplier;
}
```

---

## 12. Parameterize Behavior

When behavior varies, pass the varying behavior as a parameter.

```js
function calculate(values, operation) {
  return values.reduce(operation, 0);
}

const sum = calculate(
  [1, 2, 3],
  (total, value) => total + value
);

const product = calculate(
  [1, 2, 3],
  (total, value) => {
    if (total === 0) {
      return value;
    }

    return total * value;
  }
);
```

A function parameter can be more flexible than creating multiple similar functions.

---

## 13. Strategy Functions

A strategy function represents replaceable behavior.

```js
function sortUsers(users, compareUsers) {
  return [...users].sort(compareUsers);
}

const byName = (a, b) =>
  a.name.localeCompare(b.name);

const byAge = (a, b) =>
  a.age - b.age;

sortUsers(users, byName);
sortUsers(users, byAge);
```

The sorting workflow remains the same while the strategy changes.

This is a practical form of composition.

---

## 14. Options Objects

When a function has several optional parameters, an options object can provide a clearer contract.

Less clear:

```js
createUser(
  "Osama Abu Motlaq",
  true,
  false,
  10,
  "dark"
);
```

More explicit:

```js
createUser({
  name: "Osama Abu Motlaq",
  isAdmin: true,
  sendWelcomeEmail: false,
  maxProjects: 10,
  theme: "dark"
});
```

Implementation:

```js
function createUser({
  name,
  isAdmin = false,
  sendWelcomeEmail = true,
  maxProjects = 5,
  theme = "light"
}) {
  return {
    name,
    isAdmin,
    sendWelcomeEmail,
    maxProjects,
    theme
  };
}
```

Options objects become especially useful as APIs evolve.

---

## 15. Do Not Turn Every Function Into a Generic Utility

A common mistake is creating a giant utility layer.

Example:

```js
function transform(value, operation, fallback, options) {
  // Handles many unrelated situations.
}
```

This appears reusable but is difficult to understand.

Prefer domain-specific functions:

```js
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}
```

Specific abstractions are often easier to reuse than highly generic ones.

---

## 16. Generic Utilities Should Have Strong Reasons to Exist

A generic helper is valuable when the problem is genuinely generic.

Good example:

```js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
```

It has:

* A clear purpose.
* A stable contract.
* Few assumptions.
* Broad usefulness.

Poor abstraction:

```js
function handleEverything(value, type, config) {
  // Performs unrelated operations.
}
```

Generic does not automatically mean reusable.

---

## 17. Reuse Through Modules

Modules create reusable boundaries.

```js
export function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

Another module can consume it:

```js
import { calculateTotal } from "./cart.js";

const total = calculateTotal(items);
```

A module should expose the smallest useful public API.

Avoid exporting implementation details that consumers do not need.

---

## 18. Encapsulation Improves Reusability

Reusable modules should control their internal implementation.

```js
function createCounter() {
  let value = 0;

  return {
    increment() {
      value += 1;
    },

    decrement() {
      value -= 1;
    },

    getValue() {
      return value;
    }
  };
}
```

The internal state is hidden.

Consumers interact with the public operations rather than the implementation.

This allows the implementation to change without forcing consumers to change.

---

## 19. Avoid Leaky Abstractions

An abstraction leaks when consumers must understand internal details to use it correctly.

Suppose a function requires knowledge of internal storage:

```js
function saveUser(user, internalCache, internalQueue) {
  // ...
}
```

Consumers now depend on implementation details.

A better API hides those details:

```js
const userStore = createUserStore();

userStore.save(user);
```

A good abstraction removes unnecessary knowledge from its users.

---

## 20. Reusable APIs Should Be Small

A large public API creates more coupling.

Avoid exposing everything:

```js
export {
  createUser,
  updateUser,
  deleteUser,
  normalizeUser,
  validateUser,
  internalCache,
  internalQueue,
  debugState,
  rawDatabaseClient
};
```

Expose only what consumers actually need:

```js
export {
  createUser,
  updateUser,
  deleteUser
};
```

A smaller API is easier to understand and maintain.

---

## 21. Reusable UI Patterns

Reusable UI components should focus on stable behavior.

A component should avoid knowing unnecessary application-specific details.

Example:

```js
function Button({ children, onClick, disabled = false }) {
  return {
    children,
    onClick,
    disabled
  };
}
```

The component can then be used in different contexts.

```js
Button({
  children: "Save",
  onClick: saveUser
});

Button({
  children: "Delete",
  onClick: deleteUser,
  disabled: true
});
```

The reusable abstraction should represent a meaningful UI concept.

---

## 22. Reusable Validation Functions

Validation logic is often naturally reusable.

```js
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
```

Another example:

```js
function isValidEmail(value) {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}
```

These functions can be reused by forms, APIs, and other validation layers.

Avoid coupling them to a specific DOM element:

```js
function validateEmailInput(input) {
  // Reads a specific DOM node.
  // Updates classes.
  // Displays an error.
}
```

A lower-level validation function is easier to reuse:

```js
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
```

UI code can decide how to present the result.

---

## 23. Reusable Data Transformations

Data transformations are often good candidates for composition.

```js
function getActiveUsers(users) {
  return users.filter((user) => user.active);
}

function getUserNames(users) {
  return users.map((user) => user.name);
}

function sortNames(names) {
  return [...names].sort();
}
```

They can be combined:

```js
const result = sortNames(
  getUserNames(
    getActiveUsers(users)
  )
);
```

Or expressed as a pipeline:

```js
const result = pipe(
  getActiveUsers,
  getUserNames,
  sortNames
)(users);
```

Each function performs one transformation.

---

## 24. Composition of Async Operations

Asynchronous operations can also be composed.

```js
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
```

Another operation can consume the result:

```js
async function fetchUserProjects(userId) {
  const user = await fetchUser(userId);

  return fetch(`/api/users/${user.id}/projects`)
    .then((response) => response.json());
}
```

A workflow can remain composed of separate operations:

```js
async function loadUserDashboard(userId) {
  const user = await fetchUser(userId);
  const projects = await fetchUserProjects(userId);

  return {
    user,
    projects
  };
}
```

Keep reusable asynchronous functions focused.

---

## 25. Concurrent Composition

Independent operations should often execute concurrently.

```js
const [projects, notifications] = await Promise.all([
  fetchProjects(),
  fetchNotifications()
]);
```

Do not unnecessarily serialize independent work:

```js
const projects = await fetchProjects();
const notifications = await fetchNotifications();
```

Composition does not mean every operation must execute sequentially.

Choose the execution model appropriate to the dependencies between operations.

---

## 26. Reusable Resource Lifecycles

Resources often need setup and cleanup.

```js
function createConnection() {
  const connection = openConnection();

  return {
    connection,

    close() {
      connection.close();
    }
  };
}
```

Consumers can use the resource without depending on the implementation details of creation.

A reusable lifecycle pattern should make ownership clear.

---

## 27. Cleanup Should Be Composable

A cleanup function can encapsulate resource ownership.

```js
function subscribeToUpdates(onUpdate) {
  const unsubscribe = subscribe(onUpdate);

  return unsubscribe;
}
```

Usage:

```js
const unsubscribe = subscribeToUpdates(handleUpdate);

unsubscribe();
```

This pattern gives the caller explicit ownership.

A resource should have a clear answer to:

> Who is responsible for cleanup?

---

## 28. Dependency Injection

Dependency injection is a useful composition technique.

Instead of hard-coding a dependency:

```js
function createUserService() {
  const database = new Database();

  return {
    save(user) {
      return database.save(user);
    }
  };
}
```

Inject it:

```js
function createUserService(database) {
  return {
    save(user) {
      return database.save(user);
    }
  };
}
```

Now the service can work with different implementations.

```js
const productionService = createUserService(productionDatabase);
const testService = createUserService(fakeDatabase);
```

This improves reuse and testability.

---

## 29. Depend on Capabilities

A reusable component often needs a capability rather than a specific implementation.

Instead of:

```js
function createLogger() {
  const logger = new ConsoleLogger();

  return {
    log(message) {
      logger.log(message);
    }
  };
}
```

Use the required capability:

```js
function createLogger(logger) {
  return {
    log(message) {
      logger.log(message);
    }
  };
}
```

The consumer can provide any compatible implementation.

---

## 30. Reuse and Testability

Reusable code should generally be easy to test.

```js
function calculateDiscount(price, percentage) {
  return price - price * (percentage / 100);
}
```

A focused function can be tested directly:

```js
calculateDiscount(100, 10);
calculateDiscount(200, 25);
```

A large function with database access, DOM operations, network requests, and calculations is harder to isolate.

Good reuse often emerges from good separation of concerns.

---

## 31. Shared Abstractions Create Coupling

Reusing one abstraction means multiple parts of the system now depend on it.

For example:

```js
import { formatDate } from "./date-utils.js";
```

If twenty modules depend on `formatDate`, changing its behavior may affect twenty consumers.

Reuse creates benefits, but it also creates coupling.

Before extracting shared code, consider:

* How stable is the behavior?
* How many consumers need it?
* Should all consumers evolve together?
* Is the abstraction meaningful?
* What happens if one consumer needs different behavior?

---

## 32. Avoid Accidental Shared State

Shared mutable state makes reuse dangerous.

Avoid:

```js
const sharedUsers = [];

function addUser(user) {
  sharedUsers.push(user);
}
```

Prefer explicit state ownership:

```js
function createUserStore() {
  const users = [];

  return {
    addUser(user) {
      users.push(user);
    },

    getUsers() {
      return [...users];
    }
  };
}
```

The store owns its state.

---

## 33. Prefer Immutable Composition When Practical

Immutable transformations compose naturally.

```js
function addUser(users, user) {
  return [...users, user];
}

function removeUser(users, userId) {
  return users.filter((user) => user.id !== userId);
}
```

Operations can be chained without unexpectedly modifying shared data.

```js
const nextUsers = removeUser(
  addUser(users, newUser),
  oldUserId
);
```

This is especially useful in state-driven systems.

---

## 34. Reusable Formatting Functions

Formatting functions should usually return values rather than directly modify the UI.

Good:

```js
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}
```

Usage:

```js
const label = formatCurrency(150);
```

This can then be used by different presentation layers.

Less reusable:

```js
function showCurrency(element, amount) {
  element.textContent = "$" + amount;
}
```

The second function is tied to the DOM.

---

## 35. Reusable Business Logic Should Be UI-Agnostic

Keep business rules independent from presentation whenever possible.

```js
function canCreateProject(user, currentProjectCount) {
  return (
    user.isAdmin ||
    currentProjectCount < user.projectLimit
  );
}
```

The same logic can be used by:

* A web interface
* An API
* A command-line tool
* Automated tests

Avoid embedding the rule inside UI code:

```js
function handleCreateButtonClick() {
  // Read DOM state.
  // Check project limit.
  // Display error.
  // Change button.
  // Submit request.
}
```

Separate business logic from presentation.

---

## 36. Composition in Event Handling

Event handlers should delegate work to reusable functions.

Instead of:

```js
button.addEventListener("click", () => {
  const value = input.value.trim().toLowerCase();

  if (value.length === 0) {
    errorElement.textContent = "Invalid input";
    return;
  }

  saveUser(value);
});
```

Extract the reusable logic:

```js
function normalizeUsername(value) {
  return value.trim().toLowerCase();
}

function isValidUsername(value) {
  return value.length > 0;
}
```

Then compose the handler:

```js
button.addEventListener("click", () => {
  const username = normalizeUsername(input.value);

  if (!isValidUsername(username)) {
    errorElement.textContent = "Invalid input";
    return;
  }

  saveUser(username);
});
```

The handler coordinates the work instead of owning every detail.

---

## 37. Reusable Fetching Logic

Network behavior can be encapsulated.

```js
async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
```

Consumers can reuse it:

```js
const user = await requestJson("/api/users/1");
```

The common transport logic is centralized while the endpoint remains explicit.

---

## 38. Do Not Hide Important Differences

Abstraction becomes harmful when it conceals meaningful differences.

For example:

```js
function request(url, options = {}) {
  // Automatically retries every request.
  // Automatically transforms errors.
  // Automatically refreshes authentication.
  // Automatically caches some responses.
}
```

Consumers may no longer know what the function actually does.

Reusable APIs should make important behavior visible.

Explicitness is often more valuable than maximum abstraction.

---

## 39. Reusable Components Need Stable Semantics

A component should represent a meaningful concept.

Good:

```js
function UserCard({ user }) {
  return {
    user
  };
}
```

Less meaningful:

```js
function UniversalContainer({
  mode,
  type,
  layout,
  variant,
  behavior,
  data,
  render,
  options
}) {
  // ...
}
```

The second abstraction may be technically reusable but semantically unclear.

A good reusable abstraction answers:

> What concept does this represent?

---

## 40. Render Functions and Behavior Injection

Behavior can be injected when presentation needs to vary.

```js
function renderList(items, renderItem) {
  return items.map(renderItem);
}
```

Usage:

```js
renderList(
  ["JavaScript", "React", "Next.js"],
  (item) => `<li>${item}</li>`
);
```

The list logic remains reusable while the rendering behavior changes.

---

## 41. Composition Through Small Data Transformations

A complex transformation can often be built from small operations.

```js
function getActiveUsers(users) {
  return users.filter((user) => user.active);
}

function getNames(users) {
  return users.map((user) => user.name);
}

function sortAlphabetically(names) {
  return [...names].sort();
}
```

Compose them:

```js
const getActiveUserNames = (users) =>
  sortAlphabetically(
    getNames(
      getActiveUsers(users)
    )
  );
```

Each function remains independently reusable.

---

## 42. Avoid Utility Modules That Become Junk Drawers

A file such as:

```text
utils.js
```

can become a collection of unrelated functions.

```js
export function formatDate() {}
export function calculateTax() {}
export function slugify() {}
export function validateEmail() {}
export function debounce() {}
export function parseUser() {}
```

These functions may have nothing conceptually in common.

Prefer meaningful boundaries:

```text
date/
├── format-date.js

validation/
├── validate-email.js

performance/
├── debounce.js

users/
├── parse-user.js
```

Organization should reflect concepts, not simply convenience.

---

## 43. Reuse Through Stable Domain Concepts

Domain concepts are often better abstractions than technical categories.

Weak:

```text
utils/
├── format.js
├── process.js
└── helpers.js
```

Stronger:

```text
billing/
├── calculate-total.js
├── calculate-discount.js
└── format-invoice.js

users/
├── validate-user.js
├── normalize-user.js
└── get-user-display-name.js
```

Domain-oriented reuse is easier to understand.

---

## 44. Abstractions Should Respect Ownership

Before reusing a piece of code, determine who owns the behavior.

For example, if one feature owns a rule:

```js
function calculateProjectLimit(user) {
  return user.isAdmin ? 50 : 10;
}
```

Do not immediately move it into a global utility directory.

The rule may belong to the project domain.

Move code into shared modules when multiple independent consumers genuinely need the same concept.

---

## 45. Reuse and Performance

Reusable abstractions can sometimes improve performance:

```js
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function formatCurrency(amount) {
  return formatter.format(amount);
}
```

The formatter is reused instead of recreated repeatedly.

However, reuse should not be introduced purely for theoretical optimization.

Measure when performance matters.

---

## 46. Reuse Can Also Increase Memory Usage

Caching reusable objects can keep them alive longer.

```js
const cache = new Map();

function getUser(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const user = loadUser(id);

  cache.set(id, user);

  return user;
}
```

This may reduce repeated work but can increase memory usage.

Reusable stateful abstractions require clear ownership and lifecycle policies.

---

## 47. Reuse and Lifecycle Management

Reusable resources should define their lifecycle.

```js
function createPoller(callback, interval) {
  const timerId = setInterval(callback, interval);

  return {
    stop() {
      clearInterval(timerId);
    }
  };
}
```

Usage:

```js
const poller = createPoller(
  () => {
    console.log("Polling");
  },
  5000
);

poller.stop();
```

The abstraction makes resource ownership explicit.

---

## 48. Reusable Abstractions and Error Boundaries

A reusable function should define what happens when something fails.

```js
async function loadUser(id) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load user");
  }

  return response.json();
}
```

Consumers decide how to handle the failure:

```js
try {
  const user = await loadUser(1);
} catch (error) {
  console.error(error);
}
```

The reusable function should not automatically decide the entire application's error presentation.

---

## 49. Avoid Over-Composing Tiny Functions

Composition is not automatically better when every operation becomes a separate function.

Over-fragmented:

```js
function getValue(object) {
  return object.value;
}

function trimValue(value) {
  return value.trim();
}

function lowerValue(value) {
  return value.toLowerCase();
}

function formatValue(value) {
  return `user:${value}`;
}
```

Sometimes the combined implementation is clearer:

```js
function formatUserValue(object) {
  return `user:${object.value.trim().toLowerCase()}`;
}
```

The correct level of composition depends on readability and reuse.

---

## 50. Balance Duplication and Abstraction

Two bad extremes exist.

### Excessive duplication

```js
function saveUser(user) {
  const response = fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user)
  });

  return response;
}

function saveProject(project) {
  const response = fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(project)
  });

  return response;
}
```

### Excessive abstraction

```js
function saveResource(resource, endpoint, transform, options, strategy) {
  // Handles every possible persistence scenario.
}
```

A better abstraction should remove genuine duplication without hiding important differences.

---

## 51. Reuse Should Improve Readability

A reusable abstraction has failed if using it makes the code harder to understand.

Good:

```js
const normalizedName = normalizeUsername(input);
```

The intention is obvious.

Less useful:

```js
const result = processValue(input, 3, true, "name");
```

The abstraction may be reusable, but its API is unclear.

Readable reuse is better than clever reuse.

---

## 52. Prefer Composition When Behavior Changes Independently

Suppose a system can use different notification strategies.

```js
function sendNotification(sender, message) {
  return sender.send(message);
}
```

Different implementations can be composed:

```js
const emailSender = {
  send(message) {
    console.log(`Email: ${message}`);
  }
};

const logSender = {
  send(message) {
    console.log(`Log: ${message}`);
  }
};
```

Usage:

```js
sendNotification(emailSender, "Hello");
sendNotification(logSender, "Hello");
```

The notification workflow does not depend on one specific implementation.

---

## 53. Composition vs Inheritance

Inheritance creates a structural relationship between types.

Composition combines behavior or collaborators.

Inheritance:

```js
class AdminUser extends User {
  deleteUser() {
    // ...
  }
}
```

Composition:

```js
function createUser({ permissions }) {
  return {
    permissions
  };
}
```

Another component can consume the permissions:

```js
function canDeleteUser(user) {
  return user.permissions.includes("delete:user");
}
```

Composition is often useful when behavior can vary independently.

Inheritance is still appropriate when there is a genuine subtype relationship.

---

## 54. Reusable Behavior With Objects

Objects can provide interchangeable behavior.

```js
const jsonFormatter = {
  format(value) {
    return JSON.stringify(value);
  }
};

const textFormatter = {
  format(value) {
    return String(value);
  }
};

function exportValue(value, formatter) {
  return formatter.format(value);
}
```

Usage:

```js
exportValue({ name: "Osama Abu Motlaq" }, jsonFormatter);
exportValue("Osama Abu Motlaq", textFormatter);
```

The operation is composed from a strategy object.

---

## 55. Avoid Depending on Implementation Details

Bad:

```js
function calculateReport(service) {
  service.database.connection.query();
}
```

The function knows too much about the service.

Better:

```js
function calculateReport(service) {
  return service.getUsers();
}
```

The consumer depends on the public capability rather than internal structure.

This makes the abstraction more reusable.

---

## 56. Reusable APIs Should Minimize Assumptions

The more assumptions an abstraction makes, the fewer contexts it can support.

Bad:

```js
function formatUser(user) {
  return `${user.firstName} ${user.lastName} - ${user.company.name}`;
}
```

This assumes:

* `firstName` exists.
* `lastName` exists.
* `company` exists.
* `company.name` exists.
* The output format is always appropriate.

A narrower function may be easier to reuse:

```js
function formatPersonName(person) {
  return `${person.firstName} ${person.lastName}`;
}
```

Then callers can compose additional information when needed.

---

## 57. Reusable Code and API Evolution

Once an abstraction is shared, changing it becomes more expensive.

Suppose many modules use:

```js
formatCurrency(amount);
```

Changing its return type from:

```js
"$100.00"
```

to:

```js
{
  value: 100,
  formatted: "$100.00"
}
```

may break many consumers.

Shared APIs should therefore be treated as contracts.

Before changing a widely used abstraction, consider:

* Existing consumers
* Backward compatibility
* Migration effort
* Semantic changes
* Testing coverage

---

## 58. Version Reusable Contracts Carefully

When an API must evolve significantly, a new API may be safer than silently changing the old one.

```js
export function formatCurrency(amount) {
  return formatCurrencyString(amount);
}

export function formatCurrencyValue(amount) {
  return {
    value: amount,
    formatted: formatCurrencyString(amount)
  };
}
```

Consumers can migrate intentionally.

Do not preserve confusing compatibility layers indefinitely.

---

## 59. Reusability Should Not Mean Maximum Flexibility

A function with twenty configuration options is not necessarily more reusable.

```js
function createComponent({
  theme,
  layout,
  spacing,
  color,
  size,
  variant,
  animation,
  responsive,
  direction,
  accessibility,
  data,
  behavior,
  strategy
}) {
  // ...
}
```

Every additional option increases complexity.

Reusable code should expose the smallest flexible surface that solves real requirements.

---

## 60. Prefer Clear Composition Boundaries

A composition boundary should answer:

> What does this piece provide?

For example:

```js
function createUserRepository(database) {
  return {
    findById(id) {
      return database.find("users", id);
    },

    save(user) {
      return database.save("users", user);
    }
  };
}
```

The repository provides user persistence operations.

Consumers do not need to understand the database implementation.

---

## 61. Reuse Through Interfaces of Capability

JavaScript does not require formal interfaces to support composition.

An object can provide the needed methods.

```js
function saveDocument(storage, document) {
  return storage.save(document);
}
```

Any compatible object can work:

```js
const localStorageAdapter = {
  save(document) {
    // ...
  }
};

const cloudStorageAdapter = {
  save(document) {
    // ...
  }
};
```

The function depends on the capability:

```js
storage.save(document);
```

not on a specific class.

---

## 62. Compose at the Right Level

Avoid composing implementation details.

Prefer composing meaningful operations:

```js
const activeUsers = getActiveUsers(users);
const sortedUsers = sortUsers(activeUsers);
const names = getUserNames(sortedUsers);
```

Instead of exposing low-level internal steps everywhere:

```js
const filteredArray = users.filter(...);
const copiedArray = [...filteredArray];
const sortedArray = copiedArray.sort(...);
```

The first approach communicates intent.

---

## 63. Reusable Abstractions Should Have Single Ownership

A shared abstraction needs a clear owner.

If every feature modifies it independently, the abstraction can become a negotiation point for unrelated requirements.

A reusable module should have a coherent responsibility.

```text
users/
├── normalize-user.js
├── validate-user.js
└── user-service.js
```

Avoid one shared abstraction becoming responsible for unrelated domains.

---

## 64. Test Reusable Abstractions Independently

Reusable modules should have focused tests.

```js
function normalizeUsername(value) {
  return value.trim().toLowerCase();
}
```

Tests can target the contract:

```js
normalizeUsername("  Osama Abu Motlaq  ");
normalizeUsername("OSAMA");
normalizeUsername(" osama ");
```

This provides confidence for every consumer of the abstraction.

---

## 65. Refactor Toward Reuse

A safe workflow for introducing reuse is:

### Step 1: Observe duplication

Identify repeated behavior.

### Step 2: Compare semantics

Determine whether the behavior represents the same concept.

### Step 3: Identify variation

Separate stable behavior from changing behavior.

### Step 4: Design the smallest abstraction

Expose only what consumers need.

### Step 5: Migrate consumers

Replace duplicated implementations.

### Step 6: Test

Verify both the abstraction and its consumers.

### Step 7: Remove dead code

Delete obsolete implementations.

---

## 66. Example: Refactoring Duplication

Before:

```js
function formatUserCard(user) {
  return `${user.name} - ${user.email}`;
}

function formatAdminCard(admin) {
  return `${admin.name} - ${admin.email}`;
}
```

After identifying shared semantics:

```js
function formatPersonCard(person) {
  return `${person.name} - ${person.email}`;
}
```

Usage:

```js
formatPersonCard({
  name: "Osama Abu Motlaq",
  email: "osama@example.com"
});
```

The abstraction should only be introduced because the concept is truly shared.

---

## 67. Example: Composition Instead of Duplication

Before:

```js
function prepareUserName(user) {
  return user.name.trim().toLowerCase();
}

function prepareCustomerName(customer) {
  return customer.name.trim().toLowerCase();
}
```

After:

```js
function normalizeName(name) {
  return name.trim().toLowerCase();
}

function prepareUserName(user) {
  return normalizeName(user.name);
}

function prepareCustomerName(customer) {
  return normalizeName(customer.name);
}
```

The reusable behavior is the normalization operation, not the entire workflow.

---

## 68. Example: Composable Validation

```js
function isNonEmpty(value) {
  return typeof value === "string" &&
    value.trim().length > 0;
}

function hasMinimumLength(value, length) {
  return value.length >= length;
}

function isValidUsername(value) {
  return (
    isNonEmpty(value) &&
    hasMinimumLength(value, 3)
  );
}
```

The individual validators remain reusable.

---

## 69. Example: Composable Authorization

```js
function hasPermission(user, permission) {
  return user.permissions.includes(permission);
}

function canCreateProject(user) {
  return hasPermission(user, "create:project");
}

function canDeleteProject(user) {
  return hasPermission(user, "delete:project");
}
```

One lower-level capability supports multiple higher-level rules.

---

## 70. Example: Composable Formatting

```js
function formatName(name) {
  return name.trim();
}

function formatEmail(email) {
  return email.trim().toLowerCase();
}

function formatUser(user) {
  return {
    name: formatName(user.name),
    email: formatEmail(user.email)
  };
}
```

Each field transformation remains independently reusable.

---

## 71. Reuse and React

Reusable React components should usually represent stable UI concepts.

```js
function Button({ children, onClick, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

More complex behavior can be composed from props:

```js
function UserActions({ onEdit, onDelete }) {
  return (
    <div>
      <Button onClick={onEdit}>
        Edit
      </Button>

      <Button onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
}
```

The reusable `Button` does not need to know anything about users.

---

## 72. Avoid Application-Specific Logic Inside Generic Components

Weak:

```js
function Button({ children }) {
  const user = getCurrentUser();

  if (!user.permissions.includes("admin")) {
    return null;
  }

  return <button>{children}</button>;
}
```

This couples a generic button to authorization.

Prefer:

```js
function Button({ children, disabled = false }) {
  return (
    <button disabled={disabled}>
      {children}
    </button>
  );
}
```

Application-specific logic should remain outside the generic component.

---

## 73. Reusable Hooks Should Have Clear Responsibilities

A reusable React hook should represent a coherent behavior.

```js
function useOnlineStatus() {
  // Subscribe to browser online/offline events.
  // Return the current status.
}
```

Avoid hooks that become application-wide collections of unrelated state:

```js
function useEverything() {
  // User state.
  // Cart state.
  // Theme state.
  // Notifications.
  // Network state.
  // Analytics.
}
```

A reusable hook should encapsulate one meaningful behavior or closely related set of behaviors.

---

## 74. Reusable Components Need Proper Boundaries

A reusable component should not require knowledge of unrelated parent state.

Prefer:

```js
function ProjectCard({ project, onSelect }) {
  return (
    <article onClick={() => onSelect(project.id)}>
      <h2>{project.name}</h2>
    </article>
  );
}
```

The parent owns application state.

```js
function ProjectsList({ projects }) {
  function handleSelect(projectId) {
    // Parent owns the decision.
  }

  return projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
      onSelect={handleSelect}
    />
  ));
}
```

The child exposes behavior without owning unnecessary application decisions.

---

## 75. Reusability and Accessibility

Reusable UI abstractions should preserve accessibility requirements.

```js
function IconButton({ label, children, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

A reusable component can centralize correct behavior instead of forcing every consumer to remember it.

---

## 76. Reusable APIs Should Be Difficult to Misuse

A good abstraction guides consumers toward valid usage.

Weak:

```js
createModal(
  element,
  true,
  false,
  null,
  undefined
);
```

Better:

```js
createModal({
  element,
  closeOnEscape: true,
  closeOnBackdrop: false
});
```

An explicit API makes correct usage easier.

---

## 77. Avoid Configuration Explosion

Too many configuration flags often indicate that an abstraction represents multiple concepts.

```js
createComponent({
  searchable: true,
  sortable: true,
  paginated: true,
  selectable: true,
  editable: true,
  draggable: true,
  virtualized: true
});
```

Consider composing smaller components or behaviors instead.

For example:

```js
const table = createTable(data);

const searchableTable = withSearch(table);
const paginatedTable = withPagination(searchableTable);
```

Composition can separate independently changing features.

---

## 78. Reuse Through Small Adapters

Adapters allow existing components to work together without modifying either side.

```js
function createLoggerAdapter(logger) {
  return {
    log(message) {
      logger.info(message);
    }
  };
}
```

Now code expecting `log()` can work with a logger that exposes `info()`.

Adapters preserve boundaries and reduce invasive changes.

---

## 79. Reuse Through Composition Functions

A composition function can combine capabilities.

```js
function withLogging(service, logger) {
  return {
    ...service,

    async save(user) {
      logger.log("Saving user");

      return service.save(user);
    }
  };
}
```

Another capability can be composed:

```js
function withValidation(service, validate) {
  return {
    ...service,

    async save(user) {
      validate(user);

      return service.save(user);
    }
  };
}
```

Then:

```js
const enhancedService = withLogging(
  withValidation(
    service,
    validateUser
  ),
  logger
);
```

Composition allows behavior to be layered without modifying the original service.

---

## 80. Avoid Deep Composition That Hides Control Flow

Composition can become difficult when too many wrappers are combined.

```js
const service = withA(
  withB(
    withC(
      withD(
        withE(
          baseService
        )
      )
    )
  )
);
```

At some point, the abstraction becomes harder to understand than the original implementation.

Use composition when it improves structure, not when it merely demonstrates technical flexibility.

---

## 81. Reusability and Documentation

Reusable APIs need clear documentation.

At minimum, document:

* What the abstraction represents.
* What inputs it accepts.
* What it returns.
* What side effects it performs.
* What errors it may produce.
* What cleanup is required.
* Important limitations.

A reusable abstraction without a clear contract transfers knowledge into the implementation.

---

## 82. Reusable Code and Naming

Names should communicate the abstraction's semantic purpose.

Weak:

```js
processData();
handleThing();
doStuff();
```

Better:

```js
normalizeUser();
calculateInvoiceTotal();
validateProjectInput();
```

Good naming makes reusable code easier to discover.

---

## 83. Do Not Abstract Based on File Size

A large file is not automatically a reason to create reusable abstractions.

A function can be large because the algorithm is inherently complex.

A small function can still be poorly designed.

The reason for abstraction should be:

* Shared behavior
* Separate responsibility
* Replaceable strategy
* Clear domain boundary
* Improved testability
* Improved composition

Not file length alone.

---

## 84. Reuse Through Stable Data Contracts

Different parts of a system can compose more easily when data structures are predictable.

```js
function createUser(name, email) {
  return {
    id: crypto.randomUUID(),
    name,
    email
  };
}
```

Consumers can rely on the structure:

```js
const user = createUser(
  "Osama Abu Motlaq",
  "osama@example.com"
);
```

Changing the data contract should be treated as an API change.

---

## 85. Avoid Passing Entire Objects When Only One Value Is Needed

Weak:

```js
function formatEmail(user) {
  return user.email.toLowerCase();
}
```

If the function only needs an email address:

```js
function formatEmail(email) {
  return email.toLowerCase();
}
```

The second version is often more reusable.

Pass the narrowest meaningful input.

---

## 86. But Avoid Artificially Narrow Interfaces

Do not split naturally related values merely to make an API look generic.

Weak:

```js
formatAddress(
  street,
  city,
  country,
  postalCode,
  apartment
);
```

A domain object may be clearer:

```js
formatAddress({
  street,
  city,
  country,
  postalCode,
  apartment
});
```

The goal is not minimum parameters.

The goal is a clear contract.

---

## 87. Composition and Data Ownership

When composing operations, preserve ownership boundaries.

```js
function addProject(projects, project) {
  return [...projects, project];
}
```

The function does not modify the caller's array.

This makes the operation easier to reuse safely.

---

## 88. Avoid Shared Mutation Between Reusable Functions

Dangerous:

```js
function addTag(tags, tag) {
  tags.push(tag);
  return tags;
}

function removeTag(tags, tag) {
  const index = tags.indexOf(tag);

  if (index !== -1) {
    tags.splice(index, 1);
  }

  return tags;
}
```

Prefer:

```js
function addTag(tags, tag) {
  return [...tags, tag];
}

function removeTag(tags, tag) {
  return tags.filter((item) => item !== tag);
}
```

Independent transformations compose more safely.

---

## 89. Reusable Code Should Minimize Hidden Side Effects

Hidden side effects reduce portability.

Less reusable:

```js
function normalizeUser(user) {
  user.name = user.name.trim();
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}
```

More reusable:

```js
function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim()
  };
}
```

Persistence can happen elsewhere:

```js
const normalizedUser = normalizeUser(user);

localStorage.setItem(
  "user",
  JSON.stringify(normalizedUser)
);
```

---

## 90. Reuse and Abstraction Boundaries

A good abstraction boundary hides implementation details while exposing meaningful capabilities.

```js
function createUserRepository(database) {
  return {
    async findById(id) {
      return database.users.findById(id);
    },

    async save(user) {
      return database.users.save(user);
    }
  };
}
```

Consumers know what the repository does.

They do not need to know how the database works internally.

---

## 91. A Practical Decision Framework

Before extracting reusable code, ask:

### Is the behavior actually duplicated?

If not, keep it local.

### Does the duplicated code represent the same concept?

If not, avoid combining it.

### Is the behavior stable?

If requirements are still changing rapidly, premature abstraction may create friction.

### What varies?

Separate stable behavior from variable behavior.

### What is the smallest useful API?

Expose only what consumers need.

### Does the abstraction improve readability?

If the API is harder to understand, reconsider it.

### Does it reduce or increase coupling?

Reuse can create dependencies between consumers.

### Can it be tested independently?

A clear contract usually makes testing easier.

### Who owns the abstraction?

Every shared concept needs a clear home.

---

## 92. Reusability Checklist

Before creating or extracting a reusable abstraction:

* [ ] The behavior represents a real shared concept.
* [ ] The contract is clear.
* [ ] Inputs are explicit.
* [ ] Outputs are predictable.
* [ ] Hidden dependencies are minimized.
* [ ] Side effects are intentional.
* [ ] Ownership is clear.
* [ ] The public API is small.
* [ ] The abstraction has meaningful naming.
* [ ] Important differences are not hidden.
* [ ] Consumers can test it independently.
* [ ] The abstraction does not exist only because two snippets look similar.
* [ ] Configuration is not unnecessarily large.
* [ ] The abstraction does not become a generic utility dump.
* [ ] Lifecycle and cleanup are defined when resources are involved.

---

## 93. Final Principles

1. Reuse meaningful behavior, not accidental similarity.
2. Prefer stable semantic contracts.
3. Do not abstract before understanding the problem.
4. Use composition to build larger behavior from smaller pieces.
5. Keep reusable functions focused.
6. Parameterize behavior when variation is expected.
7. Prefer explicit dependencies over hidden global state.
8. Use modules to create reusable boundaries.
9. Keep public APIs small.
10. Hide implementation details.
11. Avoid leaky abstractions.
12. Prefer domain-specific abstractions over generic helpers.
13. Treat shared abstractions as coupling points.
14. Preserve clear ownership of state and resources.
15. Use immutable transformations when practical.
16. Keep business logic independent from presentation.
17. Make reusable UI components represent meaningful concepts.
18. Use dependency injection when replaceable dependencies are useful.
19. Avoid configuration explosion.
20. Do not confuse maximum flexibility with good reuse.
21. Composition should make code clearer, not merely more abstract.
22. Test reusable abstractions independently.
23. Refactor toward reuse when repeated behavior is well understood.
24. Balance duplication against abstraction.
25. Reusability should improve maintainability, not become an objective by itself.
