# JavaScript Garbage Collection

## Overview

Garbage collection is the process JavaScript runtimes use to identify memory that is no longer reachable and make it available for reuse.

JavaScript has automatic memory management.

You normally do not manually allocate and free memory.

However, understanding garbage collection is important because JavaScript applications can still suffer from:

* Memory leaks
* Retained objects
* Detached DOM nodes
* Growing caches
* Long-lived closures
* Forgotten event listeners
* Unnecessary timers
* Large object graphs

A simplified model is:

```text
Create Object
      |
      v
Object Becomes Reachable
      |
      v
Application Uses Object
      |
      v
References Are Removed
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

# What Is Garbage Collection?

Garbage collection is automatic memory reclamation.

Consider:

```js
let user = {
  name: "Osama Abu Motlaq",
};

user = null;
```

Initially:

```text
user
 |
 v
User Object
```

After:

```js
user = null;
```

the reference is removed:

```text
user → null
```

If no other reachable reference points to the object, it may become unreachable.

The garbage collector can eventually reclaim its memory.

---

# Garbage Collection Is Not Manual

You do not normally write:

```js
free(user);
```

JavaScript does not expose a standard manual memory-freeing operation for ordinary objects.

Instead, the runtime determines when memory can be reclaimed.

---

# Reachability

The central idea behind garbage collection is:

```text
Reachability
```

An object is reachable when it can still be reached from an active root through references.

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

The reference graph can be simplified as:

```text
Root
 |
 v
user
 |
 v
Object
```

The object is reachable.

---

# Unreachable Objects

Consider:

```js
let user = {
  name: "Osama Abu Motlaq",
};

user = null;
```

The original object may now look like:

```text
Root
 |
 v
user → null

User Object
     X
```

There is no longer a reachable path to the object, assuming no other references exist.

The object is therefore eligible for garbage collection.

---

# Garbage Collection Does Not Mean Immediate Deletion

Consider:

```js
let data = {
  value: 100,
};

data = null;
```

It is incorrect to assume:

```text
data = null
↓
memory is immediately released
```

The correct mental model is:

```text
data = null
↓
object may become unreachable
↓
runtime decides when to collect it
```

Garbage collection is nondeterministic.

---

# Why Garbage Collection Exists

Without automatic garbage collection, developers would have to manually manage memory for most dynamically allocated data.

This would create additional risks:

```text
Use-after-free
Double-free
Dangling pointers
Manual deallocation bugs
```

JavaScript avoids these problems by using automatic memory management.

---

# GC Roots

Garbage collectors need starting points from which reachability can be determined.

These are commonly described as:

```text
GC Roots
```

A simplified model includes things such as:

```text
Global references
Active execution state
Live references
Runtime-managed roots
```

From those roots, the collector can determine which objects remain reachable.

---

# Root Example

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

A simplified graph is:

```text
GC Root
   |
   v
user
   |
   v
User Object
```

Because the object is reachable from a root, it cannot be treated as garbage.

---

# Removing the Root Reference

Consider:

```js
let user = {
  name: "Osama Abu Motlaq",
};

user = null;
```

The graph changes:

```text
GC Root
   |
   v
user → null

User Object
     X
```

The object can now become unreachable.

---

# Multiple References

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const firstReference = user;
const secondReference = user;
```

Conceptually:

```text
          +--> firstReference --+
          |                     |
Root -----+                     v
          |                  Object
          |                     ^
          +--> secondReference-+
```

Removing one reference does not make the object unreachable.

---

# Removing One Reference

```js
let user = {
  name: "Osama Abu Motlaq",
};

let firstReference = user;
let secondReference = user;

firstReference = null;
```

The object is still reachable through:

```text
secondReference
      |
      v
    Object
```

Therefore it cannot be reclaimed yet.

---

# Removing All Strong References

```js
let user = {
  name: "Osama Abu Motlaq",
};

let firstReference = user;
let secondReference = user;

user = null;
firstReference = null;
secondReference = null;
```

If there are no other references:

```text
User Object
    |
    X
```

The object can become unreachable.

---

# Mark-and-Sweep

One of the most useful conceptual models for garbage collection is:

```text
Mark
+
Sweep
```

The collector starts from reachable roots.

It marks objects that can be reached.

Then it can reclaim objects that were not marked as reachable.

---

# Mark Phase

Consider:

```text
Root
 |
 v
A
 |
 v
B

C
 |
 v
D
```

Suppose the root only reaches `A` and `B`.

During the mark phase:

```text
Root
 |
 v
A ✓
 |
 v
B ✓

C ✗
 |
 v
D ✗
```

`A` and `B` are reachable.

`C` and `D` are not reachable from the root.

---

# Sweep Phase

The collector can then reclaim unreachable objects:

```text
Reachable:

A
B

Unreachable:

C
D
```

The exact implementation is more sophisticated than this simplified model.

---

# Object Graphs

Real applications contain many connected objects.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const profile = {
  user,
};

const application = {
  profile,
};
```

Conceptually:

```text
Root
 |
 v
application
 |
 v
profile
 |
 v
user
 |
 v
User Object
```

All of these objects are reachable.

---

# Breaking a Reference Chain

Suppose:

```js
let application = {
  profile: {
    user: {
      name: "Osama Abu Motlaq",
    },
  },
};

application = null;
```

If no other references exist, the entire previously connected object graph may become unreachable.

Conceptually:

```text
application
    |
    X

profile
    X

user
    X
```

The collector can reclaim the unreachable graph.

---

# Cyclic References

Objects can reference each other.

Example:

```js
const first = {};
const second = {};

first.second = second;
second.first = first;
```

The graph is:

```text
first
  |
  v
second
  |
  v
first
```

This forms a cycle.

---

# Cycles Are Not Automatically Leaks

A common misconception is:

```text
Circular reference
=
Memory leak
```

That is not generally true for modern garbage collectors.

Consider:

```js
let first = {};
let second = {};

first.second = second;
second.first = first;

first = null;
second = null;
```

If no other reachable references exist, the entire cycle can become unreachable:

```text
first X
  |
  v
second X
  |
  v
first
```

The cycle is disconnected from the roots.

A modern garbage collector can detect that the cycle is unreachable.

---

# Why Old Memory Models Struggled With Cycles

Reference-counting systems can have difficulty with cycles.

A simplified reference-count model might see:

```text
A → B
B → A
```

and conclude that both objects still have references.

Tracing garbage collectors such as mark-and-sweep solve this problem by starting from roots and checking reachability.

---

# Reference Counting vs Tracing

A simplified comparison:

| Approach                | Main idea                                         |
| ----------------------- | ------------------------------------------------- |
| Reference counting      | Track how many references point to an object      |
| Mark-and-sweep          | Start from roots and find reachable objects       |
| Generational collection | Organize objects by age and collect strategically |
| Incremental collection  | Spread collection work across smaller steps       |
| Concurrent collection   | Perform parts of GC alongside application work    |

Modern JavaScript engines use sophisticated combinations of techniques.

---

# Generational Garbage Collection

Many modern garbage collectors use a generational strategy based on the observation that:

```text
Many objects die young.
```

A simplified model divides objects into generations such as:

```text
Young Generation
      |
      v
Short-lived objects

Old Generation
      |
      v
Long-lived objects
```

The exact names, generations, and algorithms differ between engines.

---

# Young Objects

Consider:

```js
function createTemporaryData() {
  return {
    value: 100,
  };
}

for (let index = 0; index < 1000; index++) {
  createTemporaryData();
}
```

Many created objects may become unreachable quickly.

A generational collector can optimize for this pattern.

---

# Long-Lived Objects

Consider:

```js
const applicationState = {
  user: {
    name: "Osama Abu Motlaq",
  },
};
```

If this object remains reachable for a long time, the runtime can treat it differently from temporary allocations.

Long-lived objects may eventually be promoted to an older generation depending on the engine's strategy.

---

# Minor and Major Collections

Different garbage-collection phases may have different scopes.

A simplified educational model is:

```text
Minor Collection
→ Focuses on young objects

