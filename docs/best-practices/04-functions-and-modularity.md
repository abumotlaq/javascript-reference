# Functions and Modularity

## Overview

Functions are one of the primary tools for controlling complexity in JavaScript.

A function can:

```text
Encapsulate behavior
Reduce repetition
Create an abstraction
Control side effects
Separate responsibilities
Improve testability
Improve readability
```

Modules build on top of functions by organizing related code into boundaries.

Good function and module design should make it easier to understand:

```text
What does this code do?
What does it require?
What does it return?
What does it change?
Where does this responsibility belong?
```

The goal is not to create as many functions or files as possible.

The goal is to create useful boundaries.

---

# Keep Functions Focused

A function should have a clear primary responsibility.

Prefer:

```js
function calculateTotal(price, shipping) {
  return price + shipping;
}
```

Instead of a function that:

```text
Fetches data
Validates data
Formats data
Saves data
Updates the UI
Logs information
```

all at once.

Focused functions are easier to understand and test.

---

# Single Responsibility

A useful function usually has one main reason to change.

For example:

```js
function formatUserName(user) {
  return user.name.trim();
}
```

and:

```js
function saveUser(user) {
  // ...
}
```

have separate responsibilities.

Avoid combining them:

```js
function formatAndSaveUser(user) {
  user.name = user.name.trim();

  saveUser(user);
}
```

unless that combined operation is itself a meaningful domain-level action.

---

# Responsibility Is About Cohesion

Do not interpret "single responsibility" as:

```text
One statement per function.
```

A function can contain several operations when they all belong to one cohesive responsibility.

For example:

```js
function createDisplayName(user) {
  const firstName = user.firstName.trim();
  const lastName = user.lastName.trim();

  return `${firstName} ${lastName}`;
}
```

The function performs multiple steps.

They all contribute to one responsibility:

```text
Create a display name.
```

---

# Avoid Giant Functions

Large functions are often difficult to:

```text
Understand
Test
Debug
Modify
Reuse
Review
```

A large function may contain:

```js
function processApplication() {
  // validation

  // authentication

  // data loading

  // transformation

  // calculation

  // rendering

  // logging

  // error handling
}
```

When responsibilities become independent, separate them.

---

# Extract Meaningful Functions

Instead of:

```js
function processUser(user) {
  const name = user.name.trim();
  const email = user.email.trim().toLowerCase();

  if (!email.includes("@")) {
    throw new Error(
      "Invalid email."
    );
  }

  return {
    ...user,
    name,
    email,
  };
}
```

If the logic grows, extraction can improve clarity:

```js
function normalizeUser(user) {
  return {
    ...user,
    name: normalizeName(user.name),
    email: normalizeEmail(user.email),
  };
}

function normalizeName(name) {
  return name.trim();
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
```

Do not extract functions merely because a block contains multiple lines.

Extract when the new boundary has a useful meaning.

---

# Avoid Premature Function Extraction

This can become excessive:

```js
function trimName(name) {
  return name.trim();
}
```

Calling:

```js
trimName(user.name);
```

may add no useful abstraction if the operation is trivial and used once.

Prefer direct code when it is clearer:

```js
const name = user.name.trim();
```

Abstraction should solve a problem.

---

# Function Names Should Communicate Intent

Prefer:

```js
calculateOrderTotal();
validateUser();
normalizeEmail();
saveProfile();
fetchProjects();
```

Avoid:

```js
process();
handleData();
doStuff();
run();
execute();
```

unless the context makes those names genuinely meaningful.

---

# Functions Should Have Predictable Contracts

A function contract includes:

```text
Inputs
Outputs
Side effects
Errors
Mutations
Async behavior
```

For example:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) =>
      total + item.price,
    0
  );
}
```

A caller can infer:

```text
Input:
Array of items

Output:
Number

