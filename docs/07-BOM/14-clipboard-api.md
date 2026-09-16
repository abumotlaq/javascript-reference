# Clipboard API

The Clipboard API allows web applications to read from and write to the user's system clipboard.

The clipboard is the temporary data area used by the operating system for operations such as:

* Copy
* Cut
* Paste

Modern browsers expose clipboard functionality primarily through:

```js
navigator.clipboard
```

Common operations include:

```js
navigator.clipboard.writeText()
navigator.clipboard.readText()
navigator.clipboard.write()
navigator.clipboard.read()
```

The Clipboard API is asynchronous and Promise-based.

Example:

```js
await navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq!"
);
```

Clipboard access is security-sensitive because it allows web pages to interact with data that may have come from outside the page.

---

# 1. Why the Clipboard API Exists

Older web applications often used techniques such as:

```js
document.execCommand("copy");
```

Modern applications should generally prefer the Clipboard API:

```js
navigator.clipboard.writeText(text);
```

The modern API provides a clearer Promise-based interface and supports richer clipboard formats.

The basic model is:

```text
Application
    ↓
navigator.clipboard
    ↓
System clipboard
```

---

# 2. The Clipboard Object

The clipboard is available through:

```js
navigator.clipboard
```

Example:

```js
console.log(navigator.clipboard);
```

The API is normally available in supported browser environments when the page meets the required security and permission conditions.

---

# 3. Writing Text to the Clipboard

The simplest operation is copying text.

```js
navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq!"
);
```

Because the method returns a Promise, you can use:

```js
await navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq!"
);
```

or:

```js
navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq!"
).then(() => {
  console.log("Text copied.");
});
```

---

# 4. `writeText()`

## Syntax

```js
navigator.clipboard.writeText(text);
```

The method attempts to replace the current clipboard contents with text.

Example:

```js
async function copyText() {
  await navigator.clipboard.writeText(
    "Hello, Osama Abu Motlaq!"
  );

  console.log("Copied.");
}
```

---

# 5. `writeText()` Returns a Promise

`writeText()` is asynchronous.

Example:

```js
const result =
  navigator.clipboard.writeText("Hello");
```

`result` is a Promise.

Therefore:

```js
await navigator.clipboard.writeText("Hello");
```

can be used inside an `async` function.

Example:

```js
async function copyMessage() {
  try {
    await navigator.clipboard.writeText(
      "Hello, Osama Abu Motlaq!"
    );

    console.log("Copy successful.");
  } catch (error) {
    console.error("Copy failed:", error);
  }
}
```

---

# 6. Why Clipboard Operations Are Asynchronous

Clipboard operations interact with browser-controlled and operating-system-level resources.

The browser may need to:

* check security requirements
* check permissions
* interact with the OS clipboard
* process clipboard formats

Therefore, the API uses Promises rather than returning the clipboard result synchronously.

---

# 7. Basic Copy Button

A common application pattern:

```html
<button id="copy">
  Copy
</button>
```

JavaScript:

```js
const button = document.querySelector("#copy");

button.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(
      "Hello, Osama Abu Motlaq!"
    );

    console.log("Copied.");
  } catch (error) {
    console.error("Copy failed:", error);
  }
});
```

The user triggers the action through a button.

This is important because browsers may restrict clipboard operations that are not associated with an appropriate user interaction.

---

# 8. User Activation

Clipboard access is security-sensitive.

Browsers can require user activation for some clipboard operations.

A common pattern is:

```js
button.addEventListener("click", async () => {
  await navigator.clipboard.writeText(text);
});
```

This is preferable to attempting to copy arbitrary data automatically when the page loads.

For example, avoid designing applications around:

```js
window.addEventListener("load", async () => {
  await navigator.clipboard.writeText("...");
});
```

Clipboard behavior is subject to browser security policies and may be rejected.

---

# 9. Handling Clipboard Errors

Never assume a write operation always succeeds.

Use:

```js
try {
  await navigator.clipboard.writeText(text);
} catch (error) {
  console.error(error);
}
```

Possible reasons for failure include:

* insecure context
* missing permission
* lack of user activation
* browser restrictions
* unsupported environment
* system-level clipboard problems

The application should handle failure gracefully.

---

# 10. Checking Clipboard API Availability

You can check whether the API exists:

```js
if (navigator.clipboard) {
  console.log("Clipboard API is available.");
}
```

A more specific check:

```js
if (
  navigator.clipboard &&
  navigator.clipboard.writeText
) {
  console.log("Text writing is supported.");
}
```

However, existence does not guarantee that the operation will be permitted.

This distinction is important:

```text
API exists
    ≠
operation is guaranteed to succeed
```

---

# 11. Secure Contexts

Modern Clipboard API functionality is generally restricted to secure contexts.

A secure context commonly means:

```text
HTTPS
```

Local development environments such as:

```text
localhost
```

can also be treated specially by browser security rules.

This means an application served from:

```text
https://example.com
```

has the expected security context for modern clipboard operations.

Do not assume arbitrary insecure HTTP origins have the same capabilities.

---

# 12. Checking `isSecureContext`

The browser provides:

```js
window.isSecureContext
```

Example:

```js
if (window.isSecureContext) {
  console.log("Secure context.");
} else {
  console.log("Not a secure context.");
}
```

This can help diagnose why certain browser APIs are unavailable.

---

# 13. Reading Text from the Clipboard

The corresponding read method is:

```js
navigator.clipboard.readText();
```

Example:

```js
async function readClipboard() {
  try {
    const text =
      await navigator.clipboard.readText();

    console.log(text);
  } catch (error) {
    console.error(
      "Clipboard read failed:",
      error
    );
  }
}
```

The result is a string.

---

# 14. `readText()` Returns a Promise

Example:

```js
const text =
  await navigator.clipboard.readText();
```

The Promise resolves with text from the clipboard when permitted.

Example:

```js
async function showClipboard() {
  try {
    const text =
      await navigator.clipboard.readText();

    document.querySelector(
      "#output"
    ).textContent = text;
  } catch (error) {
    console.error(error);
  }
}
```

---

# 15. Reading the Clipboard Is More Sensitive

Writing text to the clipboard is one thing.

Reading the clipboard is more sensitive because the clipboard may contain information copied from:

* password managers
* documents
* email
* private messages
* financial data
* other applications

