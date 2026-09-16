# JavaScript Control Flow

Control flow describes the order in which JavaScript executes statements.

By default, JavaScript runs code from top to bottom. Control flow statements allow you to change that order by:

* Making decisions with conditions.
* Repeating code with loops.
* Stopping or skipping iterations.
* Executing different blocks depending on a value.
* Handling exceptional situations with `try...catch`.

Understanding control flow is essential because almost every JavaScript application depends on it.

---

## Table of Contents

1. [Sequential Execution](#1-sequential-execution)
2. [Conditional Statements](#2-conditional-statements)

   * [if](#if)
   * [else](#else)
   * [else if](#else-if)
   * [Nested Conditions](#nested-conditions)
3. [Truthy and Falsy Values](#3-truthy-and-falsy-values)
4. [The switch Statement](#4-the-switch-statement)
5. [The Ternary Operator](#5-the-ternary-operator)
6. [Loops](#6-loops)

   * [for](#for-loop)
   * [while](#while-loop)
   * [do...while](#dowhile-loop)
7. [Loop Control Statements](#7-loop-control-statements)

   * [break](#break)
   * [continue](#continue)
8. [Nested Loops](#8-nested-loops)
9. [for...of](#9-forof)
10. [for...in](#10-forin)
11. [Iterating Over Object Properties](#11-iterating-over-object-properties)
12. [Short-Circuit Control Flow](#12-short-circuit-control-flow)
13. [Early Return](#13-early-return)
14. [Exception Control Flow](#14-exception-control-flow)
15. [Common Pitfalls](#15-common-pitfalls)
16. [Best Practices](#16-best-practices)
17. [Quick Reference](#17-quick-reference)
18. [Key Takeaways](#18-key-takeaways)

---

# 1. Sequential Execution

JavaScript normally executes statements sequentially, from top to bottom.

```js
const name = "Osama Abu Motlaq";
const age = 24;

console.log(name);
console.log(age);
```

### Output

```text
Osama Abu Motlaq
24
```

The execution order is:

1. Create `name`.
2. Create `age`.
3. Print `name`.
4. Print `age`.

This is called **sequential execution**.

Control flow statements become important when you need to change this default order.

---

# 2. Conditional Statements

Conditional statements allow JavaScript to make decisions.

The most common conditional statements are:

* `if`
* `else`
* `else if`
* `switch`

A condition evaluates to a Boolean result:

```js
true
```

or:

```js
false
```

For example:

```js
const age = 24;

if (age >= 18) {
  console.log("Osama Abu Motlaq is an adult.");
}
```

The condition:

```js
age >= 18
```

is evaluated first.

If it is `true`, JavaScript executes the code inside the block.

---

## if

The `if` statement executes a block of code only when its condition is truthy.

### Syntax

```js
if (condition) {
  // code to execute
}
```

### Example

```js
const age = 24;

if (age >= 18) {
  console.log("Osama Abu Motlaq can access this page.");
}
```

### Output

```text
Osama Abu Motlaq can access this page.
```

If the condition is false:

```js
const age = 16;

if (age >= 18) {
  console.log("Access granted.");
}
```

Nothing is printed because the condition is false.

### Important Concept

The condition does not have to literally be `true` or `false`.

JavaScript converts the condition to a Boolean.

```js
if ("Osama Abu Motlaq") {
  console.log("This runs.");
}
```

A non-empty string is truthy, so the block executes.

---

# else

`else` provides an alternative block when the `if` condition is false.

### Example

```js
const age = 16;

if (age >= 18) {
  console.log("Osama Abu Motlaq can access this page.");
} else {
  console.log("Access denied.");
}
```

### Output

```text
Access denied.
```

Only one of the two blocks executes.

Conceptually:

```text
             condition
                 |
          +------+------+
        true          false
         |               |
      if block       else block
```

---

# else if

`else if` allows you to test multiple conditions.

### Example

```js
const score = 85;

if (score >= 90) {
  console.log("Osama Abu Motlaq received an A.");
} else if (score >= 80) {
  console.log("Osama Abu Motlaq received a B.");
} else if (score >= 70) {
  console.log("Osama Abu Motlaq received a C.");
} else {
  console.log("Osama Abu Motlaq needs more practice.");
}
```

### Output

```text
Osama Abu Motlaq received a B.
```

JavaScript checks conditions from top to bottom.

As soon as one condition is true, its block executes and the remaining conditions are skipped.

### Important

The order of conditions matters.

This is problematic:

```js
const score = 95;

if (score >= 70) {
  console.log("C or higher");
} else if (score >= 90) {
  console.log("A");
}
```

The second condition will never be reached for `95` because:

```js
score >= 70
```

is already true.

A better order is:

```js
if (score >= 90) {
  console.log("A");
} else if (score >= 70) {
  console.log("C or higher");
}
```

---

# Nested Conditions

A conditional statement can exist inside another conditional statement.

```js
const age = 24;
const hasAccount = true;

if (age >= 18) {
  if (hasAccount) {
    console.log("Osama Abu Motlaq can access the dashboard.");
  }
}
```

The inner condition is checked only if the outer condition is true.

### Avoid Excessive Nesting

Deep nesting can make code difficult to read.

Instead of:

```js
if (age >= 18) {
  if (hasAccount) {
    if (isVerified) {
      console.log("Access granted.");
    }
  }
}
```

you can often combine conditions:

```js
if (age >= 18 && hasAccount && isVerified) {
  console.log("Access granted.");
}
```

Or use early returns when inside a function.

---

# 3. Truthy and Falsy Values

JavaScript conditions use **truthiness**.

A value is either:

* Truthy
* Falsy

Falsy values include:

```js
false
0
-0
0n
""
null
undefined
NaN
```

Almost every other value is truthy.

For example:

```js
if ("Osama Abu Motlaq") {
  console.log("Runs.");
}

if (42) {
  console.log("Also runs.");
}

if ([]) {
  console.log("Arrays are truthy.");
}

if ({}) {
  console.log("Objects are truthy.");
}
```

### Important

Empty arrays and empty objects are truthy:

```js
Boolean([]); // true
Boolean({}); // true
```

This is a common source of mistakes.

For example:

```js
const users = [];

if (users) {
  console.log("Users exist.");
}
```

This prints:

```text
Users exist.
```

Even though the array contains zero elements.

If you want to check whether the array contains items:

```js
if (users.length > 0) {
  console.log("Users exist.");
}
```

---

# 4. The switch Statement

`switch` is useful when one expression needs to be compared against multiple possible values.

### Syntax

```js
switch (expression) {
  case value1:
    // code
    break;

  case value2:
    // code
    break;

  default:
    // fallback code
}
```

### Example

```js
const role = "developer";

switch (role) {
  case "admin":
    console.log("Osama Abu Motlaq has administrator access.");
    break;

  case "developer":
    console.log("Osama Abu Motlaq has developer access.");
    break;

  case "user":
    console.log("Osama Abu Motlaq has standard user access.");
    break;

  default:
    console.log("Unknown role.");
}
```

### Output

```text
Osama Abu Motlaq has developer access.
```

---

## Why `break` Matters

Without `break`, JavaScript continues executing subsequent cases.

```js
const role = "developer";

switch (role) {
  case "developer":
    console.log("Developer");
  case "admin":
    console.log("Admin");
}
```

Output:

```text
Developer
Admin
```

This behavior is called **fall-through**.

Usually, you want:

```js
case "developer":
  console.log("Developer");
  break;
```

---

## default

`default` executes when no case matches.

```js
const role = "guest";

switch (role) {
  case "admin":
    console.log("Admin");
    break;

  case "developer":
    console.log("Developer");
    break;

  default:
    console.log("Osama Abu Motlaq has an unknown role.");
}
```

### Output

```text
Osama Abu Motlaq has an unknown role.
```

---

## When to Use `switch`

`switch` works well when:

* One value is being compared against many exact values.
* The possible cases are clearly defined.
* The code is easier to understand than a long `if...else if` chain.

For complex conditions such as:

```js
age >= 18 && isVerified
```

`if` is generally more appropriate.

---

# 5. The Ternary Operator

The ternary operator provides a compact way to write a simple `if...else`.

### Syntax

```js
condition ? valueIfTrue : valueIfFalse;
```

### Example

```js
const age = 24;

const message = age >= 18
  ? "Osama Abu Motlaq is an adult."
  : "Osama Abu Motlaq is a minor.";

console.log(message);
```

### Output

```text
Osama Abu Motlaq is an adult.
```

This:

```js
const message = age >= 18
  ? "Adult"
  : "Minor";
```

is equivalent to:

```js
let message;

if (age >= 18) {
  message = "Adult";
} else {
  message = "Minor";
}
```

---

## Ternary as an Expression

One important difference is that the ternary operator produces a value.

```js
const status = isLoggedIn ? "Online" : "Offline";
```

That value can be assigned directly.

This makes ternaries particularly useful when selecting between two values.

---

## Avoid Deeply Nested Ternaries

This is difficult to read:

```js
const result =
  score >= 90 ? "A" :
  score >= 80 ? "B" :
  score >= 70 ? "C" :
  "F";
```

Although valid, multiple nested ternaries can reduce readability.

For complex decision-making, use `if...else if...else`.

---

# 6. Loops

Loops allow you to execute code repeatedly.

Common JavaScript loops include:

* `for`
* `while`
* `do...while`
* `for...of`
* `for...in`

Loops are especially useful when working with arrays and collections.

---

# for Loop

The `for` loop is commonly used when you know how many times you want to iterate.

### Syntax

```js
for (initialization; condition; update) {
  // code
}
```

Example:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### Output

```text
0
1
2
3
4
```

---

## Understanding the Three Parts

Consider:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### 1. Initialization

```js
let i = 0;
```

Runs once before the loop starts.

### 2. Condition

```js
i < 5
```

Checked before every iteration.

### 3. Update

```js
i++;
```

Runs after each iteration.

The execution flow is:

```text
Initialize i = 0
       ↓
Check i < 5
       ↓
Run loop body
       ↓
Run i++
       ↓
Check i < 5
       ↓
Repeat
```

---

## Looping Through an Array

```js
const skills = ["HTML", "CSS", "JavaScript", "React"];

for (let i = 0; i < skills.length; i++) {
  console.log(skills[i]);
}
```

### Output

```text
HTML
CSS
JavaScript
React
```

The variable `i` represents the current array index.

---

# while Loop

A `while` loop executes as long as its condition remains truthy.

### Syntax

```js
while (condition) {
  // code
}
```

### Example

```js
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
```

### Output

```text
0
1
2
3
4
```

The condition is checked before every iteration.

---

## Infinite Loops

You must make sure the condition eventually becomes false.

This creates an infinite loop:

```js
let count = 0;

while (count < 5) {
  console.log(count);
}
```

`count` never changes, so:

```js
count < 5
```

always remains true.

Correct:

```js
while (count < 5) {
  console.log(count);
  count++;
}
```

---

# do...while Loop

`do...while` is similar to `while`, but the body executes **at least once**.

### Syntax

```js
do {
  // code
} while (condition);
```

### Example

```js
let count = 10;

do {
  console.log(count);
  count++;
} while (count < 5);
```

### Output

```text
10
```

Even though:

```js
count < 5
```

is false, the body runs once before the condition is checked.

---

## while vs do...while

### `while`

```js
while (condition) {
  // may execute zero times
}
```

### `do...while`

```js
do {
  // executes at least once
} while (condition);
```

Use `do...while` when the operation must happen at least once before checking the condition.

---

# 7. Loop Control Statements

Loop control statements allow you to change normal loop execution.

The most important ones are:

* `break`
* `continue`

---

# break

`break` immediately terminates the nearest loop or `switch`.

### Example

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}
```

### Output

```text
0
1
2
3
4
```

When `i` becomes `5`, `break` terminates the loop.

---

## break in a Search

A common use case is stopping once you find what you need.

```js
const skills = ["HTML", "CSS", "JavaScript", "React"];

for (let i = 0; i < skills.length; i++) {
  if (skills[i] === "JavaScript") {
    console.log("Osama Abu Motlaq found JavaScript.");
    break;
  }
}
```

Once JavaScript is found, continuing through the rest of the array is unnecessary.

---

# continue

`continue` skips the current iteration and moves to the next one.

```js
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }

  console.log(i);
}
```

### Output

```text
0
1
3
4
```

When `i === 2`, the rest of the current iteration is skipped.

The loop itself does not terminate.

---

## `break` vs `continue`

| Statement  | Behavior                    |
| ---------- | --------------------------- |
| `break`    | Stops the loop completely   |
| `continue` | Skips the current iteration |
| `return`   | Exits the current function  |

---

# 8. Nested Loops

A loop can contain another loop.

```js
for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 3; column++) {
    console.log(`Row ${row}, Column ${column}`);
  }
}
```

The inner loop runs completely for each iteration of the outer loop.

Conceptually:

```text
Outer 1
  Inner 1
  Inner 2
  Inner 3

Outer 2
  Inner 1
  Inner 2
  Inner 3

Outer 3
  Inner 1
  Inner 2
  Inner 3
```

Nested loops are useful for problems involving:

* Grids
* Matrices
* Tables
* Combinations
* Comparing elements

However, nested loops can become expensive for large datasets.

For example:

```js
for (...) {
  for (...) {
    // work
  }
}
```

may have approximately `O(n²)` time complexity when both loops depend on `n`.

---

# 9. for...of

`for...of` is designed to iterate over the **values of an iterable**.

Common iterables include:

* Arrays
* Strings
* Sets
* Maps

### Array Example

```js
const skills = ["HTML", "CSS", "JavaScript", "React"];

for (const skill of skills) {
  console.log(skill);
}
```

### Output

```text
HTML
CSS
JavaScript
React
```

This is often cleaner than:

```js
for (let i = 0; i < skills.length; i++) {
  console.log(skills[i]);
}
```

When you only need the values, `for...of` is usually preferable.

---

## String Example

Strings are iterable:

```js
for (const character of "Osama Abu Motlaq") {
  console.log(character);
}
```

Each character is processed individually.

---

# 10. for...in

`for...in` iterates over the **enumerable property keys** of an object.

```js
const developer = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  experience: 2
};

for (const key in developer) {
  console.log(key);
}
```

### Output

```text
name
role
experience
```

To access the corresponding value:

```js
for (const key in developer) {
  console.log(developer[key]);
}
```

### Output

```text
Osama Abu Motlaq
Frontend Developer
2
```

---

## `for...in` vs `for...of`

This distinction is extremely important.

### `for...of`

Iterates over values:

```js
const skills = ["HTML", "CSS", "React"];

for (const skill of skills) {
  console.log(skill);
}
```

Output:

```text
HTML
CSS
React
```

### `for...in`

Iterates over keys:

```js
const developer = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};

for (const key in developer) {
  console.log(key);
}
```

Output:

```text
name
role
```

### Quick Rule

> Use `for...of` for iterable values and `for...in` for object property keys.

---

## Avoid `for...in` for Arrays

Although `for...in` can technically iterate over array indexes:

```js
const skills = ["HTML", "CSS", "React"];

for (const index in skills) {
  console.log(skills[index]);
}
```

it is generally not the preferred approach for arrays.

Use:

```js
for (const skill of skills) {
  console.log(skill);
}
```

or array methods such as:

```js
skills.forEach((skill) => {
  console.log(skill);
});
```

---

# 11. Iterating Over Object Properties

Modern JavaScript provides useful methods for working with object properties.

## Object.keys()

Returns an array containing the object's keys.

```js
const developer = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};

const keys = Object.keys(developer);

console.log(keys);
```

### Output

```text
["name", "role"]
```

---

## Object.values()

Returns an array containing the object's values.

```js
const values = Object.values(developer);

console.log(values);
```

### Output

```text
["Osama Abu Motlaq", "Frontend Developer"]
```

---

## Object.entries()

Returns an array containing key-value pairs.

```js
const entries = Object.entries(developer);

console.log(entries);
```

Conceptually:

```js
[
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"]
]
```

You can combine it with `for...of`:

```js
for (const [key, value] of Object.entries(developer)) {
  console.log(`${key}: ${value}`);
}
```

### Output

```text
name: Osama Abu Motlaq
role: Frontend Developer
```

This is often cleaner and more explicit than `for...in`.

---

# 12. Short-Circuit Control Flow

Logical operators can control whether an expression is evaluated.

This behavior is called **short-circuit evaluation**.

## AND `&&`

With `&&`, JavaScript stops when it encounters a falsy value.

```js
const isLoggedIn = true;

isLoggedIn && console.log("Osama Abu Motlaq is logged in.");
```

Because `isLoggedIn` is truthy, the second expression executes.

This pattern is commonly seen in React:

```jsx
{isLoggedIn && <Dashboard />}
```

The dashboard is rendered only when `isLoggedIn` is truthy.

---

## OR `||`

With `||`, JavaScript stops when it encounters a truthy value.

```js
const username = "";

const displayName = username || "Osama Abu Motlaq";

console.log(displayName);
```

### Output

```text
Osama Abu Motlaq
```

Because the empty string is falsy, the second value is used.

---

## Nullish Coalescing `??`

`??` is different from `||`.

It only falls back when the left side is:

```js
null
```

or:

```js
undefined
```

Example:

```js
const username = "";

const displayName = username ?? "Osama Abu Motlaq";

console.log(displayName);
```

### Output

```text
```

The empty string is preserved because it is not `null` or `undefined`.

Compare:

```js
const value1 = 0 || 100;
const value2 = 0 ?? 100;

console.log(value1); // 100
console.log(value2); // 0
```

Use `??` when `0`, `false`, or `""` are valid values that should not trigger a fallback.

---

# 13. Early Return

An early return exits a function as soon as a condition is met.

This is one of the most useful control-flow techniques for writing readable functions.

Consider:

```js
function checkAccess(isLoggedIn) {
  if (isLoggedIn) {
    return "Access granted.";
  } else {
    return "Please log in.";
  }
}
```

This can be simplified:

```js
function checkAccess(isLoggedIn) {
  if (!isLoggedIn) {
    return "Please log in.";
  }

  return "Access granted.";
}
```

The second version is often easier to read because invalid conditions are handled immediately.

---

## Multiple Early Returns

```js
function getProfile(user) {
  if (!user) {
    return "No user found.";
  }

  if (!user.isVerified) {
    return "User is not verified.";
  }

  return `Welcome, ${user.name}.`;
}
```

The function handles failure conditions first and keeps the successful path at the end.

This technique helps prevent deeply nested code.

---

# 14. Exception Control Flow

JavaScript also has control-flow mechanisms for handling errors.

The main statements are:

* `try`
* `catch`
* `finally`
* `throw`

---

## try...catch

Code that may throw an exception can be placed inside `try`.

If an exception occurs, control moves to `catch`.

```js
try {
  JSON.parse("invalid JSON");
} catch (error) {
  console.log("Osama Abu Motlaq encountered an error.");
}
```

### Execution Flow

```text
try
 ↓
Error occurs
 ↓
catch
 ↓
Continue execution
```

Without error handling, an uncaught exception can terminate the current execution path.

---

## The Error Object

The caught value is commonly an `Error` object.

```js
try {
  JSON.parse("invalid JSON");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

Typical output:

```text
SyntaxError
Unexpected token ...
```

The exact error message can vary between JavaScript engines.

---

## finally

`finally` executes whether an exception occurs or not.

```js
try {
  console.log("Starting operation.");
} catch (error) {
  console.log("An error occurred.");
} finally {
  console.log("Operation finished.");
}
```

Output:

```text
Starting operation.
Operation finished.
```

If an error occurs:

```text
An error occurred.
Operation finished.
```

`finally` is useful for cleanup operations.

---

## throw

You can create your own exception using `throw`.

```js
function validateAge(age) {
  if (age < 18) {
    throw new Error("Osama Abu Motlaq must be at least 18.");
  }

  return "Age is valid.";
}
```

Then handle it:

```js
try {
  validateAge(16);
} catch (error) {
  console.log(error.message);
}
```

### Output

```text
Osama Abu Motlaq must be at least 18.
```

---

# 15. Common Pitfalls

## 1. Using Assignment Instead of Comparison

Incorrect:

```js
let age = 24;

if (age = 18) {
  console.log("Adult");
}
```

The code assigns `18` to `age` instead of comparing it.

Use:

```js
if (age === 18) {
  console.log("Exactly 18");
}
```

---

## 2. Forgetting `break` in switch

Incorrect when fall-through is not intended:

```js
switch (role) {
  case "developer":
    console.log("Developer");

  case "admin":
    console.log("Admin");
}
```

Use:

```js
switch (role) {
  case "developer":
    console.log("Developer");
    break;

  case "admin":
    console.log("Admin");
    break;
}
```

---

## 3. Creating an Infinite Loop

Incorrect:

```js
let count = 0;

while (count < 10) {
  console.log(count);
}
```

Correct:

```js
let count = 0;

while (count < 10) {
  console.log(count);
  count++;
}
```

---

## 4. Assuming Empty Arrays Are Falsy

Incorrect assumption:

```js
const users = [];

if (users) {
  console.log("Users exist.");
}
```

The condition is true because arrays are objects and objects are truthy.

Check the length:

```js
if (users.length > 0) {
  console.log("Users exist.");
}
```

---

## 5. Confusing `for...in` and `for...of`

Remember:

```text
for...in  → keys
for...of  → values
```

---

## 6. Excessive Nesting

Hard to read:

```js
if (user) {
  if (user.isLoggedIn) {
    if (user.isVerified) {
      console.log("Access granted.");
    }
  }
}
```

Often better:

```js
if (!user || !user.isLoggedIn || !user.isVerified) {
  return;
}

console.log("Access granted.");
```

---

## 7. Overusing Ternary Operators

Avoid turning complex logic into unreadable expressions.

Prefer:

```js
if (score >= 90) {
  // ...
} else if (score >= 80) {
  // ...
} else {
  // ...
}
```

over a deeply nested ternary.

---

# 16. Best Practices

## Prefer Strict Equality

Prefer:

```js
=== 
!==
```

over:

```js
==
!=
```

This reduces unexpected type coercion.

---

## Keep Conditions Simple

Instead of:

```js
if (user && user.isLoggedIn && user.isVerified && user.role === "admin") {
  // ...
}
```

consider extracting meaningful Boolean variables when the condition becomes difficult to understand:

```js
const isVerifiedAdmin =
  user &&
  user.isLoggedIn &&
  user.isVerified &&
  user.role === "admin";

if (isVerifiedAdmin) {
  // ...
}
```

The goal is not fewer lines; the goal is clearer intent.

---

## Use the Appropriate Loop

Use `for` when you need:

* An index.
* Precise control over initialization and updates.
* A known iteration pattern.

Use `for...of` when you need:

* Values from an iterable.

Use `for...in` when you need:

* Enumerable object property keys.

Use `while` when:

* The number of iterations is not known in advance.
* The loop depends on a changing condition.

Use array methods such as:

```js
map()
filter()
find()
some()
every()
forEach()
```

when they express the operation more clearly.

---

## Prefer Early Returns When Appropriate

Instead of deeply nesting conditions:

```js
function processUser(user) {
  if (user) {
    if (user.isVerified) {
      // large amount of code
    }
  }
}
```

consider:

```js
function processUser(user) {
  if (!user) {
    return;
  }

  if (!user.isVerified) {
    return;
  }

  // main logic
}
```

This keeps the main logic less deeply nested.

---

## Avoid Unnecessary Complexity

Control flow should make the program's logic easier to understand.

Do not use:

* A `switch` when two simple conditions are clearer.
* A nested ternary when `if...else` is easier to read.
* A complicated loop when an array method expresses the intent better.
* Deep nesting when early returns can simplify the structure.

---

# 17. Quick Reference

| Feature      | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `if`         | Execute code when a condition is truthy          |
| `else`       | Execute alternative code                         |
| `else if`    | Test additional conditions                       |
| `switch`     | Compare one value against multiple cases         |
| `?:`         | Compact conditional expression                   |
| `for`        | Controlled iteration                             |
| `while`      | Repeat while condition is truthy                 |
| `do...while` | Execute at least once, then repeat conditionally |
| `break`      | Exit a loop or switch                            |
| `continue`   | Skip the current loop iteration                  |
| `for...of`   | Iterate over values                              |
| `for...in`   | Iterate over enumerable keys                     |
| `try`        | Execute potentially failing code                 |
| `catch`      | Handle an exception                              |
| `finally`    | Execute cleanup code                             |
| `throw`      | Explicitly raise an exception                    |
| `return`     | Exit a function and optionally return a value    |
| `&&`         | Conditional execution based on truthiness        |
| `\|\|`       | Provide a fallback based on truthiness           |
| `??`         | Provide a fallback for `null` or `undefined`     |

---

# 18. Key Takeaways

1. JavaScript normally executes code sequentially from top to bottom.
2. Conditional statements allow programs to make decisions.
3. `if`, `else if`, and `else` handle conditional branching.
4. `switch` is useful when comparing one value against multiple exact cases.
5. `break` prevents unintended `switch` fall-through.
6. The ternary operator is useful for simple conditional expressions.
7. `for`, `while`, and `do...while` repeat code.
8. `break` stops a loop completely.
9. `continue` skips the current iteration.
10. `for...of` iterates over values.
11. `for...in` iterates over enumerable property keys.
12. Empty arrays and objects are truthy.
13. `&&`, `||`, and `??` use short-circuit evaluation and can participate in control flow.
14. Early returns can reduce unnecessary nesting.
15. `try...catch...finally` provides structured exception handling.
16. Good control flow is not just about making code work; it is about making program logic clear and maintainable.
