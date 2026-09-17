# JavaScript Security

## Overview

Security is a core part of JavaScript development.

Browser applications, Node.js applications, APIs, and JavaScript libraries all process data that may come from untrusted sources.

Common security boundaries include:

```text id="1xxv9z"
User input
URL parameters
Form fields
HTTP requests
Server responses
Cookies
Browser storage
Files
Third-party libraries
Environment variables
Database records
```

The central security principle is:

```text id="f0zt2x"
Never trust data merely because it
appears inside your application.
```

Security should protect:

```text id="65rj9k"
Confidentiality
Integrity
Availability
Authentication
Authorization
Data safety
```

Security is not one feature.

It is a property of the entire data flow.

---

# Security Starts With Trust Boundaries

A trust boundary is the point where data crosses from one security context into another.

Examples:

```text id="8u4v6d"
Browser
   ↓
User input

Browser
   ↓
Server

Server
   ↓
Database

Application
   ↓
Third-party API
```

Whenever data crosses a boundary, validate and handle it deliberately.

---

# Treat User Input as Untrusted

Examples:

```text id="6u8l3w"
Name
Email
Search query
Comment
URL
File name
Uploaded file
Query parameter
Form field
```

Even if the browser performs validation, the server must not automatically trust the value.

---

# Client-Side Validation Is Not a Security Boundary

This:

```html id="5p4h6t"
<input
  type="email"
  required
>
```

helps the user.

It does not prevent malicious clients from sending:

```text id="z7y2m8"
Invalid data
Modified requests
Unexpected fields
Unexpected values
```

Server-side validation remains necessary.

---

# Never Trust Hidden Inputs

A hidden input is still controlled by the client:

```html id="7r0y2n"
<input
  type="hidden"
  name="role"
  value="user"
>
```

A malicious client can change it to:

```text id="j9x2m5"
admin
```

Authorization must be enforced on the trusted server.

---

# Disabled Fields Are Not Secure

A disabled form field:

```html id="k7p1q4"
<input
  disabled
  value="readonly"
>
```

does not provide security.

The client controls the page.

Never use disabled UI elements as authorization boundaries.

---

# Authentication vs Authorization

These are different concepts.

Authentication asks:

```text id="x4g8m1"
Who are you?
```

Authorization asks:

```text id="c2p7n5"
What are you allowed to do?
```

A user can be authenticated but not authorized to access a specific resource.

---

# Never Rely on Client-Side Authorization

Avoid:

```js id="s7x1d9"
if (user.isAdmin) {
  showDeleteButton();
}
```

as the actual security control.

It is useful for UI behavior.

It is not sufficient to protect the operation.

The server must verify authorization.

---

# UI Permissions Are Not Security Permissions

Hiding:

```js id="m0g5f2"
deleteButton.hidden = true;
```

does not prevent someone from directly calling the API.

Security must be enforced at the trusted resource boundary.

---

# Never Trust Client-Supplied User IDs

Avoid accepting:

```js id="4s8k2m"
{
  userId: 42,
  action: "delete"
}
```

and assuming the user is allowed to modify user `42`.

The server should determine:

```text id="0f9k2h"
Who is authenticated?
Which resource is being accessed?
Is the user authorized?
```

---

# Never Trust Client-Supplied Roles

Do not authorize based on:

```js id="g7y3j1"
request.body.role
```

or:

```js id="n2m6p8"
localStorage.getItem(
  "role"
);
```

These values are client-controlled.

Authorization must come from a trusted source.

---

# Browser Storage Is Not a Trust Boundary

Values in:

```text id="8h1q6w"
localStorage
sessionStorage
IndexedDB
```

can be modified by client-side code and the user.

Do not store authorization decisions there and treat them as authoritative.

---

# Do Not Store Secrets in `localStorage`

Avoid storing sensitive credentials such as:

```text id="c7m2p4"
Long-lived authentication tokens
Private API keys
Database credentials
Signing secrets
Service credentials
```

in browser-accessible storage.

Any JavaScript running in the origin may potentially access these values.

---

# Environment Variables Are Not Automatically Secret

In frontend applications, some environment variables are intentionally exposed to client-side JavaScript.

For example:

```text id="7m4f0c"
PUBLIC_API_URL
```

may be safe to expose if it is genuinely public.

A secret such as:

```text id="h2k7p5"
DATABASE_PASSWORD
```

must never be bundled into client-side code.

Understand how the framework exposes environment variables.

---

# Never Put Server Secrets in Frontend Code

Do not write:

```js id="b3c7z0"
const API_SECRET =
  "super-secret-value";
```

inside browser code.

Everything sent to the browser should be considered potentially visible to the user.

---

# Public API Keys vs Secrets

Some platforms use public client identifiers or publishable keys that are intentionally exposed.

Do not assume that every value named:

```text id="m7p4x8"
key
token
id
secret
```

has the same security properties.

Know whether a credential is:

```text id="3b8n2k"
Public
Scoped
Publishable
Secret
Privileged
```

and protect it accordingly.

---

# XSS: Cross-Site Scripting

Cross-Site Scripting occurs when untrusted data is interpreted as executable HTML or JavaScript.

Dangerous:

```js id="4w6m2n"
element.innerHTML =
  userInput;
```