Side effect:
None
```

The more predictable this contract is, the easier the function is to use.

---

# Make Inputs Clear

Prefer:

```js
function createUser(userData) {
  // ...
}
```

when the function expects structured user information.

Avoid overly generic parameters:

```js
function createUser(data) {
  // ...
}
```

when a more precise name is available.

---

# Use Options Objects for Many Parameters

This can become difficult to call:

```js
function createUser(
  name,
  email,
  role,
  country,
  language,
  theme
) {
  // ...
}
```

An options object makes the call clearer:

```js
function createUser({
  name,
  email,
  role,
  country,
  language,
  theme,
}) {
  // ...
}
```

Usage:

```js
createUser({
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
  role: "Frontend Developer",
  country: "Palestine",
  language: "en",
  theme: "dark",
});
```

---

# Do Not Abuse Options Objects

Options objects are not automatically better.

This:

```js
function add(a, b) {
  return a + b;
}
```

does not need:

```js
function add({
  firstNumber,
  secondNumber,
}) {
  return firstNumber + secondNumber;
}
```

Use an object when it improves clarity, especially for larger or optional parameter sets.

---

# Keep Function Parameters Reasonable

Many parameters can indicate that:

```text
The function does too much
A domain object is missing
An options object may be useful
Responsibilities are mixed
```

For example:

```js
function createUser(
  name,
  email,
  role,
  theme,
  language,
  country,
  notifications,
  avatar
) {
  // ...
}
```

may be a signal to improve the API.

---

# Parameter Order Should Be Predictable

If positional parameters are used, keep the order logical:

```js
function createUser(
  name,
  email,
  role
) {
  // ...
}
```

The call site should be easy to understand.

Do not choose parameter order arbitrarily.

---

# Avoid Boolean Parameter Confusion

This is difficult to read:

```js
createUser(
  "Osama Abu Motlaq",
  true,
  false,
  true
);
```

What do the booleans mean?

Prefer an options object:

```js
createUser({
  name: "Osama Abu Motlaq",
  isAdmin: true,
  isActive: false,
  sendWelcomeEmail: true,
});
```

The meaning is visible at the call site.

---

# Return Consistent Types

Avoid functions that unpredictably return different unrelated types:

```js
function findUser(id) {
  if (!id) {
    return false;
  }

  if (!user) {
    return null;
  }

  return user;
}
```

Prefer a consistent contract when possible:

```js
function findUser(id) {
  if (!id) {
    return null;
  }

  if (!user) {
    return null;
  }

  return user;
}
```

Now the function returns:

```text
User
or
null
```

instead of:

```text
false
null
User
```

---

# Return Values Should Be Meaningful

Prefer:

```js
function calculateTotal(items) {
  return 150;
}
```

over:

```js
function calculateTotal(items) {
  return {
    value: 150,
  };
}
```

unless the extra structure provides meaningful information.

Do not wrap simple values without a reason.

---

# Avoid Hidden Return Semantics

Be careful with functions that sometimes mutate and return something else:

```js
function updateUser(user) {
  user.name = "Osama Abu Motlaq";

  return true;
}
```

The caller must know:

```text
The input is mutated.
The return value only indicates success.
```

A clearer API may be:

```js
function updateUser(user) {
  return {
    ...user,
    name: "Osama Abu Motlaq",
  };
}
```

or an intentionally mutating API with explicit documentation.

---

# Prefer Explicit Data Flow

Good:

```js
const normalizedUser =
  normalizeUser(user);

const validatedUser =
  validateUser(normalizedUser);

saveUser(validatedUser);
```

The data flow is visible.

Less clear:

```js
normalizeUser(user);
validateUser(user);
saveUser(user);
```

when it is unclear whether those functions mutate `user`.

---

# Pure Functions

A pure function:

```text
Returns the same output for the same input.
Does not modify external state.
```

Example:

```js
function add(a, b) {
  return a + b;
}
```

Pure functions are generally easy to test and reason about.

---

# Prefer Pure Functions for Transformations

For data transformations:

```js
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
```

is usually preferable to:

```js
function normalizeUser(user) {
  user.email =
    user.email.trim().toLowerCase();
}
```

when mutation is not required.

---

# Side Effects Should Be Visible

Side effects include:

```text
Network requests
DOM manipulation
Logging
Storage writes
Timers
Database writes
Global state changes
Mutation of shared objects
```

A function that performs side effects should have a name and API that make that behavior reasonable to expect.

---

# Separate Pure Logic From Side Effects

Instead of:

```js
function calculateAndSaveTotal(order) {
  const total =
    order.items.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

  saveTotal(order.id, total);

  return total;
}
```

consider:

```js
function calculateOrderTotal(order) {
  return order.items.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );
}

function saveOrderTotal(
  orderId,
  total
) {
  // ...
}
```

Then:

```js
const total =
  calculateOrderTotal(order);

saveOrderTotal(
  order.id,
  total
);
```

The calculation can now be tested independently.

---

# Do Not Force Pure Functions Everywhere

Some functions exist specifically for side effects:

```js
function saveUser(user) {
  // ...
}
```

That is completely valid.

The goal is not to eliminate side effects.

The goal is to isolate them where practical.

---

# Command vs Query

A useful distinction is:

```text
Query:
Returns information.

