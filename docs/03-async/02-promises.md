# JavaScript Promises

Promises are one of the most important features of modern asynchronous JavaScript.

A Promise represents the **eventual result of an asynchronous operation**.

Promises provide a structured way to work with operations that may:

* Complete successfully.
* Fail.
* Take some time to complete.
* Produce a value in the future.

Promises are fundamental to:

* `fetch()`
* APIs
* React applications
* Next.js
* Node.js
* Database operations
* Authentication
* File operations
* `async/await`

---

# 1. The Problem Promises Solve

Before Promises, asynchronous JavaScript commonly relied on callbacks.

A simple callback can work well:

```js
loadData((data) => {
  console.log(data);
});
```

But complex asynchronous operations can become deeply nested:

```js
loadUser((user) => {
  loadPosts(user, (posts) => {
    loadComments(posts, (comments) => {
      console.log(comments);
    });
  });
});
```

This can lead to:

* Difficult-to-read code.
* Difficult error handling.
* Deep nesting.
* Difficult composition.
* Harder maintenance.

Promises provide another way to represent the result of an asynchronous operation.

---

# 2. What Is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

Think of it as a container for a value that may be available now or later.

Conceptually:

```text
Promise
   |
   ├── Pending
   |
   ├── Fulfilled → Result
   |
   └── Rejected → Error
```

Example:

```js
const promise = fetch("/api/users");
```

The `fetch()` function returns a Promise.

The response is not necessarily available immediately.

Instead, JavaScript gives you a Promise representing the future result.

---

# 3. The Three Promise States

Every Promise has one of three states:

### 1. Pending

The operation has not finished yet.

```text
Pending
```

### 2. Fulfilled

The operation completed successfully.

```text
Fulfilled
```

A fulfilled Promise has a resulting value.

### 3. Rejected

The operation failed.

```text
Rejected
```

A rejected Promise has a rejection reason, commonly an `Error`.

---

# 4. Promise State Transition

A Promise starts as:

```text
Pending
```

Then it can transition to either:

```text
Pending
   ↓
Fulfilled
```

or:

```text
Pending
   ↓
Rejected
```

Once a Promise becomes fulfilled or rejected, it is **settled**.

A Promise cannot transition back to `pending`.

It also cannot change from fulfilled to rejected or from rejected to fulfilled.

---

# 5. Creating a Promise

You can create a Promise using the `Promise` constructor.

```js
const promise = new Promise((resolve, reject) => {
  // asynchronous operation
});
```

The constructor receives a function called the **executor function**.

The executor receives two functions:

```text
resolve
reject
```

---

# 6. `resolve()`

Call `resolve()` when the operation succeeds.

```js
const promise = new Promise((resolve, reject) => {
  resolve("Success");
});
```

The Promise becomes:

```text
Pending
   ↓
Fulfilled
```

with:

```text
"Success"
```

as its result.

---

# 7. `reject()`

Call `reject()` when the operation fails.

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error("Something went wrong"));
});
```

The Promise becomes:

```text
Pending
   ↓
Rejected
```

The rejection reason is the `Error` object.

---

# 8. A Complete Promise Example

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation completed");
  } else {
    reject(new Error("Operation failed"));
  }
});
```

The Promise now represents one of two possible outcomes:

```text
Success → resolve()
Failure → reject()
```

But creating the Promise does not automatically display its result.

You need to consume the Promise.

---

# 9. Consuming a Promise with `.then()`

The `.then()` method is used to handle a fulfilled Promise.

```js
const promise = new Promise((resolve) => {
  resolve("Hello, Osama Abu Motlaq");
});

promise.then((result) => {
  console.log(result);
});
```

Output:

```text
Hello, Osama Abu Motlaq
```

The function passed to `.then()` runs when the Promise is fulfilled.

---

# 10. `.catch()`

The `.catch()` method handles rejected Promises.

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error("Operation failed"));
});

promise.catch((error) => {
  console.error(error.message);
});
```

Output:

```text
Operation failed
```

A common pattern is:

```js
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

---

# 11. `.finally()`

The `.finally()` method runs after the Promise settles, regardless of whether it was fulfilled or rejected.

```js
const promise = new Promise((resolve) => {
  resolve("Done");
});

promise
  .then((result) => {
    console.log(result);
  })
  .finally(() => {
    console.log("Finished");
  });
```

Output:

```text
Done
Finished
```

If the Promise rejects, `finally()` still runs.

