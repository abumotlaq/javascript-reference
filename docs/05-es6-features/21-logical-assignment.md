# Logical Assignment Operators

> A deep reference to JavaScript Logical Assignment Operators: `||=`, `&&=`, and `??=`, including their semantics, short-circuiting behavior, falsy and nullish values, property assignment, getters and setters, arrays, objects, configuration, React, common mistakes, and practical patterns.

---

# 1. What Are Logical Assignment Operators?

JavaScript provides three logical assignment operators:

```text
||=
&&=
??=
```

They combine a logical operation with assignment.

Instead of writing:

```js
if (!value) {
  value = fallback;
}
```

you can often write:

```js
value ||= fallback;
```

Similarly:

```js
value &&= replacement;
```

and:

```js
value ??= fallback;
```

The important point is that these operators **do not all mean the same thing**.

---

# 2. The Three Operators

| Operator | Assignment happens when...         |    |                    |
| -------- | ---------------------------------- | -- | ------------------ |
| `        |                                    | =` | Left side is falsy |
| `&&=`    | Left side is truthy                |    |                    |
| `??=`    | Left side is `null` or `undefined` |    |                    |

The core mental model is:

```text
||= → assign if falsy
&&= → assign if truthy
??= → assign if nullish
```

---

# 3. Basic `||=`

The logical OR assignment operator is:

```js
value ||= fallback;
```

It means approximately:

```js
value = value || fallback;
```

But the logical assignment form has important evaluation semantics and should not simply be thought of as textual replacement.

---

# 4. `||=` Example

```js
let username = "";

username ||= "Guest";

console.log(username);
```

Output:

```text
Guest
```

Why?

```text
username
   ↓
""
   ↓
falsy
   ↓
assign "Guest"
```

---

# 5. `||=` with a Valid Value

```js
let username = "Osama Abu Motlaq";

username ||= "Guest";

console.log(username);
```

Output:

```text
Osama Abu Motlaq
```

The existing value is truthy, so the assignment does not happen.

---

# 6. Falsy Values and `||=`

`||=` assigns when the left side is falsy.

Common falsy values include:

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

For example:

```js
let count = 0;

count ||= 10;

console.log(count);
```

Output:

```text
10
```

Because `0` is falsy.

---

# 7. Basic `&&=`

The logical AND assignment operator is:

```js
value &&= replacement;
```

It assigns only when the left side is truthy.

Conceptually:

```js
value = value && replacement;
```

---

# 8. `&&=` Example

```js
let username = "Osama Abu Motlaq";

username &&= username.toUpperCase();

console.log(username);
```

Output:

```text
OSAMA ABU MOTLAQ
```

Because the original value is truthy.

Therefore, the right side is evaluated and assigned.

---

# 9. `&&=` with a Falsy Value

```js
let username = "";

username &&= "Osama Abu Motlaq";

console.log(username);
```

Output:

```text
""
```

The assignment does not happen because:

```text
"" → falsy
```

---

# 10. Basic `??=`

The nullish assignment operator is:

```js
value ??= fallback;
```

It assigns only when the left side is:

```text
null
```

or:

```text
undefined
```

---

# 11. `??=` Example

```js
let username = null;

username ??= "Guest";

console.log(username);
```

Output:

```text
Guest
```

Because:

```text
null → nullish
```

---

# 12. `??=` Preserves Falsy Values

This is the most important difference from `||=`.

```js
let count = 0;

count ??= 10;

console.log(count);
```

Output:

```text
0
```

Because:

```text
0
```

is falsy, but it is not nullish.

---

# 13. `||=` vs `??=`

Compare:

```js
let count = 0;

count ||= 10;
```

Result:

```text
10
```

versus:

```js
let count = 0;

count ??= 10;
```

Result:

```text
0
```

The difference is:

```text
||= → checks falsiness
??= → checks nullishness
```

---

# 14. `&&=` vs `??=`

Consider:

```js
let value = 0;

value &&= 10;
```

Because:

```text
0 → falsy
```

the assignment does not happen.

Result:

```text
0
```

But:

```js
let value = 0;

value ??= 10;
```

also preserves:

```text
0
```

However, they preserve it for completely different reasons.

```text
&&= → does not assign because value is falsy
??= → does not assign because value is not nullish
```

---

# 15. Truth Table

A simplified comparison:

| Value | `value ||= x` | `value &&= x` | `value ??= x` |
|---|---|---|---|
| `undefined` | assign | don't assign | assign |
| `null` | assign | don't assign | assign |
| `false` | assign | don't assign | don't assign |
| `0` | assign | don't assign | don't assign |
| `""` | assign | don't assign | don't assign |
| `NaN` | assign | don't assign | don't assign |
| `"hello"` | don't assign | assign | don't assign |
| `42` | don't assign | assign | don't assign |
| `true` | don't assign | assign | don't assign |
| `[]` | don't assign | assign | don't assign |
| `{}` | don't assign | assign | don't assign |

This table captures the central distinction.

---

# 16. Understanding `||=`

Think:

```js
value ||= replacement;
```

as:

```text
Is value falsy?
    │
    ├── Yes → assign replacement
    │
    └── No  → keep value
```

---

# 17. Understanding `&&=`

Think:

```js
value &&= replacement;
```

as:

```text
Is value truthy?
    │
    ├── Yes → assign replacement
    │
    └── No  → keep value
```

---

# 18. Understanding `??=`

Think:

```js
value ??= replacement;
```

as:

```text
Is value nullish?
    │
    ├── Yes → assign replacement
    │
    └── No  → keep value
```

---

# 19. Logical Assignment Is Short-Circuiting

Logical assignment operators do not always evaluate the right-hand side.

Example:

```js
let value = "JavaScript";

value ||= expensiveOperation();
```

Because:

```text
"JavaScript" → truthy
```

the right side does not execute.

---

# 20. `&&=` Short-Circuiting

```js
let value = "";

value &&= expensiveOperation();
```

Because:

```text
"" → falsy
```

the right side does not execute.

---

# 21. `??=` Short-Circuiting

```js
let value = 0;

value ??= expensiveOperation();
```

Because:

```text
0 → not nullish
```

the right side does not execute.

This is an important performance and correctness property.

---

# 22. Right-Hand Side Evaluation

Consider:

```js
let count = 5;

count ||= getDefaultCount();
```

`getDefaultCount()` is not called.

But:

```js
let count = 0;

count ||= getDefaultCount();
```

does call it.

The condition controls whether the right-hand side is evaluated.

---

# 23. Logical Assignment vs Normal Assignment

Consider:

```js
let value = 10;

value = value || 20;
```

This evaluates the expression and then assigns.

The logical assignment form:

```js
value ||= 20;
```

communicates the intention more directly:

> Assign `20` only if `value` is falsy.

The logical assignment form is usually preferable when that is exactly the intended behavior.

---

# 24. Logical Assignment Is Not Just Syntax Sugar

For simple variables, these often appear equivalent:

```js
value ||= fallback;
```

and:

```js
value = value || fallback;
```

But logical assignment has specific evaluation semantics, especially with property access.

This matters when getters, setters, or computed properties are involved.

---

# 25. Object Properties

Logical assignment is commonly used with object properties.

Example:

```js
const settings = {
  theme: "",
};

settings.theme ||= "light";

console.log(settings.theme);
```

Output:

```text
light
```

---

