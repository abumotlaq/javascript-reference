# History Object

## Introduction

The `History` object allows JavaScript to interact with the browser's **session history** for the current browsing context.

It is available through:

```javascript id="3f9y0a"
window.history;
```

and commonly accessed as:

```javascript id="ax1z2p"
history;
```

For example:

```javascript id="4cv7b1"
history.back();
```

moves to the previous history entry.

More advanced applications can use:

```javascript id="e0sm5v"
history.pushState();
history.replaceState();
```

to change the URL and history without requiring a full document navigation.

This makes the History API particularly important for:

* Single-page applications.
* Client-side routing.
* Back/forward navigation.
* URL-driven application state.
* Browser navigation.
* React Router.
* Next.js routing concepts.

A useful mental model is:

```text id="zwj7b4"
Browsing Context
      │
      ↓
Session History
      │
 ┌────┼────┐
 ↓    ↓    ↓
Page A → Page B → Page C
             ↑
          current
```

The browser keeps a history of navigation states for the current browsing context.

JavaScript can move through that history and, with the History API, create or replace entries.

---

# 1. What Is the History Object?

The `History` object represents the session history associated with the current browsing context.

Access it through:

```javascript id="jhw0oe"
window.history;
```

For example:

```javascript id="h1gdf6"
console.log(history);
```

The object provides methods such as:

```javascript id="7pyf2u"
history.back();
history.forward();
history.go();
history.pushState();
history.replaceState();
```

It also provides:

```javascript id="q8f5kz"
history.length;
history.state;
```

These allow applications to interact with browser navigation.

---

# 2. What Is Session History?

Session history is the sequence of navigation entries associated with a browsing context.

Imagine:

```text id="ujb9n3"
Home
 ↓
Projects
 ↓
About
```

The browser can remember those navigation states so the user can press:

```text id="s3nm7e"
Back
```

to return toward earlier entries.

The History API provides JavaScript access to this navigation model.

---

# 3. History Is Not the Browser's Global History

This distinction is important.

`history` does **not** mean:

> Every website the user has ever visited.

Instead, it represents the relevant session history of the current browsing context.

Therefore:

```javascript id="ijtgf8"
history.length
```

does not tell you:

* How many websites the user has visited.
* How many tabs are open.
* How many pages exist in browser history globally.

It concerns the current browsing context's session history.

---

# 4. Browsing Context

A browsing context is the environment in which a document is displayed.

Examples include:

* A top-level browser tab.
* A window.
* An iframe.

A useful simplified model is:

```text id="bxm5af"
Browser
│
├── Tab A
│   └── Browsing context
│
├── Tab B
│   └── Browsing context
│
└── Window / iframe contexts
```

The History API operates within these navigation contexts.

---

# 5. `history.length`

The `length` property provides information about the number of history entries in the current session history.

Example:

```javascript id="5d0m7h"
console.log(history.length);
```

The exact number depends on the browser's current session history.

Do not interpret it as:

```text id="vaxr7h"
"number of pages this user has ever visited"
```

That is incorrect.

---

# 6. `history.back()`

The simplest History API method is:

```javascript id="n1v8jb"
history.back();
```

It asks the browser to navigate to the previous history entry.

This is roughly equivalent to clicking the browser's Back button.

Conceptually:

```text id="w7ut2l"
Page A
   ↓
Page B
   ↓
Page C
   ↑
history.back()
   │
   └── back toward Page B
```

---

# 7. `history.forward()`

The opposite operation is:

```javascript id="6erxj1"
history.forward();
```

It moves toward the next history entry when one exists.

For example:

```text id="v0m8le"
A → B → C
    ↑
history.back()

A → B → C
         ↑
history.forward()
```

The ability to move forward depends on the browser's current history position.

---

# 8. `history.go()`

The `go()` method allows relative movement through history.

Examples:

```javascript id="vbn1r9"
history.go(-1);
```

is similar to:

```javascript id="5n3j7k"
history.back();
```

And:

```javascript id="2q0x9r"
history.go(1);
```

is similar to:

```javascript id="a56m2u"
history.forward();
```

You can also move several entries:

```javascript id="ow10qm"
history.go(-2);
```

which requests moving back two history entries.

---

# 9. `history.go(0)`

You may encounter:

```javascript id="g5f1jo"
history.go(0);
```

Historically, this is associated with reloading the current page.

However, for explicit reloading, the clearer modern API is:

```javascript id="z2lznx"
location.reload();
```

Use the API that communicates your intent.

---

# 10. `back()` vs `forward()` vs `go()`