Safer for plain text:

```js id="q8z3f1"
element.textContent =
  userInput;
```

---

# Prefer `textContent` for Text

Use:

```js id="d9k1q7"
messageElement.textContent =
  userMessage;
```

when rendering plain text.

This prevents the browser from interpreting the value as HTML.

---

# `innerHTML` Requires Trust Analysis

This:

```js id="j0q6f4"
element.innerHTML =
  trustedMarkup;
```

may be valid when the HTML is controlled.

But if the markup contains external data:

```js id="w3m8r5"
element.innerHTML =
  `<p>${userInput}</p>`;
```

you must consider XSS risk.

---

# Avoid Raw HTML String Interpolation

Avoid:

```js id="b7r4m2"
container.innerHTML =
  `<div>
    ${user.name}
  </div>`;
```

when `user.name` is untrusted.

Prefer:

```js id="q9v5c1"
const item =
  document.createElement(
    "div"
  );

item.textContent =
  user.name;

container.append(item);
```

---

# Sanitization

If an application genuinely needs to display user-provided HTML, sanitize it before insertion.

Do not attempt to write a complete HTML sanitizer using a few regular expressions.

HTML parsing and sanitization are more complex than simple string filtering.

---

# Do Not Build a Homegrown HTML Sanitizer

Avoid patterns such as:

```js id="z8k2r4"
input
  .replace(
    /<script.*?>.*?<\/script>/gi,
    ""
  );
```

This does not provide a reliable security boundary.

Use a mature, security-focused sanitization solution when untrusted HTML must be supported.

---

# XSS Through Attributes

XSS is not limited to `innerHTML`.

Be careful with untrusted values used in attributes:

```js id="5j7d0n"
element.setAttribute(
  "onclick",
  userInput
);
```

Never treat dynamic event-handler attributes as safe input.

---

# Avoid Inline Event Handler Injection

Do not generate:

```html id="2x8v4p"
<button
  onclick="doSomething('USER_INPUT')"
>
```

from untrusted data.

Use JavaScript event listeners:

```js id="m4v8c2"
button.addEventListener(
  "click",
  handleClick
);
```

---

# URL Injection

URLs can also be security-sensitive.

Avoid blindly assigning:

```js id="r2k5m7"
link.href =
  userProvidedUrl;
```

without validating the expected destination and scheme.

---

# Dangerous URL Schemes

Be careful with schemes such as:

```text id="7p8x3j"
javascript:
data:
```

depending on the context.

A link intended for normal web navigation may need to allow only:

```text id="k9n4s1"
https:
http:
```

or a controlled set of application routes.

---

# Validate External URLs

A URL can be parsed using:

```js id="g8y2v6"
const url =
  new URL(
    userProvidedUrl,
    window.location.origin
  );
```

Then inspect:

```js id="y0p7f3"
url.protocol
url.hostname
url.pathname
```

according to the application's allowlist.

---

# Avoid Open Redirects

Weak:

```js id="p4m1c8"
window.location.href =
  new URLSearchParams(
    window.location.search
  ).get("next");
```

An attacker may provide:

```text id="x5j9q1"
https://malicious.example
```

and redirect the user away from the trusted application.

---

# Validate Redirect Targets

Prefer controlled routes:

```js id="c8f2m5"
const allowedPaths = [
  "/dashboard",
  "/profile",
  "/projects",
];

if (
  allowedPaths.includes(
    nextPath
  )
) {
  window.location.assign(
    nextPath
  );
}
```

For larger systems, use an explicit allowlist or safe redirect strategy.

---

# DOM-Based XSS

A page can become vulnerable even without server-side HTML injection.

Example:

```js id="v7q3c0"
const query =
  new URLSearchParams(
    location.search
  ).get("name");

element.innerHTML =
  query;
```

The malicious value comes from the URL and reaches a dangerous DOM sink.

---

# Treat URL Data as Untrusted

Untrusted browser inputs include:

```text id="k2m8s5"
location.search
location.hash
location.pathname
document.referrer
postMessage data
localStorage values
```

Validate and encode according to the context.

---

# Context-Sensitive Output Encoding

The correct protection depends on where data is inserted.

Examples:

```text id="5b7m3q"
HTML text
HTML attribute
URL
JavaScript string
CSS value
```

These contexts do not share identical escaping rules.

Prefer APIs that avoid interpreting data as code.

---

# Use Safe DOM APIs

For text:

```js id="m4q8s7"
element.textContent =
  value;
```

For attributes:

```js id="c8v3k1"
element.setAttribute(
  "title",
  value
);
```

when the attribute itself does not execute code.

For classes:

```js id="n2j5f0"
element.classList.add(
  "is-active"
);
```

These APIs provide clearer boundaries than constructing raw HTML strings.

---

# Avoid Dynamic `style` Injection From Untrusted Data

Be careful with:

```js id="3m7p2x"
element.style.cssText =
  userInput;
```

Untrusted CSS strings can create unintended behavior depending on the context.

Prefer specific properties with validated values:

```js id="f5k9n1"
element.style.width =
  `${safePercentage}%`;
```

---

# `eval` Is Dangerous

Avoid:

```js id="p7v4m1"
eval(userInput);
```

This turns data into executable JavaScript.

