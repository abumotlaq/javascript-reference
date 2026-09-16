# JavaScript Scope & Closures

Scope and closures are fundamental JavaScript concepts. They explain:

* Where variables can be accessed.
* How JavaScript resolves variable names.
* Why variables inside functions are normally private.
* How nested functions can access variables from outer functions.
* How a function can remember variables even after the outer function has finished.
* Why patterns such as function factories, private state, callbacks, and many React patterns work.

Understanding scope and closures is essential for writing predictable JavaScript.

---

## 1. What Is Scope?

**Scope** determines where a variable or function can be accessed in your code.

In simple terms:

> Scope answers the question: "Where is this variable available?"

Example:

```js
const name = "Osama Abu Motlaq";

console.log(name);
```

`name` is accessible because it was declared in the current scope.

Now consider:

```js
function greet() {
  const message = "Hello";

  console.log(message);
}

greet();
```

`message` exists inside the function's scope.

This works:

```js
function greet() {
  const message = "Hello";

  console.log(message);
}
```

But this does not:

```js
function greet() {
  const message = "Hello";
}

console.log(message);
```

The variable is not accessible outside the function.

---

# 2. Why Scope Exists

Scope provides:

* Organization.
* Encapsulation.
* Protection from accidental variable conflicts.
* Controlled access to data.
* Predictable variable resolution.
* Private state inside functions.

Without scope, every variable would exist in one shared namespace, making large applications difficult to maintain.

For example:

```js
const name = "Osama Abu Motlaq";

function createProfile() {
  const name = "Osama Abu Motlaq";

  console.log(name);
}

createProfile();

console.log(name);
```

Both variables are called `name`, but they belong to different scopes.

---

# 3. Global Scope

A variable declared outside functions and blocks can belong to the global scope.

```js
const name = "Osama Abu Motlaq";

function greet() {
  console.log(name);
}

greet();
```

The function can access `name` because the variable exists in an outer scope.

Global variables can be accessed from many places.

This can be convenient, but excessive global state can create problems.

### Example

```js
const appName = "JavaScript Reference";

function showAppName() {
  console.log(appName);
}

showAppName();
```

Output:

```text
JavaScript Reference
```

---

# 4. Global Scope and Global Variables

Global variables are available throughout the relevant global environment.

However, you should avoid creating unnecessary global variables.

### Avoid

```js
let userName = "Osama Abu Motlaq";
let userAge = 22;
let userRole = "Developer";
let userCountry = "Palestine";
```

Large applications can become difficult to reason about when many unrelated values are globally accessible and mutable.

Prefer keeping variables close to where they are actually needed.

---

# 5. Function Scope

A function creates its own scope.

Variables declared with `let` and `const` inside a function cannot normally be accessed outside it.

```js
function createProfile() {
  const name = "Osama Abu Motlaq";
  const role = "Frontend Developer";

  console.log(name);
  console.log(role);
}

createProfile();
```

This works.

But:

```js
function createProfile() {
  const name = "Osama Abu Motlaq";
}

console.log(name);
```

This causes a `ReferenceError` because `name` only exists inside `createProfile`.

---

# 6. Function Scope with `var`

`var` is also function-scoped.

```js
function example() {
  var message = "Hello";

  console.log(message);
}

example();
```

But:

```js
function example() {
  var message = "Hello";
}

console.log(message);
```

`message` cannot be accessed outside the function.

The important distinction is that `var` is **not block-scoped**.

---

# 7. Block Scope

A block is code surrounded by `{}`.

Examples include:

```js
if (condition) {
  // block
}
```

```js
for (let i = 0; i < 5; i++) {
  // block
}
```

```js
{
  // block
}
```

Variables declared with `let` and `const` are block-scoped.

Example:

```js
if (true) {
  const name = "Osama Abu Motlaq";

  console.log(name);
}
```

This works.

But:

```js
if (true) {
  const name = "Osama Abu Motlaq";
}

console.log(name);
```

