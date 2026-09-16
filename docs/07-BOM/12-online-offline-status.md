# Online and Offline Status

Browsers provide APIs that allow web applications to observe changes related to the user's network connection.

The main browser features are:

* `navigator.onLine`
* the `online` event
* the `offline` event

These APIs are useful for applications that need to react when a browser appears to become connected or disconnected from a network.

Common use cases include:

* displaying an offline indicator
* pausing nonessential background work
* retrying failed requests
* updating connection status
* improving offline-first experiences
* synchronizing data when connectivity returns

However, there is an important limitation:

> `navigator.onLine` does not prove that the internet or your server is reachable.

It reports the browser's current **online/offline network state according to the browser and operating system**, not guaranteed end-to-end connectivity.

---

# 1. `navigator.onLine`

The simplest API is:

```js
navigator.onLine
```

It returns a Boolean:

```js
true
```

or:

```js
false
```

Example:

```js
if (navigator.onLine) {
  console.log("The browser reports that it is online.");
} else {
  console.log("The browser reports that it is offline.");
}
```

---

# 2. What Does `navigator.onLine` Actually Mean?

A common mistake is to interpret:

```js
navigator.onLine === true
```

as:

> The internet definitely works.

That is too strong.

The browser's `online` state can indicate that the device has a network connection, but that does not necessarily mean that:

* DNS works
* the internet is reachable
* your API is reachable
* your server is healthy
* authentication works
* a specific request will succeed

For example, a laptop may be connected to a Wi-Fi network while the Wi-Fi network itself has no internet access.

The browser may still report:

```js
navigator.onLine === true
```

---

# 3. The Four Different Concepts

It is useful to distinguish:

```text
Network interface
      ↓
Local network
      ↓
Internet connectivity
      ↓
Application/server availability
```

These are different things.

For example:

```text
Wi-Fi connected
        ≠
Internet reachable
        ≠
API reachable
        ≠
API request succeeded
```

This distinction is critical for production applications.

---

# 4. Reading the Initial Status

You can inspect the current status when the page loads:

```js
console.log(navigator.onLine);
```

Example:

```js
if (navigator.onLine) {
  console.log("Online");
} else {
  console.log("Offline");
}
```

This gives your application an initial signal.

It does not continuously monitor the network by itself.

---

# 5. The `online` Event

Browsers provide the `online` event when the browser transitions to an online state.

Example:

```js
window.addEventListener("online", () => {
  console.log("Browser is online.");
});
```

The callback runs when the browser detects the transition.

---

# 6. The `offline` Event

The `offline` event is fired when the browser transitions to an offline state.

Example:

```js
window.addEventListener("offline", () => {
  console.log("Browser is offline.");
});
```

This allows the application to react to changes.

---

# 7. Basic Online/Offline Example

```js
function updateConnectionStatus() {
  if (navigator.onLine) {
    console.log("Online");
  } else {
    console.log("Offline");
  }
}

updateConnectionStatus();

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
```

This pattern:

1. checks the initial state
2. listens for future changes
3. uses the same function for both states

---

# 8. Why Initial State and Events Are Both Needed

This is incomplete:

```js
window.addEventListener("online", () => {
  console.log("Online");
});
```

Why?

Because the page might already be online when your code starts.

The event may not fire just because the listener was added.

Therefore, use:

```js
updateConnectionStatus();

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
```

The initial state and later transitions are separate concerns.

---

# 9. Updating the UI

A simple browser example:

```html
<p id="status"></p>
```

Then:

```js
const statusElement = document.querySelector("#status");

function updateStatus() {
  statusElement.textContent = navigator.onLine
    ? "Online"
    : "Offline";
}

updateStatus();

window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);
```

This updates the page when the browser reports a network-state change.

---

# 10. A Better Status Message

Instead of only displaying:

```text
Online
```

you might communicate the state more clearly:

```js
function updateStatus() {
  const message = navigator.onLine
    ? "Connection available"
    : "You appear to be offline";

  statusElement.textContent = message;
}
```

The wording should reflect the API's limitations.

Saying:

```text
Internet guaranteed
```

would be too strong.

---

# 11. The `online` and `offline` Events Belong to `window`

You will often see:

```js
window.addEventListener("online", handler);
window.addEventListener("offline", handler);
```

The events are available in the browser environment.

