# Browser Storage

## Introduction

Web applications often need to remember information on the client side.

Examples include:

* Theme preferences.
* UI preferences.
* Temporary drafts.
* Recently selected filters.
* Small pieces of application state.
* Non-sensitive cached values.
* Simple client-side settings.

Browsers provide several storage mechanisms.

The simplest traditional key/value APIs are:

```javascript id="p1x8vq"
localStorage;
sessionStorage;
```

Both are available through the browser's `Window` object:

```javascript id="z7f3qm"
window.localStorage;
window.sessionStorage;
```

and are commonly accessed without `window.`:

```javascript id="w6d2ka"
localStorage;
sessionStorage;
```

The two APIs look similar, but their persistence behavior is different.

A useful mental model is:

```text id="j8y4k1"
Browser
│
├── localStorage
│   └── Data persists across browser sessions
│
└── sessionStorage
    └── Data belongs to the current page session
```

The most important security principle is:

> **Browser storage is client-side storage, not a secure secret store.**

Anything stored in browser-accessible JavaScript storage may be accessible to JavaScript running in the same origin.

---

# 1. What Is Browser Storage?

Browser storage allows a web application to keep data on the user's device through browser-managed storage APIs.

The classic Web Storage APIs are:

```javascript id="2e1j0p"
localStorage;
sessionStorage;
```

They provide a simple key/value model:

```text id="4m8y7a"
Key
 ↓
String value
```

For example:

```javascript id="2m9t7x"
localStorage.setItem(
  "theme",
  "dark"
);
```

The browser stores:

```text id="v8p5c2"
theme → dark
```

---

# 2. The `Storage` Interface

Both:

```javascript id="6yk4qf"
localStorage;
```

and:

```javascript id="v5x2c8"
sessionStorage;
```

implement the browser's `Storage` interface.

This means they share methods such as:

```javascript id="7m1z9s"
setItem();
getItem();
removeItem();
clear();
key();
```

and the property:

```javascript id="x6q3vn"
length;
```

Because the APIs are similar, learning one makes the other easy to understand.

---

# 3. `localStorage`

`localStorage` provides persistent client-side key/value storage.

Example:

```javascript id="4y7m2c"
localStorage.setItem(
  "theme",
  "dark"
);
```

Later:

```javascript id="r8n5jw"
const theme =
  localStorage.getItem("theme");
```

The data can remain available after:

* Page reloads.
* Browser navigation.
* Closing and reopening the browser.

The exact lifetime still depends on browser behavior and storage policies.

---

# 4. `sessionStorage`

`sessionStorage` provides key/value storage associated with the current page session.

Example:

```javascript id="c9v3x6"
sessionStorage.setItem(
  "draft",
  "Osama Abu Motlaq"
);
```

Then:

```javascript id="a4q7z2"
const draft =
  sessionStorage.getItem("draft");
```

Unlike `localStorage`, `sessionStorage` is intended for data that belongs to the current browsing session.

---

# 5. `localStorage` vs `sessionStorage`

The core distinction is:

| Feature                  | `localStorage`                   | `sessionStorage`            |
| ------------------------ | -------------------------------- | --------------------------- |
| API                      | Same                             | Same                        |
| Key/value                | Yes                              | Yes                         |
| Survives page reload     | Usually                          | Yes                         |
| Survives browser restart | Usually                          | No                          |
| Lifetime                 | Persistent until removed/cleared | Current page session        |
| Scope                    | Origin                           | Origin + browsing context   |
| Typical use              | Preferences                      | Temporary page/session data |

The exact lifecycle of a browsing session can be affected by browser behavior, duplication, and session restoration.

---

# 6. Storage Is String-Based

One of the most important facts about Web Storage is:

> **Storage values are strings.**

For example:

```javascript id="v3x8b1"
localStorage.setItem(
  "count",
  42
);
```

The number is converted to a string.

Reading it:

```javascript id="p7m4z9"
const count =
  localStorage.getItem("count");

console.log(typeof count);
```

produces:

```text id="k1d8w3"
string
```

not:

```text id="c9v2m5"
number
```

---

# 7. Storage and Boolean Values

Consider:

```javascript id="r6x1p4"
localStorage.setItem(
  "isDark",
  true
);
```

Reading:

```javascript id="t5n8y2"
const isDark =
  localStorage.getItem("isDark");
```

returns:

```text id="f7m3q1"
"true"
```

which is a string.

This means:

```javascript id="x8k4m6"
if (isDark) {
  // This condition is true because "false"
  // is also a non-empty string.
}
```

can create a bug.

Do not treat stored strings as booleans without converting them.

---

# 8. Converting Stored Values

For numbers:

```javascript id="k3p9v5"
const count = Number(
  localStorage.getItem("count")
);
```

For booleans:

```javascript id="d7x2m4"
const isDark =
  localStorage.getItem("isDark") === "true";
```

But when dealing with structured data, JSON is usually more convenient.

---

# 9. `setItem()`

The standard way to store a value is:

```javascript id="m2w7q5"
localStorage.setItem(
  "theme",
  "dark"
);
```

Syntax:

```javascript id="e6z1c9"
storage.setItem(key, value);
```

Both values are converted to strings.

For example:

```javascript id="r4n8b2"
localStorage.setItem(
  123,
  456
);
```

effectively becomes:

```text id="z1p6y7"
"123" → "456"
```

Use meaningful string keys.

---

# 10. `getItem()`

Read a value:

```javascript id="h5m8q3"
const theme =
  localStorage.getItem("theme");
```

If the key exists:

```text id="y7c4n1"
"dark"
```

If it does not exist:

```javascript id="p8z2m6"
localStorage.getItem("missing");
```

returns:

```text id="w3x9k5"
null
```

This distinction matters.

---

# 11. Missing Key vs Stored `"null"`

Compare:

```javascript id="q7m4x1"
localStorage.getItem("missing");
```

with:

```javascript id="b9v2k8"
localStorage.setItem(
  "value",
  "null"
);
```

The first returns:

```text id="n5z7p3"
null
```

as the JavaScript null value.

The second returns:

```text id="s8c1m4"
"null"
```

as a string.

These are different.

---

# 12. `removeItem()`

Remove one key:

```javascript id="f3y8q2"
localStorage.removeItem(
  "theme"
);
```

After that:

```javascript id="c5m1v7"
localStorage.getItem("theme");
```

returns:

```text id="h9q4x6"
null
```

Use `removeItem()` when one specific stored value is no longer needed.

---

# 13. `clear()`

Remove all storage entries available through that storage object:

```javascript id="t2n6b8"
localStorage.clear();
```

This is powerful.

It removes all keys stored in that `localStorage` area for the relevant origin.

Do not call:

```javascript id="w7p3k9"
localStorage.clear();
```

casually in production code.

You may delete unrelated application data.

---

# 14. `length`

The storage object exposes:

```javascript id="c4m8v2"
localStorage.length;
```

For example:

```javascript id="y6n1q5"
console.log(
  localStorage.length
);
```

This tells you how many storage keys exist in that storage area.

---

# 15. `key()`

Retrieve a key by index:

```javascript id="r3k7x9"
const key =
  localStorage.key(0);
```

The returned key may be:

```text id="v4m2n8"
string
```

or:

```text id="p6z1c3"
null
```

if the index is invalid.

The ordering should not be treated as an application-level data model.

---

# 16. Iterating Over Storage

You can inspect stored keys:

```javascript id="w5c8m1"
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  console.log(key);
}
```

Then:

```javascript id="q2x7n4"
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  if (key !== null) {
    console.log(
      key,
      localStorage.getItem(key)
    );
  }
}
```

This is useful for debugging and diagnostics.

Avoid designing large application logic around manually iterating storage.

---