Therefore, browsers apply stricter controls around clipboard reads.

An application should request clipboard data only when it genuinely needs it.

---

# 16. User Experience for Clipboard Reads

Do not silently inspect clipboard contents without a clear reason.

Prefer:

```text
[ Paste]
```

or:

```text
[ Read clipboard ]
```

over automatically reading clipboard data whenever a user visits a page.

Respect the sensitivity of clipboard contents.

---

# 17. `ClipboardItem`

The Clipboard API can work with more than plain text.

The `ClipboardItem` interface allows applications to work with different MIME types.

For example:

```js
const item = new ClipboardItem({
  "text/plain": new Blob(
    ["Hello, Osama Abu Motlaq!"],
    {
      type: "text/plain",
    }
  ),
});
```

This can then be written using:

```js
await navigator.clipboard.write([item]);
```

---

# 18. Writing Rich Clipboard Data

The low-level pattern looks like:

```js
const item = new ClipboardItem({
  "text/plain": new Blob(
    ["Hello, Osama Abu Motlaq!"],
    {
      type: "text/plain",
    }
  ),

  "text/html": new Blob(
    ["<strong>Hello, Osama Abu Motlaq!</strong>"],
    {
      type: "text/html",
    }
  ),
});

await navigator.clipboard.write([item]);
```

The application is providing multiple representations of the same clipboard content.

Applications can support richer copy-and-paste experiences this way.

---

# 19. Why Multiple MIME Types Matter

Suppose a user copies formatted content.

A destination that supports HTML may prefer:

```text
text/html
```

while a plain-text destination may use:

```text
text/plain
```

Providing both can make clipboard interoperability better.

Conceptually:

```text
Clipboard
├── text/plain
└── text/html
```

The receiving application chooses the representation it supports.

---

# 20. Reading Rich Clipboard Data

For richer content, the Clipboard API also supports:

```js
navigator.clipboard.read()
```

Example:

```js
const items =
  await navigator.clipboard.read();
```

Each returned item can expose the MIME types available.

Example:

```js
for (const item of items) {
  console.log(item.types);
}
```

Possible output:

```text
[
  "text/plain",
  "text/html"
]
```

---

# 21. Reading a Specific Clipboard Type

Example:

```js
const items =
  await navigator.clipboard.read();

for (const item of items) {
  if (
    item.types.includes("text/plain")
  ) {
    const blob =
      await item.getType("text/plain");

    const text =
      await blob.text();

    console.log(text);
  }
}
```

This demonstrates the richer Clipboard API model.

---

# 22. Copying HTML

Example:

```js
const html =
  "<strong>Hello, Osama Abu Motlaq!</strong>";

const plainText =
  "Hello, Osama Abu Motlaq!";

const item = new ClipboardItem({
  "text/plain": new Blob(
    [plainText],
    { type: "text/plain" }
  ),

  "text/html": new Blob(
    [html],
    { type: "text/html" }
  ),
});

await navigator.clipboard.write([item]);
```

The destination application may choose the representation it supports.

---

# 23. Copying Images

The Clipboard API can also work with images when the browser and operating environment support the required format.

A conceptual example:

```js
const response = await fetch(
  "/images/osama.png"
);

const blob = await response.blob();

const item = new ClipboardItem({
  [blob.type]: blob,
});

await navigator.clipboard.write([item]);
```

This copies the fetched image data to the clipboard when the environment permits it.

---

# 24. MIME Types

MIME types describe data formats.

Examples include:

```text
text/plain
text/html
image/png
image/jpeg
```

When using `ClipboardItem`, the MIME type tells the browser what kind of data is being supplied.

Example:

```js
new ClipboardItem({
  "image/png": pngBlob,
});
```

---

# 25. Clipboard Data Is External Input

Data read from the clipboard should be treated as untrusted input.

For example:

```js
const text =
  await navigator.clipboard.readText();
```

The text may contain:

* unexpected characters
* malicious-looking content
* huge amounts of data
* sensitive information
* formatted content

Do not assume clipboard data is safe simply because the user copied it.

---

# 26. Clipboard and `innerHTML`

Suppose clipboard content contains HTML.

Avoid blindly doing:

```js
element.innerHTML = htmlFromClipboard;
```

because HTML can contain active or dangerous content.

If the goal is plain text, prefer:

```js
element.textContent = text;
```

If HTML must be rendered, sanitize it according to the application's security requirements.

---

# 27. Clipboard Injection Risks

A classic example is copying a string that looks harmless:

```text
<img src=x onerror=alert("...")>
```

If an application takes arbitrary clipboard HTML and injects it into the DOM without proper sanitization, it can create an XSS vulnerability.

The important rule is:

> Clipboard data is untrusted data.

This is especially important for rich-text editors and paste handlers.

---

# 28. Intercepting Paste Events

Applications can respond to paste actions with the `paste` event.

Example:

```js
input.addEventListener(
  "paste",
  (event) => {
    console.log(
      "Paste event detected."
    );
  }
);
```

This is useful when an application needs to inspect or transform pasted content.

---

# 29. Reading Clipboard Data from a `paste` Event

A paste event provides access to clipboard-related data.

Example:

```js
input.addEventListener(
  "paste",
  (event) => {
    const text =
      event.clipboardData.getData(
        "text"
      );

    console.log(text);
  }
);
```

This is different from:

```js
navigator.clipboard.readText();
```

The first is tied to a specific paste interaction.

---

# 30. Clipboard API vs `ClipboardEvent`

There are two related concepts:

```text
navigator.clipboard
```

and:

```text
ClipboardEvent
```

The Clipboard API provides programmatic clipboard operations.

Clipboard events provide event-driven interaction with copy, cut, and paste actions.

Common events include:

```text
copy
cut
paste
```

---

# 31. The `copy` Event

You can listen for copying:

```js
document.addEventListener(
  "copy",
  () => {
    console.log("Copy event.");
  }
);
```

This is useful when an application needs to respond to a copy action.

---

# 32. The `cut` Event

```js
document.addEventListener(
  "cut",
  () => {
    console.log("Cut event.");
  }
);
```

This fires when a cut operation occurs in the relevant context.

---

# 33. The `paste` Event

```js
document.addEventListener(
  "paste",
  () => {
    console.log("Paste event.");
  }
);
```

Paste handling is especially common in:

* editors
* text inputs
* OTP fields
* code editors
* upload interfaces

