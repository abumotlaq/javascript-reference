# Rest Parameters (`...`)

The **rest parameter** syntax (`...`) allows a function to accept an indefinite number of arguments and collect them into a single array.

The syntax uses three dots:

```js
...parameter
```

The key idea is:

> **Rest collects multiple values into one array.**

This is the opposite of the spread operator:

> **Spread expands values.**
> **Rest collects values.**

---

# 1. Why Do We Need Rest Parameters?

Normally, a function can define a fixed number of parameters:

```js
function add(first, second) {
  return first + second;
}

console.log(add(10, 20));
```

Output:

```text
30
```

But what if we want the function to accept any number of numbers?

For example:

```js
add(10, 20, 30, 40, 50);
```

We do not know in advance how many arguments the function will receive.

Rest parameters solve this problem:

```js
function add(...numbers) {
  console.log(numbers);
}
```

Now:

```js
add(10, 20, 30, 40, 50);
```

produces:

```text
[10, 20, 30, 40, 50]
```

The arguments have been collected into the `numbers` array.

---

# 2. Basic Syntax

The syntax is:

```js
function functionName(...parameter) {
  // code
}
```

Example:

```js
function collectSkills(...skills) {
  console.log(skills);
}

collectSkills("HTML", "CSS", "JavaScript");
```

Output:

```text
["HTML", "CSS", "JavaScript"]
```

The parameter:

```js
...skills
```

collects all remaining arguments into an array.

---

# 3. Rest Parameters Are Arrays

This is one of the most important things to understand.

When JavaScript collects the arguments:

```js
function showValues(...values) {
  console.log(values);
}
```

the variable `values` is an actual array.

You can use normal array methods:

```js
function showValues(...values) {
  console.log(values.length);
}

showValues(10, 20, 30);
```

Output:

```text
3
```

You can also use:

```js
values.map(...)
values.filter(...)
values.reduce(...)
values.forEach(...)
```

because `values` is an array.

---

# 4. Rest With No Arguments

A rest parameter always produces an array.

If no arguments are provided:

```js
function collect(...values) {
  console.log(values);
}

collect();
```

Output:

```text
[]
```

It does not produce `undefined`.

The result is an empty array.

---

# 5. Rest With a Fixed Parameter

Rest parameters can appear after normal parameters.

```js
function introduce(name, ...skills) {
  console.log(name);
  console.log(skills);
}
```

Calling:

```js
introduce(
  "Osama Abu Motlaq",
  "HTML",
  "CSS",
  "React",
  "Next.js"
);
```

produces:

```text
Osama Abu Motlaq
["HTML", "CSS", "React", "Next.js"]
```

Here:

```js
name
```

receives the first argument.

Everything after it is collected by:

```js
...skills
```

---

# 6. Rest Collects the Remaining Arguments

Consider:

```js
function example(first, second, ...rest) {
  console.log(first);
  console.log(second);
  console.log(rest);
}

example(10, 20, 30, 40, 50);
```

Output:

```text
10
20
[30, 40, 50]
```

The arguments are divided like this:

```text
10       → first
20       → second
30       → rest
40       → rest
50       → rest
```

The rest parameter collects everything that remains after the normal parameters.

---

# 7. Rest Must Be the Last Parameter

This is invalid:

```js
function example(...numbers, last) {
  // invalid
}
```

A rest parameter must be the final parameter.

Correct:

```js
function example(first, second, ...numbers) {
  // valid
}
```

Why?

Because JavaScript needs to know exactly where the fixed parameters end and where the "collect everything else" operation begins.

The syntax:

```js
...numbers
```

means:

> Collect all remaining arguments.

There cannot be another parameter after it.

---

# 8. Rest Parameters vs `arguments`

Before rest parameters, JavaScript functions commonly used the special `arguments` object.

Example:

```js
function showArguments() {
  console.log(arguments);
}

showArguments(10, 20, 30);
```

The function receives an `arguments` object containing the passed arguments.

Rest parameters provide a cleaner approach:

```js
function showArguments(...values) {
  console.log(values);
}
```

Now `values` is a real array.

---

# 9. `arguments` Is Not a Real Array

This distinction is important.

The `arguments` object is **array-like**, but it is not an actual Array.

For example:

```js
function example() {
  console.log(Array.isArray(arguments));
}

example(10, 20, 30);
```

Output:

```text
false
```

