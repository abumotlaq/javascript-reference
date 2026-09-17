# Variables and Immutability

## Overview

Variables are one of the basic building blocks of JavaScript.

Good variable management is not only about choosing between `const` and `let`.

It also involves understanding:

```text
Bindings
Scope
Reassignment
Mutation
References
Object identity
Immutability
State transitions
```

A well-designed codebase makes it clear:

```text
What can change?
What should not change?
Who owns the value?
Where can the value be modified?
```

The goal is not to eliminate all mutation.

The goal is to make changes deliberate and predictable.

---

# Prefer `const` by Default

Use `const` when a variable binding does not need to be reassigned.

```js
const userName = "Osama Abu Motlaq";
const userRole = "Frontend Developer";
const userAge = 25;
```

Use `let` when reassignment is required:

```js
let retryCount = 0;

retryCount += 1;
```

Avoid choosing `let` simply because the variable may theoretically change.

Use the smallest amount of mutability necessary.

---

# Avoid `var` in Modern Code

Modern JavaScript generally provides better alternatives with `const` and `let`.

Avoid:

```js
var userName = "Osama Abu Motlaq";
```

Prefer:

```js
const userName = "Osama Abu Motlaq";
```

Or:

```js
let userName = "Osama Abu Motlaq";

userName = "Osama Abu Motlaq";
```

depending on whether reassignment is required.

`var` has different scoping and hoisting behavior that can make larger codebases harder to reason about.

---

# Reassignment vs Mutation

These are different concepts.

Reassignment changes what a variable binding refers to:

```js
let userName = "Osama Abu Motlaq";

userName = "Osama Abu Motlaq";
```

Mutation changes the contents of an existing object or array:

```js
const user = {
  name: "Osama Abu Motlaq",
};

user.name = "Osama Abu Motlaq";
```

The variable `user` was not reassigned.

The object it references was mutated.

This distinction is fundamental.

---

# `const` Does Not Mean Deep Immutability

This is valid:

```js
const user = {
  name: "Osama Abu Motlaq",
};

user.name = "Osama Abu Motlaq";
```

But this is not:

```js
user = {
  name: "Osama Abu Motlaq",
};
```

`const` prevents reassignment of the binding.

It does not automatically freeze the referenced object.

---

# Arrays Can Also Be Mutated

This is valid:

```js
const skills = [
  "JavaScript",
  "React",
];

skills.push("Next.js");
```

The variable still points to the same array.

The array contents changed.

---

# Understand Object References

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const anotherUser = user;
```

Both variables refer to the same object.

Therefore:

```js
anotherUser.name =
  "Osama Abu Motlaq";
```

also changes:

```js
user.name;
```

Both bindings point to the same object.

---

# Object Identity

Two objects with identical properties are still different objects:

```js
const userA = {
  name: "Osama Abu Motlaq",
};

const userB = {
  name: "Osama Abu Motlaq",
};

console.log(
  userA === userB
);
```

The result is:

```text
false
```

Because the objects have different identities.

---

# Shared References Can Create Unexpected Mutation

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const profile = user;

profile.name =
  "Osama Abu Motlaq";
```

The original `user` is also changed.

This can become difficult to debug when references are passed through several functions.

---

# Prefer Local Ownership

A function should make it reasonably clear whether it:

```text
Reads a value
Returns a new value
Mutates the original value
```

For example:

```js
function formatUser(user) {
  return {
    ...user,
    name: user.name.trim(),
  };
}
```

This creates a new object.

The original `user` is preserved.

---

# Prefer Non-Mutating Operations When Sharing Data

Instead of:

```js
const updatedUser = user;

updatedUser.role =
  "Frontend Developer";
```

prefer:

```js
const updatedUser = {
  ...user,
  role: "Frontend Developer",
};
```

Now:

```text
user
```

and:

```text
updatedUser
```

are separate objects.

---

# Object Spread Creates a Shallow Copy

This:

```js
const copiedUser = {
  ...user,
};
```

creates a new top-level object.

It does not recursively clone every nested object.

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
  address: {
    city: "Gaza",
  },
};

const copiedUser = {
  ...user,
};

copiedUser.address.city =
  "Gaza";
```

The nested `address` object is still shared.

---

# Nested References Matter

Consider:

```js
const user = {
  profile: {
    name: "Osama Abu Motlaq",
  },
};