| Method              | Meaning                   |
| ------------------- | ------------------------- |
| `history.back()`    | Move one entry backward   |
| `history.forward()` | Move one entry forward    |
| `history.go(-1)`    | Move one entry backward   |
| `history.go(1)`     | Move one entry forward    |
| `history.go(-2)`    | Move two entries backward |
| `history.go(2)`     | Move two entries forward  |

Mental model:

```text id="laa4te"
back()
→ one step backward

forward()
→ one step forward

go(n)
→ move n steps
```

---

# 11. What Happens When There Is No Entry?

Suppose the current history position is already the oldest reachable point.

Calling:

```javascript id="qfd6me"
history.back();
```

may have no visible effect.

Likewise:

```javascript id="jxi9g1"
history.forward();
```

does nothing when there is no forward entry to move to.

The browser does not throw an error simply because there is no history entry in that direction.

---

# 12. `history.state`

The History API can associate state data with the current history entry.

Read it with:

```javascript id="vw4h97"
console.log(history.state);
```

If no state has been assigned:

```text id="xwpj30"
null
```

may be returned.

This becomes useful with:

```javascript id="9m2xzr"
pushState();
replaceState();
```

---

# 13. What Is History State?

History state is application-defined data associated with a history entry.

For example:

```javascript id="1y2jzh"
history.pushState(
  {
    page: "projects"
  },
  "",
  "/projects"
);
```

Now:

```javascript id="x72u9c"
console.log(history.state);
```

can expose the associated state object.

The browser stores the state with the history entry.

---

# 14. State vs URL

A history entry can contain both:

```text id="5v7l7a"
URL
+
application state
```

For example:

```javascript id="atme65"
history.pushState(
  {
    page: "projects",
    selectedId: 42
  },
  "",
  "/projects"
);
```

Conceptually:

```text id="1d0thm"
URL
/projects

State
{
  page: "projects",
  selectedId: 42
}
```

The URL is user-visible.

The state object is application data associated with that entry.

---

# 15. `history.pushState()`

The `pushState()` method creates a new history entry.

Syntax:

```javascript id="ck1mi2"
history.pushState(
  state,
  unused,
  url
);
```

Example:

```javascript id="q3c5jr"
history.pushState(
  {
    page: "projects"
  },
  "",
  "/projects"
);
```

This creates a new history entry.

---

# 16. Why `pushState()` Is Important

Traditional navigation:

```text id="vh1zpx"
Click link
 ↓
Browser requests new document
 ↓
New page loads
```

With `pushState()`:

```text id="bs1l8f"
JavaScript
 ↓
pushState()
 ↓
URL changes
 ↓
History entry created
 ↓
Current document remains loaded
```

This is a foundational technique behind client-side routing.

---

# 17. `pushState()` Does Not Automatically Load the New URL

This is extremely important.

Consider:

```javascript id="q2n26t"
history.pushState(
  {},
  "",
  "/projects"
);
```

The browser changes the URL and history entry.

But it does **not** automatically request `/projects` from the server as a normal navigation would.

Your application is responsible for updating the UI.

Conceptually:

```text id="e3tlnz"
pushState()
   ↓
URL changes
   ↓
Your application handles the new state
   ↓
UI changes
```

This is why routers need both:

```text id="tht63l"
URL management
+
UI rendering
```

---

# 18. `pushState()` and the `popstate` Event

After a history entry is created:

```javascript id="x7osdr"
history.pushState(
  {
    page: "projects"
  },
  "",
  "/projects"
);
```

you may later navigate backward.

The browser can then fire:

```javascript id="j15fj3"
popstate
```

For example:

```javascript id="5b8j3j"
window.addEventListener(
  "popstate",
  handleNavigation
);
```

This lets your application react when the active history entry changes.

---

# 19. `popstate`

A typical event handler:

```javascript id="h8p4x2"
window.addEventListener(
  "popstate",
  () => {
    console.log(
      location.pathname
    );
  }
);
```

When the user moves through history, the browser can notify your application.

This is essential for custom client-side routers.

---

# 20. The Important `popstate` Mental Model

Think:

```text id="w2umqb"
User clicks browser Back
        ↓
History entry changes
        ↓
popstate
        ↓
Application reads URL/state
        ↓
Application updates UI
```

The event is how your JavaScript learns that browser navigation changed the active history entry.

---

# 21. `pushState()` Does Not Fire `popstate`

This is an important detail.

Calling:

```javascript id="0zuz0j"
history.pushState(
  {},
  "",
  "/projects"
);
```

does not automatically fire a `popstate` event immediately.

Your code must update the application when it performs the push.

Later, if the user navigates backward or forward through history, `popstate` can notify the application.

