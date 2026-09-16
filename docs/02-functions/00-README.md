# JavaScript Functions

Functions are reusable blocks of code designed to perform a specific task.

They are one of the fundamental building blocks of JavaScript. Functions allow developers to organize code, avoid repetition, accept input, produce output, and create reusable logic.

## What You Will Learn

This folder covers the main concepts related to JavaScript functions:

| File                        | Topic                  | Description                                                                                  |
| --------------------------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| `functions.md`              | Functions              | Function declarations, parameters, arguments, return values, and function execution          |
| `arrow-functions.md`        | Arrow Functions        | Modern function syntax and how arrow functions differ from regular functions                 |
| `higher-order functions.md` | Higher-Order Functions | Functions that receive other functions as arguments or return functions                      |
| `scope-closures.md`         | Scope & Closures       | Variable visibility, lexical scope, and how functions remember their surrounding environment |

## Why Functions Matter

Functions help you:

* Reuse code.
* Reduce duplication.
* Organize application logic.
* Accept dynamic input.
* Return calculated or processed values.
* Separate different responsibilities.
* Build more maintainable applications.

For example:

```js
function introduce(name) {
  return `Hello, ${name}.`;
}

console.log(introduce("Osama Abu Motlaq"));
```

### Output

```text
Hello, Osama Abu Motlaq.
```

The function can be called multiple times with different values:

```js
console.log(introduce("Osama Abu Motlaq"));
console.log(introduce("Ahmed"));
```

The same logic is reused without rewriting the function.

## Folder Structure

```text
02-Functions/
│
├── 00-README.md
├── functions.md
├── arrow-functions.md
├── higher-order functions.md
└── scope-closures.md
```

## Learning Order

The recommended order is:

```text
Functions
   ↓
Arrow Functions
   ↓
Higher-Order Functions
   ↓
Scope & Closures
```

Start with `functions.md` to understand the fundamentals before moving to more advanced function concepts.

## Key Idea

> Functions allow you to define a piece of logic once and reuse it whenever you need it.