const updatedUser = {
  ...user,
};

updatedUser.profile.name =
  "Osama Abu Motlaq";
```

The nested `profile` object is shared.

A shallow copy does not provide deep immutability.

---

# Immutable Nested Updates

When updating nested data, create new objects at each changed level.

```js
const updatedUser = {
  ...user,
  profile: {
    ...user.profile,
    name: "Osama Abu Motlaq",
  },
};
```

Now the changed path contains new object references.

---

# Arrays and Immutable Updates

Avoid mutating a shared array when the original value should remain unchanged.

Instead of:

```js
const skills = [
  "JavaScript",
  "React",
];

skills.push("Next.js");
```

use:

```js
const updatedSkills = [
  ...skills,
  "Next.js",
];
```

This creates a new array.

---

# Removing an Array Item

Instead of:

```js
const index =
  skills.indexOf("React");

skills.splice(index, 1);
```

use:

```js
const updatedSkills =
  skills.filter(
    (skill) => skill !== "React"
  );
```

This keeps the original array unchanged.

---

# Updating an Array Item

Instead of:

```js
skills[0] =
  "TypeScript";
```

use:

```js
const updatedSkills =
  skills.map(
    (skill, index) =>
      index === 0
        ? "TypeScript"
        : skill
  );
```

This creates a new array.

---

# Immutable Array Sorting

`sort()` mutates the original array.

Avoid:

```js
const sortedUsers =
  users.sort(
    compareUsers
  );
```

when the original `users` array must remain unchanged.

Prefer:

```js
const sortedUsers =
  [...users].sort(
    compareUsers
  );
```

or, in environments that support it:

```js
const sortedUsers =
  users.toSorted(
    compareUsers
  );
```

The important distinction is that the original array should not be modified when other code relies on it.

---

# Immutable Array Reversal

`reverse()` mutates its array.

Avoid:

```js
const reversed =
  users.reverse();
```

when preserving `users` matters.

Prefer:

```js
const reversed =
  [...users].reverse();
```

or:

```js
const reversed =
  users.toReversed();
```

when supported by the runtime.

---

# Immutable Array Splicing

`splice()` mutates the original array.

Instead of directly modifying shared data:

```js
items.splice(
  index,
  1
);
```

prefer a non-mutating operation such as:

```js
const updatedItems =
  items.filter(
    (_, itemIndex) =>
      itemIndex !== index
  );
```

---

# `push()` and `concat()`

`push()` mutates:

```js
items.push(newItem);
```

`concat()` returns a new array:

```js
const updatedItems =
  items.concat(newItem);
```

Spread syntax is also common:

```js
const updatedItems = [
  ...items,
  newItem,
];
```

Choose the representation that makes the ownership model clear.

---

# `unshift()` and Spread

Instead of mutating:

```js
items.unshift(newItem);
```

create a new array:

```js
const updatedItems = [
  newItem,
  ...items,
];
```

---

# Immutable Objects With Computed Properties

When the property name is dynamic:

```js
const field = "role";
const value =
  "Frontend Developer";

const updatedUser = {
  ...user,
  [field]: value,
};
```

This preserves the original object.

---

# Avoid Mutation Through Aliases

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const profile =
  user;

profile.name =
  "Osama Abu Motlaq";
```

The original `user` has changed.

If the goal is independent data:

```js
const profile = {
  ...user,
};
```

---

# Mutation Can Be Appropriate

Immutability is not automatically better in every situation.

Local mutation can be perfectly reasonable:

```js
function calculateTotal(numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}
```

The local `total` changes.

That is simple, predictable, and isolated.

There is no need to force an immutable abstraction here.

---

# Prefer Local Mutation Over Shared Mutation

This is easier to reason about:

```js
function calculateTotal(numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}
```

than mutating external state:

```js
let total = 0;

function calculateTotal(numbers) {
  for (const number of numbers) {
    total += number;
  }

  return total;
}
```

The first function owns its temporary state.

---

# Minimize Shared Mutable State

Shared mutable state occurs when multiple parts of an application can modify the same data.

For example:

```js
const appState = {
  users: [],
};

function addUser(user) {
  appState.users.push(user);
}
```

Other parts of the application can observe or change `appState`.

