# JavaScript Async Patterns

## Overview

Asynchronous JavaScript allows applications to continue working while waiting for operations such as:

```text id="0j3g7n"
Network requests
Timers
User interactions
File operations
Database operations
Browser APIs
Background tasks
```

Asynchronous code introduces additional concerns that synchronous code does not have:

```text id="6v8m3s"
Timing
Ordering
Concurrency
Cancellation
Errors
Race conditions
Resource cleanup
State transitions
```

Good asynchronous design should make it clear:

```text id="8a4j9n"
What is asynchronous?
What must happen first?
What can happen concurrently?
What can be cancelled?
What happens if one operation fails?
Who owns the result?
```

The objective is not to make everything `async`.

The objective is to model asynchronous work deliberately.

---

# Prefer `async`/`await` for Sequential Async Flow

When operations depend on each other, `async`/`await` often makes the sequence clear.

```js id="m6a8y2"
async function loadUserProfile(userId) {
  const user =
    await fetchUser(userId);

  const profile =
    await fetchProfile(user.id);

  return profile;
}
```

The code communicates:

```text id="v2y9ad"
Fetch user
   ↓
Fetch profile
   ↓
Return profile
```

---

# Promises Are Still the Underlying Model

`async`/`await` does not replace Promises.

An async function returns a Promise:

```js id="y4p6qx"
async function getValue() {
  return 10;
}
```

Therefore:

```js id="v5df0w"
const value =
  await getValue();
```

resolves the Promise.

Understanding Promises remains essential.

---

# Do Not Make Functions `async` Without a Reason

This:

```js id="8rvk1b"
async function getValue() {
  return 10;
}
```

returns a Promise.

If synchronous behavior is intended:

```js id="v7j4k1"
function getValue() {
  return 10;
}
```

Use `async` when the function actually participates in asynchronous behavior or intentionally exposes a Promise-based API.

---

# Sequential vs Concurrent Work

One of the most important async decisions is whether operations must happen sequentially or can happen concurrently.

Sequential:

```js id="84y0r8"
const user =
  await fetchUser();

const projects =
  await fetchProjects();
```

Concurrent:

```js id="x8v5d1"
const [
  user,
  projects,
] = await Promise.all([
  fetchUser(),
  fetchProjects(),
]);
```

The correct pattern depends on dependencies between operations.

---

# Do Not Serialize Independent Operations

This:

```js id="f6g6hz"
const user =
  await fetchUser();

const projects =
  await fetchProjects();

const settings =
  await fetchSettings();
```

waits for each request before starting the next one.

If the requests are independent, consider:

```js id="v1tq5h"
const [
  user,
  projects,
  settings,
] = await Promise.all([
  fetchUser(),
  fetchProjects(),
  fetchSettings(),
]);
```

This can reduce total waiting time.

---

# Do Not Parallelize Dependent Operations

If one operation requires the result of another:

```js id="6m4k5q"
const user =
  await fetchUser();

const projects =
  await fetchProjects(
    user.id
  );
```

the sequence is necessary.

Using `Promise.all()` here would not provide the same behavior because the second operation depends on `user.id`.

---

# Parallelize Only Independent Work

Ask:

```text id="c6w9r4"
Does operation B need the result of operation A?
```

If yes:

```text id="w8g8kt"
Sequential
```

If no:

```text id="r3kq0t"
Potentially concurrent
```

This simple distinction prevents many unnecessary waits.

---

# Start Promises Before Awaiting When Appropriate

Consider:

```js id="4q7xnt"
const userPromise =
  fetchUser();

const projectsPromise =
  fetchProjects();

const user =
  await userPromise;

const projects =
  await projectsPromise;
```

Both requests start before the awaits.

This differs from:

```js id="53bq3d"
const user =
  await fetchUser();

const projects =
  await fetchProjects();
```

which starts the second request only after the first finishes.

---

# `Promise.all`

Use `Promise.all()` when all operations are required:

```js id="7x1l8b"
const [
  user,
  projects,
] = await Promise.all([
  fetchUser(),
  fetchProjects(),
]);
```

If one Promise rejects, the combined Promise rejects.

---

# `Promise.all` Is Fail-Fast

Consider:

```js id="v4a2y5"
await Promise.all([
  fetchUser(),
  fetchProjects(),
  fetchSettings(),
]);
```

If one operation rejects, `Promise.all()` rejects.

That is useful when:

```text id="ph7tmj"
All results are required
```

but not when partial results are acceptable.

---

# `Promise.allSettled`

Use `Promise.allSettled()` when each operation should complete independently:

```js id="d3l5az"
const results =
  await Promise.allSettled([
    fetchUser(),
    fetchProjects(),
    fetchSettings(),
  ]);
```

Each result contains its own status.

This is useful for:

```text id="9pq2nb"
Batch operations
Optional requests
Independent widgets
Best-effort loading
```

---

# Check `allSettled` Results Explicitly

Example:

```js id="q6y4yr"
const results =
  await Promise.allSettled([
    fetchUser(),
    fetchProjects(),
  ]);

for (const result of results) {
  if (
    result.status ===
    "fulfilled"
  ) {
    console.log(result.value);
  } else {
    console.error(result.reason);
  }
}
```

Do not treat every result as if it succeeded.

---

# `Promise.race`

`Promise.race()` settles when the first Promise settles:

```js id="p5xq7k"
const result =
  await Promise.race([
    operationA(),
    operationB(),
  ]);
```

The first settled operation determines the result.

Be careful:

```text id="8qcx5y"
The other operations are not automatically cancelled.
```

---

# `Promise.any`

`Promise.any()` resolves when the first Promise fulfills:

```js id="x1l6k9"
const result =
  await Promise.any([
    fetchFromPrimary(),
    fetchFromSecondary(),
  ]);
```

It rejects only when all input Promises reject.

This is useful when:

```text id="91jv2k"
Any successful source is acceptable.
```

---

# Choose Promise Combinators by Semantics

```text id="3w0j52"
Promise.all
→ Everything is required.

Promise.allSettled
→ Every outcome matters.

Promise.race
→ First settlement matters.

Promise.any
→ First success matters.
```

Do not choose a combinator merely because it is convenient.

