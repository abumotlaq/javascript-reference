# JavaScript Promise and Async Features

> A deep reference to modern Promise and asynchronous JavaScript features, including Promise combinators, cancellation patterns, async iterables, `for await...of`, `AbortController`, and practical asynchronous patterns.

---

# 1. Overview

JavaScript asynchronous programming has evolved significantly since Promises were introduced.

The core concepts are already covered in the async section:

* Callbacks
* Promises
* `async`
* `await`
* Error handling

This file focuses on **modern Promise and async-related features and patterns** that build on those foundations.

Important features include:

```text
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
Promise.withResolvers()

AbortController
AbortSignal

for await...of
Async Iterators
Async Generators

Promise-based concurrency
Sequential vs concurrent execution
Cancellation patterns
Timeout patterns
```

These features become particularly useful when working with:

* APIs
* React
* Next.js
* Node.js
* Database operations
* File operations
* Streaming data
* Multiple asynchronous requests

---

# 2. Promise Combinators

Promise combinators allow multiple asynchronous operations to be coordinated.

The main methods are:

```js
Promise.all()
Promise.allSettled()
Promise.race()
Promise.any()
```

A newer addition is:

```js
Promise.withResolvers()
```

The four main combinators solve different problems.

---

# 3. Promise.all()

`Promise.all()` waits for multiple Promises to fulfill.

```js
const promise1 = Promise.resolve("HTML");
const promise2 = Promise.resolve("CSS");
const promise3 = Promise.resolve("JavaScript");

const results = await Promise.all([
  promise1,
  promise2,
  promise3,
]);

console.log(results);
```

Output:

```text
["HTML", "CSS", "JavaScript"]
```

The results preserve the order of the input array.

---

# 4. Promise.all() Is Concurrent

Consider:

```js
const userPromise = fetch("/api/user");
const projectsPromise = fetch("/api/projects");

const [user, projects] = await Promise.all([
  userPromise,
  projectsPromise,
]);
```

The requests can proceed concurrently.

This is generally better than:

```js
const user = await fetch("/api/user");
const projects = await fetch("/api/projects");
```

when the second operation does not depend on the first.

Mental model:

```text
Sequential:

Request A
   ↓
finish
   ↓
Request B
   ↓
finish


Concurrent:

Request A ──────────→ finish
Request B ──────────→ finish
```

---

# 5. Promise.all() Fails Fast

If one Promise rejects:

```js
const first = Promise.resolve("Success");

const second = Promise.reject(
  new Error("Request failed")
);

const third = Promise.resolve("Success");

await Promise.all([
  first,
  second,
  third,
]);
```

the combined Promise rejects.

The rejection reason comes from the rejected Promise.

Important:

```text
Promise.all()
→ succeeds only if every Promise fulfills
→ rejects when any Promise rejects
```

---

# 6. Promise.all() Does Not Cancel Other Operations

This is an important distinction.

Suppose:

```js
const first = fetch("/api/first");
const second = fetch("/api/second");
const third = fetch("/api/third");

await Promise.all([
  first,
  second,
  third,
]);
```

If one operation rejects, `Promise.all()` rejects.

It does **not automatically cancel** the other underlying operations.

If cancellation is required, you need an explicit cancellation mechanism such as `AbortController`.

---

# 7. Promise.allSettled()

`Promise.allSettled()` waits for **every Promise to settle**.

A Promise is settled when it is either:

```text
fulfilled
or
rejected
```

Example:

```js
const results = await Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject(new Error("Failed")),
  Promise.resolve("Another success"),
]);

console.log(results);
```

Conceptually:

```js
[
  {
    status: "fulfilled",
    value: "Success",
  },
  {
    status: "rejected",
    reason: Error,
  },
  {
    status: "fulfilled",
    value: "Another success",
  },
]
```

---

# 8. When Should You Use Promise.allSettled()?

Use it when every operation matters independently.

For example, suppose an application loads:

```text
User profile
Notifications
Recommended projects
Activity history
```

One request failing does not necessarily mean that all other results are useless.

You may want:

```js
const results = await Promise.allSettled([
  loadProfile(),
  loadNotifications(),
  loadProjects(),
  loadActivity(),
]);
```

Then inspect each result separately.

---

# 9. Promise.all() vs Promise.allSettled()

