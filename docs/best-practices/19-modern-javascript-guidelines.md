# Modern JavaScript Guidelines

## Overview

Modern JavaScript is not defined by using the newest syntax everywhere.

Good modern JavaScript combines:

* Current language features
* Clear semantics
* Stable browser and runtime behavior
* Explicit data flow
* Maintainable abstractions
* Appropriate performance
* Strong error handling
* Secure defaults
* Compatibility with project requirements

A modern codebase should use language features because they improve correctness, readability, maintainability, or expressiveness.

Do not adopt syntax simply because it is new.

---

## 1. Prefer `const` by Default

Use `const` when a variable does not need reassignment.

```js
const name = "Osama Abu Motlaq";
const age = 25;
```

Use `let` when reassignment is actually required:

```js
let count = 0;

count += 1;
```

Avoid using `let` simply because it is familiar.

---

## 2. Avoid `var`

Prefer:

```js
const userName = "Osama Abu Motlaq";
```

or:

```js
let count = 0;
```

instead of:

```js
var userName = "Osama Abu Motlaq";
```

`let` and `const` provide block scope and clearer reassignment semantics.

---

## 3. Understand Reassignment vs Mutation

`const` prevents reassignment of the binding:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

This is invalid:

```js
user = {};
```

But the object itself can still be mutated:

```js
user.name = "Osama Abu Motlaq";
```

Modern code should distinguish:

```text
Binding immutability
vs
Object immutability
```

---

## 4. Prefer Immutable Data Transformations

Prefer:

```js
const updatedUser = {
  ...user,
  name: "Osama Abu Motlaq"
};
```

over:

```js
user.name = "Osama Abu Motlaq";
```

when shared state or predictable data flow matters.

Immutability is especially useful in state-driven systems.

---

## 5. Use Object Spread for Shallow Copies

Example:

```js
const updatedUser = {
  ...user,
  active: true
};
```

This creates a new object.

Remember that spread is shallow.

Nested objects remain shared references:

```js
const copy = {
  ...user
};

copy.profile.name = "Osama Abu Motlaq";
```

The nested `profile` may still be the same object.

---

## 6. Use Array Spread for New Arrays

Prefer:

```js
const nextUsers = [
  ...users,
  newUser
];
```

instead of:

```js
users.push(newUser);
```

when you want to preserve the original array.

---

## 7. Use Modern Non-Mutating Array Methods

Modern JavaScript provides methods such as:

```js
const sortedUsers =
  users.toSorted(
    (a, b) => a.name.localeCompare(b.name)
  );
```

instead of:

```js
const sortedUsers = [...users].sort(
  (a, b) => a.name.localeCompare(b.name)
);
```

Also available:

```js
const reversed = values.toReversed();
const replaced = values.with(0, "new value");
```

Use these methods when their semantics make the code clearer.

---

## 8. Prefer `map`, `filter`, and `find` for Transformations

Use:

```js
const names = users.map(
  (user) => user.name
);
```

instead of manually constructing the array:

```js
const names = [];

for (const user of users) {
  names.push(user.name);
}
```

The higher-level operation communicates intent directly.

---

## 9. Use `for...of` for Sequential Processing

When an operation is procedural or asynchronous:

```js
for (const user of users) {
  await processUser(user);
}
```

This is often clearer than trying to force the work into `map()`.

Do not use `map()` when you are ignoring the resulting array.

---

## 10. Do Not Use `forEach` for `await`

Avoid:

```js
users.forEach(async (user) => {
  await processUser(user);
});
```

The outer code does not wait for those asynchronous callbacks.

Prefer:

```js
for (const user of users) {
  await processUser(user);
}
```

or concurrent processing:

```js
await Promise.all(
  users.map(processUser)
);
```

Choose according to dependency and concurrency requirements.

---

## 11. Prefer Optional Chaining for Valid Optional Access

Instead of:

```js
const name =
  user &&
  user.profile &&
  user.profile.name;
```

use:

```js
const name =
  user?.profile?.name;
```

This is clearer when missing values are valid.

---

## 12. Do Not Use Optional Chaining to Hide Bugs

This:

```js
user?.profile?.name
```

should not automatically replace:

```js
user.profile.name
```

when the application requires all three values to exist.

Optional chaining should represent valid optionality.

It should not silently hide invalid state.

---

## 13. Prefer Nullish Coalescing for Missing Values

Use:

```js
const theme =
  user.theme ?? "light";
```

when only `null` and `undefined` should trigger the fallback.

This differs from:

```js
const theme =
  user.theme || "light";
```

because `||` also treats values such as:

```text
0
false
""
NaN
```

as falsy.

---

## 14. Choose `||` and `??` Based on Semantics

Use `||` when any falsy value should trigger fallback:

```js
const label =
  input || "Unknown";
```

Use `??` when only missing values should trigger fallback:

```js
const count =
  input ?? 0;
```

The distinction should be intentional.

---

## 15. Use Logical Assignment Carefully

Modern JavaScript provides:

```js
value ??= defaultValue;
```

```js
value ||= fallbackValue;
```

```js
value &&= replacement;
```

Choose the operator based on the actual condition.

For example:

```js
config.timeout ??= 5000;
```

means:

```text
Assign only when timeout is nullish.
```

---

## 16. Avoid Clever Logical Expressions

This:

```js
isReady && start();
```

can be concise, but do not use logical operators as a substitute for readable control flow when the behavior becomes complicated.

Prefer:

```js
if (isReady) {
  start();
}
```

when the condition represents meaningful control flow.

---

## 17. Use Destructuring When It Improves Readability

Example:

```js
const {
  name,
  email
} = user;
```

This can make repeated property access clearer.

Do not destructure simply because the syntax exists.

---

## 18. Do Not Over-Destructure

This may reduce readability:

```js
const {
  data: {
    user: {
      profile: {
        settings: {
          theme
        }
      }
    }
  }
} = response;
```

If the structure is deeply nested, explicit access or intermediate variables may be clearer.

---

## 19. Destructure Function Parameters for Clear Contracts

Example:

```js
function createUser({
  name,
  email,
  role = "user"
}) {
  return {
    name,
    email,
    role
  };
}
```

The parameter contract is visible.

---

## 20. Use Default Parameters

Prefer:

```js
function greet(
  name = "Osama Abu Motlaq"
) {
  return `Hello, ${name}`;
}
```

over manually checking:

```js
function greet(name) {
  if (name === undefined) {
    name = "Osama Abu Motlaq";
  }

  return `Hello, ${name}`;
}
```

Default parameters communicate intent directly.

---

## 21. Understand Default Parameter Semantics

A default parameter is used when the argument is `undefined`:

```js
function test(value = 10) {
  return value;
}

test();
test(undefined);
```

Both use `10`.

But:

```js
test(null);
```

returns `null`.

Choose defaults based on actual input semantics.

---

## 22. Use Rest Parameters for Variadic Functions

Prefer:

```js
function sum(...values) {
  return values.reduce(
    (total, value) => total + value,
    0
  );
}
```

over older `arguments`-based patterns.

Rest parameters produce a real array.

---

## 23. Use Spread for Composition

Example:

```js
const values = [1, 2, 3];

const allValues = [
  0,
  ...values,
  4
];
```

Object spread:

```js
const nextConfig = {
  ...config,
  timeout: 5000
};
```

Spread is useful for creating new structures, but remember its shallow behavior.

---

## 24. Do Not Confuse Spread With Deep Cloning

This:

```js
const copy = {
  ...original
};
```

does not recursively clone nested objects.

Use a deliberate deep-copy strategy only when the data model requires it.

---

## 25. Use `structuredClone` When Deep Cloning Is Actually Required

Example:

```js
const cloned = structuredClone(
  original
);
```

This is useful for many structured data types.

However, cloning is not automatically the correct solution.

Often the better design is to avoid needing a deep clone in the first place.

---

## 26. Prefer Template Literals

Instead of:

```js
const message =
  "Hello, " +
  name +
  "!";
```

prefer:

```js
const message =
  `Hello, ${name}!`;
```

Template literals are especially useful for readable strings containing expressions.

---

## 27. Do Not Use Template Literals Where a Normal String Is Clearer

This:

```js
const name = "Osama Abu Motlaq";
```

is clearer than:

```js
const name = `${"Osama Abu Motlaq"}`;
```

Use syntax because it improves the code.

---

## 28. Prefer Object Property Shorthand

Instead of:

```js
const user = {
  name: name,
  email: email
};
```

use:

```js
const user = {
  name,
  email
};
```

When the property and variable names are identical, shorthand improves readability.

---

## 29. Use Method Shorthand

Instead of:

```js
const user = {
  greet: function () {
    return "Hello";
  }
};
```

use:

```js
const user = {
  greet() {
    return "Hello";
  }
};
```

This syntax is concise and idiomatic.

---

## 30. Use Computed Property Names When Necessary

Example:

```js
const field = "email";

const user = {
  [field]: "osama@example.com"
};
```

