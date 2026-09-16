# JavaScript Data Types

Data types describe the kind of value a JavaScript program works with.

Understanding data types is fundamental to writing reliable JavaScript because different types behave differently when they are assigned, compared, converted, or used with operators.

For example:

```js
const name = "Osama";
const age = 25;
const isStudent = true;
```

These values have different types:

```text
"Osama"  → String
25       → Number
true     → Boolean
```

JavaScript is a **dynamically typed language**, which means a variable does not have a fixed type. The type belongs to the value currently stored in the variable.

---

## Table of Contents

* [Data Type Categories](#data-type-categories)
* [Primitive Data Types](#primitive-data-types)

  * [String](#1-string)
  * [Number](#2-number)
  * [BigInt](#3-bigint)
  * [Boolean](#4-boolean)
  * [Undefined](#5-undefined)
  * [Null](#6-null)
  * [Symbol](#7-symbol)
* [Non-Primitive Data Types](#non-primitive-data-types)

  * [Object](#object)
  * [Array](#array)
  * [Function](#function)
* [Checking Data Types](#checking-data-types)

  * [`typeof`](#typeof)
  * [`Array.isArray()`](#arrayisarray)
* [Primitive Values vs Objects](#primitive-values-vs-objects)
* [Value Copying and References](#value-copying-and-references)
* [Type Coercion](#type-coercion)
* [Explicit Type Conversion](#explicit-type-conversion)
* [Truthy and Falsy Values](#truthy-and-falsy-values)
* [Dynamic Typing](#dynamic-typing)
* [Common Pitfalls](#common-pitfalls)
* [Best Practices](#best-practices)
* [Quick Reference](#quick-reference)

---

# Data Type Categories

JavaScript data types are commonly divided into two categories:

```text
JavaScript Data Types
│
├── Primitive
│   ├── String
│   ├── Number
│   ├── BigInt
│   ├── Boolean
│   ├── Undefined
│   ├── Null
│   └── Symbol
│
└── Non-Primitive
    └── Object
        ├── Object
        ├── Array
        └── Function
```

The distinction between primitive and non-primitive values is important because they behave differently when copied and compared.

---

# Primitive Data Types

Primitive values represent a single value.

JavaScript has seven primitive data types:

1. `String`
2. `Number`
3. `BigInt`
4. `Boolean`
5. `Undefined`
6. `Null`
7. `Symbol`

Primitive values are **immutable**, meaning the value itself cannot be modified.

---

## 1. String

A `String` represents text.

Strings can be created using single quotes, double quotes, or template literals.

### Single Quotes

```js
const name = 'Osama';
```

### Double Quotes

```js
const name = "Osama";
```

### Template Literals

```js
const name = `Osama`;
```

Template literals are especially useful when working with variables and expressions.

```js
const name = "Osama";
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Output:

```text
My name is Osama and I am 25 years old.
```

### String Length

Strings have a `length` property.

```js
const language = "JavaScript";

console.log(language.length);
```

Output:

```text
10
```

### Common String Methods

```js
const language = "JavaScript";

console.log(language.toUpperCase());
console.log(language.toLowerCase());
console.log(language.includes("Script"));
console.log(language.startsWith("Java"));
console.log(language.endsWith("Script"));
```

These methods return new values rather than modifying the original string.

### Strings Are Immutable

```js
const language = "JavaScript";

language[0] = "X";

console.log(language);
```

Output:

```text
JavaScript
```

The original string was not modified.

---

# 2. Number

The `Number` type represents both integers and floating-point numbers.

```js
const age = 25;
const price = 19.99;
const temperature = -5;
```

JavaScript does not have separate `int`, `float`, or `double` primitive types.

All of these are `Number` values:

```js
console.log(typeof 10);
console.log(typeof 10.5);
console.log(typeof -20);
```

Output:

```text
number
number
number
```

## Special Number Values

JavaScript also has several special numeric values.

### Infinity

```js
console.log(10 / 0);
```

Output:

```text
Infinity
```

### Negative Infinity

```js
console.log(-10 / 0);
```

Output:

```text
-Infinity
```

### NaN

`NaN` stands for **Not-a-Number**.

It represents an invalid numeric result.

```js
console.log("Hello" * 5);
```

Output:

```text
NaN
```

Interestingly:

```js
console.log(typeof NaN);
```

Output:

```text
number
```

`NaN` is a special value within the `Number` type.

### Checking for NaN

Use `Number.isNaN()`:

```js
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("Hello"));
```

Output:

```text
true
false
```

---

# 3. BigInt

`BigInt` represents integers larger than the range safely supported by `Number`.

A `BigInt` literal ends with `n`.

```js
const largeNumber = 9007199254740993n;

console.log(typeof largeNumber);
```

Output:

```text
bigint
```

## Number's Safe Integer Limit

JavaScript provides:

```js
console.log(Number.MAX_SAFE_INTEGER);
```

Output:

```text
9007199254740991
```

Integers beyond this value may not be represented precisely as `Number`.

`BigInt` can represent arbitrarily large integers within the limits of available memory.

```js
const largeNumber = 123456789012345678901234567890n;
```

## BigInt Arithmetic

```js
const a = 10000000000000000n;
const b = 20000000000000000n;

console.log(a + b);
```

## Do Not Mix Number and BigInt Directly

This causes a `TypeError`:

```js
const number = 10;
const bigInt = 20n;

console.log(number + bigInt);
```

Convert explicitly when appropriate:

```js
console.log(BigInt(number) + bigInt);
```

or:

```js
console.log(number + Number(bigInt));
```

Converting a large `BigInt` to `Number` can result in precision loss.

---

# 4. Boolean

The `Boolean` type has only two values:

```js
true
false
```

Example:

```js
const isLoggedIn = true;
const isAdmin = false;
```

Booleans are commonly used with conditional statements:

```js
const isLoggedIn = true;

if (isLoggedIn) {
  console.log("Welcome!");
}
```

Expressions can also produce Boolean values:

```js
const age = 20;

console.log(age >= 18);
```

Output:

```text
true
```

Booleans are fundamental to:

* Conditional logic
* Comparisons
* Form validation
* Authentication checks
* Application state
* React UI state

---

# 5. Undefined

`undefined` represents a value that has not been assigned.

```js
let username;

console.log(username);
```

Output:

```text
undefined
```

Its type is:

```js
console.log(typeof username);
```

Output:

```text
undefined
```

A function that does not explicitly return a value also returns `undefined`.

```js
function greet() {
  console.log("Hello");
}

const result = greet();

console.log(result);
```

Output:

```text
Hello
undefined
```

## Undefined vs Undeclared

These are different concepts.

The variable exists but has no assigned value:

```js
let username;

console.log(username);
```

Result:

```text
undefined
```

An undeclared variable does not exist:

```js
console.log(age);
```

This causes:

```text
ReferenceError
```

Therefore:

```text
undefined
→ The variable exists, but no value has been assigned.

undeclared
→ The variable does not exist in the current scope.
```

---

# 6. Null

`null` represents the intentional absence of a value.

For example:

```js
let selectedUser = null;
```

This can communicate that there is currently no selected user.

Later, the variable can contain an object:

```js
selectedUser = {
  name: "Osama"
};
```

## Null vs Undefined

A useful distinction is:

```text
undefined
→ A value has not been assigned.

null
→ The programmer intentionally represents "no value".
```

Example:

```js
let username;
let selectedUser = null;
```

Here:

* `username` is `undefined`
* `selectedUser` is explicitly `null`

## The `typeof null` Quirk

One of JavaScript's historical quirks is:

```js
console.log(typeof null);
```

Output:

```text
object
```

Although `typeof null` returns `"object"`, `null` is a **primitive value**, not an object.

To check for `null`, use:

```js
value === null
```

---

# 7. Symbol

`Symbol` is a primitive type used to create unique values.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);
```

Output:

```text
false
```

Each call to `Symbol()` creates a unique symbol.

Symbols can be used as unique object property keys.

```js
const id = Symbol("id");

const user = {
  name: "Osama",
  [id]: 123
};

console.log(user[id]);
```

Output:

```text
123
```

Symbols are relatively uncommon in everyday application code but are important when working with advanced JavaScript features and built-in protocols.

---

# Non-Primitive Data Types

The main non-primitive category in JavaScript is `Object`.

Objects can represent collections of related data and more complex structures.

Common examples include:

* Objects
* Arrays
* Functions
* Dates
* Regular expressions
* Maps
* Sets

---

# Object

An object stores data using key-value pairs.

```js
const user = {
  name: "Osama",
  age: 25,
  isStudent: true
};
```

Properties can be accessed using dot notation:

```js
console.log(user.name);
console.log(user.age);
```

Or bracket notation:

```js
console.log(user["name"]);
```

Objects are fundamental to JavaScript and are used extensively in:

* APIs
* React
* Node.js
* Application state
* Configuration
* JSON data
* Database records

For example:

```js
const user = {
  id: 1,
  name: "Osama",
  email: "osama@example.com"
};
```

---

# Array

An array is an ordered collection of values.

```js
const skills = ["HTML", "CSS", "JavaScript"];
```

Array indexes start at `0`.

```text
HTML       → index 0
CSS        → index 1
JavaScript → index 2
```

Example:

```js
console.log(skills[0]);
console.log(skills[2]);
```

Output:

```text
HTML
JavaScript
```

Arrays can contain values of different types:

```js
const data = [
  "Osama",
  25,
  true,
  null
];
```

JavaScript allows this, although application code often benefits from keeping arrays conceptually consistent.

## Arrays Are Objects

```js
console.log(typeof []);
```

Output:

```text
object
```

Therefore, `typeof` alone cannot distinguish an array from a regular object.

Use:

```js
Array.isArray(value);
```

Example:

```js
console.log(Array.isArray([]));
console.log(Array.isArray({}));
```

Output:

```text
true
false
```

---

# Function

Functions are callable objects in JavaScript.

```js
function greet() {
  console.log("Hello");
}
```

A function can be called:

```js
greet();
```

Functions can also be stored in variables:

```js
const greet = function () {
  console.log("Hello");
};
```

And using arrow function syntax:

```js
const greet = () => {
  console.log("Hello");
};
```

Functions are **first-class values** in JavaScript.

This means functions can be:

* Stored in variables
* Passed as arguments
* Returned from other functions
* Stored inside objects
* Stored inside arrays

For example:

```js
function greet() {
  console.log("Hello");
}

function execute(callback) {
  callback();
}

execute(greet);
```

This concept becomes especially important when learning callbacks, higher-order functions, asynchronous JavaScript, event handlers, and React.

---

# Checking Data Types

JavaScript provides several ways to inspect values.

## `typeof`

The `typeof` operator returns a string describing the general type of a value.

```js
console.log(typeof "Hello");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof 42n);
console.log(typeof Symbol());
console.log(typeof {});
console.log(typeof function () {});
```

Output:

```text
string
number
boolean
undefined
bigint
symbol
object
function
```

### `typeof` Reference

| Value            | Result        |
| ---------------- | ------------- |
| `"Hello"`        | `"string"`    |
| `42`             | `"number"`    |
| `42n`            | `"bigint"`    |
| `true`           | `"boolean"`   |
| `undefined`      | `"undefined"` |
| `null`           | `"object"`    |
| `Symbol()`       | `"symbol"`    |
| `{}`             | `"object"`    |
| `[]`             | `"object"`    |
| `function () {}` | `"function"`  |

Remember that `typeof` has special cases and should not be treated as a complete type-checking system.

---

# `Array.isArray()`

Use `Array.isArray()` when you specifically need to determine whether a value is an array.

```js
const skills = ["JavaScript", "React"];

console.log(Array.isArray(skills));
```

Output:

```text
true
```

For comparison:

```js
console.log(Array.isArray({}));
console.log(Array.isArray("JavaScript"));
```

Output:

```text
false
false
```

---

# Primitive Values vs Objects

One of the most important differences between primitives and objects is how they behave when copied.

## Primitive Values

Consider:

```js
let a = 10;
let b = a;

b = 20;

console.log(a);
console.log(b);
```

Output:

```text
10
20
```

The assignment:

```js
let b = a;
```

copies the primitive value.

Conceptually:

```text
a → 10
b → 10
```

After changing `b`:

```text
a → 10
b → 20
```

The two variables are independent.

---

# Value Copying and References

Objects behave differently.

```js
const user1 = {
  name: "Osama"
};

const user2 = user1;

user2.name = "Ahmed";

console.log(user1.name);
console.log(user2.name);
```

Output:

```text
Ahmed
Ahmed
```

The assignment:

```js
const user2 = user1;
```

does not create a new independent object.

Both variables refer to the same object.

Conceptually:

```text
user1 ──┐
        ├──> { name: "Osama" }
user2 ──┘
```

After:

```js
user2.name = "Ahmed";
```

both variables observe the same modified object.

This behavior is commonly described as **reference behavior**.

---

# Creating a Shallow Copy

The spread syntax can create a shallow copy of an object:

```js
const user1 = {
  name: "Osama",
  age: 25
};

const user2 = {
  ...user1
};

user2.name = "Ahmed";

console.log(user1.name);
console.log(user2.name);
```

Output:

```text
Osama
Ahmed
```

However, spread syntax performs a **shallow copy**.

Consider a nested object:

```js
const user1 = {
  name: "Osama",
  address: {
    city: "Gaza"
  }
};

const user2 = {
  ...user1
};

user2.address.city = "Ramallah";

console.log(user1.address.city);
```

Output:

```text
Ramallah
```

The nested `address` object is still shared.

For structured data that needs an independent deep copy, modern JavaScript provides:

```js
const copy = structuredClone(original);
```

`structuredClone()` is generally more appropriate than using:

```js
JSON.parse(JSON.stringify(original));
```

because JSON serialization cannot correctly preserve many JavaScript values and structures.

---

# Type Coercion

**Type coercion** is the conversion of a value from one type to another.

JavaScript can perform type coercion automatically in some operations.

This is called **implicit type coercion**.

For example:

```js
console.log("5" + 2);
```

Output:

```text
52
```

The number `2` is converted to a string and concatenated.

However:

```js
console.log("5" - 2);
```

Output:

```text
3
```

The string `"5"` is converted to a number.

This difference occurs because the `+` and `-` operators have different rules for handling strings.

Type coercion is one reason developers need a strong understanding of JavaScript types and operators.

---

# Explicit Type Conversion

You can intentionally convert values instead of relying on implicit coercion.

## Convert to String

Use `String()`:

```js
const value = 123;

const result = String(value);

console.log(result);
console.log(typeof result);
```

Output:

```text
123
string
```

## Convert to Number

Use `Number()`:

```js
const value = "123";

const result = Number(value);

console.log(result);
console.log(typeof result);
```

Output:

```text
123
number
```

Invalid numeric conversion produces `NaN`:

```js
console.log(Number("Hello"));
```

Output:

```text
NaN
```

## Convert to Boolean

Use `Boolean()`:

```js
console.log(Boolean(1));
console.log(Boolean(0));
```

Output:

```text
true
false
```

Explicit conversion can make the programmer's intention clearer.

---

# Truthy and Falsy Values

When JavaScript expects a Boolean value, it can convert other values to Boolean automatically.

Values that behave like `true` are called **truthy**.

Values that behave like `false` are called **falsy**.

Example:

```js
if ("Hello") {
  console.log("This runs");
}
```

The string `"Hello"` is truthy.

## Falsy Values

The following values are falsy:

```js
false
0
-0
0n
""
null
undefined
NaN
```

Most other values are truthy.

For example:

```js
Boolean("Hello"); // true
Boolean(100);     // true
Boolean([]);      // true
Boolean({});      // true
```

An empty array and an empty object are both truthy.

This is an important detail when writing conditional logic.

---

# Dynamic Typing

JavaScript is dynamically typed.

A variable can hold values of different types during its lifetime.

```js
let value = 10;

value = "Hello";

value = true;
```

The variable `value` changed from:

```text
number
```

to:

```text
string
```

and then:

```text
boolean
```

The type is determined at runtime based on the current value.

Dynamic typing provides flexibility, but it also means developers need to pay attention to the types of values flowing through their programs.

---

# Common Pitfalls

## 1. Confusing `null` and `undefined`

```js
let value;
```

produces:

```text
undefined
```

while:

```js
let value = null;
```

represents an intentional absence of value.

---

## 2. Assuming `typeof null` Returns `"null"`

It does not:

```js
typeof null;
```

returns:

```text
"object"
```

Use:

```js
value === null;
```

when checking specifically for `null`.

---

## 3. Assuming Arrays Have a `typeof` Result of `"array"`

They do not:

```js
typeof [];
```

returns:

```text
"object"
```

Use:

```js
Array.isArray(value);
```

instead.

---

## 4. Unexpected Type Coercion

Be careful with expressions such as:

```js
"10" + 5;
```

which produces:

```text
"105"
```

while:

```js
"10" - 5;
```

produces:

```text
5
```

---

## 5. Comparing Objects by Content

Consider:

```js
const user1 = {
  name: "Osama"
};

const user2 = {
  name: "Osama"
};

console.log(user1 === user2);
```

Output:

```text
false
```

The objects contain the same properties and values, but they are two separate objects.

By contrast:

```js
const user1 = {
  name: "Osama"
};

const user2 = user1;

console.log(user1 === user2);
```

Output:

```text
true
```

Both variables refer to the same object.

---

## 6. Losing Precision with Large Numbers

Do not assume every large integer can be safely represented by `Number`.

```js
console.log(Number.MAX_SAFE_INTEGER);
```

For integers beyond the safe range, consider using `BigInt`:

```js
const value = 9007199254740993n;
```

---

# Best Practices

## Prefer `const` by Default

Use `const` when a variable does not need reassignment:

```js
const name = "Osama";
```

Use `let` when reassignment is required:

```js
let count = 0;

count++;
```

Avoid `var` in modern JavaScript unless you specifically need to work with legacy code or understand its behavior.

---

## Prefer Strict Equality

Prefer:

```js
===
!==
```

over:

```js
==
!=
```

For example:

```js
console.log(5 === "5");
```

Output:

```text
false
```

Whereas:

```js
console.log(5 == "5");
```

Output:

```text
true
```

The loose equality operator performs type coercion, while strict equality compares both type and value.

---

## Use Explicit Conversion When Appropriate

Instead of depending on implicit conversion:

```js
const age = "25";
```

convert the value when a number is actually required:

```js
const age = Number("25");
```

This makes the intended type clearer.

---

## Use the Appropriate Type Check

Use:

```js
typeof value
```

for common primitive type checks.

Use:

```js
Array.isArray(value)
```

for arrays.

Use:

```js
value === null
```

for `null`.

Do not assume that `typeof` alone can distinguish every JavaScript data structure.

---

# Quick Reference

## Primitive Types

| Type      | Example     | `typeof` Result |
| --------- | ----------- | --------------- |
| String    | `"Hello"`   | `"string"`      |
| Number    | `42`        | `"number"`      |
| BigInt    | `42n`       | `"bigint"`      |
| Boolean   | `true`      | `"boolean"`     |
| Undefined | `undefined` | `"undefined"`   |
| Null      | `null`      | `"object"`*     |
| Symbol    | `Symbol()`  | `"symbol"`      |

* `typeof null` returning `"object"` is a historical JavaScript quirk.

---

## Common Object Types

| Value    | Example             | `typeof` Result |
| -------- | ------------------- | --------------- |
| Object   | `{ name: "Osama" }` | `"object"`      |
| Array    | `[1, 2, 3]`         | `"object"`      |
| Function | `function () {}`    | `"function"`    |
| Date     | `new Date()`        | `"object"`      |
| RegExp   | `/hello/`           | `"object"`      |
| Map      | `new Map()`         | `"object"`      |
| Set      | `new Set()`         | `"object"`      |

---

# Key Takeaways

* JavaScript has **seven primitive data types**:
  `String`, `Number`, `BigInt`, `Boolean`, `Undefined`, `Null`, and `Symbol`.

* `Object` is the main non-primitive category.

* Arrays, functions, dates, maps, sets, and other complex structures are objects with specialized behavior.

* Primitive values are immutable.

* Objects and arrays have reference-based behavior when assigned to other variables.

* `typeof` is useful for general type checking but has important exceptions.

* `typeof null` returns `"object"` even though `null` is a primitive.

* Use `Array.isArray()` to check whether a value is an array.

* JavaScript supports implicit type coercion.

* Explicit conversion can be performed with `String()`, `Number()`, and `Boolean()`.

* `true`, `false`, `0`, `null`, `undefined`, `NaN`, and other falsy values are important when writing conditional logic.

* JavaScript is dynamically typed, so variables can hold values of different types over time.

* Use `===` and `!==` when you want strict comparisons.

* Use `BigInt` when working with integers beyond the safe integer range of `Number`.

Understanding data types provides the foundation for understanding JavaScript operators, control flow, functions, objects, asynchronous programming, DOM manipulation, and modern frameworks such as React.
