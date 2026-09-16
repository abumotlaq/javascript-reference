# Classes

JavaScript classes provide a structured syntax for creating objects and implementing object-oriented patterns.

Classes were introduced in **ECMAScript 2015 (ES6)**.

Example:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  introduce() {
    return `My name is ${this.name}, and I am a ${this.role}.`;
  }
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);

console.log(user.introduce());
```

Output:

```text
My name is Osama Abu Motlaq, and I am a Frontend Developer.
```

Classes make object-oriented code easier to organize and read.

However, an important fact must be understood:

> JavaScript classes use the prototype system underneath.

They provide class-oriented syntax, but JavaScript remains a prototype-based language.

---

# 1. Basic Class Syntax

A simple class looks like this:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

Use its method:

```js
console.log(user.sayHello());
```

Output:

```text
Hello, Osama Abu Motlaq.
```

The structure is:

```text
class
 ├── constructor()
 └── methods
```

---

# 2. What Is a Class?

A class is a JavaScript construct that defines how objects should be created and what behavior their instances should have.

For example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The class describes the structure and initialization process.

Then:

```js
const user = new User("Osama Abu Motlaq");
```

creates an instance.

Conceptually:

```text
User class
    ↓
new User(...)
    ↓
User instance
```

---

# 3. The `new` Keyword

Classes are normally instantiated using:

```js
new
```

Example:

```js
const user = new User("Osama Abu Motlaq");
```

The `new` operator creates a new instance and establishes the prototype relationship.

Conceptually:

```text
new User(...)
      ↓
Create instance
      ↓
Connect instance to User.prototype
      ↓
Run constructor
      ↓
Return instance
```

This is closely related to constructor functions.

---

# 4. The `constructor()` Method

The `constructor()` method initializes a new instance.

Example:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

When you write:

```js
const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

JavaScript calls:

```js
constructor(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

with `this` referring to the newly created instance.

Therefore:

```js
this.name = name;
```

creates:

```js
user.name
```

and:

```js
this.role = role;
```

creates:

```js
user.role
```

---

# 5. Classes Without a Constructor

A class does not always need an explicit constructor.

Example:

```js
class User {
  sayHello() {
    return "Hello";
  }
}
```

You can still create an instance:

```js
const user = new User();

console.log(user.sayHello());
```

Output:

```text
Hello
```

If you do not define a constructor, JavaScript provides a default constructor.

Conceptually, for a base class:

```js
constructor(...args) {}
```

is supplied automatically.

---

# 6. Instance Properties

Instance properties belong to individual objects.

Example:

```js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

The instance contains:

```js
user.name
user.role
```

You can verify:

```js
console.log(Object.hasOwn(user, "name"));
console.log(Object.hasOwn(user, "role"));
```

Output:

```text
true
true
```

These are own properties of the instance.

---

# 7. Instance Methods

Methods defined inside a class body are normally placed on the class's prototype.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

The method is available:

```js
user.sayHello();
```

But it is not normally an own property of `user`.

```js
console.log(
  Object.hasOwn(user, "sayHello")
);
```

Output:

```text
false
```

Instead:

```js
console.log(
  Object.hasOwn(User.prototype, "sayHello")
);
```

Output:

```text
true
```

This is the prototype system working underneath the class syntax.

---

# 8. Class Methods Are Shared

Create two instances:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}

const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

Now:

```js
console.log(user1.sayHello === user2.sayHello);
```

Output:

```text
true
```

Both instances access the same method through:

```js
User.prototype
```

Conceptually:

```text
user1 ──┐
        │
        ├──→ User.prototype.sayHello
        │
user2 ──┘
```

---

# 9. Class Methods and `this`

Inside a class method:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

When called like this:

```js
user.sayHello();
```

`this` refers to:

```js
user
```

This follows the same method-call rule discussed in:

```text
03-this-keyword.md
```

The class syntax does not eliminate JavaScript's `this` rules.

---

# 10. Classes and Prototypes

This is one of the most important concepts in JavaScript OOP.

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