Major / Full Collection
→ May inspect broader portions of the heap
```

Do not rely on exact naming because JavaScript engines implement their own collection strategies.

---

# Garbage Collection and Performance

Garbage collection itself requires computation.

The runtime must:

```text
Find reachable objects
Analyze references
Reclaim memory
Update internal metadata
```

A large amount of garbage can therefore create additional GC work.

---

# Allocation Rate

Consider:

```js
function createObject() {
  return {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  };
}

for (
  let index = 0;
  index < 100000;
  index++
) {
  createObject();
}
```

This code can generate many short-lived allocations.

A high allocation rate may increase garbage-collection pressure.

---

# Temporary Arrays

Example:

```js
function process() {
  const values = new Array(10000).fill(0);

  return values.length;
}

for (
  let index = 0;
  index < 1000;
  index++
) {
  process();
}
```

The arrays are temporary.

Once they become unreachable, they become candidates for collection.

The important question is whether the allocation rate creates measurable performance problems.

---

# Temporary Objects in Loops

```js
for (
  let index = 0;
  index < 100000;
  index++
) {
  const result = {
    value: index,
    doubled: index * 2,
  };

  console.log(
    result.doubled
  );
}
```

The objects may be short-lived.

Modern engines can optimize many temporary allocations, so the source code alone is not enough to determine whether this is a problem.

Measure before optimizing.

---

# Garbage Collection Pauses

Garbage collection work can consume CPU time.

Depending on the runtime and workload, some collection activity can temporarily compete with application execution.

Modern engines use techniques such as incremental and concurrent collection to reduce noticeable pauses.

However:

```text
Large heap
+
Heavy allocation
+
Complex object graph
```

can still produce performance problems.

---

# Stop-the-World Work

Some garbage-collection phases may require the application thread to pause certain JavaScript execution.

A simplified model is:

```text
Application JavaScript
        |
        v
GC Phase
        |
        v
Application JavaScript continues
```

The exact behavior depends on the engine and collection phase.

Do not assume that all garbage collection is one large blocking pause.

---

# Incremental Garbage Collection

Incremental collection divides some GC work into smaller pieces.

Simplified:

```text
Large GC Task

↓ split

Small GC Step
Small GC Step
Small GC Step
Small GC Step
```

This can reduce long uninterrupted pauses.

---

# Concurrent Garbage Collection

Some garbage-collection work can happen concurrently with application execution.

Simplified:

```text
JavaScript Execution
        |
        |------ GC Work
        |
        |------ JavaScript
        |
        |------ GC Work
```

The exact amount of concurrency depends on the runtime.

---

# Garbage Collection Is Engine-Specific

JavaScript defines the language behavior, but garbage-collection implementation details belong largely to the runtime engine.

Different engines include:

```text
V8
SpiderMonkey
JavaScriptCore
```

They may use different algorithms and heuristics.

Therefore, do not depend on:

```text
Exact GC timing
Exact heap layout
Exact generation sizes
Exact collection thresholds
```

---

# V8 Example

Browsers such as Chrome and runtimes such as Node.js use V8.

V8 has sophisticated memory-management and garbage-collection systems.

However, application code should not depend on V8-specific internal details unless you are intentionally performing engine-level profiling or optimization.

---

# When an Object Becomes Garbage

An object can become garbage when there is no reachable path to it.

Example:

```js
let data = {
  value: 100,
};

data = null;
```

The object is not necessarily collected immediately.

The sequence is:

```text
Reference removed
      |
      v
Object becomes unreachable
      |
      v
Eligible for collection
      |
      v
Collector runs later
      |
      v
Memory reclaimed
```

---

# A Function Returning an Object

```js
function createUser() {
  return {
    name: "Osama Abu Motlaq",
  };
}

let user =
  createUser();