# 26. `??=` with Object Properties

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
const settings = {
  theme: "",
};
```

then:

```js
settings.theme ??= "light";
```

preserves:

```text
""
```

---

# 27. Choosing Between `||=` and `??=`

Suppose:

```js
const settings = {
  volume: 0,
};
```

If zero is valid:

```js
settings.volume ??= 50;
```

is appropriate.

If zero should be considered "missing":

```js
settings.volume ||= 50;
```

may be appropriate.

The correct operator depends on the application's meaning of the value.

---

# 28. Boolean Properties

Suppose:

```js
const settings = {
  notifications: false,
};
```

Using:

```js
settings.notifications ??= true;
```

preserves:

```text
false
```

This is usually correct when `false` is a deliberate setting.

Using:

```js
settings.notifications ||= true;
```

would replace:

```text
false
```

with:

```text
true
```

That could be a bug.

---

# 29. Numeric Properties

Consider:

```js
const product = {
  quantity: 0,
};
```

Using:

```js
product.quantity ??= 1;
```

preserves:

```text
0
```

Using:

```js
product.quantity ||= 1;
```

changes it to:

```text
1
```

If `0` means "out of stock", `??=` is generally the appropriate choice.

---

# 30. Empty Strings

Consider:

```js
const profile = {
  bio: "",
};
```

With:

```js
profile.bio ??= "No biography";
```

the result remains:

```text
""
```

With:

```js
profile.bio ||= "No biography";
```

the result becomes:

```text
"No biography"
```

Again, this depends on whether an empty string represents meaningful data or missing data.

---

# 31. `null` and `undefined`

All three operators treat `null` and `undefined` differently.

For:

```js
let value = null;
```

both:

```js
value ||= "fallback";
```

and:

```js
value ??= "fallback";
```

assign the fallback.

But:

```js
value &&= "fallback";
```

does not assign.

---

# 32. `true`

Consider:

```js
let value = true;
```

Then:

```js
value ||= false;
```

preserves:

```text
true
```

```js
value &&= false;
```

changes it to:

```text
false
```

```js
value ??= false;
```

preserves:

```text
true
```

---

# 33. `false`

Consider:

```js
let value = false;
```

Then:

```js
value ||= true;
```

changes it to:

```text
true
```

```js
value &&= true;
```

preserves:

```text
false
```

```js
value ??= true;
```

also preserves:

```text
false
```

---

# 34. `0`

Consider:

```js
let value = 0;
```

Then:

```js
value ||= 10;
```

produces:

```text
10
```

while:

```js
value &&= 10;
```

produces:

```text
0
```

and:

```js
value ??= 10;
```

also produces:

```text
0
```

---

# 35. Empty String

Consider:

```js
let value = "";
```

Then:

```js
value ||= "Default";
```

produces:

```text
Default
```

while:

```js
value &&= "Default";
```

preserves:

```text
""
```

and:

```js
value ??= "Default";
```

also preserves:

```text
""
```

---

# 36. `NaN`

Consider:

```js
let value = NaN;
```

Then:

```js
value ||= 10;
```

produces:

```text
10
```

while:

```js
value &&= 10;
```

preserves:

```text
NaN
```

and:

```js
value ??= 10;
```

also preserves:

```text
NaN
```

Remember that `NaN` is falsy but not nullish.

---

# 37. Arrays

Arrays are truthy even when empty.

```js
let items = [];

items ||= ["Default"];
```

The empty array is preserved:

```text
[]
```

because:

```text
[] → truthy
```

Similarly:

```js
items ??= ["Default"];
```

also preserves the empty array.

---

# 38. Objects

Objects are also truthy even when empty.

```js
let user = {};

user ||= {
  name: "Guest",
};
```

The empty object remains:

```text
{}
```

because objects are truthy.

---

# 39. Logical Assignment with Computed Properties

You can use computed property access:

```js
const key = "theme";

const settings = {};

settings[key] ??= "light";

console.log(settings[key]);
```

Output:

```text
light
```

This is useful when the property name is dynamic.

---

# 40. Logical Assignment with Arrays

You can also assign to array elements:

```js
const items = [];

items[0] ??= "First item";

console.log(items[0]);
```

Output:

```text
First item
```

Because:

```text
items[0] → undefined
```

the assignment happens.

---

# 41. Logical Assignment with Nested Properties

Suppose:

```js
const user = {
  profile: {
    name: null,
  },
};
```

You can write:

```js
user.profile.name ??= "Guest";
```

Result:

```text
Guest
```

But if `profile` itself may be missing:

```js
user.profile.name ??= "Guest";
```

can still throw.

Logical assignment does not automatically protect every level of a property chain.

---

# 42. Optional Chaining Cannot Be Used as the Assignment Target

This is invalid:

```js
user?.profile?.name ??= "Guest";
```

Why?

Because optional chaining produces a conditional access expression, not a valid assignment target for logical assignment.

Instead, establish that the required object exists first.

For example:

```js
if (user?.profile) {
  user.profile.name ??= "Guest";
}
```

---

# 43. `??` vs `??=`

These operators are related but different.

```js
const result =
  value ?? fallback;
```

creates a result without modifying `value`.

But:

```js
value ??= fallback;
```

may modify `value`.

Example:

```js
let value = null;

const result =
  value ?? "Guest";
```

Afterward:

```text
value  → null
result → "Guest"
```

But:

```js
let value = null;

value ??= "Guest";
```

Afterward:

```text
value → "Guest"
```

---

# 44. `||` vs `||=`

Similarly:

```js
const result =
  value || fallback;
```

does not modify `value`.

But:

```js
value ||= fallback;
```

may modify it.

---

# 45. `&&` vs `&&=`

```js
const result =
  value && replacement;
```

calculates a value.

Whereas:

```js
value &&= replacement;
```

may update the variable or property.

---

# 46. Assignment Is the Key Difference

The three ordinary logical operators:

```text
||
&&
??
```

produce a value.

The three logical assignment operators:

```text
||=
&&=
??=
```

can update the left-hand side.

Think:

```text
||  → choose
&&  → choose
??  → choose

