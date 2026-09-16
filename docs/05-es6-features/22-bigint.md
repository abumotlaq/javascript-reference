# BigInt

> A deep reference to JavaScript `BigInt`, including large integer precision, syntax, arithmetic, comparisons, conversion, division, mixing with `Number`, JSON serialization, typed arrays, practical use cases, common mistakes, and modern JavaScript considerations.

---

# 1. What Is BigInt?

`BigInt` is a JavaScript primitive data type designed to represent **integers larger than the safe range of the `Number` type**.

JavaScript traditionally uses `Number` for numeric values:

```js
const value = 42;
```

But `Number` uses IEEE 754 double-precision floating-point representation.

This means that integers are represented exactly only within a specific safe range.

`BigInt` solves this problem for very large integers.

---

# 2. Creating a BigInt

The easiest syntax is adding `n` to an integer literal:

```js
const value = 123n;

console.log(value);
```

Output:

```text
123n
```

The `n` tells JavaScript:

> This is a BigInt literal, not a Number.

---

# 3. `typeof BigInt`

`BigInt` is its own primitive type.

```js
const value = 123n;

console.log(typeof value);
```

Output:

```text
bigint
```

Compare:

```js
const number = 123;

console.log(typeof number);
```

Output:

```text
number
```

So:

```text
123  → number
123n → bigint
```

---

# 4. BigInt Is a Primitive

`BigInt` belongs to JavaScript's primitive values.

The primitive types include:

```text
string
number
bigint
boolean
undefined
symbol
null
```

Therefore:

```js
const id = 12345678901234567890n;
```

creates a primitive BigInt value.

---

# 5. Why BigInt Exists

The main reason for `BigInt` is **integer precision**.

The largest integer that can be represented safely using ordinary JavaScript `Number` arithmetic is:

```js
Number.MAX_SAFE_INTEGER
```

Its value is:

```text
9007199254740991
```

This is:

```text
2^53 - 1
```

---

# 6. The Safe Integer Range

JavaScript can safely represent integers from:

```text
-9007199254740991
```

to:

```text
9007199254740991
```

You can inspect the limits:

```js
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_SAFE_INTEGER);
```

Output:

```text
-9007199254740991
9007199254740991
```

Outside this range, integer precision can become unreliable.

---

# 7. The Precision Problem

Consider:

```js
const value = 9007199254740992;

console.log(value);
```

This number is already outside the safe integer range.

More importantly, different mathematical integers can become indistinguishable when represented as `Number`.

For example:

```js
console.log(
  9007199254740992 ===
  9007199254740993
);
```

The result is:

```text
true
```

This is a precision problem.

---

# 8. BigInt Solves Large Integer Precision

Using BigInt:

```js
const a = 9007199254740992n;
const b = 9007199254740993n;

console.log(a === b);
```

Output:

```text
false
```

Each integer remains distinct.

---

# 9. Arbitrarily Large Integers

BigInt can represent integers much larger than the safe `Number` range.

For example:

```js
const value =
  123456789012345678901234567890123456789n;

console.log(value);
```

BigInt is designed for this type of exact integer arithmetic.

---

# 10. BigInt Literals

A BigInt literal must represent an integer.

Valid:

```js
10n
0n
-10n
12345678901234567890n
```

Invalid:

```js
10.5n
```

BigInt does not represent fractional values.

---

# 11. BigInt Does Not Represent Decimals

This is invalid:

```js
const value = 10.5n;
```

BigInt represents:

```text
integers only
```

If your calculation requires:

```text
10.5
3.14
0.25
```

you normally need `Number` or another numeric representation.

---

# 12. Creating BigInt with the Constructor

You can also use:

```js
BigInt()
```

For example:

```js
const value = BigInt(123);

console.log(value);
```

Output:

```text
123n
```

---

# 13. BigInt from a String

A string containing an integer can be converted:

```js
const value =
  BigInt("12345678901234567890");

console.log(value);
```

Output:

```text
12345678901234567890n
```

This is useful when large integer data arrives as text.

---

# 14. BigInt from Number

