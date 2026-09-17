# JavaScript Code Style

## Overview

Code style is the set of conventions used to make source code consistent, readable, and predictable.

Code style does not change what JavaScript can do.

It changes how easily humans can understand and maintain the code.

A good style should make it easier to answer:

```text
What does this code do?
Why does it do it?
Where should I modify it?
What happens if the input changes?
```

The goal is not to make every project look identical.

The goal is consistency within a project.

---

# Consistency First

A consistent codebase is easier to read than one where every file uses a different style.

Prefer:

```js
const userName = "Osama Abu Motlaq";
const userRole = "Frontend Developer";

function getUserProfile() {
  return {
    userName,
    userRole,
  };
}
```

Avoid inconsistent formatting such as:

```js
const userName="Osama Abu Motlaq";
const userRole = 'Frontend Developer'

function getUserProfile(){
return { userName,userRole }
}
```

The second example can still work, but inconsistent formatting increases cognitive load.

---

# Use a Consistent Indentation Style

Use one indentation style throughout the project.

A common choice is:

```js
function greet() {
  if (true) {
    console.log(
      "Hello, Osama Abu Motlaq!"
    );
  }
}
```

Avoid mixing indentation styles in the same project.

---

# Indent Nested Code Clearly

Prefer:

```js
if (isValid) {
  if (isAuthenticated) {
    loadDashboard();
  }
}
```

Avoid compressed formatting:

```js
if (isValid) {
if (isAuthenticated) {
loadDashboard();
}}
```

Indentation should visually communicate the structure of the program.

---

# Use Consistent Braces

Prefer braces for multi-line control flow:

```js
if (isActive) {
  console.log("Active");
}
```

Instead of:

```js
if (isActive)
  console.log("Active");
```

Braces make later modifications safer.

For example, adding another statement becomes straightforward:

```js
if (isActive) {
  console.log("Active");
  updateStatus();
}
```

---

# Braces Reduce Accidental Errors

This can be dangerous:

```js
if (isValid)
  processUser();

  logActivity();
```

Only `processUser()` belongs to the `if`.

With braces:

```js
if (isValid) {
  processUser();
  logActivity();
}
```

the intended scope is explicit.

---

# One Logical Statement Per Line

Prefer:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";
const language = "JavaScript";
```

over:

```js
const name = "Osama Abu Motlaq"; const role = "Frontend Developer"; const language = "JavaScript";
```

One logical statement per line improves scanning and debugging.

---

# Use Semicolons Consistently

JavaScript supports automatic semicolon insertion.

Both styles can be valid:

```js
const name = "Osama Abu Motlaq";
```

and:

```js
const name = "Osama Abu Motlaq"
```

The important rule is consistency.

For this reference, use semicolons consistently:

```js
const name = "Osama Abu Motlaq";
const age = 25;

console.log(name);
console.log(age);
```

---

# Avoid Relying on Automatic Semicolon Insertion

Consider:

```js
return
{
  name: "Osama Abu Motlaq",
};
```

JavaScript interprets this differently from:

```js
return {
  name: "Osama Abu Motlaq",
};
```

Consistent semicolon usage does not eliminate every ASI issue, but it reduces ambiguity.

---

# Use Double or Single Quotes Consistently

Both are valid:

```js
const name = "Osama Abu Motlaq";
```

and:

```js
const name = 'Osama Abu Motlaq';
```

Choose one style for a project.

For this reference, use double quotes in JavaScript examples.

---

# Strings That Contain Double Quotes

If the string contains double quotes, use escaping:

```js
const message = "He said \"Hello\".";
```

Or use single quotes if that is the established project style:

```js
const message = 'He said "Hello".';
```

The important point is consistency and readability.

---

# Template Literals

When interpolation is needed, prefer template literals:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const message =
  `${name} is a ${role}.`;
```

Instead of excessive concatenation:

```js
const message =
  name +
  " is a " +
  role +
  ".";
```

Template literals usually communicate the structure more clearly.

---

# Avoid Unnecessary Template Literals

Do not use a template literal when there is no interpolation or special formatting requirement.

Prefer:

```js
const role = "Frontend Developer";
```

instead of:

```js
const role = `${"Frontend Developer"}`;
```

Use the simplest representation that communicates the intent.

---

# Spaces Around Operators

Prefer:

```js
const total = price + shipping;
```

Avoid:

```js
const total=price+shipping;
```

Use spaces around binary operators:

```js
a + b
a - b
a * b
a / b
a === b
a && b
a || b
```

---

# Spaces After Commas

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

Avoid:

```js
const user = {
  name: "Osama Abu Motlaq",
  role:"Frontend Developer",
};
```

---

# Blank Lines

Use blank lines to separate logical sections.

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const skills = [
  "JavaScript",
  "React",
  "Next.js",
];

function showProfile() {
  console.log(user);
}
```

Blank lines should help organization, not create large empty areas.

---

# Avoid Excessive Blank Lines

Avoid:

```js
const name = "Osama Abu Motlaq";



const role = "Frontend Developer";




console.log(name);
```

Use spacing intentionally.

---

# Line Length

Avoid extremely long lines.

Prefer:

```js
const profile = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  language: "JavaScript",
};
```

instead of putting a large object or complex expression on one very long line.

There is no universal perfect line length.

Follow the formatter and conventions chosen by the project.

---

# Break Long Function Calls

Prefer:

```js
const result = calculateProfile(
  "Osama Abu Motlaq",
  "Frontend Developer",
  "JavaScript"
);
```

over:

```js
const result = calculateProfile("Osama Abu Motlaq", "Frontend Developer", "JavaScript");
```

When arguments become difficult to scan, use multiple lines.

---

# Break Long Conditions

Prefer:

```js
if (
  user &&
  user.isActive &&
  user.role === "Frontend Developer"
) {
  loadProfile();
}
```

over a very long single line.

---

# Use Trailing Commas Consistently

For multi-line structures, trailing commas can make future edits easier.

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

And:

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];
```

A formatter can enforce the project's chosen convention.

---

# Object Formatting

Prefer one property per line when an object becomes multi-line:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  experience: 2,
};
```

For very small objects, a single line can be fine:

```js
const point = { x: 10, y: 20 };
```

The choice should prioritize readability.

---

# Array Formatting

Small array:

```js
const skills = ["JavaScript", "React"];
```

Larger array:

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
];
```

Do not force every array into one format.

---

# Function Formatting

Prefer:

```js
function calculateTotal(
  price,
  shipping
) {
  return price + shipping;
}
```

When parameters are short, this is also readable:

```js
function calculateTotal(price, shipping) {
  return price + shipping;
}
```

Use line breaks when they improve readability.

---

# Arrow Function Formatting

Prefer concise syntax when the function is simple:

```js
const double = (number) =>
  number * 2;
```

For multi-step logic:

```js
const processUser = (user) => {
  const name =
    user.name.trim();

  return {
    ...user,
    name,
  };
};
```

Do not use implicit returns for complicated logic merely to reduce line count.

---

# Parentheses Around Arrow Parameters

JavaScript allows:

```js
const double = number =>
  number * 2;
```

and:

```js
const double = (number) =>
  number * 2;
```

For consistency, choose one style.

For this reference, use parentheses:

```js
const double = (number) =>
  number * 2;
```

This also avoids visual inconsistency when adding a second parameter later.

---

# Explicit Return vs Implicit Return

Implicit return:

```js
const double = (number) =>
  number * 2;
```

Explicit return:

```js
const double = (number) => {
  return number * 2;
};
```

Prefer the shorter form for simple expressions.

Prefer explicit `return` when the function contains multiple statements.

---

# Avoid Deep Nesting

Instead of:

```js
if (user) {
  if (user.isActive) {
    if (user.role) {
      if (user.role === "Frontend Developer") {
        showProfile();
      }
    }
  }
}
```

consider guard clauses:

```js
if (!user) {
  return;
}

if (!user.isActive) {
  return;
}

if (!user.role) {
  return;
}

if (user.role !== "Frontend Developer") {
  return;
}

showProfile();
```

The goal is to keep the main path easy to read.

---

# Early Returns

Early returns can reduce nesting:

```js
function getRole(user) {
  if (!user) {
    return null;
  }

  if (!user.role) {
    return null;
  }

  return user.role;
}
```

This is often easier to scan than deeply nested branches.

Do not use early returns mechanically when they make the control flow harder to understand.

---

# Switch Formatting

Prefer:

```js
switch (status) {
  case "loading":
    showLoading();
    break;

  case "success":
    showSuccess();
    break;

  case "error":
    showError();
    break;

  default:
    showUnknown();
}
```

