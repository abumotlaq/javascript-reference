# Nullish Coalescing Operator (`??`)

> A deep reference to the JavaScript Nullish Coalescing Operator, including `null` and `undefined`, fallback values, comparison with `||`, interaction with Optional Chaining, assignment, precedence, short-circuiting, function parameters, React, Next.js, API data, and common mistakes.

---

# 1. What Is the Nullish Coalescing Operator?

The **Nullish Coalescing Operator** (`??`) is a JavaScript operator used to provide a fallback value when another value is specifically:

```text
null
```

or:

```text
undefined
```

Syntax:

```js
value ?? fallback;
```

If `value` is neither `null` nor `undefined`, JavaScript returns `value`.

If `value` is `null` or `undefined`, JavaScript returns `fallback`.

---

# 2. The Basic Idea

Example:

```js
const username = null;

const result = username ?? "Guest";

console.log(result);
```

Output:

```text
Guest
```

Why?

```text
username
   ↓
null
   ↓
nullish
   ↓
use "Guest"
```

---

# 3. When the Left Side Exists

Consider:

```js
const username = "Osama Abu Motlaq";

const result = username ?? "Guest";

console.log(result);
```

Output:

```text
Osama Abu Motlaq
```

Because:

```text
"Osama Abu Motlaq"
```

is neither:

```text
null
```

nor:

```text
undefined
```

Therefore, the fallback is not used.

---

# 4. `??` Only Checks `null` and `undefined`

This is the most important rule.

The following values are considered nullish:

```text
null
undefined
```

The following values are **not** nullish:

```text
false
0
""
NaN
[]
{}
```

Therefore:

```js
false ?? "fallback";
```

returns:

```text
false
```

```js
0 ?? "fallback";
```

returns:

```text
0
```

```js
"" ?? "fallback";
```

returns:

```text
""
```

---

# 5. Why `??` Exists

Before `??`, developers often used:

```js
const value = input || "default";
```

But `||` treats every falsy value as a reason to use the fallback.

That can be incorrect.

For example:

```js
const count = 0;

const result = count || 10;

console.log(result);
```

Output:

```text
10
```

But `0` may be a perfectly valid value.

With:

```js
const result = count ?? 10;
```

the result is:

```text
0
```

This is the main reason `??` is useful.

---

# 6. Nullish vs Falsy

These concepts must not be confused.

### Nullish

Only:

```text
null
undefined
```

### Falsy

JavaScript falsy values include:

```text
false
0
-0
0n
""
null
undefined
NaN
```

So:

```text
nullish ⊂ falsy
```

Every nullish value is falsy, but not every falsy value is nullish.

---

# 7. `??` vs `||`

Compare:

```js
const value = 0;

console.log(value || 100);
console.log(value ?? 100);
```

Output:

```text
100
0
```

Why?

### `||`

Checks whether the left side is falsy.

```text
0 → falsy → use 100
```

### `??`

Checks whether the left side is nullish.

```text
0 → not nullish → keep 0
```

---

# 8. Comparison Table

| Value | `value || "fallback"` | `value ?? "fallback"` |
|---|---|---|
| `null` | `"fallback"` | `"fallback"` |
| `undefined` | `"fallback"` | `"fallback"` |
| `false` | `"fallback"` | `false` |
| `0` | `"fallback"` | `0` |
| `""` | `"fallback"` | `""` |
| `NaN` | `"fallback"` | `NaN` |
| `[]` | `[]` | `[]` |
| `{}` | `{}` | `{}` |
| `"Hello"` | `"Hello"` | `"Hello"` |

This table is worth memorizing.

---

# 9. Basic Fallback Pattern

The common pattern is:

```js
const value = something ?? fallback;
```

Examples:

```js
const username = undefined;

const displayName =
  username ?? "Guest";
```

Result:

```text
Guest
```

---

# 10. `null` Uses the Fallback

```js
const username = null;

const displayName =
  username ?? "Guest";
```

Result:

```text
Guest
```

---

# 11. `undefined` Uses the Fallback

```js
let username;

const displayName =
  username ?? "Guest";
```