# 17. Object-Like Access

You may sometimes see:

```javascript id="h1m6z8"
localStorage.theme = "dark";
```

or:

```javascript id="v9x3q5"
localStorage.theme;
```

Web Storage supports property-like access in browsers.

However, the recommended and clearer API is:

```javascript id="j4p7c2"
localStorage.setItem(
  "theme",
  "dark"
);
```

and:

```javascript id="d8k2m5"
localStorage.getItem("theme");
```

Why?

Because the methods make the storage semantics explicit.

---

# 18. Why `setItem()` / `getItem()` Are Preferred

Compare:

```javascript id="m7x4p1"
localStorage.theme = "dark";
```

with:

```javascript id="f2z8c6"
localStorage.setItem(
  "theme",
  "dark"
);
```

The second form clearly communicates:

> Store a value in Web Storage.

It also avoids confusion with normal object properties and browser-specific behavior.

Use the storage methods in professional code.

---

# 19. Storage Is Synchronous

Web Storage operations are synchronous.

For example:

```javascript id="c6y2m8"
const theme =
  localStorage.getItem("theme");
```

happens synchronously.

Similarly:

```javascript id="p9v4k1"
localStorage.setItem(
  "theme",
  "dark"
);
```

does not return a Promise.

---

# 20. Why Synchronous Storage Matters

Synchronous APIs can block JavaScript execution while the browser performs the operation.

For small values, this is usually fine.

But large amounts of data or frequent storage operations can become problematic.

Avoid:

```javascript id="s4x7n2"
for (let i = 0; i < 100000; i++) {
  localStorage.setItem(
    `item-${i}`,
    JSON.stringify(hugeObject)
  );
}
```

Web Storage is not designed to be a high-performance database.

---

# 21. Do Not Use `localStorage` as a Database

Bad architecture:

```text id="y5m2v7"
Thousands of records
        ↓
localStorage
        ↓
Application database
```

Local storage is suitable for small client-side values.

It is not a replacement for:

* PostgreSQL.
* Supabase.
* IndexedDB.
* A backend database.

For substantial structured client-side data, consider IndexedDB or application-specific storage solutions.

---

# 22. Storage and Structured Data

Because values are strings, objects cannot be stored directly as objects.

For example:

```javascript id="n8q3v5"
const user = {
  name: "Osama Abu Motlaq",
  role: "developer"
};

localStorage.setItem(
  "user",
  user
);
```

does not preserve the object structure.

The object will be converted to a string representation that is not useful for reconstructing the original object.

Use JSON instead.

---

# 23. `JSON.stringify()`

Convert an object into a JSON string:

```javascript id="x2m9k4"
const user = {
  name: "Osama Abu Motlaq",
  role: "developer"
};

localStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

Now the stored value represents structured JSON data.

---

# 24. `JSON.parse()`

Read it back:

```javascript id="q6y1p8"
const stored =
  localStorage.getItem("user");

const user =
  stored ? JSON.parse(stored) : null;
```

Now:

```javascript id="t4k7m2"
user.name;
```

returns:

```text id="n5x8v3"
Osama Abu Motlaq
```

---

# 25. Complete Object Storage Pattern

```javascript id="z7c3m1"
const user = {
  name: "Osama Abu Motlaq",
  role: "developer"
};

localStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

Read:

```javascript id="p4m8x2"
const storedUser =
  localStorage.getItem("user");

const parsedUser =
  storedUser
    ? JSON.parse(storedUser)
    : null;
```

The flow is:

```text id="y6n1q4"
Object
  ↓
JSON.stringify()
  ↓
String
  ↓
localStorage
  ↓
getItem()
  ↓
JSON.parse()
  ↓
Object
```

---

# 26. Always Handle Invalid JSON

Stored data may be:

* Corrupted.
* Manually modified.
* From an older application version.
* Written by another part of the application.

This can make:

```javascript id="v8m3q6"
JSON.parse(stored);
```

throw an error.

Safer:

```javascript id="j2x9k5"
function getStoredUser() {
  const value =
    localStorage.getItem("user");

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
```

---

# 27. Default Values

A common pattern:

```javascript id="k7p4n1"
const theme =
  localStorage.getItem("theme")
  ?? "light";
```

This works because:

```text id="m3q8x5"
missing key
→ null
```

and:

```text id="a9v2k7"
null ?? "light"
```

produces:

```text id="w6n1c3"
"light"
```

---

# 28. Storage Defaults With JSON

Example:

```javascript id="z4q7m2"
function getSettings() {
  const stored =
    localStorage.getItem(
      "settings"
    );

  if (!stored) {
    return {
      theme: "light",
      language: "en"
    };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {
      theme: "light",
      language: "en"
    };
  }
}
```

This provides a safe fallback if storage is missing or invalid.

---

# 29. Centralize Storage Access

Instead of scattering:

```javascript id="r8m2v5"
localStorage.setItem(...);
localStorage.getItem(...);
localStorage.removeItem(...);
```

throughout your application, create small helper functions.

For example:

```javascript id="c6x1n9"
function saveTheme(theme) {
  localStorage.setItem(
    "theme",
    theme
  );
}

function getTheme() {
  return (
    localStorage.getItem("theme")
    ?? "light"
  );
}
```

This creates a clear storage boundary.

---

# 30. Storage Helper Pattern

A reusable helper:

```javascript id="p7k3m8"
function saveJson(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

function loadJson(key) {
  const value =
    localStorage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
```

Usage:

```javascript id="y2m8q4"
saveJson("settings", {
  theme: "dark"
});

const settings =
  loadJson("settings");
```

---

# 31. Storage Namespacing

Storage keys share the same origin-level storage space.

Avoid generic names like:

```javascript id="v4x8m2"
localStorage.setItem(
  "data",
  ...
);
```

Prefer descriptive names:

```javascript id="h7q3n9"
localStorage.setItem(
  "portfolio:theme",
  "dark"
);
```

Or:

```javascript id="f1z5k8"
localStorage.setItem(
  "app:settings",
  ...
);
```

Namespaces reduce key collisions between features.

---

# 32. Storage Key Conventions

A useful convention:

```text id="b3n7q1"
app:theme
app:language
app:settings
app:recent-projects
app:filters
```

This makes storage easier to inspect.

For a larger application:

```javascript id="u9c4m6"
const STORAGE_KEYS = {
  theme: "app:theme",
  settings: "app:settings"
};
```

Then:

```javascript id="e5x2k8"
localStorage.setItem(
  STORAGE_KEYS.theme,
  "dark"
);
```

This avoids repeated string literals.

---

# 33. Storage Schema Versioning

Stored application data can survive code updates.

Suppose version 1 stores:

```javascript id="s7q2m4"
{
  "theme": "dark"
}
```

Later version 2 expects:

```javascript id="k4x8n1"
{
  "theme": "dark",
  "language": "en"
}
```

Old data may still exist in the browser.

Therefore, applications with structured persistent storage may need schema versioning or migration.

Example:

```javascript id="p6m9z3"
{
  version: 2,
  settings: {
    theme: "dark",
    language: "en"
  }
}
```

---

# 34. Why Versioning Matters

Without versioning:

```text id="v8c2m5"
Old application
     ↓
stored data
     ↓
new application
     ↓
unexpected structure
```

With versioning:

```text id="n3q7x1"
Stored version 1
      ↓
Migration
      ↓
Version 2
      ↓
Current application
```

This becomes increasingly important as an application grows.

---

# 35. Storage Validation

Do not assume parsed JSON has the structure you expect.

For example:

```javascript id="k1m5v9"
const settings =
  loadJson("settings");
```

Do not automatically assume:

```javascript id="r7x3n2"
settings.theme
```

exists and has the expected type.