The structure should make each case visually distinct.

---

# Ternary Formatting

Simple ternary:

```js
const label =
  isActive
    ? "Active"
    : "Inactive";
```

Avoid deeply nested ternaries:

```js
const label =
  isActive
    ? isAdmin
      ? "Admin"
      : "User"
    : "Inactive";
```

For complex conditions, use `if` or a dedicated function.

---

# Avoid Clever One-Liners

Avoid compressing unrelated logic into one expression.

For example:

```js
isValid && saveUser() && notifyUser();
```

This may be technically valid but can hide the control flow.

Prefer:

```js
if (isValid) {
  saveUser();
  notifyUser();
}
```

when the operations represent distinct steps.

---

# Logical Operators

Logical operators can be useful for short, obvious conditions:

```js
isActive && showProfile();
```

But avoid relying on them for complicated control flow.

Prefer explicit statements when the behavior is important or multi-step.

---

# Nullish Coalescing

Use `??` when you specifically want a fallback for:

```text
null
undefined
```

Example:

```js
const name =
  user.name ?? "Unknown";
```

This is different from:

```js
const name =
  user.name || "Unknown";
```

which also treats values such as:

```text
0
""
false
NaN
```

as falsy.

Use the operator whose semantics match the requirement.

---

# Optional Chaining

Use optional chaining when a value may genuinely be missing:

```js
const role =
  user?.profile?.role;
```

Avoid using it to hide programming errors where the object is expected to exist.

---

# Avoid Excessive Optional Chaining

This:

```js
const value =
  application
    ?.user
    ?.profile
    ?.settings
    ?.preferences
    ?.theme;
```

may be appropriate for genuinely optional data.

But if every layer is guaranteed by the application architecture, excessive optional chaining can hide invalid state.

---

# Comments Should Explain Why

Prefer:

```js
// Delay the request to avoid sending
// a request for every keystroke.
const search = debounce(
  performSearch,
  300
);
```

Avoid:

```js
// Create debounce.
const search = debounce(
  performSearch,
  300
);
```

The code already shows what it does.

The comment should explain reasoning that is not obvious from the code.

---

# Avoid Commented-Out Code

Avoid leaving large unused blocks:

```js
// const oldValue = 10;
// const oldResult = calculate(oldValue);
// console.log(oldResult);
```

Version control already preserves old versions.

Delete obsolete code instead of turning the source file into a historical archive.

---

# Temporary Debugging Code

Avoid committing debugging output unnecessarily:

```js
console.log(
  "DEBUG",
  user
);
```

Logging can be useful.

But production code should have an intentional logging strategy.

---

# Use Meaningful Boolean Formatting

Prefer:

```js
const isActive = true;
const hasAccess = false;
const canEdit = true;
```

instead of:

```js
const active = true;
const access = false;
const edit = true;
```

Boolean names should make the condition read naturally.

---

# Boolean Function Names

Prefer:

```js
function isValidUser() {}
function hasAccess() {}
function canEditProject() {}
```

over:

```js
function user() {}
function access() {}
function edit() {}
```

The name should make the returned boolean obvious.

---

# Avoid Boolean Names With Ambiguous Meaning

Avoid:

```js
const status = true;
```

Prefer:

```js
const isOnline = true;
```

The second name communicates what `true` means.

---

# Constants

Use descriptive names.

```js
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
```

For values that are true configuration constants, uppercase naming can communicate intent.

However, do not use uppercase for every variable that happens not to be reassigned.

---

# `const` Does Not Make Data Immutable

This is valid:

```js
const user = {
  name: "Osama Abu Motlaq",
};

user.name =
  "Osama Abu Motlaq - Developer";
```

The variable binding cannot be reassigned:

```js
user = {};
```

but the object itself can still be mutated.

Code style should distinguish:

```text
Binding immutability
```

from:

```text
Object immutability
```

---

# Use `const` by Default

Prefer:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";
```

Use `let` when reassignment is actually required:

```js
let count = 0;

