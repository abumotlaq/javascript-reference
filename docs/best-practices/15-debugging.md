# Debugging

## Overview

Debugging is the systematic process of finding, understanding, and fixing incorrect software behavior.

Good debugging is not trial and error.

It is a structured process of:

* Observing a failure
* Reproducing it
* Collecting evidence
* Forming a hypothesis
* Testing the hypothesis
* Isolating the cause
* Applying the smallest correct fix
* Verifying the fix
* Preventing regression

The goal is not merely to make the error disappear.

The goal is to understand why the behavior occurred and remove the actual cause.

---

## 1. Debugging Is an Investigation

A bug is an observable discrepancy between expected and actual behavior.

```text
Expected behavior
        ↓
Actual behavior
        ↓
Difference
        ↓
Investigation
        ↓
Root cause
        ↓
Fix
        ↓
Verification
```

Avoid immediately changing random lines until something appears to work.

Random changes make the system harder to reason about.

---

## 2. Start With the Exact Symptom

Describe the failure precisely.

Weak:

```text
The application is broken.
```

Better:

```text
Submitting the login form with a valid email and password
produces a 401 response instead of navigating to the dashboard.
```

A precise symptom gives you a testable debugging target.

---

## 3. Reproduce the Bug

Before changing code, reproduce the problem when possible.

Record:

* Input
* Expected result
* Actual result
* Environment
* Reproduction steps
* Frequency
* Relevant browser or runtime
* Relevant user state

Example:

```text
1. Open the login page.
2. Enter valid credentials.
3. Submit the form.
4. Request returns 401.
5. Dashboard is not shown.
```

A reproducible bug is much easier to investigate.

---

## 4. Determine Whether the Bug Is Deterministic

A bug may be:

* Always reproducible
* Intermittent
* Environment-specific
* Timing-dependent
* Data-dependent
* Load-dependent

These categories change the debugging strategy.

For example:

```text
Always fails
→ inspect deterministic logic.

Fails sometimes
→ investigate state, timing, concurrency, randomness, or external dependencies.
```

Do not assume every bug is caused by the same type of mistake.

---

## 5. Separate Symptoms From Causes

Suppose the application displays:

```text
Failed to load dashboard.
```

That is a symptom.

The actual cause might be:

```text
Database query failed.
```

Or:

```text
Authentication token expired.
```

Or:

```text
The API response shape changed.
```

Do not stop at the first visible failure.

---

## 6. Follow the Failure Chain

A useful debugging model is:

```text
User action
    ↓
UI event
    ↓
Application logic
    ↓
Network request
    ↓
Server
    ↓
Database
    ↓
Response
    ↓
State update
    ↓
UI rendering
```

Identify the first stage where reality diverges from expectation.

That location is often closer to the root cause than the final visible symptom.

---

## 7. Use Evidence Before Hypotheses

Before deciding what is wrong, collect observable evidence.

Useful evidence includes:

* Error messages
* Stack traces
* Network requests
* Request payloads
* Response payloads
* Console output
* Variable values
* State transitions
* Database results
* Timestamps
* Reproduction frequency

A debugging hypothesis should be grounded in evidence.

---

## 8. Read the Error Message Carefully

Do not skip the actual error text.

Example:

```text
TypeError: Cannot read properties of undefined
(reading 'map')
```

This immediately suggests that the value before `.map()` is not the expected array.

Do not replace the error with:

```js id="m8cg2n"
if (!items) {
  items = [];
}
```

until you understand why `items` is undefined.

The fallback may hide a deeper data-flow problem.

---

## 9. Read Stack Traces From the Top and Contextually

A stack trace can show where an error occurred and how execution reached that point.

Example:

```text
TypeError: user.name.trim is not a function
    at normalizeUser
    at submitForm
    at handleSubmit
```

Start with the failing operation:

```js id="g4pw2x"
user.name.trim();
```

Then inspect the caller:

```js id="q8d61u"
normalizeUser(user);
```

Then inspect how the data was produced.

The first visible failure is not always the original cause.

---

## 10. Find the First Incorrect Value

Suppose the final error is:

```text
Cannot read properties of undefined
```

Do not only inspect the final expression.

Trace backward:

```text
undefined
   ↑
incorrect object property
   ↑
incorrect API response mapping
   ↑
incorrect server response
```

Find the earliest incorrect value.

That is often where the bug entered the system.

---

## 11. Inspect Data at Boundaries

Useful boundaries include:

```text
Input → Validation
API → Application
Database → Service
Service → UI
Storage → Application
URL → Router
Environment → Configuration
```

Verify the data at each boundary.

For example:

```js id="l0p2af"
const response = await fetch("/api/users");
const data = await response.json();

console.log("API response:", data);
```

This can reveal whether the problem originates from the server or from subsequent processing.

---

## 12. Do Not Assume the Data Shape

Suppose code expects:

```js id="d2hp6u"
data.users.map(renderUser);
```

Verify that the actual response is:

```js id="sxy0w1"
{
  users: []
}
```

It might instead be:

```js id="4j1f87"
[]
```

or:

```js id="j4zkmy"
{
  data: []
}
```

Many bugs are simply mismatches between expected and actual data structures.

---

## 13. Inspect Types at Runtime

JavaScript allows values to change shape or type unexpectedly.

Use direct inspection:

```js id="0en0y8"
console.log(typeof value);
console.log(value);
```

For objects:

```js id="x8q5p0"
console.log({
  type: typeof value,
  value
});
```

For arrays:

```js id="mhtyt5"
console.log({
  isArray: Array.isArray(value),
  value
});
```

Do not infer runtime state from variable names alone.

---

## 14. Use Assertions During Debugging

Assertions can stop execution when an important assumption is false.

```js id="h1rr0k"
console.assert(
  Array.isArray(users),
  "Expected users to be an array"
);
```

Or explicitly:

```js id="z0v4wd"
if (!Array.isArray(users)) {
  throw new TypeError(
    "Expected users to be an array"
  );
}
```

Assertions turn silent assumptions into visible failures.

---

## 15. Make Assumptions Explicit

Suppose:

```js id="3vxd4n"
function processUser(user) {
  return user.name.trim();
}
```

The function assumes `user.name` is a string.

Make the assumption visible:

```js id="q9j7td"
function processUser(user) {
  if (typeof user.name !== "string") {
    throw new TypeError("User name must be a string");
  }

  return user.name.trim();
}
```

Explicit assumptions make future failures easier to diagnose.

---

## 16. Reduce the Reproduction

A complex bug is easier to understand after reducing it to the smallest case that still fails.

Suppose a failing application contains:

```text
Authentication
Routing
Database
Analytics
Notifications
UI state
Caching
```

Determine whether the bug still occurs with:

```text
Authentication
Routing
```

Then:

```text
Routing
```

Then perhaps:

```text
One function
```

This is called reduction or minimization.