---

# 34. `ClipboardEvent.clipboardData`

Clipboard events can provide a `DataTransfer`-like object through:

```js
event.clipboardData
```

Example:

```js
input.addEventListener(
  "paste",
  (event) => {
    console.log(
      event.clipboardData.types
    );
  }
);
```

This can reveal which clipboard formats are available.

---

# 35. Reading Plain Text from `clipboardData`

```js
input.addEventListener(
  "paste",
  (event) => {
    const text =
      event.clipboardData.getData(
        "text/plain"
      );

    console.log(text);
  }
);
```

This is useful when you only want plain text.

---

# 36. Preventing a Paste

A paste handler can prevent the browser's default insertion behavior:

```js
input.addEventListener(
  "paste",
  (event) => {
    event.preventDefault();

    console.log("Paste prevented.");
  }
);
```

This should only be done for a clear product requirement.

Preventing paste can negatively affect usability and accessibility.

---

# 37. Transforming Pasted Text

A legitimate use case is normalizing input.

Example:

```js
input.addEventListener(
  "paste",
  (event) => {
    event.preventDefault();

    const text =
      event.clipboardData
        .getData("text/plain")
        .trim();

    input.value = text;
  }
);
```

The application intercepts the paste and inserts a cleaned version.

For framework-controlled inputs, however, update the framework state rather than mutating DOM values directly.

---

# 38. React Paste Handling

React provides:

```jsx
onPaste
```

Example:

```jsx
function SearchInput() {
  function handlePaste(event) {
    const text =
      event.clipboardData.getData(
        "text/plain"
      );

    console.log(text);
  }

  return (
    <input
      onPaste={handlePaste}
    />
  );
}
```

This is preferable to manually registering a native paste listener on the input when React already owns the element.

---

# 39. React Copy Handling

React can also listen for copy events:

```jsx
function CopyArea() {
  function handleCopy(event) {
    console.log(
      "Copy detected."
    );
  }

  return (
    <div onCopy={handleCopy}>
      Copy this text.
    </div>
  );
}
```

This is useful when an application needs to observe copy interactions.

---

# 40. React Clipboard Write Example

A copy button can use the Clipboard API directly:

```jsx
"use client";

function CopyButton() {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        "Hello, Osama Abu Motlaq!"
      );

      console.log("Copied.");
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  }

  return (
    <button onClick={handleCopy}>
      Copy
    </button>
  );
}
```

The click handler is a natural place for the operation because it is directly associated with user interaction.

---

# 41. React Copy Feedback

A better user experience is to show temporary status.

```jsx
"use client";

import { useState } from "react";

function CopyButton() {
  const [copied, setCopied] =
    useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        "Hello, Osama Abu Motlaq!"
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
```

This combines:

* Clipboard API
* React state
* timer
* user feedback

---

# 42. Avoid Claiming Success Before the Promise Resolves

Incorrect:

```js
navigator.clipboard.writeText(text);

setCopied(true);
```

This can display:

```text
Copied!
```

before the operation actually succeeds.

Prefer:

```js
try {
  await navigator.clipboard.writeText(text);

  setCopied(true);
} catch (error) {
  setCopied(false);
}
```

The UI should reflect the real result.

---

# 43. Clipboard Utility Function

A reusable helper:

```js
async function copyText(text) {
  if (
    !navigator.clipboard ||
    !navigator.clipboard.writeText
  ) {
    throw new Error(
      "Clipboard API is not available."
    );
  }

  await navigator.clipboard.writeText(text);
}
```

Usage:

```js
try {
  await copyText(
    "Hello, Osama Abu Motlaq!"
  );

  console.log("Copied.");
} catch (error) {
  console.error(error);
}
```

This centralizes feature detection and operation.

---

# 44. Clipboard Read Utility

```js
async function readClipboardText() {
  if (
    !navigator.clipboard ||
    !navigator.clipboard.readText
  ) {
    throw new Error(
      "Clipboard reading is not available."
    );
  }

  return await navigator.clipboard.readText();
}
```

Usage:

```js
try {
  const text =
    await readClipboardText();

  console.log(text);
} catch (error) {
  console.error(error);
}
```

---

# 45. Clipboard API and Permissions

Browsers can apply permission policies to clipboard access.

The Permissions API can sometimes be used to inspect relevant permission state.

For example:

```js
const permission =
  await navigator.permissions.query({
    name: "clipboard-write",
  });

console.log(permission.state);
```

Depending on the browser and permission type, supported behavior can vary.

Do not assume every browser exposes identical permission details.

---

# 46. Permission States

When supported, a permission state can be:

```text
granted
denied
prompt
```

Conceptually:

```text
granted
   ↓
Operation may be allowed

prompt
   ↓
Browser may need to evaluate/request access

denied
   ↓
Operation may fail
```

Clipboard permissions are subject to browser-specific security policies.

---

# 47. Do Not Build Logic Around Permission Queries Alone

This is not enough:

```js
const permission =
  await navigator.permissions.query({
    name: "clipboard-write",
  });

if (permission.state === "granted") {
  // Assume success
}
```

You should still handle the actual clipboard operation:

```js
try {
  await navigator.clipboard.writeText(text);
} catch (error) {
  // Handle failure
}
```

Permissions can be context-sensitive, and successful permission inspection does not eliminate all possible failure modes.

---

# 48. Clipboard and Same-Origin

Clipboard access is governed by browser security rules rather than being equivalent to unrestricted same-origin data access.

A web page cannot simply treat the operating system clipboard like:

```js
localStorage
```

The browser mediates access.

The exact permissions and activation requirements depend on the operation.

---

# 49. Clipboard and Permissions Policy

Web applications can also be affected by browser permission policies and embedding contexts.

An embedded application such as an iframe may have different clipboard capabilities depending on how it is embedded and what permissions the embedding environment grants.

Therefore:

```text
Top-level page
≠
Embedded frame
```

when it comes to some privileged browser APIs.

---

# 50. Clipboard in an `<iframe>`

An embedded application may require appropriate permission configuration.

For example, an embedding document can control certain capabilities using iframe attributes such as:

```html
<iframe
  src="https://example.com"
  allow="clipboard-read; clipboard-write"
></iframe>
```

Actual browser behavior depends on the API, browser, security context, and embedding configuration.

---

# 51. Clipboard and Cross-Origin Security