The application can therefore respond to changes globally rather than attaching a listener to a specific element.

---

# 12. Event Handler Example

```js
function handleOnline() {
  console.log("Connection state changed to online.");
}

function handleOffline() {
  console.log("Connection state changed to offline.");
}

window.addEventListener("online", handleOnline);
window.addEventListener("offline", handleOffline);
```

This is useful when the application needs separate logic for each state.

---

# 13. Removing Listeners

Event listeners should be removed when they are no longer needed.

Example:

```js
function handleOnline() {
  console.log("Online");
}

window.addEventListener("online", handleOnline);

window.removeEventListener("online", handleOnline);
```

The same applies to `offline`.

This becomes especially important in React components.

---

# 14. React Example

A basic React hook:

```jsx
import { useEffect, useState } from "react";

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(
    () => navigator.onLine
  );

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <p>
      {isOnline ? "Online" : "Offline"}
    </p>
  );
}
```

This combines:

* browser state
* event listeners
* React state
* effect cleanup

---

# 15. Why Cleanup Matters in React

Suppose a component adds:

```js
window.addEventListener("online", handleOnline);
```

but never removes it.

If the component mounts and unmounts repeatedly, listeners can accumulate.

That can lead to:

* duplicate callbacks
* unnecessary work
* stale state updates
* difficult-to-debug behavior

The cleanup function:

```js
return () => {
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
};
```

prevents this.

---

# 16. A Reusable React Hook

A common abstraction is:

```jsx
import { useEffect, useState } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    () => navigator.onLine
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

Then:

```jsx
function ConnectionStatus() {
  const isOnline = useOnlineStatus();

  return (
    <p>
      {isOnline
        ? "Online"
        : "Offline"}
    </p>
  );
}
```

This separates connection-state logic from presentation.

---

# 17. Important React SSR Consideration

This is dangerous in server-rendered environments:

```js
const [isOnline, setIsOnline] = useState(
  navigator.onLine
);
```

if it is evaluated where `navigator` does not exist.

In environments such as server rendering, the browser object is not available.

This matters in Next.js.

---

# 18. Next.js and the Browser Boundary

In Next.js, browser-specific APIs require client-side execution.

For example:

```jsx
"use client";

import { useEffect, useState } from "react";
```

A component that directly uses:

```js
navigator.onLine
window.addEventListener(...)
```

belongs on the client side.

This is an important example of the server/client boundary.

---

# 19. Safer Next.js Pattern

A client component can initialize browser-dependent state after mounting.

Example:

```jsx
"use client";

import { useEffect, useState } from "react";

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <p>
      {isOnline ? "Online" : "Offline"}
    </p>
  );
}

export default ConnectionStatus;
```

The exact initialization strategy can vary depending on the application's hydration requirements.

---

# 20. Hydration and Online State

Server-rendered applications can face a mismatch between:

```text
Server render
```

and:

```text
Browser state
```

The server cannot directly know the user's browser-level `navigator.onLine` value in the same way the client can.

Therefore, blindly rendering browser-derived values during server rendering can create hydration concerns.

A client-side update after mounting is often easier to reason about.

---

# 21. `navigator.onLine` Is Not a Health Check

Consider:

```js
if (navigator.onLine) {
  fetch("/api/products");
}
```

This can still fail.

Why?

Because:

```text
navigator.onLine === true
```

does not guarantee:

```text
/api/products is reachable
```

The request may fail because:

* the server is down
* DNS fails
* the API is unavailable
* a proxy blocks the request
* TLS negotiation fails
* authentication fails
* the route returns an error
* a firewall blocks access

---

# 22. Network State vs Request Success

These are separate signals:

```text
Online state
      ↓
Browser believes a network connection exists

HTTP request
      ↓
Specific server communication attempt

Response
      ↓
