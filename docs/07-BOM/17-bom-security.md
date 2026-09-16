# Browser Security

Browser security is the collection of rules, restrictions, and mechanisms that protect users, websites, and browser environments from malicious or unintended behavior.

Modern browsers do not allow every webpage to freely access every resource.

Instead, browsers enforce security boundaries around:

* Origins
* Documents
* Frames
* Cookies
* Storage
* Network requests
* Clipboard
* Geolocation
* Notifications
* Camera and microphone
* Popups
* Cross-origin communication
* Navigation
* Embedded content

Understanding these boundaries is essential for frontend development.

A useful mental model is:

```text
Website
   ↓
Browser security model
   ↓
What the page is allowed to access
```

The browser is a security boundary, but it is **not** the final security boundary for your application.

The server must still validate and authorize sensitive operations.

---

# 1. The Same-Origin Policy

One of the most important browser security concepts is the **Same-Origin Policy (SOP)**.

It restricts how documents and scripts from one origin can interact with resources from another origin.

An origin is defined by:

```text
scheme + host + port
```

For example:

```text
https://example.com:443
```

contains:

```text
scheme → https
host   → example.com
port   → 443
```

---

# 2. What Is an Origin?

Consider:

```text
https://example.com/products
```

Its origin is:

```text
https://example.com
```

The path:

```text
/products
```

is not part of the origin.

Similarly:

```text
https://example.com/about
```

has the same origin.

Therefore:

```text
https://example.com/products
https://example.com/about
```

are same-origin documents.

---

# 3. Same-Origin Comparison

Consider:

```text
https://example.com
https://example.com:443
```

These can represent the same origin when the explicit port corresponds to the scheme's default port.

Now compare:

```text
http://example.com
https://example.com
```

Different scheme:

```text
http
≠
https
```

Therefore, they are different origins.

---

# 4. Different Host Means Different Origin

These are different:

```text
https://example.com
https://api.example.com
```

because:

```text
example.com
≠
api.example.com
```

Subdomains are not automatically same-origin.

This is an important distinction.

---

# 5. Different Port Means Different Origin

These are different origins:

```text
https://example.com:443
https://example.com:8443
```

because:

```text
443
≠
8443
```

The browser includes the port in origin comparison.

---

# 6. Same-Origin Mental Model

Think of origin as an address identity:

```text
https://example.com:443
└──┬──┘ └────┬────┘ └─┬─┘
scheme       host      port
```

All three must match appropriately for two URLs to be same-origin.

---

# 7. Why Same-Origin Policy Exists

Without same-origin restrictions, one malicious webpage could potentially interact freely with another website that the user is logged into.

Imagine:

```text
You are logged into:
https://bank.example
```

Then you visit:

```text
https://malicious.example
```

Without browser security restrictions, the malicious site could potentially attempt to access sensitive resources from the banking site.

Same-Origin Policy helps prevent this type of cross-site access.

---

# 8. Same-Origin Policy Is Not "No Cross-Origin Requests"

This is an important distinction.

Browsers can allow some forms of cross-origin interaction while restricting access to the response or other capabilities.

For example:

```js
fetch("https://api.example.com/data");
```

may result in a CORS-controlled cross-origin request.

The important question is not simply:

```text
"Did the browser send the request?"
```

but also:

```text
"Is the calling page allowed to access the result?"
```

---

# 9. Same-Origin vs Same-Site

These terms are not interchangeable.

### Same-origin

Based on:

```text
scheme + host + port
```

### Same-site

Uses a different concept based on the registrable domain and scheme in modern cookie/site security rules.

For example:

```text
app.example.com
api.example.com
```

are different origins but can belong to the same site depending on the relevant rules.

Do not use "same-origin" and "same-site" as synonyms.

---

# 10. Origin Is Not the Same as Domain

Consider:

```text
https://app.example.com:443
```

The domain/host is:

```text
app.example.com
```

The origin includes:

```text
https://
app.example.com
443
```

Security decisions can depend on the full origin.

---

# 11. `window.origin`

In supported browser contexts, the origin can be inspected through:

```js
console.log(window.origin);
```

For example:

```text
https://example.com
```

This can be useful when debugging cross-origin behavior.

You can also use:

```js
new URL(window.location.href).origin
```

---

# 12. `location.origin`

Another common way to inspect the current document's origin:

```js
console.log(location.origin);
```

Example:

```text
https://example.com
```

This is often useful when constructing same-origin API URLs.

---

# 13. Why Origin Matters in Full-Stack Applications

Suppose:

```text
Frontend:
https://app.example.com

API:
https://api.example.com
```

These are different origins.

Therefore, browser security rules may apply to requests between them.

This is one reason developers encounter CORS issues.

---

# 14. CORS

**Cross-Origin Resource Sharing (CORS)** is a mechanism that allows a server to communicate which cross-origin requests are permitted.

The browser enforces CORS rules.

A server can respond with headers such as:

```http
Access-Control-Allow-Origin: https://app.example.com
```

This tells the browser that the specified origin is permitted to access the response under the applicable CORS rules.

---

# 15. CORS Is a Browser Security Mechanism

A common misconception is:

> CORS is a server firewall.

It is not.

CORS is primarily a browser-enforced mechanism controlling whether frontend JavaScript can access cross-origin responses.

A server can receive a request even when the browser later blocks JavaScript from reading the response.

---

# 16. CORS Does Not Replace Authentication

Consider:

```http
Access-Control-Allow-Origin: https://app.example.com
```

This does not mean:

```text
The user is authenticated.
```

It only addresses cross-origin browser access.

Authentication and authorization are separate concerns.

---

# 17. CORS Example

Suppose:

```text
Frontend:
https://app.example.com

API:
https://api.example.com
```

Frontend:

```js
const response = await fetch(
  "https://api.example.com/users"
);
```

The API must be configured appropriately if the frontend is expected to read the cross-origin response.

---

# 18. Simple Requests vs Preflight

Some cross-origin requests can trigger a browser preflight request.

The browser may send:

```http
OPTIONS /users
```

before the actual request.

The server needs to respond with appropriate CORS information.

Conceptually:

```text
Browser
   ↓
OPTIONS
   ↓
Server
   ↓
Permission response
   ↓
Actual request
```

---

# 19. Why Preflight Exists

Preflight helps protect servers from certain cross-origin requests that require additional permission.

A preflight may be triggered when the request involves conditions such as:

* non-simple methods
* custom headers
* certain content types

For example:

```js
fetch(
  "https://api.example.com/data",
  {
    method: "DELETE",
    headers: {
      "X-Custom-Header": "value",
    },
  }
);
```

can require preflight depending on the complete request configuration.

---