||= → choose and assign
&&= → choose and assign
??= → choose and assign
```

---

# 47. Practical Configuration Example

Suppose:

```js
const config = {
  theme: null,
  timeout: 0,
  debug: false,
};
```

You might write:

```js
config.theme ??= "light";
config.timeout ??= 5000;
config.debug ??= true;
```

The results are:

```js
{
  theme: "light",
  timeout: 0,
  debug: false,
}
```

The existing meaningful values are preserved.

---

# 48. Initialization Pattern

`??=` is particularly useful for initializing optional properties.

```js
const user = {};

user.name ??= "Osama Abu Motlaq";
user.role ??= "user";
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "user",
}
```

The operation means:

> Initialize this property only if it does not already have a value other than `null` or `undefined`.

---

# 49. Cache Initialization

A common pattern is:

```js
const cache = {};

cache.users ??= [];

cache.users.push({
  name: "Osama Abu Motlaq",
});
```

The first execution initializes:

```text
cache.users
```

to an array.

Later executions reuse the existing array.

---

# 50. Grouped Initialization

You can initialize several optional properties:

```js
const options = {};

options.headers ??= {};
options.params ??= {};
options.tags ??= [];
```

This is useful when building configuration objects.

However, do not use it blindly if a missing property should instead indicate a programming error.

---

# 51. Lazy Initialization

Because the right-hand side is short-circuited, logical assignment can support lazy initialization.

Example:

```js
let cache;

cache ??= createCache();
```

`createCache()` runs only when:

```text
cache === null
```

or:

```text
cache === undefined
```

This can avoid unnecessary work.

---

# 52. `||=` for Default Values

Example:

```js
let label = "";

label ||= "Unnamed";
```

This means:

> If the label is falsy, use `"Unnamed"`.

This is appropriate if an empty string should count as missing.

---

# 53. `??=` for Default Values

Example:

```js
let label = "";

label ??= "Unnamed";
```

This preserves:

```text
""
```

because an empty string is not nullish.

This is appropriate when an empty string is meaningful or intentionally provided.

---

# 54. `&&=` for Conditional Updates

`&&=` is particularly useful when you want to update something only when an existing value is truthy.

Example:

```js
let username = "Osama Abu Motlaq";

username &&= username.trim();

console.log(username);
```

The trim operation occurs because the existing value is truthy.

---

# 55. Another `&&=` Example

```js
let message = "Hello";

message &&= message.toUpperCase();

console.log(message);
```

Output:

```text
HELLO
```

But:

```js
let message = "";

message &&= message.toUpperCase();
```

keeps:

```text
""
```

---

# 56. `&&=` Is Not a Boolean Operator

Consider:

```js
let value = "Hello";

value &&= "World";
```

The result is:

```text
World
```

`&&=` does not convert the value into a Boolean.

It checks truthiness and, if truthy, performs the assignment.

---

# 57. `||=` Is Not a Boolean Operator

Similarly:

```js
let value = 0;

value ||= 10;
```

results in:

```text
10
```

The purpose is conditional assignment, not Boolean conversion.

---

# 58. `??=` Is Not a Null Conversion Operator

Consider:

```js
let value = null;

value ??= 0;
```

The result is:

```text
0
```

But this does not mean JavaScript converted `null` into `0`.

It means the operator detected a nullish value and assigned the right-hand value.

---

# 59. Getters and Logical Assignment

Logical assignment can interact with getters and setters.

Consider:

```js
const user = {
  _name: null,

  get name() {
    return this._name;
  },

  set name(value) {
    this._name = value;
  },
};

user.name ??= "Osama Abu Motlaq";
```

The getter determines whether the current value is nullish.

If assignment is required, the setter performs the assignment.

This is important when working with accessor properties.

---

# 60. Why This Matters

A logical assignment expression can involve:

```text
read current value
        ↓
evaluate logical condition
        ↓
possibly evaluate right side
        ↓
possibly perform assignment
```

Therefore, getters and setters can have observable behavior.

Do not assume logical assignment is always a trivial text substitution.

---

# 61. Side Effects

Consider:

```js
let calls = 0;

function getValue() {
  calls++;
  return null;
}
```

Logical assignment is useful partly because it avoids evaluating the right side unnecessarily.

For example:

```js
let value = "ready";

