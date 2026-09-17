# JavaScript Event Loop

## Overview

The event loop is part of the runtime model that allows JavaScript to handle asynchronous operations without blocking the current synchronous execution flow.

JavaScript code itself executes on a call stack.

Browser environments provide additional capabilities through Web APIs.

When asynchronous work completes, its continuation can be scheduled so that it runs when the JavaScript engine is able to process it.

A simplified model is:

```text id="v5yr7d"
JavaScript
    |
    v
Call Stack
    |
    +----------------------+
    |                      |
    v                      v
Web APIs              Queues
                           |
                           v
                       Event Loop
                           |
                           v
                     Call Stack
```

The event loop is essential for understanding:

* `setTimeout`
* `setInterval`
* Promises
* `async` / `await`
* DOM events
* Network requests
* Microtasks
* Tasks
* Rendering opportunities
* Why asynchronous code does not execute immediately
* Why Promise callbacks often run before timer callbacks

---

# JavaScript and the Runtime

A common mistake is to think that JavaScript by itself contains everything required for asynchronous behavior.

The JavaScript language provides constructs such as:

```js id="l1d3mz"
Promise
async
await
```

The host environment provides many APIs such as:

```text id="0rmz0g"
setTimeout
fetch
DOM events
Web APIs
```

The exact runtime architecture depends on the host environment.

In browsers, the browser provides the APIs and scheduling mechanisms around the JavaScript engine.

---

# The JavaScript Engine

The JavaScript engine executes JavaScript code.

A simplified model is:

```text id="p3y9hh"
JavaScript Engine
|
├── Execute JavaScript
├── Manage execution contexts
├── Maintain the call stack
└── Create and settle language-level objects such as Promises
```

The engine does not itself represent the whole browser runtime.

The browser provides additional facilities.

---

# Host Environment

A browser can provide APIs for operations that are outside basic JavaScript language execution.

Examples include:

```text id="c2a8gu"
setTimeout
setInterval
fetch
DOM events
geolocation
notifications
clipboard
storage
```

These APIs are commonly referred to as Web APIs.

The exact internal implementation is browser-specific.

---

# Why an Event Loop Is Needed

Consider:

```js id="qqgji7"
console.log("A");

setTimeout(() => {
  console.log("B");
}, 1000);

console.log("C");
```

The result is:

```text id="jy3e5f"
A
C
B
```

If JavaScript waited synchronously for the timer, the whole program would block for one second.

Instead, the timer is handled by the host environment while JavaScript continues executing the current synchronous code.

---

# Simplified Flow

The example can be simplified as:

```text id="b93o5s"
console.log("A")
      |
      v
Call Stack
      |
      v
setTimeout(...)
      |
      v
Browser Timer Facility
      |
      +-------------------+
      |                   |
      v                   |
console.log("C")          |
                          |
                          v
                    Timer completes
                          |
                          v
                    Task Queue
                          |
                          v
                    Event Loop
                          |
                          v
                    Call Stack
                          |
                          v
                    console.log("B")
```

The callback waits until the current stack is clear and scheduling rules allow it to run.

---

# The Call Stack Comes First

Consider:

```js id="p0h9w3"
console.log("A");

console.log("B");

console.log("C");
```

There is no asynchronous work.

The stack executes the code in order:

```text id="5s9j3d"
A
B
C
```

The event loop does not interrupt currently executing JavaScript and arbitrarily reorder synchronous statements.

---

# Tasks

A task is a unit of work scheduled to be processed by the event loop.

Common browser sources include:

* Timer callbacks
* User interaction events
* Some other task-producing browser operations

Example:

```js id="b3k3a4"
setTimeout(() => {
  console.log("Timer");
}, 0);
```

The callback is not executed immediately.

It becomes eligible to run after the timer's delay has elapsed and the scheduling conditions allow it.

---

# `setTimeout(..., 0)`

A common misunderstanding is:

```js id="3s7jyp"
setTimeout(callback, 0);
```

means:

```text
Run callback immediately.
```

It does not.

Example:

```js id="d0e7u2"
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Output:

```text id="n6h49l"
A
C
B
```

The callback must wait until:

1. The current synchronous execution finishes.
2. The timer is ready.
3. The callback is scheduled for processing.
4. The event loop reaches that work.

---

# Timer Delay Is a Minimum Delay

Consider:

```js id="4j0wuk"
setTimeout(() => {
  console.log("Timer");
}, 1000);
```

The `1000` milliseconds value does not guarantee:

```text
Exactly 1000ms later
```

It means the callback should not become eligible before the specified delay has elapsed.

Other work can delay its actual execution.

---

# Blocking the Stack Delays Timers

Example:

```js id="o9h30o"
setTimeout(() => {
  console.log("Timer");
}, 0);

const end =
  Date.now() + 2000;

while (Date.now() < end) {
  // Block the main thread.
}

console.log("Synchronous work completed.");
```

The timer is not able to interrupt the blocking loop.

The output is:

```text id="1w6f6g"
Synchronous work completed.
Timer
```

The callback waits for the stack to become available.

---

# Microtasks

JavaScript runtimes also use a microtask queue.

Promise reactions are a major source of microtasks.

Example:

```js id="76i7ir"
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text id="xnjy1a"
A
C
B
```

The Promise callback does not execute immediately.

It is scheduled as a microtask.

---

# Task vs Microtask

A simplified distinction is:

```text id="m0b7u6"
Task
|
├── Timer callback
├── User event callback
└── Other task sources

Microtask
|
├── Promise reactions
├── queueMicrotask()
└── Other microtask sources
```

Microtasks receive special scheduling treatment.

---

# Microtasks Run Before the Next Task

Consider:

```js id="nhx4jk"
setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});
```

The output is typically:

```text id="xk99pl"
Promise
Timer
```

Why?

The Promise reaction is a microtask.

The timer callback is a task.

After the current synchronous stack completes, pending microtasks are processed before moving on to a later task.

---

# `queueMicrotask()`

JavaScript provides:

```js id="sm1jot"
queueMicrotask()
```

Example:

```js id="7rj29p"
console.log("A");

