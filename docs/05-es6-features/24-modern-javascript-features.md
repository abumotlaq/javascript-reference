# Modern JavaScript Features

> A deep reference to important modern JavaScript features introduced across ES2015 (ES6) and later ECMAScript editions, focusing on features that improve readability, safety, expressiveness, performance, and application architecture.

---

# 1. What Is "Modern JavaScript"?

JavaScript is an evolving language.

ES2015, commonly called ES6, introduced a major set of language improvements.

Since then, JavaScript has continued to receive new features through yearly ECMAScript specifications.

Modern JavaScript includes features such as:

```text
let / const
Arrow functions
Template literals
Destructuring
Spread / Rest
Default parameters
Classes
Modules
Promises
async / await
Optional chaining
Nullish coalescing
Logical assignment
Private class features
Dynamic import
for...of
Map / Set
Generators
BigInt
```

Many of these have already been covered in dedicated files.

This file focuses on understanding the **modern JavaScript ecosystem as a whole** and several modern features that are especially useful in real applications.

---

# 2. ECMAScript vs JavaScript

ECMAScript is the language specification.

JavaScript is an implementation of that specification.

Examples of JavaScript engines include:

```text
V8
SpiderMonkey
JavaScriptCore
```

Browsers and runtimes implement ECMAScript features through their JavaScript engines.

Therefore, when JavaScript gets a new language feature, it is normally standardized through ECMAScript.

---

# 3. Annual JavaScript Releases

Modern ECMAScript specifications are released regularly.

You may encounter names such as:

```text
ES2015
ES2016
ES2017
ES2018
...
ES2025
```

ES2015 was especially significant because it introduced many foundational features.

However, modern JavaScript is not simply "ES6."

It is the continuously evolving language.

---

# 4. Feature Categories

Modern JavaScript features can be grouped into several areas:

```text
Syntax improvements
Data handling
Asynchronous programming
Modules
Object-oriented programming
Iteration
Metaprogramming
Numeric features
Internationalization
Error handling
Collection APIs
```

The most important features for application development are not necessarily the newest ones.

---

# 5. `let` and `const`

Modern JavaScript introduced block-scoped declarations:

```js id="q1w2e3"
let count = 0;
const name = "Osama Abu Motlaq";
```

Unlike `var`, they respect block scope.

```js id="r4t5y6"
if (true) {
  const message = "Hello";
}

console.log(message);
```

This causes an error because `message` exists only inside the block.

---

# 6. Why `const` Is Usually Preferred

Use `const` when the variable binding does not need reassignment:

```js id="u7i8o9"
const userName = "Osama Abu Motlaq";
```

Use `let` when reassignment is required:

```js id="p0a1s2"
let count = 0;

count++;
```

This makes code intent clearer.

---

# 7. Arrow Functions

Arrow functions provide shorter function syntax:

```js id="d3f4g5"
const add = (a, b) => a + b;
```

They also have lexical `this` behavior.

Arrow functions are heavily used in modern JavaScript and React:

```js id="h6j7k8"
const names = users.map(
  (user) => user.name
);
```

Arrow functions are covered in detail in the Functions section.

---

# 8. Template Literals

Template literals use backticks:

```js id="l9z0x1"
const name = "Osama Abu Motlaq";

const message = `Hello, ${name}!`;
```

They support:

* interpolation
* multiline strings
* embedded expressions

Example:

```js id="c2v3b4"
const price = 50;
const quantity = 3;

const total = `Total: ${price * quantity}`;
```

---

# 9. Destructuring

Destructuring extracts values from objects and arrays:

```js id="n5m6q7"
const user = {
  name: "Osama Abu Motlaq",
  age: 24,
};

const { name, age } = user;
```

Array destructuring:

```js id="r8s9t0"
const numbers = [10, 20];

const [first, second] = numbers;
```

Destructuring is one of the most important modern JavaScript features for React.

---

# 10. Spread Syntax

Spread syntax expands iterable or object values.

Array example:

```js id="a1b2c3"
const first = [1, 2];
const second = [3, 4];

const combined = [
  ...first,
  ...second,
];
```

Object example:

```js id="d4e5f6"
const user = {
  name: "Osama Abu Motlaq",
};

const updatedUser = {
  ...user,
  active: true,
};
```

---

# 11. Rest Parameters

Rest parameters collect remaining arguments:

```js id="g7h8i9"
function sum(...numbers) {
  return numbers.reduce(
    (total, number) => total + number,
    0
  );
}
```

Call:

```js id="j0k1l2"
sum(1, 2, 3, 4);
```

Result:

```text id="m3n4o5"
10
```

Rest syntax is related to spread syntax but performs the opposite conceptual operation.

---

# 12. Default Parameters

Functions can define default parameter values:

```js id="p6q7r8"
function greet(
  name = "Osama Abu Motlaq"
) {
  return `Hello, ${name}`;
}
```

The default is used when the argument is:

```text id="s9t0u1"
undefined
```

It is not used automatically for every falsy value.

---

# 13. Enhanced Object Literals

Modern object syntax allows property shorthand:

```js id="v2w3x4"
const name = "Osama Abu Motlaq";
const age = 24;

const user = {
  name,
  age,
};
```

Instead of:

```js id="y5z6a7"
const user = {
  name: name,
  age: age,
};
```

This is especially common in React state and object creation.

---

# 14. Computed Property Names

Modern object literals support computed property names:

```js id="b8c9d0"
const key = "name";

const user = {
  [key]: "Osama Abu Motlaq",
};
```

The expression inside:

```js id="e1f2g3"
[...]
```

is evaluated to determine the property name.

---

# 15. Optional Chaining

Optional chaining safely accesses potentially missing values:

```js id="h4i5j6"
const city = user?.address?.city;
```

If `user` or `address` is `null` or `undefined`, the expression returns:

```text id="k7l8m9"
undefined
```

instead of throwing an error.

Optional chaining is covered in detail in:

```text
19-optional-chaining.md
```

---

# 16. Nullish Coalescing

The nullish coalescing operator provides defaults specifically for:

```text id="n0p1q2"
null
undefined
```

Example:

```js id="r3s4t5"
const name =
  user.name ?? "Osama Abu Motlaq";
```

Unlike `||`, it does not replace valid falsy values such as:

```text id="u6v7w8"
0
false
""
```

Detailed coverage exists in:

```text
20-nullish-coalescing.md
```

---

# 17. Logical Assignment

Modern JavaScript supports:

```text id="x9y0z1"
||=
&&=
??=
```

Example:

```js id="a2b3c4"
let value;

value ??= 10;

console.log(value);
```

Output:

```text id="d5e6f7"
10
```

These operators combine logical evaluation with assignment.

Detailed coverage exists in:

```text
21-logical-assignment.md
```

---

# 18. Private Class Features

Modern JavaScript supports true private class members:

```js id="g8h9i0"
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }
}
```

The private field cannot be accessed as:

```js id="j1k2l3"
user.#password;
```

from outside the class.

Detailed coverage exists in:

```text
23-private-class-features.md
```

---

# 19. Classes

Modern JavaScript introduced class syntax:

```js id="m4n5o6"
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}
```

Classes provide a cleaner syntax over JavaScript's prototype-based object model.

They do not replace prototypes.

Classes are syntax built on top of JavaScript's prototype system.

---

# 20. Modules

Modern JavaScript provides native modules:

```js id="p7q8r9"
export const name = "Osama Abu Motlaq";
```

Import:

```js id="s0t1u2"
import { name } from "./user.js";
```

Modules provide:

* encapsulation
* reusable code
* dependency management
* explicit APIs
* module scope

Detailed coverage exists in:

```text
18-modules.md
```

---

# 21. Dynamic `import()`

Static imports are written:

```js id="v3w4x5"
import { calculate } from "./math.js";
```

Modern JavaScript also supports dynamic imports:

```js id="y6z7a8"
const module =
  await import("./math.js");
```

Unlike static imports, dynamic imports happen at runtime.

They return a Promise.

---

# 22. Why Dynamic Import Matters

Dynamic imports can load code only when needed.

Example:

```js id="b9c0d1"
async function loadFeature() {
  const module =
    await import("./feature.js");

  return module;
}
```

This can support:

* code splitting
* lazy loading
* optional features
* reduced initial JavaScript

This concept is particularly relevant to React frameworks such as Next.js.

---

# 23. Promise-Based Module Loading

Because:

```js id="e2f3g4"
import("./feature.js")
```

returns a Promise, you can use:

```js id="h5i6j7"
import("./feature.js")
  .then((module) => {
    module.run();
  })
  .catch((error) => {
    console.error(error);
  });
```

Or:

```js id="k8l9m0"
const module =
  await import("./feature.js");

module.run();
```

---

# 24. Promises

Promises represent the eventual result of an asynchronous operation.

Basic example:

```js id="n1o2p3"
const promise = Promise.resolve(10);

promise.then((value) => {
  console.log(value);
});
```

A Promise can be:

```text id="q4r5s6"
pending
fulfilled
rejected
```

---

# 25. `async` / `await`

Modern asynchronous JavaScript commonly uses:

```js id="t7u8v9"
async function getUser() {
  const response =
    await fetch("/api/user");

  return response.json();
}
```

`await` makes asynchronous code easier to read while still using Promises underneath.

Detailed coverage exists in the async section.

---

# 26. `for...of`

`for...of` iterates over values from an iterable:

```js id="w0x1y2"
const numbers = [10, 20, 30];

for (const number of numbers) {
  console.log(number);
}
```

It works with:

```text id="z3a4b5"
Array
String
Set
Map
TypedArray
Generators
custom iterables
```

Detailed coverage exists in:

```text
09-for-of.md
```

---

# 27. `Map`

`Map` stores key-value pairs.

```js id="c6d7e8"
const users = new Map();

users.set(
  1,
  "Osama Abu Motlaq"
);

console.log(users.get(1));
```

Unlike ordinary objects, Map keys can be values of many different types.

---

# 28. `Set`

`Set` stores unique values:

```js id="f9g0h1"
const numbers = new Set([
  1,
  2,
  2,
  3,
]);

console.log(numbers);
```

The duplicate `2` is stored only once.

---

# 29. WeakMap and WeakSet

Modern JavaScript also provides:

```text id="i2j3k4"
WeakMap
WeakSet
```

These are useful when object references should not prevent garbage collection.

They are specialized tools and should not replace Map or Set by default.

---

# 30. Symbols

`Symbol` creates unique primitive values:

```js id="l5m6n7"
const id = Symbol("id");
```

Two Symbols are always distinct:

```js id="o8p9q0"
Symbol("id") === Symbol("id");
```

Result:

```text id="r1s2t3"
false
```

Symbols are useful for unique property keys and JavaScript protocols.

---

# 31. Well-Known Symbols

JavaScript defines special Symbols that allow objects to participate in language protocols.

Examples include:

```text id="u4v5w6"
Symbol.iterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.asyncIterator
```