# 20. CORS Error Interpretation

If the browser reports a CORS error, do not automatically conclude:

```text
"The API is broken."
```

The API may be functioning normally.

The problem may be:

```text
Browser
   ↓
Cross-origin response
   ↓
CORS policy mismatch
```

Inspect the network request and response headers to diagnose the actual problem.

---

# 21. CORS and Credentials

Requests involving credentials have additional restrictions.

For example:

```js
fetch(
  "https://api.example.com/user",
  {
    credentials: "include",
  }
);
```

The server must explicitly support credentialed cross-origin requests.

Wildcard origins:

```http
Access-Control-Allow-Origin: *
```

cannot be used in the same way with credentialed CORS requests.

The exact CORS configuration must match the application's authentication architecture.

---

# 22. Never Reflect Arbitrary Origins Blindly

Avoid insecure server logic such as:

```text
Receive:
Origin: https://attacker.example

Respond:
Access-Control-Allow-Origin: https://attacker.example
```

for every request without validating whether that origin is trusted.

A safer architecture uses an allowlist of known origins.

---

# 23. CORS Does Not Protect Your API from Direct Requests

A malicious user can make requests outside the browser using tools such as:

```text
curl
Postman
server-side code
custom clients
```

Therefore:

```text
CORS
≠
API security
```

Your API still needs:

* authentication
* authorization
* input validation
* rate limiting
* business-rule enforcement

---

# 24. The Server Is the Final Trust Boundary

This principle is fundamental:

```text
Browser
   ↓
Untrusted client
   ↓
Server
   ↓
Trust boundary
```

Do not make security-critical decisions solely in React or browser JavaScript.

---

# 25. HTTPS

HTTPS encrypts HTTP traffic using TLS.

It protects data while it travels between the browser and the server from many forms of network interception and manipulation.

Example:

```text
https://example.com
```

is preferable to:

```text
http://example.com
```

for production applications.

---

# 26. Why HTTPS Matters to Browser APIs

Many browser capabilities are restricted to secure contexts.

Examples include sensitive APIs such as:

```text
Geolocation
Notifications
Clipboard
Camera
Microphone
```

The exact requirements vary by API.

A useful check is:

```js
console.log(window.isSecureContext);
```

---

# 27. Secure Context

A secure context is generally associated with:

```text
HTTPS
```

with certain exceptions and rules for local development environments.

Example:

```js
if (window.isSecureContext) {
  console.log("Secure context");
}
```

This is useful when diagnosing why a browser API is unavailable.

---

# 28. Mixed Content

Mixed content occurs when a secure page attempts to load insecure resources.

For example:

```text
https://example.com
       ↓
http://example.com/image.png
```

Browsers may block certain mixed-content resources.

This protects users from insecure network communication being introduced into an otherwise secure page.

---

# 29. Mixed Content Example

Bad:

```html
<img src="http://example.com/image.png">
```

on:

```text
https://example.com
```

Better:

```html
<img src="https://example.com/image.png">
```

Or use a same-origin path:

```html
<img src="/image.png">
```

---

# 30. Content Security Policy

**Content Security Policy (CSP)** is a security mechanism that allows a site to control which types of resources and scripts the browser is permitted to load or execute.

A policy can help reduce the impact of certain injection attacks, especially XSS.

Example concept:

```http
Content-Security-Policy:
  default-src 'self';
```

This is delivered through HTTP headers or, in some cases, a meta element.

---

# 31. Why CSP Matters

Without strong control over executable resources, an injection vulnerability may allow malicious code to execute.

CSP can limit:

```text
scripts
styles
images
fonts
frames
connections
```

depending on the directives used.

CSP should be treated as a defense layer, not a replacement for secure application code.

---

# 32. Basic CSP Example

A simplified policy:

```http
Content-Security-Policy:
  default-src 'self';
```

This means the default source for many resource categories is the current origin.

A production policy often needs more explicit directives.

---

# 33. Script Sources

You can define script sources:

```http
Content-Security-Policy:
  script-src 'self';
```

This can restrict script execution to scripts served from the same origin.

Modern applications may instead use nonces or hashes for controlled inline scripts.

---

# 34. Why `unsafe-inline` Matters

A policy such as:

```http
script-src 'self' 'unsafe-inline'
```

weakens protection against certain script injection scenarios.

It may be necessary for legacy architectures, but modern applications should avoid allowing unsafe inline script execution unless there is a deliberate reason.

---

# 35. CSP Nonces

A nonce is a random value generated for a particular response.

Conceptually:

```http
Content-Security-Policy:
  script-src 'self' 'nonce-abc123';
```

Then an allowed script includes the corresponding nonce:

```html
<script nonce="abc123">
  ...
</script>
```

The exact nonce must be unpredictable and generated per response.

This is a more controlled approach than broadly enabling inline scripts.

---

# 36. CSP Hashes

CSP can also allow specific inline script content through cryptographic hashes.

Conceptually:

```http
script-src 'self' 'sha256-...'
```

The browser calculates the hash of the relevant script and checks whether it matches the policy.

This allows specific inline code rather than all inline scripts.

---

# 37. `object-src`

A CSP policy may restrict plugin-like object content:

```http
object-src 'none';
```

This is a common hardening directive.

---

# 38. `frame-ancestors`

CSP can control which origins may embed a page:

```http
frame-ancestors 'none';
```

This can help defend against clickjacking by preventing the page from being embedded in frames.

---

# 39. `connect-src`

`connect-src` controls destinations for certain network connections initiated by browser APIs.

Example:

```http
connect-src 'self' https://api.example.com;
```

This can affect:

* `fetch`
* XHR
* WebSocket
* other connection mechanisms

depending on the resource type and browser rules.

---

# 40. CSP as Defense in Depth

CSP should not be thought of as:

```text
"Now the application is secure."
```

Instead:

```text
Input validation
+
safe rendering
+
authentication
+
authorization
+
secure headers
+
CSP
```

Security is layered.

---

# 41. XSS

**Cross-Site Scripting (XSS)** occurs when attacker-controlled content is executed as code in another user's browser context.

For example:

```js
element.innerHTML = userInput;
```

can be dangerous when `userInput` contains malicious markup.

---

# 42. Safer Text Rendering

When you need plain text, prefer:

```js
element.textContent = userInput;
```

rather than:

```js
element.innerHTML = userInput;
```

The browser treats `textContent` as text instead of parsing it as HTML.

---

# 43. React and XSS

React escapes text rendered normally:

```jsx
<p>{userInput}</p>
```

React does not normally interpret `userInput` as raw HTML.

This is one reason JSX is safer than directly assigning arbitrary strings to `innerHTML`.

---

