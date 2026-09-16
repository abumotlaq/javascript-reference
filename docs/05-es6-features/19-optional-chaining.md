# Optional Chaining (`?.`)

> A deep reference to JavaScript Optional Chaining, including property access, nested objects, arrays, function calls, computed properties, short-circuiting, `null`/`undefined`, interaction with `??`, `&&`, React, APIs, and common mistakes.

---

# 1. What Is Optional Chaining?

**Optional Chaining** is a JavaScript feature that allows you to safely access a property, method, or element when part of the access chain may be `null` or `undefined`.

The syntax is:

```js
object?.property
```

Instead of:

```js
object.property
```

If `object` is `null` or `undefined`, JavaScript returns:

```js
undefined
```

instead of throwing a `TypeError`.

---

# 2. The Problem Optional Chaining Solves

Consider:

```js
const user = null;

console.log(user.name);
```

This throws:

```text
TypeError
```

because JavaScript cannot access:

```text
name
```

from:

```text
null
```

With optional chaining:

```js
console.log(user?.name);
```

the result is:

```text
undefined
```

No exception is thrown.

---

# 3. Basic Syntax

The basic syntax is:

```js
object?.property
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(user?.name);
```

Output:

```text
Osama Abu Motlaq
```

If:

```js
const user = null;
```

then:

```js
console.log(user?.name);
```

returns:

```text
undefined
```

---

# 4. `?.` Only Protects Against `null` and `undefined`

This is one of the most important rules.

Optional chaining checks whether the value immediately before `?.` is:

```text
null
```

or:

```text
undefined
```

For example:

```js
const user = null;

console.log(user?.name);
```

returns:

```text
undefined
```

But optional chaining does not mean:

```text
"ignore every possible error"
```

---

# 5. It Does Not Protect Against Every Invalid Value

Consider:

```js
const user = 10;

console.log(user?.name);
```

JavaScript can safely perform property access on primitive values through boxing semantics, so this does not behave like accessing a property on `null` or `undefined`.

Optional chaining specifically addresses the nullish case.

Do not think of `?.` as a general-purpose error suppression operator.

---

# 6. Nested Property Access

Suppose:

```js
const user = {
  profile: {
    name: "Osama Abu Motlaq",
  },
};
```

You can write:

```js
console.log(user?.profile?.name);
```

Output:

```text
Osama Abu Motlaq
```

Each potentially missing level can be protected.

---

# 7. Why Multiple `?.` Operators May Be Necessary

Consider:

```js
const user = {};
```

This is safe:

```js
user?.profile?.name
```

because:

```text
user
→ exists

user.profile
→ undefined

undefined?.name
→ undefined
```

But:

```js
user?.profile.name
```

can still fail.

Why?

The optional chain only protected:

```text
user
```

Once `user.profile` evaluates to `undefined`, `.name` is a normal property access.

Therefore, when multiple levels may be missing, use:

```js
user?.profile?.name
```

---

# 8. Step-by-Step Evaluation

Consider:

```js
const user = null;

const name = user?.profile?.name;
```

Conceptually:

```text
user
 ↓
null
 ↓
?. stops the chain
 ↓
undefined
```

The later property access is not evaluated.

This is called **short-circuiting**.

---

# 9. Optional Chaining Short-Circuits

Optional chaining stops evaluation when the value before `?.` is:

```text
null
```

or:

```text
undefined
```

Example:

```js
const user = null;

console.log(user?.profile?.name);
```

JavaScript does not continue trying to access:

```text
profile
name
```

after the chain has already become nullish.

---

# 10. Optional Chaining Returns `undefined`

When optional chaining short-circuits:

```js
const user = null;

const result = user?.name;
```

then:

```js
console.log(result);
```

outputs:

```text
undefined
```

This is important because you can combine optional chaining with:

```text
??
```

to provide a fallback.

---

# 11. Optional Chaining with Nullish Coalescing

This is one of the most useful combinations:

```js
const name = user?.profile?.name ?? "Unknown";
```

If the property exists:

```text
Osama Abu Motlaq
```

If the property is missing:

```text
Unknown
```

The pattern is:

```js
value?.property ?? fallback
```

---

# 12. `?.` vs `??`

These operators solve different problems.

### Optional chaining

```js
user?.name
```

means:

```text
"Safely access name if user exists."
```

### Nullish coalescing

```js
user?.name ?? "Unknown"
```

means:

```text
"If the result is null or undefined, use Unknown."
```

Together they are extremely useful for API data.

---

# 13. `?.` vs `||`

Consider:

```js
const name = user?.name || "Unknown";
```

This treats all falsy values as missing:

```text
false
0
""
NaN
null
undefined
```

But:

```js
const value = user?.value ?? 0;
```

only treats:

```text
null
undefined
```

as missing.

Therefore:

```text
?. + ??
```

is usually more precise when `0`, `false`, or `""` are valid values.

---

# 14. Optional Chaining with Arrays

You can safely access an array:

```js
const users = null;

console.log(users?.[0]);
```

Result:

```text
undefined
```

Without optional chaining:

```js
users[0];
```

would throw an error if `users` were `null` or `undefined`.

---

# 15. Optional Chaining with Array Elements

Example:

```js
const users = [
  {
    name: "Osama Abu Motlaq",
  },
];

console.log(users?.[0]?.name);
```

Output:

```text
Osama Abu Motlaq
```

If the array is empty:

```js
const users = [];
```

then:

```js
console.log(users?.[0]?.name);
```

returns:

```text
undefined
```

---

# 16. Optional Chaining with Computed Properties

You can combine optional chaining with bracket notation.

Example:

```js
const key = "name";

const user = {
  name: "Osama Abu Motlaq",
};

console.log(user?.[key]);
```

Output:

```text
Osama Abu Motlaq
```

This is useful when the property name is stored in a variable.

---

# 17. Optional Chaining with Nested Computed Properties

Example:

```js
const section = "profile";
const field = "name";

const user = {
  profile: {
    name: "Osama Abu Motlaq",
  },
};

console.log(user?.[section]?.[field]);
```

Output:

```text
Osama Abu Motlaq
```

---

# 18. Optional Method Calls

Optional chaining can also safely call a method.

Syntax:

```js
object.method?.()
```

Example:

```js
const user = {
  greet() {
    return "Hello";
  },
};

console.log(user.greet?.());
```

Output:

```text
Hello
```

---

# 19. Method May Not Exist

Suppose:

```js
const user = {};
```

Then:

```js
console.log(user.greet?.());
```

returns:

```text
undefined
```

instead of throwing because `greet` is not defined as a function.

This is useful when a callback or optional method may or may not be provided.

---

# 20. Important Difference: `object?.method()`

Compare:

```js
object?.method()
```

with:

```js
object.method?.()
```

They protect different parts.

### `object?.method()`

Protects the object:

```text
object may be nullish
```

but assumes:

```text
method exists and is callable
```

### `object.method?.()`

Protects the method:

```text
method may be nullish
```

but assumes:

```text
object exists
```

---

# 21. Protecting Both Object and Method

If both can be missing:

```js
object?.method?.();
```

Example:

```js
const user = null;

user?.greet?.();
```

No error occurs.

---

# 22. Optional Chaining with Callbacks

This is common in JavaScript.

Suppose a function accepts an optional callback:

```js
function processUser(user, onComplete) {
  console.log(user);

  onComplete?.();
}
```

Calling:

```js
processUser(
  { name: "Osama Abu Motlaq" }
);
```

does not throw if `onComplete` was not provided.

---

# 23. Why `callback?.()` Is Useful

Without optional chaining:

```js
if (onComplete) {
  onComplete();
}
```

With optional chaining:

```js
onComplete?.();
```

The second version is concise and communicates:

```text
"Call this function if it exists."
```

---

# 24. Optional Chaining with Function Arguments

You can pass arguments normally:

```js
onComplete?.("success");
```

If the function exists:

```text
"success"
```

is passed to it.

If the function is missing:

```text
nothing happens
```

and the expression evaluates to:

```text
undefined
```

---