For example, `Symbol.iterator` controls how an object behaves with:

```js id="x7y8z9"
for...of
```

and spread/destructuring operations that consume iterables.

---

# 32. Iterators

An iterator provides a `next()` method:

```js id="a0b1c2"
const iterator = {
  next() {
    return {
      value: 10,
      done: false,
    };
  },
};
```

A standard iterator result has:

```text id="d3e4f5"
{
  value,
  done
}
```

Iterators are the mechanism behind many JavaScript iteration features.

---

# 33. Generators

Generators provide a convenient way to create iterators:

```js id="g6h7i8"
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

Usage:

```js id="j9k0l1"
for (const number of numbers()) {
  console.log(number);
}
```

Generators execute lazily.

---

# 34. BigInt

BigInt represents integers outside the safe precision range of Number:

```js id="m2n3o4"
const value =
  123456789012345678901234567890n;
```

BigInt represents integers only.

It should not be mixed directly with Number in arithmetic.

Detailed coverage exists in:

```text
22-bigint.md
```

---

# 35. Logical Operators as Control Flow

Modern JavaScript frequently uses:

```js id="p5q6r7"
const name =
  user && user.name;
```

or:

```js id="s8t9u0"
const name =
  user?.name ?? "Unknown";
```

These patterns can replace verbose defensive checks when used appropriately.

However, developers must understand the semantic difference between:

```text id="v1w2x3"
&&
||
??
```

because their handling of falsy and nullish values differs.

---

# 36. `Object.hasOwn()`

Modern JavaScript provides:

```js id="y4z5a6"
Object.hasOwn(object, property);
```

Example:

```js id="b7c8d9"
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.hasOwn(user, "name")
);
```

Output:

```text id="e0f1g2"
true
```

This is a modern and clear way to test whether an object owns a property.

---

# 37. Why `Object.hasOwn()` Is Useful

Older code often uses:

```js id="h3i4j5"
Object.prototype.hasOwnProperty.call(
  object,
  property
);
```

Modern JavaScript can use:

```js id="k6l7m8"
Object.hasOwn(
  object,
  property
);
```

It is easier to read and works reliably even when the object has a custom or null prototype.

---

# 38. `Object.fromEntries()`

`Object.fromEntries()` converts key-value pairs into an object.

Example:

```js id="n9o0p1"
const entries = [
  ["name", "Osama Abu Motlaq"],
  ["age", 24],
];

const user =
  Object.fromEntries(entries);

console.log(user);
```

Result:

```text id="q2r3s4"
{
  name: "Osama Abu Motlaq",
  age: 24
}
```

---

# 39. `Object.entries()`

`Object.entries()` performs the opposite conceptual operation:

```js id="t5u6v7"
const user = {
  name: "Osama Abu Motlaq",
  age: 24,
};

console.log(
  Object.entries(user)
);
```

Result:

```text id="w8x9y0"
[
  ["name", "Osama Abu Motlaq"],
  ["age", 24]
]
```

This is especially useful for iteration and transformations.

---

# 40. Object Transformation Pattern

Combine:

```text id="a1b2c3"
Object.entries()
Object.fromEntries()
Array methods
```

Example:

```js id="d4e5f6"
const prices = {
  laptop: 1000,
  phone: 500,
};

const discounted =
  Object.fromEntries(
    Object.entries(prices).map(
      ([product, price]) => [
        product,
        price * 0.9,
      ]
    )
  );
```

This converts:

```text id="g7h8i9"
object
→ entries
→ transform
→ object
```

---

# 41. Optional Catch Binding

Modern JavaScript allows omitting the catch parameter when the error is not needed.

Instead of:

```js id="j0k1l2"
try {
  riskyOperation();
} catch (error) {
  console.log("Failed");
}
```

you can write:

```js id="m3n4o5"
try {
  riskyOperation();
} catch {
  console.log("Failed");
}
```

This communicates that the error object is intentionally unused.

---

# 42. Numeric Separators

Large numeric literals can use `_` for readability:

```js id="p6q7r8"
const population =
  1_000_000;
```

The separators do not change the value.

You can also use them with BigInt:

```js id="s9t0u1"
const value =
  123_456_789_012_345n;
```

---

# 43. Exponentiation Operator

Modern JavaScript introduced:

```js id="v2w3x4"
**
```

Example:

```js id="y5z6a7"
const result = 2 ** 10;
```

Result:

```text id="b8c9d0"
1024
```

This replaces older patterns such as:

```js id="e1f2g3"
Math.pow(2, 10);
```

Both are valid, but `**` is concise.

---

# 44. `Array.prototype.includes()`

`includes()` checks whether an array contains a value:

```js id="h4i5j6"
const numbers = [10, 20, 30];

console.log(
  numbers.includes(20)
);
```

Result:

```text id="k7l8m9"
true
```

This is often clearer than:

```js id="n0p1q2"
numbers.indexOf(20) !== -1;
```

---

# 45. `String.prototype.includes()`

Strings also support `includes()`:

```js id="r3s4t5"
const message =
  "Hello Osama Abu Motlaq";

console.log(
  message.includes("Osama")
);
```

Result:

```text id="u6v7w8"
true
```

---

# 46. `String.prototype.startsWith()`

Modern JavaScript provides:

```js id="x9y0z1"
const url = "https://example.com";

console.log(
  url.startsWith("https://")
);
```

Result:

```text id="a2b3c4"
true
```

This is clearer than manually comparing string slices in many situations.

---

# 47. `String.prototype.endsWith()`

Similarly:

```js id="d5e6f7"
const file = "resume.pdf";

