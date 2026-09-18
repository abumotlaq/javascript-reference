# Workers and Cross-Context Communication

Browser JavaScript normally runs on the main thread.

The main thread is responsible for much of the page's interaction and rendering work. Long-running JavaScript can block that work and make an interface unresponsive.

The Web Platform provides several APIs for moving work away from the main thread or coordinating work between browsing contexts.

This topic covers:

* Web Workers
* Worker messaging
* Worker lifecycle
* BroadcastChannel
* Web Locks
* Cross-context coordination

## Web Workers

A Web Worker runs JavaScript in a separate worker context.

The main thread creates the worker:

```js
const worker = new Worker(
  "./worker.js",
  {
    type: "module"
  }
);
```

The worker can then receive messages from the main thread.

## Sending Messages to a Worker

Use `postMessage()`:

```js
worker.postMessage({
  value: 21
});
```

The worker receives the message through the `message` event:

```js
self.addEventListener(
  "message",
  (event) => {
    console.log(event.data);
  }
);
```

A worker can return data to the main thread:

```js
self.addEventListener(
  "message",
  (event) => {
    const result =
      event.data.value * 2;

    self.postMessage(result);
  }
);
```

The main thread receives the response:

```js
worker.addEventListener(
  "message",
  (event) => {
    console.log(
      "Worker result:",
      event.data
    );
  }
);
```

The basic communication model is:

```text
Main Thread
     │
     │ postMessage()
     ▼
   Worker
     │
     │ postMessage()
     ▼
Main Thread
```

## Worker Example

Main thread:

```js
const worker = new Worker(
  "./worker.js",
  {
    type: "module"
  }
);

worker.postMessage({
  value: 21
});

worker.addEventListener(
  "message",
  (event) => {
    console.log(
      "Result:",
      event.data
    );
  }
);
```

Worker:

```js
self.addEventListener(
  "message",
  (event) => {
    const result =
      event.data.value * 2;

    self.postMessage(result);
  }
);
```

## Why Use Workers?

Workers are useful when JavaScript performs CPU-intensive work that could block the main thread.

Examples include:

* Large data transformations
* Expensive calculations
* Parsing large datasets
* Compression
* Cryptographic processing
* Background processing

The goal is not to move all JavaScript into workers.

Use a worker when the cost of the work justifies the additional communication and lifecycle complexity.

## Workers and the DOM

A normal worker does not run in the page's `Window` context.

Therefore, code such as:

```js
document.querySelector("#app");
```

is not available in a normal Web Worker.

The worker should instead calculate or process data and send the result to the main thread.

For example:

```js
self.addEventListener(
  "message",
  (event) => {
    const numbers =
      event.data.numbers;

    const total =
      numbers.reduce(
        (sum, number) =>
          sum + number,
        0
      );

    self.postMessage(total);
  }
);
```

The main thread can then update the DOM:

```js
worker.addEventListener(
  "message",
  (event) => {
    const output =
      document.querySelector(
        "#result"
      );

    output.textContent =
      event.data;
  }
);
```

This separation is important:

```text
Worker
→ Calculation / processing

Main Thread
→ UI / DOM updates
```

## Structured Clone

Messages sent through `postMessage()` can contain structured data.

```js
worker.postMessage({
  user: {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer"
  },
  values: [10, 20, 30]
});
```

The receiving context gets a structured copy of the data rather than sharing ordinary JavaScript object references directly.

This is useful for exchanging structured application data, but copying large data structures can itself have a cost.

## Transferable Objects

Some objects can be transferred instead of copied.

For example, an `ArrayBuffer` can be transferred:

```js
const buffer =
  new ArrayBuffer(1024);

worker.postMessage(
  buffer,
  [buffer]
);
```

After transfer, ownership of the buffer moves to the worker.

The original context can no longer use that transferred buffer in the same way.

Transferable objects are useful when moving large binary data efficiently.

## Worker Lifecycle

A worker should not remain alive longer than necessary.

Terminate it from the main thread:

```js
worker.terminate();
```

This immediately stops the worker.

A worker can also naturally finish when there is no remaining work.

## Managing Worker Resources

A common lifecycle is:

```text
Create
  ↓
Send work
  ↓
Receive result
  ↓
Terminate when no longer needed
```

Example:

```js
const worker =
  new Worker("./worker.js");

worker.postMessage({
  task: "calculate"
});

worker.addEventListener(
  "message",
  (event) => {
    console.log(event.data);

    worker.terminate();
  }
);
```

Resource cleanup matters because workers consume memory and processing resources.

## Error Handling

Workers can emit errors:

```js
worker.addEventListener(
  "error",
  (event) => {
    console.error(
      "Worker error:",
      event.message
    );
  }
);
```

A production application should define how worker failures affect the main application.

## Multiple Workers

An application can use multiple workers:

```js
const parserWorker =
  new Worker("./parser.js");

const calculationWorker =
  new Worker("./calculator.js");
```

Each worker can have a specialized responsibility.

However, adding more workers does not automatically improve performance.

The work must be large enough to justify the additional coordination.

---

# BroadcastChannel

`BroadcastChannel` allows compatible browsing contexts to communicate using a shared channel name.

This is useful for communication between:

* Multiple tabs
* Multiple windows
* Workers
* Other compatible browsing contexts

## Creating a Channel

```js
const channel =
  new BroadcastChannel(
    "javascript-reference"
  );
```

## Sending a Message

```js
channel.postMessage({
  type: "theme-changed",
  theme: "dark"
});
```

## Receiving a Message

