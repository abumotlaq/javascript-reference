# JavaScript Performance

## Overview

Performance is the discipline of making software use time, memory, CPU, network, and browser resources efficiently enough for its intended workload.

Good performance is not about making every line of code as fast as possible.

It is about making important operations efficient while keeping the code understandable and maintainable.

The main resources to consider are:

```text
CPU
Memory
Network
Main thread time
Rendering time
Storage
Browser resources
```

A practical performance strategy is:

```text
Measure
   ↓
Identify the bottleneck
   ↓
Understand the cause
   ↓
Change the implementation
   ↓
Measure again
```

Do not optimize based on assumptions alone.

---

# Correctness Comes Before Optimization

Fast incorrect code is still incorrect.

Prefer:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) =>
      total + item.price,
    0
  );
}
```

before attempting a complicated optimization that makes the calculation difficult to verify.

First establish:

```text
Correct behavior
Clear data flow
Understandable structure
```

Then optimize meaningful bottlenecks.

---

# Avoid Premature Optimization

Do not optimize code simply because it looks "slow."

For example:

```js
const user = users.find(
  (item) => item.id === userId
);
```

may be perfectly adequate for a small collection.

Do not replace it immediately with:

```js
const usersById = new Map();
```

unless the workload actually benefits from indexed lookup.

Optimization should solve a real problem.

---

# Measure Before Optimizing

Useful measurements include:

```text
Execution time
Memory usage
Network size
Network latency
Long tasks
Rendering time
DOM update cost
Startup time
Bundle size
Interaction latency
```

Use the appropriate tool for the type of bottleneck.

---

# Use Profiling Tools

For browser applications, useful tools include:

```text
Chrome DevTools Performance
Chrome DevTools Memory
Chrome DevTools Network
Lighthouse
JavaScript profiler
Performance API
```

For Node.js applications, useful tools include:

```text
Node.js profiler
Performance hooks
Heap snapshots
CPU profiling
```

The exact tool depends on the problem.

---

# Measure Real Workloads

A benchmark should resemble actual usage.

For example:

```js
const users = createUsers(
  100_000
);
```

may reveal performance behavior that a five-item example never exposes.

But do not optimize for artificial workloads that do not resemble the application.

---

# Avoid Micro-Benchmarks Without Context

A benchmark showing:

```text
Operation A: 10 ns
Operation B: 8 ns
```

does not automatically mean B matters to your application.

If both operations take an insignificant portion of total runtime, choosing B may provide no meaningful benefit.

Optimize bottlenecks, not isolated trivia.

---

# Big-O Complexity Matters

A useful starting point is algorithmic complexity.

For example:

```js
users.find(
  (user) => user.id === userId
);
```

usually performs a linear search:

```text
O(n)
```

A keyed lookup such as:

```js
usersById.get(
  userId
);
```

is generally designed for average constant-time lookup:

```text
O(1)
```

The practical benefit depends on data size and workload.

---

# Complexity Is Not the Whole Story

Actual performance also depends on:

```text
Constant factors
Memory allocation
Cache behavior
Garbage collection
Data size
Browser implementation
Runtime optimizations
Network latency
Rendering work
```

Big-O is a model, not a complete benchmark.

---

# Choose Data Structures Based on Access Patterns

If code repeatedly performs:

```js
users.find(
  (user) =>
    user.id === userId
);
```

on a very large and frequently accessed collection, consider indexing:

```js
const usersById =
  new Map(
    users.map(
      (user) => [
        user.id,
        user,
      ]
    )
  );
```

Then:

```js
usersById.get(
  userId
);
```

This trades some memory and synchronization complexity for faster keyed access.

---

# Avoid Duplicate Indexes Without a Reason

Maintaining:

```js
const users = [];
const usersById = new Map();
```

can improve access patterns.

But now two representations must remain synchronized.

Use multiple representations only when the performance or API requirements justify the additional complexity.

---

# Avoid Large Repeated Searches

This can become expensive:

```js
for (const order of orders) {
  const user =
    users.find(
      (user) =>
        user.id === order.userId
    );

  processOrder(
    order,
    user
  );
}
```

If there are many orders and users, the repeated searches may become costly.

Build an index when the workload justifies it:

```js
const usersById =
  new Map(
    users.map(
      (user) => [
        user.id,
        user,
      ]
    )
  );

for (const order of orders) {
  const user =
    usersById.get(
      order.userId
    );

  processOrder(
    order,
    user
  );
}
```

---

# Avoid Nested Loops When an Index Solves the Problem

A naive approach:

```js
for (const order of orders) {
  for (const user of users) {
    if (
      user.id === order.userId
    ) {
      processOrder(
        order,
        user
      );
    }
  }
}
```

can approach:

```text
O(n × m)
```

for the number of orders and users.

An index can often reduce the lookup work substantially.

---

# Do Not Optimize Every Loop

A loop is not automatically slow.

This is often perfectly fine:

```js
for (const user of users) {
  console.log(user.name);
}
```

Performance depends on:

```text
Collection size
Operation cost
Frequency
Execution environment
```

---

# Array Methods vs Loops

Both can be efficient.

This:

```js
const activeUsers =
  users.filter(
    (user) => user.isActive
  );