console.log(
  file.endsWith(".pdf")
);
```

Result:

```text id="g8h9i0"
true
```

---

# 48. `String.prototype.replaceAll()`

Modern JavaScript provides:

```js id="j1k2l3"
const text =
  "JavaScript JavaScript JavaScript";

const result =
  text.replaceAll(
    "JavaScript",
    "JS"
  );
```

Result:

```text id="m4n5o6"
JS JS JS
```

This avoids some common regular-expression patterns for simple global replacement.

---

# 49. `Array.prototype.flat()`

`flat()` flattens nested arrays:

```js id="p7q8r9"
const values = [
  1,
  [2, 3],
  [4, [5]],
];

console.log(values.flat());
```

Result:

```text id="s0t1u2"
[1, 2, 3, 4, [5]]
```

---

# 50. `flat(Infinity)`

You can specify the depth:

```js id="v3w4x5"
const values = [
  1,
  [2, [3, [4]]],
];

console.log(
  values.flat(Infinity)
);
```

Result:

```text id="y6z7a8"
[1, 2, 3, 4]
```

Use `Infinity` intentionally because deeply nested structures may indicate a data-model problem.

---

# 51. `Array.prototype.flatMap()`

`flatMap()` combines:

```text id="b9c0d1"
map()
+
flat(1)
```

Example:

```js id="e2f3g4"
const values = [1, 2, 3];

const result =
  values.flatMap((value) => [
    value,
    value * 2,
  ]);
```

Result:

```text id="h5i6j7"
[
  1, 2,
  2, 4,
  3, 6
]
```

---

# 52. `Object.assign()`

`Object.assign()` copies enumerable own properties:

```js id="k8l9m0"
const target = {};

Object.assign(
  target,
  {
    name: "Osama Abu Motlaq",
  }
);
```

It is useful for object merging, although object spread is often easier to read:

```js id="n1o2p3"
const user = {
  ...target,
};
```

Detailed behavior belongs to:

```text
16-object-assign.md
```

---

# 53. `structuredClone()`

Modern JavaScript environments provide:

```js id="q4r5s6"
structuredClone()
```

for structured deep cloning of supported values.

Example:

```js id="t7u8v9"
const original = {
  user: {
    name: "Osama Abu Motlaq",
  },
};

const copy =
  structuredClone(original);

copy.user.name = "Changed";

console.log(original.user.name);
```

The original nested object remains unchanged.

---

# 54. `structuredClone()` vs Spread

Spread performs a shallow copy:

```js id="w0x1y2"
const copy = {
  ...original,
};
```

Nested objects remain shared.

`structuredClone()` can deeply clone many supported data structures.

However, it is not a universal replacement for every cloning strategy.

---

# 55. `Array.from()`

`Array.from()` creates arrays from iterable or array-like values.

Example:

```js id="z3a4b5"
const letters =
  Array.from("JavaScript");

console.log(letters);
```

Result:

```text id="c6d7e8"
[
  "J",
  "a",
  "v",
  "a",
  "S",
  "c",
  "r",
  "i",
  "p",
  "t"
]
```

It can also accept a mapping function:

```js id="f9g0h1"
const numbers =
  Array.from(
    { length: 5 },
    (_, index) => index + 1
  );
```

---

# 56. `Array.of()`

`Array.of()` creates an array from its arguments.

```js id="i2j3k4"
const values = Array.of(
  1,
  2,
  3
);
```

Result:

```text id="l5m6n7"
[1, 2, 3]
```

This differs from:

```js id="o8p9q0"
Array(3)
```

which creates an array with three empty slots.

---

# 57. `Object.groupBy()`

Modern JavaScript provides `Object.groupBy()` for grouping values by a computed key.

Example:

```js id="r1s2t3"
const users = [
  {
    name: "Osama Abu Motlaq",
    role: "developer",
  },
  {
    name: "Osama Abu Motlaq",
    role: "designer",
  },
];

const grouped =
  Object.groupBy(
    users,
    (user) => user.role
  );
```

The result is grouped by:

```text id="u4v5w6"
developer
designer
```

This is useful when data needs to be categorized by a property.

---

# 58. `Map.groupBy()`

When grouping values where the group key may be something other than a property-key-compatible value, `Map.groupBy()` can be useful.

Conceptually:

```js id="x7y8z9"
const grouped =
  Map.groupBy(
    values,
    (value) => getGroup(value)
  );
```

The result is a Map whose keys are the generated groups.

Use `Object.groupBy()` when object-style keys are appropriate and `Map.groupBy()` when Map semantics are more appropriate.

---

# 59. `Array.prototype.findLast()`

Modern arrays support:

```js id="a0b1c2"
findLast()
```

Example:

```js id="d3e4f5"
const numbers = [
  10,
  20,
  30,
  20,
];

const result =
  numbers.findLast(
    (number) => number === 20
  );
```

Result:

```text id="g6h7i8"
20
```

It searches from the end.

---

# 60. `findLastIndex()`

Similarly:

```js id="j9k0l1"
const numbers = [
  10,
  20,
  30,
  20,
];

const index =
  numbers.findLastIndex(
    (number) => number === 20
  );
```

Result:

```text id="m2n3o4"
3
```

---

# 61. `toSorted()`

Modern JavaScript provides non-mutating array methods.

Instead of:

```js id="p5q6r7"
numbers.sort();
```

which mutates the original array, you can use:

```js id="s8t9u0"
const sorted =
  numbers.toSorted();
