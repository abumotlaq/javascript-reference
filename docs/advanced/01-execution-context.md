# JavaScript Execution Context

## Overview

An execution context is the internal environment in which JavaScript code is evaluated and executed.

It provides the information JavaScript needs to execute code, including:

* Variable and function bindings
* Scope information
* The value of `this`
* Access to outer environments
* Information required for evaluating expressions and statements

JavaScript creates and manages execution contexts automatically.

You do not create an execution context directly in normal JavaScript code.

---

## Why Execution Contexts Matter

Execution contexts explain several important JavaScript behaviors:

* How variables become available
* How functions access variables from outer scopes
* Why function calls create new execution environments
* How `this` is determined
* How the call stack works
* Why closures can preserve access to outer variables
* How JavaScript starts executing a program
* How nested function calls are handled

A simplified model is:

```text
JavaScript Program
       |
       v
Create Global Execution Context
       |
       v
Execute Global Code
       |
       v
Call a Function
       |
       v
Create Function Execution Context
       |
       v
Execute Function Code
       |
       v
Function Returns
       |
       v
Remove Function Context
```

---

# Types of Execution Contexts

JavaScript primarily works with these execution context categories:

1. Global execution context
2. Function execution context
3. Eval execution context

The first two are the most important for everyday JavaScript.

---

## Global Execution Context

The global execution context is created when JavaScript begins evaluating a script.

Example:

```js
const name = "Osama Abu Motlaq";

console.log(name);
```

Before the code executes, JavaScript creates the global execution context.

Conceptually:

```text
Global Execution Context
|
├── Global bindings
│   └── name
|
├── Global scope
|
└── Global this
```

The global execution context remains active while the global script is executing.

---

## Function Execution Context

Every time a function is called, JavaScript creates a new function execution context.

Example:

```js
function greet(name) {
  const message = `Hello, ${name}!`;

  return message;
}

greet("Osama Abu Motlaq");
```

When `greet()` is called, a new execution context is created:

```text
Function Execution Context
|
├── Parameter bindings
│   └── name
|
├── Local bindings
│   └── message
|
├── Scope information
|
└── this value
```

The function context exists while the function is executing.

When the function finishes, its execution context is removed from the call stack.

---

# Creation and Execution

A useful mental model is to think about execution in two broad stages:

```text
Create Execution Context
        |
        v
Prepare execution state
        |
        v
Execute JavaScript code
```

The exact ECMAScript specification is more precise and describes multiple internal components and algorithms, but this simplified model is useful for understanding runtime behavior.

---

# Environment Records

Execution contexts keep track of bindings through internal environment structures.

An environment record stores information about identifiers and their associated values.

For example:

```js
const name = "Osama Abu Motlaq";
let age = 25;
```

Conceptually:

```text
Environment Record
|
├── name → "Osama Abu Motlaq"
└── age  → 25
```

JavaScript uses environment records to determine where identifiers are stored and how they are resolved.

---

# Lexical Environment

A lexical environment is an internal structure used to resolve identifiers.

Conceptually:

```text
Lexical Environment
|
├── Environment Record
|
└── Outer Environment Reference
```

The outer environment reference connects the current environment to an outer environment.

For example:

```js
const role = "Frontend Developer";

function greet() {
  const message = "Hello";

  console.log(role);
  console.log(message);
}

greet();
```

The function can access `message` from its own environment.

It can also access `role` through the outer environment.

Conceptually:

```text
Function Environment
|
├── message
|
└── Outer Environment
        |
        └── Global Environment
                |
                └── role
```

---

# Identifier Resolution

When JavaScript encounters an identifier, it needs to determine where that identifier comes from.

Example:

```js
const role = "Frontend Developer";

function showRole() {
  console.log(role);
}

showRole();
```

When JavaScript evaluates:

```js
role
```

inside `showRole()`, it searches the current environment.

The lookup can be represented as:

```text
showRole Environment
        |
        | role not found
        v
Global Environment
        |
        | role found
        v
"Frontend Developer"
```

This process is often described as lexical scope resolution.

---

# Local Variables

Variables declared inside a function belong to that function's local environment.

```js
function calculateTotal() {
  const price = 100;
  const shipping = 20;

  return price + shipping;
}

console.log(calculateTotal());
```

Inside the function:

```text
Function Environment
|
├── price
└── shipping
```