| Feature                 | `Promise.all()`                   | `Promise.allSettled()` |
| ----------------------- | --------------------------------- | ---------------------- |
| Waits for all           | Yes, but rejects early on failure | Yes                    |
| Rejects if one fails    | Yes                               | No                     |
| Gives successful values | Yes                               | Yes                    |
| Gives failure reasons   | Combined rejection only           | Yes                    |
| Best for                | All-or-nothing operations         | Independent operations |

Mental model:

```text
Promise.all()
→ "I need everything."

Promise.allSettled()
→ "Tell me what happened to everything."
```

---

# 10. Promise.race()

`Promise.race()` settles when the **first input Promise settles**.

That means the first result can be either:

```text
fulfilled
or
rejected
```

Example:

```js
const first = new Promise((resolve) => {
  setTimeout(() => resolve("First"), 100);
});

const second = new Promise((resolve) => {
  setTimeout(() => resolve("Second"), 500);
});

const result = await Promise.race([
  first,
  second,
]);

console.log(result);
```

Output:

```text
First
```

---

# 11. Promise.race() Does Not Mean "First Success"

This is a common mistake.

Suppose:

```js
const fastFailure = Promise.reject(
  new Error("Failed quickly")
);

const slowSuccess = new Promise((resolve) => {
  setTimeout(() => resolve("Success"), 1000);
});
```

Then:

```js
await Promise.race([
  fastFailure,
  slowSuccess,
]);
```

rejects.

Why?

Because the first Promise to **settle** was the rejection.

For "first successful result", use:

```js
Promise.any()
```

---

# 12. Promise.any()

`Promise.any()` waits for the first Promise to **fulfill**.

Example:

```js
const first = new Promise((resolve) => {
  setTimeout(() => resolve("Server A"), 500);
});

const second = new Promise((resolve) => {
  setTimeout(() => resolve("Server B"), 100);
});

const result = await Promise.any([
  first,
  second,
]);

console.log(result);
```

Output:

```text
Server B
```

The fastest successful result wins.

---

# 13. Promise.any() Ignores Rejections Until Necessary

Consider:

```js
const first = Promise.reject(
  new Error("Server A failed")
);

const second = Promise.resolve("Server B");

const result = await Promise.any([
  first,
  second,
]);

console.log(result);
```

Output:

```text
Server B
```

The rejected Promise did not cause the combined Promise to reject because another Promise fulfilled.

---

# 14. Promise.any() When Everything Fails

If every Promise rejects:

```js
await Promise.any([
  Promise.reject(new Error("A")),
  Promise.reject(new Error("B")),
]);
```

the returned Promise rejects with an:

```js
AggregateError
```

An `AggregateError` contains the individual errors.

Example:

```js
try {
  await Promise.any([
    Promise.reject(new Error("Server A")),
    Promise.reject(new Error("Server B")),
  ]);
} catch (error) {
  console.log(error instanceof AggregateError);
  console.log(error.errors);
}
```

Output conceptually:

```text
true
[
  Error("Server A"),
  Error("Server B")
]
```

---

# 15. Promise.race() vs Promise.any()

| Feature           | `Promise.race()`               | `Promise.any()`               |
| ----------------- | ------------------------------ | ----------------------------- |
| Waits for         | First settled Promise          | First fulfilled Promise       |
| Rejection can win | Yes                            | No                            |
| All reject        | Rejects with first rejection   | Rejects with `AggregateError` |
| Useful for        | Timeouts, competing operations | Fallback sources              |

Mental model:

```text
race()
→ first to finish

any()
→ first to succeed
```

---

# 16. Promise Combinators Summary

```text
Promise.all()
→ all must fulfill

Promise.allSettled()
→ wait for everything

Promise.race()
→ first settlement wins

Promise.any()
→ first fulfillment wins
```

This is one of the most useful Promise decision trees to memorize.

---

# 17. Promise.withResolvers()

Modern JavaScript provides:

```js
Promise.withResolvers()
```

It gives you:

```text
promise
resolve
reject
```

as separate values.

Example:

```js
const {
  promise,
  resolve,
  reject,
} = Promise.withResolvers();
```

Conceptually equivalent to manually capturing:

```js
let resolvePromise;
let rejectPromise;

const promise = new Promise((resolve, reject) => {
  resolvePromise = resolve;
  rejectPromise = reject;
});
```

`Promise.withResolvers()` provides a cleaner API for this pattern.

---

# 18. Using Promise.withResolvers()

Example:

```js
const {
  promise,
  resolve,
} = Promise.withResolvers();

setTimeout(() => {
  resolve("Completed");
}, 1000);

const result = await promise;

console.log(result);
```

Output:

```text
Completed
```

The Promise and its settlement functions are available separately.

---

# 19. Why Promise.withResolvers() Exists

Normally:

```js
new Promise((resolve, reject) => {
  // executor
});
```

keeps `resolve` and `reject` inside the executor.

Sometimes another part of the program needs to settle the Promise.

Before `Promise.withResolvers()`, developers commonly wrote:

```js
let resolvePromise;

const promise = new Promise((resolve) => {
  resolvePromise = resolve;
});
```

The modern approach is:

```js
const {
  promise,
  resolve,
  reject,
} = Promise.withResolvers();
```

---

# 20. Promise.withResolvers() Is Not a General Replacement for new Promise()

Do not use it automatically.

If the asynchronous operation can naturally be expressed as:

```js
new Promise((resolve, reject) => {
  // operation
});
```

that may still be clearer.

`Promise.withResolvers()` is especially useful when settlement needs to happen outside the Promise creation scope.

---

# 21. AbortController

Promises do not have a universal built-in cancellation method.

For many Web APIs, cancellation is handled using:

```js
AbortController
```

Example:

```js
const controller = new AbortController();

fetch("/api/projects", {
  signal: controller.signal,
});

controller.abort();
```

The request can be aborted.

---

# 22. AbortSignal

An `AbortController` exposes a:

```js
signal
```

property.

```js
const controller = new AbortController();

console.log(controller.signal);
```

The signal is passed to APIs that support aborting.

Example:

```js
fetch("/api/projects", {
  signal: controller.signal,
});
```

---

# 23. Aborting fetch()

Example:

```js
const controller = new AbortController();

try {
  const response = await fetch(
    "/api/projects",
    {
      signal: controller.signal,
    }
  );

  const data = await response.json();

  console.log(data);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was cancelled");
  } else {
    throw error;
  }
}
```

Then:

```js
controller.abort();
```

causes the request to be aborted.

---

# 24. AbortController Does Not Cancel Every Promise

This is important.

`AbortController` does not magically cancel arbitrary JavaScript Promises.

It works when the underlying API supports an `AbortSignal`.

For example:

```js
fetch()
```

supports signals.

But an arbitrary Promise such as:

```js
new Promise((resolve) => {
  setTimeout(resolve, 5000);
});
```

does not automatically stop just because you call:

```js
controller.abort();
```

Cancellation must be implemented by the underlying operation.

---

# 25. AbortSignal.aborted

You can inspect whether a signal has been aborted:

```js
const controller = new AbortController();

console.log(controller.signal.aborted);
```

Output:

```text
false
```

After:

```js
controller.abort();
```

it becomes:

```text
true
```

---

# 26. AbortSignal.reason

An abort can optionally include a reason:

```js
const controller = new AbortController();

controller.abort("User cancelled the request");

console.log(controller.signal.reason);
```

The reason can help identify why cancellation occurred.

---

# 27. AbortSignal.timeout()

A useful modern pattern is:

```js
AbortSignal.timeout()
```

Example:

```js
const response = await fetch(
  "/api/projects",
  {
    signal: AbortSignal.timeout(5000),
  }
);
```

The request is automatically aborted after approximately five seconds.

This provides a convenient timeout mechanism for APIs supporting `AbortSignal`.

---

# 28. Timeout with fetch()

Example:

```js
try {
  const response = await fetch(
    "/api/projects",
    {
      signal: AbortSignal.timeout(5000),
    }
  );

  const data = await response.json();

  console.log(data);
} catch (error) {
  console.error(error);
}
```

This is often cleaner than manually creating a timeout Promise.

---

# 29. AbortSignal.any()

Multiple signals can be combined using:

```js
AbortSignal.any()
```

Example:

```js
const controller = new AbortController();

const timeoutSignal = AbortSignal.timeout(5000);

const signal = AbortSignal.any([
  controller.signal,
  timeoutSignal,
]);

fetch("/api/projects", {
  signal,
});
```

Now the request can be aborted by:

```text
manual cancellation
or
timeout
```

whichever happens first.

---

# 30. Manual Cancellation + Timeout

A practical pattern:

```js
const controller = new AbortController();

const signal = AbortSignal.any([
  controller.signal,
  AbortSignal.timeout(5000),
]);

try {
  const response = await fetch(
    "/api/projects",
    { signal }
  );

  const data = await response.json();

  console.log(data);
} catch (error) {
  console.error(error);
}
```

This provides both:

```text
user/application cancellation
+
automatic timeout
```

