# JavaScript Best Practices

## Overview

This section focuses on writing JavaScript that is:

* Readable
* Maintainable
* Predictable
* Testable
* Secure
* Performant
* Reusable
* Suitable for real-world applications

The goal is not to teach JavaScript syntax from the beginning.

The goal is to answer a different question:

> How should JavaScript be written when building real applications?

---

# What This Section Covers

The best-practices section focuses on decisions made while writing and maintaining JavaScript code.

Topics include:

```text
Code style
Naming
Variables
Immutability
Functions
Modularity
Objects
Data structures
Error handling
Async patterns
DOM and browser usage
Performance
Security
Memory management
Code organization
Reusability
Testing
Debugging
APIs
Accessibility
Configuration
Modern JavaScript
Production readiness
```

---

# Best Practices vs Fundamentals

The `fundamentals` section teaches how JavaScript works at a practical language level.

Examples:

```text
Variables
Data types
Operators
Arrays
Objects
Strings
Control flow
Type conversion
JSON
Regular expressions
Errors
```

For example:

```js
const name = "Osama Abu Motlaq";
```

Fundamentals explain:

```text
What is const?
What is a string?
How does assignment work?
```

Best practices ask:

```text
Is this variable named clearly?
Is const appropriate?
Is the value being managed correctly?
Does this code communicate intent?
```

The two sections have different goals.

---

# Best Practices vs Advanced JavaScript

The `advanced` section explains deeper JavaScript runtime and language behavior.

Examples:

```text
Execution Context
Call Stack
Event Loop
Microtasks
Memory Management
Garbage Collection
this
Prototypes
Metaprogramming
```

For example, `advanced` explains why:

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");
```

produces:

```text
A
C
B
```

Best practices focus on questions such as:

```text
When should Promise-based code be used?
How should async errors be handled?
How should asynchronous code remain readable?
How should unnecessary complexity be avoided?
```

---

# Best Practices Are Context-Dependent

A best practice is not always an absolute rule.

For example:

```js
const values = [1, 2, 3];
```

Using `const` is generally appropriate when the variable itself is not reassigned.

But this:

```js
let values = [1, 2, 3];
```

can also be correct when reassignment is intentionally required.

The goal is not to memorize rules blindly.

The goal is to understand:

```text
Why?
When?
What are the trade-offs?
```

---

# Readability

Code should communicate its purpose clearly.

Prefer:

```js
const userRole = "Frontend Developer";
```

over:

```js
const x = "Frontend Developer";
```

Prefer:

```js
function calculateTotal(price, shipping) {
  return price + shipping;
}
```

over:

```js
function calc(a, b) {
  return a + b;
}
```

Good code reduces the amount of explanation required outside the code itself.

---

# Predictability

Code should behave in ways that are easy to reason about.

Avoid unnecessary hidden behavior.

Prefer:

```js
function calculateTotal(price, shipping) {
  return price + shipping;
}
```

over functions that unexpectedly modify unrelated global state.

Predictable code is easier to:

```text
Read
Debug
Test
Refactor
Reuse
```

---

# Maintainability

Real applications change.

Code may need to support:

```text
New features
Bug fixes
New developers
New requirements
New APIs
New browser behavior
Performance improvements
Security fixes
```

Maintainable JavaScript makes these changes easier without introducing unnecessary complexity.

---

# Single Responsibility

Functions and modules should have focused responsibilities.

Instead of:

```js
function processUser() {
  // Validate user.
  // Save user.
  // Send email.
  // Update UI.
  // Log analytics.
}
```

prefer separating unrelated responsibilities:

```js
function validateUser() {
  // Validation
}

function saveUser() {
  // Persistence
}

function sendNotification() {
  // Notification
}

function updateUserInterface() {
  // UI update
}
```

The exact architecture depends on the application.

The principle is to avoid functions that accumulate unrelated responsibilities.

---

# Avoid Unnecessary Complexity

The shortest code is not automatically the best code.

This:

```js
const isActive =
  user.status === "active";