```js
Promise.reject(new Error("Failed"))
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Finished");
  });
```

---

# 12. Promise Chaining

One of the biggest advantages of Promises is **chaining**.

Example:

```js
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then((number) => {
    return number + 5;
  })
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
25
```

The flow is:

```text
10
 ↓
× 2
 ↓
20
 ↓
+ 5
 ↓
25
```

---

# 13. Why `.then()` Can Be Chained

Every `.then()` returns a new Promise.

For example:

```js
const promise = Promise.resolve(10);

const nextPromise = promise.then((number) => {
  return number * 2;
});
```

`nextPromise` is another Promise.

This allows:

```js
promise
  .then(...)
  .then(...)
  .then(...);
```

---

# 14. Returning a Normal Value from `.then()`

If a `.then()` callback returns a normal value:

```js
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then((result) => {
    console.log(result);
  });
```

The returned value becomes the fulfillment value of the next Promise.

Conceptually:

```text
Promise<10>
    ↓
then()
    ↓
20
    ↓
next Promise<20>
```

---

# 15. Returning Another Promise

A `.then()` callback can return another Promise.

```js
Promise.resolve(10)
  .then((number) => {
    return Promise.resolve(number * 2);
  })
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
20
```

The Promise chain waits for the returned Promise to settle.

This is extremely important when chaining asynchronous operations.

---

# 16. Chaining Asynchronous Operations

Consider:

```js
function getUser() {
  return Promise.resolve({
    id: 1,
    name: "Osama Abu Motlaq"
  });
}

function getPosts(userId) {
  return Promise.resolve([
    "Post 1",
    "Post 2"
  ]);
}
```

We can chain them:

```js
getUser()
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.error(error);
  });
```

The second operation depends on the result of the first.

---

# 17. Promise Rejection

A Promise can reject:

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error("Request failed"));
});
```

Handle the rejection:

```js
promise.catch((error) => {
  console.error(error.message);
});
```

A rejected Promise should normally have an appropriate rejection handler.

---

# 18. Error Propagation

Errors can move through a Promise chain.

```js
Promise.resolve()
  .then(() => {
    throw new Error("Something went wrong");
  })
  .then(() => {
    console.log("This does not run");
  })
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
Something went wrong
```

The thrown error causes the current Promise to reject.

The rejection travels down the chain until a suitable rejection handler handles it.

---

# 19. Throwing Inside `.then()`

This:

```js
Promise.resolve()
  .then(() => {
    throw new Error("Failed");
  })
  .catch((error) => {
    console.error(error.message);
  });
```

is conceptually similar to:

```text
then()
  ↓
throw error
  ↓
Promise becomes rejected
  ↓
catch()
  ↓
handle error
```

This is one reason Promise chains have structured error propagation.

---

# 20. `.catch()` Can Handle Earlier Errors

Consider:

```js
Promise.resolve()
  .then(() => {
    throw new Error("Step 1 failed");
  })
  .then(() => {
    console.log("Step 2");
  })
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
Step 1 failed
```

The error skips the next fulfillment handler and reaches `.catch()`.

---

# 21. Recovering from an Error

A `.catch()` handler can return a value.

```js
Promise.reject(new Error("Failed"))
  .catch(() => {
    return "Fallback value";
  })
  .then((value) => {
    console.log(value);
  });
```

Output:

```text
Fallback value
```

The chain continues because the `.catch()` callback returned a normal value.

Conceptually:

```text
Rejected Promise
      ↓
catch()
      ↓
Fallback value
      ↓
Fulfilled Promise
```

---

# 22. `Promise.resolve()`

`Promise.resolve()` creates an already fulfilled Promise.

```js
const promise = Promise.resolve("Success");

promise.then((value) => {
  console.log(value);
});
```

Output:

```text
Success
```

It is useful when you need a Promise representation of an already-known value.

---

# 23. `Promise.reject()`

`Promise.reject()` creates an already rejected Promise.

```js
const promise = Promise.reject(
  new Error("Something went wrong")
);

promise.catch((error) => {
  console.error(error.message);
});
```

Output:

```text
Something went wrong
```

---

# 24. Promise Callbacks Run Asynchronously

Even an already fulfilled Promise runs `.then()` handlers asynchronously.

Example:

```js
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Output:

```text
Start
End
Promise
```

The `.then()` callback does not execute in the middle of the current synchronous code.

Promise reactions are scheduled to run after the current synchronous execution completes.

---

# 25. Promise vs `setTimeout()`