This is appropriate when the property name is dynamically determined.

Do not use computed properties when a normal property name is clearer.

---

## 31. Prefer `Object.fromEntries` for Key-Value Transformation

Example:

```js
const entries = [
  ["name", "Osama Abu Motlaq"],
  ["role", "developer"]
];

const user =
  Object.fromEntries(entries);
```

This can be cleaner than manually assigning each property.

---

## 32. Use `Object.entries` for Explicit Object Iteration

Example:

```js
for (const [key, value] of Object.entries(config)) {
  console.log(key, value);
}
```

This clearly communicates that both property names and values matter.

---

## 33. Use `Object.keys` When Only Keys Matter

```js
for (const key of Object.keys(config)) {
  console.log(key);
}
```

Do not create entries when the values are irrelevant.

---

## 34. Use `Object.values` When Only Values Matter

```js
const values =
  Object.values(config);
```

Choose the operation that reflects the actual requirement.

---

## 35. Prefer `Map` for Dynamic Keyed Collections

Use `Map` when you need a collection of arbitrary keys:

```js
const users = new Map();

users.set(
  1,
  "Osama Abu Motlaq"
);

users.get(1);
```

Do not automatically use plain objects for every key-value problem.

---

## 36. Prefer `Set` for Uniqueness

Example:

```js
const skills = new Set([
  "JavaScript",
  "React",
  "JavaScript"
]);
```

Now:

```js
skills.size;
```

is `2`.

Use the data structure that matches the requirement.

---

## 37. Use Weak Collections for Object-Keyed Ephemeral Data

Example:

```js
const metadata = new WeakMap();

metadata.set(
  object,
  {
    processed: true
  }
);
```

Weak collections can be useful when metadata should not keep an object alive solely because of the metadata relationship.

---

## 38. Use Symbols for Genuine Unique Keys

Example:

```js
const internalId =
  Symbol("internalId");

const user = {
  [internalId]: 123
};
```

Symbols can avoid accidental property-name collisions.

Do not use them merely because they are unfamiliar or modern.

---

## 39. Use Iterables Intentionally

Modern JavaScript supports iteration through protocols such as:

```text
Symbol.iterator
for...of
spread
Array.from
```

Example:

```js
const values = new Set([
  1,
  2,
  3
]);

for (const value of values) {
  console.log(value);
}
```

Use iterables when they naturally represent the data.

---

## 40. Prefer `for...of` Over Manual Iterator Control

Avoid manually calling:

```js
const iterator =
  values[Symbol.iterator]();

iterator.next();
```

unless implementing or debugging iterator behavior.

Use:

```js
for (const value of values) {
  // ...
}
```

for normal iteration.

---

## 41. Use Generators for Lazy Sequences When Appropriate

Example:

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

Consume:

```js
for (const number of numbers()) {
  console.log(number);
}
```

Generators can represent lazy or incremental computation.

Do not use them when a normal function or array is simpler.

---

## 42. Use `Array.from` for Iterable Conversion

Example:

```js
const values =
  Array.from(new Set([1, 2, 2, 3]));
```

This is useful when an iterable needs array methods.

---

## 43. Prefer Native APIs Over Manual Reinvention

Modern JavaScript provides many built-in tools.

Examples include:

```text
Object.hasOwn
structuredClone
Array.isArray
Number.isNaN
Number.isFinite
URL
URLSearchParams
Intl
AbortController
```

Before writing custom utility logic, check whether the platform already provides the behavior.

---

## 44. Use `Object.hasOwn`

Prefer:

```js
Object.hasOwn(
  object,
  "name"
);
```

when checking whether a property belongs directly to an object.

This is clearer than older patterns such as:

```js
Object.prototype.hasOwnProperty.call(
  object,
  "name"
);
```

---

## 45. Avoid Using `in` When You Need Own Properties

The `in` operator checks the entire prototype chain:

```js
"name" in user;
```

If you specifically need an own property:

```js
Object.hasOwn(user, "name");
```

Choose based on semantics.

---

## 46. Use `Number.isNaN`

Prefer:

```js
Number.isNaN(value);
```

instead of relying on global coercive behavior:

```js
isNaN(value);
```

The static method does not coerce arbitrary values first.

---

## 47. Use `Number.isFinite`

Prefer:

```js
Number.isFinite(value);
```

when you need to confirm that a value is a finite number.

This avoids surprising coercion behavior.

---

## 48. Use `Number.isInteger`

Example:

```js
Number.isInteger(
  page
);
```

Useful for validating identifiers, pagination indexes, or counts where integers are required.

---

## 49. Use `Math` Intentionally

Modern JavaScript provides useful numeric methods such as:

```text
Math.min
Math.max
Math.round
Math.floor
Math.ceil
Math.trunc
Math.sign
```

Choose the operation that reflects the required semantics.

---

## 50. Use `Intl` for Locale-Aware Formatting

For currency:

```js
const formatter =
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

formatter.format(1234.5);
```

Avoid manually constructing locale-sensitive formats when internationalization matters.

---

## 51. Use `Intl.DateTimeFormat`

Example:

```js
const formatter =
  new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle: "medium"
    }
  );

formatter.format(new Date());
```

Locale-aware formatting is more robust than manual string assembly.

---

## 52. Use Explicit Time Zones When Required

Example:

```js
const formatter =
  new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone: "UTC",
      dateStyle: "medium"
    }
  );
```

Do not silently rely on the machine's local timezone when the domain requires another timezone.

---

## 53. Use `URL` Instead of Manual URL Construction

Prefer:

```js
const url = new URL(
  "https://example.com/users"
);

url.searchParams.set(
  "search",
  "Osama Abu Motlaq"
);
```

This is safer and more expressive than complex string concatenation.

---

## 54. Use `URLSearchParams`

Example:

```js
const params = new URLSearchParams({
  page: "2",
  search: "javascript"
});

const url =
  `/api/projects?${params}`;
```

This handles URL encoding correctly.

---

## 55. Use `AbortController` for Cancellation

Modern asynchronous code should support cancellation where work can become irrelevant.

```js
const controller =
  new AbortController();

fetch("/api/projects", {
  signal: controller.signal
});

controller.abort();
```

Cancellation is particularly useful for:

* Search
* Navigation
* Timeouts
* Component lifecycles
* User cancellation

---

## 56. Prefer `async`/`await` for Sequential Async Logic

Instead of:

```js
fetchUser()
  .then((user) =>
    fetchProjects(user.id)
  )
  .then((projects) => {
    console.log(projects);
  });
```

often prefer:

```js
const user =
  await fetchUser();

const projects =
  await fetchProjects(user.id);

console.log(projects);
```

This can make control flow easier to read.

---

## 57. Do Not Avoid Promises

`async`/`await` is built on promises.

Understanding promises remains essential.

Use promise combinators directly when they communicate the desired concurrency model better:

```js
const results =
  await Promise.all([
    firstTask(),
    secondTask()
  ]);
```

---

## 58. Use `Promise.all` for Independent Work

```js
const [
  user,
  projects
] = await Promise.all([
  fetchUser(),
  fetchProjects()
]);
```

This allows independent work to proceed concurrently.

---

## 59. Use `Promise.allSettled` for Partial Success

```js
const results =
  await Promise.allSettled([
    fetchUser(),
    fetchNotifications()
  ]);
```

Use it when individual failures should not automatically cancel the entire operation.

---

## 60. Use `Promise.any` for First Successful Result

Example:

```js
const response =
  await Promise.any([
    fetchFromPrimary(),
    fetchFromBackup()
  ]);
```

`Promise.any` resolves when the first promise fulfills.

Use it when the requirement is "first successful result."

---

## 61. Use `Promise.race` for First Settlement

Example:

```js
const result =
  await Promise.race([
    request(),
    timeout()
  ]);
```

Remember that `race` settles on either fulfillment or rejection.

It is not automatically a timeout mechanism unless the competing operation is designed accordingly.

---

## 62. Avoid Sequential Await When Concurrency Is Safe

Weak:

```js
const user = await fetchUser();
const notifications =
  await fetchNotifications();
```

If independent:

```js
const [user, notifications] =
  await Promise.all([
    fetchUser(),
    fetchNotifications()
  ]);
```

Choose concurrency based on actual dependencies.

---

## 63. Avoid `Promise.all` When Operations Depend on Each Other

If:

```text
fetchUser()
→ need user.id
→ fetchProjects(user.id)
```

keep the dependency explicit:

```js
const user =
  await fetchUser();

const projects =
  await fetchProjects(user.id);
```

Do not force unrelated abstractions to create fake concurrency.

---

## 64. Use `Error` Objects

Prefer:

```js
throw new Error(
  "Failed to load user"
);
```

rather than:

```js
throw "Failed to load user";
```

Error objects provide stack information and standard behavior.

---

## 65. Use Specific Error Types Where Helpful

Example:

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

Use custom errors when callers genuinely need to distinguish categories.

