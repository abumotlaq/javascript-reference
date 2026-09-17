# Memory and Resource Management

## Overview

JavaScript manages memory automatically through garbage collection, but developers are still responsible for controlling object lifetimes and browser or runtime resources.

Memory problems often come from keeping references alive longer than necessary.

Resource problems can also involve:

```text id="7m2x4a"
Event listeners
Timers
Observers
Subscriptions
Network requests
WebSocket connections
Object URLs
Streams
File handles
Caches
Workers
DOM references
```

Good resource management means understanding:

```text id="2k6v9p"
Who owns the resource?
When is it created?
How long is it needed?
What keeps it alive?
When should it be released?
What happens if the operation fails?
```

The goal is not manual memory management.

The goal is intentional lifecycles.

---

# JavaScript Memory Is Garbage Collected

JavaScript runtimes automatically reclaim memory that is no longer reachable.

Conceptually:

```text id="4j8q3m"
Object created
    ↓
Object reachable
    ↓
Object no longer reachable
    ↓
Eligible for garbage collection
```

Developers influence this process by controlling references.

---

# Reachability Matters

An object remains reachable when something still references it.

For example:

```js id="6x7m2q"
const user = {
  name: "Osama Abu Motlaq",
};
```

As long as `user` remains reachable, the object remains reachable.

When all references disappear:

```js id="h9f4w1"
let user = {
  name: "Osama Abu Motlaq",
};

user = null;
```

the object may eventually become eligible for garbage collection.

The runtime decides when collection actually occurs.

---

# Garbage Collection Is Not Immediate

Do not assume:

```js id="k1m8c5"
object = null;
```

means:

```text id="4z7q2p"
Memory is immediately returned.
```

It means that the particular reference no longer points to that object.

Other references may still exist.

The garbage collector also controls when collection happens.

---

# Memory Leaks Usually Mean Unexpected Reachability

A memory leak in managed JavaScript often occurs when objects remain reachable even though the application no longer needs them.

Common causes include:

```text id="m7q3x8"
Unremoved event listeners
Uncleared timers
Persistent subscriptions
Unbounded caches
Long-lived closures
Detached DOM references
Pending work
Global references
```

The problem is not that JavaScript cannot collect memory.

The problem is that your program is still holding references.

---

# Resource Leaks Are Broader Than Memory Leaks

A resource can leak even when memory is technically reclaimed later.

Examples:

```text id="r4n8y2"
Timer continues running
Network request continues unnecessarily
Observer remains connected
WebSocket remains open
Subscription remains active
Object URL remains allocated
Worker continues executing
```

Good resource management handles both memory and non-memory lifecycles.

---

# Ownership

The most important question is:

```text id="q6v2m9"
Who owns this resource?
```

The owner should generally know:

```text id="1z7k4c"
How it was created
Why it exists
When it should stop
How it should be cleaned up
```

For example:

```js id="m9x4q1"
const intervalId =
  setInterval(
    refreshData,
    5000
  );
```

The code creating the interval should also know when to call:

```js id="y6c8p3"
clearInterval(
  intervalId
);
```

---

# Every Setup Should Have a Teardown Story

When you create:

```js id="b5m7x9"
addEventListener(...)
```

ask:

```text id="r8k2v4"
When is removeEventListener() called?
```

When you create:

```js id="p4n6w1"
setInterval(...)
```

ask:

```text id="k3q9m8"
When is clearInterval() called?
```

When you create:

```js id="j7m4c2"
observer.observe(...)
```

ask:

```text id="z8n5q3"
When is disconnect() called?
```

This mindset prevents many lifecycle bugs.

---

# Event Listener Lifecycle

Example:

```js id="q2w7m3"
function mount(button) {
  button.addEventListener(
    "click",
    handleClick
  );

  return function unmount() {
    button.removeEventListener(
      "click",
      handleClick
    );
  };
}
```

The lifecycle is explicit:

```text id="9m3x7k"
mount
  ↓
listener active
  ↓
unmount
  ↓
listener removed
```

---

# Anonymous Listeners Complicate Cleanup

This:

```js id="t6p2q8"
button.addEventListener(
  "click",
  () => {
    handleClick();
  }
);
```

is harder to remove because the function reference is not retained.

Prefer:

```js id="g4m9x1"
button.addEventListener(
  "click",
  handleClick
);
```

when explicit cleanup is required.

---

# Abortable Event Listeners

An `AbortSignal` can help manage listener lifecycles:

```js id="w7j3n6"
const controller =
  new AbortController();

button.addEventListener(
  "click",
  handleClick,
  {
    signal:
      controller.signal,
  }
);
```

Cleanup:

```js id="q5v8m2"
controller.abort();
```

This can be useful when multiple listeners belong to one feature lifecycle.

---

# Timers Are Resources

A timer creates ongoing runtime work.

Example:

```js id="h3n7x2"
const timeoutId =
  setTimeout(
    handleTimeout,
    5000
  );
```

If the timer becomes unnecessary:

```js id="v9m4q6"
clearTimeout(
  timeoutId
);
```

---

# Intervals Require Explicit Cleanup

An interval continues running until it is cleared:

```js id="k2x8p4"
const intervalId =
  setInterval(
    refreshData,
    5000
  );
```

