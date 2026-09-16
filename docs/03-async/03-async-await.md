# Async/Await

`async/await` is modern JavaScript syntax for working with asynchronous operations.

It is built on top of **Promises** and provides a syntax that makes asynchronous code easier to read and reason about.

Instead of writing:

```js
getUser()
  .then((user) => {
    return getProjects(user.id);
  })
  .then((projects) => {
    console.log(projects);
  })
  .catch((error) => {
    console.error(error);
  });
```

You can write:

```js
async function loadData() {
  try {
    const user = await getUser();
    const projects = await getProjects(user.id);

    console.log(projects);
  } catch (error) {
    console.error(error);
  }
}
```

The second version often looks closer to normal synchronous code.

However, `async/await` does **not** make asynchronous operations synchronous.

It is still Promise-based asynchronous JavaScript.

---

## 1. What Is `async/await`?

`async/await` consists of two keywords:

* `async`
* `await`

They work together with Promises.

### `async`

The `async` keyword is used to declare an asynchronous function.

```js
async function greet() {
  return "Hello, Osama Abu Motlaq";
}
```

### `await`

The `await` keyword waits for a Promise to settle and gives you its fulfilled value.

```js
async function greet() {
  const message = await Promise.resolve("Hello, Osama Abu Motlaq");

  console.log(message);
}
```

Output:

```text
Hello, Osama Abu Motlaq
```

The important idea is:

```text
async function
      ↓
returns Promise

await Promise
      ↓
wait for settlement
      ↓
continue with fulfilled value
```

---

# 2. The `async` Keyword

An `async` function always returns a Promise.

```js
async function getName() {
  return "Osama Abu Motlaq";
}
```

Even though the function appears to return a string:

```js
return "Osama Abu Motlaq";
```

the actual result is a Promise.

```js
const result = getName();

console.log(result);
```

Conceptually:

```text
Promise { "Osama Abu Motlaq" }
```

You can consume it with `.then()`:

```js
getName().then((name) => {
  console.log(name);
});
```

Output:

```text
Osama Abu Motlaq
```

---

# 3. `async` Functions and Promises

An `async` function behaves conceptually like a function that returns a Promise.

For example:

```js
async function getName() {
  return "Osama Abu Motlaq";
}
```

is conceptually similar to:

```js
function getName() {
  return Promise.resolve("Osama Abu Motlaq");
}
```

These are not literally identical in every internal detail, but they illustrate the important behavior:

```text
async function
      ↓
Promise
```

Therefore:

```js
const result = getName();
```

does not immediately give you:

```js
"Osama Abu Motlaq"
```

It gives you a Promise.

---

# 4. `async` with Explicit Promise Values

An `async` function can also return an existing Promise.

```js
async function getUser() {
  return Promise.resolve({
    name: "Osama Abu Motlaq",
  });
}
```

The returned result is still a Promise.

```js
getUser().then((user) => {
  console.log(user.name);
});
```

Output:

```text
Osama Abu Motlaq
```

The `async` function adopts the state/value of the Promise it returns.

---

# 5. What Does `await` Do?

`await` waits for a Promise to settle.

Example:

```js
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Osama Abu Motlaq",
      });
    }, 1000);
  });
}
```

Now:

```js
async function showUser() {
  const user = await getUser();

  console.log(user);
}

showUser();
```

After approximately one second:

```text
{ name: "Osama Abu Motlaq" }
```

The important point is that:

```js
const user = await getUser();
```

means:

```text
Start Promise
      ↓
Wait for its result
      ↓
Get fulfilled value
      ↓
Continue execution
```

---

# 6. `await` Does Not Block JavaScript

This is one of the most important concepts.

Consider:

```js
async function loadData() {
  const result = await fetch("/api/data");

  console.log(result);
}

loadData();

console.log("After calling loadData");
```

You may think:

```text
loadData()
    ↓
wait
    ↓
fetch finishes
    ↓
console.log("After calling loadData")
```

That is not what happens.

Instead:

```text
loadData()
    ↓
fetch starts
    ↓
await suspends this async function
    ↓
JavaScript can continue doing other work
    ↓
"After calling loadData"
    ↓
fetch eventually completes
    ↓
loadData() resumes
```

So:

```text
await pauses the async function,
not the entire JavaScript thread.
```

This distinction is fundamental.

---

# 7. Example of `await` Suspending a Function

```js
function wait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

async function run() {
  console.log("Start");

  await wait();

  console.log("After wait");
}

run();

console.log("Outside");
```

Output:

```text
Start
Outside
After wait
```