This causes:

```text
ReferenceError
```

because `name` only exists inside the block.

---

# 8. `var` vs `let` and `const`

One of the most important scope differences:

| Declaration | Function Scoped | Block Scoped |
| ----------- | --------------: | -----------: |
| `var`       |             Yes |           No |
| `let`       |             Yes |          Yes |
| `const`     |             Yes |          Yes |

Example:

```js
if (true) {
  var name = "Osama Abu Motlaq";
}

console.log(name);
```

This can work because `var` does not respect block scope.

Compare:

```js
if (true) {
  let name = "Osama Abu Motlaq";
}

console.log(name);
```

This does not work because `let` is block-scoped.

In modern JavaScript, prefer:

```js
const
```

and:

```js
let
```

over `var`.

---

# 9. Lexical Scope

JavaScript uses **lexical scope**.

Lexical scope means that the scope of a variable is determined by **where the code is written**, not where a function is called.

Example:

```js
const name = "Osama Abu Motlaq";

function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);
  }

  inner();
}

outer();
```

`inner()` can access `message` because `inner` was written inside `outer`.

The relationship is determined by the source-code structure.

---

# 10. Lexical Scope Example

Consider:

```js
const name = "Osama Abu Motlaq";

function greet() {
  console.log(name);
}

function execute(callback) {
  const name = "Another Value";

  callback();
}

execute(greet);
```

What does `greet()` see?

It sees the `name` from the scope where `greet` was defined:

```js
const name = "Osama Abu Motlaq";
```

It does **not** use the `name` inside `execute`.

Output:

```text
Osama Abu Motlaq
```

This is a key consequence of lexical scoping.

---

# 11. Scope Chain

When JavaScript encounters a variable, it searches for that variable through a chain of scopes.

Consider:

```js
const globalValue = "Global";

function outer() {
  const outerValue = "Outer";

  function inner() {
    const innerValue = "Inner";

    console.log(innerValue);
    console.log(outerValue);
    console.log(globalValue);
  }

  inner();
}

outer();
```

The `inner` function has access to:

1. Its own scope.
2. The `outer` function's scope.
3. The global scope.

Conceptually:

```text
inner scope
    ↓
outer scope
    ↓
global scope
```

JavaScript searches from the inside outward.

---

# 12. Scope Chain Lookup

Suppose we have:

```js
const name = "Osama Abu Motlaq";

function outer() {
  const role = "Developer";

  function inner() {
    console.log(name);
    console.log(role);
  }

  inner();
}

outer();
```

When JavaScript evaluates:

```js
console.log(role);
```

it searches:

```text
inner scope
    ↓
outer scope
```

It finds `role` in `outer`.

For:

```js
console.log(name);
```

it searches:

```text
inner scope
    ↓
outer scope
    ↓
global scope
```

It eventually finds `name` globally.

---

# 13. Inner Scope Can Access Outer Scope

An inner scope can access variables from its outer scopes.

```js
const name = "Osama Abu Motlaq";

function outer() {
  const role = "Frontend Developer";

  function inner() {
    console.log(name);
    console.log(role);
  }

  inner();
}

outer();
```

The `inner` function can access both:

```text
name
role
```

because both exist in its scope chain.

---

# 14. Outer Scope Cannot Access Inner Scope

Scope access does not work in both directions.

This works:

```js
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);
  }

  inner();
}
```

But this does not:

```js
function outer() {
  function inner() {
    const message = "Hello";
  }

  console.log(message);
}
```

The outer function cannot access variables declared inside the inner function.

Think of scope as moving inward:

```text
Outer Scope
    ↓
Inner Scope
```

The inner scope can see outward.

The outer scope cannot see inward.

---

# 15. Variable Shadowing

A variable in an inner scope can have the same name as a variable in an outer scope.

This is called **shadowing**.

```js
const name = "Osama Abu Motlaq";

function greet() {
  const name = "Osama Abu Motlaq";

  console.log(name);
}

greet();
```