Cleanup:

```js id="m6q3y1"
clearInterval(
  intervalId
);
```

Never assume an interval will stop automatically.

---

# Avoid Permanent Intervals Without Ownership

Weak:

```js id="a7r2m9"
setInterval(
  refreshData,
  5000
);
```

with no reference or lifecycle strategy.

Better:

```js id="x4k7p1"
const intervalId =
  setInterval(
    refreshData,
    5000
  );

function stopRefreshing() {
  clearInterval(
    intervalId
  );
}
```

---

# Intervals Can Create Overlapping Work

An interval that starts asynchronous operations may overlap them:

```js id="h8m5q2"
setInterval(
  async () => {
    await refreshData();
  },
  1000
);
```

If `refreshData()` takes three seconds:

```text id="c7n4x9"
Request 1 starts
Request 2 starts
Request 3 starts
...
```

This can increase:

```text id="p2w6k3"
Network usage
Memory
Server load
Race conditions
```

---

# Prefer Controlled Polling

When overlap is undesirable:

```js id="r5x8m1"
async function poll() {
  while (!signal.aborted) {
    await refreshData(
      signal
    );

    await delay(
      5000,
      signal
    );
  }
}
```

The next cycle begins only after the previous one completes.

---

# Observers Need Cleanup

Browser observers include:

```text id="q8m2v5"
IntersectionObserver
ResizeObserver
MutationObserver
PerformanceObserver
```

After the feature is destroyed:

```js id="n4x7c1"
observer.disconnect();
```

Disconnecting releases the observer's active relationship with its targets.

---

# IntersectionObserver

Example:

```js id="f6m9x2"
const observer =
  new IntersectionObserver(
    (entries) => {
      for (
        const entry
        of entries
      ) {
        if (
          entry.isIntersecting
        ) {
          loadContent();
        }
      }
    }
  );

observer.observe(
  target
);
```

Cleanup:

```js id="b3q7m4"
observer.disconnect();
```

---

# ResizeObserver

Example:

```js id="k9x5m2"
const observer =
  new ResizeObserver(
    (entries) => {
      for (
        const entry
        of entries
      ) {
        console.log(
          entry.contentRect.width
        );
      }
    }
  );

observer.observe(
  container
);
```

Cleanup:

```js id="v2c8n6"
observer.disconnect();
```

---

# MutationObserver

If an observer is connected:

```js id="m7f3x9"
observer.observe(
  container,
  {
    childList: true,
    subtree: true,
  }
);
```

disconnect it when the feature no longer needs DOM monitoring:

```js id="p8w4q2"
observer.disconnect();
```

---

# WebSocket Connections

A WebSocket is a long-lived network resource.

Example:

```js id="a6k9m3"
const socket =
  new WebSocket(
    "wss://example.com"
  );
```

When no longer needed:

```js id="x2n7v4"
socket.close();
```

---

# WebSocket Lifecycle

A useful lifecycle is:

```text id="r9c4m2"
Create
  ↓
Connect
  ↓
Receive/send
  ↓
Close
```

The application should define when the connection ends.

---

# Avoid Leaving WebSockets Open Indefinitely

An open socket can consume:

```text id="y6q2w8"
Memory
Network resources
Server resources
Application state
```

Close it when the feature or session no longer requires it.

---

# EventSource Connections

Server-Sent Events also create long-lived connections:

```js id="n5m8x3"
const source =
  new EventSource(
    "/api/events"
  );
```

Cleanup:

```js id="q7c4v2"
source.close();
```

Do not forget long-lived browser connections.

---

# Subscriptions

Any subscription-like API needs a teardown strategy.

For example:

```js id="c8m3p7"
const unsubscribe =
  subscribe(
    handleUpdate
  );
```

Cleanup:

```js id="w4x9k2"
unsubscribe();
```

A returned cleanup function is often an excellent API design.

---

# Cleanup Functions

A useful pattern:

```js id="q3n7m1"
function subscribeToUsers() {
  const unsubscribe =
    userStore.subscribe(
      handleUpdate
    );

  return unsubscribe;
}
```

Then:

```js id="x8m4v6"
const cleanup =
  subscribeToUsers();

cleanup();
```

Ownership is explicit.

---

# Resources With Multiple Cleanup Actions

A feature may own several resources:

```js id="t5k9q3"
function mount() {
  const controller =
    new AbortController();

  const intervalId =
    setInterval(
      refresh,
      5000
    );

  const observer =
    new ResizeObserver(
      handleResize
    );

  observer.observe(
    container
  );

  return function unmount() {
    controller.abort();

    clearInterval(
      intervalId
    );

    observer.disconnect();
  };
}
```

One lifecycle boundary controls all resources.

---

# Cleanup Should Be Idempotent When Practical

An idempotent cleanup can safely run more than once:

```js id="m2x7n4"
function createTimer() {
  const timerId =
    setTimeout(
      handleTimeout,
      5000
    );

  return function cleanup() {
    clearTimeout(
      timerId
    );
  };
}
```

Calling:

```js id="q8c4v1"
cleanup();
cleanup();
```

does not create another problem.

Idempotent teardown simplifies lifecycle management.

---

# Cleanup Should Be Safe After Partial Setup