Consider:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Typical output:

```text
Start
End
Promise
Timer
```

The Promise reaction uses the **microtask queue**, while the timer callback is handled through the task/macrotask scheduling mechanism.

A simplified model is:

```text
Synchronous code
      ↓
Microtasks
      ↓
Tasks such as timers
```

This distinction becomes important when debugging asynchronous execution order.

---

# 26. Promises and `fetch()`

`fetch()` is one of the most common Promise-based APIs.

```js
fetch("/api/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

The flow is:

```text
fetch()
   ↓
Promise<Response>
   ↓
response.json()
   ↓
Promise<Data>
   ↓
data
```

This pattern is fundamental to frontend development.

---

# 27. Important: `fetch()` and HTTP Errors

A common mistake is assuming that `fetch()` rejects for every HTTP error.

For example, a response with:

```text
404 Not Found
```

does not normally cause `fetch()` itself to reject.

The network request can succeed while the HTTP response indicates an unsuccessful status.

You should check:

```js
fetch("/api/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

This distinction is important when working with APIs.

---

# 28. Sequential Promise Operations

Suppose operation B depends on operation A.

You can chain them:

```js
getUser()
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    return getComments(posts[0]);
  })
  .then((comments) => {
    console.log(comments);
  });
```

The sequence is:

```text
getUser()
   ↓
getPosts()
   ↓
getComments()
```

Each step waits for the previous Promise to settle successfully.

---

# 29. `Promise.all()`

`Promise.all()` is used when you need to wait for multiple Promises.

Example:

```js
const promise1 = Promise.resolve("A");
const promise2 = Promise.resolve("B");
const promise3 = Promise.resolve("C");

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
  });
```

Output:

```text
["A", "B", "C"]
```

The result array preserves the order of the input Promises.

---

# 30. `Promise.all()` Runs Operations Concurrently

Consider independent operations:

```js
const usersPromise = fetch("/api/users");
const postsPromise = fetch("/api/posts");

Promise.all([usersPromise, postsPromise])
  .then(([usersResponse, postsResponse]) => {
    console.log(usersResponse);
    console.log(postsResponse);
  });
```

Both requests can be started without waiting for the first one to finish before starting the second.

This can be significantly faster than unnecessarily performing independent operations sequentially.

---

# 31. `Promise.all()` Rejects if One Rejects

Consider:

```js
const promise1 = Promise.resolve("A");
const promise2 = Promise.reject(new Error("Failed"));
const promise3 = Promise.resolve("C");

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

Output:

```text
Failed
```

`Promise.all()` rejects when any input Promise rejects.

It does not return the successful results through the fulfillment handler.

---

# 32. `Promise.all()` Mental Model

Use `Promise.all()` when:

> I need all these independent operations to succeed.

Conceptually:

```text
Promise A ──┐
Promise B ──┼──→ Promise.all() → Results
Promise C ──┘
```

If one rejects:

```text
Promise A ──┐
Promise B ──┼──→ Promise.all() → Rejected
Promise C ──┘
```

---

# 33. `Promise.allSettled()`

`Promise.allSettled()` waits for all Promises to settle.

It does not reject simply because one Promise failed.

Example:

```js
const promise1 = Promise.resolve("A");
const promise2 = Promise.reject(new Error("Failed"));
const promise3 = Promise.resolve("C");

Promise.allSettled([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
  });
```

The result contains information about every Promise.

Conceptually:

```js
[
  { status: "fulfilled", value: "A" },
  { status: "rejected", reason: Error },
  { status: "fulfilled", value: "C" }
]
```

---

# 34. When to Use `Promise.allSettled()`

Use it when:

> I want the result of every operation, whether it succeeds or fails.

For example:

```text
Upload file A → Success
Upload file B → Failed
Upload file C → Success
```

You may want to know all three outcomes instead of stopping because one failed.

---

# 35. `Promise.race()`

`Promise.race()` settles as soon as the first input Promise settles.

Example:

```js
const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve("First"), 1000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => resolve("Second"), 2000);
});

Promise.race([promise1, promise2])
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
First
```

The first Promise to settle determines the result.

---

# 36. `Promise.race()` Can Reject First

`Promise.race()` does not mean:

> first successful Promise.

It means:

> first Promise to settle, whether fulfilled or rejected.

Example:

```js
const fastFailure = Promise.reject(
  new Error("Failed quickly")
);

const slowSuccess = new Promise((resolve) => {
  setTimeout(() => resolve("Success"), 1000);
});

