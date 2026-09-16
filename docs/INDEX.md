# JavaScript Reference Index

This file is the central index for the JavaScript Reference documentation.

Use it to:

* Navigate directly to a topic.
* Understand the documentation structure.
* Find related concepts quickly.
* Return to a topic without browsing the entire repository.

---

# Learning Path

The documentation is organized from core JavaScript concepts toward browser APIs and advanced material.

```text
01 Fundamentals
      ↓
02 Functions
      ↓
03 Async JavaScript
      ↓
04 Object-Oriented Programming
      ↓
05 ES6+ Features
      ↓
06 DOM
      ↓
07 BOM and Browser APIs
      ↓
Advanced
      ↓
Best Practices
```

---

# 01 — Fundamentals

Location:

```text
docs/01-fundamentals/
```

## Section Overview

[00 — Fundamentals README](./01-fundamentals/00-README.md)

## Topics

| #  | Topic                      | File                                                                   |
| -- | -------------------------- | ---------------------------------------------------------------------- |
| 01 | Introduction to JavaScript | [01-introduction-to-js.md](./01-fundamentals/01-introduction-to-js.md) |
| 02 | Variables                  | [02-variables.md](./01-fundamentals/02-variables.md)                   |
| 03 | Data Types                 | [03-data-types.md](./01-fundamentals/03-data-types.md)                 |
| 04 | Operators                  | [04-operators.md](./01-fundamentals/04-operators.md)                   |
| 05 | Control Flow               | [05-control-flow.md](./01-fundamentals/05-control-flow.md)             |

### Main Goal

Build a solid understanding of JavaScript syntax, values, variables, expressions, and program flow.

---

# 02 — Functions

Location:

```text
docs/02-functions/
```

## Section Overview

[00 — Functions README](./02-functions/00-README.md)

## Topics

| #  | Topic                  | File                                                                        |
| -- | ---------------------- | --------------------------------------------------------------------------- |
| 01 | Functions              | [01-functions.md](./02-functions/01-functions.md)                           |
| 02 | Arrow Functions        | [02-arrow-functions.md](./02-functions/02-arrow-functions.md)               |
| 03 | Higher-Order Functions | [03-higher-order-functions.md](./02-functions/03-higher-order-functions.md) |
| 04 | Scope and Closures     | [04-scope-closures.md](./02-functions/04-scope-closures.md)                 |

### Main Goal

Understand functions as values, execution units, callbacks, higher-order functions, lexical scope, and closures.

---

# 03 — Async JavaScript

Location:

```text
docs/03-async/
```

## Section Overview

[00 — Async README](./03-async/00-README.md)

## Topics

| #  | Topic          | File                                                    |
| -- | -------------- | ------------------------------------------------------- |
| 01 | Callbacks      | [01-callbacks.md](./03-async/01-callbacks.md)           |
| 02 | Promises       | [02-promises.md](./03-async/02-promises.md)             |
| 03 | Async / Await  | [03-async-await.md](./03-async/03-async-await.md)       |
| 04 | Error Handling | [04-error-handling.md](./03-async/04-error-handling.md) |

### Main Goal

Understand how JavaScript handles delayed and asynchronous operations.

Important concepts include:

```text
Callbacks
Promises
async / await
Error propagation
Concurrent asynchronous work
```

---

# 04 — Object-Oriented Programming

Location:

```text
docs/04-oop/
```

## Section Overview

[00 — OOP README](./04-oop/00-README.md)

## Topics