With rest:

```js
function example(...values) {
  console.log(Array.isArray(values));
}

example(10, 20, 30);
```

Output:

```text
true
```

This is one of the major advantages of rest parameters.

---

# 10. Rest Parameters and Array Methods

Because rest parameters produce real arrays, you can directly use array methods.

```js
function calculateTotal(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}

console.log(calculateTotal(10, 20, 30));
```

Output:

```text
60
```

The rest parameter creates:

```js
[10, 20, 30]
```

Then `reduce()` processes that array.

---

# 11. A Practical Sum Function

Rest parameters are perfect for functions that accept a variable number of values.

```js
function sum(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sum(10, 20));
console.log(sum(10, 20, 30));
console.log(sum(10, 20, 30, 40, 50));
```

Output:

```text
30
60
150
```

The function does not need to know how many numbers it will receive.

---

# 12. Rest With Different Numbers of Arguments

The same function can accept different argument counts.

```js
function sum(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}
```

You can call:

```js
sum();
```

Result:

```text
0
```

Or:

```js
sum(10);
```

Result:

```text
10
```

Or:

```js
sum(10, 20, 30);
```

Result:

```text
60
```

Or:

```js
sum(10, 20, 30, 40, 50);
```

Result:

```text
150
```

The function's API is flexible.

---

# 13. Rest With the First Argument

A common pattern is:

```js
function process(first, ...others) {
  console.log(first);
  console.log(others);
}
```

Calling:

```js
process("A", "B", "C", "D");
```

produces:

```text
A
["B", "C", "D"]
```

The first argument is handled separately.

The remaining arguments are collected.

This pattern is useful when one argument has a special meaning and the rest represent a collection.

---

# 14. Rest and Default Parameters

Rest parameters can be combined with default parameters.

```js
function createProfile(
  name = "Osama Abu Motlaq",
  ...skills
) {
  return {
    name,
    skills
  };
}
```

Calling:

```js
createProfile();
```

produces:

```js
{
  name: "Osama Abu Motlaq",
  skills: []
}
```

Calling:

```js
createProfile(
  "Osama Abu Motlaq",
  "JavaScript",
  "React",
  "Next.js"
);
```

produces:

```js
{
  name: "Osama Abu Motlaq",
  skills: [
    "JavaScript",
    "React",
    "Next.js"
  ]
}
```

---

# 15. Rest and Destructuring

Rest syntax also appears in destructuring.

For arrays:

```js
const numbers = [10, 20, 30, 40];

const [first, ...remaining] = numbers;

console.log(first);
console.log(remaining);
```

Output:

```text
10
[20, 30, 40]
```

Here `...remaining` collects the remaining array elements.

This is called a **rest element**.

---

# 16. Rest in Object Destructuring

Rest also works with object destructuring.

```js
const profile = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza"
};

const { name, ...details } = profile;

console.log(name);
console.log(details);
```

Output:

```text
Osama Abu Motlaq

{
  role: "Frontend Developer",
  location: "Gaza"
}
```

Here:

```js
name
```

is extracted normally.

And:

```js
...details
```

collects the remaining properties into a new object.

---

# 17. Rest Parameter vs Rest Element

The same `...` syntax is used in several contexts.

### Function parameter

```js
function sum(...numbers) {}
```

This is a **rest parameter**.

### Array destructuring

```js
const [first, ...remaining] = numbers;
```

This is a **rest element**.

### Object destructuring

```js
const { name, ...details } = profile;
```

This is also a **rest element**.

The common idea is:

> Collect what remains.

---

# 18. Rest vs Spread

This is the most important comparison.

### Rest

```js
function sum(...numbers) {
  console.log(numbers);
}

sum(10, 20, 30);
```

Result:

```text
[10, 20, 30]
```

Rest **collects** arguments.

---

### Spread

```js
const numbers = [10, 20, 30];

Math.max(...numbers);
```

Conceptually:

```js
Math.max(10, 20, 30);
```

Spread **expands** an array into individual arguments.

---

## Mental Model

```text
REST
arguments → [10, 20, 30]


SPREAD
[10, 20, 30] → arguments
```

Or simply:

```text
Rest   = Collect
Spread = Expand
```

---

# 19. A Complete Rest + Spread Example

Consider:

```js
function calculateTotal(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}

const values = [10, 20, 30];

console.log(calculateTotal(...values));
```