A feature may fail during initialization.

For example:

```js id="f7m3x9"
function mount() {
  const controller =
    new AbortController();

  const intervalId =
    setInterval(
      refresh,
      5000
    );

  const observer =
    new ResizeObserver(
      handleResize
    );

  observer.observe(
    container
  );

  return function unmount() {
    controller.abort();
    clearInterval(
      intervalId
    );
    observer.disconnect();
  };
}
```

A robust design should also consider what happens if one setup step throws before all resources are initialized.

---

# Use `try...finally` for Resource Lifecycles

When resource acquisition and release happen in one operation:

```js id="k4n8x2"
async function processFile(file) {
  const resource =
    await openResource();

  try {
    return await process(
      resource,
      file
    );
  } finally {
    await resource.close();
  }
}
```

This establishes:

```text id="b6q2m7"
Acquire
  ↓
Use
  ↓
Release
```

even when processing fails.

---

# Cleanup Should Not Depend Only on Success

Weak:

```js id="v7m2q9"
const resource =
  await openResource();

const result =
  await process(resource);

await resource.close();

return result;
```

If `process()` throws, the cleanup never runs.

Prefer:

```js id="r3x8k5"
const resource =
  await openResource();

try {
  return await process(
    resource
  );
} finally {
  await resource.close();
}
```

---

# Abort In-Flight Network Requests

A pending network request may continue after the user no longer needs its result.

Use:

```js id="w6n4p1"
const controller =
  new AbortController();

fetch(
  "/api/projects",
  {
    signal:
      controller.signal,
  }
);
```

Cleanup:

```js id="j9q5m3"
controller.abort();
```

---

# Cancellation Prevents Unnecessary Work

Cancellation can save:

```text id="f4x7c9"
Network bandwidth
CPU work
Memory
Server resources
UI updates
```

It also reduces the number of stale results the application must handle.

---

# Ignore Stale Results When Cancellation Is Not Available

If an operation cannot be cancelled, ensure stale results cannot overwrite current state.

Example:

```js id="m3x8q2"
let latestRequestId = 0;

async function search(query) {
  const requestId =
    ++latestRequestId;

  const results =
    await searchApi(query);

  if (
    requestId !==
    latestRequestId
  ) {
    return;
  }

  renderResults(results);
}
```

The latest request controls the result.

---

# Closures Can Retain Large Objects

Consider:

```js id="v8m2q6"
const largeData =
  createLargeData();

button.addEventListener(
  "click",
  () => {
    console.log(
      largeData
    );
  }
);
```

The listener closure references `largeData`.

As long as the listener remains reachable, the referenced data can remain reachable too.

---

# Avoid Capturing More Than Needed

Weak:

```js id="g5x9n2"
function createHandler(
  largeApplicationState
) {
  return () => {
    console.log(
      largeApplicationState.user.name
    );
  };
}
```

If the handler only needs the user name:

```js id="k7m4p8"
function createHandler(
  userName
) {
  return () => {
    console.log(
      userName
    );
  };
}
```

Reducing captured state can reduce unnecessary retention.

Do this when the captured object is large or long-lived.

---

# Closures Are Not Memory Leaks

Closures naturally retain variables they need.

This is valid:

```js id="z4n8m1"
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;

    return count;
  };
}
```

The closed-over state is intentionally part of the object's lifetime.

A closure becomes problematic when it unintentionally retains large or long-lived data.

---

# Detached DOM Nodes

A DOM element removed from the document can still remain in memory if JavaScript holds a reference to it.

Example:

```js id="r2m7v4"
const element =
  document.querySelector(
    "#profile"
  );

element.remove();
```

If another long-lived structure still references `element`, the object may remain reachable.

Avoid keeping stale DOM references indefinitely.

---

# Clear References When Appropriate

For a long-lived object holding replaceable large data:

```js id="n6x3q8"
let currentReport =
  generateLargeReport();

function releaseReport() {
  currentReport = null;
}
```

This can make the data eligible for collection when no other references exist.

Use explicit reference clearing only when it reflects a real lifecycle.

---

# Avoid Global Retention

Global variables can keep objects alive for the lifetime of the application:

```js id="m8q4z1"
window.largeCache = {};
```

Global state should have a clear retention policy.

---

# Module-Level Caches

This pattern:

```js id="v7n3c5"
const cache =
  new Map();
```

can be useful.

But a module-level cache may live for the lifetime of the module.

Define:

```text id="k5m2x9"
Maximum size
Expiration
Invalidation
Cleanup
```

when the data can grow.

---

# Bounded Caches

A simple size limit can prevent unbounded growth:

```js id="q4x8m6"
const MAX_CACHE_SIZE = 100;

function setCache(
  cache,
  key,
  value
) {
  cache.set(
    key,
    value
  );

  if (
    cache.size >
    MAX_CACHE_SIZE
  ) {
    const firstKey =
      cache.keys().next().value;

    cache.delete(
      firstKey
    );
  }
}
```

The eviction strategy should match the application's actual requirements.

---

# Time-Based Cache Expiration

A cache entry can include a timestamp:

```js id="h9m3x7"
const cache =
  new Map();

cache.set(
  "user",
  {
    value: user,
    expiresAt:
      Date.now() + 60_000,
  }
);
```