Do not create dozens of unnecessary error classes.

---

## 66. Use Error `cause` for Context

Modern JavaScript supports:

```js
throw new Error(
  "Failed to save user",
  {
    cause: error
  }
);
```

This preserves the underlying reason while adding higher-level context.

---

## 67. Use `finally` for Cleanup

Example:

```js
try {
  await saveUser();
} finally {
  releaseResource();
}
```

`finally` communicates that cleanup should occur regardless of success or failure.

---

## 68. Avoid Empty `catch` Blocks

Bad:

```js
try {
  riskyOperation();
} catch {
}
```

This destroys useful failure information.

If an error is intentionally ignored, the reason should be clear and the behavior deliberate.

---

## 69. Catch Errors Only Where You Can Add Value

Do not catch everything at every layer.

Weak:

```js
try {
  await operation();
} catch (error) {
  console.error(error);
  throw error;
}
```

repeated across many layers can create noisy logging.

Catch when you can:

* Recover
* Add context
* Translate the error
* Clean up
* Report appropriately

---

## 70. Avoid Promise Constructor Anti-Patterns

Do not wrap an existing promise unnecessarily:

```js
const result = new Promise(
  (resolve, reject) => {
    fetch(url)
      .then(resolve)
      .catch(reject);
  }
);
```

Prefer:

```js
const result =
  fetch(url);
```

The extra constructor adds complexity without value.

---

## 71. Use `queueMicrotask` Intentionally

Example:

```js
queueMicrotask(() => {
  runLater();
});
```

Use it when you deliberately need microtask scheduling.

Do not use it as an unexplained workaround for timing bugs.

---

## 72. Use `setTimeout` for Task Scheduling, Not Random Timing Fixes

Weak:

```js
setTimeout(() => {
  fixSomething();
}, 100);
```

when the real issue is an unclear lifecycle or race.

Timers should represent actual scheduling requirements.

---

## 73. Prefer `requestAnimationFrame` for Visual Updates

For browser rendering work:

```js
requestAnimationFrame(() => {
  updateVisuals();
});
```

This is generally more appropriate for work coordinated with rendering than arbitrary timer delays.

---

## 74. Prefer CSS for Pure Visual State

If a change is purely visual, use CSS where possible.

For example:

```css
button:hover {
  transform: scale(1.02);
}
```

Do not use JavaScript for every visual effect.

---

## 75. Use JavaScript for Behavior

JavaScript is appropriate when the behavior involves:

```text
State
Data
Network
User actions
Calculations
External systems
Dynamic content
```

Use CSS for presentation whenever practical.

---

## 76. Use Modules

Modern JavaScript should generally use ES modules.

```js
export function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

Consume:

```js
import {
  calculateTotal
} from "./cart.js";
```

Modules provide explicit dependency relationships.

---

## 77. Prefer Named Exports for Shared APIs

Named exports:

```js
export function formatUser() {}
export function normalizeUser() {}
```

make imports explicit:

```js
import {
  formatUser,
  normalizeUser
} from "./users.js";
```

Default exports can still be appropriate when a module has one clear primary export.

---

## 78. Avoid Exporting Everything

Do not expose internal helpers unnecessarily.

Weak:

```js
export {
  publicFunction,
  internalHelper,
  debugHelper,
  temporaryHelper
};
```

Prefer the smallest useful API:

```js
export {
  publicFunction
};
```

---

## 79. Avoid Circular Dependencies

Circular modules can create confusing initialization behavior.

Example:

```text
module A
 ↓
module B
 ↓
module A
```

Keep dependency direction clear.

Extract shared concepts into a lower-level module when necessary.

---

## 80. Use Top-Level `await` Carefully

Modern modules can use:

```js
const config =
  await loadConfig();
```

This can be useful, but it also delays module evaluation.

Use it when module initialization genuinely depends on asynchronous work.

Do not introduce top-level async initialization without understanding its effect on startup.

---

## 81. Use Dynamic `import()` for Lazy Loading

Example:

```js
const module =
  await import("./heavy-module.js");
```

This can reduce initial loading cost when a feature is needed only later.

Use it when code-splitting or lazy loading provides real value.

---

## 82. Avoid Dynamic Imports Everywhere

Lazy loading has trade-offs.

Too many small chunks can create:

* Additional requests
* More coordination
* Complex loading states

Split code according to actual application boundaries.

---

## 83. Use Private Class Fields for True Encapsulation

Example:

```js
class UserStore {
  #users = [];

  addUser(user) {
    this.#users.push(user);
  }

  getUsers() {
    return [...this.#users];
  }
}
```

Private fields provide actual language-level privacy.

Use them when encapsulation is valuable.

---

## 84. Do Not Use Private Fields Merely for Style

For simple objects, closures or module scope may be clearer.

Choose the mechanism that best expresses the ownership model.

---

## 85. Use Getters and Setters Carefully

Example:

```js
class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value.trim();
  }
}
```

Getters and setters are useful when property-style access represents meaningful behavior.

Do not use them when normal methods would make side effects clearer.

---

## 86. Prefer Composition for Independent Behavior

Instead of creating large inheritance hierarchies:

```js
class AdminDeveloperDesignerUser
  extends DeveloperUser
```

prefer composing capabilities:

```js
const user = {
  ...developerCapabilities,
  ...adminCapabilities
};
```

or explicit collaborators.

Use inheritance when there is a real subtype relationship.

---

## 87. Avoid Deep Inheritance Chains

Deep class hierarchies make behavior difficult to follow:

```text
Base
 ↓
User
 ↓
Employee
 ↓
Developer
 ↓
SeniorDeveloper
 ↓
LeadDeveloper
```

Prefer flatter designs when behavior can be represented through composition.

---

## 88. Use Optional Catch Binding When the Error Is Intentionally Ignored

Modern syntax allows:

```js
try {
  parseOptionalValue();
} catch {
  return null;
}
```

This is clearer than naming an unused error.

Use it only when intentionally ignoring the error is correct.

---

## 89. Use Numeric Separators for Large Numbers

Example:

```js
const timeoutMs = 10_000;
const maxItems = 1_000_000;
```

This improves readability.

The numeric value remains unchanged.

---

## 90. Use `BigInt` for Integer Ranges Beyond `Number`

Example:

```js
const largeId = 9007199254740993n;
```

Use `BigInt` only when the domain actually requires integer precision beyond safe `Number` limits.

Do not mix `BigInt` and `Number` arithmetic without explicit conversion.

---

## 91. Do Not Use Floating-Point Numbers for Exact Money Arithmetic

For example:

```js
0.1 + 0.2;
```

is subject to floating-point representation issues.

For financial systems, use appropriate integer units or dedicated decimal handling.

The correct strategy depends on the application's requirements.

---

## 92. Use `Object.is` for Specific Equality Semantics

`Object.is` differs from `===` for edge cases such as:

```js
Object.is(NaN, NaN);
Object.is(-0, 0);
```

Use it when these semantic differences matter.

Do not replace every `===` with `Object.is`.

---

## 93. Prefer Strict Equality

Use:

```js
value === expected;
```

or:

```js
value !== expected;
```

Avoid loose equality:

```js
value == expected;
```

unless coercion is explicitly intentional and understood.

---

## 94. Avoid Implicit Type Coercion in Important Logic

Weak:

```js
if (value == 0) {
  ...
}
```

Prefer explicit checks:

```js
if (value === 0) {
  ...
}
```

or deliberate conversion:

```js
const count = Number(value);

if (count === 0) {
  ...
}
```

---

## 95. Use Explicit Number Conversion

Examples:

```js
const value = Number(input);
```

```js
const integer = Number.parseInt(
  input,
  10
);
```

```js
const decimal = Number.parseFloat(
  input
);
```

Prefer `Number()` when the entire string should represent a valid number.

---

## 96. Validate Numeric Conversion

Do not assume:

```js
const value = Number(input);
```

produced a valid number.

Check:

```js
if (!Number.isFinite(value)) {
  throw new Error("Invalid number");
}
```

---

## 97. Avoid `parseInt` Without Understanding Its Behavior

For example:

```js
parseInt("10px", 10);
```

returns:

```text
10
```

If the entire input must be numeric, prefer:

```js
const value = Number("10px");
```

which produces `NaN`.

Choose the parser according to the input contract.

---

## 98. Use `String()` for Explicit String Conversion

Prefer:

```js
const value = String(input);
```

when conversion is intentional.

Avoid relying on accidental string coercion through concatenation:

```js
const value = "" + input;
```

---

## 99. Use Boolean Conversion Carefully

Example:

```js
const enabled = Boolean(value);
```

This is appropriate when truthiness semantics are actually desired.

Do not use it to parse configuration strings such as `"false"`.

---

## 100. Understand Truthiness

Falsy values include:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is generally truthy.

Modern code should rely on truthiness intentionally rather than accidentally.

---

## 101. Avoid Double Negation When Clarity Suffers

This:

```js
const isValid =
  !!value;
