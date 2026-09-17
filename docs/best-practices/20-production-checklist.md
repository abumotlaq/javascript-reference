# Production Checklist

## Overview

Production readiness is the process of verifying that an application is prepared to operate reliably for real users in a real environment.

A feature that works locally is not automatically production-ready.

Production systems must account for:

* Correctness
* Security
* Performance
* Accessibility
* Reliability
* Observability
* Configuration
* Error handling
* Data integrity
* Deployment
* Recovery
* Maintenance
* User experience

A production checklist should not be treated as a final box-ticking exercise only.

Production readiness should influence development from the beginning.

---

## 1. Define Production Readiness

Production-ready does not mean:

```text id="k3kz71"
No bugs will ever occur.
```

It means:

```text id="0n8w5f"
Known requirements are satisfied.
Critical risks are addressed.
Failures are observable.
Recovery procedures exist.
Security boundaries are enforced.
The system behaves predictably under expected conditions.
```

Every application has different production requirements.

A small personal project and a financial system do not require the same level of operational rigor.

---

## 2. Verify Core Functionality

Before deployment, verify the primary user journeys.

Typical examples include:

```text id="gq4br1"
Open application
    ↓
Navigate
    ↓
Authenticate
    ↓
Create data
    ↓
Edit data
    ↓
Delete data
    ↓
Sign out
```

Test the workflows users actually depend on.

---

## 3. Verify Critical Business Rules

Functional correctness includes domain rules.

Examples:

```text id="a6x13a"
Users cannot exceed their limits.
Unauthorized users cannot access protected resources.
Totals are calculated correctly.
Duplicate operations are handled safely.
Required data cannot be omitted.
Invalid state transitions are rejected.
```

Business rules should be enforced at the authoritative boundary.

---

## 4. Verify Error Handling

Test:

* Network failures
* Invalid input
* Unauthorized access
* Missing resources
* Server failures
* Timeouts
* Cancellation
* Unexpected responses
* Database failures
* Dependency failures

Do not assume happy-path testing is sufficient.

---

## 5. Verify Production Error Messages

User-facing errors should be:

* Understandable
* Actionable when possible
* Free of secrets
* Free of unnecessary infrastructure details

Bad:

```text id="x9m3m2"
PostgresError: relation users does not exist
```

Better:

```text id="m7zq1v"
We could not load your account.
Please try again.
```

Detailed technical diagnostics should remain in secure logs.

---

## 6. Verify Error Logging

Production failures should generate useful diagnostic information.

Useful metadata may include:

```text id="qk2k4c"
Error type
Message
Stack
Request ID
Route
Application version
Environment
Non-sensitive context
```

Avoid logging:

```text id="yl3q2j"
Passwords
Tokens
API keys
Session secrets
Private user data
```

---

## 7. Verify Authentication

Test:

```text id="1kjj5j"
Valid credentials
Invalid credentials
Missing credentials
Expired session
Expired token
Logout
Session restoration
```

Make sure authentication behavior is consistent across application boundaries.

---

## 8. Verify Authorization

Authentication does not prove permission.

Test:

```text id="vvzqws"
Authenticated + allowed
Authenticated + denied
Unauthenticated + protected resource
User A + User B resource
```

Especially verify object-level authorization.

A user who can access their own resource should not automatically access another user's resource.

---

## 9. Verify Server-Side Authorization

Client-side restrictions are not security controls.

This:

```js id="5c7o4m"
if (!user.isAdmin) {
  return;
}
```

may improve the interface.

The server must still enforce:

```text id="3i9c4t"
Is this user allowed to perform this operation?
```

Test the server-side decision directly.

---

## 10. Verify Input Validation

Validate at trust boundaries.

Check:

* Required fields
* Types
* Lengths
* Formats
* Allowed values
* Numeric ranges
* File limits
* Nested structures

Do not rely only on client-side validation.

---

## 11. Verify Output Handling

External data should be handled safely before rendering.

Prefer:

```js id="1m7co6"
element.textContent = user.name;
```

over:

```js id="a03g5h"
element.innerHTML = user.name;
```

unless HTML rendering is explicitly intended and safely controlled.

---

## 12. Verify XSS Defenses

Check for unsafe uses of:

```text id="4w5ph6"
innerHTML
outerHTML
insertAdjacentHTML
dangerouslySetInnerHTML
eval
new Function
```

When dynamic HTML is required, use an appropriate sanitization strategy.

---

## 13. Verify URL Handling

Inspect:

```text id="j7j0y6"
Redirect URLs
Query parameters
Path parameters
External links
User-provided URLs
```

Prevent:

* Open redirects
* Unsafe URL construction
* Injection
* Untrusted navigation

Use `URL` and `URLSearchParams` where appropriate.

---

## 14. Verify Secrets

Before deployment, confirm:

* No secrets are committed.
* No secrets appear in browser bundles.
* No secrets appear in client-visible configuration.
* No secrets appear in logs.
* Test secrets are isolated.
* Production secrets use appropriate secure storage.

A production deployment should fail rather than silently use unsafe fallback credentials.

---

## 15. Verify Environment Configuration

Check:

```text id="h41a6d"
API URLs
Database connection
Authentication configuration
Allowed origins
Feature flags
Logging level
Timeouts
Storage configuration
External services
```

Verify the application is connected to the correct environment.

---

## 16. Verify Public vs Private Configuration

For client applications, inspect the final output.

Ask:

> Which configuration values can the browser access?

Anything accessible to the browser should be treated as public.

Server-only values must remain on trusted infrastructure.

---

## 17. Verify Production Defaults

Development defaults should not accidentally reach production.

Check for:

```text id="a6g9xd"
localhost URLs
Debug mode
Development databases
Test credentials
Verbose error output
Development feature flags
Unsafe CORS
```

---

## 18. Verify Dependencies

Inspect:

```text id="2qig6p"
package.json
lockfile
Runtime version
Build tools
Third-party libraries
```

Check for:

* Known security issues
* Unsupported versions
* Deprecated dependencies
* Unnecessary packages
* Duplicate dependencies

---

## 19. Remove Unnecessary Dependencies

Every dependency creates:

```text id="t6v8s5"
Maintenance cost
Security surface
Bundle cost
Upgrade responsibility
```

Remove packages that are no longer needed.

Do not keep dependencies merely because they were once used.

---

## 20. Verify Lockfile Consistency

The dependency lockfile should correspond to the intended manifest.

Inconsistencies can lead to:

```text id="p5n4jv"
Different versions locally
Different versions in CI
Different versions in production
```

Reproducible installs are important for reliable deployments.

---

## 21. Verify Runtime Versions

Check:

```text id="5z5t6h"
Node.js version
Browser targets
Database version
Operating system assumptions
Build environment
```

The production environment should support the application's actual requirements.

---

## 22. Verify Build Success

Run the production build.

Example:

```bash id="x9wq1v"
npm run build
```

A successful development server does not guarantee a successful production build.

---

## 23. Test the Production Build Locally

Where practical:

```text id="8xfm5p"
Build
↓
Start production server
↓
Open application
↓
Run critical workflows
```

Development mode can hide production-specific problems.

---

## 24. Verify Build-Time Environment Variables

Some frameworks inject configuration during the build.

Confirm that:

```text id="0jkf3r"
Build environment
```

contains the values required for the generated application.