# 25. Optional Chaining and `this`

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return `Hello, ${this.name}`;
  },
};

console.log(user.greet?.());
```

The method is still called as:

```text
user.greet()
```

so its normal method receiver is preserved.

Optional chaining does not automatically change the meaning of `this`.

---

# 26. Optional Chaining Is Not the Same as `&&`

Before optional chaining, developers often wrote:

```js
user &&
user.profile &&
user.profile.name;
```

Optional chaining simplifies this:

```js
user?.profile?.name;
```

The intent is much clearer.

---

# 27. Comparing `&&` and `?.`

Old pattern:

```js
const name =
  user &&
  user.profile &&
  user.profile.name;
```

Modern pattern:

```js
const name =
  user?.profile?.name;
```

The modern version is easier to read and specifically communicates nullish-safe access.

---

# 28. Important Difference Between `&&` and `?.`

They are not completely identical.

Consider:

```js
const value = 0;

console.log(value && value.name);
```

The result is:

```text
0
```

But:

```js
console.log(value?.name);
```

does not stop because `0` is not `null` or `undefined`.

Optional chaining is specifically **nullish-aware**, not generally falsy-aware.

---

# 29. Optional Chaining Does Not Check Business Validity

Consider:

```js
const user = {
  name: "",
};
```

This is a valid object.

```js
user?.name
```

returns:

```text
""
```

Optional chaining does not decide whether an empty string is a valid value.

That is a business-logic decision.

---

# 30. Optional Chaining and API Data

Optional chaining is especially useful with API responses.

Example:

```js
const response = {
  data: {
    user: {
      profile: {
        name: "Osama Abu Motlaq",
      },
    },
  },
};
```

You can write:

```js
const name =
  response?.data?.user?.profile?.name;
```

If any intermediate object is missing, the result becomes:

```text
undefined
```

---

# 31. Combining API Access with a Fallback

```js
const name =
  response?.data?.user?.profile?.name
  ?? "Unknown User";
```

This gives a safe fallback.

This pattern appears frequently when consuming APIs whose response shape may vary.

---

# 32. Optional Chaining in React

React applications often render data that arrives asynchronously.

Initially:

```js
const user = null;
```

Later:

```js
const user = {
  profile: {
    name: "Osama Abu Motlaq",
  },
};
```

You can safely render:

```jsx
<h1>{user?.profile?.name}</h1>
```

Before the data exists:

```text
nothing is rendered
```

After the data arrives:

```text
Osama Abu Motlaq
```

---

# 33. Optional Chaining with React Props

Suppose a component receives optional data:

```jsx
function Profile({ user }) {
  return (
    <h1>
      {user?.profile?.name}
    </h1>
  );
}
```

If `user` is undefined:

```jsx
<Profile />
```

the expression safely evaluates to:

```text
undefined
```

---

# 34. Optional Chaining with Context Data

Suppose a context value can initially be undefined:

```js
const user = useContext(UserContext);
```

You may encounter:

```js
user?.name
```

or:

```js
user?.profile?.name
```

while the data is loading or optional.

However, if the value is required by the component, relying on optional chaining everywhere may hide architectural problems.

---

# 35. Optional Chaining Should Not Replace Proper State Design

Consider:

```jsx
<h1>{user?.profile?.name}</h1>
```

This can be correct.

But if the component absolutely requires a valid user, constantly using:

```js
user?.profile?.name
user?.profile?.email
user?.profile?.role
```

may hide the fact that the component should only render when `user` exists.

Sometimes a conditional is clearer:

```jsx
if (!user) {
  return <p>Loading...</p>;
}
```

Then:

```jsx
return <h1>{user.profile.name}</h1>;
```

Use optional chaining when absence is genuinely expected.

---

# 36. Optional Chaining with React Event Handlers

Suppose an optional callback is passed:

```jsx
function Button({ onClick }) {
  return (
    <button onClick={() => onClick?.()}>
      Save
    </button>
  );
}
```

If `onClick` exists, it is called.

If it does not exist, nothing happens.

---

# 37. Optional Chaining with DOM APIs

Optional chaining can also be used with browser APIs.

Example:

```js
const element =
  document.querySelector("#app");