As a codebase grows, this can make behavior harder to predict.

---

# Prefer Explicit State Transitions

Instead of hiding mutations:

```js
user.role =
  "Frontend Developer";
```

a state transition can be represented explicitly:

```js
const updatedUser = {
  ...user,
  role: "Frontend Developer",
};
```

This makes the change visible at the point where it occurs.

---

# Immutability Helps With Change Detection

Many application frameworks compare references to determine whether something changed.

For example:

```js
const previousUser = {
  name: "Osama Abu Motlaq",
};

const nextUser = {
  ...previousUser,
  role: "Frontend Developer",
};
```

Now:

```js
previousUser !== nextUser;
```

This reference difference can make state changes easier to detect.

---

# Immutability in React

Immutability is particularly important in React state management.

Consider:

```js
const [user, setUser] =
  useState({
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  });
```

Avoid mutating the state object directly:

```js
user.role =
  "Frontend Developer";
```

Instead, create a new object:

```js
setUser({
  ...user,
  role: "Frontend Developer",
});
```

This gives React a new state reference.

---

# Immutable Array State in React

Avoid:

```js
skills.push("Next.js");

setSkills(skills);
```

Prefer:

```js
setSkills([
  ...skills,
  "Next.js",
]);
```

The state update creates a new array reference.

---

# Functional State Updates

When the next state depends on the previous state, prefer the functional update form.

```js
setCount(
  (previousCount) =>
    previousCount + 1
);
```

This makes the dependency on the previous state explicit.

---

# Multiple State Updates

Avoid assuming that immediately changing a state variable means the local variable itself changes synchronously.

For example:

```js
setCount(
  (count) => count + 1
);

setCount(
  (count) => count + 1
);
```

Functional updates correctly express two sequential state transformations.

This is especially important when several updates depend on prior state.

---

# Immutable Context Values

When using shared objects, avoid mutating values that other consumers may hold references to.

Prefer:

```js
const updatedTheme = {
  ...theme,
  mode: "dark",
};
```

instead of modifying the existing object in place when change detection depends on reference identity.

---

# Immutability and Function Arguments

JavaScript passes object references by value.

A function can mutate an object passed to it:

```js
function renameUser(user) {
  user.name =
    "Osama Abu Motlaq";
}
```

The caller's object is modified.

If mutation is not intended, return a new object:

```js
function renameUser(user) {
  return {
    ...user,
    name: "Osama Abu Motlaq",
  };
}
```

---

# Make Mutation Obvious

If a function intentionally mutates its argument, its behavior should be clear from the API and documentation.

Example:

```js
function addSkill(user, skill) {
  user.skills.push(skill);
}
```

This function mutates `user`.

An alternative:

```js
function addSkill(user, skill) {
  return {
    ...user,
    skills: [
      ...user.skills,
      skill,
    ],
  };
}
```

This function returns a new object.

The difference should be intentional.

---

# Do Not Pretend a Function Is Pure

Avoid a function that appears to return a transformed value but secretly modifies external state.

For example:

```js
function formatUser(user) {
  user.name =
    user.name.trim();

  return user;
}
```

The name suggests formatting.

But the function also mutates its input.

Prefer:

```js
function formatUser(user) {
  return {
    ...user,
    name: user.name.trim(),
  };
}
```

---

# Pure Functions and Immutability

Pure functions:

```text
Same input
    ↓
Same output
```

and they do not produce observable side effects.

For example:

```js
function add(a, b) {
  return a + b;
}
```

Pure functions often pair well with immutable data because their behavior becomes easier to reason about.

---

# Immutability Does Not Make Code Automatically Pure

Consider:

```js
const updatedUser = {
  ...user,
};

saveUser(updatedUser);
```

The new object is immutable from the perspective of that operation, but `saveUser()` may still produce a side effect.

Immutability and purity are related but distinct concepts.

---

# Shallow Freeze

JavaScript provides:

```js
Object.freeze();
```

Example:

```js
const user = Object.freeze({
  name: "Osama Abu Motlaq",
});
```

Direct mutation is prevented in strict mode.

However, `Object.freeze()` is shallow.

---

# Nested Objects and `Object.freeze`

Consider:

```js
const user = Object.freeze({
  profile: {
    name: "Osama Abu Motlaq",
  },
});
```

The top-level object is frozen.