You can convert a Number to BigInt:

```js
const value = BigInt(123);

console.log(value);
```

Output:

```text
123n
```

However, the Number must represent an integer that can safely and correctly be converted.

For example:

```js
BigInt(10.5);
```

throws an error because the value is not an integer.

---

# 15. Precision Warning During Conversion

Be careful with this:

```js
BigInt(9007199254740993);
```

The problem occurs **before** `BigInt()` receives the value.

The numeric literal is interpreted as a `Number` first.

If the Number has already lost precision, `BigInt()` cannot recover the original mathematical value.

Prefer:

```js
BigInt("9007199254740993");
```

or:

```js
9007199254740993n
```

when exactness matters.

---

# 16. BigInt Arithmetic

BigInt supports common integer arithmetic operators:

```text
+
-
*
/
%
**
```

Example:

```js
const a = 20n;
const b = 6n;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
```

Output:

```text
26n
14n
120n
3n
2n
```

---

# 17. BigInt Addition

```js
const a = 100n;
const b = 50n;

console.log(a + b);
```

Output:

```text
150n
```

Both operands are BigInt values.

---

# 18. BigInt Subtraction

```js
const a = 100n;
const b = 30n;

console.log(a - b);
```

Output:

```text
70n
```

---

# 19. BigInt Multiplication

```js
const a = 20n;
const b = 5n;

console.log(a * b);
```

Output:

```text
100n
```

---

# 20. BigInt Division

BigInt division produces an integer result.

```js
const result = 10n / 3n;

console.log(result);
```

Output:

```text
3n
```

The fractional part is discarded.

It does not produce:

```text
3.333...
```

because BigInt cannot represent fractions.

---

# 21. Negative Division

BigInt division truncates toward zero.

```js
console.log(-10n / 3n);
```

Output:

```text
-3n
```

It does not produce:

```text
-4n
```

---

# 22. BigInt Modulo

The remainder operator works with BigInt:

```js
const remainder = 10n % 3n;

console.log(remainder);
```

Output:

```text
1n
```

---

# 23. BigInt Exponentiation

BigInt supports exponentiation:

```js
const result = 2n ** 10n;

console.log(result);
```

Output:

```text
1024n
```

The exponent must also be a BigInt.

---

# 24. Mixing Number and BigInt

This is one of the most important rules:

> You cannot directly perform arithmetic between `Number` and `BigInt`.

For example:

```js
const result = 10n + 5;
```

throws:

```text
TypeError
```

JavaScript does not automatically convert one side.

---

# 25. Why Mixing Is Dangerous

Consider:

```js
const large = 9007199254740993n;
const normal = 1;
```

JavaScript cannot simply decide whether to convert:

```text
BigInt → Number
```

or:

```text
Number → BigInt
```

without potentially losing information.

Therefore, arithmetic mixing is prohibited.

---

# 26. Convert Explicitly

If you need BigInt arithmetic:

```js
const a = 10n;
const b = BigInt(5);

console.log(a + b);
```

Output:

```text
15n
```

Or convert BigInt to Number when it is safe:

```js
const a = 10n;
const b = Number(a);

console.log(b);
```

---

# 27. BigInt to Number Warning

Converting a large BigInt to Number can lose precision.

For example:

```js
const value =
  9007199254740993n;

const number =
  Number(value);
```

The resulting Number cannot necessarily represent the original integer exactly.

Therefore:

> Do not convert large BigInt values to Number merely for convenience.

---

# 28. BigInt Comparisons

Relational comparisons can compare Number and BigInt:

```js
console.log(10n > 5);
```

Output:

```text
true
```

Also:

```js
console.log(10n < 20);
```

Output:

```text
true
```

Arithmetic mixing is prohibited, but relational comparison supports both numeric types.

---

# 29. Loose Equality

BigInt and Number can compare equal with loose equality in some cases:

```js
console.log(10n == 10);
```

Output:

```text
true
```

---

# 30. Strict Equality

Strict equality checks both value and type:

```js
console.log(10n === 10);
```

Output:

```text
false
```