There are very few legitimate application-level reasons to use `eval`.

---

# Avoid `new Function`

This is also dynamic code execution:

```js id="h2x7c9"
const fn =
  new Function(
    userInput
  );
```

Treat it with the same security concern as `eval`.

---

# Avoid String-Based Timer Code

Avoid:

```js id="c4k8m0"
setTimeout(
  userInput,
  1000
);
```

when the timer expects executable code.

Use function references:

```js id="z6m2p8"
setTimeout(
  handleTimeout,
  1000
);
```

---

# Prototype Pollution

JavaScript objects inherit from prototypes.

Unsafe handling of attacker-controlled keys can cause unexpected modifications to object prototypes in vulnerable patterns or dependencies.

Avoid blindly merging arbitrary user-controlled objects into application state.

---

# Validate Object Keys

When handling dynamic fields:

```js id="x8m4q1"
const allowedFields = [
  "name",
  "email",
  "role",
];

if (
  allowedFields.includes(
    field
  )
) {
  user[field] =
    value;
}
```

An explicit allowlist reduces unintended property writes.

---

# Avoid Blind Object Merging

Be cautious with:

```js id="m1v8s3"
Object.assign(
  target,
  untrustedInput
);
```

and:

```js id="q4c7n9"
{
  ...target,
  ...untrustedInput
}
```

when the input contains arbitrary keys.

Validate the shape first.

---

# Schema Validation

For important external data, validate:

```text id="5w2n9x"
Required fields
Allowed fields
Expected types
Value ranges
Nested structures
Allowed enumerations
```

The exact validation mechanism depends on the project.

---

# Allowlist Over Blocklist

A blocklist says:

```text id="3r7q2n"
"Reject these known bad values."
```

An allowlist says:

```text id="g9m1v5"
"Accept only these known valid values."
```

For security-sensitive inputs, allowlists are often safer because unexpected values are rejected automatically.

---

# Example: Allowed Roles

Weak:

```js id="2b6n8v"
if (
  role !== "hacker"
) {
  saveRole(role);
}
```

Better:

```js id="f8k2m0"
const allowedRoles = [
  "user",
  "editor",
  "admin",
];

if (
  !allowedRoles.includes(
    role
  )
) {
  throw new Error(
    "Invalid role."
  );
}
```

The accepted set is explicit.

---

# Never Trust File Names

Uploaded file names can contain unexpected characters or misleading extensions.

Do not use the original file name directly as a trusted filesystem path.

Normalize and validate according to the server's storage model.

---

# File Uploads

When handling uploads, validate:

```text id="7c4m9x"
File type
File size
File content
File name
Storage location
Authorization
```

Do not rely only on:

```js id="m5r8v2"
file.name.endsWith(
  ".png"
);
```

because the extension alone does not prove the file content.

---

# MIME Types Are Not Absolute Trust

A client can provide or modify metadata.

Server-side file handling should validate the actual uploaded content where security requires it.

---

# Do Not Execute Uploaded Files

Uploaded content should never automatically become executable server-side code or client-side scripts.

Store untrusted uploads in appropriate isolated locations and serve them safely.

---

# Avoid Serving User Uploads as Active Content

A file uploaded by a user can become dangerous if served under a context where the browser interprets it as HTML or JavaScript.

Use safe content-disposition and content-type strategies.

---

# CSRF: Cross-Site Request Forgery

CSRF occurs when a malicious site causes a user's browser to send an unwanted authenticated request to another site.

Important defenses include:

```text id="s3m5x9"
SameSite cookie settings
CSRF tokens
Origin/Referer validation
Appropriate request design
```

The exact strategy depends on the authentication architecture.

---

# SameSite Cookies

Cookies can use:

```text id="p7x4m8"
SameSite=Strict
SameSite=Lax
SameSite=None
```

to control cross-site sending behavior.

Security-sensitive applications should choose the appropriate setting deliberately.

---

# Do Not Store Session Secrets in JavaScript When HttpOnly Cookies Are Appropriate

Cookies marked:

```text id="x4n6c2"
HttpOnly
```

cannot be read by ordinary JavaScript.

This can reduce exposure of session credentials to XSS.

Cookie-based authentication still requires careful CSRF and cookie configuration.

---

# `Secure` Cookies

Sensitive cookies should generally use:

```text id="u5y8q1"
Secure
```

so they are sent only over HTTPS.

---

# Cookie Scope

Cookie attributes such as:

```text id="m3v7c9"
Domain
Path
SameSite
Secure
HttpOnly
```

control where and how cookies are sent.

Keep cookie scope as narrow as practical.

---

# Do Not Store Sensitive Data in URLs

Avoid placing secrets in:

```text id="g5k2n8"
Query strings
Fragments
Redirect URLs
```

URLs can appear in:

```text id="b1m6q4"
Browser history
Logs
Analytics
Referrers
Monitoring systems
```

---

# Avoid Tokens in Query Parameters

Weak:

```text id="c6j4x9"
https://example.com/reset?token=SECRET
```

unless the protocol specifically requires this pattern and the exposure is carefully controlled.

Sensitive one-time values should be designed with their leakage surfaces in mind.

---

# URL Fragments Are Not Automatically Secure

The URL fragment:

```text id="0m8v2q"
window.location.hash
```