count += 1;
```

Avoid `var` in modern application code unless you have a specific legacy reason.

---

# Avoid Unnecessary Mutation

Prefer:

```js
const updatedUser = {
  ...user,
  role: "Frontend Developer",
};
```

when preserving the original object is important.

But do not turn simple local mutable algorithms into unnecessarily complicated immutable code.

Context matters.

---

# Function Parameters

Use meaningful names:

```js
function calculateTotal(
  price,
  shippingCost
) {
  return price + shippingCost;
}
```

Avoid:

```js
function calculateTotal(
  x,
  y
) {
  return x + y;
}
```

unless the variables are genuinely generic mathematical values where the short names are conventional.

---

# Avoid Excessive Parameters

A function with many unrelated parameters can become hard to call correctly.

Instead of:

```js
function createUser(
  name,
  email,
  role,
  country,
  language,
  theme,
  notifications
) {
  // ...
}
```

consider an options object:

```js
function createUser({
  name,
  email,
  role,
  country,
  language,
  theme,
  notifications,
}) {
  // ...
}
```

This becomes especially useful as the number of optional parameters grows.

---

# Format Long Object Destructuring

Prefer:

```js
const {
  name,
  role,
  email,
} = user;
```

over:

```js
const { name, role, email } = user;
```

when the line becomes difficult to scan.

---

# Format Long Imports

Prefer:

```js
import {
  createUser,
  deleteUser,
  updateUser,
} from "./users.js";
```

when there are many named imports.

---

# Import Organization

A common project convention is to organize imports into logical groups:

```js
import fs from "node:fs";

import { createUser } from "./users.js";
import { formatName } from "./utils.js";
```

The exact grouping rules depend on the project's tooling.

Consistency matters more than one universal ordering rule.

---

# Module Boundaries

Keep imports and exports intentional.

Prefer:

```js
export function calculateTotal(
  price,
  shipping
) {
  return price + shipping;
}
```

over exporting every internal helper just because it can be exported.

A smaller public API is usually easier to maintain.

---

# Avoid Unnecessary Aliases

Instead of:

```js
const userProfileData =
  user.profile;
```

when `user.profile` is already clear and used once, consider using it directly.

But aliases are useful when:

```text
The expression is long
The value is reused
The name communicates important meaning
```

---

# Make Repetition Visual

Prefer:

```js
const firstName =
  user.firstName;

const lastName =
  user.lastName;

const role =
  user.role;
```

over densely packing unrelated values onto one line.

Readable formatting makes code review easier.

---

# Avoid Horizontal Compression

Avoid:

```js
const user={name:"Osama Abu Motlaq",role:"Frontend Developer",active:true};
```

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  active: true,
};
```

Readable source code is easier to inspect and modify.

---

# Vertical Spacing Should Reflect Structure

Good formatting:

```js
function loadUser() {
  const response =
    await fetch("/api/user");

  const user =
    await response.json();

  return user;
}
```

The blank lines separate meaningful operations.

---

# Keep Related Code Together

Prefer:

```js
const button =
  document.querySelector(
    "#save"
  );

if (button) {
  button.addEventListener(
    "click",
    saveUser
  );
}
```

Keep selection and immediate setup close together when they belong to the same responsibility.

---

# Separate Unrelated Responsibilities

Avoid very large blocks where:

```text
DOM code
network code
storage code
validation
business logic
logging
```

are mixed without structure.

Separate logical responsibilities into functions or modules as complexity grows.

---

# Function Declaration Style

Use a consistent convention.

Example:

```js
function calculateTotal(
  price,
  shipping
) {
  return price + shipping;
}
```

For named reusable functions, declarations are often clear.

---

# Function Expression Style

Function expressions are useful when assigning behavior to a variable:

```js
const calculateTotal =
  function (
    price,
    shipping
  ) {
    return price + shipping;
  };
```

Use them when the semantic reason is meaningful, not simply because both forms exist.

---

# Arrow Functions for Callbacks

Arrow functions are often concise for callbacks:

```js
const doubled =
  numbers.map(
    (number) =>
      number * 2
  );
```

For complex callback logic, a named function can improve readability:

```js
function double(number) {
  return number * 2;
}

const doubled =
  numbers.map(double);
```

---

# Avoid Deeply Nested Callbacks

Avoid:

```js
loadUser((user) => {
  loadProjects(user, (projects) => {
    loadSettings(projects, (settings) => {
      renderDashboard(
        user,
        projects,
        settings
      );
    });
  });
});
```

Modern Promise-based APIs often allow clearer flow:

```js
async function loadDashboard() {
  const user =
    await loadUser();

  const projects =
    await loadProjects(user);

  const settings =
    await loadSettings(projects);

  renderDashboard(
    user,
    projects,
    settings
  );
}
```