# 44. `dangerouslySetInnerHTML`

React provides:

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: content,
  }}
/>
```

The name is intentionally warning you.

If `content` contains attacker-controlled HTML and is not properly sanitized, this can create XSS.

Use it only when there is a genuine need for HTML rendering.

---

# 45. Sanitization

If an application must render user-generated HTML, sanitize it first.

Conceptually:

```text
User HTML
   ↓
Sanitizer
   ↓
Allowed HTML
   ↓
Render
```

A sanitizer should be designed specifically for HTML security.

Do not attempt to build a complete HTML sanitizer using a few regular expressions.

---

# 46. `innerHTML` Is Not Always Unsafe

This distinction matters.

Using:

```js
element.innerHTML = "<p>Hello</p>";
```

with developer-controlled static HTML is not automatically an XSS vulnerability.

The problem arises when untrusted input enters HTML parsing without appropriate sanitization.

Think:

```text
Trusted static HTML
≠
Untrusted user-controlled HTML
```

---

# 47. URL-Based XSS Risks

User-controlled URLs can also create security problems.

For example:

```js
window.location.href =
  userProvidedUrl;
```

can be dangerous if arbitrary protocols or destinations are accepted.

Validate the URL before navigation when the destination is user-controlled.

---

# 48. Dangerous URL Schemes

Some URL schemes can be dangerous in certain contexts, especially:

```text
javascript:
data:
```

For example:

```js
window.location.href =
  "javascript:...";
```

can create script execution in contexts where it is allowed.

Applications should not accept arbitrary user-controlled schemes.

---

# 49. Safe Redirect Design

Suppose:

```text
/login?redirect=/dashboard
```

A safe application may allow:

```text
/dashboard
/projects
/settings
```

but reject arbitrary external destinations when the feature is supposed to use internal paths.

This reduces open redirect risks.

---

# 50. Open Redirects

An open redirect occurs when an application redirects users to arbitrary attacker-controlled destinations.

Example:

```js
const redirect =
  new URLSearchParams(
    location.search
  ).get("redirect");

location.href = redirect;
```

If unrestricted, an attacker may construct a link that sends users to a malicious site.

---

# 51. Safer Redirect Handling

A common strategy is to allow only relative paths:

```js
function isSafeRedirect(value) {
  return (
    value &&
    value.startsWith("/") &&
    !value.startsWith("//")
  );
}
```

Then:

```js
if (isSafeRedirect(redirect)) {
  location.href = redirect;
}
```

For more complex applications, use a strong allowlist of permitted destinations.

---

# 52. URL Validation Is Not Authorization

Even if:

```js
isSafeRedirect(url)
```

returns true, this does not mean the destination is authorized for every user.

URL validation and authorization are separate concepts.

---

# 53. Referrer Information

Browsers may send referrer information when navigating or making requests.

A URL can sometimes leak information through its path or query string.

Example:

```text
https://example.com/reset?token=...
```

Sensitive information in URLs can create exposure through:

* referrer information
* browser history
* logs
* analytics
* screenshots
* copied links

Do not put secrets into URLs unnecessarily.

---

# 54. `Referrer-Policy`

Web applications can control referrer behavior with:

```http
Referrer-Policy
```

For example:

```http
Referrer-Policy: strict-origin-when-cross-origin
```

This limits how much referrer information is sent across origins.

A suitable policy depends on application requirements.

---

# 55. Secrets in URLs

Avoid:

```text
https://example.com/reset?token=SECRET
```

when there are safer alternatives.

URLs are not ideal secret containers because they can be exposed in places beyond the immediate page.

Be especially careful with:

* API keys
* passwords
* access tokens
* reset tokens
* private identifiers

---

# 56. Browser History and Sensitive Data

URLs can remain in browser history.

Therefore:

```text
https://example.com/account?secret=...
```

can persist beyond the moment the user visits the page.

This is another reason to avoid sensitive data in query parameters.

---

# 57. Cookies

Cookies are another browser storage mechanism, but they have security-related controls.

Important cookie attributes include:

```text
Secure
HttpOnly
SameSite
Domain
Path
Expires
Max-Age
```

---

# 58. `Secure` Cookie Attribute

A cookie with:

```text
Secure
```

is sent only over secure HTTPS connections, subject to the relevant browser rules.

Example:

```http
Set-Cookie: session=abc; Secure
```

For authentication cookies, `Secure` is generally an important defense.

---

# 59. `HttpOnly`

A cookie marked:

```text
HttpOnly
```

cannot be read through normal JavaScript:

```js
document.cookie
```

This is useful for session cookies because it reduces direct exposure to client-side scripts.

However:

```text
HttpOnly
```

does not magically prevent all CSRF or XSS consequences.

It is one security layer.

---

# 60. `SameSite`

`SameSite` controls when cookies are sent in cross-site request contexts.

Common values:

```text
Strict
Lax
None
```

Conceptually:

```text
Strict
→ strongest cross-site restriction

Lax
→ some cross-site navigation allowed

None
→ cross-site cookie usage allowed
  when other requirements are met