queueMicrotask(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text id="1h4g2a"
A
C
B
```

The callback is scheduled as a microtask.

---

# Promise and `queueMicrotask()`

Both can schedule microtasks.

```js id="0x1x4b"
console.log("A");

Promise.resolve().then(() => {
  console.log("Promise");
});

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("B");
```

Output:

```text id="4z6yko"
A
B
Promise
Microtask
```

The microtasks run after the synchronous code.

Their relative order follows the order in which they are queued.

---

# Multiple Microtasks

Example:

```js id="73fntq"
Promise.resolve().then(() => {
  console.log("A");
});

Promise.resolve().then(() => {
  console.log("B");
});

queueMicrotask(() => {
  console.log("C");
});
```

The result is:

```text id="zkf5n5"
A
B
C
```

The microtask queue is processed in queue order.

---

# A Microtask Can Queue Another Microtask

Example:

```js id="qm2x9c"
queueMicrotask(() => {
  console.log("A");

  queueMicrotask(() => {
    console.log("B");
  });
});

queueMicrotask(() => {
  console.log("C");
});
```

Output:

```text id="b8i5cw"
A
C
B
```

The first microtask runs.

It queues another microtask.

The queue already contains `C`, so the newly queued `B` runs after `C`.

---

# Microtask Drain

A useful mental model is:

```text id="11j7jw"
Run Current Task
      |
      v
Current JavaScript Stack Becomes Empty
      |
      v
Process Microtasks
      |
      v
Microtask Queue Empty
      |
      v
Continue with Next Scheduled Work
```

The runtime can process newly added microtasks before moving on.

---

# Promise Chains

Consider:

```js id="nqkqzv"
Promise.resolve("A")
  .then((value) => {
    console.log(value);

    return "B";
  })
  .then((value) => {
    console.log(value);
  });
```

Each `.then()` callback runs asynchronously as a Promise reaction.

The output is:

```text id="k5l4a0"
A
B
```

The second reaction becomes ready after the first reaction settles its returned Promise.

---

# Promise and Timer

Consider:

```js id="j2e6z3"
setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("Sync");
```

Output:

```text id="9i5z7y"
Sync
Promise
Timer
```

The simplified reasoning is:

```text id="xhsf8x"
1. Run synchronous code.
2. Finish current task.
3. Drain microtasks.
4. Process later tasks.
```

---

# `async` Functions

An `async` function always returns a Promise.

```js id="x8u1km"
async function getMessage() {
  return "Hello";
}

getMessage().then((message) => {
  console.log(message);
});
```

The returned Promise is resolved asynchronously from the perspective of Promise reaction scheduling.

---

# `await`

Consider:

```js id="y5c7k0"
async function run() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

run();

console.log("C");
```

Output:

```text id="uw8kzi"
A
C
B
```

The important point is that `await` causes the remainder of the async function to continue later.

The function begins synchronously until it reaches the `await`.

---

# `await` Does Not Block the Entire JavaScript Thread

Example:

```js id="q2i9p2"
async function run() {
  console.log("Before");

  await Promise.resolve();

  console.log("After");
}

run();

console.log("Outside");
```

Output:

```text id="t2yope"
Before
Outside
After
```

The `await` suspends the async function's continuation.

It does not freeze all JavaScript execution.

---

# `await` and Microtasks

A simplified model is:

```text id="zjsj8v"
async function starts
      |
      v
Run synchronously
      |
      v
Reach await
      |
      v
Suspend continuation
      |
      v
Continue other synchronous code
      |
      v
Promise settles
      |
      v
Continuation scheduled
      |
      v
Microtask runs continuation
```

This is why `await` is closely connected to Promise scheduling.

---

# Example: `await` vs Timer

```js id="v1bw6u"
async function run() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

setTimeout(() => {
  console.log("Timer");
}, 0);

run();

console.log("C");
```

Output:

```text id="s8g2jk"
A
C
B
Timer
```

The continuation after `await` is a Promise-related microtask.

The timer callback is a task.

---

# Nested Promise Microtasks

Consider:

```js id="8n4i7k"
Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

Promise.resolve().then(() => {
  console.log("C");
});
```

Output:

```text id="n0cr6j"
A
C
B
```

The first Promise queues `B` only after `A` starts running.

At that point `C` is already waiting in the queue.

---

# Promise Inside a Timer

Example:

```js id="5r6cfq"
setTimeout(() => {
  console.log("Timer start");

  Promise.resolve().then(() => {
    console.log("Promise inside timer");
  });

  console.log("Timer end");
}, 0);
```

Output:

```text id="b1h0fl"
Timer start
Timer end
Promise inside timer
```

The Promise callback runs after the current timer task completes and the microtask queue is processed.

---

# Multiple Timers

```js id="r89e6w"
setTimeout(() => {
  console.log("Timer A");
}, 0);

setTimeout(() => {
  console.log("Timer B");
}, 0);
```

Assuming both timers are ready in the same scheduling context, their callbacks are processed according to the browser's task scheduling behavior.

The key concept is not that all timers execute at the exact same time.

They are scheduled callbacks that become eligible independently.

---

# Timer and Blocking Work

Consider:

```js id="0u7d1h"
setTimeout(() => {
  console.log("Timer");
}, 0);

for (
  let index = 0;
  index < 100000000;
  index++
) {
  // Heavy synchronous work.
}

console.log("Loop finished");
```

The timer cannot interrupt the synchronous loop.

The output is:

```text id="mczj1h"
Loop finished
Timer
```

---

# DOM Events

Event listeners can also produce tasks.

Example:

```js id="crh99d"
const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    () => {
      console.log(
        "Button clicked."
      );
    }
  );
}
```

The browser detects the user interaction and schedules the associated JavaScript callback according to the event system's processing model.

---

# Event Handler and Promise

Example:

```js id="i0x8fo"
const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    () => {
      console.log("Click");

      Promise.resolve().then(() => {
        console.log(
          "Promise after click"
        );
      });
    }
  );
}
```

The event handler runs as JavaScript on the stack.

The Promise reaction is then scheduled as a microtask.

A simplified sequence is:

```text id="o17of1"
Click Event
    |
    v