There are two different operations here.

First:

```js
...values
```

uses **spread**.

It expands:

```js
[10, 20, 30]
```

into:

```js
10, 20, 30
```

Then:

```js
...numbers
```

inside the function uses **rest**.

It collects:

```text
10, 20, 30
```

back into:

```js
[10, 20, 30]
```

The flow is:

```text
Array
  ↓
Spread
  ↓
Function arguments
  ↓
Rest
  ↓
Array
```

This is one of the best ways to understand the difference.

---

# 20. Rest Parameters and `this`

Rest parameters work normally with regular functions:

```js
function showValues(...values) {
  console.log(values);
}
```

They do not change how `this` works.

For example:

```js
const profile = {
  name: "Osama Abu Motlaq",

  show(...values) {
    console.log(this.name);
    console.log(values);
  }
};

profile.show("React", "Next.js");
```

Output:

```text
Osama Abu Motlaq
["React", "Next.js"]
```

The rest parameter handles the arguments.

`this` still depends on how the method is called.

---

# 21. Rest Parameters in Arrow Functions

Arrow functions can use rest parameters.

```js
const sum = (...numbers) => {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
};

console.log(sum(10, 20, 30));
```

Output:

```text
60
```

This is particularly useful because arrow functions do not have their own `arguments` object.

Rest parameters provide a clean way for an arrow function to receive a variable number of arguments.

---

# 22. Arrow Functions and `arguments`

This does not work as many beginners expect:

```js
const sum = () => {
  console.log(arguments);
};
```

Arrow functions do not have their own `arguments`.

Instead, use rest:

```js
const sum = (...numbers) => {
  console.log(numbers);
};

sum(10, 20, 30);
```

Output:

```text
[10, 20, 30]
```

For modern JavaScript, rest parameters are generally the better choice when you intentionally need all arguments.

---

# 23. Rest and Higher-Order Functions

Rest parameters are useful when creating functions that accept flexible inputs.

For example:

```js
function execute(operation, ...values) {
  return operation(...values);
}
```

You can call:

```js
const sum = (a, b, c) => a + b + c;

console.log(
  execute(sum, 10, 20, 30)
);
```

Output:

```text
60
```

Notice that both rest and spread are used.

The function:

```js
function execute(operation, ...values)
```

uses **rest** to collect the arguments.

Then:

```js
operation(...values)
```

uses **spread** to pass them to another function.

---

# 24. Rest and Function Wrappers

Rest parameters are useful when building wrapper functions.

```js
function logOperation(operation, ...args) {
  console.log("Arguments:", args);

  return operation(...args);
}
```

Example:

```js
function multiply(a, b) {
  return a * b;
}

const result = logOperation(
  multiply,
  10,
  20
);

console.log(result);
```

Output:

```text
Arguments: [10, 20]
200
```

This pattern appears in more advanced JavaScript concepts such as:

* Higher-order functions
* Middleware
* Logging
* Function decorators
* Utility functions
* API wrappers

---

# 25. Rest and Function Arguments

Remember that JavaScript functions can receive more arguments than they explicitly declare.

For example:

```js
function example(first) {
  console.log(first);
}

example(10, 20, 30);
```

The function still executes.

The extra arguments are not assigned to named parameters.

Rest provides a way to intentionally capture them:

```js
function example(first, ...others) {
  console.log(first);
  console.log(others);
}

example(10, 20, 30);
```

Output:

```text
10
[20, 30]
```

---

# 26. Rest Parameters and Type Expectations

Rest does not validate the types of collected values.

For example:

```js
function sum(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}

console.log(sum(10, 20, "30"));
```

The result may not be what you expect because JavaScript is dynamically typed.

Rest only performs collection.

It does not mean:

> "Collect only numbers."

If your function expects numbers, validate or normalize the values when appropriate.

---

# 27. Validating Rest Parameters

For example:

```js
function sum(...numbers) {
  if (!numbers.every(number => typeof number === "number")) {
    throw new TypeError(
      "All arguments must be numbers."
    );
  }

  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}
```

Now:

```js
sum(10, 20, 30);
```

works.

But:

```js
sum(10, "20", 30);
```

throws a `TypeError`.

This is a good example of separating:

```text
Collection
   ↓
Validation
   ↓
Processing
```

Rest handles the first step.

---

# 28. Rest Parameters and Function API Design

