# Browser Timers

Browser timers allow JavaScript to schedule code for execution after a delay or repeatedly over time.

The most common timer APIs are:

* `setTimeout()`
* `clearTimeout()`
* `setInterval()`
* `clearInterval()`
* `requestAnimationFrame()`
* `cancelAnimationFrame()`

Timers are part of the browser environment rather than the JavaScript language itself. JavaScript provides the execution model, while the browser provides APIs that schedule work.

For example:

```js
setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq!");
}, 2000);
```

The callback does not execute exactly two seconds later. Instead, the browser schedules it so that it can execute **after at least the requested delay**, once the JavaScript execution environment is available.

---

## 1. Why Timers Exist

JavaScript normally executes code synchronously:

```js
console.log("Start");

console.log("Middle");

console.log("End");
```

Output:

```text
Start
Middle
End
```

Timers allow code to be scheduled for a later point in time:

```js
console.log("Start");

setTimeout(() => {
  console.log("Delayed");
}, 2000);

console.log("End");
```

Output:

```text
Start
End
Delayed
```

The timer does not block the rest of the JavaScript code.

---

# 2. `setTimeout()`

`setTimeout()` schedules a callback to run once after a specified delay.

## Syntax

```js
setTimeout(callback, delay);
```

Example:

```js
setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq!");
}, 2000);
```

The callback becomes eligible to run after approximately `2000` milliseconds.

---

## 3. Delay Is Not an Exact Execution Time

A common misconception is:

```js
setTimeout(callback, 2000);
```

means:

> Execute exactly 2 seconds from now.

That is not guaranteed.

It means approximately:

> Do not run the callback before the requested delay has elapsed, and run it when the event loop gets an opportunity.

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

Even with:

```js
setTimeout(callback, 0);
```

the callback does not run immediately.

It is scheduled for a later event-loop turn.

---

# 4. `setTimeout(..., 0)`

A delay of `0` is useful when you want to defer work.

Example:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Output:

```text
A
C
B
```

This can be useful when you want current synchronous work to finish before another piece of code executes.

However, `setTimeout(..., 0)` does not mean:

```text
Run now
```

It means:

```text
Schedule this callback as soon as the browser can process it.
```

---

# 5. Timer Return Value

Browsers return a timer identifier when `setTimeout()` is called.

```js
const timerId = setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq!");
}, 3000);

console.log(timerId);
```

The value can be passed to `clearTimeout()`.

The exact type of the identifier can differ by environment.

In browsers it is commonly represented as a numeric ID.

---

# 6. `clearTimeout()`

`clearTimeout()` cancels a timeout that has not executed yet.

```js
const timerId = setTimeout(() => {
  console.log("This will not appear.");
}, 3000);

clearTimeout(timerId);
```

Because the timer is cancelled before it executes, the callback will not run.

---

## 6.1 Practical Example

```js
const timerId = setTimeout(() => {
  console.log("Saved!");
}, 5000);

const cancelButton = document.querySelector("#cancel");

cancelButton.addEventListener("click", () => {
  clearTimeout(timerId);
});
```

The timer can now be cancelled by the user.

---

# 7. `setInterval()`

`setInterval()` repeatedly schedules a callback.

## Syntax

```js
setInterval(callback, delay);
```

Example:

```js
setInterval(() => {
  console.log("Hello, Osama Abu Motlaq!");
}, 1000);
```

The callback is repeatedly scheduled approximately every `1000` milliseconds.

Unlike `setTimeout()`, the timer continues until it is cancelled.

---

# 8. `clearInterval()`

Use `clearInterval()` to stop an interval.

```js
const intervalId = setInterval(() => {
  console.log("Running...");
}, 1000);

clearInterval(intervalId);
```

After `clearInterval()` executes, future interval callbacks are cancelled.

---

## 8.1 Example: Counter

```js
let count = 0;

const intervalId = setInterval(() => {
  count += 1;

  console.log(count);

  if (count === 5) {
    clearInterval(intervalId);
  }
}, 1000);
```

Output:

```text
1
2
3
4
5
```

The interval stops after five executions.

---

# 9. `setTimeout()` vs `setInterval()`