Outside the function, those bindings are not directly available:

```js
function calculateTotal() {
  const price = 100;

  return price;
}

console.log(price);
```

This produces an error because `price` is not available in the global environment.

---

# Parameters

Function parameters become bindings in the function execution environment.

```js
function greet(name) {
  console.log(name);
}

greet("Osama Abu Motlaq");
```

Conceptually:

```text
Function Environment
|
└── name → "Osama Abu Motlaq"
```

The parameter is available during the function execution.

---

# Local Variables and Parameters

Parameters and local declarations coexist within the function's execution environment.

```js
function introduce(name, role) {
  const message = `${name} is a ${role}.`;

  console.log(message);
}

introduce(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

Conceptually:

```text
Function Environment
|
├── name
├── role
└── message
```

---

# Nested Functions

A nested function creates another execution context when called.

```js
function outer() {
  const outerValue = "Outer value";

  function inner() {
    const innerValue = "Inner value";

    console.log(outerValue);
    console.log(innerValue);
  }

  inner();
}

outer();
```

At runtime:

```text
Global Context
      |
      v
outer Context
      |
      v
inner Context
```

The `inner` context can resolve:

```text
innerValue
```

locally, and:

```text
outerValue
```

through its outer lexical environment.

---

# Execution Context and Scope

Execution context and scope are related but are not the same concept.

Scope describes where an identifier can be accessed.

Execution context describes the runtime environment in which code is currently being evaluated.

For example:

```js
const role = "Frontend Developer";

function showRole() {
  console.log(role);
}

showRole();
```

The function has lexical access to the outer `role`.

The function execution context is created when `showRole()` is called.

---

# `this` and Execution Context

Execution contexts also contain the information needed to determine the current `this` value.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(this.name);
  },
};

user.showName();
```

Here:

```js
this
```

refers to the object used to call the method.

In this example:

```js
user.showName();
```

the receiver is:

```js
user
```

so:

```js
this === user
```

inside the method.

---

# Different Calling Forms

The way a function is called can affect `this`.

Example:

```js
function showThis() {
  console.log(this);
}

showThis();
```

The exact `this` value depends on the execution mode and the way the function is called.

In strict mode:

```js
"use strict";

function showThis() {
  console.log(this);
}

showThis();
```

the `this` value is:

```js
undefined
```

---

# Method Calls

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    console.log(this.name);
  },
};

user.showName();
```

Conceptually:

```text
Call expression
      |
      v
user.showName()
      |
      v
this → user
```

---

# Arrow Functions and `this`

Arrow functions behave differently.

They do not create their own `this` binding.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  showName() {
    const show = () => {
      console.log(this.name);
    };

    show();
  },
};

user.showName();
```

The arrow function uses the surrounding lexical `this`.

Conceptually:

```text
Method Context
|
└── this → user
       |
       └── Arrow Function
              |
              └── uses outer this
```

This behavior is one reason arrow functions are commonly used for callbacks.

---

# Global Code Execution

Consider:

```js
const name = "Osama Abu Motlaq";

console.log(name);

function greet() {
  console.log("Hello");
}

greet();
```

A simplified runtime flow is:

```text
1. Create Global Execution Context
2. Evaluate global declarations
3. Execute console.log(name)
4. Evaluate greet()
5. Create Function Execution Context
6. Execute function body
7. Function completes
8. Return to global execution
```

---

# Function Calls

Consider:

```js
function first() {
  second();
}

function second() {
  console.log("Second function");
}

first();
```

The runtime flow can be represented as:

```text
Global Context
      |
      v
first Context
      |
      v
second Context
      |
      v
console.log()
```

When `second()` returns:

```text
second Context removed
      |
      v
first Context continues
```

When `first()` returns:

```text
first Context removed
      |
      v
Global Context continues
```

---

# Recursive Calls

Each recursive call creates another function execution context.

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

Conceptually:

```text
Global
  |
  v
countdown(3)
  |
  v
countdown(2)
  |
  v
countdown(1)
  |
  v
countdown(0)
```

Each call has its own parameter binding.

```text
countdown(3) → number = 3
countdown(2) → number = 2
countdown(1) → number = 1
countdown(0) → number = 0
```

---

# Execution Context and the Call Stack

Execution contexts are closely related to the JavaScript call stack.

Example:

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

