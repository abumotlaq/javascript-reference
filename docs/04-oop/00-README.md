# Object-Oriented Programming (OOP)

Object-Oriented Programming (OOP) is a programming paradigm based on **objects**.

An object combines:

* **Data** → properties
* **Behavior** → methods

JavaScript is a **multi-paradigm language**. It supports procedural programming, functional programming, and object-oriented programming.

JavaScript's object system is fundamentally based on **prototypes**. The `class` syntax provides a cleaner way to work with this prototype-based system, but JavaScript classes are not implemented in exactly the same way as classes in languages such as Java or C++.

---

## Learning Objectives

After completing this section, you should be able to:

* Understand what objects are in JavaScript.
* Create and manipulate objects.
* Understand properties and methods.
* Understand the `this` keyword.
* Understand constructor functions.
* Understand prototypes and the prototype chain.
* Understand JavaScript `class` syntax.
* Create constructors and instance methods.
* Use static methods and properties.
* Implement inheritance.
* Understand private class fields.
* Use getters and setters.
* Understand polymorphism.
* Understand encapsulation.
* Understand abstraction.
* Understand composition.
* Choose appropriate OOP techniques instead of overusing them.

---

# Why OOP Matters

OOP becomes useful when an application contains multiple entities that have both **data and behavior**.

For example, imagine an application that manages users.

A user may have data such as:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
};
```

The user may also have behavior:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  email: "osama@example.com",

  introduce() {
    return `My name is ${this.name}.`;
  },
};
```

Now the object represents both:

```text
Data
 ├── name
 └── email

Behavior
 └── introduce()
```

This combination of state and behavior is one of the central ideas behind OOP.

---

# JavaScript and OOP

JavaScript uses a **prototype-based object model**.

This is important.

A common misconception is:

> "JavaScript is a class-based OOP language because it has `class`."

That is not technically accurate.

JavaScript originally used prototypes directly.

The `class` syntax was introduced later to provide a more familiar syntax for creating objects and working with inheritance.

For example:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}
```

This looks like traditional class-based OOP.

However, internally, JavaScript still uses prototypes.

You can think about it like this:

```text
JavaScript object system
        │
        ▼
    Objects
        │
        ▼
   Prototypes
        │
        ▼
 Prototype Chain
        │
        ▼
   class syntax
   (higher-level syntax)
```

Understanding this distinction becomes especially important when learning:

* `this`
* prototypes
* inheritance
* classes
* methods

---

# Core OOP Concepts

The major OOP concepts covered in this section are:

| Concept               | Main Idea                                              |
| --------------------- | ------------------------------------------------------ |
| Objects               | Represent entities using data and behavior             |
| Properties            | Store object data                                      |
| Methods               | Define object behavior                                 |
| `this`                | Refers to the current execution context                |
| Constructor Functions | Older pattern for creating similar objects             |
| Prototypes            | JavaScript's inheritance mechanism                     |
| Classes               | Modern syntax for object construction                  |
| Constructors          | Initialize new instances                               |
| Instance Methods      | Methods shared through the prototype                   |
| Static Methods        | Methods belonging to the class itself                  |
| Inheritance           | Reuse and extend behavior                              |
| Private Fields        | Restrict direct access to internal state               |
| Getters               | Control property access                                |
| Setters               | Control property assignment                            |
| Polymorphism          | Different objects responding to the same interface     |
| Encapsulation         | Keep internal state and behavior controlled            |
| Abstraction           | Expose essential functionality while hiding complexity |
| Composition           | Build objects by combining smaller behaviors           |

---

# Recommended Learning Order

Study the topics in this order:

```text
Objects
   ↓
Properties & Methods
   ↓
this
   ↓
Constructor Functions
   ↓
Prototypes
   ↓
Classes
   ↓
Class Constructors
   ↓
Instance Methods
   ↓
Static Methods
   ↓
Inheritance
   ↓
Private Fields
   ↓
Getters & Setters
   ↓
Polymorphism
   ↓
Encapsulation
   ↓
Abstraction
   ↓
Composition
   ↓
OOP Best Practices
```

The order is intentional.

For example, learning `class` before understanding objects and prototypes can make JavaScript OOP look simpler than it actually is.

---

# 1. Objects

Objects are collections of related data and behavior.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  introduce() {
    return `My name is ${this.name}.`;
  },
};
```