Validate the data:

```javascript id="c8q4m1"
function isValidSettings(value) {
  return (
    value &&
    typeof value === "object" &&
    (value.theme === "light" ||
      value.theme === "dark")
  );
}
```

Stored data is external input from the perspective of current application code.

---

# 36. Browser Storage Is User-Controlled

A user can inspect or modify storage through browser developer tools.

For example:

```text id="x4m8z2"
Application
→ Storage
→ Local Storage
```

Therefore:

```text id="q7n3v5"
localStorage value
≠
trusted server state
```

Never make security decisions based solely on local storage.

---

# 37. Never Store Secrets in `localStorage`

Avoid:

```javascript id="m9x4k2"
localStorage.setItem(
  "adminPassword",
  password
);
```

Also be extremely careful about putting authentication secrets or long-lived tokens into browser-accessible storage.

If malicious JavaScript executes in your origin through XSS, it may be able to read browser-accessible storage.

Authentication architecture should be designed around appropriate server-side sessions and cookie security controls where applicable.

---

# 38. `sessionStorage` Is Not a Secure Alternative

It may be tempting to say:

> "I will use `sessionStorage` instead because it disappears later."

That does not solve the main XSS problem.

Both:

```javascript id="h7c3n9"
localStorage
```

and:

```javascript id="p4x8m1"
sessionStorage
```

are accessible to JavaScript running in the relevant origin.

So:

```text id="n2v6q7"
sessionStorage
≠
secure secret storage
```

Its difference is mainly lifecycle and scope, not trust level.

---

# 39. Cookies vs Web Storage

Cookies and Web Storage solve different problems.

| Feature                               | Cookies              | `localStorage`      | `sessionStorage`          |
| ------------------------------------- | -------------------- | ------------------- | ------------------------- |
| Key/value                             | Yes                  | Yes                 | Yes                       |
| Sent automatically with HTTP requests | Yes, when applicable | No                  | No                        |
| JavaScript accessible by default      | Often                | Yes                 | Yes                       |
| `HttpOnly` possible                   | Yes                  | No                  | No                        |
| Typical server session use            | Yes                  | No                  | No                        |
| Typical client preferences            | Sometimes            | Yes                 | Yes                       |
| Size model                            | Small                | Larger than cookies | Similar Web Storage model |

The ability to mark cookies as:

```text id="w9m3x7"
HttpOnly
```

can prevent JavaScript from directly reading them.

However, `HttpOnly` does not eliminate XSS; malicious script can still make requests as the user in many session architectures.

---

# 40. Web Storage vs IndexedDB

`localStorage` and `sessionStorage` are intentionally simple.

IndexedDB is more suitable for:

* Larger data sets.
* Structured objects.
* More complex client-side persistence.
* Asynchronous operations.
* Indexed queries.
* Offline-first applications.

Think:

```text id="q6x1m8"
Small simple values
→ Web Storage

Large structured client data
→ IndexedDB
```

Do not force everything into localStorage.

---

# 41. Web Storage vs Cache Storage

The Cache API / Cache Storage is designed around caching request and response objects.

For example:

```text id="z8m4p1"
Request
   ↕
Response
```

This is fundamentally different from:

```text id="g2x7n5"
localStorage
   ↕
string value
```

For service-worker-driven offline applications, Cache Storage can be much more appropriate for cached network resources.

---

# 42. Storage Is Origin-Scoped

Web Storage is associated with an origin.

An origin is conceptually:

```text id="a3v9k6"
scheme + host + port
```

For example:

```text id="r5m8x2"
https://example.com
```

is a different origin from:

```text id="u7n4p1"
https://app.example.com
```

because the host differs.

Therefore, their storage areas are separate.

---

# 43. Protocol Differences Matter

These have different origins:

```text id="x2v7m9"
http://example.com
https://example.com
```

because the scheme differs.

Therefore:

```text id="c8n4q6"
HTTP storage
≠
HTTPS storage
```

This is another reason production applications should use HTTPS.

---

# 44. Port Differences Matter

For example:

```text id="j4p8z1"
https://example.com:443
```

and:

```text id="m6q2v9"
https://example.com:8443
```

have different origins because the ports differ.

Therefore their origin-scoped storage is separate.

---

# 45. Storage and Subdomains

These origins are different:

```text id="q7x3m8"
https://example.com
https://app.example.com
https://api.example.com
```

because their hosts differ.

Do not assume that all subdomains automatically share the same `localStorage`.

They do not.

---

# 46. Storage Scope of `sessionStorage`

`sessionStorage` has additional scoping behavior compared with `localStorage`.

It is associated with:

```text id="g5m1x7"
origin
+
browsing context
```

This means separate tabs/windows can have separate `sessionStorage` areas even when they share the same origin.

This distinction is one reason `sessionStorage` is useful for per-tab or per-session state.

---

# 47. `localStorage` Across Tabs

For the same origin, different tabs can access the same `localStorage` data.

For example:

```text id="w4n8c2"
Tab A
   ↓
localStorage
   ↑
Tab B
```

This is why one tab can observe storage changes made by another tab through the `storage` event.

---

# 48. The `storage` Event

The browser provides a `storage` event:

```javascript id="p8x4m1"
window.addEventListener(
  "storage",
  (event) => {
    console.log(event.key);
    console.log(event.newValue);
  }
);
```

This can help synchronize state between browsing contexts.

---

# 49. What Causes the `storage` Event?

For example:

```javascript id="y7m3q9"
localStorage.setItem(
  "theme",
  "dark"
);
```

in one same-origin browsing context can cause a `storage` event in other relevant same-origin browsing contexts.

A critical detail:

> The `storage` event is generally **not fired on the same document that made the storage change**.

This is useful for cross-tab synchronization.

---

# 50. `storage` Event Properties

The event provides useful information such as:

```javascript id="x6n2v8"
event.key;
event.oldValue;
event.newValue;
event.url;
event.storageArea;
```

For example:

```javascript id="q3m7k1"
window.addEventListener(
  "storage",
  (event) => {
    console.log({
      key: event.key,
      oldValue: event.oldValue,
      newValue: event.newValue,
      url: event.url
    });
  }
);
```

---

# 51. Storage Event and `clear()`

When:

```javascript id="w8p4m2"
localStorage.clear();
```

causes a storage event, the event can have:

```text id="a3n7c9"
event.key === null
```

and:

```text id="k6m2x5"
event.newValue === null
```

because all stored values were cleared rather than one particular key being changed.

---

# 52. Cross-Tab Theme Synchronization

Suppose one tab changes the theme:

```javascript id="z5q8m3"
localStorage.setItem(
  "theme",
  "dark"
);
```

Another tab can listen:

```javascript id="r2m6x9"
window.addEventListener(
  "storage",
  (event) => {
    if (event.key === "theme") {
      applyTheme(
        event.newValue
      );
    }
  }
);
```

This can keep multiple tabs synchronized.

---

# 53. Storage Event Is Not a Universal State Sync System

Do not treat:

```text id="u7n3p5"
storage event
```

as a complete real-time synchronization framework.

For more advanced cross-tab communication, consider:

* `BroadcastChannel`.
* Service workers.
* Server synchronization.
* Application-specific event systems.

Use the simplest appropriate technology.

---

# 54. Storage Quotas

Browsers impose storage limits.

The exact quota varies by:

* Browser.
* Device.
* Storage type.
* Available disk space.
* Browser policies.
* Site engagement/storage rules.

Do not assume:

```text id="f9x2m7"
unlimited localStorage
```

It is not unlimited.

---

# 55. `QuotaExceededError`

A storage operation can fail if the browser does not have sufficient storage capacity or the applicable quota is exceeded.

For example:

```javascript id="c4m8x1"
try {
  localStorage.setItem(
    "large-data",
    hugeString
  );
} catch (error) {
  console.error(
    "Storage failed.",
    error
  );
}
```

Production applications should consider failure handling.

---

# 56. Storage Can Also Fail for Other Reasons

Do not assume every storage error is simply:

> "Quota exceeded."

Storage may be unavailable or restricted because of:

* Browser privacy settings.
* Security policies.
* Private browsing behavior.
* Disabled storage.
* Embedded contexts.
* Browser-specific restrictions.

Therefore, robust code treats storage as a capability that may fail.

---

# 57. Storage Feature Detection

A simple check:

```javascript id="z8x3m6"
function canUseLocalStorage() {
  try {
    const key = "__storage_test__";

    localStorage.setItem(
      key,
      "1"
    );

    localStorage.removeItem(key);

    return true;
  } catch {
    return false;
  }
}
```

This is more useful than simply checking:

```javascript id="o4q7n2"
typeof localStorage !== "undefined"
```

because the API may exist while actual storage operations are restricted.

---

# 58. Why `typeof localStorage` Is Not Enough

This:

```javascript id="t6m2p9"
typeof localStorage !== "undefined"
```

answers:

> Does this global appear to exist?

It does not fully answer:

> Can my application successfully store data?

A browser environment may expose the API while an actual storage operation fails.

For critical features, test the operation.

---

# 59. Storage and Private Browsing

Browsers can apply special storage behavior in private/incognito contexts.

Depending on the browser, storage may:

* Behave differently.
* Have different persistence.
* Be restricted.
* Be cleared when the private session ends.

Applications should not assume that private browsing behaves exactly like a normal persistent profile.

---

# 60. Storage Persistence Is Not a Contract of Infinite Lifetime

Even `localStorage` should not be interpreted as:

> Data is guaranteed to remain forever.

Browser users can:

* Clear site data.
* Use privacy tools.
* Change browser settings.
* Clear storage programmatically.
* Use private browsing.
* Have browser-managed storage policies applied.

Therefore, persistent client storage is useful convenience state, not a guaranteed permanent database.

---

# 61. Storage and Offline Applications

A small offline-capable application might store:

```javascript id="g5n9x4"
localStorage.setItem(
  "last-viewed-project",
  "42"
);
```

This can improve UX.

But a serious offline application with substantial data usually needs a more capable storage architecture such as:

```text id="z7m4q1"
IndexedDB
Cache Storage
Service Worker
```

Web Storage alone is not a complete offline architecture.

---

# 62. Storage and Caching

Do not confuse:

```text id="h3x8m6"
localStorage
```

with:

```text id="t5q2n9"
HTTP cache
```

or:

```text id="r7v1c4"
Cache Storage
```

`localStorage` stores application-defined strings.

Browser HTTP caching stores network resources under browser cache rules.

Cache Storage stores request/response pairs.

Each solves a different problem.

---

# 63. Storage and Serialization

JSON is convenient:

```javascript id="m4x8q2"
JSON.stringify(value);
JSON.parse(value);
```

but JSON has limitations.

For example, JSON does not preserve certain JavaScript-specific values such as:

```text id="p9z6w3"
Map
Set
Date semantics without conversion
undefined in objects
functions
class instances
BigInt
```

Therefore, do not assume:

```javascript id="x7q3m1"
JSON.stringify()
```

is a perfect universal serializer.

---

# 64. Date Serialization

Consider:

```javascript id="q1m8v5"
const data = {
  createdAt: new Date()
};

localStorage.setItem(
  "data",
  JSON.stringify(data)
);
```

After parsing:

```javascript id="v6x4n2"
const data =
  JSON.parse(
    localStorage.getItem("data")
  );
```

`createdAt` will be a string, not a `Date` object.

You may need to reconstruct it:

```javascript id="z5p7k3"
data.createdAt =
  new Date(data.createdAt);
```

This is why storage schemas should be designed intentionally.

---

# 65. `undefined` and JSON

Consider:

```javascript id="c8q2m5"
JSON.stringify({
  value: undefined
});
```

The property can be omitted from the resulting JSON.

This means:

```text id="n4x7z1"
JavaScript object structure
≠
JSON representation
```

Always understand what your serialization format actually preserves.

---

# 66. BigInt and JSON

A `BigInt` value cannot be directly serialized using standard JSON:

```javascript id="w6m3q9"
JSON.stringify({
  id: 10n
});
```

can throw an error.

If your application needs BigInt persistence, define an explicit serialization strategy.

Do not blindly pass arbitrary application state into `JSON.stringify()`.

---

# 67. Storage and Circular References

JSON cannot serialize circular structures.

For example:

```javascript id="p7x2m5"
const object = {};

object.self = object;

JSON.stringify(object);
```

throws an error because the structure is circular.

This is another reason to store only small, intentional data structures.

---

# 68. Do Not Store DOM Elements

Avoid:

```javascript id="m4n8q2"
localStorage.setItem(
  "button",
  JSON.stringify(
    document.querySelector("button")
  )
);
```

DOM elements are not meaningful persistent storage data.

Store application data:

```javascript id="y6p3v1"
{
  id: 42,
  title: "Portfolio"
}
```

rather than live browser objects.

---

# 69. Do Not Store Functions

Avoid:

```javascript id="k2x7m9"
localStorage.setItem(
  "handler",
  ...
);
```

Functions cannot meaningfully be restored from normal JSON storage.

Store data:

```text id="t5w8q4"
event type
action name
configuration
```

rather than executable behavior.

---

# 70. Storage as a Persistence Layer

A useful architecture is:

```text id="q8m3v6"
Application
    ↓
Storage Service
    ↓
localStorage
```

For example:

```javascript id="x4p7n2"
const storage = {
  saveTheme(theme) {
    localStorage.setItem(
      "app:theme",
      theme
    );
  },

  getTheme() {
    return (
      localStorage.getItem(
        "app:theme"
      ) ?? "light"
    );
  }
};
```

This keeps browser storage details isolated.

---

# 71. Why a Storage Layer Helps

Without a storage layer:

```text id="b5x1m8"
Component A
 → localStorage

Component B
 → localStorage

Component C
 → localStorage

Component D
 → localStorage
```

The application becomes tightly coupled to the browser API.

With a storage layer:

```text id="p9z4c2"
Components
    ↓
Storage service
    ↓
Browser storage
```

Now you can change the persistence strategy more easily.

---

# 72. React State + Browser Storage

A common React pattern is:

```text id="y3m7x9"
Initial render
     ↓
Read persisted value
     ↓
React state
     ↓
UI
     ↓
State changes
     ↓
Persist change
```

For example:

```jsx id="k8q2m5"
import {
  useEffect,
  useState
} from "react";

function ThemeSettings() {
  const [theme, setTheme] =
    useState("light");

  useEffect(() => {
    const stored =
      localStorage.getItem("theme");

    if (stored === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  return (
    <button
      onClick={() => {
        setTheme(
          theme === "light"
            ? "dark"
            : "light"
        );
      }}
    >
      {theme}
    </button>
  );
}
```

---

# 73. React Storage Initialization

For client-only React code, you may initialize state from storage:

```jsx id="b3x8m6"
const [theme, setTheme] =
  useState(() => {
    return (
      localStorage.getItem("theme")
      ?? "light"
    );
  });
```

However, this pattern assumes `localStorage` is available when the initializer executes.

That assumption can be problematic in server-rendered environments.

---

# 74. Next.js and Browser Storage

This is especially important in Next.js.

`localStorage` and `sessionStorage` are browser APIs.

They are not available during ordinary server execution.

This means code such as:

```javascript id="q7m2x5"
const theme =
  localStorage.getItem("theme");
```