```

The original array remains unchanged.

This is particularly useful in React, where immutable state updates are important.

---

# 62. `toReversed()`

Similarly:

```js id="v1w2x3"
const reversed =
  numbers.toReversed();
```

creates a reversed copy instead of mutating the original array.

Compare:

```js id="y4z5a6"
numbers.reverse();
```

which mutates the original.

---

# 63. `toSpliced()`

Modern JavaScript also provides:

```js id="b7c8d9"
toSpliced()
```

which returns a modified copy.

Example:

```js id="e0f1g2"
const numbers = [
  10,
  20,
  30,
];

const result =
  numbers.toSpliced(
    1,
    1,
    99
  );
```

Result:

```text id="h3i4j5"
[10, 99, 30]
```

The original array is unchanged.

---

# 64. `with()`

The `with()` method returns a copy of an array with one element replaced.

```js id="k6l7m8"
const numbers = [
  10,
  20,
  30,
];

const updated =
  numbers.with(1, 99);
```

Result:

```text id="n9o0p1"
[10, 99, 30]
```

Original:

```text id="q2r3s4"
[10, 20, 30]
```

This is useful for immutable updates.

---

# 65. Why Non-Mutating Array Methods Matter

Consider React state:

```js id="t5u6v7"
const [items, setItems] =
  useState([]);
```

Avoid mutating state directly:

```js id="w8x9y0"
items.sort();
```

Prefer:

```js id="a1b2c3"
setItems(
  items.toSorted()
);
```

or another immutable transformation.

Modern non-mutating array methods make these patterns easier.

---

# 66. `Object.hasOwn()`, `groupBy()`, and Modern APIs

Modern JavaScript is not only about syntax.

The standard library also continues to evolve.

Examples include:

```text id="d4e5f6"
Object.hasOwn()
Object.groupBy()
Map.groupBy()
structuredClone()
Array.prototype.toSorted()
Array.prototype.toReversed()
Array.prototype.toSpliced()
Array.prototype.with()
Array.prototype.findLast()
Array.prototype.findLastIndex()
String.prototype.replaceAll()
```

Understanding the standard library is as important as understanding language syntax.

---

# 67. `Error.cause`

Modern JavaScript allows an error to preserve the original cause.

Example:

```js id="g7h8i9"
try {
  connectToDatabase();
} catch (error) {
  throw new Error(
    "Database connection failed",
    {
      cause: error,
    }
  );
}
```

The new Error contains:

```js id="j0k1l2"
error.cause
```

This is useful for preserving error chains without exposing low-level details directly to users.

---

# 68. `AggregateError`

`AggregateError` represents multiple errors.

It is particularly useful with Promise combinators such as:

```text id="m3n4o5"
Promise.any()
```

Example conceptually:

```js id="p6q7r8"
try {
  await Promise.any(promises);
} catch (error) {
  console.log(error instanceof AggregateError);
}
```

Result:

```text id="s9t0u1"
true
```

---

# 69. `AbortController`

Modern web APIs provide `AbortController` for cancelling abortable asynchronous operations.

Example:

```js id="v2w3x4"
const controller =
  new AbortController();

fetch("/api/data", {
  signal: controller.signal,
});
```

Later:

```js id="y5z6a7"
controller.abort();
```

This is useful for:

* cancelling fetch requests
* avoiding unnecessary work
* cleaning up asynchronous operations
* React effects

---

# 70. `queueMicrotask()`

JavaScript provides:

```js id="b8c9d0"
queueMicrotask(() => {
  console.log("Microtask");
});
```

The callback runs in the microtask queue.

This is useful when code needs to schedule work after the current synchronous execution completes but before the event loop proceeds to later task phases.

It is a specialized API and should not be used when ordinary synchronous code is sufficient.

---

# 71. Top-Level `await`

ES modules can use `await` at the top level.

Example:

```js id="e1f2g3"
const response =
  await fetch("/api/data");

const data =
  await response.json();

console.log(data);
```

This is available in environments that support top-level await in modules.

It can simplify module initialization, but excessive use can delay module evaluation.

---

# 72. Async Iteration

JavaScript supports asynchronous iterables.

Example:

```js id="h4i5j6"
for await (const value of source) {
  console.log(value);
}
```

This is useful when values arrive asynchronously over time.

Examples include:

```text id="k7l8m9"
streams
paginated data
async generators
event-like asynchronous sources
```

---

# 73. Async Generators

An async generator uses:

```js id="n0p1q2"
async function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

It can be consumed with:

```js id="r3s4t5"
for await (const value of numbers()) {
  console.log(value);
}
```

This combines:

```text id="u6v7w8"
generators
+
Promises
+
async iteration
```

---

# 74. Private Fields, Modules, and Closures

Modern JavaScript provides multiple levels of encapsulation:

```text id="x9y0z1"
Block scope
    ↓
Function scope
    ↓
Module scope
    ↓
Private class fields
```

These are different mechanisms.

Use the mechanism that matches the problem.

---

# 75. Modern JavaScript Is Often Immutable by Design

Modern application code frequently prefers:

```text id="a2b3c4"
create a new value
instead of
mutate existing state
```

Examples:

```js id="d5e6f7"
const updated = {
  ...user,
  active: true,
};
```

and:

```js id="g8h9i0"
const updatedItems =
  items.toSpliced(
    index,
    1,
    newItem
  );
```

This is particularly important in React.

---

# 76. Modern JavaScript and React

React relies heavily on modern JavaScript.

You will constantly encounter:

```text id="j1k2l3"
const / let
arrow functions
destructuring
spread
rest
template literals
modules
array methods
optional chaining
nullish coalescing
Promises
async / await
immutable updates
```

For React developers, modern JavaScript is not optional knowledge.

React is largely built around JavaScript language features rather than replacing them.

---

# 77. Modern JavaScript and Next.js

Next.js also depends heavily on modern JavaScript.

Common examples include:

```text id="m4n5o6"
ES modules
dynamic import
async functions
Promises
destructuring
object spread
optional chaining
nullish coalescing
immutable array methods
private class features in libraries
```

Next.js adds framework behavior on top of JavaScript and React.

Therefore:

```text id="p7q8r9"
JavaScript
   ↓
React
   ↓
Next.js
```

is a useful learning model.

---

# 78. Browser Support and Runtime Support

A JavaScript feature can be:

```text id="s0t1u2"
standardized
implemented
partially implemented
unsupported
```

These are different concepts.

A feature may be standardized but unavailable in an old browser or runtime.

Modern development usually relies on:

* current browsers
* modern Node.js
* transpilers
* bundlers
* framework build systems

---

# 79. Transpilation

Tools such as Babel can transform newer JavaScript syntax into older syntax.

Conceptually:

```text id="v3w4x5"
Modern JavaScript
       ↓
Transpiler
       ↓
Older-compatible JavaScript
```

However, transpilation cannot always provide missing runtime APIs automatically.

For example:

```text id="y6z7a8"
syntax transformation
```

and:

```text id="b9c0d1"
missing runtime API
```

are different problems.

---

# 80. Polyfills

A polyfill provides an implementation of a missing API.

For example, an older environment may lack a modern standard-library method.

A polyfill can add compatible behavior.

Conceptually:

```text id="e2f3g4"
Missing API
    ↓
Polyfill
    ↓
Application can use the API
```

Modern projects often use targeted polyfills rather than blindly including everything.

---

# 81. Feature Detection

When runtime support may vary, feature detection can be used.

Example:

```js id="h5i6j7"
if ("structuredClone" in globalThis) {
  // Use structuredClone
}
```

This is generally better than detecting a browser by its name.

---

# 82. `globalThis`

Modern JavaScript provides:

```js id="k8l9m0"
globalThis
```

as a standardized way to access the global object.

It works across different JavaScript environments.

Conceptually:

```text id="n1o2p3"
Browser
Node.js
Web Workers
Other JS environments
```

can expose their global object through:

```js id="q4r5s6"
globalThis
```

---

# 83. Why `globalThis` Matters

Older code used environment-specific globals:

```text id="t7u8v9"
window
global
self
```

Modern code can use:

```js id="w0x1y2"
globalThis
```

when it genuinely needs access to the global object.

However, most application code should avoid unnecessary global state.

---

# 84. `Intl` APIs

JavaScript includes internationalization APIs under:

```js id="z3a4b5"
Intl
```

Examples include:

```text id="c6d7e8"
Intl.NumberFormat
Intl.DateTimeFormat
Intl.RelativeTimeFormat
Intl.ListFormat
Intl.Collator
```

These APIs are useful for applications that support different languages, currencies, dates, and locales.

---

# 85. Number Formatting

Example:

```js id="f9g0h1"
const formatter =
  new Intl.NumberFormat(
    "en-US"
  );

console.log(
  formatter.format(1234567.89)
);
```

Output:

```text id="i2j3k4"
1,234,567.89
```

The exact result depends on locale and options.

---

# 86. Currency Formatting

```js id="l5m6n7"
const formatter =
  new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  );

console.log(
  formatter.format(1999.99)
);
```

This is preferable to manually constructing currency strings.

---

# 87. Date Formatting

```js id="o8p9q0"
const formatter =
  new Intl.DateTimeFormat(
    "en-US"
  );

console.log(
  formatter.format(new Date())
);
```

The formatter handles locale-specific formatting.

---

# 88. Relative Time

Modern applications can display values such as:

```text id="r1s2t3"
yesterday
in 2 days
3 hours ago
```

using:

```js id="u4v5w6"
const formatter =
  new Intl.RelativeTimeFormat(
    "en",
    { numeric: "auto" }
  );

console.log(
  formatter.format(-1, "day")
);
```

---

# 89. `Intl.Collator`

`Intl.Collator` provides locale-aware string comparison.

Example:

```js id="x7y8z9"
const collator =
  new Intl.Collator("en");

const result =
  collator.compare(
    "apple",
    "banana"
  );
```

This can be useful for sorting human-readable text.

---

# 90. Modern JavaScript Is More Than Syntax

A common mistake is to define modern JavaScript only as:

```text id="a0b1c2"
arrow functions
let / const
classes
```

Modern JavaScript also includes:

```text id="d3e4f5"
new standard-library methods
new asynchronous APIs
new iteration protocols
new numeric capabilities
new object utilities
new error capabilities
internationalization APIs
```

A strong JavaScript developer understands both:

```text id="g6h7i8"
language syntax
+
standard library
```

---

# 91. Which Modern Features Matter Most for React?

### Very High Priority

```text id="j9k0l1"
const / let
Arrow functions
Destructuring
Spread
Rest
Template literals
Modules
Array methods
Promises
async / await
Optional chaining
Nullish coalescing
```

### High Priority

```text id="m2n3o4"
Default parameters
Computed properties
Object utilities
Immutable array methods
Dynamic import
Error.cause
AbortController
```

### Medium Priority

```text id="p5q6r7"
Map
Set
for...of
Symbols
Iterators
structuredClone
Intl
```