Later:

```js id="f2q7k4"
const entry =
  cache.get("user");

if (
  entry &&
  entry.expiresAt >
    Date.now()
) {
  return entry.value;
}
```

Expired entries should eventually be removed.

---

# Expiration Does Not Automatically Free Memory

An object stored in:

```js id="j7m5x2"
cache
```

remains reachable until removed from the cache.

An `expiresAt` property alone does not make the object collectible.

---

# Remove Expired Entries

Weak:

```js id="s8n4m1"
if (
  entry.expiresAt <
  Date.now()
) {
  return null;
}
```

The expired entry may still remain in the map.

Better:

```js id="c3x7q9"
if (
  entry.expiresAt <
  Date.now()
) {
  cache.delete(
    "user"
  );

  return null;
}
```

---

# WeakMap for Object-Associated Data

If metadata should follow an object's lifetime:

```js id="n5k8m2"
const metadata =
  new WeakMap();

function setMetadata(
  object,
  value
) {
  metadata.set(
    object,
    value
  );
}
```

The metadata map does not provide the same strong-reference behavior as an ordinary `Map`.

This is useful when the key object's lifetime should determine metadata relevance.

---

# WeakMap Is Not a General Cache Replacement

A `WeakMap` has important limitations:

```text id="7x2n4m"
Keys must be objects
Not iterable
No size property
Special garbage-collection semantics
```

Use it for object-associated metadata or similar lifecycle-sensitive relationships.

---

# WeakRef and FinalizationRegistry

JavaScript also provides:

```text id="q8m4v1"
WeakRef
FinalizationRegistry
```

These are advanced tools.

Their behavior depends on garbage collection timing and should not be used for critical application correctness.

---

# Do Not Build Logic Around Finalization Timing

Avoid:

```js id="m7x3c9"
registry.register(
  object,
  () => {
    saveImportantData();
  }
);
```

as if the callback will happen at a predictable time.

Garbage collection is nondeterministic.

Use explicit cleanup for important resources.

---

# Explicit Cleanup Beats Garbage Collection

Garbage collection can reclaim JavaScript objects.

It does not replace:

```text id="r4n6y8"
clearInterval()
removeEventListener()
observer.disconnect()
socket.close()
controller.abort()
URL.revokeObjectURL()
worker.terminate()
```

Those operations define the lifecycle of external resources.

---

# Web Workers

Workers can continue running independently of UI code.

Example:

```js id="x5q9m1"
const worker =
  new Worker(
    "/worker.js"
  );
```

When the worker is no longer needed:

```js id="b7m3k8"
worker.terminate();
```

Do not leave unnecessary workers running indefinitely.

---

# Worker Message Listeners

Workers may also have listeners:

```js id="p2n8x4"
worker.addEventListener(
  "message",
  handleMessage
);
```

Remove them when necessary or terminate the worker when its entire lifecycle ends.

---

# Blob URLs

Creating a Blob URL:

```js id="v6m4q1"
const url =
  URL.createObjectURL(
    blob
  );
```

allocates a browser resource associated with that URL.

Release it:

```js id="g8x2m5"
URL.revokeObjectURL(
  url
);
```

when no longer needed.

---

# Blob URL Lifecycle

A useful model:

```text id="k5q9n3"
Create Blob URL
    ↓
Use URL
    ↓
Stop using URL
    ↓
Revoke URL
```

Do not create a new object URL repeatedly without revoking old ones when they are no longer needed.

---

# File Handles and Streams

APIs that expose streams, files, or other resources may require explicit closing or cancellation.

The exact API determines the correct cleanup operation.

Always read the lifecycle contract for resources that are not ordinary JavaScript objects.

---

# Abort Signals

An `AbortController` itself is lightweight, but the operations connected to its signal may be long-lived.

A useful pattern:

```js id="u8m4k2"
const controller =
  new AbortController();

async function run() {
  try {
    return await fetch(
      "/api/data",
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
}
```

The controller becomes part of the operation's lifecycle.

---

# Streams and Backpressure

Streaming resources can remain active while data is produced or consumed.

Resource management must account for:

```text id="h2v7m5"
Cancellation
Closing
Backpressure
Error propagation
Consumer speed
Producer speed
```

Do not assume a stream ends automatically.

---

# Avoid Unbounded Buffers

Weak:

```js id="q6m3x8"
const chunks = [];

for await (
  const chunk
  of stream
) {
  chunks.push(chunk);
}
```

This stores the entire stream in memory.

If the data is large, consider processing incrementally.

---

# Process Streams Incrementally

Instead of accumulating everything:

```js id="y8k4m1"
for await (
  const chunk
  of stream
) {
  processChunk(chunk);
}
```

This can reduce peak memory usage.

The correct pattern depends on whether the complete data is actually required.

---

# Resource Limits

Every application should consider resource limits for:

```text id="f3n7m2"
Cache size
Queue size
Concurrent requests
Open connections
Active timers
Worker count
DOM nodes
Stored history
```

Unlimited growth is often a design bug.

---

# Queues Can Grow Forever

Weak:

```js id="x9m5q2"
const queue = [];

function enqueue(task) {
  queue.push(task);
}
```

