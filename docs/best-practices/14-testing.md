# Testing

## Overview

Testing is the practice of verifying that software behaves according to its intended contract.

Good testing is not about producing the largest possible number of tests. It is about creating reliable feedback that helps developers detect incorrect behavior, prevent regressions, and refactor safely.

Effective tests should be:

* Focused
* Deterministic
* Readable
* Maintainable
* Fast enough for their purpose
* Independent when possible
* Representative of important behavior

Testing should support software design rather than become a separate layer of complexity.

---

## 1. Test Behavior, Not Implementation Details

A test should primarily verify what the code does.

Consider:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

A useful test checks the result:

```js
const result = calculateTotal([
  { price: 10 },
  { price: 20 }
]);

console.assert(result === 30);
```

The test does not need to know how `reduce()` was used.

This allows the implementation to change without forcing the test to change unnecessarily.

---

## 2. Tests Should Express Intent

A good test communicates what behavior is expected.

Weak:

```js
console.assert(result === 30);
```

The reader may need to inspect the surrounding code to understand what `30` represents.

Clearer:

```js
const total = calculateTotal([
  { price: 10 },
  { price: 20 }
]);

console.assert(
  total === 30,
  "Total should equal the sum of item prices"
);
```

Readable tests act as executable documentation.

---

## 3. Test the Contract

A function contract usually defines:

* Accepted inputs
* Expected outputs
* Side effects
* Errors
* Important edge cases

Example:

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}
```

Tests should cover both successful and invalid behavior:

```js
console.assert(divide(10, 2) === 5);

try {
  divide(10, 0);
  console.assert(false, "Expected an error");
} catch (error) {
  console.assert(
    error.message === "Cannot divide by zero"
  );
}
```

The tests document the function's contract.

---

## 4. Arrange, Act, Assert

A simple structure for many tests is:

1. Arrange the inputs.
2. Act by executing the code.
3. Assert the result.

Example:

```js
const items = [
  { price: 10 },
  { price: 15 }
];

const total = calculateTotal(items);

console.assert(total === 25);
```

The structure becomes more obvious in a test framework:

```js
test("calculates the total price", () => {
  const items = [
    { price: 10 },
    { price: 15 }
  ];

  const total = calculateTotal(items);

  expect(total).toBe(25);
});
```

Keeping these phases conceptually separate improves readability.

---

## 5. Use One Logical Assertion Per Behavior

A test does not necessarily need exactly one assertion, but it should usually verify one logical behavior.

Good:

```js
test("normalizes a username", () => {
  const result = normalizeUsername("  OSAMA  ");

  expect(result).toBe("osama");
});
```

Less focused:

```js
test("user utilities", () => {
  expect(normalizeUsername("  OSAMA  ")).toBe("osama");
  expect(calculateTotal([{ price: 10 }])).toBe(10);
  expect(formatCurrency(10)).toBe("$10.00");
});
```

The second test combines unrelated behaviors.

When it fails, the failure provides less useful information.

---

## 6. Keep Tests Independent

A test should not depend on another test having run first.

Avoid shared mutable state:

```js
let users = [];

test("adds a user", () => {
  users.push({
    name: "Osama Abu Motlaq"
  });
});

test("contains one user", () => {
  expect(users.length).toBe(1);
});
```

The second test depends on the first.

Prefer isolated setup:

```js
test("contains one user after adding a user", () => {
  const users = [];

  users.push({
    name: "Osama Abu Motlaq"
  });

  expect(users.length).toBe(1);
});
```

Independent tests are easier to run, reorder, parallelize, and debug.

---

## 7. Deterministic Tests

A deterministic test produces the same result every time when the code and test inputs have not changed.

Avoid relying on:

* Current time
* Random values
* Network availability
* Machine-specific paths
* External services
* Shared environment state
* Execution order

Example of a fragile test:

```js
test("creates a timestamp", () => {
  const createdAt = new Date();

  expect(createdAt.getFullYear()).toBe(2026);
});
```

This will eventually fail because the current year changes.

Prefer controlling the dependency:

```js
function createTimestamp(now = new Date()) {
  return now.toISOString();
}
```

Then:

```js
test("creates a timestamp from the provided time", () => {
  const now = new Date("2026-01-01T00:00:00Z");

  expect(createTimestamp(now))
    .toBe("2026-01-01T00:00:00.000Z");
});
```

---

## 8. Avoid Testing the Current Environment

Environment-dependent tests are difficult to reproduce.

Weak:

```js
test("uses the local timezone", () => {
  const date = new Date();
  expect(date.toString()).toContain("GMT");
});
```

The result can vary between machines.

Prefer explicit inputs and controlled configuration.

```js
function formatDate(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone
  }).format(date);
}
```

Test with a known timezone:

```js
test("formats a date in a specified timezone", () => {
  const date = new Date("2026-01-01T12:00:00Z");

  const result = formatDate(
    date,
    "UTC"
  );

  expect(result).toBe("1/1/2026");
});
```

---

## 9. Test Edge Cases

Most bugs do not come from the obvious happy path.

Consider:

* Empty arrays
* Empty strings
* Zero
* Negative numbers
* Very large values
* `null`
* `undefined`
* Missing properties
* Duplicate values
* Boundary values
* Invalid input

Example:

```js
function calculateAverage(values) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce(
    (total, value) => total + value,
    0
  ) / values.length;
}
```

Tests:

```js
test("calculates the average", () => {
  expect(calculateAverage([10, 20, 30])).toBe(20);
});

test("returns zero for an empty array", () => {
  expect(calculateAverage([])).toBe(0);
});
```

---

## 10. Boundary Testing

Boundary values are particularly important.

Suppose a function accepts values from `0` to `100`.

```js
function isValidScore(score) {
  return score >= 0 && score <= 100;
}
```

Important tests include:

```js
isValidScore(0);
isValidScore(100);
isValidScore(-1);
isValidScore(101);
```

Boundary tests help reveal off-by-one errors.

---

## 11. Test Invalid Inputs

Do not test only valid input.

Example:

```js
function getUserDisplayName(user) {
  if (!user || typeof user.name !== "string") {
    throw new TypeError("Invalid user");
  }

  return user.name;
}
```

Test invalid inputs:

```js
test("rejects an invalid user", () => {
  expect(() => getUserDisplayName(null))
    .toThrow("Invalid user");
});
```

Invalid-input behavior should be intentional rather than accidental.

---

## 12. Test Error Behavior Explicitly

Errors are part of the contract.

```js
function parseAge(value) {
  const age = Number(value);

  if (!Number.isInteger(age) || age < 0) {
    throw new Error("Invalid age");
  }

  return age;
}
```

Test the error:

```js
test("rejects an invalid age", () => {
  expect(() => parseAge("-1"))
    .toThrow("Invalid age");
});
```

A test that only checks successful results leaves an important part of the behavior unverified.

---

## 13. Do Not Assert Unnecessary Details

Tests can become fragile when they verify details that users do not care about.

Suppose:

```js
function getUser() {
  return {
    id: 1,
    name: "Osama Abu Motlaq",
    role: "developer",
    internalCacheKey: "abc123"
  };
}
```

A test may only need:

```js
expect(user.name).toBe("Osama Abu Motlaq");
```

It may not need to assert every internal implementation field.

Test the behavior that matters.

---

## 14. Avoid Overspecified Tests

Overspecified tests verify too much.

Weak:

```js
expect(result).toEqual({
  id: 1,
  name: "Osama Abu Motlaq",
  role: "developer",
  updatedAt: "2026-01-01T00:00:00.000Z",
  internalFlag: false
});
```

If only the `name` and `role` are relevant to the behavior, assert those properties.

This reduces unnecessary coupling between tests and implementation.

---

## 15. Test Pure Functions Directly

Pure functions are easy to test.

```js
function addTax(price, rate) {
  return price + price * rate;
}
```

Test:

```js
test("adds tax to a price", () => {
  expect(addTax(100, 0.1)).toBe(110);
});
```

No DOM, network, database, or browser setup is necessary.

This is one reason separating pure business logic from side effects is useful.

---

## 16. Isolate Side Effects

Suppose:

```js
function saveUser(user) {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user)
  });
}
```

Network behavior should not be required in every test of user business logic.

Separate the pure logic:

```js
function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim()
  };
}
```

Then test each layer independently.

```js
test("normalizes the user name", () => {
  const result = normalizeUser({
    name: "  Osama Abu Motlaq  "
  });

  expect(result.name)
    .toBe("Osama Abu Motlaq");
});
```

---

## 17. Unit Tests

Unit tests verify small pieces of behavior in isolation.

Typical units include:

* Functions
* Pure transformations
* Utility modules
* Validation logic
* Parsers
* Small classes

Example:

```js
function isAdult(age) {
  return age >= 18;
}
```

Test:

```js
test("returns true for adults", () => {
  expect(isAdult(18)).toBe(true);
});
```

Unit tests are usually fast and numerous.

---

## 18. Integration Tests

Integration tests verify that multiple pieces work together.

For example:

```text
User Service
    ↓