Did that specific operation succeed?
```

A reliable application should reason about them separately.

---

# 23. Real-World Example

Imagine:

```js
navigator.onLine === true
```

but:

```js
fetch("/api/messages")
```

returns:

```text
500 Internal Server Error
```

The browser can still be considered online.

The problem is application/server availability, not necessarily the local network connection.

---

# 24. Detecting Request Failure

Use normal request error handling:

```js
async function loadData() {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
```

This gives you information about the actual request.

That is more useful than relying only on `navigator.onLine`.

---

# 25. Network Status Should Not Replace Error Handling

Avoid:

```js
if (!navigator.onLine) {
  return;
}

fetch("/api/data");
```

as your only protection.

You still need:

```js
try {
  await fetch(...);
} catch (error) {
  // Handle failure
}
```

Even while `navigator.onLine` reports `true`.

---

# 26. Combining Online State with Fetch

A practical application can use both:

```text
navigator.onLine
        +
actual request result
```

For example:

```js
async function syncData() {
  if (!navigator.onLine) {
    console.log("Browser reports offline.");
    return;
  }

  try {
    const response = await fetch("/api/sync");

    if (!response.ok) {
      throw new Error("Sync failed.");
    }

    console.log("Sync successful.");
  } catch (error) {
    console.error("Network or server error:", error);
  }
}
```

This is a much more realistic approach.

---

# 27. The `online` Event Does Not Mean "API Is Back"

Suppose an API server is temporarily unavailable.

Later, the browser fires:

```js
window.addEventListener("online", () => {
  // ...
});
```

This event indicates a browser network-state transition.

It does not guarantee that:

```text
https://api.example.com
```

is now healthy.

If your application needs to confirm server availability, perform an actual application-level check.

---

# 28. Application-Level Connectivity Checks

A real health check might call a known endpoint.

Conceptually:

```js
async function checkServer() {
  try {
    const response = await fetch("/api/health");

    return response.ok;
  } catch {
    return false;
  }
}
```

Now you have a different signal:

```text
Can my application reach this endpoint?
```

That can be more useful than simply asking whether the browser considers itself online.

---

# 29. Heartbeats and Connectivity Checks

Some applications periodically verify connectivity.

Example concept:

```js
async function checkConnection() {
  try {
    const response = await fetch("/api/health");

    return response.ok;
  } catch {
    return false;
  }
}
```

However, do not run frequent health checks without considering:

* server load
* battery usage
* mobile data usage
* background throttling
* caching
* request cancellation

Connectivity checks should have a clear purpose.

---

# 30. Offline-First Applications

An offline-first application is designed so that important functionality can continue even when network connectivity is unavailable.

This may involve:

* local storage
* IndexedDB
* Cache Storage
* service workers
* queued writes
* later synchronization

`navigator.onLine` can be one signal used by such an application.

It is not the entire offline architecture.

---

# 31. Example Offline Indicator

A common pattern is a top-level banner:

```jsx
function OfflineBanner({ isOnline }) {
  if (isOnline) {
    return null;
  }

  return (
    <div role="status">
      You appear to be offline.
    </div>
  );
}
```

This provides visible feedback without blocking the application.

---

# 32. Why an Offline Banner Is Useful

A user may try to:

* save a form
* send a message
* submit an order
* refresh data

while offline.

A visible connection state can explain why an operation cannot complete.

However, the application should still handle request failures independently.

---

# 33. Offline UI and Accessibility

An offline message should be accessible.

For example:

```jsx
<div role="status">
  You appear to be offline.
</div>
```

or an appropriate live-region strategy can be used depending on the importance and frequency of changes.

Avoid rapidly changing announcements that create unnecessary noise for assistive technologies.

---

# 34. Online/Offline Status and Forms

Suppose a user is filling out a contact form.

When the browser becomes offline:

```js
window.addEventListener("offline", () => {
  console.log("Connection lost.");
});
```

The UI could:

* warn the user
* prevent a network-only submission
* preserve draft data locally
* offer retry functionality

For important forms, preserving user input is often more important than simply displaying "Offline."

---

# 35. Preserving Form Data

An offline-aware form might store a draft locally:

```js
localStorage.setItem(
  "contact-draft",
  JSON.stringify({
    name: "Osama Abu Motlaq",
    message: "Hello",
  })
);
```

Then restore it when the application reloads.

This combines the online/offline concept with browser storage.

For larger or more sophisticated applications, IndexedDB may be more appropriate.

---

# 36. Queuing Operations

An offline-first application may queue actions while offline.

Conceptually:

```text
User action
    ↓
No connection
    ↓
Store operation locally
    ↓
Connection becomes available
    ↓
Attempt synchronization
```

This is much more advanced than simply checking:

```js
navigator.onLine
```

The status API is only one component of the system.

---

# 37. Retrying When Back Online

A simple pattern:

```js
window.addEventListener("online", () => {
  syncPendingData();
});
```

But `syncPendingData()` should still verify that the actual synchronization request succeeds.

Example:

```js
window.addEventListener("online", async () => {
  try {
    await syncPendingData();
  } catch (error) {
    console.error("Sync failed:", error);
  }
});
```

The online event triggers the attempt; it does not guarantee success.

---

# 38. Avoid Blind Retry Loops

Do not automatically retry forever:

```js
window.addEventListener("online", () => {
  syncData();
});

async function syncData() {
  try {
    await fetch("/api/sync");
  } catch {
    syncData();
  }
}
```

This can create uncontrolled requests.

Production systems should consider:

* retry limits
* exponential backoff
* cancellation
* idempotency
* server load
* duplicate writes

---

# 39. Online/Offline and `fetch()`

A common misconception:

```js
if (!navigator.onLine) {
  // fetch cannot work
}
```

The browser's online status and a particular `fetch()` request are separate concepts.

The best pattern is:

```text
Use online/offline state
        +
Handle fetch success/failure
```

rather than relying on only one of them.

---

# 40. Offline Doesn't Mean "No Network Interface"

A browser can report:

```js
navigator.onLine === false
```

when it determines that the browser is offline.

However, network conditions can be complex.

Likewise:

```js
navigator.onLine === true
```

does not guarantee an actual working internet path.

Therefore, avoid interpreting the Boolean as a comprehensive network diagnostic.

---

# 41. Mobile and Intermittent Connectivity

Mobile devices frequently experience:

* changing Wi-Fi networks
* cellular transitions
* temporary signal loss
* captive portals
* network handoffs
* fluctuating latency

Applications should therefore avoid assuming that connectivity is permanent.

A robust application treats network requests as potentially unreliable.

---

# 42. Captive Portals

A device may connect to a public Wi-Fi network but still require browser-based authentication before normal internet access is available.

For example:

```text
Wi-Fi connected
        ↓
Captive portal
        ↓
Internet access unavailable
```

This is another reason why:

```js
navigator.onLine
```

is not equivalent to:

```text
The public internet is fully reachable.
```

---

# 43. Network State and Battery Usage

Connectivity-aware applications should avoid excessive polling.

Bad:

```js
setInterval(checkConnection, 1000);
```

This is often unnecessary.

Better approaches may include:

* browser online/offline events
* request-based failure detection
* occasional application-level health checks
* visibility-aware scheduling
* explicit retry logic

Choose based on actual application requirements.

---

# 44. Network State and Visibility

An application may combine:

```text
online/offline
+
page visibility
```

For example:

* pause background synchronization when hidden
* resume when visible
* retry after connectivity returns
* avoid unnecessary requests when the user is not interacting

This can improve performance and battery usage.

---

# 45. Combining `online`, `offline`, and `visibilitychange`

Conceptually:

```js
window.addEventListener("online", handleOnline);
window.addEventListener("offline", handleOffline);

document.addEventListener(
  "visibilitychange",
  handleVisibility
);
```

Now the application can consider:

```text
Connected?
Visible?
Need synchronization?
```

rather than treating the network as a single binary condition.

---

# 46. Online/Offline Status in React Context

In a larger React application, connection status may be shared across many components.

For example:

```text
App
├── Header
├── OfflineBanner
├── Dashboard
├── Products
└── Contact
```

Instead of creating separate listeners in every component, you can centralize connection state.

A Context provider can expose:

```js
{
  isOnline
}
```

to the application.

This avoids duplicated browser event listeners.

---

# 47. Context-Based Example

Conceptually:

```jsx
const ConnectionContext = createContext(null);
```

A provider can maintain the status:

```jsx
function ConnectionProvider({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Add online/offline listeners.
  }, []);

  return (
    <ConnectionContext.Provider value={{ isOnline }}>
      {children}
    </ConnectionContext.Provider>
  );
}
```

Components can then consume the shared state.

This becomes useful when connection information affects many parts of the application.

---

# 48. Avoid One Listener Per Component

Imagine ten components each doing:

```js
window.addEventListener("online", ...);
window.addEventListener("offline", ...);
```

That can work, but it may be unnecessarily repetitive.

A centralized connection manager or hook/provider can simplify the architecture.

However, do not introduce Context just because an application has one small connection indicator.

Use the simplest architecture that fits the scope.

---

# 49. Connection Status Is Application State

Once browser events are translated into React state:

```text
Browser event
    ↓