```

and:

```js
const activeUsers = [];

for (const user of users) {
  if (user.isActive) {
    activeUsers.push(user);
  }
}
```

may have different runtime characteristics in particular situations.

Do not replace readable array methods merely because a loop may be marginally faster.

Use profiling to justify such changes.

---

# Avoid Creating Excessive Intermediate Arrays

This:

```js
const result =
  users
    .filter(
      (user) => user.isActive
    )
    .map(
      (user) => user.name
    )
    .filter(
      (name) => name.length > 5
    );
```

creates intermediate collections.

For many applications this is completely acceptable.

For very large datasets or hot paths, a single-pass implementation may reduce allocations:

```js
const result = [];

for (const user of users) {
  if (!user.isActive) {
    continue;
  }

  const name =
    user.name;

  if (name.length > 5) {
    result.push(name);
  }
}
```

Do not make this transformation unless measurement shows that allocations matter.

---

# Readability vs Allocation

Prefer:

```js
const names =
  users
    .filter(
      (user) => user.isActive
    )
    .map(
      (user) => user.name
    );
```

when the collection is modest and readability is the primary concern.

Consider a more optimized approach only when:

```text
Dataset is large
Operation runs frequently
Profiling identifies it as a bottleneck
```

---

# Avoid Repeated Expensive Calculations

Weak:

```js
for (const item of items) {
  if (
    expensiveCalculation(
      item
    ) > 10
  ) {
    process(item);
  }

  if (
    expensiveCalculation(
      item
    ) < 20
  ) {
    update(item);
  }
}
```

If the calculation is deterministic and expensive:

```js
for (const item of items) {
  const value =
    expensiveCalculation(item);

  if (value > 10) {
    process(item);
  }

  if (value < 20) {
    update(item);
  }
}
```

The computation is performed once.

---

# Memoization

Memoization caches the result of a computation.

Example:

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key =
      JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result =
      fn(...args);

    cache.set(
      key,
      result
    );

    return result;
  };
}
```

Memoization can improve performance when:

```text
Inputs repeat
Computation is expensive
Results are reusable
Cache size is manageable
```

This example is intentionally simple; real memoization strategies may require stronger key semantics.

---

# Memoization Has Costs

Caching results consumes:

```text
Memory
Storage
Lookup work
Invalidation complexity
```

A memoized function may be slower when:

```text
Inputs rarely repeat
The calculation is already cheap
The cache grows too large
```

Use memoization deliberately.

---

# Do Not Memoize Everything

Avoid wrapping every function in a cache.

A simple function:

```js
function add(a, b) {
  return a + b;
}
```

usually does not need memoization.

The cache overhead can exceed the cost of the calculation.

---

# Cache Only Stable Results

Memoization works best when the result depends only on its inputs.

A function such as:

```js
function getCurrentTime() {
  return Date.now();
}
```

does not behave like a stable pure computation.

Caching its result changes the meaning.

---

# Cache Invalidation

A cache is useful only when its contents remain valid.

Important questions:

```text
When is data added?
When is it refreshed?
When does it expire?
When is it invalidated?
What happens when the source changes?
```

A correct cache strategy is often harder than creating the cache itself.

---

# Avoid Unbounded Caches

Weak:

```js
const cache =
  new Map();

function cacheValue(
  key,
  value
) {
  cache.set(
    key,
    value
  );
}
```

If unique keys continue growing forever, memory usage can grow indefinitely.

For long-lived caches, consider:

```text
Maximum size
TTL
Eviction
WeakMap where appropriate
Manual invalidation
```

---

# Lazy Computation

Do not perform expensive work until it is needed.

Instead of:

```js
const report =
  generateLargeReport();
```

when the user may never open the report:

```js
function getReport() {
  return generateLargeReport();
}
```

The work is deferred until requested.

---

# Lazy Loading

For large features, load code or data only when needed.

Conceptually:

```text
Application starts
      ↓
Load essential code
      ↓
User opens feature
      ↓
Load feature code
```

This can reduce initial startup work.

---

# Avoid Loading Unused Data

Weak:

```js
const allProjects =
  await fetchAllProjects();
```

when the user only needs:

```text
First page
```

Prefer pagination or targeted queries when supported.

---

# Pagination

For large collections, load manageable portions:

```text
Page 1
Page 2
Page 3
```

rather than:

```text
Entire dataset
```

This reduces:

```text
Network transfer
Memory usage
Parsing work
Rendering work
Initial latency
```

---

# Infinite Scrolling

Infinite scrolling can reduce the amount of content loaded initially.

However, it also introduces:

```text
Scroll management
Loading states
Cancellation
Duplicate requests
Accessibility concerns
Unbounded page accumulation
```

Do not add infinite scrolling merely because it is popular.

---

# Virtualized Lists

For extremely large UI collections, rendering every item can become expensive.

Virtualization renders only the visible portion.

Conceptually:

```text
10,000 items in data
        ↓
Only visible items in DOM
```

