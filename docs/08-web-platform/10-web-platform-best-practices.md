# Web Platform Best Practices

Web Platform APIs provide powerful browser capabilities, but they also introduce concerns involving permissions, security, asynchronous work, resource management, compatibility, performance, and application lifecycle.

Good Web Platform code is not simply code that works in one browser.

It should also be:

* Predictable
* Secure
* Cancelable
* Resource-conscious
* Compatible
* Accessible
* Resilient to failure

---

# Feature Detection

Do not assume that a browser supports every Web Platform API.

Check for the capability before using it:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(
    "/service-worker.js"
  );
}
```

Another example:

```js
if (
  navigator.mediaDevices?.getUserMedia
) {
  // Media capture is available.
}
```

For optional APIs:

```js
if ("share" in navigator) {
  // Use native sharing.
} else {
  // Use a fallback.
}
```

Feature detection is usually more reliable than identifying browsers by user-agent strings.

---

# Progressive Enhancement

Applications should provide useful behavior even when an optional platform capability is unavailable.

For example:

```js
async function sharePage() {
  const url = location.href;

  if (navigator.share) {
    await navigator.share({
      title: "JavaScript Reference",
      url
    });

    return;
  }

  await navigator.clipboard.writeText(url);
}
```

The application first uses the preferred platform feature and then provides a fallback.

The principle is:

```text
Baseline functionality
        ↓
Feature detection
        ↓
Optional enhancement
```

---

# Secure Contexts

Many modern Web Platform APIs require a secure context.

Production applications should generally use:

```text
https://
```

Local development commonly works with:

```text
http://localhost
```

Secure-context requirements apply to many APIs involving:

* Cryptography
* Media devices
* Service Workers
* Web Share
* Geolocation
* Other sensitive browser capabilities

Do not build production behavior around an insecure deployment assumption.

---

# Permission Handling

Some APIs require explicit user permission.

Examples include:

```text
Camera
Microphone
Geolocation
Notifications
Clipboard access
```

Permission requests can succeed or fail.

Treat denial as a normal user outcome:

```js
try {
  const stream =
    await navigator.mediaDevices
      .getUserMedia({
        video: true
      });
} catch (error) {
  if (
    error.name ===
    "NotAllowedError"
  ) {
    showPermissionMessage();
    return;
  }

  throw error;
}
```

Do not assume:

```text
Request
  ↓
Permission granted
  ↓
Operation succeeds
```

The real flow can be:

```text
Request
  ↓
Permission granted
  ↓
Resource unavailable
```

or:

```text
Request
  ↓
Permission denied
```

Applications should handle each meaningful outcome.

---

# Request Only What You Need

Request the smallest capability required.

Avoid:

```js
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});
```

when the application only needs video.

Prefer:

```js
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false
});
```

The same principle applies to:

* Permissions
* Storage
* Network access
* Device capabilities
* Camera constraints
* Microphone capabilities

Minimal access reduces privacy and security exposure.

---

# Cancel Unnecessary Asynchronous Work

Asynchronous operations can become irrelevant before they complete.

Use `AbortController` when the operation supports cancellation:

```js
const controller =
  new AbortController();

fetch("/api/search", {
  signal:
    controller.signal
});

controller.abort();
```

A common pattern for replacing a previous search request:

```js
let controller;