The inner `name` shadows the outer `name`.

JavaScript uses the closest matching variable.

---

# 16. Shadowing Example

```js
const message = "Global message";

function example() {
  const message = "Local message";

  console.log(message);
}

example();

console.log(message);
```

Output:

```text
Local message
Global message
```

Inside `example`, JavaScript finds the local `message` first.

Outside the function, JavaScript finds the global `message`.

---

# 17. Nested Scopes

Scopes can be nested.

```js
const level1 = "Level 1";

function outer() {
  const level2 = "Level 2";

  function middle() {
    const level3 = "Level 3";

    function inner() {
      const level4 = "Level 4";

      console.log(level1);
      console.log(level2);
      console.log(level3);
      console.log(level4);
    }

    inner();
  }

  middle();
}

outer();
```

The deepest function has access to all outer variables.

Conceptually:

```text
Global
  ↓
outer
  ↓
middle
  ↓
inner
```

---

# 18. What Is a Closure?

A **closure** occurs when a function retains access to variables from its surrounding lexical scope, even after the outer function has finished executing.

This is one of the most important concepts in JavaScript.

Consider:

```js
function createGreeting() {
  const name = "Osama Abu Motlaq";

  return function greet() {
    console.log(`Hello, ${name}`);
  };
}

const greeting = createGreeting();

greeting();
```

Output:

```text
Hello, Osama Abu Motlaq
```

At first glance, it may seem surprising.

`createGreeting()` has already finished.

So why can `greet()` still access `name`?

Because `greet()` forms a **closure** over the surrounding scope.

---

# 19. How a Closure Works

Consider:

```js
function createGreeting() {
  const name = "Osama Abu Motlaq";

  return function greet() {
    console.log(name);
  };
}
```

When `createGreeting()` runs:

```text
createGreeting scope
    |
    ├── name
    |
    └── greet function
```

The returned function keeps access to the lexical environment containing `name`.

Then:

```js
const greeting = createGreeting();
```

The outer function finishes.

But:

```js
greeting();
```

still has access to:

```js
name
```

because the returned function closes over it.

---

# 20. Closure Does Not Mean Copying the Value

A closure does not simply copy a variable's value.

The function retains access to the variable itself through its lexical environment.

Example:

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());
```

Output:

```text
1
2
3
```

The function can continue accessing and modifying `count`.

This demonstrates why closures are useful for maintaining state.

---

# 21. Closures and Private State

Closures can create private state.

Example:

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    getCount() {
      return count;
    }
  };
}

const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getCount());
```

Output:

```text
2
```

The `count` variable cannot be accessed directly:

```js
console.log(counter.count);
```

This produces:

```text
undefined
```

The only way to interact with it is through the functions that close over it.

---

# 22. Closure as Encapsulation

The previous example provides a form of encapsulation.

```text
createCounter()
    |
    ├── private count
    |
    ├── increment()
    |
    └── getCount()
```

External code cannot directly manipulate `count`.

Instead, it must use the exposed functions.

This pattern was especially important before modern JavaScript introduced private class fields.

Closures are still widely useful today.

---

# 23. Function Factory

A function that creates and returns another function is often called a **function factory**.

Example:

```js
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}
```

Create specialized functions:

```js
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));
```

Output:

```text
10
15
```

Why does this work?

Each returned function closes over its own `multiplier`.

---

# 24. Each Closure Has Its Own Environment

Consider:

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA());
console.log(counterA());

console.log(counterB());
console.log(counterB());
```

Output:

```text
1
2
1
2
```

`counterA` and `counterB` do not share the same `count`.

Each call to:

```js
createCounter()
```

creates a new lexical environment.

Conceptually:

```text
counterA
  └── count = 0

counterB
  └── count = 0
```

They are independent closures.

---

# 25. Closures and Callbacks

Closures are extremely common with callbacks.

Example:

```js
function createMessage() {
  const name = "Osama Abu Motlaq";

  setTimeout(() => {
    console.log(`Hello, ${name}`);
  }, 1000);
}