Repository
    ↓
Database Adapter
```

An integration test can verify the collaboration between those layers.

Integration tests catch problems that isolated unit tests may miss.

Examples include:

* Incorrect data mapping
* Invalid module integration
* Repository behavior
* API/database interaction
* Authentication flow integration

---

## 19. End-to-End Tests

End-to-end tests verify complete user-facing workflows.

Example flow:

```text
Open application
    ↓
Enter credentials
    ↓
Submit form
    ↓
Server authenticates user
    ↓
Dashboard appears
```

E2E tests provide high confidence in system behavior but are usually slower and more complex than unit tests.

They should focus on important workflows rather than every possible detail.

---

## 20. Use the Right Test Level

A practical testing structure might look like:

```text
Many unit tests
        ↓
Some integration tests
        ↓
A smaller number of E2E tests
```

This is often described as the test pyramid.

The exact distribution depends on the system.

The important principle is to test low-level behavior cheaply and reserve expensive end-to-end tests for workflows that benefit from full-system verification.

---

## 21. Do Not Force Everything Into Unit Tests

Some behavior is inherently integration-based.

For example, testing whether a database query works correctly may provide more value as an integration test than attempting to mock every database detail.

Likewise, authentication flows often benefit from integration or E2E coverage.

Choose the test level that verifies the behavior realistically.

---

## 22. Mocks

A mock replaces a dependency with controlled behavior.

Example:

```js
const paymentService = {
  charge() {
    return Promise.resolve({
      success: true
    });
  }
};
```

A mock can help isolate a test from an external system.

However, excessive mocking can produce tests that verify an artificial environment rather than the real system.

Use mocks to control boundaries, not to hide all integration.

---

## 23. Stubs

A stub provides predetermined responses.

```js
const userRepository = {
  findById() {
    return {
      id: 1,
      name: "Osama Abu Motlaq"
    };
  }
};
```

The test can then verify behavior using that controlled dependency.

---

## 24. Spies

A spy records how a function is used.

Example concept:

```js
const logger = {
  calls: [],

  log(message) {
    this.calls.push(message);
  }
};
```

After executing code:

```js
logger.log("User created");

console.assert(
  logger.calls.includes("User created")
);
```

The important question is why the call matters.

Do not verify every internal function call unless the interaction itself is part of the contract.

---

## 25. Mock Only Meaningful Boundaries

Good candidates for mocking include:

* External APIs
* Email services
* Payment providers
* Time
* Randomness
* Browser APIs
* Expensive infrastructure
* Unavailable services

Avoid mocking simple internal functions without a good reason.

Excessive mocking can make tests difficult to trust.

---

## 26. The Mocking Trade-Off

Consider:

```js
function createOrder(paymentGateway) {
  return paymentGateway.charge();
}
```

A unit test can mock the gateway:

```js
const gateway = {
  charge() {
    return {
      success: true
    };
  }
};
```

This is useful for testing order behavior.

But another integration test should verify that the real adapter communicates correctly with the payment system or a suitable test environment.

Different test levels provide different types of confidence.

---

## 27. Avoid Mocking the System Under Test

If everything is mocked:

```text
Application code
  ↓
Mock
  ↓
Mock
  ↓
Mock
  ↓
Assertion
```

the test may confirm only that mocks behave as expected.

The system under test should remain real whenever practical.

---

## 28. Test Doubles Should Be Simple

A test double should not become another complex system.

Bad:

```js
const fakeDatabase = {
  // Hundreds of lines reproducing production behavior.
};
```

Better:

```js
const fakeDatabase = {
  users: new Map(),

  save(user) {
    this.users.set(user.id, user);
  },

  findById(id) {
    return this.users.get(id);
  }
};
```

Use the smallest fake that supports the test.

---

## 29. Async Testing

Asynchronous code should be tested by awaiting the actual operation.

```js
async function loadUser() {
  return {
    name: "Osama Abu Motlaq"
  };
}
```

Test:

```js
test("loads a user", async () => {
  const user = await loadUser();

  expect(user.name)
    .toBe("Osama Abu Motlaq");
});
```

Do not forget to return or await asynchronous operations.

---

## 30. Test Rejected Promises

Successful async behavior is only part of the contract.

```js
async function loadUser() {
  throw new Error("Failed to load user");
}
```

Test rejection:

```js
test("rejects when loading fails", async () => {
  await expect(loadUser())
    .rejects
    .toThrow("Failed to load user");
});
```

Error behavior matters just as much for asynchronous code.

---

## 31. Test Concurrent Behavior

If code uses `Promise.all()`, test both success and failure behavior.

```js
async function loadDashboard() {
  const [user, projects] = await Promise.all([
    fetchUser(),
    fetchProjects()
  ]);

  return {
    user,
    projects
  };
}
```

Tests should verify:

* Successful combination
* Rejection behavior
* Partial failure expectations
* Cancellation behavior when relevant

---

## 32. Test Timeouts and Cancellation

If code supports cancellation, test it.

```js
async function loadData(signal) {
  const response = await fetch(
    "/api/data",
    { signal }
  );

  return response.json();
}
```

A test should verify that cancellation produces the intended behavior.

Cancellation is part of the asynchronous contract.

---

## 33. Test Retry Logic Carefully

Retry logic can easily become incorrect.

Suppose:

```js
async function requestWithRetry(request, attempts) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      if (attempt === attempts) {
        throw error;
      }
    }
  }
}
```

Important test cases include:

* Succeeds immediately
* Fails once and then succeeds
* Fails every time
* Stops after the configured number of attempts

---

## 34. Do Not Make Tests Depend on Real Delays

Avoid:

```js
await new Promise((resolve) => {
  setTimeout(resolve, 5000);
});
```

Real delays make tests slow.

Prefer fake timers or injected timing functions when supported by the test environment.

The test should control time rather than waiting unnecessarily.

---

## 35. Testing Randomness

Randomness should usually be controlled.

Weak:

```js
test("generates an ID", () => {
  const id = createId();

  expect(id).toBe("some-specific-id");
});
```

A random generator cannot reliably produce the same value.

Instead, inject the generator:

```js
function createUser(random = Math.random) {
  return {
    id: random()
  };
}
```

Test with a controlled generator:

```js
test("uses the provided random source", () => {
  const user = createUser(() => 0.5);

  expect(user.id).toBe(0.5);
});
```

---

## 36. Testing Date and Time

Time should be treated as a dependency when behavior depends on it.

```js
function isExpired(expiresAt, now = Date.now()) {
  return now >= expiresAt;
}
```

Test:

```js
test("detects an expired timestamp", () => {
  expect(
    isExpired(1000, 1000)
  ).toBe(true);
});
```

The test does not depend on the actual current time.

---

## 37. Test Data Builders

Complex test data can become repetitive.

Instead of repeating large objects:

```js
const user = {
  id: 1,
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
  role: "developer",
  active: true
};
```

Create a builder:

```js
function createUser(overrides = {}) {
  return {
    id: 1,
    name: "Osama Abu Motlaq",
    email: "osama@example.com",
    role: "developer",
    active: true,
    ...overrides
  };
}
```

Usage:

```js
const activeUser = createUser();