This can dramatically reduce DOM work for very large lists.

Use virtualization when the dataset and UI actually justify it.

---

# The DOM Is Expensive at Scale

Creating and updating thousands of elements can increase:

```text
Layout cost
Style calculation
Paint
Memory usage
Event handling overhead
```

For large collections, consider:

```text
Pagination
Virtualization
Incremental rendering
DocumentFragment
```

where appropriate.

---

# Avoid Unnecessary DOM Updates

Weak:

```js
element.textContent =
  value;

element.textContent =
  value;

element.textContent =
  value;
```

If the value has not changed, the repeated updates are unnecessary.

Prefer:

```js
if (
  element.textContent !==
  value
) {
  element.textContent =
    value;
}
```

Only add such checks when repeated updates are actually measurable or frequent.

---

# Prefer State-Driven Updates

Instead of manipulating the same element from many places:

```text
handler A → changes DOM
handler B → changes DOM
handler C → changes DOM
```

prefer a clearer flow:

```text
State changes
    ↓
Render/update UI
```

This can reduce contradictory DOM updates.

---

# Batch DOM Updates

When making many changes:

```js
const fragment =
  document.createDocumentFragment();

for (const user of users) {
  const item =
    document.createElement(
      "li"
    );

  item.textContent =
    user.name;

  fragment.append(item);
}

list.append(fragment);
```

The browser receives the constructed content as a group.

---

# Avoid Layout Thrashing

Layout thrashing can occur when code repeatedly alternates:

```text
DOM write
↓
Layout read
↓
DOM write
↓
Layout read
```

For example:

```js
element.style.width =
  "200px";

const width =
  element.offsetWidth;

element.style.height =
  "100px";

const height =
  element.offsetHeight;
```

Group related reads and writes when performance matters.

---

# Layout Reads

Potential layout-triggering properties include:

```text
offsetWidth
offsetHeight
clientWidth
clientHeight
scrollWidth
scrollHeight
getBoundingClientRect()
```

Repeated access after writes can be expensive.

---

# Use `requestAnimationFrame` for Visual Scheduling

For frame-sensitive visual work:

```js
requestAnimationFrame(
  () => {
    element.style.transform =
      "translateX(100px)";
  }
);
```

This allows work to be coordinated with browser rendering.

---

# Avoid Heavy Work in High-Frequency Events

Events such as:

```text
scroll
resize
pointermove
mousemove
input
```

can fire many times.

Avoid expensive synchronous work on every event.

---

# Debounce

Debouncing waits until activity pauses.

Example concept:

```js
function debounce(
  fn,
  delay
) {
  let timeoutId;

  return function (...args) {
    clearTimeout(
      timeoutId
    );

    timeoutId =
      setTimeout(
        () => fn(...args),
        delay
      );
  };
}
```

Useful for:

```text
Search input
Validation
Resize handling
Auto-save
```

---

# Throttle

Throttling limits how often an operation runs.

Useful for:

```text
Scroll handling
Pointer movement
Resize handling
Continuous events
```

Choose it when periodic execution is useful.

---

# Debounce vs Throttle

```text
Debounce
→ Execute after activity stops.

Throttle
→ Execute at most once during
  a defined interval.
```

Select the pattern based on the desired interaction behavior.

---

# Avoid Excessive Event Listeners

If thousands of elements each receive a listener:

```js
for (const button of buttons) {
  button.addEventListener(
    "click",
    handleClick
  );
}
```

the browser must manage many listener registrations.

For dynamic or large lists, event delegation may be more efficient:

```js
container.addEventListener(
  "click",
  handleContainerClick
);
```

But use the simpler direct approach for small stable lists.

---

# Event Delegation and Performance

Delegation can reduce:

```text
Number of listeners
Setup work
Cleanup work
Memory overhead
```

It can also simplify dynamic content handling.

Do not use it blindly when direct listeners are clearer.

---

# Avoid Polling When Events Exist

Weak:

```js
setInterval(
  () => {
    checkStatus();
  },
  100
);
```

when the browser or application can notify you directly.

Prefer:

```text
Event
Observer
Promise
WebSocket
Server-Sent Events
```

when these mechanisms match the problem.

---

# Polling Should Have a Purpose

Polling can be reasonable when:

```text
No push mechanism exists
Updates are infrequent
A simple implementation is appropriate
The interval is acceptable
```

Make sure polling has:

```text
Cancellation
Backoff when appropriate
Cleanup
Visibility awareness when useful
```

---

# Pause Background Work When Appropriate

When a page becomes hidden:

```js
document.addEventListener(
  "visibilitychange",
  () => {
    if (
      document.hidden
    ) {
      stopPolling();
    }
  }
);
```

This can reduce unnecessary work.

---

# Network Performance

Network operations can dominate perceived performance.

Optimize:

```text
Number of requests
Payload size
Request timing
Caching
Compression
Parallelization
API design
```

Do not focus only on JavaScript execution time.

---

# Avoid Request Waterfalls

A request waterfall occurs when:

```text
Request A
   ↓
Request B
   ↓
Request C
```