Because:

```text
10n → bigint
10  → number
```

Therefore:

```text
10n == 10   → true
10n === 10  → false
```

---

# 31. Recommended Equality

Prefer strict equality when possible:

```js
value === expected;
```

If comparing BigInt and Number intentionally, make the conversion explicit so that the numeric model is clear.

---

# 32. BigInt with Boolean Contexts

BigInt values can be used in conditions.

```js
if (10n) {
  console.log("Truthy");
}
```

Output:

```text
Truthy
```

Like numbers:

```text
0n → falsy
```

and:

```text
10n → truthy
```

---

# 33. BigInt Truthiness

The only falsy BigInt value is:

```js
0n
```

Examples:

```js
Boolean(0n);
```

returns:

```text
false
```

while:

```js
Boolean(1n);
```

returns:

```text
true
```

---

# 34. Unary Plus Does Not Work

The unary plus operator cannot be used with BigInt:

```js
const value = 10n;

+value;
```

This throws a `TypeError`.

This is intentional because unary plus has historically been associated with numeric conversion to `Number`.

Use explicit conversion when necessary:

```js
Number(value);
```

---

# 35. Increment and Decrement

BigInt supports:

```text
++
--
```

Example:

```js
let count = 10n;

count++;

console.log(count);
```

Output:

```text
11n
```

Likewise:

```js
let count = 10n;

count--;

console.log(count);
```

Output:

```text
9n
```

---

# 36. Compound Assignment

BigInt supports compound assignment operators:

```js
let value = 10n;

value += 5n;
value *= 2n;

console.log(value);
```

Output:

```text
30n
```

Operands must remain compatible.

---

# 37. Bitwise Operators

BigInt supports bitwise operations using BigInt operands:

```js
const a = 5n;
const b = 3n;

console.log(a & b);
console.log(a | b);
console.log(a ^ b);
```

BigInt also supports:

```text
~
<<
>>
```

but not the unsigned right shift operator:

```text
>>>
```

because BigInt values are signed integer values.

---

# 38. BigInt and `Math`

Most `Math` methods work with `Number`, not BigInt.

For example:

```js
Math.sqrt(16n);
```

throws a `TypeError`.

Do not expect:

```text
Math.*
```

APIs to automatically support BigInt.

Use BigInt operators and APIs designed for BigInt values.

---

# 39. `Number.isInteger()` and BigInt

Be careful when checking types.

```js
Number.isInteger(10);
```

returns:

```text
true
```

But:

```js
Number.isInteger(10n);
```

returns:

```text
false
```

because `10n` is not a Number.

It is a BigInt.

---

# 40. `Number.isSafeInteger()`

Similarly:

```js
Number.isSafeInteger(10);
```

returns:

```text
true
```

But:

```js
Number.isSafeInteger(10n);
```

returns:

```text
false
```

The method is specifically about Number values.

---

# 41. Checking for BigInt

Use:

```js
typeof value === "bigint"
```

Example:

```js
const value = 123n;

if (typeof value === "bigint") {
  console.log("This is a BigInt");
}
```

---

# 42. BigInt Object Wrapper

JavaScript also has the `BigInt` constructor:

```js
BigInt
```

and BigInt object wrappers can exist, although primitive BigInt values are normally preferred.

Avoid unnecessary object wrappers such as:

```js
Object(10n);
```

Prefer:

```js
10n
```

---

# 43. BigInt and Strings

BigInt can be converted to a string:

```js
const value = 123456789n;

console.log(String(value));
```

Output:

```text
123456789
```

The resulting value is a normal string.

---

# 44. `toString()`

You can also use:

```js
const value = 123456789n;

console.log(value.toString());
```

Output:

```text
123456789
```

This is useful when sending BigInt values through systems that represent numbers as strings.

---

# 45. BigInt in Different Bases

BigInt supports numeric prefixes.

Binary:

```js
const binary = 0b1010n;
```

Octal:

```js
const octal = 0o12n;
```

Hexadecimal:

```js
const hex = 0xFFn;
```

All represent integer values.

---