```

can be useful when converting a value to boolean.

But:

```js
if (!!value) {
  ...
}
```

is often unnecessary.

Prefer:

```js
if (value) {
  ...
}
```

unless an explicit boolean value is required.

---

## 102. Use `Boolean()` When Conversion Is the Point

Example:

```js
const hasValue =
  Boolean(input);
```

This communicates the intention clearly.

---

## 103. Avoid Nested Ternaries

Weak:

```js
const label =
  conditionA
    ? valueA
    : conditionB
      ? valueB
      : valueC;
```

Prefer:

```js
let label;

if (conditionA) {
  label = valueA;
} else if (conditionB) {
  label = valueB;
} else {
  label = valueC;
}
```

or use a dedicated mapping structure when appropriate.

---

## 104. Use Ternaries for Simple Expressions

Good:

```js
const label =
  isActive
    ? "Active"
    : "Inactive";
```

A ternary should remain easy to read.

---

## 105. Use `switch` When Multiple Discrete Cases Exist

Example:

```js
switch (status) {
  case "loading":
    return "Loading";
  case "success":
    return "Complete";
  case "error":
    return "Failed";
  default:
    return "Unknown";
}
```

The structure clearly communicates the finite set of states.

---

## 106. Use Object Maps for Simple Lookup Tables

Instead of:

```js
function getLabel(status) {
  if (status === "loading") {
    return "Loading";
  }

  if (status === "success") {
    return "Complete";
  }

  return "Unknown";
}
```

consider:

```js
const labels = {
  loading: "Loading",
  success: "Complete",
  error: "Failed"
};

const label =
  labels[status] ?? "Unknown";
```

Use this when behavior is simple data lookup.

---

## 107. Do Not Force Lookup Objects Into Complex Logic

If each case has different behavior:

```text
Validation
Side effects
Async work
Multiple conditions
```

a `switch` or separate functions may be clearer.

---

## 108. Prefer Early Returns

Instead of deeply nesting:

```js
function saveUser(user) {
  if (user) {
    if (user.active) {
      if (user.name) {
        return save(user);
      }
    }
  }
}
```

prefer:

```js
function saveUser(user) {
  if (!user) {
    return;
  }

  if (!user.active) {
    return;
  }

  if (!user.name) {
    return;
  }

  return save(user);
}
```

Early returns reduce nesting.

---

## 109. Avoid Excessive Guard Clauses

Early returns are helpful, but too many can fragment logic.

Keep related conditions together when they form one meaningful validation or decision.

---

## 110. Use Small Functions

A function should have a focused purpose.

Weak:

```js
function handleEverything() {
  // Validation
  // Formatting
  // Network
  // Storage
  // Rendering
  // Logging
}
```

Prefer:

```js
validateUser();
normalizeUser();
saveUser();
renderUser();
```

and compose them where appropriate.

---

## 111. Avoid Functions With Too Many Parameters

Weak:

```js
createUser(
  name,
  email,
  role,
  active,
  theme,
  locale,
  timezone,
  limit
);
```

Prefer an options object:

```js
createUser({
  name,
  email,
  role,
  active,
  theme,
  locale,
  timezone,
  limit
});
```

This also makes call sites easier to understand.

---

## 112. Do Not Use Options Objects to Hide Complexity

If an options object has dozens of unrelated fields, the function may have too many responsibilities.

Use smaller APIs or compose multiple operations.

---

## 113. Prefer Pure Functions for Transformations

Example:

```js
function normalizeName(name) {
  return name.trim().toLowerCase();
}
```

Pure transformations are easier to:

* Test
* Reuse
* Compose
* Cache
* Reason about

---

## 114. Isolate Side Effects

Keep:

```text
Calculation
Transformation
Validation
```

separate from:

```text
Network
DOM
Storage
Logging
Database
```

where practical.

This separation improves flexibility.

---

## 115. Use Explicit Side Effects

For example:

```js
const normalizedUser =
  normalizeUser(user);

await saveUser(
  normalizedUser
);
```

is easier to reason about than:

```js
await normalizeAndSaveUser(user);
```

when normalization and persistence are independently meaningful.

---

## 116. Avoid Hidden Global State

Weak:

```js
let currentUser;

function saveProject(project) {
  return save(
    currentUser.id,
    project
  );
}
```

Prefer:

```js
function saveProject(
  user,
  project
) {
  return save(
    user.id,
    project
  );
}
```

Explicit dependencies improve predictability.

---

## 117. Use Closures When They Simplify Ownership

Example:

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
    },

    getValue() {
      return count;
    }
  };
}
```

Closures can encapsulate state without requiring classes.

---

## 118. Do Not Use Closures to Hide Everything

If a simple object is clearer:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

do not introduce a closure unnecessarily.

Use the simplest abstraction that fits the problem.

---

## 119. Prefer Composition Over Inheritance When Behavior Is Independent

Example:

```js
const logger = createLogger();
const validator = createValidator();

const userService =
  createUserService({
    logger,
    validator
  });
```

This allows each dependency to evolve independently.

---

## 120. Avoid "God Objects"

A large object containing:

```text
Users
Projects
Authentication
Notifications
Payments
Analytics
Routing
```

is difficult to maintain.

Split by cohesive responsibilities.

---

## 121. Prefer Cohesive Modules

A module should answer:

> What concept does this module own?

Good:

```text
users/user-service.js
```

Less useful:

```text
utils/everything.js
```

---

## 122. Keep Module Boundaries Explicit

Use imports and exports to reveal dependencies.

```js
import {
  normalizeUser
} from "./normalize-user.js";
```

Avoid hidden global dependencies.

---

## 123. Prefer Locality of Reference

Keep related code close together.

Example:

```js
function validateEmail(email) {
  ...
}

function createUser(data) {
  if (!validateEmail(data.email)) {
    ...
  }
}
```

Do not scatter closely related logic across unrelated locations without a good reason.

---

## 124. Avoid Large Utility Modules

A utility module can become an unrelated collection of functions.

Prefer domain-focused modules:

```text
users/
billing/
validation/
formatting/
network/
```

based on actual concepts.

---

## 125. Use Comments to Explain Why

Good:

```js
// Use UTC because timestamps are compared across regions.
const now = new Date();
```

Weak:

```js
// Create a date.
const now = new Date();
```

Comments should explain decisions, constraints, or non-obvious behavior.

---

## 126. Do Not Comment Obvious Syntax

Avoid:

```js
// Increment count.
count += 1;
```

The code already says this.

---

## 127. Keep Comments Current

Outdated comments are worse than no comments.

When changing code, update comments that describe changed behavior.

---

## 128. Prefer Self-Documenting Code

Good:

```js
const hasPermission =
  user.permissions.includes(
    "delete:project"
  );
```

This is clearer than:

```js
const x = check(user);
```

Naming reduces the need for explanatory comments.

---

## 129. Use Domain Vocabulary Consistently

If the application calls something a:

```text
Project
```

do not randomly call it:

```text
WorkItem
Entity
Record
Thing
```

Consistency improves readability and reuse.

---

## 130. Avoid Boolean Names Without Semantic Prefixes

Prefer:

```js
const isActive = true;
const hasPermission = false;
const canDelete = true;
const shouldRetry = false;
```

over:

```js
const active = true;
const permission = false;
const delete = true;
```

Boolean naming should communicate meaning.

---

## 131. Use Action-Oriented Function Names

Prefer:

```js
calculateTotal();
normalizeUser();
fetchProjects();
validateEmail();
```

over:

```js
total();
user();
projects();
email();
```

Function names should communicate behavior.

---

## 132. Avoid Generic Names

Weak:

```js
const data = ...
const value = ...
const result = ...
```

Generic names can be acceptable temporarily in very small scopes.

For meaningful logic, prefer:

```js
const users = ...
const normalizedUser = ...
const requestResult = ...
```

---

## 133. Use `const` With Array Methods for Derived Data

Example:

```js
const activeUsers =
  users.filter(
    (user) => user.active
  );
```

This communicates that the derived value will not be reassigned.

---

## 134. Prefer `find` for One Expected Match

Instead of:

```js
const matches = users.filter(
  (user) => user.id === id
);

const user = matches[0];
```

prefer:

```js
const user = users.find(
  (user) => user.id === id
);
```

The API communicates the intended cardinality.

---

## 135. Use `some` for Existence Checks

Instead of:

```js
users.filter(
  (user) => user.id === id
).length > 0;
```

prefer:

```js
users.some(
  (user) => user.id === id
);
```

---

## 136. Use `every` for Universal Conditions

Example:

```js
const valid =
  users.every(
    (user) => user.email
  );
```

This communicates:

> All users must satisfy this condition.

---

## 137. Use `includes` for Membership

Prefer:

```js
permissions.includes(
  "delete:project"
);
```

over manually searching:

```js
permissions.indexOf(
  "delete:project"
) !== -1;
```

`includes()` directly communicates membership.

---