---

## 17. Binary Search the Problem

When a failure occurs somewhere in a large flow, divide the search space.

For example:

```text
Input
  ↓
Function A
  ↓
Function B
  ↓
Function C
  ↓
Function D
```

Check after B.

If the data is already wrong:

```text
A → B
```

If it is correct:

```text
C → D
```

Continue narrowing the location.

This is often much faster than inspecting every function equally.

---

## 18. Use Checkpoints

Insert temporary checkpoints:

```js id="f2j1rb"
console.log("Checkpoint A", value);
```

Then:

```js id="o64k9k"
console.log("Checkpoint B", value);
```

And:

```js id="v2g7er"
console.log("Checkpoint C", value);
```

The goal is not to keep dozens of logs permanently.

The goal is to identify where the state diverges.

---

## 19. Prefer Structured Debug Output

Instead of:

```js id="q8ep6p"
console.log(user);
```

use:

```js id="r2i50z"
console.log("Submitting user:", {
  id: user.id,
  name: user.name,
  active: user.active
});
```

Structured output makes the relevant data easier to inspect.

---

## 20. Label Debug Output

Avoid:

```js id="7cx9kq"
console.log(data);
console.log(data);
console.log(data);
```

Prefer:

```js id="i4j4fk"
console.log("Before normalization:", data);

const normalized = normalize(data);

console.log("After normalization:", normalized);
```

The labels provide context.

---

## 21. Remove Temporary Debugging Code

Temporary logs should not accumulate permanently.

After fixing the issue:

```text
Investigate
 ↓
Add instrumentation
 ↓
Find cause
 ↓
Fix
 ↓
Remove unnecessary instrumentation
```

Keep only logging that provides legitimate operational value.

---

## 22. Use Breakpoints

A debugger can pause execution and let you inspect:

* Variables
* Call stack
* Scope
* Expressions
* Control flow
* Network state
* Closures

For example:

```js id="l6h7oy"
function calculateTotal(items) {
  debugger;

  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

When execution reaches `debugger`, supported developer tools can pause there.

---

## 23. Breakpoints Are Better Than Endless Logging for Complex State

Logs show snapshots.

A debugger can show the execution context interactively.

This is especially useful when inspecting:

* Nested objects
* Closures
* Call stacks
* Multiple variables
* Conditional branches
* Iteration
* Asynchronous execution

Use the tool that gives the clearest evidence.

---

## 24. Use Conditional Breakpoints

When a function runs many times, stopping every time creates noise.

Instead, pause only when a condition is true.

Example concept:

```text
index === 10
```

or:

```text
user.id === 42
```

This allows you to inspect the relevant execution.

---

## 25. Inspect the Call Stack

The call stack answers:

> How did execution arrive here?

For example:

```text
handleSubmit
  ↓
saveUser
  ↓
validateUser
  ↓
normalizeUser
```

A bug may originate in the caller rather than the current function.

Do not inspect the current line in isolation.

---

## 26. Inspect Local Scope

When execution pauses, inspect:

```text
Local variables
Closure variables
Module variables
Global values
```

For example:

```js id="8p6gxv"
function processUser(user) {
  const normalizedName =
    user.name.trim();

  debugger;

  return normalizedName;
}
```

At the breakpoint, inspect both `user` and `normalizedName`.

---

## 27. Inspect Closures

Closures can preserve stale values.

Example:

```js id="v4f41v"
function createHandler() {
  let count = 0;

  return () => {
    count += 1;

    console.log(count);
  };
}
```

If behavior appears incorrect, inspect the closure's captured variables.

In event-driven code, stale closures are a common debugging target.

---

## 28. Debug State Transitions

For stateful applications, ask:

```text
What was the state before?
What action occurred?
What should the next state be?
What state actually appeared?
```

Example:

```js id="x8uhrm"
const nextState = reducer(state, action);

console.log({
  previousState: state,
  action,
  nextState
});
```

State transition logging can make complex UI bugs much easier to understand.

---

## 29. Debug React State Systematically

A useful sequence is:

```text
Props
 ↓
Event
 ↓
State update
 ↓
Render
 ↓
Effect
 ↓
External system
```

Determine which stage differs from the intended behavior.

Do not immediately blame `useEffect`.

First determine where the incorrect state enters the flow.

---

## 30. Check Whether State Is Actually Changing

Suppose a component does not re-render.

Inspect:

```js id="h5p8t8"
console.log("Previous state:", state);
console.log("Next state:", nextState);
```

If the next state is the same reference:

```js id="k9e3m0"
console.log(
  state === nextState
);
```

the problem may involve mutation rather than replacement.

---

## 31. Debug Mutation

Consider:

```js id="obc9y0"
function updateUser(user) {
  user.name = "Osama Abu Motlaq";

  return user;
}
```

The same object reference is returned.

A safer immutable version:

```js id="l85t07"
function updateUser(user) {
  return {
    ...user,
    name: "Osama Abu Motlaq"
  };
}
```

During debugging, compare references:

```js id="o02f5a"
console.log(
  "Same reference:",
  previousUser === nextUser
);
```

---

## 32. Debug Effects by Checking Dependencies

When an effect runs unexpectedly, inspect:

* Dependency values
* Initial render
* Subsequent renders
* Cleanup execution
* External subscriptions

Example:

```js id="xlldzv"
useEffect(() => {
  console.log("Effect ran", {
    userId,
    filter
  });

  return () => {
    console.log("Effect cleanup", {
      userId,
      filter
    });
  };
}, [userId, filter]);
```

This can reveal which values are causing reruns.

---

## 33. Do Not Add Random Dependencies to Silence Warnings

If an effect behaves incorrectly, do not blindly modify the dependency array.

First understand:

```text
What values does the effect read?
Which values can change?
Should the effect actually react to them?
```

A dependency array is part of the data-flow contract.

---

## 34. Debug Infinite Render or Effect Loops

A loop often follows a pattern like:

```text
Render
 ↓
Effect
 ↓
State update
 ↓
Render
 ↓
Effect
 ↓
State update
```

Identify:

1. Which effect runs.
2. What state or external value it changes.
3. Which dependency causes it to run again.

Do not merely suppress the symptom.

---

## 35. Debug Async Code by Tracking Request Identity

Concurrent requests can produce stale results.

Example:

```js id="0fr4mg"
const requestId = crypto.randomUUID();

console.log("Request started:", requestId);

const response = await fetch("/api/data");

console.log("Request completed:", requestId);

return response.json();
```

For multiple requests, include the relevant input:

```js id="o13x20"
console.log("Search request:", {
  query,
  requestId
});
```

This helps determine which response belongs to which action.

---

## 36. Debug Race Conditions

Suppose:

```text
Search "react"
Search "react hooks"
```

Request A:

```text
react
```

Request B:

```text
react hooks
```

If A finishes after B, stale data may overwrite newer results.

Debugging should reveal:

```text
Request A started
Request B started
Request B completed
Request A completed
Request A updated state
```

This sequence immediately exposes the problem.

---

## 37. Use AbortController for Request Lifecycles

When a request becomes irrelevant:

```js id="c2h8lw"
const controller = new AbortController();