createMessage();
```

The callback function uses `name`.

Even though the callback runs later, it still has access to the variable because it closes over the surrounding scope.

This is a major reason closures matter in asynchronous JavaScript.

---

# 26. Closures and `setTimeout`

Consider:

```js
function delayedGreeting() {
  const name = "Osama Abu Motlaq";

  setTimeout(() => {
    console.log(`Hello, ${name}`);
  }, 1000);
}

delayedGreeting();
```

The execution sequence is conceptually:

```text
1. delayedGreeting() starts
2. name is created
3. setTimeout receives the callback
4. delayedGreeting() finishes
5. Timer completes
6. Callback executes
7. Callback accesses name through its closure
```

The callback does not lose access to `name`.

---

# 27. Closures in Loops

Closures become especially interesting inside loops.

Using `let`:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

Output:

```text
0
1
2
```

With `let`, each loop iteration gets the appropriate block-scoped binding.

This is one reason `let` is safer than `var` for loop variables.

---

# 28. The Classic `var` Loop Problem

Consider:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

The output is typically:

```text
3
3
3
```

Why?

Because `var` is function-scoped rather than block-scoped.

The callbacks close over the same `i`.

By the time the callbacks execute, the loop has finished and:

```js
i === 3
```

So all callbacks read the same value.

---

# 29. Fixing the Loop with `let`

Modern JavaScript solution:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

Output:

```text
0
1
2
```

Each iteration has its own appropriate binding.

This is an important practical interaction between:

* Scope.
* Closures.
* Loops.
* Asynchronous callbacks.

---

# 30. Closures and Asynchronous JavaScript

Closures are not limited to `setTimeout`.

They appear throughout asynchronous JavaScript.

Example:

```js
function loadUser(userId) {
  const requestId = userId;

  fetch("/api/user")
    .then(() => {
      console.log(requestId);
    });
}
```

The callback passed to `.then()` can access `requestId`.

This works because the callback closes over its surrounding lexical environment.

Closures are therefore closely connected to:

* Promises.
* `.then()`.
* `.catch()`.
* `async` workflows.
* Event listeners.
* Timers.
* Callbacks.

---

# 31. Closures and Event Listeners

Closures are also common with browser events.

```js
function setupButton() {
  const message = "Osama Abu Motlaq";

  button.addEventListener("click", () => {
    console.log(message);
  });
}
```

The event handler can access `message` later because the callback closes over it.

The function does not need `message` to be global.

This is an important pattern for keeping state local.

---

# 32. Closures and Data Privacy

Closures can prevent direct access to internal data.

```js
function createUser() {
  const username = "Osama Abu Motlaq";

  return {
    getUsername() {
      return username;
    }
  };
}

const user = createUser();

console.log(user.getUsername());
```

Output:

```text
Osama Abu Motlaq
```

But:

```js
console.log(user.username);
```

Output:

```text
undefined
```

The variable exists inside the closure but is not directly exposed as an object property.

---

# 33. Closures and State

Closures are useful whenever a function needs to remember something between calls.

Example:

```js
function createCounter() {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
}

const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());
```

Output:

```text
1
2
3
```

The state survives between function calls.

This is one of the most practical uses of closures.

---

# 34. Closures and Multiple Functions

Several functions can close over the same variables.

```js
function createAccount() {
  let balance = 0;

  return {
    deposit(amount) {
      balance += amount;
    },

    withdraw(amount) {
      balance -= amount;
    },

    getBalance() {
      return balance;
    }
  };
}

const account = createAccount();

account.deposit(100);
account.withdraw(30);