element?.classList.add("active");
```

If no matching element exists:

```text
element === null
```

then:

```js
element?.classList
```

short-circuits.

---

# 38. Optional Chaining with Nested DOM Properties

Example:

```js
const input =
  document.querySelector("#email");

const value =
  input?.form?.action;
```

If:

```text
input
```

or:

```text
input.form
```

is missing, the result is:

```text
undefined
```

---

# 39. Optional Chaining with Maps

You can safely access a value returned by a Map lookup:

```js
const users = new Map();

const user = users.get("user-1");

console.log(user?.name);
```

If the key does not exist:

```js
users.get("user-1")
```

returns:

```text
undefined
```

Then:

```js
user?.name
```

also produces:

```text
undefined
```

---

# 40. Optional Chaining with Arrays of Objects

Example:

```js
const projects = [
  {
    owner: {
      name: "Osama Abu Motlaq",
    },
  },
];
```

You can write:

```js
console.log(
  projects[0]?.owner?.name
);
```

Output:

```text
Osama Abu Motlaq
```

If the array has no first element:

```js
projects[0]
```

is `undefined`, so the chain safely stops.

---

# 41. Optional Chaining and Function Return Values

Suppose:

```js
function getUser() {
  return null;
}
```

Then:

```js
const name =
  getUser()?.profile?.name;
```

returns:

```text
undefined
```

The optional chain starts from the function result.

---

# 42. Optional Chaining with Bracket Access

These are both valid:

```js
user?.name
```

and:

```js
user?.["name"]
```

The second form is useful when the property name is dynamic.

---

# 43. Optional Chaining with Expressions

Computed property access can contain an expression:

```js
const key = "name";

user?.[key];
```

The expression inside the brackets is used only if the chain proceeds.

---

# 44. Short-Circuiting Can Avoid Work

Consider:

```js
let count = 0;

const user = null;

user?.[count++];
```

Because `user` is nullish, the optional chain short-circuits.

The property access does not proceed.

This means:

```js
count
```

remains:

```text
0
```

This demonstrates that optional chaining can prevent evaluation of later parts of the chain.

---

# 45. Grouping Can Break the Chain

This is an important subtlety.

Consider:

```js
const user = null;

(user?.profile).name;
```

This can throw an error.

Why?

Because:

```js
user?.profile
```

evaluates to:

```text
undefined
```

Then the parentheses end the optional chain.

The following:

```js
.name
```

is a normal property access on `undefined`.

---

# 46. Continuous Chain

This is safe:

```js
user?.profile?.name;
```

The chain remains continuous.

But:

```js
(user?.profile).name;
```

breaks the chain.

Mental model:

```text
user?.profile?.name
        ↑
   same optional chain
```

versus:

```text
(user?.profile).name
              ↑
       normal access
```

---

# 47. Optional Chaining Cannot Be Used Everywhere

Optional chaining has syntax restrictions.

For example, this is invalid:

```js
user?.name = "Osama Abu Motlaq";
```

You cannot assign through an optional chain.

Optional chaining is designed for safe access, not assignment.

---

# 48. Optional Chaining Cannot Be Used as an Assignment Target

This is invalid:

```js
user?.profile?.name = "Osama Abu Motlaq";
```

If you need to modify the object, you must first establish that the required object exists.

For example:

```js
if (user?.profile) {
  user.profile.name = "Osama Abu Motlaq";
}
```

---

# 49. Optional Chaining and `delete`

Optional chaining can be used with `delete` in supported JavaScript syntax:

```js
delete user?.profile;
```

If `user` is nullish, the operation safely evaluates without trying to access the property.

Use this carefully because deletion is still a mutation.

---

# 50. Optional Chaining and `new`

You cannot use optional chaining directly in certain constructor positions.

For example, optional chaining is not a general replacement for constructor existence checks.

If you need conditional construction, use explicit logic rather than trying to construct through an optional chain.

---

# 51. Optional Chaining and Tagged Templates

Optional chaining cannot be used in every tagged-template position.

The syntax has restrictions around:

```text
tag?.`template`
```

Do not assume that `?.` can simply be inserted before every JavaScript operator or syntax construct.

---

# 52. Common Mistake: Using `?.` Everywhere

Bad:

```js
user?.profile?.name
user?.profile?.email
user?.profile?.role
user?.profile?.id
```

when the application guarantees that `user.profile` exists.

This can hide programming errors.

If the data is required, accessing it normally can expose bugs earlier:

```js
user.profile.name
```

Use optional chaining when absence is a valid possibility.

---

# 53. Common Mistake: Confusing Missing Data with Invalid Data

Suppose:

```js
const user = {
  name: "",
};
```

Then:

```js
user?.name
```

returns:

```text
""
```

If the application requires a non-empty name, optional chaining does not solve that validation problem.

You need validation.

---

# 54. Common Mistake: Forgetting the Difference Between `?.()` and `?.`

Compare:

```js
user?.greet
```

This safely accesses the property.

But:

```js
user?.greet?.()
```

safely calls the function if it exists.

These are different operations.

---

# 55. Common Mistake: Assuming `?.()` Validates Anything

Consider:

```js
const user = {
  greet: "hello",
};