### Lower Priority

```text id="s8t9u0"
Generators
WeakMap
WeakSet
BigInt
Private class features
Async generators
Advanced iterator protocols
```

Lower priority does not mean unimportant.

It means these features occur less frequently in ordinary React application code.

---

# 92. A Modern React Example

Consider:

```js id="v1w2x3"
const getUserName = async (id) => {
  const response =
    await fetch(`/api/users/${id}`);

  const user =
    await response.json();

  return user?.name ?? "Unknown";
};
```

This small example uses multiple modern JavaScript concepts:

```text id="y4z5a6"
const
arrow function
async
await
template literal
optional chaining
nullish coalescing
```

This is why strong JavaScript knowledge directly improves React development.

---

# 93. Another React Example: Immutable Updates

```js id="b7c8d9"
const updateUser = (user) => ({
  ...user,
  active: true,
});
```

This combines:

```text id="e0f1g2"
arrow function
object spread
object shorthand-style patterns
immutable update
```

These patterns appear constantly in React.

---

# 94. Modern JavaScript Learning Strategy

Do not try to memorize every new feature.

Instead, understand:

```text id="h3i4j5"
1. What problem does it solve?
2. What older pattern does it replace?
3. What are its semantics?
4. What are its limitations?
5. When should I use it?
6. Does my runtime support it?
```

This produces transferable knowledge.

---

# 95. Avoid Feature Chasing

JavaScript receives new features regularly.

You do not need to learn every proposal immediately.

A strong developer prioritizes:

```text id="k6l7m8"
core language fundamentals
        ↓
commonly used modern features
        ↓
framework-relevant APIs
        ↓
specialized features
        ↓
new proposals when needed
```

This prevents learning from becoming a race against the language specification.

---

# 96. Modern JavaScript and Readability

Modern syntax is not automatically better.

For example:

```js id="n9o0p1"
const value =
  condition && object?.value ?? fallback;
```

can be difficult to understand.

Sometimes explicit code is clearer:

```js id="q2r3s4"
let value;

if (condition) {
  value = object?.value;
}

if (value == null) {
  value = fallback;
}
```

Use modern syntax when it improves clarity, not simply because it is shorter.

---

# 97. Modern JavaScript and Immutability

Modern JavaScript provides increasingly strong support for immutable transformations.

Examples:

```text id="t5u6v7"
spread
map()
filter()
slice()
toSorted()
toReversed()
toSpliced()
with()
structuredClone()
```

These are especially valuable when working with React state.

---

# 98. Modern JavaScript and Performance

Modern syntax does not automatically mean better performance.

For example:

```js id="w8x9y0"
const copy = {
  ...object,
};
```

creates a new object.

Likewise:

```js id="a1b2c3"
array.toSorted();
```

creates a new array.

These behaviors are often desirable, especially for React state, but they still have memory and CPU costs.

Understand the semantics before optimizing.

---

# 99. Modern JavaScript and Maintainability

Good modern JavaScript should improve:

```text id="d4e5f6"
readability
correctness
maintainability
composition
testability
error handling
data safety
```

A feature should have a reason to exist.

Do not introduce complicated syntax merely to demonstrate knowledge.

---

# 100. Modern JavaScript Mental Model

Think about modern JavaScript as layers:

```text
ECMAScript Language
│
├── Variables and Scope
├── Functions
├── Objects
├── Classes
├── Modules
├── Operators
├── Control Flow
├── Iteration
├── Asynchronous Programming
└── Error Handling
        │
        ▼
Standard Library
│
├── Arrays
├── Objects
├── Map / Set
├── Strings
├── Intl
├── Dates
├── Errors
└── Structured Data
        │
        ▼
Runtime / Web APIs
│
├── fetch
├── AbortController
├── DOM
├── Timers
└── Storage
```

This distinction is important.

Not every API available in a browser is part of ECMAScript itself.

---

# 101. ECMAScript vs Web APIs

For example:

```js id="g7h8i9"
Promise
```

is part of JavaScript's standard language environment.

But:

```js id="j0k1l2"
fetch()
```

is a Web API.

Similarly:

```js id="m3n4o5"
document
```

belongs to the DOM environment, not the ECMAScript language specification.

Understanding this distinction becomes increasingly important as you work with browsers, Node.js, React, and Next.js.

---

# 102. ECMAScript vs Node.js

Node.js provides additional APIs around JavaScript.

For example:

```text id="p6q7r8"
ECMAScript
    +
Node.js APIs
    +
Web-compatible APIs
```

A Next.js application can involve all three layers.

Therefore, when learning JavaScript, distinguish:

```text id="s9t0u1"
JavaScript language
```

from:

```text id="v2w3x4"
runtime APIs
```

---

# 103. Modern JavaScript Checklist

You should be comfortable with:

```text id="y5z6a7"
[ ] let / const
[ ] block scope
[ ] arrow functions
[ ] template literals
[ ] destructuring
[ ] spread
[ ] rest
[ ] default parameters
[ ] enhanced objects
[ ] computed properties
[ ] classes
[ ] private class features
[ ] modules
[ ] dynamic import
[ ] promises
[ ] async / await
[ ] for...of
[ ] Map / Set
[ ] Symbols
[ ] iterators
[ ] generators
[ ] BigInt
[ ] optional chaining
[ ] nullish coalescing
[ ] logical assignment
[ ] modern array methods
[ ] structuredClone
[ ] Object.hasOwn
[ ] modern error features
[ ] AbortController
[ ] Intl
```

You do not need equal mastery of every item.

---