## 138. Use `at()` When Relative Indexing Improves Readability

Example:

```js
const last =
  users.at(-1);
```

This can be clearer than:

```js
const last =
  users[users.length - 1];
```

Use it when supported by the project's target environments.

---

## 139. Use `Object.groupBy` When Grouping Is the Actual Requirement

Where supported by the target environment:

```js
const groups =
  Object.groupBy(
    users,
    (user) => user.role
  );
```

This can express grouping directly.

Verify runtime compatibility before relying on newer APIs.

---

## 140. Use `Map.groupBy` When Object Keys Are Not Appropriate

When grouping values with non-string keys or object identity:

```js
const groups =
  Map.groupBy(
    users,
    (user) => user.department
  );
```

Choose the structure based on the key semantics.

---

## 141. Verify Runtime Support Before Using New APIs

A modern feature may not be available in every browser or runtime your project supports.

Check:

```text
Target browsers
Node version
Build target
Deployment runtime
```

Use transpilation or polyfills where appropriate.

Do not assume "modern JavaScript" means "available everywhere."

---

## 142. Prefer Progressive Adoption

A project should adopt a new feature when:

* The target environment supports it
* The team understands it
* It improves the code
* The tooling handles it correctly
* The added complexity is justified

Do not rewrite working code merely to adopt new syntax.

---

## 143. Keep Transpilation in Perspective

Transpilation can allow newer syntax to run in older environments.

However, not every feature behaves the same way.

Some platform APIs require polyfills rather than syntax transformation.

Distinguish:

```text
Language syntax
vs
Runtime API
```

---

## 144. Syntax and API Compatibility Are Different

For example:

```js
const value = object?.property;
```

is syntax.

A browser API such as:

```js
structuredClone(value);
```

is a runtime capability.

A transpiler may transform the first.

It does not automatically create every missing runtime API.

---

## 145. Use Feature Detection for Runtime APIs

Example:

```js
if ("clipboard" in navigator) {
  // Use Clipboard API.
}
```

This is preferable to guessing browser capabilities.

---

## 146. Avoid User-Agent Detection When Feature Detection Works

Avoid:

```js
if (navigator.userAgent.includes("Chrome")) {
  ...
}
```

Prefer:

```js
if ("clipboard" in navigator) {
  ...
}
```

Feature detection tests the capability that actually matters.

---

## 147. Use Standard APIs Before Custom Polyfills

Before writing:

```js
function customClone(...) {
  ...
}
```

check whether the target runtime provides:

```js
structuredClone(...);
```

Use custom implementations only when the real requirements demand them.

---

## 148. Do Not Polyfill Blindly

A polyfill has runtime cost and maintenance implications.

Use it when compatibility requirements justify it.

---

## 149. Modern Syntax Should Improve Semantics

Good:

```js
const name =
  user?.profile?.name ??
  "Unknown";
```

This clearly communicates optional access and fallback.

Bad modern JavaScript:

```js
const x = a?.b ?? c?.d || e && f;
```

when nobody can immediately explain the logic.

Modern syntax should reduce cognitive load, not increase it.

---

## 150. Avoid Operator Overloading Through Cleverness

JavaScript does not provide traditional operator overloading.

Avoid relying on surprising implicit conversion behavior to make expressions appear elegant.

Keep important transformations explicit.

---

## 151. Use `Symbol.toPrimitive` Only for Genuine Domain Needs

Example:

```js
const value = {
  [Symbol.toPrimitive]() {
    return 10;
  }
};
```

This can customize primitive conversion.

It can also make code surprising.

Use it only when the behavior clearly represents a domain concept.

---

## 152. Use Proxy Sparingly

`Proxy` can intercept operations:

```js
const proxy = new Proxy(
  target,
  {
    get(target, property) {
      return target[property];
    }
  }
);
```

Proxy-based abstractions can be powerful but difficult to debug.

Do not use them where ordinary functions or objects are clearer.

---

## 153. Prefer Explicit APIs Over Magic

Weak:

```js
model.user.profile.settings.theme
```

where every property access triggers hidden behavior through proxies.

Prefer explicit operations when behavior has meaningful side effects:

```js
settings.getTheme();
```

Predictability matters more than cleverness.

---

## 154. Use Metaprogramming for Infrastructure, Not Everything

Metaprogramming can be useful for:

* Framework internals
* Validation layers
* Instrumentation
* Reactive systems
* Specialized libraries

Application code should usually prefer straightforward JavaScript.

---

## 155. Avoid Magic Getters With Expensive Work

This looks like a property read:

```js
user.profile
```

but could trigger a network request or expensive computation if implemented through a proxy or getter.

Property access should generally remain predictable.

---

## 156. Avoid Hidden Async Behavior

A function named:

```js
getUser();
```

should not secretly perform network I/O through magic property access.

Prefer:

```js
await fetchUser();
```

when asynchronous behavior is involved.

Names should communicate important effects.

---

## 157. Use `async` When a Function Is Asynchronous

Prefer:

```js
async function fetchUser() {
  ...
}
```

when the function's contract is asynchronous.

Do not hide promise-producing behavior behind ambiguous synchronous-looking APIs.

---

## 158. Be Careful With `async` Constructors

JavaScript constructors cannot directly be asynchronous in the normal constructor model.

If initialization requires async work:

```js
class UserStore {
  static async create() {
    const store = new UserStore();
    await store.initialize();
    return store;
  }
}
```

Make asynchronous initialization explicit.

---

## 159. Avoid Async Work in Constructors

Constructors should generally establish the synchronous object state.

Move asynchronous setup into:

* Factory methods
* Explicit initialization methods
* External orchestration

---

## 160. Use Factories for Complex Construction

Example:

```js
class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  static async create(config) {
    const repository =
      await createRepository(config);

    return new UserService(
      repository
    );
  }
}
```

Factories can make complex setup explicit.

---

## 161. Avoid Classes When Functions Are Enough

This:

```js
function add(a, b) {
  return a + b;
}
```

does not need:

```js
class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

Use classes when object identity, encapsulation, lifecycle, or polymorphic behavior provides actual value.

---

## 162. Avoid Functional Code Dogmatism

Not every piece of code must be purely functional.

Objects, classes, stateful modules, and imperative loops are all valid tools.

Choose based on the problem.

---

## 163. Avoid Class Dogmatism

Not every domain model needs a class.

A plain object may be sufficient:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq"
};
```

Use the simplest representation that fits the domain.

---

## 164. Use Private Fields Instead of Naming Conventions When True Privacy Matters

This:

```js
class UserStore {
  #users = [];
}
```

provides actual private fields.

By contrast:

```js
this._users
```

is only a naming convention.

Use actual private fields when external access must be prevented.

---

## 165. Understand Class Fields

Example:

```js
class User {
  name = "Osama Abu Motlaq";

  greet = () => {
    return `Hello, ${this.name}`;
  };
}
```

Class fields have important initialization and memory implications.

Use them when they improve clarity.

---

## 166. Avoid Per-Instance Arrow Functions Without Need

An arrow field such as:

```js
class User {
  greet = () => {
    ...
  };
}
```

creates a function per instance.

Prototype methods:

```js
class User {
  greet() {
    ...
  }
}
```

can share the method through the prototype.

Choose intentionally based on behavior and requirements.

---

## 167. Use `super` Explicitly in Inheritance

Example:

```js
class AdminUser extends User {
  greet() {
    return `${super.greet()} - Admin`;
  }
}
```

Inheritance should remain readable.

---

## 168. Avoid Inheritance Just for Code Reuse

Do not create:

```js
class SpecializedThing
  extends GenericThing
```

only because it lets you reuse methods.

Composition may represent the relationship more accurately.

---

## 169. Use `Object.freeze` Carefully

Example:

```js
const config = Object.freeze({
  apiUrl: "/api"
});
```

This protects top-level properties.

It does not recursively freeze nested structures.

Do not assume:

```js
Object.freeze(object);
```

creates deep immutability.

---

## 170. Use `Object.seal` Only When the Semantics Matter

`Object.seal` prevents adding or deleting properties but still allows writable properties to change.

Use it only when these specific semantics are useful.

In many applications, normal ownership and module boundaries are clearer.

---

## 171. Avoid Freezing Everything

Deep freezing every object can add complexity and overhead.

Use immutability through design first.

Use runtime freezing for valuable boundaries such as configuration or public constants.

---

## 172. Prefer `structuredClone` Over JSON Cloning for Supported Data

Avoid:

```js
const clone =
  JSON.parse(
    JSON.stringify(value)
  );
```

as a general-purpose deep clone.

It loses or changes various data types.

Use:

```js
const clone =
  structuredClone(value);
```

when supported and appropriate.

---

## 173. Do Not Clone When You Only Need a New View

If a transformation is enough:

```js
const normalized = {
  ...user,
  name: user.name.trim()
};
```

there is no need to deep clone the entire object.

Clone only when the ownership requirement actually requires cloning.

---