Cross-origin applications do not automatically receive unrestricted clipboard access.

For example:

```text
https://app.example.com
```

and:

```text
https://other.example.com
```

are different origins.

Clipboard access remains subject to the browser's security model.

Never assume that cross-origin code can freely read or write clipboard data.

---

# 52. `execCommand("copy")`

Older code may contain:

```js
document.execCommand("copy");
```

This API comes from the older synchronous document editing command model.

Modern applications should prefer:

```js
await navigator.clipboard.writeText(text);
```

when available.

The Clipboard API is designed specifically for clipboard operations and provides a clearer asynchronous model.

---

# 53. Why `execCommand()` Is Still Seen

Many older tutorials use:

```js
document.execCommand("copy");
```

because the Clipboard API was not always available.

This explains why you may encounter code such as:

```js
textarea.select();
document.execCommand("copy");
```

in older projects.

You should understand the pattern for maintenance, but avoid choosing it for new application code without a specific compatibility reason.

---

# 54. The Old Textarea Copy Technique

A historical pattern looked like:

```js
const textarea =
  document.createElement("textarea");

textarea.value =
  "Hello, Osama Abu Motlaq!";

document.body.appendChild(textarea);

textarea.select();

document.execCommand("copy");

textarea.remove();
```

This technique has several disadvantages:

* imperative DOM manipulation
* awkward selection handling
* synchronous API
* more compatibility work
* weaker abstraction than the modern Clipboard API

The modern approach is much simpler:

```js
await navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq!"
);
```

---

# 55. Clipboard and Selection

The older copy technique depended on selecting text in the document.

The modern Clipboard API generally allows you to write text directly:

```js
await navigator.clipboard.writeText(text);
```

You do not need to create a hidden textarea just to copy a string.

---

# 56. Clipboard API and User Activation

This concept is important enough to repeat:

```text
User action
   ↓
Clipboard operation
```

is generally the safest application model.

Examples:

```text
Click "Copy"
Click "Paste"
Click "Read clipboard"
Keyboard-driven user action
```

By contrast:

```text
Page loads
   ↓
Automatically inspect clipboard
```

is much more sensitive and may be blocked.

---

# 57. Clipboard and Automatic Copying

Avoid automatically replacing the user's clipboard without a clear user action.

For example, this is poor UX:

```js
setInterval(() => {
  navigator.clipboard.writeText(
    "Unexpected content"
  );
}, 5000);
```

It is disruptive and may be rejected by browsers.

Clipboard access should be intentional.

---

# 58. Clipboard History Is Not Your Application Clipboard

Some operating systems provide clipboard history.

Your application is interacting with the current clipboard contents through browser APIs.

You should not assume the web page can:

* inspect arbitrary clipboard history
* access every previous copied item
* control the operating system's clipboard manager

Browser security restrictions prevent unrestricted access.

---

# 59. Clipboard and Sensitive Data

Clipboard contents may include:

* authentication codes
* email addresses
* passwords
* API keys
* addresses
* financial information

Applications should avoid collecting or logging clipboard contents unnecessarily.

Bad:

```js
console.log(
  await navigator.clipboard.readText()
);
```

in production diagnostics if the data may be sensitive.

Logging clipboard contents can create additional privacy and security exposure.

---

# 60. Clipboard and Passwords

Do not assume clipboard contents are safe simply because your page did not create them.

For example, a user may paste a password into a login field.

The application should:

* minimize retention
* avoid unnecessary logging
* use secure input controls
* avoid storing sensitive clipboard content unnecessarily

Clipboard handling should follow the same security principles as any other untrusted or sensitive input.

---

# 61. Clipboard and Large Data

Clipboard contents can be larger than expected.

An application should not assume:

```text
clipboard data
=
small string
```

For large pasted content:

* process carefully
* avoid unnecessary copies
* avoid expensive DOM operations
* validate size where appropriate

This is particularly relevant for rich editors.

---

# 62. Clipboard and Rich Text Editors

Rich text editors often need to support:

```text
plain text
rich text
images
links
formatting
```

Clipboard events and `ClipboardItem` can help support these workflows.

A robust editor may:

```text
Paste
 ↓
Inspect available formats
 ↓
Prefer safe supported representation
 ↓
Sanitize content
 ↓
Convert to editor model
 ↓
Update state
```

Security and normalization are essential.

---

# 63. Clipboard and File Data

Clipboard data can sometimes contain file-like information during paste operations.

For example:

```js
input.addEventListener(
  "paste",
  (event) => {
    const items =
      event.clipboardData.items;

    for (const item of items) {
      console.log(item.kind);
      console.log(item.type);
    }
  }
);
```

This can help applications detect pasted files or other data representations.

---

# 64. Clipboard `DataTransfer`

The clipboard event model exposes data using mechanisms related to `DataTransfer`.

For example:

```js
event.clipboardData.types
```

can expose available MIME types.

And:

```js
event.clipboardData.getData(
  "text/plain"
);
```

can retrieve text.

This is useful for event-driven paste processing.

---

# 65. `copy`, `cut`, and `paste` Are Events

The browser can dispatch:

```text
copy
cut
paste
```

These allow the application to observe or modify clipboard-related interactions in the context of the relevant event.

Example:

```js
element.addEventListener(
  "copy",
  handleCopy
);
```

---

# 66. Modifying Clipboard Data During `copy`

In a copy event, an application can sometimes provide custom clipboard data through the event's clipboard data object.

Example:

```js
element.addEventListener(
  "copy",
  (event) => {
    event.clipboardData.setData(
      "text/plain",
      "Hello, Osama Abu Motlaq!"
    );

    event.preventDefault();
  }
);
```

This replaces the default copied representation with application-defined text.

Use this only when there is a clear reason.

---

# 67. Custom Copy Formatting

A practical use case is adding additional information when users copy content.

For example, a documentation site might want copied text to include a source line.

Conceptually:

```text
Visible content:
JavaScript example

Copied content:
JavaScript example

Source: Osama Abu Motlaq
```

This can be implemented through copy event handling.

However, users generally expect copy to preserve useful content rather than silently manipulate it, so such behavior should be predictable.

---

# 68. Clipboard Event Security

If an application modifies copied data, it should avoid inserting:

* secrets
* hidden tracking identifiers
* unexpected content

without a legitimate purpose.

Clipboard customization should respect user expectations.

---