Result:

```text
Guest
```

Because an uninitialized variable declared with `let` has the value:

```text
undefined
```

---

# 12. `false` Does Not Use the Fallback

```js
const isActive = false;

const result =
  isActive ?? true;

console.log(result);
```

Output:

```text
false
```

This is often exactly what you want.

If `false` is a meaningful value, `??` preserves it.

---

# 13. `0` Does Not Use the Fallback

```js
const score = 0;

const result =
  score ?? 100;

console.log(result);
```

Output:

```text
0
```

This is different from:

```js
const result =
  score || 100;
```

which would return:

```text
100
```

---

# 14. Empty String Does Not Use the Fallback

```js
const name = "";

const result =
  name ?? "Unknown";

console.log(result);
```

Output:

```text
""
```

An empty string is not nullish.

Whether an empty string should be accepted is a validation/business-logic question, not a nullish-coalescing question.

---

# 15. `NaN` Does Not Use the Fallback

```js
const value = NaN;

console.log(value ?? 100);
```

Output:

```text
NaN
```

This can be surprising if you expect `??` to replace every invalid value.

It does not.

If you need to handle `NaN`, you need explicit logic such as:

```js
Number.isNaN(value)
```

---

# 16. Arrays and Objects Are Not Nullish

An empty array:

```js
const items = [];

console.log(items ?? ["default"]);
```

returns:

```text
[]
```

An empty object:

```js
const user = {};

console.log(user ?? { name: "Guest" });
```

returns:

```text
{}
```

Both values exist.

---

# 17. `??` Is a Fallback Operator, Not a Validation Operator

Consider:

```js
const age = "unknown";

const result =
  age ?? 18;
```

The result is:

```text
"unknown"
```

because the value is not nullish.

`??` does not determine whether the value is valid.

It only determines whether it is:

```text
null
```

or:

```text
undefined
```

---

# 18. Short-Circuiting

The right side of `??` is evaluated only when necessary.

Example:

```js
const value = "JavaScript";

const result =
  value ?? expensiveOperation();
```

Because `value` is not nullish:

```text
expensiveOperation()
```

does not execute.

This behavior is called **short-circuit evaluation**.

---

# 19. Short-Circuiting with `null`

```js
const value = null;

const result =
  value ?? expensiveOperation();
```

Now the right side must be evaluated:

```text
expensiveOperation()
```

because the left side is nullish.

---

# 20. Short-Circuiting with `undefined`

```js
const value = undefined;

const result =
  value ?? expensiveOperation();
```

Again, the right side executes.

---

# 21. `??` Returns the Original Value

Consider:

```js
const value = false;

const result = value ?? true;
```

The result is exactly:

```text
false
```

It does not convert the value into a Boolean.

Similarly:

```js
const value = 0;

const result = value ?? 100;
```

returns the original number:

```text
0
```

---

# 22. Chaining `??`

You can use multiple nullish fallbacks:

```js
const value =
  firstValue ??
  secondValue ??
  thirdValue ??
  "Default";
```

JavaScript evaluates from left to right.

It returns the first value that is not nullish.

Example:

```js
const firstValue = null;
const secondValue = undefined;
const thirdValue = "Available";

const result =
  firstValue ??
  secondValue ??
  thirdValue ??
  "Default";
```

Result:

```text
Available
```

---

# 23. Mental Model for Chaining

Think:

```text
firstValue
    ↓
null?
    ↓ yes
secondValue
    ↓
undefined?
    ↓ yes
thirdValue
    ↓
exists
    ↓
return thirdValue
```

The first non-nullish value wins.

---

# 24. `??` with Optional Chaining

One of the most important modern JavaScript patterns is:

```js
user?.profile?.name ?? "Guest";
```

There are two operations here.

### `?.`

Safely accesses nested data.

```js
user?.profile?.name
```

### `??`

Provides a fallback if the result is:

```text
null
```

or:

```text
undefined
```

Together:

```js
const name =
  user?.profile?.name ?? "Guest";
```

means:

> Safely read the user's profile name, and use `"Guest"` only when the result is nullish.