Promise.race([fastFailure, slowSuccess])
  .catch((error) => {
    console.error(error.message);
  });
```

The rejection wins because it settled first.

---

# 37. `Promise.any()`

`Promise.any()` waits for the first **fulfilled** Promise.

Example:

```js
const promise1 = Promise.reject(new Error("Failed"));
const promise2 = Promise.resolve("Success");
const promise3 = Promise.resolve("Another success");

Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
  });
```

Output:

```text
Success
```

A rejected Promise does not determine the result if another Promise eventually fulfills.

---

# 38. `Promise.any()` and Complete Failure

If every Promise rejects:

```js
Promise.any([
  Promise.reject(new Error("A")),
  Promise.reject(new Error("B"))
])
  .catch((error) => {
    console.log(error.name);
  });
```

The rejection is an:

```text
AggregateError
```

because all candidates failed.

---

# 39. Promise Combinators Comparison

| Method                 | Fulfills When           | Rejects When                               |
| ---------------------- | ----------------------- | ------------------------------------------ |
| `Promise.all()`        | All fulfill             | Any rejects                                |
| `Promise.allSettled()` | All settle              | Does not reject because of input rejection |
| `Promise.race()`       | First settles fulfilled | First settles rejected                     |
| `Promise.any()`        | First fulfills          | All reject                                 |

A useful mental model:

```text
all
→ Everyone must succeed

allSettled
→ Tell me everyone's result

race
→ Give me the first result of any kind

any
→ Give me the first successful result
```

---

# 40. Promise Chaining vs Nested Callbacks

Callback style:

```js
getUser((user) => {
  getPosts(user.id, (posts) => {
    getComments(posts, (comments) => {
      console.log(comments);
    });
  });
});
```

Promise style:

```js
getUser()
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    return getComments(posts);
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.error(error);
  });
```

The Promise version can flatten the control flow and centralize error handling.

---

# 41. Promise Flattening

Consider:

```js
function getUser() {
  return Promise.resolve({
    id: 1,
    name: "Osama Abu Motlaq"
  });
}

getUser()
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
  });
