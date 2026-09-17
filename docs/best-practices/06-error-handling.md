# JavaScript Error Handling

## Overview

Errors are a normal part of software.

They can happen because:

```text id="2s4g9m"
User input is invalid
A network request fails
A resource does not exist
A dependency fails
A programmer makes a mistake
An external service is unavailable
Data has an unexpected shape
A timeout occurs
A system runs out of resources
```

Good error handling does not mean catching every error.

It means:

```text id="7t1k9d"
Detect failure
Understand its meaning
Preserve useful information
Recover when possible
Propagate when appropriate
Report when necessary
Fail safely when recovery is impossible
```

The goal is predictable failure behavior.

---

# Errors Are Part of the Contract

A function does not only have:

```text id="z2v9s6"
Inputs
Outputs
```

It may also have:

```text id="25qjqn"
Failure conditions
Thrown errors
Rejected Promises
Returned error states
Side effects during failure
```

For example:

```js id="2ynv5a"
function parseUser(data) {
  if (!data) {
    throw new Error(
      "User data is required."
    );
  }

  return data;
}
```

The function contract includes the possibility of failure.

---

# Do Not Hide Errors

Avoid:

```js id="l7r7r9"
try {
  saveUser(user);
} catch {
}
```

The operation may fail, but the caller receives no information.

An empty `catch` should be used only when the failure is intentionally ignored and that decision is understood.

---

# Catch Errors for a Reason

A `catch` block should normally do one or more of the following:

```text id="4h3w1j"
Recover
Transform the error
Add context
Log/report the failure
Notify the user
Clean up resources
Retry when appropriate
```

If none of these apply, letting the error propagate may be better.

---

# Let Higher Layers Handle Higher-Level Decisions

A low-level function may detect a failure:

```js id="9ymk45"
function parseUser(data) {
  if (!data) {
    throw new Error(
      "User data is required."
    );
  }

  return data;
}
```

A higher-level layer can decide how to respond:

```js id="11ay2j"
try {
  const user =
    parseUser(data);

  saveUser(user);
} catch (error) {
  showErrorMessage(
    "Unable to create the user."
  );
}
```

The low-level function does not need to know how the UI should display the error.

---

# Distinguish Programmer Errors From Expected Failures

Not every error has the same meaning.

Expected runtime failures:

```text id="9c16wq"
Invalid user input
Network unavailable
Missing resource
Authentication failure
Request timeout
```

Programming defects:

```text id="r1m8pv"
Calling a method on the wrong value
Incorrect assumptions
Broken invariants
Unreachable logic being reached
Incorrect data transformations
```

Expected failures may be recoverable.

Programming defects often need investigation rather than silent recovery.

---

# Do Not Use `try...catch` to Hide Programming Bugs

Avoid:

```js id="3q6n1v"
try {
  user.profile.address.city;
} catch {
  return "Unknown";
}
```

This can hide a real bug in the object structure.

If the property is legitimately optional, model that explicitly:

```js id="f97m7m"
return user?.profile?.address?.city;
```

Error handling should not replace correct data modeling.

---

# Use `Error` Objects

Prefer:

```js id="h3v3vi"
throw new Error(
  "User data is invalid."
);
```

over:

```js id="7ec3vc"
throw "User data is invalid.";
```

`Error` objects provide:

```text id="f2bq6v"
Message
Stack trace
Error type
Cause information when supported
```

---

# Do Not Throw Arbitrary Values

Avoid:

```js id="3e4w83"
throw "Something went wrong.";
```

Avoid:

```js id="nb8d6j"
throw 404;
```

Prefer:

```js id="q9a4jt"
throw new Error(
  "Something went wrong."
);
```

or a more specific error class when appropriate.

---

# Use Appropriate Error Types

JavaScript provides built-in error types such as:

```text id="q9f8pj"
Error
TypeError
ReferenceError
RangeError
SyntaxError
URIError
AggregateError
```

Use the type that accurately represents the failure when it adds meaningful information.

---

# `TypeError`

A `TypeError` commonly occurs when a value is used in an incompatible way.

For example:

```js id="s3x4j2"
const value = null;

value.toUpperCase();
```

The operation is invalid for the actual value.

---

# `RangeError`

A `RangeError` represents a value outside an allowed range.

For example:

```js id="7d1b4k"
function setPercentage(value) {
  if (
    value < 0 ||
    value > 100
  ) {
    throw new RangeError(
      "Percentage must be between 0 and 100."
    );
  }
}
```

---

# Custom Error Classes

When an application has meaningful domain-level failures, custom errors can make handling clearer.

