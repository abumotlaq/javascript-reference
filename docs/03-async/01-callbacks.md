# JavaScript Callbacks

Callbacks are one of the fundamental concepts of JavaScript asynchronous programming.

A callback is simply a **function passed to another function as an argument**, so that the receiving function can execute it at the appropriate time.

Callbacks are important because they form the foundation for understanding:

* Asynchronous JavaScript.
* Events.
* Timers.
* APIs.
* Promises.
* `async/await`.
* React event handlers.
* Node.js and backend development.

---

# 1. What Is a Callback?

A callback is a function that is passed to another function.

Example:

```js
function greet(name) {
  console.log(`Hello, ${name}`);
}

function processUser(callback) {
  callback("Osama Abu Motlaq");
}

processUser(greet);
```

Output:

```text
Hello, Osama Abu Motlaq
```

Here:

```js
greet
```

is passed to:

```js
processUser
```

and becomes the `callback` parameter.

Then:

```js
callback("Osama Abu Motlaq");
```

executes the function.

---

# 2. Functions Are Values

To understand callbacks, you must first understand that functions are **first-class values** in JavaScript.

This means a function can be:

* Stored in a variable.
* Passed as an argument.
* Returned from another function.
* Stored inside an object.
* Stored inside an array.

Example:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq");
}

const message = greet;

message();
```

Output:

```text
Hello, Osama Abu Motlaq
```

The variable:

```js
message
```

now references the same function.

This ability allows functions to be passed around as values.

---

# 3. Passing a Function as an Argument

Consider:

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq");
}

function execute(callback) {
  callback();
}

execute(greet);
```

The important part is:

```js
execute(greet);
```

We pass the function itself.

We do **not** write:

```js
execute(greet());
```

because that would execute `greet()` immediately.

---

# 4. Passing vs Calling a Function

This distinction is extremely important.

### Passing

```js
execute(greet);
```

Means:

> Give the `greet` function to `execute`.

### Calling

```js
execute(greet());
```

Means:

> Execute `greet` first, then pass its return value to `execute`.

Compare:

```js
function greet() {
  console.log("Hello");

  return "Done";
}

function execute(callback) {
  console.log(callback());
}

execute(greet);
```

Here `greet` is passed as a callback.

---

# 5. Basic Callback Example

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

function add(a, b) {
  return a + b;
}

console.log(calculate(10, 5, add));
```

Output:

```text
15
```

The `add` function is passed into `calculate`.

Inside:

```js
operation(a, b);
```

calls the callback.

Conceptually:

```text
calculate()
    |
    ├── a = 10
    ├── b = 5
    └── operation = add
                  ↓
              add(10, 5)
                  ↓
                  15
```

---

# 6. Anonymous Callback Functions

You do not always need to create a named function first.

You can define the callback directly.

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const result = calculate(10, 5, function (a, b) {
  return a + b;
});

console.log(result);
```

Output:

```text
15
```

The anonymous function is the callback.

---

# 7. Arrow Function Callbacks

Callbacks are commonly written using arrow functions.

```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const result = calculate(10, 5, (a, b) => {
  return a + b;
});

console.log(result);
```

Or using an implicit return:

```js
const result = calculate(10, 5, (a, b) => a + b);
```

Arrow functions are especially common when callbacks are short.

---

# 8. Synchronous Callbacks

Not every callback is asynchronous.

A callback can execute immediately.

Example:

```js
function process(callback) {
  console.log("Before callback");

  callback();

  console.log("After callback");
}

process(() => {
  console.log("Callback");
});
```

Output:

```text
Before callback
Callback
After callback
```

The callback executes immediately.

Therefore:

> Callback does not automatically mean asynchronous.

This distinction is important.

---

# 9. Asynchronous Callbacks

A callback becomes asynchronous when it is scheduled to execute later.

For example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Callback");
}, 1000);