The nested `profile` object is not automatically frozen.

Therefore:

```js
user.profile.name =
  "Osama Abu Motlaq";
```

can still mutate the nested object unless it is separately protected.

---

# Deep Freezing

A recursive deep-freeze utility can freeze nested objects:

```js
function deepFreeze(value) {
  if (
    value &&
    typeof value === "object"
  ) {
    Object.freeze(value);

    for (const child of Object.values(
      value
    )) {
      deepFreeze(child);
    }
  }

  return value;
}
```

Use such approaches only when there is a real need.

Deep freezing can add overhead and complexity.

---

# Immutability Through API Design

You do not always need `Object.freeze()`.

A function can simply avoid exposing mutable internals.

Instead of:

```js
class UserStore {
  users = [];
}
```

where callers can directly modify:

```js
store.users.push(user);
```

you can expose methods:

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

Now callers receive a new array instead of the internal reference.

---

# Protect Internal State

Private fields can help keep mutation under controlled ownership:

```js
class Counter {
  #count = 0;

  increment() {
    this.#count += 1;
  }

  getValue() {
    return this.#count;
  }
}
```

The class owns its internal mutable state.

External code cannot directly assign to `#count`.

---

# Returning Copies

Consider:

```js
class UserStore {
  #users = [];

  getUsers() {
    return this.#users;
  }
}
```

The caller now receives the internal array.

They could mutate it:

```js
store.getUsers().push(
  anotherUser
);
```

Prefer:

```js
getUsers() {
  return [...this.#users];
}
```

The caller receives a new array.

---

# Nested Copies Still Matter

A shallow copy protects the array structure:

```js
return [...this.#users];
```

but the user objects inside remain shared.

For complex nested structures, decide whether the API needs:

```text
Shallow copying
Deep copying
Read-only views
Immutable data structures
```

based on actual requirements.

---

# Avoid Defensive Copying Everywhere

Do not copy every object and array automatically.

Unnecessary copying can:

```text
Increase memory usage
Increase CPU work
Add noise
Make code harder to understand
```

Make copying decisions based on ownership and mutation risk.

---

# Ownership Is More Important Than Rules

Instead of asking:

```text
"Should I always avoid mutation?"
```

ask:

```text
"Who owns this value?"
"Who else can reference it?"
"Who is allowed to change it?"
"Should other code observe the change?"
```

These questions lead to better design decisions.

---

# Local Data vs Shared Data

Local data:

```js
function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}
```

Mutation of the local `total` is harmless.

Shared data:

```js
const cart = {
  items: [],
};
```

requires more careful mutation because multiple parts of the application may hold references to it.

---

# Prefer Clear State Boundaries

A good system makes state ownership clear.

For example:

```text
Component
   ↓
Owns local UI state

Store
   ↓
Owns shared application state

Server
   ↓
Owns persistent data
```

The exact architecture can differ, but ownership should be understandable.

---

# Avoid Global Mutable Variables

Avoid:

```js
let currentUser = null;
let currentTheme = "light";
let cartItems = [];
```

spread throughout application code.

Global mutable state can be modified from anywhere.

Prefer scoped state or dedicated state-management mechanisms when shared state is genuinely required.

---

# Module Scope Is Not Global Scope

This:

```js
const apiUrl = "...";
```

inside a JavaScript module is not automatically a global browser variable.

ES modules provide their own scope.

Still, module-level mutable state should be used intentionally:

```js
let cachedUser = null;
```

because every consumer of that module can observe its changing state.

---

# Avoid Hidden Module State

Avoid:

```js
let count = 0;

export function increment() {
  count += 1;
}
```

unless maintaining module-level state is intentional.

Sometimes this is appropriate.

But callers should understand that the module owns persistent mutable state.

---

# Prefer Return Values Over Hidden Mutation

Instead of:

```js
let total = 0;

function addPrice(price) {
  total += price;
}
```

prefer:

```js
function addPrice(total, price) {
  return total + price;
}
```

The second function makes the data flow explicit.

---

# Mutation in Loops

Local mutation is often clearer than functional overengineering.

This is perfectly reasonable:

```js
let total = 0;

for (const price of prices) {
  total += price;
}
```

Do not replace every loop with a complicated chain merely because mutation is considered undesirable.

---