user = null;
```

The returned object was initially reachable through `user`.

After:

```js
user = null;
```

the object can become unreachable if no other reference exists.

---

# Returned Objects Can Stay Alive

Consider:

```js
function createUser() {
  return {
    name: "Osama Abu Motlaq",
  };
}

const user =
  createUser();
```

The object remains reachable through:

```text
user
 |
 v
User Object
```

The function has finished, but that does not make its returned object eligible for collection.

---

# Closures and Garbage Collection

Consider:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;

    return count;
  };
}

let counter =
  createCounter();
```

The returned function keeps access to the environment containing:

```text
count
```

Therefore:

```text
counter
   |
   v
Closure
   |
   v
Environment
   |
   v
count
```

The captured environment remains reachable.

---

# Releasing a Closure

```js
let counter =
  createCounter();

console.log(
  counter()
);

counter = null;
```

If no other references remain, the closure and its captured environment can eventually become unreachable.

---

# Event Listener Retention

Consider:

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

The listener remains registered.

The callback can therefore remain reachable.

The callback may also retain the data it closes over.

---

# Removing the Listener

```js
document.removeEventListener(
  "click",
  handleClick
);
```

If the listener is no longer needed, removing it can allow the callback and captured data to become unreachable, assuming no other references exist.

---

# Timers and Garbage Collection

Consider:

```js
let data = {
  name: "Osama Abu Motlaq",
};

const timeoutId =
  setTimeout(() => {
    console.log(
      data.name
    );
  }, 60000);
```

While the timeout remains scheduled, the runtime must retain what is needed to execute its callback.

The callback therefore can keep related data reachable.

---

# Cancelling the Timer

```js
clearTimeout(
  timeoutId
);
```

After cancellation, if no other references remain, the callback and captured data can become unreachable.

---

# Intervals

An interval has an especially important lifetime:

```js
const intervalId =
  setInterval(() => {
    console.log(
      "Running..."
    );
  }, 1000);
```

It continues scheduling callbacks until:

```js
clearInterval(
  intervalId
);
```

Long-lived intervals can therefore retain callbacks and captured state for a long time.

---

# Observers

Observers can also remain active.

Example:

```js
const observer =
  new MutationObserver(
    () => {
      console.log(
        "Changed"
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

When it is no longer needed:

```js
observer.disconnect();
```

---

# Detached DOM Nodes

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

The element has been removed from the document.

However:

```text
savedElement
     |
     v
Detached Node
```

still keeps the node reachable.

---

# Release Detached Nodes

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

If no other references exist, the node can eventually become unreachable.

---

# Maps and Strong References

A normal `Map` holds strong references to its keys.

Example:

```js
const metadata =
  new Map();

let user = {
  name: "Osama Abu Motlaq",
};

metadata.set(
  user,
  {
    active: true,
  }
);

user = null;
```

The object may still be reachable through the `Map`.

Conceptually:

```text
Map
 |
 v
User Object
```

Setting `user` to `null` does not remove the `Map` entry.

---

# Removing a Map Entry

```js
metadata.delete(
  user
);
```

However, in the previous example `user` has already been set to `null`, so the original reference is no longer available through that variable.

A better design is:

```js
const metadata =
  new Map();

const user = {
  name: "Osama Abu Motlaq",
};

metadata.set(
  user,
  {
    active: true,
  }
);

metadata.delete(
  user
);
```

Now the `Map` no longer holds that key.

---

# WeakMap and Garbage Collection

A `WeakMap` has different semantics.

```js
const metadata =
  new WeakMap();

let user = {
  name: "Osama Abu Motlaq",
};

metadata.set(
  user,
  {
    active: true,
  }
);

user = null;
```

The `WeakMap` does not by itself create a strong reachability path that prevents the key object from being collected.

---

# Why WeakMap Is Useful

A common pattern is attaching metadata to objects without creating a strong lifetime dependency.

```js
const metadata =
  new WeakMap();

function attachMetadata(
  object,
  data
) {
  metadata.set(
    object,
    data
  );
}

const user = {
  name: "Osama Abu Motlaq",
};