Do not assume changing a variable after build automatically changes already-generated client assets.

---

## 25. Verify Runtime Configuration

For server-side applications, verify values loaded when the application starts.

Distinguish:

```text id="t9wq3e"
Build-time configuration
vs
Runtime configuration
```

They may have different lifecycles.

---

## 26. Verify Routes

Test:

```text id="7n2x6d"
Home
Static routes
Dynamic routes
Nested routes
404 pages
Protected routes
Redirects
```

Pay attention to direct navigation to deep URLs.

A page that works only when reached from the homepage may still have routing or deployment problems.

---

## 27. Verify Navigation

Check:

* Browser back
* Browser forward
* Direct URL entry
* Refresh
* Opening in a new tab
* External links
* Protected navigation

Navigation should preserve expected application state.

---

## 28. Verify Page Titles

Every important page should have an appropriate document title.

Example:

```html id="y7o3t1"
<title>
  Projects | Osama Abu Motlaq
</title>
```

Titles help users identify the current page.

---

## 29. Verify Metadata

Check:

```text id="0q7kkm"
Title
Description
Canonical URL where appropriate
Open Graph metadata
Social preview metadata
Icons
```

Metadata should represent the actual production content.

---

## 30. Verify Favicon and Static Assets

Check:

```text id="2z0j2g"
Favicon
Images
Fonts
CSS
JavaScript
Downloads
PDFs
```

Verify both:

```text id="e6z6e2"
Application route
Direct asset URL
```

---

## 31. Verify Asset Paths

Production environments can expose path mistakes involving:

```text id="l9e5qv"
Leading slashes
Relative paths
Base paths
CDN URLs
Case sensitivity
```

Test the application from the actual deployment URL.

---

## 32. Verify Case Sensitivity

A path that works on a case-insensitive development filesystem may fail on a case-sensitive production environment.

Example:

```text id="f8l2bi"
image.png
```

is not necessarily the same as:

```text id="c5q5e1"
Image.png
```

Keep filenames and imports consistent.

---

## 33. Verify Static Caching

Check whether assets are cached with appropriate policies.

Static assets can often use long cache lifetimes when filenames are content-hashed.

Do not cache dynamic user-specific content as if it were immutable.

---

## 34. Verify Browser Caching

Inspect:

```text id="aj2g3u"
Cache-Control
ETag
Expires
```

Incorrect caching can cause users to receive stale application assets or data.

---

## 35. Verify CDN Behavior

If a CDN is involved, test:

```text id="m8x9g4"
Caching
Invalidation
Headers
Compression
Routing
TLS
Asset delivery
```

A CDN can introduce behavior that does not exist locally.

---

## 36. Verify HTTPS

Production applications should use HTTPS where required.

Check:

```text id="l6m7st"
Certificate
Redirects
Mixed content
Secure cookies
External resources
```

Avoid sending sensitive information over insecure transport.

---

## 37. Verify Secure Cookies

For sensitive authentication cookies, review:

```text id="f2q5yz"
Secure
HttpOnly
SameSite
Domain
Path
Expiration
```

Cookie configuration should match the application's threat model and architecture.

---

## 38. Verify CORS

Check:

```text id="k7ud84"
Allowed origins
Allowed methods
Allowed headers
Credentials
Preflight behavior
```

Avoid broad policies unless they are genuinely required.

---

## 39. Verify CSRF Protections

For cookie-based authentication where relevant, verify the appropriate CSRF protections.

Depending on the architecture, this may involve:

```text id="7p9w0u"
SameSite cookies
CSRF tokens
Origin validation
Request validation
```

Do not assume CORS solves CSRF.

---

## 40. Verify Rate Limiting

Important endpoints may require rate limits.

Examples:

```text id="e0g3ny"
Login
Password reset
Search
File upload
Public API
Expensive operations
```

Check both normal use and abusive request patterns.

---

## 41. Verify Request Size Limits

Check limits for:

* Request body
* File uploads
* JSON payloads
* Query strings
* Batch operations
* Headers where appropriate

Without limits, a small endpoint can become a resource-exhaustion risk.

---

## 42. Verify File Upload Security

Check:

```text id="v04b59"
Allowed file types
Maximum size
Content validation
Storage location
Filename handling
Authorization
Download behavior
```

Do not trust client-provided MIME types or filenames.

---

## 43. Verify Database Connectivity

Before serving production traffic, ensure the application can reach its database.

Check:

```text id="o7xq6s"
Credentials
Network access
TLS
Connection pool
Schema
Migrations
Timeouts
Permissions
```

---

## 44. Verify Database Schema

The production schema must match application expectations.

Check:

```text id="tw7x0z"
Tables
Columns
Indexes
Constraints
Migrations
Functions
Permissions
```

Application and database versions should be compatible.

---

## 45. Verify Database Migrations

Before applying a migration:

```text id="x4f2vt"
Understand schema change
↓
Assess compatibility
↓
Back up where appropriate
↓
Apply migration
↓
Verify
```

Avoid migrations that require application downtime when the deployment architecture cannot tolerate it.

---

## 46. Design Backward-Compatible Schema Changes When Practical

For a changing field:

```text id="cbm3eu"
Application version A
+
Database schema B
```

should remain compatible during a rolling deployment when necessary.

A safer pattern can be:

```text id="38auyq"
Add new field
↓
Deploy code supporting both
↓
Backfill
↓
Switch reads/writes
↓
Remove old field later
```

The exact migration strategy depends on the system.

---

## 47. Verify Database Constraints

Important invariants should be enforced at the database level where appropriate.

Examples:

```text id="cxvrb8"
Unique email
Non-null required field
Foreign key relationship
Valid status
```

Application validation improves UX.

Database constraints protect integrity.

---

## 48. Verify Transactions

Operations that should be atomic should use appropriate transactions.

Example:

```text id="57g6ot"
Create order
Create order items
Update inventory
```

If these steps must succeed together, test failure during each stage.

---

## 49. Verify Connection Pool Limits

An application with too many simultaneous requests can exhaust the database connection pool.

Check:

```text id="1ez5v2"
Maximum connections
Timeouts
Idle connections
Application instance count
Database capacity
```

A correct local configuration may fail at production scale.

---

## 50. Verify External Services

If the application depends on:

```text id="b1v3kz"
Email
Payments
Storage
Authentication
Analytics
Maps
Search
AI services
```

verify:

* Credentials
* Connectivity
* Rate limits
* Timeout behavior
* Retry behavior
* Failure handling

---

## 51. Verify External Service Failure

Temporarily simulate or reproduce:

```text id="p8j8yv"
Timeout
401
403
404
429
500
Network failure
Malformed response
```

The application should fail gracefully.

---

## 52. Verify Retry Semantics

For each retry:

```text id="a8z9no"
Is this failure retryable?
Is the operation idempotent?
How many retries?
What delay?
What happens after final failure?
```

Do not blindly retry every request.

---

## 53. Verify Cancellation

For long or replaceable operations:

```text id="4x8s15"
Search
Upload
Navigation
Streaming
Polling
```

verify that cancellation stops or safely abandons obsolete work.

---

## 54. Verify Timeout Behavior

Every operation that can hang indefinitely should have an appropriate strategy.

Test:

```text id="x0j41q"
Fast success
Slow success
Timeout
Cancellation
Retry after timeout
```

