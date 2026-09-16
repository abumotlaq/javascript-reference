# JavaScript Higher-Order Functions

A **Higher-Order Function (HOF)** is a function that does at least one of the following:

1. Takes another function as an argument.
2. Returns another function as its result.

Higher-order functions are possible because JavaScript treats functions as **first-class values**.

This means a function can be stored in a variable, passed to another function, returned from a function, or stored inside an object or array.

Higher-order functions are a fundamental concept in modern JavaScript and are heavily used with:

* Array methods.
* Callbacks.
* Event handling.
* Asynchronous programming.
* Functional programming.
* React.

---

## Table of Contents

1. [Functions as Values](#1-functions-as-values)
2. [What Is a Higher-Order Function?](#2-what-is-a-higher-order-function)
3. [Callback Functions](#3-callback-functions)
4. [Higher-Order Function vs Callback](#4-higher-order-function-vs-callback)
5. [Passing a Function as an Argument](#5-passing-a-function-as-an-argument)
6. [Returning a Function](#6-returning-a-function)
7. [Combining Parameters and Callbacks](#7-combining-parameters-and-callbacks)
8. [Array Methods as Higher-Order Functions](#8-array-methods-as-higher-order-functions)
9. [`forEach()`](#9-foreach)
10. [`map()`](#10-map)
11. [`filter()`](#11-filter)
12. [`find()`](#12-find)
13. [`findIndex()`](#13-findindex)
14. [`some()`](#14-some)
15. [`every()`](#15-every)
16. [`reduce()`](#16-reduce)
17. [Chaining Array Methods](#17-chaining-array-methods)
18. [Custom Higher-Order Functions](#18-custom-higher-order-functions)
19. [Function Factories](#19-function-factories)
20. [Closures and Higher-Order Functions](#20-closures-and-higher-order-functions)
21. [Higher-Order Functions in Asynchronous JavaScript](#21-higher-order-functions-in-asynchronous-javascript)
22. [Higher-Order Functions in React](#22-higher-order-functions-in-react)
23. [Common Mistakes](#23-common-mistakes)
24. [Best Practices](#24-best-practices)
25. [Quick Reference](#25-quick-reference)
26. [Key Takeaways](#26-key-takeaways)

---

# 1. Functions as Values

To understand higher-order functions, you first need to understand that functions are values in JavaScript.

Consider:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}
```

You can store the function in another variable:

```js
const message = greet;
```

Now both variables refer to the same function.

```js
message();
```

### Output

```text
Hello, Osama Abu Motlaq.
```

Notice the difference between:

```js
const message = greet;
```

and:

```js
const message = greet();
```

The first stores the function itself.

The second executes the function and stores its return value.

---

## Function Reference vs Function Call

### Function reference

```js
const fn = greet;
```

You are saying:

> Store a reference to this function.

### Function call

```js
greet();
```

You are saying:

> Execute this function now.

This distinction is extremely important when working with callbacks.

---

# 2. What Is a Higher-Order Function?

A higher-order function is a function that works with other functions.

For example:

```js
function execute(callback) {
  callback();
}
```

The function `execute` accepts another function.

Therefore, `execute` is a higher-order function.

We can use it like this:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}

execute(greet);
```

### Output

```text
Hello, Osama Abu Motlaq.
```

The execution flow is:

```text
greet
  ↓
passed to execute
  ↓
execute receives it as callback
  ↓
callback()
  ↓
greet executes
```

---

## Two Ways to Be a Higher-Order Function

A function qualifies as higher-order if it:

### Accepts a function

```js
function execute(callback) {
  callback();
}
```

### Returns a function

```js
function createGreeting() {
  return function () {
    console.log("Hello, Osama Abu Motlaq.");
  };
}
```

A function can also do both.

---

# 3. Callback Functions

A **callback function** is a function passed to another function to be executed later or at a specific point.

Example:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq.");
}

function execute(callback) {
  callback();
}

execute(greet);
```

Here:

```js
greet
```

is the callback.

And:

```js
execute
```

is the higher-order function.

---

## Anonymous Callback

The callback does not need to have a separate name.

```js
function execute(callback) {
  callback();
}

execute(() => {
  console.log("Hello, Osama Abu Motlaq.");
});
```

This is extremely common in modern JavaScript.

---

## Callback Execution

Consider:

```js
function execute(callback) {
  console.log("Before callback");

  callback();

  console.log("After callback");
}

execute(() => {
  console.log("Callback executed");
});
```

### Output

```text
Before callback
Callback executed
After callback
```

The higher-order function controls when the callback executes.

---

# 4. Higher-Order Function vs Callback

These concepts are related but not identical.

Consider:

```js
function process(callback) {
  callback();
}
```

`process` is the **higher-order function** because it receives a function.

Now:

```js
process(() => {
  console.log("Hello, Osama Abu Motlaq.");
});
```

The arrow function is the **callback**.

### Relationship

```text
Higher-Order Function
        ↓
receives
        ↓
Callback Function
        ↓
executes it
```

A useful rule:

> The function receiving or returning another function is the higher-order function. The function being passed is the callback.

---

# 5. Passing a Function as an Argument

Because functions are values, they can be passed as arguments.

```js
function greet() {
  return "Hello, Osama Abu Motlaq.";
}

function printMessage(messageFunction) {
  console.log(messageFunction());
}

printMessage(greet);
```

### Output

```text
Hello, Osama Abu Motlaq.
```

The function:

```js
greet
```

is passed without parentheses.

This is important.

Correct:

```js
printMessage(greet);
```

Incorrect:

```js
printMessage(greet());
```

The incorrect version executes `greet` immediately and passes its returned string instead of passing the function itself.

---

## Passing Different Functions

A higher-order function can work with different callbacks.

```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function calculate(operation, a, b) {
  return operation(a, b);
}

console.log(calculate(add, 10, 20));
console.log(calculate(multiply, 10, 20));
```

### Output

```text
30
200
```

The `calculate` function does not need to know how the operation works.

It delegates the operation to the callback.

This is a basic example of **abstraction** and **behavior injection**.

---

# 6. Returning a Function

Higher-order functions can also return functions.

```js
function createGreeting() {
  return function () {
    console.log("Hello, Osama Abu Motlaq.");
  };
}

const greet = createGreeting();

greet();
```

### Output

```text
Hello, Osama Abu Motlaq.
```

The execution happens in two steps:

```js
const greet = createGreeting();
```

`createGreeting()` returns a function.

Then:

```js
greet();
```

executes that returned function.

---

## Returning an Arrow Function

The same idea can be written using an arrow function:

```js
const createGreeting = () => {
  return () => {
    console.log("Hello, Osama Abu Motlaq.");
  };
};

const greet = createGreeting();

greet();
```

Or with implicit return:

```js
const createGreeting = () => () => {
  console.log("Hello, Osama Abu Motlaq.");
};
```

The first version is often easier to understand.

---

# 7. Combining Parameters and Callbacks

A powerful pattern is to provide data to a higher-order function and allow a callback to determine what happens to that data.

```js
function processNumber(number, callback) {
  return callback(number);
}

const result = processNumber(10, number => number * 2);

console.log(result);
```

### Output

```text
20
```

The higher-order function controls the process:

```text
10
 ↓
processNumber
 ↓
callback
 ↓
number * 2
 ↓
20
```

You can change the behavior without changing `processNumber`.

```js
const result = processNumber(10, number => number + 5);

console.log(result);
```

Output:

```text
15
```

The same higher-order function now performs a different operation.

---

# 8. Array Methods as Higher-Order Functions

Many built-in array methods are higher-order functions because they accept callback functions.

Examples include:

```text
forEach()
map()
filter()
find()
findIndex()
some()
every()
reduce()
```

These methods allow you to describe **what should happen** without manually controlling every iteration.

Instead of:

```js
for (let i = 0; i < numbers.length; i++) {
  // logic
}
```

you can often use:

```js
numbers.map(number => number * 2);
```

The array method controls the iteration.

Your callback defines the operation.

---

# 9. forEach()

`forEach()` executes a callback once for each array element.

```js
const skills = ["HTML", "CSS", "JavaScript", "React"];

skills.forEach(skill => {
  console.log(skill);
});
```

### Output

```text
HTML
CSS
JavaScript
React
```

The callback receives the current element.

---

## Callback Parameters

The callback can receive up to three useful arguments:

```js
array.forEach((element, index, array) => {
  // ...
});
```

Example:

```js
const skills = ["HTML", "CSS", "JavaScript"];

skills.forEach((skill, index) => {
  console.log(`${index}: ${skill}`);
});
```

### Output

```text
0: HTML
1: CSS
2: JavaScript
```

---

## `forEach()` Does Not Return a New Array

```js
const numbers = [1, 2, 3];

const result = numbers.forEach(number => {
  return number * 2;
});

console.log(result);
```

Output:

```text
undefined
```

Use `forEach()` when your goal is to perform an action for each element, not create a transformed array.

---

# 10. map()

`map()` creates a **new array** by transforming each element.

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(number => number * 2);

console.log(doubled);
```

### Output

```text
[2, 4, 6, 8]
```

The original array remains unchanged:

```js
console.log(numbers);
```

Output:

```text
[1, 2, 3, 4]
```

---

## How `map()` Works

Conceptually:

```text
Original array
[1, 2, 3, 4]

      ↓ map()

Callback:
number => number * 2

      ↓

New array
[2, 4, 6, 8]
```

Each element is passed to the callback.

The callback's returned value becomes the corresponding element in the new array.

---

## Mapping Objects

```js
const developers = [
  { name: "Osama Abu Motlaq", role: "Frontend Developer" },
  { name: "Sara", role: "Designer" }
];

const names = developers.map(developer => developer.name);

console.log(names);
```

Output:

```text
["Osama Abu Motlaq", "Sara"]
```

This pattern is especially important in React when rendering lists.

---

# 11. filter()

`filter()` creates a new array containing only elements for which the callback returns a truthy value.

```js
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers);
```

### Output

```text
[2, 4, 6]
```

The callback acts as a test.

```text
Element
   ↓
Callback
   ↓
true → keep
false → remove
```

---

## Filtering Objects

```js
const developers = [
  { name: "Osama Abu Motlaq", active: true },
  { name: "Sara", active: false }
];

const activeDevelopers = developers.filter(
  developer => developer.active
);

console.log(activeDevelopers);
```

Only developers whose `active` property is truthy remain.

---

# 12. find()

`find()` returns the **first element** that satisfies the callback condition.

```js
const numbers = [5, 10, 15, 20];

const result = numbers.find(number => number > 10);

console.log(result);
```

### Output

```text
15
```

Only the first matching element is returned.

If no element matches:

```js
const result = numbers.find(number => number > 100);

console.log(result);
```

The result is:

```text
undefined
```

---

# 13. findIndex()

`findIndex()` returns the index of the first matching element.

```js
const skills = ["HTML", "CSS", "JavaScript", "React"];

const index = skills.findIndex(
  skill => skill === "JavaScript"
);

console.log(index);
```

### Output

```text
2
```

If no match exists, it returns:

```text
-1
```

---

# 14. some()

`some()` checks whether **at least one** element satisfies a condition.

```js
const numbers = [1, 3, 5, 8];

const hasEvenNumber = numbers.some(
  number => number % 2 === 0
);

console.log(hasEvenNumber);
```

### Output

```text
true
```

The method can stop as soon as it finds a matching element.

Conceptually:

```text
1 → false
3 → false
5 → false
8 → true

Stop
```

---

# 15. every()

`every()` checks whether **all** elements satisfy a condition.

```js
const numbers = [2, 4, 6, 8];

const allEven = numbers.every(
  number => number % 2 === 0
);

console.log(allEven);
```

### Output

```text
true
```

If one element fails:

```js
const numbers = [2, 4, 5, 8];

const allEven = numbers.every(
  number => number % 2 === 0
);

console.log(allEven);
```

Output:

```text
false
```

---

## `some()` vs `every()`

| Method    | Returns `true` when         |
| --------- | --------------------------- |
| `some()`  | At least one element passes |
| `every()` | Every element passes        |

Think:

```text
some()  → "Is there at least one?"
every() → "Do all of them?"
```

---

# 16. reduce()

`reduce()` is one of the most powerful array methods.

It processes an array and reduces it to a single accumulated value.

That value can be:

* A number.
* A string.
* An object.
* An array.
* Another data structure.

### Basic Example

```js
const numbers = [10, 20, 30];

const total = numbers.reduce(
  (sum, number) => sum + number,
  0
);

console.log(total);
```

### Output

```text
60
```

---

## Understanding the Accumulator

The callback receives:

```js
(accumulator, currentValue)
```

The second argument to `reduce()` is the initial accumulator value.

```js
.reduce(callback, initialValue)
```

For:

```js
const numbers = [10, 20, 30];

const total = numbers.reduce(
  (sum, number) => sum + number,
  0
);
```

the process is approximately:

```text
Initial sum = 0

0 + 10 = 10
10 + 20 = 30
30 + 30 = 60

Final result = 60
```

---

## `reduce()` With Objects

```js
const skills = ["HTML", "CSS", "JavaScript"];

const result = skills.reduce((object, skill, index) => {
  object[index] = skill;
  return object;
}, {});

console.log(result);
```

Result:

```js
{
  0: "HTML",
  1: "CSS",
  2: "JavaScript"
}
```

This demonstrates that `reduce()` is not limited to mathematical calculations.

---

# 17. Chaining Array Methods

Higher-order array methods can be chained.

For example:

```js
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
  .filter(number => number % 2 === 0)
  .map(number => number * 10);

console.log(result);
```

### Output

```text
[20, 40, 60]
```

The process is:

```text
[1, 2, 3, 4, 5, 6]
        ↓
filter even numbers
        ↓
[2, 4, 6]
        ↓
multiply each by 10
        ↓
[20, 40, 60]
```

---

## More Complex Chain

```js
const developers = [
  { name: "Osama Abu Motlaq", active: true },
  { name: "Sara", active: false },
  { name: "Ali", active: true }
];

const activeNames = developers
  .filter(developer => developer.active)
  .map(developer => developer.name);

console.log(activeNames);
```

### Result

```text
["Osama Abu Motlaq", "Ali"]
```

Chaining can make data transformation very expressive.

However, excessively long chains can become difficult to understand.

---

# 18. Custom Higher-Order Functions

You are not limited to built-in JavaScript methods.

You can create your own higher-order functions.

```js
function processValue(value, callback) {
  return callback(value);
}

const result = processValue(
  10,
  number => number * 3
);

console.log(result);
```

### Output

```text
30
```

The function does not know what operation will be performed.

The callback supplies the behavior.

---

## Another Example

```js
function transformName(name, formatter) {
  return formatter(name);
}

const result = transformName(
  "Osama Abu Motlaq",
  name => name.toUpperCase()
);

console.log(result);
```

### Output

```text
OSAMA ABU MOTLAQ
```

The higher-order function handles the process while the callback controls the transformation.

---

# 19. Function Factories

A function factory is a function that creates and returns another function.

```js
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10));
console.log(triple(10));
```

### Output

```text
20
30
```

The same factory creates functions with different behavior.

This is a powerful use of higher-order functions.

---

## Arrow Function Version

```js
const createMultiplier = multiplier => {
  return number => number * multiplier;
};
```

Now:

```js
const double = createMultiplier(2);

console.log(double(10));
```

Output:

```text
20
```

The returned function remembers the `multiplier` value.

This leads directly to the concept of **closures**.

---

# 20. Closures and Higher-Order Functions

A closure occurs when a function retains access to variables from its surrounding lexical scope even after the outer function has finished executing.

Example:

```js
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);

console.log(double(10));
```

When:

```js
createMultiplier(2)
```

runs, the returned function retains access to:

```js
multiplier
```

which is `2`.

Later:

```js
double(10)
```

can still access that value.

Conceptually:

```text
createMultiplier(2)
       ↓
creates function
       ↓
function remembers multiplier = 2
       ↓
double(10)
       ↓
10 × 2
       ↓
20
```

Closures are explored in detail in:

```text
scope-closures.md
```

---

# 21. Higher-Order Functions in Asynchronous JavaScript

Higher-order functions are heavily used in asynchronous JavaScript.

For example:

```js
setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq.");
}, 1000);
```

`setTimeout()` receives a function as an argument.

The arrow function is the callback.

Another example:

```js
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Osama Abu Motlaq clicked the button.");
});
```

`addEventListener()` receives a callback that should execute when the event occurs.

This pattern is fundamental to browser development.

---

# 22. Higher-Order Functions in React

Higher-order functions are extremely important in React development.

One of the most common examples is rendering arrays:

```jsx
const skills = ["HTML", "CSS", "JavaScript", "React"];

const skillElements = skills.map(skill => (
  <li key={skill}>{skill}</li>
));
```

Here:

```js
skills.map(...)
```

uses a higher-order function.

The callback:

```js
skill => <li key={skill}>{skill}</li>
```

defines how each item should be transformed into UI.

---

## Event Handlers

React event handlers also commonly use functions passed as values:

```jsx
function Profile() {
  const handleClick = () => {
    console.log("Osama Abu Motlaq clicked the button.");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

Notice:

```jsx
onClick={handleClick}
```

not:

```jsx
onClick={handleClick()}
```

The first passes the function.

The second calls the function immediately during rendering.

Understanding this distinction is essential when learning React.

---

# 23. Common Mistakes

## 1. Calling the Callback Instead of Passing It

Incorrect:

```js
execute(greet());
```

Correct:

```js
execute(greet);
```

The first version executes `greet` immediately.

The second passes the function reference.

---

## 2. Forgetting to Return From a Callback

Consider:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(number => {
  number * 2;
});

console.log(doubled);
```

Result:

```text
[undefined, undefined, undefined]
```

The callback has a block body but no `return`.

Correct:

```js
const doubled = numbers.map(number => {
  return number * 2;
});
```

Or use implicit return:

```js
const doubled = numbers.map(number => number * 2);
```

---

## 3. Confusing `map()` and `forEach()`

`map()` creates a new array:

```js
const doubled = numbers.map(number => number * 2);
```

`forEach()` does not produce a transformed array:

```js
numbers.forEach(number => {
  console.log(number * 2);
});
```

Choose based on your intention.

---

## 4. Mutating Data Inside Callbacks

Avoid unnecessary mutation:

```js
const numbers = [1, 2, 3];

numbers.forEach((number, index) => {
  numbers[index] = number * 2;
});
```

Often, `map()` expresses the intention more clearly:

```js
const doubled = numbers.map(number => number * 2);
```

The original array remains unchanged.

---

## 5. Overusing `reduce()`

`reduce()` can solve many problems, but that does not mean it is always the best choice.

If you want to transform an array:

```js
map()
```

is usually clearer.

If you want to select elements:

```js
filter()
```

is usually clearer.

If you want to find one element:

```js
find()
```

is usually clearer.

Use `reduce()` when the problem naturally involves accumulating values into one result.

---

## 6. Making Callbacks Too Complex

Avoid large callbacks:

```js
const result = users.map(user => {
  // dozens of lines
  // validation
  // calculations
  // formatting
  // unrelated logic
});
```

If the callback becomes complex, extract the logic into a named function:

```js
function formatUser(user) {
  // focused logic
}

const result = users.map(formatUser);
```

This can improve readability and testability.

---

# 24. Best Practices

## Use Higher-Order Functions to Express Intent

Compare:

```js
const activeUsers = users.filter(user => user.active);
```

with manually controlling the iteration:

```js
const activeUsers = [];

for (const user of users) {
  if (user.active) {
    activeUsers.push(user);
  }
}
```

Both are valid.

The first directly communicates:

> Give me the users that are active.

The second exposes the iteration mechanics.

Choose the approach that makes the intent clearest.

---

## Use the Appropriate Array Method

| Goal                             | Recommended Method |
| -------------------------------- | ------------------ |
| Perform an action for every item | `forEach()`        |
| Transform every item             | `map()`            |
| Keep matching items              | `filter()`         |
| Find the first matching item     | `find()`           |
| Find the first matching index    | `findIndex()`      |
| Check if at least one matches    | `some()`           |
| Check if all match               | `every()`          |
| Accumulate into one result       | `reduce()`         |

---

## Prefer Named Functions for Reusable Logic

Instead of repeating:

```js
users.map(user => {
  // complex transformation
});
```

you can define:

```js
function formatUser(user) {
  // transformation
}

users.map(formatUser);
```

This makes the logic reusable and easier to test.

---

## Keep Callbacks Focused

A callback should generally have a clear purpose.

Good:

```js
const names = users.map(user => user.name);
```

Less clear:

```js
const result = users.map(user => {
  // many unrelated operations
});
```

---

# 25. Quick Reference

| Concept               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| First-class function  | Function treated as a normal JavaScript value                    |
| Higher-order function | Function that accepts or returns another function                |
| Callback              | Function passed to another function                              |
| `forEach()`           | Executes a callback for each element                             |
| `map()`               | Transforms elements into a new array                             |
| `filter()`            | Creates an array containing matching elements                    |
| `find()`              | Returns the first matching element                               |
| `findIndex()`         | Returns the index of the first matching element                  |
| `some()`              | Checks whether at least one element matches                      |
| `every()`             | Checks whether all elements match                                |
| `reduce()`            | Accumulates an array into a single result                        |
| Function factory      | Function that creates and returns another function               |
| Closure               | Function retaining access to its surrounding lexical environment |

---

## Array Method Mental Model

```text
forEach()
Array → Action

map()
Array → Transformed Array

filter()
Array → Smaller Array

find()
Array → One Element / undefined

findIndex()
Array → Index / -1

some()
Array → Boolean

every()
Array → Boolean

reduce()
Array → One Accumulated Value
```

---

# 26. Key Takeaways

1. JavaScript treats functions as first-class values.
2. Functions can be stored, passed, and returned like other values.
3. A higher-order function accepts a function, returns a function, or both.
4. A callback is a function passed to another function.
5. Higher-order functions and callbacks are related but are not the same concept.
6. Always distinguish between passing a function and calling a function:

   ```js
   execute(greet);
   ```

   versus:

   ```js
   execute(greet());
   ```
7. `map()` transforms an array and returns a new array.
8. `filter()` keeps elements that satisfy a condition.
9. `find()` returns the first matching element.
10. `findIndex()` returns the first matching index.
11. `some()` checks whether at least one element passes a test.
12. `every()` checks whether all elements pass a test.
13. `forEach()` performs an action for each element but does not create a transformed array.
14. `reduce()` combines array values into a single accumulated result.
15. Higher-order functions can be created manually, not just used through built-in methods.
16. Function factories are a practical application of higher-order functions.
17. Function factories often rely on closures.
18. Higher-order functions are heavily used in asynchronous JavaScript.
19. Higher-order functions are fundamental to modern React patterns such as `map()`-based list rendering.
20. The key idea is to separate **what should happen** from **how the iteration or execution is controlled**.
