# Notifications API

The Notifications API allows web applications to display notifications through the browser and operating system.

A notification can appear outside the normal webpage interface and may remain visible even when the user is not actively looking at the page.

Typical use cases include:

* New messages
* Background task completion
* Important status changes
* Reminders
* Alerts
* Collaboration updates
* Delivery status
* System-like application notifications

The main browser API is:

```js id="8kp2md"
Notification
```

Common operations include:

```js id="g7v4q2"
Notification.permission
Notification.requestPermission()
new Notification()
```

For persistent notifications associated with service workers, applications can also use:

```js id="p3x8c1"
ServiceWorkerRegistration.showNotification()
```

Notifications are permission-sensitive because they can interrupt the user's attention.

---

# 1. What Is a Browser Notification?

A browser notification is a message presented through the browser and operating system's notification system.

Conceptually:

```text id="6w2m8q"
Web Application
      ↓
Browser Notifications API
      ↓
Operating System
      ↓
User sees notification
```

This is different from displaying:

```html id="y8f3m1"
<div class="notification">
  New message
</div>
```

inside the page.

An in-page message is controlled entirely by your website.

A system notification is controlled partly by the browser and operating system.

---

# 2. Why Notifications Need Permission

Notifications can interrupt users even when they are not currently focused on your site.

For that reason, browsers do not normally allow websites to silently display notifications without permission.

The basic flow is:

```text id="m5c9r2"
Application
    ↓
Request permission
    ↓
User decision
    ↓
granted / denied / default
    ↓
Create notification if allowed
```

---

# 3. The `Notification` Object

The main API is available as:

```js id="q4v8n2"
Notification
```

You can inspect it:

```js id="t7m3c9"
console.log(Notification);
```

It provides:

* permission information
* permission requests
* notification construction
* notification-related events

---

# 4. Checking Notification Support

Feature detection:

```js id="p2m7x4"
if ("Notification" in window) {
  console.log(
    "Notifications are supported."
  );
}
```

This is preferable to assuming that every browser environment supports the API identically.

---

# 5. `Notification.permission`

Before requesting permission, inspect:

```js id="v8c3m1"
Notification.permission
```

Possible values are:

```text id="d5m9q2"
"granted"
"denied"
"default"
```

Conceptually:

```text id="r7x2p8"
granted
   ↓
Application may show notifications

denied
   ↓
Application cannot normally show notifications

default
   ↓
No permission decision has been granted
```

---

# 6. Example: Check Permission

```js id="j4n8c2"
if (
  Notification.permission ===
  "granted"
) {
  console.log(
    "Notifications are allowed."
  );
}
```

You can also handle all states:

```js id="m6p2v9"
switch (Notification.permission) {
  case "granted":
    console.log("Granted");
    break;

  case "denied":
    console.log("Denied");
    break;

  case "default":
    console.log("Not decided yet");
    break;
}
```

---

# 7. `Notification.requestPermission()`

Use:

```js id="x3c7m5"
Notification.requestPermission()
```

to request notification permission.

It returns a Promise.

Example:

```js id="k8p2v4"
const permission =
  await Notification.requestPermission();

console.log(permission);
```

The result is one of:

```text id="q5m9c2"
"granted"
"denied"
"default"
```

---

# 8. Basic Permission Request

```js id="f4m8x2"
async function requestNotificationPermission() {
  const permission =
    await Notification.requestPermission();

  console.log(permission);
}
```

This does not itself create a notification.

It only requests permission.

The application must handle the result.

---

# 9. Permission Is Not the Notification

These are separate operations:

```js id="p7m3c8"
await Notification.requestPermission();
```

asks for permission.

While:

```js id="n2x8v5"
new Notification("Hello");
```

creates the notification.

Conceptually:

```text id="c9m4q2"
Permission
    ↓
Notification creation
```

---

# 10. Why Permission Should Be Requested Carefully

Do not immediately request notifications as soon as a page loads just because the API is available.

For example:

```js id="v5p8c2"
window.addEventListener("load", () => {
  Notification.requestPermission();
});
```

This can create a poor user experience because the user has not yet been given context.

A better flow is often:

```text id="r3m7x9"
User sees:
"Get notified about new messages"
        ↓
User clicks:
"Enable notifications"
        ↓
Request permission
```

---

# 11. Permission UX

A good interface might display:

```text id="k2x8m4"
Get notified about new messages.

[Enable notifications]
```

After the user clicks:

```text id="t7p3c9"
Browser permission prompt
```

This gives the user a clear reason for the request.

---

# 12. Do Not Repeatedly Request Permission

If the user has already denied notifications, repeatedly calling:

```js id="m8c2v5"
Notification.requestPermission();
```

may not provide a useful experience and browsers may limit how permission prompts are handled.

Instead:

```text id="j4m7x2"
Permission denied
       ↓
Explain the feature
       ↓
Provide instructions for enabling permission
```

The exact browser UI for changing permissions is controlled by the browser.

---

# 13. Creating a Notification

After permission is granted:

```js id="y6p3m8"
const notification =
  new Notification(
    "Hello, Osama Abu Motlaq!"
  );
```

This asks the browser to display a notification.

---

# 14. Basic Notification

```js id="r2m8c4"
if (
  Notification.permission ===
  "granted"
) {
  new Notification(
    "Hello, Osama Abu Motlaq!"
  );
}
```

The browser and operating system control the visual presentation.

You do not get complete control over how the native notification looks.

---

# 15. Notification Body

The second argument can provide options:

```js id="c7m3v9"
new Notification(
  "New message",
  {
    body: "You have a new message.",
  }
);
```

The `body` provides additional text.

---

# 16. Notification Icon

You can specify an icon:

```js id="m4p8x2"
new Notification(
  "New message",
  {
    body: "You have a new message.",
    icon: "/icon.png",
  }
);
```

The actual appearance depends on the browser and operating system.

---

# 17. Notification Badge

Some environments support a badge option:

```js id="q8c2m5"
new Notification(
  "New message",
  {
    badge: "/badge.png",
  }
);
```

The badge is a small representation used by supported platforms.

Support and visual behavior vary by environment.

---

# 18. Notification Image

Some implementations support a larger image:

```js id="v3m7p9"
new Notification(
  "New project",
  {
    body: "A new project was created.",
    image: "/project.png",
  }
);
```

Support and presentation can vary.

Do not assume every platform displays the image identically.

---

# 19. Notification Tag

A tag can identify related notifications:

```js id="j5c8m2"
new Notification(
  "New message",
  {
    body: "You have a new message.",
    tag: "messages",
  }
);
```

The browser can use the tag to associate notifications.

This can help reduce repeated notifications representing the same logical event.

---

# 20. Notification `renotify`

When using tags, some applications may use:

```js id="m7x2p5"
new Notification(
  "New message",
  {
    body: "You have another message.",
    tag: "messages",
    renotify: true,
  }
);
```

This indicates that the notification should notify the user again when replacing an existing notification, where supported.

This is an advanced option and should be used deliberately.

---

# 21. Notification `requireInteraction`

Some browser environments support:

```js id="q4m8c2"
new Notification(
  "Important update",
  {
    body: "Please review this update.",
    requireInteraction: true,
  }
);
```

This can request that the notification remain visible until the user interacts with it.

The browser or operating system may still apply its own policies.

Do not treat this as a guarantee of indefinite visibility.

---

# 22. Notification `silent`

A notification may specify:

```js id="p6c9m3"
new Notification(
  "Background update",
  {
    body: "The update completed.",
    silent: true,
  }
);
```

This asks for silent behavior where supported.

Browser and operating-system behavior can differ.

---

# 23. Notification `data`

A notification can carry application-defined data:

```js id="x2m7v4"
const notification =
  new Notification(
    "New project",
    {
      body: "A project was created.",
      data: {
        projectId: 123,
      },
    }
  );
```

This can be useful when handling later interaction.

For example:

```js id="c8m3p7"
notification.onclick = () => {
  console.log(
    notification.data.projectId
  );
};
```

The exact structure can be any cloneable value supported by the API.

---

# 24. Notification Events

Notification instances can expose event handlers such as:

```text id="k5p8m2"
onclick
onshow
onerror
onclose
```

Example:

```js id="v4m7c2"
const notification =
  new Notification(
    "Hello, Osama Abu Motlaq!"
  );

notification.onclick = () => {
  console.log(
    "Notification clicked."
  );
};
```

Event availability and behavior can vary by browser.

---

# 25. `onclick`

Use `onclick` to react when the user activates the notification.

Example:

```js id="r8m2x5"
const notification =
  new Notification(
    "New project",
    {
      body: "Click to open the project.",
    }
  );

notification.onclick = () => {
  console.log(
    "Notification clicked."
  );
};
```

A more complete application may navigate the user to relevant content.

---

# 26. `onclose`

You can react when the notification is closed:

```js id="j3c7m9"
notification.onclose = () => {
  console.log(
    "Notification closed."
  );
};
```

This can be useful for analytics or internal state management.

Do not assume that a close event always represents a user explicitly dismissing it; behavior depends on the browser and notification lifecycle.

---

# 27. `onerror`

An error handler can help detect notification failures:

```js id="m6p2v8"
notification.onerror = (
  event
) => {
  console.error(
    "Notification error:",
    event
  );
};
```

The application should not rely entirely on browser-specific event behavior.

---

# 28. `onshow`

Some implementations expose an event when the notification becomes visible:

```js id="q8m3c5"
notification.onshow = () => {
  console.log(
    "Notification shown."
  );
};
```

Support and exact timing can vary.

---

# 29. Closing a Notification

A page-created notification can be closed programmatically:

```js id="x4p8m2"
const notification =
  new Notification(
    "Temporary notification"
  );

setTimeout(() => {
  notification.close();
}, 3000);
```

This is useful when your application controls the lifetime of a transient notification.

---

# 30. Notification Lifecycle