---

## 55. Verify Stale Response Handling

For concurrent requests:

```text id="3tmh15"
Request A
Request B
B finishes
A finishes
```

Verify that A cannot incorrectly overwrite newer state.

---

## 56. Verify Loading States

Every important async operation should have an intentional loading behavior.

Check:

```text id="6p2p2n"
Initial loading
Repeated submission
Slow response
Failure
Empty result
Retry
```

---

## 57. Verify Empty States

Test:

```text id="3s7wr0"
No projects
No search results
Empty cart
No notifications
No messages
```

Empty data should be handled intentionally.

---

## 58. Verify Error States

For each major feature, ask:

> What does the user see if the operation fails?

There should be a meaningful answer.

---

## 59. Verify Accessibility

Perform a production-focused accessibility pass.

Check:

* Semantic HTML
* Keyboard navigation
* Focus visibility
* Focus order
* Form labels
* Accessible names
* Heading hierarchy
* Landmarks
* Errors
* Dynamic announcements
* Contrast
* Zoom
* Reduced motion

---

## 60. Verify Keyboard Workflows

Complete critical flows without a mouse:

```text id="zv6y1g"
Navigation
Search
Forms
Dialogs
Menus
Create
Edit
Delete
Authentication
```

Every primary workflow should remain usable.

---

## 61. Verify Focus Management

Test:

```text id="p3u5gf"
Modal open
Modal close
Route navigation
Form validation
Dynamic insertion
Menu open
Menu close
```

Focus should remain logical and predictable.

---

## 62. Verify Screen Reader Semantics

Inspect:

```text id="1v4poe"
Page title
Headings
Landmarks
Links
Buttons
Forms
Errors
Dialogs
Dynamic status
Current page
```

Automated audits alone are not enough.

---

## 63. Verify Responsive Design

Test multiple viewport sizes.

At minimum, inspect:

```text id="97m9k2"
Small mobile
Large mobile
Tablet
Desktop
Wide desktop
```

Look for:

```text id="k2x4qb"
Overflow
Clipped content
Unreachable controls
Broken dialogs
Overlapping text
Hidden actions
```

---

## 64. Verify Browser Zoom

Test enlarged page content.

Inspect:

* Navigation
* Forms
* Tables
* Dialogs
* Cards
* Buttons
* Error messages

The interface should remain usable at increased zoom.

---

## 65. Verify Reduced Motion

Enable reduced-motion preferences and confirm:

```text id="u1fz05"
Important information remains visible.
Animations are reduced.
Interaction remains usable.
Focus behavior remains correct.
```

---

## 66. Verify Dark Mode

If supported, inspect:

```text id="0zv3s6"
Text
Borders
Icons
Focus
Links
Errors
Success states
Disabled controls
Form fields
```

Dark mode must preserve readability and state distinction.

---

## 67. Verify Color-Independent Meaning

Test important states without depending only on:

```text id="q4p7e2"
Red
Green
Blue
```

Use text, icons, patterns, or semantics where appropriate.

---

## 68. Verify SEO for Public Content

Where SEO matters, inspect:

```text id="dx12xy"
Titles
Descriptions
Canonical URLs
Headings
Indexability
Structured data
Open Graph metadata
Sitemap
Robots configuration
```

SEO requirements depend on the application.

---

## 69. Verify Robots and Sitemap

If the site is intended to be indexed, verify:

```text id="c8p5q1"
robots.txt
sitemap.xml
```

Make sure production URLs are correct.

Do not accidentally block the entire site:

```text id="k7o9zq"
Disallow: /
```

unless that is intentional.

---

## 70. Verify Canonical URLs

If the same content can appear through multiple URLs, define the intended canonical representation where necessary.

Canonical configuration should use production URLs.

---

## 71. Verify Social Metadata

Inspect:

```text id="14b7e9"
Open Graph title
Open Graph description
Open Graph image
Twitter/X metadata where applicable
```

Use the actual social metadata standards required by the target platforms.

---

## 72. Verify 404 Handling

A proper 404 page should:

* Return the correct status where applicable.
* Explain that the resource was not found.
* Provide useful navigation.
* Remain accessible.
* Preserve the application's visual identity.

---

## 73. Verify Error Boundaries

For frontend applications, verify that unexpected rendering errors do not leave users with a completely blank page.

A useful failure state should provide:

```text id="v3u4xj"
Explanation
Recovery action
Navigation
Request ID or support reference where appropriate
```

Avoid exposing stack traces to users.

---

## 74. Verify Backend Error Handling

The server should:

* Return appropriate status codes.
* Avoid stack trace leakage.
* Use stable error shapes.
* Log useful diagnostics.
* Avoid returning secrets.

---

## 75. Verify Logging Levels

Production logging should be intentional.

Possible levels:

```text id="yl7u06"
debug
info
warn
error
```

Do not leave extremely verbose development logging enabled unnecessarily.

---

## 76. Verify Log Redaction

Search production logs for:

```text id="f6y0e3"
Passwords
Tokens
Cookies
Authorization headers
Private keys
Sensitive personal data
```

Sensitive values should be redacted or excluded.

---

## 77. Verify Monitoring

Important production systems should provide visibility into:

```text id="r7k0q9"
Error rate
Latency
Availability
Resource usage
Traffic
Database health
External dependency failures
```

Monitoring requirements should match the application's importance.

---

## 78. Verify Alerting

Monitoring without meaningful alerts may not provide operational value.

Alerts should focus on actionable conditions.

Avoid alerting on every harmless event.

---

## 79. Avoid Alert Fatigue

If the system produces:

```text id="0f9s2a"
100 alerts/day
```

and most are ignored, alerting loses value.

Prefer fewer actionable alerts with useful context.

---

## 80. Verify Health Endpoints

Depending on the deployment system, consider:

```text id="4g4xj0"
/health
/ready
```

Health endpoints should expose safe operational status.

---

## 81. Verify Liveness and Readiness Separately

Liveness:

```text id="zi4b0p"
Is the process running?
```

Readiness:

```text id="4t0h6x"
Can this instance safely receive traffic?
```

Do not make a liveness check fail merely because a dependency is temporarily unavailable unless that behavior is intentionally required.

---

## 82. Verify Graceful Shutdown

When the process receives a shutdown signal, it may need to:

```text id="c4ym7v"
Stop accepting new work
Finish active requests where practical
Close database connections
Close queues
Close sockets
Flush logs
Exit
```

A graceful shutdown reduces data corruption and interrupted work.

---

## 83. Verify Resource Cleanup

Check cleanup for:

```text id="49d8na"
Timers
Event listeners
Observers
WebSockets
Database connections
Workers
Object URLs
Streams
Temporary files
```

Leaks can become production stability problems.

---

## 84. Verify Memory Usage

Monitor:

```text id="o8p9r1"
Heap
RSS
Cache size
Queue size
Worker memory
Database pool usage
```

Look for uncontrolled growth.

---

## 85. Verify CPU Usage

High CPU may result from:

* Infinite loops
* Expensive rendering
* Large synchronous work
* Inefficient algorithms
* Excessive serialization
* Repeated calculations

Use profiling rather than guessing.

---

## 86. Verify Network Usage

Inspect:

```text id="v7c4c3"
Request count
Payload size
Response size
Duplicate requests
Polling frequency
Prefetching
Caching
```