console.log("End");
```

Output:

```text
Start
End
Callback
```

The callback is executed later.

This is an **asynchronous callback**.

---

# 10. `setTimeout()` as a Callback Example

The basic structure is:

```js
setTimeout(callback, delay);
```

Example:

```js
setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq");
}, 2000);
```

The callback:

```js
() => {
  console.log("Hello, Osama Abu Motlaq");
}
```

is passed to `setTimeout`.

The number:

```js
2000
```

represents a delay of approximately 2000 milliseconds before the callback becomes eligible to run.

---

# 11. `setTimeout()` Does Not Block JavaScript

Consider:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 2000);

console.log("C");
```

Output:

```text
A
C
B
```

JavaScript does not stop and wait for two seconds.

Instead:

```text
A
↓
Schedule timer
↓
C
↓
Wait for timer
↓
Run callback
↓
B
```

This is an important characteristic of asynchronous JavaScript.

---

# 12. Callbacks and the Event Loop

To understand asynchronous callbacks properly, you need a basic mental model of the JavaScript runtime.

Consider:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timer
```

Even with:

```js
0
```

milliseconds, the callback does not execute immediately.

The timer callback must wait until the current synchronous code has finished.

Conceptually:

```text
Call Stack
    ↓
Execute synchronous code
    ↓
Current stack becomes empty
    ↓
Callback can be processed
    ↓
Callback executes
```

The **event loop** coordinates this process.

---

# 13. Why `setTimeout(..., 0)` Is Not Immediate

Consider:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

You might expect:

```text
Start
Timer
End
```

But the result is:

```text
Start
End
Timer
```

The reason is that `setTimeout` schedules the callback.

It does not insert the callback into the middle of currently executing synchronous code.

The current call stack must finish first.

---

# 14. Callbacks with Events

Browser events commonly use callbacks.

Example:

```js
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

The function:

```js
() => {
  console.log("Button clicked");
}
```

is a callback.

The browser stores it and calls it when the event occurs.

Conceptually:

```text
User clicks button
       ↓
Browser detects event
       ↓
Callback is scheduled
       ↓
Callback executes
```

---

# 15. Callback Parameters

Callbacks can receive data.

Example:

```js
function processUser(name, callback) {
  callback(name);
}

processUser("Osama Abu Motlaq", (name) => {
  console.log(`Hello, ${name}`);
});
```

Output:

```text
Hello, Osama Abu Motlaq
```

The outer function controls what arguments are passed to the callback.

---

# 16. Multiple Callback Arguments

A callback can receive multiple values.

```js
function calculate(a, b, callback) {
  const result = a + b;

  callback(result, a, b);
}

calculate(10, 5, (result, a, b) => {
  console.log(result);
  console.log(a);
  console.log(b);
});
```

Output:

```text
15
10
5
```

Callbacks are simply functions, so they can accept parameters like any other function.

---

# 17. Callback Return Values

A callback can return a value.

```js
function process(a, b, callback) {
  return callback(a, b);
}

const result = process(10, 5, (a, b) => {
  return a * b;
});

console.log(result);
```

Output:

```text
50
```

The outer function returns the callback's result.

---

# 18. Callback vs Higher-Order Function

These two concepts are closely related.

A **callback** is the function being passed.

A **higher-order function** is the function receiving or returning a function.

Example:

```js
function execute(callback) {
  callback();
}
```

Here:

```text
execute → Higher-order function
callback → Callback
```

This distinction is important.

---

# 19. Callbacks with Array Methods

Many JavaScript array methods accept callbacks.

For example:

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map((number) => {
  return number * 2;
});

console.log(doubled);
```

Output:

```text
[2, 4, 6, 8]
```

The function passed to:

```js
map()
```

is a callback.

This is a synchronous callback because `map()` calls it while processing the array.

---

# 20. `forEach()` Callback

```js
const numbers = [10, 20, 30];

numbers.forEach((number) => {
  console.log(number);
});
```

The arrow function is called once for each array element.

Output:

```text
10
20
30
```

Again, this callback is synchronous.

---

# 21. Callbacks and API Requests

A common historical pattern for asynchronous operations is a callback-based API.

Conceptually:

```js
function loadData(callback) {
  // Start asynchronous operation

  // Later:
  callback(data);
}
```

Usage:

```js
loadData((data) => {
  console.log(data);
});
```

The callback runs after the asynchronous operation completes.

Modern JavaScript commonly uses Promises instead, but understanding this pattern is important because Promises were largely introduced to make asynchronous control flow easier to manage.

---

# 22. Success and Error Callbacks

Older callback-based APIs often use separate success and error information.

For example:

```js
function loadData(onSuccess, onError) {
  const success = true;

  if (success) {
    onSuccess("Data loaded");
  } else {
    onError("Something went wrong");
  }
}