Why?

### Step 1

`run()` starts.

```text
Start
```

### Step 2

JavaScript reaches:

```js
await wait();
```

The `run` function is suspended until the Promise settles.

### Step 3

JavaScript continues executing other available work.

```text
Outside
```

### Step 4

Two seconds later, the Promise fulfills.

The `run` function resumes:

```text
After wait
```

---

# 8. Awaiting a Non-Promise Value

`await` can technically be used with values that are not Promises.

```js
async function example() {
  const value = await 100;

  console.log(value);
}

example();
```

Output:

```text
100
```

JavaScript treats the value as an already-fulfilled asynchronous result.

Conceptually:

```js
await 100;
```

behaves roughly like:

```js
await Promise.resolve(100);
```

This means `await` is not restricted to explicitly created Promises.

---

# 9. Awaiting a Promise

The more common use is:

```js
async function example() {
  const value = await Promise.resolve(100);

  console.log(value);
}
```

The Promise fulfills with:

```text
100
```

and `await` gives the function access to:

```text
100
```

instead of the Promise object itself.

---

# 10. Promise Syntax vs `async/await`

Consider a Promise chain:

```js
function getUser() {
  return Promise.resolve({
    id: 1,
    name: "Osama Abu Motlaq",
  });
}

getUser()
  .then((user) => {
    console.log(user.name);
  })
  .catch((error) => {
    console.error(error);
  });
```

Using `async/await`:

```js
async function showUser() {
  try {
    const user = await getUser();

    console.log(user.name);
  } catch (error) {
    console.error(error);
  }
}

showUser();
```

Both approaches are Promise-based.

The difference is primarily syntax and control-flow readability.

```text
Promises
    ↓
.then()
.catch()
.finally()

async/await
    ↓
await
try/catch/finally
```

`async/await` does not eliminate Promises.

---

# 11. Returning a Value from an Async Function

Consider:

```js
async function getName() {
  return "Osama Abu Motlaq";
}
```

Calling it:

```js
const result = getName();
```

gives a Promise.

To access the value:

```js
getName().then((name) => {
  console.log(name);
});
```

Or from another async function:

```js
async function showName() {
  const name = await getName();

  console.log(name);
}

showName();
```

Therefore:

```js
async function getName() {
  return "Osama Abu Motlaq";
}
```

does not directly return a string to its caller.

It returns a Promise that fulfills with the string.

---

# 12. Returning from `await`

Consider:

```js
async function getName() {
  return "Osama Abu Motlaq";
}

async function showName() {
  const name = await getName();

  return name;
}
```

`showName()` also returns a Promise.

```js
showName().then((name) => {
  console.log(name);
});
```

Output:

```text
Osama Abu Motlaq
```

Async functions preserve the Promise-based nature of the operation.

---

# 13. Throwing Errors in an Async Function

An error thrown inside an `async` function causes the returned Promise to reject.

```js
async function getData() {
  throw new Error("Failed to load data");
}
```

This does not behave like an ordinary synchronous function call from the caller's perspective.

The returned Promise becomes rejected.

You can handle it with:

```js
getData().catch((error) => {
  console.error(error.message);
});
```

Output:

```text
Failed to load data
```

---

# 14. `try/catch` with `await`

One of the biggest advantages of `async/await` is that Promise rejections can be handled with familiar `try/catch` syntax.

```js
async function loadUser() {
  try {
    const user = await getUser();

    console.log(user);
  } catch (error) {
    console.error("Failed:", error);
  }
}
```

If:

```js
getUser()
```

returns a rejected Promise, the `await` expression throws the rejection reason as an exception within the async function.

Therefore:

```text
Promise rejection
      ↓
await
      ↓
throw-like behavior
      ↓
catch
```

---

# 15. `try/catch` with Multiple `await`s

You can handle several asynchronous operations with one `try/catch`.

```js
async function loadDashboard() {
  try {
    const user = await getUser();
    const projects = await getProjects(user.id);
    const statistics = await getStatistics(user.id);

    console.log(user);
    console.log(projects);
    console.log(statistics);
  } catch (error) {
    console.error("Something failed:", error);
  }
}
```

If any awaited Promise rejects:

```text
getUser()
    ↓
getProjects()
    ↓
getStatistics()
```

execution jumps to:

```js
catch (error)
```

---

# 16. `finally` with `async/await`

`finally` executes whether the operation succeeds or fails.

```js
async function loadData() {
  try {
    const data = await getData();

    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Finished");
  }
}
```

This is useful for cleanup.

For example:

```js
async function submitForm() {
  try {
    await sendForm();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
```

The loading state can be reset regardless of success or failure.

---

# 17. Sequential Async Operations

Sometimes operations depend on one another.

For example:

```js
async function loadUserProjects() {
  const user = await getUser();
  const projects = await getProjects(user.id);

  console.log(projects);
}
```

The second operation requires the result of the first.

Therefore, sequential execution is appropriate:

```text
getUser()
   ↓
user.id
   ↓
getProjects(user.id)
```

You cannot start the second operation until you know the user's ID.

---

# 18. Sequential `await` Can Be Slow

Consider:

```js
async function loadData() {
  const user = await getUser();
  const projects = await getProjects();
  const posts = await getPosts();

  return {
    user,
    projects,
    posts,
  };
}
```

If each operation takes approximately one second:

```text
getUser       → 1 second
getProjects   → 1 second
getPosts      → 1 second
--------------------------
Total         → ~3 seconds
```

But what if the operations are independent?

Then there may be no reason to wait for one before starting the next.

---

# 19. Parallel/Concurrent Operations with `Promise.all`

If operations are independent, start them together.

```js
async function loadData() {
  const [user, projects, posts] = await Promise.all([
    getUser(),
    getProjects(),
    getPosts(),
  ]);

  return {
    user,
    projects,
    posts,
  };
}
```

Now the operations can progress concurrently.

Conceptually:

```text
getUser       ──────────────┐
getProjects   ──────────────┤
getPosts      ──────────────┤
                            ↓
                       Promise.all
                            ↓
                         results
```

If all take around one second:

```text
Total ≈ 1 second
```

rather than:

```text
Total ≈ 3 seconds
```

Actual timing depends on the operations and environment.

---

# 20. The Important Rule: Dependency vs Independence

Use sequential `await` when there is a dependency.

```js
const user = await getUser();

const projects = await getProjects(user.id);
```

Use `Promise.all()` when operations are independent.

```js
const [projects, posts, statistics] = await Promise.all([
  getProjects(),
  getPosts(),
  getStatistics(),
]);
```

A useful mental model is:

```text
Dependent operations
        ↓
Sequential await

Independent operations
        ↓
Promise.all()
```

---

# 21. Do Not Accidentally Serialize Independent Work

This is a common performance mistake:

```js
const projects = await getProjects();
const posts = await getPosts();
const statistics = await getStatistics();
```

If they do not depend on each other, this unnecessarily introduces sequential waiting.

Prefer:

```js
const [projects, posts, statistics] = await Promise.all([
  getProjects(),
  getPosts(),
  getStatistics(),
]);
```

This is one of the most important practical uses of Promise knowledge.

---

# 22. `await` in Loops

Consider:

```js
async function processProjects(projects) {
  for (const project of projects) {
    await processProject(project);
  }
}
```

This processes projects sequentially.

```text
Project 1
   ↓
Project 2
   ↓
Project 3
   ↓
Project 4
```

This can be correct when order matters or when you intentionally want to limit concurrency.

---

# 23. Sequential Loop Example

```js
async function processProjects(projects) {
  for (const project of projects) {
    const result = await processProject(project);

    console.log(result);
  }
}
```

Each iteration waits for the previous operation.

This is useful when:

* Operations depend on previous results.
* Order must be preserved.
* The server should not receive many requests simultaneously.
* You intentionally want controlled concurrency.

---

# 24. Running Loop Operations Concurrently

If each operation is independent:

```js
async function processProjects(projects) {
  const results = await Promise.all(
    projects.map((project) => processProject(project))
  );

  return results;
}
```

Now all operations can start without waiting for the previous one.

Conceptually:

```text
Project 1 ────────┐
Project 2 ────────┤
Project 3 ────────┤
Project 4 ────────┤
                  ↓
             Promise.all
```

This can significantly improve performance.

However, sending hundreds or thousands of operations at once may overload an API or database.

Concurrency should therefore be intentional.

---

# 25. `for...of` vs `forEach()` with `async`

This is a very common mistake.

Consider:

```js
projects.forEach(async (project) => {
  await processProject(project);
});
```

Many developers expect:

```js
await projects.forEach(...)
```

to wait for everything.

It does not.

`forEach()` does not use the returned Promises from the callback to create a Promise representing the whole operation.

This means:

```js
await projects.forEach(...)
```

does not wait for all asynchronous callbacks.

---

# 26. Correct Sequential `for...of`

Use `for...of` when you want sequential processing:

```js
for (const project of projects) {
  await processProject(project);
}
```