fetch("/api/data", {
  signal: controller.signal
});

controller.abort();
```

The debugging question is:

> Which operation owns this request, and when should it stop existing?

Lifecycle bugs often become easier to solve after ownership is made explicit.

---

## 38. Debug Promise Chains

A Promise rejection can be hidden by poor error handling.

Weak:

```js id="9w13fo"
doSomething()
  .then(doNext)
  .catch(() => {
    console.log("Failed");
  });
```

The original error is lost.

Better:

```js id="e8or00"
doSomething()
  .then(doNext)
  .catch((error) => {
    console.error("Operation failed:", error);
  });
```

Preserve the error details while debugging.

---

## 39. Do Not Swallow Errors

Avoid:

```js id="55p8oq"
try {
  riskyOperation();
} catch {
}
```

This removes valuable evidence.

If recovery is appropriate:

```js id="8yrq28"
try {
  riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);

  recover();
}
```

Or rethrow:

```js id="f6c1eo"
try {
  riskyOperation();
} catch (error) {
  throw new Error(
    "User operation failed",
    { cause: error }
  );
}
```

---

## 40. Preserve Error Context

Use `cause` when wrapping errors:

```js id="o3a9zo"
try {
  await saveUser(user);
} catch (error) {
  throw new Error(
    "Failed to save user",
    { cause: error }
  );
}
```

This preserves the original failure while adding useful context.

---

## 41. Debug Network Requests Systematically

When an API request fails, inspect:

```text
Method
URL
Headers
Query parameters
Request body
Status code
Response headers
Response body
Timing
Redirects
```

Do not assume the problem is in the frontend code.

The request itself may be incorrect.

---

## 42. Compare Working and Failing Requests

If a request works in one environment but not another, compare:

```text
URL
Method
Headers
Authentication
Body
Query parameters
Cookies
Origin
Environment variables
```

A difference between a working and failing request can reveal the cause quickly.

---

## 43. HTTP Status Codes Are Evidence

Examples:

```text
400 → request validation problem
401 → authentication problem
403 → authorization problem
404 → resource or route problem
409 → conflict
422 → validation or semantic input problem
429 → rate limiting
500 → server failure
```

Do not treat every failure as "the API is broken."

The status code narrows the investigation.

---

## 44. Inspect the Response Body

A status code may not contain enough information.

For example:

```js id="9q3nce"
const response = await fetch("/api/users");

const body = await response.text();

console.log({
  status: response.status,
  body
});
```

The response body can reveal:

* Validation errors
* Authentication errors
* Structured error codes
* Unexpected HTML
* Proxy failures
* Serialization issues

---

## 45. Debug Environment Variables

A missing or incorrect environment variable can produce failures far from the source.

Example:

```js id="at7gko"
console.log({
  hasApiUrl: Boolean(process.env.API_URL)
});
```

Do not log secrets directly.

Instead inspect presence and non-sensitive metadata.

```js id="u1y8cl"
console.log({
  apiUrlConfigured: Boolean(process.env.API_URL)
});
```

---

## 46. Never Log Secrets During Debugging

Avoid:

```js id="h4dvlx"
console.log(process.env.API_SECRET);
```

or:

```js id="t4t1x8"
console.log(user.password);
```

Sensitive information may end up in:

* Browser consoles
* Server logs
* CI logs
* Monitoring systems
* Screenshots
* Shared debugging sessions

Debugging should not create a security incident.

---

## 47. Debug Authentication Separately From Authorization

If a request returns `403`, the user may be authenticated but not authorized.

If it returns `401`, authentication may be missing or invalid.

Trace:

```text
Request
 ↓
Authentication
 ↓
Identity
 ↓
Authorization
 ↓
Resource access
```

This prevents debugging the wrong layer.

---

## 48. Debug Cookies and Sessions

When authentication appears inconsistent, inspect:

* Cookie presence
* Cookie attributes
* Expiration
* Domain
* Path
* Secure flag
* SameSite behavior
* Request inclusion
* Session validity

A frontend application can appear correctly configured while the browser never sends the expected session information.

---

## 49. Debug CORS Separately From API Logic

A browser CORS failure does not necessarily mean the server endpoint itself is broken.

Inspect:

```text
Request origin
Access-Control-Allow-Origin
Preflight request
Allowed methods
Allowed headers
Credentials configuration
```

Separate browser policy failures from application response failures.

---

## 50. Debug Routing Systematically

When a route does not work, inspect:

```text
URL
Route definition
Dynamic parameters
Middleware
Redirects
Base path
Server configuration
```

For file-based routing systems, verify the filesystem structure matches the intended route.

Do not immediately modify multiple routing files.

---

## 51. Debug 404 Errors

Determine whether the 404 comes from:

```text
Frontend router
Server router
Reverse proxy
Static host
API
```

These are different failure sources.

Inspect the actual request URL and response origin.

---

## 52. Debug Redirect Loops

A redirect loop often looks like:

```text
Request A
 ↓
Redirect B
 ↓
Redirect A
 ↓
Redirect B
```

Track:

```text
Original URL
Redirect location
Authentication state
Middleware conditions
Cookies
```

One condition is usually producing a cycle.

---

## 53. Debug Browser Storage

When local or session storage behaves unexpectedly, inspect:

```js id="u6b2c9"
console.log(
  localStorage.getItem("theme")
);
```

Also consider:

* Wrong key
* Wrong origin
* Old stale data
* Serialization errors
* `null`
* Multiple tabs
* Different environments

Storage is scoped to browser contexts and origins.

---

## 54. Debug JSON Serialization

A common failure is:

```js id="4r6fqx"
JSON.parse(value);
```

when `value` is not valid JSON.

Inspect the raw value first:

```js id="4wjvt4"
console.log({
  raw: value
});
```

Then validate the serialization boundary.

---

## 55. Beware of `JSON.stringify()` Limitations

Debugging object output with JSON can hide important information.

For example:

```js id="76n7p4"
console.log(JSON.stringify(object));
```

This can omit:

* `undefined`
* Functions
* Symbols
* Circular references may throw

Prefer developer-console inspection when supported.

---

## 56. Debug Circular References

If serialization throws:

```text
TypeError: Converting circular structure to JSON
```

inspect object relationships.

For example:

```js id="f7n9m4"
const user = {
  name: "Osama Abu Motlaq"
};

user.self = user;
```

The object references itself.

The solution is not necessarily to remove the property blindly.

Understand why the cycle exists and whether the serialization model is appropriate.

---

## 57. Debug Mutation With Object References

Consider:

```js id="3j8jst"
const user = {
  name: "Osama Abu Motlaq"
};

