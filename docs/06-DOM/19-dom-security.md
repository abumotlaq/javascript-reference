# DOM Security

## Introduction

The DOM is a powerful interface for manipulating web pages.

That power also creates security risks when JavaScript treats untrusted data as executable HTML, URLs, JavaScript code, or other browser-interpreted content.

The most important DOM security concept is:

> **Never assume data is safe just because it came from a user interface, API, database, or URL.**

Data can be controlled by:

* Users.
* Attackers.
* External APIs.
* URL parameters.
* Query strings.
* Form inputs.
* Database records.
* Third-party services.
* Browser storage.
* Imported content.

A secure DOM implementation separates:

```text
Data
  ↓
Validation
  ↓
Safe DOM API
  ↓
Rendered content
```

from dangerous patterns such as:

```text
Untrusted data
      ↓
HTML interpretation
      ↓
Executable / dangerous content
```

---

# 1. What Is DOM Security?

DOM security concerns protecting browser-side code and the DOM from unsafe manipulation.

Common risks include:

* Cross-Site Scripting (XSS).
* HTML injection.
* Unsafe URL handling.
* Dangerous use of `innerHTML`.
* Unsafe dynamic attributes.
* DOM-based vulnerabilities.
* Unsafe use of `eval()`.
* Unsafe dynamic script creation.
* Leaking sensitive information into the DOM.
* Trusting client-side validation.

The DOM itself is not inherently insecure.

The risk comes from how JavaScript handles data.

---

# 2. Trusted vs Untrusted Data

A critical security distinction is:

```text
Trusted data
```

versus:

```text
Untrusted data
```

For example:

```javascript
const name = "Osama Abu Motlaq";
```

is controlled directly by your application code.

But:

```javascript
const name = new URLSearchParams(location.search).get("name");
```

comes from the URL.

A user can potentially control it.

Therefore, treat it as untrusted.

---

# 3. Common Sources of Untrusted Data

Examples include:

```javascript
location.search;
location.hash;
location.pathname;
```

Form inputs:

```javascript
input.value;
```

Storage:

```javascript
localStorage.getItem("name");
sessionStorage.getItem("name");
```

Server/API responses:

```javascript
const data = await response.json();
```

Database records:

```text
Database → API → Browser
```

Even database content should not automatically be considered safe for HTML rendering.

---

# 4. Cross-Site Scripting (XSS)

XSS stands for:

> **Cross-Site Scripting**

It occurs when an attacker is able to cause malicious content to execute in another user's browser within the security context of a website.

A simplified flow:

```text
Attacker-controlled input
        ↓
Application trusts it as HTML
        ↓
Browser parses the HTML
        ↓
Unexpected script execution
```

XSS can potentially allow malicious code to:

* Read accessible page data.
* Perform actions as the victim.
* Modify visible content.
* Make requests using the victim's session.
* Steal data that is accessible to JavaScript.
* Redirect or manipulate the page.

The exact impact depends on the application's architecture and browser protections.

---

# 5. HTML Injection vs XSS

These terms are related but not identical.

### HTML Injection

An attacker causes unintended HTML to be inserted into a page.

For example:

```html
<strong>Injected content</strong>
```

### XSS

The injected content results in JavaScript execution or another dangerous browser-side behavior.

Therefore:

```text
HTML Injection
      ↓
May become XSS
```

depending on what the browser interprets and what protections exist.

---

# 6. The Most Important Rule: Prefer `textContent`

If you want to display text:

```javascript
element.textContent = userInput;
```

This treats the value as text.

For example:

```javascript
const input = "<strong>Osama Abu Motlaq</strong>";

element.textContent = input;
```

The browser displays:

```text
<strong>Osama Abu Motlaq</strong>
```

as text.

It does not create a `<strong>` element.

---

# 7. Why `textContent` Is Safer

Compare:

```javascript
element.textContent = userInput;
```

with:

```javascript
element.innerHTML = userInput;
```

`textContent` says:

> "This value is text."

`innerHTML` says:

> "Parse this value as HTML."

That difference is fundamental to DOM security.

---

# 8. The `innerHTML` Security Risk

Consider:

```javascript
const userInput = input.value;

element.innerHTML = userInput;
```

The application has allowed user-controlled data to become HTML.