# Use `reduce()` When It Improves Clarity

This is also valid:

```js
const total =
  prices.reduce(
    (sum, price) =>
      sum + price,
    0
  );
```

Choose based on readability.

The objective is not "zero mutation".

The objective is understandable code.

---

# Mutation vs Performance

Creating new objects and arrays can have a cost.

For example:

```js
const updatedItems = [
  ...items,
  newItem,
];
```

allocates a new array.

Mutating:

```js
items.push(newItem);
```

does not allocate a new array.

However, performance should not be used as an excuse for uncontrolled shared mutation.

Optimize after identifying a real bottleneck.

---

# Copy Only What Needs to Change

For nested state:

```js
const updatedState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: "Osama Abu Motlaq",
    },
  },
};
```

Only the objects along the changed path are recreated.

This is an important pattern for immutable state updates.

---

# Structural Sharing

Immutable update systems often reuse unchanged references.

Consider:

```js
const updatedState = {
  ...state,
  user: {
    ...state.user,
    name: "Osama Abu Motlaq",
  },
};
```

The new state and old state can still share references to unrelated nested data.

This reduces unnecessary copying.

---

# Equality and Immutability

With immutable updates, reference comparison can be useful:

```js
const nextUsers =
  users.filter(
    (user) => user.isActive
  );

if (nextUsers !== users) {
  // The array reference is new.
}
```

Reference equality does not prove that every nested value changed.

It only tells you about the reference being compared.

---

# Shallow Comparison

Consider:

```js
const previousUser = {
  name: "Osama Abu Motlaq",
};

const nextUser = {
  ...previousUser,
};
```

Then:

```js
previousUser === nextUser;
```

is:

```text
false
```

even though their properties contain equivalent data.

Reference equality and value equality are different concepts.

---

# Avoid Unnecessary Cloning

Avoid this without a reason:

```js
const copyA = {
  ...user,
};

const copyB = {
  ...copyA,
};

const copyC = {
  ...copyB,
};
```

Repeated copying creates noise and unnecessary allocations.

Create a new value when ownership or state transition requires it.

---

# Prefer Immutable Inputs for Reusable Functions

A reusable transformation function is often safer when it does not modify the caller's input.

Example:

```js
function sortUsersByName(users) {
  return [...users].sort(
    (a, b) =>
      a.name.localeCompare(b.name)
  );
}
```

The function does not unexpectedly reorder the caller's original array.

---

# Document Intentional Mutation

Sometimes mutation is the correct design.

Make the behavior obvious.

Example:

```js
function addUserToStore(store, user) {
  store.users.push(user);
}
```

A developer reading the function can immediately see that it mutates `store`.

For public APIs, documentation can make the mutation contract explicit.

---

# Avoid Mixing Mutation Models Unnecessarily

This can be confusing:

```js
function updateUser(user) {
  user.name =
    "Osama Abu Motlaq";

  return {
    ...user,
    role: "Frontend Developer",
  };
}
```

The function both mutates its input and creates a new object.

Prefer one clear model:

```js
function updateUser(user) {
  return {
    ...user,
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  };
}
```

Or, if mutation is intentional:

```js
function updateUser(user) {
  user.name =
    "Osama Abu Motlaq";

  user.role =
    "Frontend Developer";
}
```

Clear contracts are easier to reason about.

---

# Variables Should Have Narrow Scope

Keep variables as close as possible to where they are used.

Prefer:

```js
function saveUser(user) {
  const validatedUser =
    validateUser(user);

  save(validatedUser);
}
```

Avoid creating broad-scope variables when a narrower scope is sufficient.

---

# Block Scope

`const` and `let` are block-scoped:

```js
if (true) {
  const message =
    "Hello";
  
  console.log(message);
}
```

Outside the block:

```js
console.log(message);
```

the variable does not exist.

Keep variables scoped to the smallest useful region.

---

# Avoid Reusing Variable Names Too Broadly

Bad:

```js
const user = getUser();

function process() {
  const user = getAnotherUser();
}
```

This can be valid due to lexical scoping, but unnecessary shadowing can confuse readers.

Prefer names that clarify when different entities are involved:

```js
const currentUser =
  getUser();

function process() {
  const projectOwner =
    getAnotherUser();
}
```

---

# Variable Shadowing

Shadowing happens when an inner scope declares the same name:

```js
const user = {
  name: "Osama Abu Motlaq",
};

function printUser() {
  const user = {
    name: "Osama Abu Motlaq",
  };

  console.log(user);
}
```

Although valid, excessive shadowing can make code harder to trace.

Use shadowing only when the inner meaning is genuinely obvious.

---

# Avoid Long-Lived Mutable Variables

A variable that changes across many unrelated parts of a function can become difficult to reason about.

Weak:

```js
let value;

value = loadValue();

if (value) {
  value = normalizeValue(value);
}

if (value) {
  value = formatValue(value);
}

if (value) {
  value = saveValue(value);
}
```

Prefer smaller transformations when practical:

```js
const loadedValue =
  loadValue();

if (!loadedValue) {
  return;
}

const normalizedValue =
  normalizeValue(
    loadedValue
  );

const formattedValue =
  formatValue(
    normalizedValue
  );

const savedValue =
  saveValue(
    formattedValue
  );
```

Each stage has a clearer meaning.

---

# Prefer New Names for Distinct States

Instead of repeatedly changing:

```js
let data = loadData();

data = normalizeData(data);

data = formatData(data);
```

sometimes use:

```js
const rawData =
  loadData();

const normalizedData =
  normalizeData(rawData);

const formattedData =
  formatData(normalizedData);
```

This is especially useful when debugging or reviewing transformations.

---

# Do Not Overdo Intermediate Variables

This can become excessive:

```js
const trimmedName =
  user.name.trim();

const lowercasedName =
  trimmedName.toLowerCase();

const normalizedName =
  lowercasedName;

const finalName =
  normalizedName;
```

Too many names can add more noise than value.

Use intermediate variables when they improve meaning or debugging.

---

# Immutable Configuration

Configuration is often a strong candidate for immutability:

```js
const config = {
  apiUrl: "/api",
  timeout: 5000,
};
```

Do not modify configuration unexpectedly throughout the application.

If a value must change at runtime, make the state transition explicit.

---

# Treat Constants as Contracts

A true constant communicates:

```text
This value is intentionally fixed.
```

For example:

```js
const MAX_RETRIES = 3;
```

Changing such a constant should be a deliberate configuration decision.

---

# Avoid Mutable Default Objects

Be careful with shared mutable defaults:

```js
const defaultOptions = {
  retries: 3,
};
```

If functions mutate this object, multiple calls may share unexpected state.

Prefer creating fresh values when mutation is possible:

```js
function createOptions() {
  return {
    retries: 3,
  };
}
```

---

# Function Default Parameters

Default primitive values are simple:

```js
function createUser(
  name = "Osama Abu Motlaq"
) {
  // ...
}
```

For objects, consider how mutation is handled:

```js
function createUser(
  options = {}
) {
  // ...
}
```

A new default object is created per function call.

---

# Avoid Reusing Mutable Defaults

Avoid module-level mutable objects as defaults:

```js
const defaultOptions = {};

function createUser(
  options = defaultOptions
) {
  // ...
}
```

if the function may mutate `options`.

The same object could then be reused across calls.

---

# Immutability and Caching

Caches are inherently mutable:

```js
const cache = new Map();

function getUser(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const user =
    loadUser(id);

  cache.set(id, user);

  return user;
}
```

This is not inherently bad.

The cache has a clear owner and a specific responsibility.

The problem would be uncontrolled mutable state without clear ownership.

---

# Immutability and Resource Management

Mutable state is often appropriate for:

```text
Caches
Counters
Queues
Buffers
Connection pools
Resource registries
Internal class state
```

What matters is controlled ownership and predictable behavior.

---

# Immutability and Performance Trade-Offs

Immutability can improve:

```text
Predictability
Debugging
Change detection
State management
Functional composition
```

But may increase:

```text
Allocations
Garbage collection pressure
Copying cost
Memory usage
```

Use it where it improves correctness and maintainability.

Optimize specific hot paths when measurements justify it.

---

# Use Immutability Where It Provides Value

Good candidates:

```text
Shared application state
React state
Data crossing module boundaries
Reusable transformation functions
Public API inputs
Configuration
Derived application data
```

Potentially less important:

```text
Tiny local accumulators
Private implementation details
Performance-sensitive internal loops
Mutable caches with clear ownership
```