## 174. Use `WeakMap` for Private Per-Object Metadata When Appropriate

Example:

```js
const metadata =
  new WeakMap();

function setMetadata(
  object,
  value
) {
  metadata.set(object, value);
}
```

This can associate metadata without adding publicly visible properties.

Use private fields or closures when those are simpler.

---

## 175. Avoid `WeakRef` and `FinalizationRegistry` for Normal Program Logic

These features involve garbage-collection timing.

Do not build correctness around:

```js
FinalizationRegistry
```

running at a specific time.

Use them only for specialized memory-sensitive infrastructure.

---

## 176. Use `?.` With Function Calls Carefully

Example:

```js
onSave?.();
```

is useful when a callback is optional.

Do not use it when `onSave` is required.

If a required callback is missing, a clear failure can be preferable.

---

## 177. Use `??=` for Optional Initialization

Example:

```js
config.cache ??= new Map();
```

This communicates:

> Initialize only if the value is missing.

Do not use `||=` if `0`, `false`, or `""` are valid existing values.

---

## 178. Prefer Named Constants for Important Magic Values

Weak:

```js
setTimeout(
  refresh,
  86400000
);
```

Better:

```js
const ONE_DAY_MS =
  24 * 60 * 60 * 1000;

setTimeout(
  refresh,
  ONE_DAY_MS
);
```

Meaningful names improve readability.

---

## 179. Use Numeric Separators in Constants

```js
const ONE_MILLION = 1_000_000;
```

This is easier to read than:

```js
const ONE_MILLION = 1000000;
```

---

## 180. Avoid Magic Strings

Weak:

```js
if (status === "thing-3") {
  ...
}
```

Prefer:

```js
const STATUS_READY =
  "ready";

if (status === STATUS_READY) {
  ...
}
```

or use a domain structure such as:

```js
const STATUS = {
  READY: "ready"
};
```

Only extract constants when the value has semantic meaning or is reused.

---

## 181. Use Symbols or Objects for Internal Constants Where Appropriate

For internal action identifiers:

```js
const actions = {
  increment: "increment",
  decrement: "decrement"
};
```

Use simple strings when serialization or debugging benefits from them.

Use `Symbol` when identity uniqueness is the actual requirement.

---

## 182. Do Not Create Constants for Every Literal

This is unnecessary:

```js
const ZERO = 0;
const ONE = 1;
const TRUE = true;
```

Constants should communicate meaningful domain information.

---

## 183. Keep Expressions Readable

This:

```js
const result =
  amount * (1 - discount) + shipping - tax;
```

may be acceptable.

For complex business logic, introduce names:

```js
const discountedAmount =
  amount * (1 - discount);

const subtotal =
  discountedAmount + shipping;

const result =
  subtotal - tax;
```

Clarity is often more valuable than minimizing lines.

---

## 184. Prefer Intermediate Variables for Complex Logic

Intermediate values can explain a calculation.

Avoid compressing everything into:

```js
const result =
  data?.items?.filter(...).map(...).sort(...).slice(...);
```

when each stage has semantic importance.

Break the pipeline into named steps.

---

## 185. Use Method Chaining When the Pipeline Is Clear

A clear transformation can remain chained:

```js
const names = users
  .filter(
    (user) => user.active
  )
  .map(
    (user) => user.name
  )
  .toSorted();
```

If the chain becomes difficult to read, split it.

---

## 186. Avoid Side Effects Inside Transformations

Avoid:

```js
const names = users.map((user) => {
  logUser(user);
  return user.name;
});
```

when logging is unrelated to the transformation.

Prefer:

```js
for (const user of users) {
  logUser(user);
}

const names =
  users.map(
    (user) => user.name
  );
```

or explicitly coordinate the side effect.

---

## 187. Use `reduce` Only When It Communicates the Operation

`reduce` is powerful but can become difficult to understand.

Good:

```js
const total = items.reduce(
  (sum, item) => sum + item.price,
  0
);
```

Less clear:

```js
const result = values.reduce(
  (state, value) => {
    // Complex unrelated operations.
    return state;
  },
  initialState
);
```

Use dedicated functions or loops when the accumulation logic is complex.

---

## 188. Do Not Use `reduce` as a Universal Replacement for Loops

A loop may be clearer for:

* Multiple state changes
* Early exits
* Complex control flow
* Async sequential work
* Side-effect-heavy operations

Choose clarity over stylistic uniformity.

---

## 189. Avoid `Array.prototype.map` for Side Effects

Bad:

```js
users.map((user) => {
  saveUser(user);
});
```

The returned array is ignored.

Prefer:

```js
for (const user of users) {
  saveUser(user);
}
```

or:

```js
users.forEach(saveUser);
```

when the operation is intentionally synchronous and side-effect-only.

---

## 190. Use `for...of` for Async Sequential Work

Example:

```js
for (const user of users) {
  await saveUser(user);
}
```

This communicates the sequential dependency clearly.

---

## 191. Use `Promise.all` for Safe Async Concurrency

Example:

```js
await Promise.all(
  users.map(
    (user) => saveUser(user)
  )
);
```

Use only when concurrent execution is safe.

---

## 192. Bound Concurrency for Large Collections

Do not automatically launch thousands of requests:

```js
await Promise.all(
  users.map(saveUser)
);
```

For large inputs, use a concurrency limit when needed.

This protects the client and external systems.

---

## 193. Use Async Iterators for Streaming Work

Example:

```js
for await (const chunk of stream) {
  processChunk(chunk);
}
```

This can express asynchronous iteration more clearly than manually coordinating callbacks.

---

## 194. Use `for await...of` Only for Async Iterables or Appropriate Promises

Do not use it merely because the data is asynchronous somewhere upstream.

Choose the iteration model according to the actual source.

---

## 195. Modern JavaScript and Error Boundaries

A good modern codebase should have clear boundaries where errors are:

```text
Created
Propagated
Translated
Recovered
Logged
Presented
```

Do not let every function independently decide how errors should appear to users.

---

## 196. Modern JavaScript and Resource Management

Newer JavaScript environments provide explicit resource-management capabilities in supported runtimes.

When using features such as:

```text
using
await using
Symbol.dispose
Symbol.asyncDispose
```

verify target-runtime support carefully.

These features should be adopted when they simplify real resource ownership, not because they are new.

---

## 197. Prefer Explicit Resource Ownership

Even without new language features:

```js
const resource =
  acquireResource();

try {
  useResource(resource);
} finally {
  releaseResource(resource);
}
```

This remains a clear and portable resource lifecycle pattern.

---

## 198. Use `using` Only When the Project Supports It

If the runtime supports explicit resource management:

```js
{
  using resource =
    acquireResource();

  resource.use();
}
```

the resource lifecycle can become more explicit.

Do not use this syntax in projects whose supported runtimes cannot execute it.

---

## 199. Avoid Experimental Features in Production Without a Requirement

A language feature may be:

```text
New
Experimental
Proposal-stage
Runtime-specific
```

Check the actual specification and runtime support before adoption.

Do not confuse a proposal or experimental implementation with a stable platform feature.

---

## 200. Verify ECMAScript Version Requirements

Modern projects should know the language level they target.

For example:

```text
ES2022
ES2023
ES2024
ES2025
```

The correct target depends on project requirements and supported runtimes.

---

## 201. Do Not Use Syntax From a Newer Standard Without Checking the Build

A developer may write a feature that works locally but fails in another environment.

Before adoption, verify:

```text
Language parser
Transpiler
Linter
Formatter
Runtime
Test environment
Deployment environment
```

All relevant tools should support the feature.

---

## 202. Keep Tooling Consistent With the Language Level

Linting and formatting tools should understand the syntax used by the project.

A mismatch can produce false errors or formatting problems.

---

## 203. Use ESLint or Similar Tools as Guidance

A linter can enforce patterns such as:

* No `var`
* Strict equality
* Unused variables
* Consistent imports
* No accidental floating promises where supported
* Safer JavaScript patterns

The exact rules should match the project.

---

## 204. Do Not Enable Every Lint Rule

Too many rules can create noise.

Choose rules that enforce meaningful project standards.

A good rule set should:

* Catch real mistakes
* Improve consistency
* Avoid excessive stylistic arguments
* Fit the team's workflow

---

## 205. Format Code Automatically

Use a formatter where practical.

Automated formatting reduces unnecessary debates about:

```text
Spacing
Indentation
Line breaks
Quotes
Trailing commas
```

Keep style decisions separate from semantic decisions.

---

## 206. Do Not Use Formatting Rules to Compensate for Poor Design

A perfectly formatted function can still be badly structured.

Formatting is not architecture.

---

## 207. Use Modern Syntax Consistently

Avoid mixing old and modern styles without reason:

```js
var users = [];
const projects = [];
```

Prefer a coherent project style.

Consistency makes the codebase easier to read.

---

## 208. Do Not Rewrite Entire Files Just to Modernize Syntax

For an existing stable codebase:

```text
Old but correct
```