This is a dangerous pattern.

The problem is not `innerHTML` itself.

The problem is:

```text
Untrusted input
      ↓
innerHTML
      ↓
HTML interpretation
```

---

# 9. Example of Dangerous HTML Rendering

A malicious payload can contain HTML that attempts to execute JavaScript or trigger dangerous browser behavior.

For example, conceptually:

```html
<img src="invalid" onerror="...">
```

If an application inserts attacker-controlled content as HTML, browser event handlers and other HTML features can become attack surfaces.

The exact behavior depends on browser parsing and security protections.

The important principle is:

> **Do not put untrusted HTML into `innerHTML`.**

---

# 10. Safe Text Rendering

Use:

```javascript
const name = input.value;

element.textContent = name;
```

For attributes:

```javascript
element.setAttribute("title", name);
```

when the attribute is appropriate for arbitrary text.

For classes:

```javascript
element.classList.add("active");
```

instead of constructing HTML strings.

---

# 11. `innerHTML` Is Not Always Forbidden

`innerHTML` is not inherently malicious.

For example:

```javascript
element.innerHTML = `
  <p>Osama Abu Motlaq</p>
`;
```

can be safe when the HTML is completely controlled by trusted application code.

The dangerous situation is:

```javascript
element.innerHTML = untrustedData;
```

The distinction is:

```text
Trusted static HTML
        ↓
Potentially acceptable

Untrusted HTML
        ↓
Dangerous without sanitization
```

---

# 12. `insertAdjacentHTML()`

Another HTML-parsing API is:

```javascript
element.insertAdjacentHTML("beforeend", html);
```

It has the same fundamental security concern.

If:

```javascript
element.insertAdjacentHTML("beforeend", userInput);
```

then untrusted data is being interpreted as HTML.

Prefer safe DOM construction or sanitized HTML.

---

# 13. `outerHTML`

The same principle applies to:

```javascript
element.outerHTML = value;
```

It parses HTML.

Therefore, do not use attacker-controlled content as `outerHTML`.

---

# 14. `document.write()`

Avoid:

```javascript
document.write(userInput);
```

especially with untrusted data.

`document.write()` can inject HTML into the document and has additional behavioral problems, particularly during and after document loading.

Modern applications generally have better DOM APIs available.

---

# 15. Avoid `eval()`

Never use `eval()` to execute untrusted input.

Dangerous:

```javascript
eval(userInput);
```

`eval()` interprets a string as JavaScript.

If an attacker controls that string, the application may effectively give the attacker a JavaScript execution primitive.

---

# 16. Avoid the `Function` Constructor for Untrusted Data

This is also dangerous:

```javascript
const fn = new Function(userInput);
```

It dynamically creates executable JavaScript.

Treat it similarly to `eval()` from a security perspective.

---

# 17. Dynamic Script Creation

Be careful with:

```javascript
const script = document.createElement("script");

script.textContent = userInput;

document.body.append(script);
```

This is not a safe way to execute arbitrary data.

The browser treats scripts as executable code.

Never convert untrusted data into executable JavaScript.

---

# 18. URLs Are Also Security-Sensitive

Consider:

```javascript
link.href = userInput;
```

It may look harmless.

But URLs can contain dangerous schemes.

For example, applications should not blindly accept arbitrary values as navigation targets.

A safer approach is to validate the URL and allow only expected protocols and destinations.

---

# 19. Validate URL Protocols

For example:

```javascript
function isSafeUrl(value) {
  try {
    const url = new URL(value, window.location.origin);

    return url.protocol === "https:" ||
           url.protocol === "http:";
  } catch {
    return false;
  }
}
```

Then:

```javascript
if (isSafeUrl(userInput)) {
  link.href = userInput;
}
```

The exact allowlist should depend on your application's requirements.

For example, an application may intentionally support:

```text
mailto:
tel:
```

but those should be allowed explicitly rather than accepting every protocol.

---

# 20. Why `javascript:` URLs Are Dangerous

A URL such as:

```text
javascript:...
```

is not an ordinary navigation URL.

The browser can interpret it as JavaScript.

Therefore, code such as:

```javascript
link.href = userInput;
```

should not blindly trust arbitrary user-controlled values.

This is especially important when generating links from:

* CMS content.
* Database records.
* User profiles.
* Markdown.
* API responses.