---

# 25. Example with API Data

Suppose:

```js
const response = {
  data: {
    user: null,
  },
};
```

You can write:

```js
const name =
  response?.data?.user?.name
  ?? "Unknown User";
```

Result:

```text
Unknown User
```

This combination is extremely common in applications.

---

# 26. React Example

Consider a component receiving optional data:

```jsx
function Profile({ user }) {
  return (
    <h1>
      {user?.profile?.name ?? "Guest"}
    </h1>
  );
}
```

If:

```js
user === null
```

the rendered value is:

```text
Guest
```

If:

```js
user.profile.name === "Osama Abu Motlaq"
```

the rendered value is:

```text
Osama Abu Motlaq
```

---

# 27. React State Example

Consider:

```jsx
const [count, setCount] = useState(null);
```

You can provide a fallback:

```jsx
<p>{count ?? 0}</p>
```

When:

```text
count === null
```

the UI displays:

```text
0
```

But when:

```text
count === 0
```

it still displays:

```text
0
```

This is preferable to:

```jsx
<p>{count || 0}</p>
```

when `0` is a meaningful value.

---

# 28. Boolean State

Suppose:

```js
const isOnline = false;
```

This is correct:

```js
const status =
  isOnline ?? true;
```

Result:

```text
false
```

Using:

```js
const status =
  isOnline || true;
```

would incorrectly produce:

```text
true
```

This demonstrates why `??` matters for Boolean data.

---

# 29. Numeric Data

Suppose an API returns:

```js
const price = 0;
```

Using:

```js
const displayPrice =
  price ?? 100;
```

preserves:

```text
0
```

Using:

```js
const displayPrice =
  price || 100;
```

changes it to:

```text
100
```

If zero means "free", the second version is incorrect.

---

# 30. Configuration Example

Consider:

```js
const config = {
  port: 0,
};
```

You could write:

```js
const port =
  config.port ?? 3000;
```

The result is:

```text
0
```

Whether `0` is a valid port is a separate validation question.

The important point is that `??` does not treat `0` as missing.

---

# 31. Function Parameters and `??`

You can use `??` inside a function:

```js
function greet(name) {
  const displayName =
    name ?? "Guest";

  return `Hello, ${displayName}`;
}
```

Then:

```js
greet();
```

returns:

```text
Hello, Guest
```

And:

```js
greet("Osama Abu Motlaq");
```

returns:

```text
Hello, Osama Abu Motlaq
```

---

# 32. `??` vs Default Parameters

These are related but not identical.

Default parameter:

```js
function greet(
  name = "Guest"
) {
  return name;
}
```

The default is used when the argument is:

```text
undefined
```

But:

```js
greet(null);
```

returns:

```text
null
```

With:

```js
function greet(name) {
  return name ?? "Guest";
}
```

both:

```text
undefined
null
```

use the fallback.

---

# 33. Comparison with Default Parameters

| Situation   | `name = "Guest"` | `name ?? "Guest"` |
| ----------- | ---------------: | ----------------: |
| No argument |        `"Guest"` |         `"Guest"` |
| `undefined` |        `"Guest"` |         `"Guest"` |
| `null`      |           `null` |         `"Guest"` |
| `""`        |             `""` |              `""` |
| `0`         |              `0` |               `0` |
| `false`     |          `false` |           `false` |

This distinction is important.

---

# 34. `??` Assignment Operator

JavaScript also provides:

```js
??=
```

This is called the **Nullish Assignment Operator**.

Example:

```js
let username;

username ??= "Guest";

console.log(username);
```

Output:

```text
Guest
```

It assigns the fallback only if the current value is nullish.

---

# 35. `??=` with an Existing Value

```js
let username =
  "Osama Abu Motlaq";

username ??= "Guest";

console.log(username);
```

Output:

```text
Osama Abu Motlaq
```

The assignment does not happen because the value is not nullish.

---

# 36. `??=` vs `||=`

Consider:

```js
let count = 0;

count ||= 10;
```

Result:

```text
10
```

But:

```js
let count = 0;

count ??= 10;
```