```

The exact browser behavior should be understood when designing authentication.

---

# 61. `SameSite=None` and `Secure`

Cookies using:

```text
SameSite=None
```

must generally also use:

```text
Secure
```

This requirement exists to prevent insecure cross-site cookie usage.

---

# 62. `document.cookie`

JavaScript can access cookies that are not `HttpOnly`:

```js
console.log(document.cookie);
```

However, application code should not assume all cookies are accessible.

For example:

```text
HttpOnly cookie
↓
not readable through document.cookie
```

This is an important security property.

---

# 63. Why `localStorage` Is Different from `HttpOnly` Cookies

`localStorage` is accessible to JavaScript:

```js
localStorage.getItem("token");
```

An `HttpOnly` cookie is not accessible in the same way.

Therefore, storing sensitive session credentials in JavaScript-accessible storage can increase the impact of XSS.

Authentication architecture should consider this trade-off carefully.

---

# 64. XSS and Tokens

Suppose a token is stored in:

```js
localStorage.setItem(
  "token",
  accessToken
);
```

If an attacker gains JavaScript execution through XSS, malicious code may be able to read the token.

This is one reason many secure authentication architectures prefer carefully configured cookies for session management.

---

# 65. Storage Security Is Not Just About "LocalStorage vs Cookies"

The correct question is:

```text
What data?
How sensitive?
Who needs to read it?
How is authentication implemented?
What are the XSS and CSRF threats?
```

There is no universal rule that one storage mechanism solves every security problem.

---

# 66. CSRF

**Cross-Site Request Forgery (CSRF)** occurs when an attacker causes a user's browser to send an authenticated request to a target application without the user's intentional action.

Cookies are relevant because browsers automatically attach appropriate cookies to matching requests.

---

# 67. Why Cookies Can Matter for CSRF

Suppose:

```text
User is authenticated to:
https://bank.example
```

An attacker page might attempt to trigger:

```text
POST https://bank.example/transfer
```

The browser may attach cookies according to cookie rules.

The server therefore needs additional CSRF defenses where appropriate.

---

# 68. CSRF Defenses

Common defenses include:

* `SameSite` cookies
* CSRF tokens
* origin/referer validation where appropriate
* avoiding unsafe state-changing GET requests
* correct authentication architecture

The precise strategy depends on the application.

---

# 69. Don't Change State Through GET

Avoid designs such as:

```text
GET /delete-account
```

or:

```text
GET /transfer?amount=100
```

GET should not be used for state-changing operations.

Prefer methods such as:

```text
POST
PUT
PATCH
DELETE
```

with appropriate CSRF/authentication protection.

---

# 70. Authentication and Authorization

These are different.

### Authentication

> Who is the user?

### Authorization

> What is the user allowed to do?

A frontend check such as:

```js
if (user.role === "admin") {
  showAdminButton();
}
```

is useful for UI purposes.

It is not sufficient authorization.

The server must enforce the actual permission.

---

# 71. Frontend Authorization Is Not Security

Consider:

```js
if (isAdmin) {
  deleteUser();
}
```

A malicious user can modify frontend code and call the API directly.

The server must still verify:

```text
authenticated user
+
authorized action
```

before deleting the user.

---

# 72. Browser Security vs Application Security

Browser security protects the user from malicious pages.

Application security protects your system's business rules and data.

They overlap, but they are not the same.

```text
Browser Security
→ protects browser boundaries

Application Security
→ protects application resources
```

You need both.

---

# 73. `window.open()` Security

Opening a new tab can create relationship concerns.

For links:

```html
<a
  href="https://example.com"
  target="_blank"
>
  Open
</a>
```

modern browsers generally mitigate some `window.opener` risks for target blank links, but explicit defensive patterns are still useful depending on context.

A common practice is:

```html
rel="noopener noreferrer"
```

when appropriate.

---

# 74. `window.opener`

When one page opens another page, the relationship may involve:

```js
window.opener
```

This can allow communication between the pages under certain circumstances.

Untrusted external pages should not automatically receive access to an opener relationship.

This is one reason `noopener` is useful.

---

# 75. `noopener`

Example:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener"
>
  Open
</a>
```

`noopener` prevents the newly opened page from retaining a scripting reference to the opener through `window.opener`.

This reduces certain cross-window attacks.

---

# 76. `noreferrer`

```html
rel="noreferrer"
```

can additionally affect referrer information sent to the destination.

It should be used when the application wants that behavior.

---

# 77. `postMessage()`

Windows and frames can communicate across origins using:

```js
window.postMessage()
```

This is a powerful and useful cross-origin communication mechanism.

Example:

```js
otherWindow.postMessage(
  {
    type: "GREETING",
    message: "Hello, Osama Abu Motlaq!",
  },
  "https://example.com"
);
```

The target origin should be explicit whenever possible.

---

# 78. Why `postMessage()` Exists

Same-Origin Policy blocks many direct cross-origin DOM interactions.

`postMessage()` provides a controlled communication channel.

Conceptually:

```text
Window A
    ↓
postMessage()
    ↓
Browser
    ↓
Window B
```

This allows communication without granting unrestricted DOM access.

---

# 79. The `message` Event

The receiving page can listen:

```js
window.addEventListener(
  "message",
  (event) => {
    console.log(event.data);
  }
);
```

But this is not sufficient for security.

You must validate the sender.

---

# 80. Validate `event.origin`

A secure receiver should check:

```js
window.addEventListener(
  "message",
  (event) => {
    if (
      event.origin !==
      "https://trusted.example"
    ) {
      return;
    }

    console.log(event.data);
  }
);
```

Never blindly trust messages from arbitrary origins.

---

# 81. Validate `event.source`

Depending on the communication architecture, also verify that:

```js
event.source
```

is the expected window/frame.

For example:

```js
if (event.source !== expectedWindow) {
  return;
}
```

This adds another layer of validation.

---

# 82. `postMessage()` Data Is Untrusted

Even if:

```js
event.origin ===
"https://trusted.example"
```

you should still validate:

```js
event.data
```

For example:

```js
if (
  !event.data ||
  event.data.type !== "SAVE"
) {
  return;
}
```

Treat incoming messages as external input.

---

# 83. Never Use `*` Unnecessarily

This is broadly permissive:

```js
otherWindow.postMessage(
  data,
  "*"
);
```

If you know the destination:

```js
otherWindow.postMessage(
  data,
  "https://trusted.example"
);
```

prefer the specific origin.

This reduces accidental data disclosure.

---

# 84. Iframes and Security

An iframe can isolate content from the parent page under origin rules.

Example:

```html
<iframe
  src="https://example.com"
></iframe>
```

The framed page may have a different origin.

Direct DOM access can be restricted by the Same-Origin Policy.

This is a core browser security boundary.

---

# 85. `sandbox` for Iframes

An iframe can be further restricted:

```html
<iframe
  src="https://example.com"
  sandbox
></iframe>
```

The `sandbox` attribute enables additional restrictions.

Permissions can be selectively relaxed using sandbox tokens.

This is useful when embedding content that should have limited privileges.

---

# 86. Why Iframe Sandboxing Matters

Third-party content can be less trusted.

A sandbox can limit capabilities such as:

* scripts
* forms
* same-origin behavior
* popups
* navigation
* downloads

depending on the configuration.

Use the least privilege necessary.

---

# 87. Dangerous Sandbox Combinations

Sandbox configuration requires careful understanding.

For example:

```html
sandbox="allow-scripts allow-same-origin"
```

can significantly change the isolation properties compared with a plain sandbox.

Do not copy sandbox flags blindly.

Understand exactly which capabilities the embedded content needs.

---

# 88. Clickjacking

Clickjacking occurs when an attacker causes a user to interact with a target interface through deceptive framing or overlay techniques.

A malicious site might try:

```text
Attacker page
   ↓
Invisible/transparent frame
   ↓
Target site
```

The user believes they are clicking one thing while interacting with another.

---

# 89. Defenses Against Clickjacking

Common defenses include:

```text
CSP frame-ancestors
X-Frame-Options
```

For modern applications:

```http
Content-Security-Policy:
  frame-ancestors 'none';
```

or a controlled allowlist can be used.

---

# 90. `X-Frame-Options`

Older but still relevant deployments may use:

```http
X-Frame-Options: DENY
```

or:

```http
X-Frame-Options: SAMEORIGIN
```

CSP `frame-ancestors` is generally more flexible for modern policies.

---

# 91. Permissions Policy

Browsers also provide mechanisms for controlling access to certain powerful features in embedded contexts.

An HTTP header can define a Permissions Policy.

Conceptually:

```http
Permissions-Policy:
  geolocation=(self)
```

This can constrain which origins may use certain capabilities.

The exact syntax depends on the feature and policy configuration.

---

# 92. Why Permissions Policy Matters

Suppose an application embeds third-party content.

You may not want the embedded content to access:

```text
camera
microphone
geolocation
```

unless it explicitly needs them.

Permissions Policy helps enforce least privilege at the browser level.

---

# 93. Browser Permissions vs Permissions Policy

These are different.

### Permission

User/browser decision about a powerful capability.

### Permissions Policy

Policy controlling whether a document or embedded context is allowed to request/use a capability.

Conceptually:

```text
Permissions Policy
       ↓
Is this context allowed?

Permission
       ↓
Is the user allowing it?
```

Both can affect the final result.

---

# 94. Local Storage and XSS

`localStorage` is convenient:

```js
localStorage.setItem(
  "theme",
  "dark"
);
```

But it is accessible to JavaScript.

If an attacker executes JavaScript through XSS, they may be able to read sensitive values stored there.

Do not store highly sensitive credentials casually in web storage.

---

# 95. Session Storage and XSS

The same basic concern applies to:

```js
sessionStorage
```

It is still JavaScript-accessible.

Session lifetime does not eliminate XSS risk.

---

# 96. Storage Is Not a Security Boundary

This is important:

```text
localStorage
sessionStorage
```

are application storage mechanisms.

They are not trusted secure vaults.

Do not use them as a substitute for proper authentication or authorization.

---

# 97. Browser Storage and User Control

Anything stored client-side should be treated as modifiable by the user.

For example:

```js
localStorage.setItem(
  "role",
  "admin"
);
```

and:

```js
localStorage.getItem("role");
```

cannot be used as an authorization mechanism.

A user can modify the stored value.

---

# 98. Client-Side Feature Flags

Client-side flags can control presentation:

```js
if (featureEnabled) {
  showNewUI();
}
```

But server-side protected functionality must still be enforced on the server.

Do not hide a sensitive feature in the UI and assume it is secured.

---

# 99. Browser DevTools Are Not a Security Threat

Users can inspect:

* source code
* network requests
* storage
* DOM
* JavaScript state

This is normal.

Never design security around the assumption that frontend code is hidden.

The user owns the browser environment.

---

# 100. Never Put Secrets in Frontend Code

This is insecure:

```js
const API_SECRET =
  "super-secret-key";
```

Anything shipped to the browser can be inspected.

Frontend environment variables are not automatically secret.

A value is secret only if it remains on a trusted server-side boundary.

---

# 101. Next.js Environment Variables

In Next.js, variables exposed through:

```text
NEXT_PUBLIC_...
```

are intended to be available to client-side code.

Therefore:

```text
NEXT_PUBLIC_API_KEY
```

should be treated as public.

Do not put private server secrets in public environment variables.

---

# 102. Supabase and Public Keys

Some services intentionally expose client-side keys that are designed to be public.

The security model then relies on:

* authentication
* Row Level Security
* server-side authorization
* correct database policies

Do not assume that "key is visible in browser" automatically means "database is insecure."

The exact security model depends on the service.

---

# 103. Public Configuration vs Secrets

A browser application may legitimately contain:

```text
API base URL
public client identifier
public analytics ID
public service key designed for browsers
```

while it should never contain:

```text
private database password
server secret
private signing key
master service credentials
```

The distinction is architectural.

---

# 104. Browser Security Headers

Several HTTP security headers are important defensive layers.

Common examples include:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
```

The exact set depends on the application.

---

# 105. Strict Transport Security

`Strict-Transport-Security` is also known as HSTS.

Example:

```http
Strict-Transport-Security:
  max-age=31536000
```

It tells browsers to prefer HTTPS for the domain during the policy period.

HSTS is particularly important for production HTTPS deployments.

---

# 106. HSTS and `includeSubDomains`

A stronger policy may include:

```http
Strict-Transport-Security:
  max-age=31536000;
  includeSubDomains
```

This extends the rule to subdomains.

Use carefully because every covered subdomain must support HTTPS correctly.

---

# 107. `preload`

Some applications may use HSTS preload mechanisms.

This has stronger and more permanent deployment implications.

Do not enable preload casually.

The domain and its subdomains need an appropriate HTTPS strategy.

---

# 108. `X-Content-Type-Options`

A common hardening header is:

```http
X-Content-Type-Options: nosniff
```

This tells browsers not to aggressively infer content types in certain situations.

It helps reduce certain content-type confusion attacks.

---

# 109. Cross-Origin Opener Policy

`Cross-Origin-Opener-Policy` can isolate browsing contexts from cross-origin windows.

Example:

```http
Cross-Origin-Opener-Policy:
  same-origin
```

This can affect:

* `window.opener`
* popup relationships
* cross-origin isolation scenarios

It is an advanced security and isolation control.

---

# 110. Cross-Origin Resource Policy

`Cross-Origin-Resource-Policy` can help control which origins are allowed to load certain resources.

Example:

```http
Cross-Origin-Resource-Policy:
  same-origin
```

This is part of the broader browser cross-origin isolation model.

---

# 111. Cross-Origin Isolation

Some powerful browser features require cross-origin isolation.

This can involve headers such as:

```text
Cross-Origin-Opener-Policy
Cross-Origin-Embedder-Policy
```

When enabled correctly, the page can gain stronger isolation properties.

For example:

```js
console.log(
  window.crossOriginIsolated
);
```

may report whether the current environment is cross-origin isolated.

---

# 112. `crossOriginIsolated`

Example:

```js
if (window.crossOriginIsolated) {
  console.log(
    "Cross-origin isolation is enabled."
  );
}
```

This is relevant for advanced APIs and isolation-sensitive features.

Do not enable cross-origin isolation without understanding its impact on third-party resources.

---

# 113. Security Headers Are Server Configuration

Important security headers should normally be configured at the server, reverse proxy, CDN, or hosting layer.

React cannot securely enforce a response header by rendering:

```jsx
<meta ...>
```

for every security requirement.

Some policies support HTML-based mechanisms, but HTTP response headers are generally the stronger and more reliable control for security policies.

---

# 114. Browser Security and Next.js

Next.js applications can define security headers through server-side configuration or deployment infrastructure.

Conceptually:

```text
Next.js server
   ↓