Unnecessary network traffic can increase both latency and operational cost.

---

## 87. Verify Database Performance

Check:

```text id="k3z5n8"
Slow queries
Missing indexes
Connection pool usage
Query count
N+1 patterns
Large result sets
```

Production data size can expose problems that small local datasets do not.

---

## 88. Avoid N+1 Requests

A problematic pattern:

```text id="0lyq0k"
Fetch 100 users
↓
Fetch projects for each user
↓
100 additional requests
```

Consider whether the API or database layer can provide the required data more efficiently.

---

## 89. Avoid N+1 Database Queries

Similarly:

```text id="lj2j4m"
Query users
↓
For each user:
  Query projects
```

can create unnecessary database work.

Use appropriate joins, batching, preloading, or query strategies.

---

## 90. Verify Pagination at Scale

A query that works with:

```text id="xj6h0q"
20 rows
```

may fail with:

```text id="mj4r8p"
2,000,000 rows
```

Test realistic data sizes or use production-like performance environments.

---

## 91. Verify Search Performance

Search operations can become expensive as data grows.

Check:

```text id="8y7x1w"
Indexes
Query latency
Result limits
Pagination
Input validation
Rate limiting
```

---

## 92. Verify Large File Handling

Test:

```text id="68v8ce"
Small file
Large valid file
Oversized file
Invalid type
Interrupted upload
Slow upload
Failed upload
```

---

## 93. Verify Retry Storm Protection

When a dependency fails, confirm that all clients do not immediately retry indefinitely.

Check:

```text id="2d2w5v"
Backoff
Jitter
Retry limits
Circuit-breaking strategy where relevant
```

---

## 94. Verify External Dependency Isolation

If an external provider becomes unavailable, determine:

```text id="4ms4kr"
What functionality fails?
What continues working?
Can users retry?
Is there a fallback?
Does the entire application become unavailable?
```

Do not let one optional dependency unnecessarily bring down unrelated features.

---

## 95. Verify Graceful Degradation

For non-critical services:

```text id="2s6m2v"
Analytics unavailable
```

should not necessarily mean:

```text id="88hmy8"
Core application unavailable
```

Separate critical and non-critical dependencies.

---

## 96. Verify Feature Flag Rollback

If a feature flag controls a new system, verify that disabling it actually restores the intended fallback behavior.

A flag is useful only if the fallback path still works.

---

## 97. Verify Rollback Procedures

Do not only know how to deploy.

Know how to recover from a bad deployment.

Document:

```text id="ne6q0p"
How to identify failure
How to stop rollout
How to restore application version
How to handle database compatibility
How to restore configuration
How to verify recovery
```

---

## 98. Do Not Assume Code Rollback Restores Data

Data migrations can be irreversible.

Before deploying schema changes, understand:

```text id="9r7c2a"
Can code roll back?
Can schema roll back?
Can data roll back?
What happens to new records?
```

Application rollback and data rollback are separate concerns.

---

## 99. Backup Critical Data

For systems with persistent data, ensure backups exist where required.

Define:

```text id="6mqv8t"
Backup frequency
Retention
Encryption
Access control
Restore procedure
```

A backup that cannot be restored is not a reliable recovery strategy.

---

## 100. Test Restore Procedures

A backup should periodically be tested.

Verify:

```text id="b5l4xx"
Backup exists
↓
Restore succeeds
↓
Data is usable
↓
Application can connect
```

Do not assume successful backup creation proves recoverability.

---

## 101. Define Recovery Objectives

Important systems may define:

```text id="pp7yqe"
RTO
Recovery Time Objective

RPO
Recovery Point Objective
```

These define acceptable recovery time and data loss.

The appropriate targets depend on the business.

---

## 102. Document Incident Response

For serious production issues, document:

```text id="zhf2ta"
Who investigates
What is monitored
How deployment is paused
How users are informed
How recovery happens
How the incident is documented
```

Clear responsibilities reduce confusion during failures.

---

## 103. Verify Version Information

A production application should expose or log its version safely.

Example:

```js id="c8hy8e"
const release = "1.4.0";
```

or a commit identifier:

```text id="ak4lp8"
abc1234
```

This helps correlate errors with deployments.

---

## 104. Associate Errors With Releases

Production errors become easier to investigate when you can answer:

> Which application version produced this error?

Include release metadata in observability systems where practical.

---

## 105. Verify Source Maps Carefully

Source maps can make client-side errors much easier to debug.

If source maps are publicly accessible, consider whether they expose information that should remain private.

The appropriate strategy depends on the deployment and threat model.

---

## 106. Verify Bundle Contents

Inspect the production bundle for:

```text id="wb9ah2"
Unexpected secrets
Development code
Debug tools
Large unused dependencies
Accidental test data
Unexpected source content
```

Do not assume the build contains only what you intended.

---

## 107. Verify Bundle Size

Measure:

```text id="i1h7qv"
Initial JavaScript
CSS
Images
Fonts
Lazy-loaded chunks
```

Large assets can directly affect loading performance.

---

## 108. Verify Code Splitting

Ensure expensive features are not loaded before they are needed when code splitting is appropriate.

Examples:

```text id="1mx6qm"
Admin panel
Rich editor
Charts
Large visualization library
Rare workflow
```

Lazy loading should be based on real application boundaries.

---

## 109. Verify Image Optimization

Check:

* Dimensions
* Compression
* Appropriate formats
* Responsive images
* Lazy loading where appropriate
* Priority for important above-the-fold images

Avoid shipping enormous images to small screens.

---

## 110. Verify Font Loading

Check:

```text id="de4m6t"
Font file size
Font count
Loading strategy
Fallback behavior
Layout shift
```

Do not load dozens of font variants unnecessarily.

---

## 111. Verify Core User Experience

Measure meaningful user-facing performance.

Consider:

```text id="3u6g8q"
Initial load
Interaction responsiveness
Layout stability
Navigation speed
API latency
```

Avoid optimizing only synthetic metrics while ignoring actual user experience.

---

## 112. Verify Layout Stability

Unexpected movement can result from:

```text id="j4qmqv"
Images without dimensions
Late-loading fonts
Dynamic content
Ads
Async components
```

Reserve appropriate space where possible.

---

## 113. Verify Loading Feedback

Users should know when important work is occurring.

Examples:

```text id="ayq2sa"
Saving...
Uploading...
Loading projects...
Processing...
```

Avoid leaving users wondering whether an action succeeded.

---

## 114. Verify Duplicate Actions

Test double-clicks and repeated submissions for:

```text id="c5g8li"
Create
Delete
Pay
Send
Upload
Save
```

Important operations should have deliberate duplicate-handling semantics.

---

## 115. Verify Idempotency

For retryable operations, determine:

```text id="c8j1u0"
Can it safely run twice?
If not, how are duplicates prevented?
```

Use server-side idempotency mechanisms when required.

---

## 116. Verify Concurrency

Test scenarios where:

```text id="1e7f1e"
Two tabs modify the same record.
Two requests update the same record.
Multiple users edit shared data.
Old requests finish after new requests.
```

Concurrency bugs often appear only after deployment.

---

## 117. Verify Multi-Tab Behavior

If browser state is shared across tabs, consider:

```text id="6m7s5c"
Authentication
Storage
Logout
Preferences
Editing
Concurrent writes
```