attachMetadata(
  user,
  {
    active: true,
  }
);
```

If the `user` object becomes unreachable elsewhere, its weakly associated metadata does not force the object to remain alive.

---

# WeakSet

Similarly:

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

If the object becomes unreachable elsewhere, the weak collection does not strongly preserve it.

---

# `WeakRef`

A `WeakRef` creates a weak reference.

```js
const user = {
  name: "Osama Abu Motlaq",
};

const reference =
  new WeakRef(user);

const current =
  reference.deref();

console.log(
  current
);
```

The result can become:

```text
object
```

or later:

```text
undefined
```

depending on whether the object is still alive.

---

# Weak References Are Nondeterministic

Do not write logic that assumes:

```js
if (
  weakReference.deref()
) {
  // Object will definitely remain alive.
}
```

The object can become unreachable and be collected at a time you cannot predict.

Weak references are specialized tools, not replacements for normal references.

---

# FinalizationRegistry

`FinalizationRegistry` allows code to register callbacks associated with objects.

Example:

```js
const registry =
  new FinalizationRegistry(
    (value) => {
      console.log(
        "Finalization:",
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

However, finalization timing is not deterministic.

---

# Do Not Use Finalization for Critical Logic

Avoid:

```text
When object is collected
    ↓
Save important data
```

Garbage collection may happen much later or not during the lifetime you observe.

Finalization is not a predictable scheduling mechanism.

---

# Memory Leak vs Garbage Collection Failure

These concepts should not be confused.

A memory leak can occur even when garbage collection works correctly.

For example:

```js
const cache = [];

function addItem(item) {
  cache.push(item);
}
```

The objects remain reachable through:

```text
GC Root
   |
   v
cache
   |
   v
Objects
```

The garbage collector is doing exactly what it should do.

The problem is that the application accidentally keeps the objects reachable.

---

# Logical Leak

A common pattern is:

```text
Application no longer needs object
        |
        v
Application still stores reference
        |
        v
Garbage collector sees object as reachable
        |
        v
Object remains alive
```

This is often called a logical memory leak.

---

# Unbounded Cache

Example:

```js
const cache =
  new Map();

function storeData(
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
  storeData(
    `item-${index}`,
    {
      value: index,
    }
  );
}
```

The cache strongly retains its entries.

---

# Bounded Cache

```js
const cache =
  new Map();

const limit = 100;

function storeData(
  key,
  value
) {
  cache.set(
    key,
    value
  );

  if (
    cache.size > limit
  ) {
    const firstKey =
      cache.keys().next().value;

    cache.delete(
      firstKey
    );
  }
}
```

The application now imposes a memory boundary on the cache.

---

# Clearing Collections

For a normal `Map`:

```js
cache.clear();
```

For a normal `Set`:

```js
const values =
  new Set([
    1,
    2,
    3,
  ]);

values.clear();
```

Removing collection entries can remove strong references.

---

# Releasing Large Arrays

Consider:

```js
let data =
  new Array(
    1000000
  ).fill(0);
```

If the data is no longer needed:

```js
data = null;
```

This removes the variable's strong reference.

The array may become collectible if no other references exist.

---

# Releasing Object Graphs

Consider:

```js
let application = {
  user: {
    name: "Osama Abu Motlaq",
  },

  settings: {
    theme: "dark",
  },

  cache: {
    projects: [
      "Portfolio",
      "Dashboard",
    ],
  },
};
```

If:

```js
application = null;
```

and no other references exist, the entire graph can become unreachable.

---

# Reachability Through Properties

This is still reachable:

```js
const application = {
  user: {
    name: "Osama Abu Motlaq",
  },
};

console.log(
  application.user.name
);
```

Even though there is no separate variable called `user`, the object remains reachable through:

```text
application
   |
   v
user object
```

---

# Shared Objects

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const first = {
  user,
};

const second = {
  user,
};
```

The user object has two paths:

```text
first  ──┐
         ├──> User Object
second ──┘
```

Removing one reference does not make the object collectible.

---

# Removing One Branch

```js
let user = {
  name: "Osama Abu Motlaq",
};

let first = {
  user,
};

let second = {
  user,
};

first = null;
```

The object remains reachable through:

```text
second
  |
  v
user
```

---

# Removing All Branches

```js
let user = {
  name: "Osama Abu Motlaq",
};

let first = {
  user,
};

let second = {
  user,
};

first = null;
second = null;
user = null;
```

Assuming no other references exist, the entire object graph can become unreachable.

---

# Garbage Collection and Scope

Consider:

```js
function calculate() {
  const temporaryData = {
    value: 100,
  };

  return temporaryData.value;
}

console.log(
  calculate()
);
```

After the function returns, `temporaryData` is no longer accessible through the function's local environment.

If the object is not returned or otherwise captured, it can become unreachable.

---

# Scope Does Not Guarantee Collection

Consider:

```js
let saved;

function createData() {
  const data = {
    value: 100,
  };

  saved = data;
}

createData();
```

Although `data` was locally declared, the object remains reachable through:

```text
saved
 |
 v
Object
```

The object's lifetime depends on reachability, not simply on where the variable was declared.

---

# Closure Retention

Consider:

```js
let handler;

function setup() {
  const largeData =
    new Array(100000);

  handler = () => {
    console.log(
      largeData.length
    );
  };
}

setup();
```

The local variable `largeData` disappears from direct local access after `setup()` returns.

However, the closure stored in `handler` still references the captured environment.

Therefore the large array can remain reachable.

---

# Removing the Closure Reference

```js
handler = null;
```

If nothing else references the closure or its captured data, the captured environment can eventually become unreachable.

---

# Event Listener Example

```js
let cleanup;

function setup() {
  const data =
    new Array(100000);

  function handleClick() {
    console.log(
      data.length
    );
  }

  document.addEventListener(
    "click",
    handleClick
  );

  cleanup = () => {
    document.removeEventListener(
      "click",
      handleClick
    );
  };
}

setup();
```

When the resource is no longer needed:

```js
cleanup();
cleanup = null;
```

This removes the listener and releases the application's logical ownership of the callback.

---

# AbortController Cleanup

```js
const controller =
  new AbortController();

const signal =
  controller.signal;

window.addEventListener(
  "resize",
  () => {
    console.log(
      window.innerWidth
    );
  },
  {
    signal,
  }
);

window.addEventListener(
  "scroll",
  () => {
    console.log(
      window.scrollY
    );
  },
  {
    signal,
  }
);

controller.abort();
```

Aborting the signal removes the registered listeners associated with it.

---

# Timer Cleanup

```js
let timerId =
  setTimeout(() => {
    console.log(
      "Timer completed."
    );
  }, 10000);

clearTimeout(
  timerId
);

timerId = null;
```

Clearing the timer expresses that the scheduled work is no longer needed.

---

# Interval Cleanup

```js
let intervalId =
  setInterval(() => {
    console.log(
      "Working..."
    );
  }, 1000);

clearInterval(
  intervalId
);

intervalId = null;
```

---

# Observer Cleanup

```js
const observer =
  new MutationObserver(
    () => {
      console.log(
        "Mutation detected."
      );
    }
  );

observer.observe(
  document.body,
  {
    childList: true,
  }
);

observer.disconnect();
```

---

# Abortable Fetch

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

Aborting the request can stop work that is no longer needed.

The associated Promise rejects with an `AbortError`.

---

# Large Data and JSON

Parsing a large JSON string creates an object graph.

```js
const json =
  '{"name":"Osama Abu Motlaq"}';

const data =
  JSON.parse(json);

console.log(
  data.name
);
```

For very large payloads, parsing itself can require significant memory and CPU.

---

# String Memory

Consider:

```js
const largeString =
  "x".repeat(
    1000000
  );
```

The string occupies memory.

If it remains reachable through:

```text
global reference
state
cache
closure
DOM
```

the runtime must retain it.

---

# Avoid Unnecessary Retention

Instead of keeping:

```js
let oldResponse = response;
```

for the entire application lifetime, ask whether the response is still needed.

A useful rule:

```text
Need data?
  ↓
Keep reference

Do not need data?
  ↓
Release unnecessary reference
```

---

# Memory and SPA Applications

Single-page applications can remain open for hours or days.

This makes resource lifetime especially important.

A small leak repeated hundreds of times can become significant.

Example pattern:

```text
Mount
  ↓
Create listener
  ↓
Unmount
  ↓
Listener remains
  ↓
Mount again
  ↓
Create another listener
  ↓
Repeat
```

Eventually:

```text
Many retained listeners
```

---

# Component Resource Lifetime

A useful lifecycle model is:

```text
Create
  |
  v
Initialize resource
  |
  v
Use resource
  |
  v
Stop using resource
  |
  v
Cleanup
```

Examples:

```text
addEventListener
      ↓
removeEventListener

setInterval
      ↓
clearInterval

Observer
      ↓
disconnect

fetch
      ↓
abort when appropriate
```

---

# Detecting Memory Leaks

Do not rely only on:

```text
The page feels slower.
```

Use browser developer tools.

A simplified workflow:

```text
Open DevTools
      |
      v
Open Memory panel
      |
      v
Take Heap Snapshot
      |
      v
Perform application actions
      |
      v
Take another snapshot
      |
      v
Compare retained objects
```

---

# Heap Snapshot Concepts

Useful terms include:

```text
Shallow Size
Retained Size
Distance
Object Count
Retainers
```

These help identify why an object remains in memory.

---

# Retainers

A retainer is a reference path that keeps an object reachable.

Conceptually:

```text
GC Root
  |
  v
Application State
  |
  v
Cache
  |
  v
Object
```

The cache is part of the path keeping the object alive.

Finding the retainer often reveals the memory leak.

---

# Detached DOM Investigation

A typical memory problem might look like:

```text
Detached HTMLDivElement
        |
        v
JavaScript Reference
        |
        v
Application Cache
```

The node was removed from the document but is still retained by application code.

---

# Measuring After Cleanup

A useful debugging process is:

```text
1. Reproduce the problem.
2. Record memory usage.
3. Identify retained objects.
4. Find the retaining reference.
5. Remove or shorten that reference.
6. Repeat the same actions.
7. Measure again.
```

The goal is to verify that the retained memory actually decreases.

---

# Do Not Force Garbage Collection in Application Logic

Some developer tools can expose GC-related debugging controls.

These are useful for investigation.

Do not build normal application logic around them.

Application behavior should not depend on:

```text
"Run garbage collection now."
```

---

# Common Mistakes

## Mistake: Assuming `null` Immediately Frees Memory

```js
data = null;
```

means a reference was removed.

It does not guarantee immediate memory reclamation.

---

## Mistake: Assuming Local Variables Always Disappear Immediately

A local variable may be captured by a closure or referenced elsewhere.

Its logical scope does not by itself determine object lifetime.

---

## Mistake: Assuming Circular References Always Leak

Modern tracing garbage collectors can collect unreachable cycles.

---

## Mistake: Assuming Garbage Collection Fixes Every Memory Problem

Garbage collection cannot reclaim reachable objects.

If your application accidentally keeps a reference, the collector cannot safely remove that object.

---

## Mistake: Clearing Every Variable With `null`

Do not write:

```js
value = null;
otherValue = null;
anotherValue = null;
```

everywhere without a reason.

Garbage collection handles unreachable objects automatically.

Explicitly clearing references is most useful when managing long-lived resources or intentionally releasing large structures.

---

## Mistake: Using `WeakMap` Everywhere

Weak collections solve specific ownership and reachability problems.

They are not replacements for ordinary `Map` and `Set`.

---

# Garbage Collection and Performance

Good performance does not mean:

```text
Zero allocations
```

JavaScript programs naturally allocate objects.

The goal is:

```text
Reasonable allocation
+
Reasonable object lifetime
+
Controlled retention
+
Appropriate cleanup
```

---

# Allocation vs Retention

These are different problems.

### Allocation

Creating objects:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

### Retention

Keeping objects alive:

```js
cache.set(
  "user",
  user
);
```

You may have acceptable allocation but terrible retention.

You may also have short-lived allocations that create heavy GC pressure.

Both should be analyzed independently.

---

# Short-Lived Garbage

Short-lived objects are not necessarily bad.

Example:

```js
function createResult(
  value
) {
  return {
    value,
    doubled: value * 2,
  };
}
```

Temporary objects that quickly become unreachable are expected in many JavaScript programs.

The garbage collector is designed to handle such workloads.

---

# Long-Lived Garbage

More dangerous is data that remains reachable indefinitely even though the application no longer needs it.

Example:

```js
const cache = [];

function save(item) {
  cache.push(item);
}
```

If `cache` never shrinks:

```text
Object
  ↓
Cache
  ↓
Still reachable
  ↓
Cannot be collected
```

---

# Memory-Safe Cache Design

```js
const cache =
  new Map();

const MAX_SIZE = 100;

function setCache(
  key,
  value
) {
  cache.set(
    key,
    value
  );

  while (
    cache.size >
    MAX_SIZE
  ) {
    const oldestKey =
      cache.keys().next().value;

    cache.delete(
      oldestKey
    );
  }
}
```

A bounded cache gives the data a controlled lifetime.

---

# Memory Ownership Pattern

A practical design pattern is to make resource ownership explicit.

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

  function destroy() {
    controller.abort();

    clearInterval(
      intervalId
    );
  }

  return {
    destroy,
  };
}

const resource =
  createResource();

setTimeout(() => {
  resource.destroy();
}, 5000);
```

The resource has:

```text
Creation
Initialization
Usage
Cleanup
```

---

# Final Mental Model

Think of garbage collection as a reachability problem:

```text
                   GC ROOTS
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
      Object        Array         Closure
        |             |             |
        v             v             v
      Object        Object         Data
```

The collector asks:

```text
Which objects are reachable?
```

Then:

```text
Reachable
    ↓
Keep

Unreachable
    ↓
Eligible for collection
```

---

# Advanced Mental Model

A more complete simplified model is:

```text
Application
    |
    v
Allocations
    |
    v
Object Graph
    |
    v
Reachable Objects
    |
    +----------------------+
    |                      |
    v                      v
Short-Lived Objects     Long-Lived Objects
    |                      |
    v                      v
Young Collection        Older Collection
    |                      |
    +----------+-----------+
               |
               v
        Reclaim Memory
```

The actual engine may use generational, incremental, concurrent, compacting, and other strategies.

---

# Summary

Garbage collection is automatic memory reclamation based primarily on object reachability.

The key ideas are:

* JavaScript automatically manages memory.
* Garbage collection identifies objects that are no longer reachable.
* GC roots provide starting points for reachability analysis.
* Multiple references can keep an object alive.
* Removing one reference does not necessarily make an object collectible.
* Unreachable cycles can be collected by tracing garbage collectors.
* Garbage collection does not necessarily happen immediately after an object becomes unreachable.
* Modern engines use sophisticated collection strategies.
* Generational collection takes advantage of the fact that many objects are short-lived.
* Incremental and concurrent techniques can reduce some pauses.
* A memory leak can happen even when garbage collection is functioning correctly.
* Strong references in caches, listeners, timers, closures, and application state can unintentionally retain objects.
* `WeakMap`, `WeakSet`, and `WeakRef` have specialized weak-reference semantics.
* `FinalizationRegistry` should not be used for deterministic cleanup.
* Resource cleanup remains the developer's responsibility.
* Memory profiling is more reliable than guessing.
* Allocation and retention are separate performance concerns.

The most important rule is:

```text
Garbage collection can reclaim
what the application no longer makes reachable.
```

Therefore:

```text
Good memory management
        =
Controlling object lifetime
+
Controlling references
+
Cleaning up long-lived resources
+
Measuring real memory behavior
```