user.greet?.();
```

The property exists, but it is not callable.

Optional chaining does not convert a non-function into a function.

The call still fails because:

```text
"hello"
```

is not callable.

---

# 56. Common Mistake: Confusing `?.` with `??`

This:

```js
user?.name
```

is about:

```text
safe access
```

This:

```js
user?.name ?? "Unknown"
```

is about:

```text
safe access + fallback
```

Do not treat the two operators as interchangeable.

---

# 57. Common Mistake: Confusing `?.` with `||`

Consider:

```js
const count = 0;

const result = count || 10;
```

Result:

```text
10
```

But:

```js
const result = count ?? 10;
```

Result:

```text
0
```

This matters when working with real application data.

---

# 58. Optional Chaining and Error Handling

Optional chaining prevents a specific class of runtime errors:

```text
Cannot read properties of null
Cannot read properties of undefined
```

It does not replace:

```text
try/catch
validation
error handling
```

For example:

```js
user?.profile?.name
```

does not mean the entire operation can never fail.

Other code in the expression may still throw.

---

# 59. Optional Chaining Does Not Validate API Structure

This:

```js
response?.data?.user?.profile?.name
```

prevents nullish property-access errors.

It does not guarantee that:

```text
name
```

is a string.

The result could still be:

```text
0
false
[]
{}
""
```

depending on the data.

Optional chaining provides safe access, not schema validation.

---

# 60. Optional Chaining and TypeScript

TypeScript frequently works with potentially optional values.

For example:

```ts
type User = {
  profile?: {
    name?: string;
  };
};
```

Then:

```ts
user?.profile?.name
```

is a natural way to safely access optional properties.

However, TypeScript's type system can often help you determine whether a value is actually required.

Do not use optional chaining merely to silence type errors without understanding why a value may be absent.

---

# 61. Optional Chaining with `??` in TypeScript

A common pattern is:

```ts
const name =
  user?.profile?.name ?? "Unknown";
```

The inferred result is based on the possible types.

This combines:

```text
safe property access
+
nullish fallback
```

---

# 62. Optional Chaining in Next.js

Next.js applications frequently process:

```text
API responses
database results
route parameters
session/user information
optional configuration
CMS data
```

Some values may not exist during certain stages.

For example:

```js
const name =
  profile?.user?.name ?? "Guest";
```

This is a common JavaScript pattern regardless of whether the code runs on the client or server.

---

# 63. Optional Chaining with Database Results

Suppose a query returns:

```js
const result = {
  data: null,
  error: null,
};
```

You could safely inspect:

```js
const name = result?.data?.name;
```

which returns:

```text
undefined
```

However, database code should still handle errors and validate expected data.

Do not use optional chaining as a replacement for proper database error handling.

---

# 64. Optional Chaining with Configuration

Suppose:

```js
const config = {
  database: {
    host: "localhost",
  },
};
```

You can write:

```js
const port =
  config?.database?.port ?? 5432;