This is the preferred pattern for sequential asynchronous iteration.

---

# 27. Correct Concurrent Processing

Use `Promise.all()` when operations are independent:

```js
await Promise.all(
  projects.map((project) => processProject(project))
);
```

This expresses your intention clearly:

```text
Map projects to Promises
        ↓
Wait for all Promises
        ↓
Continue
```

---

# 28. `await` and Error Propagation

Consider:

```js
async function loadData() {
  const data = await getData();

  return data;
}
```

If:

```js
getData()
```

rejects, then:

```js
loadData()
```

also returns a rejected Promise unless the error is handled.

For example:

```js
async function loadData() {
  try {
    const data = await getData();

    return data;
  } catch (error) {
    console.error(error);
  }
}
```

The error is now handled locally.

---

# 29. Propagating Errors to the Caller

You do not always need to catch an error immediately.

Consider:

```js
async function getUserData() {
  const user = await getUser();

  return user;
}
```

Another function can handle the error:

```js
async function displayUser() {
  try {
    const user = await getUserData();

    console.log(user);
  } catch (error) {
    console.error("Unable to load user:", error);
  }
}
```

This is often a good design.

The function performing the operation does not necessarily need to decide how the UI should respond.

---

# 30. Catch Errors at the Appropriate Layer

A useful principle is:

> Handle an error where you have enough context to make a meaningful decision.

For example, a data-access function might allow an error to propagate:

```js
async function getProjects() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}
```

A UI-level function can decide what to display:

```js
async function loadProjects() {
  try {
    const projects = await getProjects();

    displayProjects(projects);
  } catch (error) {
    displayError("Unable to load projects.");
  }
}
```

This separates:

```text
Data operation
      ↓
Error propagation
      ↓
Application/UI decision
```

---

# 31. `fetch()` with `async/await`

`fetch()` returns a Promise.

Therefore, it works naturally with `await`.

```js
async function getProjects() {
  const response = await fetch("/api/projects");

  const data = await response.json();

  return data;
}
```

The flow is:

```text
fetch()
  ↓
Promise<Response>
  ↓
await
  ↓
Response
  ↓
response.json()
  ↓
Promise
  ↓
await
  ↓
JavaScript data
```

---

# 32. Important: `fetch()` and HTTP Errors

`fetch()` does not normally reject simply because the server returns:

```text
404
500
403
```

You should check:

```js
response.ok
```

Example:

```js
async function getProjects() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}
```

This makes HTTP failures explicit.

---

# 33. Complete `fetch()` Example

```js
async function loadProjects() {
  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const projects = await response.json();

    console.log(projects);
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
}
```

This is a common real-world pattern.

---

# 34. Async Functions and `finally`

A loading state is a common example.

```js
async function loadProjects() {
  setLoading(true);

  try {
    const projects = await getProjects();

    displayProjects(projects);
  } catch (error) {
    displayError(error);
  } finally {
    setLoading(false);
  }
}
```

Regardless of success or failure:

```js
setLoading(false);
```

will execute.

This prevents loading indicators from remaining active after an error.

---

# 35. Async Function Execution Model

Consider:

```js
async function example() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

console.log("C");

example();

console.log("D");
```

The output is:

```text
C
A
D
B
```

Why?

### Step 1

```js
console.log("C");
```

prints:

```text
C
```

### Step 2

`example()` starts.

```text
A
```

### Step 3

Execution reaches:

```js
await Promise.resolve();
```

The async function suspends at that point.

### Step 4

The surrounding synchronous code continues:

```text
D
```

### Step 5

The Promise reaction is scheduled as a microtask.

The function resumes:

```text
B
```

This demonstrates again:

```text
await does not block the entire JavaScript runtime.
```

---

# 36. `await` and the Microtask Queue

Promise continuations created by `await` resume asynchronously through the JavaScript Promise/microtask mechanism.

For example:

```js
async function example() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

example();

console.log("C");
```

Output:

```text
A
C
B
```

The important sequence is:

```text
Synchronous code
      ↓
await encountered
      ↓
async function suspends
      ↓
remaining synchronous code executes
      ↓
microtask runs
      ↓
async function resumes
```

This connects `async/await` directly to the Event Loop concepts covered earlier.

---

# 37. Top-Level `await`

Modern JavaScript modules can use `await` at the top level.

For example, in an ES module:

```js
const response = await fetch("/api/projects");

const projects = await response.json();

console.log(projects);
```

This is called **top-level `await`**.

It is available in JavaScript modules, not ordinary classic scripts.