| Feature               | `setTimeout()`           | `setInterval()`   |
| --------------------- | ------------------------ | ----------------- |
| Executes              | Once                     | Repeatedly        |
| Canceller             | `clearTimeout()`         | `clearInterval()` |
| Common use            | Delayed action           | Repeated action   |
| Typical examples      | Debounce, delay, timeout | Clock, polling    |
| Can reschedule itself | Yes                      | Yes               |
| Automatically repeats | No                       | Yes               |

---

# 10. Recursive `setTimeout()` vs `setInterval()`

There are two common ways to repeatedly perform an operation.

### Using `setInterval()`

```js
const intervalId = setInterval(() => {
  console.log("Running...");
}, 1000);
```

### Using recursive `setTimeout()`

```js
function run() {
  console.log("Running...");

  setTimeout(run, 1000);
}

run();
```

These approaches are not always equivalent.

---

# 11. Why Recursive `setTimeout()` Can Be Better

Consider an operation that may take time:

```js
setInterval(async () => {
  await performTask();
}, 1000);
```

If `performTask()` takes longer than expected, repeated interval scheduling may cause operations to overlap.

A recursive timeout can wait until the current operation finishes.

```js
async function run() {
  await performTask();

  setTimeout(run, 1000);
}

run();
```

Now the next execution is scheduled after the current operation has completed.

This pattern is especially useful for:

* Polling APIs
* Retry logic
* Background synchronization
* Repeated asynchronous work

---

# 12. Timer Overlap

Suppose:

```js
setInterval(() => {
  performTask();
}, 1000);
```

If `performTask()` sometimes takes longer than one second, the application may start work again before the previous operation has fully completed.

For asynchronous operations:

```js
setInterval(async () => {
  await fetchData();
}, 1000);
```

the interval does not wait for the `await` to finish before scheduling future callbacks.

A recursive timeout can provide more explicit control:

```js
async function poll() {
  try {
    await fetchData();
  } finally {
    setTimeout(poll, 1000);
  }
}

poll();
```

---

# 13. Timers and the Event Loop

Timers are closely related to the JavaScript event loop.

Consider:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

The sequence is conceptually:

```text
1. Execute "Start"
2. Register the timer
3. Execute "End"
4. Timer becomes eligible
5. Event loop eventually runs the callback
```

Output:

```text
Start
End
Timer
```

The important distinction is:

```text
Timer expiration
        ↓
Callback becomes eligible
        ↓
Event loop schedules callback
        ↓
Callback executes
```

---

# 14. Timers Do Not Interrupt Running JavaScript

Consider:

```js
setTimeout(() => {
  console.log("Timer");
}, 0);

const start = Date.now();

while (Date.now() - start < 3000) {
  // Block the main thread.
}

console.log("Finished");
```

The timer cannot interrupt the blocking loop.

The output is effectively:

```text
Finished
Timer
```

The timer may become ready while the loop is running, but JavaScript must finish the current synchronous task before executing the callback.

---

# 15. The Main Thread Matters

Most browser JavaScript runs on the main thread.

The main thread is responsible for tasks such as:

* JavaScript execution
* DOM updates
* user interaction
* layout
* painting

Long-running JavaScript blocks these activities.

Example:

```js
const start = Date.now();

while (Date.now() - start < 5000) {
  // Heavy synchronous work
}
```

During this period:

* buttons may stop responding
* animations may freeze
* timers may be delayed
* scrolling may become unresponsive

Timers do not solve main-thread blocking.

---

# 16. `requestAnimationFrame()`

`requestAnimationFrame()` is designed for visual updates and animations.

Syntax:

```js
requestAnimationFrame(callback);
```

Example:

```js
function animate() {
  console.log("Animation frame");

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

The browser schedules the callback before the next repaint when appropriate.

This makes it more suitable than `setInterval()` for many visual animations.

---

# 17. Why `requestAnimationFrame()` Exists

Suppose you want to animate an element.

Using:

```js
setInterval(updateAnimation, 16);
```

may not synchronize perfectly with the browser's rendering cycle.

Instead:

```js
function updateAnimation() {
  // Update animation state

  requestAnimationFrame(updateAnimation);
}