Choose it because it matches the operation's semantics.

---

# Avoid Accidental Sequential Awaits

Weak:

```js id="e6m7dn"
const first =
  await fetchFirst();

const second =
  await fetchSecond();

const third =
  await fetchThird();
```

when all three requests are independent.

Prefer:

```js id="v0prx1"
const [
  first,
  second,
  third,
] = await Promise.all([
  fetchFirst(),
  fetchSecond(),
  fetchThird(),
]);
```

---

# But Avoid `Promise.all` for Dependent Chains

Do not create artificial concurrency such as:

```js id="j7q6f5"
const userPromise =
  fetchUser();

const projectsPromise =
  fetchProjects();
```

if `fetchProjects()` actually requires the user ID.

The code should reflect the real dependency graph.

---

# Dependency Graph Thinking

Think about asynchronous operations as a graph:

```text id="16f0w8"
fetchUser
    ↓
fetchProjects(user.id)

fetchSettings ─────┐
                   ↓
                render
                   ↑
fetchNotifications ┘
```

Operations without dependencies can run concurrently.

Operations with dependencies must wait.

---

# Avoid `await` Inside `map()` Without Understanding the Result

This:

```js id="3xg8s9"
const results =
  items.map(
    async (item) => {
      return processItem(item);
    }
  );
```

produces:

```text id="q0ph9h"
Array<Promise>
```

not the resolved values.

Use:

```js id="p7c5m1"
const results =
  await Promise.all(
    items.map(
      async (item) =>
        processItem(item)
    )
  );
```

when all operations should run concurrently.

---

# Use `for...of` for Sequential Async Work

When each operation must wait for the previous one:

```js id="8b8e0e"
for (const item of items) {
  await processItem(item);
}
```

This is clearer than attempting to control sequential execution with `map()`.

---

# Do Not Use `forEach()` With `await`

Avoid:

```js id="xy81a6"
items.forEach(
  async (item) => {
    await processItem(item);
  }
);
```

`forEach()` does not wait for the returned Promises.

The outer function may continue before the operations finish.

---

# Correct Sequential Pattern

Use:

```js id="ic9y2j"
for (const item of items) {
  await processItem(item);
}
```

when order matters or the next operation depends on the previous one.

---

# Correct Concurrent Pattern

Use:

```js id="6h5tdr"
await Promise.all(
  items.map(
    (item) =>
      processItem(item)
  )
);
```

when the operations are independent and concurrent execution is appropriate.

---

# Concurrency Limits

Launching hundreds of operations simultaneously can overload:

```text id="n9jqw9"
The browser
The server
The network
Memory
File descriptors
External services
```

Avoid unbounded concurrency.

---

# Use Bounded Concurrency When Needed

A simple batch strategy:

```js id="7hbxn5"
async function processInBatches(
  items,
  batchSize
) {
  for (
    let index = 0;
    index < items.length;
    index += batchSize
  ) {
    const batch =
      items.slice(
        index,
        index + batchSize
      );

    await Promise.all(
      batch.map(
        (item) =>
          processItem(item)
      )
    );
  }
}
```

This processes a limited number at a time.

---

# Do Not Create Huge Promise Arrays

This:

```js id="f6k5v4"
await Promise.all(
  hugeArray.map(
    processItem
  )
);
```

can start a very large number of operations at once.

For large collections, consider:

```text id="5ad0oa"
Batching
Concurrency limits
Queues
Streaming
Pagination
```

---

# Rate Limiting

Some APIs limit requests per time window.

A loop such as:

```js id="z40m9a"
await Promise.all(
  items.map(
    (item) =>
      fetchItem(item.id)
  )
);
```

may violate rate limits.

The concurrency strategy must account for the external service's constraints.

---

# Backpressure

Backpressure occurs when producers create work faster than consumers can process it.

Example:

```text id="d1q0oz"
Incoming work
     ↓
Queue grows
     ↓
Processor falls behind
     ↓
Memory grows
```

Good async systems control the rate at which work is created.

---

# Queues

A queue can separate producers from consumers:

```js id="bq3t0y"
const queue = [];

queue.push(
  "task"
);
```

A worker can process queued tasks:

```js id="x0z5r9"
const task =
  queue.shift();
```

For serious workloads, use a more robust queue abstraction rather than a simple array.

---

# Avoid Recursive Async Loops Without Controls

This pattern:

```js id="wd1n0f"
async function poll() {
  await fetchData();
  await poll();
}
```

can run forever.

A controlled loop is often clearer:

```js id="wy20h3"
async function poll() {
  while (true) {
    await fetchData();
    await delay(5000);
  }
}
```

Even then, cancellation should be considered.

---

# Cancellation Is Part of Async Design

Long-running asynchronous operations may no longer be useful because:

```text id="5j2kzc"
The user navigated away
A newer request replaced the old one
The component was removed
The search query changed
The operation became irrelevant
The application is shutting down
```

Cancellation prevents wasted work.

---

# Use `AbortController`

Browser APIs such as `fetch()` support cancellation through `AbortSignal`.

```js id="9m7z1f"
const controller =
  new AbortController();

fetch(
  "/api/users",
  {
    signal:
      controller.signal,
  }
);

controller.abort();
```

---

# Pass `AbortSignal` Through Layers

Instead of hiding cancellation inside one function:

```js id="x4l4f2"
async function loadUser() {
  return fetchUser();
}
```

allow callers to provide a signal:

```js id="sb1d5m"
async function loadUser(
  signal
) {
  return fetchUser(
    signal
  );
}
```

Then:

```js id="it4b1h"
await loadUser(
  controller.signal
);
```

This makes ownership of cancellation explicit.

---

# Propagate Cancellation

If a higher-level operation accepts a signal:

```js id="5z89q2"
async function loadDashboard(
  signal
) {
  const [
    user,
    projects,
  ] = await Promise.all([
    fetchUser(signal),
    fetchProjects(signal),
  ]);

  return {
    user,
    projects,
  };
}
```

All lower-level operations can respond to the same cancellation signal.

---

# Cancellation Should Not Look Like a Generic Failure

Handle aborts separately when appropriate:

```js id="1rzhgc"
try {
  await fetch(
    "/api/users",
    {
      signal:
        controller.signal,
    }
  );
} catch (error) {
  if (
    error.name ===
    "AbortError"
  ) {
    return;
  }

  throw error;
}
```

A user cancelling an operation may not be an error from the application's perspective.

---

# Cancel Superseded Requests

Search is a common example.

If the user types:

```text id="z8p0a9"
java
```

then:

```text id="q8s6fp"
javas
```

then:

```text id="4c3yl6"
javascript
```

older requests may no longer be useful.

Canceling previous requests prevents stale results from winning.

---

# Race Conditions

A race condition occurs when the final result depends on timing rather than intended ordering.

Example:

```text id="zxfk1d"
Request A starts
Request B starts later

B finishes first
A finishes later
```

If both update UI state, an older result may overwrite the newer one.

---

# Prevent Stale Async Results

Use request identity or cancellation.

Example with a request counter:

```js id="9m3j2y"
let requestId = 0;

async function search(query) {
  const currentId =
    ++requestId;

  const results =
    await fetchResults(query);

  if (
    currentId !== requestId
  ) {
    return;
  }

  renderResults(results);
}
```

Only the latest request updates the UI.

---

# Prefer Cancellation When the Operation Supports It

A request-id check prevents stale results from being applied.

Cancellation also avoids unnecessary work.

A strong design may use both:

```text id="a4n63n"
Cancel old request
        +
Ignore stale result
```

---

# Do Not Assume Request Completion Order

This is unsafe:

```js id="m9x2b7"
const first =
  fetchFirst();

const second =
  fetchSecond();
```

You cannot assume:

```text id="0shy0f"
first completes before second
```

unless your code explicitly establishes that dependency.

---

# Async Ordering Must Be Explicit

If order matters:

```js id="ntt6jk"
const first =
  await fetchFirst();

const second =
  await fetchSecond();
```

If order does not matter:

```js id="u1z6bh"
const [
  first,
  second,
] = await Promise.all([
  fetchFirst(),
  fetchSecond(),
]);
```

Make the intended ordering visible.

---

# Avoid Mixing Callbacks and Promises Without Reason

Legacy APIs may use callbacks:

```js id="mk8i6z"
loadUser(
  (user) => {
    // ...
  }
);
```

Modern Promise-based APIs often allow:

```js id="me49k0"
const user =
  await loadUser();
```

Avoid wrapping and unwrapping asynchronous styles unnecessarily.

---

# Callback APIs and Errors

If working with callback-based APIs, follow the API's established error convention.

For example:

```js id="0y7d6v"
readFile(
  path,
  (error, data) => {
    if (error) {
      handleError(error);
      return;
    }

    processData(data);
  }
);
```

Do not assume all callback APIs report errors identically.

---

# Avoid Callback Nesting

Deep nesting:

```js id="ijr4wr"
loadUser(
  (user) => {
    loadProjects(
      user.id,
      (projects) => {
        loadSettings(
          (settings) => {
            render(
              user,
              projects,
              settings
            );
          }
        );
      }
    );
  }
);
```

can become difficult to maintain.

Promise-based composition can make the control flow clearer.

---

# Keep Async Functions Focused

Avoid a single function that:

```text id="d0x4gy"
Fetches data
Transforms data
Updates multiple UI areas
Writes storage
Tracks analytics
Handles retries
Logs everything
```

Instead, create an orchestrator:

```js id="x2d8or"
async function loadDashboard() {
  const data =
    await fetchDashboardData();

  const model =
    buildDashboardModel(data);

  renderDashboard(model);
}
```

---

# Separate Fetching From Transformation

Instead of:

```js id="qj4zux"
async function fetchUserDisplayName(id) {
  const response =
    await fetch(`/api/users/${id}`);

  const user =
    await response.json();

  return user.name.trim();
}
```

separate when the transformation is reusable:

```js id="f39q69"
async function fetchUser(id) {
  const response =
    await fetch(`/api/users/${id}`);

  return response.json();
}

function getDisplayName(user) {
  return user.name.trim();
}
```

Then:

```js id="ivf3c0"
const user =
  await fetchUser(id);

const displayName =
  getDisplayName(user);
```

---

# Keep Async Boundaries Visible

A good function makes it obvious where waiting occurs:

```js id="x2fxu0"
async function createProject(data) {
  const validated =
    validateProject(data);

  const project =
    await saveProject(validated);

  await notifyUser(project);

  return project;
}
```

The `await` statements mark the actual asynchronous boundaries.

---

# Do Not Hide Async Behavior Behind Misleading Names

Avoid:

```js id="v7y6h9"
function getUser() {
  return fetchUser();
}
```

if callers may assume `getUser()` returns a user synchronously.

A good API should make asynchronous behavior discoverable through naming, documentation, or established conventions.

---

# Async Function Naming

Use names that communicate the operation:

```js id="f10ztb"
fetchUser();
loadProjects();
saveProfile();
sendMessage();
deleteProject();
```

The fact that they return Promises can be part of the API contract.

Avoid artificial suffixes such as:

```js id="d8v4gy"
getUserAsync();
```

unless the codebase has a strong reason for that naming style.

---

# Promise Naming

When a Promise and its resolved value exist at the same time:

```js id="5f0h5n"
const userPromise =
  fetchUser();

const user =
  await userPromise;
```

Clear names prevent confusion.

---

# Avoid Prefixing Every Promise With `promise`

This is often unnecessary:

```js id="dkqak8"
const userPromise =
  fetchUser();
```

can be useful while both forms coexist.

But:

```js id="9s7f6f"
const userPromise =
  await fetchUser();
```

is misleading because the variable contains the resolved user, not the Promise.

Prefer:

```js id="7zv6in"
const user =
  await fetchUser();
```

---

# Error Handling in Async Functions

Keep `try...catch` around the smallest useful boundary:

```js id="js3tpa"
async function loadUser() {
  try {
    return await fetchUser();
  } catch (error) {
    throw new Error(
      "Failed to load user.",
      {
        cause: error,
      }
    );
  }
}
```

Do not wrap unrelated synchronous logic unless it belongs to the same recovery boundary.

---

# Avoid Catching Errors Too Early

Weak:

```js id="x7d2fj"
async function fetchUser() {
  try {
    return await networkRequest();
  } catch {
    return null;
  }
}
```

This can hide the difference between:

```text id="2t0qgr"
User not found
Network unavailable
Server failure
Programming bug
```

Only convert errors when the caller genuinely needs that abstraction.

---

# Propagate When You Cannot Recover

If the current layer cannot make a useful decision:

```js id="2j3c9t"
async function loadProjects() {
  return fetchProjects();
}
```

the underlying rejection can simply propagate.

Do not catch and discard it.

---

# Error Transformation

Transform errors when moving between abstraction layers:

```js id="1kmmg5"
async function loadProfile(userId) {
  try {
    return await userRepository.findById(
      userId
    );
  } catch (error) {
    throw new Error(
      "Unable to load user profile.",
      {
        cause: error,
      }
    );
  }
}
```

The higher-level API gains a meaningful context.

---

# Cleanup With `finally`

Use `finally` for resources that must be cleaned up:

```js id="i0d6ss"
async function saveUser() {
  setLoading(true);

  try {
    await persistUser();
  } finally {
    setLoading(false);
  }
}
```

This ensures the loading state is cleared whether the operation succeeds or fails.

---

# Avoid State Cleanup After `await` Without `finally`

Weak:

```js id="q3ny0m"
setLoading(true);

await saveUser();

setLoading(false);
```

If `saveUser()` rejects, the second statement never runs.

Prefer:

```js id="6ub5v1"
setLoading(true);

try {
  await saveUser();
} finally {
  setLoading(false);
}
```

---

# Async Resource Ownership

If an async function creates a resource:

```text id="ep9d4x"
Timer
AbortController
Subscription
Temporary file
Lock
Listener
```

its cleanup path should be explicit.

---

# Timers and Async Work

Be careful with:

```js id="krrbpg"
setInterval(
  async () => {
    await fetchData();
  },
  1000
);
```

If the request takes longer than the interval, multiple operations can overlap.

This may create:

```text id="o7x2sk"
Concurrent requests
Accumulated work
Race conditions
Server pressure
```

---

# Prefer Controlled Polling

A sequential polling loop can be safer:

```js id="up3r9c"
async function poll() {
  while (true) {
    await fetchData();

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          5000
        )
    );
  }
}
```

Add cancellation and shutdown logic for production usage.

---

# Avoid Overlapping Polling

Instead of:

```js id="l7s4d1"
setInterval(
  fetchData,
  1000
);
```

when `fetchData()` is asynchronous, consider:

```js id="o4o6hz"
async function poll() {
  while (!signal.aborted) {
    await fetchData(
      signal
    );

    await delay(
      1000,
      signal
    );
  }
}
```

The next iteration starts after the previous one completes.

---

# Async Initialization

Avoid starting large asynchronous work invisibly during module evaluation unless that behavior is intentional.

Prefer an explicit startup function:

```js id="i5yh5g"
async function initializeApp() {
  const config =
    await loadConfig();

  startApplication(config);
}

initializeApp().catch(
  handleFatalError
);
```

The initialization boundary is visible.

---

# Top-Level `await`

ES modules may support top-level `await`.

For example:

```js id="7e9wz8"
const config =
  await loadConfig();

export {
  config,
};
```

Use it when module initialization genuinely depends on asynchronous data.

Do not use top-level `await` casually when it causes unnecessary startup coupling.

---

# Avoid Long Module Initialization

A module that waits on several network operations before becoming available can make startup slower and harder to reason about.

Prefer lazy loading or explicit initialization when appropriate.

---

# Lazy Async Loading

Instead of loading everything immediately:

```js id="d4fsz3"
const heavyData =
  await loadHeavyData();
```

consider loading when required:

```js id="z4z5vq"
async function getHeavyData() {
  return loadHeavyData();
}
```

This can reduce startup work.

---

# Async Caching

Caching can reduce repeated requests:

```js id="wq7r6l"
let userPromise;

function getCurrentUser() {
  if (!userPromise) {
    userPromise =
      fetchCurrentUser();
  }

  return userPromise;
}
```

This shares the in-flight request.

---

# Be Careful With Failed Promise Caches

If the cached Promise rejects:

```js id="kq20x9"
userPromise =
  fetchCurrentUser();
```

the rejected Promise may remain cached forever.

A cleanup strategy may be needed:

```js id="rw9ug3"
let userPromise;

function getCurrentUser() {
  if (!userPromise) {
    userPromise =
      fetchCurrentUser().catch(
        (error) => {
          userPromise =
            undefined;

          throw error;
        }
      );
  }

  return userPromise;
}
```

The correct strategy depends on the desired cache semantics.

---

# Cache Data vs Cache In-Flight Work

These are different:

```text id="2u6zby"
Cache data
→ Reuse a completed result.

Cache in-flight Promise
→ Share work currently being performed.
```

Both can be useful.

Do not confuse their lifecycles.

---

# Avoid Stale Async Caches

Cached data may become outdated.

Define:

```text id="n4w98r"
TTL
Invalidation
Refresh behavior
Manual reset
Error behavior
```

A cache without a lifecycle strategy can become a source of stale data.

---

# Async State Should Be Explicit

Avoid many loosely related booleans:

```js id="5vzyhk"
const state = {
  isLoading: false,
  hasError: false,
  hasData: true,
  isRefreshing: false,
};
```

These combinations can become contradictory.

Prefer an explicit state model when complexity grows:

```js id="0n7k6p"
const state = {
  status: "success",
  data: user,
};
```

---

# Loading States

A good loading model distinguishes:

```text id="rjv2pm"
Initial loading
Refreshing existing data
Submitting
Uploading
Deleting
```

Do not automatically use one global `isLoading` for unrelated operations.

---

# Separate Independent Async States

Instead of:

```js id="c5szyp"
const [isLoading, setIsLoading] =
  useState(false);
```

for an entire application, model independent operations separately where needed:

```js id="lyh8c8"
const [isSaving, setIsSaving] =
  useState(false);

const [isLoadingProjects, setIsLoadingProjects] =
  useState(false);
```

The UI can then represent each operation accurately.

---

# Avoid State Updates After Cancellation