Context matters.

---

# Do Not Turn Immutability Into Dogma

There is a difference between:

```text
Controlled local mutation
```

and:

```text
Uncontrolled shared mutation
```

The first is often simple and efficient.

The second is a common source of hidden behavior.

The goal is not "never mutate."

The goal is:

```text
Make mutation intentional.
Keep ownership clear.
Minimize shared mutation.
Prefer predictable state transitions.
```

---

# Practical Decision Framework

When deciding whether to mutate or create a new value, ask:

```text
Who owns this value?

Is the value shared?

Can another part of the program hold a reference to it?

Does another consumer depend on the old value?

Will reference changes be used for state detection?

Would mutation make the function's behavior surprising?

Would copying add meaningful overhead?

Is the mutation local and easy to reason about?
```

Then choose the simplest design that preserves correctness.

---

# Example: Updating User Data

Mutating approach:

```js
function updateUser(user) {
  user.role =
    "Frontend Developer";

  return user;
}
```

Immutable approach:

```js
function updateUser(user) {
  return {
    ...user,
    role: "Frontend Developer",
  };
}
```

The second approach is often safer when the original object may be shared.

---

# Example: Updating Nested Data

```js
function updateUserCity(user) {
  return {
    ...user,
    profile: {
      ...user.profile,
      address: {
        ...user.profile.address,
        city: "Gaza",
      },
    },
  };
}
```

Each changed level gets a new object.

Unchanged branches can keep their original references.

---

# Example: Updating an Array

```js
function addProject(projects, project) {
  return [
    ...projects,
    project,
  ];
}
```

Removing:

```js
function removeProject(
  projects,
  projectId
) {
  return projects.filter(
    (project) =>
      project.id !== projectId
  );
}
```

Updating:

```js
function updateProject(
  projects,
  projectId,
  updates
) {
  return projects.map(
    (project) =>
      project.id === projectId
        ? {
            ...project,
            ...updates,
          }
        : project
  );
}
```

These operations preserve the original array.

---

# Example: Intentional Local Mutation

```js
function buildSearchQuery(
  words
) {
  const parts = [];

  for (const word of words) {
    const trimmedWord =
      word.trim();

    if (trimmedWord) {
      parts.push(trimmedWord);
    }
  }

  return parts.join(" ");
}
```

The `parts` array is mutated locally.

This is simple and does not create shared-state problems.

---

# Example: Encapsulated Mutation

```js
class Counter {
  #value = 0;

  increment() {
    this.#value += 1;
  }

  decrement() {
    this.#value -= 1;
  }

  getValue() {
    return this.#value;
  }
}
```

The class owns the mutable state.

External code does not modify the field directly.

---

# Example: Avoiding an Exposed Mutable Reference

Weak:

```js
class SkillStore {
  #skills = [];

  getSkills() {
    return this.#skills;
  }
}
```

Safer:

```js
class SkillStore {
  #skills = [];

  getSkills() {
    return [...this.#skills];
  }
}
```

The caller receives a separate array.

---

# Immutable Data Does Not Mean No References

Even immutable-style code uses references.

The difference is that code avoids changing shared objects through those references.

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const nextUser = {
  ...user,
};
```

Both objects contain related data.

But changing `nextUser` does not automatically change `user` at the top level.

---

# Be Careful With Nested References

This remains shared:

```js
const user = {
  profile: {
    name: "Osama Abu Motlaq",
  },
};

const nextUser = {
  ...user,
};
```

The nested objects still reference the same values.

For nested updates, copy the path that changes.

---

# Immutability and Dates

JavaScript `Date` objects are mutable.

For example:

```js
const date = new Date();

date.setFullYear(2027);
```

If a date object is shared, this changes the same object.

When necessary, create a new `Date`:

```js
const nextDate =
  new Date(date);

nextDate.setFullYear(2027);
```

The same ownership principle applies.

---

# Immutability and `Map`

`Map` is mutable:

```js
const users = new Map();

users.set(
  1,
  "Osama Abu Motlaq"
);
```

Mutation can be appropriate when the `Map` has clear ownership.

Do not assume every modern data structure must be treated as immutable.

---

# Immutability and `Set`

`Set` is also mutable:

```js
const skills = new Set();