| #  | Topic                         | File                                                                          |
| -- | ----------------------------- | ----------------------------------------------------------------------------- |
| 01 | Objects                       | [01-objects.md](./04-oop/01-objects.md)                                       |
| 02 | Object Properties and Methods | [02-objects-properties-methods.md](./04-oop/02-objects-properties-methods.md) |
| 03 | `this` Keyword                | [03-this-keyword.md](./04-oop/03-this-keyword.md)                             |
| 04 | Constructor Functions         | [04-constructor-functions.md](./04-oop/04-constructor-functions.md)           |
| 05 | Prototypes                    | [05-prototypes.md](./04-oop/05-prototypes.md)                                 |
| 06 | Classes                       | [06-classes.md](./04-oop/06-classes.md)                                       |
| 07 | Class Constructors            | [07-class-constructors.md](./04-oop/07-class-constructors.md)                 |
| 08 | Instance Methods              | [08-instance-methods.md](./04-oop/08-instance-methods.md)                     |
| 09 | Static Methods                | [09-static-methods.md](./04-oop/09-static-methods.md)                         |
| 10 | Inheritance                   | [10-inheritance.md](./04-oop/10-inheritance.md)                               |
| 11 | Private Fields                | [11-private-fields.md](./04-oop/11-private-fields.md)                         |
| 12 | Getters and Setters           | [12-getters-setters.md](./04-oop/12-getters-setters.md)                       |
| 13 | Polymorphism                  | [13-polymorphism.md](./04-oop/13-polymorphism.md)                             |
| 14 | Encapsulation                 | [14-encapsulation.md](./04-oop/14-encapsulation.md)                           |
| 15 | Abstraction                   | [15-abstraction.md](./04-oop/15-abstraction.md)                               |
| 16 | Composition                   | [16-composition.md](./04-oop/16-composition.md)                               |
| 17 | OOP Best Practices            | [17-oop-best-practices.md](./04-oop/17-oop-best-practices.md)                 |

### Main Goal

Understand JavaScript's object model and the main principles and techniques of object-oriented programming.

---

# 05 — ES6+ Features

Location:

```text
docs/05-es6-features/
```

## Section Overview

[00 — ES6+ README](./05-es6-features/00-README.md)

## Topics

| #  | Topic                      | File                                                                                   |
| -- | -------------------------- | -------------------------------------------------------------------------------------- |
| 01 | `let` and `const`          | [01-let-const.md](./05-es6-features/01-let-const.md)                                   |
| 02 | Template Literals          | [02-template-literals.md](./05-es6-features/02-template-literals.md)                   |
| 03 | Destructuring              | [03-destructuring.md](./05-es6-features/03-destructuring.md)                           |
| 04 | Spread Operator            | [04-spread-operator.md](./05-es6-features/04-spread-operator.md)                       |
| 05 | Rest Parameters            | [05-rest-parameters.md](./05-es6-features/05-rest-parameters.md)                       |
| 06 | Default Parameters         | [06-default-parameters.md](./05-es6-features/06-default-parameters.md)                 |
| 07 | Enhanced Object Literals   | [07-enhanced-object-literals.md](./05-es6-features/07-enhanced-object-literals.md)     |
| 08 | Computed Property Names    | [08-computed-property-names.md](./05-es6-features/08-computed-property-names.md)       |
| 09 | `for...of`                 | [09-for-of.md](./05-es6-features/09-for-of.md)                                         |
| 10 | Symbols                    | [10-symbols.md](./05-es6-features/10-symbols.md)                                       |
| 11 | Iterators                  | [11-iterators.md](./05-es6-features/11-iterators.md)                                   |
| 12 | Generators                 | [12-generators.md](./05-es6-features/12-generators.md)                                 |
| 13 | Maps                       | [13-maps.md](./05-es6-features/13-maps.md)                                             |
| 14 | Sets                       | [14-sets.md](./05-es6-features/14-sets.md)                                             |
| 15 | WeakMap and WeakSet        | [15-weakmap-weakset.md](./05-es6-features/15-weakmap-weakset.md)                       |
| 16 | `Object.assign()`          | [16-object-assign.md](./05-es6-features/16-object-assign.md)                           |
| 17 | Promise and Async Features | [17-promise-and-async-features.md](./05-es6-features/17-promise-and-async-features.md) |
| 18 | Modules                    | [18-modules.md](./05-es6-features/18-modules.md)                                       |
| 19 | Optional Chaining          | [19-optional-chaining.md](./05-es6-features/19-optional-chaining.md)                   |
| 20 | Nullish Coalescing         | [20-nullish-coalescing.md](./05-es6-features/20-nullish-coalescing.md)                 |
| 21 | Logical Assignment         | [21-logical-assignment.md](./05-es6-features/21-logical-assignment.md)                 |
| 22 | BigInt                     | [22-bigint.md](./05-es6-features/22-bigint.md)                                         |
| 23 | Private Class Features     | [23-private-class-features.md](./05-es6-features/23-private-class-features.md)         |
| 24 | Modern JavaScript Features | [24-modern-javascript-features.md](./05-es6-features/24-modern-javascript-features.md) |