Command:
Changes something.
```

Examples:

```js
getUser();
calculateTotal();
findProject();
```

are generally queries.

Examples:

```js
saveUser();
deleteProject();
updateProfile();
```

are generally commands.

A function can combine both, but doing so can make reasoning more difficult.

---

# Avoid Unexpected Command + Query Functions

Be careful with:

```js
function getUser() {
  database.incrementReadCount();

  return database.fetchUser();
}
```

The name sounds like a query, but it also mutates state.

Sometimes that behavior is necessary.

The API should make the side effect reasonable or document it clearly.

---

# Small Functions

Small functions can be useful when each function represents a meaningful operation.

Example:

```js
function normalizeName(name) {
  return name.trim();
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function normalizeUser(user) {
  return {
    ...user,
    name: normalizeName(user.name),
    email: normalizeEmail(user.email),
  };
}
```

Each function has a recognizable purpose.

---

# Short Is Not the Same as Good

A one-line function can still be confusing:

```js
function p(x) {
  return x ? a(x) : b(c(x));
}
```

A longer function with meaningful names can be easier to understand.

Optimize for clarity, not line count.

---

# Avoid Deeply Nested Functions

Avoid unnecessarily nesting functions several levels deep:

```js
function processUser(user) {
  function normalizeUser() {
    function normalizeEmail() {
      // ...
    }

    // ...
  }

  // ...
}
```

Nested functions are useful when the inner function:

```text
Is tightly coupled to the outer function
Needs access to local state
Should not be exposed elsewhere
```

Otherwise, move it to an appropriate module scope.

---

# Nested Functions Can Capture State

This is a legitimate use:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;

    return count;
  };
}
```

The inner function closes over `count`.

Here the nesting has a meaningful purpose.

---

# Closures as an Encapsulation Tool

Closures can hide implementation details:

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
    },

    getValue() {
      return count;
    },
  };
}
```

External code cannot directly access `count`.

Use closures when they create a useful boundary.

---

# Avoid Closure Overuse

Not every function needs a closure.

Avoid creating complex nested scopes merely to avoid defining a normal module-level helper.

Use the simplest abstraction that solves the problem.

---

# Function Reuse

Reuse a function when:

```text
The behavior is genuinely shared
The semantics are the same
The abstraction has a clear name
```

Do not create a generic helper only because two pieces of code happen to contain similar syntax.

---

# Similar Code Is Not Always the Same Responsibility

These may look similar:

```js
formatUserName(user);
formatProjectName(project);
```

But if the domain rules are different, forcing them into one generic helper may reduce clarity.

Duplication is sometimes preferable to the wrong abstraction.

---

# Rule of Three

A practical abstraction heuristic:

```text
First occurrence:
Write the code directly.

Second occurrence:
Look for actual similarity.

Third occurrence:
Consider extracting shared behavior.
```

This is not a strict law.

It is a way to avoid premature abstraction.

---

# Keep Abstractions Honest

Suppose two functions look similar:

```js
function formatUserName(name) {
  return name.trim();
}

function formatProjectName(name) {
  return name.trim();
}
```

A generic:

```js
function formatName(name) {
  return name.trim();
}
```

may be fine.

But if user names and project names soon require different rules, the abstraction becomes misleading.

Only share abstractions that are likely to remain semantically shared.

---

# Avoid Generic Utility Functions

Avoid broad helpers such as:

```js
function processData(data) {
  // ...
}
```

Prefer:

```js
function normalizeUser(user) {
  // ...
}
```

Specific functions are easier to understand and reuse correctly.

---

# Functions Should Not Know Too Much

A function should avoid reaching through many layers of unrelated structures.

Weak:

```js
function getUserCity(order) {
  return order.customer.account.profile.address.city;
}
```

This tightly couples the function to the entire object structure.

Prefer domain-oriented operations:

```js
function getCustomerCity(customer) {
  return customer.address.city;
}
```

or redesign the data boundary when necessary.

---

# Law of Demeter

A useful guideline is to avoid excessive chains through unrelated objects:

```js
order.customer.account.profile.address.city
```

Long chains often indicate:

```text
Tight coupling
Leaky abstractions
Fragile data structures
```

Do not apply this mechanically, but use it as a design warning.

---

# Avoid Functions With Too Many Responsibilities

This:

```js
async function submitForm() {
  validateForm();
  collectFormData();
  saveLocalStorage();
  fetchUser();
  transformResponse();
  updateDOM();
  showNotification();
  sendAnalytics();
}
```

may work.

But it mixes multiple responsibilities.

A coordinator can be acceptable:

```js
async function submitForm() {
  const formData =
    collectFormData();

  validateForm(formData);

  const result =
    await saveForm(formData);

  renderSuccess(result);

  showNotification();
}
```

The coordinator orchestrates.

The individual operations own their specific responsibilities.

---

# Orchestration Functions

Some functions legitimately coordinate multiple operations.

Example:

```js
async function createAccount(userData) {
  const validatedUser =
    validateUser(userData);

  const user =
    await saveUser(validatedUser);

  await sendWelcomeEmail(user);

  return user;
}
```

This function has a high-level responsibility:

```text
Create an account.
```

The smaller functions perform the details.

---

# Keep Orchestration High-Level

A good coordinator should describe the flow without implementing every low-level detail.

Prefer:

```js
async function createAccount(userData) {
  const user =
    await prepareUser(userData);

  await saveUser(user);

  await sendWelcomeEmail(user);

  return user;
}
```

rather than putting all validation, formatting, persistence, and email implementation in one function.

---

# Function Composition

Functions can be combined to build higher-level operations.

Example:

```js
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isValidEmail(email) {
  return email.includes("@");
}