cannot simply be executed in a Server Component.

---

# 75. Browser Storage and Server Components

A Next.js Server Component runs in a server environment.

Therefore:

```text id="v4n8c1"
Server Component
   ↓
No localStorage

Client Component
   ↓
Browser localStorage available
```

For browser storage behavior, a Client Component or client-side effect is usually required.

---

# 76. Next.js `"use client"`

For example:

```jsx id="x6m3q9"
"use client";

import {
  useEffect,
  useState
} from "react";

export default function Theme() {
  const [theme, setTheme] =
    useState("light");

  useEffect(() => {
    const stored =
      localStorage.getItem("theme");

    if (stored) {
      setTheme(stored);
    }
  }, []);

  return (
    <p>{theme}</p>
  );
}
```

The important concept is not:

> "Every component using storage must be client-rendered."

Rather:

> **Browser APIs belong to code that executes in the browser.**

Isolate the browser-dependent portion appropriately.

---

# 77. Hydration Problems With Storage

Suppose the server renders:

```text id="q9x3m6"
Theme: light
```

but the browser's localStorage contains:

```text id="m7p2z4"
dark
```

If the client initially renders:

```text id="a5n8c1"
Theme: dark
```

there can be a server/client mismatch.

This can produce:

* Hydration warnings.
* Visual flicker.
* Different initial UI.

The solution depends on the application.

Possible approaches include:

* Client-only rendering for the affected portion.
* A stable initial state.
* Applying a theme before hydration.
* Using framework-supported theme strategies.

The core issue is:

```text id="j3q7m2"
Server cannot directly read browser localStorage.
```

---

# 78. Browser Storage and Theme Preferences

One of the best use cases for localStorage is a user preference such as:

```javascript id="k4m9x2"
localStorage.setItem(
  "theme",
  "dark"
);
```

The application can combine:

```text id="w6p2z8"
Browser preference
+
Stored user preference
+
Application default
```

For example:

```text id="n3x7m1"
Explicit user choice
        ↓
localStorage
        ↓
Browser system preference
        ↓
Application default
```

A deliberate precedence order avoids confusing behavior.

---

# 79. Storage + `prefers-color-scheme`

You can detect the browser's system preference:

```javascript id="r8m5q2"
const darkMode =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
```

Then combine it with stored preference:

```javascript id="x1n7c4"
const stored =
  localStorage.getItem("theme");

const theme =
  stored ??
  (darkMode ? "dark" : "light");
```

The stored explicit preference takes precedence.

---

# 80. Do Not Store Every React State Variable

Avoid:

```text id="j6q2v9"
Every state update
      ↓
localStorage
```

For example:

```javascript id="z4m8x1"
setMouseX(x);

localStorage.setItem(
  "mouseX",
  String(x)
);
```

This creates unnecessary storage operations.

Persist only state that genuinely needs persistence.

---

# 81. Good Candidates for `localStorage`

Examples include:

```text id="p2x8m4"
Theme
Language preference
UI density
Dismissed banner
Small filter settings
Recent non-sensitive selection
User onboarding progress
```

These values are:

* Small.
* Client-oriented.
* Not highly sensitive.
* Useful across sessions.

---

# 82. Good Candidates for `sessionStorage`

Examples include:

```text id="y7m3q1"
Temporary form draft
One-tab wizard state
Transient navigation information
Temporary UI state
```

Especially when you do not want the value to behave like long-term preference data.

---

# 83. Poor Candidates for Web Storage

Avoid using it as the primary store for:

```text id="c9x2m6"
Passwords
Private secrets
Large databases
Server-authoritative permissions
Sensitive authentication state
Millions of records
Large binary files
Live application-wide real-time state
```

Use appropriate server or browser storage technologies instead.

---

# 84. Storage and Application State

Browser storage is persistence.

It is not the same as live application state.

Think:

```text id="q4m8x2"
React state
→ current UI state

localStorage
→ persisted client preference
```

For example:

```text id="t7x3n5"
React:
theme = "dark"

localStorage:
theme = "dark"
```

The application state should drive the UI.

Storage should support persistence.

---

# 85. Storage Should Not Be Your Source of Truth for Every Render

Avoid repeatedly reading:

```javascript id="m5z2q8"
localStorage.getItem("theme");
```

throughout the UI.

Prefer:

```text id="v8x4c1"
Storage
 ↓
Initialize state
 ↓
Application state
 ↓
UI
```

Then persist changes when appropriate.

---

# 86. Storage Synchronization Pattern

A useful model:

```text id="p6m1x9"
                  localStorage
                       │
                ┌──────┴──────┐
                ↓             ↓
             Load          Save
                ↓             ↑
             State ←── User action
                ↓
               UI
```

For multiple tabs:

```text id="a7n3q5"
Tab A state
   ↓
localStorage
   ↓
storage event
   ↓
Tab B state
```

This produces a simple persistence and synchronization architecture.

---

# 87. Storage and Versioned Preferences

Suppose:

```javascript id="x2m8k5"
localStorage.setItem(
  "app:settings",
  JSON.stringify({
    version: 2,
    theme: "dark",
    language: "en"
  })
);
```

When loading:

```javascript id="f4q7p2"
const settings =
  loadJson("app:settings");

if (settings?.version === 2) {
  // Use version 2.
}
```

This makes future migrations easier.

---

# 88. Storage Migration

Suppose version 1 used:

```javascript id="v9m3x6"
{
  "darkMode": true
}
```

and version 2 uses:

```javascript id="p5z1q8"
{
  "theme": "dark"
}
```

A migration function can transform:

```javascript id="r7x4m2"
function migrateSettings(settings) {
  if (
    settings &&
    settings.version === 1
  ) {
    return {
      version: 2,
      theme:
        settings.darkMode
          ? "dark"
          : "light"
    };
  }

  return settings;
}
```

This becomes useful in long-lived applications.

---

# 89. Storage Error Handling

A robust storage helper:

```javascript id="h3q8m1"
function saveJson(key, value) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(
      "Unable to save data.",
      error
    );

    return false;
  }
}
```

This accounts for:

* Quota errors.
* Browser restrictions.
* Serialization failures.
* Storage access failures.

---

# 90. Safe JSON Loader

```javascript id="m6x2p9"
function loadJson(key) {
  try {
    const value =
      localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(
      "Unable to load data.",
      error
    );

    return null;
  }
}
```

This provides a clear storage boundary.

---

# 91. Remove Invalid Stored Data

Suppose an old value is corrupted:

```javascript id="x8m4q1"
function loadSettings() {
  try {
    const value =
      localStorage.getItem(
        "app:settings"
      );

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch {
    localStorage.removeItem(
      "app:settings"
    );

    return null;
  }
}
```

Removing invalid data prevents the application from repeatedly failing on the same corrupted value.

---

# 92. Storage Data Is External Input

Even though:

```javascript id="d3m7x2"
localStorage
```

belongs to your application origin, values can be modified outside your code.

Therefore:

```text id="j5q8m1"
localStorage
   ↓
untrusted client-side input
```

Validate important data structures before using them.

This is especially important when stored data affects:

* Rendering.
* URL construction.
* API requests.
* Application configuration.

---

# 93. Storage and XSS

Suppose:

```javascript id="v6m2q9"
localStorage.setItem(
  "message",
  userInput
);
```

Later:

```javascript id="x4p7n1"
element.innerHTML =
  localStorage.getItem("message");
```

The first operation is ordinary storage.

The second turns the stored value into an HTML execution context.

The security problem occurs at the sink.

Prefer:

```javascript id="k8q3m5"
element.textContent =
  localStorage.getItem("message") ?? "";
```

Treat stored content according to how it will be consumed.

---

# 94. Storage Is Not Automatically Trusted Because It Is "Our Data"