const inactiveUser = createUser({
  active: false
});
```

Builders reduce duplication while keeping test intent visible.

---

## 38. Keep Test Data Relevant

Do not create huge fixtures when only two properties matter.

Instead of:

```js
const user = createUser({
  profile: {
    avatar: "...",
    bio: "...",
    location: "...",
    socialLinks: []
  },
  preferences: {
    theme: "dark",
    language: "en"
  }
});
```

Use the smallest meaningful input:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

Small test data makes failures easier to understand.

---

## 39. Boundary Fixtures

Use specific fixtures for important scenarios.

```js
const emptyUsers = [];

const oneUser = [
  {
    id: 1,
    name: "Osama Abu Motlaq"
  }
];

const manyUsers = [
  // Relevant test data.
];
```

Tests become clearer when fixture names describe their purpose.

---

## 40. Avoid Magical Test Values

Weak:

```js
expect(result).toBe(42);
```

If `42` has no obvious meaning, the assertion is difficult to interpret.

Prefer descriptive setup:

```js
const basePrice = 40;
const shipping = 2;

const result = basePrice + shipping;

expect(result).toBe(42);
```

The number now has context.

---

## 41. Property-Based Testing

Property-based testing checks general rules across many generated inputs.

Example property:

```js
function reverseTwice(value) {
  return [...value].reverse().reverse();
}
```

The important property is:

```text
reverse(reverse(value)) === value
```

This approach is useful for algorithms and transformations where many inputs should follow the same mathematical or structural rule.

It complements example-based tests rather than replacing them.

---

## 42. Regression Tests

When a bug is fixed, add a test that reproduces the bug.

Suppose an empty string previously caused an exception.

Add:

```js
test("handles an empty username", () => {
  expect(normalizeUsername(""))
    .toBe("");
});
```

The test prevents the same bug from silently returning later.

A bug fix without a regression test may remain vulnerable to future refactoring.

---

## 43. Test Before Refactoring

A useful workflow is:

```text
Existing behavior
       ↓
Tests
       ↓
Refactor
       ↓
Run tests
       ↓
Verify behavior
```

Tests provide a safety net when changing implementation.

This is especially valuable for code with existing consumers.

---

## 44. Tests Enable Safer Refactoring

Suppose:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

The implementation can later change:

```js
function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}
```

A behavior-focused test still passes.

The test protects the contract rather than the implementation.

---

## 45. Avoid Tests That Mirror Implementation

This test:

```js
expect(
  items.reduce(
    (total, item) => total + item.price,
    0
  )
).toBe(30);
```

does not test `calculateTotal()` itself.

It reproduces the same implementation inside the test.

A better test is:

```js
expect(
  calculateTotal([
    { price: 10 },
    { price: 20 }
  ])
).toBe(30);
```

Tests should independently verify the result.

---

## 46. Avoid Copying Production Logic Into Tests

If production code calculates something one way and the test reproduces exactly the same algorithm, the test can share the same bug.

Prefer independently derived expectations.

Example:

```js
const items = [
  { price: 10 },
  { price: 25 }
];

const total = calculateTotal(items);

expect(total).toBe(35);
```

The expected result was determined from the requirement, not by copying the implementation.

---

## 47. Test Important Invariants

An invariant is a condition that should remain true.

Example:

```js
function addItem(items, item) {
  return [...items, item];
}
```

An invariant might be:

```text
The original array remains unchanged.
```

Test:

```js
test("does not mutate the original array", () => {
  const items = [{ id: 1 }];
  const original = [...items];

  addItem(items, { id: 2 });

  expect(items).toEqual(original);
});
```

Invariants are especially useful for data structures and state updates.

---

## 48. Test Immutability When It Matters

For state-oriented code:

```js
function updateUser(user, name) {
  return {
    ...user,
    name
  };
}
```

Test:

```js
test("returns a new user object", () => {
  const user = {
    name: "Osama Abu Motlaq"
  };

  const updated = updateUser(
    user,
    "Osama Abu Motlaq"
  );

  expect(updated).not.toBe(user);
  expect(user.name).toBe("Osama Abu Motlaq");
});
```

The test verifies both the result and the ownership behavior.

---

## 49. Testing React Components

For UI components, test user-visible behavior rather than internal React implementation details.

Prefer verifying:

* Visible text
* Accessible controls
* User interactions
* State changes observable by the user
* Form behavior
* Loading states
* Error states

Avoid asserting internal state variables unless they are themselves part of the public behavior.

Example concept:

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

A behavior-oriented test checks:

```text
Rendering the component with "Osama Abu Motlaq" displays:
"Hello, Osama Abu Motlaq"
```

The test does not need to know how the component stores or derives the value internally.

---

## 50. Test User Interactions

A UI test should simulate meaningful user behavior.

Example workflow:

```text
User enters a name
        ↓
User submits form
        ↓
Validation runs
        ↓
Success message appears
```

This provides more confidence than directly invoking an internal event handler.

---

## 51. Test Accessibility Through Behavior

If a button must be usable through an accessible name, test the accessible contract rather than its CSS class.

Weak:

```js
expect(button.className).toBe("primary-button");
```

Better:

```text
Find the button by its accessible name:
"Save"
```

Accessibility requirements are part of user-facing behavior.

---

## 52. Do Not Test CSS Implementation Unless Necessary

Avoid tests that depend on implementation-specific styles:

```js
expect(element.className)
  .toContain("text-blue-500");
```

Unless the class itself is a meaningful contract, this creates unnecessary coupling.

Test whether the correct state or semantic behavior appears.

---

## 53. Test Loading, Success, and Error States

Async UI commonly has multiple states:

```text
Loading
Success
Error
Empty
```

Each important state should be tested.

For example:

```text
Initial request:
Loading indicator appears.

Successful response:
Data appears.