must happen sequentially even though some operations could have started earlier.

Identify opportunities for:

```text
Parallel requests
Prefetching
Caching
Server-side aggregation
```

---

# Request Parallelization

If requests are independent:

```js
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

This can reduce waiting time.

---

# Do Not Parallelize Dependent Requests

If:

```js
const user =
  await fetchUser();

const projects =
  await fetchProjects(
    user.id
  );
```

depends on the previous result, keep the dependency explicit.

---

# Prefetching

Prefetch data before it is needed when the application can reasonably predict future usage.

Examples:

```text
Hover over a navigation link
After initial page load
When idle
Before entering a known next step
```

Prefetching consumes resources.

Use it when the expected benefit exceeds the cost.

---

# Avoid Overfetching

Do not request:

```text
100 fields
```

when the UI needs:

```text
3 fields
```

A smaller payload can reduce:

```text
Network transfer
Parsing
Memory
Serialization cost
```

---

# Avoid Underfetching When It Creates Waterfalls

Conversely, requesting one tiny piece of data at a time can create:

```text
Request
↓
Request
↓
Request
↓
Request
```

Use APIs that provide the data needed for a coherent operation.

---

# Cache Stable Data

Data that changes infrequently can often be cached.

Examples:

```text
Configuration
Static metadata
Reference data
User preferences
```

Caching should have an invalidation strategy.

---

# HTTP Caching

Browser and server caches can reduce repeated network requests.

Prefer correct HTTP caching headers and resource strategies when you control the server.

Do not rebuild application-level caches for data the browser can already cache effectively.

---

# Use Appropriate Cache Lifetimes

Different data may need:

```text
No caching
Short cache
Long cache
Immutable cache
Revalidation
```

The correct policy depends on data freshness requirements.

---

# Avoid Cache-Control Mistakes

Caching data indefinitely can cause stale behavior.

Disabling caching everywhere can create unnecessary network load.

Caching strategy should follow data characteristics.

---

# Bundle Size

Large JavaScript bundles can increase:

```text
Download time
Parsing time
Compilation time
Execution time
Memory usage
```

Reduce unnecessary client-side code.

---

# Avoid Unused Dependencies

Every dependency can contribute to:

```text
Bundle size
Build complexity
Security surface
Maintenance
Startup cost
```

Install dependencies because they solve meaningful problems.

Do not add libraries for trivial functionality that native JavaScript already handles well.

---

# Use Tree-Shakeable Imports When Supported

Prefer importing only what is required when a library supports it:

```js
import {
  debounce,
} from "some-library";
```

instead of importing an entire library namespace unnecessarily.

The actual result depends on the library and bundler.

---

# Dynamic Imports

Load code on demand:

```js
const module =
  await import(
    "./heavy-feature.js"
  );
```

This can split large features from the initial bundle.

---

# Do Not Dynamically Import Everything

Dynamic imports add complexity and can delay functionality.

Use them for meaningful boundaries such as:

```text
Large feature
Rarely used feature
Admin section
Editor
Analytics dashboard
Heavy visualization
```

---

# Code Splitting

A useful strategy is:

```text
Critical code
→ Load first

Secondary feature
→ Load when needed
```

This reduces initial work.

---

# Startup Performance

Initial page load includes:

```text
HTML parsing
CSS loading
JavaScript download
JavaScript parsing
JavaScript execution
DOM creation
Style calculation
Layout
Paint
Network requests
```

Optimizing one part may not help if another stage dominates.

---

# Avoid Large Startup Tasks

Do not run expensive work immediately:

```js
initializeEverything();
processHugeDataset();
buildLargeReport();
loadAllProjects();
```

unless the application genuinely needs all of it at startup.

Defer non-critical work.

---

# Lazy Initialization

Instead of:

```js
const analytics =
  initializeAnalytics();
```

during startup, consider:

```js
function getAnalytics() {
  return initializeAnalytics();
}
```

when the feature is first needed.

---

# Idle Work

Some non-critical work can be delayed until the browser is less busy.

Browser APIs such as:

```text
requestIdleCallback
```

can help in appropriate environments.

Do not rely on idle callbacks for critical work because execution timing is not guaranteed.

---

# Main Thread Budget

The browser's main thread handles important work such as:

```text
JavaScript
DOM
Style calculation
Layout
Some input processing
Rendering coordination
```

Long synchronous tasks can block interaction.

---

# Avoid Long Tasks

A long JavaScript task can make the interface feel unresponsive.

For heavy workloads, consider:

```text
Chunking
Yielding
Workers
Streaming
Background processing
```

---

# Chunk Large Workloads

Instead of:

```js
for (const item of hugeCollection) {
  processItem(item);
}
```

if processing is expensive, break it into smaller chunks:

```js
async function processInChunks(
  items,
  chunkSize
) {
  for (
    let index = 0;
    index < items.length;
    index += chunkSize
  ) {
    const chunk =
      items.slice(
        index,
        index + chunkSize
      );

    for (const item of chunk) {
      processItem(item);
    }

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 0)
    );
  }
}
```

Yielding allows the browser opportunities to process other work.

Use this when a large synchronous task actually blocks responsiveness.

---

# Do Not Add Yields Everywhere

Unnecessary yielding can slow the total operation and complicate the code.

Chunk work when a real responsiveness problem exists.

---

# Web Workers

For CPU-heavy computations:

```text
Large parsing
Image processing
Complex calculations
Data transformation
```

a Web Worker can move the work away from the main thread.

Conceptually:

```text
Main thread
    ↓
