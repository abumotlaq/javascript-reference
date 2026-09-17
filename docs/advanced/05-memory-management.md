# JavaScript Memory Management

## Overview

Memory management is the process of allocating memory for program data, using that memory while the data is needed, and eventually making unused memory available for reuse.

JavaScript provides automatic memory management through garbage collection.

Developers usually do not manually allocate and free memory in ordinary JavaScript code.

However, understanding memory management is important because JavaScript applications can still create:

* Memory leaks
* Unnecessary retained references
* Excessive allocations
* Long-lived objects
* Unbounded caches
* Forgotten event listeners
* Timers that keep objects reachable
* Detached DOM references

A simplified model is:

```text
Create Data
    |
    v
Allocate Memory
    |
    v
Use Data
    |
    v
Remove References
    |
    v
Object Becomes Unreachable
    |
    v
Garbage Collector
    |
    v
Memory Can Be Reclaimed
```

---

# Automatic Memory Management

JavaScript manages memory automatically.

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

You do not manually request a memory address for the object.

The JavaScript runtime handles memory allocation.

When the object is no longer reachable, the garbage collector can eventually reclaim its memory.

---

# Memory Allocation

JavaScript allocates memory for many kinds of values.

Examples include:

```js
const name = "Osama Abu Motlaq";

const age = 25;

const skills = [
  "JavaScript",
  "React",
  "Next.js",
];

const user = {
  name,
  age,
  skills,
};
```

The runtime must store the information represented by these values somewhere in memory.

The exact internal representation is engine-specific.

---

# Memory Is More Than Stack and Heap

A common educational model divides memory into:

```text
Stack
Heap
```

A simplified representation is:

```text
Call Stack
|
├── Active execution state
└── References / primitive values
         |
         v
Heap
|
├── Objects
├── Arrays
├── Functions
└── Other dynamically allocated data
```

This model is useful for learning, but it is not a complete description of how modern JavaScript engines actually organize memory.

Engines can use optimized representations and internal strategies that do not map perfectly to a simple stack-versus-heap model.

---

# Primitive Values

JavaScript primitive types include:

```text
string
number
bigint
boolean
undefined
null
symbol
```

Example:

```js
const name = "Osama Abu Motlaq";
const age = 25;
const isDeveloper = true;
const value = null;
```

The engine manages these values according to its internal representation.

Do not assume that every primitive is always stored in one specific physical memory location.

---

# Objects

Objects are reference-based values.

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

Another variable can point to the same object:

```js
const userCopy = user;
```

Now both variables refer to the same object.

```text
user ──────┐
           v
      ┌───────────────┐
      │     Object    │
      │ name          │
      │ role          │
      └───────────────┘
           ^
           |
userCopy ──┘
```

---

# References

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const anotherUser = user;

anotherUser.name =
  "Osama Abu Motlaq - Developer";

console.log(user.name);
```

Output:

```text
Osama Abu Motlaq - Developer
```

The two variables reference the same object.

Changing the object through one reference affects what is observed through the other reference.

---

# Creating a Separate Object

To create a separate object:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const anotherUser = {
  ...user,
};

anotherUser.name =
  "Osama Abu Motlaq - Developer";

console.log(user.name);
console.log(anotherUser.name);
```

The objects are different:

```text
user
  |
  v
Object A

anotherUser
  |
  v
Object B
```

---

# Arrays Are Objects

Arrays are also objects.

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];
```

A variable references the array object.

Another variable can reference the same array:

```js
const otherSkills =
  skills;

otherSkills.push(
  "Node.js"
);

console.log(
  skills
);
```

The original array changes because both variables refer to the same object.

---

# Functions Are Objects

Functions are also objects in JavaScript.

```js
function greet() {
  console.log(
    "Hello, Osama Abu Motlaq!"
  );
}
```

A function can be assigned to another variable:

```js
const anotherFunction =
  greet;

anotherFunction();
```

Both references point to the same function object.

---

# Objects Can Reference Other Objects

Example:

```js
const profile = {
  name: "Osama Abu Motlaq",

  skills: [
    "JavaScript",
    "React",
  ],
};
```

The reference structure can be thought of as:

```text
profile
   |
   v