One tab can change state while another remains open.

---

## 118. Verify Browser Storage Behavior

Check:

```text id="28w2n7"
Local storage
Session storage
IndexedDB
Cookies
```

Test:

```text id="g6j3ze"
Missing data
Corrupted data
Old data format
Storage unavailable
Quota limits
```

---

## 119. Handle Stale Local Data

Applications may encounter data created by an older version.

Consider migration or invalidation strategies for persisted client state.

---

## 120. Verify Cache Invalidation After Deployment

After deploying new code, verify that users receive the correct assets and data.

Incorrect caching can produce:

```text id="8p1n0d"
New HTML
+
Old JavaScript
```

or:

```text id="1s7t8x"
New JavaScript
+
Old data
```

---

## 121. Verify API Compatibility With Existing Clients

If old clients may remain active after a deployment, test:

```text id="rv9y2c"
Old client
+
New API
```

and, where required:

```text id="7b2k1y"
New client
+
Old API
```

Rolling deployments make compatibility especially important.

---

## 122. Verify Database Compatibility During Rolling Deployments

During a rolling deployment:

```text id="6r9z2p"
Instance A → old code
Instance B → new code
```

both may temporarily access the same database.

Schema changes must be compatible with this transition.

---

## 123. Verify Logging During Deployment

Deployment itself should produce enough information to determine:

```text id="6f4v9j"
Which version deployed
When it deployed
Whether startup succeeded
Whether migrations ran
Whether health checks passed
```

---

## 124. Verify Deployment Health

A deployment should not be considered successful simply because the platform reports:

```text id="2k8g7k"
Build succeeded.
```

Verify:

```text id="07q3ff"
Application started
Health check passed
Routes work
Database connected
Critical workflow works
```

---

## 125. Verify Production Smoke Tests

A smoke test is a small set of high-value checks after deployment.

Example:

```text id="t7m9s2"
Open home page
Authenticate
Load dashboard
Create test resource
Read resource
Delete test resource
Log out
```

Keep smoke tests focused on critical functionality.

---

## 126. Avoid Destructive Production Smoke Tests

Do not create uncontrolled test data in real customer environments.

For production verification, use:

* Safe read-only checks
* Dedicated test accounts
* Controlled test resources
* Explicit cleanup
* Synthetic monitoring where appropriate

---

## 127. Verify Health After Deployment

Watch:

```text id="e4v2s7"
Error rate
Latency
Traffic
CPU
Memory
Database load
External service errors
```

Compare against a known healthy baseline.

---

## 128. Verify Monitoring During the First Production Period

A deployment that looks successful immediately can still cause delayed problems.

Observe:

```text id="7m5p4w"
Error trends
Latency trends
Resource usage
User reports
Background jobs
Database behavior
```

---

## 129. Verify Background Jobs

If the application uses background processing, verify:

```text id="0ipx5z"
Queue connectivity
Job processing
Retry behavior
Dead-letter handling
Concurrency
Timeouts
Cleanup
```

---

## 130. Verify Scheduled Tasks

For scheduled work:

```text id="6u3e3s"
Schedule
Timezone
Overlap handling
Failure handling
Retry
Duplicate prevention
```

Make sure timezone behavior is explicit.

---

## 131. Prevent Duplicate Background Jobs

If a scheduled job runs on multiple instances, verify that it cannot accidentally execute multiple times unless that is intended.

Possible mechanisms include:

```text id="zz3n3g"
Distributed locks
Unique job IDs
Queue semantics
Database locks
Idempotent processing
```

---

## 132. Verify Job Idempotency

Background work may be retried after:

```text id="nzwv5v"
Worker crash
Network failure
Timeout
Process restart
```

Important jobs should tolerate or prevent duplicate effects.

---

## 133. Verify Queue Backpressure

Check what happens when:

```text id="9r6h5h"
Work arrives faster than it can be processed.
```

A safe system should have explicit limits and recovery behavior.

---

## 134. Verify Dead-Letter Handling

If jobs repeatedly fail, they should not retry forever.

Use appropriate dead-letter or failed-job handling where the architecture supports it.

---

## 135. Verify Graceful Shutdown of Background Workers

A worker should not abandon work unexpectedly during deployment.

Define:

```text id="9f5m8o"
Stop accepting work
Finish current job when appropriate
Persist state
Release resources
Exit
```

---

## 136. Verify File and Object Storage

If using object storage, test:

```text id="f0j2a9"
Upload
Download
Delete
Authorization
Public/private access
Large files
Invalid files
Missing files
Expired URLs
```

---

## 137. Verify Signed URLs

If signed URLs are used, verify:

```text id="4y8hka"
Expiration
Authorization
Scope
Resource
Method
```

Do not create URLs that provide more access than necessary.

---

## 138. Verify Public and Private Storage

A file intended to be private should not become publicly accessible through a predictable URL.

Test access as:

```text id="n2y7x6"
Authorized user
Unauthorized user
Unauthenticated user
```

---

## 139. Verify Email Delivery

If the application sends email:

```text id="v6w9k2"
Valid address
Invalid address
Provider failure
Timeout
Retry
Duplicate send
Templates
Links
```

Do not send real test emails to arbitrary production users.

---

## 140. Verify External Links in Emails

Emails may contain:

```text id="w1z5v4"
Verification
Password reset
Invitation
Application links
```

Ensure URLs use the correct production origin.

---

## 141. Verify Password Reset and Verification Flows

These flows are security-sensitive.

Test:

```text id="x9w1g2"
Valid token
Expired token
Invalid token
Already-used token
Wrong user
Repeated request
```

Tokens should expire and be protected appropriately.

---

## 142. Verify Session Expiration

Test what happens when an authenticated session expires while the user is:

```text id="2ag7h4"
Viewing a page
Submitting a form
Saving data
Uploading a file
Using a modal
```

The application should respond predictably.

---

## 143. Verify Logout

Logout should invalidate the expected authentication state.

Test:

```text id="g0q5p1"
Logout
Back button
Protected URL
Refresh
New tab
Existing tab
```

Do not rely only on redirecting to a login page.

---

## 144. Verify Authorization After Logout

A previously accessible resource should not remain available merely because the UI has stale state.

Recheck the actual server-side authorization boundary.

---

## 145. Verify Account Deletion or Sensitive Destructive Actions

Where applicable, test:

```text id="3s1f0j"
Confirmation
Authorization
Data deletion
Related data
Sessions
Caches
External accounts
Recovery behavior
```

The exact retention requirements depend on the domain.

---

## 146. Verify Privacy Requirements

Identify:

```text id="5o7z3k"
What personal data is collected?
Where is it stored?
Who can access it?
How long is it retained?
Where is it logged?
```

Production readiness includes responsible data handling.

---

## 147. Minimize Data Collection

Do not collect sensitive information merely because it may be useful someday.

Store only what the application actually needs.

Less stored data means less exposure and lower operational risk.

---

## 148. Verify Data Access Controls

For sensitive resources, test:

```text id="m5l3v7"
Owner access
Administrative access
Unauthorized access
Cross-user access
Cross-tenant access
```

Multi-tenant applications require especially careful isolation.

---

## 149. Verify Tenant Isolation

If the application supports multiple organizations:

```text id="7n2u2e"
Tenant A
Tenant B
```

ensure queries include the correct tenant boundary.