console.log(account.getBalance());
```

Output:

```text
70
```

All three methods can access the same private `balance`.

---

# 35. Closures vs Scope

Scope and closure are related, but they are not the same thing.

### Scope

Scope determines:

> Where a variable can be accessed.

### Closure

A closure describes:

> A function retaining access to variables from its surrounding lexical scope.

Example:

```js
function outer() {
  const value = 10;

  return function inner() {
    return value;
  };
}
```

Here:

* `value` exists in the `outer` scope.
* `inner` can access `value`.
* `inner` is a closure over `value`.

---

# 36. Scope vs Closure: Mental Model

Think about scope first:

```text
Where is this variable available?
```

Then think about closure:

```text
Does this function retain access to that surrounding variable?
```

Example:

```js
function createGreeting() {
  const name = "Osama Abu Motlaq";

  return () => {
    return `Hello, ${name}`;
  };
}
```

Scope explains **where `name` belongs**.

Closure explains **why the returned function can still use `name` later**.

---

# 37. Closure Requires an Enclosing Scope

A closure becomes especially visible when a function is returned or passed somewhere and executed later.

Example:

```js
function createFunction() {
  const value = 42;

  return function () {
    return value;
  };
}

const fn = createFunction();

console.log(fn());
```

The returned function retains access to `value`.

This is the classic closure pattern.

---

# 38. Closures Are Created Automatically

You do not explicitly write:

```js
createClosure();
```

There is no special closure keyword.

Closures are a natural result of JavaScript's lexical scoping.

Whenever a function accesses variables from an outer lexical scope and that function remains usable, the relevant environment can be retained.

Example:

```js
function outer() {
  const message = "Hello";

  return () => message;
}
```

The closure happens automatically.

---

# 39. Closures and Arrow Functions

Arrow functions can form closures just like regular functions.

```js
function createGreeting() {
  const name = "Osama Abu Motlaq";

  return () => {
    return `Hello, ${name}`;
  };
}

const greeting = createGreeting();

console.log(greeting());
```

The important concept is not the arrow function itself.

The important concept is:

```text
lexical scope + function retaining access
```

Both regular functions and arrow functions can participate in closures.

---

# 40. Closure Memory Considerations

Closures can keep referenced data alive as long as the closure itself remains reachable.

For example:

```js
function createLargeData() {
  const data = new Array(1000000).fill("data");

  return function () {
    return data.length;
  };
}

const getLength = createLargeData();

console.log(getLength());
```

The returned function still references `data`.

Therefore, the data may remain in memory while the closure is reachable.

Closures are not inherently a memory problem, but unnecessary long-lived closures can retain more data than needed.

---

# 41. Avoid Unnecessary Retained State

A good practice is to avoid capturing large objects or unnecessary values when a long-lived callback does not need them.

Instead of:

```js
function setup() {
  const hugeDataStructure = createHugeDataStructure();

  someLongLivedCallback(() => {
    console.log("Done");
  });
}
```

If the callback does not need `hugeDataStructure`, there is no reason to make the callback depend on it.

Keep closures small and intentional.

---

# 42. Scope and the Temporal Dead Zone

`let` and `const` are block-scoped and have a **Temporal Dead Zone (TDZ)**.

Example:

```js
console.log(name);

const name = "Osama Abu Motlaq";
```

This produces:

```text
ReferenceError
```

The variable exists in the block's lexical environment, but it cannot be accessed before its declaration is initialized.

The same applies to `let`.

```js
console.log(name);

let name = "Osama Abu Motlaq";
```

---

# 43. `var` and Hoisting

`var` behaves differently.

```js
console.log(name);

var name = "Osama Abu Motlaq";
```

The output is:

```text
undefined
```

Conceptually, the declaration is hoisted:

```js
var name;

console.log(name);

name = "Osama Abu Motlaq";
```

This is another reason modern JavaScript generally prefers `let` and `const`.

---

# 44. Scope and `this` Are Different Concepts

Do not confuse lexical scope with `this`.

Scope answers:

```text
Which variables can this code access?
```

`this` answers:

```text
What object/context does this function's this value refer to?
```

Example:

```js
const name = "Osama Abu Motlaq";

