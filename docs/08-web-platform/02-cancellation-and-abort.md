# Cancellation and Abort

Asynchronous work sometimes becomes unnecessary.

Examples include:

* A user starts a new search before the previous request finishes.
* A request exceeds an application-defined deadline.
* A component or view no longer needs a result.
* Several operations share a cancellation signal.

The Abort APIs provide a standard cancellation mechanism.

## AbortController

Create a controller:

```js
const controller = new AbortController();
```

Pass its signal to an operation:

```js
const response = await fetch(
  "/api/users",
  {
    signal: controller.signal
  }
);
```

Cancel the operation:

```js
controller.abort();
```

An aborted fetch rejects with an `AbortError`.

```js
try {
  const response = await fetch("/api/users", {
    signal: controller.signal
  });

  const data = await response.json();

  console.log(data);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was canceled.");
  } else {
    throw error;
  }
}
```

## Why Cancellation Matters

Cancellation is not the same as error recovery.

If a user changes a search query:

```text
search("java")
        ↓
request A starts
        ↓
search("javascript")
        ↓
request B starts
        ↓
request A becomes irrelevant
```

Allowing request A to complete can create a race condition if its result updates the UI after request B.

Canceling stale work avoids this problem.

## Replacing an Active Request

A common pattern:

```js
let controller;

async function search(query) {
  controller?.abort();

  controller = new AbortController();

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(query)}`,
      {
        signal: controller.signal
      }
    );

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    throw error;
  }
}
```

The optional chaining call:

```js
controller?.abort();
```

prevents an error when no previous controller exists.

## AbortSignal

The controller owns the cancellation operation.

The signal communicates cancellation to the asynchronous operation.

```js
const controller = new AbortController();

console.log(controller.signal.aborted);

controller.abort();

console.log(controller.signal.aborted);
```

Once a signal has been aborted, it remains aborted.

Create a new controller for a new operation.

## Canceling Multiple Operations

The same signal can be passed to multiple operations that should be canceled together:

```js
const controller = new AbortController();

const first = fetch("/api/users", {
  signal: controller.signal
});

const second = fetch("/api/projects", {
  signal: controller.signal
});

controller.abort();
```

Both operations receive the same cancellation signal.

## Cancellation Is Part of Application Control Flow

A robust asynchronous application should support both paths:

```text
Start
  ↓
Work becomes relevant
  ↓
Operation runs
  ↓
Operation completes
```

or:

```text
Start
  ↓
Work becomes unnecessary
  ↓
Abort
  ↓
Handle cancellation
```

Cancellation should be treated as an expected control-flow path rather than automatically treated as a system failure.

## Common Mistakes

### Reusing an Aborted Controller

Do not:

```js
const controller = new AbortController();

controller.abort();

fetch("/api/users", {
  signal: controller.signal
});
```

The signal is already aborted.

Create a new controller for the new operation.

### Logging Every Abort as a Real Error

An intentional cancellation is often expected behavior:

```js
if (error.name === "AbortError") {
  return;
}
```

Handle genuine failures separately.

## References

* AbortController
* AbortSignal
* Fetch API cancellation