```

is often clearer than introducing unnecessary abstractions.

Avoid creating:

```text
Extra classes
Extra wrappers
Extra utilities
Extra abstractions
Extra dependencies
```

unless they solve a real problem.

---

# Prefer Simple Solutions

When two implementations solve the same problem, prefer the one that is easier to understand and maintain when there is no meaningful reason to choose the more complicated version.

Example:

```js
const total =
  price + shipping;
```

There is usually no reason to create a helper for a calculation this simple.

---

# Avoid Premature Abstraction

Repeated code does not always mean immediate abstraction is required.

Example:

```js
const firstName =
  user.firstName;

const projectName =
  project.name;
```

Two property reads do not require a generic abstraction.

Abstraction should become useful when:

```text
A pattern is stable
A behavior is repeated
The abstraction has a clear responsibility
The abstraction improves maintainability
```

---

# DRY

DRY means:

```text
Don't Repeat Yourself
```

The useful interpretation is:

> Avoid duplicating knowledge and behavior.

It does not mean:

> Every similar-looking line must be extracted into a function.

Bad abstraction can be worse than duplication.

---

# Consistency

Choose a style and use it consistently.

For example:

```js
const userName = "Osama Abu Motlaq";
const userRole = "Frontend Developer";
```

Avoid inconsistent naming such as:

```js
const user_name = "...";
const userRole = "...";
const UserCountry = "...";
```

Consistency makes large codebases easier to navigate.

---

# Explicit Code

Prefer code that makes important behavior visible.

Example:

```js
const activeUsers =
  users.filter(
    (user) =>
      user.active
  );
```

This communicates the operation clearly.

Avoid unnecessary tricks that make simple operations difficult to understand.

---

# Avoid Clever Code

Code should not try to impress the reader.

Prefer:

```js
const total =
  price + shipping;
```

over obscure expressions that produce the same result.

Clever code can increase:

```text
Cognitive load
Debugging difficulty
Maintenance cost
Onboarding time
```

---

# Comments

Comments should explain information that is not obvious from the code.

Useful:

```js
// Retry only network failures.
```

Less useful:

```js
// Add one to count.
count += 1;
```

Good code should explain most basic operations through clear naming and structure.

---

# Avoid Outdated Comments

A dangerous comment is one that no longer matches the code.

Example:

```js
// Retry the request three times.
const MAX_RETRIES = 5;
```

The code and documentation now disagree.

Prefer code that remains self-explanatory where possible.

---

# Naming

Names should communicate intent.

Prefer:

```js
const maxRetries = 3;
```

over:

```js
const x = 3;
```

Prefer:

```js
function fetchUserProfile() {}
```

over:

```js
function getData() {}
```

Good names reduce ambiguity.

---

# Variables Should Have Clear Lifetimes

Use the narrowest useful scope.

Prefer:

```js
function calculateTotal() {
  const shipping = 20;

  return 100 + shipping;
}
```

over creating unnecessary global variables:

```js
globalThis.shipping = 20;
```

Narrow scope reduces accidental dependencies.

---

# Minimize Global State

Global mutable state creates hidden dependencies.

Avoid:

```js
globalThis.user =
  {
    name: "Osama Abu Motlaq",
  };