---

# Use Consistent Comparison Style

Prefer strict equality:

```js
if (value === 10) {
  // ...
}
```

instead of loose equality:

```js
if (value == 10) {
  // ...
}
```

Use loose equality only when its coercion semantics are deliberately desired and understood.

For general application code, strict equality is usually clearer.

---

# Avoid Accidental Type Coercion

Prefer:

```js
const total =
  Number(price) +
  Number(shipping);
```

when values may arrive as strings.

Do not rely on:

```js
const total =
  price + shipping;
```

if the types are unclear and `"10" + "20"` could accidentally produce:

```text
"1020"
```

---

# Use Explicit Conversion When It Improves Clarity

Examples:

```js
const count =
  Number(inputValue);

const message =
  String(value);

const enabled =
  Boolean(value);
```

Use the conversion that matches the intended data model.

---

# Avoid Unnecessary Type Conversion

Do not repeatedly convert a value when its type is already known:

```js
const count = 10;

const value =
  Number(count);
```

This adds noise without changing the meaning.

---

# Formatting Conditional Expressions

Prefer:

```js
const message =
  isActive
    ? "Active"
    : "Inactive";
```

For more complex logic:

```js
let message;

if (isActive) {
  message = "Active";
} else if (isPending) {
  message = "Pending";
} else {
  message = "Inactive";
}
```

Readable control flow is more valuable than minimizing lines.

---

# Object Property Shorthand

Prefer:

```js
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const user = {
  name,
  role,
};
```

instead of:

```js
const user = {
  name: name,
  role: role,
};
```

when the property and variable names are identical.

---

# Method Shorthand

Prefer:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    return this.name;
  },
};
```

instead of:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName: function () {
    return this.name;
  },
};
```

when using modern object method syntax.

---

# Computed Properties

Use computed property names when the key is genuinely dynamic:

```js
const field = "role";

const user = {
  name: "Osama Abu Motlaq",
  [field]: "Frontend Developer",
};
```

Do not use computed properties when a normal property name is clearer.

---

# Avoid Magic Numbers

Avoid:

```js
if (retries > 3) {
  // ...
}
```

when `3` has important meaning.

Prefer:

```js
const MAX_RETRIES = 3;

if (retries > MAX_RETRIES) {
  // ...
}
```

The same applies to unexplained strings and configuration values.

---

# Named Constants Improve Intent

Prefer:

```js
const DEFAULT_TIMEOUT = 5000;

setTimeout(
  handleTimeout,
  DEFAULT_TIMEOUT
);
```

instead of:

```js
setTimeout(
  handleTimeout,
  5000
);
```

when the number has domain-specific meaning.

---

# Avoid Over-Commenting

Bad:

```js
// Create a variable called name.
const name = "Osama Abu Motlaq";

// Log the name.
console.log(name);
```

The code already explains itself.

Comments should provide useful context.

---

# Comment Complex Algorithms

Comments can be valuable when an implementation has non-obvious reasoning:

```js
// Keep the request limit low to avoid
// sending duplicate requests while the
// user is still typing.
const search =
  debounce(
    performSearch,
    300
  );
```

---

# Document Public APIs

For reusable modules, document important public behavior.

For example:

```js
/**
 * Calculates the total price including shipping.
 *
 * @param {number} price
 * @param {number} shipping
 * @returns {number}
 */
function calculateTotal(
  price,
  shipping
) {
  return price + shipping;
}
```

Use documentation where it adds value, especially for shared APIs.

---

# Avoid Noise

Code becomes harder to read when every line contains unnecessary abstraction, logging, comments, wrappers, or defensive checks that the application does not need.

Prefer:

```js
const total =
  price + shipping;
```

over wrapping a two-operation calculation in multiple helpers.

---

# Formatting Tools

Manual consistency becomes difficult as projects grow.

Common tools include:

```text
Prettier
ESLint
EditorConfig
```

A formatter handles formatting.

A linter handles code-quality and correctness rules.

They solve related but different problems.

---

# Formatter vs Linter

Formatter:

```text
Indentation
Quotes
Line breaks
Spacing
Trailing commas
```

Linter:

```text
Unused variables
Potential bugs
Problematic patterns
Style rules
Best-practice rules
```

Use each tool for what it does well.

---

# Do Not Fight the Formatter

If a project uses a formatter, avoid manually formatting files in ways that conflict with it.