Long-running UI operations may finish after the user has moved on.

Use cancellation or request identity checks to prevent stale updates.

---

# Async Events and User Actions

Buttons that trigger async work may need protection against accidental duplicate submissions:

```js id="z1a5b4"
async function handleSubmit() {
  if (isSubmitting) {
    return;
  }

  setIsSubmitting(true);

  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
}
```

This prevents overlapping operations when the UI should allow only one submission.

---

# Disable UI When Appropriate

For operations that must not overlap:

```js id="t3k9xr"
<button
  disabled={isSubmitting}
>
  Save
</button>
```

The UI communicates the current operation state.

---

# Do Not Disable Everything

Not every async operation requires blocking the entire interface.

For example:

```text id="1kcrty"
Background analytics
```

should not necessarily disable:

```text id="4b0d0f"
Navigation
Typing
Unrelated controls
```

Scope the UI restriction to the operation.

---

# Async Operations and Idempotency

An operation is idempotent when repeating it produces the same effective result.

Examples:

```text id="0d19p5"
GET
PUT with the same complete resource state
DELETE after the resource is already deleted
```

may be designed to be idempotent.

Creating the same record twice may not be.

Async retries and duplicate clicks should consider idempotency.

---

# Protect Against Duplicate Submissions

For operations such as:

```text id="0z5r4k"
Create order
Create account
Submit payment
Send message
```

be careful with retries and duplicate user actions.

Possible strategies include:

```text id="q5n18v"
Disable duplicate UI actions
Request identifiers
Idempotency keys
Server-side deduplication
```

---

# Async Functions and Transaction Boundaries

Do not assume that several awaited operations form one atomic transaction:

```js id="0m7y4l"
await saveUser();
await sendEmail();
await updateAnalytics();
```

If the second operation fails, the first may already have succeeded.

Design recovery and consistency explicitly.

---

# Partial Failure

A multi-step async workflow can partially succeed:

```text id="y0fr7j"
User saved
Email failed
Analytics failed
```

The application must decide:

```text id="e3f3o7"
Should the user creation still count as successful?
Should the operation retry?
Should compensation occur?
Should the user be notified?
```

Do not assume one `catch` automatically solves transactional consistency.

---

# Compensation

Sometimes a failed later step requires a compensating action.

Example:

```js id="8k6b1d"
const user =
  await createUser();

try {
  await sendWelcomeEmail(user);
} catch (error) {
  await deactivateUser(
    user.id
  );

  throw error;
}
```

Compensation should be used only when the domain requires it.

---

# Async Workflow Orchestration

A coordinator can define the overall workflow:

```js id="9f8q9u"
async function createAccount(
  userData
) {
  const user =
    await createUser(userData);

  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    await deactivateUser(
      user.id
    );

    throw error;
  }

  return user;
}
```

Lower-level functions remain focused on their own responsibilities.

---

# Avoid Distributed Async State Without Ownership

Many async operations updating the same shared state can create difficult timing interactions.

Define:

```text id="pgo4e3"
Who owns the state?
Who starts the operation?
Who cancels it?
Who commits the result?
Who handles the error?
```

---

# Async Module Boundaries

Modules should expose useful asynchronous operations rather than implementation details.

Good:

```js id="xg4mgq"
export function fetchUser(id) {
  // ...
}
```

Less useful:

```js id="d6c0mw"
export const internalRequestQueue = [];
```

Consumers should interact with the module's intended API.

---

# Do Not Expose Internal Promise State

Avoid:

```js id="3op24e"
export let currentRequest = null;
```

when the module should manage the request internally.

Prefer:

```js id="57xj9o"
export function fetchUser() {
  // ...
}
```

and expose results through the function's contract.

---

# Async APIs Should Document Their Behavior

For reusable functions, document:

```text id="l6x8aw"
What resolves
What rejects
Cancellation support
Expected error types
Concurrency expectations
```

Example:

```js id="sg0y6c"
/**
 * Loads a user by ID.
 *
 * @param {number} userId
 * @param {AbortSignal} signal
 * @returns {Promise<Object>}
 * @throws {Error} when the request fails.
 */
async function fetchUser(
  userId,
  signal
) {
  // ...
}
```

---

# Avoid Async Wrapper Layers With No Value

Avoid:

```js id="t9v9sm"
async function getUser(id) {
  return fetchUser(id);
}
```

if the wrapper adds no:

```text id="qfx8ku"
Validation
Context
Transformation
Authorization
Caching
Logging
Abstraction
```

A wrapper should exist for a reason.

---

# Async Functions and Naming

Use domain language:

```js id="u2d5yt"
loadDashboard();
saveProfile();
fetchProjects();
syncSettings();
refreshSession();
```

The caller should not need to understand the implementation technique.

---

# Async Error Boundaries

Good boundaries include:

```text id="r6f6i1"
Network boundary
Task boundary
UI event boundary
Application workflow boundary
Background job boundary
```

Each boundary can make decisions appropriate to its layer.

---

# Background Work

Background work may be intentionally decoupled from the main user flow:

```js id="jv2c6u"
void sendAnalytics(
  {
    action: "profile_view",
  }
).catch(
  reportAnalyticsError
);
```

The main operation should not unnecessarily wait for analytics if analytics is non-critical.

---

# Do Not Detach Critical Work

Do not use fire-and-forget for operations whose success determines whether the primary operation succeeded.

Weak:

```js id="y1t5sa"
void saveOrder(order);
showSuccess();
```

The UI reports success before knowing whether the order was saved.

Prefer:

```js id="o5w1do"
await saveOrder(order);
showSuccess();
```

when saving is required.

---

# Async Operations and User Feedback

Provide feedback appropriate to operation duration:

```text id="g95h3w"
Instant
→ Often no loading indicator required.

Short
→ Small local loading state.

Long
→ Progress or informative status.

Cancelable
→ Provide cancellation when useful.
```

Do not show loading UI for every Promise automatically.

---

# Async Performance

Avoid unnecessary work after the result is no longer needed.

Examples:

```text id="7lj8nc"
Cancel stale requests
Abort downloads
Stop polling
Remove listeners
Clear timers
Release resources
```

Async optimization is often about avoiding work, not merely making work faster.

