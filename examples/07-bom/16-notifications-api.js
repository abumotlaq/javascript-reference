"use strict";

// Notification API availability
console.log(
"Notifications available:",
"Notification" in window
);

// Current permission
if ("Notification" in window) {
console.log(
"Notification permission:",
Notification.permission
);
}

// Secure context
console.log(
"Secure context:",
window.isSecureContext
);

// Request notification permission
const permissionButton =
document.querySelector(
"#request-permission"
);

if (
permissionButton &&
"Notification" in window
) {
permissionButton.addEventListener(
"click",
async () => {
try {
const permission =
await Notification.requestPermission();

```
    console.log(
      "Notification permission:",
      permission
    );
  } catch (error) {
    console.error(
      "Permission request failed:",
      error.message
    );
  }
}
```

);
}

// Permission check helper
function canUseNotifications() {
return (
"Notification" in window &&
Notification.permission ===
"granted"
);
}

console.log(
"Can use notifications:",
canUseNotifications()
);

// Create a basic notification
function showNotification(title) {
if (!canUseNotifications()) {
console.log(
"Notifications are not available."
);

```
return;
```

}

const notification =
new Notification(title);

console.log(
"Notification created:",
notification
);

return notification;
}

const basicNotificationButton =
document.querySelector(
"#basic-notification"
);

if (basicNotificationButton) {
basicNotificationButton.addEventListener(
"click",
() => {
showNotification(
"JavaScript Reference"
);
}
);
}

// Notification with body
function showNotificationWithBody() {
if (!canUseNotifications()) {
return;
}

new Notification(
"JavaScript Reference",
{
body:
"Hello, Osama Abu Motlaq!",
}
);
}

const bodyNotificationButton =
document.querySelector(
"#body-notification"
);

if (bodyNotificationButton) {
bodyNotificationButton.addEventListener(
"click",
showNotificationWithBody
);
}

// Notification with icon
const iconNotificationButton =
document.querySelector(
"#icon-notification"
);

if (iconNotificationButton) {
iconNotificationButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "New Project",
    {
      body:
        "JavaScript Reference was updated.",
      icon:
        "/favicon.ico",
    }
  );
}
```

);
}

// Notification with badge
const badgeNotificationButton =
document.querySelector(
"#badge-notification"
);

if (badgeNotificationButton) {
badgeNotificationButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "New Update",
    {
      body:
        "A new JavaScript example is available.",
      badge:
        "/favicon.ico",
    }
  );
}
```

);
}

// Notification with tag
const taggedNotificationButton =
document.querySelector(
"#tagged-notification"
);

if (taggedNotificationButton) {
taggedNotificationButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "Build Status",
    {
      body:
        "JavaScript Reference is ready.",
      tag: "build-status",
    }
  );
}
```

);
}

// Notification with renotify
const renotifyButton =
document.querySelector(
"#renotify"
);

if (renotifyButton) {
renotifyButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "New Message",
    {
      body:
        "You have a new message.",
      tag: "messages",
      renotify: true,
    }
  );
}
```

);
}

// Notification requiring interaction
const interactionButton =
document.querySelector(
"#require-interaction"
);

if (interactionButton) {
interactionButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "Action Required",
    {
      body:
        "Please review this update.",
      requireInteraction: true,
    }
  );
}
```

);
}

// Silent notification
const silentButton =
document.querySelector(
"#silent-notification"
);

if (silentButton) {
silentButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "Silent Update",
    {
      body:
        "This notification should not request a sound.",
      silent: true,
    }
  );
}
```

);
}

// Notification with custom data
const dataButton =
document.querySelector(
"#notification-data"
);

if (dataButton) {
dataButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  const notification =
    new Notification(
      "Project Updated",
      {
        body:
          "The JavaScript Reference project was updated.",
        data: {
          project:
            "javascript-reference",
          section:
            "07-bom",
        },
      }
    );

  notification.addEventListener(
    "show",
    () => {
      console.log(
        "Notification shown."
      );
    }
  );

  notification.addEventListener(
    "close",
    () => {
      console.log(
        "Notification closed."
      );
    }
  );

  console.log(
    "Notification data:",
    notification.data
  );
}
```

);
}

// Listen for notification show event
function handleNotificationShow() {
console.log(
"Notification was shown."
);
}

// Listen for notification click
function handleNotificationClick(
event
) {
console.log(
"Notification clicked."
);

console.log(
"Notification data:",
event.target.data
);
}

// Listen for notification close
function handleNotificationClose() {
console.log(
"Notification was closed."
);
}

// Notification events
const eventNotificationButton =
document.querySelector(
"#notification-events"
);

if (eventNotificationButton) {
eventNotificationButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  const notification =
    new Notification(
      "Notification Events",
      {
        body:
          "Interact with this notification.",
        data: {
          name: "Osama Abu Motlaq",
        },
      }
    );

  notification.addEventListener(
    "show",
    handleNotificationShow
  );

  notification.addEventListener(
    "click",
    handleNotificationClick
  );

  notification.addEventListener(
    "close",
    handleNotificationClose
  );
}
```

);
}