function greet() {
  console.log(name);
}
```

`name` is resolved through lexical scope.

But:

```js
console.log(this);
```

involves the rules of `this`.

These are separate concepts.

---

# 45. Scope and Modules

JavaScript modules provide their own module scope.

For example:

```js
const apiUrl = "https://example.com";
```

inside a module is not automatically available to unrelated modules.

You explicitly export values:

```js
export const apiUrl = "https://example.com";
```

and import them:

```js
import { apiUrl } from "./config.js";
```

Modules are therefore another important mechanism for controlling visibility.

---

# 46. Scope in Real Applications

Good scope design keeps variables close to where they are used.

Prefer:

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;

  return total;
}
```

instead of unnecessarily creating:

```js
let total;
```

in a broader scope.

Local variables are easier to understand and reduce accidental dependencies.

---

# 47. Scope in React

Scope and closures are extremely important in React.

Consider:

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log(count);
  }

  return (
    <button onClick={handleClick}>
      {count}
    </button>
  );
}
```

`handleClick` can access:

```js
count
```

because it is defined inside the component's lexical scope.

This is directly related to closures.

React developers frequently encounter closures with:

* Event handlers.
* `useEffect`.
* Timers.
* Async callbacks.
* State.
* Custom hooks.
* Functions passed as props.

Understanding JavaScript closures makes these React behaviors much easier to understand.

---

# 48. Closure and React State

Consider:

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log(count);
  }

  return (
    <button onClick={handleClick}>
      {count}
    </button>
  );
}
```

`handleClick` has access to the `count` value from the render in which it was created.

This is one reason React developers sometimes encounter concepts such as:

* Stale closures.
* Effect dependencies.
* State snapshots.
* Functional state updates.

These are advanced applications of ordinary JavaScript closure behavior.

---

# 49. Common Closure Mistake: Expecting Global State

Consider:

```js
function createCounter() {
  let count = 0;

  return () => {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA());
console.log(counterB());
```

Output:

```text
1
1
```

The two functions have separate closures.

They do not share `count`.

To share state, they must close over the same lexical environment.

---

# 50. Common Mistake: Calling Instead of Passing a Function

Closures often appear in callbacks.

Incorrect:

```js
setTimeout(console.log("Hello"), 1000);
```

The function is executed immediately.

Correct:

```js
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

The callback function is passed to `setTimeout` and executed later.

---

# 51. Common Mistake: Confusing Scope with Object Properties

This:

```js
function createUser() {
  const name = "Osama Abu Motlaq";

  return {};
}
```

does not make `name` an object property.

`name` is a lexical variable.

To expose it as a property:

```js
function createUser() {
  const name = "Osama Abu Motlaq";

  return {
    name
  };
}
```

Now:

```js
const user = createUser();

console.log(user.name);
```

works.

---

# 52. Common Mistake: Excessive Global Variables

Avoid:

```js
let currentUser;
let currentTheme;
let currentPage;
let cartItems;
let notificationCount;
```

all living globally without a clear reason.

Prefer appropriate local state, modules, objects, functions, or application-level state management when necessary.

The goal is not to eliminate global scope completely.

The goal is to avoid unnecessary global dependencies.

---

# 53. Common Mistake: Overusing Closures

Closures are powerful, but you should not create complicated nested functions simply to demonstrate them.

Bad design:

```js
function outer() {
  return function () {
    return function () {
      return function () {
        return "value";
      };
    };
  };
}
```

The code is technically valid but unnecessarily difficult to understand.

Use closures when they solve a real problem.

---

# 54. Best Practices

### 1. Prefer `const`

Use:

```js
const name = "Osama Abu Motlaq";
```

when reassignment is unnecessary.

---

### 2. Use `let` When Reassignment Is Required

```js
let count = 0;