# 69. Clipboard and React Controlled Inputs

Suppose a React input handles paste:

```jsx
function SearchInput({ value, onChange }) {
  function handlePaste(event) {
    const text =
      event.clipboardData.getData(
        "text/plain"
      );

    console.log(text);
  }

  return (
    <input
      value={value}
      onChange={onChange}
      onPaste={handlePaste}
    />
  );
}
```

The input is controlled by React.

If you transform the pasted value, update the React state rather than directly assigning:

```js
event.target.value = ...
```

because React should remain the source of truth for a controlled input.

---

# 70. React Paste Transformation

Example:

```jsx
import { useState } from "react";

function SearchInput() {
  const [value, setValue] =
    useState("");

  function handlePaste(event) {
    event.preventDefault();

    const pasted =
      event.clipboardData
        .getData("text/plain")
        .trim();

    setValue(
      `${value}${pasted}`
    );
  }

  return (
    <input
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onPaste={handlePaste}
    />
  );
}
```

For more complex controlled-input logic, functional state updates can avoid stale state issues:

```js
setValue((currentValue) => {
  return `${currentValue}${pasted}`;
});
```

---

# 71. Next.js and Clipboard

The Clipboard API is browser-only.

In a Next.js application, a component using:

```js
navigator.clipboard
```

needs to execute on the client.

Example:

```jsx
"use client";

export default function CopyButton() {
  async function handleCopy() {
    await navigator.clipboard.writeText(
      "Hello, Osama Abu Motlaq!"
    );
  }

  return (
    <button onClick={handleCopy}>
      Copy
    </button>
  );
}
```

The important lesson is the server/client boundary.

---

# 72. Do Not Access Clipboard During Server Rendering

Avoid:

```js
const text =
  await navigator.clipboard.readText();
```

in code that runs during server rendering.

The server does not have the user's browser clipboard.

Clipboard access is inherently client-side.

---

# 73. Clipboard and Server APIs

A common architecture is:

```text
Browser clipboard
       ↓
Client component
       ↓
Validate/process data
       ↓
API request
       ↓
Server
```

For example:

```text
Paste text
   ↓
React state
   ↓
Validate
   ↓
POST /api/...
```

This keeps clipboard access where it belongs while allowing the server to process trusted application data after validation.

---

# 74. Never Trust Clipboard Data on the Server

Suppose a browser sends:

```js
fetch("/api/import", {
  method: "POST",
  body: JSON.stringify({
    content: clipboardText,
  }),
});
```

The server must still validate the content.

The fact that the browser obtained the data from a clipboard does not make it trustworthy.

A malicious client can send arbitrary data directly to the API.

---

# 75. Clipboard API and Progressive Enhancement

A copy feature can be designed so that the application behaves gracefully when Clipboard API support is unavailable.

Example:

```js
async function copyText(text) {
  if (
    !navigator.clipboard?.writeText
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch {
    return false;
  }
}
```

The UI can then provide an alternative behavior or message.

---

# 76. Do Not Fake Copy Success

Bad:

```js
function handleCopy() {
  setCopied(true);
}
```

without actually verifying the clipboard write.

Better:

```js
async function handleCopy() {
  try {
    await navigator.clipboard.writeText(text);

    setCopied(true);
  } catch {
    setCopied(false);
  }
}
```

The interface should reflect the real operation.

---

# 77. Clipboard Feedback Patterns

Useful feedback can include:

```text
Copy
↓
Copied
↓
Copy
```

or:

```text
Copy failed
```

The feedback should be:

* immediate
* accurate
* accessible
* temporary when appropriate

Do not leave a misleading "Copied!" state visible indefinitely.

---

# 78. Accessibility for Copy Buttons

Use a real button:

```html
<button type="button">
  Copy
</button>
```

rather than:

```html
<div onclick="...">
  Copy
</div>
```

A native button supports:

* keyboard interaction
* focus
* semantics
* accessibility tools

Clipboard behavior should enhance the button rather than replace native interaction semantics.

---

# 79. Accessible Feedback

When copy succeeds, the status can be exposed to assistive technologies.

For example:

```jsx
<p role="status">
  {copied ? "Copied successfully." : ""}
</p>
```

This allows the UI to communicate the result without forcing the user to inspect visual changes.

The exact accessibility strategy should match the application.

---

# 80. Clipboard and Mobile Devices

Clipboard behavior can differ across mobile browsers and platforms.

Consider:

* touch interaction
* virtual keyboards
* permission prompts
* OS clipboard behavior
* browser restrictions

Do not assume desktop behavior is identical on every mobile environment.

Feature detection and graceful failure are important.

---

# 81. Clipboard and Embedded Browsing Contexts

Clipboard capabilities can differ when content is:

```text
top-level page
```

versus:

```text
iframe
```

Embedded contexts may require additional permission configuration.

Therefore, when a clipboard feature works in a standalone page but fails inside an iframe, inspect:

* secure context
* embedding permissions
* browser policies
* user activation

---

# 82. Clipboard and Cross-Browser Behavior

The general Clipboard API is standardized, but support and restrictions can differ between browsers and contexts.

Production applications should:

* feature-detect the API
* handle rejected Promises
* avoid relying on a single browser-specific behavior

Do not write:

```js
await navigator.clipboard.writeText(text);
```

and assume every environment will necessarily permit it.

---

# 83. Clipboard and `isSecureContext`

A useful diagnostic:

```js
console.log({
  secure: window.isSecureContext,
  clipboard: Boolean(
    navigator.clipboard
  ),
});
```

This can help identify common environment problems.

For example:

```text
secure: false
clipboard: false
```

may indicate an unsuitable environment for the intended Clipboard API operation.

---

# 84. Practical Example: Safe Copy Helper

```js
async function copyText(text) {
  if (!window.isSecureContext) {
    throw new Error(
      "Clipboard requires a secure context."
    );
  }

  if (
    !navigator.clipboard?.writeText
  ) {
    throw new Error(
      "Clipboard write is not supported."
    );
  }

  await navigator.clipboard.writeText(text);
}
```

Usage:

```js
try {
  await copyText(
    "Hello, Osama Abu Motlaq!"
  );

  console.log("Copied.");
} catch (error) {
  console.error(error);
}
```

---

# 85. Practical Example: Read Clipboard Button

```html
<button id="paste">
  Read Clipboard
</button>

<pre id="output"></pre>
```