Conceptually:

```text id="f7m3c8"
Create
  ↓
Browser / OS displays
  ↓
User sees notification
  ↓
User interacts or notification closes
  ↓
Notification lifecycle ends
```

The browser and operating system can influence the exact behavior.

---

# 31. `Notification.close()`

Example:

```js id="p2m8v4"
const notification =
  new Notification(
    "Hello"
  );

notification.close();
```

This requests that the notification be closed.

The browser remains responsible for the actual presentation environment.

---

# 32. Notification Options Example

A more complete notification:

```js id="c5m7x2"
const notification =
  new Notification(
    "Osama Abu Motlaq",
    {
      body:
        "Your portfolio project is ready.",
      icon: "/icons/icon-192.png",
      badge: "/icons/badge-72.png",
      tag: "portfolio-update",
      data: {
        type: "project",
        id: 42,
      },
    }
  );
```

The supported options depend on the browser and platform.

---

# 33. `Notification` vs In-Page UI

Native notification:

```js id="m8p3c7"
new Notification(
  "New message"
);
```

Application UI:

```jsx id="q2m7v9"
<div className="toast">
  New message
</div>
```

They solve different problems.

Use in-page UI for:

* immediate application feedback
* forms
* validation
* normal workflow status

Use system notifications when the user benefits from being notified outside the active page.

---

# 34. Notifications Are Not Toasts

A toast:

```text id="r6m2c8"
appears inside the webpage
```

A notification:

```text id="v3p7x1"
appears through the browser/OS notification system
```

A good application often uses both.

For example:

```text id="j8m4c2"
User is viewing the page
    ↓
Use in-page notification

User is away from the page
    ↓
Use system notification when appropriate
```

---

# 35. Persistent Notifications

A page-created notification:

```js id="m5c8x2"
new Notification(...)
```

belongs to the page context.

For notifications that should be associated with a service worker and persist beyond the page's immediate lifecycle, use:

```js id="q7p3m9"
registration.showNotification()
```

This is especially important for web applications that need notifications while the page is not currently active.

---

# 36. Service Worker Notifications

The service worker API provides:

```js id="n4m8c2"
self.registration.showNotification(
  "New message",
  {
    body: "You have a new message.",
  }
);
```

This is a different architecture from:

```js id="v6c2p8"
new Notification(...)
```

The service-worker approach is commonly used for richer web push and persistent notification workflows.

---

# 37. Registering a Service Worker

A page can register a service worker:

```js id="x8m3q4"
const registration =
  await navigator.serviceWorker.register(
    "/sw.js"
  );
```

Then a service worker can use:

```js id="c5p7m2"
self.registration.showNotification(
  "Hello, Osama Abu Motlaq!"
);
```

The service worker runs separately from the normal page JavaScript lifecycle.

---

# 38. Why Service Workers Matter

A normal page may no longer be active when a background notification needs to be displayed.

A service worker can participate in events outside the normal page lifecycle.

Conceptually:

```text id="m7c2x8"
Server event
      ↓
Push infrastructure
      ↓
Service Worker
      ↓
showNotification()
      ↓
Browser / OS
      ↓
User
```

This is the foundation of many modern web push notification systems.

---

# 39. Page Notifications vs Service Worker Notifications

| Feature                         | `new Notification()` | `showNotification()` |
| ------------------------------- | -------------------- | -------------------- |
| Created by page                 | Yes                  | No                   |
| Created by service worker       | No                   | Yes                  |
| Useful while page is active     | Yes                  | Yes                  |
| Persistent background workflows | Limited              | Better suited        |
| Push notification architecture  | Not by itself        | Commonly used        |
| Requires service worker         | No                   | Yes                  |

---

# 40. Push Notifications Are a Larger System

Calling:

```js id="z5m8c2"
new Notification(...)
```

does not create a full push notification system.

Push normally involves:

```text id="q3p7m1"
Application
      ↓
Service worker
      ↓
Push subscription
      ↓
Push service
      ↓
Backend
      ↓
Push event
      ↓
Service worker
      ↓
showNotification()
```

This is significantly more complex than a local notification.

---

# 41. Notification Permission Does Not Equal Push Subscription

These are separate concepts:

```text id="w4m8c2"
Notification permission
```

and:

```text id="j7p3x5"
Push subscription
```

A user may allow notifications without your application having an active push subscription.

The application must manage both concepts correctly.

---

# 42. `ServiceWorkerRegistration.showNotification()`

Example:

```js id="c8m2v7"
const registration =
  await navigator.serviceWorker.ready;

await registration.showNotification(
  "New message",
  {
    body: "You have a new message.",
  }
);
```

This creates a notification through the service worker registration.

---

# 43. Notification Click Handling in a Service Worker

Inside a service worker:

```js id="m4p8c2"
self.addEventListener(
  "notificationclick",
  (event) => {
    console.log(
      "Notification clicked."
    );
  }
);
```

This lets the service worker react to notification interaction.

It is especially useful for navigating the user to an appropriate page.