const nextUser = user;

nextUser.name = "Updated";

console.log(user.name);
```

Both variables reference the same object.

During debugging, compare:

```js id="q84p9f"
console.log(user === nextUser);
```

Reference identity often explains surprising state changes.

---

## 58. Debug Closures and Stale Values

Suppose:

```js id="agj4dz"
function createLogger(value) {
  return () => {
    console.log(value);
  };
}

const log = createLogger("old");

log();
```

The function closes over the original value.

In larger applications, stale closures can appear when callbacks capture state from an earlier render or execution.

Inspect captured values rather than assuming the callback sees current state.

---

## 59. Debug Scope Problems

When a variable appears incorrect, inspect:

```text
Local scope
Block scope
Function scope
Module scope
Global scope
```

Example:

```js id="spj6lx"
let name = "Global";

function example() {
  let name = "Local";

  console.log(name);
}
```

The local variable shadows the outer one.

Naming collisions can make debugging more difficult.

---

## 60. Debug `this` Explicitly

When behavior involving `this` is incorrect, determine how the function is called.

```js id="v6x8fb"
const user = {
  name: "Osama Abu Motlaq",

  sayName() {
    console.log(this.name);
  }
};

user.sayName();
```

Then compare:

```js id="7i4c20"
const sayName = user.sayName;

sayName();
```

The call site changes the `this` binding.

Do not debug `this` only by inspecting where the function was defined.

---

## 61. Debug Callback Context

When passing methods as callbacks:

```js id="3ywp3m"
button.addEventListener(
  "click",
  user.sayName
);
```

the invocation context may differ from:

```js id="jfk4f0"
user.sayName();
```

If `this` is required, determine whether binding is appropriate:

```js id="m7w8qf"
button.addEventListener(
  "click",
  user.sayName.bind(user)
);
```

---

## 62. Debug Prototype Issues

When a property or method appears missing, inspect the object's prototype chain.

```js id="l4rm8h"
console.log(
  Object.getPrototypeOf(object)
);
```

For classes:

```js id="7z2up5"
console.log(
  Object.getPrototypeOf(instance)
);
```

Prototype inheritance can explain behavior that is not visible as an own property.

---

## 63. Debug `instanceof` Carefully

`instanceof` depends on prototype relationships.

Example:

```js id="y0wvf5"
class User {}

const user = new User();

console.log(user instanceof User);
```

If an object crosses realms or is created with a different prototype, `instanceof` may produce unexpected results.

When debugging type assumptions, inspect the actual object structure and prototype.

---

## 64. Debug Property Descriptors When Needed

Unexpected writability or enumerability may come from property descriptors.

Inspect:

```js id="3h4m7h"
console.log(
  Object.getOwnPropertyDescriptor(
    object,
    "name"
  )
);
```

This can explain why:

* Assignment fails
* Property is not enumerable
* Getter runs instead of storing a value
* Property cannot be deleted

Use this when ordinary inspection does not explain the behavior.

---

## 65. Debug Proxy Objects

A `Proxy` can intercept operations.

If property access behaves unexpectedly, determine whether the object is proxied.

Inspect the code that creates it and check traps such as:

```text
get
set
has
deleteProperty
ownKeys
apply
construct
```

A debugging symptom may originate inside a Proxy trap rather than the consumer.

---

## 66. Debug Event Listeners

If an event fires multiple times:

```text
One click
→ Handler
→ Handler
→ Handler
```

Possible causes include:

* Duplicate registration
* Component mounting multiple times
* Missing cleanup
* Event bubbling
* Event delegation
* Multiple matching listeners

Inspect listener registration and cleanup.

---

## 67. Debug Event Bubbling

If a click handler on a child and parent both execute:

```text
Child click
 ↓
Parent click
```

the event may be bubbling.

Inspect:

```js id="d9p30e"
event.target;
event.currentTarget;
```

These values answer different questions.

`target` identifies where the event originated.

`currentTarget` identifies the element whose listener is currently executing.

---

## 68. Debug Event Delegation

Delegation commonly relies on:

```js id="ymtgla"
event.target.closest("[data-user-id]");
```

If the wrong element is selected, inspect:

```js id="2s4d8n"
console.log({
  target: event.target,
  currentTarget: event.currentTarget
});
```

Then verify the DOM structure.

---

## 69. Debug Form Submission

When a form behaves unexpectedly, inspect:

```text
Submit event
PreventDefault
Input values
Validation
FormData
Network request
Response
State update
```

A missing:

```js id="8mxk3c"
event.preventDefault();
```

can cause a full-page navigation.

---

## 70. Debug Form Data Explicitly

Use `FormData` when appropriate:

```js id="vtd5n6"
const formData = new FormData(form);

console.log(
  Object.fromEntries(formData)
);
```

This can quickly reveal:

* Missing `name` attributes
* Unexpected empty fields
* Wrong values
* Checkbox behavior
* Incorrect field names

---

## 71. Debug DOM Selection

If an element is `null`:

```js id="93j2xq"
const button = document.querySelector("#save");

console.log(button);
```

Then inspect:

* Selector spelling
* DOM timing
* Element existence
* Shadow DOM
* Dynamic rendering
* Duplicate IDs

Do not immediately add arbitrary delays.

---

## 72. Debug Timing Instead of Adding Delays

Weak debugging fix:

```js id="5fvi8y"
setTimeout(() => {
  findElement();
}, 1000);
```

This may hide a lifecycle problem.

Instead determine:

```text
When is the element created?
When does the code execute?
Why does the code run before the element exists?
```

Correct lifecycle coordination is better than arbitrary waiting.

---

## 73. Debug Layout Problems Separately From Logic Problems

A UI can have correct state but incorrect appearance.

Distinguish:

```text
Data problem
Logic problem
DOM problem
CSS problem
Browser rendering problem
```

For example:

```text
Button state = enabled
Button exists in DOM
Button is visually covered
```

The problem is not the state logic.

---

## 74. Debug CSS With Computed Styles

Inspect:

```text
display
visibility
opacity
position
z-index
width
height
overflow
pointer-events
```

If an element exists but cannot be interacted with, computed styles can reveal why.

---

## 75. Debug Responsive Problems at the Correct Viewport

A layout may work at one width and fail at another.

Record:

```text
Viewport width
Viewport height
Device pixel ratio
Zoom level
Browser
```

Then reproduce using the same conditions.

---

## 76. Debug Accessibility Issues With Semantics

If an interactive element is inaccessible, inspect:

* Element type
* Accessible name
* Role
* Keyboard behavior
* Focus state
* Labels
* ARIA attributes

Prefer native semantic elements when possible.

For example:

```js id="z5xqj2"
<button type="button">
  Save
</button>
```

is usually preferable to:

```js id="2b1a1w"
<div role="button">
  Save