A team should generally agree on:

```text
One formatter configuration
One linting configuration
One source-of-truth style
```

---

# Editor Integration

Configure the editor to format code consistently.

A common workflow is:

```text
Write Code
   ↓
Format
   ↓
Lint
   ↓
Test
```

This reduces formatting discussions during code review.

---

# Formatting and Code Review

Code review should focus more on:

```text
Correctness
Architecture
Behavior
Security
Performance
Maintainability
```

than on manually debating spaces or line breaks.

Automate formatting whenever practical.

---

# Recommended Style for This Reference

The JavaScript files in this reference use:

```text
Double quotes
Semicolons
Two-space indentation
Parentheses around arrow-function parameters
Trailing commas in multi-line structures
Clear line breaks
Descriptive names
```

Example:

```js
"use strict";

const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

function getProfile(profile) {
  if (!profile) {
    return null;
  }

  return {
    name: profile.name,
    role: profile.role,
  };
}

console.log(
  getProfile(user)
);
```

---

# Style Should Support the Code

The purpose of formatting is not decoration.

Good style should make structure visible.

For example:

```js
if (!user) {
  return;
}

const profile = {
  name: user.name,
  role: user.role,
};

saveProfile(profile);
```

The reader can see the sequence:

```text
Validate
   ↓
Build data
   ↓
Save
```

---

# Avoid Style Inconsistency Inside One File

Avoid mixing:

```js
const firstName = "Osama";
let lastName = "Abu Motlaq";
var role = "Frontend Developer";
```

with unrelated formatting conventions throughout the same file.

Consistency makes the file easier to scan.

---

# Style and Team Collaboration

In a shared repository, style conventions should be documented and automated.

A practical setup can include:

```text
.editorconfig
.prettierrc
.eslintrc
```

The exact configuration depends on the project.

The important principle is:

```text
Make conventions easy to follow automatically.
```

---

# Style Rules Should Be Proportional

Not every project needs a hundred style rules.

A small JavaScript project may only need:

```text
Formatter
Basic linter
Consistent naming
Clear structure
```

A larger application may need stricter rules.

Do not create bureaucracy that does not solve a real problem.

---

# Final Code Style Principles

```text
Be consistent.

Use readable indentation.

Use clear spacing.

Use braces for multi-line control flow.

Prefer meaningful names.

Use const by default.

Use let when reassignment is required.

Avoid var in modern application code.

Prefer simple expressions.

Avoid clever one-liners.

Avoid deep nesting.

Use early returns when they improve clarity.

Keep functions focused.

Keep related code together.

Separate unrelated responsibilities.

Comment why, not what.

Remove obsolete commented-out code.

Use formatters and linters.

Automate style enforcement.

Do not optimize for fewer lines.

Optimize for clarity.
```

---

# Code Style Checklist

Before considering a file complete:

```text
[ ] Is the formatting consistent?

[ ] Is indentation consistent?

[ ] Are names descriptive?

[ ] Are braces used clearly?

[ ] Is spacing readable?

[ ] Are long expressions formatted sensibly?

[ ] Are functions easy to scan?

[ ] Is nesting reasonable?

[ ] Are comments useful?

[ ] Is commented-out dead code removed?

[ ] Are constants named clearly?

[ ] Are boolean variables named clearly?

[ ] Is unnecessary cleverness avoided?

[ ] Is the code compatible with the project's formatter?

[ ] Is linting passing?

[ ] Can another developer understand the file quickly?
```

---

# Summary

Code style is about reducing the amount of effort required to understand source code.

The most important principles are:

* Consistency is more important than personal preference within a project.
* Formatting should make structure visible.
* Names should communicate intent.
* Functions should be easy to scan.
* Complex expressions should be broken into readable pieces.
* Deep nesting should be avoided when clearer control flow is possible.
* Comments should explain reasoning rather than obvious syntax.
* Obsolete commented-out code should be removed.
* `const` should generally be preferred when reassignment is unnecessary.
* `let` should be used when reassignment is intentional.
* `var` is generally unnecessary in modern application code.
* Modern syntax should be used when it improves clarity.
* Formatters and linters should automate mechanical style decisions.
* Code style should support maintainability rather than minimize line count.

The core principle is:

```text
Good code style
        =
Less cognitive load
        +
Clearer intent
        +
Consistent structure
        +
Easier maintenance
```