HTTP response headers
   ↓
Browser security model
```

This is often much stronger than attempting to recreate the same protections entirely in client JavaScript.

---

# 115. Do Not Treat React as a Security System

React helps reduce some common XSS risks through escaping.

But React does not automatically provide:

* authentication
* authorization
* CSRF protection
* secure API design
* secure cookies
* database authorization
* rate limiting

React is a UI framework.

Security requires the entire application architecture.

---

# 116. Browser Security and API Design

A secure frontend/backend system usually looks like:

```text
Browser
  ↓
User input
  ↓
Frontend validation
  ↓
HTTPS
  ↓
Backend authentication
  ↓
Backend authorization
  ↓
Server-side validation
  ↓
Database authorization
```

Each layer has a different responsibility.

---

# 117. Input Validation

Client-side validation improves UX:

```js
if (!email.includes("@")) {
  showError();
}
```

But the server must validate again.

Why?

Because a malicious client can bypass the browser entirely.

---

# 118. Output Encoding

When displaying untrusted content, encode or safely render it.

Safe:

```js
element.textContent = value;
```

Potentially dangerous:

```js
element.innerHTML = value;
```

The correct output mechanism depends on the intended content type.

---

# 119. HTML Injection vs URL Injection

Different contexts require different defenses.

### HTML context

Risk:

```text
XSS
```

### URL context

Risk:

```text
javascript:
open redirect
unexpected navigation
```

### JavaScript context

Risk:

```text
code injection
```

Do not assume one generic "sanitize everything" technique solves every output context.

---

# 120. Avoid String-Building JavaScript

Never create executable JavaScript from untrusted data:

```js
eval(userInput);
```

or:

```js
new Function(userInput);
```

These APIs can turn data into code.

They are almost never appropriate for normal application logic.

---

# 121. `eval()` Is Dangerous

Example:

```js
eval(userInput);
```

If `userInput` is attacker-controlled, the attacker may execute arbitrary JavaScript in the page's origin.

Avoid `eval()` unless there is an extremely specialized and controlled reason.

---

# 122. `new Function()` Has Similar Risks

Example:

```js
const fn =
  new Function(userInput);
```

This dynamically creates executable code.

Treat it with the same caution as `eval()`.

---

# 123. CSP and Dynamic Code

A strong CSP can also restrict some dynamic code execution mechanisms.

This is another example of defense in depth:

```text
Secure coding
+
CSP
```

rather than relying on CSP to make dangerous code safe.

---

# 124. `postMessage()` and Origin Validation

A classic mistake:

```js
window.addEventListener(
  "message",
  (event) => {
    doSomething(event.data);
  }
);
```

This trusts everyone.

Better:

```js
window.addEventListener(
  "message",
  (event) => {
    if (
      event.origin !==
      "https://trusted.example"
    ) {
      return;
    }

    doSomething(event.data);
  }
);
```

Then validate the structure of `event.data`.

---

# 125. `iframe` Security Checklist

When embedding third-party content, consider:

```text
1. Is the source trusted?
2. Does it need JavaScript?
3. Does it need forms?
4. Does it need popups?
5. Does it need camera/microphone?
6. Does it need geolocation?
7. Can it navigate the top window?
8. Can it access storage?
9. Does it need same-origin privileges?
```

Use the smallest set of permissions necessary.

---

# 126. Least Privilege

A strong general security principle is:

> Give code only the permissions it actually needs.

For example:

```text
Third-party iframe
    ↓
Needs rendering only
    ↓
Do not grant camera/microphone/geolocation
```

Likewise:

```text
Application code
    ↓
Needs public data
    ↓
Do not expose database master credentials
```

Least privilege applies at every layer.

---

# 127. Browser Permission APIs

Several browser APIs use permission controls:

```text
Geolocation
Notifications
Clipboard
Camera
Microphone
```

Do not assume:

```text
API exists
=
permission granted
```

Check the relevant API state and handle rejection.

---

# 128. Permission Prompts Are Part of UX

A permission request should have a clear context.

Bad:

```text
Page loaded
→ Request camera
→ Request location
→ Request notifications
→ Request microphone
```

Better:

```text
User chooses feature
→ Request only relevant permission
```

This makes permissions understandable and reduces unnecessary privacy exposure.

---

# 129. Browser Security and Third-Party Scripts

Third-party scripts are powerful.

For example:

```html
<script src="https://third-party.example/script.js"></script>
```

The script runs in the page's JavaScript environment under the page's origin context.

This means a third-party script can potentially access many things available to page JavaScript.

Therefore:

```text
Third-party script
=
trusted code from a security perspective
```

unless the architecture explicitly isolates it.

---

# 130. Why Third-Party Scripts Matter

A compromised analytics, advertising, chat, or widget dependency can become a security problem for your application.

Minimize:

* unnecessary third-party scripts
* unknown libraries
* scripts without integrity controls
* excessive browser permissions

Dependency trust matters.

---

# 131. Subresource Integrity

For externally hosted static scripts, **Subresource Integrity (SRI)** can allow the browser to verify the downloaded resource against an expected cryptographic hash.

Example:

```html
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

If the content does not match the expected hash, the browser can refuse to use it.

SRI is useful for appropriate externally hosted static resources.

---

# 132. SRI Has Scope

SRI is not a replacement for:

* CSP
* dependency security
* authentication
* authorization
* secure server code

It is one layer for protecting externally loaded resources.

---

# 133. Browser Storage as an Attack Surface

Client storage can contain:

```text
tokens
preferences
cached data
drafts
user identifiers
```

Any JavaScript running with sufficient access to the page can potentially inspect JavaScript-readable storage.

Therefore:

```text
Storage design
=
Security design
```

for sensitive applications.

---

# 134. Service Workers as a Security Boundary

A service worker is powerful but still operates under web security rules.

It can:

* intercept requests
* respond with cached content
* display notifications
* handle push events

But it should not be treated as trusted server infrastructure.

It runs in the user's browser environment.

---

# 135. Cache Poisoning Considerations

If a service worker caches attacker-controlled content or unsafe responses, that content may be served repeatedly.

Cache strategies should be designed carefully.

Avoid blindly caching:

```text
authentication responses
private user data
untrusted HTML
```

without understanding the implications.

---

# 136. HTTPS and Service Workers

Service workers generally require a secure context for production use.

This is another reason HTTPS is foundational to modern browser applications.

---

# 137. Browser Security and WebSockets

WebSocket connections also participate in origin and browser security controls.

Example:

```js
const socket =
  new WebSocket(
    "wss://example.com"
  );
```

Prefer:

```text
wss://
```

for encrypted WebSocket communication.