value ??= getValue();
```

does not call:

```text
getValue()
```

because `value` is not nullish.

---

# 62. Avoid Unnecessary Side Effects

Prefer:

```js
cache ??= createCache();
```

over manually invoking:

```js
createCache();
```

when the cache already exists.

Logical assignment naturally provides the short-circuiting behavior.

---

# 63. React Relevance

Logical assignment operators are useful JavaScript knowledge for React, but they are not core React APIs.

You may encounter them when handling:

* configuration objects
* optional values
* data normalization
* caches
* utility functions
* mutable objects
* default initialization

For example:

```js
const options = {};

options.headers ??= {};
```

---

# 64. React State Warning

Be careful with logical assignment and React state.

Avoid mutating state directly:

```js
state.user ??= {};
```

if `state` is React state.

React state should generally be updated immutably.

Prefer:

```js
setState((current) => ({
  ...current,
  user: current.user ?? {},
}));
```

The important lesson is:

> A useful JavaScript operator does not override React's state-management rules.

---

# 65. React Props

You might use:

```js
const displayName =
  props.name ?? "Guest";
```

or:

```js
const options = {
  ...props.options,
};

options.theme ??= "light";
```

Be careful not to mutate objects that belong to props or external state.

---

# 66. Next.js Relevance

In Next.js, logical assignment can appear in:

* configuration handling
* server utilities
* API processing
* database result normalization
* caching
* request option construction

Example:

```js
const options = {};

options.headers ??= {};
options.headers["Content-Type"] =
  "application/json";
```

Use it where conditional initialization improves clarity.

---

# 67. Common Mistake: Using `||=` When `0` Is Valid

Bad:

```js
let quantity = 0;

quantity ||= 1;
```

This changes:

```text
0 → 1
```

If zero is meaningful, use:

```js
quantity ??= 1;
```

---

# 68. Common Mistake: Using `||=` When `false` Is Valid

Bad:

```js
let enabled = false;

enabled ||= true;
```

Result:

```text
true
```

If `false` is a legitimate setting, this is incorrect.

Use:

```js
enabled ??= true;
```

if the intended fallback is only for missing values.

---

# 69. Common Mistake: Using `??=` When Empty String Means Missing

Suppose:

```js
let name = "";

name ??= "Guest";
```

The result remains:

```text
""
```

If the application defines an empty string as missing, `??=` is not enough.

Use:

```js
name ||= "Guest";
```

if all falsy values should trigger the default.

---

# 70. Common Mistake: Forgetting `&&=` Only Assigns for Truthy Values

```js
let value = 0;

value &&= 100;
```

The result is:

```text
0
```

The assignment did not occur.

If you need to replace nullish values instead, use:

```js
value ??= 100;
```

---

# 71. Common Mistake: Confusing `??=` with `??`

These are different:

```js
const result =
  value ?? fallback;
```

versus:

```js
value ??= fallback;
```

The first:

```text
reads
```

The second:

```text
may modify
```

---

# 72. Common Mistake: Mutating Shared Objects

Consider:

```js
function prepare(options) {
  options.tags ??= [];
}
```

This mutates the object passed to the function.

That may be intentional, but it can create unexpected side effects.

If mutation is not desired:

```js
function prepare(options) {
  const result = {
    ...options,
  };

  result.tags ??= [];

  return result;
}
```

Now the original object is not modified at the top level.

---

# 73. Shallow Copy Warning

The spread copy:

```js
const result = {
  ...options,
};
```

is shallow.

Nested objects remain shared.

For example:

```js
const result = {
  ...options,
};

result.user.name = "Osama Abu Motlaq";
```

may still mutate the nested `user` object from the original structure.

Logical assignment does not change this behavior.

---

# 74. `||=` and `??=` with Environment Variables

Environment variables are commonly strings when present.

Suppose:

```js
const port =
  process.env.PORT ?? "3000";
```

This uses the fallback only if `PORT` is missing.

Be careful with:

```text
""
```

because an empty environment variable is still a string and therefore not nullish.

---

# 75. `??=` with Configuration

Example:

```js
const config = {
  port: undefined,
};