</div>
```

---

## 77. Debug Performance Problems With Measurement

Do not assume a performance problem comes from the most obvious code.

Measure:

```text
CPU
Memory
Network
Rendering
Long tasks
Bundle size
Database time
Server latency
```

A page that feels slow may actually be waiting on the network.

---

## 78. Debug Performance by Identifying the Dominant Cost

Example:

```text
Total time: 2.0s

Network: 1.5s
JavaScript: 0.2s
Rendering: 0.2s
Other: 0.1s
```

Optimizing JavaScript by 50% would save little overall.

Measure before optimizing.

---

## 79. Debug Memory Leaks

If memory grows over time, inspect:

* Event listeners
* Timers
* Observers
* WebSockets
* Detached DOM nodes
* Large caches
* Global references
* Closures

Ask:

> What object remains reachable that should have been released?

---

## 80. Compare Before and After Heap State

For memory problems, compare:

```text
Initial memory
   ↓
Repeated operation
   ↓
Cleanup
   ↓
Memory after garbage collection
```

If memory keeps increasing, identify what remains reachable.

Do not assume every memory increase is a leak.

---

## 81. Debug Resource Leaks

A resource leak can occur even when JavaScript memory is reclaimed.

Examples:

```text
Open socket
Uncleared timer
Unremoved listener
Unrevoked object URL
Unreleased worker
Unclosed stream
```

Track setup and teardown explicitly.

---

## 82. Debug Worker and Threaded Code

When using workers, inspect:

```text
Worker creation
Message sending
Message receiving
Worker errors
Worker termination
Transferable objects
```

A worker that is never terminated can remain active longer than intended.

---

## 83. Debug Database Queries

When backend behavior depends on a database, inspect:

```text
SQL query
Parameters
Connection
Transaction state
Returned rows
Constraints
Indexes
Permissions
```

Do not only inspect the final error message.

A constraint violation may be caused by invalid upstream data.

---

## 84. Debug Transactions

For transactional code, identify:

```text
Transaction start
Operation A
Operation B
Commit
Rollback
```

A failure after partial operations may indicate incorrect transaction boundaries.

The debugging question is:

> Which changes were supposed to become atomic?

---

## 85. Debug API and Database Separately

If an endpoint returns the wrong data:

```text
Database result
      ↓
Server transformation
      ↓
HTTP response
      ↓
Client transformation
      ↓
UI
```

Inspect the output at every boundary.

This prevents spending an hour debugging the frontend when the database query is already wrong.

---

## 86. Debug Configuration Drift

An application may behave differently across:

```text
Development
Testing
Staging
Production
```

Compare:

* Environment variables
* Dependencies
* Build mode
* Runtime version
* Database schema
* Feature flags
* External services
* Configuration files

Document environment-specific assumptions.

---

## 87. Check Runtime and Dependency Versions

A bug may appear after an upgrade.

Record:

```text
Runtime version
Package version
Browser version
Operating system
Build tool version
```

Then compare against the last known working environment.

Version changes are evidence when behavior changed immediately after an upgrade.

---

## 88. Use Version Control as a Debugging Tool

Git can help identify when behavior changed.

Useful operations include:

```text
git log
git diff
git show
git blame
git bisect
```

Do not use history merely to assign blame.

Use it to understand changes.

---

## 89. `git diff` for Local Changes

Inspect what changed:

```bash
git diff
```

This is often the fastest debugging step after a recent edit.

You may discover:

* Accidental deletion
* Wrong import
* Changed condition
* Modified API path
* Dependency update
* Formatting masking a logic change

---

## 90. `git log` for Historical Context

Inspect recent commits:

```bash
git log --oneline
```

Then inspect a specific commit:

```bash
git show <commit>
```

This helps answer:

> What changed when the bug first appeared?

---

## 91. `git blame` for Line History

When a suspicious line has unclear history:

```bash
git blame path/to/file.js
```

Use it to identify the commit that introduced or modified the line.

Then inspect that commit.

History is a source of evidence, not proof that the older implementation was correct.

---

## 92. `git bisect` for Regression Debugging

When you know:

```text
Old version → works
New version → fails
```

Git can search the history for the first bad commit.

Conceptually:

```text
Known good
     ↓
Middle commit
     ↓
Known bad
```

Git repeatedly narrows the range.

This can be extremely effective for difficult regressions.

---

## 93. Debugging Regression With Minimal Evidence

When using a commit bisect, each tested revision should receive a simple classification:

```text
Good
Bad
```

Do not make subjective classifications if the bug cannot be reproduced reliably at that revision.

A noisy signal produces a noisy search.

---

## 94. Compare Known-Good and Known-Bad States

When possible, compare:

```text
Working version
Failing version
```

Focus on meaningful differences:

```text
Data flow
Dependencies
Configuration
Control flow
Lifecycle
Environment
```

The difference between the two states can dramatically narrow the hypothesis space.

---

## 95. Change One Relevant Variable at a Time

Suppose the application has a failing request.

Do not simultaneously change:

```text
URL
Headers
Authentication
Body
Frontend state
Server logic
Database query
```

Change one relevant dimension at a time.

Otherwise you may lose the ability to determine which change mattered.

---

## 96. Form Explicit Hypotheses

A good debugging hypothesis has a testable structure:

```text
I suspect X because evidence Y shows Z.
I will test it by doing A.
```

Example:

```text
I suspect the API key is missing because the request receives
an authentication error and the environment variable is undefined.

