# JavaScript Microtasks and Macrotasks

## Overview

JavaScript runtimes schedule asynchronous work using different categories of queued work.

Two important categories are:

* Microtasks
* Tasks, commonly called macrotasks in educational material

Understanding their ordering is essential for predicting asynchronous JavaScript behavior.

A simplified model is:

```text
Synchronous Code
      |
      v
Current Task
      |
      v
Microtask Queue
      |
      v
Rendering / Runtime Scheduling
      |
      v
Next Task
```

The most important rule to remember is:

```text
Current synchronous work
        ↓
Microtasks
        ↓
Later task
```

---

# Terminology

In browser specifications, the formal term is generally:

```text
Task
```

The term:

```text
Macrotask
```

is widely used in tutorials and developer discussions to contrast tasks with microtasks.

For this document:

```text
Task ≈ commonly called macrotask
```

---

# What Is a Microtask?

A microtask is a unit of work that is scheduled to run after the current synchronous execution completes and before later task processing.

Common sources include:

```text
Promise reactions
queueMicrotask()
MutationObserver callbacks
```

Example:

```js
Promise.resolve().then(() => {
  console.log("Microtask");
});
```

---

# What Is a Task?

A task is a unit of scheduled work processed by the host environment.

Common browser sources include:

```text
setTimeout
setInterval
DOM events
Some browser callbacks
```

Example:

```js
setTimeout(() => {
  console.log("Task");
}, 0);
```

---

# Basic Example

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Output:

```text
A
D
C
B
```

Classification:

```text
A → synchronous
setTimeout → task
Promise.then → microtask
D → synchronous
```

The current synchronous work finishes first.

Then microtasks are processed.

Then the timer callback can run as a later task.

---

# Basic Execution Model

A simplified sequence is:

```text
1. Start current task
2. Execute synchronous JavaScript
3. Finish current JavaScript stack
4. Drain microtask queue
5. Continue with rendering or other runtime steps
6. Process another task
7. Drain microtasks again
```

This cycle repeats during program execution.

---

# `Promise.then()` Creates a Microtask

Example:

```js
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End");
```

Output:

```text
Start
End
Promise callback
```

The Promise reaction waits until the current synchronous execution finishes.

---

# `queueMicrotask()` Creates a Microtask

Example:

```js
console.log("Start");

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("End");
```

Output:

```text
Start
End
Microtask
```

---

# Timer Callbacks Are Tasks

Example:

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

The timer callback cannot interrupt the current synchronous code.

---

# Microtask Queue Ordering

Microtasks are processed in queue order.

```js
queueMicrotask(() => {
  console.log("A");
});

queueMicrotask(() => {
  console.log("B");
});

queueMicrotask(() => {
  console.log("C");
});
```

Output:

```text
A
B
C
```

---

# Promise and `queueMicrotask()`

Both contribute microtasks.

```js
Promise.resolve().then(() => {
  console.log("A");
});

queueMicrotask(() => {
  console.log("B");
});

Promise.resolve().then(() => {
  console.log("C");
});
```

Output:

```text
A
B
C
```

The queue preserves insertion order.

---

# A Microtask Can Queue Another Microtask

Example:

```js
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

```text
A
C
B
```

Why?

Initial queue:

```text
A
C
```

While `A` is running, it adds `B`:

```text
C
B
```

So `C` runs before the newly added `B`.

---

# Promise Chains

Consider:

```js
Promise.resolve()
  .then(() => {
    console.log("A");

    return "B";
  })
  .then((value) => {
    console.log(value);
  });
```

The first callback runs as a microtask.

Its returned result settles another Promise.

The next `.then()` callback is subsequently scheduled.

Output:

```text
A
B
```

---

# Promise Rejection Handlers

`.catch()` callbacks are also Promise reactions and therefore participate in microtask scheduling.

```js
Promise.reject(
  new Error("Failed")
).catch((error) => {
  console.log(
    error.message
  );
});
```

The catch callback does not run synchronously.

---

# `.finally()` and Microtasks

Example:

```js
Promise.resolve("Done")
  .finally(() => {
    console.log("Finally");
  })
  .then((value) => {
    console.log(value);
  });
```

Promise reactions continue through the microtask mechanism.

Output:

```text
Finally
Done
```

---

# `async` Functions

An `async` function returns a Promise.

```js
async function greet() {
  return "Hello";
}

greet().then((message) => {
  console.log(message);
});
```

The `.then()` callback is a microtask.

---

# `await` and Microtasks

Example:

```js
async function run() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

run();