async function search(query) {
  controller?.abort();

  controller =
    new AbortController();

  try {
    const response =
      await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
        {
          signal:
            controller.signal
        }
      );

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    return response.json();
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

Cancellation prevents stale operations from unnecessarily consuming resources or updating the UI.

---

# Avoid Race Conditions

Rapidly changing interfaces can create competing requests:

```text
User searches "java"
       ↓
Request A

User searches "javascript"
       ↓
Request B
```

If request A finishes after request B, stale data may overwrite newer data.

Cancellation helps:

```text
Request A
   ↓
Abort

Request B
   ↓
Continue
```

Another approach is to track request identity:

```js
let requestId = 0;

async function loadData() {
  const currentId =
    ++requestId;

  const response =
    await fetch("/api/data");

  const data =
    await response.json();

  if (
    currentId !== requestId
  ) {
    return;
  }

  render(data);
}
```

The important principle is to ensure that only relevant asynchronous results can update application state.

---

# Handle HTTP Errors Explicitly

Do not assume that a fulfilled fetch Promise means the HTTP operation succeeded.

Incorrect:

```js
const response =
  await fetch("/api/user");

const data =
  await response.json();
```

Prefer:

```js
const response =
  await fetch("/api/user");

if (!response.ok) {
  throw new Error(
    `Request failed: ${response.status}`
  );
}

const data =
  await response.json();
```

HTTP status handling should be part of the network layer rather than repeated inconsistently throughout the application.

---

# Validate External Data

Data from a network response should not automatically be trusted to have the expected shape.

For example:

```js
const response =
  await fetch("/api/user");

if (!response.ok) {
  throw new Error(
    "Request failed."
  );
}

const data =
  await response.json();

if (
  typeof data?.name !==
  "string"
) {
  throw new Error(
    "Invalid user data."
  );
}
```

For more complex applications, use a dedicated validation layer or schema validation approach.

The principle is:

```text
External Data
     ↓
Validate
     ↓
Use in Application
```

---

# Manage Resources Explicitly

Web Platform APIs often allocate resources.

Examples include:

```text
Worker
MediaStream
MediaStreamTrack
BroadcastChannel
Observer
IndexedDB connection
Stream reader
```

Release resources when they are no longer required.

## Workers

```js
worker.terminate();
```

## Media Tracks

```js
stream
  .getTracks()
  .forEach(
    (track) => track.stop()
  );
```

## BroadcastChannel

```js
channel.close();
```

## Observers

```js
observer.disconnect();
```

## Reader Locks

```js
reader.releaseLock();
```

The general lifecycle is:

```text
Acquire
   ↓
Use
   ↓
Release
```

---

# Keep the Main Thread Responsive

The main thread is responsible for important browser work, including much of the application's UI behavior.

Avoid performing unnecessarily expensive synchronous operations there.

Potential candidates for worker-based processing include:

* Large data transformations
* Expensive calculations
* Parsing large datasets
* Compression
* CPU-heavy algorithms

Use a Worker when the workload justifies the additional complexity:

```text
Main Thread
     ↓
Send Work
     ↓
Worker
     ↓
Process
     ↓
Return Result
     ↓
Main Thread
```

Do not create workers for trivial operations.

The communication overhead may exceed the benefit.

---

# Use Observers Instead of Unnecessary Polling

Avoid repeatedly checking the same browser state:

```js
setInterval(() => {
  checkVisibility();
}, 100);
```

Use the appropriate observer when available.

For visibility:

```js
const observer =
  new IntersectionObserver(
    (entries) => {
      // Handle visibility changes.
    }
  );
```

For size changes:

```js
const observer =
  new ResizeObserver(
    (entries) => {
      // Handle dimension changes.
    }
  );
```

For DOM mutations:

```js
const observer =
  new MutationObserver(
    (mutations) => {
      // Handle DOM changes.
    }
  );
```

The observer should match the problem:

```text
Visibility
→ IntersectionObserver

Element size
→ ResizeObserver

DOM mutations
→ MutationObserver
```

---

# Keep Observer Callbacks Efficient

Observer callbacks are still JavaScript execution.

Do not perform unnecessary heavy work inside them.

Instead of:

```js
const observer =
  new MutationObserver(
    (mutations) => {
      runExpensiveProcessing(
        mutations
      );
    }
  );
```

consider whether the work can be:

* Batched
* Debounced
* Deferred
* Moved to a Worker
* Reduced to only relevant mutations

Also observe only what is necessary.

---

# Use Narrow MutationObserver Configuration

Do not observe every possible mutation unless the application actually needs all of them.

Avoid broad configuration:

```js
observer.observe(
  document.body,
  {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  }
);
```

when only one attribute is required.

Prefer:

```js
observer.observe(
  element,
  {
    attributes: true,
    attributeFilter: [
      "data-state"
    ]
  }
);
```

Narrow observation reduces unnecessary callback work.

---

# Choose the Appropriate Storage Mechanism

Do not use the same storage mechanism for every requirement.

A useful model is:

```text
Simple preferences
→ localStorage

Structured client-side data
→ IndexedDB

Request/response caching
→ Cache API
```

For example:

```js
localStorage.setItem(
  "theme",
  "dark"
);
```

is appropriate for a simple preference.

Whereas complex structured data may fit IndexedDB:

```text
Users
Projects
Offline records
Indexed data
```

And network resource caching fits the Cache API:

```text
Request
   ↕
Response
```

Choose based on the data model rather than familiarity alone.

---

# Cache Deliberately

Caching can improve performance and offline behavior, but stale or sensitive data introduces risks.

Before caching a resource, consider:

```text
Should this resource be cached?
How long should it remain valid?
Can the data become stale?
Is the response user-specific?
How will old data be invalidated?
What happens offline?
```

Use versioned cache names:

```js
const CACHE_NAME =
  "app-static-v3";
```

Remove obsolete versions:

```js
caches.keys().then(
  (keys) =>
    Promise.all(
      keys
        .filter(
          (key) =>
            key !== CACHE_NAME
        )
        .map((key) =>
          caches.delete(key)
        )
    )
);
```

Caching should follow an explicit strategy.

---

# Do Not Cache Sensitive Data Blindly

Avoid automatically caching authenticated responses.

Before caching a response, ask:

```text
Is the data private?
Is it user-specific?
Could stale data cause harm?
Can another context access it?
Does the application actually need offline access?
```

Static assets are usually easier to cache safely than private API responses.

---

# Clone Responses When Necessary

A response body is normally consumable once.

When a Service Worker needs to both return and cache a response:

```js
const response =
  await fetch(
    event.request
  );

const copy =
  response.clone();

await cache.put(
  event.request,
  copy
);

return response;
```

Cloning should be used because both consumers need independent body streams.

---

# Use Streams When They Provide Real Value

Streaming is useful when data can be processed incrementally.

Consider:

```text
Large file
Large response
Generated data
Compression pipeline
Incremental processing
```

A stream can allow:

```text
Receive chunk
    ↓
Process chunk
    ↓
Receive next chunk
    ↓
Process
```

Do not use streaming simply because the API exists.

For small data, ordinary response methods may be simpler:

```js
await response.json();
```

or:

```js
await response.text();
```

Choose the simplest solution that meets the application's requirements.

---

# Handle Backpressure

Stream pipelines should respect the rate at which consumers can process data.

The general model is:

```text
Producer
   ↓
Transform
   ↓
Consumer
```

If the producer is faster than the consumer, uncontrolled buffering can increase memory usage.

When designing a streaming pipeline, consider:

* Producer speed
* Transformation cost
* Consumer speed
* Buffering
* Cancellation

---

# Handle Device Access Carefully

Camera and microphone access requires additional privacy considerations.

Use:

```js
const stream =
  await navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    });
```

when only video is required.

Stop the tracks afterward:

```js
stream
  .getTracks()
  .forEach(
    (track) => track.stop()
  );
```

An application should provide a clear UI state such as:

```text
Camera Off
Camera Starting
Camera Active
Camera Stopped
Permission Denied
```

Users should never have to guess whether hardware is currently active.

---

# Protect Sensitive APIs

Some APIs expose particularly sensitive capabilities.

Examples include:

```text
Camera
Microphone
Location
Clipboard
Notifications
Web Crypto
```

Applications should:

* Request only necessary capabilities.
* Explain the purpose where appropriate.
* Handle denial.
* Avoid keeping access longer than needed.
* Avoid storing sensitive data unnecessarily.

The principle is least privilege:

```text
Minimum Capability
       ↓
Minimum Exposure
       ↓
Smaller Security and Privacy Surface
```

---

# Use Web Crypto Correctly

For security-sensitive random values:

```js
const bytes =
  new Uint8Array(16);

crypto.getRandomValues(
  bytes
);
```

Do not substitute:

```js
Math.random();
```

for cryptographic randomness.

Do not invent custom encryption algorithms.

Do not confuse:

```text
Hashing
→ Integrity / digest

Encryption
→ Confidentiality

Signing
→ Authenticity + integrity
```

Web Crypto provides primitives.

It does not automatically provide a secure authentication architecture.

---

# Keep Secrets Off the Client

Do not put confidential secrets into browser JavaScript:

```js
const secret =
  "private-server-secret";
```

Everything delivered to the browser should be treated as accessible to the user.

This includes values embedded in JavaScript bundles and client-exposed configuration.

Sensitive server credentials should normally remain on trusted server-side infrastructure.

---

# Handle Browser Compatibility

Before using a newer Web Platform API in production, verify:

* Browser support
* Mobile support
* Secure-context requirements
* Permission requirements
* Feature limitations
* Fallback behavior

Feature detection:

```js
if (
  "someFeature" in navigator
) {
  useFeature();
} else {
  useFallback();
}
```

Compatibility should be part of API selection rather than an afterthought.

---

# Keep Platform-Specific Code Isolated

When an application uses many browser APIs, isolate platform-specific logic behind focused functions or modules.

Instead of spreading:

```js
navigator.mediaDevices
navigator.serviceWorker
navigator.share
indexedDB
```

throughout every component or feature, create focused boundaries:

```text
media/
→ Camera and microphone logic

storage/
→ IndexedDB logic

network/
→ Fetch logic

sharing/
→ Web Share logic
```

This keeps application code easier to test and replace.

---

# Keep Async Boundaries Clear

A function that performs asynchronous platform work should make that fact visible:

```js
async function loadUser() {
  const response =
    await fetch(
      "/api/user"
    );

  return response.json();
}
```

Avoid mixing complex asynchronous state changes with unrelated UI logic in one large function.

Separate:

```text
Request
   ↓
Validate
   ↓
Transform
   ↓
Update State
   ↓
Render
```

This structure improves maintainability.

---

# Prefer Explicit Error Handling

Do not swallow errors silently:

```js
try {
  await doSomething();
} catch {
}
```

Prefer:

```js
try {
  await doSomething();
} catch (error) {
  console.error(
    "Operation failed:",
    error
  );

  showErrorState();
}
```

Different failures should have different responses when appropriate.

Examples:

```text
Abort
→ Usually expected control flow

Permission denied
→ Explain to user

Network failure
→ Retry or offline state

HTTP error
→ Application error handling

Invalid data
→ Validation failure
```

---

# Make Network Retry Intentional

Do not blindly retry every failed request.

Before retrying, consider:

```text
Was the request safe to repeat?
Was the failure temporary?
Could retrying duplicate a transaction?
How many retries are allowed?
How long should the application wait?
```

Retries may be appropriate for some idempotent operations but dangerous for operations that create side effects.

---

# Avoid Duplicate Work

Modern applications can accidentally perform the same operation multiple times.

Examples:

```text
Multiple identical requests
Repeated observers
Duplicate event listeners
Multiple workers
Multiple Service Worker registrations
Repeated IndexedDB operations
```

Establish clear ownership:

```text
One responsibility
→ One owner
→ One lifecycle
```

---

# Clean Up Event and Platform Resources

For long-lived interfaces, cleanup is part of correctness.

Examples include:

```js
element.removeEventListener(
  "click",
  handler
);
```

```js
observer.disconnect();
```

```js
worker.terminate();
```

```js
channel.close();
```

```js
stream
  .getTracks()
  .forEach(
    (track) => track.stop()
  );
```

Without cleanup, repeated setup and teardown can produce:

* Memory leaks
* Duplicate callbacks
* Unnecessary network work
* Battery usage
* Unexpected UI updates

---

# Avoid Global Platform State

Do not create unnecessary globals such as:

```js
window.currentWorker =
  new Worker(
    "./worker.js"
  );

window.sharedChannel =
  new BroadcastChannel(
    "app"
  );
```

Prefer scoped ownership:

```js
function createFeature() {
  const worker =
    new Worker(
      "./worker.js"
    );

  return {
    destroy() {
      worker.terminate();
    }
  };
}
```

This makes lifecycles explicit.

---

# Accessibility Still Matters

Platform APIs should not bypass accessible application design.

For dynamic updates:

```js
statusElement.textContent =
  "Weather updated.";
```

Use appropriate accessibility semantics:

```html
<p
  id="status"
  aria-live="polite"
></p>
```

For dialogs, dynamic controls, media interfaces, and loading states, ensure that:

* Keyboard interaction works.
* Focus is managed.
* Status changes are communicated appropriately.
* Controls have accessible names.
* Errors are understandable.

Browser APIs do not automatically make a UI accessible.

---

# Progressive Offline Design

Offline support should be intentional.

A useful strategy might be:

```text
Application Shell
→ Cache

User Preferences
→ Local Storage

Structured Offline Data
→ IndexedDB

Fresh API Data
→ Network

Offline Fallback
→ Service Worker
```

Do not claim an application supports offline use simply because a Service Worker exists.

Test:

```text
Online
Offline
Slow Network
Network Returns
Old Cache
New Deployment
```

---

# Testing Web Platform Features

Test platform-dependent behavior under realistic conditions.

Examples:

### Network

```text
Success
404
500
Timeout
Abort
Offline
Slow connection
```

### Permissions

```text
Granted
Denied
Revoked
Unavailable
```

### Media

```text
Camera present
Camera absent
Microphone present
Device busy
Permission denied
```

### Storage

```text
Empty storage
Existing data
Corrupted data
Schema upgrade
Storage failure
```

### Service Workers

```text
First install
Update
Activation
Offline
Cache invalidation
Old cache cleanup
```

---

# Security Checklist

Before shipping a feature that uses Web Platform APIs:

```text
[ ] Sensitive capabilities are requested only when needed.
[ ] Permissions are handled explicitly.
[ ] Production uses HTTPS where required.
[ ] Client-side code contains no confidential secrets.
[ ] External data is validated.
[ ] Sensitive responses are not cached blindly.
[ ] Crypto uses established algorithms.
[ ] Security-sensitive randomness uses Web Crypto.
[ ] Authentication is not replaced by client-side tricks.
[ ] Device resources are released.
[ ] Cross-context communication is validated.
```

---

# Performance Checklist

```text
[ ] Main-thread work is kept reasonable.
[ ] Heavy computation uses Workers when justified.
[ ] Large data is streamed when appropriate.
[ ] Observer callbacks are lightweight.
[ ] Mutation observation is narrowly configured.
[ ] Duplicate network requests are avoided.
[ ] Unnecessary polling is avoided.
[ ] Caches have a clear strategy.
[ ] Large resources are not unnecessarily duplicated.
[ ] Workers and channels are cleaned up.
```

---

# Resource Management Checklist

```text
[ ] Workers are terminated when no longer needed.
[ ] BroadcastChannel instances are closed.
[ ] Observers are disconnected.
[ ] Media tracks are stopped.
[ ] Stream readers are released.
[ ] Event listeners are removed when appropriate.
[ ] Old caches are deleted.
[ ] IndexedDB connections are managed intentionally.
```

---

# API Selection Checklist

Before introducing a Web Platform API, ask:

```text
Does the browser provide a simpler API?
Does the feature actually need this capability?
Is the API supported where the application runs?
Does it require a secure context?
Does it require permission?
Can the operation fail?
Can it be canceled?
Who owns its lifecycle?
How will it be cleaned up?
What is the fallback?
```

This prevents adding APIs simply because they are available.

---

# Production Checklist

Before shipping a Web Platform feature:

```text
[ ] Feature detection implemented.
[ ] Browser compatibility checked.
[ ] Secure-context requirements satisfied.
[ ] Permission behavior handled.
[ ] Network failures handled.
[ ] HTTP errors handled.
[ ] External data validated.
[ ] Cancellation considered.
[ ] Resource cleanup implemented.
[ ] Sensitive data protected.
[ ] Cache policy defined.
[ ] Offline behavior tested where relevant.
[ ] Accessibility reviewed.
[ ] Performance reviewed.
[ ] Memory/resource usage reviewed.
[ ] Fallback behavior implemented.
[ ] Failure states tested.
```

---

# Final Mental Model

The Web Platform gives JavaScript access to capabilities beyond the language itself.

A mature application should treat these capabilities as resources with explicit lifecycles:

```text
Detect
  ↓
Request
  ↓
Acquire
  ↓
Use
  ↓
Handle Failure
  ↓
Cancel if Necessary
  ↓
Release
```

For asynchronous APIs:

```text
Start
  ↓
Relevant?
  ├── Yes → Continue
  └── No  → Abort
```

For privileged APIs:

```text
Capability
  ↓
Permission
  ↓
Use
  ↓
Cleanup
```

For cached data:

```text
Store
  ↓
Read
  ↓
Validate
  ↓
Invalidate
  ↓
Replace
```

The goal is not to use the largest number of Web Platform APIs.

The goal is to choose the smallest set of appropriate APIs and use them with clear lifecycle, security, performance, and failure-handling strategies.

## References

* Web APIs
* Fetch API
* AbortController
* IndexedDB API
* Web Workers API
* Service Worker API
* Cache API
* Streams API
* Web Crypto API
* Intersection Observer API
* Resize Observer API
* MutationObserver
* Web Share API
* Media Capture and Streams API
ا