Worker
    ↓
Heavy computation
    ↓
Result
```

Do not use workers for trivial work.

---

# Avoid Passing Huge Data to Workers Unnecessarily

Worker communication itself has a cost.

Sending large objects between threads can involve cloning or transferring data.

Use workers when the computational benefit exceeds communication overhead.

---

# Transferable Objects

Some binary data can be transferred rather than copied.

Examples include:

```text
ArrayBuffer
```

when compatible with the API.

This can reduce copying overhead for large binary workloads.

---

# Memory Performance

Performance includes memory behavior.

Potential problems include:

```text
Large retained objects
Unbounded caches
Detached DOM references
Large arrays
Closures retaining data
Repeated allocations
```

Memory pressure can increase garbage collection work.

---

# Avoid Retaining Large Objects Unnecessarily

Weak:

```js
const history = [];

function saveLargeData(data) {
  history.push(data);
}
```

If `history` grows indefinitely, memory usage grows indefinitely.

Define retention policies.

---

# Release References When No Longer Needed

For example:

```js
let largeData =
  loadLargeData();

// Process data.

largeData =
  null;
```

Explicitly releasing references can sometimes help long-lived workflows where a large object would otherwise remain reachable.

Do not add such code without understanding the reference graph.

---

# Event Listeners Can Retain Data

A closure can retain values:

```js
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

If the button or listener lives for a long time, `largeData` may remain reachable.

Cleanup event listeners when the feature is destroyed.

---

# Timers Can Retain Data

Similarly:

```js
const largeData =
  createLargeData();

setInterval(
  () => {
    process(
      largeData
    );
  },
  1000
);
```

The timer callback retains the referenced data.

Clear the timer when it is no longer needed.

---

# Closures and Memory

Closures are not automatically memory problems.

They become a concern when:

```text
Long-lived closure
    +
Large retained values
    +
No cleanup
```

causes unnecessary memory retention.

Use closures deliberately.

---

# WeakMap for Object-Associated Metadata

When metadata should not keep an object alive:

```js
const metadata =
  new WeakMap();

metadata.set(
  object,
  {
    processed: true,
  }
);
```

This can support lifecycle-friendly metadata storage.

Use `WeakMap` only when its semantics are actually appropriate.

---

# Garbage Collection Is Not Manual Memory Management

JavaScript automatically manages memory.

Developers influence memory by controlling reachability:

```text
Object reachable
→ Can remain in memory.

Object unreachable
→ Can eventually be collected.
```

Focus on removing unintended references rather than manually forcing garbage collection.

---

# Avoid Forcing Garbage Collection Assumptions

Application code should not be designed around:

```text
"the garbage collector will run here."
```

GC timing is controlled by the runtime.

Write code with correct ownership and reachability.

---

# Strings and Large Data

Repeatedly constructing very large strings can consume memory.

For large data processing, consider:

```text
Streaming
Chunking
Buffers
Incremental processing
```

when appropriate.

---

# Avoid Repeated Serialization

Weak:

```js
for (const user of users) {
  const key =
    JSON.stringify(user);

  process(key);
}
```

If serialization is expensive and repeated unnecessarily, it can become a bottleneck.

Compute serialized representations only when needed.

---

# Avoid Parsing the Same Data Repeatedly

Weak:

```js
function getName(rawData) {
  return JSON.parse(
    rawData
  ).name;
}

function getRole(rawData) {
  return JSON.parse(
    rawData
  ).role;
}
```

Prefer:

```js
const data =
  JSON.parse(rawData);

const name =
  data.name;

const role =
  data.role;
```

Parse once when the same result is reused.

---

# Expensive Regular Expressions

Regular expressions can become expensive when patterns are complex or input is large.

Be especially careful with:

```text
Nested quantifiers
Catastrophic backtracking
Huge input strings
Complex patterns
```

Keep regexes focused and test them against realistic input sizes.

---

# Compile Stable Regexes Once When Useful

If a regular expression is reused repeatedly:

```js
const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

keep it outside a hot loop when there is no reason to recreate it.

Do not optimize trivial regex construction without evidence.

---

# Avoid Expensive Work Inside Loops

Weak:

```js
for (const user of users) {
  const pattern =
    new RegExp(
      query
    );

  if (
    pattern.test(user.name)
  ) {
    process(user);
  }
}
```

Prefer:

```js
const pattern =
  new RegExp(query);

for (const user of users) {
  if (
    pattern.test(user.name)
  ) {
    process(user);
  }
}
```

when the same pattern is reused.

---

# Move Invariant Work Outside Loops

If a value does not change across iterations, compute it once.

Weak:

```js
for (const item of items) {
  const limit =
    getConfiguredLimit();

  if (item.value > limit) {
    process(item);
  }
}
```

Better:

```js
const limit =
  getConfiguredLimit();