console.log("C");
```

Output:

```text
A
C
B
```

The part after `await` continues later through Promise scheduling.

---

# `await` Inside a Timer

```js
setTimeout(async () => {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}, 0);

console.log("C");
```

Output:

```text
C
A
B
```

The timer callback starts as a task.

The continuation after `await` is then scheduled as a microtask.

---

# Promise Inside a Timer

```js
setTimeout(() => {
  console.log("Timer start");

  Promise.resolve().then(() => {
    console.log("Promise");
  });

  console.log("Timer end");
}, 0);
```

Output:

```text
Timer start
Timer end
Promise
```

The Promise callback does not interrupt the currently running timer callback.

It runs after that task's synchronous work completes.

---

# Timer Inside a Promise

```js
Promise.resolve().then(() => {
  console.log("Promise");

  setTimeout(() => {
    console.log("Timer");
  }, 0);
});
```

The Promise reaction runs first.

The timer is scheduled as later task work.

Output:

```text
Promise
Timer
```

---

# Multiple Tasks

```js
setTimeout(() => {
  console.log("A");
}, 0);

setTimeout(() => {
  console.log("B");
}, 0);

setTimeout(() => {
  console.log("C");
}, 0);
```

The timer callbacks become eligible according to timer scheduling rules and are processed as separate task executions.

A common result is:

```text
A
B
C
```

The important point is that each callback runs as a separate unit of scheduled work.

---

# Microtasks After Each Task

Consider:

```js
setTimeout(() => {
  console.log("Task A");

  queueMicrotask(() => {
    console.log("Microtask A");
  });
}, 0);

setTimeout(() => {
  console.log("Task B");
}, 0);
```

A simplified result is:

```text
Task A
Microtask A
Task B
```

The microtask created by the first task is processed before moving to the next task.

---

# More Complete Example

```js
setTimeout(() => {
  console.log("Task A");

  Promise.resolve().then(() => {
    console.log("Microtask A");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask B");
});

setTimeout(() => {
  console.log("Task B");
}, 0);

console.log("Sync");
```

Typical order:

```text
Sync
Microtask B
Task A
Microtask A
Task B
```

Classification:

```text
Sync
→ current task

Microtask B
→ microtask after current task

Task A
→ later task

Microtask A
→ microtask after Task A

Task B
→ later task
```

---

# Recursive Microtask Scheduling

A microtask can schedule another microtask.

```js
let count = 0;

function schedule() {
  queueMicrotask(() => {
    count += 1;

    console.log(count);

    if (count < 5) {
      schedule();
    }
  });
}

schedule();
```

Output:

```text
1
2
3
4
5
```

The example is bounded.

---

# Microtask Starvation

Consider:

```js
function repeat() {
  queueMicrotask(repeat);
}

repeat();
```

This continually adds another microtask.

Because microtasks keep being created, the runtime may spend its scheduling opportunity processing microtasks without reaching other work.

This pattern should be avoided.

---

# Why Microtask Starvation Is Dangerous

Suppose a page has:

```text
User interaction
Timer
Rendering
```

and JavaScript continuously produces microtasks.

The runtime may spend a long time draining the microtask queue before moving on to other scheduled work.

That can lead to:

* Delayed rendering
* Delayed input handling
* Delayed timers
* Poor responsiveness

---

# Tasks Can Schedule Microtasks

Example:

```js
setTimeout(() => {
  console.log("Task");

  queueMicrotask(() => {
    console.log("Microtask");
  });
}, 0);
```

The task begins.

During its execution, it queues a microtask.

After the task's current synchronous work completes, the microtask runs.

---

# Microtasks Can Schedule Tasks

Example:

```js
queueMicrotask(() => {
  console.log("Microtask");

  setTimeout(() => {
    console.log("Task");
  }, 0);
});
```

The microtask executes first.

It schedules a later task.

Output:

```text
Microtask
Task
```

---

# Nested Scheduling

Consider:

```js
console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");

    setTimeout(() => {
      console.log("D");
    }, 0);
  });
}, 0);

Promise.resolve().then(() => {
  console.log("E");
});

console.log("F");
```

A typical order is:

```text
A
F
E
B
C
D
```

Classification:

```text
A → synchronous
F → synchronous
E → first microtask
B → timer task
C → microtask created by B
D → later timer task
```

---

# `Promise.resolve()` Does Not Execute Its Callback Immediately

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

The Promise callback is queued.

It is not executed inline.

---

# `Promise.resolve()` and Existing Promises

```js
const promise =
  Promise.resolve("Value");

promise.then((value) => {
  console.log(value);
});
```

The value may already be settled, but the reaction still runs asynchronously through the Promise reaction mechanism.

---

# `queueMicrotask()` vs `Promise.then()`

Both schedule microtasks.

```js
queueMicrotask(() => {
  console.log("Microtask");
});

