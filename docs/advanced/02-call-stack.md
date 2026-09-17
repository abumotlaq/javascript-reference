# JavaScript Call Stack

## Overview

The call stack is a runtime mechanism used by JavaScript to keep track of active execution contexts.

When JavaScript executes a function, the function's execution context is placed on the call stack.

When the function finishes, its execution context is removed.

A simplified model is:

```text
Call Function
     |
     v
Push Execution Context
     |
     v
Execute Function
     |
     v
Return
     |
     v
Pop Execution Context
```

The call stack is fundamental to understanding:

* Synchronous execution
* Function calls
* Nested function calls
* Recursion
* Stack overflow
* Execution order
* Debugging stack traces
* The relationship between execution contexts and runtime flow

---

# What Is a Stack?

A stack is a data structure that follows:

```text
Last In, First Out
```

Often abbreviated as:

```text
LIFO
```

The last item added to the stack is the first item removed.

A simplified stack looks like:

```text
Top
┌─────────────┐
│   Item C    │
├─────────────┤
│   Item B    │
├─────────────┤
│   Item A    │
└─────────────┘
Bottom
```

If `Item C` is removed first:

```text
┌─────────────┐
│   Item B    │
├─────────────┤
│   Item A    │
└─────────────┘
```

JavaScript uses the same basic principle to track active function calls.

---

# The Call Stack

Consider:

```js
function greet() {
  console.log("Hello");
}

greet();
```

A simplified call-stack flow is:

```text
Global
  |
  v
greet()
  |
  v
console.log()
```

While `greet()` is executing, its execution context is active on the stack.

After `greet()` finishes:

```text
Global
```

remains.

---

# Initial Stack

When a JavaScript program begins executing, there is already a global execution context.

Conceptually:

```text
┌─────────────────────────────┐
│ Global Execution Context    │
└─────────────────────────────┘
```

The global context provides the starting point for script execution.

---

# Function Call

Consider:

```js
function greet() {
  console.log(
    "Hello, Osama Abu Motlaq!"
  );
}

greet();
```

The runtime can be simplified as:

```text
Before function call:

┌─────────────────────────────┐
│ Global Context              │
└─────────────────────────────┘
```

After calling `greet()`:

```text
┌─────────────────────────────┐
│ greet() Context             │
├─────────────────────────────┤
│ Global Context              │
└─────────────────────────────┘
```

While `greet()` executes, its context is at the top of the stack.

After `greet()` returns:

```text
┌─────────────────────────────┐
│ Global Context              │
└─────────────────────────────┘
```

---

# Nested Function Calls

Consider:

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("Running");
}

first();
```

The stack grows as calls are made.

Initially:

```text
Global
```

After:

```js
first();
```

the stack becomes:

```text
first
Global
```

When `first()` calls `second()`:

```text
second
first
Global
```

When `second()` calls `third()`:

```text
third
second
first
Global
```

This is the active call stack.

---

# Returning From Nested Calls

After `third()` finishes:

```text
second
first
Global
```

After `second()` finishes:

```text
first
Global
```

After `first()` finishes:

```text
Global
```

This demonstrates the LIFO behavior of the call stack.

---

# Complete Example

```js
function first() {
  console.log("First start");

  second();

  console.log("First end");
}

function second() {
  console.log("Second start");

  third();

  console.log("Second end");
}

function third() {
  console.log("Third");
}

first();
```

Output:

```text
First start
Second start
Third
Second end
First end
```

The execution order is determined by the nested call structure.

---

# Call Stack Visualization

The previous example can be visualized like this.

### Step 1

```text
Global
```

### Step 2

```text
first
Global
```

### Step 3

```text
second
first
Global
```

### Step 4

```text
third
second
first
Global
```

### Step 5

`third()` returns:

```text
second
first
Global
```

### Step 6

`second()` returns:

```text
first
Global
```

### Step 7

`first()` returns:

```text
Global
```

---

# Only Active Calls Stay on the Stack

The call stack does not store every function that has ever run.

It tracks currently active execution.

Example:

```js
function first() {
  console.log("First");
}

function second() {
  console.log("Second");
}

first();
second();
```

During `first()`:

```text
first
Global
```

After `first()` returns:

```text
Global
```

During `second()`:

```text
second
Global
```

The previous `first()` execution context is no longer active.

---

# Function Return

A function can return a value:

```js
function calculateTotal() {
  const price = 100;
  const shipping = 20;

  return price + shipping;
}