The object contains:

```text
Properties
 ├── name
 └── role

Method
 └── introduce()
```

Accessing properties:

```javascript
console.log(user.name);
```

Calling a method:

```javascript
console.log(user.introduce());
```

---

# 2. Properties and Methods

A **property** stores information.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  age: 24,
};
```

Here:

```text
name → property
age  → property
```

A **method** is a function associated with an object.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return `Hello, ${this.name}!`;
  },
};
```

Here:

```text
name  → property
greet → method
```

Understanding this distinction is fundamental to JavaScript.

---

# 3. The `this` Keyword

`this` is one of the most important and sometimes confusing parts of JavaScript.

Consider:

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return `Hello, ${this.name}!`;
  },
};
```

When this method is called as:

```javascript
user.greet();
```

`this` refers to the object used to call the method:

```text
user.greet()
    │
    └── this → user
```

However, the value of `this` depends on **how a function is called**, not simply where the function was written.

This topic deserves its own detailed section.

---

# 4. Constructor Functions

Before `class` syntax became common, JavaScript developers frequently used constructor functions.

Example:

```javascript
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

The `new` keyword creates a new object and connects it to the constructor's prototype.

Conceptually:

```text
new User(...)
      │
      ▼
new object
      │
      ▼
User.prototype
```

Constructor functions are still important to learn because they reveal how JavaScript's object system works underneath the `class` syntax.

---

# 5. Prototypes

Every JavaScript object can have a link to another object called its **prototype**.

That prototype can provide properties and methods.

For example:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

When JavaScript looks for a property that does not exist directly on `user`, it can continue searching through the prototype chain.

Conceptually:

```text
user
 │
 ▼
prototype
 │
 ▼
prototype's prototype
 │
 ▼
null
```

This process is called **prototype lookup**.

Understanding prototypes is essential for understanding JavaScript inheritance.

---

# 6. Classes

Modern JavaScript provides the `class` syntax.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

Create an instance:

```javascript
const user = new User("Osama Abu Motlaq");
```

Call the method:

```javascript
console.log(user.greet());
```

The syntax is cleaner than constructor functions, but classes still operate through JavaScript's prototype system.

---

# 7. Class Constructors

A class constructor is a special method:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The constructor runs when an object is created with `new`:

```javascript
const user = new User("Osama Abu Motlaq");
```

The constructor is commonly used to initialize instance state.

---

# 8. Instance Methods

Instance methods are methods available to objects created from a class.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

Create two instances:

```javascript
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

Both instances can use:

```javascript
user1.greet();
user2.greet();
```

The method is normally stored on the class prototype rather than duplicated as a separate function on every instance.

This is an important memory and object-model concept.

---

# 9. Static Methods

Static methods belong to the class itself rather than individual instances.

```javascript
class User {
  static describe() {
    return "A user represents an application user.";
  }
}
```

Call it using the class:

```javascript
console.log(User.describe());
```

Not:

```javascript
const user = new User();

user.describe(); // Error
```

Conceptually:

```text
User
 └── static describe()

User instance
 └── does not directly have describe()
```

Static methods are useful for functionality related to the class as a whole rather than a particular instance.

---

# 10. Inheritance

Inheritance allows one class to reuse and extend another class.

```javascript
class Developer {
  constructor(name) {
    this.name = name;
  }

  code() {
    return `${this.name} is writing code.`;
  }
}
```

Another class can extend it:

```javascript
class FrontendDeveloper extends Developer {
  buildUI() {
    return `${this.name} is building a user interface.`;
  }
}
```

Create an instance:

```javascript
const developer = new FrontendDeveloper("Osama Abu Motlaq");
```

The object can use both:

```javascript
developer.code();
developer.buildUI();
```

The relationship is:

```text
Developer
    ▲
    │ extends
    │
FrontendDeveloper
```

Inheritance is powerful, but it should not automatically be the first solution for every relationship between objects.

---

# 11. Private Fields

Modern JavaScript classes support private fields using `#`.

```javascript
class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  checkPassword(password) {
    return this.#password === password;
  }
}
```

The private field cannot be accessed directly from outside the class:

```javascript
const user = new User("secret");

user.#password; // SyntaxError
```

Instead, controlled methods can expose specific behavior:

```javascript
user.checkPassword("secret");
```

This is related to **encapsulation**.

---

# 12. Getters and Setters

Getters allow a method to be accessed like a property.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  get displayName() {
    return this.name.toUpperCase();
  }
}
```

Usage:

```javascript
const user = new User("Osama Abu Motlaq");

console.log(user.displayName);
```

There are no parentheses because `displayName` behaves like a property.

Setters allow controlled assignment:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  set username(value) {
    this.name = value.trim();
  }
}
```

Usage:

```javascript
user.username = "Osama Abu Motlaq";
```

Getters and setters can be useful when reading or changing a value requires logic.

---

# 13. Polymorphism

Polymorphism means that different objects can provide their own implementation of the same operation.

For example:

```javascript
class Developer {
  describeWork() {
    return "Writing software.";
  }
}

class FrontendDeveloper extends Developer {
  describeWork() {
    return "Building user interfaces.";
  }
}

class BackendDeveloper extends Developer {
  describeWork() {
    return "Building server-side systems.";
  }
}
```

Different objects respond to the same method:

```javascript
const frontend = new FrontendDeveloper();
const backend = new BackendDeveloper();

frontend.describeWork();
backend.describeWork();
```

The method name is the same:

```text
describeWork()
```

But the behavior differs.

This is one practical form of polymorphism.

---

# 14. Encapsulation

Encapsulation means controlling how an object's internal state and behavior are accessed.

Instead of allowing every part of an application to modify internal state directly, an object can expose controlled operations.

For example:

```javascript
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive.");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

External code cannot directly modify:

```javascript
account.#balance;
```

Instead, it uses:

```javascript
account.deposit(100);
```

The class controls how the state changes.

---

# 15. Abstraction

Abstraction means exposing the important interface while hiding unnecessary implementation details.

Consider:

```javascript
class EmailService {
  send(message) {
    this.#connect();
    this.#authenticate();
    this.#deliver(message);
  }

  #connect() {
    // Connection logic
  }

  #authenticate() {
    // Authentication logic
  }

  #deliver(message) {
    // Delivery logic
  }
}
```

The caller only needs:

```javascript
emailService.send("Hello");
```

The caller does not need to know every internal step.

Abstraction helps reduce the amount of implementation detail that users of a component need to understand.

---

# 16. Composition

Composition means building complex objects by combining smaller pieces of functionality.

Instead of creating a deep inheritance hierarchy, you can compose behavior.

For example:

```javascript
const canCode = {
  code() {
    return "Writing code.";
  },
};

const canDesign = {
  design() {
    return "Designing interfaces.";
  },
};

const developer = {
  name: "Osama Abu Motlaq",
  ...canCode,
  ...canDesign,
};
```

Now:

```javascript
developer.code();
developer.design();
```

The object receives behavior from multiple smaller objects.

A common principle is:

> Prefer composition over inheritance when composition produces a simpler design.

This does not mean inheritance is bad. It means inheritance should be used when there is a meaningful hierarchical relationship.

---

# OOP Is Not Always the Best Choice

OOP is a tool, not a requirement.

JavaScript supports several programming styles.

For example, this is perfectly valid JavaScript:

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}
```

You do not need a class for every function.

Bad design:

```javascript
class Calculator {
  calculateTotal(price, quantity) {
    return price * quantity;
  }
}
```

The class adds unnecessary structure without providing meaningful value.

Good engineering means choosing the simplest abstraction that solves the problem.

---

# OOP in React

OOP is relevant to React, but modern React development is **not primarily class-based**.

Modern React applications mainly use:

* Function components
* Hooks
* JavaScript functions
* Objects
* Arrays
* Closures
* Modules

For example:

```javascript
function UserCard({ name }) {
  return <h2>{name}</h2>;
}
```

This is a function component, not a class component.

Older React used class components extensively:

```javascript
class UserCard extends React.Component {
  render() {
    return <h2>Osama Abu Motlaq</h2>;
  }
}
```

Modern React generally favors function components and Hooks.

However, understanding JavaScript OOP is still valuable because the JavaScript language itself uses objects and prototypes extensively.