---

# 21. `setAttribute()` Does Not Automatically Make Data Safe

Developers sometimes think:

```javascript
element.setAttribute("href", userInput);
```

is automatically safe.

It is not.

Security depends on the attribute and value.

For example:

```javascript
element.setAttribute("onclick", userInput);
```

is extremely dangerous because it creates an inline event handler.

Do not place untrusted JavaScript into event-handler attributes.

---

# 22. Avoid Inline Event Handler Attributes

Avoid:

```javascript
element.setAttribute("onclick", userInput);
```

Prefer:

```javascript
element.addEventListener("click", handleClick);
```

Your JavaScript code remains separate from data.

This is better for:

* Security.
* Maintainability.
* Debugging.
* Separation of concerns.

---

# 23. `dataset` Is Not an Execution Context

Using:

```javascript
element.dataset.user = userInput;
```

stores the value as data.

Reading it:

```javascript
const user = element.dataset.user;
```

does not execute the value.

The danger appears when you later treat the data as HTML or JavaScript:

```javascript
element.innerHTML = element.dataset.user;
```

Therefore:

> Safe storage does not guarantee safe later usage.

---

# 24. DOM-Based XSS

DOM-based XSS occurs when client-side JavaScript takes attacker-controlled data and uses it in a dangerous DOM sink.

A simplified flow:

```text
URL / input
    ↓
JavaScript
    ↓
Dangerous DOM API
    ↓
Browser interprets content
```

For example:

```javascript
const value = location.hash.slice(1);

document.querySelector("#output").innerHTML = value;
```

The URL fragment is attacker-controlled input.

The application then inserts it as HTML.

That is a classic dangerous pattern.

---

# 25. Safe DOM-Based Rendering

Use:

```javascript
const value = location.hash.slice(1);

document.querySelector("#output").textContent = value;
```

Now the browser treats the value as text.

---

# 26. Sources and Sinks

A useful security model is:

## Source

Where untrusted data enters the application.

Examples:

```text
URL
Form input
localStorage
API response
postMessage
Database
```

## Sink

Where the data is interpreted in a potentially dangerous way.

Examples include:

```javascript
element.innerHTML = value;
```

```javascript
element.outerHTML = value;
```

```javascript
element.insertAdjacentHTML(...);
```

```javascript
eval(value);
```

```javascript
new Function(value);
```

```javascript
element.setAttribute("onclick", value);
```

The security goal is:

```text
Untrusted Source
      ↓
Validation / Transformation
      ↓
Safe Sink
```

---

# 27. Common Dangerous DOM Sinks

Be especially careful with:

```text
innerHTML
outerHTML
insertAdjacentHTML()
document.write()
```

and APIs that execute or interpret JavaScript:

```text
eval()
Function()
inline event handlers
dynamic script execution
```

The exact security characteristics of an API depend on how it is used.

---

# 28. Safe DOM APIs

For plain text, prefer:

```javascript
element.textContent = value;
```

For CSS classes:

```javascript
element.classList.add("active");
```

For ordinary attributes:

```javascript
element.setAttribute("title", value);
```

For DOM nodes:

```javascript
element.append(child);
```

For creating elements:

```javascript
document.createElement("p");
```

These APIs make the intended interpretation more explicit.

---

# 29. `createElement()` for Structured Content

Instead of:

```javascript
container.innerHTML = `
  <article>
    <h2>${userInput}</h2>
  </article>
`;
```

you can construct the DOM:

```javascript
const article = document.createElement("article");
const heading = document.createElement("h2");

heading.textContent = userInput;

article.append(heading);
container.append(article);
```

The user-controlled value is treated as text.

---

# 30. Attribute Context Matters

Different HTML attributes have different security characteristics.

For example:

```javascript
element.setAttribute("title", userInput);
```

is fundamentally different from:

```javascript
element.setAttribute("onclick", userInput);
```

The first stores ordinary text.

The second creates executable event-handler code.

Therefore:

> Security cannot be determined only by looking at the API name. You must consider the context in which the data is inserted.

---

# 31. CSS Injection

Dynamic style handling also requires care.

For example:

```javascript
element.style.color = userInput;
```

is not equivalent to putting the value into arbitrary HTML.