I will verify whether the runtime actually contains the expected
non-secret configuration value.
```

This is more effective than random experimentation.

---

## 97. Keep a Debugging Timeline for Complex Bugs

For difficult issues, record:

```text
09:10 — Reproduced failure.
09:15 — Request body is correct.
09:20 — API response returns 401.
09:25 — Environment variable is missing.
09:28 — Configuration fixed.
09:30 — Request succeeds.
```

A timeline reduces repeated investigation and preserves evidence.

---

## 98. Distinguish Correlation From Causation

Two events occurring together does not prove one caused the other.

Example:

```text
Performance dropped
after dependency upgrade.
```

Possible causes include:

* Dependency itself
* Changed build configuration
* Different production bundle
* Cache invalidation
* Unrelated code change

Test the hypothesis rather than assuming causation.

---

## 99. Avoid Cargo-Cult Fixes

A common mistake is copying a fix from an unrelated situation:

```text
"Adding a timeout fixed someone else's bug."
```

Then:

```js id="5e1vko"
setTimeout(doWork, 1000);
```

The delay may hide a race without fixing it.

Understand the mechanism before applying a workaround.

---

## 100. Separate Workarounds From Root-Cause Fixes

A workaround may reduce symptoms:

```js id="lq3z9g"
if (!data) {
  return;
}
```

A root-cause fix may correct the source:

```js id="v5c1ms"
const data = await fetchData();
```

where the actual problem was failing to await the asynchronous operation.

Use workarounds only when their trade-offs are understood.

---

## 101. Avoid Catch-All Defensive Programming During Debugging

This:

```js id="p2s7q4"
try {
  everything();
} catch {
  return null;
}
```

can make the application appear more stable while hiding failures.

During debugging, preserve information.

Make failures visible until the correct handling is understood.

---

## 102. Debug Nullish Values at Their Origin

When encountering:

```js id="8szb3w"
value?.property
```

do not assume optional chaining solved the problem.

It prevents the exception but may hide unexpected missing data.

Ask:

```text
Why is value missing?
Should it be missing?
Who produced it?
When did it become missing?
```

Use optional chaining when absence is valid, not as a substitute for understanding data flow.

---

## 103. Debug Default Values Carefully

A fallback like:

```js id="e8y5ux"
const name = user.name || "Unknown";
```

can hide invalid data.

For example, `0`, `false`, and `""` are also falsy.

Sometimes the intended condition is nullish:

```js id="k9m0nm"
const name = user.name ?? "Unknown";
```

Debug the semantic difference between:

```text
Missing value
Falsy value
Invalid value
```

---

## 104. Inspect Equality Correctly

JavaScript has multiple equality behaviors.

Use:

```js id="avp3x9"
Object.is(a, b);
```

when reference/value edge cases matter.

For objects:

```js id="c8y5lo"
console.log(
  firstObject === secondObject
);
```

Remember that two separate objects with equal contents are not the same reference.

---

## 105. Debug Floating-Point Problems

A classic example:

```js id="93v7sd"
console.log(0.1 + 0.2);
```

The result is not exactly decimal `0.3`.

When debugging numeric logic, understand whether the problem is:

```text
Representation
Rounding
Comparison
Unit conversion
Algorithm
```

Do not assume all numeric discrepancies are application bugs.

---

## 106. Debug Regular Expressions With Known Inputs

For regex problems, test small cases:

```js id="9xvq0d"
const pattern = /^[a-z]+$/;

console.log(pattern.test("javascript"));
console.log(pattern.test("JavaScript"));
console.log(pattern.test("123"));
```

Break the problem into:

```text
Expected matches
Expected non-matches
Boundary cases
Flags
Anchors
Character classes
```

Complex regex debugging becomes easier when the input space is explicit.

---

## 107. Debug URL Problems

When dealing with URLs, inspect the parsed components.

```js id="3mmwqg"
const url = new URL(
  "https://example.com/users?id=42"
);

console.log({
  origin: url.origin,
  pathname: url.pathname,
  search: url.search,
  searchParams: Object.fromEntries(
    url.searchParams
  )
});
```

This often reveals encoding or parameter mistakes.

---

## 108. Debug Encoding Issues

When strings look corrupted, determine whether the issue is:

```text
UTF-8 encoding
URL encoding
HTML escaping
JSON serialization
Base64 transformation
Database encoding
```

Avoid modifying the string blindly.

Inspect where the transformation occurs.

---

## 109. Debug Time Zone Problems

When timestamps differ, inspect:

```text
Stored timezone
Server timezone
Browser timezone
UTC/local conversion
Formatting timezone
Serialization format
```

A date can be correct while its displayed local representation differs.

Always identify the intended timezone semantics.

---

## 110. Debug Browser Compatibility

If a feature works in one browser but not another, determine:

* API support
* JavaScript syntax support
* CSS support
* Polyfill configuration
* Browser-specific behavior
* Permissions
* Security policies

Do not assume browser inconsistency means the code is necessarily wrong.

---

## 111. Feature Detection

When browser capabilities vary, test for support:

```js id="f1n4vl"
if ("clipboard" in navigator) {
  // Use Clipboard API.
}
```

Do not detect browsers by user-agent strings when feature detection is sufficient.

---

## 112. Debug Security Failures Carefully

Security-related failures may include:

```text
CORS
CSP
Authentication
Authorization
CSRF
Cookie policies
Permissions
Mixed content
Origin restrictions
```

Do not weaken security controls simply to make development work.

For example, do not permanently replace strict policies with permissive wildcards just to silence an error.

---

## 113. Debug CSP Issues From the Violation

Content Security Policy failures often specify what was blocked.

Inspect:

```text
Directive
Blocked resource
Source origin
Policy
```

Then determine whether the resource should actually be allowed.

Do not disable the policy as the default fix.

---

## 114. Debug Mixed Content

If an HTTPS application tries to load:

```text
http://example.com/resource
```

the browser may block it.

Inspect all resource URLs and ensure secure transport where required.

---

## 115. Debug Production-Only Failures

Production-only bugs often involve:

* Different environment variables
* Minification
* Build-time configuration
* Different runtime versions
* Caching
* CDN behavior
* Server infrastructure
* Authentication domains
* Error handling
* Race conditions under real load

Do not assume the production environment is equivalent to development.

---

## 116. Preserve Production Evidence Safely

Useful production evidence includes:

* Error IDs
* Timestamps
* Request IDs
* Stack traces
* Browser/runtime information
* Non-sensitive context

Avoid collecting unnecessary personal or secret data.

Observability should support debugging without creating additional privacy or security risks.

---

## 117. Use Request and Correlation IDs

For distributed systems, a request ID can connect logs across services.

Example:

```js id="x9p3q8"
const requestId = crypto.randomUUID();

console.log("Request started:", {
  requestId
});
```

Pass the ID through relevant layers.

Then logs can be correlated:

```text
Frontend request
      ↓
API request
      ↓
Service
      ↓
Database operation
```

This makes distributed debugging much easier.

---

## 118. Structured Logging

Prefer structured logs:

```js id="73p7zh"
console.log({
  event: "user_created",
  userId: user.id,
  requestId
});
```

over:

```js id="49uwy1"
console.log(
  "User " +
  user.id +
  " was created for request " +
  requestId
);
```

Structured data is easier for logging systems to search and aggregate.

---

## 119. Do Not Log Sensitive Data

Structured logging does not make sensitive information safe.

Avoid logging:

* Passwords
* Authentication tokens
* API secrets
* Full payment details
* Private personal data
* Session credentials

Log only the information needed for diagnosis.

---

## 120. Debugging With Observability

Production debugging often depends on:

```text
Logs
Metrics
Traces
Error reports
Request IDs
Performance profiles
```

These tools complement local debugging.

A production issue may not be reproducible locally.

---

## 121. Monitor Error Rates Instead of Individual Errors Alone

One error event can be an isolated incident.

A sudden increase in errors is stronger evidence of a systemic problem.

For example:

```text
Before deployment:
0.2% request failures