Object
|
├── name
|
└── skills
      |
      v
    Array
    |
    ├── JavaScript
    └── React
```

Objects can therefore create complex reference graphs.

---

# Reference Graphs

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const profile = {
  user,
};
```

Conceptually:

```text
profile
   |
   v
Profile Object
   |
   └────> User Object
```

The garbage collector analyzes reachability through these references.

---

# Reachability

The most important concept in garbage collection is reachability.

An object is considered reachable when the runtime can still get to it through active references and other GC roots.

A simplified model:

```text
GC Root
  |
  v
Object A
  |
  v
Object B
```

Both objects are reachable.

---

# Garbage

Suppose:

```js
let user = {
  name: "Osama Abu Motlaq",
};

user = null;
```

If nothing else references the object, the original object may become unreachable.

Conceptually:

```text
Before:
user
 |
 v
Object

After:
user → null

Object has no reachable reference.
```

The garbage collector can eventually reclaim it.

---

# Garbage Collection

Garbage collection identifies memory that is no longer reachable and makes that memory available for reuse.

A simplified process is:

```text
Find Reachable Objects
        |
        v
Identify Unreachable Objects
        |
        v
Reclaim Memory
```

Modern engines use sophisticated collectors rather than one simple algorithm.

---

# Mark-and-Sweep

One common conceptual garbage-collection model is mark-and-sweep.

### Mark

Starting from GC roots, reachable objects are marked.

```text
Root
 |
 v
A
 |
 v
B
```

Both `A` and `B` are reachable.

### Sweep

Objects that were not marked can be reclaimed.

```text
Root → A → B

Unreachable:

C → D
```

`C` and `D` can potentially be collected if no hidden runtime references keep them alive.

---

# Garbage Collection Is Reachability-Based

Consider:

```js
let user = {
  name: "Osama Abu Motlaq",
};

let profile = {
  user,
};

user = null;
```

The user object is still reachable through:

```text
profile
  |
  v
user object
```

Therefore, setting one reference to `null` does not necessarily make the object garbage.

---

# Multiple References

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const firstReference =
  user;

const secondReference =
  user;
```

The object remains reachable as long as at least one reachable reference remains.

If:

```js
let firstReference =
  user;

let secondReference =
  user;
```

then:

```js
firstReference = null;
```

does not make the object unreachable because:

```text
secondReference
       |
       v
    Object
```

still exists.

---

# Removing All Reachable References

Example:

```js
let user = {
  name: "Osama Abu Motlaq",
};

let firstReference =
  user;

let secondReference =
  user;

user = null;
firstReference = null;
secondReference = null;
```

If no other references exist, the object can become unreachable.

The garbage collector can eventually reclaim its memory.

---

# Garbage Collection Is Not Immediate

Consider:

```js
let data = {
  value: 100,
};

data = null;
```

This does not mean:

```text
Free memory immediately at this line.
```

It means:

```text
The object may now be unreachable.
```

The collector decides when memory is reclaimed according to its own scheduling and heuristics.

---

# You Cannot Force Ordinary Garbage Collection

JavaScript does not provide a standard browser API like:

```js
collectGarbage();
```

Normal application code should not depend on manually triggering the garbage collector.

---

# Functions and Closures

Closures can keep data reachable.

Example:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;

    return count;
  };
}

const counter =
  createCounter();
```

The returned function still has access to `count`.

Therefore, the environment containing `count` remains reachable as long as the closure itself remains reachable.

---

# Closure Retaining Large Data

Example:

```js
function createManager() {
  const largeData =
    new Array(100000);

  return function getData() {
    return largeData;
  };
}

const manager =
  createManager();
```

The closure can keep `largeData` reachable.

As long as:

```js
manager
```

remains reachable, the captured data may remain reachable too.

---

# Releasing a Closure

If the closure is no longer needed:

```js
let manager =
  createManager();

manager = null;
```

If no other references to the closure or its captured environment exist, the associated data can eventually become unreachable.