loadData(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.error(error);
  }
);
```

Possible output:

```text
Data loaded
```

This pattern can become difficult when many asynchronous operations depend on one another.

---

# 23. Error-First Callbacks

Node.js historically popularized the **error-first callback** convention.

The callback commonly receives:

```text
(error, result)
```

Example:

```js
function loadData(callback) {
  const error = null;
  const data = "Data loaded";

  callback(error, data);
}

loadData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
```

The general convention is:

```js
callback(error, result);
```

When there is no error:

```js
error === null
```

When an error occurs:

```js
error
```

contains information about the failure.

Modern Node.js APIs still use this pattern in many callback-based interfaces, although Promise-based APIs are now extremely common.

---

# 24. Nested Callbacks

Callbacks can be nested.

Example:

```js
function first(callback) {
  setTimeout(() => {
    console.log("First");
    callback();
  }, 1000);
}

first(() => {
  console.log("Second");
});
```

This is manageable.

The problem appears when many operations depend on one another.

---

# 25. Callback Nesting

Consider:

```js
first(() => {
  second(() => {
    third(() => {
      fourth(() => {
        console.log("Done");
      });
    });
  });
});
```

The nesting becomes difficult to read.

This is often called:

> Callback Hell

---

# 26. Callback Hell

Callback Hell refers to deeply nested callback structures that make asynchronous code difficult to:

* Read.
* Understand.
* Debug.
* Test.
* Modify.
* Handle errors in.

A simplified example:

```js
loadUser((user) => {
  loadPosts(user, (posts) => {
    loadComments(posts, (comments) => {
      loadProfile(comments, (profile) => {
        console.log(profile);
      });
    });
  });
});
```

The visual shape can become:

```text
loadUser
   └── loadPosts
         └── loadComments
               └── loadProfile
```

The deeper the nesting becomes, the harder the control flow is to follow.

---

# 27. Why Callback Hell Is a Problem

The problem is not simply that callbacks exist.

The problem is **complex nested control flow**.

You may end up with:

```js
doA((resultA) => {
  doB(resultA, (resultB) => {
    doC(resultB, (resultC) => {
      doD(resultC, (resultD) => {
        // More logic
      });
    });
  });
});
```

Now you have to track:

* Which operation runs first.
* Which callback receives which data.
* Where errors are handled.
* What happens if one operation fails.
* How to change the sequence.
* Where execution eventually finishes.

Promises provide a more structured solution to this problem.

---

# 28. Refactoring Nested Callbacks

One approach is to move callbacks into named functions.

Instead of:

```js
loadUser((user) => {
  loadPosts(user, (posts) => {
    console.log(posts);
  });
});
```

You can write:

```js
function handlePosts(posts) {
  console.log(posts);
}

function handleUser(user) {
  loadPosts(user, handlePosts);
}

loadUser(handleUser);
```

This can improve readability.

However, for complex asynchronous flows, Promises generally provide a cleaner model.

---

# 29. Callback Timing

Callbacks can execute:

* Immediately.
* After a timer.
* After a browser event.
* After a network operation.
* After another asynchronous operation completes.

Therefore, when you see a callback, ask:

> When is this function going to be called?

For example:

```js
numbers.map(callback);
```

The callback is called synchronously during `map`.

But:

```js
setTimeout(callback, 1000);
```

schedules it for later.

The callback concept is the same; the execution timing is different.

---

# 30. Callback vs Asynchronous Operation

Do not assume:

```text
Callback = Async
```

That is incorrect.

Instead:

```text
Callback
    ↓
A function passed to another function
```

Then:

```text
Asynchronous Callback
    ↓
A callback that is executed later
```

Examples:

### Synchronous

```js
[1, 2, 3].map((number) => number * 2);
```

### Asynchronous

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
```

---