This distinction is essential for building routers correctly.

---

# 22. `replaceState()`

The `replaceState()` method modifies the current history entry rather than creating a new one.

Example:

```javascript id="6p8c4o"
history.replaceState(
  {
    page: "projects"
  },
  "",
  "/projects"
);
```

The current entry becomes:

```text id="zcknzm"
/projects
```

instead of adding another entry after it.

---

# 23. `pushState()` vs `replaceState()`

This is one of the most important History API distinctions.

### `pushState()`

Creates a new entry:

```text id="59a9o1"
A
↓
pushState(B)
↓
A → B
```

### `replaceState()`

Replaces the current entry:

```text id="xobd9v"
A
↓
replaceState(B)
↓
B
```

Mental model:

```text id="t4i45n"
pushState
→ "Add another navigation state."

replaceState
→ "Modify the current navigation state."
```

---

# 24. When to Use `pushState()`

Use `pushState()` when the user has navigated to a new meaningful application state.

Examples:

```text id="r2y30o"
Products → Product details
Page 1 → Page 2
Search → Filtered search
Dashboard → Settings
```

The browser Back button should normally be able to return to the previous state.

---

# 25. When to Use `replaceState()`

Use `replaceState()` when you want to modify the current history entry without creating another Back-button step.

Examples may include:

* Normalizing the initial URL.
* Replacing temporary URL state.
* Updating state that should not create another navigation point.
* Removing a transient URL parameter.

The exact choice depends on desired browser history behavior.

---

# 26. Example: Search Interface

Suppose the current URL is:

```text id="b5xmqg"
/search?q=react
```

The user changes the query to:

```text id="n7w4cl"
/search?q=nextjs
```

If each search should be navigable using the Back button:

```javascript id="6f2l8p"
history.pushState(
  {},
  "",
  "/search?q=nextjs"
);
```

If the URL is merely being normalized and should not create another history entry:

```javascript id="qf3e3m"
history.replaceState(
  {},
  "",
  "/search?q=nextjs"
);
```

The product's UX determines which is correct.

---

# 27. The Second Argument of `pushState()`

The method signature is:

```javascript id="r3up2e"
history.pushState(
  state,
  unused,
  url
);
```

The second parameter is historically called the `title` parameter, but browsers largely do not use it meaningfully.

Modern code commonly writes:

```javascript id="h6f7l1"
history.pushState(
  state,
  "",
  url
);
```

The key parameters to understand are:

```text id="v0m6v9"
state
url
```

---

# 28. The `state` Parameter

For example:

```javascript id="0g83rq"
history.pushState(
  {
    page: "projects",
    filter: "react"
  },
  "",
  "/projects?filter=react"
);
```

The state can store structured data.

Later:

```javascript id="2bqn7m"
console.log(history.state);
```

can expose the state associated with the active history entry.

---

# 29. State Should Be Reasonably Small

Do not treat history state like a database.

Avoid storing huge objects:

```javascript id="z5n3n0"
history.pushState(
  {
    entireApplicationDatabase: hugeObject
  },
  "",
  "/projects"
);
```

History state should contain the minimum information needed to restore or interpret the navigation state.

Prefer:

```javascript id="1f4y2q"
history.pushState(
  {
    projectId: 42
  },
  "",
  "/projects/42"
);
```

The URL itself can often carry the most meaningful navigational identity.

---

# 30. History State and Data Persistence

History state is:

```text id="0juebg"
client-side navigation state
```

It is not:

```text id="2uh1sn"
database persistence
```

Do not use it to store:

* Passwords.
* Secrets.
* Large datasets.
* Long-term application records.
* Security-sensitive authorization state.

It exists to support navigation behavior.

---

# 31. State Object Cloning

The state value passed to `pushState()` is stored using the browser's structured cloning behavior.

For example:

```javascript id="b1w7kw"
history.pushState(
  {
    user: "Osama Abu Motlaq",
    tags: ["react", "javascript"]
  },
  "",
  "/profile"
);
```

The browser stores a clone of the state data rather than simply keeping the same object reference from your JavaScript code.

This means:

```javascript id="w0j8aa"
const state = {
  page: "projects"
};

history.pushState(
  state,
  "",
  "/projects"
);

state.page = "changed";
```

does not mean the history entry automatically shares the same mutable object reference.

The stored history state is a structured clone.

---

# 32. What Can Be Stored in History State?

The state value must be compatible with the browser's structured cloning rules.

Many ordinary data structures can be stored.

However, not every JavaScript value is serializable through structured cloning.

For example, functions are not valid history state values.

Avoid:

```javascript id="5m9vto"
history.pushState(
  {
    callback: () => {}
  },
  "",
  "/projects"
);
```

This can fail because functions are not structured-cloneable.

---

# 33. Errors From Invalid State

If the state cannot be cloned, the browser can throw an error.

Therefore, use simple navigation state such as:

```javascript id="8j3d8x"
{
  page: "projects",
  projectId: 42
}
```

rather than complex runtime objects.

This also keeps your navigation model easier to understand.

---

# 34. URL Restrictions in `pushState()`

The new URL generally must be same-origin with the current document.

For example:

```javascript id="v5qn80"
history.pushState(
  {},
  "",
  "/projects"
);
```

is valid.

But attempting to use an unrelated cross-origin URL such as:

```javascript id="qkdcn4"
history.pushState(
  {},
  "",
  "https://other-example.com"
);
```

can throw a `SecurityError`.

The History API changes the current document's URL within its origin boundary; it is not a cross-origin navigation API.

---

# 35. Why Same-Origin Matters

The browser's security model prevents a page from using History API calls to impersonate arbitrary origins.

A page on:

```text id="8i61df"
https://example.com
```

cannot simply call:

```javascript id="qkt0c0"
history.pushState(
  {},
  "",
  "https://bank.example"
);
```

to make itself appear to be from another origin.

Origin boundaries remain enforced.

---

# 36. `pushState()` Does Not Send a Network Request

This is one of the most useful properties of the History API.

Example:

```javascript id="2bql3x"
history.pushState(
  {},
  "",
  "/projects"
);
```

The URL changes.

But the browser does not automatically fetch:

```text id="1mdj5n"
/projects
```

just because the history entry changed.

This makes `pushState()` powerful for client-side routing.

---

# 37. History API and Single-Page Applications

A simplified SPA router works like this:

```text id="ccp4at"
User clicks Projects
        ↓
Router intercepts navigation
        ↓
pushState()
        ↓
URL becomes /projects
        ↓
Application renders Projects
```

When the user clicks Back:

```text id="h6r1cj"
Browser Back
        ↓
popstate
        ↓
Router reads /previous-route
        ↓
Application renders previous route
```

This is the conceptual foundation of client-side routing.

---

# 38. Building a Tiny Router

A very simplified router might look like:

```javascript id="y4d9vq"
function renderRoute() {
  const path = location.pathname;

  if (path === "/") {
    renderHome();
    return;
  }

  if (path === "/projects") {
    renderProjects();
    return;
  }

  renderNotFound();
}
```

Navigate:

```javascript id="x7m6vk"
function navigate(path) {
  history.pushState(
    {},
    "",
    path
  );

  renderRoute();
}
```

Handle browser navigation:

```javascript id="v6m9th"
window.addEventListener(
  "popstate",
  renderRoute
);
```

Initialize:

```javascript id="zo5n6j"
renderRoute();
```

This is a simplified example, but it demonstrates the fundamental architecture.

---

# 39. Why Routers Exist

Real applications need more than:

```javascript id="ehf6ni"
history.pushState();
```

They also need:

* Route matching.
* Parameters.
* Nested routes.
* Data loading.
* Error handling.
* Navigation state.
* Scroll restoration.
* Prefetching.
* Accessibility.
* Server integration.
* Code splitting.
* Transitions.

This is why libraries and frameworks provide routing abstractions.

---

# 40. React Router and the History API

Client-side React routing libraries can use browser navigation concepts such as:

```text id="wqzzx9"
pushState
replaceState
popstate
location
```

The library then manages the relationship between:

```text id="j3h1qv"
URL
+
route
+
React UI
```

You should understand the History API because it explains what routing abstractions are built around.

---

# 41. Next.js and the History API

Next.js also manages navigation through its routing system.

You normally use:

```text id="rjflc9"
<Link>
router.push()
router.replace()
```

rather than directly implementing:

```javascript id="ax9yhm"
history.pushState();
```

for application routing.

Next.js handles many details that a custom router would otherwise need to manage.

---

# 42. Browser Back Button

A good SPA should respond correctly when the user presses the browser Back button.

The conceptual flow is:

```text id="qdah7t"
User clicks Back
      ↓
History entry changes
      ↓
popstate
      ↓
Router detects location/state
      ↓
UI updates
```

If an application uses `pushState()` but does not listen for `popstate`, it may fail to synchronize its UI with browser navigation.

---

# 43. Browser Forward Button

The same applies to Forward:

```text id="7e93zn"
User clicks Forward
      ↓
History entry changes
      ↓
popstate
      ↓
Application updates
```

A router must therefore handle both directions.

---

# 44. `popstate` and `history.state`