```js id="3tc4z2"
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

Usage:

```js id="lp19vc"
throw new ValidationError(
  "Email is required."
);
```

---

# Custom Errors Should Represent Real Concepts

Useful:

```js id="up82qi"
ValidationError
AuthenticationError
AuthorizationError
NotFoundError
NetworkError
```

Avoid creating dozens of custom error classes without meaningful differences.

A new type should communicate useful semantics.

---

# Preserve Error Names

For custom errors:

```js id="oqnqcc"
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}
```

The `name` property helps identify the type when inspecting the error.

---

# Preserve the Original Error

When transforming an error, do not throw away the underlying cause.

Instead of:

```js id="4osaxj"
try {
  await saveUser(user);
} catch {
  throw new Error(
    "Failed to save user."
  );
}
```

consider:

```js id="xd0o1l"
try {
  await saveUser(user);
} catch (error) {
  throw new Error(
    "Failed to save user.",
    {
      cause: error,
    }
  );
}
```

The original error remains available as the cause.

---

# Error Causes Add Context

Suppose:

```js id="w5a5k5"
fetchUser();
```

fails because the network is unavailable.

A higher-level function can provide context:

```js id="a4f3gq"
try {
  await fetchUser();
} catch (error) {
  throw new Error(
    "Failed to load the current user.",
    {
      cause: error,
    }
  );
}
```

The new message explains where the failure occurred.

The cause preserves why it happened.

---

# Add Context at Boundaries

A low-level error:

```text id="0mbrwq"
Network request failed
```

may be technically correct.

A higher-level context:

```text id="zldvcz"
Failed to load the user profile
```

can be more useful to the layer that needs to recover or report the problem.

---

# Do Not Add Meaningless Error Wrappers

Avoid repeatedly doing:

```js id="t8g50j"
throw new Error(
  "Something failed.",
  {
    cause: error,
  }
);
```

at every function boundary.

Additional context should help the person handling the error.

---

# Preserve Useful Metadata

Custom errors may include structured information:

```js id="8qk8cn"
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
```

Usage:

```js id="zob6rk"
throw new ValidationError(
  "Email is required.",
  "email"
);
```

This allows a consumer to respond specifically.

---

# Error Messages Should Be Specific

Weak:

```js id="9vqa4e"
throw new Error(
  "Something went wrong."
);
```

Better:

```js id="x7v7uk"
throw new Error(
  "User email is required."
);
```

Specific errors reduce debugging time.

---

# Error Messages Should Describe the Actual Failure

Avoid:

```js id="zwz2o3"
throw new Error(
  "Invalid user."
);
```

if the real problem is specifically:

```text id="jk4w8v"
Missing email
```

Prefer:

```js id="q5ojx1"
throw new Error(
  "User email is required."
);
```

---

# Avoid Sensitive Information in Error Messages

Do not expose:

```text id="uc8iwc"
Passwords
Access tokens
API secrets
Session tokens
Private credentials
Sensitive personal data
```

in thrown errors or logs.

Weak:

```js id="rm9u9f"
throw new Error(
  `Login failed for password ${password}`
);
```

Never include secrets in error messages.

---

# Errors Should Be Safe for Their Audience

An internal error may contain technical information.

A user-facing message may need to be simpler:

```js id="8b6qaa"
showErrorMessage(
  "Unable to save your profile. Please try again."
);
```

The internal error can retain the technical details for debugging.

---

# Separate Internal Errors From User Messages

Avoid directly exposing raw server or database errors to users:

```js id="7ii7ie"
messageElement.textContent =
  error.message;
```

when the error might contain implementation details.

Instead:

```js id="e6j4o2"
messageElement.textContent =
  "Unable to save your profile.";
```

Log or report the technical error separately.

---

# User Messages Should Be Actionable

Good:

```text id="fy5x1z"
Unable to upload the file. Please try again.
```

Potentially better when relevant:

```text id="q1ixv4"
The file is too large. Choose a file smaller than 5 MB.
```

The user should understand what to do next when possible.

---

# Do Not Blame the User

Avoid messages such as:

```text id="z4kjq5"
You entered bad data.
You caused an error.
Invalid user.
```

Prefer neutral descriptions:

```text id="9jyn4f"
Please enter a valid email address.
```

Clear and respectful messages improve the user experience.

---

# Validate Before Performing Risky Operations

Instead of:

```js id="k03a6t"
saveUser({
  name: "",
});
```

validate first:

```js id="v4k3cz"
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError(
      "User name is required."
    );
  }

  return user;
}
```

Then:

```js id="s4e5p5"
const validUser =
  validateUser(user);

saveUser(validUser);
```

---

# Validate at System Boundaries

Validate data entering from:

```text id="7fnw3c"
Forms
HTTP requests
API responses
Local storage
URL parameters
Files
Third-party libraries
Environment variables
```

External data should not automatically be trusted.

---

# Do Not Validate the Same Data Everywhere

If validation is performed at an appropriate boundary:

```js id="hgm5k3"
const user =
  validateUser(requestData);