const total =
  calculateTotal();

console.log(total);
```

The call stack behaves approximately like:

```text
Global
   |
   v
calculateTotal
   |
   v
return 120
   |
   v
Global
```

The returned value becomes available to the caller.

---

# Return Stops Current Function Execution

Example:

```js
function getRole() {
  return "Frontend Developer";

  console.log(
    "This code will not run."
  );
}

console.log(
  getRole()
);
```

Once `return` is executed:

```text
Function execution
       |
       v
return
       |
       v
Function context completes
```

The code after the return statement is not executed.

---

# Returning to the Caller

Example:

```js
function getName() {
  return "Osama Abu Motlaq";
}

function showName() {
  const name = getName();

  console.log(name);
}

showName();
```

The call stack changes like this:

```text
Global
```

Then:

```text
showName
Global
```

Then:

```text
getName
showName
Global
```

After `getName()` returns:

```text
showName
Global
```

After `showName()` returns:

```text
Global
```

---

# Recursive Functions

A recursive function calls itself.

Example:

```js
function countdown(number) {
  if (number === 0) {
    return;
  }

  console.log(number);

  countdown(number - 1);
}

countdown(3);
```

The stack grows like this:

```text
countdown(3)
Global
```

Then:

```text
countdown(2)
countdown(3)
Global
```

Then:

```text
countdown(1)
countdown(2)
countdown(3)
Global
```

Then:

```text
countdown(0)
countdown(1)
countdown(2)
countdown(3)
Global
```

The base condition is reached and the calls begin returning.

---

# Recursive Unwinding

After `countdown(0)` returns:

```text
countdown(1)
countdown(2)
countdown(3)
Global
```

After `countdown(1)` returns:

```text
countdown(2)
countdown(3)
Global
```

After `countdown(2)` returns:

```text
countdown(3)
Global
```

Finally:

```text
Global
```

This process is called stack unwinding.

---

# Recursion Without a Base Case

Consider:

```js
function repeat() {
  repeat();
}

repeat();
```

Every call creates another active execution context.

The stack keeps growing:

```text
repeat
repeat
repeat
repeat
repeat
...
```

Eventually the engine cannot continue.

A typical error is:

```text
RangeError: Maximum call stack size exceeded
```

---

# Stack Overflow

A stack overflow occurs when the call stack grows beyond the available limit.

Example:

```js
function recurse() {
  recurse();
}

recurse();
```

The problem is not simply that recursion exists.

The problem is that the recursion never reaches a condition that allows it to stop.

---

# Safe Recursion

A recursive function normally needs a base case.

```js
function countdown(number) {
  if (number <= 0) {
    return;
  }

  console.log(number);

  countdown(number - 1);
}

countdown(5);
```

The base case is:

```js
if (number <= 0) {
  return;
}
```

This prevents infinite recursion.

---

# Recursive Tree Calls

Consider:

```js
function process(number) {
  if (number <= 0) {
    return;
  }

  process(number - 1);
  process(number - 2);
}

process(4);
```

Each call can create multiple new calls.

The call stack can become significantly deeper.

This is one reason recursive algorithms should be analyzed carefully.

---

# Call Stack and Synchronous Code

JavaScript executes synchronous JavaScript using the current call stack.

Example:

```js
console.log("A");

console.log("B");

console.log("C");
```

The code runs in order:

```text
A
B
C
```

Each operation completes before the next synchronous operation continues.

---

# A Function Blocks the Current Stack

Consider:

```js
function longTask() {
  const end =
    Date.now() + 2000;

  while (Date.now() < end) {
    // Block the thread.
  }

  console.log(
    "Long task completed."
  );
}

console.log("Before");

longTask();

console.log("After");
```

The output is:

```text
Before
Long task completed.
After
```

While `longTask()` is executing, the current synchronous execution cannot continue past that call.

---

# Stack and Loops

Loops do not normally create a new execution context for each iteration.

Example:

```js
for (
  let index = 0;
  index < 3;
  index++
) {
  console.log(index);
}
```

The loop continues inside the current execution context.

It does not create three separate function contexts.

---

# Stack and Function Calls Inside Loops

Consider:

```js
function process(number) {
  return number * 2;
}