Result:

```text
0
```

Again:

```text
||= → falsy
??= → nullish
```

---

# 37. `??=` with Object Properties

Example:

```js
const settings = {
  theme: null,
};

settings.theme ??= "light";

console.log(settings.theme);
```

Output:

```text
light
```

If:

```js
settings.theme = "dark";
```

then:

```js
settings.theme ??= "light";
```

leaves it as:

```text
dark
```

---

# 38. `??=` Does Not Overwrite Valid Falsy Values

```js
const settings = {
  notifications: false,
};

settings.notifications ??= true;
```

The result remains:

```text
false
```

This is useful when `false` is an intentional setting.

---

# 39. `??` and Operator Precedence

Operator precedence determines how expressions are grouped.

For example:

```js
const result =
  a ?? b ? c : d;
```

can be difficult to read.

Do not rely on remembering every precedence rule when the expression is complex.

Use parentheses:

```js
const result =
  (a ?? b) ? c : d;
```

or:

```js
const result =
  a ?? (b ? c : d);
```

depending on the intended logic.

Clear parentheses are often better than clever expressions.

---

# 40. Important Syntax Restriction: `??` with `||` or `&&`

JavaScript does not allow unrestricted mixing of:

```text
??
```

with:

```text
||
```

or:

```text
&&
```

without parentheses.

For example, this is invalid:

```js
const result =
  a ?? b || c;
```

You must explicitly group the logic:

```js
const result =
  (a ?? b) || c;
```

or:

```js
const result =
  a ?? (b || c);
```

The parentheses make your intended evaluation order explicit.

---

# 41. Why JavaScript Restricts the Combination

Consider:

```js
a ?? b || c
```

A developer might interpret it differently from another developer.

Because `??` has different semantics from `||`, JavaScript requires explicit grouping to prevent ambiguous logic.

Therefore:

```js
(a ?? b) || c
```

and:

```js
a ?? (b || c)
```

are valid and clearly communicate different intentions.

---

# 42. `??` Is Not the Same as a Ternary

You could write:

```js
const result =
  value == null
    ? "Default"
    : value;
```

This can behave similarly to:

```js
const result =
  value ?? "Default";
```

But `??` is more concise and communicates the nullish intent directly.

---

# 43. `??` and Loose Equality

A common conceptual relationship is:

```js
value == null
```

which matches:

```text
null
undefined
```

but not:

```text
false
0
""
```

This is one of the few cases where loose equality has a deliberately useful semantic.

Still, for fallback behavior:

```js
value ?? fallback
```

is usually clearer.

---

# 44. `??` Does Not Convert Types

Consider:

```js
const value = "0";

const result =
  value ?? 100;
```

The result is:

```text
"0"
```

The string is not converted into:

```text
0
```

Nullish coalescing only chooses between values.

It does not perform type conversion.

---

# 45. `??` Does Not Validate Types

Consider:

```js
const age = "unknown";

const result =
  age ?? 18;
```

Result:

```text
"unknown"
```

If you require a number, you must validate or convert the value separately.

For example:

```js
const age =
  Number(input);
```

followed by appropriate validation.

---

# 46. `??` with Function Results

Suppose:

```js
function getUsername() {
  return null;
}

const username =
  getUsername() ?? "Guest";
```

Result:

```text
Guest
```

If the function returns:

```js
return "Osama Abu Motlaq";
```

the returned name is preserved.

---

# 47. `??` with Array Access

Example:

```js
const users = [];

const firstUser =
  users[0] ?? "No user";
```

Because:

```js
users[0]
```

is:

```text
undefined
```

the result is:

```text
No user
```

---

# 48. Combining Array Access and Optional Chaining

Suppose the array itself may be nullish:

```js
const users = null;

const name =
  users?.[0]?.name
  ?? "No user";
```

The process is:

```text
users
 ↓
null
 ↓
?. stops
 ↓
undefined
 ↓
?? fallback
 ↓
"No user"
```

This is a very useful real-world pattern.

---

# 49. `??` with Object Destructuring Defaults

These two approaches are different.

Destructuring default:

```js
const {
  name = "Guest",
} = user;
```

The default applies when the property is:

```text
undefined
```

It does not apply to:

```text
null
```

For nullish behavior, you could instead normalize the value:

```js
const name =
  user?.name ?? "Guest";
```

This handles both:

```text
null
undefined
```

---

# 50. React Props and Defaults

Suppose:

```jsx
function Profile({ name }) {
  const displayName =
    name ?? "Guest";

  return <h1>{displayName}</h1>;
}
```

This preserves:

```text
""
0
false
```

if those values are intentionally passed.

Whether those values are acceptable depends on the component's requirements.

---

# 51. React Conditional Rendering

Be careful with:

```jsx
{count || "No count"}
```

If:

```text
count === 0
```

this displays:

```text
No count
```

If zero is valid, use:

```jsx
{count ?? "No count"}
```

Now:

```text
count === 0
```

renders:

```text
0
```

This is a practical distinction you will encounter frequently in React.

---

# 52. `??` and API Responses

Imagine an API returns:

```js
const data = {
  username: null,
  score: 0,
  verified: false,
};
```

You can safely provide defaults:

```js
const username =
  data.username ?? "Guest";

const score =
  data.score ?? 0;

const verified =
  data.verified ?? false;
```

The meaningful values:

```text
0
false
```

are preserved.

---

# 53. `??` with Environment Configuration

In server-side JavaScript or Next.js, you may encounter:

```js
const port =
  process.env.PORT ?? "3000";
```

If `PORT` is undefined, the fallback is used.

Note that environment variables are strings when present, so:

```text
"0"
```

is a string and is not nullish.

Nullish coalescing does not convert it into a number.

---

# 54. `??` and Database Data

Database results can legitimately contain:

```text
null
```

For example:

```js
const profile = {
  bio: null,
};
```

You could display:

```js
const bio =
  profile.bio ?? "No biography";
```

This treats database `NULL` as absent while preserving other valid values.

---

# 55. Important: `??` Does Not Mean "Empty"

A database value of:

```text
null
```

is nullish.

But:

```text
""
```

is not.

Therefore:

```js
const bio = "" ?? "No biography";
```

returns:

```text
""
```

If your application wants an empty string to mean "missing", that requires different logic.

---

# 56. Handling Multiple Conditions

Suppose you want a fallback when a value is:

```text
null
undefined
""
```

Then `??` alone is not enough.

You could explicitly check:

```js
const value =
  input ?? "Default";
```

only handles:

```text
null
undefined
```

For empty strings, you need additional logic, depending on the requirements.

For example:

```js
const value =
  input === ""
    ? "Default"
    : input ?? "Default";
```

Do not use `??` when your business rule is broader than nullishness.

---

# 57. `??` vs Explicit Conditional

This:

```js
const result =
  value ?? fallback;
```

is conceptually similar to:

```js
const result =
  value === null ||
  value === undefined
    ? fallback
    : value;
```

The `??` version is more concise and directly communicates the intent.

---

# 58. `??` and Equality

These are different:

```js
value ?? fallback
```

and:

```js
value === null
  ? fallback
  : value;
```

The second only checks:

```text
null
```

The first checks both:

```text
null
undefined
```

---

# 59. Common Mistake: Using `||` Automatically

A common beginner pattern is:

```js
const value =
  input || "Default";
```

This is not always wrong.

`||` is correct when **any falsy value should trigger the fallback**.

For example:

```js
const label =
  input || "Unnamed";
```

might be intentionally designed to treat:

```text
""
```

as missing.

The mistake is assuming `||` and `??` mean the same thing.

They do not.

---

# 60. Common Mistake: Thinking `??` Handles `NaN`

It does not.

```js
const value = NaN;

console.log(value ?? 0);
```

Result:

```text
NaN
```

If you need a numeric fallback for `NaN`, handle `NaN` explicitly.

---

# 61. Common Mistake: Thinking `??` Handles Empty Strings

It does not.

```js
const name = "";

console.log(
  name ?? "Guest"
);
```

Result:

```text
""
```