JavaScript:

```js
const button =
  document.querySelector("#paste");

const output =
  document.querySelector("#output");

button.addEventListener(
  "click",
  async () => {
    try {
      const text =
        await navigator.clipboard.readText();

      output.textContent = text;
    } catch (error) {
      output.textContent =
        "Clipboard access failed.";
    }
  }
);
```

The `textContent` assignment avoids interpreting clipboard content as HTML.

---

# 86. Practical Example: Copy a URL

```js
async function copyCurrentUrl() {
  try {
    await navigator.clipboard.writeText(
      window.location.href
    );

    console.log("URL copied.");
  } catch (error) {
    console.error(error);
  }
}
```

This pattern is common for:

* share buttons
* copy-link actions
* documentation pages

---

# 87. Practical Example: Copy a Code Snippet

```js
const code = `
const name = "Osama Abu Motlaq";

console.log(name);
`;

await navigator.clipboard.writeText(code);
```

This is useful for documentation and code playground interfaces.

A production UI should also provide clear copy feedback.

---

# 88. Practical Example: Copy JSON

```js
const data = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const json = JSON.stringify(
  data,
  null,
  2
);

await navigator.clipboard.writeText(json);
```

This is useful in dashboards and developer tools.

---

# 89. Practical Example: Copy Markdown

```js
const markdown = `
# Osama Abu Motlaq

Frontend Developer
`;

await navigator.clipboard.writeText(
  markdown
);
```

This can be useful for:

* README generators
* developer tools
* documentation systems
* AI tooling

---

# 90. Clipboard and AI Applications

Modern AI products often include:

* copy generated text
* paste prompts
* copy code
* copy structured output

A common UI flow is:

```text
AI response
    ↓
Copy button
    ↓
Clipboard API
    ↓
Copied feedback
```

For pasted prompts:

```text
User clipboard
    ↓
Paste event
    ↓
Input state
    ↓
Validation
    ↓
AI request
```

The same security and accessibility principles apply.

---

# 91. Clipboard and Code Editors

Code-related interfaces often use:

```text
copy
paste
cut
```

and need to preserve:

* line breaks
* indentation
* Unicode characters
* plain-text formatting

For most code-copy functionality,:

```js
navigator.clipboard.writeText(code);
```

is sufficient.

---

# 92. Unicode and Clipboard

Clipboard text can contain Unicode:

```js
await navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq! 🚀"
);
```

The Clipboard API handles text as Unicode strings.

Applications should still consider how the destination application interprets the text.

---

# 93. Newlines and Clipboard Text

Multiline text is preserved as text:

```js
const text = `
Line one
Line two
Line three
`;

await navigator.clipboard.writeText(text);
```

This is useful for:

* code snippets
* logs
* documentation
* generated content

---

# 94. Clipboard and Whitespace

If an application needs normalized input:

```js
const text =
  await navigator.clipboard.readText();

const cleaned = text.trim();
```

But do not blindly trim clipboard data when whitespace is meaningful.

For example, trimming source code may alter intentional formatting.

Normalization should depend on the data type.

---

# 95. Clipboard and File Imports

Paste can sometimes be used as an input mechanism for images and files.

Conceptually:

```text
User copies image
      ↓
Paste event
      ↓
Clipboard items
      ↓
Detect image MIME type
      ↓
Read Blob
      ↓
Preview/upload
```

This can create useful workflows in image editors and document applications.

---

# 96. Clipboard Image Example

```js
input.addEventListener(
  "paste",
  async (event) => {
    const items =
      event.clipboardData.items;

    for (const item of items) {
      if (
        item.type.startsWith(
          "image/"
        )
      ) {
        const blob =
          item.getAsFile();

        if (!blob) {
          continue;
        }

        console.log(
          "Pasted image:",
          blob.type,
          blob.size
        );
      }
    }
  }
);
```

This is a common pattern for detecting pasted images.

---

# 97. Validate Pasted Files

A pasted file should still be validated.

Check things such as:

```text
MIME type
size
dimensions
content
```

Do not trust:

```js
blob.type
```

as the only server-side security validation.

When uploading to a backend, validate again on the server.

---

# 98. Clipboard and File Upload Architecture

A common flow:

```text
Clipboard
   ↓
Paste event
   ↓
Browser File/Blob
   ↓
Client validation
   ↓
Upload request
   ↓
Server validation
   ↓
Storage
```

This pattern is useful for image editors and upload interfaces.

---

# 99. Clipboard and Supabase

In a React or Next.js application using Supabase, a pasted image could conceptually follow:

```text
Clipboard
    ↓
Paste event
    ↓
Blob/File
    ↓
Client-side checks
    ↓
Supabase Storage upload
```

The important security principle is:

> Browser-side validation improves UX but does not replace server-side or storage-side security rules.

---

# 100. Clipboard and Authentication Tokens

Do not automatically copy authentication tokens or secrets merely because a user visits a page.

For example, avoid:

```js
navigator.clipboard.writeText(
  sessionToken
);
```

unless there is a deliberate user-facing feature that requires it and the security implications are understood.

Clipboard contents can remain available outside the application.

---

# 101. Clipboard Persistence

Once content is copied, the browser page does not control how long the operating system or other applications retain it.

Therefore, do not assume:

```text
Copy secret
↓
Delete from page
↓
Secret is gone
```

The clipboard may still contain it.

Sensitive data should be handled carefully.

---

# 102. Clipboard and Privacy

Avoid unnecessary clipboard reads.

A good principle is:

```text
Read only when necessary.
Write only when necessary.
Process minimally.
Do not log sensitive clipboard content.
```

This reduces privacy risk.

---

# 103. Clipboard and Focus

For some copy/paste workflows, focus determines where native paste operations occur.

For example:

```text
Input focused
↓
User presses Ctrl+V
↓
Input receives paste
```

Applications should generally preserve natural browser interaction rather than intercepting every clipboard action globally.

---

# 104. Do Not Block Paste Without a Reason

Bad UX:

```js
document.addEventListener(
  "paste",
  (event) => {
    event.preventDefault();
  }
);
```

across the entire application.

This can make normal user workflows frustrating.

Only intercept paste when the feature genuinely requires custom behavior.

---

# 105. Clipboard and Forms

Suppose a user pastes a phone number:

```text
+33 6 12 34 56 78
```