Suppose:

```javascript id="8l08xj"
history.pushState(
  {
    page: "projects"
  },
  "",
  "/projects"
);
```

Later:

```javascript id="w2u14v"
window.addEventListener(
  "popstate",
  (event) => {
    console.log(event.state);
  }
);
```

The event's `state` property provides the state associated with the newly active history entry.

This allows the application to restore navigation-specific state.

---

# 45. `popstate` Event Object

For a `popstate` event:

```javascript id="8oo1mj"
window.addEventListener(
  "popstate",
  (event) => {
    console.log(event.state);
  }
);
```

The important property is:

```javascript id="pa59bo"
event.state
```

It contains the state associated with the current history entry.

It can be:

```text id="u50o1t"
null
```

if no state was associated.

---

# 46. `pushState()` and `replaceState()` Do Not Trigger Navigation Events Immediately

This matters when designing a router.

Calling:

```javascript id="6k2li1"
history.pushState(
  {},
  "",
  "/projects"
);
```

does not automatically produce:

```javascript id="puh2ey"
popstate
```

Therefore, a router typically does:

```javascript id="fzcbig"
history.pushState(
  {},
  "",
  "/projects"
);

renderRoute();
```

The application handles its own navigation immediately.

Later browser Back/Forward navigation produces `popstate`.

---

# 47. Hash Navigation vs History API

Hash navigation:

```javascript id="m6a5c1"
location.hash = "#projects";
```

can trigger:

```text id="nz85nc"
hashchange
```

History API navigation:

```javascript id="h2x5ev"
history.pushState(
  {},
  "",
  "/projects"
);
```

is associated with:

```text id="t1r2xu"
popstate
```

during history traversal.

These are different browser navigation mechanisms.

---

# 48. `hashchange` vs `popstate`

### `hashchange`

Associated with changes to:

```text id="38e6to"
#fragment
```

### `popstate`

Associated with traversal to a different history entry involving session history state.

A modern client-side router commonly uses the History API rather than hash routing.

---

# 49. History and Scroll Position

Browser navigation can also interact with scroll restoration.

The browser exposes:

```javascript id="wls7cd"
history.scrollRestoration;
```

Possible values include:

```text id="r3a1kh"
"auto"
"manual"
```

Example:

```javascript id="s4mqmu"
history.scrollRestoration = "manual";
```

This tells the browser whether it should automatically restore scroll positions during session history navigation.

This is an advanced but important routing concept.

---

# 50. `scrollRestoration`

With:

```javascript id="t7f4u8"
history.scrollRestoration = "auto";
```

the browser can automatically restore scroll positions where appropriate.

With:

```javascript id="7x7zqv"
history.scrollRestoration = "manual";
```

the application takes responsibility for restoring scroll.

This can be useful for sophisticated SPA routing.

However, if you take manual control, you must implement the behavior carefully.

---

# 51. Scroll Restoration and SPA Routing

Imagine:

```text id="bhtf2p"
Projects page
 ↓
User scrolls to item 50
 ↓
Open project
 ↓
Back
```

The expected UX may be:

```text id="2c0kkx"
Return to Projects
 ↓
Restore previous scroll position
```

This is one reason navigation state and scrolling are related.

Frameworks often provide their own scroll behavior to simplify this problem.

---

# 52. History and URL State

A navigation state often includes:

```text id="ts9qww"
URL
+
state
+
scroll position
+
application data
```

For example:

```text id="cig6r8"
/projects?page=3
```

may correspond to:

```javascript id="vfl0bg"
{
  page: 3
}
```

and a particular scroll position.

A robust router considers all these pieces together.

---

# 53. History API and Progressive Enhancement

Traditional link:

```html id="n6a7f4"
<a href="/projects">
  Projects
</a>
```

works as a browser navigation.

JavaScript can enhance it:

```javascript id="tkwl80"
link.addEventListener("click", (event) => {
  event.preventDefault();

  history.pushState(
    {},
    "",
    "/projects"
  );

  renderProjects();
});
```

If JavaScript is unavailable, the normal link can still work if the server supports the route.

This is a strong progressive-enhancement pattern.

---

# 54. Avoid Breaking Normal Link Behavior

If you build custom navigation:

```javascript id="0s5w5t"
event.preventDefault();
```

do not prevent navigation without implementing an equivalent valid experience.

A good router should consider:

* Keyboard users.
* Modifier-click behavior.
* New-tab behavior.
* Accessibility.
* External links.
* Downloads.
* Same-origin restrictions.

Do not blindly intercept every click on every `<a>` element.

---

# 55. Modifier Keys and Links