Rest parameters can make a function flexible:

```js
function notify(...messages) {
  // process messages
}
```

But flexibility is not always better.

For example, this:

```js
function createUser(...values) {}
```

does not communicate what each argument means.

A clearer API might be:

```js
function createUser(name, email, ...roles) {}
```

The fixed parameters communicate important information.

Use rest when the variable number of values is meaningful.

---

# 29. Common Mistake: Putting Rest Before Another Parameter

Invalid:

```js
function example(...values, last) {}
```

Correct:

```js
function example(last, ...values) {}
```

Rest must be last.

---

# 30. Common Mistake: Thinking Rest Is an Object

In a function:

```js
function example(...values) {
  console.log(values);
}
```

`values` is an array.

Not an object.

You can verify:

```js
console.log(Array.isArray(values));
```

Output:

```text
true
```

---

# 31. Common Mistake: Confusing Rest With `arguments`

Rest:

```js
function example(...values) {
  console.log(values);
}
```

produces a real array.

`arguments`:

```js
function example() {
  console.log(arguments);
}
```

produces an array-like `arguments` object.

Prefer rest when designing modern functions that need variable arguments.

---

# 32. Common Mistake: Expecting Rest to Validate Types

This:

```js
function add(...numbers) {}
```

does not mean:

> "Only numbers can be passed."

This is still valid JavaScript:

```js
add("10", "20");
```

Rest simply collects the arguments.

Validation is a separate responsibility.

---

# 33. Common Mistake: Using Rest When a Normal Parameter Is Clearer

This:

```js
function createUser(...values) {}
```

is usually less clear than:

```js
function createUser(name, email) {}
```

If the function requires exactly two values, use two explicit parameters.

Use rest when you genuinely need a variable number of arguments.

---

# 34. Rest and React

Rest parameters are useful in React because React code frequently works with:

* Props
* Component APIs
* Utility functions
* Event-related helpers
* Higher-order functions
* Custom hooks
* Configuration objects

For example, object rest can remove one property while keeping the others.

```jsx
function Button({ children, ...buttonProps }) {
  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}
```

Here:

```js
{ children, ...buttonProps }
```

uses **object rest**.

It extracts `children` and collects the remaining properties into `buttonProps`.

Then:

```jsx
<button {...buttonProps}>
```

uses **object spread**.

So the same component demonstrates both concepts:

```text
Props object
    ↓
Rest
    ↓
buttonProps
    ↓
Spread
    ↓
<button>
```

This pattern is very common in React component design.

---

# 35. Rest in React Component Props

Consider:

```jsx
function Input({
  label,
  ...inputProps
}) {
  return (
    <label>
      {label}
      <input {...inputProps} />
    </label>
  );
}
```

You could use:

```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>
```

The component separates:

```js
label
```

from the remaining properties:

```js
inputProps
```

The remaining properties are then spread onto the `<input>`.

This is a powerful pattern, but it should be used intentionally so component APIs remain understandable.

---

# 36. Rest in Next.js and JavaScript

The same JavaScript rules apply in Next.js.

For example, when handling configuration or function arguments:

```js
function createRequest(url, ...options) {
  // ...
}
```

Rest is a JavaScript language feature.

Next.js does not change how rest parameters work.

The same applies to:

* React
* Node.js
* Browser JavaScript
* Server-side JavaScript
* Client-side JavaScript

Understanding rest is therefore a JavaScript foundation, not a framework-specific trick.

---

# 37. Rest and Destructuring: Object Example

Consider:

```js
const profile = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  skills: ["React", "Next.js"],
  location: "Gaza"
};
```

Suppose you need the name separately and everything else together.

```js
const {
  name,
  ...details
} = profile;
```

Now:

```js
name
```

contains:

```text
Osama Abu Motlaq
```

And:

```js
details
```

contains:

```js
{
  role: "Frontend Developer",
  skills: ["React", "Next.js"],
  location: "Gaza"
}
```

This is especially useful when passing most properties somewhere else.

---

# 38. Rest Does Not Mutate the Original Object

Consider:

```js
const profile = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza"
};

const {
  name,
  ...details
} = profile;
```

The original object remains:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza"
}
```

Rest creates a new object containing the remaining properties.

This is useful for immutable data transformations.

---

# 39. Rest and Shallow Copying

Object rest creates a new object containing the collected properties.

However, like object spread, this is shallow.

Consider:

```js
const profile = {
  name: "Osama Abu Motlaq",
  contact: {
    email: "example@email.com"
  }
};