```

If the port is missing:

```text
5432
```

is used.

---

# 65. Optional Chaining and Destructuring

Optional chaining cannot be inserted directly into a destructuring pattern.

This is invalid:

```js
const {
  user?.name,
} = data;
```

Instead, safely obtain the value first:

```js
const name =
  data?.user?.name;
```

Or provide a safe object before destructuring:

```js
const user = data?.user ?? {};

const {
  name,
} = user;
```

---

# 66. Optional Chaining and Array Methods

You can conditionally call array methods:

```js
users?.map((user) => user.name);
```

If:

```text
users === null
```

the result is:

```text
undefined
```

instead of throwing.

However, if `users` exists but is not actually an array with a callable `map`, this is not automatically solved.

---

# 67. `users?.map(...)` vs `users?.map?.(...)`

These are different.

```js
users?.map(...)
```

protects:

```text
users
```

but assumes `map` is callable.

Whereas:

```js
users?.map?.(...)
```

protects both:

```text
users
map
```

The second is rarely necessary for a known array because arrays are expected to have `map`.

---

# 68. Optional Chaining with Strings

Example:

```js
const value = null;

console.log(value?.length);
```

Result:

```text
undefined
```

But if:

```js
const value = "JavaScript";
```

then:

```js
console.log(value?.length);
```

returns:

```text
10
```

Again, `?.` specifically protects against nullish values.

---

# 69. Optional Chaining with Numbers

Example:

```js
const value = 42;

console.log(value?.toString());
```

This is allowed because `42` is not nullish.

Optional chaining is not limited to objects.

The key condition is whether the base value is:

```text
null
```

or:

```text
undefined
```

---

# 70. Optional Chaining and `null`

Remember:

```js
null?.anything
```

returns:

```text
undefined
```

It does not return:

```text
null
```

Optional chaining converts the nullish access result into:

```text
undefined
```

---

# 71. Optional Chaining and `undefined`

Similarly:

```js
undefined?.anything
```

returns:

```text
undefined
```

No exception is thrown.

---

# 72. Optional Chaining Does Not Change Existing Values

Consider:

```js
const user = {
  name: null,
};
```

Then:

```js
user?.name
```

returns:

```text
null
```

The property itself exists and contains `null`.

Optional chaining only controls what happens when the value before the optional chain is nullish.

This distinction matters.

---

# 73. `null` vs Missing Property

Consider:

```js
const userA = {};

const userB = {
  name: null,
};
```

Then:

```js
userA?.name
```

returns:

```text
undefined
```

while:

```js
userB?.name
```

returns:

```text
null
```

Optional chaining does not convert an existing `null` property into `undefined`.

---

# 74. Combining Both with `??`

If you want both:

```text
undefined
null
```

to use a fallback:

```js
user?.name ?? "Unknown";
```

Then both cases result in:

```text
Unknown
```

---

# 75. Performance

Optional chaining is primarily a readability and correctness feature.

Modern JavaScript engines optimize common property access patterns heavily.

Do not avoid `?.` simply because it looks like an additional operation.

Choose syntax based on correctness and clarity.

---

# 76. When to Use Optional Chaining

Use it when:

* A value is genuinely optional
* API data may omit a property
* A callback may not be provided
* An object may be `null`
* An array may not exist
* A nested property is optional
* A DOM element may not exist
* A configuration property is optional

Examples:

```js
user?.profile?.name
```

```js
users?.[0]?.name
```

```js
onComplete?.()
```

```js
config?.database?.port
```

---

# 77. When Not to Use Optional Chaining

Avoid it when:

* The value is guaranteed to exist
* Missing data represents a programming error
* You need validation rather than safe access
* It hides an important invariant
* The application should fail loudly when data is invalid

For example, if every authenticated page must have a valid user:

```js
user.profile.name
```

may be more appropriate than:

```js
user?.profile?.name
```

because it exposes incorrect state immediately.

---

# 78. Optional Chaining Decision Rule

Ask:

> "Is this value legitimately allowed to be missing?"

If yes:

```js
value?.property
```

If no:

```js
value.property
```

This simple question prevents overuse.

---

# 79. Quick Reference

### Property access

```js
user?.name
```

### Nested property

```js
user?.profile?.name
```

### Array index

```js
users?.[0]
```

### Dynamic property

```js
user?.[key]
```

### Optional method call

```js
user.greet?.()
```

### Protect object and method

```js
user?.greet?.()
```

### With fallback

```js
user?.name ?? "Unknown"
```

### Array method

```js
users?.map(...)
```

---

# 80. Comparison Table

| Syntax                    | Purpose                                |
| ------------------------- | -------------------------------------- |
| `user.name`               | Normal property access                 |
| `user?.name`              | Safe access when `user` may be nullish |
| `user?.profile?.name`     | Safe nested access                     |
| `users?.[0]`              | Safe array/index access                |
| `user?.[key]`             | Safe computed property access          |
| `user.greet?.()`          | Call method if it exists               |
| `user?.greet?.()`         | Protect object and method              |
| `user?.name ?? "Unknown"` | Safe access + nullish fallback         |
| `user && user.name`       | Older truthy-based guard               |

---

# 81. Mental Model

Think of:

```js
user?.profile?.name
```

as:

```text
Can I safely continue?
        │
        ↓