is not automatically a problem.

Modernize when:

* There is a maintenance benefit.
* A bug is being fixed.
* The old pattern causes confusion.
* Compatibility requirements changed.
* The new syntax materially improves the code.

---

## 209. Modernization Should Preserve Behavior

When replacing:

```js
var
```

with:

```js
const
```

or:

```js
let
```

verify that scope and reassignment behavior remain correct.

Syntax migration should not introduce semantic changes accidentally.

---

## 210. Avoid Clever One-Liners

This:

```js
const user =
  users.find(
    (u) => u.id === id
  ) ?? null;
```

may be fine.

But:

```js
const value =
  condition
    ? transform(
        find(
          filter(
            map(
              ...
            )
          )
        )
      )
    : fallback();
```

is harder to maintain.

Modern syntax should not become an excuse for dense code.

---

## 211. Prefer Readability Over Minimal Character Count

Do not optimize for:

```text
Fewest lines
Fewest characters
Most chained operations
Most advanced syntax
```

Optimize for:

```text
Correctness
Clarity
Maintainability
```

---

## 212. Use Explicit Naming With New APIs

Instead of:

```js
const x =
  users.toSorted(...);
```

prefer:

```js
const sortedUsers =
  users.toSorted(...);
```

Modern APIs deserve clear names just like older APIs.

---

## 213. Keep Modern Features Local When They Are Specialized

A specialized feature should stay near the domain that needs it.

Do not introduce application-wide patterns for a feature used in one module.

---

## 214. Modern JavaScript and Security

Modern syntax does not automatically make code secure.

Security still requires:

* Input validation
* Authorization
* Output encoding
* Safe DOM APIs
* Safe URL handling
* Secure authentication
* Dependency review
* Secret protection

Do not confuse language modernization with security modernization.

---

## 215. Prefer `textContent` Over `innerHTML` for Plain Text

Use:

```js
element.textContent =
  user.name;
```

when inserting plain text.

Avoid:

```js
element.innerHTML =
  user.name;
```

unless HTML insertion is actually intended and safely controlled.

---

## 216. Avoid `eval`

Do not use:

```js
eval(userInput);
```

Dynamic code execution creates severe security and maintenance problems.

Use explicit data structures and function maps instead.

---

## 217. Avoid `new Function` for Dynamic Application Logic

Similarly:

```js
new Function(
  "value",
  userProvidedCode
);
```

should not be used for untrusted dynamic logic.

---

## 218. Prefer Safe Data-Driven Dispatch

Instead of:

```js
eval(actionName);
```

use:

```js
const actions = {
  save: saveUser,
  delete: deleteUser
};

const action =
  actions[actionName];

if (!action) {
  throw new Error(
    "Unknown action"
  );
}

action();
```

The allowed behavior is explicit.

---

## 219. Use Modern APIs With Clear Error Handling

For example:

```js
try {
  const data =
    await requestJson(
      "/api/projects"
    );
} catch (error) {
  handleRequestError(error);
}
```

Modern syntax does not remove the need for robust failure handling.

---

## 220. Modern JavaScript Should Remain Debuggable

Avoid abstractions that make it difficult to answer:

```text
What is this value?
Where did it come from?
What changed it?
When did it change?
What side effects occurred?
```

Modern syntax should improve these answers rather than hide them.

---

## 221. Modern JavaScript and Performance

New syntax is not automatically faster.

For example:

```js
users.map(...)
```

and:

```js
for (const user of users) {
  ...
}
```

have different readability and runtime characteristics depending on the task.

Use profiling when performance actually matters.

---

## 222. Do Not Micro-Optimize Syntax

Avoid changing readable code because one syntax form appears theoretically faster without evidence.

Example:

```text
"Use loops because they are always faster."
```

or:

```text
"Use map because functional code is always optimized."
```

Neither is a reliable universal rule.

Measure meaningful bottlenecks.

---

## 223. Prefer Allocation-Aware Transformations When Necessary

Chaining:

```js
const result = values
  .filter(...)
  .map(...)
  .toSorted(...);
```

can create intermediate structures.

For normal application code, readability may be more important.

For genuinely hot paths, profile and optimize based on measured behavior.

---

## 224. Use Lazy Techniques When They Solve Real Problems

Generators and iterators can avoid eagerly creating large arrays.

Example:

```js
function* activeUsers(users) {
  for (const user of users) {
    if (user.active) {
      yield user;
    }
  }
}
```

Use this when streaming or large-data behavior actually benefits.

---

## 225. Do Not Introduce Generators Merely to Avoid Arrays

For normal collections, arrays are often simpler.

Choose lazy iteration when lazy evaluation provides a meaningful benefit.

---

## 226. Modern JavaScript and Memory

Be careful with:

* Long-lived closures
* Global caches
* Large arrays
* Event listeners
* Timers
* Detached DOM references
* In-flight requests

Modern syntax does not prevent memory leaks.

Ownership and lifecycle remain important.

---

## 227. Use WeakMap for Metadata When Appropriate

If metadata should not extend object lifetime:

```js
const metadata =
  new WeakMap();

function attachMetadata(
  object,
  data
) {
  metadata.set(object, data);
}
```

Use weak collections only when their semantics actually match the problem.

---

## 228. Avoid Global Mutable Caches

Weak:

```js
const cache = {};

function getData(id) {
  cache[id] = loadData(id);
  return cache[id];
}
```

Without bounds or invalidation, this can grow indefinitely.

Use an intentional cache policy.

---

## 229. Modern JavaScript and Browser APIs

Prefer standardized platform APIs when they provide the required behavior.

Examples:

```text
Fetch
URL
URLSearchParams
AbortController
Clipboard API
Web Storage
Web Crypto
IntersectionObserver
ResizeObserver
```

Always verify support for the target browsers and runtimes.

---

## 230. Avoid Deprecated APIs

Do not introduce old APIs simply because existing code uses them.

When modernizing a feature, check whether the platform provides a supported replacement.

Do not remove deprecated APIs blindly if compatibility requirements still require them.

---

## 231. Use Web Crypto for Cryptographic Operations

Do not implement cryptography manually.

Use appropriate platform cryptographic APIs where supported.

Example concept:

```js
crypto.getRandomValues(
  new Uint8Array(16)
);
```

For secure tokens and cryptographic operations, use established libraries or platform APIs designed for the purpose.

---

## 232. Do Not Use `Math.random` for Security Tokens

`Math.random()` is not a cryptographic random source.

For security-sensitive randomness, use the appropriate cryptographic API.

---

## 233. Use `crypto.randomUUID` for UUID Generation When Appropriate

Example:

```js
const id =
  crypto.randomUUID();
```

Use it when a UUID is the correct identifier format.

Do not assume every identifier problem requires a UUID.

---

## 234. Prefer Data APIs Over String Parsing

Instead of manually parsing URLs:

```js
const id =
  url.split("?")[1];
```

use:

```js
const parsed =
  new URL(url);

const id =
  parsed.searchParams.get("id");
```

Standard APIs communicate intent and handle edge cases.

---

## 235. Use `FormData` for Form-Oriented Payloads

Example:

```js
const formData =
  new FormData(form);

await fetch("/api/contact", {
  method: "POST",
  body: formData
});
```

Use JSON when a JSON API is the actual contract.

Choose the representation based on the receiving system.

---

## 236. Use `Object.fromEntries` With `FormData` Carefully

Example:

```js
const values =
  Object.fromEntries(
    new FormData(form)
  );
```

This is useful for simple fields.

Complex controls such as repeated names or files may require more deliberate handling.

---

## 237. Modern JavaScript and Web Components

When using custom elements, preserve semantic HTML where possible.

A custom element should not automatically replace:

```html
<button>
```

with:

```html
<my-button>
```

unless the custom component correctly preserves expected interaction semantics.

---

## 238. Modern JavaScript and Custom Elements

Custom elements should define:

* Clear API
* Lifecycle behavior
* Attribute/property semantics
* Keyboard behavior
* Accessibility
* Cleanup

Complexity should justify the abstraction.

---

## 239. Avoid Framework-Specific Patterns in Generic JavaScript Modules

A low-level utility should not unnecessarily depend on:

```text
React
DOM
Router
Framework-specific state
```

when the behavior can remain framework-independent.

This increases reuse and testability.

---

## 240. Keep Framework Boundaries Explicit

A good structure may look like:

```text
UI
↓
Application logic
↓
Domain logic
↓
Infrastructure
```

Not every project needs all these layers, but dependencies should remain understandable.

---

## 241. Modern JavaScript and Type Safety

JavaScript itself does not provide static typing.

You can improve correctness through:

* JSDoc
* Runtime validation
* TypeScript where appropriate
* Schema validation
* Strong module boundaries

Do not assume naming conventions alone provide type guarantees.

---

## 242. Use JSDoc When It Adds Value

Example:

```js
/**
 * Calculates the total price of items.
 * @param {{ price: number }[]} items
 * @returns {number}
 */
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

JSDoc can improve editor support in JavaScript projects.

Do not document every trivial variable.

---

## 243. Use Runtime Validation for External Data

JSDoc cannot guarantee the runtime API response is valid.

For external input:

```js
if (
  !data ||
  typeof data.name !== "string"
) {
  throw new Error(
    "Invalid user response"
  );
}
```

Static hints and runtime validation solve different problems.

---

## 244. Do Not Pretend JavaScript Has Types It Cannot Enforce

This comment:

```js
// @type {User}
const user = externalData;
```

does not make untrusted data safe.

Validation still matters at runtime.

---

## 245. Use Schemas When Data Complexity Justifies Them

For large APIs and complex boundaries, a schema validation library can centralize:

```text
Parsing
Validation
Transformation
Error reporting
```

Use one when the complexity warrants the dependency.

---

## 246. Modern JavaScript and Testing

New syntax should remain easy to test.

Example:

```js
function normalizeUser({
  name,
  email
}) {
  return {
    name: name.trim(),
    email: email.trim().toLowerCase()
  };
}
```

This can be tested directly without requiring a browser or framework.

Prefer designs that preserve this testability.

---

## 247. Use Deterministic Modern APIs in Tests

For code using:

```js
Date.now();
Math.random();
crypto.randomUUID();
```

consider dependency injection or controlled test environments when exact output matters.

Modern APIs do not remove the need for deterministic testing.

---

## 248. Modern JavaScript and Documentation

When introducing an unusual modern feature, document why it exists.

Example:

```js
// Use a Map because object identity is the cache key.
const cache = new Map();
```

This prevents future developers from replacing a deliberate structure with a less appropriate one.

---

## 249. Modern JavaScript and Team Consistency

A project should have a consistent baseline for:

```text
Variables
Modules
Async code
Error handling
Imports
Formatting
Naming
Browser APIs
Compatibility
```

Developers should not encounter five competing styles for the same task.

---

## 250. Do Not Turn Style Preferences Into Universal Laws

Examples:

```text
"Never use classes."
"Always use functional programming."
"Always use arrow functions."
"Never use loops."
"Always use reduce."
```

These statements are too absolute.

Professional JavaScript uses multiple paradigms intentionally.

---

## 251. Use the Simplest Correct Feature

Before choosing an advanced feature, ask:

> Does it make this code easier to understand?

For example:

```js
const active =
  Boolean(user?.active);
```

may be enough.

There may be no reason to introduce a custom abstraction.

---

## 252. Avoid Syntax Novelty

Do not change:

```js
const users = [];
```

to a more advanced construct merely because it is newer.

Technology adoption should solve a problem.

---

## 253. Modernize Around Real Maintenance Work

Useful opportunities include:

* Replacing unsafe patterns
* Improving async flow
* Removing deprecated APIs
* Simplifying data transformations
* Improving module boundaries
* Adding cancellation
* Improving error handling
* Improving browser compatibility

Modernization is most effective when tied to actual engineering needs.

---

## 254. Modern JavaScript Migration Strategy

A practical migration can be:

```text
Identify old pattern
↓
Verify target runtime support
↓
Understand semantic differences
↓
Change one feature
↓
Run tests
↓
Compare behavior
↓
Repeat
```

Avoid large blind rewrites.

---

## 255. Preserve Semantics During Modernization

For example:

```js
var value = 10;
```

becomes:

```js
const value = 10;
```

only if the variable is never reassigned and scope behavior remains correct.

If reassignment exists:

```js
let value = 10;
```

Do not mechanically replace every `var` with `const`.

---

## 256. Modern Syntax Should Reduce Error Surface

Good modernization can remove entire classes of mistakes.

Examples:

```text
const/let
→ clearer variable scope

optional chaining
→ safer optional access

nullish coalescing
→ clearer missing-value semantics

structured cloning
→ fewer accidental serialization losses

AbortController
→ explicit cancellation

ES modules
→ explicit dependencies
```

These features provide value because they improve correctness.

---

## 257. Avoid Features That Increase Error Surface Without Benefit

A feature may be modern but inappropriate if it makes:

```text
Control flow harder
Debugging harder
Compatibility harder
Dependencies greater
Team understanding weaker
```

Modern does not automatically mean better.

---

## 258. Modern JavaScript Decision Checklist

Before using a newer feature, ask:

* [ ] Does it solve a real problem?
* [ ] Is it supported by target runtimes?
* [ ] Does the build pipeline support it?
* [ ] Does the testing environment support it?
* [ ] Does it improve readability?
* [ ] Does it improve correctness?
* [ ] Does it simplify maintenance?
* [ ] Does it create hidden behavior?
* [ ] Does it require a polyfill?
* [ ] Does it introduce meaningful performance or memory costs?
* [ ] Will the team understand it?
* [ ] Is there a simpler equivalent?

---

## 259. Modern JavaScript Code Review Checklist

During review, ask:

* [ ] Are `const` and `let` used appropriately?
* [ ] Is `var` avoided unless a legacy requirement exists?
* [ ] Are optional values handled intentionally?
* [ ] Is `??` used where nullish semantics are required?
* [ ] Are array transformations expressed clearly?
* [ ] Is async control flow correct?
* [ ] Are promises handled without unnecessary wrappers?
* [ ] Are errors represented with `Error` objects?
* [ ] Are external values validated?
* [ ] Are module boundaries explicit?
* [ ] Are modern APIs supported by target environments?
* [ ] Is metaprogramming justified?
* [ ] Are side effects visible?
* [ ] Is business logic separated from infrastructure?
* [ ] Are performance claims supported by measurement?
* [ ] Is security preserved?
* [ ] Does the modernized code remain easy to debug?
* [ ] Is the chosen feature actually simpler than the alternative?

---

## 260. Final Principles

1. Modern JavaScript means intentional JavaScript, not merely newer syntax.
2. Prefer `const` by default and `let` when reassignment is required.
3. Avoid `var` in modern application code.
4. Distinguish binding immutability from object immutability.
5. Prefer explicit immutable transformations when shared state matters.
6. Use modern array methods when they communicate intent clearly.
7. Use `for...of` for clear procedural or sequential iteration.
8. Do not use `forEach` for asynchronous control flow that must be awaited.
9. Use optional chaining only when missing values are valid.
10. Use nullish coalescing when only `null` and `undefined` represent absence.
11. Use destructuring when it improves readability.
12. Use default parameters for genuine defaults.
13. Use rest and spread for clear data composition.
14. Remember that spread is shallow.
15. Use native platform APIs before writing custom equivalents.
16. Use `Object.hasOwn` for direct property ownership checks.
17. Use `Number.isNaN`, `Number.isFinite`, and `Number.isInteger` for precise numeric validation.
18. Use `Intl` for locale-sensitive formatting.
19. Use `URL` and `URLSearchParams` rather than fragile string manipulation.
20. Use `AbortController` for explicit cancellation.
21. Use `Promise.all`, `allSettled`, `any`, and `race` according to their actual semantics.
22. Keep asynchronous dependencies explicit.
23. Use `Error` objects and preserve error causes.
24. Isolate side effects from pure transformations where practical.
25. Use ES modules and explicit imports and exports.
26. Keep public module APIs small.
27. Avoid circular dependencies and hidden global state.
28. Prefer composition when behavior varies independently.
29. Use classes when object identity, lifecycle, encapsulation, or polymorphism provides real value.
30. Do not force functional or object-oriented programming into every problem.
31. Use private fields when real encapsulation is required.
32. Use metaprogramming sparingly and deliberately.
33. Avoid `eval` and other dynamic code execution mechanisms.
34. Do not use modern syntax as a substitute for clear design.
35. Verify runtime and browser support before adopting newer APIs.
36. Distinguish language syntax compatibility from runtime API compatibility.
37. Use feature detection for runtime capabilities.
38. Avoid unnecessary polyfills and compatibility complexity.
39. Prefer readable expressions over clever one-liners.
40. Use meaningful variable and function names.
41. Use intermediate variables when they improve semantic clarity.
42. Do not use `map` for side effects.
43. Do not use `reduce` merely to avoid writing a loop.
44. Keep functions focused and dependencies explicit.
45. Treat environment compatibility as an engineering constraint.
46. Use modern browser and platform APIs when they provide real benefits.
47. Keep security considerations independent from syntax choices.
48. Do not micro-optimize language syntax without measurement.
49. Modernize existing code when the change provides meaningful engineering value.
50. Preserve behavior when modernizing unless a behavior change is intentional.
51. Use tests to protect behavior during modernization.
52. Keep tooling aligned with the JavaScript features the project uses.
53. Do not enable every lint rule or adopt every new feature automatically.
54. Prefer stable language features over experimental ones in production unless there is a deliberate reason otherwise.
55. Optimize for correctness, readability, maintainability, and compatibility.
56. The best modern JavaScript is code that uses current capabilities without sacrificing clarity or engineering discipline.