Promise.resolve().then(() => {
  console.log("Promise");
});
```

They are similar in scheduling category but different in API behavior.

For example, exceptions thrown inside them are handled differently.

---

# Exception Behavior

Consider:

```js
queueMicrotask(() => {
  throw new Error(
    "Microtask error"
  );
});
```

This is different from:

```js
Promise.resolve().then(() => {
  throw new Error(
    "Promise error"
  );
});
```

A Promise rejection is produced by the second example.

The first example throws directly from the microtask callback.

This distinction matters when handling failures.

---

# MutationObserver

In browsers, `MutationObserver` callbacks are processed as microtasks.

Example:

```js
const target =
  document.querySelector(
    "#target"
  );

if (target) {
  const observer =
    new MutationObserver(
      (mutations) => {
        console.log(
          "Mutations:",
          mutations.length
        );
      }
    );

  observer.observe(
    target,
    {
      childList: true,
    }
  );

  target.appendChild(
    document.createElement(
      "div"
    )
  );
}
```

The observer callback participates in microtask processing.

---

# DOM Events and Tasks

Consider:

```js
const button =
  document.querySelector(
    "#button"
  );

if (button) {
  button.addEventListener(
    "click",
    () => {
      console.log(
        "Click task"
      );

      Promise.resolve().then(() => {
        console.log(
          "Promise microtask"
        );
      });
    }
  );
}
```

The event callback runs as event-driven JavaScript.

The Promise continuation is scheduled as a microtask afterward.

---

# Microtasks and Rendering

A useful simplified model is:

```text
Task
 |
 v
Run JavaScript
 |
 v
Drain Microtasks
 |
 v
Possible Rendering
 |
 v
Next Task
```

This is one reason long microtask chains can affect browser responsiveness.

---

# `requestAnimationFrame()`

`requestAnimationFrame()` has rendering-oriented semantics and should not simply be classified as a normal Promise microtask or a normal timer callback.

Example:

```js
requestAnimationFrame(() => {
  console.log(
    "Animation frame"
  );
});
```

It is associated with the browser's rendering lifecycle.

---

# Comparing Scheduling APIs

A useful learning table:

| API                       | Category           | Typical purpose              |
| ------------------------- | ------------------ | ---------------------------- |
| `Promise.then()`          | Microtask          | Promise continuation         |
| `catch()`                 | Microtask          | Promise error continuation   |
| `finally()`               | Microtask          | Promise cleanup continuation |
| `queueMicrotask()`        | Microtask          | Explicit microtask           |
| `MutationObserver`        | Microtask          | DOM mutation reactions       |
| `setTimeout()`            | Task               | Delayed work                 |
| `setInterval()`           | Task               | Repeated scheduled work      |
| DOM events                | Task               | User/browser event handling  |
| `requestAnimationFrame()` | Rendering-oriented | Visual updates               |

This table is a learning model, not a complete specification of every browser scheduling rule.

---

# A Reliable Ordering Strategy

For output questions, classify every operation first.

Example:

```js
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

Step 1:

```text
Synchronous:
1
5
```

Step 2:

```text
Microtasks:
3
4
```

Step 3:

```text
Task:
2
```

Final result:

```text
1
5
3
4
2
```

---

# Another Ordering Example

```js
setTimeout(() => {
  console.log("A");
}, 0);

queueMicrotask(() => {
  console.log("B");

  queueMicrotask(() => {
    console.log("C");
  });
});

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");
```

Result:

```text
E
B
D
C
A
```

Reasoning:

```text
Current task:
E

Microtasks:
B
D

During B:
C is appended to the microtask queue

Remaining microtask:
C

Later task:
A
```

---

# `async` / `await` Ordering

```js
async function first() {
  console.log("A");

  await null;

  console.log("B");
}

async function second() {
  console.log("C");

  await null;

  console.log("D");
}

first();
second();

console.log("E");
```

Output:

```text
A
C
E
B
D
```

Both functions begin synchronously.

Each function pauses at `await`.

Their continuations are then queued according to Promise scheduling order.

---

# Await Does Not Create a New Thread

This code:

```js
async function run() {
  await somePromise();
  console.log("Done");
}
```

does not mean:

```text
Create a new thread
Run function in background
```

Instead, it means the function can suspend its continuation while the Promise is pending.

---

# Tasks and Long Work

A task can contain expensive synchronous work.