const {
  name,
  ...details
} = profile;
```

The `details` object is new.

But:

```js
details.contact === profile.contact
```

is:

```text
true
```

because the nested `contact` object is still the same reference.

Rest does not perform a deep clone.

---

# 40. Rest and Parameter Destructuring

Rest can be combined with destructuring directly in function parameters.

```js
function showProfile({
  name,
  ...details
}) {
  console.log(name);
  console.log(details);
}
```

Calling:

```js
showProfile({
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza"
});
```

produces:

```text
Osama Abu Motlaq

{
  role: "Frontend Developer",
  location: "Gaza"
}
```

This combines:

* Parameter destructuring
* Object rest
* Function parameters

---

# 41. Rest and Closures

Rest parameters can be captured by closures just like normal variables.

```js
function createLogger(...values) {
  return function log() {
    console.log(values);
  };
}

const log = createLogger(
  "React",
  "Next.js"
);

log();
```

Output:

```text
["React", "Next.js"]
```

The inner function closes over the `values` array.

This connects rest parameters with the previously studied concept of **closures**.

---

# 42. Rest and Higher-Order Functions

A higher-order function may accept a function plus a flexible number of arguments.

```js
function execute(operation, ...values) {
  return operation(...values);
}
```

Example:

```js
function multiply(a, b) {
  return a * b;
}

console.log(
  execute(multiply, 10, 20)
);
```

Output:

```text
200
```

The pattern is:

```text
execute
  ↓
rest collects arguments
  ↓
values = [10, 20]
  ↓
spread expands values
  ↓
multiply(10, 20)
```

This pattern becomes increasingly useful as you learn functional JavaScript.

---

# 43. Rest and Function Composition

Rest can help build reusable utility functions.

```js
function pipe(...functions) {
  return function (value) {
    return functions.reduce(
      (result, fn) => fn(result),
      value
    );
  };
}
```

Example:

```js
const double = value => value * 2;

const addTen = value => value + 10;

const process = pipe(double, addTen);

console.log(process(5));
```

Output:

```text
20
```

Here:

```js
...functions
```

collects any number of functions into an array.

Then:

```js
functions.reduce(...)
```

processes them.

This is a more advanced use of rest parameters.

---

# 44. Rest Parameters and `length`

A function's `length` property counts parameters before the first rest parameter.

For example:

```js
function example(first, second, ...rest) {}
```

Then:

```js
console.log(example.length);
```

Output:

```text
2
```

The rest parameter itself is not counted.

This is rarely needed in everyday React development, but it is useful to understand the language behavior.

---

# 45. Rest Parameters and `new`

Rest parameters can also be used in constructors and functions that are called with `new`.

For example:

```js
class Profile {
  constructor(name, ...skills) {
    this.name = name;
    this.skills = skills;
  }
}