# 104. Recommended Learning Order

For a React-focused JavaScript developer, prioritize:

```text
1. Variables and scope
2. Functions
3. Objects and arrays
4. Destructuring
5. Spread / rest
6. Array methods
7. Template literals
8. Modules
9. Promises
10. async / await
11. Error handling
12. Optional chaining
13. Nullish coalescing
14. Immutable updates
15. Modern object and array APIs
16. Classes and OOP
17. Map / Set
18. Iterators / generators
19. Symbols / WeakMap / WeakSet
20. BigInt
```

This order reflects practical importance for modern frontend development rather than the chronological order in which ECMAScript features were introduced.

---

# 105. Quick Reference

| Feature             | Main Purpose                              |    |                   |
| ------------------- | ----------------------------------------- | -- | ----------------- |
| `let`               | Block-scoped reassignment                 |    |                   |
| `const`             | Block-scoped binding without reassignment |    |                   |
| Arrow functions     | Concise functions + lexical `this`        |    |                   |
| Template literals   | Interpolation and multiline strings       |    |                   |
| Destructuring       | Extract values                            |    |                   |
| Spread              | Expand/copy values                        |    |                   |
| Rest                | Collect values                            |    |                   |
| Default parameters  | Parameter fallback                        |    |                   |
| Computed properties | Dynamic property names                    |    |                   |
| Classes             | Class-based syntax over prototypes        |    |                   |
| `#private`          | Private class members                     |    |                   |
| Modules             | Code organization and dependencies        |    |                   |
| Dynamic `import()`  | Runtime module loading                    |    |                   |
| Promises            | Async result representation               |    |                   |
| `async/await`       | Promise-based async syntax                |    |                   |
| `Map`               | Key-value collection                      |    |                   |
| `Set`               | Unique values                             |    |                   |
| `Symbol`            | Unique primitive identifiers              |    |                   |
| Iterators           | Controlled iteration                      |    |                   |
| Generators          | Lazy iterator creation                    |    |                   |
| `BigInt`            | Large exact integers                      |    |                   |
| `?.`                | Safe nullish property access              |    |                   |
| `??`                | Nullish fallback                          |    |                   |
| `                   |                                           | =` | Assign when falsy |
| `&&=`               | Assign when truthy                        |    |                   |
| `??=`               | Assign when nullish                       |    |                   |
| `structuredClone()` | Structured deep cloning                   |    |                   |
| `Object.hasOwn()`   | Own-property check                        |    |                   |
| `toSorted()`        | Non-mutating sort                         |    |                   |
| `toReversed()`      | Non-mutating reverse                      |    |                   |
| `toSpliced()`       | Non-mutating splice                       |    |                   |
| `with()`            | Immutable array element replacement       |    |                   |
| `Intl`              | Internationalization                      |    |                   |
| `AbortController`   | Abortable operations                      |    |                   |

---

# 106. Final Key Takeaways

1. Modern JavaScript is a continuously evolving language.
2. ES2015 was a major milestone, but modern JavaScript extends far beyond ES6.
3. Modern JavaScript includes both language syntax and standard-library improvements.
4. `let` and `const` provide safer block-scoped variable declarations.
5. Arrow functions are heavily used in modern application development.
6. Destructuring and spread are fundamental React patterns.
7. Modules are essential for organizing modern applications.
8. Promises and `async/await` are essential for asynchronous programming.
9. Optional chaining and nullish coalescing improve safe data access.
10. Modern array methods increasingly support immutable programming.
11. `toSorted()`, `toReversed()`, `toSpliced()`, and `with()` are especially useful for immutable updates.
12. `structuredClone()` provides structured deep cloning for supported values.
13. `Object.hasOwn()` provides a modern own-property check.
14. `Object.groupBy()` and `Map.groupBy()` simplify grouping operations.
15. `Error.cause` improves error chaining.
16. `AbortController` is important for cancellable asynchronous operations.
17. `Intl` provides standardized internationalization functionality.
18. `globalThis` provides a standardized global-object reference.
19. Dynamic `import()` enables runtime module loading and can support code splitting.
20. Top-level `await` allows asynchronous module initialization.
21. Async generators and `for await...of` support asynchronous iteration.
22. BigInt provides exact large-integer arithmetic.
23. Private class features provide language-level private state.
24. Symbols and iterators enable important JavaScript protocols.
25. Not every modern feature is equally important for frontend development.
26. React developers should prioritize the JavaScript features they encounter every day.
27. Modern syntax should improve clarity, not merely reduce line count.
28. New language features do not automatically mean better performance.
29. Standard ECMAScript features and runtime/Web APIs are different layers.
30. A strong JavaScript developer learns features by understanding the problem each feature solves.

---

# React / Next.js Priority

For a React and Next.js developer, the most important modern JavaScript features are:

```text
VERY HIGH
──────────
const / let
Arrow functions
Destructuring
Spread / Rest
Template literals
Modules
Array methods
Promises
async / await
Optional chaining
Nullish coalescing
Immutable updates


HIGH
────
Default parameters
Computed properties
Dynamic import
Object utilities
Modern array methods
Error handling
AbortController


MEDIUM
──────
Map
Set
for...of
structuredClone
Intl
Symbols


LOWER
─────
Generators
Iterators
WeakMap
WeakSet
BigInt
Private class features
Async generators
```

The important point is not to memorize the entire ECMAScript specification.

For your React/Next.js path, the goal is to become fluent with the modern JavaScript features that appear repeatedly in real code, while understanding the specialized features well enough to recognize and use them when a project requires them.