Users may use:

```text id="xo8d2s"
Ctrl + Click
Cmd + Click
Shift + Click
Middle Click
```

for alternative navigation.

A custom router that blindly runs:

```javascript id="9kgn9u"
event.preventDefault();
```

can break expected browser behavior.

This is another reason routing libraries are complex.

They account for browser navigation conventions.

---

# 56. History API and Security

The History API is not an authorization mechanism.

Do not assume that:

```text id="zq6d0x"
/admin
```

means the user is authorized to access an admin interface.

Anyone can attempt to navigate to a URL.

Security must be enforced separately.

The router controls UI/navigation.

The server controls access.

---

# 57. History and Sensitive Data

Avoid storing secrets in:

```javascript id="lq6si8"
history.pushState({
  token: "secret"
}, "", "/dashboard");
```

History state is client-side data.

It may remain accessible through the browser session.

Likewise, avoid putting secrets in:

```text id="nmhj79"
URL query parameters
URL fragments
```

unless the exposure is explicitly acceptable.

---

# 58. History and User Privacy

URLs and navigation state can appear in:

* Browser history.
* Screenshots.
* Screen recordings.
* Analytics systems.
* Server logs.
* Monitoring systems.
* Shared links.

Design URLs with privacy in mind.

For example, avoid:

```text id="4s4wk2"
/account?password=...
```

or:

```text id="e1l2z7"
/reset?secret-token=...
```

when there are safer designs.

---

# 59. History Entry Limits

Browsers may impose limits on how much history state or how many entries can be efficiently managed.

Do not treat the History API as an unlimited storage mechanism.

Use meaningful navigation entries rather than pushing a new entry for every tiny UI change.

For example, avoid:

```text id="p4g8u5"
pushState() on every keystroke
```

unless the application has a deliberate reason to make each state navigable.

---

# 60. Push Too Much, Get Bad Back-Button UX

Suppose a search box updates history on every keypress:

```text id="8p1b8g"
r
re
rea
reac
react
```

Now pressing Back may require several steps just to undo search typing.

This is often poor UX.

Better options may include:

* Debouncing updates.
* Using `replaceState()` for transient typing.
* Pushing history only after a meaningful navigation action.

The key principle is:

> **History entries should correspond to meaningful navigation states.**

---

# 61. Push vs Replace for Search

A practical pattern:

```text id="zjgwju"
User typing
    ↓
replaceState()
    ↓
URL updates without many Back entries

User submits search
    ↓
pushState()
    ↓
Meaningful navigation entry created
```

This is only an example.

The correct behavior depends on the application's UX.

---

# 62. History API and URL Synchronization

A router should keep these synchronized:

```text id="glc4q0"
URL
   ↕
Application route state
   ↕
Rendered UI
```

If they become inconsistent:

```text id="4nbnca"
URL says /projects
UI shows /about
```

the application feels broken.

This is one of the main responsibilities of a routing system.

---

# 63. Example: Simple Navigation System

```javascript id="6h47sl"
const routes = {
  "/": "Home",
  "/projects": "Projects",
  "/about": "About"
};

function renderRoute() {
  const path = location.pathname;

  const page = routes[path] ?? "Not Found";

  document.querySelector(
    "#app"
  ).textContent = page;
}

function navigate(path) {
  history.pushState(
    {},
    "",
    path
  );

  renderRoute();
}

window.addEventListener(
  "popstate",
  renderRoute
);

renderRoute();
```

This tiny example demonstrates:

```text id="wx1g3o"
Location
+
History
+
popstate
+
Rendering
```

These four concepts form the foundation of many routing systems.

---

# 64. Example: History State

```javascript id="4ug6rg"
function navigateToProject(id) {
  history.pushState(
    {
      projectId: id
    },
    "",
    `/projects/${id}`
  );
}
```

Then:

```javascript id="nh6ki8"
window.addEventListener(
  "popstate",
  (event) => {
    const projectId =
      event.state?.projectId;

    console.log(projectId);
  }
);
```

A production router would usually derive the primary route identity from the URL and use state only for additional navigation metadata.

---

# 65. Why the URL Should Often Carry Identity

Suppose:

```text id="rgc87n"
/projects/42
```

already identifies the project.

You may not need:

```javascript id="1xp2mi"
{
  projectId: 42
}
```

in history state.

A cleaner design can be:

```text id="1qbl9a"
URL
/projects/42
   ↓
parse ID
   ↓
load project
```

This makes the URL:

* Shareable.
* Bookmarkable.
* Reloadable.
* Deep-linkable.

History state is best used for information that does not need to be encoded in the URL itself.

---