A user in Tenant A must not receive Tenant B's data.

---

## 150. Verify Logging Does Not Break Privacy

Review logs for:

```text id="u8j2k9"
Email addresses
Names
Messages
Tokens
Request bodies
Uploaded content
Private identifiers
```

Redact where necessary.

---

## 151. Verify Configuration Documentation

Before release, check:

```text id="8l5m7n"
.env.example
README
Deployment documentation
Runbook
CI configuration
Hosting configuration
```

All required environment variables should be documented.

---

## 152. Verify Operational Documentation

Document:

* How to deploy
* How to roll back
* How to restart
* How to inspect logs
* How to run migrations
* How to restore backups
* How to rotate secrets
* How to respond to common failures

The goal is that another competent developer can operate the system.

---

## 153. Verify Dependency on One Person

If only one developer knows:

```text id="c8w4y3"
How production works
How the database is migrated
How backups are restored
```

the system has operational risk.

Document critical knowledge.

---

## 154. Keep Runbooks Practical

A runbook should include:

```text id="s0v4r8"
Symptom
Checks
Commands or dashboards
Likely causes
Recovery actions
Escalation path
```

Avoid vague instructions such as:

```text id="h1r9j9"
"Investigate the problem."
```

---

## 155. Verify CI/CD

A production pipeline should ideally automate appropriate checks such as:

```text id="3c6b1w"
Install
Lint
Test
Build
Security checks
Deploy
Smoke test
```

The exact sequence depends on the project.

---

## 156. Verify CI Secrets

CI systems often need secrets.

Check:

```text id="v2h5z9"
Secret scope
Environment
Rotation
Access permissions
Logs
```

Make sure secrets cannot accidentally appear in build output.

---

## 157. Verify Build Artifacts

Confirm that the deployment contains:

```text id="m3n2x8"
Expected files
Expected assets
Expected version
No test files
No local paths
No secrets
```

---

## 158. Verify Deployment Reproducibility

The same source commit and intended configuration should produce a predictable deployment.

Avoid manual production modifications that cannot be reproduced.

---

## 159. Avoid Manual Production Patches

Do not edit:

```text id="d0b3b2"
Production source files
Production bundles
Database data
Configuration
```

without a controlled process.

Manual fixes become difficult to reproduce and audit.

---

## 160. Verify Git State Before Deployment

Check:

```bash id="g9l5xx"
git status
```

Confirm:

```text id="j4n3w1"
Expected branch
Expected commit
No unintended local changes
```

Deploy the intended code.

---

## 161. Verify Release Identity

Record:

```text id="m8o6i1"
Commit SHA
Version
Build identifier
Deployment timestamp
Environment
```

This allows accurate debugging later.

---

## 162. Production Checklist by Category

### Functionality

```text id="uvv3xk"
Critical workflows
Business rules
Validation
Error handling
Navigation
Persistence
```

### Security

```text id="p2kx8r"
Authentication
Authorization
Input validation
Secrets
HTTPS
Cookies
CORS
CSRF
Rate limits
Uploads
```

### Performance

```text id="0z7v5n"
Load time
Network
CPU
Memory
Database
Bundle size
Images
Caching
```

### Accessibility

```text id="y6m7x8"
Semantics
Keyboard
Focus
Screen reader
Contrast
Zoom
Reduced motion
Forms
Errors
```

### Reliability

```text id="q9d3y6"
Timeouts
Retries
Cancellation
Cleanup
Health checks
Graceful shutdown
Backups
Recovery
```

### Operations

```text id="6y1w3z"
Logging
Monitoring
Alerts
CI/CD
Deployment
Rollback
Runbooks
Versioning
```

---

## 163. Pre-Deployment Checklist

Before clicking deploy:

* [ ] Critical workflows have been tested.
* [ ] Production build succeeds.
* [ ] Required environment variables are configured.
* [ ] No secrets are committed.
* [ ] No secrets are exposed to clients.
* [ ] Dependencies are installed from the expected lockfile.
* [ ] Database migrations are reviewed.
* [ ] External services are configured.
* [ ] HTTPS is enabled where required.
* [ ] Authentication is working.
* [ ] Authorization is enforced.
* [ ] Error handling is verified.
* [ ] Logging is configured.
* [ ] Monitoring is configured.
* [ ] Health checks are working.
* [ ] Rollback procedure is known.
* [ ] Backup and restore strategy exists where necessary.
* [ ] Accessibility checks are complete.
* [ ] Responsive layouts are verified.
* [ ] SEO/metadata requirements are verified where relevant.
* [ ] Production URLs are correct.
* [ ] Static asset paths are correct.
* [ ] Feature flags have intended values.
* [ ] Version/release information is known.

---

## 164. Post-Deployment Smoke Checklist

Immediately after deployment:

* [ ] Application loads.
* [ ] Homepage works.
* [ ] Authentication works.
* [ ] Protected routes work.
* [ ] Critical API requests work.
* [ ] Database operations work.
* [ ] Static assets load.
* [ ] Forms submit correctly.
* [ ] Errors are handled correctly.
* [ ] No unexpected console errors appear.
* [ ] No unexpected network failures appear.
* [ ] Health checks pass.
* [ ] Logs show successful startup.
* [ ] Monitoring reports expected behavior.
* [ ] Critical user workflows succeed.

---

## 165. First-Period Monitoring Checklist

After deployment, inspect:

* [ ] Error rate.
* [ ] Request latency.
* [ ] Database performance.
* [ ] CPU usage.
* [ ] Memory usage.
* [ ] Traffic.
* [ ] External service failures.
* [ ] Background job failures.
* [ ] Queue size.
* [ ] Authentication failures.
* [ ] Rate-limit events.
* [ ] User-reported problems.

Compare against expected or historical baselines.

---

## 166. Incident Checklist

When a serious production issue occurs:

```text id="w2m7n8"
1. Confirm the issue.
2. Determine scope.
3. Preserve evidence.
4. Check recent deployments.
5. Check configuration changes.
6. Identify whether rollback is safe.
7. Reduce user impact.
8. Communicate appropriately.
9. Fix or mitigate the root cause.
10. Verify recovery.
11. Add regression protection.
12. Document what happened.
```

Do not destroy evidence while trying to fix the problem.

---

## 167. Production Incident Priorities

A useful order is:

```text id="j3l8m5"
Protect users
    ↓
Protect data
    ↓
Restore service
    ↓
Identify root cause
    ↓
Prevent recurrence
```

The exact priority may vary by incident.

Safety and data integrity should remain central concerns.

---

## 168. Rollback Decision

Before rolling back, consider:

```text id="n5v8c1"
Does rollback restore application behavior?
Is the database schema backward-compatible?
Does rollback worsen the issue?
Will users lose newly created data?
Will configuration remain compatible?
```

Rollback is not always the safest action.

---

## 169. Hotfixes

A hotfix should still be:

```text id="3r5k8w"
Small
Reviewable
Tested
Tracked
Reproducible
```

Production urgency does not eliminate engineering discipline.

---

## 170. Verify the Fix After an Incident

Do not stop when:

```text id="b7p1k4"
Error count drops.
```

Confirm:

```text id="j0v5r3"
Original failure is gone
Critical workflows work
No new errors appeared
Performance is acceptable
Data remains correct
```

---

## 171. Add Regression Protection