---

# 31. Why Cancellation Matters

Cancellation is useful when the result is no longer needed.

Examples:

* User navigates away from a page
* Search query changes
* Component unmounts
* Request takes too long
* User explicitly cancels an operation
* A newer request makes an older request irrelevant

Cancellation can reduce unnecessary work and avoid stale results.

---

# 32. React and Request Cancellation

A common React pattern is:

```js
useEffect(() => {
  const controller = new AbortController();

  async function loadProjects() {
    try {
      const response = await fetch(
        "/api/projects",
        {
          signal: controller.signal,
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }

  loadProjects();

  return () => {
    controller.abort();
  };
}, []);
```

The cleanup function aborts the request when the effect is cleaned up.

This is directly relevant to React development.

---

# 33. Sequential Async Processing

Suppose you need to process several items one by one.

Use:

```js
for (const item of items) {
  await process(item);
}
```

This means:

```text
item 1
 ↓
finish
 ↓
item 2
 ↓
finish
 ↓
item 3
```

Use this when order or dependency matters.

---

# 34. Concurrent Async Processing

If operations are independent:

```js
const results = await Promise.all(
  items.map(process)
);
```

This allows the operations to proceed concurrently.

Mental model:

```text
item 1 ───────→
item 2 ───────→
item 3 ───────→
item 4 ───────→
```

This is often much faster for independent I/O operations.

---

# 35. Why `forEach()` Can Be a Problem with async

This does not wait for asynchronous callbacks:

```js
items.forEach(async (item) => {
  await process(item);
});

console.log("Done");
```

`forEach()` does not await the returned Promises.

If sequential processing is required:

```js
for (const item of items) {
  await process(item);
}
```

If concurrent processing is appropriate:

```js
await Promise.all(
  items.map(process)
);
```

---

# 36. Async Iteration

JavaScript provides:

```js
for await...of
```

for consuming asynchronous iterables.

Example:

```js
for await (const value of asyncIterable) {
  console.log(value);
}
```

This is the asynchronous counterpart to:

```js
for...of
```

---

# 37. Async Iterables

An async iterable provides:

```js
Symbol.asyncIterator
```

and produces Promises from its iterator.

Conceptually:

```js
const iterator = object[Symbol.asyncIterator]();
```

Each call to:

```js
iterator.next()
```

returns a Promise for an iterator result.

---

# 38. Async Generator

An async generator is created with:

```js
async function*
```

Example:

```js
async function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

It can be consumed using:

```js
for await (const number of numbers()) {
  console.log(number);
}
```

Output:

```text
1
2
3
```

---

# 39. Async Generator with Delay

Example:

```js
async function* numbers() {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  yield 1;

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  yield 2;
}
```

Consumption:

```js
for await (const number of numbers()) {
  console.log(number);
}
```

Values become available asynchronously.

---

# 40. `for await...of` and Promises

`for await...of` can also consume ordinary synchronous iterables whose values are Promises.

Example:

```js
const values = [
  Promise.resolve("HTML"),
  Promise.resolve("CSS"),
  Promise.resolve("JavaScript"),
];

for await (const value of values) {
  console.log(value);
}
```

Output:

```text
HTML
CSS
JavaScript
```

The loop awaits each value.

---

# 41. Async Generators and Streaming

Async generators are particularly useful when data arrives incrementally.

Conceptual examples:

```text
API pages
database records
file chunks
streaming responses
event streams
```

Instead of waiting for everything:

```text
all data
 ↓
process everything
```

you can process values as they arrive:

```text
value 1
 ↓
process
 ↓
value 2
 ↓
process
 ↓
value 3
```

---

# 42. Promise-Based Timeout Helper

A simple timeout helper:

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

Usage:

```js
await delay(1000);