```

downstream code can work with the established contract.

Repeated identical validation creates noise and inconsistency.

---

# Do Not Trust External Data Automatically

This:

```js id="l5y7ty"
const user =
  await response.json();
```

does not guarantee that the returned value has the expected shape.

Validate when the external source is not trusted.

---

# Parsing and Validation Are Different

Parsing answers:

```text id="gl8xpw"
Can this representation be converted?
```

Validation answers:

```text id="eg3bt1"
Does the resulting value satisfy the required rules?
```

For example:

```js id="0w1vr1"
const data =
  JSON.parse(jsonText);
```

parses the JSON.

A separate validation step may be needed:

```js id="k7x8nq"
if (
  typeof data.name !== "string"
) {
  throw new ValidationError(
    "User name is required."
  );
}
```

---

# Do Not Use `try...catch` for Normal Control Flow

Avoid:

```js id="fhv5us"
try {
  JSON.parse(value);
} catch {
  return false;
}
```

when a dedicated validation strategy can be used.

There are cases where parsing exceptions are appropriate to handle.

The principle is not "never catch."

The principle is to use exceptions for exceptional failure rather than as the normal branching mechanism for every condition.

---

# Expected Invalid Input vs Exceptions

For some APIs, invalid user input may be better represented as a result:

```js id="q3k6q1"
function validateEmail(email) {
  return {
    isValid:
      email.includes("@"),
  };
}
```

For a lower-level operation where invalid input violates a required invariant, throwing can be appropriate:

```js id="pv4lzg"
function parseRequiredUser(data) {
  if (!data) {
    throw new Error(
      "User data is required."
    );
  }

  return data;
}
```

Choose the mechanism that matches the API semantics.

---

# Do Not Mix Error Strategies Arbitrarily

Avoid a function that sometimes:

```text id="sp4o3y"
Returns null
Throws Error
Returns false
Returns {}
Rejects Promise
```

for similar failures.

Choose a predictable contract.

---

# `null` as an Absence Result

Returning `null` can be appropriate when "not found" is a normal result.

```js id="gx5vtr"
function findUserById(
  users,
  userId
) {
  return (
    users.find(
      (user) =>
        user.id === userId
    ) ?? null
  );
}
```

The caller knows the function may return:

```text id="m2n0q4"
User
or
null
```

---

# Throw for Broken Preconditions

Suppose a function requires a user:

```js id="g4m13w"
function getUserRole(user) {
  if (!user) {
    throw new Error(
      "User is required."
    );
  }

  return user.role;
}
```

A missing required input violates the function contract.

Throwing can be appropriate.

---

# Error Handling and Invariants

If an application requires:

```text id="7p2g75"
Every user must have an email.
```

then a function responsible for creating users can enforce that invariant:

```js id="f9i4j5"
function createUser(user) {
  if (!user.email) {
    throw new ValidationError(
      "User email is required."
    );
  }

  return user;
}
```

After successful creation, downstream code can rely on the invariant.

---

# Do Not Repair Invalid Data Silently

Avoid:

```js id="e5z7ux"
function createUser(user) {
  return {
    ...user,
    email:
      user.email ??
      "unknown@example.com",
  };
}
```

when missing email should be an error.

Silent defaults can turn invalid data into valid-looking but incorrect data.

---

# Use Defaults When They Are Semantically Correct

A default is appropriate when the absence of a value has a defined meaning.

```js id="me9fpe"
function createSettings(
  options = {}
) {
  return {
    theme:
      options.theme ??
      "light",
  };
}
```

The default is part of the actual contract.

---

# Error Handling in Async Code

Promises represent asynchronous success or failure.

For example:

```js id="1vci3n"
fetchUser()
  .then(
    (user) => {
      renderUser(user);
    }
  )
  .catch(
    (error) => {
      showErrorMessage();
    }
  );