If empty strings should be treated as missing, use logic that explicitly handles them.

---

# 62. Common Mistake: Thinking `??` Converts `null` to a Different Type

Example:

```js
const value =
  null ?? 0;
```

The result is:

```text
0
```

But this is not automatic type conversion.

The operator simply selected the right-hand value.

---

# 63. Common Mistake: Overusing `??`

This:

```js
user?.profile?.name
  ?? "Unknown"
```

can be excellent.

But if `name` is required and missing data represents a programming error, silently displaying `"Unknown"` may hide the real problem.

Fallbacks should represent intentional application behavior.

---

# 64. Common Mistake: Using `??` Instead of Validation

Suppose:

```js
const age =
  inputAge ?? 18;
```

This only handles missing values.

It does not reject:

```text
-10
"abc"
{}
[]
```

Validation is still required.

---

# 65. Common Mistake: Confusing `??` with Optional Chaining

Optional chaining:

```js
user?.name
```

means:

> Safely access `name` if `user` is not nullish.

Nullish coalescing:

```js
userName ?? "Guest"
```

means:

> Use `userName`, unless it is nullish.

Together:

```js
user?.name ?? "Guest"
```

means:

> Safely access the name, then use a fallback if the result is nullish.

---

# 66. Common Mistake: Forgetting the `null` Case

Default parameters only replace:

```text
undefined
```

But:

```js
value ?? fallback
```

replaces both:

```text
null
undefined
```

This difference matters when working with API and database data.

---

# 67. When to Use `??`

Use `??` when:

* `null` means missing
* `undefined` means missing
* `0` is valid
* `false` is valid
* `""` is valid
* API data may contain `null`
* Database fields may be `NULL`
* Optional configuration may be absent
* You need a precise nullish fallback

Examples:

```js
count ?? 0
```

```js
isEnabled ?? false
```

```js
user?.name ?? "Guest"
```

---

# 68. When to Use `||`

Use `||` when:

> Any falsy value should cause the fallback.

For example:

```js
const label =
  input || "Unnamed";
```

If an empty string should count as missing, `||` may be exactly what you need.

The choice depends on the intended semantics.

---

# 69. When to Use Explicit Validation

Use validation when you need to distinguish:

```text
missing
invalid
empty
incorrect type
out of range
```

For example:

```js
const age = Number(input);

if (
  !Number.isInteger(age) ||
  age < 0
) {
  throw new Error("Invalid age");
}
```

Do not try to solve validation using `??`.

---

# 70. `??` and Modern JavaScript

Nullish coalescing is part of modern JavaScript and works naturally with other modern syntax:

```js
user?.profile?.name ?? "Guest"
```

```js
settings.theme ??= "light";
```

```js
const value =
  first ?? second ?? third;
```

These patterns are common in modern frontend and backend JavaScript.

---

# 71. React Relevance

For React, `??` is highly relevant.

You should understand it well because it appears when handling:

* API responses
* optional props
* asynchronous state
* form values
* database results
* configuration
* optional user data

Especially remember:

```jsx
{count ?? 0}
```

preserves:

```text
0
```

while:

```jsx
{count || 0}
```

also replaces other falsy values.

---

# 72. Next.js Relevance

For Next.js, `??` is useful when working with:

* server-side data
* route parameters
* environment variables
* database results
* API responses
* optional configuration
* authentication/session data

Example:

```js
const port =
  process.env.PORT ?? "3000";
```

Or:

```js
const title =
  post?.title ?? "Untitled";
```

---

# 73. Decision Guide

Ask:

### Do I only want to handle `null` and `undefined`?

Use:

```js
value ?? fallback
```

### Do I want every falsy value to trigger the fallback?

Use:

```js
value || fallback
```

### Do I want to safely access a possibly missing object?

Use:

```js
object?.property
```

### Do I want safe access plus a nullish fallback?

Use:

```js
object?.property ?? fallback
```

### Do I need to validate the value?

Use:

```text
validation logic
```

not simply `??`.

---

# 74. Quick Reference

### Basic

```js
value ?? fallback
```

### Multiple fallbacks