# 31. Callback Execution Context

A callback executes when the function that received it decides to call it.

Example:

```js
function execute(callback) {
  console.log("Before");

  callback();

  console.log("After");
}

execute(() => {
  console.log("Inside callback");
});
```

Output:

```text
Before
Inside callback
After
```

The receiving function controls when the callback runs.

---

# 32. A Callback Can Be Reused

A named function can be passed to multiple functions.

```js
function greet() {
  console.log("Hello, Osama Abu Motlaq");
}

function executeA(callback) {
  callback();
}

function executeB(callback) {
  callback();
}

executeA(greet);
executeB(greet);
```

The same function can be reused as a callback.

---

# 33. Callbacks and Closures

Callbacks can also form closures.

Example:

```js
function createGreeting() {
  const name = "Osama Abu Motlaq";

  return function () {
    console.log(`Hello, ${name}`);
  };
}

const greeting = createGreeting();

setTimeout(greeting, 1000);
```

The callback retains access to:

```js
name
```

through its closure.

This connects the concepts from the previous section:

```text
Lexical Scope
      ↓
Closure
      ↓
Callback
      ↓
Asynchronous execution
```

---

# 34. Common Mistake: Calling the Callback Immediately

Incorrect:

```js
function execute(callback) {
  callback();
}

function greet() {
  console.log("Hello");
}

execute(greet());
```

The problem is:

```js
greet()
```

executes immediately.

Correct:

```js
execute(greet);
```

Pass the function itself.

---

# 35. Common Mistake: Forgetting the Callback Is a Function

Consider:

```js
function execute(callback) {
  callback();
}
```

The variable:

```js
callback
```

is not the result of a function.

It is a reference to a function.

Therefore:

```js
callback();
```

calls it.

---

# 36. Common Mistake: Missing a Callback

If a function expects a callback:

```js
function execute(callback) {
  callback();
}
```

and you call:

```js
execute();
```

JavaScript will attempt to call:

```js
undefined();
```

which causes an error.

You can guard against this when appropriate:

```js
function execute(callback) {
  if (typeof callback === "function") {
    callback();
  }
}
```

Whether such a guard is appropriate depends on the API design.

---

# 37. Common Mistake: Forgetting to Handle Errors

Asynchronous operations can fail.

Bad callback design:

```js
loadData((data) => {
  console.log(data);
});
```

If the operation can fail, the API needs a defined error-handling strategy.

For example:

```js
loadData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
```

Reliable asynchronous code must account for failure.

---

# 38. Common Mistake: Excessive Nesting

This:

```js
first(() => {
  second(() => {
    third(() => {
      fourth(() => {
        fifth(() => {
          console.log("Done");
        });
      });
    });
  });
});
```

is difficult to maintain.

When asynchronous operations become heavily dependent on each other, consider using Promises and `async/await`.

---

# 39. When to Use Callbacks

Callbacks are appropriate when:

* A function needs to receive behavior from the caller.
* You need a simple synchronous operation.
* You are working with event handlers.
* You are using APIs that expose callbacks.
* You need a small custom higher-order function.
* A callback makes the code simpler.

Example:

```js
numbers.forEach((number) => {
  console.log(number);
});
```

---

# 40. When Callbacks Become Difficult

Callbacks become problematic when you have:

* Deep nesting.
* Long chains of dependent asynchronous operations.
* Repeated error handling.
* Complicated success/failure branches.
* Many layers of callbacks.
* Difficult-to-follow execution order.

In these situations, Promises usually provide a better abstraction.

---

# 41. Callbacks and React

Callbacks are extremely common in React.

For example:

```jsx
function Button() {
  function handleClick() {
    console.log("Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

The function:

```js
handleClick
```

is passed to the `onClick` prop.

React calls it when the event occurs.

You will also see callbacks when:

* Passing event handlers.
* Using array methods such as `map()`.
* Passing functions as props.
* Working with asynchronous operations.
* Creating reusable components.

Understanding callbacks is therefore important for React development.

---

# 42. Callbacks and Node.js

Callbacks are historically important in Node.js.

Many older Node.js APIs use callbacks:

```js
someOperation((error, result) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(result);
});
```

Modern Node.js also provides many Promise-based APIs.

Understanding callbacks makes it easier to understand why those newer APIs are designed the way they are.

---

# 43. Callback Mental Model

Whenever you see:

```js
someFunction(callback);
```

think:

```text
1. A function is being passed.
2. The receiving function stores or receives it.
3. The receiving function decides when to call it.
4. The callback may receive data.
5. The callback may execute immediately or later.
```

For asynchronous callbacks:

```text
Start operation
      ↓