```

when local or module-scoped state is sufficient.

Global state may be appropriate in specific architectures, but it should be intentional.

---

# Functions Should Be Focused

Prefer:

```js
function calculateTotal(
  price,
  shipping
) {
  return price + shipping;
}
```

over:

```js
function processOrder() {
  // Validate order.
  // Calculate price.
  // Update database.
  // Send email.
  // Update DOM.
  // Log analytics.
}
```

Large workflows can be composed from smaller responsibilities.

---

# Prefer Pure Functions When Appropriate

A pure function:

* Produces the same output for the same input.
* Does not modify external state.

Example:

```js
function double(number) {
  return number * 2;
}
```

Pure functions are easier to:

```text
Test
Reason about
Reuse
Compose
Debug
```

Not every function should be pure.

Side effects are necessary for:

```text
Network requests
DOM updates
Storage
Logging
Timers
User interaction
```

The goal is to keep side effects controlled and intentional.

---

# Control Side Effects

A side effect changes something outside the function's local computation.

Example:

```js
function saveUser(user) {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
}
```

The function has a side effect because it changes browser storage.

Side effects are not inherently bad.

Uncontrolled side effects are difficult to reason about.

---

# Immutability

Immutability means avoiding unnecessary direct mutation of shared data.

For arrays:

```js
const nextUsers = [
  ...users,
  newUser,
];
```

For objects:

```js
const nextUser = {
  ...user,
  role: "Frontend Developer",
};
```

Mutation can be appropriate in some contexts.

The important principle is to understand ownership and avoid unexpected shared-state changes.

---

# Choose Data Structures Intentionally

Use the structure that matches the problem.

```text
Array
→ Ordered collection

Set
→ Unique values

Map
→ Key-value relationships

Object
→ Structured records / properties

WeakMap
→ Object-associated metadata with weak keys
```

Do not choose a structure only because it is familiar.

---

# Error Handling

Errors should be handled intentionally.

Avoid:

```js
try {
  riskyOperation();
} catch {
}
```

unless silently ignoring the error is genuinely correct.

Prefer:

```js
try {
  riskyOperation();
} catch (error) {
  console.error(
    "Operation failed:",
    error
  );
}
```

The appropriate recovery strategy depends on the operation.

---

# Do Not Hide Errors

Bad:

```js
try {
  await loadData();
} catch {
  return null;
}
```

when the caller needs to know that the operation failed.

Better:

```js
try {
  return await loadData();
} catch (error) {
  console.error(
    "Failed to load data:",
    error
  );

  throw error;
}
```

Do not suppress information that the rest of the application needs.

---

# Async Code Should Be Clear

Prefer:

```js
async function loadProfile() {
  const response =
    await fetch(
      "/api/profile"
    );

  return response.json();
}
```

when sequential logic is genuinely sequential.

Avoid deeply nested Promise chains when `async` / `await` makes the flow clearer.

---

# Avoid Unnecessary Sequential Awaits

If operations are independent:

```js
const user =
  await getUser();

const projects =
  await getProjects();
```

may unnecessarily serialize them.

When appropriate:

```js
const [
  user,
  projects,
] = await Promise.all([
  getUser(),
  getProjects(),
]);
```

can allow independent operations to proceed concurrently.

---

# Handle Promise Rejections

Every asynchronous operation should have an intentional failure strategy.

For example:

```js
try {
  const response =
    await fetch(
      "/api/data"
    );

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  return await response.json();
} catch (error) {
  console.error(
    "Request failed:",
    error
  );

  throw error;
}
```

---

# Cancel Work That Is No Longer Needed

For cancellable browser operations, use APIs such as:

```js
const controller =
  new AbortController();

fetch(
  "/api/data",
  {
    signal:
      controller.signal,
  }
);

controller.abort();
```

Cancellation is especially useful when:

```text
User changes search
Component unmounts
Request becomes obsolete
Navigation occurs
```

---

# Clean Up Resources

Resources should have explicit lifetimes.

Examples:

```text
addEventListener
→ removeEventListener

setInterval
→ clearInterval

setTimeout
→ clearTimeout

Observer
→ disconnect()

Request
→ abort when appropriate
```

A resource that keeps running unnecessarily can cause both bugs and memory problems.

---

# Browser Feature Detection

Do not assume every browser supports every API.

Prefer:

```js
if (
  "geolocation" in navigator
) {
  // Use geolocation.
}
```

or:

```js
if (
  "clipboard" in navigator
) {
  // Use clipboard API.
}
```

Capability detection is generally more reliable than guessing a browser from its user-agent string.

---

# Security

Never trust client-controlled input.

Validate input before using it.

Avoid:

```js
element.innerHTML =
  userInput;
```

when `userInput` is untrusted.

Prefer:

```js
element.textContent =
  userInput;