for (const item of items) {
  if (item.value > limit) {
    process(item);
  }
}
```

---

# Database and Network Calls Inside Loops

One of the most expensive patterns is repeated network or database operations:

```js
for (const user of users) {
  await saveUser(user);
}
```

This may be appropriate when order matters.

But where supported, consider:

```text
Batch operations
Bulk APIs
Concurrent processing with limits
Transactions
```

---

# Do Not Blindly Parallelize Database Writes

This:

```js
await Promise.all(
  users.map(
    saveUser
  )
);
```

may overload:

```text
Database connections
Server resources
Rate limits
Transaction boundaries
```

Use controlled concurrency or bulk operations when available.

---

# Prefer Batch APIs for Large Workloads

If an API supports:

```js
saveUsers(users);
```

it may be more efficient than:

```js
for (const user of users) {
  await saveUser(user);
}
```

Batching can reduce:

```text
Network round trips
Serialization overhead
Database overhead
Connection overhead
```

---

# Avoid N+1 Requests

The N+1 pattern occurs when:

```text
1 request
   ↓
N additional requests
```

For example:

```text
Fetch 100 projects
   ↓
Fetch owner for each project
   ↓
100 extra requests
```

Consider:

```text
Joined queries
Batch endpoints
Prefetching
Normalized API responses
```

when appropriate.

---

# Performance and APIs

Application performance is often constrained by API design rather than JavaScript syntax.

Consider:

```text
Payload size
Number of requests
Pagination
Caching
Compression
Batching
Field selection
Server processing
```

before micro-optimizing client-side code.

---

# Avoid Overfetching on the Client

If the UI needs:

```text
name
avatar
role
```

do not necessarily download:

```text
Entire profile
Entire history
All preferences
All activity
```

unless the product actually needs them.

---

# Avoid Underfetching on the Client

At the same time, making five requests to reconstruct one UI view can create unnecessary latency.

Design data-fetching boundaries around the information a feature genuinely needs.

---

# Performance and Rendering

Modern frameworks may batch updates and optimize rendering.

Still, application code should avoid:

```text
Unnecessary state changes
Unnecessary re-renders
Huge DOM trees
Repeated expensive computations
```

The specific optimization depends on the framework.

---

# React-Specific Performance

In React, common areas to investigate include:

```text
Unnecessary renders
Expensive calculations
Large component trees
Large lists
Unstable props
Unnecessary effects
Excessive context updates
```

Do not add memoization everywhere.

Measure first.

---

# `useMemo` Is Not Free

Memoization itself has:

```text
Dependency tracking
Memory cost
Comparison cost
Complexity
```

Use it when it prevents a meaningful amount of repeated work.

Do not use it simply because a value is calculated inside a component.

---

# `useCallback` Is Not Free

`useCallback` can be useful when function identity matters.

But it also adds:

```text
Dependency management
Memory
Mental overhead
```

Do not wrap every function in `useCallback`.

---

# Avoid Premature React Memoization

Do not start with:

```js
const Component =
  React.memo(...);
```

for every component.

First identify:

```text
Which component rerenders?
Why?
How expensive is the render?
Does memoization actually help?
```

---

# Effects and Performance

An effect that repeatedly triggers work can create performance problems:

```text
Effect
 ↓
State update
 ↓
Render
 ↓
Effect
 ↓
More work
```

Keep effect dependencies accurate and avoid unnecessary effects.

---

# Avoid Effects for Derived Data

Instead of:

```js
const [
  fullName,
  setFullName
] = useState("");

useEffect(() => {
  setFullName(
    `${firstName} ${lastName}`
  );
}, [
  firstName,
  lastName
]);
```

prefer:

```js
const fullName =
  `${firstName} ${lastName}`;
```

Derived data does not need an effect or extra state.

---

# Performance and State Shape

Poor state modeling can cause unnecessary updates.

For example:

```js
const state = {
  users,
  projects,
  settings,
  notifications,
};
```

changing one part may cause consumers of the entire object to update depending on the architecture.

Choose state boundaries deliberately.

---

# Keep Expensive Work Out of Render Paths

Avoid heavy computation on every render when it is genuinely expensive:

```js
const report =
  generateHugeReport(
    data
  );
```

Move it to an appropriate memoized or asynchronous boundary when profiling shows it is expensive.

---

# Measure React Rendering

Use the framework's profiling tools rather than guessing.

Look for:

```text
Which components render?
How often?
How long do they take?
Which props changed?
```

Optimize the actual expensive path.

---

# Avoid Deep Cloning on Every Update

This:

```js
const nextState =
  structuredClone(
    state
  );