```js
setTimeout(() => {
  const end =
    Date.now() + 2000;

  while (Date.now() < end) {
    // Heavy work.
  }

  console.log(
    "Task completed."
  );
}, 0);
```

While this callback is running, other JavaScript cannot simply execute simultaneously on the same main call stack.

---

# Breaking Large Tasks

One way to avoid one giant synchronous task is to split work.

```js
let index = 0;

function processChunk() {
  const limit =
    Math.min(
      index + 1000,
      10000
    );

  while (index < limit) {
    index += 1;
  }

  if (index < 10000) {
    setTimeout(
      processChunk,
      0
    );
  } else {
    console.log(
      "Complete"
    );
  }
}

processChunk();
```

Each chunk gets its own task opportunity.

---

# Microtasks and React

This topic is useful when working with React because React applications frequently interact with:

```text
Promises
fetch
async/await
event handlers
timers
browser APIs
```

For example:

```js
async function loadProfile() {
  const response =
    await fetch(
      "/api/profile"
    );

  return response.json();
}
```

Understanding microtask scheduling helps explain why code after `await` does not continue as ordinary synchronous code.

---

# Microtasks and State Updates

When asynchronous callbacks interact with UI frameworks such as React, state updates can be affected by framework-specific batching and scheduling behavior.

Therefore, do not assume:

```text
Promise callback
=
Immediate component render
```

Framework rendering has its own scheduling behavior.

The JavaScript event loop and the framework scheduler are related but distinct systems.

---

# Browser and Node.js Differences

Both environments support:

```text
Promises
Microtasks
Timers
Asynchronous execution
```

But Node.js has host-specific mechanisms and scheduling behavior that differ from browsers.

For example:

```js
process.nextTick(() => {
  console.log(
    "Node-specific scheduling"
  );
});
```

This should not be treated as a standard browser API.

---

# Common Misconceptions

## Microtasks Run Before Everything

Not exactly.

Current synchronous JavaScript must finish first.

Microtasks are processed after the current task's synchronous execution.

---

## Every Asynchronous Callback Is a Microtask

False.

Timer callbacks and many event callbacks are tasks.

---

## Every Timer Is Exactly 0ms or 1000ms

False.

A timer delay is not a guarantee of exact callback execution time.

---

## Promises Run in Parallel

A Promise does not automatically create parallel JavaScript execution.

Promise scheduling is asynchronous, but JavaScript execution on the main call stack remains subject to the runtime's execution model.

---

## `await` Blocks the Browser

It does not block the entire JavaScript runtime merely because an async function is waiting for a Promise.

---

## Microtasks Are Always Better

Not necessarily.

Using too many microtasks can delay other work and reduce responsiveness.

---

# Practical Output Prediction

When you see:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

queueMicrotask(() => {
  console.log("D");

  setTimeout(() => {
    console.log("E");
  }, 0);
});

console.log("F");
```

Classify:

```text
A → synchronous
B → task
C → microtask
D → microtask
E → task
F → synchronous
```

Execution:

```text
A
F
C
D
B
E
```

The timer `E` is created later, inside a microtask, so it becomes later task work.

---

# Practical Mental Model

Use this model when reasoning about browser JavaScript:

```text
             CURRENT TASK
                  |
                  v
          Synchronous JavaScript
                  |
                  v
           Call Stack Empty
                  |
                  v
          Drain Microtasks
                  |
                  v
     Rendering / Host Scheduling
                  |
                  v
            NEXT TASK
                  |
                  v
          Synchronous JavaScript
                  |
                  v
          Drain Microtasks
                  |
                  v
               Repeat
```

---

# Summary

Microtasks and tasks are different categories of scheduled JavaScript work.

Important rules:

* Synchronous JavaScript runs first.
* Promise reactions are microtasks.
* `queueMicrotask()` creates a microtask.
* `MutationObserver` callbacks are processed through the microtask mechanism in browsers.
* Timer callbacks are tasks.
* DOM event callbacks are task-driven work.
* Microtasks are processed after the current task's synchronous execution.
* Pending microtasks are processed before the runtime proceeds to later task processing.
* A microtask can enqueue another microtask.
* A task can enqueue microtasks.
* Microtasks can enqueue later tasks.
* `await` uses Promise-based continuation scheduling.
* Long synchronous tasks block the current execution path.
* Excessive microtask generation can cause starvation.
* `requestAnimationFrame()` has rendering-oriented semantics and is not simply another timer.
* Node.js has additional host-specific scheduling behavior.

The most useful rule is:

```text
Synchronous code
      ↓
Microtasks
      ↓
Later tasks
```

And after every task:

```text
Task
  ↓
Microtask queue drains
  ↓
Next scheduling step
```