```

when plain text is intended.

---

# Avoid `eval()`

Avoid:

```js
eval(userInput);
```

Dynamic code execution creates serious security and maintainability risks.

Prefer structured data and explicit functions.

---

# Do Not Store Secrets in Browser Storage

Avoid storing sensitive secrets in:

```text
localStorage
sessionStorage
URLs
DOM attributes
client-side source code
```

Browser storage should not be treated as a secure secret vault.

---

# Performance

Do not optimize based on assumptions.

Use:

```text
Measure
Profile
Identify bottleneck
Optimize
Measure again
```

Instead of:

```text
Guess
Rewrite everything
Assume it is faster
```

---

# Avoid Unnecessary Work

Prefer:

```js
if (!items.length) {
  return;
}
```

when an early exit genuinely avoids expensive work.

Avoid repeating expensive computation when its result can safely be reused.

---

# Debounce User Input

For rapidly changing input:

```js
function debounce(
  callback,
  delay
) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

This can reduce unnecessary work from events such as search input.

---

# Throttle Frequent Events

For events that fire repeatedly:

```text
scroll
resize
pointermove
```

throttling can limit execution frequency.

Use it when the application does not need to process every event individually.

---

# Measure Memory

Memory problems should be investigated with profiling tools.

Useful techniques include:

```text
Heap snapshots
Allocation profiling
Retainer inspection
Repeated interaction tests
Performance monitoring
```

Do not assume that a suspected leak is caused by garbage collection itself.

---

# Testing

Test behavior rather than implementation details when possible.

Prefer:

```text
Given input
When action occurs
Then expected result occurs
```

Test:

```text
Normal cases
Edge cases
Failure cases
Boundary values
Important business logic
```

---

# Small Testable Functions

This:

```js
function calculateTotal(
  price,
  shipping
) {
  return price + shipping;
}
```

is easy to test.

A function that simultaneously:

```text
Reads DOM
Fetches API
Writes storage
Calculates values
Updates UI
```

is much harder to test in isolation.

Separate responsibilities when practical.

---

# Debugging

When a bug appears:

```text
Reproduce
    ↓
Reduce
    ↓
Inspect
    ↓
Form a hypothesis
    ↓
Test the hypothesis
    ↓
Fix
    ↓
Verify
```

Avoid changing many unrelated things at once.

---

# Use Stack Traces

When an exception contains a stack trace, inspect:

```text
Error type
Message
Function chain
File
Line
Column
```

The stack often tells you how execution reached the failure.

---

# Use `debugger`

For difficult runtime behavior:

```js
function calculateTotal(
  price,
  shipping
) {
  debugger;

  return price + shipping;
}
```

A breakpoint can reveal:

```text
Variables
Scope
Call stack
Execution state
```

Use debugging tools instead of relying entirely on `console.log()`.

---

# Code Organization

Organize code around meaningful responsibilities.

A small project might use:

```text
src/
├── components/
├── services/
├── utils/
└── constants/
```

A larger application may organize by feature:

```text
src/
├── features/
│   ├── users/
│   ├── projects/
│   └── auth/
├── shared/
└── services/
```

Architecture should grow with application complexity.

---

# Avoid Over-Architecture

Do not create:

```text
20 utility folders
10 abstraction layers
Multiple wrappers
Complex dependency systems
```

for a small project that does not need them.

Architecture should solve actual problems.

---

# Reusability

Reusable code should have a clear responsibility.

Good:

```js
function formatPrice(
  value
) {
  return `$${value.toFixed(2)}`;
}
```

Avoid creating abstractions that exist only because two lines happen to look similar.

---

# Composition

Prefer composing focused functions when it improves clarity.

Example:

```js
function normalizeName(
  name
) {
  return name.trim();
}

function validateName(
  name
) {
  return name.length > 0;
}

function processName(
  name
) {
  const normalized =
    normalizeName(name);

  if (
    !validateName(
      normalized
    )
  ) {
    throw new Error(
      "Invalid name."
    );
  }

  return normalized;
}
```