The relationship is approximately:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

Therefore:

```js
user.sayHello()
```

works because JavaScript finds `sayHello` on:

```js
User.prototype
```

---

# 11. Inspecting the Prototype

You can verify the relationship:

```js
console.log(
  Object.getPrototypeOf(user) === User.prototype
);
```

Output:

```text
true
```

You can also inspect the method:

```js
console.log(
  Object.hasOwn(User.prototype, "sayHello")
);
```

Output:

```text
true
```

This demonstrates that class methods are connected to the prototype.

---

# 12. Classes vs Constructor Functions

Before classes, you could write:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

With a class:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");
```

The class version is more concise and structured.

The important relationship remains:

```text
Constructor function
        ↓
prototype
        ↓
instance
```

and:

```text
Class
 ↓
prototype
 ↓
instance
```

Classes do not remove prototypes.

---

# 13. Classes Are Not Just Syntactic Sugar

It is common to hear:

> "Classes are just syntactic sugar for constructor functions."

This statement is useful as a starting point, but it is incomplete.

Classes and constructor functions share the prototype-based object model, but classes introduce different language semantics.

For example:

* Classes cannot be called without `new`.
* Class bodies execute in strict mode.
* Class methods are non-enumerable.
* Class declarations have different initialization behavior.
* Classes support private fields and methods.
* Classes provide `extends` and `super`.
* Class constructors have specific rules around derived classes.

Therefore, a better mental model is:

> Classes provide a class-oriented syntax and semantics built on JavaScript's prototype system.

---

# 14. Classes Cannot Be Called Without `new`

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

Correct:

```js
const user = new User("Osama Abu Motlaq");
```

Incorrect:

```js
const user = User("Osama Abu Motlaq");
```

JavaScript throws:

```text
TypeError
```

Classes must be instantiated with `new`.

This differs from ordinary functions, which can potentially be called normally.

---

# 15. Class Bodies Are Strict Mode

Code inside a class body runs in strict mode automatically.

Example:

```js
class User {
  method() {
    console.log(this);
  }
}
```

This has important consequences for `this`, assignment rules, and other strict-mode behavior.

You do not need to write:

```js
"use strict";
```

inside the class.

Strict mode is automatically applied to class definitions.

---

# 16. Class Declarations

The common syntax is a class declaration:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

The identifier is:

```js
User
```

You can then use:

```js
const user = new User("Osama Abu Motlaq");
```

---

# 17. Class Expressions

Classes can also be expressions.

Named class expression:

```js
const User = class UserClass {
  constructor(name) {
    this.name = name;
  }
};
```

Anonymous class expression:

```js
const User = class {
  constructor(name) {
    this.name = name;
  }
};
```

Then:

```js
const user = new User("Osama Abu Motlaq");
```

Class expressions are useful when a class needs to be assigned to a variable, passed around, or created conditionally.

For most everyday code, class declarations are easier to read.

---

# 18. Class Methods

A class can contain multiple methods:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }

  getName() {
    return this.name;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.sayHello());
console.log(user.getName());
```

Output:

```text
Hello, Osama Abu Motlaq.
Osama Abu Motlaq
```

Methods can read and modify instance state through `this`.

---

# 19. Methods Can Modify Instance State

Example:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
  }

  login() {
    this.loginCount++;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

user.login();
user.login();

console.log(user.loginCount);
```

Output:

```text
2
```

The method modifies the state of that specific instance.

---

# 20. Each Instance Has Independent State

Consider:

```js
class User {
  constructor(name) {
    this.name = name;
    this.loginCount = 0;
  }

  login() {
    this.loginCount++;
  }
}
```

Create two instances:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

user1.login();
user1.login();

console.log(user1.loginCount);
console.log(user2.loginCount);
```

Output:

```text
2
0
```

Each instance has its own:

```js
loginCount
```

property.

The method is shared, but the instance state is independent.

---

# 21. Public Class Fields

Modern JavaScript allows fields to be declared directly in the class body.

Example:

```js
class User {
  role = "Frontend Developer";

  constructor(name) {
    this.name = name;
  }
}
```

Create an instance:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.role);
```

Output:

```text
Frontend Developer
```

Class fields are instance properties.

Conceptually:

```text
user
 ├── name
 └── role
