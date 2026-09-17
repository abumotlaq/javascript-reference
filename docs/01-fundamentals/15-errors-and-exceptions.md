# Errors and Exceptions

JavaScript provides built-in error objects and the `throw` statement for reporting exceptional situations.

## try...catch

```js
try {
  JSON.parse("invalid");
} catch (error) {
  console.error(error.message);
}
```

## finally

```js
try {
  console.log("Work started.");
} catch (error) {
  console.error(error.message);
} finally {
  console.log("Cleanup completed.");
}
```

## throw

```js
function getUserId(value) {
  if (!value) {
    throw new Error("User ID is required.");
  }

  return value;
}
```

## Error Types

```js
try {
  null.toString();
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
```

Common built-in error types include `Error`, `TypeError`, `ReferenceError`, `RangeError`, `SyntaxError`, and `URIError`.

## Custom Error Classes

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Invalid value.");
```

Use custom errors when the calling code needs to distinguish a specific failure category.

## Guard Clauses

```js
function calculateTotal(price, quantity) {
  if (!Number.isFinite(price)) {
    throw new TypeError("Price must be a number.");
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new RangeError("Quantity must be a non-negative integer.");
  }

  return price * quantity;
}
```

## Rethrowing

```js
function loadData() {
  try {
    JSON.parse("invalid");
  } catch (error) {
    console.error("Logging error:", error.message);
    throw error;
  }
}
```

## Avoid Swallowing Errors

```js
try {
  JSON.parse("invalid");
} catch (error) {
  console.error("Parsing failed:", error.message);
}
```

Do not use an empty `catch` block when the failure matters to the application.

## Error Handling with Async Code

Promise and `async`/`await` error handling are covered in the Async JavaScript section.