Event Handler
    |
    v
Promise Callback Queued
    |
    v
Event Handler Completes
    |
    v
Microtask Runs
```

---

# `fetch()` and the Event Loop

Consider:

```js id="04ngsi"
fetch(
  "https://example.com"
)
  .then((response) => {
    console.log(
      response.status
    );
  })
  .catch((error) => {
    console.error(
      error.message
    );
  });
```

The network operation is handled by the host environment.

The JavaScript callback does not remain continuously on the call stack while waiting for the network.

Once the Promise settles, the relevant Promise reaction can be scheduled.

---

# Network Requests Do Not Block JavaScript by Waiting

A simplified model is:

```text id="6t2th4"
fetch()
  |
  v
Network Request
  |
  +-------------------+
  |                   |
  | JavaScript        | Host Environment
  | continues         | waits for response
  |                   |
  +-------------------+
            |
            v
      Promise settles
            |
            v
      Microtask queued
            |
            v
      Callback executes
```

This does not mean the network operation costs nothing.

It means JavaScript does not need to occupy the current call stack while waiting for the response.

---

# Event Loop Is Not a Single Queue

A common oversimplification is:

```text
One Queue → Event Loop → Stack
```

The actual browser runtime has multiple scheduling concepts and task sources.

A useful learning model distinguishes:

```text id="z1q7k1"
Call Stack
    |
    +--> Task Scheduling
    |
    +--> Microtask Queue
    |
    +--> Rendering Opportunities
    |
    +--> Host APIs
```

The precise scheduling rules are more detailed than this simplified diagram.

---

# Microtasks and Rendering

Microtasks are processed before the browser proceeds to a later rendering opportunity.

This matters because excessive microtask work can delay rendering.

Example:

```js id="m1k6zv"
function createMicrotasks() {
  queueMicrotask(() => {
    console.log(
      "Microtask"
    );
  });
}

createMicrotasks();
```

Small amounts of microtask work are normal.

Very large chains can delay other browser work.

---

# Microtask Starvation

A microtask can continuously create additional microtasks.

Example:

```js id="hrf8a3"
let count = 0;

function scheduleMicrotask() {
  queueMicrotask(() => {
    count += 1;

    if (count < 10) {
      scheduleMicrotask();
    }
  });
}

scheduleMicrotask();
```

The example stops after ten iterations.

Without a stopping condition, continuously generating microtasks can prevent the runtime from reaching other scheduled work.

---

# Safe Recursive Microtasks

Bad pattern:

```js id="0ppxj5"
function loop() {
  queueMicrotask(loop);
}

loop();
```

This can continuously consume microtask processing.

A controlled version:

```js id="m28e3k"
let count = 0;

function loop() {
  if (count >= 5) {
    return;
  }

  count += 1;

  queueMicrotask(loop);
}

loop();
```

A bounded process is easier to reason about.

---

# `setTimeout` vs `queueMicrotask`

Consider:

```js id="4s8v3d"
setTimeout(() => {
  console.log("Timer");
}, 0);

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("Sync");
```

Output:

```text id="4j6zwy"
Sync
Microtask
Timer
```

The basic reason is:

```text id="f0jt36"
Synchronous code
      |
      v
Microtasks
      |
      v