Failed response:
Error message appears.

Empty response:
Empty-state message appears.
```

This prevents UI logic from being tested only under ideal conditions.

---

## 54. Test Forms at the Boundary

Forms should test:

* Required fields
* Invalid values
* Valid values
* Submission behavior
* Error messages
* Disabled or loading states
* Reset behavior where relevant

Example validation:

```js
function validateName(name) {
  return name.trim().length > 0;
}
```

The validation can be tested independently from the DOM.

---

## 55. Test DOM Behavior at the Integration Boundary

If a function directly interacts with the DOM:

```js
function updateMessage(element, message) {
  element.textContent = message;
}
```

An integration-style test can verify:

```text
The target element receives the expected text.
```

Keep the DOM-specific logic small so most business logic can remain independently testable.

---

## 56. Test Browser APIs Through Boundaries

Instead of testing every browser API implementation detail, isolate your use of the API.

```js
function savePreference(storage, key, value) {
  storage.setItem(key, value);
}
```

Now the core function can be tested with a small fake:

```js
const storage = {
  data: new Map(),

  setItem(key, value) {
    this.data.set(key, value);
  }
};

savePreference(
  storage,
  "theme",
  "dark"
);
```

The browser integration can be tested separately.

---

## 57. Network Testing

Network tests should control external responses.

Test cases should include:

* Successful response
* `4xx` response
* `5xx` response
* Invalid JSON
* Timeout
* Cancellation
* Empty response
* Network failure

Avoid making ordinary unit tests depend on real production endpoints.

---

## 58. Contract Testing

When two systems communicate through an API, contract testing verifies that both sides agree on the expected structure.

For example:

```text
Client expects:
{
  id,
  name
}
```

The server should continue returning a compatible structure.

Contract tests are useful when independent services evolve separately.

---

## 59. Snapshot Testing

Snapshot testing compares output against a stored representation.

It can be useful for stable serialized output.

However, large snapshots can become difficult to review.

Bad usage:

```text
1,500-line snapshot
```

Better:

```text
Small, meaningful serialized output
```

Snapshots should not become a substitute for understanding the behavior being tested.

---

## 60. Avoid Updating Snapshots Blindly

When a snapshot fails, investigate the change.

Do not simply run an update command and accept the new snapshot without review.

A changed snapshot can represent:

* An intentional UI change
* A bug
* Unexpected state
* A dependency change
* An accidental implementation change

Tests provide value only when failures are examined.

---

## 61. Test Names Should Be Specific

Weak:

```js
test("works", () => {
  // ...
});
```

Better:

```js
test("returns zero when calculating the average of an empty array", () => {
  // ...
});
```

A failing test name should help explain what behavior broke.

---

## 62. Structure Tests Around Behavior

Instead of organizing tests around private implementation functions:

```text
internal-helper-a
internal-helper-b
internal-helper-c
```

organize them around user or domain behavior:

```text
user validation
project creation
authentication
cart calculation
```

This creates more meaningful test suites.

---

## 63. Avoid Test Duplication

Test duplication creates maintenance work.

For example, if the same setup appears in ten tests, a small fixture or helper may improve readability.

But do not abstract setup so aggressively that the actual test becomes difficult to read.

Compare:

```js
const user = createUser({
  active: true
});
```

with:

```js
const user = makeConfiguredEntity(
  defaultConfiguration,
  activeUserConfiguration,
  testOverrides,
  environmentOptions
);
```

The first is easier to understand.

---

## 64. Keep Test Helpers Honest

Test helpers should simplify setup, not hide the behavior being tested.

Good:

```js
function createUser(overrides = {}) {
  return {
    name: "Osama Abu Motlaq",
    active: true,
    ...overrides
  };
}
```

Poor:

```js
function setupEverything() {
  // Creates users
  // Starts server
  // Creates database records
  // Configures authentication
  // Opens browser
  // Creates project
  // Logs in
  // ...
}
```

Large helpers make test dependencies invisible.

---

## 65. Test Isolation and Database State

Database-backed tests should control their data.

Common strategies include:

* Fresh test databases
* Transactions
* Database cleanup
* Seed data
* Test-specific records

Avoid tests depending on data left behind by previous tests.

---

## 66. Avoid Production Data in Tests

Tests should never depend on production data when a controlled environment is available.

Benefits include:

* Predictability
* Safety
* Reproducibility
* Privacy
* Faster execution

Test environments should use test-specific data.

---

## 67. Test Authentication and Authorization Separately

Authentication asks:

> Who is the user?

Authorization asks:

> What is the user allowed to do?

Test both.

Example:

```js
function canDeleteProject(user) {
  return user.permissions.includes("delete:project");
}
```

Tests should verify:

```text
User with permission → allowed
User without permission → denied
Unauthenticated user → denied
```

Do not test authorization only through visual UI restrictions.

The server-side authorization boundary is especially important.

---

## 68. Security Testing

Security-sensitive behavior deserves explicit tests.

Examples include:

* Authorization checks
* Input validation
* URL validation
* Permission boundaries
* Session behavior
* CSRF protections
* File restrictions
* Rate limiting
* Error handling that avoids information leaks

Tests should verify that forbidden operations are actually rejected.

---

## 69. Performance Tests

Most functional tests should not measure exact execution time.

Avoid:

```js
expect(duration).toBeLessThan(10);
```

Such tests are often environment-dependent.

Performance testing should use dedicated benchmarking or profiling tools.

Functional tests should verify correctness.

---

## 70. Flaky Tests

A flaky test sometimes passes and sometimes fails without a relevant code change.

Common causes:

* Timing assumptions
* Race conditions
* Shared state
* Randomness
* Network dependencies
* Environment differences
* Improper async handling
* Uncontrolled resource cleanup

Flaky tests should be treated as engineering problems, not ignored.

---

## 71. Never Ignore Flaky Tests

A test that is allowed to fail randomly stops providing reliable feedback.

Developers may begin dismissing failures:

```text
"That test fails sometimes."
```

Once this becomes normal, the test suite loses credibility.

Fix or remove the underlying source of nondeterminism.

---

## 72. Test Cleanup

Every test should clean up resources it creates.

Potential resources include:

* Timers
* Event listeners
* DOM nodes
* WebSockets
* Network mocks
* Database records
* Files
* Object URLs
* Workers

Example:

```js
const intervalId = setInterval(() => {
  // ...
}, 1000);

clearInterval(intervalId);
```

Resource leaks can cause later tests to behave incorrectly.

---

## 73. Testing Event Listeners

Repeated setup without cleanup can register duplicate listeners.

Weak:

```js
function setup() {
  window.addEventListener("resize", handleResize);
}
```

Better:

```js
function setup() {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}
```

Test setup and cleanup when listener ownership is important.

---

## 74. Test Resource Ownership

If a function creates a resource, determine who owns cleanup.

```js
function createSubscription(callback) {
  const unsubscribe = subscribe(callback);

  return {
    unsubscribe
  };
}
```

The API makes ownership explicit.

Tests should ensure cleanup actually occurs.

---

## 75. Mutation Testing

Mutation testing changes the implementation deliberately to determine whether tests detect the change.

For example:

```js
function isAdult(age) {
  return age >= 18;
}
```

A mutation might change it to:

```js
function isAdult(age) {
  return age > 18;
}
```

A good test suite should fail because the boundary changed.

Mutation testing helps identify tests that exist but do not meaningfully protect behavior.

---

## 76. Coverage

Code coverage measures which code was executed by tests.

Common metrics include:

* Line coverage
* Branch coverage
* Function coverage
* Statement coverage

Coverage is useful as a signal.

It is not proof of correctness.

This:

```text
100% coverage
```

does not automatically mean:

```text
100% correct software
```

---

## 77. Do Not Optimize for Coverage Numbers Alone

Consider:

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}
```