---

# Avoid Memory Leaks From Async Operations

Long-lived async operations can retain references.

Potential sources include:

```text id="wymsdp"
Timers
Event listeners
Subscriptions
Observers
Pending promises
Caches
Closures
```

Clean them up when the lifecycle ends.

---

# Async Cleanup With Component Lifecycles

In UI frameworks, a component may disappear while work is still running.

Cancellation or cleanup should prevent:

```text id="o7b6ux"
Stale updates
Unnecessary requests
Retained references
Duplicate subscriptions
```

The specific mechanism depends on the framework.

---

# Avoid Multiple Active Subscriptions

When subscribing repeatedly:

```js id="4d6mxh"
subscribe(handleUpdate);
```

ensure previous subscriptions are cleaned up when the lifecycle requires it.

Otherwise:

```text id="p8v0df"
One event
   ↓
Several handlers
   ↓
Duplicate work
```

---

# Async and Event Listeners

If an event can happen rapidly:

```js id="w7o3w3"
input.addEventListener(
  "input",
  handleSearch
);
```

each event may trigger asynchronous work.

This can produce many overlapping requests.

Use:

```text id="1ypt5v"
Debouncing
Cancellation
Request deduplication
Concurrency control
```

where appropriate.

---

# Debouncing Async Operations

For search inputs:

```js id="1aw2tb"
const search =
  debounce(
    async (query) => {
      await fetchResults(query);
    },
    300
  );
```

The goal is to wait until input stabilizes before starting work.

Debouncing is particularly useful for high-frequency events.

---

# Throttling Async Operations

Throttling limits how frequently an operation can start.

This can be useful for:

```text id="8f6tr4"
Scroll
Resize
Pointer movement
Continuous sensor events
```

Choose throttling when periodic updates are useful.

---

# Debounce vs Throttle

```text id="8x9dtq"
Debounce
→ Wait until activity stops.

Throttle
→ Allow execution at most once
  during a defined interval.
```

Choose based on the desired behavior.

---

# Async Functions and Scheduling

Async work interacts with the JavaScript event loop.

Promise callbacks run as microtasks.

Timers and many other browser callbacks are scheduled as tasks.

Understanding scheduling helps explain output order.

---

# Do Not Depend on Accidental Timing

Avoid code whose correctness depends on:

```js id="n95mbr"
setTimeout(
  operation,
  0
);
```

"being late enough."

Timers do not guarantee exact execution timing.

Use explicit synchronization instead.

---

# `setTimeout` Is Not a Synchronization Primitive

This is fragile:

```js id="m5n6wq"
startOperation();

setTimeout(
  () => {
    continueOperation();
  },
  100
);
```

The delay does not guarantee that the first operation is complete.

Prefer waiting for the operation itself:

```js id="l2mz1h"
await startOperation();

continueOperation();
```

when the operation is Promise-based.

---

# Async Coordination Should Use Actual Completion Signals

Good:

```js id="kj2yr8"
await loadData();
renderData();
```

Bad:

```js id="mipd9f"
loadData();

setTimeout(
  renderData,
  1000
);
```

The latter guesses how long the operation will take.

---

# Race-Free UI Updates

One pattern:

```js id="l7sx9k"
let latestRequest = 0;

async function load(query) {
  const requestId =
    ++latestRequest;

  const data =
    await searchApi(query);

  if (
    requestId !== latestRequest
  ) {
    return;
  }

  render(data);
}
```

The latest request owns the result.

---

# Cancellation and Request Ownership

An even stronger pattern may assign one controller to each request:

```js id="8c0omf"
let controller;

async function load(query) {
  controller?.abort();

  controller =
    new AbortController();

  const data =
    await searchApi(
      query,
      controller.signal
    );

  render(data);
}
```

The newer request cancels the older one.

Error handling should still distinguish aborts from actual failures.

---

# Avoid Shared Mutable Async Flags

Weak:

```js id="8xkq4j"
let isLoading = false;

async function operationA() {
  isLoading = true;

  await taskA();

  isLoading = false;
}
```

If `operationB()` also changes the same flag, the state can become incorrect.

Prefer state ownership that represents the actual number and identity of active operations.

---

# When Multiple Operations Can Overlap

A reference counter can sometimes represent active work:

```js id="4e2w6m"
let activeRequests = 0;

async function trackedRequest() {
  activeRequests += 1;

  try {
    return await request();
  } finally {
    activeRequests -= 1;
  }
}
```

However, use explicit state models when the application needs more information than a counter can provide.

---

# Async Resource Cleanup

For a resource created during an async workflow:

```js id="5l0cs7"
async function useResource() {
  const resource =
    await createResource();

  try {
    return await process(
      resource
    );
  } finally {
    await resource.close();
  }
}
```

The lifecycle is explicit:

```text id="c2bq0f"
Acquire
  ↓
Use
  ↓
Release
```

---

# Async Locking

When only one operation should modify a resource at a time, you may need an explicit queue or lock abstraction.

Avoid assuming:

```js id="m7n49r"
await operationA();
await operationB();
```

protects against another caller running concurrently.

Concurrency control must exist at the shared resource boundary.

---

# Async Mutex Concepts

A conceptual mutex ensures:

```text id="pt3f7s"
Operation A acquires lock
        ↓
Operation A runs
        ↓
Operation A releases lock
        ↓
Operation B runs
```

JavaScript does not provide a universal built-in async mutex for all application scenarios.

Use a well-defined abstraction when mutual exclusion is genuinely required.

---

# Avoid DIY Concurrency Control Without Understanding It

Concurrency utilities are subtle.

Common concerns include:

```text id="ndx0l7"
Fairness
Cancellation
Error propagation
Deadlocks
Starvation
Queue growth
Resource cleanup
```

Keep the abstraction as simple as possible.

---

# Async and Deadlocks

JavaScript's normal event loop differs from traditional thread-based deadlocks.

However, async workflows can still stall logically:

```text id="o3kpd7"
Operation A waits for B
Operation B waits for A
```

or:

```text id="u7azqv"
Queue cannot progress because
required work is waiting on the same queue.
```

Design dependencies carefully.

---

# Avoid Promise Chains That Hide Control Flow