However, applications should still validate values when they are supposed to come from a restricted set.

For example:

```javascript
const allowedColors = new Set([
  "red",
  "blue",
  "green"
]);

if (allowedColors.has(userInput)) {
  element.style.color = userInput;
}
```

Allowlisting is often safer than trying to blacklist every dangerous value.

---

# 32. Avoid String-Built CSS When Possible

Instead of constructing a `<style>` element from user input:

```javascript
style.textContent = `
  .user {
    color: ${userInput};
  }
`;
```

prefer controlled CSS classes:

```javascript
element.classList.add("user-blue");
```

when the design allows it.

This reduces the amount of user-controlled data entering CSS contexts.

---

# 33. Client-Side Validation Is Not Security

Consider:

```javascript
if (input.value.length < 3) {
  return;
}
```

This improves user experience.

But an attacker can bypass browser JavaScript completely.

They can send requests directly to the server.

Therefore:

```text
Client validation
      ↓
UX / convenience

Server validation
      ↓
Security boundary
```

You need server-side validation for data that matters to security or application correctness.

---

# 34. Never Trust Hidden Inputs

This:

```html
<input type="hidden" name="role" value="admin">
```

does not make the value trustworthy.

A user can modify the DOM.

For example:

```javascript
document.querySelector('[name="role"]').value = "admin";
```

Therefore, authorization must be determined by trusted server-side state.

---

# 35. Never Trust the DOM for Authorization

Bad architecture:

```text
DOM says:
role = admin
      ↓
Allow privileged operation
```

Better:

```text
Authenticated user
      ↓
Server
      ↓
Authorization check
      ↓
Allow / deny operation
```

The browser is controlled by the user.

---

# 36. Sensitive Data in the DOM

Do not unnecessarily expose secrets in HTML.

For example, avoid placing sensitive credentials in:

```html
<div data-api-key="..."></div>
```

or:

```javascript
window.config = {
  secret: "..."
};
```

Anything sent to the browser should be considered accessible to the user and potentially to malicious scripts running in that origin.

---

# 37. DOM Does Not Provide a Secure Secret Store

The following are not suitable locations for high-value secrets:

```text
DOM
localStorage
sessionStorage
client-side JavaScript variables
```

If a secret must remain confidential from the browser user, it should not be sent to the browser.

Server-side secrets should remain server-side.

---

# 38. `localStorage` and XSS

Suppose an application stores a sensitive token:

```javascript
localStorage.setItem("token", token);
```

If an XSS vulnerability allows arbitrary JavaScript to execute in the application's origin, that JavaScript may be able to read the token.

Therefore, storing sensitive authentication material in browser-accessible storage can increase the impact of XSS.

Authentication architecture should be designed carefully, often using server-managed sessions and cookies with appropriate security attributes.

---

# 39. Cookies and the DOM

JavaScript can access cookies only when they are not marked:

```text
HttpOnly
```

An `HttpOnly` cookie cannot be read through:

```javascript
document.cookie;
```

This can reduce the ability of XSS code to directly extract that cookie value.

However:

> `HttpOnly` does not prevent XSS.

An attacker-controlled script may still be able to perform requests as the user because the browser can automatically attach applicable cookies.

XSS prevention remains essential.

---

# 40. Content Security Policy

A powerful defense against XSS is:

> **Content Security Policy (CSP)**

CSP is delivered through HTTP response headers or, in some cases, a `<meta>` element.

It can restrict where resources and executable scripts are allowed to come from.

A simplified example:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

A real production CSP should be designed for the application's actual architecture.

Do not blindly copy a policy from a random example.

---

# 41. CSP Is Defense in Depth

CSP should not replace secure coding.

Think:

```text
Safe DOM APIs
      +
Input handling
      +
Output encoding
      +
Server validation
      +
Authentication controls
      +
CSP
```

Security works best as multiple layers.

---

# 42. Sanitization

Sometimes an application genuinely needs to render HTML supplied by users.

For example:

* Rich-text editor.
* CMS.
* Markdown renderer.
* User-generated formatting.
* Comments with controlled formatting.

In those situations, simply switching to `textContent` may not satisfy the product requirement.

You may need:

```text
Untrusted HTML
      ↓
HTML sanitizer
      ↓
Sanitized HTML
      ↓
HTML rendering
```