The application may want to normalize it.

However, do not assume every pasted value must be transformed identically.

A good form may:

1. accept the paste
2. normalize where appropriate
3. validate the result
4. show an error if invalid

This is generally better than blindly blocking paste.

---

# 106. Clipboard and UX Design

A good copy button should:

```text
1. Be clearly labeled
2. Respond immediately
3. Indicate success accurately
4. Handle failure
5. Remain keyboard accessible
6. Avoid unnecessary permissions or reads
```

For example:

```text
[ Copy ]

after success:

[ Copied! ]
```

This is simple and predictable.

---

# 107. Error Messaging

Avoid technical messages like:

```text
NotAllowedError
```

for ordinary users.

Prefer:

```text
We couldn't copy the content. Please try again.
```

Technical details can still be logged for development diagnostics when appropriate.

---

# 108. Clipboard API and Error Types

Clipboard operations can reject with errors such as permission-related or security-related failures.

Instead of depending exclusively on one browser-specific error string, applications should generally:

```js
try {
  await navigator.clipboard.writeText(text);
} catch (error) {
  // Provide a safe fallback UI.
}
```

Use the available error information for diagnostics when needed.

---

# 109. Clipboard and Race Conditions

Suppose multiple copy actions happen quickly:

```text
Copy A
Copy B
Copy C
```

The last successful write may become the final clipboard content.

If the UI displays asynchronous feedback, make sure the feedback corresponds to the relevant operation.

This is especially important when copy buttons trigger additional asynchronous processing.

---

# 110. Clipboard and Component Lifecycle

In React, a copy operation may outlive the moment when a component was clicked.

For example:

```js
const [copied, setCopied] =
  useState(false);
```

If the component unmounts before later state updates occur, lifecycle management matters.

For simple copy operations this is usually straightforward, but more complex clipboard workflows should still account for component lifetime.

---

# 111. Clipboard and Timers

A common pattern is:

```text
Copy
 ↓
Show "Copied!"
 ↓
Wait 2 seconds
 ↓
Restore "Copy"
```

Example:

```js
setCopied(true);

setTimeout(() => {
  setCopied(false);
}, 2000);
```

In React, timer cleanup may be necessary when this logic becomes more complex or the component can unmount while the timer is active.

---

# 112. Clipboard and `useEffect`

Do not put a normal user-triggered clipboard write into an effect simply because it needs to run client-side.

For example, this is conceptually wrong for a copy button:

```jsx
useEffect(() => {
  navigator.clipboard.writeText(text);
}, [text]);
```

It could repeatedly modify the user's clipboard whenever `text` changes.

Prefer:

```jsx
<button onClick={handleCopy}>
  Copy
</button>
```

and perform the clipboard write in the user-triggered handler.

---

# 113. Clipboard and Event Handlers in React

The preferred pattern is:

```jsx
function CopyButton({ text }) {
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <button onClick={handleCopy}>
      Copy
    </button>
  );
}
```

This keeps the side effect tied to the user's explicit action.

---

# 114. `navigator.clipboard.writeText()` vs `document.execCommand()`

| Feature                  | Clipboard API | `execCommand("copy")` |
| ------------------------ | ------------- | --------------------- |
| Modern API               | Yes           | Legacy                |
| Promise-based            | Yes           | No                    |
| Direct text API          | Yes           | No                    |
| Rich clipboard support   | Yes           | Limited/legacy        |
| Clear abstraction        | Yes           | No                    |
| Recommended for new code | Yes           | Generally no          |

For modern browser applications, prefer the Clipboard API.

---

# 115. Clipboard API and Browser Support

Applications should still feature-detect:

```js
if (
  navigator.clipboard?.writeText
) {
  // Use modern clipboard API.
}
```

Do not rely only on assumptions about the browser.

For environments where it is unavailable, provide an appropriate fallback or disable the feature gracefully.

---

# 116. Fallback Strategy

A fallback can be as simple as:

```js
async function copyText(text) {
  if (
    navigator.clipboard?.writeText
  ) {
    await navigator.clipboard.writeText(text);

    return true;
  }

  return false;
}
```

The UI can then communicate that copying is unavailable.

Older fallback techniques can be considered for specific compatibility requirements, but they should be treated as compatibility code rather than the default architecture.

---

# 117. Practical Utility: Copy with Boolean Result

```js
async function tryCopy(text) {
  if (
    !navigator.clipboard?.writeText
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch {
    return false;
  }
}
```

Usage:

```js
const success =
  await tryCopy(
    "Hello, Osama Abu Motlaq!"
  );

if (success) {
  console.log("Copied.");
} else {
  console.log("Copy failed.");
}
```

This creates a simple reusable abstraction.

---

# 118. Practical Utility: Read with Safe Failure

```js
async function tryReadClipboard() {
  if (
    !navigator.clipboard?.readText
  ) {
    return null;
  }

  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}
```

Usage:

```js
const text =
  await tryReadClipboard();

if (text !== null) {
  console.log(text);
}
```

This pattern distinguishes:

```text
No result / failure
```

from:

```text
Actual string
```

However, if the application needs to distinguish empty clipboard text from failure, use a richer result object.

---

# 119. Better Result Modeling

Instead of returning only:

```js
null
```

a more explicit helper could return:

```js
{
  success: true,
  value: "Hello"
}
```

or:

```js
{
  success: false,
  error
}
```

Example:

```js
async function readClipboardText() {
  try {
    const value =
      await navigator.clipboard.readText();

    return {
      success: true,
      value,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
```

This makes application state easier to reason about.

---

# 120. Browser Events and Clipboard

Clipboard functionality connects several browser concepts:

```text
User action
   ↓
click / copy / paste event
   ↓
Clipboard API
   ↓
Promise
   ↓
Application state
   ↓
UI feedback
```

This is an excellent example of how browser events and asynchronous APIs work together.

---

# 121. React Relevance

Clipboard API knowledge is useful in React for:

* copy buttons
* code blocks
* share links
* generated content
* AI interfaces
* OTP workflows
* editors
* paste handling
* image paste
* file paste

The important React concepts involved are:

```text
event handlers
state
async/await
effects and cleanup
controlled inputs
refs
client-side browser APIs
```

You should understand the native Clipboard API before relying entirely on a UI library's copy component.

---

# 122. Next.js Relevance

The Clipboard API matters in Next.js because it is browser-only.

