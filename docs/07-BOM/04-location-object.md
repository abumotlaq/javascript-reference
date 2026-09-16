# Location Object

## Introduction

The `Location` object represents the URL and navigation state of the current browsing context.

It is available through:

```javascript id="xq2f5m"
window.location;
```

and commonly accessed simply as:

```javascript id="b6c0ae"
location;
```

For example:

```javascript id="w4r7qa"
console.log(location.href);
```

might produce:

```text id="qf8n1m"
https://example.com/projects?page=2#details
```

The `Location` object allows JavaScript to:

* Read the current URL.
* Read individual URL components.
* Navigate to another URL.
* Reload the current document.
* Replace the current history entry.
* Work with query strings.
* Read URL fragments.
* Understand the current origin.

A useful mental model is:

```text id="gm7r4s"
window
  ↓
location
  ↓
Current URL
  ├── protocol
  ├── host
  ├── hostname
  ├── port
  ├── pathname
  ├── search
  ├── hash
  └── origin
```

---

# 1. What Is the `Location` Object?

The `Location` object represents the URL of the current document and provides navigation-related methods.

For example:

```javascript id="qf0x6n"
console.log(window.location);
```

or:

```javascript id="wvkm2h"
console.log(location);
```

The browser uses this object to represent information such as:

```text id="1z7c9s"
Current protocol
Current host
Current pathname
Query string
Fragment
Origin
```

It can also be used to navigate:

```javascript id="b0q6hn"
location.href = "/projects";
```

---

# 2. The URL Anatomy

Consider this URL:

```text id="yg9o4p"
https://user:password@example.com:443/projects/list?page=2&sort=asc#details
```

It can be broken into parts:

```text id="6ry6k6"
https://
│
├── protocol
│
user:password@
│
├── credentials
│
example.com
│
├── hostname
│
:443
│
├── port
│
/projects/list
│
├── pathname
│
?page=2&sort=asc
│
├── search
│
#details
│
└── hash
```

The `Location` object exposes many of these components separately.

---

# 3. `location.href`

The `href` property represents the complete URL.

Example:

```javascript id="t1l2mi"
console.log(location.href);
```

Possible result:

```text id="i1b2wv"
https://example.com/projects?page=2#details
```

You can also assign a new URL:

```javascript id="y8a9cf"
location.href = "/about";
```

This requests navigation to:

```text id="ezp3qj"
/about
```

---

# 4. `href` Is the Full URL

Suppose the browser is currently at:

```text id="hqxif1"
https://example.com/projects?page=2#details
```

Then:

```javascript id="0l02p1"
location.href;
```

contains the entire URL.

This is different from:

```javascript id="oq5f5m"
location.pathname;
```

which contains only:

```text id="0f4pm2"
/projects
```

---

# 5. Reading vs Assigning `href`

Reading:

```javascript id="t6h2xj"
const currentUrl = location.href;
```

gets the current URL.

Assigning:

```javascript id="n9snr3"
location.href = "/contact";
```

requests navigation.

This distinction appears throughout browser APIs:

```text id="0nhko4"
Read
→ inspect state

Assign / call
→ change browser behavior
```

---

# 6. `location.protocol`

The `protocol` property identifies the URL scheme.

Example:

```javascript id="f9f2c1"
console.log(location.protocol);
```

For:

```text id="3m5h4b"
https://example.com
```

the result is:

```text id="xymj2u"
https:
```

Notice the colon.

Examples include:

```text id="9j73wh"
http:
https:
file:
```

The available protocols depend on the environment and URL.

---

# 7. `http:` vs `https:`

You may see:

```javascript id="a7qf60"
location.protocol === "https:"
```

This can be useful when determining whether the page is using HTTPS.

For production web applications:

```text id="wv4o9z"
HTTPS
```

is the normal secure deployment model.

However, do not implement security decisions based solely on client-side checks.

Security should be enforced by the server and browser security model.

---

# 8. `location.host`

The `host` property includes:

```text id="x5lq4v"
hostname + port
```

For example:

```javascript id="ac5nuy"
console.log(location.host);
```

For:

```text id="os2t6a"
https://example.com:8080/projects
```

the result is:

```text id="ipax0w"
example.com:8080
```

If the URL uses the default port, the port may not appear explicitly.

---

# 9. `location.hostname`

The `hostname` property contains only the host name.

Example:

```javascript id="wpd2dy"
console.log(location.hostname);
```

For:

```text id="03q1w7"
https://example.com:8080/projects
```

the result is:

```text id="4gcf5b"
example.com
```

The port is excluded.

---

# 10. `host` vs `hostname`

This difference is important:

```text id="r1w75g"
host
→ hostname + port

hostname
→ hostname only
```

For:

```text id="1x3o5m"
https://example.com:8080
```

you can conceptually expect:

```text id="1g4b2d"
host
→ example.com:8080

hostname
→ example.com
```

---

# 11. `location.port`

The `port` property contains the explicit port when present.

Example:

```javascript id="4drf2a"
console.log(location.port);
```

For:

```text id="mt9yo4"
https://example.com:8080
```

the result is:

```text id="4b3s8o"
8080
```

If the URL uses the default port and it is not explicitly represented, the value may be an empty string.

---

# 12. `location.pathname`

The `pathname` property contains the path portion of the URL.

Example:

```javascript id="8pyiz3"
console.log(location.pathname);
```

For:

```text id="d1p2z3"
https://example.com/projects/frontend
```

the result is:

```text id="9c1fg8"
/projects/frontend
```

It does not include:

```text id="flqr4h"
?query
```

or:

```text id="v7n0nr"
#hash
```

---

# 13. Pathname in Web Applications

The pathname is often used to identify the current page or route.

For example:

```javascript id="hc88r4"
if (location.pathname === "/projects") {
  console.log("Projects page");
}
```

This can be useful in simple vanilla JavaScript applications.

In React and Next.js, however, you will usually use the framework's routing APIs instead of manually inspecting `location.pathname`.

---

# 14. `location.search`

The `search` property contains the query string, including the leading `?`.

Example:

```javascript id="3ax1k4"
console.log(location.search);
```

For:

```text id="y2sv2e"
https://example.com/search?q=javascript&page=2
```

the result is:

```text id="ymp85x"
?q=javascript&page=2
```

---

# 15. Query Strings

A query string allows a URL to carry structured parameters.

For example:

```text id="4n1gux"
/search?q=javascript&page=2
```

contains:

```text id="iyfko3"
q = javascript
page = 2
```

Do not manually parse complex query strings with:

```javascript id="3j3dnu"
location.search.split("&");
```

Prefer:

```javascript id="7j5a7l"
new URLSearchParams(location.search);
```

---

# 16. `URLSearchParams`

Example:

```javascript id="g2nfrs"
const params = new URLSearchParams(
  location.search
);
```

Now:

```javascript id="xso2v5"
params.get("q");
```

might return:

```text id="4y3s74"
javascript
```

And:

```javascript id="02y7j7"
params.get("page");
```

might return:

```text id="04r7v1"
2
```

---

# 17. `get()`

Read a parameter:

```javascript id="26t7c3"
const params = new URLSearchParams(
  location.search
);

const query = params.get("q");
```

If the parameter does not exist:

```javascript id="0eg3ub"
params.get("missing");
```

returns:

```text id="0h7jmg"
null
```

Do not assume every parameter exists.

---

# 18. `has()`

Check whether a parameter exists:

```javascript id="qk6v8j"
if (params.has("page")) {
  console.log("Page parameter exists.");
}
```

This is useful when the presence of a parameter has meaning even if its value is empty.

---

# 19. `getAll()`

A query parameter can appear multiple times.

For:

```text id="dlrf2o"
?tag=react&tag=javascript&tag=nextjs
```

use:

```javascript id="a1f2u0"
params.getAll("tag");
```

which returns:

```javascript id="t9s0so"
[
  "react",
  "javascript",
  "nextjs"
]
```

This is preferable to assuming every query parameter has exactly one value.

---

# 20. `location.hash`

The `hash` property contains the URL fragment, including the leading `#`.

Example:

```javascript id="5w8f3y"
console.log(location.hash);
```

For:

```text id="na0zla"
https://example.com/docs#installation
```

the result is:

```text id="4q3v9r"
#installation
```

---

# 21. Hash Navigation

The URL fragment is commonly used to identify a section within a page.

Example:

```html id="3i6j8v"
<section id="projects">
  Projects
</section>
```

A link:

```html id="1w9h3m"
<a href="#projects">
  Projects
</a>
```

updates the URL to something like:

```text id="r8r4i2"
#projects
```

and the browser can scroll to the matching element.

This is a native browser feature and often does not require JavaScript.

---

# 22. Reading the Hash

You can inspect:

```javascript id="5j3i3p"
console.log(location.hash);
```

You may want to remove the `#`:

```javascript id="7y4xw9"
const hash = location.hash.slice(1);
```

For example:

```text id="q4t9m8"
#projects
```

becomes:

```text id="v6hr7k"
projects
```

Remember that the value can be empty:

```javascript id="xvsm5a"
location.hash === "";
```

---

# 23. Hash Values Are User-Controlled Input

A browser user can navigate to:

```text id="pkq0i8"
https://example.com/#something
```

or construct URLs containing arbitrary fragments.

Therefore, treat:

```javascript id="6w7m3j"
location.hash
```

as input rather than trusted application state.

If you render the value:

```javascript id="qk6p2g"
element.textContent = location.hash;
```

rather than injecting it into HTML.

---

# 24. `location.origin`

The `origin` property identifies the URL's origin.

Example:

```javascript id="p0qms6"
console.log(location.origin);
```

For:

```text id="ypw7j8"
https://example.com:8443/projects
```

the origin is:

```text id="9q9rdd"
https://example.com:8443
```

It consists conceptually of:

```text id="94y1jx"
scheme + hostname + port
```

The origin is important for:

* Same-origin policy.
* `postMessage()`.
* CORS concepts.
* Cookie scope.
* Browser security.

---

# 25. Origin vs Host

Compare:

```javascript id="9jquhp"
location.origin;
```

with:

```javascript id="z1k0cf"
location.host;
```

For:

```text id="9bwmz9"
https://example.com:8443
```

you get:

```text id="tb5h1a"
origin
→ https://example.com:8443

host
→ example.com:8443
```

The origin includes the protocol.

---

# 26. Complete Location Breakdown

Suppose the URL is:

```text id="9oe04j"
https://example.com:8080/projects/list?page=2&tag=react#details
```

Then:

| Property   | Value                      |
| ---------- | -------------------------- |
| `protocol` | `https:`                   |
| `host`     | `example.com:8080`         |
| `hostname` | `example.com`              |
| `port`     | `8080`                     |
| `pathname` | `/projects/list`           |
| `search`   | `?page=2&tag=react`        |
| `hash`     | `#details`                 |
| `origin`   | `https://example.com:8080` |
| `href`     | Complete URL               |

This table is worth remembering.

---

# 27. `location.assign()`

The `assign()` method navigates to a new URL.

Example:

```javascript id="6j4e6v"
location.assign("/projects");
```

You can also use an absolute URL:

```javascript id="e8w3uh"
location.assign(
  "https://example.com/projects"
);
```

The new page becomes the current document.

---

# 28. `assign()` and Browser History

When you navigate with:

```javascript id="qok4e2"
location.assign("/projects");
```

the browser generally creates a new history entry.

Conceptually:

```text id="fk7j7e"
Current page
    ↓
assign()
    ↓
New page
    ↓
Back button can return
```

This is the important distinction from `replace()`.

---

# 29. `location.href` vs `location.assign()`

These are commonly used for navigation:

```javascript id="rtq5h2"
location.href = "/projects";
```

and:

```javascript id="cz2ifj"
location.assign("/projects");
```

Both request navigation.

For everyday code:

```javascript id="h2fpir"
location.href = "/projects";
```

is concise.

While:

```javascript id="n0gqit"
location.assign("/projects");
```

explicitly communicates:

> Navigate to this URL.

---

# 30. `location.replace()`

The `replace()` method navigates to another URL without creating a new history entry for the current document.

Example:

```javascript id="t2x7wf"
location.replace("/login");
```

Conceptually:

```text id="3u4i94"
Current page
    ↓
replace()
    ↓
New page
```

The user cannot normally use the Back button to return to the replaced entry.

---

# 31. `assign()` vs `replace()`

This is one of the most important distinctions in the `Location` API.

### `assign()`

```javascript id="nqvsfr"
location.assign("/projects");
```

creates a new navigation history entry.

### `replace()`

```javascript id="nmg6xt"
location.replace("/projects");
```

replaces the current history entry.

Mental model:

```text id="5sl4jx"
assign()

A → B

History:
A → B


replace()

A → B

History:
B
```

In the second case, the old current entry is replaced.

---

# 32. When `replace()` Is Useful

A common use case is redirecting away from a temporary page.

For example:

```javascript id="8gmm5s"
location.replace("/dashboard");
```

after a successful authentication flow.

The goal may be to prevent:

```text id="9olnzc"
User logs in
 ↓
Dashboard
 ↓
Back
 ↓
Login page
```

from being a useful navigation path.

The exact authentication architecture should still be designed carefully.

---

# 33. `location.reload()`

Reload the current document:

```javascript id="4k3qkv"
location.reload();
```

This requests a page reload.

A modern application should not use reloads as the default solution for updating UI state.

If React state or data fetching can update the relevant UI, a full page reload is often unnecessary.

---

# 34. Reload vs React State

Instead of:

```javascript id="2kkl5e"
location.reload();
```

after changing some client-side state, React applications generally prefer:

```text id="6if9kx"
Update state
   ↓
Render
   ↓
UI updates
```

A full reload:

```text id="9qd9e6"
Browser reload
   ↓
Download / execute application again
   ↓
Rebuild page
```

is substantially heavier.

---

# 35. Relative URLs

You can navigate using:

```javascript id="7ck5n5"
location.href = "/projects";
```

This is a root-relative URL.

You can also use:

```javascript id="nysru5"
location.href = "projects";
```

whose resolution depends on the current document URL.

Using explicit root-relative or absolute URLs is often clearer when the intended destination is unambiguous.

---

# 36. Absolute URLs

Example:

```javascript id="k4rv1n"
location.href = "https://example.com/projects";
```

This navigates to the specified absolute URL.

Be careful when URLs come from users or external data.

Do not blindly assign arbitrary strings as navigation targets.

---

# 37. URL Validation

Suppose:

```javascript id="nu2sjh"
const value = input.value;
```

and you want to navigate:

```javascript id="h04eq4"
location.href = value;
```

This can be dangerous if the value is attacker-controlled.

Validate the expected URL scheme and destination.

For example:

```javascript id="h6k9fz"
function getSafeHttpUrl(value) {
  try {
    const url = new URL(
      value,
      window.location.origin
    );

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}
```

Then:

```javascript id="v9s04u"
const safeUrl = getSafeHttpUrl(value);

if (safeUrl) {
  location.href = safeUrl;
}
```

The correct allowlist depends on the application.

---

# 38. Avoid `javascript:` URLs

Do not blindly navigate to:

```text id="l0s9n5"
javascript:...
```

A `javascript:` URL can be interpreted as executable JavaScript by the browser.

This is why untrusted URL values should be validated rather than blindly assigned to:

```javascript id="vkj0qv"
location.href;
```

or:

```javascript id="lg7x2v"
link.href;
```

---

# 39. Location and Same-Origin Security

The `Location` object's values are also relevant to browser security.

The current origin:

```javascript id="1vryo5"
location.origin;
```

helps define the security boundary between documents.

For example:

```text id="wq20wx"
https://example.com
```

is a different origin from:

```text id="r7kjad"
https://api.example.com
```

because the host differs.

Origin comparisons should follow browser same-origin rules rather than simplistic string assumptions.

---

# 40. `location.origin` for `postMessage()`

When sending a message to a known same-origin target:

```javascript id="5lsr6s"
window.postMessage(
  {
    type: "READY"
  },
  location.origin
);
```

the second argument specifies the intended target origin.

When receiving:

```javascript id="ynq3v5"
window.addEventListener(
  "message",
  (event) => {
    if (event.origin !== location.origin) {
      return;
    }

    // Validate event.data too.
  }
);
```

Origin validation is a core security pattern.

---

# 41. `location.toString()`

The `Location` object can be converted to a URL string.

For example:

```javascript id="df63o2"
console.log(location.toString());
```

This represents the current URL as a string.

In normal code:

```javascript id="q2fp9n"
location.href;
```

is more explicit.

---

# 42. `location` and String Conversion

Because `Location` can be represented as a URL string, code like:

```javascript id="xl5a6c"
console.log(String(location));
```

produces the current URL string.

However, prefer the specific property that communicates your intent:

```javascript id="e8m4bm"
location.href;
```

for the full URL.

---

# 43. Assigning to `location`

You can navigate by assigning a URL:

```javascript id="atb2a7"
location = "/projects";
```

or:

```javascript id="cdm1q2"
location.href = "/projects";
```

However, explicit code is generally clearer with:

```javascript id="y50jyl"
location.href = "/projects";
```

or:

```javascript id="nlkwpk"
location.assign("/projects");
```

These communicate the navigation intent more clearly.

---

# 44. Setting Individual URL Components

Some `Location` properties can be assigned.

For example:

```javascript id="v4r1o0"
location.hash = "#projects";
```

This updates the fragment.

You can also use:

```javascript id="0xy7ia"
location.pathname = "/projects";
```

which requests navigation to the resulting URL.

Be careful when modifying URL components individually because the browser constructs the final URL from the resulting location state.

---

# 45. Changing the Hash Without Full Navigation

Updating:

```javascript id="xh5ve2"
location.hash = "#projects";
```

can move to a fragment within the current document without performing a complete document navigation.

This is useful for:

* In-page navigation.
* Lightweight state encoded in the URL.
* Browser history interactions.

The browser can also emit:

```javascript id="5j4b32"
hashchange
```

when the URL fragment changes.

---

# 46. `hashchange` Event

Example:

```javascript id="r9qp9s"
window.addEventListener(
  "hashchange",
  () => {
    console.log(location.hash);
  }
);
```

Now when the fragment changes:

```text id="a0u8f7"
#about
```

to:

```text id="y3i4ma"
#projects
```

the event can notify your application.

---

# 47. Hash-Based Navigation and SPA Concepts

Before modern client-side routers became common, many single-page applications used the URL hash for navigation:

```text id="6g5jco"
example.com/#about
example.com/#projects
example.com/#contact
```

A JavaScript application could inspect:

```javascript id="9o5ai6"
location.hash;
```

and render the corresponding content.

Modern routers often use cleaner path-based URLs such as:

```text id="3o6n9l"
/about
/projects
/contact
```

The History API can update these URLs without full document reloads.

---

# 48. Location and `popstate`

The `Location` object and History API work together.

When the user navigates through browser history, applications may listen for:

```javascript id="8gykwu"
window.addEventListener(
  "popstate",
  handleNavigation
);
```

The current URL can then be read from:

```javascript id="g8dxrf"
location.href;
```

The exact behavior depends on whether the navigation is hash-based, History API-based, or a full document navigation.

---

# 49. Location in React

In React, you may read browser location directly:

```javascript id="l9u89q"
window.location.pathname;
```

but for application routing, use the routing system you are working with.

For example, a router can provide:

```text id="xq2g0a"
current route
route parameters
search parameters
navigation helpers
```

This is preferable to manually rebuilding a router around `window.location`.

---

# 50. Location in Next.js

Next.js provides routing APIs that abstract browser navigation.

For client components, you may use router APIs rather than:

```javascript id="4kq6m0"
window.location.href = "/projects";
```

when performing internal application navigation.

Why?

Because framework navigation can preserve application behavior such as:

* Client-side transitions.
* Prefetching.
* Layout preservation.
* Route state.
* Framework-managed data loading.

For a normal external navigation, standard browser URLs remain appropriate.

---

# 51. Hard Navigation vs Client Navigation

This distinction is important.

Using:

```javascript id="w9z4bd"
window.location.href = "/projects";
```

requests a browser navigation.

A framework router may instead perform:

```text id="m8nj3s"
Client-side route transition
```

without rebuilding the entire document in the same way as a hard navigation.

Therefore, in a Next.js application, do not automatically use `window.location` for internal routing.

---

# 52. When Direct `location` Usage Makes Sense in Next.js

Direct browser location APIs can still be appropriate when you genuinely need browser-level behavior.

Examples include:

* External URL navigation.
* Reading browser-specific URL state in client-only code.
* Integrating with third-party browser APIs.
* Full page reloads when explicitly required.
* Browser-level navigation scenarios.

For internal application routing, prefer the framework's routing APIs.

---

# 53. Location and Query Parameters in React

For a vanilla application:

```javascript id="w6qptv"
const params = new URLSearchParams(
  location.search
);

const query = params.get("q");
```

In React, a router or framework may provide a dedicated search-parameter API.

The conceptual flow remains:

```text id="mtflbq"
URL
 ↓
Query parameters
 ↓
Application state
 ↓
UI
```

The URL can therefore become a source of shareable application state.

---

# 54. URL State