---

# Accidental Long-Lived Closures

A closure can unintentionally retain more data than necessary.

Example:

```js
function createHandler() {
  const largeData =
    new Array(100000);

  return function handle() {
    console.log(
      largeData.length
    );
  };
}
```

The callback keeps access to `largeData`.

When designing closures, avoid capturing large structures unless they are actually needed.

---

# Event Listeners and Memory

Event listeners can keep references alive.

Example:

```js
const data = {
  name: "Osama Abu Motlaq",
};

function handleClick() {
  console.log(
    data.name
  );
}

document.addEventListener(
  "click",
  handleClick
);
```

As long as the listener remains registered, the runtime may need to retain everything required for the listener's behavior.

---

# Removing Event Listeners

When a listener is no longer needed:

```js
const data = {
  name: "Osama Abu Motlaq",
};

function handleClick() {
  console.log(
    data.name
  );
}

document.addEventListener(
  "click",
  handleClick
);

document.removeEventListener(
  "click",
  handleClick
);
```

Removing listeners is especially important for long-lived applications and components that are created and destroyed repeatedly.

---

# Inline Anonymous Listeners

Consider:

```js
document.addEventListener(
  "click",
  () => {
    console.log("Clicked");
  }
);
```

The listener cannot easily be removed later unless the function reference is retained.

A named function reference is often easier to manage:

```js
function handleClick() {
  console.log("Clicked");
}

document.addEventListener(
  "click",
  handleClick
);
```

Then:

```js
document.removeEventListener(
  "click",
  handleClick
);
```

---

# AbortController for Cleanup

For event listeners, `AbortController` can simplify cleanup.

```js
const controller =
  new AbortController();

window.addEventListener(
  "resize",
  () => {
    console.log(
      window.innerWidth
    );
  },
  {
    signal:
      controller.signal,
  }
);

controller.abort();
```

Aborting removes the listener registered with that signal.

This pattern is useful for managing groups of resources.

---

# Timers and Retained References

Timers can also keep callback-related state reachable while they remain scheduled.

Example:

```js
const data = {
  name: "Osama Abu Motlaq",
};

const timeoutId =
  setTimeout(() => {
    console.log(
      data.name
    );
  }, 60000);
```

The callback captures `data`.

While the timeout remains scheduled, the callback and its required references may remain reachable.

---

# Clear Unnecessary Timers

If a scheduled timeout is no longer needed:

```js
clearTimeout(
  timeoutId
);
```

Similarly, intervals should be cleared:

```js
const intervalId =
  setInterval(() => {
    console.log(
      "Working..."
    );
  }, 1000);

clearInterval(
  intervalId
);
```

---

# Intervals Can Become Long-Lived Leaks

An interval can continue indefinitely if it is never cleared.

```js
const intervalId =
  setInterval(() => {
    console.log(
      "Still running."
    );
  }, 1000);
```

If the application no longer needs the interval, stop it:

```js
clearInterval(
  intervalId
);
```

---

# Detached DOM Nodes

A detached DOM node is an element that has been removed from the document but is still referenced by JavaScript.

Example:

```js
const element =
  document.createElement(
    "div"
  );

document.body.appendChild(
  element
);

const savedElement =
  element;

element.remove();
```

The element is no longer part of the document.

However:

```text
savedElement
      |
      v
Detached DOM Element
```

still keeps the node reachable.

---

# Releasing Detached DOM References

If the node is no longer needed:

```js
let element =
  document.createElement(
    "div"
  );

document.body.appendChild(
  element
);

element.remove();

element = null;
```

If no other references exist, the detached node can eventually become unreachable.

---

# Caches

Caches intentionally retain data.

Example:

```js
const cache =
  new Map();

function store(
  key,
  value
) {
  cache.set(
    key,
    value
  );
}
```

A cache that grows forever can become a memory problem.

---

# Unbounded Cache

```js
const cache =
  new Map();

function addData(
  key,
  value
) {
  cache.set(
    key,
    value
  );
}

for (
  let index = 0;
  index < 100000;
  index++
) {
  addData(
    `key-${index}`,
    {
      value: index,
    }
  );
}
```