count++;
```

---

### 3. Avoid `var` in Modern JavaScript

Prefer:

```js
const
```

and:

```js
let
```

because they provide block scope and more predictable behavior.

---

### 4. Keep Variables Close to Their Usage

Prefer narrow scopes.

```js
function calculateTotal(price, quantity) {
  const total = price * quantity;

  return total;
}
```

---

### 5. Avoid Unnecessary Global State

Global state should be deliberate.

---

### 6. Use Closures Intentionally

Good uses include:

* Private state.
* Function factories.
* Callbacks.
* Event handlers.
* Async operations.
* Encapsulation.

---

### 7. Understand Closure Lifetime

If a long-lived callback closes over a large object, that object may remain reachable for as long as the callback does.

---

### 8. Be Careful with Loops and Closures

Prefer:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

over legacy `var` patterns.

---

# 55. Quick Reference

| Concept          | Meaning                                                             |
| ---------------- | ------------------------------------------------------------------- |
| Scope            | Where a variable can be accessed                                    |
| Global Scope     | Scope available at the top level                                    |
| Function Scope   | Scope created by a function                                         |
| Block Scope      | Scope created by `{}` for `let` and `const`                         |
| Lexical Scope    | Scope determined by where code is written                           |
| Scope Chain      | Chain used to resolve variables                                     |
| Shadowing        | Inner variable hides an outer variable with the same name           |
| Closure          | Function retaining access to its surrounding lexical environment    |
| Function Factory | Function that creates and returns another function                  |
| Private State    | Data accessible only through controlled functions                   |
| TDZ              | Period where `let`/`const` cannot be accessed before initialization |

---

# 56. Scope and Declaration Comparison

| Feature                     | `var` | `let` | `const` |
| --------------------------- | ----: | ----: | ------: |
| Function scoped             |   Yes |   Yes |     Yes |
| Block scoped                |    No |   Yes |     Yes |
| Can reassign                |   Yes |   Yes |      No |
| Can redeclare in same scope |   Yes |    No |      No |
| Hoisted                     |   Yes |   Yes |     Yes |
| TDZ                         |    No |   Yes |     Yes |
| Recommended for modern code |    No |   Yes |     Yes |

---

# 57. Closure Mental Model

When you see:

```js
function outer() {
  const value = 10;

  return function inner() {
    return value;
  };
}
```

Think:

```text
outer()
   |
   ├── value = 10
   |
   └── inner()
          |
          └── remembers access to value
```

Then:

```js
const fn = outer();
```

Even after `outer()` finishes:

```js
fn();
```

can still access:

```js
value
```

because `inner` closed over the surrounding lexical environment.

---

# 58. Key Takeaways

1. **Scope determines where variables are accessible.**
2. JavaScript has global, function, and block scopes.
3. `var` is function-scoped.
4. `let` and `const` are block-scoped.
5. JavaScript uses lexical scoping.
6. Variable lookup follows the scope chain from inner to outer scopes.
7. Inner scopes can access outer scopes.
8. Outer scopes cannot directly access variables inside inner scopes.
9. Shadowing occurs when an inner scope declares a variable with the same name as an outer variable.
10. A closure allows a function to retain access to variables from its surrounding lexical environment.
11. Closures are created naturally by JavaScript; there is no special closure syntax.
12. Closures are useful for private state, factories, callbacks, and asynchronous code.
13. Each invocation of a function can create its own closure environment.
14. Closures are fundamental to understanding many React behaviors.
15. Use scope deliberately: keep variables local, minimize unnecessary globals, and use closures when they provide a clear design benefit.

---

## Final Mental Model

Remember these three questions:

### Question 1

**Where was this variable declared?**

That tells you its scope.

### Question 2

**Where was this function defined?**

That tells you its lexical environment.

### Question 3

**Does this function continue to access variables from that environment after the outer function finishes?**

If yes, you are dealing with a closure.

A compact mental model is:

```text
Scope
  ↓
Where variables are accessible

Lexical Scope
  ↓
Scope determined by where code is written

Scope Chain
  ↓
How JavaScript searches for variables

Closure
  ↓
A function retains access to its surrounding lexical environment
```