is not sent in the normal HTTP request to the server, but client-side JavaScript can access it.

Do not treat it as trusted or secret.

---

# Authentication Tokens and XSS

Any credential accessible to JavaScript can potentially be exposed by malicious script executing in the same origin.

This is one reason credential storage strategy matters.

---

# Prefer Short-Lived Credentials When Appropriate

Credential exposure impact can be reduced by:

```text id="v5q7b3"
Short expiration
Rotation
Limited scope
Revocation
```

The appropriate strategy depends on the authentication system.

---

# Principle of Least Privilege

Give code and users only the access they need.

For example:

```text id="f6m2x9"
Read-only feature
→ Read-only permission

Admin feature
→ Specific administrative permission
```

Avoid granting broad permissions merely because they are convenient.

---

# Least Privilege for APIs

An API key or service credential should have only the capabilities necessary for its task.

Do not expose a privileged server credential to frontend code.

---

# Least Privilege for Dependencies

Third-party libraries increase the attack surface.

Reduce risk by:

```text id="a9r4c7"
Using only necessary dependencies
Keeping dependencies updated
Reviewing permissions
Avoiding abandoned packages
Locking dependency versions appropriately
```

---

# Supply Chain Security

JavaScript projects depend heavily on third-party packages.

A compromised dependency can execute code in your build or runtime.

Pay attention to:

```text id="y7m2p3"
Dependency provenance
Package maintenance
Known vulnerabilities
Lockfiles
Transitive dependencies
Build scripts
```

---

# Do Not Install Packages Blindly

Before adding a dependency, consider:

```text id="q3n8m5"
Do I actually need it?
Can native JavaScript solve this?
Is the package maintained?
Does it introduce many transitive dependencies?
Does it require special privileges?
```

Small dependency counts are not automatically secure, but unnecessary dependencies increase exposure.

---

# Lock Dependencies

Use a lockfile appropriate to your package manager:

```text id="9m7c2x"
package-lock.json
pnpm-lock.yaml
yarn.lock
```

This helps keep installations reproducible.

---

# Dependency Updates Should Be Controlled

Do not blindly update every dependency in production.

Review:

```text id="r4k8m1"
Breaking changes
Security patches
Behavior changes
Transitive updates
Build changes
```

Then test the application.

---

# Avoid Dynamic Package Loading From User Input

Never allow untrusted values to determine package or module execution paths without strict controls.

Dynamic imports:

```js id="f6b2n9"
import(
  userProvidedPath
);
```

require careful validation if the path is externally influenced.

---

# Content Security Policy

A Content Security Policy can restrict where executable content comes from.

A policy can help mitigate some XSS exploitation paths by limiting:

```text id="z8r5k3"
Script sources
Inline scripts
Object sources
Frame sources
Connection targets
```

CSP is defense in depth, not a replacement for secure DOM handling.

---

# Avoid Inline Scripts

Prefer:

```html id="o3m8x1"
<script
  src="/app.js"
></script>
```

over:

```html id="k7v4p5"
<script>
  // application code
</script>
```

when the application's CSP and architecture benefit from external scripts.

---

# Subresource Integrity

For externally hosted static resources, Subresource Integrity can help verify that the loaded resource matches an expected cryptographic hash.

Use it when appropriate for externally hosted scripts or stylesheets.

---

# HTTPS

Sensitive applications should use HTTPS.

HTTPS protects the connection against many forms of network interception and modification.

Do not transmit credentials or sensitive data over plain HTTP.

---

# Mixed Content

A secure page should not unnecessarily load insecure resources such as:

```text id="r8j2m4"
http://...
```

because this can weaken the security of the page.

Use secure resource URLs.

---

# Clickjacking

Applications that should not be embedded in other sites can use appropriate response headers and policies to restrict framing.

Browser-side JavaScript checks are not a sufficient primary defense.

---

# `postMessage`

`window.postMessage()` allows cross-window communication.

Always validate:

```js id="t7q4m2"
event.origin
```

before trusting the message.

Weak:

```js id="g8n3v5"
window.addEventListener(
  "message",
  (event) => {
    processMessage(
      event.data
    );
  }
);
```

Safer:

```js id="r1c6x8"
window.addEventListener(
  "message",
  (event) => {
    if (
      event.origin !==
      "https://trusted.example"
    ) {
      return;
    }

    processMessage(
      event.data
    );
  }
);
```

---

# Do Not Trust `postMessage` Data Automatically

Even after checking:

```js id="v5d2k7"
event.origin
```

validate:

```text id="m4x8q1"
Message shape
Types
Allowed operations
Allowed fields
```

The sender may still be trusted but the message may still be malformed.

---

# `window.opener` Security

When opening external links in new tabs or windows, consider the relationship between the opener and the opened page.

Use appropriate link attributes such as:

```html id="p7k2n4"
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open
</a>
```

The exact `rel` value should match the intended behavior and browser support.

---

# Avoid Trusting `document.referrer`

Referrer data can be absent, truncated, or influenced by browser policies.

Do not use it as a strong authentication or authorization mechanism.

---

# Browser Feature Exposure

Do not assume browser APIs are harmless simply because they are built in.

Review permissions for:

```text id="k8n2m7"
Geolocation
Camera
Microphone
Notifications
Clipboard
File system access
```

Request only what the application actually needs.

---

# Permission Requests Should Be Contextual

Do not request location or notification permissions immediately on page load without explaining why.

Ask near the moment the feature is needed.

This improves both usability and permission hygiene.

---

# Avoid Permission Abuse

Never request:

```text id="n5q4b1"
Camera
Microphone
Location
Notifications
```

just because the browser allows it.

Permission scope should match actual product requirements.

---

# Secure Error Handling

Errors should not expose:

```text id="z4v7m2"
Database credentials
Private tokens
Internal secrets
Session identifiers
Sensitive request headers
Raw authentication data
```

Log safely and provide users with appropriate messages.

---

# Do Not Log Credentials

Avoid:

```js id="q5j8n3"
console.log(
  "Token:",
  accessToken
);
```

and:

```js id="s2k7v4"
console.log(
  "Password:",
  password
);
```

Never log secrets during normal debugging or production operation.

---

# Be Careful With Request Logging

A request object may contain:

```text id="b8m3q6"
Authorization headers
Cookies
Personal information
Request bodies
Session identifiers
```

Log only what is necessary.

---

# Redact Sensitive Values

Instead of:

```js id="f4g8p1"
console.log(request);
```

consider logging:

```js id="m7c2x5"
console.log({
  method:
    request.method,
  path:
    request.url,
});
```

or explicitly redact sensitive fields.

---

# Avoid Exposing Secrets in Source Maps

Build configurations can accidentally expose sensitive source or configuration data.

Review production source maps and deployment settings according to your threat model.

---

# Avoid Committing Secrets to Git

Never commit:

```text id="q6y1n8"
.env
Private keys
API secrets
Database passwords
Authentication secrets
Cloud credentials
```

Use environment or secret-management facilities.

---

# `.gitignore` Helps But Is Not Enough

A `.gitignore` rule such as:

```gitignore id="t8r5w2"
.env
.env.local
```

prevents untracked files from being added accidentally.

It does not remove a secret already committed to Git history.

If a secret is committed, rotate it and clean up the repository as required.

---

# Rotate Exposed Secrets

If a secret becomes exposed:

```text id="v7n4m2"
Do not merely delete the file.

Revoke or rotate the credential.
```

The old credential should be considered compromised.

---

# Security Through Obscurity Is Not a Security Strategy

Do not rely on:

```text id="o5m8q2"
Hidden frontend routes
Obscure variable names
Minified JavaScript
Undocumented endpoints
Hidden buttons
```

as the main security mechanism.

Attackers can inspect client-side code.

---

# Minification Is Not Encryption

Minified code:

```text id="y8k4m3"
function a(b){...}
```

is harder to read.

It is not secret.

Do not place secrets in frontend code assuming minification hides them.

---

# Obfuscation Has Limited Security Value

Code obfuscation may increase reverse-engineering effort.

It does not replace:

```text id="p5n7c2"
Authentication
Authorization
Input validation
Secure transport
Secure storage
```

---

# Protect the Server

Browser security cannot compensate for an insecure backend.

The server must enforce:

```text id="r9k5m2"
Authentication
Authorization
Input validation
Rate limiting
Resource ownership
Data access rules
```

---

# Rate Limiting

Security-sensitive endpoints may need rate limiting for:

```text id="m3q8v1"
Login
Password reset
Verification
Search
Expensive operations
File uploads
API requests
```

This is primarily a server-side concern.

Client-side throttling is useful for UX and resource usage, but it does not provide security against malicious clients.

---

# Brute Force Protection

Authentication systems should consider:

```text id="b4n7x9"
Rate limiting
Account protection
Progressive delays
Monitoring
Multi-factor authentication
Credential rotation
```

The exact strategy depends on the system.

---

# Do Not Implement Authentication Yourself Without a Strong Reason

Authentication involves:

```text id="g8r2m6"
Credential storage
Session management
Password hashing
Token rotation
Recovery
MFA
Cookie security
CSRF
Revocation
```

Use mature authentication mechanisms and libraries where appropriate rather than implementing cryptographic security from scratch.

---

# Passwords Should Not Be Stored in Plain Text

If your application handles passwords, they must be processed using appropriate password-hashing mechanisms on the server.

Never store:

```text id="f2m6c8"
password
```

directly in a database.

---

# Client-Side Password Handling

Frontend code may collect a password for transmission over a secure connection.

It should not:

```text id="m4x7q2"
Log it
Store it unnecessarily
Place it in URLs
Persist it in browser storage
Expose it in analytics
```

---

# Do Not Put Passwords in Query Strings

Avoid:

```text id="n8m3v7"
https://example.com/login?password=...
```

Query strings can leak into logs and browser history.

---

# CSRF and Authentication Architecture

Security depends on whether the application uses:

```text id="z4q1m8"
Cookie-based sessions
Bearer tokens
OAuth
Third-party identity providers
```

Do not blindly apply a single pattern to every authentication architecture.

Understand how credentials are transported and stored.

---

# Authorization Must Be Checked Per Resource

Avoid authorization such as:

```text id="t7y3p2"
"User is an admin, so every request is allowed."
```

A robust server still verifies:

```text id="q2v8m5"
Action
Resource
Authenticated identity
Required permission
```

for sensitive operations.

---

# Resource Ownership

For user-specific resources:

```text id="x5c7n1"
User A → Project A
User B → Project B
```

the server must verify ownership or permission before allowing access.

Do not assume the resource ID alone grants access.

---

# Insecure Direct Object References

This pattern is dangerous when authorization is missing:

```text id="k8r4m7"
GET /api/users/123
```

Changing:

```text id="d7m2n6"
123 → 124
```

should not expose another user's data merely because the ID is guessable.

The server must authorize access to resource `124`.

---

# Validate IDs and Resource Types

Do not assume:

```js id="v6q3s9"
const userId =
  Number(
    searchParams.get(
      "id"
    )
  );
```

produces a valid authorized identifier.

Validation and authorization remain separate steps.

---

# Security and Dependency Boundaries

Third-party packages may receive:

```text id="a7n5x2"
Input
Files
Network responses
Configuration
```

Pass only the data they need.

Avoid giving unnecessary privileges or sensitive objects to dependencies.

---

# Keep Dependencies Updated

Security vulnerabilities can exist in:

```text id="m1q8v4"
Direct dependencies
Transitive dependencies
Build tools
Development tools
Runtime libraries
```

Review dependency advisories and update when appropriate.

---

# Audit High-Risk Dependencies

Pay particular attention to packages that:

```text id="f5x9b2"
Execute code
Process HTML
Parse files
Handle authentication
Process network requests
Access the filesystem
Run build scripts
```

These capabilities increase the potential impact of a compromise.

---

# Avoid Untrusted Deserialization

Be careful when parsing complex serialized formats from untrusted sources.

Do not automatically reconstruct executable objects or invoke methods based on external data.

Prefer explicit schema-based parsing.

---

# JSON Is Data, Not Code

Parsing JSON:

```js id="x7c3m1"
const data =
  JSON.parse(input);
```

does not execute JavaScript from the JSON itself.

But the resulting data can still become dangerous if later passed to:

```text id="h4q9v2"
innerHTML
eval
Function
unsafe URL
dynamic script loading
```

The danger often appears at the next sink.

---

# Security Sink Awareness

Common dangerous sinks include:

```text id="v5m8q3"
innerHTML
outerHTML
insertAdjacentHTML
eval
Function
setTimeout(string)
setInterval(string)
javascript: URLs
dynamic script injection
```

Track untrusted data before it reaches these sinks.

---

# Prefer Safe APIs

Instead of:

```js id="9q2v7m"
element.innerHTML =
  value;
```

use:

```js id="y8m4k1"
element.textContent =
  value;
```

Instead of:

```js id="q3n8v6"
eval(code);
```

use structured data and explicit functions.

---

# Data Validation Does Not Replace Output Safety

Even if input is validated:

```js id="t7m2q5"
if (
  value.length < 100
) {
  // ...
}
```

this does not automatically make it safe for every output context.

Validation answers:

```text id="c5v8x1"
Is this data acceptable?
```

Output handling answers:

```text id="n6m4q2"
How should this data be represented safely here?
```

Both matter.

---

# Security and Logging

Logs can become a data leak.

Do not log:

```text id="q8m2v5"
Access tokens
Passwords
Session cookies
Private keys
Full credit card numbers
Sensitive personal information
```

Use redaction where necessary.

---

# Security and Error Reporting

Error monitoring systems may capture:

```text id="f7n3m8"
Stack traces
Variables
URLs
Request metadata
User identifiers
```

Configure monitoring carefully so it does not collect unnecessary sensitive information.

---

# Minimize Sensitive Data Collection

A strong security principle is:

```text id="v3c7n1"
Do not collect data you do not need.
```

Less sensitive data means:

```text id="m8q2x5"
Less storage risk
Less logging risk
Less exposure
Less compliance burden
```

---

# Data Retention

Sensitive information should not be retained indefinitely without a reason.

Define:

```text id="z4m7n2"
Why the data is stored
Where it is stored
Who can access it
How long it is retained
When it is deleted
```

---

# Secure Defaults

Prefer defaults that minimize exposure.

Examples:

```text id="d8q4m1"
Authentication required
Least privilege
Secure cookies
HTTPS
Restricted CORS
Safe DOM APIs
Minimal permissions
```

Security should not depend on developers remembering a hidden special case every time.

---

# CORS Is Not Authentication

CORS controls which browser origins can read certain cross-origin responses.

It does not determine whether a user is authenticated or authorized.

Do not use CORS as the application's authorization system.

---

# Avoid Broad CORS Configuration

Avoid blindly allowing:

```text id="y2m6q8"
*
```

for sensitive authenticated APIs.

Configure allowed origins according to the application requirements.

---

# Security Headers

Security-sensitive applications should consider appropriate HTTP response headers such as:

```text id="q5n8v3"
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

The exact configuration depends on the deployment and application.

---

# `X-Content-Type-Options`

Using:

```text id="r7m3k2"
nosniff
```

can help prevent certain MIME-type sniffing behaviors.

Security headers are generally configured at the server or hosting layer.

---

# Referrer Policy

Referrer information can reveal URLs or paths.

A suitable `Referrer-Policy` can reduce unnecessary leakage.

Choose a policy based on the application's needs.

---

# Permissions Policy

Permissions Policy can restrict browser capabilities such as:

```text id="m2v8q5"
Camera
Microphone
Geolocation
```

to reduce unnecessary exposure.

---

# Security Best Practices Should Be Automated

Where possible, use:

```text id="h3n7v1"
Dependency audits
Linters
Security scanners
Secret scanners
Type validation
CI checks
```

Automation reduces reliance on memory.

---

# Security Code Review

Review security-sensitive changes for:

```text id="k5q9m3"
Trust boundaries
Authentication
Authorization
Input validation
Output handling
Secrets
Logging
Dependencies
File uploads
URL handling
Cross-origin behavior
```

---

# Security Checklist

Before shipping JavaScript code, ask:

```text id="b8x4m1"
[ ] Is any external input trusted without validation?

[ ] Is client-side validation being mistaken for security?

[ ] Are authorization checks enforced on the server?

[ ] Are secrets exposed to browser code?

[ ] Are tokens stored safely?

[ ] Is browser storage being treated as untrusted?

[ ] Is user input written through dangerous DOM sinks?

[ ] Is innerHTML necessary?

[ ] Could a URL create an open redirect?

[ ] Could untrusted HTML execute?

[ ] Are dynamic code execution APIs avoided?

[ ] Are dynamic URLs validated?

[ ] Are object keys from users restricted?

[ ] Could prototype pollution occur?

[ ] Are uploaded files validated?

[ ] Are file names and paths handled safely?

[ ] Are cookies configured appropriately?

[ ] Is CSRF addressed for cookie-based authentication?

[ ] Is CORS configured intentionally?

[ ] Are postMessage origins validated?

[ ] Are sensitive values absent from logs?

[ ] Are secrets absent from Git?

[ ] Are exposed secrets rotated?

[ ] Are dependencies maintained?

[ ] Are unnecessary permissions avoided?

[ ] Are security headers configured appropriately?

[ ] Is sensitive data retained only as long as necessary?
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text id="q9w4c7"
Treat external data as untrusted.

Validate at trust boundaries.

Use allowlists for security-sensitive values.

Do not rely on client-side authorization.

Never expose secrets to browser code.

Do not store sensitive credentials in browser-accessible
storage without a deliberate security design.

Prefer textContent over innerHTML for plain text.

Avoid eval, Function, and string-based code execution.

Validate dynamic URLs.

Prevent open redirects.

Avoid unsafe HTML construction.

Do not blindly merge untrusted objects.

Protect against prototype-related attacks.

Validate file uploads.

Use HTTPS.

Configure cookies securely.

Address CSRF when cookie-based authentication requires it.

Do not treat CORS as authorization.

Validate postMessage origins.

Do not log secrets.

Keep dependencies maintained.

Use least privilege.

Minimize sensitive data collection.

Use secure defaults.

Automate security checks.

Assume frontend code is observable by the user.
```

---

# Security Decision Framework

When handling external data:

```text id="w1r5n9"
External input
      ↓
Identify trust boundary
      ↓
Validate structure
      ↓
Validate allowed values
      ↓
Apply context-specific handling
      ↓
Perform authorized operation
      ↓
Return safe output
```

When rendering content:

```text id="c6v8m2"
Untrusted data
      ↓
Plain text?
      ↓
textContent
```

If HTML is genuinely required:

```text id="m7n3q4"
Untrusted HTML
      ↓
Trusted sanitization
      ↓
Controlled rendering
```

When accessing protected resources:

```text id="z4p8k1"
Request
   ↓
Authenticate
   ↓
Authorize
   ↓
Validate input
   ↓
Perform operation
```

Do not reverse these trust decisions.

---

# Example: Safe Text Rendering

Unsafe:

```js id="v3m7q8"
const name =
  new URLSearchParams(
    location.search
  ).get("name");

element.innerHTML =
  name;
```

Safer:

```js id="p9x2k5"
const name =
  new URLSearchParams(
    location.search
  ).get("name");

element.textContent =
  name ?? "";
```

The URL remains untrusted, but the output context is safe for plain text.

---

# Example: Safe Dynamic Classes

Weak:

```js id="b6q1m9"
element.className =
  userProvidedClass;
```

This can overwrite existing classes and creates an unnecessary dependency on arbitrary user input.

Prefer controlled values:

```js id="t8c4n7"
const allowedStates = [
  "is-active",
  "is-disabled",
  "is-error",
];

if (
  allowedStates.includes(
    state
  )
) {
  element.classList.add(
    state
  );
}
```

---

# Example: Safe Dynamic URLs

Weak:

```js id="k4m8q2"
link.href =
  userProvidedUrl;
```

Controlled approach:

```js id="n5r7v1"
const url =
  new URL(
    userProvidedUrl,
    window.location.origin
  );

if (
  url.protocol ===
  "https:"
) {
  link.href =
    url.href;
}
```

The allowed protocols and destinations should match the application's actual requirements.

---

# Example: Safe Object Updates

Weak:

```js id="g7m2x4"
function updateUser(
  user,
  field,
  value
) {
  user[field] =
    value;
}
```

Safer:

```js id="q8n4p6"
const allowedFields = [
  "name",
  "email",
];