This is a dangerous assumption:

> "I wrote it, so it must be safe."

Persistent client data can be:

* Modified manually.
* Left over from an older version.
* Corrupted.
* Imported from another workflow.
* Written by vulnerable code.
* Controlled by malicious scripts after XSS.

Therefore, trust should be determined by the data flow, not merely the storage location.

---

# 95. Storage and Authorization

Never do:

```javascript id="f7m2x4"
const role =
  localStorage.getItem("role");

if (role === "admin") {
  showAdminControls();
}
```

for security.

It is acceptable to use it as a UI hint:

```text id="5x1n8c"
show or hide a client-side control
```

but actual authorization must be enforced by the server.

---

# 96. Supabase and Browser Storage

When using Supabase from a browser application, authentication state and persistent session handling often involve browser-side storage mechanisms through the client library.

However:

> **Browser storage is still client-side and should not be treated as a trusted authorization source.**

Supabase security should rely on:

```text id="r3m7x1"
Authentication
+
Row Level Security
+
Server/database authorization rules
```

not:

```text id="j8q2v5"
localStorage role = "admin"
```

---

# 97. Storage and PostgreSQL

Do not confuse:

```text id="t5x8m2"
localStorage
```

with:

```text id="g1m7q4"
PostgreSQL
```

They have completely different responsibilities.

### Browser storage

```text id="b4q9n1"
Client
Small
Local
User-controlled
```

### PostgreSQL

```text id="z7x2m5"
Server/database
Structured
Persistent
Shared
Access-controlled
```

The browser may cache a small representation of server data, but the database remains the authoritative backend source.

---

# 98. Storage and Supabase Example

Suppose your application remembers the last selected project.

Client:

```javascript id="m3q8x1"
localStorage.setItem(
  "app:last-project",
  "42"
);
```

This is reasonable.

But the actual project data remains:

```text id="y5v2n7"
Supabase / PostgreSQL
```

The client can request:

```text id="p8x4m1"
project 42
```

from the backend.

This is a good separation of responsibilities.

---

# 99. Storage and Cross-Tab Authentication UI

If multiple tabs share an origin, `localStorage` can sometimes be used to trigger UI synchronization.

For example:

```javascript id="c7m2x9"
window.addEventListener(
  "storage",
  (event) => {
    if (event.key === "app:theme") {
      applyTheme(
        event.newValue
      );
    }
  }
);
```

However, authentication itself should not rely on a client-side storage flag as the source of truth.

The server/session layer remains authoritative.

---

# 100. Storage and Performance

Storage operations are synchronous.

Therefore, avoid frequent writes such as:

```javascript id="k4m7p2"
input.addEventListener("input", () => {
  localStorage.setItem(
    "draft",
    input.value
  );
});
```

for every keystroke if the data can be large or the event is extremely frequent.

A better pattern is often debouncing:

```javascript id="y8n3q6"
const saveDraft = debounce(
  (value) => {
    localStorage.setItem(
      "draft",
      value
    );
  },
  300
);
```

Then:

```javascript id="w6x1m9"
input.addEventListener(
  "input",
  () => {
    saveDraft(input.value);
  }
);
```

---

# 101. Storage and Main-Thread Work

Because Web Storage is synchronous:

```text id="f2m8x4"
JavaScript thread
      ↓
storage operation
      ↓
continues
```

For small values this is normally fine.

For large or frequent operations:

```text id="q7n3m5"
large serialization
+
large storage operation
+
frequent events
```

can hurt responsiveness.

Use appropriate storage technologies for heavier workloads.

---

# 102. Do Not Store Huge JSON Blobs

Avoid:

```javascript id="s9x4p2"
localStorage.setItem(
  "entire-app-state",
  JSON.stringify(
    massiveApplicationState
  )
);
```

Problems can include:

* Serialization cost.
* Parsing cost.
* Main-thread blocking.
* Quota usage.
* Difficult migrations.
* Hard-to-debug stale state.

Persist only the pieces that need persistence.

---

# 103. Storage and Partial Persistence

Suppose the application state is:

```javascript id="c4m7x2"
{
  theme: "dark",
  modalOpen: false,
  currentMouseX: 300,
  sidebarWidth: 280,
  language: "en"
}
```

You probably do not need to persist:

```text id="n6x3p8"
modalOpen
currentMouseX
sidebarWidth
```

You may only need:

```text id="z5m1q7"
theme
language
```

Persist the smallest meaningful state.

---

# 104. Storage and Privacy

Before storing data, ask:

```text id="y8x2m4"
Does this contain personal information?
Does it contain sensitive information?
Does it need to persist?
Does the user expect it to persist?
Can the user clear it?
```

A good privacy principle is:

> **Store the minimum data necessary for the feature.**

Do not use localStorage as a convenient dumping ground for application state.

---

# 105. Storage and User Logout

When a user signs out, do not assume:

```javascript id="m3q7x1"
localStorage.clear();
```

is always correct.

It may delete unrelated application preferences.

Instead, remove the specific application data that should no longer persist:

```javascript id="p8n4m6"
localStorage.removeItem(
  "app:user-preferences"
);
```

Authentication cleanup should follow the authentication library's documented lifecycle.

---

# 106. Storage Cleanup

Good storage management means:

```text id="c5x9q2"
Save only what is necessary
        ↓
Use clear key names
        ↓
Version structured data
        ↓
Remove obsolete data
        ↓
Handle corruption
```

Persistent storage is a form of application state that survives code changes.

Treat it accordingly.

---

# 107. Browser DevTools

Storage can be inspected using browser developer tools.

In common browsers, you can inspect site data under an Application/Storage section.

Developers can see:

```text id="a7m3x8"
Local Storage
Session Storage
Cookies
IndexedDB
Cache Storage
```

This is useful for debugging.

It also demonstrates the important security principle:

> **Users can inspect client-side storage.**

---

# 108. Storage and Debugging

Suppose a theme refuses to change.

Inspect:

```javascript id="j4q8m2"
localStorage.getItem(
  "app:theme"
);
```

You may discover:

```text id="v6x1n9"
"dark"
```

even though the application expects:

```text id="z3m7p5"
"light"
```

Debugging persistent client state requires checking:

```text id="k8q2v4"
Stored value
Expected schema
Current application state
Rendering logic
```

---

# 109. Storage and Testing

Tests should not depend on leftover browser storage.

Before a test:

```javascript id="w5m9x3"
localStorage.clear();
```

or, better, remove only the keys relevant to that test:

```javascript id="p2x7m4"
localStorage.removeItem(
  "app:theme"
);
```

Tests should establish their own storage state.

Persistent browser data can otherwise cause flaky tests.

---

# 110. Storage and Mocking

In JavaScript tests, browser storage may be simulated.

A function such as:

```javascript id="g7n2x5"
function getTheme() {
  return (
    localStorage.getItem(
      "app:theme"
    ) ?? "light"
  );
}
```

is easier to test when storage access is isolated behind a small module.

For example:

```text id="r3m8q1"
theme-service.js
      ↓
storage
```

This allows the persistence mechanism to be mocked or replaced.

---

# 111. Avoid Storage Access in Every Component

Bad architecture:

```text id="y7q4m2"
Component A → localStorage
Component B → localStorage
Component C → localStorage
Component D → localStorage
```

Better:

```text id="c8m1x5"
Components
    ↓
State / service
    ↓
Storage
```

This creates a single place for:

* Parsing.
* Validation.
* Defaults.
* Migration.
* Error handling.

---

# 112. Practical Storage Service

```javascript id="x5m8q3"
const STORAGE_KEY = "app:settings";

export function saveSettings(settings) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );
  } catch {
    // Storage unavailable.
  }
}

export function loadSettings() {
  try {
    const value =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function clearSettings() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}
```