function prepareEmail(email) {
  const normalizedEmail =
    normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error(
      "Invalid email."
    );
  }

  return normalizedEmail;
}
```

Each function contributes one step.

---

# Avoid Excessive Composition

A chain of ten tiny functions may be harder to understand than one clear function.

For example:

```js
step1(
  step2(
    step3(
      step4(
        value
      )
    )
  )
);
```

Do not create abstractions merely to make functions composable.

Composition should improve readability.

---

# Use Function Pipelines Carefully

If a pipeline is easier to read:

```js
const normalizedEmail =
  normalizeEmail(rawEmail);

const validatedEmail =
  validateEmail(normalizedEmail);
```

this may be clearer than:

```js
const result =
  validateEmail(
    normalizeEmail(rawEmail)
  );
```

Choose the form that best exposes the data flow.

---

# Avoid Excessive Nesting in Arguments

This:

```js
saveUser(
  normalizeUser(
    validateUser(
      parseUser(
        rawData
      )
    )
  )
);
```

can become difficult to debug.

Prefer named stages:

```js
const parsedUser =
  parseUser(rawData);

const validatedUser =
  validateUser(parsedUser);

const normalizedUser =
  normalizeUser(validatedUser);

saveUser(normalizedUser);
```

The intermediate variables create useful debugging points.

---

# Functions Should Fail Clearly

When a function cannot perform its intended operation, its failure behavior should be predictable.

Possible strategies include:

```text
Return null
Return a result object
Throw an Error
Reject a Promise
```

Pick a strategy that fits the API.

Do not mix unrelated failure conventions without reason.

---

# Do Not Swallow Errors

Avoid:

```js
try {
  saveUser(user);
} catch {
}
```

This hides failure.

At minimum, handle the error meaningfully:

```js
try {
  saveUser(user);
} catch (error) {
  console.error(error);
}
```

Or let an appropriate higher-level layer handle it.

---

# Async Functions

Use `async` when the function naturally works with asynchronous operations.

```js
async function fetchUser(id) {
  const response =
    await fetch(`/api/users/${id}`);

  return response.json();
}
```

The contract is:

```text
Returns a Promise.
```

Callers should understand that.

---

# Keep Async Functions Structured

Prefer:

```js
async function loadProfile(id) {
  const user =
    await fetchUser(id);

  const projects =
    await fetchProjects(id);

  return {
    user,
    projects,
  };
}
```

over mixing nested callbacks and unrelated asynchronous techniques.

---

# Avoid Unnecessary `async`

Do not add `async` when it provides no semantic value.

For example:

```js
async function getValue() {
  return 10;
}
```

returns a Promise.

If a synchronous return is required, use:

```js
function getValue() {
  return 10;
}
```

Use `async` intentionally.

---

# Keep Functions Deterministic When Practical

A function is easier to reason about when:

```text
Input
  ↓
Predictable transformation
  ↓
Output
```

Avoid unnecessary dependencies on:

```text
Current time
Randomness
Global variables
Hidden mutable state
External services
```

when the function does not need them.

---

# Dependency Injection

A function can be easier to test when its dependencies are passed explicitly.

Instead of:

```js
function saveUser(user) {
  database.save(user);
}
```

consider:

```js
function saveUser(
  user,
  database
) {
  database.save(user);
}
```

This can make dependencies visible and testable.

Do not introduce dependency injection everywhere by default.

Use it when hidden dependencies create real problems.

---

# Hidden Dependencies

This function has an implicit dependency:

```js
function getUserName() {
  return currentUser.name;
}
```

The function depends on external state.

A clearer contract is:

```js
function getUserName(user) {
  return user.name;
}
```

The dependency becomes explicit.

---

# Global State and Functions

Avoid functions that silently depend on mutable globals:

```js
let currentUser = null;