// Close a notification programmatically
let activeNotification = null;

const openClosableButton =
document.querySelector(
"#open-closable"
);

if (openClosableButton) {
openClosableButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  activeNotification =
    new Notification(
      "Closable Notification",
      {
        body:
          "This notification can be closed later.",
      }
    );

  console.log(
    "Active notification:",
    activeNotification
  );
}
```

);
}

const closeNotificationButton =
document.querySelector(
"#close-notification"
);

if (closeNotificationButton) {
closeNotificationButton.addEventListener(
"click",
() => {
if (!activeNotification) {
return;
}

```
  activeNotification.close();
  activeNotification = null;

  console.log(
    "Notification closed programmatically."
  );
}
```

);
}

// Automatically close a notification
const autoCloseButton =
document.querySelector(
"#auto-close"
);

if (autoCloseButton) {
autoCloseButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  const notification =
    new Notification(
      "Temporary Notification",
      {
        body:
          "This notification will close automatically.",
      }
    );

  setTimeout(() => {
    notification.close();
  }, 3000);
}
```

);
}

// Notification permission states
function getNotificationPermission() {
if (!("Notification" in window)) {
return "unsupported";
}

return Notification.permission;
}

console.log(
"Notification permission state:",
getNotificationPermission()
);

// Handle permission state
function describeNotificationPermission() {
const permission =
getNotificationPermission();

switch (permission) {
case "granted":
console.log(
"Notifications are allowed."
);
break;

```
case "denied":
  console.log(
    "Notifications are blocked."
  );
  break;

case "default":
  console.log(
    "Notification permission has not been decided."
  );
  break;

case "unsupported":
  console.log(
    "Notifications are not supported."
  );
  break;

default:
  console.log(
    "Unknown notification state."
  );
```

}
}

describeNotificationPermission();

// Request and show notification
async function requestAndNotify(
title,
options = {}
) {
if (!("Notification" in window)) {
return false;
}

if (
Notification.permission ===
"default"
) {
const permission =
await Notification.requestPermission();

```
if (permission !== "granted") {
  return false;
}
```

}

if (
Notification.permission !==
"granted"
) {
return false;
}

new Notification(
title,
options
);

return true;
}

const notifyButton =
document.querySelector(
"#notify-button"
);

if (notifyButton) {
notifyButton.addEventListener(
"click",
async () => {
const success =
await requestAndNotify(
"JavaScript Reference",
{
body:
"Notification sent successfully.",
}
);

```
  console.log(
    "Notification sent:",
    success
  );
}
```

);
}

// Notification from a user action
const actionNotificationButton =
document.querySelector(
"#action-notification"
);

if (actionNotificationButton) {
actionNotificationButton.addEventListener(
"click",
async () => {
const permission =
await Notification.requestPermission();

```
  if (permission !== "granted") {
    console.log(
      "Notification permission was not granted."
    );

    return;
  }

  new Notification(
    "User Action Completed",
    {
      body:
        "Osama Abu Motlaq triggered this notification.",
    }
  );
}
```

);
}

// Notification with timestamp
const timestampNotificationButton =
document.querySelector(
"#timestamp-notification"
);

if (timestampNotificationButton) {
timestampNotificationButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  const time =
    new Date().toLocaleTimeString();

  new Notification(
    "Current Time",
    {
      body: `Current time: ${time}`,
    }
  );
}
```

);
}

// Notification with current URL
const urlNotificationButton =
document.querySelector(
"#url-notification"
);

if (urlNotificationButton) {
urlNotificationButton.addEventListener(
"click",
() => {
if (!canUseNotifications()) {
return;
}

```
  new Notification(
    "Current Page",
    {
      body:
        window.location.href,
    }
  );
}
```

);
}

// Notification permission change helper
function watchNotificationPermission() {
if (!("permissions" in navigator)) {
return;
}

navigator.permissions
.query({
name: "notifications",
})
.then((permission) => {
console.log(
"Permission state:",
permission.state
);

```
  permission.addEventListener(
    "change",
    () => {
      console.log(
        "Permission changed:",
        permission.state
      );
    }
  );
})
.catch((error) => {
  console.error(
    "Permission query failed:",
    error.message
  );
});
```

}

watchNotificationPermission();

// Notification support snapshot
const notificationSnapshot = {
supported:
"Notification" in window,
permission:
"Notification" in window
? Notification.permission
: "unsupported",
secureContext:
window.isSecureContext,
};

console.log(
"Notification snapshot:",
notificationSnapshot
);