Event handler
    ↓
React state
    ↓
UI
```

the status becomes part of the application's state model.

For example:

```js
const [isOnline, setIsOnline] = useState(true);
```

This makes it easy for multiple components to respond consistently.

---

# 50. A Better State Model

For more complex systems, one Boolean may not be enough.

You may need states such as:

```text
online
offline
checking
degraded
serverUnavailable
syncing
```

For example:

```js
const connectionState = {
  status: "online",
};
```

The exact model depends on the application.

Do not force a complex system into:

```js
isOnline: boolean
```

if the product actually needs more nuanced states.

---

# 51. Online Does Not Mean Authenticated

A user can be online while:

```text
session expired
```

or:

```text
API authorization failed
```

Therefore:

```text
Online
≠
Authenticated
```

An application should keep these concerns separate.

---

# 52. Online Does Not Mean Backend Healthy

Similarly:

```text
Online
≠
Backend healthy
```

Your frontend may have network access while your backend is:

* down
* overloaded
* returning errors
* under maintenance

This is why request-level error handling remains essential.

---

# 53. Online Does Not Mean Database Healthy

In a full-stack application:

```text
Browser
  ↓
Network
  ↓
API
  ↓
Backend
  ↓
Database
```

A working browser connection does not guarantee that the database is available.

For example:

```text
Browser online
      ✓