# 66. History State vs URL Parameters

Use the URL for information that should be:

* Shareable.
* Bookmarkable.
* Searchable.
* Meaningful as a route.

Use history state for information that is:

* Navigation-specific.
* Temporary.
* Not necessary to understand the resource URL.

The correct division depends on the application.

---

# 67. History API and Reload

One of the most important limitations of `pushState()` is:

```javascript id="hmzgrd"
history.pushState(
  {},
  "",
  "/projects"
);
```

changes the URL without loading the new document.

But if the user refreshes:

```text id="je97b9"
GET /projects
```

may be sent to the server.

Therefore, an SPA using path-based routes needs server/framework configuration capable of serving the application correctly for those routes.

Frameworks such as Next.js handle this architecture for you.

---

# 68. Why Next.js Routing Is Easier

With a custom History API router, you must solve:

```text id="fgrr2e"
URL matching
History
Back/Forward
Server fallback
Data loading
404s
Scroll
Accessibility
Prefetching
Code splitting
```

Next.js provides routing infrastructure around these concepts.

That is why you should understand the History API conceptually without trying to manually build a full router in every application.

---

# 69. History API and React

React itself does not manage browser history automatically.

A router integrates:

```text id="7m0w7x"
History API
+
React rendering
```

Conceptually:

```text id="2p3cgo"
history.pushState()
        ↓
route changes
        ↓
React state/context changes
        ↓
component tree re-renders
```

And:

```text id="cq8idk"
Back button
        ↓
popstate
        ↓
router state changes
        ↓
React re-renders
```

---

# 70. History API and Next.js

In Next.js, you normally use:

```text id="a7ap3t"
<Link />
router.push()
router.replace()
```

rather than directly calling:

```javascript id="npdnjm"
history.pushState();
```

The framework manages browser navigation together with its routing system.

Understanding the native API is still important because it explains the lower-level browser mechanism.

---

# 71. Common Mistakes

## Mistake 1: Thinking `pushState()` loads the URL

It does not automatically fetch the new document.

---

## Mistake 2: Expecting `pushState()` to fire `popstate`

It does not.

---

## Mistake 3: Forgetting to handle Back/Forward

A router must respond to `popstate`.

---

## Mistake 4: Pushing history for every tiny UI change

This creates poor Back-button UX.

---

## Mistake 5: Using history as storage

History is navigation state, not a database.

---

## Mistake 6: Storing secrets in history state

History state is client-side.

---

## Mistake 7: Putting security decisions in routes

`/admin` is not an authorization system.

---

## Mistake 8: Breaking normal anchor behavior

Do not intercept every link without considering native browser interactions.

---

## Mistake 9: Ignoring server routing

Path-based SPA routes must still work when the browser performs a real request after refresh.

---

## Mistake 10: Building a custom router when the framework already provides one

Understand the API, but use mature routing infrastructure for real applications unless you have a specific reason not to.

---

# 72. Best Practices

## 1. Use `pushState()` for meaningful navigation

Each entry should represent a useful navigation state.

---

## 2. Use `replaceState()` for state that should not create a new Back step

This is useful for normalization and transient URL changes.

---

## 3. Handle `popstate`

If your code uses the History API to manage routes, respond to browser Back/Forward navigation.

---

## 4. Keep the URL and UI synchronized

The current route should have a predictable relationship with the rendered UI.

---

## 5. Keep URLs meaningful

Prefer:

```text id="ss2kwm"
/projects/42
```

over opaque client-only state when the resource identity should be shareable.

---

## 6. Do not store secrets in URLs or history state

Treat both as client-visible.

---

## 7. Do not abuse the Back button

Avoid creating excessive history entries.

---

## 8. Preserve normal browser behavior

Respect:

* Back.
* Forward.
* Reload.
* Open in new tab.
* Copy link.
* Modifier-clicks.

---

## 9. Prefer framework routers in React/Next.js

Do not manually reproduce complex routing infrastructure without a reason.

---

## 10. Design routing around user navigation

The browser history belongs to the user's mental model.

If the Back button does something surprising, the application's navigation model probably needs reconsideration.

---

# 73. Quick Reference

| API                         | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `history.length`            | Number of entries in current session history                            |
| `history.state`             | State of current history entry                                          |
| `history.back()`            | Move backward one entry                                                 |
| `history.forward()`         | Move forward one entry                                                  |
| `history.go(n)`             | Move by `n` entries                                                     |
| `history.pushState()`       | Create new history entry                                                |
| `history.replaceState()`    | Replace current history entry                                           |
| `history.scrollRestoration` | Control scroll restoration behavior                                     |
| `popstate`                  | Event fired when active history entry changes through history traversal |