Now the rest of the application does not need to know how storage is implemented.

---

# 113. Storage Abstraction and React

A React component can use:

```javascript id="n9x2m6"
import {
  loadSettings,
  saveSettings
} from "./storage.js";
```

Then:

```jsx id="b4m7q1"
const [settings, setSettings] =
  useState(() => loadSettings());
```

and:

```jsx id="q6x3n8"
useEffect(() => {
  saveSettings(settings);
}, [settings]);
```

The component owns UI state.

The storage module owns persistence.

This is a cleaner separation.

---

# 114. Storage Abstraction and Next.js

In Next.js, an even stronger separation is:

```text id="x3m7q9"
Server logic
   ↓
database / cookies / server storage

Client logic
   ↓
browser storage
```

Do not force server and browser persistence mechanisms into one abstraction if their trust models and lifecycles are fundamentally different.

---

# 115. Browser Storage and Server Authority

A useful architecture is:

```text id="p7m2x5"
                Server
                  │
                  ↓
             Authoritative
                state
                  │
             API / response
                  │
                  ↓
               Client
                  │
          ┌───────┴────────┐
          ↓                ↓
      React state     Browser storage
          ↓                ↓
          UI          Local preference
```

This prevents local storage from accidentally becoming the source of truth for server-authoritative data.

---

# 116. Good Storage Pattern

For a theme:

```text id="x9m3q6"
User chooses theme
       ↓
React state changes
       ↓
UI changes
       ↓
localStorage saves preference
```

For authorization:

```text id="p5n8y2"
User requests protected resource
       ↓
Server authenticates
       ↓
Server authorizes
       ↓
Database operation
```

Do not reverse these responsibilities.

---

# 117. Storage and URL State

Sometimes both storage and URL state are useful.

Example:

```text id="v8q2m4"
URL:
?page=2

Storage:
theme=dark
```

The URL stores navigational state.

Storage stores persistent preference.

This is a good division.

---

# 118. Storage and Cookies

Cookies are often more appropriate when the server needs to participate directly in session management.

For example:

```text id="j4m7x1"
Browser
   ↕
Cookie
   ↕
Server
```

The server receives applicable cookies with requests.

By contrast:

```text id="s6n2q8"
localStorage
```

is not automatically attached to HTTP requests.

The client must explicitly read it and send its value.

This difference is fundamental.

---

# 119. Why `localStorage` Does Not Automatically Reach the Server

Suppose:

```javascript id="w8m3x7"
localStorage.setItem(
  "theme",
  "dark"
);
```

When the browser requests:

```text id="n5q1z4"
/api/projects
```

the browser does **not** automatically add:

```text id="f2m8x6"
theme=dark
```

from localStorage.

If the server needs that information, the client must explicitly communicate it, for example through:

* Request data.
* Headers where appropriate.
* Query parameters where appropriate.
* Cookies.
* Server-managed state.

---

# 120. Storage and Cookies Have Different Trust Models

A practical comparison:

```text id="c9m3x7"
localStorage
→ client-owned application state

Cookie
→ browser-managed request-associated state
```

Cookies can have attributes such as:

```text id="x4n8p2"
HttpOnly
Secure
SameSite
```

which affect security and behavior.

Web Storage has no equivalent `HttpOnly` mechanism.

---

# 121. Storage and XSS Defense

If your application stores sensitive data in:

```javascript id="r7m2x9"
localStorage
```

an XSS vulnerability can increase the potential impact because malicious JavaScript running under the origin may be able to read it.

Therefore, security strategy should minimize:

```text id="k5n1q8"
sensitive data
+
client-accessible storage
```

The best defense is preventing arbitrary script execution in the first place.

---

# 122. Storage and Content Security Policy

A strong web security architecture can combine:

```text id="w3m8x2"
Safe rendering
+
Input validation
+
Output safety
+
CSP
+
Secure authentication
+
Proper storage choices
```

No single browser storage decision can solve XSS.

Security is layered.

---

# 123. Storage Events and React

React can respond to storage changes:

```jsx id="q8m4x1"
useEffect(() => {
  function handleStorage(event) {
    if (
      event.key ===
      "app:theme"
    ) {
      setTheme(
        event.newValue ?? "light"
      );
    }
  }

  window.addEventListener(
    "storage",
    handleStorage
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage
    );
  };
}, []);
```

This allows cross-tab synchronization.

Remember:

> The same document that writes the storage value does not receive the storage event for that write.

---

# 124. Storage and `BroadcastChannel`

For richer cross-tab communication, the browser also provides:

```javascript id="f7m3x9"
const channel =
  new BroadcastChannel("app");
```

Then:

```javascript id="x5n8q2"
channel.postMessage({
  type: "THEME_CHANGED",
  theme: "dark"
});
```

Other same-origin contexts listening on that channel can receive the message.

This is often cleaner than abusing `localStorage` as a messaging system.

---

# 125. Storage and React Cleanup

If using:

```javascript id="g4q7m1"
window.addEventListener(
  "storage",
  handleStorage
);
```

remember cleanup:

```javascript id="v8m2x5"
return () => {
  window.removeEventListener(
    "storage",
    handleStorage
  );
};
```

Browser event subscriptions have a lifecycle.

This principle is the same as with:

* `resize`.
* `scroll`.
* `online`.
* `offline`.
* `popstate`.
* Custom browser events.

---

# 126. Browser Storage and Accessibility

Storage can remember accessibility preferences.

For example:

```text id="q5n8m3"
Reduced motion preference
Theme
Font size preference
Contrast preference
```

However, browser-native preferences should be respected as the baseline.

For example:

```javascript id="x2m7q4"
window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
```

can provide a browser preference.

Storage can preserve an explicit user choice if the application supports one.

A strong precedence model is:

```text id="m6p1x8"
Explicit user setting
        ↓
Stored application preference
        ↓
Browser/system preference
        ↓
Application default
```

The exact order depends on product design.

---

# 127. Storage and Dark Mode

A common pattern:

```javascript id="k9x4m2"
function getTheme() {
  const stored =
    localStorage.getItem(
      "app:theme"
    );

  if (
    stored === "light" ||
    stored === "dark"
  ) {
    return stored;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}
```

This demonstrates:

```text id="b7m3q8"
Stored preference
      ↓
Browser preference
      ↓
Default
```

---

# 128. Storage and Data Expiration

Web Storage does not provide a built-in expiration date.

If you want expiration, store metadata:

```javascript id="r4n8x2"
localStorage.setItem(
  "app:cache",
  JSON.stringify({
    value: "some-data",
    expiresAt:
      Date.now() + 60 * 60 * 1000
  })
);
```

Then:

```javascript id="z5m2q7"
function loadCache() {
  const value =
    localStorage.getItem(
      "app:cache"
    );

  if (!value) {
    return null;
  }

  try {
    const data =
      JSON.parse(value);

    if (
      Date.now() >= data.expiresAt
    ) {
      localStorage.removeItem(
        "app:cache"
      );

      return null;
    }

    return data.value;
  } catch {
    return null;
  }
}
```

This is a custom expiration pattern.

---

# 129. Storage Is Not a Cache With Automatic Eviction Semantics

If you need sophisticated caching, consider:

```text id="u8n4m1"
Cache Storage
IndexedDB
HTTP cache
Service worker strategies
```

rather than trying to implement an entire cache system on top of localStorage.

Web Storage is intentionally simple.

---

# 130. Browser Storage Quick Reference

### Store

```javascript id="y4m8q2"
localStorage.setItem(
  "key",
  "value"
);
```

### Read

```javascript id="p7x2n5"
localStorage.getItem("key");
```

### Remove one