The stack grows like this:

```text
| third  |
| second |
| first  |
| global |
---------
```

After `third()` returns:

```text
| second |
| first  |
| global |
---------
```

After `second()` returns:

```text
| first  |
| global |
---------
```

After `first()` returns:

```text
| global |
---------
```

The call stack is responsible for tracking active execution contexts during synchronous execution.

---

# Stack Overflow

Recursive functions can keep creating execution contexts until the call stack limit is reached.

Example:

```js
function repeat() {
  repeat();
}

repeat();
```

There is no base condition.

The function repeatedly creates new execution contexts.

Eventually the JavaScript engine throws an error similar to:

```text
RangeError: Maximum call stack size exceeded
```

---

# Closures and Execution Contexts

Closures are easier to understand when execution contexts and lexical environments are clear.

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

console.log(counter());
console.log(counter());
```

The `createCounter()` function finishes.

Its execution context is no longer active on the call stack.

However, the returned function still has access to the lexical environment containing:

```js
count
```

Conceptually:

```text
createCounter Environment
|
└── count → 0
       ^
       |
returned increment function
```

The environment remains reachable because the returned function still references it.

---

# Multiple Closures

Different function calls can create independent environments.

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;

    return count;
  };
}

const firstCounter =
  createCounter();

const secondCounter =
  createCounter();

console.log(
  firstCounter()
);

console.log(
  firstCounter()
);

console.log(
  secondCounter()
);
```

The two counters have separate environments:

```text
Counter A Environment
|
└── count → 2

Counter B Environment
|
└── count → 1
```

They do not share the same `count`.

---

# Temporal Dead Zone

Execution context creation also helps explain why `let` and `const` behave differently from older variable declarations.

Example:

```js
console.log(value);

let value = 10;
```

The identifier `value` exists in the lexical environment, but it cannot be accessed before its declaration is evaluated.

The period between entering the scope and reaching the declaration is commonly called the:

```text
Temporal Dead Zone
```

Accessing the binding during this period throws:

```text
ReferenceError
```

---

# `var` and Hoisting

Consider:

```js
console.log(value);

var value = 10;
```

This does not throw a `ReferenceError`.

Conceptually, the declaration is processed so that the binding exists before the assignment is executed.

The result is effectively similar to:

```js
var value;

console.log(value);

value = 10;
```

The initial value is:

```js
undefined
```

---

# Function Declarations

Function declarations are also available before their textual position.

Example:

```js
greet();

function greet() {
  console.log(
    "Hello, Osama Abu Motlaq!"
  );
}
```

The function can be called before the declaration appears in source order.

This is different from a function expression stored in a `let` or `const` binding.

---

# Function Expression

Consider:

```js
greet();

const greet = function () {
  console.log(
    "Hello, Osama Abu Motlaq!"
  );
};
```

The `greet` binding cannot be accessed before its initialization.

This results in a:

```text
ReferenceError
```

---

# Execution Order

JavaScript executes synchronous code according to program order.

Example:

```js
console.log("A");

console.log("B");

console.log("C");
```

Output:

```text
A
B
C
```

Function calls temporarily create new execution contexts.

Example:

```js
console.log("A");

function show() {
  console.log("B");
}

show();

console.log("C");
```

Output:

```text
A
B
C
```

---

# Nested Calls

Example:

```js
function one() {
  console.log("One");

  two();

  console.log("One again");
}

function two() {
  console.log("Two");

  three();

  console.log("Two again");
}

function three() {
  console.log("Three");
}

one();
```

Execution order:

```text
One
Two
Three
Two again
One again
```

The current execution context must complete its nested call before continuing from the point where the nested call occurred.

---

# Return Values

A function execution context can produce a completion value through `return`.

Example:

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

Conceptually:

```text
calculateTotal Context
|
├── price
├── shipping
|
└── return 120
```

The caller receives the returned value.

---

# Early Return

A function can finish before reaching the end of its body.

```js
function getRole(isDeveloper) {
  if (!isDeveloper) {
    return "Unknown";
  }

  return "Frontend Developer";
}

console.log(
  getRole(true)
);
```

Once the `return` is executed, the function context completes and control returns to the caller.

---

# Exception Completion

A function does not always finish through `return`.

It can also finish because an exception is thrown.

Example:

```js
function processValue() {
  throw new Error(
    "Processing failed."
  );
}

try {
  processValue();
} catch (error) {
  console.log(
    error.message
  );
}
```

The function execution is interrupted.

The exception propagates until a compatible `catch` handler is found.

---

# Exception Propagation

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

try {
  first();
} catch (error) {
  console.log(
    error.message
  );
}
```

Conceptually:

```text
third Context
      |
      | throw
      v
second Context
      |
      | no catch
      v
first Context
      |
      | no catch
      v
try...catch
      |
      v
Error handled
```

---

# Execution Context vs Call Stack

These concepts are related but should not be confused.

Execution context:

```text
The runtime environment for evaluating code
```

Call stack:

```text
The structure that tracks active execution contexts
```

A useful mental model is:

```text
Execution Context
       +
Call Stack
       =
How synchronous JavaScript execution is tracked
```

---

# Simplified Runtime Model

A useful simplified model for a function call is:

```text
Function Call
     |
     v
Create Function Execution Context
     |
     v
Create / access bindings
     |
     v
Resolve identifiers
     |
     v
Evaluate statements
     |
     v
Return or throw
     |
     v
Remove context from call stack
```

---

# Practical Example

```js
const developer =
  "Osama Abu Motlaq";

function createProfile(name) {
  const role =
    "Frontend Developer";

  function getProfile() {
    return {
      name,
      role,
    };
  }

  return getProfile();
}

const profile =
  createProfile(
    developer
  );

console.log(profile);
```

A simplified execution sequence:

```text
Global Context
|
├── developer
├── createProfile
|
└── call createProfile()
        |
        v
    Function Context
    |
    ├── name
    ├── role
    ├── getProfile
    |
    └── call getProfile()
            |
            v
        Nested Function Context
            |
            └── return object
```

---

# Mental Model

When analyzing a JavaScript program, ask:

```text
1. Which execution context is currently active?

2. Which function call created it?

3. Which bindings exist in the current environment?

4. Where is the outer environment?

5. Where is each identifier resolved?

6. What is the current `this` value?

7. What is currently on the call stack?

8. Does the function return normally?

9. Does the function throw an exception?

10. Does another function call create another execution context?
```

These questions make many JavaScript runtime behaviors much easier to reason about.

---

# Key Relationships

```text
Execution Context
        |
        +── Environment Records
        |
        +── Lexical Environment
        |
        +── Outer Environment Reference
        |
        +── `this` information
        |
        v
Function Execution
        |
        v
Call Stack
        |
        v
Synchronous Runtime Flow
```

Closures extend this model:

```text
Function
   |
   v
Lexical Environment
   |
   v
Outer Environment
   |
   v
Preserved Access
```

---

# Common Misconceptions

## Execution Context Is Not the Same as Scope

Scope describes identifier accessibility.

Execution context is the runtime environment used while code is executing.

---

## A Function's Context Does Not Stay on the Stack Forever

When a function returns, its execution context is removed from the active call stack.

A closure may still keep an environment reachable after the function has returned.

---

## Hoisting Does Not Mean JavaScript Physically Moves Code

The word "hoisting" is a useful mental model for explaining declaration behavior.

It does not mean the engine literally rearranges the source code before execution.

---

## Closures Are Not Created Because the Stack Keeps a Function Alive

The call stack tracks active execution.

A closure can keep an environment reachable after its execution context has returned.

---

## `this` Is Not Determined by Lexical Scope in Regular Functions

For regular functions, `this` depends primarily on how the function is called.

Arrow functions are different because they use lexical `this`.

---

# Summary

An execution context is the runtime environment in which JavaScript evaluates code.

The most important ideas are:

* Global code runs inside a global execution context.
* Function calls create function execution contexts.
* Execution contexts contain the information needed to evaluate code.
* Environment records hold bindings.
* Lexical environments connect the current scope to outer environments.
* Identifier lookup follows the lexical environment chain.
* Function parameters and local variables belong to the function's environment.
* `this` is part of the execution model and depends on the function and call form.
* Function calls are tracked by the call stack.
* Recursive calls create additional execution contexts.
* Exceptions can interrupt normal execution and propagate through callers.
* Closures can preserve access to environments after a function returns.
* `let` and `const` bindings have a Temporal Dead Zone before initialization.
* Hoisting describes declaration behavior and should not be interpreted as literal source-code movement.