Examples of useful URL state include:

```text id="7wgj0q"
?page=2
?search=react
?sort=latest
?category=frontend
```

This has important advantages:

* Shareable URLs.
* Browser back/forward support.
* Bookmarkability.
* Refresh persistence.
* Deep links.

Not every piece of UI state belongs in the URL.

Use URL state when the state represents a meaningful navigable view.

---

# 55. Location and Form Data

`URLSearchParams` can also work with form-like data.

For example:

```javascript id="0p91h4"
const params = new URLSearchParams({
  q: "React",
  page: "2"
});

console.log(params.toString());
```

produces a query string such as:

```text id="s2d9ph"
q=React&page=2
```

Then:

```javascript id="0fjgcg"
const url = `/search?${params}`;
```

This is safer and cleaner than manually concatenating strings.

---

# 56. Encoding Query Values

Avoid:

```javascript id="z60v3p"
const url = `/search?q=${query}`;
```

when `query` may contain special characters.

Prefer:

```javascript id="t8v2m8"
const params = new URLSearchParams({
  q: query
});

const url = `/search?${params}`;
```

This handles URL encoding appropriately.

---

# 57. `location.search` Is a String

Remember:

```javascript id="a4h4bo"
location.search
```

is a string such as:

```text id="43vllm"
?q=react&page=2
```

It is not already an object.

To work with parameters:

```javascript id="z8ngs1"
const params = new URLSearchParams(
  location.search
);
```

Then use:

```javascript id="w6wq9f"
params.get("q");
```

---

# 58. `location.hash` Is Also a String

Similarly:

```javascript id="3q6ymp"
location.hash
```

may be:

```text id="yr2sff"
#projects
```

If you need the identifier without the `#`:

```javascript id="mm75n2"
const section = location.hash.slice(1);
```

But validate the resulting value before using it as a selector or another security-sensitive operation.

---

# 59. Avoid Unsafe Selector Construction

Suppose the URL contains:

```text id="f3qnqq"
#"
```

and you do:

```javascript id="2yjlxh"
document.querySelector(location.hash);
```

This can produce selector-related errors or unintended behavior.

If you need to convert an arbitrary ID into a selector, consider:

```javascript id="g7zuws"
const id = location.hash.slice(1);

const element = document.getElementById(id);
```

This is often simpler.

For arbitrary selector construction, use appropriate escaping such as:

```javascript id="b74qg8"
CSS.escape(value);
```

when constructing CSS selectors.

---

# 60. Location Security: Never Trust the URL

The URL can be influenced by users and external systems.

Potentially untrusted values include:

```javascript id="odr7i7"
location.search;
location.hash;
location.pathname;
```

Therefore:

```text id="n5m5s4"
URL input
  ↓
Validate / parse
  ↓
Use safely
```

Do not assume:

```text id="2t1a6g"
URL data = trusted application data
```

---

# 61. Open Redirects

An open redirect can occur when an application accepts a destination from user-controlled input and redirects without sufficiently restricting it.

Potentially dangerous:

```javascript id="j7sv4i"
const next = params.get("next");

if (next) {
  location.href = next;
}
```

An attacker could potentially supply an unexpected external destination.

A safer architecture usually:

* Restricts destinations.
* Allows only known internal paths.
* Uses an explicit allowlist.
* Avoids arbitrary external redirects.

---

# 62. Safer Internal Redirects

If the application only intends to support internal destinations, validate accordingly.

For example:

```javascript id="v6yyo8"
function getSafeInternalPath(value) {
  if (!value) {
    return "/";
  }

  if (!value.startsWith("/")) {
    return "/";
  }

  if (value.startsWith("//")) {
    return "/";
  }

  return value;
}
```

Then:

```javascript id="qp2v5a"
location.assign(
  getSafeInternalPath(
    params.get("next")
  )
);
```

This is only a simple example.

Real applications should define their navigation rules explicitly.

---

# 63. `//example.com` and Why It Matters

A string beginning with:

```text id="d1n9pc"
//example.com
```

is a protocol-relative URL.

That means the browser can interpret it as an external URL using the current scheme.

Therefore, a naïve check such as:

```javascript id="ad4j2j"
value.startsWith("/")
```

is insufficient to guarantee that the URL is internal.

This is why URL validation should consider the full URL semantics.

---

# 64. Relative vs Absolute URL Security

These values may look similar:

```text id="lfx8j0"
/projects

//example.com

https://example.com/projects
```

but they have different navigation behavior.

Applications that accept user-controlled destinations must understand URL parsing rather than relying on simple string prefixes.

---

# 65. Using `new URL()` for Robust Parsing

A powerful pattern is:

```javascript id="3aq4ep"
const url = new URL(
  value,
  location.origin
);
```

Now you can inspect:

```javascript id="7nc0gq"
url.origin;
url.protocol;
url.hostname;
url.pathname;
url.search;
url.hash;
```

This is often safer and clearer than manually parsing strings.

---

# 66. Example: Allow Only Same-Origin URLs

```javascript id="3x4gwu"
function getSameOriginUrl(value) {
  try {
    const url = new URL(
      value,
      location.origin
    );

    if (url.origin !== location.origin) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}
```

Then:

```javascript id="9k1nh8"
const url = getSameOriginUrl(
  params.get("next")
);

if (url) {
  location.assign(url.href);
}
```

This is a useful defensive pattern when the application intends to allow only same-origin navigation.