After resolving a significant production bug:

```text id="6f8r0q"
Production bug
↓
Reproduce locally
↓
Add regression test
↓
Fix
↓
Deploy
```

The regression test should fail under the old behavior.

---

## 172. Review Root Cause

After the incident, ask:

```text id="k3n2r6"
Why did the failure occur?
Why was it not detected earlier?
Why did monitoring not catch it?
Why did tests not catch it?
Why was recovery difficult?
```

The goal is system improvement, not assigning blame.

---

## 173. Production Readiness and Technical Debt

Not all technical debt must be eliminated before deployment.

Prioritize debt that creates meaningful:

```text id="y7p1m4"
Security risk
Data risk
Reliability risk
Operational risk
Compliance risk
Severe user impact
```

Do not delay useful releases merely to make every internal detail perfect.

---

## 174. Production Readiness and Small Projects

A small project may use a compact checklist:

```text id="6s4h8m"
Build works
Routes work
Forms work
Database works
Secrets are protected
Errors are handled
Basic accessibility works
Deployment is reproducible
```

Not every application needs:

```text id="4u3m1y"
Distributed tracing
Multi-region failover
Complex queues
Advanced deployment orchestration
```

Production discipline should match actual risk.

---

## 175. Production Readiness and High-Risk Systems

Higher-risk systems may require:

```text id="c8w3s7"
Redundancy
Audit logging
Strict authorization
Formal backups
Disaster recovery
Detailed monitoring
Security reviews
Load testing
Change management
```

The level of rigor should correspond to the consequences of failure.

---

## 176. Avoid Checklist Theater

A checklist is useful only when it reflects real verification.

Do not mark:

```text id="u8p4d6"
[x] Accessibility
```

without actually testing keyboard navigation and important workflows.

The purpose of a checklist is evidence, not appearance.

---

## 177. Production Checklist Should Be Evidence-Based

For important items, know what proves the condition.

Example:

```text id="h5y2s8"
Requirement:
Database backup exists.

Evidence:
Successful backup timestamp + tested restore.
```

Another:

```text id="p0x7j2"
Requirement:
Authorization is enforced.

Evidence:
Unauthorized integration test returns the expected denial.
```

Evidence makes production readiness meaningful.

---

## 178. Treat the Checklist as Living Documentation

The checklist should evolve as the application changes.

Update it when:

```text id="s6z8x3"
New infrastructure is added
New security risks appear
New dependencies are introduced
Deployment changes
Incidents reveal missing checks
```

A stale checklist creates false confidence.

---

## 179. Automate Repetitive Checks

Where possible, automate:

```text id="j4x6v8"
Tests
Linting
Build
Dependency scanning
Accessibility checks
Type checks
Migration checks
Smoke tests
Deployment verification
```

Automation reduces human omission.

---

## 180. Keep Human Judgment for High-Context Checks

Some checks still require human evaluation:

```text id="x9v3k7"
Usability
Accessibility workflow
Business correctness
Visual quality
Incident decisions
Rollback safety
```

Do not automate decisions that require context if automation would create false confidence.

---

## 181. Production Readiness Matrix

A simple matrix can help:

```text id="q8w4r2"
Area             | Status
-----------------|--------
Functionality    | Verified
Security         | Verified
Accessibility    | Verified
Performance      | Verified
Configuration    | Verified
Observability    | Verified
Recovery         | Verified
Deployment       | Verified
```

The exact status values should reflect actual evidence.

---

## 182. Risk-Based Sign-Off

Before production, identify:

```text id="d6m9x3"
Critical risks
High risks
Known limitations
Accepted trade-offs
```

A responsible release decision should be based on understanding these risks.

---

## 183. Known Limitations Should Be Explicit

Example:

```text id="g0w4p1"
The current search implementation is limited to 100 results.
```

This is better than silently allowing the limitation to surprise users.

---

## 184. Avoid False Production Guarantees

Do not claim:

```text id="a9p5z6"
"Zero bugs"
"100% secure"
"Will never fail"
```

Production systems operate under uncertainty.

The goal is:

```text id="r2y7k3"
Known risks
+
Useful safeguards
+
Fast detection
+
Reliable recovery
```

---

## 185. Maintain a Production Baseline

Record useful baseline metrics such as:

```text id="w4q7h8"
Typical latency
Error rate
Memory usage
CPU usage
Database load
Request volume
```

After a deployment, compare observed behavior with the baseline.

---

## 186. Verify Capacity

Ask:

```text id="e2f7n5"
How many requests can the system handle?
How many concurrent users?
How much database capacity?
How much storage?
How much memory?
```

The exact limits should be known or intentionally bounded.

---

## 187. Load Testing

For applications where load matters, test:

```text id="9k4p0m"
Normal load
Peak load
Burst load
Slow dependency
Database pressure
Concurrent users
```

Do not extrapolate production capacity from laptop performance alone.

---

## 188. Stress Testing

Stress testing asks:

> What happens when the system exceeds normal operating conditions?

Look for:

```text id="5w8v1k"
Failure mode
Recovery behavior
Data integrity
Resource exhaustion
Queue growth
Timeouts
```

The objective is not only maximum throughput.

It is also understanding failure behavior.

---

## 189. Soak Testing

Long-running tests can reveal:

```text id="2q7v3d"
Memory leaks
Connection leaks
Resource accumulation
Scheduled-job problems
Slow degradation
```

Important for services intended to run continuously.

---

## 190. Verify Resource Limits at Production Scale

Check:

```text id="4t8m0p"
File descriptors
Connections
Memory
CPU
Queue size
Storage
Request body size
Concurrent requests
```

Infrastructure defaults may become application limits.

---

## 191. Production Checklist for Client Applications

For frontend applications, especially verify:

```text id="p5x2j7"
Build
Routing
Assets
Metadata
Accessibility
Responsive behavior
API configuration
Error states
Loading states
Caching
Authentication
Authorization
Analytics
Performance
```

---

## 192. Production Checklist for Server Applications

For backend applications, verify:

```text id="7q9m5w"
Configuration
Authentication
Authorization
Input validation
Database
Transactions
Caching
Timeouts
Retries
Rate limiting
Logging
Monitoring
Health checks
Graceful shutdown
Backups
```

---

## 193. Production Checklist for Full-Stack Applications

Full-stack systems require both sides to work together.

Verify:

```text id="g6x3z2"
Browser
↓
Frontend
↓
API
↓
Authentication
↓
Business logic
↓
Database
↓
External services
```

A successful frontend build does not prove the full system works.

---

## 194. Verify Cross-Layer Contracts

Examples:

```text id="0j8h1n"
Frontend expects:
user.name

API returns:
user.displayName
```

Such mismatches can break production even though both sides work independently.

Test integration boundaries.

---

## 195. Verify API Contract Changes

Before deployment, compare:

```text id="p3m7d2"
Previous request schema
New request schema

Previous response schema
New response schema
```

Identify breaking changes before users encounter them.

---

## 196. Verify Database and API Consistency

If the server expects:

```text id="m8f2r4"
users.email NOT NULL
```

the database must enforce and support that expectation.

Application code and persistence rules should remain aligned.

---

## 197. Verify Authentication Across Client and Server

Test the entire path:

```text id="z9c3v8"
Login
↓
Session creation
↓
Authenticated request
↓
Authorization
↓
Logout
↓
Protected request rejected
```