Executing both branches gives coverage.

But meaningful assertions are still necessary.

A test that only runs the function without checking the result provides weak confidence.

Coverage measures execution, not quality of verification.

---

## 78. Branch Coverage Matters

A function with multiple branches may require tests for each meaningful path.

```js
function getStatus(user) {
  if (!user) {
    return "unknown";
  }

  if (!user.active) {
    return "inactive";
  }

  return "active";
}
```

Important scenarios:

```text
No user
Inactive user
Active user
```

Testing only the active path leaves behavior unverified.

---

## 79. Mutation Thinking

Even without using mutation-testing tools, ask:

> What small implementation mistake should this test catch?

For example:

```js
function hasPermission(user, permission) {
  return user.permissions.includes(permission);
}
```

A good test should fail if `includes()` were accidentally removed or replaced with incorrect logic.

This mindset improves test quality.

---

## 80. Tests Should Fail for the Right Reason

A strong test failure should point toward the broken behavior.

Weak:

```text
Expected 30 but received 25.
```

Better test names and assertions make the failure meaningful:

```text
calculateTotal should include every item price
```

Good failures reduce debugging time.

---

## 81. Avoid Multiple Unrelated Failure Sources

Tests with extensive setup can fail because of problems unrelated to the behavior under test.

For example:

```text
Database
  ↓
Authentication
  ↓
Network
  ↓
UI
  ↓
Assertion
```

For a simple formatting test, this is unnecessary.

Keep lower-level tests close to the code they verify.

---

## 82. Testing and Dependency Injection

Dependency injection often improves testability.

Instead of:

```js
function createUser() {
  const database = new Database();
  return database.insert();
}
```

Use:

```js
function createUser(database) {
  return database.insert();
}
```

Test with a controlled dependency:

```js
const database = {
  insert() {
    return {
      id: 1,
      name: "Osama Abu Motlaq"
    };
  }
};

const user = createUser(database);
```

The function becomes easier to isolate.

---

## 83. Testing Configuration

Configuration should be testable without relying on production settings.

Instead of directly accessing:

```js
process.env.API_URL
```

throughout the application, centralize configuration:

```js
const config = {
  apiUrl: process.env.API_URL
};
```

Consumers use:

```js
config.apiUrl;
```

Tests can provide controlled configuration where needed.

---

## 84. Test Parsing and Serialization Boundaries

Data crossing system boundaries should be tested carefully.

Example:

```js
function parseUser(json) {
  const data = JSON.parse(json);

  return {
    id: data.id,
    name: data.name
  };
}
```

Test malformed input:

```js
test("rejects invalid JSON", () => {
  expect(() => parseUser("{"))
    .toThrow();
});
```

Test missing required properties when the contract requires them.

---

## 85. Test Data Transformation at Boundaries

Suppose an API returns:

```js
{
  user_name: "Osama Abu Motlaq"
}
```

The application expects:

```js
{
  userName: "Osama Abu Motlaq"
}
```

The transformation should be tested:

```js
function mapUser(data) {
  return {
    userName: data.user_name
  };
}
```

This prevents integration mismatches from spreading through the application.

---

## 86. Contract Tests for APIs

An API client should verify important response assumptions.

For example:

```js
function mapUser(data) {
  if (
    typeof data.id !== "number" ||
    typeof data.name !== "string"
  ) {
    throw new Error("Invalid user response");
  }

  return {
    id: data.id,
    name: data.name
  };
}
```

Testing this boundary protects the rest of the application from malformed external data.

---

## 87. Test Failure Recovery

Code should be tested not only for success but for recovery behavior.

Example:

```js
async function loadUserWithFallback(loadUser, fallback) {
  try {
    return await loadUser();
  } catch {
    return fallback();
  }
}
```

Tests should verify:

```text
Successful load → loaded user
Failed load → fallback
Fallback failure → propagated error
```

Recovery behavior should be deliberate.

---

## 88. Test Retry and Idempotency Together

If an operation can be retried, determine whether retrying is safe.

```js
async function saveUser(user) {
  // Performs a write operation.
}
```

A test should verify what happens if the first attempt appears to fail after the server may already have processed it.

For non-idempotent operations, blindly retrying can create duplicate effects.

Testing can reveal these risks.

---

## 89. Test Race Conditions

Concurrent operations can produce stale results.

Example scenario:

```text
Request A starts
Request B starts
Request B finishes
Request A finishes
```

If A overwrites B's newer result, the UI is incorrect.

Tests should simulate completion in different orders when the code is sensitive to concurrency.

---

## 90. Test Abort Behavior

For request cancellation:

```js
const controller = new AbortController();

const promise = loadData(controller.signal);

controller.abort();
```

The test should verify that the system handles the aborted operation intentionally rather than treating it as an unexpected application failure.

---

## 91. Tests and State Machines

Complex behavior can often be described as states.

Example:

```text
idle
 ↓
loading
 ↓
success

idle
 ↓
loading
 ↓
error
```

Tests can verify valid transitions.

This is useful for:

* Authentication
* Network requests
* Uploads
* Forms
* Multi-step workflows

---

## 92. Test State Transitions

For example:

```js
function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "loading"
      };

    case "success":
      return {
        ...state,
        status: "success",
        data: action.data
      };

    case "error":
      return {
        ...state,
        status: "error",
        error: action.error
      };

    default:
      return state;
  }
}
```

Each transition can be tested independently.

```js
test("start changes status to loading", () => {
  const state = {
    status: "idle",
    data: null,
    error: null
  };

  const result = reducer(state, {
    type: "start"
  });

  expect(result.status).toBe("loading");
});
```

---

## 93. Test Reducers as Pure Functions

Reducers are especially testable because they generally map:

```text
state + action → next state
```

Example:

```js
const state = {
  count: 0
};

const nextState = reducer(state, {
  type: "increment"
});
```

Test the transition:

```js
expect(nextState.count).toBe(1);
```

This gives high confidence with very little setup.

---

## 94. Test Derived State

If a value is derived from other data, test the derivation directly.

```js
function getCartTotal(items) {
  return items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}
```

Important cases include:

```text
Empty cart
One item
Multiple items
Quantity greater than one
Zero-price item
```

Derived logic is often a good candidate for focused unit tests.

---

## 95. Avoid Testing Framework Internals

Do not test whether a framework internally uses:

* A specific hook implementation
* A particular reconciliation mechanism
* A specific DOM algorithm
* A particular scheduler mechanism

Test your application's observable behavior.

Framework tests belong to framework maintainers.

---

## 96. Keep Tests Close to Their Purpose

Possible structures include:

```text
src/
├── users/
│   ├── user-service.js
│   └── user-service.test.js
```

or:

```text
src/
├── users/
│   └── user-service.js

tests/
└── users/
    └── user-service.test.js
```

The important principle is discoverability.

A developer should be able to quickly find the tests associated with a feature.

---