```

Returning the Promise from `.then()` allows the next `.then()` to receive its resolved value.

This is called Promise chaining/assimilation and is central to composing asynchronous operations.

---

# 42. Do Not Create Promises Unnecessarily

A common mistake is wrapping an existing Promise inside another Promise without a reason.

Avoid:

```js
function getData() {
  return new Promise((resolve, reject) => {
    fetch("/api/data")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
```

Prefer:

```js
function getData() {
  return fetch("/api/data");
}
```

If additional processing is required:

```js
function getData() {
  return fetch("/api/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    });
}
```

Do not add an unnecessary Promise wrapper around an existing Promise.

---

# 43. Promise Executor Runs Immediately

Consider:

```js
console.log("Start");

const promise = new Promise((resolve) => {
  console.log("Executor");
  resolve();
});

console.log("End");
```

Output:

```text
Start
Executor
End
```

The Promise executor runs synchronously when the Promise is created.

However, `.then()` handlers run asynchronously.

This distinction is important.

---

# 44. Promise Creation vs Promise Reaction

Consider:

```js
console.log("Start");

const promise = new Promise((resolve) => {
  console.log("Executor");
  resolve("Done");
});

promise.then((value) => {
  console.log(value);
});

console.log("End");
```

Output:

```text
Start
Executor
End
Done
```

The sequence is:

```text
Create Promise
    ↓
Executor runs immediately
    ↓
Promise becomes fulfilled
    ↓
.then() reaction is scheduled
    ↓
Current synchronous code finishes
    ↓
.then() callback executes
```

---

# 45. Promise Immutability of State

Once a Promise settles, its state cannot change.

Example:

```js
const promise = new Promise((resolve, reject) => {
  resolve("First");

  reject(new Error("Second"));
});
```

The rejection does not replace the earlier fulfillment.

The Promise remains fulfilled with:

```text
First
```

The first settlement wins.

---

# 46. A Promise Can Be Consumed Multiple Times

A Promise can have multiple `.then()` handlers.

```js
const promise = Promise.resolve("Hello");

promise.then((value) => {
  console.log("A:", value);
});

promise.then((value) => {
  console.log("B:", value);
});
```

Output:

```text
A: Hello
B: Hello
```

The Promise represents one eventual result that multiple consumers can observe.

This differs from calling a function that starts a new operation every time.

---

# 47. Promise vs Function

Do not confuse:

```js
getData
```

with:

```js
getData()
```

and:

```js
getData()
  .then(...)
```

The first is a function reference.

The second calls the function.

If the function returns a Promise, the third expression consumes that Promise.

---

# 48. Promises and Closures

Promise callbacks can form closures.

Example:

```js
function loadUser() {
  const name = "Osama Abu Motlaq";

  return Promise.resolve().then(() => {
    return name;
  });
}

loadUser().then((name) => {
  console.log(name);
});
```

The callback retains access to `name` through lexical scoping and closure.

This connects asynchronous programming with the concepts from the previous `scope-closures.md` file.

---

# 49. Promises in React

Promises are heavily used in React applications.

Common examples include:

```js
fetch("/api/products")
```

and:

```js
fetch("/api/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

They are used for:

* API requests.
* Authentication.
* Database requests through APIs.
* File uploads.
* Async operations.

You will often encounter Promises when working with:

* `useEffect`.
* Event handlers.
* Custom hooks.
* Data-fetching libraries.

Understanding Promises is therefore essential for React development.

---

# 50. Promises in Next.js and Node.js

Promises are equally important in Next.js and Node.js.

Examples include:

* Database queries.
* API requests.
* File operations.
* Authentication.
* Server-side data fetching.
* External services.

Modern JavaScript backend APIs are heavily Promise-based.

This is why understanding Promises before learning backend development is important.

---

# 51. Common Mistake: Forgetting to Return a Promise

Incorrect:

```js
getUser()
  .then((user) => {
    getPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
  });
```

The first `.then()` does not return the Promise from `getPosts()`.

Correct:

```js
getUser()
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
  });
```

Without `return`, the next `.then()` does not wait for `getPosts()`.

---

# 52. Common Mistake: Confusing `then()` With Immediate Execution

This:

```js
promise.then(() => {
  console.log("Done");
});
```

does not mean:

> Execute this callback immediately.

It means:

> Register this function to run when the Promise fulfills.

---

# 53. Common Mistake: Assuming `Promise.all()` Is Sequential

This:

```js
Promise.all([
  fetch("/api/users"),
  fetch("/api/posts")
]);
```

is designed to coordinate multiple Promises.

The operations can be started independently.

If the operations do not depend on each other, starting them together is usually preferable to unnecessary sequential waiting.

---

# 54. Common Mistake: Using `Promise.all()` for Dependent Operations

If operation B requires the result of operation A:

```text
A
↓
B
```

then you should normally chain them:

```js
getUser()
  .then((user) => {
    return getPosts(user.id);
  });
```

Do not use `Promise.all()` simply because it exists.

Use it when operations can logically proceed independently.

---

# 55. Common Mistake: Ignoring Rejections

Bad:

```js
fetch("/api/data")
  .then((response) => response.json());
```

If the Promise rejects and nothing handles it appropriately, you can end up with an unhandled rejection.

Prefer:

```js
fetch("/api/data")
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  });
```

Or use `async/await` with `try/catch`.

---

# 56. Common Mistake: Assuming `fetch()` Rejects on `404`

Remember:

```text
404
```

is an HTTP response.

It does not necessarily mean the `fetch()` Promise itself rejects.

Check:

```js
response.ok
```

when appropriate.

---

# 57. Common Mistake: Overusing Promise Combinators

Do not use:

```js
Promise.all()
```

or:

```js
Promise.race()
```

without understanding the relationship between the operations.

Choose the combinator based on the required behavior.

---

# 58. Best Practices

### 1. Return Promises from `.then()`

When the next step depends on an asynchronous operation:

```js
.then(() => {
  return someAsyncOperation();
})
```

---

### 2. Handle Errors

Use:

```js
.catch(...)
```

or:

```js
try/catch
```

with `async/await`.

---

### 3. Keep Chains Readable

Prefer:

```js
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error));
```

over deeply nested callback structures.

---

### 4. Use `Promise.all()` for Independent Operations

If several operations can run independently:

```js
Promise.all([
  loadUsers(),
  loadPosts(),
  loadProducts()
]);
```

This can avoid unnecessary sequential waiting.

---

### 5. Use `Promise.allSettled()` When Every Outcome Matters

Use it when failures should not prevent you from receiving the results of other operations.

---

### 6. Check HTTP Responses with `fetch()`

Use:

```js
if (!response.ok) {
  throw new Error(...);
}
```

when HTTP status errors should be treated as application errors.

---

### 7. Avoid Unnecessary Promise Wrappers

If an API already returns a Promise, normally return it directly.

---

# 59. Quick Reference

| Method / Concept       | Purpose                             |
| ---------------------- | ----------------------------------- |
| `new Promise()`        | Create a Promise                    |
| `resolve()`            | Fulfill a Promise                   |
| `reject()`             | Reject a Promise                    |
| `.then()`              | Handle fulfillment                  |
| `.catch()`             | Handle rejection                    |
| `.finally()`           | Run after settlement                |
| `Promise.resolve()`    | Create fulfilled Promise            |
| `Promise.reject()`     | Create rejected Promise             |
| `Promise.all()`        | Wait for all; reject if one rejects |
| `Promise.allSettled()` | Wait for every Promise to settle    |
| `Promise.race()`       | First settled Promise wins          |
| `Promise.any()`        | First fulfilled Promise wins        |

---

# 60. Promise States Quick Reference

```text
                 ┌───────────────┐
                 │    Pending    │
                 └───────┬───────┘
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
       ┌──────────────┐      ┌──────────────┐
       │  Fulfilled   │      │   Rejected   │
       └──────────────┘      └──────────────┘
              │                     │
            value                  reason
```

A Promise can settle only once.

---

# 61. Promise Chain Mental Model

Think of:

```js
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => processPosts(posts))
  .catch((error) => handleError(error));
```

as:

```text
getUser()
    ↓
Promise<User>
    ↓
then()
    ↓
getPosts()
    ↓
Promise<Posts>
    ↓
then()
    ↓
processPosts()
    ↓
catch() if something rejects
```

Each `.then()` creates another Promise and allows the asynchronous flow to continue.

---

# 62. Promise Combinators Mental Model

### `Promise.all()`

```text
A ──┐
B ──┼──→ All must fulfill
C ──┘
```

### `Promise.allSettled()`

```text
A ──┐
B ──┼──→ Wait for everyone
C ──┘
```

### `Promise.race()`

```text
A ──┐
B ──┼──→ First to settle wins
C ──┘
```

### `Promise.any()`

```text
A ──┐
B ──┼──→ First fulfillment wins
C ──┘
```

---

# 63. Callbacks → Promises

The evolution can be understood as:

```text
Callbacks
    ↓
Nested asynchronous callbacks
    ↓
Callback Hell
    ↓
Promises
    ↓
Promise chaining
    ↓
Async / Await
```

Promises did not eliminate callbacks internally.

Promise handlers such as:

```js
.then(() => {})
```

are still functions that execute later.

Promises provide a better abstraction for representing and composing asynchronous results.

---

# 64. Key Takeaways

1. A Promise represents the eventual result of an asynchronous operation.
2. A Promise has three states: `pending`, `fulfilled`, and `rejected`.
3. A Promise can settle only once.
4. `resolve()` fulfills a Promise.
5. `reject()` rejects a Promise.
6. `.then()` handles fulfillment.
7. `.catch()` handles rejection.
8. `.finally()` runs after settlement.
9. `.then()` returns a new Promise, enabling chaining.
10. Returning a Promise from `.then()` allows the next step to wait for it.
11. Promise errors propagate through the chain.
12. `Promise.all()` is useful for independent operations that all need to succeed.
13. `Promise.allSettled()` provides the outcome of every operation.
14. `Promise.race()` uses the first Promise to settle.
15. `Promise.any()` uses the first Promise to fulfill.
16. Promise `.then()` callbacks execute asynchronously.
17. The Promise executor itself runs synchronously when the Promise is created.
18. `fetch()` returns a Promise.
19. `fetch()` does not normally reject merely because an HTTP response has a `4xx` or `5xx` status.
20. Promises are fundamental to React, Next.js, Node.js, APIs, and database operations.
21. Understanding Promises is essential before learning `async/await`.

---

# Final Mental Model

When you see:

```js
someAsyncOperation()
  .then((result) => {
    return anotherAsyncOperation(result);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

Think:

```text
Start asynchronous operation
          ↓
       Promise
          ↓
       .then()
          ↓
  Process successful result
          ↓
 Return another Promise
          ↓
       .then()
          ↓
  Process next result
          ↓
       .catch()
          ↓
 Handle any rejection
```

The central idea is:

> **A Promise is a representation of an asynchronous result that will eventually either succeed or fail.**

Once this mental model is clear, `async/await` becomes much easier to understand because `async/await` is built on top of Promises.