function updateUser(
  user,
  field,
  value
) {
  if (
    !allowedFields.includes(
      field
    )
  ) {
    throw new Error(
      "Invalid user field."
    );
  }

  return {
    ...user,
    [field]: value,
  };
}
```

The application controls which properties can be modified.

---

# Example: Safe `postMessage`

Weak:

```js id="c3v7k1"
window.addEventListener(
  "message",
  (event) => {
    processMessage(
      event.data
    );
  }
);
```

Safer:

```js id="m8q2y5"
const TRUSTED_ORIGIN =
  "https://trusted.example";

window.addEventListener(
  "message",
  (event) => {
    if (
      event.origin !==
      TRUSTED_ORIGIN
    ) {
      return;
    }

    if (
      !event.data ||
      typeof event.data.type !==
        "string"
    ) {
      return;
    }

    processMessage(
      event.data
    );
  }
);
```

Validate both the sender and the message shape.

---

# Example: Safe Error Logging

Weak:

```js id="w7r3n8"
console.error({
  password,
  accessToken,
  error,
});
```

Safer:

```js id="v4m9k2"
console.error(
  "Authentication request failed.",
  {
    error,
  }
);
```

Avoid including sensitive credentials in diagnostics.

---

# Example: Protecting Secrets

Unsafe frontend code:

```js id="q5x8m1"
const databasePassword =
  "secret-password";
```

Correct architecture:

```text id="b7n2k4"
Browser
   ↓
Authenticated API
   ↓
Server
   ↓
Database using private credentials
```

The browser should never receive the database credential.

---

# Example: Server Authorization

Conceptually:

```js id="s4m8q2"
async function deleteProject(
  user,
  projectId
) {
  const project =
    await findProject(
      projectId
    );

  if (
    project.ownerId !==
    user.id
  ) {
    throw new Error(
      "Not authorized."
    );
  }

  return removeProject(
    projectId
  );
}
```

The exact implementation belongs to the trusted server boundary.

---

# Example: Secure Browser Storage

Do not treat:

```js id="f8q2m5"
const isAdmin =
  localStorage.getItem(
    "isAdmin"
  );
```

as an authorization decision.

It may be useful for UI hints:

```js id="j6m4x8"
const showAdminUI =
  localStorage.getItem(
    "isAdmin"
  ) === "true";
```

but the server must still enforce the actual permission.

---

# Example: Avoiding Dangerous Code Execution

Unsafe:

```js id="m3x7k1"
const operation =
  userInput;

eval(operation);
```

Safe design:

```js id="b8q2v5"
const operations = {
  save: saveUser,
  delete: deleteUser,
};

const handler =
  operations[
    userInput
  ];

if (handler) {
  handler();
}
```

The application chooses from known functions instead of executing arbitrary code.

---

# Example: Allowlisted Values

Instead of:

```js id="r5n8m2"
element.dataset.state =
  userInput;
```

use:

```js id="x7c4q9"
const allowedStates = [
  "loading",
  "success",
  "error",
];

if (
  allowedStates.includes(
    userInput
  )
) {
  element.dataset.state =
    userInput;
}
```

The allowed state space is explicit.

---

# Security Anti-Patterns

Avoid patterns such as:

```text id="d8m3q5"
Trusting hidden fields
Trusting client-side roles
Storing secrets in frontend bundles
Using innerHTML with untrusted input
Using eval with external data
Building executable code from strings
Blindly merging untrusted objects
Accepting arbitrary redirect URLs
Trusting postMessage data without origin checks
Logging credentials
Using browser storage as an authorization system
Assuming CORS provides authorization
Relying on minification to hide secrets
Writing custom security-critical sanitizers
Skipping server-side validation
Installing dependencies blindly
```

---

# Final Security Principles

```text id="f3q8m1"
Never trust client-controlled data.

Validate at trust boundaries.

Authentication identifies the user.

Authorization determines allowed actions.

Client-side permission checks are not security controls.

Secrets must remain outside untrusted environments.

Browser storage is not inherently trustworthy.

Safe APIs are better than manual string construction.

Avoid dynamic code execution.

Treat URLs as security-sensitive input.

Use allowlists where practical.

Protect resources at the server boundary.

Do not expose sensitive information through logs or errors.

Keep dependencies under control.

Use secure defaults.

Minimize permissions and data collection.

Security should be part of normal application design.
```

---

# Summary

JavaScript security is primarily about controlling the flow of data across trust boundaries.

A useful mental model is:

```text id="y6m8q2"
Untrusted input
      ↓
Validation
      ↓
Authorized operation
      ↓
Safe processing
      ↓
Safe output
```

The biggest mistakes usually come from treating one of these assumptions as true:

```text id="w3p7n5"
"The browser controls this value."
"The user cannot modify this field."
"The button is hidden."
"The URL is safe."
"The storage value is trusted."
"The frontend knows who is authorized."
"The package is probably safe."
"The error is only visible internally."
```

Those assumptions are unreliable security boundaries.

Strong JavaScript security instead relies on:

```text id="q8m4v1"
Explicit trust boundaries
        +
Validation
        +
Authorization
        +
Safe output handling
        +
Secure credential management
        +
Least privilege
        +
Controlled dependencies
        =
Defensible application security
```