```

The rejection must be handled somewhere appropriate.

---

# Prefer `async`/`await` for Readable Async Error Handling

Example:

```js id="5esze0"
async function loadUser() {
  try {
    const user =
      await fetchUser();

    renderUser(user);
  } catch (error) {
    showErrorMessage(
      "Unable to load the user."
    );
  }
}
```

This often makes the control flow easier to follow.

---

# Do Not Catch and Re-Throw Without Adding Value

Avoid:

```js id="4r5p7h"
try {
  await fetchUser();
} catch (error) {
  throw error;
}
```

This does not add information.

Let the original error propagate.

---

# Catch and Add Context When Useful

Useful:

```js id="3byc9b"
try {
  await fetchUser();
} catch (error) {
  throw new Error(
    "Failed to load the profile.",
    {
      cause: error,
    }
  );
}
```

The higher-level message adds meaningful context.

---

# Catch Only What You Can Handle

Suppose:

```js id="jv2dz5"
async function loadUser() {
  try {
    return await fetchUser();
  } catch (error) {
    if (
      error instanceof NotFoundError
    ) {
      return null;
    }

    throw error;
  }
}
```

The function handles one known recoverable condition and propagates unknown failures.

This is often better than catching everything and returning a generic result.

---

# Narrow Catch Blocks

Prefer:

```js id="ywk9dx"
try {
  const user =
    await fetchUser();
  return user;
} catch (error) {
  // ...
}
```

over wrapping a huge amount of unrelated code:

```js id="0y6blj"
try {
  validateUser();
  normalizeUser();
  fetchUser();
  updateDOM();
  saveStorage();
  sendAnalytics();
} catch (error) {
  // ...
}
```

A broad catch may make it difficult to know which operation failed.

---

# Error Boundaries in Application Design

Different layers can handle different classes of failure:

```text id="l0d9pw"
Domain layer
→ Enforce invariants

Data layer
→ Handle transport/database failures

Application layer
→ Coordinate recovery

UI layer
→ Show user-facing feedback
```

This avoids placing every error decision in one function.

---

# Error Handling at Network Boundaries

Do not assume every HTTP response indicates application success.

For `fetch`, a rejected Promise usually indicates a network-level failure.

HTTP errors such as `404` or `500` still produce a `Response`.

Check:

```js id="u3xgws"
const response =
  await fetch(
    "/api/users"
  );

if (!response.ok) {
  throw new Error(
    `Request failed with status ${response.status}.`
  );
}
```

Then parse the expected response.

---

# Separate Network Errors From HTTP Errors

There are different failure categories:

```text id="z7zghv"
Network failure
→ The request could not be completed.

HTTP failure
→ The server responded with an error status.

Parsing failure
→ The response could not be interpreted.