function getUserRole() {
  return currentUser.role;
}
```

Prefer:

```js
function getUserRole(user) {
  return user.role;
}
```

when there is no reason to hide the dependency.

---

# Function Boundaries and Testing

Focused functions are easier to test.

For example:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) =>
      total + item.price,
    0
  );
}
```

A test can provide:

```js
const items = [
  { price: 10 },
  { price: 20 },
];
```

and verify:

```text
Expected:
30
```

No DOM, network, or database is required.

---

# Test Side Effects at Their Boundaries

If a function performs network I/O:

```js
async function fetchUser(id) {
  const response =
    await fetch(`/api/users/${id}`);

  return response.json();
}
```

test it separately from pure transformations.

This keeps tests focused.

---

# Functions and Error Boundaries

Do not make every function responsible for handling every possible error.

A low-level function may throw:

```js
function parseUser(data) {
  if (!data) {
    throw new Error(
      "User data is required."
    );
  }

  return data;
}
```

A higher-level boundary can decide how to present or recover from the error.

---

# Module Responsibilities

A module should contain closely related responsibilities.

For example:

```text
user/
  validation.js
  formatting.js
  service.js
```

rather than one massive:

```text
everything.js
```

The exact structure depends on project size.

---

# Avoid One-Function-Per-File Rules

Do not create:

```text
get-user.js
format-user.js
validate-user.js
```

just because every function is technically separate.

If several functions form one coherent module, grouping them can be better:

```text
user-utils.js
```

The module boundary should have meaning.

---

# Modules Should Have Clear Public APIs

Example:

```js
export function createUser() {
  // ...
}

export function updateUser() {
  // ...
}
```

Keep internal helpers private when they are not part of the module's public contract:

```js
function normalizeUser() {
  // ...
}

export function createUser(user) {
  return normalizeUser(user);
}
```

This limits the surface area other code depends on.

---

# Prefer Named Exports for Discoverability

For many utility or feature modules:

```js
export function formatDate() {}

export function parseDate() {}
```

can make the module API explicit.

Default exports can also be appropriate.

The important point is to choose a consistent strategy.

---

# Avoid Exporting Everything

Do not do:

```js
export function internalStepOne() {}
export function internalStepTwo() {}
export function internalStepThree() {}
export function publicOperation() {}
```

if only one function is intended for consumers.

Keep implementation details private.

---

# Small Public APIs

Suppose a module contains:

```js
function normalizeUser() {}
function validateUser() {}
function saveUser() {}

export {
  saveUser,
};
```

The consumer only depends on the operation it actually needs.

Small APIs reduce coupling.

---

# Avoid Circular Dependencies

A circular dependency occurs when:

```text
Module A
   ↓
Module B
   ↓
Module A
```

For example:

```js
// user.js
import { getProject } from "./project.js";
```

and:

```js
// project.js
import { getUser } from "./user.js";
```

Circular dependencies can create initialization problems and confusing architecture.

When they appear, reconsider the module boundaries.

---

# Shared Dependencies

If two modules depend on the same concept, a third focused module can sometimes remove the cycle:

```text
user.js ──────┐
              ↓
shared.js
              ↑
project.js ───┘
```

Do not create a generic "shared" module as a dumping ground.

The shared module should contain a coherent abstraction.

---

# Avoid Barrel Modules Without a Reason

A barrel module re-exports many modules:

```js
export * from "./user.js";
export * from "./project.js";
export * from "./auth.js";
```

This can be convenient.

But excessive barrels can:

```text
Hide dependency origins
Create circular dependencies
Make module boundaries less obvious
```

Use them deliberately.

---

# File Size Is Not the Primary Goal

Do not split files purely because they exceed an arbitrary line count.

A 300-line cohesive module may be easier to understand than ten fragmented files.

Split when:

```text
Responsibilities differ
Public API differs
Dependencies differ
Testing boundaries differ
The module becomes difficult to navigate
```

---

# Module Cohesion

A cohesive module contains things that naturally belong together.

Example:

```text
date/
  formatDate.js
  parseDate.js
  compareDates.js
```

These functions share a domain.

Unrelated functions should not be grouped merely because they are all "utilities."

---

# Coupling

Coupling describes how strongly modules depend on each other.