```

The fields belong to each instance.

---

# 22. Class Field Initializers

You can initialize fields with expressions:

```js
class User {
  loginCount = 0;

  constructor(name) {
    this.name = name;
  }
}
```

Each instance receives its own:

```js
loginCount
```

property.

You can also use expressions:

```js
class User {
  createdAt = new Date();

  constructor(name) {
    this.name = name;
  }
}
```

Each instance gets its own initialization.

---

# 23. Class Fields vs Prototype Methods

Compare:

```js
class User {
  name = "Osama Abu Motlaq";

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Here:

```text
name
→ instance property

sayHello
→ prototype method
```

Conceptually:

```text
user
 ├── name
 │
 └── [[Prototype]]
       ↓
   User.prototype
       └── sayHello
```

This distinction is important when understanding memory, identity, and method sharing.

---

# 24. Arrow Function Fields

You can define an arrow function as a class field:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello = () => {
    return `Hello, ${this.name}.`;
  };
}
```

Here `sayHello` is an instance property, not a prototype method.

This means:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

console.log(user1.sayHello === user2.sayHello);
```

Output:

```text
false
```

Each instance gets its own function.

This can be useful when lexical `this` behavior is specifically desired, but it has different memory and inheritance characteristics from normal class methods.

---

# 25. Static Methods

A class can define methods that belong to the class itself rather than its instances.

Use:

```js
static
```

Example:

```js
class User {
  static getType() {
    return "User";
  }
}
```

Call it using:

```js
console.log(User.getType());
```

Output:

```text
User
```

But:

```js
const user = new User();

user.getType();
```

does not work.

The method belongs to:

```js
User
```

not:

```js
User.prototype
```

Static methods are covered in detail in:

```text
09-static-methods.md
```

---

# 26. Static Properties

Classes can also have static fields:

```js
class User {
  static type = "User";
}
```

Access:

```js
console.log(User.type);
```

Output:

```text
User
```

The property belongs to the class constructor itself.

It is not an instance property:

```js
const user = new User();

console.log(user.type);
```

This does not access the static field.

---

# 27. Inheritance With `extends`

Classes support inheritance using:

```js
extends
```

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `My name is ${this.name}.`;
  }
}

class Developer extends User {
  code() {
    return "Writing JavaScript";
  }
}
```

Create an instance:

```js
const developer = new Developer(
  "Osama Abu Motlaq"
);
```

The instance can use both:

```js
developer.introduce();
developer.code();
```

Conceptually:

```text
developer
 ↓
Developer.prototype
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

This is prototype-chain inheritance expressed using class syntax.

---

# 28. `super()`

When a derived class has its own constructor, it must call:

```js
super()
```

before using `this`.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
}
```

Now:

```js
const developer = new Developer(
  "Osama Abu Motlaq",
  "JavaScript"
);
```

`super(name)` calls the parent class constructor.

This initializes:

```js
this.name
```

before the child constructor adds:

```js
this.language
```

Inheritance and `super()` will be covered more deeply later.

---

# 29. Class Method Overriding

A child class can define a method with the same name as a parent method.

Example:

```js
class User {
  introduce() {
    return "I am a user.";
  }
}

class Developer extends User {
  introduce() {
    return "I am a developer.";
  }
}
```

Now:

```js
const developer = new Developer();

console.log(developer.introduce());
```

Output:

```text
I am a developer.
```

JavaScript finds the method on:

```text
Developer.prototype
```

before checking:

```text
User.prototype
```

This is the basis of method overriding and polymorphism.

---

# 30. Calling the Parent Method With `super`

A child method can call the parent implementation:

```js
class User {
  introduce() {
    return "I am a user.";
  }
}