### Main Goal

Learn the modern JavaScript syntax and language features used in contemporary applications.

---

# 06 — DOM

Location:

```text
docs/06-DOM/
```

## Section Overview

[00 — DOM README](./06-DOM/00-README.md)

## Topics

| #  | Topic                          | File                                                                                          |
| -- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| 01 | DOM Introduction               | [01-dom-introduction.md](./06-DOM/01-dom-introduction.md)                                     |
| 02 | Selecting Elements             | [02-dom-selecting-elements.md](./06-DOM/02-dom-selecting-elements.md)                         |
| 03 | Traversing Elements            | [03-dom-traversing-elements.md](./06-DOM/03-dom-traversing-elements.md)                       |
| 04 | Manipulating Content           | [04-dom-manipulating-content.md](./06-DOM/04-dom-manipulating-content.md)                     |
| 05 | Manipulating Attributes        | [05-dom-manipulating-attributes.md](./06-DOM/05-dom-manipulating-attributes.md)               |
| 06 | Manipulating Styles            | [06-dom-manipulating-styles.md](./06-DOM/06-dom-manipulating-styles.md)                       |
| 07 | Creating and Removing Elements | [07-dom-creating-and-removing-elements.md](./06-DOM/07-dom-creating-and-removing-elements.md) |
| 08 | DOM Events                     | [08-dom-events.md](./06-DOM/08-dom-events.md)                                                 |
| 09 | Event Object                   | [09-dom-event-object.md](./06-DOM/09-dom-event-object.md)                                     |
| 10 | Event Bubbling and Capturing   | [10-dom-event-bubbling-and-capturing.md](./06-DOM/10-dom-event-bubbling-and-capturing.md)     |
| 11 | Event Delegation               | [11-dom-event-delegation.md](./06-DOM/11-dom-event-delegation.md)                             |
| 12 | Forms and Inputs               | [12-dom-forms-and-inputs.md](./06-DOM/12-dom-forms-and-inputs.md)                             |
| 13 | `classList`                    | [13-dom-classlist.md](./06-DOM/13-dom-classlist.md)                                           |
| 14 | `dataset`                      | [14-dom-dataset.md](./06-DOM/14-dom-dataset.md)                                               |
| 15 | Collections and NodeLists      | [15-dom-collections-and-nodelist.md](./06-DOM/15-dom-collections-and-nodelist.md)             |
| 16 | Document Fragments             | [16-dom-fragments.md](./06-DOM/16-dom-fragments.md)                                           |
| 17 | Observers                      | [17-dom-observers.md](./06-DOM/17-dom-observers.md)                                           |
| 18 | DOM Performance                | [18-dom-performance.md](./06-DOM/18-dom-performance.md)                                       |
| 19 | DOM Security                   | [19-dom-security.md](./06-DOM/19-dom-security.md)                                             |
| 20 | Practical DOM Patterns         | [20-dom-practical-patterns.md](./06-DOM/20-dom-practical-patterns.md)                         |
| 21 | DOM Best Practices             | [21-dom-best-practices.md](./06-DOM/21-dom-best-practices.md)                                 |

### Main Goal