The map keeps references to its values.

The entries remain reachable through the `cache`.

---

# Bounded Cache

A basic bounded cache can remove old entries.

```js
const cache =
  new Map();

const MAX_ENTRIES = 3;

function setCache(
  key,
  value
) {
  cache.set(
    key,
    value
  );

  if (
    cache.size >
    MAX_ENTRIES
  ) {
    const firstKey =
      cache.keys().next().value;

    cache.delete(
      firstKey
    );
  }
}

setCache("a", 1);
setCache("b", 2);
setCache("c", 3);
setCache("d", 4);
```

Now the cache does not grow without a limit.

---

# WeakMap

`WeakMap` can be useful when data should not keep an object alive by itself.

Example:

```js
const metadata =
  new WeakMap();

const user = {
  name: "Osama Abu Motlaq",
};

metadata.set(
  user,
  {
    active: true,
  }
);

console.log(
  metadata.get(user)
);
```

The key is an object.

A `WeakMap` does not provide normal strong iteration over its keys.

---

# WeakMap and Garbage Collection

Suppose:

```js
let user = {
  name: "Osama Abu Motlaq",
};

const metadata =
  new WeakMap();

metadata.set(
  user,
  {
    active: true,
  }
);

user = null;
```

If no other strong reference exists to the original object, the object may become unreachable.

The `WeakMap` entry does not itself keep the key strongly reachable.

The exact timing of collection is not observable through a normal `WeakMap` API.

---

# WeakSet

A `WeakSet` also stores objects without keeping them strongly reachable solely because of membership.

```js
const visited =
  new WeakSet();

const user = {
  name: "Osama Abu Motlaq",
};

visited.add(user);

console.log(
  visited.has(user)
);
```

Again, the object must be referenced elsewhere to remain reachable.

---

# Weak Collections Are Not General Caches

Do not use `WeakMap` or `WeakSet` simply because they sound more memory efficient.

They are useful when object identity and weak reachability are part of the design.

Example use case:

```text
Object
   |
   +── metadata

Metadata should disappear naturally
when the object is no longer reachable.
```

---

# String Allocations

Repeatedly creating large strings can create allocation pressure.

Example:

```js
let output = "";

for (
  let index = 0;
  index < 10000;
  index++
) {
  output +=
    `Item ${index}\n`;
}

console.log(
  output.length
);
```

Modern JavaScript engines optimize string handling heavily, so do not assume that every concatenation creates a complete new string immediately.

The practical lesson is to avoid unnecessary large temporary data when designing performance-sensitive code.

---

# Array Allocations

This code creates a new array:

```js
const numbers = [
  1,
  2,
  3,
];

const doubled =
  numbers.map(
    (number) =>
      number * 2
  );
```

The original array still exists.

The new array also exists.

If such allocations happen repeatedly on very large datasets, they can increase memory pressure.

---

# Unnecessary Copies

Consider:

```js
const data =
  new Array(100000);

const copy = [
  ...data,
];
```

The spread operation creates another array.

Copies are sometimes required.

The goal is not:

```text
Never allocate.
```

The goal is:

```text
Allocate what you need.
Avoid unnecessary long-lived allocations.
```

---

# Temporary Objects

Example:

```js
function processUser(
  name
) {
  return {
    name,
    role:
      "Frontend Developer",
  };
}
```

Calling this function creates an object for the returned result.

Temporary objects are normal.

The engine can reclaim objects that become unreachable.

---

# Allocation Pressure

A program that creates very large amounts of short-lived data can create allocation pressure.

Example:

```js
function createData() {
  return new Array(
    10000
  ).fill(0);
}

for (
  let index = 0;
  index < 1000;
  index++
) {
  createData();
}
```

The garbage collector may need to work frequently to reclaim unused allocations.

This can affect performance.

---

# Reuse When Appropriate

Sometimes data can be reused rather than recreated repeatedly.

