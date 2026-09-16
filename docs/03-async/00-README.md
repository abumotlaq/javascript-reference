# Asynchronous JavaScript

This folder covers **Asynchronous JavaScript** and explains how JavaScript handles operations that do not finish immediately.

Asynchronous programming is essential for modern web development because applications frequently need to:

* Fetch data from APIs.
* Wait for network requests.
* Handle user interactions.
* Read or process external data.
* Execute code after a delay.
* Handle operations that complete in the future.

JavaScript is single-threaded, but its runtime provides mechanisms that allow asynchronous operations to be handled without blocking the main execution flow.

---

## Learning Path

Study the files in this order:

```text
Callbacks
   ↓
Promises
   ↓
Async / Await
   ↓
Error Handling
```

Each topic builds on the previous one.

---

## Files

### 01. Callbacks

File:

```text
01-callbacks.md
```

Learn:

* What a callback function is.
* Why callbacks are used.
* Passing functions to other functions.
* Synchronous callbacks.
* Asynchronous callbacks.
* `setTimeout()`.
* Callbacks with events.
* Callbacks with APIs.
* Callback nesting.
* Callback Hell.
* Problems with deeply nested callbacks.

---

### 02. Promises

File:

```text
02-promises.md
```

Learn:

* What a Promise is.
* Why Promises were introduced.
* Promise states.
* `pending`.
* `fulfilled`.
* `rejected`.
* Creating Promises.
* `.then()`.
* `.catch()`.
* `.finally()`.
* Promise chaining.
* Returning values from `.then()`.
* Returning Promises.
* Handling multiple asynchronous operations.
* `Promise.all()`.
* `Promise.allSettled()`.
* `Promise.race()`.
* `Promise.any()`.

---

### 03. Async / Await

File:

```text
03-async-await.md
```

Learn:

* The `async` keyword.
* The `await` keyword.
* How `async/await` works with Promises.
* Returning values from `async` functions.
* Error handling with `try/catch`.
* Sequential asynchronous operations.
* Parallel asynchronous operations.
* `Promise.all()` with `async/await`.
* Common mistakes with `await`.

`async/await` provides a cleaner way to write asynchronous code while still using the Promise system underneath.

---

### 04. Error Handling

File:

```text
04-error-handling.md
```

Learn:

* What errors are.
* Runtime errors.
* `throw`.
* `try`.
* `catch`.
* `finally`.
* Error objects.
* Custom errors.
* Handling Promise rejections.
* Handling errors with `async/await`.
* Common error-handling mistakes.
* Best practices for reliable asynchronous code.

---

# Why Asynchronous JavaScript Matters

JavaScript applications constantly perform operations that take time.

For example:

```js
fetch("/api/users");
```

The response does not arrive instantly.

JavaScript must be able to continue running other code while waiting for the operation to complete.

Another example:

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
```

The callback does not execute immediately.

Understanding asynchronous JavaScript allows you to understand what happens between:

```text
Start Operation
      ↓
Wait
      ↓
Operation Completes
      ↓
Run Related Code
```

---

# Important Concepts

As you progress through this folder, pay attention to these concepts:

### Callback

A function passed to another function to be executed later or at a specific point.

```js
setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq");
}, 1000);
```

---

### Promise

An object representing the eventual result of an asynchronous operation.

```text
Pending
   ↓
Fulfilled

or

Pending
   ↓
Rejected
```

---

### Async / Await

A syntax built on top of Promises that makes asynchronous code easier to read and reason about.

```js
async function loadData() {
  const response = await fetch("/api/data");

  return response;
}
```

---

### Error Handling

The mechanisms used to detect and respond to failures.

```js
try {
  // asynchronous operation
} catch (error) {
  // handle error
}
```

---

# Recommended Learning Order

Do not skip directly to `async/await`.

Use this progression:

```text
1. Callbacks
       ↓
2. Promises
       ↓
3. Async / Await
       ↓
4. Error Handling
```

Understanding callbacks first makes it easier to understand why Promises were introduced.

Understanding Promises makes `async/await` much easier to understand because `async/await` works with Promises rather than replacing them.

---

# What You Should Be Able to Do After This Folder

By the end of this section, you should be able to:

* Explain synchronous vs asynchronous execution.
* Explain what a callback is.
* Understand callback nesting and Callback Hell.
* Explain what a Promise represents.
* Understand Promise states.
* Use `.then()`, `.catch()`, and `.finally()`.
* Chain asynchronous operations.
* Use `Promise.all()` and other Promise combinators.
* Write asynchronous functions with `async/await`.
* Handle asynchronous errors correctly.
* Understand how JavaScript applications communicate with APIs.
* Read and understand common asynchronous JavaScript code.

---

# Connection to Modern Web Development

Asynchronous JavaScript is one of the most important JavaScript topics for frontend development.

You will use these concepts when working with:

* REST APIs.
* `fetch()`.
* Databases.
* Authentication.
* File uploads.
* Network requests.
* Server-side operations.
* React applications.
* Next.js applications.
* Node.js and Express.js.

For React specifically, asynchronous JavaScript is important when working with API requests, effects, event handlers, and data loading.

For Node.js and backend development, asynchronous programming is even more central because servers frequently handle network requests, databases, files, and external services.

---

# Folder Structure

```text
03-async/
│
├── 00-README.md
├── 01-callbacks.md
├── 02-promises.md
├── 03-async-await.md
└── 04-error-handling.md
```

---

# Key Takeaways

1. JavaScript can perform asynchronous operations without blocking the main execution flow.
2. Callbacks are one of the fundamental mechanisms for handling future operations.
3. Promises provide a more structured way to represent asynchronous results.
4. `async/await` provides cleaner syntax for working with Promises.
5. Error handling is essential for reliable asynchronous applications.
6. These concepts are fundamental to working with APIs, React, Next.js, Node.js, and modern web applications.

The recommended progression is:

```text
Callbacks → Promises → Async/Await → Error Handling
```