Understand how JavaScript interacts with the document, elements, events, forms, styles, and browser rendering behavior.

---

# 07 — BOM and Browser APIs

Location:

```text
docs/07-BOM/
```

## Section Overview

[00 — BOM README](./07-BOM/00-README.md)

## Topics

| #  | Topic                     | File                                                                    |
| -- | ------------------------- | ----------------------------------------------------------------------- |
| 01 | Window Object             | [01-window-object.md](./07-BOM/01-window-object.md)                     |
| 02 | Window Properties         | [02-window-properties.md](./07-BOM/02-window-properties.md)             |
| 03 | Window Methods            | [03-window-methods.md](./07-BOM/03-window-methods.md)                   |
| 04 | Location Object           | [04-location-object.md](./07-BOM/04-location-object.md)                 |
| 05 | History Object            | [05-history-object.md](./07-BOM/05-history-object.md)                   |
| 06 | Navigator Object          | [06-navigator-object.md](./07-BOM/06-navigator-object.md)               |
| 07 | Screen Object             | [07-screen-object.md](./07-BOM/07-screen-object.md)                     |
| 08 | Browser Storage           | [08-browser-storage.md](./07-BOM/08-browser-storage.md)                 |
| 09 | Timers                    | [09-timers.md](./07-BOM/09-timers.md)                                   |
| 10 | Dialog Methods            | [10-dialog-methods.md](./07-BOM/10-dialog-methods.md)                   |
| 11 | URL and URLSearchParams   | [11-url-and-urlsearchparams.md](./07-BOM/11-url-and-urlsearchparams.md) |
| 12 | Online and Offline Status | [12-online-offline-status.md](./07-BOM/12-online-offline-status.md)     |
| 13 | Browser Events            | [13-browser-events.md](./07-BOM/13-browser-events.md)                   |
| 14 | Clipboard API             | [14-clipboard-api.md](./07-BOM/14-clipboard-api.md)                     |
| 15 | Geolocation API           | [15-geolocation-api.md](./07-BOM/15-geolocation-api.md)                 |
| 16 | Notifications API         | [16-notifications-api.md](./07-BOM/16-notifications-api.md)             |
| 17 | BOM Security              | [17-bom-security.md](./07-BOM/17-bom-security.md)                       |
| 18 | BOM Performance           | [18-bom-performance.md](./07-BOM/18-bom-performance.md)                 |
| 19 | BOM Practical Patterns    | [19-bom-practical-patterns.md](./07-BOM/19-bom-practical-patterns.md)   |
| 20 | BOM Best Practices        | [20-bom-best-practices.md](./07-BOM/20-bom-best-practices.md)           |

### Main Goal

Understand browser-level capabilities and the practical Web Platform APIs used by client-side applications.

> **Note:** "BOM" is used here as a practical learning category. Several APIs in this section are technically separate Web Platform specifications.

---

# Advanced

Location:

```text
docs/advanced/
```

This section is reserved for topics that go beyond the core learning path.

Potential areas include:

```text
Execution model
Event loop internals
Memory management
Advanced asynchronous patterns
Meta-programming
Advanced Web Platform APIs
Architecture
Deep performance topics
```

Topics should be added here only when they have enough depth to justify a separate reference document.

---

# Best Practices

Location:

```text
docs/best-practices/
```

This section is reserved for broader engineering practices.

Potential areas include:

```text
Code quality
Naming
Maintainability
Error handling
Performance
Security
Testing
Architecture
Project organization
```

---

# Examples

Location:

```text
examples/
```

Examples should contain small, focused demonstrations of documented concepts.

Typical categories may include:

```text
Fundamentals
Functions
Async
OOP
DOM
BOM
```

An example should usually demonstrate one concept or a small group of related concepts.

---

# Projects

Location:

```text
projects/
```

Projects combine multiple concepts into practical applications.

Examples may eventually include projects that use:

```text
JavaScript
DOM
Events
Async JavaScript
Browser APIs
Local Storage
APIs
```

Projects should focus on application of knowledge rather than repeating documentation examples.

---

# Topic Finder

Use this section when you know what you want to review but do not remember where it is.

| Looking for...         | Start here                                                          |
| ---------------------- | ------------------------------------------------------------------- |
| Variables              | [Fundamentals → Variables](./01-fundamentals/02-variables.md)       |
| Data types             | [Fundamentals → Data Types](./01-fundamentals/03-data-types.md)     |
| Conditions and loops   | [Fundamentals → Control Flow](./01-fundamentals/05-control-flow.md) |
| Functions              | [Functions](./02-functions/01-functions.md)                         |
| Closures               | [Scope and Closures](./02-functions/04-scope-closures.md)           |
| Promises               | [Promises](./03-async/02-promises.md)                               |
| `async` / `await`      | [Async / Await](./03-async/03-async-await.md)                       |
| `this`                 | [`this` Keyword](./04-oop/03-this-keyword.md)                       |
| Prototypes             | [Prototypes](./04-oop/05-prototypes.md)                             |
| Classes                | [Classes](./04-oop/06-classes.md)                                   |
| Inheritance            | [Inheritance](./04-oop/10-inheritance.md)                           |
| Destructuring          | [Destructuring](./05-es6-features/03-destructuring.md)              |
| Spread                 | [Spread](./05-es6-features/04-spread-operator.md)                   |
| Modules                | [Modules](./05-es6-features/18-modules.md)                          |
| Optional chaining      | [Optional Chaining](./05-es6-features/19-optional-chaining.md)      |
| DOM selection          | [Selecting Elements](./06-DOM/02-dom-selecting-elements.md)         |
| DOM events             | [DOM Events](./06-DOM/08-dom-events.md)                             |
| Event delegation       | [Event Delegation](./06-DOM/11-dom-event-delegation.md)             |
| Forms                  | [Forms and Inputs](./06-DOM/12-dom-forms-and-inputs.md)             |
| DOM performance        | [DOM Performance](./06-DOM/18-dom-performance.md)                   |
| DOM security           | [DOM Security](./06-DOM/19-dom-security.md)                         |
| `window`               | [Window Object](./07-BOM/01-window-object.md)                       |
| `location`             | [Location Object](./07-BOM/04-location-object.md)                   |
| History API            | [History Object](./07-BOM/05-history-object.md)                     |
| `navigator`            | [Navigator Object](./07-BOM/06-navigator-object.md)                 |
| `localStorage`         | [Browser Storage](./07-BOM/08-browser-storage.md)                   |
| Timers                 | [Timers](./07-BOM/09-timers.md)                                     |
| URL parameters         | [URL and URLSearchParams](./07-BOM/11-url-and-urlsearchparams.md)   |
| Online/offline state   | [Online and Offline Status](./07-BOM/12-online-offline-status.md)   |
| Clipboard              | [Clipboard API](./07-BOM/14-clipboard-api.md)                       |
| Geolocation            | [Geolocation API](./07-BOM/15-geolocation-api.md)                   |
| Notifications          | [Notifications API](./07-BOM/16-notifications-api.md)               |
| Browser security       | [BOM Security](./07-BOM/17-bom-security.md)                         |
| Browser performance    | [BOM Performance](./07-BOM/18-bom-performance.md)                   |
| Browser patterns       | [BOM Practical Patterns](./07-BOM/19-bom-practical-patterns.md)     |
| Browser best practices | [BOM Best Practices](./07-BOM/20-bom-best-practices.md)             |

---

# Reference Workflow

A useful workflow when returning to the repository is:

```text
Search the index
      ↓
Open the relevant section
      ↓
Read the topic
      ↓
Run the examples
      ↓
Practice the concept
      ↓
Review related topics
```

The index is navigation infrastructure. The individual documentation files remain the source of detailed explanations.