Each function has a focused role.

---

# Accessibility

JavaScript-driven interfaces should preserve accessibility.

Examples:

```text
Keyboard access
Focus management
Semantic HTML
Accessible form errors
Meaningful button behavior
Dialog accessibility
Screen-reader considerations
```

Do not rely entirely on mouse events.

---

# Configuration

Configuration should be separated from business logic where practical.

Example:

```js
const config = {
  apiBaseUrl:
    "/api",
  timeout: 10000,
};
```

Environment-specific values should not be hardcoded unnecessarily.

---

# Environment Variables

Sensitive server-side secrets belong in secure server-side environment configuration.

Do not assume that any variable used by a frontend build is secret.

Client-exposed configuration can be inspected by users.

This becomes especially important when working with:

```text
Next.js
Supabase
APIs
Authentication
Deployment platforms
```

---

# Modern JavaScript

Prefer modern language features when they improve clarity and are supported by your target environment.

Examples:

```text
const
let
modules
destructuring
spread
rest
optional chaining
nullish coalescing
async/await
Promise.all
private fields
modern array methods
```

Do not use a feature merely because it is new.

Use it when it makes the code clearer or more appropriate.

---

# Compatibility

Before using a browser API or language feature, consider the application's supported environments.

Questions to ask:

```text
Is it supported?
Do I need a fallback?
Do I need feature detection?
Does the build process transform it?
```

The correct answer depends on the project's browser and runtime targets.

---

# Production Readiness

Before shipping JavaScript, verify:

```text
Correctness
Error handling
Security
Performance
Cleanup
Testing
Accessibility
Configuration
Compatibility
Logging
```

The final goal is not merely:

```text
"It works on my machine."
```

The goal is:

```text
"It behaves predictably under the conditions
the application is expected to support."
```

---

# Best Practices Are Guidelines

Best practices should help you make better decisions.

They should not become rules that prevent reasonable engineering choices.

For example:

```text
"Never use mutation"
```

is too absolute.

A better principle is:

```text
Understand who owns the data,
who can observe the mutation,
and whether mutation creates
unexpected shared-state problems.
```

---

# Best Practice Decision Framework

When deciding how to write code, ask:

```text
1. Is the code correct?

2. Is the intent clear?

3. Is the behavior predictable?

4. Is the data flow understandable?

5. Are side effects controlled?

6. Are errors handled?

7. Is the code secure?

8. Is the performance appropriate?

9. Is the resource lifetime clear?

10. Is the code easy to test?

11. Will another developer understand it?

12. Does the abstraction solve a real problem?
```

---

# Relationship With the Rest of This Reference

The repository can be understood as:

```text
Fundamentals
    ↓
Learn the language

Functions
    ↓
Learn reusable behavior

Async
    ↓
Learn asynchronous execution

OOP
    ↓
Learn object-oriented patterns

ES6+
    ↓
Learn modern language features

DOM
    ↓
Interact with documents

BOM
    ↓
Interact with browser capabilities

Advanced
    ↓
Understand runtime and internals

Best Practices
    ↓
Use all of that knowledge effectively

Projects
    ↓
Apply the knowledge
```

---

# Final Principles

```text
Prefer clarity over cleverness.

Prefer simple solutions over unnecessary abstraction.

Keep responsibilities focused.

Use meaningful names.

Control side effects.

Handle errors intentionally.

Clean up long-lived resources.

Validate untrusted input.

Measure performance before optimizing.

Test important behavior.

Keep architecture proportional to project size.

Use modern JavaScript when it improves the code.

Treat security and accessibility as part of engineering quality.

Write code for the next developer who has to maintain it.
```

---

# Summary

The purpose of this section is not to provide a list of rigid rules.

It is to build engineering judgment.

Good JavaScript should be:

```text
Correct
Readable
Predictable
Maintainable
Testable
Secure
Performant
Accessible
Appropriately structured
```

The most important principle is:

```text
Understand the trade-offs,
then choose the simplest solution
that satisfies the real requirements.
```