skills.add("JavaScript");
skills.add("React");
```

Again, the key question is ownership and visibility of mutation.

---

# `Object.freeze()` Is Not a General Solution

Do not assume this solves all immutability requirements:

```js
Object.freeze(user);
```

It is shallow and can also make some update patterns more awkward.

Often, explicit immutable updates are easier to understand.

---

# Immutability and Serialization

Serialized data is naturally separated from its original object graph.

For example:

```js
const serialized =
  JSON.stringify(user);

const parsed =
  JSON.parse(serialized);
```

`parsed` is a different object structure.

However, serialization changes data types and is not a universal cloning strategy.

---

# Do Not Use JSON Serialization as a Generic Clone

Avoid treating:

```js
JSON.parse(
  JSON.stringify(value)
);
```

as a universal deep-cloning solution.

It can lose or change values such as:

```text
undefined
Date
Map
Set
BigInt
Functions
Special object structures
```

Use appropriate cloning strategies for the actual data.

---

# `structuredClone()`

Modern JavaScript environments provide:

```js
const clonedUser =
  structuredClone(user);
```

This can perform a deep clone for many structured-clone-compatible values.

But cloning is not always the right solution.

Often, explicitly creating the new state you need is simpler.

---

# Prefer Targeted Updates Over Full Deep Clones

Instead of:

```js
const clonedState =
  structuredClone(state);

clonedState.user.name =
  "Osama Abu Motlaq";
```

often prefer:

```js
const nextState = {
  ...state,
  user: {
    ...state.user,
    name: "Osama Abu Motlaq",
  },
};
```

The second approach communicates exactly what changed.

---

# Variable Declaration Checklist

Before declaring a variable, ask:

```text
[ ] Does this value need reassignment?

[ ] If not, can I use const?

[ ] Is the scope as small as possible?

[ ] Is the name meaningful?

[ ] Is the value shared?

[ ] Can the value be mutated?

[ ] Should mutation be allowed?

[ ] Could another reference observe the mutation?

[ ] Would a new value make ownership clearer?
```

---

# Immutability Checklist

Before mutating an object or array, ask:

```text
[ ] Do I own this value?

[ ] Could another part of the application
    hold a reference to it?

[ ] Is mutation intentional?

[ ] Will the old value still be needed?

[ ] Does the framework depend on reference changes?

[ ] Would an immutable update be clearer?

[ ] Is the copied structure shallow or nested?

[ ] Is the copying cost justified?

[ ] Would local mutation be simpler and safer?
```

---

# Recommended Rules for This Reference

The JavaScript examples in this repository should generally follow these principles:

```text
Use const by default.

Use let only when reassignment is needed.

Avoid var in modern code.

Keep variable scope narrow.

Prefer descriptive variable names.

Distinguish reassignment from mutation.

Avoid uncontrolled shared mutation.

Prefer immutable updates for shared state.

Prefer non-mutating transformations when
data ownership matters.

Allow simple local mutation when it improves
clarity and does not escape its scope.

Copy only the parts of nested data that change.

Do not use Object.freeze() automatically.

Do not deep-clone data without a reason.

Treat ownership as the primary design question.
```

---

# Final Principles

```text
const protects a binding, not an object.

Mutation and reassignment are different.

Objects and arrays are reference-based values.

Shared mutable state increases complexity.

Local mutation is often acceptable.

Immutable updates create new references.

Shallow copies do not clone nested objects.

Deep immutability has a cost.

Ownership should determine mutation strategy.

Do not make immutability a dogma.

Prefer predictable state transitions.

Keep mutation explicit.

Use the simplest approach that preserves correctness.
```

---

# Summary

Good variable management is fundamentally about controlling change.

A maintainable JavaScript codebase does not need to eliminate mutation everywhere.

Instead, it should make the following clear:

```text
Who owns the value?
Who can change it?
When can it change?
What references can observe the change?
What should remain unchanged?
```

The practical rule is:

```text
Use const by default.
Use let when reassignment is necessary.
Keep mutable state local when possible.
Avoid uncontrolled shared mutation.
Create new values when preserving old references matters.
Copy only what needs to change.
Choose clarity over dogma.
```

The goal is not "immutable code."

The goal is:

```text
Predictable state
       +
Clear ownership
       +
Controlled mutation
       +
Explicit data flow
       =
Maintainable JavaScript
```