This:

```js id="w26lmm"
fetchUser()
  .then(validateUser)
  .then(saveUser)
  .then(sendWelcomeEmail)
  .catch(handleError);
```

can be valid.

For more complex workflows, `async`/`await` may make the order and error boundaries easier to follow:

```js id="mr49ny"
async function createAccount(
  userData
) {
  const user =
    await fetchUser(
      userData.id
    );

  const validated =
    validateUser(user);

  const saved =
    await saveUser(validated);

  await sendWelcomeEmail(
    saved
  );

  return saved;
}
```

Use whichever style communicates the flow clearly.

---

# Avoid Mixing `await` and `.then()` Without Reason

Weak:

```js id="u0t2cq"
const user =
  await fetchUser()
    .then(validateUser);
```

This is valid, but mixing styles can reduce readability when the whole function already uses `await`.

Prefer:

```js id="t5uz1o"
const user =
  await fetchUser();

const validated =
  validateUser(user);
```

Consistency usually helps.

---

# Async Function Contracts

A reusable async function should make its behavior predictable:

```text id="b2s1md"
Input
Output Promise
Possible rejection
Cancellation support
Side effects
Concurrency behavior
```

For example:

```js id="0l70f1"
/**
 * Fetches a user by ID.
 *
 * @param {number} userId
 * @param {AbortSignal} signal
 * @returns {Promise<Object>}
 */
async function fetchUser(
  userId,
  signal
) {
  // ...
}
```

---

# Async APIs Should Be Composable

Good async functions can participate in:

```js id="b2j8sc"
await fetchUser();

Promise.all([
  fetchUser(),
  fetchProjects(),
]);

try {
  await saveUser();
} catch (error) {
  // ...
}
```

Avoid APIs that require callers to use strange timing or callback conventions.

---

# Keep Promise Creation Close to Promise Consumption

Avoid creating a Promise far away from where it is needed unless caching or sharing is intentional.

This:

```js id="7t7o7v"
const promise =
  fetchUser();

doUnrelatedWork();

const user =
  await promise;
```

is valid.

But if there is no reason to start the request early, direct usage may be clearer:

```js id="ufv1p3"
const user =
  await fetchUser();
```

Start work early only when it provides a meaningful benefit.

---

# Async Work Should Have a Lifecycle

For long-running operations, define:

```text id="9iqx6a"
Start
Progress
Completion
Failure
Cancellation
Cleanup
```

Missing lifecycle handling often causes leaks and stale state.

---

# Avoid Orphaned Async Work

An orphaned operation continues running even though nothing needs its result.

Examples:

```text id="5zizmy"
Search request after navigation
Timer after component removal
Polling after logout
Download after cancellation
Subscription after unmount
```

Cancellation and lifecycle cleanup prevent this.

---

# Async and Authentication

When authentication expires during async operations:

```text id="p5vyyi"
Request
   ↓
401
   ↓
Refresh session
   ↓
Retry if appropriate
```

This workflow should be centralized rather than duplicated in every request function.

---

# Avoid Infinite Refresh Loops

Be careful with:

```js id="l8i6m0"
401
  ↓
refresh
  ↓
retry
  ↓
401
  ↓
refresh
  ↓
retry
```

Refresh logic should have a bounded retry or explicit failure path.

---

# Async Operations and Navigation

If a user navigates away:

```text id="ht3s1p"
Should the request continue?
Should it be cancelled?
Should the result be cached?
Should the result be ignored?
```

Decide based on whether the operation remains useful.

---

# Async Operations and Persistence

Before updating persistent state asynchronously:

```text id="r0i5bn"
Validate
↓
Write
↓
Confirm
↓
Update UI
```

Do not show success before persistence has actually completed unless the application intentionally uses optimistic UI.

---

# Optimistic Updates

Optimistic UI updates the interface before the server confirms success.

Example concept:

```text id="1g4w2o"
User action
   ↓
Update UI immediately
   ↓
Send request
   ↓
Success → keep change
Failure → roll back
```

This can improve perceived responsiveness but requires a reliable rollback strategy.

---

# Do Not Use Optimistic Updates Without Rollback

If:

```js id="d69l0g"
removeProjectFromUI(projectId);
```

happens before:

```js id="l3k6am"
await deleteProject(projectId);
```

and the server rejects the deletion, the UI needs a recovery path.

Optimistic updates increase the complexity of error handling.

---

# Pessimistic Updates

A simpler approach is:

```text id="v2x0l5"
Send request
   ↓
Wait for success
   ↓
Update UI
```

This is easier to reason about but may feel slower.

Choose based on product requirements.

---

# Async Patterns and UX

Users should understand what the application is doing.

For example:

```text id="i53f7v"
Saving...
Saved
Save failed
```

These states are more informative than silently waiting.

---

# Avoid Spinners Without State Meaning

A spinner only communicates:

```text id="m8x2c5"
Something is happening.
```

When useful, communicate the actual operation:

```text id="9q7j8o"
Saving profile...
Uploading file...
Refreshing projects...
```

The async state should reflect the operation.

---

# Async Testing

Async code should be tested for:

```text id="ef24b7"
Success
Failure
Timeout
Cancellation
Concurrency
Race conditions
Partial failure
Cleanup
```

Do not test only the happy path.

---

# Test Sequential Behavior

If an operation must happen in order:

```text id="q3w0ds"
Validate
↓
Save
↓
Notify
```

tests should verify the sequence where the ordering matters.

---

# Test Concurrent Behavior

If operations intentionally run concurrently:

```js id="8i9s0b"
await Promise.all([
  fetchUser(),
  fetchProjects(),
]);
```

tests should not assume they execute sequentially.

Verify the actual contract rather than internal timing.

---

# Avoid Timing-Based Tests

Weak:

```js id="wq78k4"
await delay(1000);

expect(result).toBe(...);
```

Tests should usually wait for a deterministic condition rather than sleeping for an arbitrary amount of time.

---

# Use Explicit Completion Signals in Tests

Prefer:

```text id="v8qzde"
Await the Promise
Wait for the relevant event
Wait for the expected state
```

rather than:

```text id="ytgqjj"
Sleep and hope the operation finished
```

---

# Async Debugging