Later tasks
```

---

# `Promise.resolve()` vs `queueMicrotask()`

Both can place work in the microtask queue.

```js id="b3v8am"
Promise.resolve().then(() => {
  console.log("Promise");
});

queueMicrotask(() => {
  console.log("Microtask");
});
```

They are not identical APIs, but both participate in microtask scheduling.

---

# `process.nextTick()` in Node.js

Node.js has additional runtime scheduling behavior.

For example:

```js id="0c5t5j"
process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});
```

Node.js processes `process.nextTick()` using its own scheduling rules.

This is one reason browser event-loop behavior and Node.js event-loop behavior should not be treated as exactly identical.

---

# Browser vs Node.js

The high-level ideas are shared:

```text
Call Stack
Asynchronous Operations
Queues
Microtasks
Event Loop
```

But the host environments differ.

Browser:

```text id="fz5hnv"
DOM
Browser Events
Rendering
Web APIs
```

Node.js:

```text id="a0q8c5"
Filesystem
Networking
Timers
Node-specific scheduling phases
```

The event loop is therefore partly a property of the host runtime, not just the JavaScript language specification.

---

# `setInterval()`

`setInterval()` schedules repeated callbacks.

```js id="91hx0c"
const intervalId =
  setInterval(() => {
    console.log(
      "Interval callback"
    );
  }, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000);
```

The interval callback does not interrupt currently executing JavaScript.

Each callback must wait for the runtime to schedule and execute it.

---

# Overlapping Long Interval Work

Consider:

```js id="thg4q7"
const intervalId =
  setInterval(() => {
    const end =
      Date.now() + 1500;

    while (Date.now() < end) {
      // Block the thread.
    }

    console.log(
      "Interval callback completed."
    );
  }, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000);
```

Long synchronous callbacks can delay future timer work.

Timers do not create multiple JavaScript threads by themselves.

---

# `async` / `await` Example

```js id="62v3qj"
function delay(
  message,
  time
) {
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve(message);
      }, time);
    }
  );
}

async function run() {
  console.log("Start");

  const message =
    await delay(
      "Finished",
      1000
    );

  console.log(message);
}

run();

console.log("Outside");
```

Output:

```text id="ue1m4x"
Start
Outside
Finished
```

The function begins synchronously.

The `await` pauses its continuation.

Other synchronous code can continue.

Later, the continuation resumes after the Promise settles.

---

# Detailed `await` Flow

```text id="l0nyif"
run()
 |
 v
console.log("Start")
 |
 v
await delay(...)
 |
 +--> delay starts timer
 |
 +--> run continuation waits
 |
 v
console.log("Outside")
 |
 v
Timer completes
 |
 v
Promise settles
 |
 v
Continuation scheduled
 |
 v
console.log("Finished")
```

---

# Ordering Example

Consider:

```js id="owx5h1"
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

queueMicrotask(() => {
  console.log("4");
});

console.log("5");
```

The output is:

```text id="31tlx2"
1
5
3
4
2
```

A simplified reasoning process:

```text id="2zpp7y"
1. Run synchronous code.
2. Queue Promise microtask.
3. Queue explicit microtask.
4. Finish current task.
5. Drain microtasks.
6. Run timer task.
```

---

# Ordering With Nested Work

Consider:

```js id="n6c2sa"
console.log("A");

Promise.resolve().then(() => {
  console.log("B");

  setTimeout(() => {
    console.log("C");
  }, 0);

  queueMicrotask(() => {
    console.log("D");
  });
});

setTimeout(() => {
  console.log("E");
}, 0);