requestAnimationFrame(updateAnimation);
```

The browser can coordinate rendering work more effectively.

---

# 18. `requestAnimationFrame()` Receives a Timestamp

The callback receives a timestamp.

```js
function animate(timestamp) {
  console.log(timestamp);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

The timestamp can be used to create time-based animations.

Example:

```js
let startTime = null;

function animate(timestamp) {
  if (startTime === null) {
    startTime = timestamp;
  }

  const elapsed = timestamp - startTime;

  console.log(elapsed);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

---

# 19. Cancelling `requestAnimationFrame()`

`requestAnimationFrame()` returns an identifier.

```js
const frameId = requestAnimationFrame(() => {
  console.log("Animation frame");
});
```

Cancel it with:

```js
cancelAnimationFrame(frameId);
```

Example:

```js
const frameId = requestAnimationFrame(() => {
  console.log("Animation frame");
});

cancelAnimationFrame(frameId);
```

---

# 20. `setInterval()` vs `requestAnimationFrame()`

| Feature                            | `setInterval()`     | `requestAnimationFrame()`  |
| ---------------------------------- | ------------------- | -------------------------- |
| Main purpose                       | Repeated timed work | Visual animation           |
| Rendering synchronization          | No                  | Yes                        |
| Uses browser repaint cycle         | No                  | Yes                        |
| Suitable for animations            | Sometimes           | Yes                        |
| Can pause when page is not visible | Not inherently      | Browser may throttle/pause |
| Typical use                        | Polling, clocks     | UI animation               |

Use the API that matches the type of work.

---

# 21. Timer Throttling

Browsers may throttle timers in situations such as:

* Background tabs
* Inactive pages
* Power-saving situations
* Resource-constrained environments

Therefore, timers should not be treated as precise real-time scheduling mechanisms.

For example:

```js
setInterval(() => {
  console.log("Tick");
}, 1000);
```

does not guarantee that the callback runs exactly once every second.

This is especially important for applications involving:

* countdowns
* background synchronization
* polling
* analytics
* long-running pages

---

# 22. Timers and Background Tabs

When a browser tab is hidden or inactive, browsers may reduce timer frequency.

This is intentional.

It helps reduce:

* CPU usage
* battery consumption
* unnecessary work

Applications that depend on precise timing should account for this behavior.

For countdowns, for example, do not rely only on:

```js
count -= 1;
```

every second.

Instead, calculate elapsed time from a real timestamp.

---

# 23. Reliable Countdown Pattern

A fragile countdown might do this:

```js
let seconds = 60;

setInterval(() => {
  seconds -= 1;
}, 1000);
```

This assumes each interval occurs exactly every second.

A more reliable approach stores a target timestamp:

```js
const endTime = Date.now() + 60_000;

function updateCountdown() {
  const remaining = Math.max(0, endTime - Date.now());

  const seconds = Math.ceil(remaining / 1000);

  console.log(seconds);

  if (remaining > 0) {
    setTimeout(updateCountdown, 250);
  }
}

updateCountdown();
```

The displayed value is based on elapsed real time rather than counting callback executions.

---

# 24. Debouncing with `setTimeout()`

Debouncing means:

> Wait until events stop occurring for a specified period before running the function.

Example:

```js
let timerId;

function handleInput(value) {
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    console.log("Searching for:", value);
  }, 500);
}
```

If the function is called repeatedly:

```text
input
input
input
input
```

the previous timeout is cancelled each time.

Only after the user stops typing for 500ms does the callback execute.

This is commonly used for:

* Search fields
* Validation
* Autosave
* Filtering
* API requests

---

# 25. Debounce Example with DOM

```js
const input = document.querySelector("#search");

let timerId;

input.addEventListener("input", (event) => {
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    console.log("Searching:", event.target.value);
  }, 500);
});
```

Without debouncing, an API request could be triggered for every keystroke.

With debouncing, the application waits until typing pauses.

---

# 26. Throttling with `setTimeout()`

Throttling limits how often a function can execute.

Example concept:

```text
Event
Event
Event
Event
↓
Run at controlled intervals
```

A simple throttling pattern:

```js
let ready = true;