High coupling:

```text
Module A
depends on
Module B
depends on
Module C
depends on
Module D
```

A change in one area may force changes elsewhere.

Good module design aims for:

```text
High cohesion
Low unnecessary coupling
```

---

# Do Not Over-Abstract Module Boundaries

A project does not need:

```text
domain/
application/
infrastructure/
adapters/
services/
repositories/
factories/
ports/
```

for every small application.

Architecture should match project complexity.

For many JavaScript projects, a simple feature-oriented structure is enough.

---

# Organize by Feature When Appropriate

Instead of:

```text
components/
services/
utils/
api/
```

for every feature, larger projects may benefit from:

```text
users/
  components/
  services/
  utils/

projects/
  components/
  services/
  utils/
```

This keeps related code closer together.

---

# Keep Domain Logic Away From UI When Possible

Avoid putting substantial business logic directly into UI event handlers.

Instead of:

```js
button.addEventListener(
  "click",
  () => {
    const total =
      cart.items.reduce(
        (sum, item) =>
          sum + item.price,
        0
      );

    // more business logic...
  }
);
```

extract the domain operation:

```js
function calculateCartTotal(cart) {
  return cart.items.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );
}

button.addEventListener(
  "click",
  () => {
    const total =
      calculateCartTotal(cart);

    // UI behavior...
  }
);
```

---

# Keep DOM Code at the Boundary

A useful structure is:

```text
DOM Event
   ↓
Application Function
   ↓
Domain Logic
   ↓
Result
   ↓
DOM Update
```

Example:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) =>
      total + item.price,
    0
  );
}

button.addEventListener(
  "click",
  () => {
    const total =
      calculateTotal(cartItems);

    totalElement.textContent =
      String(total);
  }
);
```

The calculation does not know about the DOM.

---

# Separate Data Access From Transformation

Instead of:

```js
async function getUserDisplayName(id) {
  const response =
    await fetch(`/api/users/${id}`);

  const user =
    await response.json();

  return user.name.trim();
}
```

this may be better when the transformation is reusable:

```js
async function fetchUser(id) {
  const response =
    await fetch(`/api/users/${id}`);

  return response.json();
}

function getDisplayName(user) {
  return user.name.trim();
}
```

Then:

```js
const user =
  await fetchUser(id);

const displayName =
  getDisplayName(user);
```

---

# Keep I/O at the Edges

I/O includes:

```text
HTTP
Database
Filesystem
DOM
Storage
Clipboard
Geolocation
Timers
```

Pure business logic is often easier to maintain when these operations are separated from calculations and transformations.

---

# Do Not Create a Service Layer Automatically

A simple application may need only:

```text
components/
utils/
api/
```

Do not create:

```text
services/
repositories/
factories/
adapters/
```

unless the complexity requires them.

Architecture should follow actual problems.

---

# Avoid God Modules

A "god module" handles almost everything:

```text
Authentication
Users
Projects
Payments
Formatting
Networking
Logging
Configuration
```

This creates tight coupling.

Split the module when responsibilities become independently meaningful.

---

# Avoid Circular Responsibility

A function should not constantly call another function that calls back into the first concept.

For example:

```text
User service
   ↓
Project service
   ↓
User service
```

This can indicate poorly defined ownership.

Clarify which module owns the shared operation.

---

# Separate Policy From Mechanism

For example:

```js
function calculateRetryCount(
  attempts
) {
  return Math.min(
    attempts + 1,
    3
  );
}
```

contains policy.

A lower-level function can perform the actual retry:

```js
async function retryRequest(
  request,
  retryCount
) {
  // ...
}
```

Separating policy from mechanism can make both easier to test and change.

---

# Avoid Abstractions That Hide Simple Code

Bad:

```js
const result =
  executeTransformationPipeline(
    createTransformation(
      normalizeStrategy,
      formatStrategy
    ),
    user
  );
```

when the actual operation is simply:

```js
const result =
  normalizeUser(user);
```

Abstraction is useful only when it improves the design.

---

# Functions as Contracts

A well-designed function communicates:

```text
Name
Parameters
Return value
Side effects
Errors
Mutability
Async behavior
```

Example:

```js
async function fetchUser(id) {
  const response =
    await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch user."
    );
  }

  return response.json();
}
```

A caller can infer:

```text
Input:
id

Returns:
Promise<User>

Side effects:
Network request