console.log("F");
```

A typical output is:

```text id="y2g9n0"
A
F
B
D
E
C
```

The important relationships are:

```text id="uw2m1n"
A
F
```

are synchronous.

Then:

```text id="h7up7k"
B
D
```

are microtasks.

Then timer callbacks become eligible as tasks.

The timer created earlier in the outer code can be processed before the timer created later inside the microtask.

---

# Why the Event Loop Matters in React

Understanding the event loop is valuable when working with React because React applications frequently use:

* Promise-based APIs
* `fetch`
* Event handlers
* Timers
* `async` functions
* Browser APIs
* Rendering-related work

For example:

```js id="c3qf9x"
async function loadData() {
  const response =
    await fetch(
      "/api/data"
    );

  return response.json();
}
```

The network operation does not simply "pause the browser until the response arrives."

Understanding the runtime helps explain what happens between:

```js id="k6j1st"
await fetch(...)
```

and:

```js id="4r5r2y"
const data = await response.json();
```

---

# Important Distinction: Event Loop vs `async`

`async` / `await` are language features.

The event loop is part of the runtime scheduling model.

They work together but are not the same thing.

```text id="h1rc25"
async / await
      |
      v
Promise-based continuation
      |
      v
Microtask scheduling
      |
      v
Event loop / runtime
```

---

# Important Distinction: Event Loop vs Web API

The event loop does not perform every asynchronous operation itself.

For example:

```text id="9fek5r"
fetch()
  |
  v
Host Network Facilities
  |
  v
Promise Settlement
  |
  v
Microtask Scheduling
```

The browser handles the network operation.

The JavaScript runtime later processes the callback continuation.

---

# Event Loop Mental Model

A useful simplified model is:

```text id="k7qg7m"
                 JavaScript
                     |
                     v
              +-------------+
              | Call Stack  |
              +-------------+
                     |
                     v
             Current Task Runs
                     |
                     v
             Stack Becomes Empty
                     |
                     v
             +---------------+
             | Microtasks    |
             |   Promise     |
             |   await       |
             |   queueMicrotask
             +---------------+
                     |
                     v
             Browser Scheduling
                     |
             +-------+-------+
             |               |
             v               v
          Render          Next Task
```

This is intentionally simplified.

The browser's actual event loop and rendering model contains additional rules and scheduling details.

---

# Common Misconceptions

## `setTimeout(0)` Means Immediate

It does not.

It schedules a callback that cannot run until the relevant timing and scheduling conditions are satisfied.

---

## `await` Blocks the Entire Application

It does not.

`await` suspends the continuation of the current async function.

Other JavaScript can continue executing.

---

## Promises Run on Another Thread

A Promise does not itself create a new JavaScript thread.

Promise callbacks are scheduled according to the runtime's microtask mechanism.

---

## The Event Loop Executes JavaScript Instead of the Call Stack

The event loop coordinates when queued work can be moved toward execution.

The JavaScript itself still executes on the call stack.

---

## All Asynchronous APIs Behave Exactly the Same

They do not.

Different APIs use different host mechanisms and scheduling rules.

---

## `setTimeout(0)` Always Runs Before Promises

In the browser's common scheduling model, Promise reactions are microtasks and usually run before a later timer task after the current task completes.

---

# Practical Debugging Example

```js id="6vfwj5"
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("End");
```

Expected order:

```text id="q7h1qj"
Start
End
Promise
Microtask
Timer
```

The key is to classify each operation:

```text id="hl4v8j"
console.log
→ synchronous

Promise.then
→ microtask

queueMicrotask
→ microtask

setTimeout
→ task
```

---

# A Reliable Problem-Solving Method

When asked to predict asynchronous output, do not guess.

Use this process:

```text id="hr5u4l"
1. Write down all synchronous statements.

2. Identify every callback.

3. Identify which callbacks create tasks.

4. Identify which callbacks create microtasks.

5. Execute the current synchronous code first.

6. Process pending microtasks.

7. Process later tasks according to scheduling rules.

8. Repeat for any newly queued work.
```

Example:

```js id="6txj5r"
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Classification:

```text id="vgcrn8"
A → synchronous
setTimeout → task
Promise.then → microtask
D → synchronous
```

Execution:

```text id="yoe75g"
A
D
C
B
```

---

# The Event Loop and Rendering

For browser applications, rendering is also part of the runtime experience.

A simplified picture is:

```text id="asx8jh"
Run JavaScript
      |
      v
Microtasks
      |
      v
Potential Rendering Opportunity
      |
      v
Next Scheduled Work
```

This is one reason large synchronous tasks and excessive microtask chains can make a page feel unresponsive.

---

# Avoid Long Synchronous Tasks

Bad pattern:

```js id="sjh6dy"
const end =
  Date.now() + 5000;

while (Date.now() < end) {
  // Heavy work.
}
```

The call stack remains occupied.

A UI cannot freely respond while the main JavaScript execution is blocked.

---

# Breaking Up Work

Instead of performing one enormous synchronous operation, work can sometimes be divided into smaller chunks.

Example:

```js id="3y8d8e"
let current = 0;

function processChunk() {
  const end =
    Math.min(
      current + 1000,
      10000
    );

  while (current < end) {
    current += 1;
  }

  if (current < 10000) {
    setTimeout(
      processChunk,
      0
    );
  } else {
    console.log(
      "Processing completed."
    );
  }
}

processChunk();
```

This allows other scheduled work to get opportunities between chunks.

---

# `requestAnimationFrame()`

For browser visual updates, `requestAnimationFrame()` provides a browser-oriented scheduling mechanism.

Example:

```js id="z5y6o4"
function updateScreen() {
  console.log(
    "Visual update"
  );
}

requestAnimationFrame(
  updateScreen
);
```

It is designed around the browser's rendering cycle rather than general-purpose timer scheduling.

---

# `requestAnimationFrame()` vs `setTimeout()`

General-purpose timer:

```js id="wsk24w"
setTimeout(() => {
  console.log("Timer");
}, 16);
```

Rendering-oriented callback:

```js id="w0b6o5"
requestAnimationFrame(() => {
  console.log(
    "Render-aligned callback"
  );
});
```

They have different purposes and scheduling semantics.

---

# Final Runtime Model

A useful learning model is:

```text id="s4cb7f"
                  JavaScript Program
                         |
                         v
                  Current Task
                         |
                         v
                    Call Stack
                         |
                         v
                 Synchronous Code
                         |
                         v
                  Stack Becomes Empty
                         |
                         v
                 Microtask Queue
                         |
                         v
              Promise / await / microtasks
                         |
                         v
              Browser Scheduling / Rendering
                         |
                         v
                   Next Task
                         |
                         v
                    Call Stack
```

Asynchronous work can therefore be understood as a coordination problem between:

```text id="j7i8xb"
JavaScript Engine
        +
Host Environment
        +
Queues
        +
Event Loop
```

---

# Summary

The event loop is part of the runtime model that coordinates asynchronous work with JavaScript execution.

Important concepts include:

* JavaScript executes active synchronous work on the call stack.
* The browser provides host APIs for many asynchronous operations.
* Timer callbacks are scheduled as tasks.
* Promise reactions are microtasks.
* `queueMicrotask()` explicitly schedules a microtask.
* Microtasks are processed after the current synchronous task and before later task processing.
* `setTimeout(..., 0)` does not mean immediate execution.
* Timer delays are minimum delays, not exact execution times.
* `await` suspends an async function's continuation without blocking all JavaScript.
* Network operations can continue outside the current JavaScript call stack.
* Long synchronous work blocks the main execution path.
* Excessive microtask chains can delay other work.
* Browser rendering interacts with JavaScript scheduling.
* Node.js has additional host-specific scheduling behavior.
* The event loop is a runtime concept, not simply another JavaScript function.

The core relationship is:

```text id="g2q5at"
Call Stack
     |
     v
Synchronous Execution
     |
     v
Microtasks
     |
     v
Host Scheduling
     |
     v
Next Task
     |
     v
Call Stack
```