function handleScroll() {
  if (!ready) {
    return;
  }

  ready = false;

  console.log("Scroll handled");

  setTimeout(() => {
    ready = true;
  }, 200);
}
```

This prevents the logic from running too frequently.

---

# 27. Debounce vs Throttle

| Pattern  | Behavior                  | Common Use |
| -------- | ------------------------- | ---------- |
| Debounce | Wait until activity stops | Search     |
| Throttle | Limit execution frequency | Scroll     |
| Interval | Execute repeatedly        | Polling    |
| Timeout  | Execute once later        | Delay      |

A simple mental model:

```text
Debounce:
"Wait until the user stops."

Throttle:
"Allow execution only once per period."
```

---

# 28. Timers and Function Arguments

`setTimeout()` can receive additional arguments.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

setTimeout(greet, 1000, "Osama Abu Motlaq");
```

Output:

```text
Hello, Osama Abu Motlaq!
```

However, using an arrow function is often easier to read:

```js
setTimeout(() => {
  greet("Osama Abu Motlaq");
}, 1000);
```

---

# 29. Timer IDs Are Not the Callback

This is wrong:

```js
clearTimeout(() => {
  console.log("Hello");
});
```

`clearTimeout()` expects the identifier returned by `setTimeout()`.

Correct:

```js
const timerId = setTimeout(() => {
  console.log("Hello, Osama Abu Motlaq!");
}, 2000);

clearTimeout(timerId);
```

---

# 30. Common Mistake: Calling the Function Immediately

Incorrect:

```js
setTimeout(console.log("Hello"), 1000);
```

The function executes immediately.

Why?

Because:

```js
console.log("Hello")
```

is evaluated before `setTimeout()` receives its result.

Correct:

```js
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

---

# 31. Common Mistake: Forgetting to Clear an Interval

This interval runs indefinitely:

```js
setInterval(() => {
  console.log("Running...");
}, 1000);
```

If the work is supposed to stop, store the identifier:

```js
const intervalId = setInterval(() => {
  console.log("Running...");
}, 1000);
```

Then:

```js
clearInterval(intervalId);
```

---

# 32. Timers and Closures

Timers commonly create closures.

```js
function scheduleMessage() {
  const name = "Osama Abu Motlaq";

  setTimeout(() => {
    console.log(`Hello, ${name}!`);
  }, 1000);
}

scheduleMessage();
```

Even though `scheduleMessage()` has finished, the callback still has access to `name`.

This is because the callback closes over the surrounding lexical environment.

---

# 33. Timers and Mutable Variables

Consider:

```js
let message = "Hello";

setTimeout(() => {
  console.log(message);
}, 1000);

message = "Goodbye";
```

Output:

```text
Goodbye
```

The callback accesses the variable when it executes, not necessarily the value at the moment the timer was created.

Compare this with explicitly capturing a value:

```js
let message = "Hello";

const capturedMessage = message;

setTimeout(() => {
  console.log(capturedMessage);
}, 1000);

message = "Goodbye";
```

Output:

```text
Hello
```

Understanding closures is essential when working with timers.

---

# 34. Timers and `this`

Timer callbacks can expose differences in `this` behavior.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

user.greet();
```

Output:

```text
Osama Abu Motlaq
```

The arrow function preserves the surrounding `this`.

A regular function behaves differently because its `this` is determined by how it is called.

---

# 35. Timers in Event Handlers

Timers are commonly used inside browser events.

```js
const button = document.querySelector("#save");

button.addEventListener("click", () => {
  button.disabled = true;

  setTimeout(() => {
    button.disabled = false;
  }, 2000);
});
```

This temporarily disables a button after a click.

---

# 36. Timer Cleanup

Any long-lived timer should be considered a resource that may need cleanup.

For example:

```js
const intervalId = setInterval(() => {
  console.log("Running...");
}, 1000);
```

When the associated feature is no longer active:

```js
clearInterval(intervalId);
```

Failing to clean up timers can cause:

* unnecessary work
* repeated callbacks
* stale data usage
* memory retention
* unexpected UI updates

---

# 37. Timers in React

Timers are particularly important in React because components can mount and unmount.

A timer created inside an effect should normally be cleaned up.

Example:

```jsx
import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Running...");
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Timer is running.</p>;
}
```

The cleanup function runs when the effect is removed.

This prevents the interval from continuing after the component is unmounted.

---

# 38. React and `setTimeout()`

Example:

```jsx
import { useEffect } from "react";

function Message() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log("Hello, Osama Abu Motlaq!");
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <p>Waiting...</p>;
}
```