```js
a ?? b ?? c ?? fallback
```

### Optional chaining + nullish coalescing

```js
user?.profile?.name ?? "Guest"
```

### Nullish assignment

```js
value ??= fallback
```

### Preserve `0`

```js
count ?? 0
```

### Preserve `false`

```js
isEnabled ?? false
```

### Preserve empty string

```js
name ?? "Guest"
```

---

# 75. Operator Comparison

| Operator | Checks              | Preserves `0`? | Preserves `false`? | Preserves `""`? |    |    |
| -------- | ------------------- | -------------: | -----------------: | --------------: | -- | -- |
| `??`     | `null`, `undefined` |            Yes |                Yes |             Yes |    |    |
| `        |                     |              ` |   All falsy values |              No | No | No |
| `??=`    | `null`, `undefined` |            Yes |                Yes |             Yes |    |    |
| `        |                     |             =` |   All falsy values |              No | No | No |

---

# 76. Mental Model

Think of:

```js
value ?? fallback
```

as:

```text
Is value null?
      │
      ├── Yes → fallback
      │
      └── No
           ↓
      Is value undefined?
           │
           ├── Yes → fallback
           │
           └── No → value
```

The key question is:

> "Is this value missing because it is `null` or `undefined`?"

If yes, use the fallback.

If no, preserve the value.

---

# 77. The Three Operators You Should Connect

Modern JavaScript frequently combines:

```text
?.   → safe access
??   → nullish fallback
||   → falsy fallback
```

Example:

```js
const name =
  user?.profile?.name
  ?? "Guest";
```

Read it as:

```text
Safely access the name.
If it is null or undefined,
use "Guest".
```

---

# 78. Final Example

Consider:

```js
const response = {
  user: {
    profile: {
      name: "Osama Abu Motlaq",
      age: 0,
      verified: false,
      bio: "",
    },
  },
};
```

Using optional chaining and nullish coalescing:

```js
const name =
  response?.user?.profile?.name
  ?? "Guest";

const age =
  response?.user?.profile?.age
  ?? 18;

const verified =
  response?.user?.profile?.verified
  ?? true;

const bio =
  response?.user?.profile?.bio
  ?? "No biography";
```

Results:

```text
name     → "Osama Abu Motlaq"
age      → 0
verified → false
bio      → ""
```

Notice that:

```text
0
false
""
```

are preserved.

That is exactly the behavior that distinguishes `??` from `||`.

---

# 79. Key Takeaways

1. `??` is the Nullish Coalescing Operator.
2. It provides a fallback for `null` and `undefined`.
3. It does not treat all falsy values as missing.
4. `0` is preserved.
5. `false` is preserved.
6. `""` is preserved.
7. `NaN` is preserved.
8. Empty arrays are preserved.
9. Empty objects are preserved.
10. `??` short-circuits.
11. The right side is evaluated only when the left side is nullish.
12. `??` can be chained.
13. `??` works extremely well with `?.`.
14. `??=` performs nullish assignment.
15. `||` and `??` have different semantics.
16. Default parameters handle `undefined`, while `??` handles `null` and `undefined`.
17. `??` does not perform validation.
18. `??` does not perform type conversion.
19. `??` does not handle `NaN` specially.
20. `??` does not treat an empty string as missing.
21. Parentheses are required when mixing `??` with `||` or `&&`.
22. React uses `??` frequently for optional or asynchronous data.
23. Next.js uses `??` frequently with configuration, APIs, and server-side data.
24. Do not use `??` to hide invalid application state.
25. Choose `??` when only nullish values should trigger the fallback.

---

# Final Principle

The most important distinction to remember is:

```text
?? → "Is it null or undefined?"
```

while:

```text
|| → "Is it falsy?"
```

And when combined with optional chaining:

```js
user?.profile?.name ?? "Guest"
```

you get one of the most useful patterns in modern JavaScript:

```text
?.  → safely access
??  → provide a nullish fallback
```

If `0`, `false`, or `""` are legitimate values, `??` is usually the correct fallback operator.

Use it intentionally—not simply because it is newer syntax.