Validation failure
→ The response shape is not acceptable.
```

Keeping these distinctions helps recovery logic.

---

# Handle `fetch` Failures Intentionally

Example:

```js id="exxug2"
async function fetchUser(id) {
  let response;

  try {
    response =
      await fetch(
        `/api/users/${id}`
      );
  } catch (error) {
    throw new Error(
      "Network request failed.",
      {
        cause: error,
      }
    );
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user: ${response.status}.`
    );
  }

  return response.json();
}
```

The function distinguishes transport errors from HTTP status failures.

---

# Timeouts

Network operations can take too long.

When supported by the API, use cancellation mechanisms such as `AbortController`:

```js id="uyjg1k"
const controller =
  new AbortController();

const timeoutId =
  setTimeout(
    () => controller.abort(),
    5000
  );

try {
  const response =
    await fetch(
      "/api/users",
      {
        signal:
          controller.signal,
      }
    );

  return response;
} finally {
  clearTimeout(timeoutId);
}
```

Cancellation is part of robust asynchronous error handling.

---

# Distinguish Cancellation From Failure

A request aborted by the application is not always the same as a server failure.

For example:

```js id="v1xyj2"
try {
  await fetch(
    "/api/users",
    {
      signal:
        controller.signal,
    }
  );
} catch (error) {
  if (
    error.name === "AbortError"
  ) {
    return;
  }

  throw error;
}
```

The application intentionally stopped the operation.

That may not require the same user message as a network failure.

---

# Retries

Retries can help with transient failures:

```text id="6x8cfs"
Temporary network error
Temporary service unavailable
Rate-limited request
```

But retries should be deliberate.

Do not retry indefinitely.

---

# Exponential Backoff

A retry strategy can increase the delay:

```js id="l0gk3g"
const delay =
  1000 * 2 ** attempt;
```

The exact strategy depends on the system.

A retry should have:

```text id="6dyv09"
Maximum attempts
Maximum delay
Clear retryable conditions
Cancellation
```

---

# Do Not Retry Every Error

Do not automatically retry:

```text id="5tqj28"
Invalid user input
Authentication failure
Authorization failure
Malformed request
Permanent validation errors
```

Retries are primarily useful for failures that may succeed later.

---

# Idempotency Matters

Be careful when retrying operations that change state.

For example:

```text id="37ga1l"
POST /create-order
```

may create a duplicate order if the first request succeeded but the response was lost.

Retry design should consider whether the operation is idempotent.

---

# Error Handling for Storage APIs

Browser storage can fail.

For example:

```js id="k4p4a7"
try {
  localStorage.setItem(
    "theme",
    "dark"
  );
} catch (error) {
  // Handle unavailable storage.
}
```

Possible causes include:

```text id="19qpv9"
Storage restrictions
Quota problems
Privacy settings
Security errors
```

Do not assume browser storage is always available.

---

# Error Handling for JSON Parsing

External JSON may be malformed:

```js id="u8yvzc"
try {
  const data =
    JSON.parse(rawJson);
} catch (error) {
  // Handle malformed JSON.
}
```

Add context when the source matters:

```js id="8lc7b7"
try {
  return JSON.parse(rawJson);
} catch (error) {
  throw new Error(
    "Failed to parse cached user data.",
    {
      cause: error,
    }
  );
}
```

---

# Error Handling for User Input

Validate close to the input boundary:

```js id="xd5azn"
function submitForm(formData) {
  if (!formData.email) {
    throw new ValidationError(
      "Email is required."
    );
  }

  if (!formData.email.includes("@")) {
    throw new ValidationError(
      "Enter a valid email address."
    );
  }

  return createUser(formData);
}
```

The UI can then convert validation failures into appropriate messages.

---

# Do Not Use Exceptions for Every Form Error

For forms, returning a structured validation result can often be clearer:

```js id="es5cyy"
function validateForm(formData) {
  const errors = {};

  if (!formData.email) {
    errors.email =
      "Email is required.";
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
}
```

This is a normal validation workflow rather than an unexpected runtime failure.

---

# Form Validation vs System Failure

Compare:

```text id="9w9zw8"
User did not enter an email
→ Validation state
```

with:

```text id="j0wzgr"
Database unavailable
→ System failure
```

Treating both as the same kind of error can make application behavior confusing.

---

# Error Handling in DOM Code

DOM operations can fail if the expected element does not exist.

Weak:

```js id="8m5x0x"
document.querySelector(
  "#submit"
).addEventListener(
  "click",
  handleClick
);
```

If the element is absent, this can produce a runtime error.

Safer when absence is valid:

```js id="c6a0n7"
const submitButton =
  document.querySelector(
    "#submit"
  );

if (submitButton) {
  submitButton.addEventListener(
    "click",
    handleClick
  );
}
```

The correct strategy depends on whether the missing element represents:

```text id="rvuh23"
Expected optional absence
or
A programming bug
```

---

# Do Not Hide Missing Required Elements

If a page contract guarantees that an element exists:

```js id="m2mbpf"
const submitButton =
  document.querySelector(
    "#submit"
  );

if (!submitButton) {
  throw new Error(
    "Required submit button was not found."
  );
}
```

This can be better than silently doing nothing.

---

# Error Handling in Event Handlers

An event handler can catch known operational failures:

```js id="lw3y2w"
async function handleSubmit(event) {
  event.preventDefault();

  try {
    await saveUser();
    showSuccess();
  } catch (error) {
    showError();
  }
}
```

The handler is a useful boundary because it can convert application failures into UI feedback.

---

# Avoid Unhandled Promise Rejections

If a Promise can reject:

```js id="jzt5dl"
saveUser();
```

without handling or awaiting it may produce an unhandled rejection depending on the environment.

Prefer:

```js id="f6a45x"
await saveUser();
```

inside a suitable `try...catch`:

```js id="y7j8zu"
try {
  await saveUser();
} catch (error) {
  showError();
}
```

or intentionally handle the returned Promise:

```js id="4zv7m8"
saveUser().catch(
  handleError
);
```

---

# Fire-and-Forget Async Work

Sometimes a background operation is intentionally not awaited.

Make the choice explicit:

```js id="8zn4dl"
void sendAnalytics(
  eventData
).catch(
  reportAnalyticsError
);
```

This communicates that the Promise is intentionally detached from the current flow.

---

# Do Not Swallow Background Errors

This:

```js id="k7j0rc"
void sendAnalytics();
```

may leave failures unobserved.

If the failure matters, add a handler:

```js id="hcs6dd"
void sendAnalytics().catch(
  reportAnalyticsError
);
```

---

# Promise Combinators and Errors

`Promise.all()` rejects when one Promise rejects:

```js id="2gjg2u"
const results =
  await Promise.all([
    fetchUser(),
    fetchProjects(),
  ]);
```

If one operation fails, the combined Promise rejects.

Use this when all operations are required.

---

# `Promise.allSettled()`

When each operation should be allowed to complete independently:

```js id="r1w8eo"
const results =
  await Promise.allSettled([
    fetchUser(),
    fetchProjects(),
  ]);
```

The result includes both fulfilled and rejected outcomes.

This is useful for batch operations where partial failure is acceptable.

---

# Choose Promise Combinators by Failure Semantics

```text id="4q8z5j"
Promise.all
→ All operations are required.

Promise.allSettled
→ All results matter, even failures.

Promise.race
→ First settled result matters.

Promise.any
→ First fulfilled result matters.
```

The choice should reflect the desired failure model.

---

# Aggregate Errors

`AggregateError` can represent multiple failures:

```js id="m79x6k"
throw new AggregateError(
  [
    new Error(
      "User request failed."
    ),
    new Error(
      "Project request failed."
    ),
  ],
  "Multiple requests failed."
);
```

Use it when several errors genuinely belong to one operation.

---

# Error Handling and Logging

Logs should provide useful diagnostic information:

```text id="4o3e98"
What failed
Where it failed
When it failed
Relevant identifiers
Useful context
Original cause
```

Do not log sensitive secrets.

---

# Do Not Log the Same Error Excessively

An error may be:

```text id="5cgy85"
Detected
Wrapped
Logged
Reported
Displayed
```

at multiple layers.

If every layer logs the same error, one failure can generate many duplicate entries.

Define where operational errors are logged or reported.

---

# Error Reporting Boundaries

A useful pattern is:

```text id="7id0av"
Low-level function
→ throws

Higher-level function
→ adds context

Application boundary
→ logs/reports

UI boundary
→ shows user message
```

Not every layer needs to log.

---

# Logging and Stack Traces

Do not replace a full error with only its message:

```js id="djn4x9"
console.error(
  error.message
);
```

This loses stack information.

Prefer:

```js id="x9df1q"
console.error(error);
```

when technical logging is appropriate.

---

# Do Not Expose Stack Traces to Users

A stack trace is useful for developers:

```text id="lueaj8"
Error: Failed to save user
...
```

It is usually not appropriate as a user-facing message.

Separate diagnostic output from presentation.

---

# Error Monitoring

Production applications may send unhandled or important errors to monitoring systems.

Examples include:

```text id="2u2wd8"
Runtime errors
Unhandled Promise rejections
Network failures
Performance-related failures
```

The specific monitoring system depends on the application.

The important principle is to capture failures without exposing sensitive information.

---

# Error Handling and Security

Errors can reveal internal details if handled poorly.

Avoid exposing:

```text id="6dqjl1"
Database queries
File paths
Internal service names
Credentials
Stack traces
Authentication details
```

to untrusted users.

---

# Validate Before Trusting Errors From External Sources

Even error payloads from servers are external data.

For example:

```js id="4ekym1"
const payload =
  await response.json();
```

Do not assume:

```js id="9uj5x9"
payload.message
```

has a valid string type.

Validate external error payloads when the API contract matters.

---

# Error Codes

Sometimes structured error codes are useful:

```js id="zdv27m"
const error = {
  code: "USER_NOT_FOUND",
  message: "User was not found.",
};
```

Codes can help consumers respond programmatically.

Use stable codes for important machine-readable distinctions.

---

# Do Not Parse Human Error Messages

Avoid:

```js id="uxi3c5"
if (
  error.message.includes(
    "not found"
  )
) {
  // ...
}
```

Human-readable text can change.

Prefer a structured error type or code:

```js id="1qv0ah"
if (
  error instanceof NotFoundError
) {
  // ...
}
```

or:

```js id="4q8h9p"
if (
  error.code ===
  "USER_NOT_FOUND"
) {
  // ...
}
```

---

# Error Codes Should Be Stable

A machine-readable code should not depend on the exact human wording.

For example:

```js id="85ga7j"
{
  code: "AUTH_REQUIRED",
  message: "Please sign in to continue.",
}
```

The message can change without breaking the application logic.

---

# Error Handling and Internationalization

User-facing messages may need translation.

Do not hard-code technical exception messages directly into every UI.

Prefer mapping known errors to user-facing messages:

```js id="9i75d7"
function getUserMessage(error) {
  if (
    error instanceof ValidationError
  ) {
    return error.message;
  }

  if (
    error instanceof NetworkError
  ) {
    return "Unable to connect. Please try again.";
  }

  return "Something went wrong.";
}
```

In larger applications, localization keys can provide a more scalable solution.

---

# Do Not Depend on Error Message Language

Application logic should not inspect translated text.

Use:

```text id="k8u89k"
Error type
Error code
Structured metadata
```

for programmatic decisions.

---

# Error Recovery

Recovery means restoring the application to a useful state.

Examples:

```text id="j8o0pk"
Retry a transient request
Use cached data
Ask for corrected input
Refresh authentication
Remove invalid local data
Cancel the operation
```

Recovery should not hide the original problem.

---

# Retry With Backoff

Example:

```js id="5kw9kp"
async function retry(
  operation,
  maxAttempts = 3
) {
  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt += 1
  ) {
    try {
      return await operation();
    } catch (error) {
      if (
        attempt ===
        maxAttempts
      ) {
        throw error;
      }

      const delay =
        2 ** (attempt - 1) * 1000;

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            delay
          )
      );
    }
  }
}
```

A production retry implementation should additionally determine which errors are retryable.

---

# Do Not Retry Forever

A retry loop without a bound is dangerous:

```js id="62jqtg"
while (true) {
  try {
    return await operation();
  } catch {
    // retry forever
  }
}
```

It can:

```text id="k72ou1"
Consume resources
Delay recovery
Create duplicate operations
Overload the server
Prevent the application from progressing
```

---

# Error Handling and Cancellation

Long-running operations should often support cancellation.

Example:

```js id="r01eb4"
async function loadProjects(signal) {
  const response =
    await fetch(
      "/api/projects",
      { signal }
    );

  return response.json();
}
```

The caller controls cancellation:

```js id="f3r09s"
const controller =
  new AbortController();

loadProjects(
  controller.signal
);
```

Then:

```js id="t1p5mx"
controller.abort();
```

This avoids unnecessary work.

---

# Clean Up in `finally`

Use `finally` for cleanup that should happen whether the operation succeeds or fails:

```js id="5p1z8s"
const timeoutId =
  setTimeout(
    handleTimeout,
    5000
  );

try {
  await saveUser();
} catch (error) {
  handleError(error);
} finally {
  clearTimeout(timeoutId);
}
```

`finally` is useful for:

```text id="6gv9sm"
Timers
Loading flags
Subscriptions
Temporary resources
Locks
Cleanup operations
```

---

# Do Not Put Recovery Logic in `finally`

Avoid returning from `finally`:

```js id="x5wqv4"
try {
  return await saveUser();
} finally {
  return null;
}
```

This can override the original return value or error.

Use `finally` for cleanup, not unrelated control flow.

---

# Cleanup Must Also Be Safe

Cleanup code can itself fail.

Avoid introducing another hidden failure during error recovery.

Where necessary, keep cleanup operations simple and robust.

---

# Error Handling and Resource Ownership

If a function creates a resource:

```text id="y6ay0m"
Timer
Subscription
Listener
File handle
Abort controller
Temporary cache entry
```

it should know how that resource is cleaned up.

This is especially important when errors interrupt normal execution.

---

# Error Handling in Event Listeners

If an event handler performs async work:

```js id="5ckj0f"
button.addEventListener(
  "click",
  async () => {
    try {
      await saveUser();
    } catch (error) {
      handleError(error);
    }
  }
);
```

Handle the Promise rejection inside the event flow.

Do not assume the event system will automatically handle rejected Promises for you.

---

# Error Handling and State Machines

For UI applications, explicit state can make failures easier to represent:

```js id="syq2ji"
const state = {
  status: "error",
  error: new Error(
    "Failed to load projects."
  ),
};
```

Then the UI can render according to:

```text id="58g04r"
idle
loading
success
error
```

This is often clearer than several unrelated booleans.

---

# Avoid Contradictory Error State

Weak:

```js id="7t4q6s"
const state = {
  isLoading: true,
  hasError: true,
  hasData: true,
};
```

These values may become contradictory.

Prefer one explicit status:

```js id="cz0t8s"
const state = {
  status: "error",
  error: new Error(
    "Failed to load projects."
  ),
};
```

---

# Error Handling in React

React applications often need to distinguish:

```text id="rrh3fa"
Rendering errors
Event-handler errors
Async errors
Network errors
Validation errors
```

Not all of these are handled by the same mechanism.

For rendering failures, React Error Boundaries can provide a UI fallback.

---

# Error Boundaries Are Not Network Error Handlers

An Error Boundary is designed to catch errors during rendering and related React lifecycle behavior.

It is not a replacement for:

```text id="8sx6px"
try/catch around fetch
Promise rejection handling
Form validation
API error handling
```

Use the mechanism appropriate to the failure.

---

# Do Not Put All Errors Into One Global Handler

A global fallback is useful for unexpected failures.

But known errors should be handled closer to where their meaning is understood.

For example:

```text id="a8ug1m"
Validation
→ Form boundary

Network failure
→ Data-fetching boundary

Unexpected rendering failure
→ UI error boundary

Fatal application failure
→ Global fallback
```

---

# Error Handling and Logging Strategy

A mature application should distinguish:

```text id="0n7lqj"
Expected user errors
Operational failures
Unexpected programming defects
Security-sensitive failures
```

These categories may require different:

```text id="b3c4es"
User messages
Logging levels
Monitoring
Recovery strategies
```

---

# Do Not Treat Every Error as Fatal

For example:

```text id="4l8y3m"
Optional analytics request failed
```

may not prevent the main feature from working.

Whereas:

```text id="c5pgb3"
Primary authentication failed
```

may prevent the user from proceeding.

Error severity should match actual impact.

---

# Fail Fast When an Invariant Is Broken

If the program reaches a state that should be impossible:

```js id="d7e3gv"
if (!user.id) {
  throw new Error(
    "Invariant violation: user ID is missing."
  );
}
```

Failing fast can prevent corrupted state from spreading.

Do not silently continue with invalid assumptions.

---

# Defensive Programming Has Limits

Do not write:

```js id="5pztwr"
try {
  everything();
} catch {
  return defaultValue;
}
```

simply to prevent crashes.

This can hide serious defects.

Defend against expected failures.

Expose unexpected bugs.

---

# Error Handling and `undefined`

Do not automatically treat `undefined` as an error.

For example:

```js id="8r0t4s"
const user =
  users.find(
    (item) =>
      item.id === userId
  );
```

`undefined` can legitimately mean:

```text id="0t6s14"
No matching user was found.
```

Decide whether that is expected before throwing.

---

# Error Handling and `null`

Likewise, `null` can represent intentional absence:

```js id="8moc0q"
const selectedUser = null;
```

Do not throw merely because a value is null.

Throw when the absence violates the function's contract.

---

# Errors Should Preserve Causality

A useful chain looks like:

```text id="xg9n8u"
Original database error
        ↓
Repository context
        ↓
Application context
        ↓
User-facing recovery
```

Do not destroy the original cause at each layer.

---

# Error Wrapping Pattern

```js id="m68g32"
async function getUserProfile(id) {
  try {
    return await userRepository.findById(id);
  } catch (error) {
    throw new Error(
      "Failed to load user profile.",
      {
        cause: error,
      }
    );
  }
}
```

The upper layer gains context without losing the lower-level failure.

---

# Avoid Double Messages

Avoid creating:

```text id="u2u2oc"
"Failed to load profile: Failed to fetch user: Network request failed: Connection failed"
```

by concatenating messages at every layer.

Structured causes preserve the chain without producing unreadable text.

---

# Error Handling Checklist

Before finalizing code, ask:

```text id="x2asdw"
[ ] What can fail here?

[ ] Which failures are expected?

[ ] Which failures indicate programming bugs?

[ ] Is the error contract predictable?

[ ] Should this function throw, return null,
    return a result, or reject a Promise?

[ ] Is the error caught at the correct boundary?

[ ] Does catch actually recover or add useful context?

[ ] Is the original cause preserved?

[ ] Is the error message specific?

[ ] Does the message expose sensitive information?

[ ] Is the user-facing message separated from
    the technical error?

[ ] Are network and HTTP failures distinguished?

[ ] Are retry decisions deliberate?

[ ] Is retry bounded?

[ ] Is cancellation supported where appropriate?

[ ] Is cleanup performed in finally when needed?

[ ] Are unexpected failures allowed to surface?

[ ] Are duplicate logs avoided?
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text id="7o7f0p"
Use Error objects rather than arbitrary thrown values.

Use custom error classes when they represent
real domain distinctions.

Write specific error messages.

Preserve original errors with cause when wrapping them.

Catch errors only when there is something useful to do.

Do not silently swallow failures.

Do not use exceptions to replace ordinary validation logic.

Keep error handling close to the layer that understands
the failure.

Let unexpected errors propagate.

Separate technical errors from user-facing messages.

Never expose secrets or sensitive information in errors.

Validate external data at system boundaries.

Distinguish validation, network, HTTP, parsing,
and programming failures.

Retry only when the failure is likely to be transient.

Bound retries.

Support cancellation for long-running operations.

Use finally for cleanup.

Avoid duplicate logging.

Fail fast when important invariants are broken.

Keep error contracts predictable.
```

---

# Final Principles

```text id="m4l5b7"
Errors are part of the API contract.

Do not catch errors without a reason.

Do not hide programming defects.

Use specific errors for meaningful distinctions.

Preserve error causes.

Add context at useful boundaries.

Separate recovery from reporting.

Separate technical errors from user messages.

Treat validation failures differently from system failures.

Retry only when retrying makes sense.

Always bound retries.

Use cancellation for work that may outlive its usefulness.

Clean up resources reliably.

Keep error handling predictable.

Fail safely when recovery is impossible.
```

---

# Summary

Good error handling is not about preventing every error from reaching the surface.

It is about giving every failure an intentional path:

```text id="z0s3qk"
Failure
   ↓
Classification
   ↓
Handling decision
   ↓
Recovery / Propagation
   ↓
Reporting
   ↓
User feedback when appropriate
```

The most important distinction is:

```text id="1bqq8p"
Expected failure
→ Handle intentionally.

Unexpected programming defect
→ Preserve and expose enough information to fix it.
```

A strong error-handling strategy produces code that is:

```text id="4ec7j4"
Predictable
Debuggable
Recoverable
Secure
Maintainable
```

The objective is not to make errors disappear.

The objective is to make failure behavior understandable and useful.