class Developer extends User {
  introduce() {
    return `${super.introduce()} I write JavaScript.`;
  }
}
```

Now:

```js
const developer = new Developer();

console.log(developer.introduce());
```

Output:

```text
I am a user. I write JavaScript.
```

`super.introduce()` accesses the parent class method.

---

# 31. Private Fields

JavaScript classes support private fields using `#`.

Example:

```js
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

Create an instance:

```js
const user = new User("secret");
```

This works:

```js
console.log(user.checkPassword("secret"));
```

Output:

```text
true
```

But this does not work:

```js
console.log(user.#password);
```

Private fields cannot be accessed directly from outside the class.

Private fields are covered in detail in:

```text
11-private-fields.md
```

---

# 32. Getters and Setters

Classes support getters and setters.

Example:

```js
class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value.trim();
  }
}
```

Now:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.name);
```

The getter runs automatically.

And:

```js
user.name = "  Osama Abu Motlaq  ";
```

calls the setter.

Getters and setters are covered in:

```text
12-getters-setters.md
```

---

# 33. Class Hoisting

Class declarations are not usable before their declaration.

This code fails:

```js
const user = new User("Osama Abu Motlaq");

class User {
  constructor(name) {
    this.name = name;
  }
}
```

JavaScript throws a `ReferenceError`.

Classes are technically created during initialization, but they remain in the **temporal dead zone** until execution reaches the class declaration.

This differs from function declarations, which are hoisted differently.

Therefore, place class declarations before using them.

---

# 34. Class Methods Are Non-Enumerable

Methods defined in a class body are non-enumerable properties on the prototype.

Example:

```js
class User {
  sayHello() {
    return "Hello";
  }
}
```

You can inspect the descriptor:

```js
console.log(
  Object.getOwnPropertyDescriptor(
    User.prototype,
    "sayHello"
  )
);
```

The descriptor includes:

```text
enumerable: false
```

This differs from methods manually assigned like:

```js
User.prototype.sayHello = function () {};
```

where the property is normally enumerable.

This is one example of why classes are not simply textual replacements for constructor functions.

---

# 35. Class Constructors Are Special

The `constructor` method is not an ordinary method that you call manually.

For example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

You normally trigger it through:

```js
new User("Osama Abu Motlaq");
```

You do not normally write:

```js
User.constructor(...);
```

The constructor participates in the `new` process.

---

# 36. One Constructor Per Class

A class can have only one constructor method.

This is invalid:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

JavaScript does not support constructor overloading like some traditional OOP languages.

Instead, use optional parameters, defaults, objects, or other patterns.

For example:

```js
class User {
  constructor(name, role = "Developer") {
    this.name = name;
    this.role = role;
  }
}
```

---

# 37. Default Parameters in Constructors

Constructors can use default parameters:

```js
class User {
  constructor(
    name,
    role = "Developer"
  ) {
    this.name = name;
    this.role = role;
  }
}
```

Now:

```js
const user = new User("Osama Abu Motlaq");
```

gives:

```js
console.log(user.role);
```

Output:

```text
Developer
```

---

# 38. Destructured Constructor Parameters

You can also accept an object:

```js
class User {
  constructor({ name, role }) {
    this.name = name;
    this.role = role;
  }
}
```

Create an instance:

```js
const user = new User({
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
});
```

This can be useful when a constructor has many related options.

---

# 39. Class Instances and `instanceof`

The `instanceof` operator works with class instances.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Osama Abu Motlaq");

console.log(user instanceof User);
```

Output:

```text
true
```

This works because:

```text
user
 ↓
User.prototype
```

The same prototype mechanism is involved.

---

# 40. Class Instance Identity

Each `new` operation creates a distinct object.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

console.log(user1 === user2);
```

Output:

```text
false
```

They contain similar data but are separate instances.

---

# 41. Classes and Object References

Instances are objects, so normal object reference behavior still applies.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user1 = new User("Osama Abu Motlaq");
const user2 = user1;

user2.name = "Osama Abu Motlaq";

console.log(user1.name);
```

Both variables reference the same object.

The important concept is:

```text
user1 ──┐
        ├──→ same object