const profile = new Profile(
  "Osama Abu Motlaq",
  "React",
  "Next.js"
);
```

The constructor receives:

```text
name   → "Osama Abu Motlaq"
skills → ["React", "Next.js"]
```

This combines rest parameters with classes and constructors.

---

# 46. Rest Parameters and Async Functions

Rest works with async functions as well:

```js
async function processRequests(...requests) {
  console.log(requests);
}
```

The fact that a function is `async` does not change the behavior of rest parameters.

Rest is a JavaScript parameter feature independent of whether the function is:

* Regular
* Arrow
* Async
* A class constructor
* A method

---

# 47. Performance Considerations

Rest parameters create an array containing the collected arguments.

For normal application code, this is exactly what you want.

However, avoid designing APIs with huge numbers of arguments when a structured object would be clearer.

Instead of:

```js
createUser(
  "Osama Abu Motlaq",
  "email@example.com",
  "Frontend Developer",
  "Gaza",
  "React",
  "Next.js",
  "..."
);
```

a structured object can be more maintainable:

```js
createUser({
  name: "Osama Abu Motlaq",
  email: "email@example.com",
  role: "Frontend Developer",
  location: "Gaza",
  skills: ["React", "Next.js"]
});
```

Rest provides flexibility, but good API design still matters.

---

# 48. Best Practices

### 1. Use meaningful names

Prefer:

```js
function sum(...numbers) {}
```

over:

```js
function sum(...x) {}
```

The name should describe what is being collected.

---

### 2. Keep fixed parameters explicit

Prefer:

```js
function createMessage(type, ...messages) {}
```

when `type` has a distinct role.

---

### 3. Use rest instead of manually handling `arguments`

Prefer:

```js
function sum(...numbers) {}
```

over:

```js
function sum() {
  const numbers = Array.from(arguments);
}
```

when you control the function design.

---

### 4. Validate values when necessary

Rest does not validate types.

If the function expects numbers, check them.

---

### 5. Do not confuse rest with spread

Remember:

```text
Rest   → collect
Spread → expand
```

---

### 6. Prefer structured objects for complex APIs

If a function requires many unrelated values, an options object may be clearer than many positional arguments.

---

# 49. Quick Reference

## Function Rest

```js
function sum(...numbers) {
  return numbers;
}
```

Calling:

```js
sum(10, 20, 30);
```

produces:

```js
[10, 20, 30]
```

---

## Fixed + Rest

```js
function example(first, ...remaining) {
  console.log(first);
  console.log(remaining);
}
```

---

## Array Rest

```js
const [first, ...remaining] = [10, 20, 30];
```

Result:

```js
first      // 10
remaining  // [20, 30]
```

---

## Object Rest

```js
const {
  name,
  ...details
} = profile;
```

---

## Arrow Function Rest

```js
const sum = (...numbers) => {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
};
```

---

## Rest + Spread

```js
function execute(operation, ...values) {
  return operation(...values);
}
```

Rest collects:

```text
arguments → values
```

Spread expands:

```text
values → arguments
```

---

# 50. Rest vs Spread

| Feature                       | Rest                          | Spread             |
| ----------------------------- | ----------------------------- | ------------------ |
| Syntax                        | `...`                         | `...`              |
| Main purpose                  | Collect                       | Expand             |
| Function parameters           | Collects arguments            | —                  |
| Function calls                | —                             | Expands arguments  |
| Array destructuring           | Collects remaining elements   | —                  |
| Object destructuring          | Collects remaining properties | —                  |
| Array creation                | —                             | Expands elements   |
| Object creation               | —                             | Expands properties |
| Result in function parameters | Array                         | —                  |
| Mental model                  | Collect                       | Expand             |

---

# 51. Rest vs `arguments`

| Feature           | Rest Parameters    | `arguments`                |
| ----------------- | ------------------ | -------------------------- |
| Syntax            | `...values`        | `arguments`                |
| Type              | Real Array         | Array-like object          |
| Array methods     | Directly available | Not all directly available |
| Arrow functions   | Supported          | No own `arguments`         |
| Modern API design | Preferred          | Legacy/common older code   |
| Naming            | Explicit           | Generic                    |

---

# 52. Key Takeaways

1. Rest parameters use the `...` syntax.
2. Rest parameters collect remaining function arguments into an array.
3. Rest parameters can appear only at the end of a parameter list.
4. The collected value is a real Array.
5. Rest works with regular functions and arrow functions.
6. Rest can be combined with normal parameters.
7. Rest can be combined with default parameters.
8. Rest is different from the `arguments` object.
9. Rest also appears in array and object destructuring.
10. Object rest collects remaining properties.
11. Array rest collects remaining elements.
12. Rest does not validate the types of collected values.
13. Rest creates shallow structures when used in destructuring.
14. Rest and spread use the same syntax but perform opposite operations.
15. Rest **collects**.
16. Spread **expands**.

---

# 53. Mental Model

When you see:

```js
function example(...values) {}
```

think:

```text
Many arguments
      ↓
    REST
      ↓
One Array
```

For example:

```js
example(10, 20, 30);
```

becomes conceptually:

```js
values = [10, 20, 30];
```

When you see:

```js
function example(first, ...others) {}
```

think:

```text
First argument → first
Remaining      → others[]
```

When you see:

```js
const [first, ...remaining] = values;
```

think:

```text
First element → first
Remaining     → remaining[]
```

When you see:

```js
const { name, ...details } = profile;
```

think:

```text
name property → name
Remaining properties → details{}
```

And the final rule to remember is:

```text
REST
...values
↓
COLLECT


SPREAD
...values
↓
EXPAND
```

This distinction is essential for understanding modern JavaScript, React props, state updates, higher-order functions, and many APIs used throughout the JavaScript ecosystem.