```js
const buffer =
  new Array(1000).fill(
    0
  );

function resetBuffer() {
  buffer.fill(0);
}

resetBuffer();
```

Do not optimize blindly.

Reuse should be justified by actual performance or memory requirements.

---

# Memory Leaks

A memory leak occurs when a program unintentionally retains data that is no longer needed.

The important condition is:

```text
Data is no longer logically needed
        +
Data is still reachable
        =
Potential memory leak
```

---

# Common Sources of Leaks

Common patterns include:

```text
Unremoved event listeners
Uncleared intervals
Long-lived timeouts
Detached DOM references
Growing caches
Global references
Long-lived closures
Subscriptions without cleanup
Repeated observers without disconnect()
```

---

# Global References

Globals can accidentally retain large objects.

Example:

```js
globalThis.largeData =
  new Array(
    100000
  );
```

As long as the global property remains reachable, the data remains reachable.

A better approach is to keep data in the narrowest necessary scope.

---

# Avoid Unnecessary Globals

Prefer:

```js
function createProfile() {
  const profile = {
    name: "Osama Abu Motlaq",
  };

  return profile;
}
```

over:

```js
globalThis.profile = {
  name: "Osama Abu Motlaq",
};
```

unless the global is intentionally part of the application's architecture.

---

# Scope and Lifetime

A useful design principle is:

```text
Smaller scope
      ↓
Fewer reachable references
      ↓
Simpler lifetime management
```

Example:

```js
function calculate() {
  const temporaryData =
    new Array(1000);

  return temporaryData.length;
}

console.log(
  calculate()
);
```

`temporaryData` is local to the function.

After the function finishes, if the array is not returned or referenced elsewhere, it can become unreachable.

---

# Returning Large Data

If you return a large object:

```js
function createLargeData() {
  return new Array(
    100000
  );
}

const data =
  createLargeData();
```

The caller now holds the returned array.

The array remains reachable through:

```text
data
 |
 v
Large Array
```

---

# Releasing a Reference

When a variable is no longer needed:

```js
let data =
  createLargeData();

console.log(
  data.length
);

data = null;
```

This can allow the object to become unreachable if no other references exist.

Setting variables to `null` everywhere is not generally necessary.

It is useful when deliberately releasing a long-lived reference.

---

# Event Listeners in Repeated UI Code

Consider code that runs repeatedly:

```js
function setup() {
  window.addEventListener(
    "resize",
    () => {
      console.log(
        window.innerWidth
      );
    }
  );
}

setup();
setup();
setup();
```

Three listeners are registered.

Repeated initialization without cleanup can cause:

* Duplicate work
* Unexpected behavior
* Retained callbacks
* Memory growth

---

# Cleanup Pattern

```js
function setup() {
  function handleResize() {
    console.log(
      window.innerWidth
    );
  }

  window.addEventListener(
    "resize",
    handleResize
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}

const cleanup =
  setup();

cleanup();
```

This pattern makes resource lifetime explicit.

---

# Observer Cleanup

Observers can also retain references while active.

Example:

```js
const observer =
  new MutationObserver(
    () => {
      console.log(
        "DOM changed."
      );
    }
  );

observer.observe(
  document.body,
  {
    childList: true,
  }
);
```

When the observer is no longer needed:

```js
observer.disconnect();
```

---

# IntersectionObserver Cleanup

```js
const element =
  document.querySelector(
    "#target"
  );

const observer =
  new IntersectionObserver(
    (entries) => {
      console.log(
        entries.length
      );
    }
  );

if (element) {
  observer.observe(
    element
  );
}

observer.disconnect();
```

---

# ResizeObserver Cleanup

```js
const element =
  document.querySelector(
    "#target"
  );

const observer =
  new ResizeObserver(
    (entries) => {
      console.log(
        entries.length
      );
    }
  );

if (element) {
  observer.observe(
    element
  );
}

observer.disconnect();
```

---

# Fetch and Memory

A network response also consumes memory.

Example:

```js
async function loadData() {
  const response =
    await fetch(
      "/api/data"
    );

  const data =
    await response.json();

  return data;
}
```