It is especially relevant in modern environments such as:

* Node.js ES modules
* Modern bundlers
* Some framework environments

However, it should be used intentionally because module loading can depend on the awaited operation.

---

# 38. `async/await` in React

`async/await` is extremely common in React applications.

For example, a function that loads data:

```js
async function getProjects() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to load projects");
  }

  return response.json();
}
```

A React component may call this function from an appropriate asynchronous workflow.

For example:

```js
useEffect(() => {
  async function loadProjects() {
    try {
      const projects = await getProjects();

      setProjects(projects);
    } catch (error) {
      setError(error.message);
    }
  }

  loadProjects();
}, []);
```

Notice that the `useEffect` callback itself is not written as:

```js
useEffect(async () => {
  // ...
}, []);
```

The usual pattern is to define an async function inside the effect and call it.

---

# 39. Why `useEffect(async () => {})` Is Usually Avoided

React expects the function passed to `useEffect` to either:

* return nothing, or
* return a cleanup function.

An `async` function always returns a Promise.

Therefore:

```js
useEffect(async () => {
  // ...
}, []);
```

does not match the expected effect callback contract.

Instead:

```js
useEffect(() => {
  async function loadData() {
    // asynchronous work
  }

  loadData();
}, []);
```

This distinction becomes important when learning React data fetching.

---

# 40. `async/await` in Next.js

`async/await` is especially important in Next.js.

Server-side code commonly performs asynchronous work such as:

* Database queries
* API requests
* Authentication checks
* File operations
* Server-side data fetching

For example:

```js
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1>Projects</h1>
    </main>
  );
}
```

The exact capabilities depend on the Next.js component/runtime context, but the central JavaScript concept remains the same:

```text
async function
      ↓
await asynchronous operation
      ↓
continue after Promise settles
```

This is one reason understanding Promises and `async/await` is important before going deeply into Next.js.

---

# 41. Async Functions and Database Operations

Backend code frequently uses:

```js
const result = await database.query(...);
```

For example:

```js
async function getProjects() {
  const result = await database.query(
    "SELECT * FROM projects"
  );

  return result.rows;
}
```

The database operation is asynchronous because the program may need to wait for:

```text
Application
    ↓
Database server
    ↓
Query execution
    ↓
Database response
    ↓
Application
```

`await` allows the code to express this flow clearly.

This concept becomes important when working with:

* Node.js
* Express
* Next.js
* PostgreSQL
* Supabase

---

# 42. Async Functions and Supabase

When using a database client such as Supabase:

```js
async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}
```

The important JavaScript concepts are:

```text
async
await
Promise
error handling
```

The library may hide some low-level networking details, but the underlying asynchronous model remains Promise-based.

---

# 43. Avoid Unnecessary `await`

Sometimes this:

```js
async function getData() {
  return await fetchData();
}
```

is unnecessary if there is no need to handle the result or catch the error locally.

You can often write:

```js
async function getData() {
  return fetchData();
}
```

Both return Promise-based results.

However, `return await` can be useful when you need local `try/catch` behavior or specific stack/error handling semantics.

For example:

```js
async function getData() {
  try {
    return await fetchData();
  } catch (error) {
    console.error("Local handling:", error);
    throw error;
  }
}
```

Here `await` is meaningful because the `try/catch` is intended to observe the rejection inside this function.

---

# 44. Do Not Forget to `await`

Consider:

```js
async function loadUser() {
  const user = getUser();

  console.log(user.name);
}
```

This is incorrect if `getUser()` returns a Promise.

`user` is the Promise itself.

Correct:

```js
async function loadUser() {
  const user = await getUser();

  console.log(user.name);
}
```

Mental model:

```text
getUser()
    ↓
Promise
    ↓
await
    ↓
actual user value
```

---

# 45. Do Not Forget to `return`

Consider:

```js
async function getProjects() {
  const projects = await fetchProjects();

  projects;
}
```

The function does not return the projects.

Correct:

```js
async function getProjects() {
  const projects = await fetchProjects();

  return projects;
}
```

Then:

```js
const projects = await getProjects();
```

works as expected.

---

# 46. Async Functions Can Return Objects

```js
async function getDashboardData() {
  const [projects, posts] = await Promise.all([
    getProjects(),
    getPosts(),
  ]);

  return {
    projects,
    posts,
  };
}
```

The caller receives a Promise that fulfills with:

```js
{
  projects: [...],
  posts: [...]
}
```

Then:

```js
const dashboard = await getDashboardData();
```

gives access to the object.

---

# 47. Destructuring with `await`