Use a well-maintained, security-focused sanitizer rather than writing your own HTML sanitizer with regular expressions.

---

# 43. Why Regex Is Not an HTML Sanitizer

Avoid trying to sanitize HTML with code such as:

```javascript
html.replace(/<script.*?>.*?<\/script>/gi, "");
```

This approach is unreliable because HTML parsing is much more complicated than simple pattern matching.

Security filtering should use a parser-aware, well-maintained sanitizer designed for the task.

---

# 44. Trusted Types

Modern browsers can provide an additional security mechanism called:

> **Trusted Types**

Trusted Types can help prevent unsafe strings from being passed to certain DOM XSS sinks by requiring trusted objects instead.

Conceptually:

```text
Untrusted string
      ↓
Trusted transformation
      ↓
Trusted HTML
      ↓
Dangerous sink
```

This can significantly strengthen applications with complex HTML rendering requirements.

Support and deployment strategy should be checked for the target browser environment.

---

# 45. DOM Security in React

React normally escapes text inserted through JSX.

For example:

```jsx
function Greeting({ name }) {
  return <h1>{name}</h1>;
}
```

If:

```javascript
name = "<strong>Osama Abu Motlaq</strong>";
```

React treats it as text rather than automatically interpreting it as HTML.

Conceptually:

```text
JSX value
   ↓
React escaping
   ↓
Text content
```

This is an important React security feature.

---

# 46. `dangerouslySetInnerHTML`

React provides an explicit escape hatch:

```jsx
<div dangerouslySetInnerHTML={{ __html: html }} />
```

The name is intentionally warning-oriented.

Do not use it with untrusted HTML.

Dangerous:

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: userInput
  }}
/>
```

If HTML must be rendered, sanitize it using an appropriate, trusted approach before passing it to the sink.

---

# 47. React Does Not Make Every Value Safe

React's default JSX escaping helps with text content.

It does not mean:

> "Everything passed to React is automatically safe."

You still need to think about:

* URLs.
* HTML.
* Third-party libraries.
* Dynamic scripts.
* CSS-related contexts.
* External HTML.
* Browser APIs.
* Server-side security.
* Authentication.
* Authorization.

---

# 48. Next.js and DOM Security

Next.js applications may contain both:

```text
Server-side code
```

and:

```text
Client-side code
```

This distinction matters.

Server-side code can safely access secrets that should never be sent to the browser.

Client-side code cannot keep a secret from the user.

Therefore:

```text
Secret
 ↓
Server
```

rather than:

```text
Secret
 ↓
Client bundle
```

---

# 49. Supabase and Client Security

If a browser application communicates directly with Supabase, the client-side Supabase configuration is not a traditional secret.

Security should instead rely on Supabase's authorization model, especially:

```text
Authentication
+
Row Level Security (RLS)
+
Proper policies
```

Never put a server-only secret such as a privileged service-role credential into client-side code.

The general rule is:

> **Anything shipped to the browser can be inspected by the user.**

---

# 50. URL Parameters in Next.js

Suppose a page receives:

```text
/search?q=Osama%20Abu%20Motlaq
```

The query parameter is user-controlled.

Rendering it as text is generally safe:

```jsx
<h1>{query}</h1>
```

But dynamically turning it into HTML requires additional security consideration.

The same principle applies regardless of whether the input came from:

```text
URL
Form
API
Database
```

---

# 51. DOM Security and `postMessage`

The browser provides:

```javascript
window.postMessage();
```

for cross-window communication.

When receiving messages:

```javascript
window.addEventListener("message", (event) => {
  // Handle message
});
```

do not blindly trust:

```javascript
event.data;
```

Validate:

```javascript
event.origin;
```

and validate the message structure before using the data.

---

# 52. Example of Safer Message Handling

```javascript
window.addEventListener("message", (event) => {
  if (event.origin !== "https://example.com") {
    return;
  }

  if (typeof event.data !== "object" || event.data === null) {
    return;
  }

  // Process validated data.
});
```

The exact allowed origin should be determined by your application.

Do not use:

```javascript
if (event.origin === "*")
```

as a security check.

---

# 53. Avoid `innerHTML` for Simple UI Updates

Bad:

```javascript
status.innerHTML = `<p>${message}</p>`;
```

Better:

```javascript
const paragraph = document.createElement("p");