---

# 44. Notification Close Handling in a Service Worker

Similarly:

```js id="x7c3m9"
self.addEventListener(
  "notificationclose",
  (event) => {
    console.log(
      "Notification closed."
    );
  }
);
```

This can be used for application-specific logic.

---

# 45. Opening a Page from a Notification

A service worker may use client-window APIs to focus or open a page.

Conceptually:

```js id="q5m8c2"
self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    event.waitUntil(
      clients.openWindow("/messages")
    );
  }
);
```

This pattern is commonly used to direct users to the relevant application screen.

---

# 46. Why `event.waitUntil()` Matters

Service worker event handlers can be terminated when the browser determines that the event work is complete.

`event.waitUntil()` tells the browser:

```text id="m3c8p7"
This asynchronous operation is part of this event.
Please keep the service worker event alive until it completes.
```

Example:

```js id="h7m2x5"
event.waitUntil(
  clients.openWindow("/messages")
);
```

This is a key service-worker concept.

---

# 47. Notification Actions

Service worker notifications can support action buttons in supported environments.

Example:

```js id="v4p8c2"
await registration.showNotification(
  "New message",
  {
    body: "A new message arrived.",
    actions: [
      {
        action: "open",
        title: "Open",
      },
      {
        action: "dismiss",
        title: "Dismiss",
      },
    ],
  }
);
```

The browser and operating system decide exactly how actions are displayed.

---

# 48. Handling Notification Actions

A service worker can inspect:

```js id="j6m3q8"
event.action
```

Example:

```js id="c2p7v5"
self.addEventListener(
  "notificationclick",
  (event) => {
    if (
      event.action === "open"
    ) {
      event.waitUntil(
        clients.openWindow("/messages")
      );
    }
  }
);
```

This supports richer notification workflows.

---

# 49. Notification `data` with Service Workers

A notification can carry application-defined data:

```js id="m8c4p2"
await registration.showNotification(
  "New project",
  {
    body: "A new project was created.",
    data: {
      projectId: 42,
    },
  }
);
```

Then:

```js id="x5m7c3"
self.addEventListener(
  "notificationclick",
  (event) => {
    const projectId =
      event.notification.data.projectId;

    console.log(projectId);
  }
);
```

This helps connect a notification to application data.

---

# 50. Notification Tags in Service Workers

Example:

```js id="p3m8v2"
await registration.showNotification(
  "Messages",
  {
    body: "You have new messages.",
    tag: "messages",
  }
);
```

Tags can help group or replace logically related notifications.

This is useful when your application would otherwise create many duplicate alerts.

---

# 51. Avoid Notification Spam

An application that creates notifications every time something changes can quickly become annoying.

Bad design:

```text id="q7c2m8"
New message
New message
New message
New message
New message
...
```

Better:

```text id="x4m8p3"
New messages (5)
```

or:

```text id="c6m2v9"
You have new messages
```

Use grouping and tags where appropriate.

---

# 52. Notification Frequency Matters

Before sending a notification, ask:

```text id="m3p7c8"
Is this:
- important?
- timely?
- actionable?
- expected?
```

If the answer is no, in-page feedback may be better.

Notifications are attention-sensitive UI.

---

# 53. Notification Design Principles

A useful notification should answer:

```text id="r8m3c2"
What happened?
Why does it matter?
What can the user do?
```

For example:

```text id="p6c2m7"
New project deployed

Your portfolio deployment completed successfully.

[Open project]
```

The actual available actions depend on the notification system and application architecture.

---

# 54. Do Not Put Too Much Content in Notifications

Notifications are not full application screens.

Avoid enormous messages such as:

```text id="x4m7p2"
300-word notification body...
```

Instead:

```text id="m8c3v5"
Brief summary
      ↓
Open application
      ↓
Full details
```

---

# 55. Notification Click Should Have Meaning

A notification that opens the application but gives no useful context creates friction.

For example:

```text id="q7m2c8"
New message
```

could open:

```text id="v4p8m2"
/messages/123
```

rather than simply:

```text id="k3c7m5"
/
```

when the application knows the relevant destination.

---

# 56. Notification Security

Notification content can contain sensitive information.

Avoid exposing secrets such as:

```text id="p5m8c2"
password reset token
authentication token
full financial details
```

because notifications can be visible on:

* lock screens
* shared screens
* notification centers
* other surfaces controlled by the OS

Keep notification content minimal.

---

# 57. Privacy and Lock Screens

Suppose the application sends:

```text id="j8m3q5"
New bank transfer:
$5,000
Account ending 1234
```

This could be visible to people near the user's device.

A more privacy-conscious notification may say:

```text id="c2m7v8"
New account activity
```

and require the user to open the authenticated application for details.

The correct level of detail depends on the product and threat model.

---

# 58. Notification Data Should Not Be Trusted

If a notification contains:

```js id="w4m8c2"
data: {
  projectId: 42
}
```

the receiving client should still validate the associated resource before displaying sensitive information.