If a huge response is loaded into memory and retained unnecessarily, memory usage can increase.

Only keep data as long as the application needs it.

---

# Avoid Retaining Large Responses

Example:

```js
let cachedResponse = null;

async function loadData() {
  const response =
    await fetch(
      "/api/data"
    );

  cachedResponse =
    await response.json();
}
```

This intentionally keeps the response alive through the global variable.

The design may be valid for a cache, but it should be intentional.

---

# Abort Unnecessary Requests

If a request is no longer relevant:

```js
const controller =
  new AbortController();

fetch(
  "/api/data",
  {
    signal:
      controller.signal,
  }
);

controller.abort();
```

Cancelling unnecessary work can reduce resource usage and prevent stale operations from continuing.

---

# Memory and Large DOM Trees

A large DOM tree consumes memory.

Example:

```js
const fragment =
  document.createDocumentFragment();

for (
  let index = 0;
  index < 10000;
  index++
) {
  const element =
    document.createElement(
      "div"
    );

  element.textContent =
    `Item ${index}`;

  fragment.appendChild(
    element
  );
}

document.body.appendChild(
  fragment
);
```

Large DOM structures can affect both memory and rendering performance.

Use only as much UI structure as necessary.

---

# Memory and Application State

Large application state objects can remain reachable for the entire lifetime of an application.

Example:

```js
const appState = {
  user: {
    name: "Osama Abu Motlaq",
  },

  projects: new Array(
    10000
  ),

  logs: new Array(
    10000
  ),
};
```

A global state object like this can retain all of its nested data.

Keep long-lived state intentional.

---

# State Cleanup

When data is no longer needed:

```js
const state = {
  cache: new Map(),
};

state.cache.clear();
```

The map no longer strongly references its previous entries.

---

# Memory-Friendly Data Lifetime

Think about data using three stages:

```text
Create
  |
  v
Use
  |
  v
Release
```

For every long-lived resource, ask:

```text
Who owns it?
How long is it needed?
What keeps it reachable?
How is it cleaned up?
```

---

# Ownership

JavaScript does not require explicit ownership syntax.

However, applications still have logical ownership.

Example:

```js
function createComponent() {
  const controller =
    new AbortController();

  return {
    destroy() {
      controller.abort();
    },
  };
}

const component =
  createComponent();

component.destroy();
```

The component logically owns its controller.

---

# Resource Lifetime

A useful pattern is:

```text
Create Resource
      |
      v
Register / Start
      |
      v
Use Resource
      |
      v
Cleanup Resource
```

Examples:

```text
addEventListener → removeEventListener

setInterval → clearInterval

setTimeout → clearTimeout

Observer → disconnect

Fetch → AbortController.abort()
```

---

# `WeakRef`

JavaScript also provides `WeakRef`.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const weakReference =
  new WeakRef(user);

console.log(
  weakReference
    .deref()
);
```

A `WeakRef` provides a weak reference to an object.

The object can still be garbage-collected if no strong references remain.

---

# WeakRef Limitations

Do not use `WeakRef` as a replacement for normal object references.

Example:

```js
const object = {
  value: 100,
};

const weak =
  new WeakRef(object);
```

The weak reference does not guarantee that:

```js
weak.deref()
```

will always return the object.

If the object has been collected, `deref()` returns:

```js
undefined
```

---

# `FinalizationRegistry`

JavaScript also provides `FinalizationRegistry`.

Example:

```js
const registry =
  new FinalizationRegistry(
    (value) => {
      console.log(
        "Object finalized:",
        value
      );
    }
  );

const user = {
  name: "Osama Abu Motlaq",
};

registry.register(
  user,
  "user"
);
```

Do not build core application logic around finalization timing.

Garbage collection is nondeterministic.

---

# Do Not Depend on Collection Timing

Avoid logic such as:

```text
Wait for garbage collection
then perform critical operation
```

Garbage collection timing is not a reliable application-level scheduling mechanism.

---

# Memory Profiling

Browser developer tools can help investigate memory usage.

Typical profiling workflow:

```text
Open DevTools
      |
      v