Do not test only the login screen.

---

## 198. Verify Security Headers

Depending on the application, inspect appropriate headers such as:

```text id="w6k5q2"
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

The correct policy depends on the architecture and requirements.

---

## 199. Do Not Copy Security Headers Blindly

A security header is not automatically correct simply because it appears in a template.

For each header, determine:

```text id="2p8g4x"
What threat does it address?
What behavior does it restrict?
What does the application need?
```

Incorrect policies can break legitimate functionality.

---

## 200. Verify Content Security Policy

Where CSP is used, verify:

```text id="k5p4w1"
Scripts
Styles
Images
Fonts
Frames
Connections
Workers
```

A policy should block unsafe behavior without unnecessarily breaking legitimate application features.

---

## 201. Verify Third-Party Scripts

For every third-party script:

```text id="c4m9n6"
Do we need it?
What data does it receive?
Who controls it?
Can it break the page?
Does it affect performance?
Does it create privacy risk?
```

Third-party code expands the trust boundary.

---

## 202. Verify Analytics

Analytics should not:

```text id="m7v5f2"
Block the application
Collect unnecessary sensitive data
Leak authentication data
Create unacceptable performance cost
```

Use appropriate privacy and consent mechanisms where required.

---

## 203. Verify Third-Party Failure Behavior

If an analytics or monitoring script fails:

```text id="g2r8w4"
Core application should generally continue working.
```

Optional dependencies should not unnecessarily become critical dependencies.

---

## 204. Verify Browser Console

After deployment, inspect the production console for unexpected:

```text id="z6q3m1"
Errors
Warnings
Failed resources
Hydration problems
CORS failures
Security policy violations
```

Some warnings indicate real production problems.

---

## 205. Verify Network Panel

Inspect critical flows for:

```text id="r4m1s7"
Unexpected requests
Duplicate requests
401/403/404/500
Slow requests
Incorrect URLs
Incorrect payloads
Unexpected redirects
```

---

## 206. Verify Hydration and Client/Server Mismatches

For server-rendered applications, inspect for:

```text id="f9k3v7"
Hydration mismatch
Server/client output differences
Incorrect browser-only assumptions
```

Production rendering can differ from development.

---

## 207. Avoid Browser-Only APIs During Server Rendering

Do not access:

```js id="j1v5c8"
window
document
localStorage
navigator
```

during server execution unless the framework/runtime and code path explicitly support it.

Move browser-only behavior to the appropriate client boundary.

---

## 208. Verify Environment Boundaries in Full-Stack Frameworks

For frameworks that support server and client code, inspect which configuration values and dependencies cross the boundary.

Never expose server-only secrets to client code accidentally.

---

## 209. Verify Dynamic Rendering Requirements

If a page depends on:

```text id="o5h7d4"
Cookies
Headers
Authentication
Request-specific data
```

ensure the rendering strategy actually supports those requirements.

---

## 210. Verify Cache Semantics Across Server and Client

Modern applications may have multiple caches:

```text id="5x6g2m"
Browser cache
HTTP cache
CDN cache
Application cache
Framework cache
Database cache
```

Understand which layers can return stale data.

---

## 211. Verify Data Freshness Requirements

For each important dataset, know:

```text id="q1m7p8"
How fresh must it be?
Can stale data be shown?
When is it invalidated?
Who triggers refresh?
```

Do not apply one caching policy to every resource.

---

## 212. Verify Search Engine Rendering Where Relevant

For public-facing pages, inspect:

```text id="9n4b6x"
Rendered HTML
Title
Description
Headings
Links
Content availability
```

Do not assume client-side code will always provide the desired indexing behavior.

---

## 213. Verify Accessibility After Production Build

Some accessibility issues appear only in the final rendered output.

Test the deployed build rather than only development source code.

---

## 214. Verify Mobile Interaction on Real Devices Where Practical

Emulators are useful, but real devices may reveal:

```text id="e0n8z3"
Touch issues
Viewport behavior
Keyboard behavior
Safari differences
Performance problems
```

Critical user journeys should be checked on supported real devices where appropriate.

---

## 215. Verify Browser Compatibility

For supported browsers, test:

```text id="p6m1x8"
Rendering
Interactions
APIs
Authentication
Forms
Layout
Performance
```

Do not assume one Chromium browser represents every target.

---

## 216. Production Checklist Should Reflect Browser Support Policy

The application should document which environments are supported.

For example:

```text id="8h3y5v"
Supported:
Current Chrome
Current Firefox
Current Safari
Current Edge
```

The exact policy depends on the project.

---

## 217. Verify Dependency Compatibility With Supported Browsers

A dependency can introduce browser requirements beyond your intended support matrix.

Check:

```text id="w3n9y7"
Package requirements
Bundle output
Polyfills
Browser targets
```

---

## 218. Verify Build Polyfills

If the application targets browsers without a newer API, make sure required compatibility layers actually exist.

Do not assume syntax transformation automatically provides API polyfills.

---

## 219. Production Checklist and Documentation

A production-ready project should include documentation for:

```text id="u5m9w4"
Setup
Environment variables
Build
Deployment
Database migrations
Rollback
Monitoring
Common failures
Recovery
```

Documentation should match the actual system.

---

## 220. Final Production Principles

1. Production readiness is about controlled risk, not perfection.
2. Verify critical user journeys.
3. Verify business rules at the authoritative boundary.
4. Test failure paths as deliberately as success paths.
5. Treat authentication and authorization as separate concerns.
6. Enforce authorization on trusted server infrastructure.
7. Validate all important external and user-provided data.
8. Protect secrets from source control, logs, and client bundles.
9. Validate production configuration before serving real traffic.
10. Never assume development and production environments are equivalent.
11. Build and test the real production artifact.
12. Verify routes, assets, metadata, and navigation after deployment.
13. Use HTTPS and secure authentication practices.
14. Verify CORS, CSRF protections, security headers, and rate limits where applicable.
15. Keep database schema and application versions compatible.
16. Use transactions for operations that require atomicity.
17. Verify external dependency failure behavior.
18. Use bounded retries, timeouts, and cancellation.
19. Prevent stale responses and duplicate operations.
20. Design caches and invalidation intentionally.
21. Test accessibility through actual workflows.
22. Test keyboard navigation, focus, zoom, responsive layouts, and assistive technology semantics.
23. Measure performance using real evidence.
24. Watch CPU, memory, network, database, and request behavior.
25. Keep optional third-party dependencies from unnecessarily becoming critical dependencies.
26. Provide useful logs without exposing sensitive information.
27. Use monitoring and actionable alerts.
28. Maintain health checks and graceful shutdown behavior.
29. Maintain reliable backups and periodically test restoration.
30. Document deployment, rollback, recovery, and operational procedures.
31. Record application release identity.
32. Use smoke tests after deployment.
33. Monitor the system after release rather than assuming success immediately.
34. Add regression tests after important production incidents.
35. Treat configuration and database migrations as part of the deployment lifecycle.
36. Keep production checklists evidence-based.
37. Automate repetitive verification wherever practical.
38. Match operational rigor to the actual risk and impact of the system.
39. Avoid checklist theater and false confidence.
40. Production readiness is the combination of correct software, secure boundaries, observable behavior, reliable operations, and a realistic recovery strategy.