If producers are faster than consumers, the queue grows.

A robust queue needs policies for:

```text id="v6q3n8"
Maximum size
Backpressure
Dropping
Prioritization
Cancellation
Failure handling
```

---

# Backpressure

When producers generate work faster than consumers process it:

```text id="q7m2x5"
Producer
   ↓
Queue grows
   ↓
Memory grows
   ↓
System becomes unstable
```

Good designs slow producers or reject excess work.

---

# Concurrency Limits Protect Resources

Instead of:

```js id="n4x8p2"
await Promise.all(
  items.map(
    processItem
  )
);
```

for a huge collection, limit concurrency.

A concurrency limit controls:

```text id="g5m7c1"
Active operations
Memory usage
Network pressure
External service load
```

---

# Cleanup on Errors

Resource cleanup must happen even when operations fail:

```js id="r8x2m4"
const connection =
  await openConnection();

try {
  return await runQuery(
    connection
  );
} finally {
  await connection.close();
}
```

Failure should not bypass resource release.

---

# Partial Initialization

If setup has several steps:

```js id="m3q9x7"
const listener =
  addListener();

const timer =
  createTimer();

const observer =
  createObserver();
```

and the third operation fails, the first two still need cleanup.

Consider designing setup as one lifecycle-managed operation.

---

# Centralized Cleanup

A cleanup function can keep teardown logic in one place:

```js id="p4n8x2"
function mount() {
  const resources = [];

  try {
    resources.push(
      createListener()
    );

    resources.push(
      createTimer()
    );

    resources.push(
      createObserver()
    );
  } catch (error) {
    for (
      const cleanup
      of resources.reverse()
    ) {
      cleanup();
    }

    throw error;
  }

  return function unmount() {
    for (
      const cleanup
      of resources.reverse()
    ) {
      cleanup();
    }
  };
}
```

This pattern can be useful for complex lifecycle setup.

Keep the implementation proportional to the actual complexity.

---

# Cleanup Order Can Matter

Sometimes resources depend on one another.

For example:

```text id="w6m3x9"
Stop consumer
   ↓
Close stream
   ↓
Release transport
```

Do not assume cleanup order is irrelevant.

Release dependent resources in a sensible order.

---

# Async Cleanup

Some resources require asynchronous teardown:

```js id="k8m4p2"
await subscription.close();
```

If cleanup returns a Promise, the owner should know whether it must await that cleanup before considering the lifecycle complete.

---

# Cleanup Errors

Cleanup can fail too.

For example:

```js id="y2q7n5"
try {
  await resource.close();
} catch (error) {
  reportCleanupError(error);
}
```

A cleanup failure should not always mask the original operation failure.

Design error handling carefully.

---

# Do Not Mask the Primary Error During Cleanup

Suppose:

```js id="c5m8x3"
try {
  await process();
} finally {
  await cleanup();
}
```

If both `process()` and `cleanup()` fail, the cleanup failure can affect what the caller observes.

For critical systems, consider how to preserve both failures or prioritize the original failure.

---

# Resource Management and Error Causes

When wrapping cleanup errors or operation errors, preserve context with structured error causes when appropriate.

The goal is to maintain the failure chain without losing the primary problem.

---

# Resource Ownership Across Modules

Avoid:

```js id="m7x2v9"
moduleA.createSocket();

moduleB.closeSocket();

moduleC.restartSocket();
```

when no module clearly owns the socket.

Prefer a single owner:

```text id="g3n8q1"
Socket module
   ↓
create
send
restart
close
```

Other modules use the public API.

---

# Avoid Global Resources Without Lifecycle Policies

Global:

```js id="j6m4x8"
const socket =
  new WebSocket(...);
```

may be appropriate for an application-wide connection.

But define:

```text id="f8q3n2"
When it starts
When it reconnects
When it closes
When authentication changes
When the application shuts down
```

---

# Authentication Changes Can Require Cleanup

When a user logs out:

```text id="b4m7x1"
Abort user-specific requests
Close user-specific sockets
Clear sensitive cached data
Remove user-specific subscriptions
Clear user-specific timers
```

Do not leave resources associated with the previous session active.

---

# Navigation Can Require Cleanup

When leaving a page or feature:

```text id="q8n2m5"
Abort fetches
Remove listeners
Disconnect observers
Clear timers
Stop media
Close sockets
Release temporary data
```

The exact cleanup depends on the feature.

---

# Component Lifecycles

UI components are a common ownership boundary.

A component may create:

```text id="x6m9v3"
Listeners
Timers
Observers
Subscriptions
Requests
```

When the component unmounts, these resources should be cleaned up when they are no longer useful.

---

# Avoid Async Work Outliving Its Owner

If a component starts:

```js id="n3q7m2"
fetchData();
```

and then disappears, decide whether:

```text id="p5x8k4"
The request should continue
or
The request should be cancelled
```

Do not let lifecycle behavior happen accidentally.

---

# React Effect Cleanup

In React, side effects that create resources should return cleanup functions.

Conceptually:

```js id="v7m4x2"
useEffect(() => {
  const intervalId =
    setInterval(
      refresh,
      5000
    );

  return () => {
    clearInterval(
      intervalId
    );
  };
}, []);
```