A component using:

```js
navigator.clipboard
```

should execute on the client.

Typical architecture:

```text
Server Component
       ↓
Client Component
       ↓
User clicks Copy
       ↓
navigator.clipboard
       ↓
React state update
```

This is a practical example of the Next.js server/client boundary.

---

# 123. Supabase Relevance

Clipboard handling can also appear in applications backed by Supabase.

For example:

```text
User copies project URL
       ↓
Clipboard API

User pastes imported text
       ↓
React state
       ↓
Validation
       ↓
Supabase request
```

The Clipboard API belongs entirely to the browser layer.

Supabase belongs to the application/backend data layer.

Keep these responsibilities separate.

---

# 124. Security Checklist

Before using clipboard functionality, ask:

```text
1. Do I actually need clipboard access?
2. Is this operation triggered by the user?
3. Am I using a secure context?
4. Could the clipboard contain sensitive data?
5. Am I logging clipboard contents?
6. Is pasted HTML sanitized?
7. Am I validating pasted files?
8. Is server-side validation also present?
9. Am I handling rejected Promises?
10. Does the feature work correctly when the API is unavailable?
```

This checklist prevents many common mistakes.

---

# 125. Performance Checklist

For clipboard-heavy interfaces:

```text
Avoid unnecessary reads
Avoid repeated serialization
Avoid processing huge clipboard payloads
Avoid unnecessary DOM updates
Avoid repeated permission checks
Keep paste transformations efficient
```

Most ordinary copy operations are inexpensive.

The larger concerns usually involve rich content and large pasted data.

---

# 126. Common Mistakes

## Mistake 1: Assuming clipboard access always works

```js
await navigator.clipboard.writeText(text);
```

may fail.

Handle the Promise.

---

## Mistake 2: Copying automatically on page load

This may violate browser security expectations and is poor UX.

Prefer user-triggered actions.

---

## Mistake 3: Reading clipboard contents unnecessarily

Clipboard data can be sensitive.

Read only when needed.

---

## Mistake 4: Treating clipboard input as trusted

Pasted content is external input.

Validate and sanitize it.

---

## Mistake 5: Injecting pasted HTML directly

Avoid:

```js
element.innerHTML = pastedHtml;
```

unless the HTML has been appropriately sanitized and the architecture requires HTML rendering.

---

## Mistake 6: Claiming success before completion

Wait for:

```js
await navigator.clipboard.writeText(text);
```

before showing successful copy feedback.

---

## Mistake 7: Using native clipboard APIs during server rendering

`navigator.clipboard` is browser-only.

---

## Mistake 8: Overusing `preventDefault()` on paste

Only intercept paste when the application has a real reason.

---

# 127. Best Practices

### Prefer the modern Clipboard API

Use:

```js
navigator.clipboard.writeText()
navigator.clipboard.readText()
navigator.clipboard.write()
navigator.clipboard.read()
```

when appropriate.

### Trigger clipboard writes from intentional user actions

A copy button is a natural pattern.

### Handle Promise rejection

Clipboard operations can fail.

### Feature-detect the API

Use:

```js
navigator.clipboard?.writeText
```

when appropriate.

### Respect secure-context requirements

Use HTTPS in production.

### Treat clipboard data as untrusted

Validate and sanitize it.

### Avoid unnecessary clipboard reads

Clipboard contents may be sensitive.

### Use semantic buttons

Prefer:

```html
<button>
```

for copy actions.

### Give accurate feedback

Only show "Copied!" after the operation succeeds.

### Prefer React event handlers in React

Use:

```jsx
onClick
onPaste
onCopy
```

for React-owned elements.

### Keep browser-only logic on the client in Next.js

Do not attempt clipboard access during server rendering.

---

# 128. Quick Reference

## Write text

```js
await navigator.clipboard.writeText(
  "Hello, Osama Abu Motlaq!"
);
```

## Read text

```js
const text =
  await navigator.clipboard.readText();
```

## Write rich clipboard data

```js
const item = new ClipboardItem({
  "text/plain": new Blob(
    ["Hello"],
    { type: "text/plain" }
  ),
});

await navigator.clipboard.write([item]);
```

## Read rich clipboard data

```js
const items =
  await navigator.clipboard.read();
```

## Check support

```js
navigator.clipboard?.writeText
```

## Check secure context

```js
window.isSecureContext
```

## Listen for copy

```js
element.addEventListener(
  "copy",
  handleCopy
);
```

## Listen for paste

```js
element.addEventListener(
  "paste",
  handlePaste
);
```

## Read pasted text

```js
event.clipboardData.getData(
  "text/plain"
);
```

## Prevent default paste

```js
event.preventDefault();
```

Use this only when intentionally replacing the browser's normal behavior.

---

# 129. Final Mental Model

The Clipboard API can be understood as three layers:

```text
1. Clipboard API
   │
   ├── writeText()
   ├── readText()
   ├── write()
   └── read()

2. Clipboard Events
   │
   ├── copy
   ├── cut
   └── paste

3. Application UI
   │
   ├── Copy button
   ├── Paste handling
   ├── Feedback
   └── Validation
```

The core flow is:

```text
User action
      ↓
Browser permission/security checks
      ↓
Clipboard API
      ↓
Promise
      ↓
Application state
      ↓
UI feedback
```

The most important rules are:

> The Clipboard API is asynchronous.

> `navigator.clipboard.writeText()` is the primary modern API for copying text.

> `navigator.clipboard.readText()` reads clipboard text and is more sensitive because clipboard contents may be private.

> Clipboard access is subject to browser security, permissions, secure-context requirements, and user-activation rules.

> Clipboard data should always be treated as untrusted input.

> `copy`, `cut`, and `paste` are browser events that can be handled independently from direct Clipboard API calls.

> React applications should use React event handlers for React-owned elements and use native listeners only when integrating with external browser targets such as `window` or `document`.

> Next.js applications must perform Clipboard API access on the client because the server cannot access the user's browser clipboard.

For frontend development, the most useful mental model is:

```text
User clicks Copy
       ↓
onClick
       ↓
navigator.clipboard.writeText()
       ↓
await
       ↓
setCopied(true)
       ↓
React updates the UI
```

That small flow combines browser APIs, events, asynchronous JavaScript, React state, and client-side execution boundaries—the same concepts that appear throughout modern React and Next.js applications.