for (
  let index = 0;
  index < 3;
  index++
) {
  console.log(
    process(index)
  );
}
```

Each function call temporarily adds a function execution context.

The stack returns to the previous state after the function returns.

---

# Call Stack and Arrow Functions

Arrow functions also create execution contexts when they are called.

```js
const double = (number) => {
  return number * 2;
};

console.log(
  double(10)
);
```

The calling behavior still involves the call stack.

The difference between arrow functions and regular functions is mainly related to semantics such as `this`, not whether function calls use the call stack.

---

# Call Stack and Callbacks

Consider:

```js
function processValue(
  value,
  callback
) {
  callback(value);
}

function showValue(value) {
  console.log(value);
}

processValue(
  100,
  showValue
);
```

When the callback runs, another function execution context becomes active.

Conceptually:

```text
showValue
processValue
Global
```

Then `showValue()` returns:

```text
processValue
Global
```

Then `processValue()` returns:

```text
Global
```

---

# Stack Trace

When an error occurs, JavaScript engines usually provide a stack trace.

Example:

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  throw new Error(
    "Something went wrong."
  );
}

first();
```

The stack trace may show a structure similar to:

```text
Error: Something went wrong.
    at third (...)
    at second (...)
    at first (...)
    at ...
```

The trace helps identify the chain of active function calls.

---

# Reading a Stack Trace

A stack trace commonly reveals:

* Error type
* Error message
* Function names
* Source file
* Line number
* Column number
* Caller chain

Example:

```text
Error: Invalid value
    at validate (...)
    at processUser (...)
    at submitForm (...)
```

The chain tells you how execution reached the point where the error occurred.

---

# Debugging the Call Stack

Browser developer tools allow you to inspect the call stack while execution is paused.

Example:

```js
function first() {
  second();
}

function second() {
  debugger;
}

first();
```

When execution pauses at `debugger`, the developer tools can show the active call stack.

Conceptually:

```text
second
first
Global
```

---

# `debugger` Statement

The `debugger` statement requests that debugging tools pause execution when they are available.

```js
function calculate() {
  const value = 100;

  debugger;

  return value * 2;
}

console.log(
  calculate()
);
```

This is useful when inspecting:

* Local variables
* Function parameters
* Scope
* Call stack
* Control flow

---

# Call Stack and Closures

A closure can outlive the function execution context that created it.

Example:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;

    return count;
  };
}

const counter =
  createCounter();

console.log(
  counter()
);
```

When `createCounter()` returns:

```text
createCounter Context
```

is no longer active on the call stack.

The returned function still retains access to the relevant lexical environment.

This is important:

```text
Execution Context
≠
Lexical Environment
```

The context can finish while the environment remains reachable.

---

# Stack vs Heap

The call stack should not be confused with general memory management.

A simplified conceptual model is:

```text
Call Stack
|
├── Active function calls
├── Execution state
└── Call information

Heap
|
├── Objects
├── Arrays
├── Functions
└── Other dynamically allocated data
```

This is a simplified mental model.

Actual JavaScript engine implementations are more complex and may use different internal memory strategies.

---

# Call Stack Does Not Store Every Variable

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

The object itself is not best understood as simply being "stored on the stack."

A more useful model is:

```text
Stack
|
└── Reference
       |
       v
Heap
|
└── Object
    ├── name
    └── role
```

This is a conceptual model rather than a strict specification of engine memory layout.

---

# Maximum Call Stack Size

The exact maximum stack depth is not a fixed ECMAScript language value.

It depends on the JavaScript engine and runtime environment.

Therefore, code should never rely on a specific number of recursive calls being safe.

---

# Recursion vs Iteration

Some recursive algorithms can be rewritten as loops.

Recursive version:

```js
function countDown(number) {
  if (number <= 0) {
    return;
  }

  console.log(number);

  countDown(number - 1);
}

countDown(5);
```

Iterative version:

```js
function countDown(number) {
  while (number > 0) {
    console.log(number);

    number -= 1;
  }
}

countDown(5);
```

Both can produce the same output.

The loop avoids repeatedly growing the call stack.

---

# Recursive Factorial

```js
function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return (
    number *
    factorial(number - 1)
  );
}

