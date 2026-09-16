# JavaScript Operators

Operators are symbols or keywords used to perform operations on values and variables.

They allow JavaScript programs to:

* Perform calculations
* Compare values
* Assign values
* Combine conditions
* Modify variables
* Check types
* Control program logic

For example:

```js
const age = 25;

const isAdult = age >= 18;

console.log(isAdult);
```

Here:

```text
>=
```

is an operator that compares `age` with `18`.

---

## Table of Contents

* [Operator Categories](#operator-categories)
* [Arithmetic Operators](#arithmetic-operators)
* [Assignment Operators](#assignment-operators)
* [Comparison Operators](#comparison-operators)
* [Equality Operators](#equality-operators)
* [Logical Operators](#logical-operators)
* [Unary Operators](#unary-operators)
* [Increment and Decrement Operators](#increment-and-decrement-operators)
* [String Operators](#string-operators)
* [String Concatenation](#string-concatenation)
* [Exponentiation Operator](#exponentiation-operator)
* [Nullish Coalescing Operator](#nullish-coalescing-operator)
* [Optional Chaining Operator](#optional-chaining-operator)
* [Conditional (Ternary) Operator](#conditional-ternary-operator)
* [Type Operators](#type-operators)
* [Bitwise Operators](#bitwise-operators)
* [Operator Precedence](#operator-precedence)
* [Short-Circuit Evaluation](#short-circuit-evaluation)
* [Type Coercion and Operators](#type-coercion-and-operators)
* [Common Pitfalls](#common-pitfalls)
* [Best Practices](#best-practices)
* [Quick Reference](#quick-reference)

---

# Operator Categories

JavaScript operators can be grouped into several categories:

```text
Operators
│
├── Arithmetic
├── Assignment
├── Comparison
├── Equality
├── Logical
├── Unary
├── Increment / Decrement
├── String
├── Conditional
├── Nullish Coalescing
├── Optional Chaining
├── Type
└── Bitwise
```

---

# Arithmetic Operators

Arithmetic operators are used to perform mathematical operations.

| Operator | Name           | Example  | Result |
| -------- | -------------- | -------- | ------ |
| `+`      | Addition       | `10 + 5` | `15`   |
| `-`      | Subtraction    | `10 - 5` | `5`    |
| `*`      | Multiplication | `10 * 5` | `50`   |
| `/`      | Division       | `10 / 5` | `2`    |
| `%`      | Remainder      | `10 % 3` | `1`    |
| `**`     | Exponentiation | `2 ** 3` | `8`    |

## Addition

```js
const result = 10 + 5;

console.log(result);
```

Output:

```text
15
```

## Subtraction

```js
const result = 10 - 5;

console.log(result);
```

Output:

```text
5
```

## Multiplication

```js
const result = 10 * 5;

console.log(result);
```

Output:

```text
50
```

## Division

```js
const result = 10 / 5;

console.log(result);
```

Output:

```text
2
```

Division by zero produces `Infinity`:

```js
console.log(10 / 0);
```

Output:

```text
Infinity
```

## Remainder

The `%` operator returns the remainder after division.

```js
console.log(10 % 3);
```

Output:

```text
1
```

A common use is checking whether a number is even or odd:

```js
const number = 10;

if (number % 2 === 0) {
  console.log("Even");
}
```

---

# Assignment Operators

Assignment operators assign values to variables.

## Basic Assignment

```js
let score = 100;
```

The `=` operator assigns `100` to `score`.

---

## Compound Assignment

JavaScript provides shorthand operators for modifying an existing value.

| Operator | Equivalent       |
| -------- | ---------------- |
| `=`      | `x = value`      |
| `+=`     | `x = x + value`  |
| `-=`     | `x = x - value`  |
| `*=`     | `x = x * value`  |
| `/=`     | `x = x / value`  |
| `%=`     | `x = x % value`  |
| `**=`    | `x = x ** value` |

Example:

```js
let score = 10;

score += 5;

console.log(score);
```

Output:

```text
15
```

This is equivalent to:

```js
let score = 10;

score = score + 5;
```

Another example:

```js
let price = 100;

price *= 2;

console.log(price);
```

Output:

```text
200
```

---

# Comparison Operators

Comparison operators compare values and return a Boolean:

```text
true
```

or:

```text
false
```

| Operator | Meaning               |
| -------- | --------------------- |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |
| `===`    | Strict equality       |
| `!==`    | Strict inequality     |
| `==`     | Loose equality        |
| `!=`     | Loose inequality      |

Examples:

```js
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 <= 9);  // false
```

---

# Equality Operators

JavaScript has two main equality concepts:

```text
==
===
```

Understanding their difference is extremely important.

---

## Strict Equality `===`

The strict equality operator checks both:

1. Value
2. Type

```js
console.log(5 === 5);
```

Output:

```text
true
```

But:

```js
console.log(5 === "5");
```

Output:

```text
false
```

The values may look similar, but their types are different:

```text
5   → number
"5" → string
```

Therefore:

```js
5 === "5"
```

is `false`.

---

## Loose Equality `==`

The loose equality operator allows type coercion.

```js
console.log(5 == "5");
```

Output:

```text
true
```

JavaScript converts one value before comparing them.

This can lead to surprising results:

```js
console.log(0 == false);
console.log("" == false);
console.log(null == undefined);
```

These can all evaluate to `true` under the rules of loose equality.

For most application code, prefer strict equality:

```js
===
!==
```

---

## Strict Inequality `!==`

```js
console.log(5 !== "5");
```

Output:

```text
true
```

Because the types differ.

---

# Logical Operators

Logical operators are used to combine or manipulate Boolean expressions.

JavaScript provides:

```text
&&
||
!
```

---

# Logical AND `&&`

The `&&` operator returns a truthy result only when both operands are truthy.

```js
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("Can drive");
}
```

Both conditions must be true.

Conceptually:

```text
true && true   → true
true && false  → false
false && true  → false
false && false → false
```

---

# Logical OR `||`

The `||` operator returns a truthy result when at least one operand is truthy.

```js
const isAdmin = false;
const isEditor = true;

if (isAdmin || isEditor) {
  console.log("Can edit content");
}
```

Conceptually:

```text
true || true   → true
true || false  → true
false || true  → true
false || false → false
```

---

# Logical NOT `!`

The `!` operator reverses the Boolean interpretation of a value.

```js
console.log(!true);
```

Output:

```text
false
```

And:

```js
console.log(!false);
```

Output:

```text
true
```

It also works with truthy and falsy values:

```js
console.log(!0);       // true
console.log(!"Hello"); // false
```

---

# Logical Operators Return Values

An important JavaScript feature is that `&&` and `||` do not necessarily return `true` or `false`.

They return one of their operands.

Example:

```js
console.log("Hello" && "World");
```

Output:

```text
World
```

And:

```js
console.log("" && "World");
```

Output:

```text
""
```

Similarly:

```js
console.log("Hello" || "World");
```

Output:

```text
Hello
```

This behavior is called **short-circuit evaluation**.

---

# Unary Operators

Unary operators operate on a single operand.

Examples include:

```text
+
-
!
typeof
delete
void
```

---

## Unary Plus `+`

Converts a value to a number when possible.

```js
const value = "42";

console.log(+value);
```

Output:

```text
42
```

This is equivalent in purpose to:

```js
Number(value);
```

although `Number()` is often clearer.

---

## Unary Minus `-`

Converts a value to a number and negates it.

```js
const value = "42";

console.log(-value);
```

Output:

```text
-42
```

---

## `typeof`

The `typeof` operator returns the type of a value.

```js
console.log(typeof "Hello");
console.log(typeof 42);
console.log(typeof true);
```

Output:

```text
string
number
boolean
```

For more information about JavaScript types, see:

```text
03-data-types.md
```

---

## `delete`

The `delete` operator removes a property from an object.

```js
const user = {
  name: "Osama",
  age: 25
};

delete user.age;

console.log(user);
```

Result:

```js
{
  name: "Osama"
}
```

`delete` should not be confused with deleting a variable declaration.

---

# Increment and Decrement Operators

JavaScript provides:

```text
++
--
```

---

## Increment `++`

Increases a numeric value by `1`.

```js
let count = 5;

count++;

console.log(count);
```

Output:

```text
6
```

This is equivalent to:

```js
count = count + 1;
```

---

## Decrement `--`

Decreases a numeric value by `1`.

```js
let count = 5;

count--;

console.log(count);
```

Output:

```text
4
```

---

# Prefix vs Postfix

Increment and decrement operators can appear before or after the variable.

### Prefix

```js
let count = 5;

const result = ++count;

console.log(result);
console.log(count);
```

Output:

```text
6
6
```

The value is incremented before it is used.

### Postfix

```js
let count = 5;

const result = count++;

console.log(result);
console.log(count);
```

Output:

```text
5
6
```

The original value is used first, then the variable is incremented.

The same concept applies to `--`.

---

# String Operators

The `+` operator has a special behavior when strings are involved.

```js
const firstName = "Osama";
const lastName = "Abu Motlaq";

const fullName = firstName + " " + lastName;

console.log(fullName);
```

Output:

```text
Osama Abu Motlaq
```

When one or both operands are strings, `+` can perform string concatenation.

---

# String Concatenation

Concatenation means joining strings together.

```js
const firstName = "Osama";
const lastName = "Abu Motlaq";

console.log(firstName + " " + lastName);
```

Modern JavaScript often uses template literals instead:

```js
const firstName = "Osama";
const lastName = "Abu Motlaq";

console.log(`${firstName} ${lastName}`);
```

Template literals are generally easier to read when combining multiple values.

---

# Exponentiation Operator

The `**` operator raises a number to a power.

```js
console.log(2 ** 3);
```

Output:

```text
8
```

This means:

```text
2 × 2 × 2
```

Another example:

```js
console.log(5 ** 2);
```

Output:

```text
25
```

The assignment form is:

```js
let number = 2;

number **= 3;

console.log(number);
```

Output:

```text
8
```

---

# Nullish Coalescing Operator

The nullish coalescing operator is:

```text
??
```

It returns the right-hand value only when the left-hand value is `null` or `undefined`.

Example:

```js
const username = null;

const displayName = username ?? "Guest";

console.log(displayName);
```

Output:

```text
Guest
```

Another example:

```js
const username = "Osama";

const displayName = username ?? "Guest";

console.log(displayName);
```

Output:

```text
Osama
```

## `??` vs `||`

This distinction is important.

`||` checks whether the left side is **falsy**.

`??` checks specifically for:

```text
null
undefined
```

Example:

```js
const count = 0;

console.log(count || 10);
console.log(count ?? 10);
```

Output:

```text
10
0
```

Why?

Because `0` is falsy, so `||` uses `10`.

But `0` is not `null` or `undefined`, so `??` keeps `0`.

This makes `??` useful when `0`, `false`, or `""` are valid values.

---

# Optional Chaining Operator

The optional chaining operator is:

```text
?.
```

It allows you to safely access nested properties when an intermediate value might be `null` or `undefined`.

Without optional chaining:

```js
const user = null;

console.log(user.profile.name);
```

This causes a `TypeError`.

With optional chaining:

```js
const user = null;

console.log(user?.profile?.name);
```

The result is:

```text
undefined
```

Optional chaining can also be used with methods:

```js
user?.getName?.();
```

And arrays:

```js
users?.[0]?.name;
```

Optional chaining is particularly useful when working with API responses where some properties may be missing.

---

# Conditional (Ternary) Operator

The ternary operator provides a concise way to choose between two expressions.

Syntax:

```text
condition ? valueIfTrue : valueIfFalse
```

Example:

```js
const age = 20;

const message = age >= 18 ? "Adult" : "Minor";

console.log(message);
```

Output:

```text
Adult
```

This is equivalent to:

```js
let message;

if (age >= 18) {
  message = "Adult";
} else {
  message = "Minor";
}
```

Ternaries are useful for short conditional expressions.

Avoid deeply nested ternaries because they reduce readability.

---

# Type Operators

JavaScript provides operators that work with types.

## `typeof`

```js
typeof value;
```

Example:

```js
console.log(typeof 42);
```

Result:

```text
number
```

---

## `instanceof`

The `instanceof` operator checks whether an object is an instance of a particular constructor or class.

```js
const date = new Date();

console.log(date instanceof Date);
```

Output:

```text
true
```

Another example:

```js
const numbers = [1, 2, 3];

console.log(numbers instanceof Array);
```

Output:

```text
true
```

`instanceof` is mainly useful when working with objects and class-based structures.

---

# Bitwise Operators

Bitwise operators work with the binary representation of numbers.

Common bitwise operators include:

| Operator | Name                         |    |
| -------- | ---------------------------- | -- |
| `&`      | AND                          |    |
| `        | `                            | OR |
| `^`      | XOR                          |    |
| `~`      | NOT                          |    |
| `<<`     | Left shift                   |    |
| `>>`     | Sign-propagating right shift |    |
| `>>>`    | Zero-fill right shift        |    |

Example:

```js
console.log(5 & 1);
```

Binary representation:

```text
5 → 101
1 → 001
---------
    001 → 1
```

Result:

```text
1
```

Bitwise operators are relatively uncommon in typical frontend application development but can be useful in areas such as:

* Binary data
* Low-level algorithms
* Performance-sensitive operations
* Encoding
* Cryptography-related implementations
* Systems programming concepts

---

# Operator Precedence

When an expression contains multiple operators, JavaScript follows **operator precedence** to determine the order of evaluation.

For example:

```js
const result = 2 + 3 * 4;

console.log(result);
```

Output:

```text
14
```

Multiplication happens before addition:

```text
3 * 4 = 12
2 + 12 = 14
```

---

## Using Parentheses

Parentheses can explicitly control the order:

```js
const result = (2 + 3) * 4;

console.log(result);
```

Output:

```text
20
```

The parentheses are evaluated first:

```text
2 + 3 = 5
5 * 4 = 20
```

When an expression could be difficult to understand, parentheses can improve readability even when they are not technically required.

---

# Short-Circuit Evaluation

Logical operators use short-circuit evaluation.

## AND `&&`

If the left operand is falsy, JavaScript does not need to evaluate the right operand.

```js
const user = null;

console.log(user && user.name);
```

The result is:

```text
null
```

This can be used to conditionally execute expressions:

```js
isLoggedIn && showDashboard();
```

If `isLoggedIn` is falsy, `showDashboard()` is not called.

---

## OR `||`

If the left operand is truthy, JavaScript returns it without evaluating the right side.

```js
const username = "Osama";

const displayName = username || "Guest";

console.log(displayName);
```

Output:

```text
Osama
```

If `username` is falsy:

```js
const username = "";

const displayName = username || "Guest";

console.log(displayName);
```

Output:

```text
Guest
```

Remember that `||` considers all falsy values, including:

```text
false
0
""
null
undefined
NaN
```

---

# Type Coercion and Operators

Operators can trigger automatic type conversion.

For example:

```js
console.log("10" + 5);
```

Output:

```text
105
```

But:

```js
console.log("10" - 5);
```

Output:

```text
5
```

The `+` operator can concatenate strings, while `-` requires numeric conversion.

Other examples:

```js
console.log("5" * 2); // 10
console.log("10" / 2); // 5
console.log("10" - 3); // 7
```

Understanding coercion helps prevent unexpected results.

---

# Common Pitfalls

## 1. Confusing `=` with `===`

This:

```js
x = 10;
```

assigns a value.

This:

```js
x === 10;
```

compares a value and its type.

They have completely different purposes.

---

## 2. Using `==` Without Understanding Coercion

```js
5 == "5";
```

returns:

```text
true
```

Prefer:

```js
5 === "5";
```

when you want strict comparison.

---

## 3. Assuming `+` Always Performs Addition

```js
console.log("5" + 2);
```

returns:

```text
52
```

not:

```text
7
```

---

## 4. Confusing Prefix and Postfix Increment

```js
let x = 5;

console.log(x++);
```

prints:

```text
5
```

while:

```js
let x = 5;

console.log(++x);
```

prints:

```text
6
```

---

## 5. Confusing `||` and `??`

Consider:

```js
const count = 0;

console.log(count || 10);
```

Result:

```text
10
```

But:

```js
console.log(count ?? 10);
```

Result:

```text
0
```

Use `??` when only `null` and `undefined` should trigger the fallback.

---

## 6. Overusing the Ternary Operator

This is difficult to read:

```js
const result = condition1
  ? condition2
    ? "A"
    : "B"
  : condition3
    ? "C"
    : "D";
```

For complex logic, use `if...else` instead.

---

## 7. Forgetting Operator Precedence

Consider:

```js
const result = 10 + 5 * 2;
```

The result is:

```text
20
```

not:

```text
30
```

Use parentheses when necessary:

```js
const result = (10 + 5) * 2;
```

---

# Best Practices

## Prefer Strict Equality

Use:

```js
===
!==
```

for predictable comparisons.

---

## Use Parentheses for Clarity

Even when you understand operator precedence, parentheses can make complex expressions easier to read.

```js
const isEligible = (age >= 18) && hasLicense;
```

---

## Avoid Unnecessary Coercion

Be careful with expressions that rely on JavaScript automatically converting types.

Instead of:

```js
const result = "10" - 5;
```

prefer clear data handling:

```js
const value = Number("10");
const result = value - 5;
```

---

## Use `??` When Falsy Values Are Valid

If `0`, `false`, or an empty string are valid values, `??` may be more appropriate than `||`.

```js
const count = 0;

const result = count ?? 10;
```

---

## Keep Ternaries Simple

Good:

```js
const status = isOnline ? "Online" : "Offline";
```

Avoid complex nested ternaries when an `if...else` statement would be clearer.

---

## Avoid Clever Expressions

JavaScript allows very compact expressions, but shorter code is not always better code.

Prefer:

```js
const age = Number(input);

if (age >= 18) {
  console.log("Adult");
}
```

over complicated expressions that rely on multiple implicit conversions.

Readable code is easier to maintain and debug.

---

# Quick Reference

## Arithmetic Operators

| Operator | Description    | Example  |
| -------- | -------------- | -------- |
| `+`      | Addition       | `10 + 5` |
| `-`      | Subtraction    | `10 - 5` |
| `*`      | Multiplication | `10 * 5` |
| `/`      | Division       | `10 / 5` |
| `%`      | Remainder      | `10 % 3` |
| `**`     | Exponentiation | `2 ** 3` |

---

## Assignment Operators

| Operator | Example   |
| -------- | --------- |
| `=`      | `x = 10`  |
| `+=`     | `x += 10` |
| `-=`     | `x -= 10` |
| `*=`     | `x *= 10` |
| `/=`     | `x /= 10` |
| `%=`     | `x %= 10` |
| `**=`    | `x **= 2` |

---

## Comparison Operators

| Operator | Description           |
| -------- | --------------------- |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |
| `===`    | Strict equality       |
| `!==`    | Strict inequality     |
| `==`     | Loose equality        |
| `!=`     | Loose inequality      |

---

## Logical Operators

| Operator | Description        |   |            |
| -------- | ------------------ | - | ---------- |
| `&&`     | Logical AND        |   |            |
| `        |                    | ` | Logical OR |
| `!`      | Logical NOT        |   |            |
| `??`     | Nullish coalescing |   |            |
| `?.`     | Optional chaining  |   |            |

---

## Other Important Operators

| Operator     | Purpose                  |
| ------------ | ------------------------ |
| `++`         | Increment                |
| `--`         | Decrement                |
| `? :`        | Ternary conditional      |
| `typeof`     | Check value type         |
| `instanceof` | Check object instance    |
| `delete`     | Delete object property   |
| `+`          | Unary numeric conversion |
| `-`          | Unary negation           |

---

# Key Takeaways

* Operators allow JavaScript to perform calculations, comparisons, assignments, logical operations, and other tasks.

* Arithmetic operators perform mathematical operations.

* Assignment operators assign and update values.

* Comparison operators return Boolean results.

* `===` checks both value and type.

* `==` performs type coercion and should generally be avoided unless its behavior is intentional.

* `&&`, `||`, and `!` are the primary logical operators.

* `&&` and `||` return operands rather than necessarily returning Boolean values.

* `??` provides a fallback only for `null` and `undefined`.

* `?.` safely accesses potentially missing properties.

* The ternary operator provides a concise alternative to simple `if...else` logic.

* `typeof` can be used to inspect the general type of a value.

* `instanceof` can determine whether an object is an instance of a particular constructor or class.

* `++` and `--` can be used in prefix or postfix form, which affects the value of the expression.

* JavaScript operators can trigger implicit type coercion.

* Operator precedence determines the order in which expressions are evaluated.

* Parentheses can make complex expressions more explicit and readable.

A strong understanding of operators is essential before learning control flow, because conditions such as comparisons and logical expressions are the foundation of `if`, `else`, loops, and other control-flow structures.