You can combine `await` with destructuring.

```js
async function loadData() {
  const { data, error } = await getProjects();

  if (error) {
    throw error;
  }

  return data;
}
```

This is common with APIs and libraries that return structured results.

---

# 48. Combining `await` and `Promise.all`

A very common professional pattern is:

```js
async function loadDashboard() {
  const user = await getUser();

  const [projects, posts, statistics] = await Promise.all([
    getProjects(user.id),
    getPosts(user.id),
    getStatistics(user.id),
  ]);

  return {
    user,
    projects,
    posts,
    statistics,
  };
}
```

The dependency is handled sequentially:

```text
getUser()
   ↓
user.id
```

The independent operations then run concurrently:

```text
getProjects()
getPosts()
getStatistics()
       ↓
 Promise.all()
```

This is a strong real-world pattern.

---

# 49. `Promise.allSettled()` with `async/await`

Sometimes you want every operation's result even if some fail.

```js
async function loadResources() {
  const results = await Promise.allSettled([
    getProjects(),
    getPosts(),
    getStatistics(),
  ]);

  return results;
}
```

Each result describes whether the operation:

```text
fulfilled
```

or:

```text
rejected
```

Use this when one failure should not automatically prevent you from receiving the results of other operations.

---

# 50. `Promise.race()` with `async/await`

You can also await `Promise.race()`:

```js
async function getFastestResult() {
  const result = await Promise.race([
    getFromServerA(),
    getFromServerB(),
  ]);

  return result;
}
```

The Promise returned by `race()` settles when the first input Promise settles.

---

# 51. `Promise.any()` with `async/await`

Similarly:

```js
async function getAvailableServer() {
  const result = await Promise.any([
    getFromServerA(),
    getFromServerB(),
    getFromServerC(),
  ]);

  return result;
}
```

`Promise.any()` waits for the first fulfilled Promise.

If every Promise rejects, it rejects with an `AggregateError`.

---

# 52. Common Mistake: Sequentializing Everything

Bad when operations are independent:

```js
const a = await getA();
const b = await getB();
const c = await getC();
```

Better:

```js
const [a, b, c] = await Promise.all([
  getA(),
  getB(),
  getC(),
]);
```

The choice should depend on whether there is a dependency.

---

# 53. Common Mistake: Using `forEach()` with `await`

Avoid:

```js
items.forEach(async (item) => {
  await process(item);
});
```

Use:

```js
for (const item of items) {
  await process(item);
}
```

for sequential work.

Or:

```js
await Promise.all(
  items.map((item) => process(item))
);
```

for independent concurrent work.

---

# 54. Common Mistake: Forgetting Error Handling

This:

```js
async function loadData() {
  const data = await fetchData();

  return data;
}

loadData();
```

may result in an unhandled rejected Promise if `fetchData()` fails and nobody handles the returned Promise.

You can handle it:

```js
loadData().catch((error) => {
  console.error(error);
});
```

or:

```js
async function run() {
  try {
    const data = await loadData();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

run();
```

The important thing is that rejected Promises should have an intentional handling strategy.

---

# 55. Common Mistake: Assuming `await` Makes Everything Sequential

Consider:

```js
const projectsPromise = getProjects();
const postsPromise = getPosts();

const projects = await projectsPromise;
const posts = await postsPromise;
```

The operations started before the first `await`.

Therefore, they can progress concurrently.

This differs from:

```js
const projects = await getProjects();
const posts = await getPosts();
```

The second version does not start `getPosts()` until after `getProjects()` fulfills.

The location of `await` can therefore affect concurrency.

---

# 56. Start Independent Operations Early

Consider:

```js
const projectsPromise = getProjects();
const postsPromise = getPosts();

const projects = await projectsPromise;
const posts = await postsPromise;
```

Both operations have already started.

A clearer and generally preferred form is:

```js
const [projects, posts] = await Promise.all([
  getProjects(),
  getPosts(),
]);
```

This communicates your concurrency intention explicitly.

---

# 57. Common Mistake: Creating Unnecessary Promise Wrappers

Avoid:

```js
async function getProjects() {
  return new Promise(async (resolve, reject) => {
    const projects = await fetchProjects();

    resolve(projects);
  });
}
```

This adds unnecessary complexity.

If `fetchProjects()` already returns a Promise, simply use:

```js
async function getProjects() {
  return fetchProjects();
}
```

Or:

```js
async function getProjects() {
  const projects = await fetchProjects();

  return projects;
}
```

depending on whether additional processing is needed.

---

