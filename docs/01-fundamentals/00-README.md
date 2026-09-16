# JavaScript Fundamentals

JavaScript Fundamentals are the core concepts that form the foundation of the JavaScript programming language. Understanding these concepts is essential before moving to more advanced topics such as Functions, Arrays, Objects, DOM Manipulation, Asynchronous JavaScript, and modern frameworks like React.

This section focuses on the basic building blocks of JavaScript and explains how the language represents data, performs operations, stores values, and controls the flow of a program.

The Fundamentals section covers the following topics:

* **Introduction to JavaScript**
* **Variables**
* **Data Types**
* **Operators**
* **Control Flow**

---

## 1. Introduction to JavaScript

JavaScript is a high-level, dynamic, and versatile programming language primarily used to add logic, behavior, and interactivity to web applications.

It was originally created to run inside web browsers, but it has evolved into a general-purpose language that can also be used for backend development, desktop applications, mobile applications, APIs, and many other types of software.

In web development, JavaScript works alongside HTML and CSS:

```text
HTML        → Structure
CSS         → Presentation
JavaScript  → Behavior and Logic
```

JavaScript allows developers to:

* Store and manipulate data.
* Perform calculations and operations.
* Make decisions based on conditions.
* Repeat operations using loops.
* Create reusable logic using functions.
* Interact with web pages through the DOM.
* Handle user interactions and events.
* Communicate with APIs and external services.
* Build complete applications using modern JavaScript technologies.

Learning JavaScript fundamentals provides the foundation required to understand more advanced concepts and frameworks.

---

## 2. Variables

Variables are used to store data that can be accessed and used throughout a program.

JavaScript provides three keywords for declaring variables:

```js
var
let
const
```

Modern JavaScript mainly uses `let` and `const`.

### `let`

`let` is used when the value of a variable may need to be changed.

```js
let age = 22;

age = 23;
```

### `const`

`const` is used when a variable should not be reassigned after its initial declaration.

```js
const name = "Osama";
```

Attempting to reassign it will cause an error:

```js
name = "Ali"; // Error
```

Understanding variables is essential because almost every JavaScript program works with stored values.

---

## 3. Data Types

A data type describes the kind of value stored in a variable.

JavaScript has several built-in data types.

### Primitive Data Types

The main primitive types are:

```text
String
Number
Boolean
Undefined
Null
BigInt
Symbol
```

Examples:

```js
const name = "Osama";       // String
const age = 22;             // Number
const isStudent = true;     // Boolean
let username;               // Undefined
const user = null;          // Null
const bigNumber = 123n;     // BigInt
```

JavaScript also has the non-primitive `Object` type, which includes objects, arrays, functions, and other structures.

Example:

```js
const user = {
  name: "Osama",
  age: 22
};
```

Understanding data types is important because different values behave differently when used in operations and expressions.

---

## 4. Operators

Operators are symbols or keywords used to perform operations on values.

JavaScript provides several categories of operators.

### Arithmetic Operators

Used for mathematical operations:

```js
+
-
*
/
%
**
```

Example:

```js
const result = 10 + 5;
```

### Assignment Operators

Used to assign or update values:

```js
=
+=
-=
*=
/=
```

Example:

```js
let score = 10;

score += 5;
```

### Comparison Operators

Used to compare values:

```js
===
!==
>
<
>=
<=
```

Example:

```js
10 > 5; // true
```

### Logical Operators

Used to combine or invert conditions:

```js
&&
||
!
```

Example:

```js
const age = 22;
const hasID = true;

age >= 18 && hasID;
```

Operators are fundamental because they allow JavaScript to calculate values, compare data, assign values, and build logical expressions.

---

## 5. Control Flow

Control flow determines the order in which JavaScript code is executed.

By default, JavaScript executes statements from top to bottom. Control flow statements allow the program to make decisions, repeat operations, or change the normal execution path.

The main control flow concepts include:

* Conditional statements
* Loops
* Switch statements
* `break`
* `continue`

### Conditional Statements

Used to execute different code depending on whether a condition is true or false.

```js
const age = 22;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

### `else if`

Used when there are multiple conditions:

```js
const score = 85;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 80) {
  console.log("Very Good");
} else {
  console.log("Good");
}
```

### Loops

Loops allow code to be executed repeatedly.

Example using `for`:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Example using `while`:

```js
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

### `switch`

`switch` can be useful when comparing one value against multiple possible cases.

```js
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;

  case "Friday":
    console.log("Weekend is near");
    break;

  default:
    console.log("Another day");
}
```

Control flow is essential because it allows programs to make decisions and respond differently depending on the data and conditions they encounter.

---

## Conclusion

The JavaScript Fundamentals section provides the foundation for understanding how JavaScript programs work.

The main concepts can be summarized as:

```text
Introduction
     ↓
Variables
     ↓
Data Types
     ↓
Operators
     ↓
Control Flow
```

Once these concepts are understood and practiced, you can move confidently to more advanced JavaScript topics such as:

```text
Functions
   ↓
Arrays
   ↓
Objects
   ↓
DOM
   ↓
Events
   ↓
Asynchronous JavaScript
   ↓
APIs
   ↓
Modern JavaScript
   ↓
React
```