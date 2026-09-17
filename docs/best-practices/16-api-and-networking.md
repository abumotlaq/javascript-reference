# API and Networking

## Overview

Networking is the part of an application that communicates with systems outside the current execution context.

This includes:

* HTTP APIs
* REST APIs
* JSON
* Fetch
* Authentication
* Authorization
* Request validation
* Timeouts
* Retries
* Cancellation
* Caching
* Pagination
* Rate limiting
* Error handling
* Request and response transformation

Good networking code treats external systems as unreliable boundaries.

The network can fail.

Servers can return invalid data.

Requests can be delayed, duplicated, reordered, or cancelled.

A robust application makes these conditions explicit and handles them intentionally.

---

## 1. Treat External Systems as Untrusted Boundaries

Do not assume that an API will always return exactly what your application expects.

Instead of:

```js
const user = await response.json();

console.log(user.name.toUpperCase());
```

validate or normalize the response before using it.

```js
const user = await response.json();

if (
  !user ||
  typeof user.name !== "string"
) {
  throw new Error("Invalid user response");
}

console.log(user.name.toUpperCase());
```

The network is a trust boundary.

Data crossing it should be treated accordingly.

---

## 2. Keep Network Logic Separate From Business Logic

Avoid mixing HTTP details with business rules.

Weak:

```js
async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}
```

This may be acceptable for a small application, but as systems grow, separate transport from domain logic.

```js
async function createUserRequest(user) {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
}
```

Then application logic can decide what the response means.

---

## 3. Use Explicit HTTP Methods

Use HTTP methods according to their intended semantics.

Common methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Example:

```js
await fetch("/api/users/1", {
  method: "GET"
});
```

Create:

```js
await fetch("/api/users", {
  method: "POST"
});
```

Replace:

```js
await fetch("/api/users/1", {
  method: "PUT"
});
```

Partially update:

```js
await fetch("/api/users/1", {
  method: "PATCH"
});
```

Delete:

```js
await fetch("/api/users/1", {
  method: "DELETE"
});
```

Use the method that communicates the operation clearly.

---

## 4. Understand Idempotency

An operation is idempotent when repeating it produces the same intended final state.

For example:

```js
await fetch("/api/users/1", {
  method: "PUT",
  body: JSON.stringify({
    name: "Osama Abu Motlaq"
  })
});
```

Sending the same update repeatedly can result in the same final representation.

By contrast, blindly retrying:

```js
await fetch("/api/orders", {
  method: "POST",
  body: JSON.stringify({
    productId: 1
  })
});
```

could potentially create multiple orders.

Retry policy must consider operation semantics.

---

## 5. Do Not Assume Every Failure Is an HTTP Error

`fetch()` rejects for certain network-level failures, but an HTTP response such as `404` or `500` is still a resolved response.

Weak:

```js
try {
  const response = await fetch("/api/users");
  const data = await response.json();
} catch (error) {
  console.error(error);
}
```

This does not automatically treat HTTP failure statuses as errors.

Prefer:

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(
    `Request failed with status ${response.status}`
  );
}

const data = await response.json();
```

---

## 6. Check `response.ok`

A common request pattern is:

```js
async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`
    );
  }

  return response.json();
}
```

This creates a consistent boundary.

---

## 7. Preserve Useful HTTP Error Information

Do not reduce every error to:

```js
throw new Error("Request failed");
```

when more information is available.

Use structured errors:

```js
async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status}`,
      {
        cause: {
          status: response.status,
          statusText: response.statusText
        }
      }
    );
  }

  return response.json();
}
```

Error structure should remain useful for higher layers.

---

## 8. Separate Technical Errors From User Messages

Do not expose raw server or infrastructure errors directly to users.

Technical error:

```text
ECONNRESET
```

User-facing message:

```text
The request could not be completed. Please try again.
```

Keep these concerns separate.

```js
try {
  await saveUser(user);
} catch (error) {
  console.error(error);

  showMessage(
    "The user could not be saved."
  );
}
```

---

## 9. Preserve the Original Error

When adding context:

```js
try {
  await saveUser(user);
} catch (error) {
  throw new Error(
    "Failed to save user",
    { cause: error }
  );
}
```

Do not destroy the original diagnostic information.

---

## 10. Validate Response Shapes

An API can return a syntactically valid JSON object with an invalid structure.

Example:

```js
const data = await response.json();

if (
  typeof data.id !== "number" ||
  typeof data.name !== "string"
) {
  throw new Error("Invalid user response");
}
```

This protects the rest of the application.

---

## 11. Normalize External Data

An external API might return:

```js
{
  user_name: "Osama Abu Motlaq",
  user_email: "osama@example.com"
}
```

Your application may use:

```js
{
  userName: "Osama Abu Motlaq",
  userEmail: "osama@example.com"
}
```

Normalize at the boundary:

```js
function mapUser(data) {
  return {
    userName: data.user_name,
    userEmail: data.user_email
  };
}
```

This prevents external conventions from spreading through the codebase.

---

## 12. Keep External Schemas Out of Internal Models

Avoid:

```js
function displayUser(user) {
  return user.user_name;
}
```

throughout the application.

Prefer:

```js
const user = mapUser(apiResponse);

displayUser(user);
```

Now the application uses its own stable model.

---

## 13. Use Request Helpers Carefully

A shared request helper can centralize transport behavior.

```js
async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`
    );
  }

  return response.json();
}
```

But do not hide every application-specific behavior inside one universal function.

Avoid a helper that automatically performs:

```text
authentication
retry
caching
logging
parsing
validation
business transformation
navigation
notifications
```

A network helper should have a clear responsibility.

---

## 14. Set Request Headers Explicitly

For JSON requests:

```js
const response = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Osama Abu Motlaq"
  })
});
```

Do not assume every request uses the same content type.

Other examples include:

```text
application/json
multipart/form-data
application/x-www-form-urlencoded
text/plain
```

Use the appropriate representation.

---

## 15. Do Not Manually Set Multipart Boundaries

When using `FormData`:

```js
const formData = new FormData();

formData.append(
  "name",
  "Osama Abu Motlaq"
);

await fetch("/api/users", {
  method: "POST",
  body: formData
});
```

Do not manually set:

```js
headers: {
  "Content-Type": "multipart/form-data"
}
```

The browser needs to generate the multipart boundary.

---

## 16. Encode URL Parameters Correctly

Use `URLSearchParams` for query parameters:

```js
const params = new URLSearchParams({
  search: "Osama Abu Motlaq",
  page: "1"
});

const response = await fetch(
  `/api/users?${params}`
);
```

This avoids manual string concatenation errors.

---

## 17. Use the `URL` API for Complex URLs

```js
const url = new URL(
  "https://example.com/users"
);

url.searchParams.set(
  "search",
  "Osama Abu Motlaq"
);

url.searchParams.set(
  "page",
  "1"
);

console.log(url.toString());
```

This is safer than building complicated URLs manually.

---

## 18. Do Not Concatenate Untrusted URL Input Blindly

Avoid:

```js
const url =
  "/api/users?search=" +
  userInput;
```

Use:

```js
const params = new URLSearchParams({
  search: userInput
});

const url = `/api/users?${params}`;
```

Encoding is part of correct URL construction.

---

## 19. Handle Request Bodies Deliberately

For JSON:

```js
const body = {
  name: "Osama Abu Motlaq"
};

await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});
```

Avoid serializing data multiple times unnecessarily.

---

## 20. Validate Before Sending Requests

Do not use the server as the only place for basic client-side validation.

Example:

```js
function validateUserInput(user) {
  if (
    typeof user.name !== "string" ||
    user.name.trim() === ""
  ) {
    return false;
  }

  return true;
}
```

Then:

```js
if (!validateUserInput(user)) {
  return;
}

await createUser(user);
```

Client-side validation improves UX.

Server-side validation remains necessary because clients cannot be trusted.

---

## 21. Never Trust Client-Side Authorization

This is insufficient:

```js
if (!user.isAdmin) {
  return;
}

await fetch("/api/admin/delete-user", {
  method: "DELETE"
});
```

The client restriction improves UI behavior but does not protect the server.

The server must enforce authorization.

---

## 22. Authentication and Authorization Are Different

Authentication:

```text
Who is this user?
```

Authorization:

```text
What is this user allowed to do?
```

A request may be:

```text
Authenticated
but not authorized
```

This distinction should exist in both application design and error handling.

---

## 23. Use Secure Authentication Practices

Do not invent custom authentication schemes when established mechanisms are available.

Consider:

* Secure session management
* Proper token expiration
* Secure cookies
* Appropriate `SameSite` settings
* HTTPS
* Server-side authorization
* CSRF protections where applicable
* Safe token storage

Authentication is a security boundary, not merely an API feature.

---

## 24. Avoid Storing Sensitive Tokens in Insecure Locations

Do not automatically place long-lived sensitive credentials in:

```js
localStorage
```

because JavaScript executing in the page may be able to access them.

Prefer authentication mechanisms designed around appropriate security properties, such as secure, appropriately scoped cookies when the architecture supports them.

---

## 25. Never Put Secrets in Client Code

Anything shipped to the browser should be considered observable by the client.

Do not embed:

```js
const API_SECRET = "secret-value";
```

Client-side environment variables are not a secure vault.

Secrets belong on trusted server infrastructure.

---

## 26. Use HTTPS

Sensitive network traffic should use encrypted transport.

Avoid production endpoints such as:

```text
http://example.com
```

when:

```text
https://example.com
```

is required.

Mixed content can also cause browsers to block insecure resources from secure pages.

---

## 27. Handle Timeouts Explicitly

A network operation can remain pending longer than the application should tolerate.

Use `AbortController`:

```js
async function requestWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    return response;
  } finally {
    clearTimeout(timer);
  }
}
```

Timeouts should reflect actual application requirements.

---

## 28. Distinguish Timeout From Other Failures

A timeout is different from:

```text
Authentication failure
Authorization failure
Validation failure
Server failure
Network disconnection
Cancellation
```

Your application may need different handling for each.

---

## 29. Support Cancellation

Requests become irrelevant when:

* A component unmounts
* A user changes a search query
* A new request supersedes the previous one
* Navigation occurs
* The user cancels an operation

Use `AbortController`:

```js
const controller = new AbortController();

fetch("/api/data", {
  signal: controller.signal
});

controller.abort();
```

Cancellation should be part of the request lifecycle.

---

## 30. Do Not Treat Expected Cancellation as an Unexpected Error

If a request is intentionally aborted:

```js
try {
  await fetch("/api/data", {
    signal
  });
} catch (error) {
  if (error.name === "AbortError") {
    return;
  }

  throw error;
}
```

This prevents expected cancellation from becoming noisy application errors.

---

## 31. Avoid Unbounded Retries

This is dangerous:

```js
while (true) {
  try {
    return await request();
  } catch {
    // Retry forever.
  }
}
```

It can create:

* Infinite work
* Server overload
* User-visible delays
* Duplicate operations

Use bounded retry counts.

---

## 32. Retry Only Appropriate Failures

Not every failure should be retried.

Potentially retryable conditions may include:

* Temporary network failures
* Certain server failures
* Rate limiting with server-provided guidance
* Transient infrastructure errors

Do not blindly retry:

```text
401
403
404
Validation errors
Invalid request bodies
```

Retry policy should reflect error semantics.

---

## 33. Use Exponential Backoff

Repeated immediate retries can overwhelm a recovering system.

Conceptually:

```text
Attempt 1 → short delay
Attempt 2 → longer delay
Attempt 3 → longer delay
```

Example:

```js
function getRetryDelay(attempt) {
  return 500 * 2 ** (attempt - 1);
}
```

Use reasonable limits.

---

## 34. Add Jitter to Large-Scale Retries

When many clients retry simultaneously, synchronized retries can create a traffic spike.

A jittered strategy introduces variation:

```js
function getRetryDelay(attempt) {
  const base = 500 * 2 ** (attempt - 1);
  const jitter = Math.random() * 200;

  return base + jitter;
}
```

This is especially relevant in distributed systems.

---

## 35. Respect Server Retry Guidance

When a server communicates retry timing, respect it where appropriate.

For example:

```text
Retry-After
```

can communicate when another request should be attempted.

Do not ignore protocol-level signals when designing retry logic.

---

## 36. Rate Limiting

Servers may limit request frequency.

A response such as:

```text
429 Too Many Requests
```

means the client should not continue sending requests at the same rate.

Client behavior may include:

```text
Back off
Wait
Reduce request frequency
Show appropriate feedback
```

---

## 37. Debounce Search Requests

For user-entered search:

```js
function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

Then:

```js
const search = debounce(
  (query) => {
    fetch(`/api/search?q=${encodeURIComponent(query)}`);
  },
  300
);
```

This reduces unnecessary network traffic.

---

## 38. Debouncing Is Not a Substitute for Cancellation

Suppose:

```text
query A
query B
```

Request A may already be in flight when B starts.

Debouncing only reduces request creation.

Cancellation can prevent obsolete work from continuing.

For live search, using both may be appropriate.

---

## 39. Prevent Stale Responses

A later request may complete before an earlier request.

Example:

```text
Request A starts
Request B starts
Request B finishes
Request A finishes
```

If A updates state after B, stale data can overwrite current data.

Possible solutions include:

* Abort previous requests
* Track request IDs
* Compare current query
* Ignore stale responses

---

## 40. Request Identity

Example:

```js
let latestRequestId = 0;

async function searchUsers(query) {
  const requestId = ++latestRequestId;

  const response = await fetch(
    `/api/users?search=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  if (requestId !== latestRequestId) {
    return null;
  }

  return data;
}
```

Only the latest request is accepted.

---

## 41. Pagination

Large collections should usually be paginated.

Example:

```js
const params = new URLSearchParams({
  page: "2",
  limit: "20"
});

const response = await fetch(
  `/api/users?${params}`
);
```

Pagination reduces:

* Response size
* Database work
* Memory usage
* Rendering cost
* Network usage

---

## 42. Do Not Trust Arbitrary Client Pagination Limits

A client could request:

```text
limit=1000000
```

The server should enforce its own maximum.

Client-side validation improves UX.

Server-side limits protect resources.

---

## 43. Offset Pagination

A common model:

```text
page=1
page=2
page=3
```

with:

```text
limit=20
offset=40
```

It is simple but can become inefficient or inconsistent for rapidly changing datasets.

---

## 44. Cursor Pagination

Cursor pagination uses a position marker.

Example:

```text
/api/users?cursor=abc123&limit=20
```

The cursor represents where to continue reading.

Cursor-based approaches are often useful for changing datasets and large collections.

---

## 45. Do Not Assume Pagination Data Is Static

Between page requests:

```text
Page 1
 ↓
New records inserted
 ↓
Page 2
```

Offset pagination may produce duplicates or skipped records.

Pagination strategy should match dataset behavior.

---

## 46. Handle Empty Responses

An API can validly return:

```js
{
  items: []
}
```

This is not necessarily an error.

Represent empty state intentionally:

```js
if (items.length === 0) {
  return {
    state: "empty"
  };
}
```

---

## 47. Distinguish Empty From Error

Do not treat:

```text
No users found
```

as:

```text
Unable to load users
```

These are different states.

Your application should distinguish:

```text
Loading
Success with data
Success with empty data
Error
```

---

## 48. Cache Requests Intentionally

Caching can reduce repeated network calls.

Example concept:

```js
const cache = new Map();

async function getUser(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const user = await requestJson(
    `/api/users/${id}`
  );

  cache.set(id, user);

  return user;
}
```

But caching introduces consistency questions.

---

## 49. Define Cache Invalidation Clearly

Ask:

```text
When does cached data expire?
Who invalidates it?
What happens after a write?
Can stale data be shown?
```

Caching without an invalidation strategy creates correctness problems.

---

## 50. Cache Only What You Understand

A cache should have:

* Clear key
* Clear lifetime
* Clear ownership
* Clear invalidation strategy
* Acceptable memory usage

Avoid creating unbounded caches.

---

## 51. Avoid Caching Sensitive Data Carelessly

Sensitive information may need stronger cache controls.

Consider:

* Browser storage
* In-memory caches
* Shared caches
* CDN behavior
* HTTP caching headers

Do not assume that caching is harmless simply because it improves performance.

---

## 52. Understand HTTP Caching

HTTP provides standardized mechanisms such as:

```text
Cache-Control
ETag
Last-Modified
If-None-Match
If-Modified-Since
```

Use protocol-level caching when it appropriately matches the resource semantics.

---

## 53. Conditional Requests

An application may use an ETag:

```text
ETag: "abc123"
```

A subsequent request can provide:

```text
If-None-Match: "abc123"
```

The server may return:

```text
304 Not Modified
```

This reduces unnecessary response data.

---

## 54. Avoid Client Cache Assumptions

Even if your application caches data in memory, the browser, service worker, CDN, or HTTP layer may also cache it.

When debugging stale data, identify every relevant cache layer.

---

## 55. Request Deduplication

If multiple consumers request the same resource simultaneously, they may accidentally create duplicate network requests.

An in-flight cache can help:

```js
const pendingRequests = new Map();

function getUser(id) {
  const key = String(id);

  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  const request = requestJson(
    `/api/users/${id}`
  ).finally(() => {
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, request);

  return request;
}
```

This is especially useful for high-frequency shared data requests.

---

## 56. Be Careful With In-Flight Request Caches

An in-flight cache is not necessarily a persistent data cache.

These are different concepts:

```text
In-flight cache
→ deduplicates concurrent work.

Data cache
→ reuses completed results.
```

Do not confuse them.

---

## 57. API Versioning

Public APIs may evolve over time.

Possible approaches include:

```text
/api/v1/users
/api/v2/users
```

or content negotiation.

The important principle is to make breaking changes explicit.

Do not silently change a widely consumed contract.

---

## 58. Backward Compatibility

When changing an API, consider:

```text
Existing clients
Existing payloads
Existing response fields
Existing error codes
Existing authentication requirements
```

A new server implementation should not accidentally break old consumers.

---

## 59. Prefer Additive API Changes When Possible

Often it is safer to add:

```js
{
  id,
  name,
  avatar
}
```

than to remove or rename:

```js
name
```

without a migration strategy.

Additive changes may preserve existing consumers.

---

## 60. Validate Request Inputs on the Server

Never rely only on client-side validation.

A malicious or buggy client can send:

```js
{
  name: ""
}
```

or:

```js
{
  role: "admin"
}
```

The server must validate both syntax and authorization.

---

## 61. Allowlist Valid Values

When an API expects a known set:

```js
const allowedRoles = new Set([
  "user",
  "editor"
]);

if (!allowedRoles.has(role)) {
  throw new Error("Invalid role");
}
```

Avoid accepting arbitrary values when the domain is constrained.

---

## 62. Normalize Input at the Boundary

Example:

```js
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
```

Apply normalization consistently at the appropriate boundary.

Avoid having one endpoint normalize and another endpoint assume normalization already happened.

---

## 63. Avoid Double Normalization With Different Rules

Multiple layers applying different normalization rules can create inconsistent data.

Define a canonical policy.

For example:

```text
Input
 ↓
Canonical normalization
 ↓
Validation
 ↓
Persistence
```

Make the transformation predictable.

---

## 64. API Error Shapes

Prefer consistent error structures.

Example:

```js
{
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid request",
    details: []
  }
}
```

Instead of every endpoint returning a different shape.

Consistency makes client-side handling easier.

---

## 65. Use Stable Machine-Readable Error Codes

User-facing messages can change.

Error codes can remain stable:

```text
VALIDATION_ERROR
AUTHENTICATION_REQUIRED
FORBIDDEN
RESOURCE_NOT_FOUND
RATE_LIMITED
INTERNAL_ERROR
```

Clients can switch on the code while presenting a human-readable message separately.

---

## 66. Do Not Make Clients Parse Error Messages

Avoid:

```js
if (
  error.message === "User already exists"
) {
  // ...
}
```

Messages are presentation-oriented and can change.

Prefer:

```js
if (error.code === "USER_ALREADY_EXISTS") {
  // ...
}
```

---

## 67. Correlation IDs

Use request identifiers where multiple services are involved.

Example:

```js
const requestId =
  crypto.randomUUID();

const response = await fetch(
  "/api/users",
  {
    headers: {
      "X-Request-ID": requestId
    }
  }
);
```

The exact header and propagation strategy should match the system architecture.

---

## 68. Do Not Trust Client-Provided Request IDs as Security Credentials

A request ID helps correlation.

It is not an authentication mechanism.

Treat it as diagnostic metadata rather than proof of identity.

---

## 69. Handle Network Offline States

Applications may lose connectivity.

The browser provides network-related signals, but those signals are not perfect guarantees that a particular API request will succeed.

Treat actual request failures as authoritative evidence.

---

## 70. Avoid Assuming `navigator.onLine` Means API Availability

This:

```js
if (navigator.onLine) {
  fetch("/api/data");
}
```

does not guarantee the server is reachable.

The network may exist while:

* DNS fails
* Server is down
* TLS fails
* API is overloaded
* Request is blocked

Use connectivity indicators as hints, not proof.

---

## 71. Handle Partial Failures

A dashboard may request:

```text
User
Projects
Notifications
Analytics
```

One endpoint may fail while the others succeed.

Do not automatically discard all successful data.

Use appropriate concurrency primitives:

```js
const results = await Promise.allSettled([
  fetchUser(),
  fetchProjects(),
  fetchNotifications()
]);
```

Now each operation can be handled independently.

---

## 72. Use `Promise.all` When All Results Are Required

```js
const [
  user,
  projects
] = await Promise.all([
  fetchUser(),
  fetchProjects()
]);
```

If one operation fails, the combined operation rejects.

This is appropriate when partial success is not useful.

---

## 73. Use `Promise.allSettled` for Independent Results

```js
const results = await Promise.allSettled([
  fetchUser(),
  fetchNotifications()
]);

for (const result of results) {
  if (result.status === "fulfilled") {
    console.log(result.value);
  } else {
    console.error(result.reason);
  }
}
```

Use it when one failure should not prevent processing other results.

---

## 74. Avoid Sequential Requests When They Are Independent

Unnecessary:

```js
const user = await fetchUser();
const projects = await fetchProjects();
```

If independent:

```js
const [user, projects] = await Promise.all([
  fetchUser(),
  fetchProjects()
]);
```

This can reduce total latency.

---

## 75. Keep Dependent Requests Sequential

Do not force concurrency when one request depends on another.

```js
const user = await fetchUser();

const projects = await fetchProjects(
  user.id
);
```

The dependency requires the sequence.

Optimize based on dependency structure.

---

## 76. Avoid Network Waterfalls

A network waterfall can look like:

```text
HTML
 ↓
User request
 ↓
Projects request
 ↓
Notifications request
```

If these operations are independent, restructure them to run concurrently or move work closer to the server.

---

## 77. Prefetch Carefully

Prefetching can improve perceived performance:

```js
fetch("/api/projects");
```

before the user navigates.

But it can also:

* Waste network bandwidth
* Consume server resources
* Fetch data the user never uses

Prefetch based on realistic interaction patterns.

---

## 78. Lazy Load Expensive Data

Not every dataset needs to be fetched immediately.

Possible strategies:

```text
Initial data
 ↓
Visible content
 ↓
User interaction
 ↓
Additional request
```

This can reduce initial load time.

---

## 79. Avoid Over-Fetching

Do not request fields or records the UI does not need.

Weak:

```js
GET /api/users
```

when the screen needs only a few fields from a huge dataset.

Possible API design:

```text
GET /api/users?fields=id,name
```

The exact API design depends on the backend.

---

## 80. Avoid Under-Fetching

The opposite problem creates many small requests.

Instead of:

```text
Request user
Request company
Request role
Request permissions
Request avatar
```

consider whether the API should provide a cohesive representation.

The right granularity depends on application requirements.

---

## 81. Design APIs Around Stable Resources

A clear endpoint usually represents a domain resource.

Examples:

```text
/users
/projects
/orders
/notifications
```

Avoid endpoints whose meaning changes unpredictably based on undocumented flags.

---

## 82. Keep API Responsibilities Clear

An endpoint should have understandable semantics.

Avoid:

```text
POST /api/doEverything
```

with dozens of hidden modes.

Prefer specific operations when their semantics differ meaningfully.

---

## 83. Resource-Oriented URLs

Example:

```text
GET /api/users/42
PATCH /api/users/42
DELETE /api/users/42
```

The URL identifies the resource.

The method communicates the operation.

This makes APIs easier to reason about.

---

## 84. Validate Route Parameters

Do not assume:

```text
/api/users/abc
```

contains a valid numeric identifier when the resource requires an integer.

Normalize and validate:

```js
const id = Number(routeId);

if (!Number.isInteger(id)) {
  throw new Error("Invalid user ID");
}
```

The exact identifier format depends on the system.

---

## 85. Prevent Resource Ownership Bugs

Do not authorize a request only because the user is authenticated.

For example:

```text
GET /api/projects/123
```

must verify that the current user is allowed to access project `123`.

Authorization should apply to the specific resource.

---

## 86. Do Not Trust Resource IDs From the Client

A client can change:

```text
projectId=123
```

to:

```text
projectId=124
```

The server must enforce ownership.

This is especially important for user-specific resources.

---

## 87. Avoid Information Leakage in Errors

Do not expose:

```text
Database passwords
Internal paths
SQL queries
Private identifiers
Stack traces
Infrastructure details
```

to clients unnecessarily.

Detailed technical information should remain in secure server-side logs.

---

## 88. Handle Sensitive HTTP Headers Carefully

Headers may include:

```text
Authorization
Cookie
Set-Cookie
X-Request-ID
```

Do not log authentication headers.

Treat them as sensitive data.

---

## 89. CORS Is a Browser Policy

CORS controls which origins browser scripts may access across origins.

It is not authentication.

A permissive CORS policy does not make an API authorized.

Authentication and authorization must still be enforced.

---

## 90. Handle Preflight Requests Properly

Cross-origin requests may trigger an `OPTIONS` request before the actual request.

The server may need to correctly handle:

```text
OPTIONS
Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers
Access-Control-Allow-Credentials
```

Configuration should reflect the intended origins and methods.

---

## 91. Avoid Wildcard CORS With Credentials

Do not assume:

```text
Access-Control-Allow-Origin: *
```

is appropriate for credentialed requests.

Credentials and wildcard origin policies have important browser restrictions.

Configure allowed origins intentionally.

---

## 92. Cookies and `SameSite`

Authentication cookies may use:

```text
Secure
HttpOnly
SameSite
```

attributes.

Understand the browser's cookie policy before debugging authentication.

For sensitive sessions, avoid exposing session credentials to client-side JavaScript unnecessarily.

---

## 93. CSRF Considerations

Cookie-based authentication can require CSRF protection depending on the architecture and request pattern.

Relevant techniques can include:

* SameSite cookies
* CSRF tokens
* Origin checks
* Server-side validation

Do not assume a frontend-only restriction is sufficient.

---

## 94. API Rate Limits

When an API enforces limits, clients should avoid creating traffic spikes.

For repeated operations:

```text
Input
 ↓
Debounce
 ↓
Queue
 ↓
Rate limit
 ↓
Request
```

The exact design depends on the operation.

---

## 95. Backpressure

When producers generate work faster than a consumer can process it, uncontrolled accumulation can cause failures.

Example:

```text
1000 events/sec
↓
Consumer handles 100/sec
↓
Queue grows
```

A robust system may need:

* Bounded queues
* Concurrency limits
* Backpressure
* Dropping policies
* Batching

---

## 96. Limit Concurrency

A client should not necessarily start hundreds of requests simultaneously.

Bound concurrency:

```js
async function mapWithConcurrency(
  items,
  limit,
  worker
) {
  // Execute at most `limit` workers concurrently.
}
```

The implementation should match the project's actual workload.

---

## 97. Batch Requests When Appropriate

If an API supports batching:

```text
POST /api/users/batch
```

a client may send several operations together.

Batching can reduce:

* Connection overhead
* Headers
* Round trips

But batches should not become so large that they create new latency or failure problems.

---

## 98. Beware of Overly Large Payloads

Large requests and responses can create:

* Slow network transfer
* High memory usage
* Parsing delays
* Timeouts
* Server pressure

Use:

* Pagination
* Compression
* Field selection
* Streaming where appropriate
* Batching with limits

---

## 99. Streaming

Some use cases benefit from incremental data delivery.

Examples include:

```text
Large downloads
Server-sent events
Streaming AI output
Progressive responses
```

Streaming changes the error and lifecycle model.

Do not treat streams like simple one-shot JSON responses.

---

## 100. Close Streams Properly

When a stream is no longer needed, release its resources.

For Web Streams:

```js
const reader = stream.getReader();

try {
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    processChunk(value);
  }
} finally {
  reader.releaseLock();
}
```

Resource ownership remains important for networking.

---

## 101. WebSockets

WebSockets maintain a long-lived connection.

Consider:

```text
Connect
Authenticate
Receive messages
Reconnect
Disconnect
Cleanup
```

Do not treat WebSockets like ordinary HTTP requests.

---

## 102. Handle WebSocket Cleanup

A component or feature that owns a WebSocket should close it when no longer needed.

```js
const socket = new WebSocket(
  "wss://example.com"
);

socket.close();
```

The lifecycle should be explicit.

---

## 103. Reconnect Carefully

Automatic WebSocket reconnects can create connection storms.

Use:

* Bounded retry delays
* Exponential backoff
* Jitter
* Maximum retry rules
* Explicit stop behavior

Do not reconnect forever without considering application state.

---

## 104. Server-Sent Events

SSE can provide one-way server-to-client updates.

Consider:

```text
Connect
Receive event
Handle event
Reconnect
Close
```

The client should handle connection lifecycle and cleanup deliberately.

---

## 105. Network Requests From UI Components

UI code should not contain an unstructured collection of networking concerns.

Weak:

```js
function UserPage() {
  // Fetching
  // Parsing
  // Authorization
  // Retry
  // Caching
  // Error mapping
  // Rendering
}
```

Prefer clearer boundaries:

```text
UI
 ↓
Data access
 ↓
HTTP layer
 ↓
API
```

The exact architecture can remain simple in small applications.

---

## 106. Keep Request State Explicit

Useful request states often include:

```text
idle
loading
success
empty
error
```

Example:

```js
const state = {
  status: "loading",
  data: null,
  error: null
};
```

Avoid ambiguous combinations such as:

```js
{
  loading: true,
  error: "Failed",
  data: []
}
```

unless the model intentionally supports such states.

---

## 107. Avoid Multiple Boolean Flags for Impossible States

This can produce invalid combinations:

```js
{
  isLoading: true,
  isSuccess: true,
  isError: true
}
```

Prefer a discriminated state:

```js
{
  status: "loading"
}
```

or:

```js
{
  status: "success",
  data: users
}
```

---

## 108. Keep Error State Specific

Avoid:

```js
{
  error: true
}
```

Prefer:

```js
{
  status: "error",
  error: {
    code: "NETWORK_ERROR",
    message: "Request failed"
  }
}
```

Structured state is easier to render and debug.

---

## 109. Prevent Duplicate Submissions

While a request is pending:

```js
if (isSubmitting) {
  return;
}

setIsSubmitting(true);

try {
  await submitForm();
} finally {
  setIsSubmitting(false);
}
```

This is especially important for operations that are not naturally idempotent.

---

## 110. Do Not Assume UI Prevention Is Enough

Even if the button is disabled:

```js
<button disabled={isSubmitting}>
  Submit
</button>
```

the server should still protect against duplicate operations when necessary.

Client UX controls are not transactional guarantees.

---

## 111. Use Idempotency Keys for Sensitive Operations

For operations such as payment or order creation, an idempotency key can help prevent duplicate processing.

Conceptually:

```js
const idempotencyKey =
  crypto.randomUUID();

await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Idempotency-Key": idempotencyKey
  },
  body: JSON.stringify(order)
});
```

The server must implement and enforce the semantics.

---

## 112. Do Not Automatically Retry Non-Idempotent Operations

Consider:

```text
POST /orders
```

If the request times out, the server may have processed it even if the client did not receive the response.

Blind retrying may create duplicates.

For important write operations, use a server-supported idempotency strategy or another explicit design.

---

## 113. Handle Partial Success in Batch Operations

Suppose a batch contains:

```text
User A
User B
User C
```

It may be possible for:

```text
A → success
B → failure
C → success
```

Your API contract should make partial success explicit if supported.

Do not force clients to assume that every batch operation is all-or-nothing unless that is the actual contract.

---

## 114. Transactions for All-or-Nothing Operations

If several database changes must succeed together:

```text
Create order
Create order items
Reduce inventory
```

the server may need a transaction.

The client should not attempt to simulate database atomicity by chaining several unrelated API calls.

---

## 115. Avoid Distributed Business Logic Across Network Calls

Weak:

```text
Client:
1. Create order
2. Reduce inventory
3. Create payment
4. Send notification
```

Failures between steps can produce inconsistent states.

When the operations belong to one transactional business workflow, the server may need to own the orchestration.

---

## 116. Do Not Use the Network as a General-Purpose Function Call Mechanism

Every API call has cost:

```text
Serialization
Network latency
Server work
Authentication
Parsing
Failure risk
```

Use APIs for meaningful system boundaries.

Do not move tiny local calculations across the network.

---

## 117. Keep Payloads Stable and Explicit

Example:

```js
{
  name: "Osama Abu Motlaq",
  email: "osama@example.com"
}
```

Avoid sending enormous objects containing unrelated client state.

Send only the data required by the operation.

---

## 118. Do Not Trust Client-Provided Defaults

Suppose the client sends:

```js
{
  role: "user"
}
```

The server should not assume this means the user is allowed to select the role.

Server-side defaults and authorization rules should remain authoritative.

---

## 119. Validate API Content Types

Do not assume JSON merely because the endpoint usually returns JSON.

Check:

```js
const contentType =
  response.headers.get("content-type");
```

A server error page might return HTML instead.

Blindly calling:

```js
await response.json();
```

can then create a second parsing error that hides the real server response.

---

## 120. Parse According to the Contract

If the endpoint returns text:

```js
const text = await response.text();
```

If JSON:

```js
const data = await response.json();
```

Use the actual contract.

---

## 121. Guard Against Unexpected HTML

A common debugging surprise is:

```html
<!doctype html>
<html>
```

returned from a request expected to contain JSON.

Possible causes include:

* Wrong URL
* Reverse proxy
* Redirect
* Server error page
* Authentication page
* Development server fallback

Inspect the response before assuming JSON parsing is the problem.

---

## 122. Handle Redirects Intentionally

Authentication and infrastructure may cause redirects.

Inspect:

```text
Request URL
Redirect location
Final URL
Status code
Cookies
```

Do not assume the final response came directly from the requested API endpoint.

---

## 123. Avoid Infinite Client-Side Redirect Behavior

Authentication refresh logic can accidentally produce:

```text
Request
 ↓
401
 ↓
Refresh token
 ↓
Request
 ↓
401
 ↓
Refresh token
 ↓
...
```

Set clear limits.

A failed refresh should eventually become an explicit authentication failure.

---

## 124. Refresh Tokens Carefully

If the architecture uses access-token refresh:

* Avoid multiple simultaneous refresh requests.
* Coordinate pending requests.
* Handle refresh failure centrally.
* Prevent infinite refresh loops.
* Clear invalid authentication state.

The exact strategy depends on the authentication architecture.

---

## 125. Deduplicate Token Refresh

A shared refresh promise can prevent concurrent refresh requests.

Conceptually:

```js
let refreshPromise = null;

function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = performRefresh()
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
```

Multiple failing requests can await the same refresh operation.

---

## 126. Avoid Logging Authorization Headers

Never debug authentication with:

```js
console.log(
  request.headers.Authorization
);
```

Log safe metadata instead:

```js
console.log({
  authenticated: true
});
```

---

## 127. Handle Validation Errors Precisely

Instead of:

```js
{
  error: "Invalid input"
}
```

consider:

```js
{
  error: {
    code: "VALIDATION_ERROR",
    fields: {
      email: "Invalid email"
    }
  }
}
```

This allows the UI to map errors to fields.

The exact structure should match the application contract.

---

## 128. Keep Server and Client Validation Consistent

Client:

```js
isValidEmail(email);
```

Server:

```js
validateEmail(email);
```

They do not need identical implementations, but they should enforce compatible rules.

Client validation improves UX.

Server validation enforces authority.

---

## 129. Avoid Divergent Business Rules

If the client says:

```text
Maximum 10 projects
```

while the server says:

```text
Maximum 20 projects
```

the application becomes inconsistent.

For authoritative business rules, the server should remain the source of truth.

The client can mirror known rules for UX.

---

## 130. Handle API Schema Changes Explicitly

If the response changes from:

```js
{
  name: "Osama Abu Motlaq"
}
```

to:

```js
{
  displayName: "Osama Abu Motlaq"
}
```

do not scatter compatibility checks throughout the application.

Use a boundary adapter:

```js
function mapUser(data) {
  return {
    name:
      data.name ??
      data.displayName
  };
}
```

Then migrate intentionally.

---

## 131. Avoid Permanent Compatibility Layers

Compatibility code has a cost.

After consumers migrate:

```js
function mapUser(data) {
  return {
    name: data.displayName
  };
}
```

Remove obsolete legacy support when it is safe.

Otherwise the application accumulates historical assumptions.

---

## 132. API Documentation Should Match Runtime Behavior

Documentation should specify:

* Endpoint
* Method
* Parameters
* Request body
* Response body
* Status codes
* Authentication
* Authorization
* Error codes
* Pagination
* Rate limits where relevant

Incorrect documentation can be worse than missing documentation.

---

## 133. Treat API Contracts as Shared Interfaces

Frontend and backend teams should agree on:

```text
Request schema
Response schema
Error schema
Authentication
Authorization
Pagination
Versioning
```

Ambiguous contracts create integration bugs.

---

## 134. Consumer-Driven Contracts

When multiple clients depend on an API, their expectations should be visible.

For example:

```text
Client A expects:
id
name

Client B expects:
id
name
avatar
```

Server changes should consider actual consumers rather than assuming unused fields are safe to remove.

---

## 135. Network Security

Networking code should consider:

* HTTPS
* Authentication
* Authorization
* CORS
* CSRF
* Secure cookies
* Input validation
* Output validation
* Rate limits
* Error leakage
* Request smuggling and proxy behavior where relevant
* Dependency security

Do not treat networking as purely a data-transfer problem.

---

## 136. Avoid Server-Side Request Forgery Risks

When the server fetches a URL provided by a client, validate the target.

Weak:

```js
await fetch(userProvidedUrl);
```

This can create SSRF risks in server environments.

Server-side URL fetching should use strong allowlists and network restrictions where appropriate.

---

## 137. Validate Redirect Targets

Do not blindly redirect based on arbitrary client-provided URLs.

Weak:

```js
redirect(userInput);
```

This can enable open redirect vulnerabilities.

Allowlist expected destinations where the application requires redirect behavior.

---

## 138. Limit Request Size

Servers should enforce reasonable limits for:

```text
Request body
Headers
Uploaded files
JSON payloads
Query lengths
Batch size
```

This protects resources and reduces abuse risk.

---

## 139. Validate File Uploads

For uploads, do not trust:

```text
Filename
Extension
MIME type
Client-provided metadata
```

Validate server-side and store files securely.

A file upload is an API boundary and a security boundary.

---

## 140. Timeouts Should Exist Across Layers

A browser timeout does not automatically imply a server timeout.

Relevant layers may include:

```text
Client timeout
Proxy timeout
Application timeout
Database timeout
External service timeout
```

Timeouts should form a deliberate hierarchy.

---

## 141. Avoid Timeout Cascades

If:

```text
Client timeout = 5s
Server timeout = 30s
Database timeout = 60s
```

the server may continue expensive work after the client has already abandoned the request.

Where possible, cancellation and timeouts should propagate through the stack.

---

## 142. Respect Abort Signals in Application Logic

If an operation accepts:

```js
signal
```

pass it downstream where possible:

```js
await fetch(url, {
  signal
});
```

Cancellation is more useful when the entire operation tree respects it.

---

## 143. Design for Offline or Unstable Networks

Depending on the application, useful strategies may include:

```text
Retry
Queueing
Local persistence
Optimistic updates
Offline indicators
Conflict resolution
```

Do not add offline complexity unless the product actually requires it.

---

## 144. Conflict Resolution

When local and server changes conflict:

```text
Client update
      ↓
Server changed independently
      ↓
Conflict
```

Define which source wins and how the user is informed.

Do not allow accidental last-write-wins semantics to become the hidden business rule.

---

## 145. ETags for Concurrency Control

A resource can include an ETag:

```text
ETag: "version-42"
```

A client can send:

```text
If-Match: "version-42"
```

The server can reject an update if the resource changed.

This helps prevent lost updates in some architectures.

---

## 146. Optimistic Concurrency

The general pattern is:

```text
Read version 42
 ↓
Modify
 ↓
Write only if still version 42
```

If another process changed it:

```text
412 Precondition Failed
```

The client can then reload or resolve the conflict.

---

## 147. Do Not Assume Network Ordering

Two requests:

```text
A
B
```

may complete:

```text
B
A
```

Asynchronous systems do not guarantee completion order unless you explicitly coordinate it.

Design state updates accordingly.

---

## 148. Sequence Mutating Operations When Ordering Matters

If operations must happen in order:

```js
await updateProfile();
await publishProfile();
```

Do not run them concurrently:

```js
await Promise.all([
  updateProfile(),
  publishProfile()
]);
```

unless the backend explicitly supports the concurrent model.

---

## 149. Queue Sequential Writes When Appropriate

If a user can trigger repeated updates:

```text
A
B
C
```

a queue can preserve order:

```text
A → B → C
```

The exact strategy depends on whether intermediate states matter.

---

## 150. Coalesce Redundant Requests

If multiple updates can safely collapse into one final update:

```text
A
B
C
```

and only `C` matters, the client may avoid sending A and B.

This is useful for:

* Autosave
* Search
* Resize updates
* Preference changes

Only apply this when intermediate operations are not semantically required.

---

## 151. Be Careful With Autosave

Autosave combines:

```text
Debouncing
Cancellation
Ordering
Retries
Persistence
Conflict handling
```

A robust autosave implementation should answer:

```text
What happens if the user types again?
What happens if request A finishes after B?
What happens if the request fails?
What happens when the user closes the page?
```

---

## 152. Network Requests During Navigation

When navigation changes, determine whether existing requests should:

```text
Continue
Cancel
Cache
Complete in background
```

Do not leave obsolete requests running by default.

---

## 153. Use Request Ownership

Every request should conceptually belong to:

```text
A component
A feature
A user action
A page
A background task
```

The owner should determine:

* Lifetime
* Cancellation
* Error handling
* State updates

Clear ownership prevents stale updates.

---

## 154. Avoid Updating Unmounted UI

If an operation is no longer relevant, cancel it or ignore its result.

The exact behavior depends on the framework.

The important idea is:

```text
Operation lifetime
should match
the lifetime of the state it updates.
```

---

## 155. Network Observability

Important request metadata may include:

```text
Request ID
Method
Route
Status
Latency
Retry count
Response size
Error code
```

Avoid including:

```text
Passwords
Tokens
Sensitive personal data
```

Observability should be useful and safe.

---

## 156. Measure Network Latency

For a request:

```text
Total latency
=
DNS
+
Connection
+
TLS
+
Server processing
+
Transfer
```

The exact components depend on the environment.

When optimizing, determine which stage dominates.

---

## 157. Avoid Optimizing Before Measuring

Do not add:

```text
Caching
Batching
Prefetching
Concurrency
Retries
```

simply because they sound fast.

Each introduces trade-offs.

Measure the existing bottleneck first.

---

## 158. Network Performance Checklist

When a request is slow, inspect:

```text
Request count
Request size
Response size
Server processing time
Database time
Network latency
Serialization
Parsing
Rendering
Cache behavior
```

A slow request may be a database problem rather than a browser problem.

---

## 159. Testing API Clients

API clients should test:

* Successful responses
* HTTP failures
* Network failures
* Invalid response data
* Timeouts
* Cancellation
* Retries
* Error mapping
* Authentication failures
* Authorization failures

Do not test only the happy path.

---

## 160. Test API Error Contracts

If the server promises:

```js
{
  error: {
    code: "USER_NOT_FOUND"
  }
}
```

the client should test handling that specific contract.

This helps prevent accidental changes from breaking error behavior.

---

## 161. Test Request Cancellation

A request wrapper should behave predictably when cancelled.

```js
const controller =
  new AbortController();

const promise =
  requestJson(
    "/api/users",
    {
      signal: controller.signal
    }
  );

controller.abort();
```

The expected cancellation behavior should be explicit.

---

## 162. Test Retry Limits

For retry logic, verify:

```text
Success on first attempt
Success after retry
Failure after maximum attempts
Non-retryable failure
```

This ensures retry code does not accidentally loop forever.

---

## 163. Test Stale Response Prevention

For search or autocomplete features, test:

```text
Request A starts
Request B starts
B completes
A completes
```

Then verify that the result from A does not overwrite B.

Concurrency behavior should be tested deliberately.

---

## 164. Test Pagination

Include:

```text
First page
Middle page
Last page
Empty page
Invalid page
Maximum page size
```

For cursor pagination:

```text
First cursor
Next cursor
Missing cursor
Expired cursor
End of dataset
```

---

## 165. Test Authentication Failure

Test cases such as:

```text
Missing credentials
Expired credentials
Invalid credentials
Insufficient permission
```

Each state may require a different application response.

---

## 166. Test Authorization by Resource

Do not only test:

```js
user.isAdmin === true
```

Also test ownership boundaries.

Example:

```text
User A
Project A → allowed
Project B → denied
```

This verifies object-level authorization.

---

## 167. Test API Input Limits

For input limits:

```text
Minimum accepted value
Maximum accepted value
Below minimum
Above maximum
```

This catches boundary errors.

---

## 168. API and Networking Checklist

Before shipping networking code:

* [ ] HTTP methods communicate the intended operation.
* [ ] Request URLs are constructed safely.
* [ ] Query parameters are encoded.
* [ ] Request bodies use the correct representation.
* [ ] Headers are explicit where necessary.
* [ ] HTTP failures are handled.
* [ ] Response shapes are validated.
* [ ] External data is normalized at the boundary.
* [ ] Authentication is separated from authorization.
* [ ] Server-side authorization is enforced.
* [ ] Secrets are never exposed to clients.
* [ ] HTTPS is used where required.
* [ ] Timeouts are defined for operations that can hang.
* [ ] Cancellation is supported where appropriate.
* [ ] Retries are bounded.
* [ ] Retryability is based on error semantics.
* [ ] Backoff is used where appropriate.
* [ ] Rate limiting is respected.
* [ ] Duplicate submissions are controlled.
* [ ] Non-idempotent operations are protected from accidental retries.
* [ ] Pagination limits are enforced.
* [ ] Empty results are distinguished from errors.
* [ ] Cache ownership and invalidation are defined.
* [ ] Stale responses cannot overwrite current state.
* [ ] Network state is represented explicitly.
* [ ] Error codes are stable where clients depend on them.
* [ ] Sensitive headers and data are not logged.
* [ ] API contracts are documented and tested.
* [ ] External dependencies are treated as unreliable.
* [ ] Important integrations have appropriate tests.

---

## 169. Practical Networking Decision Framework

When designing or debugging an API interaction, ask:

### What is the resource?

Identify the domain concept.

### What operation is being performed?

Choose the appropriate HTTP method.

### What data crosses the boundary?

Define the request and response contracts.

### Who is trusted?

Separate client input, authenticated identity, and authorized actions.

### What can fail?

Consider network, server, validation, timeout, cancellation, and parsing failures.

### Can the operation be retried?

Determine idempotency and server semantics first.

### Can the result become stale?

Consider concurrency and caching.

### How long should the operation live?

Define timeout and cancellation behavior.

### Who owns the request?

Identify the component, feature, or workflow responsible for cleanup and state updates.

### What happens under partial failure?

Define fallback or recovery behavior.

### What data must never be exposed?

Protect secrets, credentials, and sensitive information.

---

## 170. Final Principles

1. Treat the network as an unreliable boundary.
2. Validate external data before trusting it.
3. Separate transport concerns from business logic.
4. Use HTTP methods according to their semantics.
5. Understand idempotency before implementing retries.
6. Check `response.ok` and meaningful status codes.
7. Preserve structured error information.
8. Normalize external data at system boundaries.
9. Keep internal data models independent from external API schemas.
10. Encode URL parameters correctly.
11. Validate client input for UX, but always validate on the server.
12. Never trust client-side authorization.
13. Keep secrets off the client.
14. Use secure authentication mechanisms.
15. Use HTTPS for sensitive communication.
16. Define timeouts for operations that can hang.
17. Support cancellation for obsolete work.
18. Do not treat expected cancellation as an application failure.
19. Retry only when retrying makes semantic sense.
20. Bound retry counts.
21. Use backoff and jitter where appropriate.
22. Respect rate limits.
23. Prevent stale responses from overwriting newer state.
24. Use pagination for large datasets.
25. Enforce server-side resource limits.
26. Distinguish empty results from failures.
27. Design cache ownership and invalidation explicitly.
28. Avoid unbounded caches.
29. Prefer concurrent requests for independent operations.
30. Keep dependent operations sequential.
31. Avoid unnecessary network waterfalls.
32. Design clear request and response contracts.
33. Use stable machine-readable error codes.
34. Keep authentication and authorization conceptually separate.
35. Enforce authorization at the resource boundary.
36. Protect against duplicate non-idempotent operations.
37. Use idempotency keys where appropriate.
38. Treat API versioning and compatibility as explicit concerns.
39. Test failure paths, not only successful requests.
40. Test cancellation, retry, timeout, and concurrency behavior.
41. Do not leak sensitive information through logs or errors.
42. Use request IDs and structured logging for diagnosis.
43. Measure network performance before optimizing.
44. Make request ownership and lifecycle explicit.
45. Keep distributed business transactions on the server when atomicity is required.
46. Use the simplest networking architecture that correctly represents the application's real requirements.