---

# 74. Navigation Comparison

| Approach                    |         New history entry? | Full document navigation? |
| --------------------------- | -------------------------: | ------------------------: |
| Normal `<a href>`           |                Usually yes |               Usually yes |
| `location.href = ...`       |                        Yes |                       Yes |
| `location.assign(...)`      |                        Yes |                       Yes |
| `location.replace(...)`     |                         No |                       Yes |
| `history.pushState(...)`    |                        Yes |                        No |
| `history.replaceState(...)` |                         No |                        No |
| `history.back()`            | Traverses existing history |          Depends on entry |
| `history.forward()`         | Traverses existing history |          Depends on entry |

This table is one of the most useful ways to understand the History API.

---

# 75. History API Mental Model

The browser maintains:

```text id="i34c1e"
History Entries
│
├── URL
├── History State
└── Navigation-related browser state
```

Your application interacts with it through:

```text id="st52ql"
pushState()
replaceState()
        ↓
Create / modify entries

back()
forward()
go()
        ↓
Traverse entries

popstate
        ↓
Notify application about history traversal
```

---

# 76. Routing Mental Model

A simple router can be understood as:

```text id="kav8op"
USER
  ↓
Navigation
  ↓
History
  ↓
URL
  ↓
Router
  ↓
Application State
  ↓
UI
```

And when the browser controls navigation:

```text id="foz3gh"
BACK / FORWARD
      ↓
popstate
      ↓
Router
      ↓
UI
```

This is the core browser-level mechanism behind many client-side routing systems.

---

# 77. React Mental Model

In React:

```text id="t1q4h4"
history / router
       ↓
route state
       ↓
React render
       ↓
UI
```

A router usually hides the raw History API.

That is good architecture.

You should understand:

```text id="l1ku2q"
pushState
replaceState
popstate
location
```

so you understand what the router is abstracting.

---

# 78. Next.js Mental Model

In Next.js:

```text id="io4y4w"
<Link>
router.push()
router.replace()
      ↓
Next.js routing
      ↓
History / URL management
      ↓
React UI
```

You should generally let Next.js manage navigation.

The native History API is still useful to understand because:

* It explains browser Back/Forward behavior.
* It explains URL updates.
* It explains client-side navigation.
* It helps debug routing issues.
* It helps distinguish framework behavior from browser behavior.

---

# 79. Practical Checklist

Before changing browser history, ask:

```text id="kpxl4p"
[ ] Is this a meaningful navigation state?
[ ] Should Back return to the previous state?
[ ] Should this replace the current entry?
[ ] Does the URL describe the state?
[ ] Does the UI update after the URL changes?
[ ] Does Back work correctly?
[ ] Does Forward work correctly?
[ ] Does reload work correctly?
[ ] Can the route be shared/bookmarked?
[ ] Is any sensitive data exposed?
[ ] Does the server understand the route?
[ ] Am I unnecessarily recreating a framework router?
```

---

# Key Takeaways

* The `History` object represents the session history of a browsing context.
* `history.back()` moves backward.
* `history.forward()` moves forward.
* `history.go()` moves a specified number of entries.
* `history.length` describes the current session history length, not the browser's entire history.
* `history.state` contains state associated with the active history entry.
* `pushState()` creates a new history entry without performing a full document navigation.
* `replaceState()` modifies the current entry instead of creating another one.
* `pushState()` and `replaceState()` do not automatically fire `popstate`.
* `popstate` allows an application to respond when the active history entry changes through browser history traversal.
* History state uses structured cloning, so it is not simply a shared JavaScript object reference.
* History state is not a database or secret store.
* `pushState()` generally requires same-origin URL semantics.
* A client-side router combines History API operations with URL parsing and UI rendering.
* The browser Back and Forward buttons are part of the application's navigation model and should behave predictably.
* Excessive history entries create poor user experience.
* Use `pushState()` for meaningful navigations and `replaceState()` for changes that should not create another Back step.
* URL state is particularly valuable when the state should be shareable, bookmarkable, and reloadable.
* Sensitive information should not be placed in URLs or history state.
* React Router and Next.js build higher-level routing abstractions around browser navigation concepts.
* In real React and Next.js applications, prefer the framework's routing APIs instead of implementing routing manually with `history.pushState()`.
* Understanding the History API remains essential because it explains what those routing abstractions are doing underneath.

The central principle is:

> **The History API connects browser navigation with application routing: `pushState()` and `replaceState()` manage entries, `back()`/`forward()`/`go()` traverse them, and `popstate` lets the application synchronize its UI with browser navigation.**