# 58. Common Mistake: Catching and Hiding Errors

Avoid:

```js
async function loadData() {
  try {
    return await fetchData();
  } catch (error) {
    console.error(error);
  }
}
```

If the caller expects the operation to fail when the data cannot be loaded, silently returning `undefined` may create a second problem.

Sometimes it is better to rethrow:

```js
async function loadData() {
  try {
    return await fetchData();
  } catch (error) {
    console.error("Failed to load data:", error);

    throw error;
  }
}
```

Now the caller can still handle the failure.

---

# 59. Common Mistake: Overusing `try/catch`

Not every function needs its own `try/catch`.

This can become noisy:

```js
async function getA() {
  try {
    return await fetchA();
  } catch (error) {
    throw error;
  }
}

async function getB() {
  try {
    return await fetchB();
  } catch (error) {
    throw error;
  }
}
```

If the functions are simply propagating errors, the `try/catch` may add no value.

Sometimes this is enough:

```js
async function getA() {
  return fetchA();
}

async function getB() {
  return fetchB();
}
```

Handle errors where you can actually respond to them meaningfully.

---

# 60. `async/await` Is Not a Replacement for Understanding Promises

You should not think:

```text
Promises = old
async/await = new
```

Instead:

```text
Promises
   ↓
underlying asynchronous abstraction

async/await
   ↓
syntax for consuming Promise-based operations
```

You still need to understand:

* Promise states
* `.then()`
* `.catch()`
* Promise chaining
* `Promise.all()`
* `Promise.allSettled()`
* `Promise.race()`
* `Promise.any()`
* Microtasks
* Rejections

because `async/await` operates on that Promise model.

---

# 61. Callback → Promise → Async/Await

The evolution can be understood like this.

### Callback

```js
getUser((error, user) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(user);
});
```

### Promise

```js
getUser()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Async/Await

```js
async function showUser() {
  try {
    const user = await getUser();

    console.log(user);
  } catch (error) {
    console.error(error);
  }
}
```

The underlying asynchronous operation has not fundamentally changed.

The syntax and control-flow representation have.

---

# 62. A Complete Real-World Example

Suppose you want to load a user and their projects.

```js
async function loadUserProjects() {
  try {
    const user = await getUser();

    const projects = await getProjects(user.id);

    return {
      user,
      projects,
    };
  } catch (error) {
    console.error("Failed to load user projects:", error);

    throw error;
  }
}
```

The flow is:

```text
loadUserProjects()
        ↓
     getUser()
        ↓
      user
        ↓
 getProjects(user.id)
        ↓
     projects
        ↓
   return object
```

The second operation depends on the first.

Therefore sequential `await` is correct.

---

# 63. A More Optimized Example

Suppose you first need the user:

```js
const user = await getUser();
```

But after obtaining the user, three independent resources are needed:

```js
getProjects(user.id)
getPosts(user.id)
getStatistics(user.id)
```

Use:

```js
async function loadDashboard() {
  try {
    const user = await getUser();

    const [projects, posts, statistics] = await Promise.all([
      getProjects(user.id),
      getPosts(user.id),
      getStatistics(user.id),
    ]);

    return {
      user,
      projects,
      posts,
      statistics,
    };
  } catch (error) {
    console.error("Failed to load dashboard:", error);

    throw error;
  }
}
```

This combines:

* Sequential dependencies
* Concurrent independent operations
* Error handling
* Async functions
* `await`
* `Promise.all()`

This pattern appears frequently in real applications.

---

# 64. Best Practices

## 1. Understand Promises First

Do not memorize `async/await` without understanding Promises.

`async/await` is Promise-based.

---

## 2. Use `await` for Readability

Prefer:

```js
const user = await getUser();
```

when it makes asynchronous control flow easier to understand.

---

## 3. Use `Promise.all()` for Independent Operations

Prefer:

```js
const [a, b, c] = await Promise.all([
  getA(),
  getB(),
  getC(),
]);
```

when the operations are independent.

---

## 4. Use Sequential `await` for Dependencies

Use:

```js
const user = await getUser();
const projects = await getProjects(user.id);
```

when the second operation requires the first result.

---

## 5. Handle Errors Intentionally

Use:

```js
try {
  // asynchronous work
} catch (error) {
  // error handling
}
```

when you have enough context to handle the failure.

---

## 6. Do Not Use `forEach()` for Awaited Sequential Work

Prefer:

```js
for (const item of items) {
  await process(item);
}
```

---

## 7. Use `Promise.all()` for Concurrent Array Operations

```js
await Promise.all(
  items.map((item) => process(item))
);
```

---

## 8. Check `response.ok` with `fetch()`

Do not assume:

```js
await fetch(...)
```

automatically rejects for HTTP errors.

Check:

```js
if (!response.ok) {
  throw new Error(...);
}
```

---

## 9. Avoid Unnecessary Promise Wrappers

Do not wrap an existing Promise in:

```js
new Promise(...)
```

unless you have a specific reason.

---

## 10. Keep Error Handling at the Appropriate Layer

Do not catch errors merely to log them and accidentally hide the failure.

---

# 65. Quick Reference

| Syntax                 | Meaning                                             |
| ---------------------- | --------------------------------------------------- |
| `async function fn()`  | Defines an async function                           |
| `await promise`        | Waits for a Promise result inside an async function |
| `return value`         | Async function fulfills with `value`                |
| `throw error`          | Async function rejects                              |
| `try/catch`            | Handles rejected awaited operations                 |
| `finally`              | Runs after success or failure                       |
| `Promise.all()`        | Waits for all Promises                              |
| `Promise.allSettled()` | Waits for every Promise outcome                     |
| `Promise.race()`       | Settles with the first settled Promise              |
| `Promise.any()`        | Fulfills with the first fulfilled Promise           |

---

# 66. Async/Await Mental Model

Think of:

```js
async function loadData() {
  const data = await fetchData();

  return data;
}
```

as:

```text
Call async function
       ↓