## 97. Test File Naming

Use consistent naming conventions.

Common patterns include:

```text
user.test.js
user.spec.js
user-service.test.js
```

Choose one convention and use it consistently across the repository.

Consistency reduces friction.

---

## 98. Run Fast Tests Frequently

Developers should be able to run focused tests quickly during development.

A typical workflow:

```text
Edit
 ↓
Run focused tests
 ↓
Fix
 ↓
Run broader suite
 ↓
Commit
```

Fast feedback encourages testing.

---

## 99. Separate Fast and Slow Verification

Not all tests need the same execution frequency.

Fast:

```text
Unit tests
Pure logic tests
Small integration tests
```

Slower:

```text
Database tests
Browser tests
End-to-end tests
Full production-like environments
```

A CI pipeline can run different levels at different stages.

---

## 100. Testing in CI

Tests should run automatically in continuous integration.

A typical pipeline might be:

```text
Install dependencies
      ↓
Lint
      ↓
Unit tests
      ↓
Integration tests
      ↓
Build
      ↓
End-to-end tests
```

The exact pipeline depends on the project.

The important principle is that critical verification should not depend entirely on manual execution.

---

## 101. Do Not Ignore Build Failures

A passing local test suite is not sufficient if the application cannot build.

CI should verify important repository health:

* Tests
* Linting
* Type checks where applicable
* Build
* Required integration checks

A healthy project must satisfy more than one verification mechanism.

---

## 102. Test the Build When Build Behavior Matters

Some problems appear only during production builds:

* Missing imports
* Environment configuration errors
* Unsupported syntax
* Asset path issues
* Server/client boundary problems
* Tree-shaking differences
* Build-time configuration failures

Where practical, CI should test the real build process.

---

## 103. Avoid Environment-Specific Test Logic

Do not write tests that pass only on one machine.

Avoid assumptions such as:

```js
expect(path).toBe("C:\\Projects\\App");
```

Use portable representations or injected paths.

For cross-platform projects, test behavior rather than machine-specific formatting.

---

## 104. Test File and Path Operations Carefully

When testing filesystem behavior, use controlled temporary directories.

Avoid modifying real project files.

Tests should clean up created files afterward.

Resource ownership applies to test infrastructure as well.

---

## 105. Security Tests Should Verify Denial

Security testing should verify what unauthorized users cannot do.

Example:

```js
test("denies project deletion without permission", () => {
  const user = {
    permissions: []
  };

  expect(
    canDeleteProject(user)
  ).toBe(false);
});
```

A system is secure partly because forbidden operations fail correctly.

---

## 106. Do Not Rely on Client-Side Authorization Tests Alone

A UI may hide an administrative button:

```js
if (!user.isAdmin) {
  return null;
}
```

That does not establish server-side authorization.

The server must enforce the permission boundary.

Client-side tests verify UI behavior.

Server-side tests verify actual authorization.

---

## 107. Test Validation at Trust Boundaries

Validation should be tested where untrusted data enters the system.

Typical boundaries include:

* Forms
* URL parameters
* Request bodies
* API responses
* File metadata
* Storage data
* Environment variables

Boundary tests help prevent invalid data from propagating inward.

---

## 108. Testing Logging Behavior

Logging should be tested only when the log itself is part of the contract.

For example, security or audit systems may require specific events.

Do not test every incidental `console.log()`.

Testing should focus on behavior that matters.

---

## 109. Avoid Console Noise

Tests should not produce unnecessary logs.

A noisy test suite makes real failures harder to notice.

Prefer controlled logging or test-specific log suppression where appropriate.

---

## 110. Test Cleanup Failures

Cleanup itself can fail.

For resources such as:

```text
WebSocket
Timer
Event listener
Temporary file
Database record
```

make sure cleanup runs even when the test fails.

Conceptually:

```js
try {
  // Test operation.
} finally {
  // Cleanup.
}
```

Reliable cleanup improves test isolation.

---

## 111. Test the Smallest Stable Boundary

When choosing where to test, prefer the smallest boundary that represents meaningful behavior.

For example:

```text
Pure calculation → Unit test
Database repository → Integration test
Full login flow → E2E test
```

This keeps tests efficient while preserving appropriate coverage.

---

## 112. Avoid Testing Through Too Many Layers

Suppose a formatting rule can be tested directly:

```js
formatCurrency(100);
```

Do not test it only through:

```text
Browser
 ↓
Page
 ↓
Component
 ↓
Hook
 ↓
Service
 ↓
Formatter
```

This makes a simple failure difficult to diagnose.

Test the formatter directly and add broader tests where integration matters.

---

## 113. Testing and Refactoring Together

When improving architecture:

```text
Existing behavior
      ↓
Characterization tests
      ↓
Refactor
      ↓
Run tests
      ↓
Improve design
```

Characterization tests capture existing behavior before major changes.

They are especially useful when working with poorly tested legacy code.

---

## 114. Characterization Tests

A characterization test records current behavior without necessarily claiming that the behavior is ideal.

Example:

```js
const result = legacyFunction(input);

expect(result).toEqual(expectedCurrentResult);
```

These tests can provide a baseline during refactoring.

After the architecture is improved, they can be replaced by clearer contract tests where appropriate.

---

## 115. Do Not Preserve Bugs Blindly

A characterization test may capture incorrect behavior.

Before permanently preserving it, determine whether the behavior is actually required.

The goal is not:

```text
Make every historical behavior permanent.
```

The goal is:

```text
Understand existing behavior so intentional changes are controlled.
```

---

## 116. Testing Third-Party Libraries

Do not reproduce an entire third-party library's test suite.

Instead, test how your application depends on it.

Example:

```js
function formatDate(date) {
  return externalFormatter(date);
}
```

Test your expected integration contract.

---

## 117. Integration Boundaries Need Extra Attention

Common failure points occur where systems meet:

```text
Frontend ↔ API
API ↔ Database
Application ↔ Browser
Application ↔ Storage
Application ↔ External Service
```

These boundaries deserve explicit tests because mismatches often occur there.

---

## 118. Test API Error Mapping

If an API returns an HTTP error:

```js
function mapApiError(response) {
  if (response.status === 401) {
    return "Authentication required";
  }

  if (response.status === 403) {
    return "Access denied";
  }

  return "Request failed";
}
```

Test each meaningful mapping:

```js
expect(
  mapApiError({ status: 401 })
).toBe("Authentication required");

expect(
  mapApiError({ status: 403 })
).toBe("Access denied");
```

---

## 119. Test Empty States

Empty data is a valid application state.

Examples:

```text
No projects
No notifications
No search results
Empty cart
No messages
```

Do not treat empty data as an unexpected edge case if it is normal.

Tests should verify that the UI and business logic handle it intentionally.

---

## 120. Test Loading States

For asynchronous interfaces:

```text
Request starts
    ↓
Loading state
    ↓
Success or error
```

A missing loading state can lead to:

* Duplicate submissions
* Confusing UX
* Incorrect button behavior
* Race conditions

Tests should verify important state transitions.

---

## 121. Test Disabled Actions

A disabled control is meaningful behavior when it prevents invalid operations.

Example:

```text
Empty form → Submit disabled
Valid form → Submit enabled
Submitting → Submit disabled
```

These are testable user-visible contracts.

---

## 122. Test Duplicate Actions

Users may click buttons multiple times.