The cleanup runs when the effect is removed or re-executed according to its dependencies.

---

# React Effects and AbortController

A fetch started by an effect can be tied to cleanup:

```js id="m8q3y1"
useEffect(() => {
  const controller =
    new AbortController();

  fetchUser(
    controller.signal
  );

  return () => {
    controller.abort();
  };
}, []);
```

This connects the request lifecycle to the component effect lifecycle.

---

# Do Not Use Effects as Generic Resource Dumps

An effect should have a focused responsibility.

Avoid one effect that creates:

```text id="c4x7m9"
Timers
WebSocket
DOM listeners
Analytics
Multiple requests
Storage synchronization
```

for unrelated reasons.

Separate lifecycles where that improves ownership and cleanup.

---

# Resource Management and React State

Do not store resource handles in ordinary state unless the UI genuinely needs to react to changes in those handles.

For example:

```js id="f2m8q4"
const intervalRef =
  useRef(null);
```

may be more appropriate than:

```js id="q5x7n3"
const [
  intervalId,
  setIntervalId
] = useState(null);
```

when the handle is an implementation detail.

---

# Avoid Rendering Resource Handles

Values such as:

```text id="b8m2x6"
Timer IDs
AbortControllers
DOM nodes
WebSocket objects
Observers
```

usually belong in internal references rather than UI state.

---

# Resource Management and Module State

A module can own a resource:

```js id="v6x3m9"
let socket = null;

export function connect() {
  socket =
    new WebSocket(...);
}

export function disconnect() {
  socket?.close();
  socket = null;
}
```

The module exposes lifecycle operations instead of exposing the raw socket.

---

# Make Resource State Explicit

For a connection:

```text id="r8m4k1"
disconnected
connecting
connected
closing
closed
```

Explicit states make lifecycle behavior easier to reason about.

---

# Avoid Boolean-Only Resource State

Weak:

```js id="z7m2p5"
let isConnected = false;
```

A connection can be:

```text id="3q8n6v"
Connecting
Connected
Closing
Closed
```

A single boolean cannot represent all of these states.

---

# Resource Cleanup and `finally`

For temporary resources:

```js id="m5x8q2"
const resource =
  await acquire();

try {
  return await use(
    resource
  );
} finally {
  await release(
    resource
  );
}
```

This is one of the most reliable general-purpose lifecycle patterns.

---

# Scope Resources as Narrowly as Possible

Prefer:

```js id="k8q3m7"
async function processFile() {
  const resource =
    await acquire();

  try {
    return await process(
      resource
    );
  } finally {
    await release(
      resource
    );
  }
}
```

over keeping `resource` in module-global state unless the resource genuinely needs application-wide lifetime.

---

# Short Lifetimes Reduce Risk

A resource that exists for:

```text id="f6m3x1"
10 seconds
```

is generally easier to reason about than one that exists for:

```text id="n8q5z2"
The entire application lifetime
```

Prefer the shortest practical lifecycle.

---

# Long-Lived Resources Need Stronger Ownership

Examples:

```text id="q3m7x9"
Application WebSocket
Global cache
Service worker coordination
Persistent worker
Analytics queue
```

These should have explicit startup and shutdown policies.

---

# Resource Management and Application Shutdown

Long-running environments such as Node.js services may need cleanup during shutdown.

Examples:

```text id="z8m4p1"
HTTP server
Database pool
WebSocket server
Timers
Queues
Workers
```

A graceful shutdown sequence should stop accepting new work and release resources.

---

# Graceful Shutdown

A conceptual sequence:

```text id="r7n2k5"
Stop accepting new work
        ↓
Finish or cancel active work
        ↓
Close connections
        ↓
Flush required data
        ↓
Exit
```

Do not terminate abruptly when resources need orderly cleanup.

---

# Resource Cleanup and Process Exit

Do not assume process termination automatically satisfies application-level cleanup guarantees.

Important data may need to be:

```text id="w4m8q2"
Persisted
Flushed
Committed
Closed
Released
```

before shutdown.

---

# Avoid Cleanup That Never Runs

An application can terminate because of:

```text id="t3q7m9"
Fatal errors
Forced termination
System failure
Process crash
Browser shutdown
```

Critical correctness should not depend exclusively on best-effort cleanup.

Persist important state earlier when necessary.

---

# Persistence vs Cleanup

Do not confuse:

```text id="e8m3x6"
Cleanup
```

with:

```text id="y6q2n8"
Persistence
```

Closing a connection does not guarantee unsaved data was persisted.

Design durability separately.

---

# Memory and Resource Monitoring

Production systems should monitor relevant indicators:

```text id="b5x7m2"
Heap usage
Resident memory
Open connections
Active sockets
Queue depth
Cache size
Event listener growth
Request concurrency
Worker count
```

The specific metrics depend on the application.

---

# Detect Memory Growth

If memory usage repeatedly grows:

```text id="p3q8m1"
Use the feature
↓
Destroy the feature
↓
Repeat
↓
Memory should stabilize
```

If usage keeps increasing, investigate retained references or resource cleanup.

---

# Heap Snapshots

Browser and Node.js tooling can capture heap snapshots.

Compare snapshots before and after repeated operations.

Look for:

```text id="m9x4q2"
Detached DOM nodes
Growing arrays
Growing maps
Unexpected closures
Retained event listeners
Caches that never shrink
```

---

# Allocation Profiling

Allocation profiling can reveal which code paths create large amounts of temporary data.

Do not optimize allocations without evidence.

The goal is to identify meaningful sources of memory pressure.

---

# Resource Leaks vs High Memory Usage

High memory usage is not automatically a leak.

An application may legitimately need a large working set.

A leak is more likely when memory:

```text id="q7m3x8"
Continues growing
Does not stabilize
Tracks repeated lifecycle usage
Contains objects that should have been released
```

Use profiling to distinguish the cases.

---

# Avoid Large Global Arrays for Diagnostics

A debugging history such as:

```js id="f4x8m2"
const debugHistory = [];

function record(event) {
  debugHistory.push(event);
}
```

can itself become a memory leak.

If diagnostics need retention, cap the collection size.

---

# Use Ring Buffers for Bounded Histories

For fixed-size history, a bounded structure can retain only the latest entries.

Conceptually:

```text id="k5m2q9"
Event 1
Event 2
Event 3
...
Event 100

Keep only last N
```

The exact implementation depends on the requirements.

---

# Resource Management and Logging

Logs can also consume memory.

An application that keeps all logs in memory:

```js id="m8q3x1"
logs.push(
  message
);
```

can grow indefinitely.

Prefer external logging, rotation, or bounded in-memory storage.

---

# Cleanup of Object URLs

For file previews:

```js id="j2m6v9"
const previewUrl =
  URL.createObjectURL(
    file
  );

image.src =
  previewUrl;
```

When the preview is no longer needed:

```js id="q7n4x3"
URL.revokeObjectURL(
  previewUrl
);
```

---

# Cleanup of Temporary DOM

When dynamically creating temporary elements:

```js id="v5m8x2"
const element =
  document.createElement(
    "div"
  );

document.body.append(
  element
);
```

remove them when the feature no longer needs them:

```js id="c3q9m1"
element.remove();
```

Do not leave temporary nodes in the document indefinitely.

---

# Detached Subtrees

Removing a subtree from the DOM does not guarantee immediate memory reclamation.

If JavaScript still holds references to nodes inside that subtree, the objects remain reachable.

Release unnecessary references.

---

# Resource Management and Caches

Caches should have:

```text id="r6x2m8"
Ownership
Maximum growth
Expiration or invalidation
Cleanup
Observability
```

A cache without lifecycle management can become an accidental memory leak.

---

# Avoid Caching Everything

Caching improves repeated access only when:

```text id="p7m4q2"
Reuse is likely
Computation or retrieval is expensive
The cache fits within resource limits
Staleness is manageable
```

Otherwise, caching may increase memory without meaningful benefit.

---

# Memory and Serialization

Serializing large structures creates temporary representations.

For example:

```js id="n4x7m3"
const json =
  JSON.stringify(
    largeObject
  );
```

may require additional memory for the generated string.

For large data, consider streaming or incremental processing where appropriate.

---

# Avoid Duplicate Large Structures

Weak:

```js id="w8m3q6"
const copyA =
  structuredClone(
    largeData
  );

const copyB =
  structuredClone(
    largeData
  );
```

If only one independent copy is required, two copies waste memory.

---

# Reuse Immutable Data Where Safe

If a structure is immutable and can be safely shared:

```js id="k7m2x5"
const config = {
  apiUrl: "/api",
};
```

multiple consumers can reference it without needing copies.

Shared immutable references can reduce allocations.

---

# Structural Sharing

When updating nested immutable data:

```js id="f3m8q1"
const nextState = {
  ...state,
  user: {
    ...state.user,
    name: "Osama Abu Motlaq",
  },
};
```

unchanged branches can continue sharing references.

This can reduce unnecessary memory allocation.

---

# Avoid Deep Cloning Just to Be Safe

Do not use:

```js id="q5n7m2"
structuredClone(
  entireApplicationState
);
```

for every update.

Clone only when independent ownership actually requires it.

---

# Resource Management and APIs

Well-designed APIs can make ownership obvious.

Good:

```js id="x8m4c7"
const unsubscribe =
  subscribe(
    handleUpdate
  );
```

The return value tells the caller:

```text id="r2q6m8"
There is something to clean up.
```

---

# Return Cleanup Functions

For setup functions, this pattern is valuable:

```js id="m9x3v5"
function setupFeature() {
  // Setup resources.

  return function cleanup() {
    // Release resources.
  };
}
```

The same abstraction owns setup and teardown.

---

# Encapsulate Resource Lifecycles

Instead of exposing:

```js id="g4m8q1"
export let socket;
```

prefer:

```js id="b7x2m6"
export function connect() {
  // ...
}

export function disconnect() {
  // ...
}
```

The module maintains ownership.

---

# Resource Managers

For complex resources, a dedicated manager can be useful:

```js id="h5m9x3"
class ConnectionManager {
  #connection = null;

  connect() {
    // ...
  }

  disconnect() {
    // ...
  }
}
```

Do not create a resource manager class for a resource that can be handled by a simple function pair.

---

# Avoid Resource Ownership Ambiguity