```

on every state change can create unnecessary:

```text
CPU work
Memory allocation
Garbage collection
```

Prefer targeted immutable updates:

```js
const nextState = {
  ...state,
  user: {
    ...state.user,
    name: "Osama Abu Motlaq",
  },
};
```

---

# Avoid Serialization as a Performance Shortcut

Do not clone or compare objects using:

```js
JSON.stringify(value);
```

for every render or update.

This can be expensive and has semantic limitations.

Use explicit comparisons or appropriate data structures.

---

# Performance and Memory Trade-Offs

Sometimes you improve speed by using more memory:

```text
Indexing
Caching
Memoization
Precomputed results
```

Sometimes you reduce memory by doing more CPU work:

```text
Recomputation
Streaming
On-demand processing
```

Performance engineering is often about choosing an appropriate trade-off.

---

# Optimize the Critical Path

The critical path is the work that directly affects:

```text
Initial display
User interaction
Primary action completion
Visible rendering
```

Optimize less important background work later.

---

# Do Not Optimize Background Work Before User-Critical Work

If a page is slow because:

```text
Main content takes 2 seconds to render
```

optimizing:

```text
Analytics calculation
```

by 20% is unlikely to solve the main user experience problem.

Optimize the bottleneck with the highest practical impact.

---

# Performance Budgets

A project can establish targets such as:

```text
Initial JavaScript size
Largest page payload
Maximum interaction latency
Maximum list size before virtualization
Maximum acceptable API response time
```

Budgets make performance measurable.

The exact values should match the project.

---

# Performance Regression Prevention

Performance can degrade over time.

Protect important paths through:

```text
Benchmarks
Performance tests
Bundle analysis
Monitoring
Real-user metrics
```

Do not rely entirely on manual testing.

---

# Real User Monitoring

Synthetic tools can reveal controlled scenarios.

Real-user measurements reveal:

```text
Actual devices
Actual networks
Actual geographic conditions
Actual usage patterns
```

Production performance should be evaluated using representative users when possible.

---

# Mobile Performance

Mobile devices often have:

```text
Less CPU
Less memory
Slower networks
Higher interaction costs
```

A solution that feels fast on a desktop can perform poorly on mobile.

Test realistic device classes.

---

# Performance and Accessibility

Do not optimize by removing:

```text
Keyboard interaction
Labels
Accessible names
Focus management
Meaningful feedback
```

Accessibility and performance should be designed together.

---

# Performance and Security

Security mechanisms can have performance costs:

```text
Validation
Sanitization
Encryption
Authentication
Authorization
```

Do not remove security protections for small performance gains.

Optimize their implementation where necessary.

---

# Performance and Maintainability

Avoid optimizing code into unreadable forms:

```js
const x =
  a.reduce(
    (r, i) =>
      i.v > 10
        ? r.concat(
            f(i)
          )
        : r,
    []
  );
```

when a simple loop is much easier to maintain:

```js
const result = [];

for (const item of items) {
  if (item.value > 10) {
    result.push(
      processItem(item)
    );
  }
}
```

The fastest code is not useful if nobody can safely change it.

---

# Document Non-Obvious Optimizations

If optimization makes code less obvious:

```js
// Process in batches to avoid
// exhausting API concurrency limits.
```

explain the reason.

Document:

```text
Why the optimization exists
What bottleneck it addresses
What constraint it protects
```

---

# Avoid Commenting Obvious Performance Claims

Do not write:

```js
// This is faster.
const result =
  users.map(
    (user) => user.name
  );
```

The claim is incomplete without context.

Prefer comments that explain the actual constraint:

```js
// Keep batches below the API's
// concurrency limit.
```

---

# Performance Checklist

Before optimizing:

```text
[ ] Have I measured the problem?

[ ] Is this code actually a bottleneck?

[ ] How large is the real workload?

[ ] How often does this code execute?

[ ] Is the bottleneck CPU, memory, network, DOM,
    or scheduling?

[ ] Can the work be avoided entirely?

[ ] Can the work be deferred?

[ ] Can independent work run concurrently?

[ ] Can the data structure improve the access pattern?

[ ] Can repeated calculations be reused?

[ ] Would caching help?

[ ] What is the cache invalidation strategy?

[ ] Could the optimization increase memory usage?

[ ] Does it introduce synchronization complexity?

[ ] Does it make the code harder to maintain?

[ ] Have I measured again after the change?
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text
Measure before optimizing.

Optimize real bottlenecks.

Prefer avoiding unnecessary work over making
unnecessary work faster.

Use appropriate data structures.

Choose algorithms based on workload.

Avoid premature memoization.

Avoid unbounded caches.

Control concurrency.

Avoid request waterfalls.

Avoid N+1 network operations.

Batch large workloads when appropriate.

Use pagination for large datasets.

Use virtualization for very large UI lists.

Minimize unnecessary DOM updates.

Avoid layout thrashing.

Throttle or debounce high-frequency events.

Defer non-critical work.

Use dynamic imports for meaningful code-splitting boundaries.

Keep heavy CPU work off the main thread when necessary.

Clean up long-lived resources.

Measure memory as well as execution time.

Preserve readability during optimization.

Document non-obvious performance decisions.

Re-measure after optimization.
```

---

# Performance Decision Framework

When a piece of code is slow, work through this sequence:

```text
1. Can the work be removed?
        ↓