A notification identifier is not an authorization mechanism.

---

# 59. Notification Permission Is Not Authentication

This is important:

```text id="m6p2x8"
Notification permission
≠
User authentication
```

A site being allowed to send notifications does not prove who the user is.

Authentication and authorization must be handled separately.

---

# 60. Notifications and Service Worker Security

Service worker code is powerful because it can respond to events beyond the current page.

Therefore:

* keep service worker code minimal
* validate event data
* avoid unsafe URL handling
* protect authentication flows
* control notification destinations

The service worker is still client-side code and cannot be trusted as a security boundary.

---

# 61. Notification Permission and HTTPS

Production notification functionality should use an appropriate secure context.

For web push architectures, secure deployment is especially important.

Use:

```text id="y3m8c2"
HTTPS
```

for production applications.

Local development environments receive special treatment by browser security rules.

---

# 62. Notification Permission and User Activation

Browsers may limit permission requests that are not associated with an appropriate user interaction.

A strong UX pattern is:

```text id="k8m2p4"
User clicks "Enable notifications"
        ↓
requestPermission()
```

This is clearer than:

```text id="v7c3m9"
Page loads
        ↓
requestPermission()
```

---

# 63. Permission State and UI

A UI can reflect:

```js id="m4x8c2"
Notification.permission
```

For example:

```text id="q7m3p5"
default
→ Show "Enable notifications"

granted
→ Show "Notifications enabled"

denied
→ Show settings/help information
```

The exact UX should be adapted to the browser's permission model.

---

# 64. Do Not Build a Permanent "Enable" Loop

Avoid:

```text id="c8m2v6"
Permission denied
↓
Enable notifications?
↓
Permission denied
↓
Enable notifications?
↓
...
```

Instead, explain how the user can re-enable notifications through browser settings if the application still needs them.

---

# 65. Notification Permission Is Browser-Controlled

The browser controls the permission UI.

Your website cannot fully customize:

```text id="m7p3c8"
Allow / Block
```

The exact prompt differs by browser and operating system.

Your responsibility is to:

* request at an appropriate time
* explain the reason
* handle the result

---

# 66. Notification API in React

A simple client-side React example:

```jsx id="x4m8c2"
"use client";

import {
  useState,
} from "react";

export default function NotificationButton() {
  const [status, setStatus] =
    useState(
      Notification.permission
    );

  async function enableNotifications() {
    const permission =
      await Notification.requestPermission();

    setStatus(permission);

    if (permission === "granted") {
      new Notification(
        "Hello, Osama Abu Motlaq!",
        {
          body:
            "Notifications are enabled.",
        }
      );
    }
  }

  return (
    <div>
      <button
        onClick={
          enableNotifications
        }
      >
        Enable notifications
      </button>

      <p>
        Permission: {status}
      </p>
    </div>
  );
}
```

This example demonstrates:

* permission
* state
* client-side browser API
* notification creation

---

# 67. Avoid Browser API Access During Server Rendering

This is unsafe in a server-rendered environment:

```js id="m8p2c7"
const [status, setStatus] =
  useState(
    Notification.permission
  );
```

if the component can be evaluated where `Notification` does not exist.

In Next.js, browser-specific values should be accessed on the client.

---

# 68. Safer React Initialization

A safer pattern is:

```jsx id="q3m7v8"
"use client";

import {
  useEffect,
  useState,
} from "react";

export default function NotificationSettings() {
  const [permission, setPermission] =
    useState("default");

  useEffect(() => {
    if (
      "Notification" in window
    ) {
      setPermission(
        Notification.permission
      );
    }
  }, []);

  return (
    <p>
      Permission: {permission}
    </p>
  );
}
```

This delays access to the browser-specific object until the client runs the effect.

---

# 69. React Notification Hook

A reusable hook might expose:

```jsx id="v5m8c2"
{
  permission,
  requestPermission,
  notify
}
```

Conceptually:

```jsx id="x7p3m9"
function useNotifications() {
  // Manage browser notification state.
}
```

Then components can use:

```jsx id="m4c8q2"
const {
  permission,
  requestPermission,
  notify,
} = useNotifications();
```

This centralizes browser-specific logic.

---

# 70. Example Notification Hook

```jsx id="r3m7x5"
import {
  useEffect,
  useState,
} from "react";

export function useNotifications() {
  const [permission, setPermission] =
    useState("default");

  useEffect(() => {
    if (
      "Notification" in window
    ) {
      setPermission(
        Notification.permission
      );
    }
  }, []);

  async function requestPermission() {
    if (
      !("Notification" in window)
    ) {
      return "unsupported";
    }

    const result =
      await Notification.requestPermission();

    setPermission(result);

    return result;
  }

  function notify(title, options) {
    if (
      !("Notification" in window) ||
      Notification.permission !==
        "granted"
    ) {
      return null;
    }

    return new Notification(
      title,
      options
    );
  }

  return {
    permission,
    requestPermission,
    notify,
  };
}
```

A production hook would also consider browser restrictions and errors more explicitly.