```javascript id="c9m4v1"
localStorage.removeItem("key");
```

### Remove everything

```javascript id="k3x8q5"
localStorage.clear();
```

### Count keys

```javascript id="n6m2z9"
localStorage.length;
```

### Get key by index

```javascript id="r8q4x3"
localStorage.key(0);
```

The same API exists for:

```javascript id="f5n1m7"
sessionStorage;
```

---

# 131. JSON Quick Reference

### Save object

```javascript id="x8m3q6"
localStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

### Read object

```javascript id="v4n7p2"
const value =
  localStorage.getItem("user");

const user =
  value ? JSON.parse(value) : null;
```

### Safe parse

```javascript id="m1q8x5"
try {
  return JSON.parse(value);
} catch {
  return null;
}
```

---

# 132. Storage Decision Guide

### Need a small persistent preference?

Use:

```text id="t7m3q9"
localStorage
```

### Need temporary per-tab state?

Use:

```text id="c5x8n2"
sessionStorage
```

### Need structured, larger client data?

Consider:

```text id="q9m4v1"
IndexedDB
```

### Need cached network responses?

Consider:

```text id="z6p2x8"
Cache Storage
```

### Need server-associated session state?

Consider:

```text id="n3m7q5"
Secure server-managed cookies/session
```

### Need authoritative data?

Use:

```text id="w8x4m2"
Backend / database
```

---

# 133. What React Developers Should Remember

For React, think:

```text id="a5m8q2"
Browser Storage
      ↓
Persistence
      ↓
React State
      ↓
UI
```

Do not think:

```text id="k7x3m9"
localStorage
      ↓
automatic React state
```

Storage and React state are separate systems.

You must decide:

* When to read.
* When to write.
* What to persist.
* How to handle errors.
* How to synchronize tabs.
* How to handle server rendering.

---

# 134. What Next.js Developers Should Remember

The most important boundary is:

```text id="v2m6q8"
Server
  ↓
No localStorage

Browser
  ↓
localStorage available
```

This affects:

* Server Components.
* Client Components.
* Hydration.
* Theme initialization.
* Authentication architecture.
* State persistence.

Do not assume a browser API can be used simply because the code belongs to a Next.js project.

---

# 135. Common Anti-Pattern

Avoid:

```javascript id="q4m8x2"
const app = JSON.parse(
  localStorage.getItem(
    "entire-app"
  )
);

localStorage.setItem(
  "entire-app",
  JSON.stringify(app)
);
```

on every tiny interaction.

This creates:

* Large synchronous operations.
* Excessive serialization.
* Hard-to-debug state.
* Stale data risks.
* Storage bloat.

Persist only meaningful state.

---

# 136. Better Architecture

Use:

```text id="m7x3p9"
React state
      ↓
Select persistent subset
      ↓
Serialize
      ↓
localStorage
```

For example:

```javascript id="n4q8y1"
const settings = {
  theme: "dark",
  language: "en"
};

localStorage.setItem(
  "app:settings",
  JSON.stringify(settings)
);
```

Keep transient UI state in React rather than persisting it unnecessarily.

---

# 137. Browser Storage Checklist

Before storing data, ask:

```text id="x5m2q8"
[ ] Does this data need persistence?
[ ] Is localStorage the appropriate storage type?
[ ] Should sessionStorage be used instead?
[ ] Is the data sensitive?
[ ] Can JavaScript access it?
[ ] Could XSS expose it?
[ ] Is the data small enough?
[ ] Do I need schema versioning?
[ ] Do I need validation?
[ ] Could JSON serialization fail?
[ ] What happens if storage is unavailable?
[ ] What happens if quota is exceeded?
[ ] Does the data need expiration?
[ ] Should multiple tabs synchronize it?
[ ] Should the server be the source of truth?
```

---

# 138. Security Checklist

Never assume:

```text id="a7m3q9"
localStorage = secure
sessionStorage = secure
```

Instead:

```text id="z4n8x1"
Client storage
      ↓
User can inspect/modify it
      ↓
JavaScript may access it
      ↓
XSS may increase its exposure
```

Therefore:

* Do not store passwords.
* Do not store server secrets.
* Do not use storage as authorization.
* Do not trust stored roles.
* Do not assume stored JSON is safe or valid.
* Validate data before using it.
* Prefer secure server-managed authentication architecture for sensitive session state.

---

# 139. Final Mental Model

Think about browser storage as:

```text id="p8m3x7"
                 Browser Storage
                       │
            ┌──────────┴──────────┐
            ↓                     ↓
       localStorage         sessionStorage
            │                     │
      persistent-ish        session-scoped
            │                     │
            └──────────┬──────────┘
                       ↓
                string key/value
                       │
                ┌──────┴──────┐
                ↓             ↓
             setItem()     getItem()
                │             │
                └──────┬──────┘
                       ↓
                  Application
```

For structured data:

```text id="z6x2m4"
Object
 ↓
JSON.stringify()
 ↓
Storage string
 ↓
getItem()
 ↓
JSON.parse()
 ↓
Object
```

And for security:

```text id="k3n7q8"
Browser storage
      ↓
Client-controlled
      ↓
Not a trusted security boundary
```

---

# Key Takeaways

* `localStorage` and `sessionStorage` are browser key/value storage APIs.
* Both use string keys and string values.
* `localStorage` is intended for persistent client-side data.
* `sessionStorage` is associated with the current page session and browsing context.
* `getItem()` returns `null` when a key does not exist.
* `setItem()` stores values as strings.
* `removeItem()` removes one key.
* `clear()` removes all keys in the relevant storage area.
* `length` and `key()` allow inspection of stored keys.
* Use `JSON.stringify()` and `JSON.parse()` for simple structured data.
* JSON has serialization limitations; it does not preserve every JavaScript value.
* Stored JSON should be validated and safely parsed.
* Web Storage is synchronous.
* Do not use it as a large database or high-frequency persistence mechanism.
* Storage quotas are limited and vary by browser and environment.
* Storage operations can fail, so production code should handle exceptions.
* `localStorage` is generally shared across same-origin browsing contexts, while `sessionStorage` has additional browsing-context scoping.
* The `storage` event can help synchronize changes between same-origin browsing contexts.
* `storage` is not a complete real-time messaging architecture; `BroadcastChannel` and other APIs may be better for richer communication.
* Storage is scoped by origin, meaning scheme, host, and port matter.
* Client-side storage is inspectable and modifiable by the user.
* Never use browser storage as an authorization mechanism.
* Do not store passwords or server-only secrets in Web Storage.
* `sessionStorage` is not inherently more secure than `localStorage`; its primary difference is lifecycle and scope.
* Cookies and Web Storage solve different problems.
* `HttpOnly` cookies can prevent JavaScript from directly reading cookie values, while Web Storage has no equivalent mechanism.
* IndexedDB is more appropriate for larger structured client-side data.
* Cache Storage is designed for request/response caching rather than arbitrary application key/value state.
* Persist only data that genuinely needs persistence.
* Keep transient React UI state in React rather than automatically persisting everything.
* In React, browser storage is usually a persistence layer around application state, not a replacement for state.
* In Next.js, `localStorage` and `sessionStorage` are browser APIs and therefore belong to client-side execution.
* Server Components cannot directly access browser storage.
* Browser storage can create hydration issues when its value differs from the server-rendered initial state.
* Theme and user-preference persistence are strong use cases for `localStorage`.
* Temporary per-tab workflows and drafts can be good `sessionStorage` use cases.
* The backend/database should remain authoritative for server-side application data and permissions.

The central principle is:

> **Use Web Storage for small, non-sensitive client-side persistence; keep application state and persistent storage conceptually separate, validate stored data, handle storage failure, and never treat browser storage as a trusted security boundary.**