2. Can the work happen later?
        ↓
3. Can the work happen less often?
        ↓
4. Can independent work happen concurrently?
        ↓
5. Can the data structure improve access?
        ↓
6. Can repeated results be reused?
        ↓
7. Can the workload be reduced?
        ↓
8. Can the algorithm be improved?
        ↓
9. Can the implementation be optimized?
        ↓
10. Measure again.
```

This order often produces better improvements than immediately rewriting the inner loop.

---

# Example: Optimize by Avoiding Work

Weak:

```js
const expensiveReport =
  generateReport(data);

if (!isReportVisible) {
  return;
}
```

The report is generated even though it is not needed.

Better:

```js
if (!isReportVisible) {
  return;
}

const report =
  generateReport(data);
```

The fastest work is often work that never happens.

---

# Example: Optimize by Reusing Work

Weak:

```js
const first =
  expensiveCalculation(data);

const second =
  expensiveCalculation(data);
```

Better:

```js
const result =
  expensiveCalculation(data);

const first =
  result;

const second =
  result;
```

when both uses truly require the same result.

---

# Example: Optimize Access

Weak:

```js
for (const order of orders) {
  const user =
    users.find(
      (user) =>
        user.id === order.userId
    );

  processOrder(
    order,
    user
  );
}
```

Better for large repeated workloads:

```js
const usersById =
  new Map(
    users.map(
      (user) => [
        user.id,
        user,
      ]
    )
  );

for (const order of orders) {
  const user =
    usersById.get(
      order.userId
    );

  processOrder(
    order,
    user
  );
}
```

The optimization changes the access pattern rather than making the loop itself more complicated.

---

# Example: Optimize Network Concurrency

Sequential:

```js
const user =
  await fetchUser();

const projects =
  await fetchProjects();

const settings =
  await fetchSettings();
```

Concurrent when independent:

```js
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

The optimization comes from removing unnecessary waiting.

---

# Example: Avoid Unnecessary Rendering

Weak:

```js
function updateName(name) {
  element.textContent =
    name;
}
```

called repeatedly with the same value.

Potentially better in a high-frequency path:

```js
function updateName(name) {
  if (
    element.textContent !==
    name
  ) {
    element.textContent =
      name;
  }
}
```

Use this only when repeated identical updates are actually frequent enough to matter.

---

# Example: Defer Expensive Work

Weak:

```js
initializeApp();

generateAnalyticsReport();

renderPage();
```

Better:

```js
initializeApp();

renderPage();

requestIdleCallback(
  () => {
    generateAnalyticsReport();
  }
);
```

When supported and appropriate, non-critical work can be moved away from the critical path.

Do not use idle callbacks for work that must happen immediately.

---

# Example: Batch Large Work

Instead of:

```js
for (const item of hugeCollection) {
  processItem(item);
}
```

when each item is computationally expensive:

```js
async function processLargeCollection(
  items,
  chunkSize
) {
  for (
    let index = 0;
    index < items.length;
    index += chunkSize
  ) {
    const chunk =
      items.slice(
        index,
        index + chunkSize
      );

    for (const item of chunk) {
      processItem(item);
    }

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          0
        )
    );
  }
}
```

The goal is not necessarily to reduce total computation time.

It is to improve responsiveness by yielding between chunks.

---

# Performance Anti-Patterns

Avoid patterns such as:

```text
Optimizing without measurement
Overusing memoization
Adding caches without invalidation
Creating unbounded concurrency
Loading all data at startup
Rendering enormous DOM trees
Repeated layout reads after writes
Polling when events exist
Running heavy work on every high-frequency event
Duplicating network requests
N+1 API calls
Large synchronous main-thread tasks
Retaining large objects indefinitely
Adding dependencies for trivial operations
Replacing clear code with clever micro-optimizations
```

---

# Performance Principles

```text
The best optimization is often avoiding the work.

Measure before changing the implementation.

Optimize the bottleneck, not the code that merely looks expensive.

Algorithmic improvements usually matter more than syntax tricks.

Data structures affect access cost.

Network performance can dominate JavaScript performance.

Rendering work matters in browser applications.

Memory usage is part of performance.

Concurrency should be controlled.

Caching requires invalidation.

Optimization creates trade-offs.

Readability is a performance engineering concern too,
because unreadable optimizations are difficult to maintain.

Always verify that an optimization actually improved
the target metric.
```

---

# Summary

Performance engineering is not a collection of magic tricks.

It is a disciplined process:

```text
Observe
   ↓
Measure
   ↓
Identify bottleneck
   ↓
Choose the simplest effective optimization
   ↓
Verify
   ↓
Monitor for regressions
```

A strong performance mindset asks:

```text
Can this work be avoided?
Can it happen later?
Can it happen less often?
Can independent work happen concurrently?
Can the data model make it cheaper?
Can the result be reused?
Can the workload be reduced?
```

Only after these questions should you worry about low-level micro-optimizations.

The goal is:

```text
Efficient execution
      +
Controlled resource usage
      +
Responsive user experience
      +
Maintainable code
      =
Good JavaScript performance
```