console.log(
  factorial(5)
);
```

The calls form:

```text
factorial(5)
factorial(4)
factorial(3)
factorial(2)
factorial(1)
```

Then the results return upward:

```text
factorial(1) → 1
factorial(2) → 2
factorial(3) → 6
factorial(4) → 24
factorial(5) → 120
```

---

# Recursive Fibonacci

```js
function fibonacci(number) {
  if (number <= 1) {
    return number;
  }

  return (
    fibonacci(number - 1) +
    fibonacci(number - 2)
  );
}

console.log(
  fibonacci(6)
);
```

This creates many function calls.

The call tree grows rapidly because each call can create two additional calls.

---

# Call Stack and Event Loop

The call stack is one part of JavaScript's runtime model.

Asynchronous JavaScript introduces other mechanisms, including:

* Host APIs
* Task queues
* Microtask queues
* The event loop

Consider:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

The immediate synchronous stack executes:

```text
console.log("A")
setTimeout(...)
console.log("C")
```

The callback does not simply jump onto the current stack immediately.

The event loop and task scheduling mechanisms determine when the callback can run after the current stack becomes clear.

The detailed process belongs to the next advanced topic.

---

# Current Stack Must Complete

A key idea is:

```text
JavaScript cannot execute two ordinary JavaScript
functions simultaneously on the same main call stack.
```

For example:

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("Running");
}

first();
```

At the deepest point:

```text
third
second
first
Global
```

The active stack has a clear top.

---

# Stack Blocking

Long synchronous work keeps the call stack occupied.

Example:

```js
function blockForTwoSeconds() {
  const end =
    Date.now() + 2000;

  while (Date.now() < end) {
    // Blocking work.
  }
}

blockForTwoSeconds();

console.log(
  "This runs after the blocking work."
);
```

During the loop, the current execution cannot move forward.

This is why expensive synchronous work can make a web page feel unresponsive.

---

# Stack Overflow Prevention

For recursive algorithms, consider:

* Providing a correct base case
* Reducing recursion depth
* Using iteration where appropriate
* Avoiding unnecessary recursive branches
* Breaking large tasks into smaller asynchronous units when appropriate

Example:

```js
function sumTo(number) {
  let total = 0;

  for (
    let index = 1;
    index <= number;
    index++
  ) {
    total += index;
  }

  return total;
}

console.log(
  sumTo(100000)
);
```

The iterative implementation avoids creating thousands of nested function calls.

---

# Important Distinction

The following concepts should remain separate:

```text
Execution Context
        |
        v
Runtime environment for evaluating code

Call Stack
        |
        v
Tracks active execution contexts

Lexical Environment
        |
        v
Stores and resolves bindings

Heap
        |
        v
Memory used for dynamically allocated data

Event Loop
        |
        v
Coordinates asynchronous work with stack availability
```

These mechanisms work together but are not interchangeable.

---

# Practical Debugging Example

```js
function validateUser(user) {
  debugger;

  if (!user) {
    throw new Error(
      "User is required."
    );
  }

  return true;
}

function processUser(user) {
  return validateUser(user);
}

function submitUser(user) {
  return processUser(user);
}

try {
  submitUser({
    name: "Osama Abu Motlaq",
  });
} catch (error) {
  console.error(
    error.message
  );
}
```

When execution pauses at `debugger`, the call stack conceptually looks like:

```text
validateUser
processUser
submitUser
Global
```

This provides a direct view of how the program reached the current line.

---

# Mental Model

When debugging synchronous JavaScript, ask:

```text
1. What function is currently executing?

2. Which function called it?

3. Which function called that function?

4. What is currently at the top of the stack?

5. What happens when the current function returns?

6. Is the stack growing because of recursion?

7. Could the current synchronous work block the application?

8. What does the stack trace reveal?
```

---

# Summary

The call stack:

* Tracks active function execution.
* Follows a Last In, First Out model.
* Starts with the global execution context.
* Adds a function execution context when a function is called.
* Removes that context when the function returns or completes.
* Grows during nested function calls.
* Grows during recursive calls.
* Can overflow when recursion becomes too deep.
* Helps explain synchronous execution order.
* Appears in error stack traces.
* Can be inspected through developer tools.
* Works together with lexical environments and closures.
* Is only one part of the broader JavaScript runtime model.
* Must be understood before learning the event loop in depth.

A simplified runtime model is:

```text
JavaScript Code
      |
      v
Execution Context
      |
      v
Call Stack
      |
      v
Synchronous Execution
      |
      v
Event Loop + Queues
      |
      v
Asynchronous Continuation
```