After deployment:
8.5% request failures
```

This suggests investigating what changed around the deployment boundary.

---

## 122. Debug by Change Correlation

When an issue starts after a deployment, compare:

```text
Deployment
Configuration
Dependency updates
Database migrations
Feature flags
Traffic patterns
```

Do not automatically conclude the latest deployment caused the issue.

Confirm with controlled evidence.

---

## 123. Database Schema Changes

A production-only failure may result from:

```text
Application expects column A
Database now exposes column B
```

Inspect application version and database migration state together.

Application and schema compatibility should be treated as a deployment concern.

---

## 124. Debug Cache Invalidation

When stale data appears, inspect:

```text
Source data
Cache key
Cache lifetime
Invalidation logic
Browser cache
CDN cache
Application cache
Database cache
```

Caching bugs often look like data bugs because the underlying source is actually correct.

---

## 125. Verify Whether You Are Looking at Fresh Data

When debugging APIs, databases, or caches, confirm:

```text
When was this data generated?
Where did it come from?
Is it cached?
Which environment produced it?
```

Never assume the data you see is fresh.

---

## 126. Debug State Synchronization

When two sources disagree:

```text
Server state
Client state
Local cache
```

determine:

```text
Which source is authoritative?
When is synchronization supposed to occur?
Who can mutate the value?
What happens after failure?
```

A synchronization bug often appears as a simple stale UI.

---

## 127. Debug Optimistic Updates

Optimistic UI changes state before server confirmation.

Debug:

```text
Initial state
 ↓
Optimistic update
 ↓
Request
 ↓
Success → keep change
Failure → rollback
```

Verify both success and rollback behavior.

---

## 128. Debug Rollback Bugs

Suppose:

```js id="2izx1p"
const previousItems = items;

setItems(nextItems);

try {
  await saveItems(nextItems);
} catch {
  setItems(previousItems);
}
```

If `previousItems` was already mutated, rollback may not restore the real previous state.

Preserve immutable snapshots when required.

---

## 129. Debug Duplicate Requests

Unexpected duplicate requests can come from:

* Duplicate event handlers
* Component lifecycle
* Repeated effects
* Retry logic
* Double submission
* Multiple components
* Prefetching
* Browser behavior

Inspect network activity and correlate each request with the code path that initiated it.

---

## 130. Debug Infinite Loops With Counters

A temporary counter can reveal repeated execution.

```js id="wbfjtc"
let count = 0;

function process() {
  count += 1;

  console.log("Execution count:", count);
}
```

When the count grows unexpectedly, inspect what schedules the next execution.

Remove the instrumentation after diagnosis.

---

## 131. Debug Recursion

If recursion does not terminate, inspect the base case.

```js id="d0w9su"
function countdown(value) {
  if (value <= 0) {
    return;
  }

  countdown(value - 1);
}
```

For debugging:

```js id="j4l7ax"
function countdown(value) {
  console.log("value:", value);

  if (value <= 0) {
    return;
  }

  countdown(value - 1);
}
```

The sequence makes incorrect recursive state easier to see.

---

## 132. Debug Stack Overflows

A stack overflow commonly indicates:

```text
Infinite recursion
Very deep recursion
Unexpected recursive calls
Cyclic function calls
```

Inspect the call stack to identify the repeating pattern.

Do not simply increase stack-related limits without understanding the cause.

---

## 133. Debug Event Loop Timing

For asynchronous ordering problems, test execution order explicitly.

```js id="wp2vsm"
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

The order reveals the interaction between synchronous execution, microtasks, and tasks.

When debugging async ordering, write down the expected sequence before changing code.

---

## 134. Debug Microtasks and Tasks

If output occurs in an unexpected order, separate:

```text
Synchronous code
Microtasks
Timers
Rendering opportunities
Other task sources
```

Understanding scheduling often explains seemingly impossible execution order.

---

## 135. Use Reproduction Scripts

For difficult bugs, create a tiny reproduction:

```js id="77s7xj"
const input = /* minimal failing value */;

const result = targetFunction(input);

console.log(result);
```

This isolates the behavior from the rest of the application.

A minimal reproduction can also be useful when reporting issues to maintainers.

---

## 136. Preserve Minimal Reproductions

Once created, keep the reproduction deterministic and small.

Remove unrelated code.

The goal is:

```text
Smallest input
+
Smallest environment
+
Smallest code path
=
Same failure
```

This greatly accelerates diagnosis.

---

## 137. Debug Third-Party Bugs Before Assuming Your Code Is Correct

If a library appears to fail:

1. Reproduce it with a minimal example.
2. Confirm the library version.
3. Check the documented contract.
4. Compare expected and actual behavior.
5. Test whether your integration is incorrect.
6. Only then consider a library defect.

This prevents misdiagnosing integration mistakes as dependency bugs.

---

## 138. Check Documentation for Expected Behavior

A surprising behavior may actually be documented.

Examples:

```text
Promise scheduling
Browser restrictions
API status codes
React lifecycle behavior
Database transaction semantics
Library defaults
```

Understand the expected semantics before changing code around them.

---

## 139. Verify Assumptions Against the Actual Runtime

Do not debug from memory.

Check:

```text
Actual value
Actual type
Actual network request
Actual DOM
Actual configuration
Actual runtime version
```

The runtime is the source of truth for observed behavior.

---

## 140. Use Small Experiments

When uncertain about a language behavior, write a tiny experiment.

Example:

```js id="m4pd4l"
const object = {
  name: "Osama Abu Motlaq"
};

Object.freeze(object);

object.name = "Updated";

console.log(object.name);
```

A five-line experiment can be faster and clearer than changing a large application.

---

## 141. Keep Experiments Separate From Production Code

Use:

```text
scratch
debug
reproduction
```

or a temporary isolated environment.

Do not pollute production modules with exploratory experiments.

Remove temporary files after diagnosis unless they serve a permanent educational or regression purpose.

---

## 142. Debug With Documentation and Source Code Together

When behavior depends on a library or runtime, inspect:

```text
Your code
Documentation
Error
Library source when necessary
Runtime behavior
```

Do not immediately modify application code to compensate for behavior you have not understood.

---

## 143. Do Not Debug Everything at Once

When multiple errors appear:

```text
Error A
Error B
Error C
```

identify whether they are causally related.

Fix the earliest or highest-level failure first when possible.

One root cause may generate many downstream errors.

---

## 144. Use the Earliest Failure Signal

Suppose logs show:

```text
Database connection failed
User load failed
Dashboard render failed
Button disabled
```

The database failure may be the first meaningful cause.

Debugging from the final UI symptom may waste time.

---

## 145. Distinguish Primary and Secondary Errors

A primary error may trigger secondary failures.

Example:

```text
API request fails
   ↓
State remains undefined
   ↓
Render crashes
   ↓
Error boundary appears
```

Fixing the render crash alone may hide the actual API failure.

---

## 146. Debug by Dependency Direction

Trace the direction of data and control:

```text
Input
 → validation
 → transformation
 → persistence
 → response
 → presentation
```