The server should also validate authentication and authorization separately.

---

# 138. Browser Security and `fetch`

A normal request:

```js
fetch("/api/data");
```

is not automatically secure just because it uses `fetch`.

Security depends on:

* transport
* authentication
* authorization
* input validation
* server behavior
* browser policies

`fetch()` is only the transport API.

---

# 139. Do Not Put Authorization Logic Only in the UI

Bad:

```js
if (user.role === "admin") {
  showDeleteButton();
}
```

This is fine for hiding UI.

It is not sufficient for security.

The server must enforce:

```text
DELETE /users/123
```

based on the authenticated user's permissions.

---

# 140. Browser Security and Rate Limiting

The frontend may disable a button:

```js
button.disabled = true;
```

but this is not rate limiting.

A malicious client can bypass the UI and send requests directly.

Server-side rate limiting is required for abuse prevention.

---

# 141. Browser Security and Validation

Client:

```js
if (amount <= 1000) {
  submit();
}
```

does not mean the server should trust the amount.

An attacker can send:

```json
{
  "amount": 1000000
}
```

directly to the server.

The server must enforce the real business rule.

---

# 142. Browser Security Checklist for React/Next.js

Before shipping a feature, ask:

```text
Authentication
→ Who is the user?

Authorization
→ What is the user allowed to do?

Input
→ Is client data validated again on the server?

Output
→ Is untrusted data safely rendered?

Network
→ Is HTTPS used?

Cookies
→ Are Secure, HttpOnly, SameSite configured appropriately?

Storage
→ Am I storing sensitive data in JavaScript-accessible storage?

CORS
→ Are trusted origins explicitly controlled?

CSP
→ Can script execution be restricted?

Frames
→ Can untrusted content embed or control my page?

postMessage
→ Do I validate origin and data?

Permissions
→ Am I requesting only what I need?

Secrets
→ Did any private secret reach the browser?
```

---

# 143. React Security Checklist

For React specifically:

```text
Prefer:
{value}

Be careful with:
dangerouslySetInnerHTML

Avoid:
eval()

Avoid:
new Function()

Validate:
URLs

Validate:
API input

Keep:
secrets server-side

Use:
semantic HTML

Use:
secure authentication architecture
```

---

# 144. Next.js Security Checklist

For Next.js:

```text
Server Components
→ keep server-only secrets server-side

Client Components
→ only expose data the browser may know

API routes / server actions
→ validate input

Database
→ enforce authorization

Environment variables
→ keep private values server-side

Headers
→ configure security headers

Cookies
→ configure authentication cookies carefully

CORS
→ configure trusted origins

CSP
→ configure appropriate script/resource policy
```

---

# 145. Supabase Security Checklist

For a Next.js + Supabase architecture:

```text
Browser
   ↓
Supabase client
   ↓
Authenticated request
   ↓
Row Level Security
   ↓
PostgreSQL
```

Do not depend on:

```text
React UI
```

as the authorization layer.

Use database-level policies where appropriate.

---

# 146. Example: Unsafe Authorization

Frontend:

```js
const isAdmin =
  localStorage.getItem(
    "isAdmin"
  ) === "true";

if (isAdmin) {
  showAdminPanel();
}
```

This is not secure.

A user can modify:

```text
isAdmin = true
```

The server must independently verify the user's actual permissions.

---

# 147. Example: Secure Architectural Separation

A better model:

```text
React
  ↓
Show/hide UI

Server
  ↓
Authenticate request

Server
  ↓
Authorize operation

Database
  ↓
Enforce access rules
```

Each layer has a distinct responsibility.

---

# 148. Browser Security Is About Boundaries

A strong mental model is:

```text
Origin boundary
Frame boundary
Permission boundary
Storage boundary
Network boundary
Authentication boundary
Server boundary
Database boundary
```

Security failures often happen when one of these boundaries is incorrectly trusted.

---

# 149. Defense in Depth

A secure application does not rely on one mechanism.

For example:

```text
HTTPS
+
Secure cookies
+
HttpOnly
+
SameSite
+
CSRF protection
+
CSP
+
Input validation
+
Output encoding
+
Authorization
+
Database policies
```

Each mechanism addresses different threats.

---

# 150. Security Is Not a Single API

There is no:

```js
enableSecurity();
```

Browser security emerges from many systems:

```text
Same-Origin Policy
CORS
CSP
Cookies
Permissions
HTTPS
Sandboxing
Isolation
Authentication
Authorization
```

Understanding how they interact is more valuable than memorizing individual APIs.

---

# 151. Common Security Misconceptions

### "The browser hides my JavaScript."

False.

The user can inspect frontend code.

### "CORS protects my API."

False.

CORS primarily controls browser cross-origin access.

### "If a button is hidden, the action is protected."

False.

The server must authorize the action.

### "localStorage is secure."

Not against XSS.

### "HTTPS means my application is secure."

HTTPS protects transport, not business logic.

### "React prevents all XSS."

React reduces some common injection risks but does not make unsafe HTML rendering secure automatically.

### "A client-side role check is authorization."

It is not.

---

# 152. Browser Security vs Server Security

Think of the two layers this way:

```text
Browser Security
────────────────────────
Protects:
- origin boundaries
- permissions
- cross-origin access
- frames
- browser capabilities

Server Security
────────────────────────
Protects:
- users
- data
- authorization
- business rules
- database
- secrets
```

A secure application needs both.

---

# 153. Practical Security Example

Suppose you build a profile editor.

A secure architecture might be:

```text
User enters profile data
        ↓
React validates format
        ↓
HTTPS request
        ↓
Authenticated session
        ↓
Server validates input
        ↓
Server checks ownership
        ↓
Database update
        ↓
Database policy confirms access
        ↓
Response
        ↓
React updates UI
```

No single browser check is responsible for the entire security model.

---

# 154. Practical Security Example: Safe External Link

```jsx
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open external site
</a>
```

This is a useful pattern when opening an external page in a new browsing context and when the application does not need referrer information.

---

# 155. Practical Security Example: Safe `postMessage`

Sender:

```js
targetWindow.postMessage(
  {
    type: "PROFILE_UPDATED",
  },
  "https://trusted.example"
);
```

Receiver:

```js
window.addEventListener(
  "message",
  (event) => {
    if (
      event.origin !==
      "https://trusted.example"
    ) {
      return;
    }

    if (
      event.data?.type !==
      "PROFILE_UPDATED"
    ) {
      return;
    }

    handleProfileUpdate();
  }
);
```

This demonstrates:

* explicit target origin
* origin validation
* message validation

---

# 156. Practical Security Example: Safe URL Parameter