The cleanup prevents the timeout from remaining active after the component is removed.

---

# 39. React Strict Mode Consideration

During development, React may intentionally run certain lifecycle logic more than once to help reveal side-effect problems.

For example:

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

Proper cleanup is therefore important.

The problem is not that React is "breaking" timers.

The problem is usually that the effect created a side effect without correctly cleaning it up.

---

# 40. Timers and Stale State in React

Consider:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log(count);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <p>{count}</p>;
}
```

The callback sees the value captured by that particular render.

This is related to React's rendering model and closures.

For timer-based logic involving changing state, dependency management and functional state updates may be necessary.

Example:

```jsx
setCount((currentCount) => currentCount + 1);
```

---

# 41. React Timer Pattern

A common pattern:

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    setCount((currentCount) => currentCount + 1);
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

The functional update:

```js
setCount((currentCount) => currentCount + 1);
```

works with the latest state value without depending on a stale closure over an older `count`.

---

# 42. Next.js and Timers

Next.js supports both server and client execution contexts.

Browser timer APIs such as:

```js
setTimeout();
setInterval();
requestAnimationFrame();
```

can be used in client-side code.

Browser-only APIs such as:

```js
window
document
localStorage
requestAnimationFrame
```

should not be accessed during server rendering.

For example, client-side timer logic belongs in a Client Component:

```jsx
"use client";

import { useEffect } from "react";

export default function Timer() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log("Hello, Osama Abu Motlaq!");
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <p>Timer</p>;
}
```

---

# 43. Timers Are Not Scheduling Guarantees

Do not use browser timers when you require exact real-world timing.

For example, this is not suitable for high-precision measurement:

```js
setInterval(() => {
  performAction();
}, 1000);
```

The callback may be delayed because of:

* Main-thread work
* Rendering
* Browser throttling
* Event-loop scheduling
* System load
* Background-tab behavior

For time-sensitive application logic, track actual timestamps.

---

# 44. Measuring Time Correctly

Use `Date.now()` for wall-clock timestamps.

```js
const start = Date.now();

setTimeout(() => {
  const elapsed = Date.now() - start;

  console.log(`Elapsed: ${elapsed}ms`);
}, 1000);
```

The result may be greater than `1000`.

For performance measurements, `performance.now()` is usually more appropriate:

```js
const start = performance.now();

setTimeout(() => {
  const elapsed = performance.now() - start;

  console.log(`Elapsed: ${elapsed.toFixed(2)}ms`);
}, 1000);
```

`performance.now()` is designed for measuring elapsed durations with higher-resolution timing characteristics.

---

# 45. `Date.now()` vs `performance.now()`

| API                 | Purpose                      |
| ------------------- | ---------------------------- |
| `Date.now()`        | Current wall-clock timestamp |
| `performance.now()` | Measuring elapsed time       |

Use:

```js
Date.now()
```

when you need a timestamp related to the current date/time.

Use:

```js
performance.now()
```

when measuring durations or performance.

---

# 46. Timers and Page Visibility

Applications can detect whether a page is visible.

```js
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page is hidden");
  } else {
    console.log("Page is visible");
  }
});
```

This can be combined with timer logic.

For example, an application may:

* pause nonessential work
* stop polling
* reduce updates
* synchronize state when the page becomes visible again

---

# 47. Using `requestAnimationFrame()` Correctly

A common animation loop:

```js
let position = 0;