Memory
      |
      v
Take Heap Snapshot
      |
      v
Interact With Application
      |
      v
Take Another Snapshot
      |
      v
Compare Retained Objects
```

This is more reliable than guessing from source code alone.

---

# Heap Snapshots

A heap snapshot can help identify:

* Retained objects
* Large arrays
* Detached DOM nodes
* Long-lived closures
* Unexpected references
* Growing collections

The exact DevTools interface depends on the browser.

---

# Allocation Profiling

Allocation profiling can help identify code that repeatedly creates objects or other allocations.

Example pattern:

```js
function createUsers() {
  return new Array(
    1000
  ).fill(null).map(() => ({
    name: "Osama Abu Motlaq",
  }));
}
```

Calling this repeatedly can create many objects.

Profiling can reveal whether the allocation rate is actually a problem.

---

# Measuring Before Optimizing

Do not immediately rewrite code because you suspect a memory problem.

Use:

```text
Observe
  ↓
Measure
  ↓
Identify Retained Data
  ↓
Find Root Reference
  ↓
Fix Lifetime
  ↓
Measure Again
```

Memory optimization should be evidence-driven.

---

# Common Memory Leak Pattern

```js
const handlers = [];

function registerHandler() {
  const largeData =
    new Array(
      100000
    );

  const handler = () => {
    console.log(
      largeData.length
    );
  };

  handlers.push(
    handler
  );
}

registerHandler();
registerHandler();
registerHandler();
```

The `handlers` array intentionally keeps every callback reachable.

Each callback keeps access to its corresponding `largeData`.

Conceptually:

```text
handlers
   |
   +── handler A ──> largeData A
   |
   +── handler B ──> largeData B
   |
   +── handler C ──> largeData C
```

The data will remain reachable as long as the callbacks remain in `handlers`.

---

# Releasing the Handlers

```js
handlers.length = 0;
```

or:

```js
handlers.splice(
  0,
  handlers.length
);
```

After removing the references, the callbacks and captured data can become unreachable if no other references exist.

---

# Memory Leak From a Global Cache

```js
const cache = [];

function addItem(item) {
  cache.push(item);
}

for (
  let index = 0;
  index < 100000;
  index++
) {
  addItem({
    id: index,
  });
}
```

The global array keeps all objects reachable.

If the application never needs old entries, the cache is unnecessarily retaining memory.

---

# Clear the Cache

```js
cache.length = 0;
```

This removes the array's existing elements.

The previously referenced objects can become unreachable if nothing else references them.

---

# Memory Leak From Intervals

```js
const data =
  new Array(100000);

setInterval(() => {
  console.log(
    data.length
  );
}, 1000);
```

The interval keeps the callback active for the application's lifetime unless cleared.

That callback can keep `data` reachable.

---

# Better Lifetime Management

```js
const data =
  new Array(100000);

const intervalId =
  setInterval(() => {
    console.log(
      data.length
    );
  }, 1000);

setTimeout(() => {
  clearInterval(
    intervalId
  );
}, 5000);
```

The interval has a defined lifetime.

---

# Practical Cleanup Pattern

```js
function createResource() {
  const controller =
    new AbortController();

  const intervalId =
    setInterval(() => {
      console.log(
        "Working..."
      );
    }, 1000);

  function cleanup() {
    controller.abort();

    clearInterval(
      intervalId
    );
  }

  return {
    signal:
      controller.signal,
    cleanup,
  };
}

const resource =
  createResource();

setTimeout(() => {
  resource.cleanup();
}, 5000);
```

The resource exposes its cleanup operation explicitly.

---

# Memory Management Principles

Use these principles:

```text
Keep scopes narrow.
Avoid unnecessary globals.
Release event listeners.
Clear timers and intervals.
Disconnect observers.
Abort unnecessary requests.
Bound caches.
Avoid retaining large data unnecessarily.
Be careful with closures.
Remove stale references.
Measure memory problems instead of guessing.
```

---

# Memory Is About Reachability

The most important concept is not:

```text
"Is this object still used in my source code?"
```

The more useful question is:

```text
"Is this object still reachable from the runtime's roots?"
```

For example:

```text
GC Root
   |
   v