```js
const params =
  new URLSearchParams(
    window.location.search
  );

const redirect =
  params.get("redirect");

if (
  redirect &&
  redirect.startsWith("/") &&
  !redirect.startsWith("//")
) {
  window.location.href =
    redirect;
}
```

This is only a basic pattern.

Complex applications should use stricter URL allowlists and destination validation.

---

# 157. Practical Security Example: Safe Text Rendering

Unsafe for untrusted HTML:

```js
element.innerHTML =
  userInput;
```

Safer for plain text:

```js
element.textContent =
  userInput;
```

The key question is:

```text
Do I want HTML or text?
```

Do not parse untrusted text as HTML unless the application explicitly needs it and uses appropriate sanitization.

---

# 158. Practical Security Example: Avoid Client Secrets

Bad:

```js
const databasePassword =
  "super-secret";
```

Better architecture:

```text
Browser
   ↓
Authenticated API
   ↓
Server
   ↓
Private credential
   ↓
Database
```

Private credentials remain on the trusted server side.

---

# 159. Practical Security Example: Server Authorization

Frontend:

```js
await fetch(
  `/api/projects/${projectId}`,
  {
    method: "DELETE",
  }
);
```

Server:

```text
Authenticate user
      ↓
Load project
      ↓
Check ownership/permission
      ↓
Delete only if authorized
```

The browser does not decide whether deletion is allowed.

---

# 160. Practical Security Example: CSP

A simplified response header:

```http
Content-Security-Policy:
  default-src 'self';
  object-src 'none';
  base-uri 'self';
```

This is only an example starting point.

Real applications should design a policy based on their actual scripts, APIs, frames, fonts, images, and third-party dependencies.

---

# 161. CSP Reporting

Applications can also configure CSP reporting mechanisms to learn about policy violations.

This can help identify:

* unexpected scripts
* broken integrations
* attempted injection
* policy misconfiguration

Reporting should be designed so that reports themselves do not leak unnecessary sensitive information.

---

# 162. CSP Rollout Strategy

For complex applications, it can be useful to test a policy before enforcing it.

A reporting-oriented rollout can help identify legitimate resources that the application currently depends on.

The goal is to avoid blindly adding:

```text
'unsafe-inline'
*
```

just to make the page work.

Instead, reduce permissions and explicitly allow the resources the application actually needs.

---

# 163. Avoid Wildcard Security Policies

Overly broad policies such as:

```http
Access-Control-Allow-Origin: *
```

or:

```http
script-src *
```

or:

```http
connect-src *
```

may be convenient but provide much weaker control.

Prefer explicit allowlists when practical.

---

# 164. Security and Third-Party Dependencies

Before adding a browser library, ask:

```text
Who publishes it?
How many dependencies does it include?
Is it maintained?
Does it execute arbitrary scripts?
Does it need network access?
Does it process user data?
```

Third-party JavaScript executes inside your application context unless isolated.

Dependency selection is therefore a security decision.

---

# 165. Browser Security and Supply Chain Risk

If a package becomes compromised, malicious code may be shipped to users.

Mitigations include:

* dependency review
* lockfiles
* automated auditing
* minimal dependencies
* SRI where applicable
* CSP
* careful third-party script management

No single mechanism eliminates supply-chain risk.

---

# 166. Browser Security and Service Integration

When integrating external services, classify them:

```text
Public browser API
Private server API
Third-party browser SDK
Third-party server SDK
```

Do not accidentally move a server-only credential into a browser SDK configuration.

---

# 167. Security Review Before Deployment

A useful final review:

```text
Origins
✓

HTTPS
✓

CORS
✓

CSP
✓

Cookies
✓

Storage
✓

Input validation
✓

Output encoding
✓

Redirects
✓

postMessage
✓

iframes
✓

Permissions
✓

Secrets
✓

Server authorization
✓

Database authorization
✓
```

The exact checklist should be expanded based on the application's threat model.

---

# 168. React Relevance

This topic is extremely important for React developers.

React does make ordinary rendering safer by escaping interpolated text:

```jsx
<p>{userInput}</p>
```

But React does not protect you from every browser security problem.

You still need to understand:

* XSS
* `dangerouslySetInnerHTML`
* URL validation
* event handling
* browser storage
* cookies
* CSRF
* authentication
* authorization
* CORS
* CSP
* iframe security
* `postMessage`
* client/server boundaries

A React developer who understands the browser security model makes much stronger architectural decisions.

---

# 169. Next.js Relevance

Next.js makes browser security even more important because it combines:

```text
Server
+
Client
+
API endpoints
+
Rendering
+
Cookies
+
Middleware
+
Database access
```

A secure architecture carefully separates:

```text
Client-side data
```

from:

```text
Server-only secrets
```

and:

```text
Server-side authorization
```

This distinction is fundamental.

---

# 170. Final Mental Model

Browser security can be summarized as a collection of boundaries:

```text
                    Browser
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Origin        Permission       Frame
        │              │              │
        └──────────────┼──────────────┘
                       │
                    Browser
                     APIs
                       │
              ┌────────┴────────┐
              │                 │
           Storage           Network
              │                 │
              └────────┬────────┘
                       │
                     Server
                       │
              Authentication
                       │
              Authorization
                       │
                    Database
```

The most important rules are:

> The browser does not trust every origin.

> Same-Origin Policy limits cross-origin access.

> CORS controls browser access to cross-origin responses; it is not API authorization.

> HTTPS protects communication in transit but does not secure application logic by itself.

> CSP provides an important defense layer against certain script injection attacks.

> Cookies, storage, and browser permissions all have different security properties.

> `localStorage` and `sessionStorage` are JavaScript-accessible and should not be treated as secure secret stores.

> `HttpOnly` cookies cannot be read through normal JavaScript and can therefore reduce certain XSS-related credential exposure.

> Client-side checks improve UX but are never a substitute for server-side authorization.

> `postMessage()` is powerful, but both the sender's target origin and receiver's `event.origin` must be handled carefully.

> Iframes should receive only the permissions they actually need.

> User-provided URLs, HTML, and clipboard data are untrusted input.

> Secrets should remain on the server side.

> React and Next.js are application frameworks, not complete security systems.

The professional mental model is:

```text
Browser
   ↓
Prevent unsafe cross-origin behavior
   ↓
Protect powerful capabilities
   ↓
Protect client-side data
   ↓
Use secure transport
   ↓
Validate server input
   ↓
Authenticate users
   ↓
Authorize actions
   ↓
Protect database resources
```

For React and Next.js development, the most important lesson is:

> **Never confuse "the browser prevented something" with "the application is secure."**

The browser protects boundaries around the client. Your backend, authentication system, authorization rules, and database policies must protect the actual application and its data.