For operations such as:

```text
Submit
Purchase
Delete
Send
Create
```

test whether repeated actions are:

* Prevented
* Deduplicated
* Idempotent
* Intentionally allowed

This is especially important for asynchronous operations.

---

## 123. Test State Reset

When a feature can reset state, test the complete reset behavior.

Example:

```text
Filled form
   ↓
Submit
   ↓
Success
   ↓
Reset
```

Verify that all relevant state returns to its intended initial condition.

---

## 124. Tests Should Match Real Risks

Not every function has equal importance.

Prioritize tests around:

* Business-critical behavior
* Security boundaries
* Data transformations
* Complex algorithms
* External integrations
* Frequently changed code
* Previous production bugs
* High-risk workflows

Do not spend most testing effort on trivial code while complex business logic remains unverified.

---

## 125. Risk-Based Testing

A practical model is:

```text
High risk
    ↓
More confidence required

Medium risk
    ↓
Standard coverage

Low risk
    ↓
Simple focused verification
```

Risk can come from:

* Financial impact
* Data loss
* Security
* Complexity
* External dependencies
* Frequency of change
* User impact

Testing effort should reflect risk.

---

## 126. Test Critical Invariants

Examples of invariants:

```text
A user's password is never logged.
An authorized user can access their own resource.
An unauthorized user cannot delete another user's resource.
A cart total equals the sum of its items.
A reducer does not mutate the previous state.
A closed resource is not used again.
```

Invariants often make excellent test cases.

---

## 127. Testing and Documentation

Tests can serve as executable examples.

Suppose:

```js
function normalizeUsername(value) {
  return value.trim().toLowerCase();
}
```

A test:

```js
test("trims and lowercases usernames", () => {
  expect(
    normalizeUsername("  Osama Abu Motlaq  ")
  ).toBe("osama abu motlaq");
});
```

The test documents expected behavior more reliably than a comment because the behavior is executable.

---

## 128. Do Not Use Tests as a Replacement for Documentation

A test can demonstrate behavior, but it may not explain:

* Why a rule exists
* Architectural intent
* Business context
* Trade-offs
* Operational procedures

Use tests and documentation for different purposes.

---

## 129. Testing Comments

Comments in tests should explain unusual decisions, not obvious operations.

Weak:

```js
// Create a user.
const user = createUser();
```

Useful:

```js
// Freeze the timestamp so the retry window is deterministic.
```

Comments should explain why.

---

## 130. Keep Tests Readable During Refactoring

A test suite becomes harder to maintain when helpers and abstractions hide intent.

Prefer:

```js
const user = createUser({
  active: true
});

const result = canCreateProject(user);

expect(result).toBe(true);
```

over:

```js
expect(
  runConfiguredScenario(
    scenarioFactory,
    environmentBuilder,
    defaultOptions
  )
).toBe(true);
```

Tests should remain approachable to developers who did not write them.

---

## 131. Test Public APIs

For modules with a public API, prefer testing the public contract.

Avoid importing private internal functions solely for testing unless there is a compelling architectural reason.

If internal code is difficult to test without exposing it, reconsider whether the internal boundary is correct.

---

## 132. A Strong Test Suite Protects Refactoring

A valuable test suite lets developers change:

```text
Implementation
Data structures
Module organization
Internal algorithms
Performance strategy
Dependency wiring
```

while preserving:

```text
Behavioral contracts
```

This is one of the most important practical benefits of testing.

---

## 133. Testing and Code Quality

Good tests often reveal design problems.

For example, if a function requires fifteen mocks:

```text
Mock A
Mock B
Mock C
Mock D
...
```

the problem may not be the test.

The production code may have:

* Too many dependencies
* Excessive coupling
* Too many responsibilities
* Hidden global state
* Poor boundaries

Difficult testing is sometimes a design signal.

---

## 134. Testability as a Design Property

Testability improves when code has:

* Explicit dependencies
* Small responsibilities
* Pure transformations
* Clear boundaries
* Controlled side effects
* Stable contracts

For example:

```js
function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price,
    0
  );
}
```

is easier to test than a function that simultaneously:

```text
Reads DOM
Fetches API
Writes database
Updates UI
Logs analytics
Calculates totals
```

Good architecture often produces testable code naturally.

---

## 135. Avoid Testing Implementation Through Private State

Suppose:

```js
function createCounter() {
  let value = 0;

  return {
    increment() {
      value += 1;
    },

    getValue() {
      return value;
    }
  };
}
```

Test public behavior:

```js
const counter = createCounter();

counter.increment();

expect(counter.getValue()).toBe(1);
```

Do not break encapsulation merely to inspect `value`.

---

## 136. Test Observable Outcomes

Observable outcomes include:

* Return values
* Thrown errors
* Visible UI
* Persisted state
* Network requests when meaningful
* External side effects when required
* State transitions

The more directly the test corresponds to observable behavior, the more stable it tends to be.

---

## 137. Test Side Effects When They Are the Contract

Not all side effects are bad.

If the purpose of a function is to persist data:

```js
function savePreference(storage, key, value) {
  storage.setItem(key, value);
}
```

the storage operation is part of its contract.

Testing it is appropriate:

```js
const storage = {
  calls: [],

  setItem(key, value) {
    this.calls.push({
      key,
      value
    });
  }
};

savePreference(
  storage,
  "theme",
  "dark"
);

expect(storage.calls).toEqual([
  {
    key: "theme",
    value: "dark"
  }
]);
```

The key is distinguishing meaningful side effects from incidental implementation details.

---

## 138. Tests and Idempotent Operations

An idempotent operation can be repeated without changing the final result beyond the first application.

Example:

```js
function setTheme(state, theme) {
  return {
    ...state,
    theme
  };
}
```

Calling it twice with the same theme produces the same state.

Tests can verify this property when important:

```js
const state = {
  theme: "light"
};

const once = setTheme(state, "dark");
const twice = setTheme(once, "dark");

expect(twice).toEqual(once);
```

---

## 139. Test Serialization Boundaries

When converting data:

```js
function serializeUser(user) {
  return JSON.stringify({
    id: user.id,
    name: user.name
  });
}
```

Test the actual contract:

```js
const result = serializeUser({
  id: 1,
  name: "Osama Abu Motlaq"
});

expect(result).toBe(
  '{"id":1,"name":"Osama Abu Motlaq"}'
);
```

Where ordering is not guaranteed or relevant, parse the serialized result before comparison.

---

## 140. Test Backward Compatibility When Required

If a public module supports an existing API:

```js
formatUser(user);
```

and a new implementation is introduced, tests should verify that existing consumers still receive the expected contract.

Compatibility requirements should be explicit rather than accidental.

---

## 141. Test Deprecation Paths

When functionality is being replaced, tests can protect the migration path.

For example:

```js
oldFunction();
```

may delegate to:

```js
newFunction();
```

The old API can remain temporarily while consumers migrate.

Eventually, the deprecated path should be removed deliberately.

---

## 142. Test Feature Flags

Feature flags create multiple behaviors.

Example:

```js
function getDashboardMode(flags) {
  return flags.newDashboard
    ? "new"
    : "legacy";
}
```

Test both states:

```js
expect(
  getDashboardMode({ newDashboard: true })
).toBe("new");

expect(
  getDashboardMode({ newDashboard: false })
).toBe("legacy");
```