paragraph.textContent = message;

status.replaceChildren(paragraph);
```

Or simply:

```javascript
status.textContent = message;
```

if a wrapper is unnecessary.

---

# 54. `replaceChildren()`

For replacing children safely:

```javascript
container.replaceChildren(element);
```

This can be preferable to rebuilding HTML strings when working with DOM nodes.

You can also clear content:

```javascript
container.replaceChildren();
```

This avoids HTML parsing.

---

# 55. Security and Event Handlers

Prefer:

```javascript
button.addEventListener("click", handleClick);
```

instead of:

```html
<button onclick="...">
```

Separating code from HTML makes it easier to reason about security and behavior.

Never construct event-handler JavaScript from user input.

---

# 56. Security and `href`

When rendering external links:

```javascript
const link = document.createElement("a");

link.textContent = "Visit site";
link.href = validatedUrl;
```

Validate the URL before assigning it.

Also consider:

```javascript
link.target = "_blank";
link.rel = "noopener noreferrer";
```

when opening untrusted external destinations in a new tab.

`noopener` prevents the opened page from getting a reference to the opener through `window.opener`.

Modern browsers have improved default protections in this area, but explicitly setting appropriate `rel` values remains a clear defensive practice.

---

# 57. Security and `target="_blank"`

Consider:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open
</a>
```

The important security concept is controlling the relationship between the current page and the newly opened page.

For external links generated from untrusted data, also validate the destination itself.

---

# 58. Security and `iframe`

If your application embeds external content:

```html
<iframe src="..."></iframe>
```

carefully control the source.

For potentially untrusted embedded content, consider:

```html
<iframe
  src="..."
  sandbox
></iframe>
```

The exact `sandbox` permissions should match the application's requirements.

Do not grant more privileges than necessary.

---

# 59. Never Trust Client-Side Permissions

This is insecure:

```javascript
if (button.dataset.role === "admin") {
  allowDelete();
}
```

An attacker can modify:

```javascript
button.dataset.role = "admin";
```

Client-side UI checks are useful for presentation.

They are not authorization.

The server must enforce the permission.

---

# 60. Security Boundary Mental Model

The browser belongs to the user.

Therefore:

```text
HTML
JavaScript
DOM
localStorage
sessionStorage
DevTools
Network requests
```

are all accessible or controllable to varying degrees from the client side.

Do not use client-side state as the ultimate authority for:

* Permissions.
* Roles.
* Pricing.
* Ownership.
* Security decisions.
* Secret values.

---

# 61. Common DOM Security Mistakes

## Mistake 1: Using `innerHTML` with user input

```javascript
element.innerHTML = userInput;
```

Avoid this unless the HTML has been appropriately sanitized and the use case genuinely requires HTML.

---

## Mistake 2: Assuming database data is trusted

Database content can originate from users or compromised systems.

Treat data according to its trust boundary.

---

## Mistake 3: Using `eval()`

```javascript
eval(userInput);
```

Never execute untrusted strings as JavaScript.

---

## Mistake 4: Trusting URL values

```javascript
link.href = location.search;
```

Validate and constrain URLs.

---

## Mistake 5: Using inline event handlers

```javascript
element.setAttribute("onclick", value);
```

Avoid executable event-handler attributes.

---

## Mistake 6: Putting secrets in the DOM

Anything rendered in the browser can be inspected.

---

## Mistake 7: Trusting hidden inputs

Hidden does not mean secure.

---

## Mistake 8: Relying only on client validation

Attackers can bypass client-side JavaScript.

---

## Mistake 9: Writing your own HTML sanitizer

Use established, security-focused sanitization tools when HTML rendering is genuinely required.

---

## Mistake 10: Assuming React solves every security problem

React's escaping helps with text rendering, but security remains an application-wide responsibility.

---

# 62. Secure DOM Development Workflow

A practical workflow is:

```text
1. Identify the data source
        ↓
2. Decide whether it is trusted
        ↓
3. Identify the output context
        ↓
4. Prefer a safe DOM API
        ↓
5. Validate or constrain the value
        ↓
6. Sanitize when HTML is genuinely required
        ↓
7. Enforce security on the server
        ↓
8. Add defense-in-depth controls
        ↓
9. Test the security boundary
```