If three modules can independently call:

```text id="y2m7q4"
connect()
disconnect()
reset()
```

without knowing one another's state, bugs can occur.

Prefer one owner with a clear public API.

---

# Cleanup and Idempotency

An idempotent cleanup can be safely called multiple times:

```js id="q8x3m5"
function createCleanup(
  timerId
) {
  let cleaned = false;

  return function cleanup() {
    if (cleaned) {
      return;
    }

    cleaned = true;

    clearTimeout(
      timerId
    );
  };
}
```

Simple browser cleanup functions often do not need explicit guards because their APIs are already effectively idempotent.

Add guards only when they solve a real lifecycle issue.

---

# Avoid Cleanup Flags Everywhere

Do not create:

```js id="x6m4q2"
let isCleanedUp = false;
```

for every resource.

Use the API's natural lifecycle when possible.

Add state tracking only when repeated lifecycle transitions need protection.

---

# Resource State Machines

Complex resources can benefit from explicit states:

```text id="m8q2x7"
idle
connecting
connected
closing
closed
failed
```

Then valid operations can depend on state.

Do not introduce a state machine for a resource with a simple two-state lifecycle.

---

# Resource Cleanup and Testing

Test:

```text id="p3x7m9"
Setup
Normal use
Failure
Cancellation
Cleanup
Repeated mount/unmount
Repeated connect/disconnect
```

Lifecycle bugs often appear only after repeated use.

---

# Repeated Lifecycle Testing

A useful test pattern is:

```text id="x4m8q1"
Mount
Unmount
Mount
Unmount
Mount
Unmount
```

Memory and resource counts should remain stable.

This is especially useful for:

```text id="k7n2m5"
Listeners
Observers
Timers
Sockets
Subscriptions
```

---

# Test Cleanup After Failure

Do not test only:

```text id="v8m3q2"
Setup succeeds
Cleanup succeeds
```

Also test:

```text id="q6m9x4"
Setup partially fails
Operation fails
Cancellation occurs
```

The cleanup path should remain reliable.

---

# Resource Management Checklist

Before shipping code, ask:

```text id="b3m7q8"
[ ] Who owns each long-lived resource?

[ ] When is the resource created?

[ ] When does it become unnecessary?

[ ] Is there a cleanup operation?

[ ] Is cleanup guaranteed on failure?

[ ] Are event listeners removed?

[ ] Are timers cleared?

[ ] Are observers disconnected?

[ ] Are subscriptions unsubscribed?

[ ] Are sockets and streams closed?

[ ] Are pending requests cancellable?

[ ] Are object URLs revoked?

[ ] Are workers terminated?

[ ] Can stale DOM references be released?

[ ] Are caches bounded or invalidated?

[ ] Can queues grow without limits?

[ ] Can concurrency become unbounded?

[ ] Are large objects retained unnecessarily?

[ ] Are closures capturing too much state?

[ ] Is browser storage or memory growing indefinitely?

[ ] Does the feature survive repeated mount/unmount cycles?

[ ] Does cleanup still work when setup partially fails?
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text id="p6x2m8"
Treat resources as owned lifecycles.

Every setup should have a teardown strategy.

Keep resource ownership explicit.

Prefer short resource lifetimes.

Use finally for cleanup of temporary resources.

Abort stale asynchronous work.

Remove listeners when they are no longer needed.

Clear timers and intervals.

Disconnect observers.

Close sockets and streams.

Unsubscribe from subscriptions.

Revoke object URLs.

Terminate workers.

Avoid unbounded caches.

Avoid unbounded queues.

Control concurrency.

Avoid retaining large objects unnecessarily.

Reduce closure capture when long-lived handlers are involved.

Do not rely on garbage collection for external resource cleanup.

Use WeakMap for specialized object-lifetime metadata.

Do not depend on finalization timing.

Keep cleanup close to setup.

Test repeated setup and teardown.

```

---

# Final Principles

```text id="s4m8q2"
Garbage collection manages unreachable objects.

Your code controls reachability.

Memory is only one kind of resource.

Timers are resources.

Listeners are resources.

Observers are resources.

Sockets are resources.

Workers are resources.

Subscriptions are resources.

Object URLs are resources.

Ownership determines cleanup.

Long-lived resources need explicit lifecycle policies.

Caches need invalidation or bounds.

Queues need backpressure or limits.

Cancellation prevents unnecessary work.

Cleanup should survive failure paths.

Explicit lifecycle management is more reliable than
hoping garbage collection will solve the problem.
```

---

# Summary

Memory and resource management can be modeled as:

```text id="m8x3q1"
Acquire
   ↓
Own
   ↓
Use
   ↓
Stop using
   ↓
Release
```

The most important question is not:

```text id="x4n7m2"
"Will JavaScript garbage-collect this?"
```

It is:

```text id="q6m3p8"
"Why is this object or resource still reachable,
and should it still be alive?"
```

For browser and application code, good lifecycle design means:

```text id="v7m2k4"
Clear ownership
     +
Bounded lifetimes
     +
Explicit cleanup
     +
Cancellation
     +
Controlled caching
     +
Controlled concurrency
     =
Stable memory and resource usage
```

The best resource-management code makes cleanup predictable before the resource is even created.