---

# 67. Location and Privacy

URLs can contain sensitive information.

For example:

```text id="4ltqyt"
https://example.com/reset?token=...
```

or:

```text id="z51cse"
/search?email=...
```

Avoid putting sensitive secrets into URLs unnecessarily because URLs can appear in:

* Browser history.
* Logs.
* Analytics.
* Referer-related flows.
* Screenshots.
* Copy/paste.
* Monitoring systems.

Use appropriate server-side designs for sensitive information.

---

# 68. Tokens in Query Strings

Be careful with patterns such as:

```text id="1q4jfc"
/reset-password?token=SECRET
```

A URL parameter may be exposed to places where developers did not expect it.

Security-sensitive credentials or tokens should be designed with:

* Appropriate expiration.
* Limited scope.
* HTTPS.
* Careful server handling.
* Controlled exposure.

Do not treat query parameters as private storage.

---

# 69. Location and Authentication

Do not assume:

```text id="a9q2wy"
/dashboard?role=admin
```

means the user is an administrator.

The URL is user-controlled.

Likewise:

```javascript id="c6a8to"
if (location.search.includes("admin")) {
  // ...
}
```

cannot be a security decision.

Authentication and authorization must be enforced by trusted server-side logic.

---

# 70. `location.reload()` and Cache

A page reload can involve browser caching behavior.

Do not build application logic around assumptions such as:

```text id="8skk6m"
reload()
→ always downloads every file again
```

The browser has its own cache and network rules.

If the goal is refreshing application data, a data-fetching or state-management strategy may be more appropriate than reloading the entire document.

---

# 71. Location and History

`Location` and `History` are closely connected.

For example:

```javascript id="0d6bsx"
location.assign("/projects");
```

creates navigation.

Whereas:

```javascript id="6d1n6z"
history.pushState(
  {},
  "",
  "/projects"
);
```

can change the URL and history without performing a full document navigation.

This distinction is fundamental to single-page applications.

The History API will be covered in:

```text id="jf2k5y"
05-history-object.md
```

---

# 72. Location and SPA Routing

A traditional browser navigation might work like:

```text id="2u8ox4"
Click link
   ↓
Request new document
   ↓
Browser loads page
```

A single-page application may instead:

```text id="v7q9q4"
Click link
   ↓
Router handles navigation
   ↓
URL changes
   ↓
Application state changes
   ↓
UI updates
```

The `Location` and History APIs provide the browser-level foundation for this behavior.

React routing libraries and Next.js build higher-level abstractions on top of browser navigation concepts.

---

# 73. Hash vs Path Routing

Hash-based:

```text id="rdh1s4"
example.com/#projects
```

Path-based:

```text id="r5g6y2"
example.com/projects
```

Hash routing does not normally require server configuration for the fragment itself because the fragment is handled client-side.

Path-based routing often requires the server/framework to correctly handle the requested path.

Modern frameworks such as Next.js commonly use path-based routing.

---

# 74. Location and Browser Back Button

When navigation changes the URL:

```javascript id="v6z8ul"
location.assign("/projects");
```

the browser history is affected.

The user can then typically use:

```text id="97tq0f"
Back
```

to return to the previous document.

This is one reason navigation should be designed with history behavior in mind.

A URL is not merely a string.

It participates in the user's navigation model.

---

# 75. Location and React State

A useful frontend architecture is:

```text id="6ykf6t"
URL
 ↓
Parse
 ↓
Application state
 ↓
UI
```

For example:

```text id="y7xrr4"
/projects?page=2&sort=latest
```

can become:

```javascript id="f2pvi7"
{
  page: 2,
  sort: "latest"
}
```

The UI then renders according to that state.

This is a powerful pattern for shareable, navigable application views.

---

# 76. Avoid Duplicating URL State Without a Reason

Suppose the URL contains:

```text id="li9jz0"
?page=2
```

and you also maintain:

```javascript id="qmz6xy"
let page = 2;
```

You now have two potential sources of truth.

A clear architecture should decide:

```text id="k8a1y0"
URL is source of truth
```

or:

```text id="x6a91q"
Application state is source of truth
```

and define how synchronization happens.

Do not let them diverge accidentally.

---

# 77. URL as Application State

URL state is especially useful for:

* Pagination.
* Search queries.
* Filters.
* Sorting.
* Selected views.
* Tabs that should be shareable.
* Resource identifiers.

For example:

```text id="p48p7n"
/projects?category=react&sort=latest
```

can be copied to another user and produce the same view.

This is one of the biggest advantages of URL-based state.

---

# 78. When Not to Put State in the URL

Do not put sensitive or highly temporary UI state into the URL without a reason.

Examples that may not belong there:

* Passwords.
* Private tokens.
* Internal secrets.
* Large temporary objects.
* Highly transient animation state.

The URL is visible and persistent in many contexts.

Use appropriate client or server state instead.

---

# 79. Location API in Vanilla JavaScript

Example:

```javascript id="k8qh18"
function getCurrentRoute() {
  return {
    path: location.pathname,
    query: new URLSearchParams(
      location.search
    ),
    hash: location.hash
  };
}

console.log(getCurrentRoute());
```

This groups related URL information into a useful application-level representation.

---

# 80. Location API in React

A simplified pattern:

```jsx id="8r2n2k"
import { useEffect, useState } from "react";

function CurrentPath() {
  const [path, setPath] = useState(
    () => window.location.pathname
  );

  useEffect(() => {
    const handleNavigation = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener(
      "popstate",
      handleNavigation
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleNavigation
      );
    };
  }, []);

  return <p>{path}</p>;
}
```

This demonstrates the underlying browser mechanics.

In a real React application with a router, use the router's location API instead of manually recreating routing state.

---

# 81. Location API in Next.js

Next.js abstracts routing through framework APIs.

For internal navigation, use the appropriate Next.js router or link components.

For example, the conceptual flow is:

```text id="8m8xq1"
<Link>
   ↓
Next.js routing
   ↓
URL / route
   ↓
UI update
```

rather than:

```javascript id="8gf4os"
window.location.href = "/projects";
```

for every internal navigation.

Direct `window.location` remains useful when browser-level navigation is specifically required.

---

# 82. Location and `window.location` in Server Code

This will fail in a server environment:

```javascript id="rjro05"
window.location.href;
```

because the browser `window` does not exist there.

In Next.js, the server has its own request and URL abstractions.

This is another reason to understand the boundary between:

```text id="jhy4te"
Browser URL
```

and:

```text id="7s7y9u"
Server request URL
```

They are related but not the same API.

---

# 83. Location and Encoding

URLs require encoding for special characters.

For query parameters:

```javascript id="q5j5jo"
const params = new URLSearchParams({
  q: "Osama Abu Motlaq"
});
```

The browser produces an encoded query representation.

Do not manually encode every part with the same function.

Use the API that matches the URL component you are constructing.

---

# 84. `decodeURIComponent()` Is Not a Full URL Parser

Developers sometimes try:

```javascript id="gp9b4g"
decodeURIComponent(location.search);
```

This is not the correct way to parse query parameters.

Use:

```javascript id="i2pyz8"
new URLSearchParams(location.search);
```

Similarly, use:

```javascript id="2m2vni"
new URL(value);
```

for complete URL parsing.

Choose the API that matches the data structure.

---

# 85. Use `URL` When You Need Multiple Components

Instead of:

```javascript id="s6of5h"
const path = location.pathname;
const query = location.search;
const hash = location.hash;
```

you can parse another URL:

```javascript id="uf6d3a"
const url = new URL(
  "https://example.com/projects?page=2#details"
);

console.log(url.pathname);
console.log(url.search);
console.log(url.hash);
```

This is especially useful when working with URLs that are not the current page URL.

---

# 86. Current URL vs Arbitrary URL

`location` represents:

```text id="p7ft2q"
Current browsing context
```

`URL` lets you work with:

```text id="d6r4nd"
Any URL string
```

For example:

```javascript id="xk96m0"
const current = new URL(
  location.href
);
```

or:

```javascript id="1is2iw"
const external = new URL(
  "https://example.com/projects"
);
```

This distinction is useful.

---

# 87. `Location` Is Mutable

Some properties can be assigned to trigger navigation or URL changes.

For example:

```javascript id="xkt94s"
location.hash = "#projects";
```

or:

```javascript id="mq48vp"
location.href = "/about";
```

This means `Location` is not merely a read-only URL object.

It combines:

```text id="26er6z"
URL representation
+
navigation behavior
```

---

# 88. Location Methods vs URL Object

Compare:

```javascript id="6x9jnq"
location.assign("/projects");
```

with:

```javascript id="t6q14r"
const url = new URL(
  "/projects",
  location.origin
);
```

The first:

```text id="2u69ma"
navigates
```

The second:

```text id="s2k2zx"
constructs/parses a URL
```

This is a useful distinction:

```text id="v8x5pw"
Location
→ current URL + navigation

URL
→ URL representation + parsing/manipulation
```

---

# 89. Common Mistakes

## Mistake 1: Treating `location.search` as an object

It is a string.

Use:

```javascript id="4mi7x4"
new URLSearchParams(location.search);
```

---

## Mistake 2: Confusing `host` and `hostname`

`host` can include the port.

---

## Mistake 3: Forgetting the leading `?`

`location.search` includes it.

---

## Mistake 4: Forgetting the leading `#`

`location.hash` includes it.

---

## Mistake 5: Parsing URLs manually with string operations

Use `URL` and `URLSearchParams`.

---

## Mistake 6: Blindly assigning user input to `location.href`

Validate untrusted URLs.

---

## Mistake 7: Trusting query parameters for authorization

The URL is user-controlled.

---

## Mistake 8: Using `location.reload()` for ordinary state updates

Prefer application state updates when possible.

---

## Mistake 9: Using `window.location` for internal Next.js navigation

Prefer framework routing APIs.

---

## Mistake 10: Putting sensitive data in URLs

URLs can be exposed through history, logs, analytics, and other browser mechanisms.

---

# 90. Best Practices

## 1. Use the right property

```text id="3q5t4o"
href
→ complete URL

origin
→ origin

pathname
→ path

search
→ query string

hash
→ fragment

host
→ hostname + port

hostname
→ hostname

port
→ port
```

---

## 2. Use `URLSearchParams` for query strings

Avoid manual splitting.

---

## 3. Use `URL` for arbitrary URLs

It provides structured parsing and manipulation.

---

## 4. Validate redirect destinations

Especially when values come from:

* Query parameters.
* External APIs.
* User input.

---

## 5. Prefer internal router APIs in React frameworks

Use browser `location` directly only when the browser-level behavior is intentional.

---

## 6. Keep sensitive information out of URLs