# 46. Parsing BigInt

You can convert an integer string:

```js
const value = BigInt("123456");

console.log(value);
```

Output:

```text
123456n
```

This is useful for IDs and other large integer values received as strings.

---

# 47. Invalid BigInt Input

This is invalid:

```js
BigInt("12.5");
```

because the string does not represent an integer.

Likewise:

```js
BigInt("hello");
```

throws an error.

Validate external input before converting it.

---

# 48. BigInt and JSON

One important limitation is JSON serialization.

Consider:

```js
const data = {
  id: 123n,
};

JSON.stringify(data);
```

This throws a `TypeError`.

Standard JSON does not have a native BigInt data type.

---

# 49. Converting BigInt for JSON

A common approach is converting BigInt to a string:

```js
const data = {
  id: 12345678901234567890n,
};

const json = JSON.stringify(data, (_, value) =>
  typeof value === "bigint"
    ? value.toString()
    : value
);

console.log(json);
```

Result:

```text
{"id":"12345678901234567890"}
```

Now the exact integer is represented as a string.

---

# 50. JSON and Precision

Converting a large integer to a JSON Number can be dangerous.

Avoid:

```js
JSON.stringify({
  id: Number(12345678901234567890n),
});
```

because the Number conversion can lose precision.

Prefer:

```text
BigInt → string → JSON
```

when exact large-integer preservation matters.

---

# 51. Parsing JSON Back to BigInt

If an API sends:

```json
{
  "id": "12345678901234567890"
}
```

you can convert the string:

```js
const data = {
  id: "12345678901234567890",
};

const id = BigInt(data.id);

console.log(id);
```

Output:

```text
12345678901234567890n
```

---

# 52. BigInt and Database IDs

BigInt can be useful when a database contains very large integer columns.

For example, a database may represent an identifier larger than JavaScript's safe Number range.

Instead of:

```text
database integer
      ↓
JavaScript Number
      ↓
precision loss
```

you may use:

```text
database integer
      ↓
string / BigInt
      ↓
exact integer
```

The exact representation depends on the database driver and framework.

---

# 53. BigInt and PostgreSQL

PostgreSQL has integer types including:

```text
smallint
integer
bigint
```

A PostgreSQL `bigint` can contain values larger than JavaScript's safe integer range.

When working with PostgreSQL through JavaScript tools, verify how the specific driver returns `bigint` values.

Some drivers return large integer values as strings specifically to avoid precision loss.

Do not assume every database library automatically converts PostgreSQL `bigint` to JavaScript `BigInt`.

---

# 54. BigInt in Supabase Applications

When using Supabase/PostgreSQL from JavaScript, you may encounter large integer database values.

For example, if a PostgreSQL column contains a very large integer:

```text
PostgreSQL bigint
```

the application should preserve the exact value.

Depending on the client and data path, it may arrive as:

```text
string
```

rather than:

```text
number
```

If you need BigInt arithmetic:

```js
const id = BigInt(databaseValue);
```

Do this only when the value is actually an integer and your application benefits from BigInt semantics.

---

# 55. BigInt for Large IDs

BigInt can be useful for:

* database integer values
* cryptographic calculations
* financial integer units
* very large counters
* large sequence numbers
* exact integer algorithms
* low-level numeric operations

However, not every large identifier needs to become a BigInt.

If an ID is only being displayed or transmitted, keeping it as a string may be simpler.

---

# 56. BigInt for Money

BigInt can represent monetary values in the smallest unit.

For example, instead of:

```js
const price = 19.99;
```

you can represent:

```js
const priceInCents = 1999n;
```

This avoids floating-point decimal issues for integer-based monetary calculations.

However, this works only when your monetary model uses a fixed integer unit such as:

```text
cents
```

or:

```text
smallest currency unit
```

It does not mean BigInt supports decimal currency directly.

---

# 57. BigInt and Cryptography

BigInt can be useful for mathematical operations involving very large integers.

For example:

```js
const value =
  123456789012345678901234567890n;
```

However, cryptographic code should generally use dedicated cryptographic APIs and algorithms rather than implementing cryptography casually with BigInt.