Is user nullish?
   │          │
  yes         no
   │           │
undefined    profile
               │
               ↓
       Is profile nullish?
          │          │
         yes         no
          │           │
     undefined       name
```

The chain stops when it encounters:

```text
null
```

or:

```text
undefined
```

---

# 82. The Most Important Distinction

Remember these three concepts:

```text
?.  → safe access
??  → nullish fallback
||  → falsy fallback
```

Example:

```js
user?.name
```

means:

```text
"Safely access name."
```

```js
user?.name ?? "Unknown"
```

means:

```text
"Safely access name, and use Unknown if the result is nullish."
```

```js
user?.name || "Unknown"
```

means:

```text
"Safely access name, and use Unknown if the result is falsy."
```

---

# 83. React Mental Model

When rendering asynchronous or optional data:

```jsx
{user?.profile?.name}
```

think:

```text
Data may not exist yet
        ↓
avoid null/undefined property error
        ↓
render the value when available
```

But if the data is required:

```text
missing data
    ↓
should this be a loading state?
    ↓
should this be an error?
    ↓
should this component not render?
```

Do not automatically solve every missing-value problem with `?.`.

---

# 84. Key Takeaways

1. Optional chaining uses `?.`.
2. It safely accesses values that may be `null` or `undefined`.
3. It returns `undefined` when the chain short-circuits.
4. It supports property access.
5. It supports nested property access.
6. It supports array/index access.
7. It supports computed property names.
8. It supports optional method calls.
9. `object?.method()` protects the object.
10. `object.method?.()` protects the method.
11. `object?.method?.()` can protect both.
12. Optional chaining short-circuits.
13. The chain can be broken by grouping with parentheses.
14. Optional chaining does not protect against every possible error.
15. It does not validate data types.
16. It does not replace error handling.
17. It does not replace validation.
18. It does not allow assignment through the optional chain.
19. `?.` and `??` solve different problems.
20. `?.` and `||` have different falsy/nullish behavior.
21. Optional chaining is extremely useful with API responses.
22. It is common in React components.
23. It is common in Next.js applications.
24. It should not be used everywhere.
25. Use it when missing data is a legitimate possibility.
26. Avoid it when missing data represents a programming error.

---

# Final Principle

Optional chaining is best understood as:

```text
SAFE ACCESS
```

not:

```text
IGNORE ERRORS
```

The core pattern is:

```js
object?.property
```

For nested data:

```js
object?.property?.nestedProperty
```

For optional functions:

```js
callback?.()
```

For dynamic properties:

```js
object?.[key]
```

And for a fallback:

```js
object?.property ?? fallback
```

The most useful mental model is:

```text
?. → "Continue only if this value is not null or undefined."
```

That small idea is one of the most frequently used pieces of modern JavaScript in React and Next.js.