---

# 71. Notification Hook Usage

```jsx id="c8m2p6"
function NotificationSettings() {
  const {
    permission,
    requestPermission,
    notify,
  } = useNotifications();

  async function handleEnable() {
    const result =
      await requestPermission();

    if (result === "granted") {
      notify(
        "Notifications enabled",
        {
          body:
            "Hello, Osama Abu Motlaq!",
        }
      );
    }
  }

  return (
    <button
      onClick={handleEnable}
    >
      Enable notifications
    </button>
  );
}
```

This keeps the component focused on application behavior rather than browser details.

---

# 72. Notification State in React

You may model notification permission as:

```text id="x5m8c2"
unsupported
default
granted
denied
```

This is more expressive than:

```js id="m3q7p8"
const enabled = true;
```

because the browser has more than two relevant states.

---

# 73. React Notification Permission State Machine

Conceptually:

```text id="q8m2c5"
unsupported
     ↓
default
     ↓
request
  ↙     ↘
granted  denied
```

The application can display different UI for each state.

---

# 74. Notification Delivery State

Permission alone is not enough for sophisticated push systems.

You may additionally need:

```text id="v4m8c2"
permission
subscription
connection
delivery
```

For example:

```text id="j7p3m9"
permission = granted
subscription = missing
```

means:

```text id="c8m2v6"
The browser allows notifications,
but the application may not yet have a push subscription.
```

---

# 75. Web Push Architecture

A typical push architecture:

```text id="m4p8c2"
User enables notifications
          ↓
Browser permission
          ↓
Push subscription
          ↓
Subscription sent to backend
          ↓
Backend stores subscription
          ↓
Server sends push
          ↓
Browser receives push
          ↓
Service Worker
          ↓
showNotification()
```

This is substantially more complex than local page notifications.

---

# 76. Push Subscription

A service worker-based application may obtain a push subscription through the Push API.

Conceptually:

```js id="x2m7c8"
const subscription =
  await registration.pushManager.subscribe(
    options
  );
```

The resulting subscription contains information that the backend can use to send push messages through the relevant push infrastructure.

The full implementation requires appropriate web push configuration.

---

# 77. Store Push Subscriptions Carefully

A backend may store information associated with the push subscription.

It should:

* associate it with the correct user
* protect access
* handle expiration/change
* remove stale subscriptions
* avoid exposing subscription records unnecessarily

Push subscriptions are application infrastructure data.

---

# 78. Notification Actions and Deep Linking

A strong notification flow often looks like:

```text id="r5m8c2"
Notification
     ↓
Click
     ↓
Service worker
     ↓
Determine resource
     ↓
Open/focus correct page
     ↓
User sees relevant content
```

This is more useful than opening the homepage every time.

---

# 79. Focusing an Existing Window

A service worker can inspect existing clients and potentially focus a matching page.

Conceptually:

```js id="p3m7c8"
event.waitUntil(
  clients.matchAll({
    type: "window",
  }).then((clientList) => {
    // Find an appropriate client
  })
);
```

This can prevent opening duplicate tabs.

---

# 80. Notification Click Handling Strategy

A robust notification click handler may:

1. close the notification
2. inspect the action
3. identify the target URL
4. find an existing matching client
5. focus it if possible
6. otherwise open a new window

This gives a better user experience than always opening a new page.

---

# 81. Notification Action Example

```js id="y8m2c5"
self.addEventListener(
  "notificationclick",
  (event) => {
    const action =
      event.action;

    event.notification.close();

    if (action === "open") {
      event.waitUntil(
        clients.openWindow(
          "/messages"
        )
      );
    }
  }
);
```

This is a simplified example.

Real applications should account for existing windows and application state.

---

# 82. Notification Payload Design

A notification's data should contain only what is necessary.

For example:

```js id="v4c8m2"
data: {
  type: "message",
  id: "123",
}
```

is often preferable to:

```js id="m7p3x9"
data: {
  entireMessage: "...",
  privateProfile: "...",
  accountData: "...",
}
```

Keep notification payloads minimal.

---

# 83. Do Not Put Sensitive Data into Push Payloads Unnecessarily

Push messages can pass through infrastructure that your application does not fully control.

Avoid placing unnecessary sensitive information into notification payloads.

A safer pattern can be:

```text id="c3m8v2"
Push:
"New message available"

Open app
     ↓
Authenticated API request
     ↓
Fetch full message
```

This can reduce data exposure.

---

# 84. Notification Permission and UX Timing

A good notification strategy often asks for permission after the user understands the value.

For example:

```text id="p8m2c7"
User opens messages page
        ↓
Sees:
"Get notified about new messages"
        ↓
Clicks enable
```

This is generally more meaningful than immediately asking on the homepage.

---

# 85. Notification Frequency and Attention

Notifications should be treated as a scarce attention resource.

A useful design asks:

```text id="m4q7c2"
Would the user be happy to be interrupted for this event?
```

If not, use:

* in-app activity feed
* badge count
* toast
* status indicator