BigInt provides integer arithmetic; it does not automatically provide cryptographic security.

---

# 58. BigInt Typed Arrays

JavaScript provides typed arrays for BigInt values:

```js
BigInt64Array
```

and:

```js
BigUint64Array
```

Example:

```js
const values =
  new BigInt64Array([10n, 20n, 30n]);

console.log(values[0]);
```

Output:

```text
10n
```

---

# 59. `BigInt64Array`

`BigInt64Array` stores signed 64-bit integers.

Example:

```js
const values =
  new BigInt64Array(2);

values[0] = 100n;
values[1] = -50n;
```

The values are represented as signed 64-bit integers.

---

# 60. `BigUint64Array`

`BigUint64Array` stores unsigned 64-bit integers.

Example:

```js
const values =
  new BigUint64Array(2);

values[0] = 100n;
values[1] = 200n;
```

These values are unsigned 64-bit integers.

---

# 61. BigInt and `Map`

BigInt can be used as a Map key:

```js
const users = new Map();

users.set(12345678901234567890n, {
  name: "Osama Abu Motlaq",
});

console.log(
  users.get(12345678901234567890n)
);
```

BigInt values follow normal Map key identity rules.

---

# 62. BigInt and `Set`

BigInt can also be stored in a Set:

```js
const values = new Set();

values.add(10n);
values.add(20n);

console.log(values.has(10n));
```

Output:

```text
true
```

---

# 63. Sorting BigInt Values

Be careful with sorting.

The default `Array.prototype.sort()` converts values to strings for its default comparison behavior.

Prefer an explicit comparator when sorting numeric values.

For example:

```js
const values = [
  20n,
  3n,
  100n,
];

values.sort((a, b) =>
  a < b ? -1 : a > b ? 1 : 0
);

console.log(values);
```

Result:

```text
[3n, 20n, 100n]
```

This comparator avoids converting the BigInt values to Number.

---

# 64. Do Not Use `a - b` as a Comparator

For Number arrays, this is common:

```js
values.sort((a, b) => a - b);
```

But if `a` and `b` are BigInts:

```js
values.sort((a, b) => a - b);
```

the comparator returns a BigInt.

`sort()` expects the comparator result to be a Number.

Therefore, use comparisons:

```js
values.sort((a, b) =>
  a < b ? -1 : a > b ? 1 : 0
);
```

---

# 65. BigInt and `Date`

`Date` APIs generally use Numbers for timestamps.

If you have a BigInt timestamp, you may need explicit conversion:

```js
const timestamp = 1700000000000n;

const date = new Date(Number(timestamp));
```

Only do this when the value is safely representable as a Number for the required operation.

---

# 66. BigInt and `Math`

Remember:

```js
Math.*
```

generally operates on Numbers.

Therefore, this is invalid:

```js
Math.max(10n, 20n);
```

You should use BigInt-specific comparison logic when working with BigInt values.

For example:

```js
const a = 10n;
const b = 20n;

const max = a > b ? a : b;
```

---

# 67. BigInt and `parseInt`

Do not confuse:

```js
parseInt()
```

with:

```js
BigInt()
```

For example:

```js
parseInt("12345678901234567890");
```

returns a Number and may lose precision.

For exact large integers:

```js
BigInt("12345678901234567890");
```

is the appropriate conversion.

---

# 68. BigInt and Decimal Data

BigInt cannot represent:

```text
1.5
3.14
99.99
```

If an application needs exact decimal arithmetic, BigInt alone is not sufficient unless you deliberately scale the values.

For example:

```text
$19.99
```

can be represented as:

```js
1999n
```

when using cents.

---

# 69. BigInt and Floating-Point Numbers

`Number` is suitable for:

```text
scientific calculations
decimals
UI values
general arithmetic
coordinates
measurements
```

BigInt is suitable for:

```text
exact integers
large integer ranges
integer counters
integer IDs
```

Choosing the type should depend on the data model.

---

# 70. Number vs BigInt