Failure:
Throws when the response is not successful
```

---

# Keep Functions at One Abstraction Level

Avoid mixing high-level operations with low-level implementation details.

Weak:

```js
function createAccount(userData) {
  validateUser(userData);

  const query =
    "INSERT INTO users (...) VALUES (...)";

  database.execute(query);

  emailClient.send(
    userData.email
  );

  updateButtonText();
}
```

This mixes:

```text
Validation
Database
Email
UI
```

A cleaner coordinator:

```js
async function createAccount(userData) {
  const user =
    validateUser(userData);

  const savedUser =
    await saveUser(user);

  await sendWelcomeEmail(
    savedUser
  );

  return savedUser;
}
```

The lower-level details remain behind their own APIs.

---

# Abstraction Levels

A function should generally speak at one level.

High level:

```js
createAccount();
```

Medium level:

```js
validateUser();
saveUser();
sendWelcomeEmail();
```

Low level:

```js
database.execute();
```

Mixing all three levels in one function makes the code harder to scan.

---

# Refactoring Toward Better Boundaries

When a function grows, ask:

```text
Which statements form one meaningful operation?

Which variables are only used by one section?

Which blocks have their own vocabulary?

Which parts could be tested independently?

Which side effects can be moved outward?

Which dependencies belong elsewhere?
```

Use these answers to choose boundaries.

---

# Avoid Mechanical Extraction

Do not turn:

```js
const trimmedName =
  user.name.trim();
```

into:

```js
function trimUserName(name) {
  return name.trim();
}
```

unless the abstraction provides real value.

Extraction should improve:

```text
Meaning
Reuse
Testing
Isolation
Readability
```

at least one of these.

---

# Reuse Through Composition

Instead of large generic helpers:

```js
function processEverything() {
  // ...
}
```

compose small domain operations:

```js
const normalizedUser =
  normalizeUser(user);

const validatedUser =
  validateUser(normalizedUser);

const result =
  saveUser(validatedUser);
```

Each operation remains independently understandable.

---

# Modules Should Hide Details

Suppose:

```js
// user-service.js

function normalizeUser(user) {
  // ...
}

function validateUser(user) {
  // ...
}

export function createUser(user) {
  const normalized =
    normalizeUser(user);

  validateUser(normalized);

  return saveUser(normalized);
}
```

Consumers do not need to know how normalization works.

The module exposes the useful operation.

---

# Encapsulation Through Modules

ES modules naturally provide scope:

```js
const cache = new Map();

function getCachedUser(id) {
  return cache.get(id);
}

export function getUser(id) {
  return getCachedUser(id);
}
```

`cache` and `getCachedUser()` are not exposed.

The module controls its internal implementation.

---

# Do Not Export Internal State

Avoid:

```js
export const users = [];
```

when consumers should not directly modify the collection.

Prefer:

```js
const users = [];

export function getUsers() {
  return [...users];
}

export function addUser(user) {
  users.push(user);
}
```

The module owns the state.

---

# Public API Design

A good public API should be:

```text
Small
Predictable
Meaningful
Stable
Consistent
```

Avoid exposing implementation details that consumers do not need.

---

# Avoid Leaky Abstractions

A leaky abstraction forces consumers to understand internal implementation details.

For example:

```js
userService.getDatabaseConnection().query(...);
```

The caller now needs to know that `userService` uses a database connection directly.

A cleaner abstraction may be:

```js
userService.findUserById(id);
```

The implementation remains behind the module boundary.

---

# Do Not Hide Important Semantics

Abstraction can also become too opaque.

Avoid a function such as:

```js
processUser();
```

that secretly:

```text
Validates
Saves
Sends emails
Updates UI
Writes logs
```

A high-level function can orchestrate these operations, but its name should accurately describe the overall behavior.

---

# Function and Module Documentation

Document non-obvious contracts.

For example:

```js
/**
 * Returns a new user object.
 * Does not mutate the input.
 */
function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim(),
  };
}
```

Documentation is especially useful when behavior is not obvious from the signature.

---

# Functions and Type Information

Even in JavaScript, names and documentation can communicate expected types:

```js
/**
 * @param {number[]} values
 * @returns {number}
 */
function calculateTotal(values) {
  return values.reduce(
    (sum, value) =>
      sum + value,
    0
  );
}
```

Clear contracts can prevent misuse.

---

# Avoid Overengineering Function Contracts

Do not add elaborate runtime validation to every small internal function.

Use stronger validation at:

```text
External boundaries
Public APIs
User input
Network responses
Database boundaries
```

Internal functions can often rely on established invariants.

---

# Validate at Boundaries

For example:

```js
function createUserFromRequest(requestData) {
  const user =
    validateUserInput(requestData);

  return createUser(user);
}
```

After validation, lower-level functions can work with the expected shape.

This reduces repeated checks.

---

# Do Not Duplicate Validation Everywhere

Avoid:

```js
validateUser(user);
saveUser(user);