API reachable
      ✓

Database query
      ✗
```

The frontend needs to handle the actual API response.

---

# 54. Supabase and Connectivity

In applications using Supabase or another external backend, the browser's network state still does not prove that the Supabase service or project is reachable.

For example:

```js
if (navigator.onLine) {
  // Still handle the actual Supabase request result.
}
```

The correct architecture remains:

```text
Network signal
+
actual backend result
+
application error handling
```

---

# 55. Practical React Example: Offline Banner

```jsx
"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div role="status">
      You appear to be offline.
    </div>
  );
}
```

This is a practical pattern for a Next.js Client Component.

---

# 56. Practical Example: Retry After Reconnection

```js
async function syncData() {
  try {
    const response = await fetch("/api/sync");

    if (!response.ok) {
      throw new Error("Sync failed.");
    }

    console.log("Sync complete.");
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("online", () => {
  syncData();
});
```

Important:

The event starts the synchronization attempt.

It does not guarantee synchronization success.

---

# 57. Practical Example: Disable a Non-Critical Action

A UI could decide to disable an operation when offline:

```jsx
<button disabled={!isOnline}>
  Refresh Data
</button>
```

However, disabling actions is an application decision.

You should still handle failures because:

```text
online
```

does not guarantee:

```text
request succeeds
```

---

# 58. Better Than Simply Disabling Everything

An offline application should not necessarily disable the entire UI.

For example:

```text
Offline
├── View cached projects      ✓
├── Read saved content        ✓
├── Edit local draft          ✓
├── Send request to server    ✗
└── Sync data                 pending
```

Good offline UX distinguishes between:

* actions that require the network
* actions that can work locally

---

# 59. Offline-First Mental Model

A stronger architecture is:

```text
Can the operation work locally?
        │
       Yes
        ↓
Perform locally

Can the operation be synchronized?
        │
       Yes
        ↓
Queue/sync when appropriate
```

This is much more powerful than simply showing:

```text
Offline
```

---

# 60. Error Messages During Connectivity Problems

Avoid overly technical messages like:

```text
TypeError: Failed to fetch
```

for end users.

A better message might be:

```text
We couldn't connect right now. Your changes are still saved locally.
```

when that behavior is actually implemented.

The message should reflect what the application really did.

---

# 61. Avoid False Success

One dangerous UX pattern is:

```text
User clicks Save
↓
Network unavailable
↓
UI says "Saved!"
```

That creates a false state.

If the data was only stored locally, say so:

```text
Saved locally. We'll sync when the connection is restored.
```

If nothing was saved:

```text
We couldn't save your changes.
```

Accurate state communication matters.

---

# 62. Connection Recovery UX

When connectivity returns, an application may show:

```text
Connection restored.
Syncing your changes...
```

and then:

```text
All changes synced.
```

But only display these states if the underlying operations actually succeeded.

Do not interpret:

```js
online
```

as proof that synchronization succeeded.

---

# 63. Testing Online/Offline Behavior

You should test:

```text
Initial online
Initial offline
Online → offline
Offline → online
Request failure while online
Request success after reconnect
Server unavailable while browser is online
```

This catches many real-world problems.

---

# 64. Browser Developer Tools

Most modern browser developer tools can simulate offline network conditions.

This allows you to test:

* UI indicators
* failed requests
* retries
* offline drafts
* synchronization
* error handling

Testing with simulated network failures is important for applications that depend heavily on remote APIs.

---

# 65. Network Throttling vs Offline

These are not the same.

### Offline

Represents no available network connection from the browser's perspective.

### Throttling

Simulates slower network characteristics.

For example:

```text
Fast
↓
Slow 4G
↓
Slow 3G
```

An application should ideally handle:

* no connection
* high latency
* slow responses
* server failures

rather than only one scenario.

---

# 66. Network Errors Are Not All the Same

A failed request could result from:

```text
No network
DNS failure
Connection timeout
TLS failure
HTTP 401
HTTP 403
HTTP 404
HTTP 429
HTTP 500
```

These represent very different problems.

Your UI and retry logic should distinguish them where appropriate.

---

# 67. `offline` Event Does Not Explain the Cause

If the browser emits:

```js
window.addEventListener("offline", () => {
  // ...
});
```

you know the browser transitioned to an offline state.

You do not necessarily know:

* why the connection failed
* whether the router is broken
* whether DNS is unavailable
* whether the server is down

For diagnosis, inspect actual requests and infrastructure signals.

---

# 68. Online/Offline Status and Service Workers

Service workers can provide richer offline experiences by:

* caching assets
* intercepting requests
* serving cached responses
* supporting offline pages
* coordinating background work

The online/offline APIs can complement this architecture.

They do not replace service worker functionality.

---

# 69. Cache Strategy Matters

For example:

```text
Request for static asset
        ↓
Cache available?
        ├── Yes → Serve cache
        └── No  → Network
```

Or:

```text
Request for API data
        ↓
Network available?
        ├── Yes → Fetch latest
        └── No  → Use cached data if appropriate
```

The correct strategy depends on the data's freshness requirements.

---

# 70. Online/Offline Status and Data Freshness

An offline application may show old cached data.

Therefore, distinguish between:

```text
Available
```

and:

```text
Fresh
```

For example:

```text
Projects
Last updated 10 minutes ago
```

is more informative than pretending cached content is current.

---

# 71. Connection Status and UX Copy

Good copy:

```text
You appear to be offline.
```

Better when applicable:

```text
You appear to be offline. Some actions may be unavailable.
```

Potentially misleading:

```text
Internet is definitely down.
```

The wording should match the certainty of the underlying signal.

---

# 72. Practical Utility: Listen to Connection Changes

```js
function monitorConnection(onChange) {
  const update = () => {
    onChange(navigator.onLine);
  };

  update();

  window.addEventListener("online", update);
  window.addEventListener("offline", update);

  return () => {
    window.removeEventListener("online", update);
    window.removeEventListener("offline", update);
  };
}
```

Usage:

```js
const stopMonitoring = monitorConnection((isOnline) => {
  console.log(
    isOnline
      ? "Browser reports online."
      : "Browser reports offline."
  );
});
```

Later:

```js
stopMonitoring();
```

This creates a reusable subscription model.

---

# 73. React Hook Based on the Same Pattern

```jsx
import { useEffect, useState } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    true
  );

  useEffect(() => {
    const update = () => {
      setIsOnline(navigator.onLine);
    };

    update();

    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return isOnline;
}
```

The main idea is:

```text
Browser event source
↓
React hook
↓
React state
↓
UI
```

---

# 74. Why `navigator.onLine` Is Useful Despite Its Limitation

Even though it is not a full internet health check, it is still useful for:

* showing a basic offline indicator
* reacting to obvious network transitions
* triggering a retry attempt
* adapting noncritical UI
* coordinating offline-first behavior

The key is to use it for the signal it actually provides.

---

# 75. Why `navigator.onLine` Should Not Be Your Only Signal

For production systems, you often need multiple layers:

```text
Layer 1
Browser network state

Layer 2
Request success/failure

Layer 3
Application/server health

Layer 4
Data synchronization state
```

This provides a more accurate model than one Boolean.

---

# 76. Common Mistake: Treating `true` as Guaranteed Internet

Incorrect:

```js
if (navigator.onLine) {
  console.log("Internet is working.");
}
```

Better:

```js
if (navigator.onLine) {
  console.log("Browser reports an online state.");
}
```

Then let actual requests determine application connectivity.

---

# 77. Common Mistake: Listening Only for `offline`

Incorrect:

```js
window.addEventListener("offline", handleOffline);
```

This tells you when the state becomes offline, but not when it returns.

Use both:

```js
window.addEventListener("online", handleOnline);
window.addEventListener("offline", handleOffline);
```

---

# 78. Common Mistake: Forgetting the Initial State

Incorrect:

```js
window.addEventListener("online", handleOnline);
window.addEventListener("offline", handleOffline);
```

A page loaded while already offline may not get an event immediately.

Initialize from:

```js
navigator.onLine
```

and then subscribe to transitions.

---

# 79. Common Mistake: Forgetting Cleanup in React

Incorrect:

```jsx
useEffect(() => {
  window.addEventListener("online", handleOnline);
}, []);
```

Better:

```jsx
useEffect(() => {
  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("online", handleOnline);
  };
}, []);
```

For both events, clean up both listeners.

---

# 80. Common Mistake: Retrying Forever

Incorrect:

```js
async function sync() {
  try {
    await fetch("/api/sync");
  } catch {
    setTimeout(sync, 1000);
  }
}
```

This can create uncontrolled retries.

Use:

* bounded retry counts
* backoff
* cancellation
* clear synchronization state

when building production retry systems.

---

# 81. Common Mistake: Disabling the Entire Application

An offline state should not automatically mean:

```text
Everything disabled
```

Some features may continue to work entirely locally.

Design according to feature requirements.

---

# 82. Common Mistake: Confusing Server Failure with Offline

If:

```text
HTTP 500
```

occurs, do not automatically conclude:

```text
User is offline.
```

The browser may be online and the backend may simply have an internal failure.

Keep network errors and server errors conceptually separate.

---

# 83. Security Considerations

Do not use:

```js
navigator.onLine
```

for security decisions.

For example:

```js
if (navigator.onLine) {
  allowSensitiveOperation();
}
```

is not a security boundary.

A user controls their own browser environment.

Security must be enforced on trusted server-side infrastructure.

---

# 84. Privacy Considerations

Connection information can sometimes contribute to browser/device fingerprinting when combined with many other signals.

Applications should avoid unnecessary collection or transmission of environmental information.

For ordinary UI state, there is usually no reason to send the raw online/offline state to your backend unless the product has a specific need.

---

# 85. Performance Considerations

Listening to:

```js
online
offline
```

is inexpensive.

The larger performance considerations usually come from what you do after the event.

For example:

```js
window.addEventListener("online", () => {
  syncEverything();
});
```

could create a large burst of requests.

A better design may:

* queue synchronization
* deduplicate work
* process gradually
* retry intelligently
* verify actual success

---

# 86. Reconnection Storms

Imagine a large application where many components independently react to:

```js
online
```

and each starts its own request.

This can create a reconnection storm:

```text
online event
    ↓
10 components
    ↓
30 requests
    ↓
server load spike
```

Centralizing synchronization logic can prevent this.

This is especially important in applications with many background operations.

---

# 87. Centralized Synchronization

A stronger architecture can be:

```text
online event
      ↓
connection manager
      ↓
synchronization queue
      ↓
controlled requests
```

rather than:

```text
online event
   ├── component A → request
   ├── component B → request
   ├── component C → request
   └── component D → request
```

The correct architecture depends on application complexity.

---

# 88. Connection State Machine

For larger applications, a state machine can be useful:

```text
online
offline
checking
syncing
sync-failed
```

Example conceptual flow:

```text
offline
   ↓
online
   ↓
checking
   ↓
syncing
   ├── success → online
   └── failure → sync-failed
```

This model is much more expressive than one Boolean.

---

# 89. Practical Connection State Object

Instead of:

```js
const isOnline = true;
```

a larger app might maintain:

```js
const connection = {
  status: "online",
  lastCheckedAt: null,
  lastSyncAt: null,
  syncError: null,
};
```

This gives the UI more accurate information.

Do not add this complexity unless the product actually needs it.

---

# 90. Online/Offline and Real-Time Applications

Real-time applications such as chat, dashboards, and collaborative tools have more demanding connectivity requirements.

They may need to detect:

```text
Browser network state
        +
WebSocket connection state
        +
server connection state
        +
authentication state
```

For example:

```text
Browser online
    +
WebSocket disconnected
```

still means the real-time feature is unavailable.

Therefore, `navigator.onLine` should not be treated as the full connection state of a real-time application.

---

# 91. WebSocket Example

Conceptually:

```js
const socket = new WebSocket(
  "wss://example.com"
);

socket.addEventListener("open", () => {
  console.log("WebSocket connected.");
});

socket.addEventListener("close", () => {
  console.log("WebSocket disconnected.");
});
```

The WebSocket's own connection state is more directly relevant to real-time communication than `navigator.onLine`.

---

# 92. Fetch vs WebSocket Connectivity

A browser can be:

```text
Online
```

while:

```text
WebSocket disconnected
```

or:

```text
API request failing
```

Therefore, think in terms of **connection scope**.

Different subsystems can have different connectivity states.

---

# 93. Offline Status Is a Signal, Not a Guarantee

This is the core concept.

```text
navigator.onLine
        ↓
Browser-level network-state signal
```

Not:

```text
navigator.onLine
        ↓
Guaranteed internet
        ↓
Guaranteed API
        ↓
Guaranteed backend
```

Keeping this distinction clear prevents many architectural mistakes.

---

# 94. React Relevance

This topic is important for React because it teaches several core patterns:

* using browser APIs
* subscribing to events
* storing external state in React
* effect cleanup
* custom hooks
* client/server boundaries
* asynchronous request handling

A typical flow is:

```text
window event
     ↓
useEffect listener
     ↓
setState
     ↓
React re-render
     ↓
UI update
```

This is a practical example of connecting an external browser system to React's state model.

---

# 95. Next.js Relevance

This topic is especially useful in Next.js because:

```js
navigator
window
```

are browser globals.

Therefore, you must understand:

```text
Server Component
        vs
Client Component
```

A component that listens to:

```js
window.addEventListener("online", ...)
```

belongs on the client side.

The underlying Web API is simple.

The important Next.js lesson is understanding where the API can execute.

---

# 96. Quick Reference

## Current online state

```js
navigator.onLine;
```

Returns:

```js
true
```

or:

```js
false
```

---

## Online event

```js
window.addEventListener("online", () => {
  console.log("Online state detected.");
});
```

---

## Offline event

```js
window.addEventListener("offline", () => {
  console.log("Offline state detected.");
});
```

---

## Remove event listeners

```js
window.removeEventListener("online", handler);
window.removeEventListener("offline", handler);
```

---

## Basic status check

```js
const isOnline = navigator.onLine;
```

---

# 97. Best Practices

### Use `navigator.onLine` as a signal

Do not treat it as a complete internet health check.

### Listen for both transitions

```js
online
offline
```

### Initialize the current state

Read:

```js
navigator.onLine
```

when the client starts.

### Clean up listeners

Especially inside React effects.

### Handle actual request failures

Use `fetch()` error handling independently.

### Separate network and server state

```text
Browser online
≠
API healthy
```

### Avoid aggressive retry loops

Use controlled retry logic and backoff.

### Preserve user work

Offline UX should protect drafts and important user input where appropriate.

### Centralize synchronization when needed

Avoid reconnect storms in large applications.

---

# 98. Final Mental Model

The browser gives you three useful pieces:

```text
navigator.onLine
        ↓
Current browser-reported network state

online event
        ↓
Browser transitioned to online

offline event
        ↓
Browser transitioned to offline
```

But production connectivity is more complex:

```text
Browser network state
        ↓
Actual request
        ↓
Server response
        ↓
Application state
        ↓
Synchronization state
```

The most important rule is:

> `navigator.onLine` tells you what the browser believes about its network connection; it does not guarantee that the internet, your API, your backend, or your database is reachable.

For React and Next.js, the practical pattern is:

```text
Browser event
      ↓
Client-side listener
      ↓
React state
      ↓
UI
```

combined with:

```text
Actual network request
      ↓
Success / failure handling
      ↓
Application-specific connection state
```

That combination gives you a much more reliable architecture than treating online/offline status as a simple global truth.