| Feature                    | `Number`          | `BigInt`                     |
| -------------------------- | ----------------- | ---------------------------- |
| Type                       | `number`          | `bigint`                     |
| Integers                   | Yes               | Yes                          |
| Decimals                   | Yes               | No                           |
| Very large integers        | Limited precision | Exact integer representation |
| `Math.*`                   | Yes               | Generally no                 |
| Arithmetic with other type | —                 | Must not mix directly        |
| JSON native support        | Yes               | No native JSON type          |
| Fractional division        | Yes               | No                           |
| `0` / `0n`                 | Falsy             | Falsy                        |

---

# 71. When Should You Use BigInt?

Use BigInt when:

```text
1. Exact integer precision is required.
2. Values can exceed Number.MAX_SAFE_INTEGER.
3. You need very large integer calculations.
4. Your data model naturally uses arbitrary-size integers.
```

Examples include:

```text
large database integers
large counters
cryptographic mathematics
exact integer algorithms
integer-based monetary units
```

---

# 72. When Should You Not Use BigInt?

Do not use BigInt simply because it is newer.

For ordinary values such as:

```js
const age = 25;
const count = 10;
const score = 95;
```

`Number` is simpler and appropriate.

Do not convert every numeric value to BigInt.

---

# 73. Common Mistake: Adding `n` to Decimal Numbers

Invalid:

```js
const price = 19.99n;
```

BigInt only represents integers.

Use:

```js
const price = 19.99;
```

or model the amount using the smallest integer unit:

```js
const priceInCents = 1999n;
```

---

# 74. Common Mistake: Mixing Types

Invalid:

```js
const result = 10n + 5;
```

Use:

```js
const result = 10n + 5n;
```

or explicitly convert one side when appropriate.

---

# 75. Common Mistake: Converting Large Numbers Too Late

This is unsafe:

```js
const value =
  BigInt(9007199254740993);
```

The Number may already have lost precision.

Prefer:

```js
const value =
  BigInt("9007199254740993");
```

or:

```js
const value =
  9007199254740993n;
```

---

# 76. Common Mistake: JSON.stringify()

This fails:

```js
JSON.stringify({
  value: 123n,
});
```

BigInt must be serialized using an application-specific representation, commonly a string.

---

# 77. Common Mistake: Assuming BigInt Works with `Math`

This fails:

```js
Math.max(10n, 20n);
```

Use BigInt-compatible logic instead.

---

# 78. Common Mistake: Assuming BigInt Is Faster

BigInt is not automatically faster than Number.

It solves a different problem:

```text
exact arbitrary-size integer arithmetic
```

Use it because your data requires its semantics, not because it sounds more powerful.

---

# 79. Common Mistake: Treating BigInt as a Security Feature

BigInt provides larger integer arithmetic.

It does not provide:

```text
encryption
authentication
authorization
secure storage
```

It is a numeric data type, not a security mechanism.

---

# 80. React Relevance

BigInt is **not a core React concept**.

You should understand it as part of modern JavaScript, but it is much less important for everyday React development than:

```text
objects
arrays
functions
destructuring
spread
modules
promises
async/await
optional chaining
nullish coalescing
```

You may encounter BigInt when React applications consume:

* database data
* APIs
* financial data
* large counters
* specialized libraries

---

# 81. React State and BigInt

BigInt can technically be stored in React state:

```js
const [count, setCount] =
  useState(0n);
```

Then:

```js
setCount((current) =>
  current + 1n
);
```

But remember:

```text
0n
```

must remain a BigInt.

This would fail:

```js
current + 1
```

because it mixes BigInt and Number.

---

# 82. Next.js Relevance

BigInt can appear in Next.js applications when handling:

* PostgreSQL `bigint`
* server-side database queries
* large integer IDs
* server-side calculations
* financial integer values

One important issue is serialization.

A BigInt value cannot simply be passed through every serialization boundary as if it were a Number.

When data crosses a boundary such as JSON, choose an explicit representation such as a string.

---

# 83. BigInt and API Design

Suppose your API needs to return:

```text
12345678901234567890
```