console.log("One second passed");
```

This is useful for demonstrations and controlled asynchronous flows.

For real network timeout behavior, prefer an API's cancellation mechanism such as `AbortSignal.timeout()` when available.

---

# 43. Retry Pattern

A simple retry function can use `async/await`:

```js
async function retry(operation, attempts) {
  let lastError;

  for (let i = 0; i < attempts; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
```

Usage:

```js
const result = await retry(
  () => fetch("/api/projects"),
  3
);
```

The operation is attempted up to three times.

---

# 44. Retry Should Be Used Carefully

Not every failure should be retried.

Retry may be appropriate for temporary failures such as:

```text
network interruption
temporary service unavailability
transient infrastructure failures
```

Retrying is usually inappropriate for permanent failures such as:

```text
invalid authentication
invalid input
permission denied
bad request
```

Blind retries can increase server load.

---

# 45. Exponential Backoff

A more sophisticated retry strategy increases the delay between attempts.

Conceptually:

```text
Attempt 1
 ↓
100ms

Attempt 2
 ↓
200ms

Attempt 3
 ↓
400ms

Attempt 4
 ↓
800ms
```

This is called:

```text
exponential backoff
```

Production systems often combine backoff with jitter to avoid synchronized retry storms.

---

# 46. Concurrency Limiting

`Promise.all()` starts all supplied operations concurrently.

That can become a problem with a large collection.

For example:

```js
await Promise.all(
  thousandsOfItems.map(process)
);
```

could create too much simultaneous work.

Sometimes you need:

```text
maximum 5 operations at a time
```

This requires a concurrency-limiting pattern or library.

The core idea is:

```text
5 running
 ↓
one finishes
 ↓
start another
```

---

# 47. Promise Combinators Do Not Limit Concurrency

This:

```js
Promise.all(items.map(process))
```

does not mean:

```text
"process five at a time"
```

It generally creates all mapped operations immediately.

Concurrency control is a separate concern.

---

# 48. Async Error Propagation

An `async` function converts thrown errors into Promise rejections.

Example:

```js
async function loadUser() {
  throw new Error("Failed");
}
```

Then:

```js
loadUser().catch((error) => {
  console.error(error);
});
```

The rejection travels through the Promise chain.

---

# 49. `try...catch` with Concurrent Operations

You can combine `try...catch` with `Promise.all()`:

```js
try {
  const [user, projects] = await Promise.all([
    loadUser(),
    loadProjects(),
  ]);
} catch (error) {
  console.error(error);
}
```

If any operation rejects, control enters `catch`.

For independent results where partial success matters, consider:

```js
Promise.allSettled()
```

instead.

---

# 50. HTTP Errors Are Not Automatically Promise Rejections

With `fetch()`:

```js
const response = await fetch("/api/projects");
```

a response such as:

```text
404
500
```

does not automatically reject the Promise merely because the HTTP status is unsuccessful.

Check:

```js
if (!response.ok) {
  throw new Error(
    `HTTP error: ${response.status}`
  );
}
```

Then parse the response:

```js
const data = await response.json();
```

This is an important practical distinction.

---

# 51. Abort vs Error

Cancellation and failure are conceptually different.

```text
Error
→ operation failed

Abort
→ operation was intentionally stopped
```

Your application may want to handle them differently.

Example:

```js
catch (error) {
  if (error.name === "AbortError") {
    return;
  }

  console.error(error);
}
```

---

# 52. Stale Request Problem

Imagine a search field:

```text
User types:
Java
```

then immediately:

```text
JavaScript
```

Two requests may be active.

The older request could finish after the newer request.

Without proper handling, stale data may overwrite newer data.

Possible solutions include:

```text
AbortController
request IDs
sequence numbers
server-side cancellation
data-fetching libraries
```

This is highly relevant to React applications.

---

# 53. Async Function Return Values

An `async` function always returns a Promise.

Example:

```js
async function getName() {
  return "Osama Abu Motlaq";
}
```

Calling:

```js
const result = getName();

console.log(result instanceof Promise);
```

produces:

```text
true
```

To obtain the value:

```js
const name = await getName();
```

---

# 54. Returning a Promise from an Async Function

Example:

```js
async function getData() {
  return Promise.resolve("Data");
}
```

The returned value is assimilated into the outer Promise.

Conceptually:

```text
async function
      ↓
always returns Promise
      ↓
resolved with the returned value
```

---

# 55. `await` Does Not Block the JavaScript Thread

Consider:

```js
async function load() {
  await fetch("/api/projects");

  console.log("Loaded");
}
```

`await` suspends the current async function until the awaited Promise settles.

It does not freeze the entire JavaScript runtime.

Other work can continue.

---

# 56. Microtasks

Promise callbacks and `await` continuations are scheduled through the microtask mechanism.

Example:

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text
A
C
B
```

The Promise callback runs after the current synchronous code completes.

---

# 57. Async/Await and Microtasks

Example:

```js
async function test() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

console.log("C");

test();

console.log("D");
```

Output:

```text
C
A
D
B
```

The continuation after `await` runs asynchronously.

---

# 58. Top-Level Await

In JavaScript modules, `await` can be used at the top level.

Example:

```js
const response = await fetch(
  "/api/projects"
);

const projects = await response.json();

console.log(projects);
```

This is called:

```text
top-level await
```

It is supported in modern JavaScript module environments.

---

# 59. Top-Level Await and Modules

Top-level `await` is especially relevant to:

* ES modules
* Node.js modules
* modern bundlers
* server-side JavaScript
* framework build systems

Its use should still be deliberate because module evaluation can depend on asynchronous completion.

---

# 60. React Relevance

Promise and async features are highly relevant to React.

You will use them for:

```text
API requests
form submission
authentication
database requests
loading data
mutations
file uploads
search
pagination
```

Typical patterns include:

```js
async function loadData() {
  const response = await fetch("/api/data");
  return response.json();
}
```

and:

```js
useEffect(() => {
  // asynchronous work
}, []);
```

However, React itself does not change how JavaScript Promises work.

The JavaScript rules remain the same.

---

# 61. Next.js Relevance

These features are particularly important in Next.js.

You may use asynchronous code for:

```text
Server Components
Route Handlers
Server Actions
database access
Supabase queries
API requests
data fetching
authentication
```

For example, server-side code can naturally use:

```js
const { data } = await supabase
  .from("projects")
  .select("*");
```

The underlying concept is still Promise-based asynchronous JavaScript.

---

# 62. Supabase Relevance

When interacting with Supabase:

```js
const { data, error } = await supabase
  .from("projects")
  .select("*");
```

the operation is asynchronous.

You need to understand:

```text
Promise
↓
await
↓
result
```

You also need to handle failures:

```js
if (error) {
  throw error;
}
```

Understanding Promise behavior is therefore directly useful when building a Next.js + Supabase application.

---

# 63. Choosing the Correct Tool

Use:

```text
Promise.all()
```

when:

```text
all operations must succeed
```

Use:

```text
Promise.allSettled()
```

when:

```text
you need the result of every operation
even if some fail
```

Use:

```text
Promise.race()
```

when:

```text
the first settlement should determine the result
```

Use:

```text
Promise.any()
```

when:

```text
the first successful operation should determine the result
```

Use:

```text
AbortController
```

when:

```text
an abortable operation should be cancelled
```

Use:

```text
for await...of
```

when:

```text
consuming an async iterable
```

Use:

```text
Promise.withResolvers()
```

when:

```text
Promise settlement needs to be controlled
outside the Promise creation scope
```

---

# 64. Common Mistake: Sequential Operations That Could Be Concurrent

Avoid:

```js
const user = await loadUser();
const projects = await loadProjects();
const skills = await loadSkills();
```

if these operations are completely independent.

Prefer:

```js
const [user, projects, skills] =
  await Promise.all([
    loadUser(),
    loadProjects(),
    loadSkills(),
  ]);
```

when all operations can safely execute concurrently.

---

# 65. Common Mistake: Concurrent Operations That Must Be Sequential

Do not use:

```js
await Promise.all([
  createUser(),
  createUserProfile(),
]);
```

if the profile creation requires the user's ID from the first operation.

Instead:

```js
const user = await createUser();

const profile = await createUserProfile(
  user.id
);
```

Concurrency is useful only when dependencies allow it.

---

# 66. Common Mistake: Using Promise.race() for First Success

This:

```js
await Promise.race([
  requestA(),
  requestB(),
]);
```

does not mean:

```text
"Give me the first successful request."
```

It means:

```text
"Give me the first request to settle."
```

For first success:

```js
await Promise.any([
  requestA(),
  requestB(),
]);
```

---

# 67. Common Mistake: Assuming AbortController Cancels Everything

This:

```js
controller.abort();
```

does not magically terminate every asynchronous operation in your application.

The underlying API must support the signal.

---

# 68. Common Mistake: Ignoring Cleanup

Long-running asynchronous work can continue after it is no longer needed.

In React, consider cancellation or cleanup when appropriate.

Example:

```js
useEffect(() => {
  const controller = new AbortController();

  loadData(controller.signal);

  return () => {
    controller.abort();
  };
}, []);
```

---

# 69. Common Mistake: Ignoring HTTP Status

This:

```js
const response = await fetch("/api/data");
```

does not guarantee:

```text
HTTP 200
```

Always consider:

```js
if (!response.ok) {
  throw new Error(
    `Request failed: ${response.status}`
  );
}
```

when your application requires successful HTTP responses.

---

# 70. Common Mistake: Starting Too Much Work

Avoid blindly doing:

```js
await Promise.all(
  thousandsOfItems.map(process)
);
```

when the operation is expensive or externally rate-limited.

Consider:

```text
batching
pagination
concurrency limits
queues
backpressure
```

---

# 71. Best Practices

## 1. Understand dependencies

Ask:

```text
Can these operations run independently?
```

If yes, concurrency may be appropriate.

---

## 2. Use the correct Promise combinator

Choose intentionally:

```text
all
allSettled
race
any
```

---

## 3. Handle errors at the correct boundary

Do not blindly catch every error.

Handle an error where you can actually make a useful decision.

---

## 4. Cancel work when appropriate

Use:

```text
AbortController
AbortSignal
```

for APIs that support cancellation.

---

## 5. Do not confuse cancellation with failure

An intentionally aborted request is not necessarily an application error.

---

## 6. Avoid unnecessary sequential awaits

Independent operations can often be concurrent.

---

## 7. Avoid uncontrolled concurrency

Large collections may require concurrency limits.

---

## 8. Validate HTTP responses

With `fetch()`:

```js
if (!response.ok) {
  throw new Error(
    `HTTP ${response.status}`
  );
}
```

---

## 9. Prefer readable asynchronous code

Usually:

```js
const data = await loadData();
```

is easier to reason about than deeply nested Promise chains.

---

## 10. Understand the underlying API

Not every asynchronous operation is cancellable.

Not every failure is retryable.

Not every task should run concurrently.

---

# 72. Quick Reference

### All must succeed

```js
await Promise.all([
  taskA(),
  taskB(),
]);
```

### Wait for every result

```js
await Promise.allSettled([
  taskA(),
  taskB(),
]);
```

### First settlement

```js
await Promise.race([
  taskA(),
  taskB(),
]);
```

### First fulfillment

```js
await Promise.any([
  taskA(),
  taskB(),
]);
```

### Promise + external settlement

```js
const {
  promise,
  resolve,
  reject,
} = Promise.withResolvers();
```

### Abort a request

```js
const controller = new AbortController();

fetch(url, {
  signal: controller.signal,
});

controller.abort();
```

### Timeout

```js
fetch(url, {
  signal: AbortSignal.timeout(5000),
});
```

### Multiple abort sources

```js
const signal = AbortSignal.any([
  controller.signal,
  AbortSignal.timeout(5000),
]);
```

### Sequential async loop

```js
for (const item of items) {
  await process(item);
}
```

### Concurrent async operations

```js
await Promise.all(
  items.map(process)
);
```

### Async iterable

```js
for await (const value of iterable) {
  console.log(value);
}
```

### Async generator

```js
async function* values() {
  yield 1;
  yield 2;
}
```

---

# 73. Promise Feature Decision Tree

When working with multiple asynchronous operations, ask:

```text
Do I need every operation to succeed?
        │
       Yes
        ↓
   Promise.all()


Do I need to know the result of every operation,
even if some fail?
        │
       Yes
        ↓
Promise.allSettled()


Do I want whichever operation settles first?
        │
       Yes
        ↓
  Promise.race()


Do I want whichever operation succeeds first?
        │
       Yes
        ↓
  Promise.any()
```

For cancellation:

```text
Can the underlying API accept AbortSignal?
        │
       Yes
        ↓
AbortController / AbortSignal
```

For asynchronous streams:

```text
Does the source produce values asynchronously?
        │
       Yes
        ↓
for await...of
```

---

# 74. Promise Combinators Mental Model

Think of four competitors:

```text
Promise.all()
→ Everyone must win.

Promise.allSettled()
→ Tell me everyone's result.

Promise.race()
→ Whoever finishes first wins.

Promise.any()
→ Whoever succeeds first wins.
```

This mental model makes the differences easier to remember.

---

# 75. Async Cancellation Mental Model

Think of:

```text
Operation
    ↓
AbortSignal
    ↓
"Stop if requested"
```

The important point is that the operation must understand the signal.

`AbortController` is a communication mechanism for cancellation, not a universal force that kills arbitrary JavaScript execution.

---

# 76. Async Iteration Mental Model

Normal iteration:

```text
value
 ↓
next value
 ↓
next value
```

Async iteration:

```text
Promise<value>
 ↓
Promise<next value>
 ↓
Promise<next value>
```

That is why:

```js
for await...of
```

exists.

It allows asynchronous values to be consumed using a familiar loop structure.

---

# 77. Modern Async Architecture

A real application may combine several features:

```text
User action
    ↓
start request
    ↓
AbortSignal
    ↓
fetch()
    ↓
Promise
    ↓
response validation
    ↓
JSON parsing
    ↓
application data
    ↓
React state / UI
```

For multiple independent requests:

```text
             ┌── request A ──┐
             │               │
User action ─┼── request B ──┼── Promise.all()
             │               │
             └── request C ──┘
```

For fallback services:

```text
Service A ──┐
            ├── Promise.any()
Service B ──┤
            │
Service C ──┘
```

For cancellation:

```text
User leaves page
       ↓
cleanup
       ↓
controller.abort()
       ↓
request cancelled
```

---

# 78. Relationship to Earlier Async Files

This file should be understood as an extension of the earlier async topics.

The learning progression is:

```text
Callbacks
   ↓
Promises
   ↓
async / await
   ↓
Error handling
   ↓
Modern Promise features
   ↓
Cancellation
   ↓
Async iteration
   ↓
Advanced concurrency patterns
```

The earlier files explain **how asynchronous JavaScript works**.

This file focuses more on **how to control and organize asynchronous work in modern applications**.

---

# 79. React and Next.js Priority

For React and Next.js development, prioritize these topics:

### High priority

```text
Promise.all()
Promise.allSettled()
async / await
fetch()
AbortController
AbortSignal
error handling
concurrent vs sequential operations
```

### Medium priority

```text
Promise.race()
Promise.any()
for await...of
async generators
```

### Advanced

```text
Promise.withResolvers()
custom async iterables
concurrency limiting
retry strategies
exponential backoff
```

You do not need to use every advanced feature in every project.

Understanding when they are appropriate is more important.

---

# 80. Final Key Takeaways

1. Promises are the foundation of modern asynchronous JavaScript.
2. `async` functions always return Promises.
3. `await` pauses the current async function without blocking the JavaScript thread.
4. `Promise.all()` is for operations that all need to succeed.
5. `Promise.allSettled()` waits for every operation regardless of success or failure.
6. `Promise.race()` settles with the first settled operation.
7. `Promise.any()` fulfills with the first successful operation.
8. `Promise.any()` rejects with `AggregateError` when every input rejects.
9. `Promise.all()` does not automatically cancel remaining operations.
10. `AbortController` provides a standard cancellation signal for APIs that support it.
11. `AbortSignal.timeout()` provides a convenient timeout signal.
12. `AbortSignal.any()` combines multiple cancellation conditions.
13. `AbortController` cannot automatically cancel arbitrary Promises.
14. Independent asynchronous operations can often run concurrently.
15. Dependent operations must remain sequential.
16. `forEach()` does not await asynchronous callbacks.
17. `for...of` with `await` is useful for sequential asynchronous processing.
18. `for await...of` consumes asynchronous iterables.
19. Async generators produce values asynchronously.
20. Async iteration is useful for streaming and incremental data.
21. `Promise.withResolvers()` separates Promise creation from its settlement functions.
22. `fetch()` does not reject solely because the HTTP status is `4xx` or `5xx`.
23. Cancellation and failure are different concepts.
24. Large numbers of concurrent operations may require concurrency limiting.
25. Retry logic should distinguish transient failures from permanent failures.
26. Exponential backoff is useful for controlled retries.
27. Promise combinators solve different concurrency problems.
28. These concepts are directly relevant to React and Next.js data fetching.
29. Understanding the JavaScript asynchronous model is more important than memorizing APIs.
30. Good asynchronous code is based on explicit decisions about concurrency, cancellation, failure, and dependencies.

---

# Final Mental Model

Modern asynchronous JavaScript can be understood through five questions:

```text
1. What asynchronous operation am I running?

2. Can operations run concurrently?

3. What should happen if one operation fails?

4. Can the operation be cancelled?

5. Am I consuming one final result
   or a stream of asynchronous values?
```

Then choose the appropriate tool:

```text
Concurrent independent tasks
→ Promise.all()

Independent tasks with partial success
→ Promise.allSettled()

First settlement
→ Promise.race()

First successful result
→ Promise.any()

Cancellation
→ AbortController / AbortSignal

Timeout
→ AbortSignal.timeout()

Multiple cancellation sources
→ AbortSignal.any()

Async streams
→ for await...of

Async value production
→ async generators

External Promise settlement
→ Promise.withResolvers()
```

The goal is not to use the newest API simply because it exists.

The goal is to understand the asynchronous problem first, then choose the simplest mechanism that correctly solves it.