When debugging async code, inspect:

```text id="2l0u6a"
Where the Promise was created
Where it was awaited
When it resolved
When it rejected
Which operation finished first
Whether cancellation occurred
Whether cleanup ran
```

Logging timestamps and request IDs can help diagnose race conditions.

---

# Use Request IDs for Complex Async Flows

Example:

```js id="h24x4h"
const requestId =
  crypto.randomUUID();

console.log(
  requestId,
  "request started"
);
```

Use the same identifier through the workflow.

This helps correlate logs across asynchronous operations.

---

# Async Logging Should Include Context

Useful:

```js id="03kj9l"
console.error(
  "Failed to save profile",
  {
    userId,
    requestId,
    error,
  }
);
```

Avoid logging sensitive personal or authentication data unnecessarily.

---

# Avoid Logging Entire Response Bodies

Large or sensitive payloads can:

```text id="2ln5h5"
Increase log volume
Expose private data
Slow the application
Make debugging harder
```

Log the smallest useful diagnostic context.

---

# Async Security

Asynchronous flows can expose race conditions and stale authorization.

For example:

```text id="c3p3j9"
User logs out
   ↓
Old request completes
   ↓
Old data is rendered
```

Cancellation and state validation can reduce these issues.

---

# Do Not Trust Client-Side Async State for Authorization

A UI state such as:

```js id="x0id7s"
const isAdmin = true;
```

does not provide actual security.

Authorization must ultimately be enforced by the trusted backend or server-side boundary.

Client-side async state is for UX and application behavior, not access control.

---

# Async and Resource Limits

Every async operation consumes some resource:

```text id="m8rfif"
Memory
Network
CPU
Sockets
Connections
Server capacity
```

Concurrency should be designed with those limits in mind.

---

# Avoid Unbounded Concurrency

Do not assume:

```js id="0f8lj6"
await Promise.all(
  hugeCollection.map(
    processItem
  )
);
```

is always efficient.

For large workloads, introduce:

```text id="c2zqte"
Batching
Workers
Queues
Concurrency limits
Streaming
```

---

# Async Architecture Should Match Workload

Small client application:

```text id="ofndw5"
async/await
Promise.all
AbortController
```

may be sufficient.

Larger system:

```text id="7mtg7l"
Queues
Retries
Backoff
Idempotency
Concurrency limits
Observability
```

may be necessary.

Do not introduce large infrastructure for a small problem.

---

# Recommended Async Decision Framework

Before writing asynchronous code, ask:

```text id="k7s2z0"
Is this operation asynchronous?

Does another operation depend on its result?

Can independent operations run concurrently?

How many operations can run at once?

Can the operation be cancelled?

What happens if it fails?

Can it be retried?

Is retrying safe?

Who owns the result?

What happens if the result becomes stale?

What resources must be cleaned up?

What user feedback is appropriate?
```

These questions prevent many common async bugs.

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text id="0pkb7u"
Use async/await for readable async flows.

Understand Promises underneath async/await.

Sequentialize dependent work.

Parallelize independent work.

Use Promise.all for required concurrent operations.

Use Promise.allSettled when partial failure is acceptable.

Use Promise.race and Promise.any only when their
semantics match the problem.

Do not use forEach with async callbacks when you
need to await the operations.

Use for...of for sequential asynchronous iteration.

Use Promise.all with map for concurrent operations.

Control concurrency for large workloads.

Support cancellation for long-running or stale work.

Handle AbortError separately when appropriate.

Prevent stale results from overwriting newer state.

Do not rely on arbitrary timer delays for synchronization.

Use actual completion signals.

Keep async functions focused.

Keep side effects and async boundaries visible.

Use finally for cleanup.

Do not swallow Promise rejections.

Retry only when failure is transient and retry-safe.

Bound retries.

Consider idempotency for retried operations.

Keep async state explicit.

Avoid duplicate submissions.

Avoid unbounded polling.

Clean up subscriptions, timers, and pending work.

Design async workflows around ownership and lifecycle.
```

---

# Async Checklist

Before finalizing asynchronous code:

```text id="t7o5g1"
[ ] Is the operation genuinely asynchronous?

[ ] Is the function intentionally async?

[ ] Are dependent operations sequential?

[ ] Are independent operations concurrent where useful?

[ ] Is Promise.all being used for the right reason?

[ ] Could Promise.allSettled be more appropriate?

[ ] Is concurrency bounded?

[ ] Can the operation become stale?

[ ] Can it be cancelled?

[ ] Is AbortController appropriate?

[ ] Are aborts distinguished from real failures?

[ ] Are Promise rejections handled?

[ ] Is retry behavior intentional?

[ ] Is retrying safe?

[ ] Are retries bounded?

[ ] Are resources cleaned up?

[ ] Are stale results prevented?

[ ] Could duplicate submissions occur?

[ ] Could operations overlap unexpectedly?

[ ] Is async state represented clearly?

[ ] Is user feedback appropriate?

[ ] Is the operation easy to test deterministically?
```

---

# Final Principles

```text id="6e7d0x"
Async code is about coordination.

Dependencies determine ordering.

Independence enables concurrency.

Concurrency requires resource awareness.

Cancellation is part of lifecycle management.

Race conditions require explicit ownership or ordering.

Retries require failure classification and idempotency.

Cleanup belongs in the lifecycle.

Timers are not synchronization primitives.

Promise combinators express different failure semantics.

Async state should be explicit.

Stale results should not overwrite current state.

Critical work should be awaited.

Optional background work can be detached intentionally.

The simplest correct concurrency model is usually the best one.
```

---

# Summary

A strong asynchronous design can be reduced to a few questions:

```text id="y8s1q2"
What depends on what?
What can happen at the same time?
What happens when something fails?
What happens when the operation is no longer needed?
Who owns the result?
Who owns cleanup?
```

A useful mental model is:

```text id="w6v1x8"
Dependency graph
      +
Concurrency control
      +
Cancellation
      +
Error handling
      +
Lifecycle cleanup
      =
Predictable async behavior
```

The most important rule is:

```text id="d8j5ax"
Do not let timing determine correctness.

Make ordering, concurrency, cancellation,
and failure behavior explicit.
```