When possible, keep feature-flag logic small and explicit.

---

## 143. Test Environment Configuration Paths

If behavior depends on configuration:

```js
function getApiUrl(config) {
  return config.apiUrl;
}
```

test valid and invalid configuration.

Do not assume production configuration is always present.

---

## 144. Test Fallback Behavior

Fallbacks should be explicit.

```js
function getDisplayName(user) {
  return user.name || "Unknown user";
}
```

Tests:

```js
expect(
  getDisplayName({
    name: "Osama Abu Motlaq"
  })
).toBe("Osama Abu Motlaq");

expect(
  getDisplayName({
    name: ""
  })
).toBe("Unknown user");
```

Be careful that the fallback rule matches the intended semantics.

---

## 145. Avoid Overusing Snapshot and Golden Files

Large output snapshots can obscure meaningful differences.

Use them when the complete representation is itself important.

For complex outputs, targeted assertions are often easier to understand:

```js
expect(result.name).toBe("Osama Abu Motlaq");
expect(result.active).toBe(true);
```

---

## 146. Test Security-Sensitive Errors Without Leaking Secrets

Error responses should not expose sensitive information.

Example:

```js
function createPublicError(error) {
  return {
    message: "Request failed",
    code: error.code
  };
}
```

Tests should verify that secrets and internal stack information are not exposed where they should remain private.

---

## 147. Test Input Normalization

Input normalization should be explicit and tested.

```js
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}
```

Test:

```js
expect(
  normalizeEmail("  TEST@EXAMPLE.COM ")
).toBe("test@example.com");
```

Small boundary functions can prevent larger inconsistencies.

---

## 148. Test Data Ownership

A function should make mutation behavior clear.

```js
function sortUsers(users) {
  return [...users].sort(
    (a, b) => a.name.localeCompare(b.name)
  );
}
```

Test that the original collection remains unchanged:

```js
const users = [
  { name: "B" },
  { name: "A" }
];

const sorted = sortUsers(users);

expect(users[0].name).toBe("B");
expect(sorted[0].name).toBe("A");
```

This protects the ownership contract.

---

## 149. Test Resource Limits

Applications may enforce limits.

Examples:

```text
Maximum upload size
Maximum retry count
Maximum pagination size
Maximum queue length
Maximum concurrent operations
```

Boundary tests should cover:

```text
Below limit
At limit
Above limit
```

---

## 150. Testing Queues and Concurrency

Concurrency code should test:

* Empty queue
* One item
* Multiple items
* Maximum concurrency
* Failure of one task
* Cancellation
* Queue completion
* Backpressure

Concurrency bugs often appear only under specific ordering conditions.

---

## 151. Test Ordering When Ordering Is a Contract

If a function promises sorted output:

```js
function sortNames(names) {
  return [...names].sort();
}
```

test the ordering.

If order is not part of the contract, avoid assertions that depend on incidental ordering.

Tests should encode requirements, not assumptions.

---

## 152. Test Set and Map Semantics

For collection-heavy code, test behavior such as:

```text
Uniqueness
Key lookup
Insertion
Deletion
Missing keys
Duplicate additions
```

Example:

```js
function addUnique(values, value) {
  return new Set([...values, value]);
}
```

Test duplicate behavior:

```js
const result = addUnique(
  new Set(["javascript"]),
  "javascript"
);

expect(result.size).toBe(1);
```

---

## 153. Test Algorithmic Edge Cases

Algorithms may require cases such as:

* Empty input
* Single element
* Already sorted input
* Reverse-sorted input
* Duplicate values
* Large input
* Invalid input

Tests should be selected based on the algorithm's actual failure modes.

---

## 154. Do Not Treat 100% Coverage as the Goal

A healthier goal is:

```text
High confidence in important behavior
```

rather than:

```text
Maximum percentage
```

A small but meaningful suite can be more valuable than a large suite of trivial assertions.

---

## 155. Review Tests Like Production Code

Tests should receive the same engineering discipline as application code.

Review:

* Naming
* Duplication
* Complexity
* Flakiness
* Hidden dependencies
* Resource cleanup
* Readability
* Correctness
* Maintenance cost

Bad tests can become a source of technical debt.

---

## 156. Keep the Test Suite Maintainable

A healthy test suite should remain:

* Understandable
* Fast enough
* Stable
* Trustworthy
* Easy to extend
* Easy to debug

When adding a new test, consider the long-term maintenance cost.

---

## 157. Practical Testing Workflow

A practical development workflow is:

```text
Understand behavior
        ↓
Implement small change
        ↓
Write or update focused tests
        ↓
Run focused tests
        ↓
Refactor if needed
        ↓
Run broader test suite
        ↓
Run build and integration checks
        ↓
Commit
```

This creates rapid feedback without requiring the entire suite after every tiny change.

---

## 158. Practical Test Selection Framework

When deciding what to test, ask:

### What is the behavior?

Define the contract.

### What can fail?

Identify realistic failure modes.

### What are the boundaries?

Test minimums, maximums, empty values, and invalid inputs.

### What dependencies are external?

Control or isolate them.

### What side effects matter?

Verify meaningful side effects.

### What level is appropriate?

Choose unit, integration, or E2E.

### What would a regression look like?

Add a test for important previous failures.

### What must never happen?

Test security and invariant violations.

---

## 159. Testing Checklist

Before considering a feature sufficiently tested:

* [ ] The primary behavior is covered.
* [ ] Important edge cases are covered.
* [ ] Invalid inputs are covered where relevant.
* [ ] Error behavior is covered.
* [ ] Important asynchronous behavior is covered.
* [ ] Important state transitions are covered.
* [ ] External dependencies are controlled where appropriate.
* [ ] Tests are deterministic.
* [ ] Tests are independent.
* [ ] Tests clean up resources.
* [ ] Tests do not rely on production data.
* [ ] Tests focus on behavior rather than implementation details.
* [ ] Critical security boundaries are verified.
* [ ] Important regressions have regression tests.
* [ ] The appropriate test level is being used.
* [ ] Coverage is interpreted as a signal, not a correctness guarantee.
* [ ] The suite remains readable and maintainable.

---

## 160. Final Principles

1. Test behavior rather than implementation details.
2. Treat tests as executable contracts.
3. Keep tests focused and independent.
4. Make tests deterministic.
5. Test both successful and failing behavior.
6. Test boundaries and edge cases.
7. Keep business logic separate from unnecessary side effects.
8. Use unit tests for focused logic.
9. Use integration tests for important collaborations.
10. Use end-to-end tests for critical user workflows.
11. Mock external boundaries selectively.
12. Avoid excessive mocking.
13. Keep test doubles simple.
14. Control time, randomness, and external state.
15. Test asynchronous success and failure paths.
16. Test cleanup and resource ownership.
17. Add regression tests for important bugs.
18. Use tests to make refactoring safer.
19. Treat flaky tests as defects.
20. Do not confuse code coverage with correctness.
21. Avoid overspecified tests.
22. Test observable outcomes.
23. Keep test data small and relevant.
24. Use domain-focused names.
25. Make important invariants explicit.
26. Choose test levels according to risk.
27. Test security boundaries, not only UI restrictions.
28. Keep CI verification aligned with production requirements.
29. Treat tests as production code that requires maintenance.
30. Optimize for confidence, clarity, and useful feedback rather than test-count or coverage numbers.