Global State
   |
   v
Cache
   |
   v
Object
```

Even if the application logic considers the object "old", it can still remain alive because the cache keeps a reference.

---

# Logical Lifetime vs Physical Memory

There is an important distinction:

```text
Logical lifetime
=
When the application considers data useful
```

versus:

```text
Physical memory lifetime
=
How long the runtime keeps the data allocated
```

An object can stop being logically useful while still being physically retained because a reference remains.

---

# Garbage Collection Is an Optimization Mechanism

Garbage collection exists to automate memory reclamation.

It does not eliminate the need for good resource management.

For example:

```js
const intervalId =
  setInterval(
    () => {},
    1000
  );
```

The garbage collector does not automatically decide that your application no longer needs the interval.

You need to call:

```js
clearInterval(
  intervalId
);
```

---

# Memory and React

Memory management is particularly relevant in React applications.

Common resource patterns include:

```text
useEffect
event listeners
setInterval
setTimeout
WebSocket
fetch
observers
subscriptions
```

A component may create a resource when it mounts and should clean it up when the resource is no longer needed.

Example:

```js
useEffect(() => {
  const intervalId =
    setInterval(() => {
      console.log(
        "Working..."
      );
    }, 1000);

  return () => {
    clearInterval(
      intervalId
    );
  };
}, []);
```

The cleanup function defines the lifetime of the interval.

---

# Memory and DOM

Direct DOM references can also matter in React and other UI systems.

Example:

```js
const element =
  document.querySelector(
    "#target"
  );
```

If code stores that element indefinitely, it can remain reachable even after the UI structure changes.

Keep DOM references scoped to the period in which they are needed.

---

# Final Mental Model

Think about memory management as a graph problem:

```text
                     GC Roots
                        |
             +----------+----------+
             |          |          |
             v          v          v
           Object      Array     Closure
             |           |          |
             v           v          v
           Object      Object     Data
```

Garbage collection asks:

```text
Which objects are still reachable?
```

Anything unreachable can potentially be reclaimed.

---

# Practical Checklist

When investigating a memory problem, ask:

```text
1. What is using the memory?

2. Is the data still logically needed?

3. What reference keeps it reachable?

4. Is it stored globally?

5. Is an event listener retaining it?

6. Is a timer or interval retaining it?

7. Is an observer still active?

8. Is a closure retaining it?

9. Is a cache growing without bounds?

10. Is a DOM node detached but still referenced?

11. Can the resource be explicitly cleaned up?

12. Can DevTools confirm the suspected retention?
```

---

# Summary

JavaScript uses automatic memory management and garbage collection.

Important concepts include:

* JavaScript allocates memory automatically.
* Objects, arrays, and functions are reference-based values.
* Multiple variables can reference the same object.
* Garbage collection is primarily based on reachability.
* Unreachable objects can eventually be reclaimed.
* Garbage collection is not immediate or directly controlled by normal application code.
* Closures can keep captured data reachable.
* Event listeners can retain callbacks and referenced data.
* Timers and intervals can keep callbacks alive.
* Observers require cleanup when no longer needed.
* Caches can become memory leaks when they grow without bounds.
* Detached DOM nodes can remain alive through JavaScript references.
* `WeakMap` and `WeakSet` provide weakly held object keys and values according to their respective semantics.
* `WeakRef` and `FinalizationRegistry` exist for specialized use cases but should not be used for deterministic resource management.
* Memory optimization should be based on measurement and profiling.
* Resource lifetime should be explicit even though memory itself is automatically managed.

The central idea is:

```text
Object Created
      |
      v
Object Referenced
      |
      v
Object Used
      |
      v
References Removed
      |
      v
Object Becomes Unreachable
      |
      v
Garbage Collector
      |
      v
Memory Reclaimed
```

Good memory management in JavaScript is therefore less about manually freeing memory and more about controlling **references, lifetimes, and retained resources**.