instead.

---

# 86. Notification vs Badge

A notification:

```text id="x3m8p2"
interrupts attention
```

A badge:

```text id="v7c2m5"
signals something exists
```

For frequent low-priority events, a badge may be better than repeated system notifications.

---

# 87. Notification Grouping

Suppose there are multiple new events:

```text id="j5m8c2"
Message from Osama Abu Motlaq
Message from Osama Abu Motlaq
Message from Osama Abu Motlaq
```

A better strategy may be:

```text id="p2c7m4"
3 new messages
```

The exact grouping mechanism depends on the platform and application design.

Tags can help with logical replacement/grouping.

---

# 88. Notification and Application State

A notification is not the source of truth.

Suppose:

```text id="m3x8c2"
Notification says:
"New message"
```

The application should still fetch current data after opening the app.

Why?

Because the data may have changed since the notification was created.

The notification is a signal, not necessarily the canonical state.

---

# 89. Notifications and Stale Data

A notification may be delayed.

For example:

```text id="q7m2p5"
Message created
↓
Push delayed
↓
User opens notification
```

The application should refresh or fetch current state.

Do not assume notification payloads are permanently authoritative.

---

# 90. Notification Delivery Is Not Guaranteed UI Timing

A system notification is subject to:

* browser policies
* operating-system policies
* device state
* user settings
* network conditions
* service worker lifecycle

Therefore, applications should not assume:

```text id="x8c3m7"
send push
↓
user sees it immediately
```

Notifications are best-effort user communication mechanisms.

---

# 91. Notifications and Offline Devices

A user's device may receive a push notification later when the network becomes available.

This is one reason push systems should be designed around:

```text id="m4p8c2"
event occurred
+
notification delivery
+
application state
```

rather than assuming real-time delivery.

---

# 92. Notification State vs Data State

For example:

```text id="r7m2c8"
Database:
5 unread messages

Notification:
"You have a new message"
```

The application should query the database when the user opens the app.

The notification is merely a prompt to return to the application.

---

# 93. Supabase and Notifications

A full-stack application using Supabase might follow:

```text id="c4m8p2"
Supabase/PostgreSQL
       ↓
New event
       ↓
Backend / Edge Function
       ↓
Push provider
       ↓
Service Worker
       ↓
showNotification()
```

The browser Notifications API is only one part of the architecture.

---

# 94. Do Not Assume Supabase Sends Browser Notifications Automatically

Database changes do not automatically become browser notifications.

You need an application-level delivery pipeline involving:

* event detection
* push subscription
* backend logic
* push service
* service worker

The exact implementation depends on the stack.

---

# 95. Notification Security Checklist

Before enabling notifications, ask:

```text id="m2c7v9"
1. Did the user explicitly opt in?
2. Is the permission state known?
3. Is the message necessary?
4. Does the notification reveal sensitive information?
5. Is the destination authenticated?
6. Is the notification data minimal?
7. Is duplicate notification behavior controlled?
8. Can the user disable the feature?
```

---

# 96. Common Mistakes

## Mistake 1: Requesting permission immediately

```js id="p8m3c2"
Notification.requestPermission();
```

on every page load can create a poor user experience.

---

## Mistake 2: Ignoring permission state

Do not assume:

```js id="v4m7c1"
Notification.permission === "granted"
```

without checking.

---

## Mistake 3: Treating permission as push subscription

Permission and push subscription are separate concepts.

---

## Mistake 4: Sending too many notifications

Notification spam causes users to disable notifications entirely.

---

## Mistake 5: Putting sensitive information in notifications

Lock screens and notification centers can expose notification content.

---

## Mistake 6: Using notifications for normal in-app feedback

A toast or inline status may be more appropriate.

---

## Mistake 7: Accessing `Notification` during server rendering

Browser APIs are not available on the server.

---

## Mistake 8: Assuming notification delivery is immediate

Browsers and operating systems control delivery and presentation.

---

## Mistake 9: Trusting notification data for authorization

Notification data is not a security boundary.

---

## Mistake 10: Forgetting service worker cleanup and lifecycle

Service worker architecture introduces its own lifecycle and event handling considerations.

---

# 97. Best Practices

### Ask for permission in context

Explain the value before requesting access.

### Respect the user's decision

Do not aggressively re-prompt after denial.

### Check support and permission

Use:

```js id="g4m8c2"
"Notification" in window
```

and:

```js id="z7m3p8"
Notification.permission
```

### Use page notifications for simple active-page cases

Use:

```js id="v3c8m2"
new Notification(...)
```

when the page itself is the relevant context.

### Use service workers for persistent/background notification architectures

Use:

```js id="m8p2c7"
registration.showNotification(...)
```

where appropriate.

### Keep notification content concise

Notifications are attention-oriented, not full pages.

### Avoid sensitive information

Assume notification content may be visible outside the authenticated application.

### Handle clicks meaningfully

Open the relevant resource rather than an unrelated destination.

### Group related notifications

Avoid duplicates and notification spam.