function animate() {
  position += 1;

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

When you no longer need the animation:

```js
cancelAnimationFrame(frameId);
```

A more complete pattern stores the current frame ID:

```js
let frameId;

function animate() {
  position += 1;

  frameId = requestAnimationFrame(animate);
}

frameId = requestAnimationFrame(animate);
```

Then:

```js
cancelAnimationFrame(frameId);
```

---

# 48. Timer Selection Guide

## Use `setTimeout()` when:

You need to execute something once later.

Example:

```js
setTimeout(saveDraft, 1000);
```

---

## Use `setInterval()` when:

You truly need recurring execution at a roughly regular interval.

Example:

```js
setInterval(checkStatus, 5000);
```

---

## Use recursive `setTimeout()` when:

You need repeated asynchronous work where each cycle should finish before the next one begins.

```js
async function poll() {
  await checkStatus();

  setTimeout(poll, 5000);
}

poll();
```

---

## Use `requestAnimationFrame()` when:

You are updating visual animation state.

```js
requestAnimationFrame(animate);
```

---

# 49. Practical Example: Auto-Hide Notification

```js
function showNotification(message) {
  const notification = document.querySelector("#notification");

  notification.textContent = message;
  notification.hidden = false;

  const timerId = setTimeout(() => {
    notification.hidden = true;
  }, 3000);

  return timerId;
}
```

The notification appears immediately and disappears after three seconds.

---

# 50. Practical Example: Polling API Data

A controlled polling pattern:

```js
async function poll() {
  try {
    const response = await fetch("/api/status");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(poll, 5000);
  }
}

poll();
```

This avoids starting another request before the previous request has completed.

---

# 51. Practical Example: Retry with Delay

Timers are useful for retry systems.

```js
async function attempt() {
  try {
    await performTask();
  } catch (error) {
    console.error(error);

    setTimeout(attempt, 2000);
  }
}

attempt();
```

Real applications should usually add:

* retry limits
* exponential backoff
* cancellation
* error classification

---

# 52. Exponential Backoff

Instead of retrying every two seconds:

```text
2s
2s
2s
2s
```

a system can gradually increase the delay:

```text
1s
2s
4s
8s
16s
```

Example:

```js
let delay = 1000;

async function retry() {
  try {
    await performTask();

    delay = 1000;
  } catch (error) {
    console.error(error);

    setTimeout(retry, delay);

    delay = Math.min(delay * 2, 30000);
  }
}

retry();
```

This reduces pressure on the server during repeated failures.

---

# 53. Timer Cleanup with `AbortController`

Timer-based workflows may need cancellation.

A modern pattern is to combine timers with cancellation logic.

For example, application code can keep track of whether an operation has been cancelled before scheduling more work.

```js
let cancelled = false;

function run() {
  if (cancelled) {
    return;
  }

  console.log("Running...");

  setTimeout(run, 1000);
}

run();

cancelled = true;
```

For more advanced asynchronous workflows, `AbortController` can coordinate cancellation across fetch requests and other operations.

---

# 54. Avoid Unnecessary Timers

Do not use a timer simply because it appears to fix a timing problem.

For example:

```js
setTimeout(() => {
  updateUI();
}, 100);
```

This may hide a deeper problem.

Possible causes might include:

* incorrect state management
* incorrect DOM lifecycle
* unnecessary rendering
* race conditions
* incorrect event handling

A timer should have a clear reason for existing.

---

# 55. Timers and Race Conditions

Timers can create race conditions.

Example:

```js
setTimeout(() => {
  console.log("First");
}, 1000);

setTimeout(() => {
  console.log("Second");
}, 100);
```

Output:

```text
Second
First
```

When multiple asynchronous operations interact with shared state, you must consider ordering.

This becomes especially important when timers are combined with:

* network requests
* user interactions
* component lifecycle
* mutable state

---

# 56. Timers and Memory

A timer callback can keep references to objects through its closure.

Example:

```js
const largeData = {
  // large object
};

setTimeout(() => {
  console.log(largeData);
}, 60000);
```

Until the timer is cleared or executed, the callback may retain access to `largeData`.

This is another reason to clean up unnecessary timers.

---

# 57. Accessibility Considerations

Timers can affect users significantly.

Be careful with:

* auto-closing dialogs
* rapidly changing content
* countdowns
* rotating content
* notifications
* automatic redirects

Users should not lose important information simply because a timer expired.

For critical interfaces, consider providing:

* pause controls
* clear timing information
* sufficient reading time
* keyboard accessibility
* screen-reader-friendly status updates

---

# 58. Timers and Security

Timers themselves are not a security mechanism.

Do not assume that:

```js
setTimeout(() => {
  verifySomething();
}, 5000);
```

provides meaningful security.

Client-side timing can be manipulated by the user.

Security-sensitive decisions must be enforced on trusted server infrastructure.

For example, expiration rules for authentication or authorization should not rely exclusively on client timers.

---

# 59. Browser Timers vs Server Timers

The same JavaScript language can run in different environments.

Browsers provide timer APIs:

```js
setTimeout()
setInterval()
```

Node.js also provides timer APIs.

However, the surrounding environment is different.

Browser code has access to:

```js
window
document
requestAnimationFrame
```

Node.js does not provide the browser DOM.

When working with Next.js, always know whether code runs:

```text
Server
or
Browser
```

---

# 60. Quick Reference

## `setTimeout()`

```js
const timerId = setTimeout(() => {
  console.log("Hello");
}, 1000);
```

Run once later.

---

## `clearTimeout()`

```js
clearTimeout(timerId);
```

Cancel a timeout.

---

## `setInterval()`

```js
const intervalId = setInterval(() => {
  console.log("Hello");
}, 1000);
```

Run repeatedly.

---

## `clearInterval()`

```js
clearInterval(intervalId);
```

Cancel an interval.

---

## `requestAnimationFrame()`

```js
const frameId = requestAnimationFrame(() => {
  console.log("Frame");
});
```

Schedule visual work before a repaint.

---

## `cancelAnimationFrame()`

```js
cancelAnimationFrame(frameId);
```

Cancel an animation frame.

---

# 61. Common Mistakes

### Mistake 1: Assuming the delay is exact

```js
setTimeout(callback, 1000);
```

The callback is not guaranteed to execute exactly after one second.

---

### Mistake 2: Forgetting cleanup

```js
setInterval(doWork, 1000);
```

Store the identifier when the timer needs to be cancelled.

---

### Mistake 3: Using `setInterval()` for long asynchronous tasks

```js
setInterval(async () => {
  await performTask();
}, 1000);
```

This can allow overlapping operations.

---

### Mistake 4: Using timers for animations

```js
setInterval(updateAnimation, 16);
```

Prefer:

```js
requestAnimationFrame(updateAnimation);
```

for visual animation.

---

### Mistake 5: Using client timers as security

Timers cannot enforce trust or authorization.

---

### Mistake 6: Using timers to hide architectural problems

A timer should not be used as a generic workaround for race conditions or incorrect application logic.

---

# 62. Best Practices

### Store timer identifiers

```js
const timerId = setTimeout(...);
```

This makes cancellation possible.

### Always clean up long-lived timers

Especially in:

* React effects
* event-driven applications
* reusable components
* subscriptions
* polling systems

### Use the right timer API

```text
Delayed action      → setTimeout
Repeated work       → setInterval
Sequential polling  → recursive setTimeout
Visual animation    → requestAnimationFrame
```

### Track real elapsed time

For countdowns and time-sensitive UI, prefer timestamps over simply counting callbacks.

### Avoid blocking the main thread

Timers cannot compensate for expensive synchronous JavaScript.

### Design for throttling

Do not assume background tabs will execute timers at exact intervals.

---

# 63. React Relevance

Timers are highly relevant to React development.

You will frequently encounter them when implementing:

* debounced search
* delayed UI updates
* notifications
* auto-save
* countdowns
* polling
* animations
* inactivity detection
* temporary messages
* retry logic

The most important React concept is **cleanup**.

Typical pattern:

```jsx
useEffect(() => {
  const timerId = setTimeout(() => {
    // Work
  }, 1000);

  return () => {
    clearTimeout(timerId);
  };
}, []);
```

For intervals:

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    // Work
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

Understanding timers also reinforces important React concepts:

* effects
* cleanup functions
* closures
* stale state
* functional state updates
* component lifecycle

---

# 64. Final Mental Model

Think of browser timers as **scheduling mechanisms**, not exact clocks.

```text
setTimeout
    │
    └── Run once later

setInterval
    │
    └── Schedule repeated work

requestAnimationFrame
    │
    └── Schedule visual work around browser rendering

clearTimeout
    │
    └── Cancel timeout

clearInterval
    │
    └── Cancel interval

cancelAnimationFrame
    │
    └── Cancel animation frame
```

The most important idea is:

> A timer tells the browser when a callback becomes eligible to run; it does not guarantee the exact moment when the callback will execute.

For professional JavaScript development, combine this understanding with:

* the event loop
* closures
* asynchronous JavaScript
* React effects
* cleanup
* browser visibility
* performance
* cancellation
* real elapsed-time measurement

Once these concepts are connected, browser timers become much easier to reason about.