Operation continues
      ↓
Operation completes
      ↓
Callback becomes eligible
      ↓
Callback executes
```

---

# 44. Best Practices

### 1. Pass Functions, Do Not Call Them

Use:

```js
execute(greet);
```

not:

```js
execute(greet());
```

when the API expects a callback.

---

### 2. Keep Callbacks Small

Prefer:

```js
numbers.map((number) => number * 2);
```

over a callback containing unrelated logic.

---

### 3. Name Complex Callbacks

If a callback becomes large, extract it:

```js
function handleData(data) {
  // Complex logic
}

loadData(handleData);
```

This can improve readability and testability.

---

### 4. Handle Errors Explicitly

For callback-based asynchronous APIs, understand and follow the API's error convention.

---

### 5. Avoid Deep Callback Nesting

When asynchronous control flow becomes deeply nested, consider Promises.

---

### 6. Understand Timing

Always know whether a callback executes:

* Synchronously.
* Asynchronously.
* After an event.
* After a timer.
* After an asynchronous operation.

---

# 45. Quick Reference

| Concept               | Meaning                                        |
| --------------------- | ---------------------------------------------- |
| Callback              | Function passed to another function            |
| Synchronous Callback  | Callback executed during the current operation |
| Asynchronous Callback | Callback executed later                        |
| Higher-Order Function | Function that accepts or returns a function    |
| Callback Hell         | Excessive nesting of callbacks                 |
| Error-First Callback  | Callback convention using `(error, result)`    |
| `setTimeout()`        | Schedules a callback for later execution       |
| Event Handler         | Callback executed in response to an event      |

---

# 46. Callback vs Promise

Callbacks and Promises can both handle asynchronous operations, but their control-flow models are different.

### Callback style

```js
loadData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
```

### Promise style

```js
loadData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Promises were introduced to provide a more composable way to represent asynchronous results and reduce many problems associated with complex callback-based code.

The next file will explore this in detail.

---

# 47. Key Takeaways

1. A callback is a function passed to another function.
2. Functions are first-class values in JavaScript.
3. Callbacks can be synchronous or asynchronous.
4. `setTimeout()` is a common example of an asynchronous callback.
5. Event handlers are commonly callbacks.
6. Array methods such as `map()` and `forEach()` accept callbacks.
7. Passing `greet` and calling `greet()` are fundamentally different.
8. A callback can receive arguments and return values.
9. Callbacks can form closures.
10. Callback Hell happens when asynchronous callbacks become deeply nested.
11. Error handling is an important part of callback-based asynchronous programming.
12. Callbacks remain important even though Promises and `async/await` are preferred for many asynchronous workflows.
13. Understanding callbacks makes Promises and `async/await` much easier to understand.
14. Callbacks are heavily used in React, browser APIs, and Node.js.

---

# Final Mental Model

Remember:

```text
Function
   ↓
Can be stored and passed around
   ↓
Passed to another function
   ↓
Becomes a callback
   ↓
Receiving function decides when to call it
```

For synchronous callbacks:

```text
Function receives callback
        ↓
Calls callback immediately
        ↓
Execution continues
```

For asynchronous callbacks:

```text
Function receives callback
        ↓
Starts/schedules operation
        ↓
Current code continues
        ↓
Operation completes
        ↓
Callback is scheduled
        ↓
Callback executes
```

And when callback-based asynchronous code becomes deeply nested:

```text
Callback
   ↓
Callback
   ↓
Callback
   ↓
Callback Hell
   ↓
Promises provide a better control-flow model
```

The key idea is simple:

> **A callback is not inherently asynchronous. It is simply a function passed to another function. Asynchronous behavior depends on when that function is executed.**