The URL is not a secret channel.

---

## 7. Treat `location` values as untrusted input

The user controls the browser URL.

---

## 8. Use history intentionally

Understand whether navigation should:

```text id="jrgs5m"
add history
```

or:

```text id="9eh0pv"
replace history
```

---

# 91. Quick Reference

| Property / Method     | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `location.href`       | Complete current URL                       |
| `location.origin`     | Scheme + host + port                       |
| `location.protocol`   | URL protocol                               |
| `location.host`       | Hostname + port                            |
| `location.hostname`   | Hostname                                   |
| `location.port`       | Port                                       |
| `location.pathname`   | URL path                                   |
| `location.search`     | Query string                               |
| `location.hash`       | Fragment                                   |
| `location.assign()`   | Navigate and add history entry             |
| `location.replace()`  | Navigate and replace current history entry |
| `location.reload()`   | Reload current document                    |
| `location.toString()` | Convert location to URL string             |

---

# 92. URL Component Reference

For:

```text id="s7s9a7"
https://example.com:8443/projects?page=2&sort=latest#details
```

| Component | Value                      |
| --------- | -------------------------- |
| Protocol  | `https:`                   |
| Host      | `example.com:8443`         |
| Hostname  | `example.com`              |
| Port      | `8443`                     |
| Pathname  | `/projects`                |
| Search    | `?page=2&sort=latest`      |
| Hash      | `#details`                 |
| Origin    | `https://example.com:8443` |
| Href      | Full URL                   |

---

# 93. Navigation Decision Guide

### Need normal internal link?

Use:

```html id="x9o4yb"
<a href="/projects">Projects</a>
```

or the appropriate framework link component.

### Need browser-level navigation?

Use:

```javascript id="k1i7mu"
location.assign("/projects");
```

### Need navigation without preserving the current history entry?

Use:

```javascript id="3mtdt5"
location.replace("/projects");
```

### Need full page reload?

Use:

```javascript id="52f6qg"
location.reload();
```

### Need only update the hash?

Use:

```javascript id="5u1j7o"
location.hash = "#projects";
```

### Need query parameters?

Use:

```javascript id="ntk5q5"
const params = new URLSearchParams();
```

### Need to construct or parse an arbitrary URL?

Use:

```javascript id="f0p2gr"
new URL(value);
```

---

# 94. Location Security Checklist

Before navigating using dynamic data:

```text id="vs1y6f"
[ ] Is the value trusted?
[ ] Does it come from the URL?
[ ] Does it come from a user?
[ ] Is it intended to be internal or external?
[ ] Is the protocol allowed?
[ ] Is an external origin allowed?
[ ] Could this create an open redirect?
[ ] Could it contain a dangerous scheme?
[ ] Does it expose sensitive information?
[ ] Should this value actually be in the URL?
```

---

# 95. React and Next.js Checklist

When using `location` in React or Next.js:

```text id="ogv9k9"
[ ] Do I actually need the browser location API?
[ ] Could the router provide the information?
[ ] Is this code running on the client?
[ ] Could this cause hydration differences?
[ ] Am I using location for internal routing unnecessarily?
[ ] Is the URL state synchronized with application state?
[ ] Am I exposing sensitive information in the URL?
```

---

# 96. Final Mental Model

Think of `Location` as two things at once:

```text id="r2r0bo"
Location
│
├── URL Representation
│   ├── href
│   ├── origin
│   ├── protocol
│   ├── host
│   ├── hostname
│   ├── port
│   ├── pathname
│   ├── search
│   └── hash
│
└── Navigation Interface
    ├── assign()
    ├── replace()
    └── reload()
```

The key distinction is:

```text id="f1x5h2"
Read URL
   ↓
Location properties

Change navigation
   ↓
Location methods / assignments
```

---

# Key Takeaways

* The `Location` object represents the current document URL and provides navigation functionality.
* It is available through `window.location` and commonly accessed as `location`.
* `href` contains the complete URL.
* `origin` contains the scheme, host, and port.
* `protocol` identifies the URL scheme.
* `host` contains hostname plus port.
* `hostname` contains only the hostname.
* `port` identifies the explicit port when present.
* `pathname` contains the URL path.
* `search` contains the query string, including `?`.
* `hash` contains the fragment, including `#`.
* Use `URLSearchParams` instead of manually parsing query strings.
* Use `URL` when parsing or constructing arbitrary URLs.
* `assign()` navigates and normally adds a history entry.
* `replace()` navigates while replacing the current history entry.
* `reload()` reloads the current document.
* Changing `location.hash` can support lightweight in-page navigation.
* URL values are user-controlled input and should not automatically be trusted.
* Never use arbitrary query parameters as authorization decisions.
* Validate dynamic redirect destinations to avoid open-redirect vulnerabilities.
* Be careful about placing sensitive data such as tokens in URLs.
* `Location` and `History` work closely together in browser navigation.
* React applications should generally use their router for internal navigation.
* Next.js applications should use Next.js routing APIs for internal route transitions rather than manually assigning `window.location`.
* Direct `location` usage remains useful when genuine browser-level navigation or URL inspection is required.
* The browser URL is not merely a string; it participates in navigation, history, sharing, security, and application state.

The central principle is:

> **Use `Location` to understand and control the current browser URL, parse URLs with `URL` and `URLSearchParams`, and treat all URL-derived data as untrusted input unless your application explicitly validates it.**