```js
channel.addEventListener(
  "message",
  (event) => {
    console.log(
      "Received:",
      event.data
    );
  }
);
```

A tab can notify another tab without relying on custom polling.

Conceptually:

```text
Tab A
  │
  │ postMessage()
  ▼
BroadcastChannel
  │
  │ message
  ▼
Tab B
```

## Practical Example

Imagine that a user signs out in one browser tab.

Tab A can publish:

```js
channel.postMessage({
  type: "logout"
});
```

Another tab can react:

```js
channel.addEventListener(
  "message",
  (event) => {
    if (
      event.data.type ===
      "logout"
    ) {
      window.location.href =
        "/login";
    }
  }
);
```

This can help keep multiple tabs synchronized.

## Closing a BroadcastChannel

When the channel is no longer needed:

```js
channel.close();
```

Closing unused channels is good resource-management practice.

## Common BroadcastChannel Use Cases

BroadcastChannel can be useful for:

* Authentication state changes
* Theme synchronization
* Cross-tab cache updates
* State invalidation
* Application notifications
* Coordinating browser contexts

It should not be used as a replacement for a server-side synchronization mechanism.

---

# Web Locks

The Web Locks API allows different browsing contexts to coordinate exclusive access to a named resource.

This is useful when multiple tabs or workers might attempt the same operation at the same time.

## Requesting a Lock

```js
await navigator.locks.request(
  "data-sync",
  async () => {
    console.log(
      "Lock acquired."
    );

    await syncData();
  }
);
```

The callback runs while the lock is held.

When the callback finishes, the lock is released.

## Why Locks Matter

Suppose three tabs all try to synchronize the same local data:

```text
Tab A ─┐
Tab B ─┼── Synchronization
Tab C ─┘
```

Without coordination, all three might perform the same exclusive work.

A named lock can serialize that operation:

```text
Tab A
  ↓
Acquire "data-sync"
  ↓
Perform sync
  ↓
Release

Tab B
  ↓
Wait

Tab C
  ↓
Wait
```

## Lock Names

The lock name represents the shared resource:

```js
navigator.locks.request(
  "database-sync",
  async () => {
    // Exclusive operation
  }
);
```

Another tab requesting the same lock must wait according to the lock scheduling rules.

## Avoid Unnecessary Locks

A lock is useful when simultaneous execution would cause a real problem.

Do not add locks merely because multiple tabs exist.

Use them for operations that require coordination or exclusive access.

---

# Combining These APIs

Workers, BroadcastChannel, and Web Locks solve different problems.

They can also be combined.

For example:

```text
Main Thread
    ↓
Worker
    ↓
Background processing

BroadcastChannel
    ↓
Notify other tabs

Web Locks
    ↓
Coordinate exclusive work
```

A more complete architecture might look like:

```text
             ┌───────────────┐
             │    Tab A      │
             └──────┬────────┘
                    │
            BroadcastChannel
                    │
             ┌──────▼────────┐
             │    Tab B      │
             └───────────────┘

Main Thread
     │
     │ postMessage()
     ▼
  Worker
     │
     │ result
     ▼
Main Thread

Tab A ──────┐
Tab B ──────┼── Web Lock
Tab C ──────┘
```

Each API has a different responsibility:

```text
Worker
→ Background computation

BroadcastChannel
→ Cross-context messaging

Web Locks
→ Cross-context coordination
```

---

# Common Mistakes

## Using Workers for Tiny Operations

Do not create workers for trivial calculations:

```js
const worker =
  new Worker("./worker.js");

worker.postMessage(2 + 2);
```

The communication overhead can be greater than the calculation itself.

Use workers when the work is substantial enough to benefit from moving it away from the main thread.

## Updating the DOM from a Worker

A worker should not be treated as another DOM context.

Instead:

```text
Worker
→ Process

Main Thread
→ Render
```

## Forgetting Worker Cleanup

Long-lived workers consume resources.

Terminate workers when they are no longer required:

```js
worker.terminate();
```

## Keeping BroadcastChannels Open Unnecessarily

Close channels when the feature is no longer active:

```js
channel.close();
```

## Using Web Locks as a State Management System

Web Locks coordinate exclusive work.

They do not replace:

* Application state
* Databases
* Message buses
* Authentication
* Server synchronization

## Assuming Cross-Context APIs Share Everything

Each context still has its own JavaScript environment.

Communication happens through explicit platform mechanisms such as messaging or locks.

---

# Best Practices

### Keep Worker Responsibilities Narrow

A worker should perform a clearly defined background task.

### Minimize Large Message Transfers

Large structured objects can be expensive to copy.

Use transferable objects when appropriate.

### Handle Worker Errors

Workers should have explicit failure behavior.

### Close Resources

Terminate workers and close communication channels when they are no longer needed.

### Use Locks Only for Real Coordination Problems

Do not introduce synchronization mechanisms without a concrete concurrency problem.

### Keep Cross-Context Messages Structured

Prefer predictable message formats:

```js
channel.postMessage({
  type: "user-logout",
  timestamp: Date.now()
});
```

rather than sending ambiguous values:

```js
channel.postMessage(
  "logout"
);
```

Structured messages are easier to extend and debug.

---

# Mental Model

The simplest way to distinguish these APIs is:

```text
Web Worker
→ "Do this computation somewhere else."

BroadcastChannel
→ "Tell the other browsing contexts."

Web Lock
→ "Only one context should perform this operation at a time."
```

Once these responsibilities are clear, it becomes much easier to choose the correct API for a real application.

## References

* Web Workers API
* Worker
* Broadcast Channel API
* BroadcastChannel
* Web Locks API