user2 ──┘
```

Classes do not change JavaScript's normal object-reference semantics.

---

# 42. Class vs Object Literal

An object literal:

```js
const user = {
  name: "Osama Abu Motlaq",

  sayHello() {
    return `Hello, ${this.name}.`;
  }
};
```

creates one object directly.

A class:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

defines a reusable object-creation pattern.

Then:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

creates multiple instances.

Use an object literal when you need a specific object.

Use a class when a class-based abstraction genuinely makes sense.

---

# 43. Class vs Factory Function

Factory:

```js
function createUser(name) {
  return {
    name,

    sayHello() {
      return `Hello, ${this.name}.`;
    }
  };
}
```

Class:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}
```

Factory:

```js
const user = createUser("Osama Abu Motlaq");
```

Class:

```js
const user = new User("Osama Abu Motlaq");
```

Both can solve similar problems.

Do not automatically choose classes simply because the problem involves objects.

Choose the abstraction that makes the design clearer.

---

# 44. Classes and Composition

Inheritance is not the only way to reuse behavior.

Composition can often be simpler.

For example:

```js
const canCode = {
  code() {
    return "Writing JavaScript";
  }
};

const canDesign = {
  design() {
    return "Designing interfaces";
  }
};

function createDeveloper(name) {
  return {
    name,
    ...canCode,
    ...canDesign
  };
}
```

This creates behavior by combining capabilities.

This idea becomes important later when studying:

```text
16-composition.md
```

A good JavaScript developer should understand both inheritance and composition.

---

# 45. Common Mistakes

## Mistake 1: Forgetting `new`

Incorrect:

```js
const user = User("Osama Abu Motlaq");
```

For a class, this throws a `TypeError`.

Correct:

```js
const user = new User("Osama Abu Motlaq");
```

---

## Mistake 2: Assuming Class Methods Are Instance Properties

Given:

```js
class User {
  sayHello() {}
}
```

this:

```js
Object.hasOwn(user, "sayHello");
```

returns:

```text
false
```

The method is normally on:

```js
User.prototype
```

---

## Mistake 3: Confusing Static Methods With Instance Methods

Static:

```js
class User {
  static getType() {
    return "User";
  }
}
```

Call:

```js
User.getType();
```

Not:

```js
new User().getType();
```

---

## Mistake 4: Using `this` Before `super()`

In a derived class:

```js
class Developer extends User {
  constructor(name) {
    this.name = name;
    super(name);
  }
}
```

This is invalid.

Call:

```js
super(name);
```

before accessing `this`.

---

## Mistake 5: Treating Classes Like Java or C++

JavaScript classes still operate within JavaScript's object and prototype model.

Do not assume that every class concept from another language behaves identically in JavaScript.

---

## Mistake 6: Using Classes Automatically

Classes are useful, but they are not mandatory for object-oriented JavaScript.

JavaScript also provides:

```text
objects
factories
closures
prototypes
composition
modules
```

Choose based on the problem.

---

# 46. Best Practices

### 1. Keep classes focused

A class should have a clear responsibility.

Avoid creating enormous classes that manage unrelated concerns.

### 2. Keep instance state on the instance

Use:

```js
this.name = name;
```

for instance-specific data.

### 3. Use prototype methods for shared behavior

Normal class methods are appropriate when behavior should be shared by instances.

### 4. Use private fields for truly internal state

When external code should not directly access a field, consider:

```js
#privateField
```

### 5. Prefer composition when inheritance becomes complicated

Deep inheritance hierarchies can become difficult to maintain.

### 6. Do not use classes simply because they look more "professional"

An object, factory, or module can be a better abstraction for many JavaScript problems.

### 7. Understand the prototype underneath the class

Do not treat:

```js
class User {}
```

as magic.

Know that instances interact with:

```js
User.prototype
```

through the prototype chain.

---

# 47. Quick Reference