Sending it as a JSON Number may cause precision problems in JavaScript clients.

A safer representation can be:

```json
{
  "id": "12345678901234567890"
}
```

The client can then decide whether to keep it as a string or convert it to BigInt:

```js
const id = BigInt(data.id);
```

---

# 84. BigInt and `Object.is`

BigInt works with normal equality semantics:

```js
Object.is(10n, 10n);
```

returns:

```text
true
```

But:

```js
Object.is(10n, 10);
```

returns:

```text
false
```

because the types differ.

---

# 85. BigInt and `Object.hasOwn`

BigInt can be used as a value like any other primitive:

```js
const data = {
  id: 123n,
};

console.log(
  Object.hasOwn(data, "id")
);
```

The property value being BigInt does not change ordinary object property behavior.

---

# 86. BigInt as an Object Property

```js
const user = {
  id: 12345678901234567890n,
  name: "Osama Abu Motlaq",
};

console.log(user.id);
```

The property can hold a BigInt normally.

The main concern arises when that object is serialized.

---

# 87. BigInt in Arrays

BigInt can be stored in arrays:

```js
const values = [
  10n,
  20n,
  30n,
];
```

Array methods generally work with BigInt values as ordinary values.

However, callbacks must respect BigInt arithmetic.

---

# 88. `reduce()` with BigInt

Use a BigInt initial value:

```js
const values = [
  10n,
  20n,
  30n,
];

const total = values.reduce(
  (sum, value) => sum + value,
  0n
);

console.log(total);
```

Output:

```text
60n
```

Do not use:

```js
0
```

as the initial value because that would mix Number and BigInt.

---

# 89. BigInt with `for...of`

BigInt values work normally with iteration:

```js
const values = [
  10n,
  20n,
  30n,
];

for (const value of values) {
  console.log(value);
}
```

Output:

```text
10n
20n
30n
```

---

# 90. BigInt and Sorting

For ascending sorting:

```js
const values = [
  100n,
  5n,
  20n,
];

values.sort((a, b) =>
  a < b ? -1 : a > b ? 1 : 0
);
```

Result:

```text
[5n, 20n, 100n]
```

Avoid arithmetic subtraction in the comparator.

---

# 91. BigInt and `Map`/`Set`

BigInt values can be used as:

```text
Map keys
Set values
object property values
array elements
function arguments
```

For example:

```js
const ids = new Set([
  10000000000000000000n,
  20000000000000000000n,
]);

console.log(
  ids.has(10000000000000000000n)
);
```

Output:

```text
true
```

---

# 92. Performance Consideration

BigInt operations can have different performance characteristics from Number operations.

For ordinary small integers:

```js
const count = 10;
```

is generally simpler.

For very large integers:

```js
const count =
  123456789012345678901234567890n;
```

BigInt provides the required precision.

Choose based on correctness and data requirements first.

---

# 93. BigInt Mental Model

Think of the two numeric types like this:

```text
Number
│
├── integer
├── decimal
├── floating-point
└── safe integer range

BigInt
│
├── integer only
├── arbitrary-size integer
└── exact integer arithmetic
```

The fundamental difference is not simply:

```text
small vs large
```

It is:

```text
floating-point Number
        vs
exact integer BigInt
```

---

# 94. Quick Reference

### Create BigInt

```js
123n
```

### Convert string

```js
BigInt("123")
```

### Convert safe Number

```js
BigInt(123)
```

### Check type

```js
typeof value === "bigint"
```

### Convert to string

```js
value.toString()
```

### Convert to Number

```js
Number(value)
```

Use this carefully for large values.

---

# 95. Arithmetic Quick Reference

```js
10n + 5n
10n - 5n
10n * 5n
10n / 5n
10n % 5n
10n ** 2n
```

All operands involved in the arithmetic should be BigInt.

---

# 96. Comparison Quick Reference

```js
10n > 5
10n < 20
10n >= 10
10n <= 10
```

Relational comparisons can compare Number and BigInt.

Equality:

```js
10n == 10
```

can be true.

Strict equality:

```js
10n === 10
```

is false.

---

# 97. Important Rules

Remember these rules:

```text
BigInt represents integers.
BigInt does not represent decimals.
BigInt is a primitive.
typeof BigInt → "bigint".
Number.MAX_SAFE_INTEGER is 9007199254740991.
BigInt can represent much larger integers exactly.
Do not mix Number and BigInt in arithmetic.
Do not convert large BigInt values to Number casually.
BigInt is not directly JSON serializable.
Math APIs generally expect Number.
0n is falsy.
BigInt can be compared with Number using relational operators.
```

---

# 98. Practical Decision Guide

Use `Number` when:

```text
You need decimals.
You need standard arithmetic.
You use Math APIs.
Values are within the safe integer range.
```

Use `BigInt` when:

```text
You need exact integer arithmetic.
Values can exceed Number.MAX_SAFE_INTEGER.
Your data model naturally uses very large integers.
```

Use `String` when:

```text
You only need to transport/store a large integer
and do not need to perform BigInt arithmetic.
```

This last option is especially relevant for API and database boundaries.

---

# 99. Final Mental Model

The most useful mental model is:

```text
Number
  ↓
General JavaScript numeric type
  ↓
Integers + decimals
  ↓
Exact integer precision only within safe range


BigInt
  ↓
Specialized integer type
  ↓
Integers only
  ↓
Exact arithmetic for very large integers
```

And the most important rule:

```js
10n + 10n; // valid

10n + 10;  // TypeError
```

JavaScript deliberately keeps `Number` and `BigInt` arithmetic separate.

---

# 100. Key Takeaways

1. `BigInt` is a JavaScript primitive type.
2. Its `typeof` value is `"bigint"`.
3. BigInt represents integers only.
4. BigInt does not represent decimal fractions.
5. A BigInt literal uses the `n` suffix.
6. `123n` is different from `123`.
7. `Number.MAX_SAFE_INTEGER` is `9007199254740991`.
8. Numbers beyond the safe integer range can lose integer precision.
9. BigInt can represent very large integers exactly.
10. `BigInt()` converts supported values to BigInt.
11. Converting a Number after it has lost precision cannot recover the original value.
12. Prefer BigInt literals or strings when exact large integers matter.
13. BigInt supports `+`, `-`, `*`, `/`, `%`, and `**`.
14. BigInt division discards the fractional part.
15. BigInt arithmetic must not directly mix with Number arithmetic.
16. Relational comparisons can compare BigInt and Number.
17. `10n === 10` is `false`.
18. `0n` is falsy.
19. `Math.*` generally operates on Number, not BigInt.
20. BigInt is not directly supported by standard JSON serialization.
21. Large BigInt values are often represented as strings across JSON boundaries.
22. BigInt can be used in arrays, Maps, Sets, and objects.
23. `BigInt64Array` and `BigUint64Array` support BigInt typed-array storage.
24. BigInt can be useful with large database integers.
25. PostgreSQL `bigint` should not automatically be assumed to arrive as JavaScript BigInt.
26. BigInt can represent monetary values when using integer smallest units.
27. BigInt does not provide cryptographic security by itself.
28. BigInt is useful in specialized applications but is not necessary for ordinary React development.
29. In React and Next.js, serialization boundaries require special attention when BigInt is involved.
30. Choose `BigInt` because exact large-integer semantics are required, not simply because the value is large.

---

# React / Next.js Priority

**Priority for React learning: Low to Medium.**

You should understand:

```text
What BigInt is
Why Number has a safe integer limit
How to create BigInt
Why Number and BigInt cannot be mixed
How BigInt interacts with JSON
```

You do **not** need to make BigInt a major focus of your React study unless your application handles large integer database values, financial calculations, cryptographic mathematics, or other specialized numeric data.

The higher-priority JavaScript topics for your React/Next.js path remain:

```text
Functions
Objects and Arrays
Destructuring
Spread / Rest
Modules
Promises
async / await
Error Handling
Optional Chaining
Nullish Coalescing
Array Methods
Closures
DOM and Events
```