Function returns a Promise
       ↓
Start asynchronous operation
       ↓
await encountered
       ↓
Suspend this async function
       ↓
JavaScript continues other work
       ↓
Promise settles
       ↓
Async function resumes
       ↓
Continue execution
       ↓
Return value through the function's Promise
```

The key phrase is:

> **`await` suspends the async function, not the JavaScript runtime.**

---

# 67. Async/Await vs Promise Chain

### Promise chain

```js
getUser()
  .then((user) => {
    return getProjects(user.id);
  })
  .then((projects) => {
    console.log(projects);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Async/Await

```js
async function loadProjects() {
  try {
    const user = await getUser();
    const projects = await getProjects(user.id);

    console.log(projects);
  } catch (error) {
    console.error(error);
  }
}
```

Both use Promises.

The `async/await` version often makes the dependency sequence easier to read.

---

# 68. The Three Most Important Patterns

### Sequential

Use when operations depend on each other:

```js
const user = await getUser();
const projects = await getProjects(user.id);
```

### Concurrent

Use when operations are independent:

```js
const [projects, posts] = await Promise.all([
  getProjects(),
  getPosts(),
]);
```

### Error Handling

Use `try/catch` when you need to handle failure:

```js
try {
  const data = await getData();
} catch (error) {
  console.error(error);
}
```

These three patterns cover a large percentage of practical asynchronous JavaScript.

---

# 69. Key Takeaways

1. `async` defines an asynchronous function.
2. An `async` function always returns a Promise.
3. `await` is used to consume a Promise result.
4. `await` suspends the current async function rather than blocking the entire JavaScript runtime.
5. `await` resumes the function asynchronously after the awaited operation settles.
6. `async/await` is built on top of Promises.
7. Promise rejections can be handled with `try/catch`.
8. `finally` is useful for cleanup and final state updates.
9. Sequential `await` is appropriate when operations depend on each other.
10. `Promise.all()` is appropriate for independent operations that can run concurrently.
11. `for...of` works well for sequential asynchronous loops.
12. `forEach()` should not be used when you need to await the completion of asynchronous callbacks.
13. `fetch()` does not normally reject merely because of an HTTP `4xx` or `5xx`; check `response.ok`.
14. Errors can propagate through async functions until an appropriate layer handles them.
15. Understanding Promises is necessary for truly understanding `async/await`.
16. `async/await` is fundamental to modern React, Next.js, Node.js, APIs, and database-driven applications.

---

# 70. Final Mental Model

The complete asynchronous JavaScript progression is:

```text
Callbacks
    ↓
Promises
    ↓
async/await
```

But the underlying model is still:

```text
Start asynchronous operation
          ↓
      Promise
          ↓
   pending state
       ↙     ↘
fulfilled    rejected
    ↓           ↓
 await       catch/error
    ↓
continue execution
```

And the most important performance decision is:

```text
Does operation B depend on operation A?
            ↓
       Yes → await sequentially

       No → consider Promise.all()
```

Finally:

```text
async/await ≠ synchronous JavaScript
```

It is a cleaner way to write **Promise-based asynchronous JavaScript**.