Start where the assumption first becomes invalid.

This is often faster than starting from the final symptom.

---

## 147. Avoid Guessing Based on Variable Names

A variable named:

```js id="zafl8p"
users
```

might contain:

```js id="fjy7tp"
undefined
```

or:

```js id="8lm1xb"
{
  data: []
}
```

Inspect the runtime value.

Names communicate intent, not guaranteed truth.

---

## 148. Debug Configuration With Safe Diagnostics

For configuration:

```js id="d95v3h"
console.log({
  environment: process.env.NODE_ENV,
  hasApiUrl: Boolean(process.env.API_URL),
  hasPublicKey: Boolean(process.env.PUBLIC_KEY)
});
```

This reveals configuration presence without exposing secrets.

---

## 149. Debug Production Error Reporting

Errors should retain enough context to diagnose them.

Useful metadata:

```text
Error type
Message
Stack trace
Route
Request ID
Application version
Runtime
Non-sensitive user/session context
```

Avoid collecting more information than necessary.

---

## 150. Include Version Information in Reports

When reporting a bug, include:

```text
Application version
Commit
Runtime version
Browser version
Dependency version
Environment
```

A bug without version context can be difficult to reproduce.

---

## 151. Reproduce Before and After the Fix

A correct workflow is:

```text
Failing case
 ↓
Apply fix
 ↓
Same case now succeeds
 ↓
Run regression tests
 ↓
Run broader verification
```

Do not consider a bug fixed merely because one manual attempt appeared successful.

---

## 152. Confirm the Root Cause

After applying the fix, ask:

> Does this change directly explain why the original failure occurred?

If not, the fix may be a workaround.

Understanding the cause is important for preventing the same problem elsewhere.

---

## 153. Prefer Small Correct Fixes

Once the root cause is known, change the smallest appropriate area.

Avoid combining an unrelated refactor with a bug fix unless necessary.

For example:

```text
Bug:
Incorrect API path

Good fix:
Correct API path

Risky simultaneous change:
Correct path
+ Rewrite service layer
+ Rename every module
+ Replace state management
```

Small fixes are easier to verify and review.

---

## 154. Do Not Overfit the Fix to One Input

Bad:

```js id="v2w5xa"
if (value === "Osama") {
  return "correct";
}
```

This may make one test pass while leaving the underlying problem untouched.

A correct fix should explain the general failure.

---

## 155. Add a Regression Test After Fixing the Bug

Once the root cause is fixed:

```text
Bug reproduced
 ↓
Root cause identified
 ↓
Fix applied
 ↓
Regression test added
 ↓
Full verification
```

The test should fail under the old broken behavior and pass under the corrected behavior.

---

## 156. Document Non-Obvious Root Causes

If a bug involved an unusual constraint, document why.

Example:

```js id="zyo4eg"
// The API returns UTC timestamps. Convert only for display.
```

Do not document obvious code.

Document the reasoning that future maintainers might otherwise rediscover.

---

## 157. Debugging Checklist

Before declaring a bug fixed:

* [ ] The failure was reproduced.
* [ ] The expected behavior is clearly defined.
* [ ] The actual behavior is understood.
* [ ] Relevant evidence was collected.
* [ ] The first incorrect value or state was identified.
* [ ] Data boundaries were inspected.
* [ ] The root cause was distinguished from the symptom.
* [ ] A testable hypothesis was formed.
* [ ] The problem was reduced where possible.
* [ ] The smallest correct fix was applied.
* [ ] The original reproduction now succeeds.
* [ ] Important related cases were tested.
* [ ] A regression test was added when appropriate.
* [ ] Temporary debugging instrumentation was removed.
* [ ] No sensitive information was exposed during debugging.
* [ ] Broader tests were run.
* [ ] Build and integration checks were considered.
* [ ] The fix was reviewed for unintended side effects.

---

## 158. A Practical Debugging Workflow

Use this workflow for most bugs:

```text
1. Observe
   ↓
2. Reproduce
   ↓
3. Describe expected behavior
   ↓
4. Capture actual behavior
   ↓
5. Collect evidence
   ↓
6. Trace the data/control flow
   ↓
7. Find the first incorrect state
   ↓
8. Form a hypothesis
   ↓
9. Run a targeted experiment
   ↓
10. Confirm the root cause
   ↓
11. Apply the smallest correct fix
   ↓
12. Reproduce the original scenario
   ↓
13. Add or update tests
   ↓
14. Remove temporary instrumentation
   ↓
15. Run broader verification
```

---

## 159. Debugging Decision Framework

When a bug appears, ask:

### Can I reproduce it?

If not, improve observability and gather environmental information.

### Is it deterministic?

If yes, focus on state and logic.

If no, investigate timing, concurrency, randomness, external systems, or environment differences.

### Where does the first incorrect value appear?

Trace backward from the final symptom.

### Which boundary is involved?

Inspect input, network, storage, database, browser, or module boundaries.

### What assumption failed?

Make the assumption explicit.

### Can I reduce the problem?

Create a minimal reproduction.

### What evidence would distinguish between my hypotheses?

Run the smallest useful experiment.

### What is the root cause?

Do not stop at the first symptom.

### How will I prevent regression?

Add a test or stronger invariant where appropriate.

---

## 160. Final Principles

1. Debug systematically rather than randomly.
2. Start with the exact symptom.
3. Reproduce the failure whenever possible.
4. Separate symptoms from causes.
5. Collect evidence before forming strong conclusions.
6. Find the first incorrect value or state.
7. Inspect data at system boundaries.
8. Use stack traces and call stacks.
9. Use breakpoints when interactive inspection is useful.
10. Reduce complex failures to minimal reproductions.
11. Change one relevant variable at a time.
12. Form explicit, testable hypotheses.
13. Preserve useful error context.
14. Never hide failures merely to make the application appear stable.
15. Treat timing and concurrency as first-class debugging concerns.
16. Inspect network requests instead of assuming the client or server is at fault.
17. Debug configuration and environment differences explicitly.
18. Never expose secrets while debugging.
19. Use Git history to understand regressions.
20. Measure performance instead of guessing.
21. Trace resource ownership when debugging leaks.
22. Distinguish primary failures from secondary symptoms.
23. Prefer root-cause fixes over accidental workarounds.
24. Keep fixes as small as practical.
25. Reproduce the original bug after applying the fix.
26. Add regression tests for important failures.
27. Remove temporary debugging instrumentation.
28. Treat flaky behavior as an engineering problem.
29. Use observability appropriately in production.
30. Make important assumptions explicit.
31. Use small experiments to verify uncertain language or runtime behavior.
32. Prefer evidence over intuition.
33. Debug the actual runtime state, not the state you expect to exist.
34. A successful workaround is not necessarily a root-cause fix.
35. Good debugging ends with both a fix and an explanation of why the failure occurred.
