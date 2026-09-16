# JavaScript Functions

Functions are reusable blocks of code designed to perform a specific task.

A function can:

* Receive data as input.
* Process that data.
* Return a result.
* Be executed whenever it is needed.
* Be reused multiple times.

Functions are one of the most important concepts in JavaScript because they allow applications to be divided into smaller, organized, and reusable pieces of logic.

---

## Table of Contents

1. [What Is a Function?](#1-what-is-a-function)
2. [Why Use Functions?](#2-why-use-functions)
3. [Function Declaration](#3-function-declaration)
4. [Calling a Function](#4-calling-a-function)
5. [Parameters](#5-parameters)
6. [Arguments](#6-arguments)
7. [Parameters vs Arguments](#7-parameters-vs-arguments)
8. [The return Statement](#8-the-return-statement)
9. [Returning Values](#9-returning-values)
10. [return vs console.log](#10-return-vs-consolelog)
11. [Functions Without Parameters](#11-functions-without-parameters)
12. [Multiple Parameters](#12-multiple-parameters)
13. [Default Parameters](#13-default-parameters)
14. [Function Expressions](#14-function-expressions)
15. [Anonymous Functions](#15-anonymous-functions)
16. [Function Hoisting](#16-function-hoisting)
17. [Local Variables](#17-local-variables)
18. [Functions and Scope](#18-functions-and-scope)
19. [Passing Functions as Values](#19-passing-functions-as-values)
20. [Rest Parameters](#20-rest-parameters)
21. [The arguments Object](#21-the-arguments-object)
22. [Pure and Impure Functions](#22-pure-and-impure-functions)
23. [Function Design Principles](#23-function-design-principles)
24. [Common Pitfalls](#24-common-pitfalls)
25. [Best Practices](#25-best-practices)
26. [Quick Reference](#26-quick-reference)
27. [Key Takeaways](#27-key-takeaways)

---

# 1. What Is a Function?

A function is a reusable block of code that can be executed when you call it.

For example:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}
```

At this point, JavaScript has **defined** the function, but the code inside it has not executed yet.

To execute it:

```js
greet();
```

### Output

```text
Hello, Osama Abu Motlaq.
```

The parentheses:

```js
greet();
```

are what cause the function to be **called** or **invoked**.

---

## Function Execution

Consider:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}

console.log("Before");

greet();

console.log("After");
```

### Output

```text
Before
Hello, Osama Abu Motlaq.
After
```

The execution flow is:

```text
1. Define greet
2. Print "Before"
3. Call greet()
4. Execute the function body
5. Print "After"
```

The function body only runs when the function is invoked.

---

# 2. Why Use Functions?

Without functions, repeated logic may have to be written multiple times.

For example:

```js
console.log("Hello, Osama Abu Motlaq.");
console.log("Hello, Osama Abu Motlaq.");
console.log("Hello, Osama Abu Motlaq.");
```

A function allows the logic to be written once:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}

greet();
greet();
greet();
```

The function provides **reuse**.

Functions also help with:

* Code organization.
* Separation of responsibilities.
* Testing.
* Debugging.
* Maintainability.
* Abstraction.

A good function should generally have a clear purpose.

For example:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

The function has one obvious responsibility: calculating a total.

---

# 3. Function Declaration

A function declaration uses the `function` keyword.

### Syntax

```js
function functionName(parameters) {
  // function body
}
```

Example:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}
```

The main components are:

```text
function
   ↓
function name
   ↓
parameters
   ↓
function body
```

```js
function greet(name) {
  return `Hello, ${name}.`;
}
```

Here:

* `function` declares a function.
* `greet` is the function name.
* `name` is a parameter.
* `{ ... }` contains the function body.
* `return` sends a value back to the caller.

---

# 4. Calling a Function

Defining a function does not execute it.

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}
```

The function is only executed when called:

```js
greet();
```

You can call the same function multiple times:

```js
greet();
greet();
greet();
```

Each call executes the function body again.

---

## Function Calls Can Be Used in Expressions

A function that returns a value can participate in larger expressions.

```js
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result);
```

### Output

```text
30
```

The function call:

```js
add(10, 20)
```

produces the value:

```js
30
```

That value is then assigned to `result`.

---

# 5. Parameters

Parameters are variables defined in a function's declaration.

```js
function greet(name) {
  return `Hello, ${name}.`;
}
```

Here:

```js
name
```

is a parameter.

Parameters allow a function to work with different input values.

```js
function greet(name) {
  return `Hello, ${name}.`;
}

console.log(greet("Osama Abu Motlaq"));
console.log(greet("Developer"));
```

### Output

```text
Hello, Osama Abu Motlaq.
Hello, Developer.
```

The function logic stays the same while the input changes.

---

## Multiple Parameters

A function can accept multiple parameters:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(25, 4);

console.log(total);
```

### Output

```text
100
```

The parameters are:

```js
price
quantity
```

The function receives values for both when called.

---

# 6. Arguments

Arguments are the actual values passed to a function when it is called.

```js
function greet(name) {
  return `Hello, ${name}.`;
}

greet("Osama Abu Motlaq");
```

Here:

```text
name
```

is the parameter.

```text
"Osama Abu Motlaq"
```

is the argument.

---

# 7. Parameters vs Arguments

This distinction is important.

### Parameters

Parameters are variables defined by the function:

```js
function add(a, b) {
  return a + b;
}
```

`a` and `b` are parameters.

### Arguments

Arguments are values supplied when calling the function:

```js
add(10, 20);
```

`10` and `20` are arguments.

### Summary

```text
Function definition:
function add(a, b)

a and b → parameters

Function call:
add(10, 20)

10 and 20 → arguments
```

---

# 8. The return Statement

The `return` statement sends a value from a function back to the code that called it.

```js
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result);
```

### Output

```text
30
```

The value returned by:

```js
return a + b;
```

is received by:

```js
const result = add(10, 20);
```

---

## return Stops Function Execution

When JavaScript reaches `return`, the function immediately exits.

```js
function example() {
  console.log("First");

  return;

  console.log("Second");
}

example();
```

### Output

```text
First
```

The second `console.log()` never executes because the function has already returned.

---

# 9. Returning Values

A function can return almost any JavaScript value.

## Return a String

```js
function getName() {
  return "Osama Abu Motlaq";
}
```

## Return a Number

```js
function add(a, b) {
  return a + b;
}
```

## Return a Boolean

```js
function isAdult(age) {
  return age >= 18;
}
```

## Return an Array

```js
function getSkills() {
  return ["HTML", "CSS", "JavaScript", "React"];
}
```

## Return an Object

```js
function getDeveloper() {
  return {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
  };
}
```

Functions can therefore be used to calculate, create, transform, or retrieve values.

---

# 10. return vs console.log

These two concepts are very different.

## `console.log()`

Displays something in the console:

```js
function add(a, b) {
  console.log(a + b);
}
```

Calling:

```js
const result = add(10, 20);
console.log(result);
```

produces:

```text
30
undefined
```

The function printed `30`, but it did not return `30`.

---

## `return`

Returns a value to the caller:

```js
function add(a, b) {
  return a + b;
}
```

Now:

```js
const result = add(10, 20);

console.log(result);
```

produces:

```text
30
```

### Important Difference

```text
console.log()
    ↓
Displays a value

return
    ↓
Sends a value back to the caller
```

This distinction becomes extremely important when building real applications.

---

# 11. Functions Without Parameters

A function does not have to accept parameters.

```js
function showMessage() {
  return "Welcome, Osama Abu Motlaq.";
}

console.log(showMessage());
```

A function can also perform an action without returning a value:

```js
function printWelcome() {
  console.log("Welcome, Osama Abu Motlaq.");
}
```

If a function does not explicitly return a value, JavaScript returns:

```js
undefined
```

Example:

```js
function greet() {
  console.log("Hello.");
}

const result = greet();

console.log(result);
```

### Output

```text
Hello.
undefined
```

---

# 12. Multiple Parameters

Functions can accept multiple parameters.

```js
function introduce(name, role, experience) {
  return `${name} is a ${role} with ${experience} years of experience.`;
}

console.log(
  introduce("Osama Abu Motlaq", "Frontend Developer", 2)
);
```

### Output

```text
Osama Abu Motlaq is a Frontend Developer with 2 years of experience.
```

The order of arguments matters.

```js
function subtract(a, b) {
  return a - b;
}

console.log(subtract(10, 3)); // 7
console.log(subtract(3, 10)); // -7
```

JavaScript assigns arguments to parameters by position.

```text
First argument  → First parameter
Second argument → Second parameter
Third argument  → Third parameter
```

---

# 13. Default Parameters

A parameter can have a default value.

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}.`;
}

console.log(greet());
```

### Output

```text
Hello, Osama Abu Motlaq.
```

If an argument is provided, it replaces the default:

```js
console.log(greet("Developer"));
```

### Output

```text
Hello, Developer.
```

---

## Default Parameters and undefined

The default value is used when the argument is `undefined`.

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}.`;
}

console.log(greet(undefined));
```

Output:

```text
Hello, Osama Abu Motlaq.
```

But `null` is an actual value:

```js
console.log(greet(null));
```

The result is:

```text
Hello, null.
```

`null` does not trigger the default parameter.

---

# 14. Function Expressions

A function can be stored in a variable.

```js
const greet = function () {
  console.log("Hello, Osama Abu Motlaq.");
};
```

This is called a **function expression**.

You call it the same way:

```js
greet();
```

### Function Declaration

```js
function greet() {
  console.log("Hello.");
}
```

### Function Expression

```js
const greet = function () {
  console.log("Hello.");
};
```

Both create callable functions, but they have important differences in hoisting behavior.

---

# 15. Anonymous Functions

A function without a name is called an **anonymous function**.

```js
const greet = function () {
  console.log("Hello, Osama Abu Motlaq.");
};
```

The function itself has no name.

It is stored in the variable:

```js
greet
```

Anonymous functions are commonly used when a function is needed temporarily, especially as a callback.

For example:

```js
setTimeout(function () {
  console.log("Hello, Osama Abu Motlaq.");
}, 1000);
```

The function is passed directly to another function.

Callbacks and higher-order functions are covered in more detail in `higher-order functions.md`.

---

# 16. Function Hoisting

Function declarations are hoisted.

This means a function declaration can be called before it appears in the source code.

```js
greet();

function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}
```

### Output

```text
Hello, Osama Abu Motlaq.
```

JavaScript makes the function declaration available before execution reaches its written position.

---

## Function Expressions Are Different

This does not work:

```js
greet();

const greet = function () {
  console.log("Hello, Osama Abu Motlaq.");
};
```

The variable exists in the temporal dead zone before its declaration is initialized.

You must initialize it before calling it:

```js
const greet = function () {
  console.log("Hello, Osama Abu Motlaq.");
};

greet();
```

### Practical Rule

Although function declarations are hoisted, it is usually clearer to define functions before using them.

---

# 17. Local Variables

Variables declared inside a function are local to that function.

```js
function calculateTotal() {
  const price = 100;

  return price * 2;
}

console.log(calculateTotal());
```

The variable:

```js
price
```

cannot normally be accessed outside the function.

```js
function calculateTotal() {
  const price = 100;
}

console.log(price);
```

This produces a `ReferenceError` because `price` is not accessible in that scope.

---

# 18. Functions and Scope

A function creates a scope.

Consider:

```js
const name = "Osama Abu Motlaq";

function greet() {
  const message = `Hello, ${name}.`;

  console.log(message);
}

greet();
```

The function can access variables from its outer scope.

But the outer scope cannot access variables created inside the function:

```js
function greet() {
  const message = "Hello, Osama Abu Motlaq.";
}

console.log(message);
```

This fails because `message` is local to `greet`.

This relationship between functions and lexical scope becomes especially important when learning **closures**, which are covered in:

```text
scope-closures.md
```

---

# 19. Passing Functions as Values

In JavaScript, functions are values.

This means a function can be:

* Stored in a variable.
* Stored in an object.
* Stored in an array.
* Passed as an argument.
* Returned from another function.

For example:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}

const messageFunction = greet;

messageFunction();
```

Both variables reference the same function.

---

## Passing a Function to Another Function

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}

function executeFunction(callback) {
  callback();
}

executeFunction(greet);
```

### Output

```text
Hello, Osama Abu Motlaq.
```

Notice the difference:

```js
executeFunction(greet);
```

passes the function itself.

Whereas:

```js
executeFunction(greet());
```

calls the function immediately and passes its return value.

This distinction is fundamental to callbacks and higher-order functions.

---

# 20. Rest Parameters

Rest parameters allow a function to accept an arbitrary number of arguments.

The syntax uses `...`.

```js
function sum(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sum(10, 20, 30));
```

### Output

```text
60
```

Inside the function, `numbers` is an array:

```js
function showNumbers(...numbers) {
  console.log(numbers);
}

showNumbers(10, 20, 30);
```

Output:

```text
[10, 20, 30]
```

---

## Rest Parameters with Regular Parameters

Rest parameters can appear after normal parameters.

```js
function introduce(role, ...skills) {
  return {
    role,
    skills
  };
}

console.log(
  introduce(
    "Frontend Developer",
    "HTML",
    "CSS",
    "JavaScript",
    "React"
  )
);
```

The first argument goes to `role`.

The remaining arguments are collected into `skills`.

### Important Rule

The rest parameter must be the last parameter.

Valid:

```js
function example(first, ...rest) {}
```

Invalid:

```js
function example(...rest, last) {}
```

---

# 21. The arguments Object

Regular functions have access to a special `arguments` object.

```js
function showArguments() {
  console.log(arguments);
}

showArguments("Osama Abu Motlaq", "React", "JavaScript");
```

The `arguments` object contains the arguments passed to the function.

You can access values by index:

```js
function showArguments() {
  console.log(arguments[0]);
  console.log(arguments[1]);
}

showArguments("Osama Abu Motlaq", "React");
```

### Output

```text
Osama Abu Motlaq
React
```

---

## Rest Parameters Are Usually Preferred

Modern JavaScript commonly uses rest parameters instead:

```js
function showArguments(...args) {
  console.log(args);
}
```

This provides a real array and is more explicit.

Rest parameters are also the modern approach when you intentionally want to collect an arbitrary number of arguments.

---

# 22. Pure and Impure Functions

A **pure function** consistently produces the same output for the same input and does not modify external state.

Example:

```js
function add(a, b) {
  return a + b;
}
```

For the same inputs:

```js
add(10, 20);
```

the result is always:

```text
30
```

The function does not modify anything outside itself.

---

## Impure Function

An impure function can depend on or modify external state.

```js
let total = 0;

function addToTotal(amount) {
  total += amount;
}
```

The function modifies the external variable:

```js
total
```

Its result depends on state outside the function.

Pure functions are generally easier to:

* Test.
* Understand.
* Debug.
* Reuse.
* Reason about.

This concept becomes particularly useful when working with React state and functional programming patterns.

---

# 23. Function Design Principles

## One Clear Responsibility

Prefer:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

over a function that performs many unrelated tasks:

```js
function processEverything() {
  // calculate price
  // validate user
  // save data
  // update UI
  // send email
}
```

A function should ideally have a clear responsibility.

---

## Use Meaningful Names

Good:

```js
function calculateTotal() {}
function validateEmail() {}
function getUser() {}
function formatDate() {}
```

Less useful:

```js
function doStuff() {}
function process() {}
function x() {}
```

Function names should communicate intent.

---

## Keep Functions Focused

A smaller function is not automatically better.

The goal is to create functions that have:

* A clear purpose.
* Understandable inputs.
* Predictable outputs.
* Minimal unnecessary side effects.

---

# 24. Common Pitfalls

## 1. Forgetting to Call the Function

This defines a function:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}
```

But this executes it:

```js
greet();
```

Defining and calling are different operations.

---

## 2. Confusing a Function With Its Return Value

```js
function getNumber() {
  return 10;
}
```

This:

```js
getNumber
```

refers to the function.

This:

```js
getNumber()
```

calls the function and produces:

```text
10
```

---

## 3. Forgetting return

Incorrect:

```js
function add(a, b) {
  a + b;
}

const result = add(10, 20);

console.log(result);
```

Output:

```text
undefined
```

Correct:

```js
function add(a, b) {
  return a + b;
}
```

---

## 4. Using console.log Instead of return

Incorrect when another part of the program needs the value:

```js
function add(a, b) {
  console.log(a + b);
}
```

Prefer:

```js
function add(a, b) {
  return a + b;
}
```

The caller can then decide what to do with the result.

---

## 5. Returning Too Early

```js
function calculate() {
  return 10;

  console.log("This never runs.");
}
```

Everything after `return` in that execution path is unreachable.

---

## 6. Incorrect Argument Order

```js
function divide(a, b) {
  return a / b;
}

divide(10, 2); // 5
divide(2, 10); // 0.2
```

Arguments are assigned according to parameter position.

---

## 7. Mutating External State Unnecessarily

Be careful with functions that modify variables outside their own scope.

```js
let count = 0;

function increment() {
  count++;
}
```

This may be necessary in some situations, but excessive external mutation makes code harder to reason about.

---

# 25. Best Practices

### 1. Give Functions Clear Names

```js
function calculateTotal() {}
```

is better than:

```js
function calc() {}
```

when clarity matters.

### 2. Keep Responsibilities Focused

A function should ideally perform one coherent task.

### 3. Prefer Returning Values

Return values make functions more reusable:

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

The caller can then:

```js
const total = calculateTotal(20, 3);
```

or:

```js
console.log(calculateTotal(20, 3));
```

or:

```js
const total = calculateTotal(20, 3) + 10;
```

### 4. Avoid Unnecessary Side Effects

Pure functions are generally easier to test and reason about.

### 5. Avoid Excessively Large Functions

If a function becomes responsible for many unrelated tasks, consider separating those responsibilities.

### 6. Use Default Parameters When Appropriate

Instead of manually checking for missing values:

```js
function greet(name) {
  if (name === undefined) {
    name = "Osama Abu Motlaq";
  }

  return `Hello, ${name}.`;
}
```

you can use:

```js
function greet(name = "Osama Abu Motlaq") {
  return `Hello, ${name}.`;
}
```

### 7. Use Rest Parameters for Variable-Length Input

Prefer:

```js
function sum(...numbers) {}
```

when you intentionally need an arbitrary number of arguments.

---

# 26. Quick Reference

| Concept              | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| Function             | Reusable block of code                                            |
| Function declaration | Declares a named function with `function`                         |
| Function call        | Executes a function                                               |
| Parameter            | Variable defined in the function declaration                      |
| Argument             | Value passed when calling a function                              |
| `return`             | Sends a value back and exits the function                         |
| Default parameter    | Provides a fallback parameter value                               |
| Function expression  | Stores a function in a variable or expression                     |
| Anonymous function   | Function without its own name                                     |
| Hoisting             | Function declarations are available before their written position |
| Local variable       | Variable accessible within its function scope                     |
| Rest parameter       | Collects remaining arguments into an array                        |
| `arguments`          | Array-like object available in regular functions                  |
| Pure function        | Same input produces same output without external side effects     |
| Impure function      | Depends on or modifies external state                             |

---

# 27. Key Takeaways

1. A function is a reusable block of JavaScript logic.
2. Defining a function does not execute it.
3. A function executes when it is called.
4. Parameters define the inputs a function expects.
5. Arguments are the actual values supplied to those parameters.
6. Parameters are matched with arguments by position.
7. `return` sends a value back to the caller.
8. `return` also immediately exits the function.
9. `console.log()` displays a value but does not return it.
10. Functions can return strings, numbers, Booleans, arrays, objects, or other values.
11. Default parameters provide fallback values.
12. Function expressions store functions in variables or other expressions.
13. Function declarations are hoisted, while function expressions assigned to `const` or `let` cannot be called before initialization.
14. Functions create their own local scope.
15. Functions are first-class values in JavaScript.
16. Rest parameters allow functions to accept an arbitrary number of arguments.
17. Pure functions are easier to test and reason about.
18. Good functions have clear responsibilities, meaningful names, predictable inputs, and useful outputs.
19. Functions are the foundation for more advanced concepts such as callbacks, higher-order functions, arrow functions, and closures.