OOP knowledge is particularly useful when working with:

* Browser APIs
* JavaScript built-in objects
* Libraries
* Node.js
* SDKs
* Classes in existing codebases
* Object-oriented code during interviews
* Legacy React applications
* Design patterns

---

# OOP in Full-Stack JavaScript

For a Full-Stack JavaScript developer, OOP can appear in several places.

### Frontend

You will frequently work with objects:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
};
```

You may also encounter classes inside libraries.

### Backend

Node.js applications can contain:

* Classes
* Services
* Controllers
* Repository objects
* Custom error classes
* SDK clients

For example:

```javascript
class UserService {
  async getUser(id) {
    // Database logic
  }
}
```

However, Node.js applications can also be designed primarily with functions and modules.

Therefore:

```text
Full-Stack JavaScript
        │
        ├── Functional programming
        ├── Object-oriented programming
        └── Procedural programming
```

A strong JavaScript developer should understand the different approaches rather than forcing everything into classes.

---

# OOP Learning Strategy

Do not memorize definitions such as:

```text
Encapsulation
Inheritance
Polymorphism
Abstraction
```

without understanding the JavaScript mechanics behind them.

Instead, build the understanding in layers:

### Layer 1 — Objects

Understand:

```javascript
const user = {};
```

### Layer 2 — Behavior

Understand:

```javascript
user.greet();
```

### Layer 3 — Context

Understand:

```javascript
this
```

### Layer 4 — Reusable Object Creation

Understand:

```javascript
new User();
```

### Layer 5 — Prototypes

Understand:

```text
object
  ↓
prototype
  ↓
prototype
  ↓
null
```

### Layer 6 — Classes

Understand:

```javascript
class User {}
```

### Layer 7 — Relationships

Understand:

```text
Inheritance
Composition
Polymorphism
```

### Layer 8 — Design

Understand:

```text
Encapsulation
Abstraction
Best Practices
```

This order gives you a JavaScript-specific understanding instead of simply memorizing traditional OOP terminology.

---

# Common OOP Mistakes in JavaScript

## 1. Treating JavaScript Classes Like Java Classes

JavaScript classes are built on top of the prototype system.

Do not ignore prototypes.

---

## 2. Creating a Class for Everything

Not every problem requires a class.

A simple function may be better:

```javascript
function formatName(name) {
  return name.trim().toUpperCase();
}
```

---

## 3. Ignoring `this`

Understanding `this` is essential before working deeply with classes and object methods.

---

## 4. Overusing Inheritance

Deep inheritance trees can make code difficult to understand and maintain.

Prefer simpler relationships when possible.

---

## 5. Memorizing OOP Terminology Without Understanding JavaScript

Knowing the definition of polymorphism is not enough.

You should be able to recognize how polymorphic behavior can actually appear in JavaScript code.

---

# OOP Quick Reference

| Topic                | Remember                                                    |
| -------------------- | ----------------------------------------------------------- |
| Object               | Data + behavior                                             |
| Property             | Value stored on an object                                   |
| Method               | Function associated with an object                          |
| `this`               | Determined primarily by how a function is called            |
| Constructor Function | Function used with `new` to create objects                  |
| Prototype            | Object used for property/method lookup and inheritance      |
| Prototype Chain      | Sequence of prototype links                                 |
| `class`              | Syntax for working with constructor/prototype-based objects |
| Constructor          | Initializes a new class instance                            |
| Instance Method      | Method available to instances                               |
| Static Method        | Method available on the class itself                        |
| `extends`            | Creates a subclass relationship                             |
| `super`              | Accesses the parent class constructor/methods               |
| `#field`             | Private class field                                         |
| Getter               | Property-like access with custom logic                      |
| Setter               | Property-like assignment with custom logic                  |
| Polymorphism         | Same interface, different implementations                   |
| Encapsulation        | Controlled access to internal state                         |
| Abstraction          | Hide unnecessary implementation details                     |
| Composition          | Combine smaller pieces to create larger behavior            |

---

# Recommended Practice

After completing the OOP section, you should be able to build something like:

```javascript
class User {
  #email;

  constructor(name, email) {
    this.name = name;
    this.#email = email;
  }

  getEmail() {
    return this.#email;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

const use
```