config.port ??= 3000;
```

Result:

```text
3000
```

This is useful for optional configuration properties.

---

# 76. Choosing the Correct Operator

Ask one question:

### Should assignment happen for every falsy value?

Use:

```js
||=
```

### Should assignment happen only when the current value is truthy?

Use:

```js
&&=
```

### Should assignment happen only when the current value is `null` or `undefined`?

Use:

```js
??=
```

This decision rule covers most use cases.

---

# 77. Comparison with `if`

### `||=`

```js
if (!value) {
  value = fallback;
}
```

### `&&=`

```js
if (value) {
  value = replacement;
}
```

### `??=`

```js
if (value === null || value === undefined) {
  value = fallback;
}
```

Logical assignment provides a concise form for these patterns.

---

# 78. Comparison Table

| Goal              | Traditional form       | Logical assignment |   |      |
| ----------------- | ---------------------- | ------------------ | - | ---- |
| Assign if falsy   | `if (!x) x = y`        | `x                 |   | = y` |
| Assign if truthy  | `if (x) x = y`         | `x &&= y`          |   |      |
| Assign if nullish | `if (x == null) x = y` | `x ??= y`          |   |      |

---

# 79. Relationship to Logical Operators

The family can be remembered as:

```text
OR
||
||=

AND
&&
&&=

NULLISH
??
??=
```

The assignment versions add:

```text
conditional assignment
```

to the corresponding logical behavior.

---

# 80. Quick Reference

### Logical OR assignment

```js
value ||= fallback;
```

Assigns if `value` is falsy.

### Logical AND assignment

```js
value &&= replacement;
```

Assigns if `value` is truthy.

### Nullish assignment

```js
value ??= fallback;
```

Assigns if `value` is `null` or `undefined`.

---

# 81. Practical Examples

### Default string

```js
let name = "";

name ||= "Guest";
```

### Default number preserving zero

```js
let count = 0;

count ??= 10;
```

### Default Boolean preserving false

```js
let enabled = false;

enabled ??= true;
```

### Conditional transformation

```js
let name = "Osama Abu Motlaq";

name &&= name.trim();
```

### Initialize an array

```js
const data = {};

data.items ??= [];

data.items.push("JavaScript");
```

---

# 82. Mental Model

Remember:

```text
             CONDITION
                 │
       ┌─────────┼─────────┐
       │         │         │
      ||=       &&=       ??=
       │         │         │
    falsy?     truthy?   nullish?
       │         │         │
       ↓         ↓         ↓
    assign     assign    assign
```

The operator tells JavaScript **when the assignment is allowed to happen**.

---

# 83. Important Distinction

These three operators should become automatic:

```text
||= → "If missing by falsiness, assign."
&&= → "If present by truthiness, replace."
??= → "If missing by nullishness, assign."
```

But the most important one for modern application code is often:

```js
value ??= fallback;
```

because it preserves meaningful values such as:

```text
0
false
""
```

---

# 84. Key Takeaways

1. JavaScript has three logical assignment operators.
2. `||=` is Logical OR Assignment.
3. `&&=` is Logical AND Assignment.
4. `??=` is Nullish Assignment.
5. `||=` assigns when the left side is falsy.
6. `&&=` assigns when the left side is truthy.
7. `??=` assigns when the left side is `null` or `undefined`.
8. Logical assignment operators short-circuit.
9. The right-hand side may not be evaluated.
10. `||=` replaces `0`.
11. `||=` replaces `false`.
12. `||=` replaces `""`.
13. `??=` preserves `0`.
14. `??=` preserves `false`.
15. `??=` preserves `""`.
16. `&&=` only performs assignment when the current value is truthy.
17. Logical assignment can be used with object properties.
18. Logical assignment can be used with computed properties.
19. Logical assignment can be used with array elements.
20. Logical assignment does not automatically protect nested property access.
21. Optional chaining cannot be used as the assignment target.
22. `??` reads a fallback value without assigning it.
23. `??=` may modify the original variable or property.
24. Logical assignment can interact with getters and setters.
25. Logical assignment does not replace validation.
26. Logical assignment does not replace proper React state management.
27. Avoid mutating React state directly.
28. Choose the operator according to the meaning of the data, not simply its syntax.
29. Use `??=` when only `null` and `undefined` represent missing values.
30. Use `||=` when all falsy values should trigger initialization or replacement.

---

# Final Principle

The three operators can be reduced to one mental model:

```text
||= → assign if falsy
&&= → assign if truthy
??= → assign if nullish
```

The most important comparison is:

```js
let value = 0;

value ||= 10;
// 10
```

versus:

```js
let value = 0;

value ??= 10;
// 0
```

The difference is:

```text
falsy ≠ nullish
```

And remember the relationship between the previous topics:

```text
?.  → safely access
??  → provide a nullish fallback
??= → assign a nullish fallback
||= → assign a falsy fallback
&&= → assign when truthy
```

These operators are small features, but understanding their exact semantics prevents subtle bugs in modern JavaScript applications.