### Keep payloads minimal

Use identifiers rather than embedding large or sensitive objects.

### Validate application state when the user opens the app

Treat notifications as signals, not the canonical data source.

---

# 98. Quick Reference

## Check support

```js id="c7m2x4"
"Notification" in window
```

## Check permission

```js id="m5p8c2"
Notification.permission
```

## Request permission

```js id="v3x7m1"
const permission =
  await Notification.requestPermission();
```

## Create notification

```js id="q8c2m5"
new Notification(
  "Hello, Osama Abu Motlaq!"
);
```

## Create with options

```js id="r4m7p2"
new Notification(
  "New message",
  {
    body: "You have a new message.",
    icon: "/icon.png",
  }
);
```

## Close notification

```js id="m2c8v5"
notification.close();
```

## Notification click

```js id="x7p3m2"
notification.onclick = () => {
  console.log("Clicked.");
};
```

## Service worker notification

```js id="v5m8c2"
await registration.showNotification(
  "New message",
  {
    body: "You have a new message.",
  }
);
```

## Service worker click event

```js id="q3c7m9"
self.addEventListener(
  "notificationclick",
  (event) => {
    // Handle click.
  }
);
```

---

# 99. React Relevance

Notifications are highly relevant to React because they combine:

* browser APIs
* permissions
* event handlers
* asynchronous operations
* application state
* user feedback
* client/server boundaries

A typical React flow is:

```text id="k8m3c2"
User clicks "Enable"
        ↓
requestPermission()
        ↓
permission result
        ↓
React state update
        ↓
User clicks "Notify"
        ↓
new Notification()
```

For more advanced systems:

```text id="p4m8x2"
React application
      ↓
Service worker
      ↓
Push subscription
      ↓
Backend
      ↓
Push event
      ↓
Notification
```

Understanding the native API makes notification libraries and frameworks much easier to understand.

---

# 100. Next.js Relevance

This topic is important in Next.js because `Notification` is browser-only.

A component using:

```js id="m7c3p8"
Notification.permission
```

or:

```js id="v2m8c5"
new Notification(...)
```

must execute on the client.

A basic pattern:

```jsx id="q4m7x2"
"use client";

export default function NotificationButton() {
  async function handleClick() {
    const permission =
      await Notification.requestPermission();

    if (
      permission === "granted"
    ) {
      new Notification(
        "Hello, Osama Abu Motlaq!"
      );
    }
  }

  return (
    <button onClick={handleClick}>
      Enable notifications
    </button>
  );
}
```

The important Next.js concept is:

```text id="r8m2c5"
Browser-only API
      ↓
Client Component
```

---

# 101. Service Workers and Next.js

Service workers operate outside the normal React component lifecycle.

Conceptually:

```text id="x3m7p8"
Next.js application
      ↓
register service worker
      ↓
service worker
      ↓
push / notification events
```

Do not put service-worker event handlers inside normal React component code.

Keep service worker logic in the service worker itself.

---

# 102. React vs Service Worker Responsibilities

A useful separation:

```text id="m5c8x2"
React
├── Permission UI
├── Enable/disable settings
├── In-app status
└── Notification preferences

Service Worker
├── Push events
├── Background notification display
├── Notification clicks
└── Notification lifecycle events
```

This separation keeps the architecture clear.

---

# 103. Final Mental Model

The Notifications API has two main layers.

## Page Notifications

```text id="v7m2c4"
Client JavaScript
      ↓
Notification.requestPermission()
      ↓
new Notification()
      ↓
Browser / OS
```

Best for simple notifications associated with an active page.

## Service Worker Notifications

```text id="q4m8p2"
Push / background event
      ↓
Service Worker
      ↓
showNotification()
      ↓
Browser / OS
      ↓
User
```

Best for persistent/background notification architectures.

The key concepts are:

> Notification permission must be explicitly granted by the user.

> `Notification.permission` reports the current browser permission state.

> `Notification.requestPermission()` requests permission and returns a Promise.

> `new Notification()` creates a page-associated notification when permitted.

> `ServiceWorkerRegistration.showNotification()` is the service-worker mechanism for persistent notification workflows.

> Notification permission is different from push subscription.

> Notifications are attention-sensitive UI and should not be used for every application event.

> Notification content may appear outside the application, including on lock screens, so sensitive information should be minimized.

> A notification is a signal, not the canonical source of application data.

> In React, permission and notification state can be represented with React state, while browser APIs are called from client-side event handlers.

> In Next.js, browser Notification APIs belong in Client Components, while service worker logic belongs in the service worker.

A useful full-stack mental model is:

```text id="c8m2p7"
User
  ↓
React / Next.js Client
  ↓
Notification permission
  ↓
Push subscription
  ↓
Backend
  ↓
Push service
  ↓
Service Worker
  ↓
showNotification()
  ↓
Browser / OS
  ↓
User interaction
  ↓
Relevant page in the application
```

This is the foundation for building notification features without confusing browser permissions, React state, service workers, and backend push delivery.