---

# 63. Safe vs Dangerous Patterns

| Pattern                              | Typical Risk                        |
| ------------------------------------ | ----------------------------------- |
| `textContent = value`                | Low for HTML injection              |
| `createElement()` + `textContent`    | Low for HTML injection              |
| `classList.add()`                    | Low when class names are controlled |
| `setAttribute("title", value)`       | Generally safe for text             |
| `innerHTML = trustedStaticHTML`      | Context-dependent                   |
| `innerHTML = userInput`              | High XSS risk                       |
| `outerHTML = userInput`              | High XSS risk                       |
| `insertAdjacentHTML(userInput)`      | High XSS risk                       |
| `document.write(userInput)`          | Dangerous                           |
| `eval(userInput)`                    | Dangerous                           |
| `new Function(userInput)`            | Dangerous                           |
| `setAttribute("onclick", userInput)` | Dangerous                           |
| `link.href = unvalidatedInput`       | Potential URL-based risk            |

The exact security impact always depends on the data, context, browser behavior, and surrounding controls.

---

# 64. DOM Security Quick Reference

### Safe text

```javascript
element.textContent = value;
```

### Create a node

```javascript
const element = document.createElement("p");
element.textContent = value;
```

### Add a class

```javascript
element.classList.add("active");
```

### Dangerous HTML rendering

```javascript
element.innerHTML = value;
```

### Dangerous dynamic JavaScript

```javascript
eval(value);
```

### Dangerous event handler

```javascript
element.setAttribute("onclick", value);
```

### URL validation

```javascript
const url = new URL(value, window.location.origin);

if (url.protocol === "https:" || url.protocol === "http:") {
  link.href = url.href;
}
```

---

# 65. React Security Quick Reference

### Normal JSX text

```jsx
<p>{userInput}</p>
```

React escapes text content by default.

### Potentially dangerous HTML

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: html
  }}
/>
```

Only use this when the HTML is trusted or has been appropriately sanitized.

### Server-side authorization

```text
Client request
      ↓
Server
      ↓
Authentication
      ↓
Authorization
      ↓
Database operation
```

Never rely only on:

```text
Button visibility
DOM attributes
React state
Hidden inputs
```

for authorization.

---

# 66. DOM Security Mental Model

The most useful mental model is:

```text
                 UNTRUSTED DATA
                       │
          ┌────────────┴────────────┐
          ↓                         ↓
       Validate                 Constrain
          │                         │
          └────────────┬────────────┘
                       ↓
                 Safe API
                       ↓
                  DOM / UI
```

Avoid:

```text
Untrusted data
      ↓
HTML / JS interpretation
      ↓
Browser execution
```

---

# Key Takeaways

* Treat external and user-controlled data as untrusted until you have a reason to trust or validate it.
* XSS is one of the most important DOM security risks.
* Prefer `textContent` for text.
* `innerHTML`, `outerHTML`, and `insertAdjacentHTML()` interpret strings as HTML and require careful handling.
* Never execute untrusted data with `eval()` or `new Function()`.
* Avoid dynamically generated inline event handlers.
* Validate URLs before using untrusted values as navigation destinations.
* Use allowlists when the application expects a limited set of values.
* Client-side validation improves UX but is not a security boundary.
* Hidden DOM elements and attributes are not trustworthy security mechanisms.
* Never expose server-only secrets in client-side JavaScript or the DOM.
* `HttpOnly` cookies can prevent JavaScript from directly reading cookie values, but they do not eliminate XSS risk.
* CSP provides an additional layer of defense against script injection.
* When rendering user-controlled HTML is genuinely required, use a well-maintained HTML sanitizer rather than writing one with regular expressions.
* Trusted Types can provide additional protection against DOM XSS in supported environments.
* React escapes ordinary JSX text by default, but `dangerouslySetInnerHTML` bypasses that normal behavior.
* Next.js does not remove the need for browser-side security.
* Authorization must be enforced on the server.
* For Supabase-backed applications, client-side configuration is not a substitute for proper authentication and Row Level Security policies.
* Security is about the entire data flow, not a single DOM API.

The core rule to remember is:

> **Treat data as data. Do not accidentally turn untrusted data into HTML, JavaScript, CSS, or executable browser behavior.**