| Syntax            | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `class User {}`   | Defines a class                                     |
| `new User()`      | Creates an instance                                 |
| `constructor()`   | Initializes an instance                             |
| `this`            | Refers to the current instance during a method call |
| `method()`        | Defines an instance method                          |
| `static method()` | Defines a method on the class itself                |
| `extends`         | Creates class inheritance                           |
| `super()`         | Calls the parent constructor                        |
| `super.method()`  | Calls a parent method                               |
| `field = value`   | Defines an instance field                           |
| `#field`          | Defines a private field                             |
| `get name()`      | Defines a getter                                    |
| `set name(value)` | Defines a setter                                    |
| `instanceof`      | Checks the prototype-chain relationship             |
| `User.prototype`  | Prototype used by instances of `User`               |

---

# 48. Class Mental Model

When you see:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");
```

think:

```text
                  User
                   │
                   │ prototype
                   ▼
              User.prototype
                   ▲
                   │ [[Prototype]]
                   │
                  user
              ┌──────────┐
              │   name   │
              └──────────┘
```

The complete prototype chain is:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

The instance stores:

```text
name
```

while the shared method:

```text
sayHello
```

is found through:

```text
User.prototype
```

This is the critical connection between classes and prototypes.

---

# 49. Constructor Function vs Class

The same basic design can be expressed in both forms.

### Constructor Function

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

### Class

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}.`;
  }
}

const user = new User("Osama Abu Motlaq");
```

The class version makes the relationship easier to read:

```text
Class
 ├── constructor
 └── methods
```

while JavaScript still uses:

```text
prototype
```

underneath.

---

# 50. React Relevance

**Relevance to modern React: Medium for JavaScript knowledge, Low for modern React implementation.**

Modern React primarily uses function components:

```js
function App() {
  return <h1>Hello</h1>;
}
```

You generally will not create React components like:

```js
class App extends React.Component {}
```

unless you are working with older code or specific legacy codebases.

However, classes remain useful for understanding:

* JavaScript objects.
* `this`.
* Prototypes.
* Constructor functions.
* Inheritance.
* Static methods.
* Private fields.
* Object identity.
* Third-party libraries.
* Older React code.
* JavaScript interview questions.

For your React and Next.js path, you should **understand classes**, but you do not need to make them the center of your React development.

The more important JavaScript concepts for modern React are:

```text
functions
objects
arrays
destructuring
modules
closures
callbacks
higher-order functions
promises
async/await
immutability
```

---

# 51. Key Takeaways

1. A class provides structured syntax for creating objects and organizing behavior.

2. Classes were introduced in ES6.

3. Instances are normally created with:

```js
new User(...)
```

4. The `constructor()` method initializes instance state.

5. Instance properties belong to individual objects:

```js
this.name = name;
```

6. Normal class methods are shared through the prototype:

```js
User.prototype
```

7. Therefore, classes still use JavaScript's prototype-based object model.

8. Classes cannot be called without `new`.

9. Class bodies run in strict mode.

10. Class declarations are not usable before their declaration.

11. `static` methods belong to the class rather than its instances.

12. `extends` creates inheritance relationships.

13. `super()` invokes the parent constructor.

14. `#privateField` creates a private class field.

15. Classes are not identical to classical classes in languages such as Java or C++.

16. Classes are useful, but JavaScript also supports factories, composition, closures, modules, and plain objects.

17. Understanding prototypes makes classes much easier to understand.

---

## The OOP Connection So Far

You have now built the core foundation:

```text
01 Objects
      ↓
02 Object Properties & Methods
      ↓
03 this
      ↓
04 Constructor Functions
      ↓
05 Prototypes
      ↓
06 Classes
```

The important progression is:

```text
Objects
   ↓
How properties and methods work
   ↓
How this works
   ↓
How constructors create instances
   ↓
How prototypes provide shared behavior
   ↓
How classes organize these concepts
```

The next topic is:

**`07-class-constructors.md`**

There we will focus specifically on `constructor()`, `this`, initialization, default values, constructor parameters, derived-class constructors, `super()`, and common constructor design patterns.