validateUser(user);
sendWelcomeEmail(user);

validateUser(user);
updateProfile(user);
```

if the application already guarantees that the relevant boundary validates the data.

Validation should have clear ownership.

---

# Functions and Invariants

An invariant is a condition that should remain true.

For example:

```text
A user must always have an email address.
```

A function can establish that invariant:

```js
function validateUser(user) {
  if (!user.email) {
    throw new Error(
      "Email is required."
    );
  }

  return user;
}
```

After successful validation, downstream code can rely on the invariant.

---

# Modules Can Own Invariants

A module can keep state valid by controlling how it changes.

Example:

```js
class UserStore {
  #users = [];

  addUser(user) {
    if (!user.email) {
      throw new Error(
        "Email is required."
      );
    }

    this.#users.push(user);
  }
}
```

The store owns the rule.

---

# Modularity and Refactoring

Good module boundaries make refactoring safer because changes remain localized.

If formatting logic is isolated:

```js
formatDate();
```

you can change the implementation without modifying every caller.

This is one reason abstractions should represent stable concepts rather than temporary implementation details.

---

# Avoid Premature Architecture

Do not start a small project with a complicated hierarchy:

```text
domain/
application/
infrastructure/
repositories/
services/
factories/
adapters/
ports/
use-cases/
```

unless the project actually requires those boundaries.

Start simple.

Refactor when complexity creates a real need.

---

# Complexity Should Drive Modularity

A reasonable progression can be:

```text
Small project
    ↓
Simple modules
    ↓
Growing responsibilities
    ↓
Feature boundaries
    ↓
Explicit domain boundaries
```

Do not design a large architecture for a problem that does not exist.

---

# Practical Function Checklist

Before finalizing a function, ask:

```text
[ ] Does it have one clear primary responsibility?

[ ] Is the name accurate?

[ ] Are the parameters meaningful?

[ ] Are there too many parameters?

[ ] Is the return value predictable?

[ ] Are side effects visible?

[ ] Does it mutate inputs?

[ ] Does it depend on hidden global state?

[ ] Could the logic be tested independently?

[ ] Is the abstraction actually useful?

[ ] Is the function at one abstraction level?

[ ] Is the implementation more complicated than necessary?
```

---

# Practical Module Checklist

Before creating or splitting a module, ask:

```text
[ ] Does this code belong together conceptually?

[ ] Does the module have a clear responsibility?

[ ] Is the public API small?

[ ] Are implementation details private?

[ ] Are the exports intentional?

[ ] Does the module depend unnecessarily on others?

[ ] Is there a circular dependency?

[ ] Does the module expose mutable internal state?

[ ] Is the file split because of real responsibility,
    or merely because it is long?

[ ] Would the module still make sense after refactoring?
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text
Keep functions focused.

Use names that describe behavior.

Prefer explicit data flow.

Keep side effects visible.

Prefer pure functions for transformations.

Do not force purity where mutation is simpler.

Avoid excessive parameters.

Use objects when named options improve clarity.

Avoid premature abstraction.

Avoid generic helper functions.

Extract code when the new function has a meaningful role.

Keep modules cohesive.

Keep public APIs small.

Hide implementation details.

Avoid exposing mutable internal state.

Avoid circular dependencies.

Keep functions at a consistent abstraction level.

Let project complexity determine architecture.
```

---

# Final Principles

```text
A function is a boundary.

A module is a boundary.

Good boundaries reduce cognitive load.

Functions should have clear contracts.

Modules should have clear responsibilities.

Abstraction should communicate meaning.

Reuse should follow semantic similarity,
not merely textual similarity.

Side effects should be visible.

Shared state should have clear ownership.

Public APIs should remain small.

Implementation details should remain private.

Complexity should drive modularity.

Simple code is preferable to unnecessary architecture.
```

---

# Summary

Good function and module design is not about breaking code into the smallest possible pieces.

It is about creating boundaries that make the system easier to understand and change.

A useful mental model is:

```text
Clear responsibility
        +
Explicit inputs
        +
Predictable outputs
        +
Controlled side effects
        +
Cohesive modules
        +
Small public APIs
        =
Maintainable JavaScript
```

The most important question is not:

```text
"Can this code be extracted?"
```

It is:

```text
"Does extracting this code create a better boundary?"
```

Use functions and modules to control complexity, not to create complexity.
