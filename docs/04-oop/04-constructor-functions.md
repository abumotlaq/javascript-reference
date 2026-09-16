# Constructor Functions

Constructor functions are a traditional JavaScript pattern for creating multiple objects with the same structure and behavior.

Before `class` syntax was introduced, constructor functions combined with prototypes were one of the primary ways to implement object-oriented patterns in JavaScript.

Understanding constructor functions is still valuable because they explain how JavaScript's `new`, `this`, prototypes, and `instanceof` actually work underneath `class` syntax.

---

## 1. What Is a Constructor Function?

A **constructor function** is a regular JavaScript function intended to be called with the `new` keyword to create and initialize an object.

Example:

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}

const user = new User("Osama Abu Motlaq", "Frontend Developer");

console.log(user.name);
console.log(user.role);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

The function itself does not need special syntax to become a constructor.

The important part is how it is called:

```js
new User(...)
```

A normal function call:

```js
User(...)
```

and a constructor call:

```js
new User(...)
```

have very different behavior.

---

# 2. Constructor Naming Convention

Constructor functions are usually named using **PascalCase**.

```js
function User() {}
function Product() {}
function BankAccount() {}
```

Instead of:

```js
function user() {}
function product() {}
```

PascalCase communicates an important convention:

> "This function is intended to be called with `new`."

For example:

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

The capitalization does not make the function a constructor technically.

This:

```js
function user(name) {
  this.name = name;
}

const person = new user("Osama Abu Motlaq");
```

can still work.

However, PascalCase makes the intended usage much clearer.

---

# 3. The `new` Keyword

The `new` keyword is what gives a constructor function its constructor behavior.

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

When JavaScript evaluates:

```js
new User("Osama Abu Motlaq");
```

it performs several important operations.

Conceptually, JavaScript does something similar to:

```text
1. Create a new object.
2. Connect the new object to User.prototype.
3. Call User with this pointing to the new object.
4. Return the resulting object.
```

This is the core mechanism behind constructor functions.

---

# 4. What `new` Does Step by Step

Consider:

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

Let's break down what happens.

---

## Step 1: Create a New Object

JavaScript creates a new object.

Conceptually:

```js
const newObject = {};
```

You do not write this yourself.

The `new` operator does it.

---

## Step 2: Connect the Object to the Constructor's Prototype

The new object becomes connected to:

```js
User.prototype
```

Conceptually:

```text
user
  ↓
User.prototype
  ↓
Object.prototype
  ↓
null
```

This creates the prototype chain.

We will study prototypes in detail in:

```text
05-prototypes.md
```

For now, remember:

> Every object created with `new User()` gets `User.prototype` as its prototype.

---

## Step 3: Call the Constructor With `this`

JavaScript executes:

```js
User("Osama Abu Motlaq", "Frontend Developer");
```

but with:

```js
this
```

pointing to the newly created object.

Therefore:

```js
this.name = name;
this.role = role;
```

becomes conceptually:

```js
newObject.name = "Osama Abu Motlaq";
newObject.role = "Frontend Developer";
```

---

## Step 4: Return the New Object

If the constructor does not explicitly return another object, the newly created object is returned.

Therefore:

```js
const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

gives:

```js
user
```

an object containing:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

---

# 5. The Constructor Function Example

A simple constructor:

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);

console.log(user);
```

The resulting object behaves approximately like:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

You can create multiple independent objects:

```js
const user1 = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);

const user2 = new User(
  "Osama Abu Motlaq",
  "Backend Developer"
);
```

Each object has its own properties:

```js
console.log(user1.role);
console.log(user2.role);
```

Output:

```text
Frontend Developer
Backend Developer
```

The constructor provides a reusable object-creation pattern.

---

# 6. Constructor Parameters

Constructor functions can accept parameters just like normal functions.

```js
function User(name, role, experience) {
  this.name = name;
  this.role = role;
  this.experience = experience;
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer",
  2
);

console.log(user);
```

Output:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  experience: 2
}
```

This allows one constructor to create objects with different data.

---

# 7. `this` Inside Constructor Functions

When called with `new`, `this` refers to the newly created instance.

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");

console.log(user.name);
```

The important relationship is:

```text
new User(...)
      ↓
new object
      ↓
this inside User
```

So:

```js
this.name = name;
```

initializes the new object's property.

This is directly connected to the previous topic:

```text
03-this-keyword.md
```

---

# 8. Constructor Functions Are Still Functions

A constructor function is not a special function type.

For example:

```js
function User(name) {
  this.name = name;
}
```

is still a function.

You can inspect it:

```js
console.log(typeof User);
```

Output:

```text
function
```

The difference is that it is **intended to be used with `new`**.

JavaScript functions can be called in different ways, and the way a function is called changes the behavior of `this`.

Compare:

```js
User("Osama Abu Motlaq");
```

with:

```js
new User("Osama Abu Motlaq");
```

The second form invokes constructor semantics.

---

# 9. What Happens If You Forget `new`?

This is one of the most common mistakes.

Given:

```js
function User(name) {
  this.name = name;
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

Without `new`, the function is just being called normally.

In strict mode, `this` will be:

```js
undefined
```

and this:

```js
this.name = name;
```

can produce:

```text
TypeError
```

In non-strict code, `this` may refer to the global object, which can create difficult-to-debug global mutations.

Therefore:

> If a function is designed as a constructor, call it with `new`.

---

# 10. Constructor Functions and `prototype`

Every normal function has a `prototype` property that can be used when the function is used as a constructor.

Example:

```js
function User(name) {
  this.name = name;
}

console.log(User.prototype);
```

The newly created objects are linked to this prototype.

```js
const user = new User("Osama Abu Motlaq");

console.log(
  Object.getPrototypeOf(user) === User.prototype
);
```

Output:

```text
true
```

This is one of the most important relationships in JavaScript OOP.

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
```

We will explore this mechanism deeply in `05-prototypes.md`.

---

# 11. Adding Methods Inside a Constructor

You can define methods directly inside a constructor:

```js
function User(name) {
  this.name = name;

  this.sayHello = function () {
    return `Hello, my name is ${this.name}.`;
  };
}

const user = new User("Osama Abu Motlaq");

console.log(user.sayHello());
```

This works.

However, there is an important drawback.

Every time you create an object:

```js
new User(...)
```

a new function object is created for:

```js
this.sayHello
```

For example:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

console.log(user1.sayHello === user2.sayHello);
```

Output:

```text
false
```

The two objects have different function instances.

---

# 12. Putting Methods on the Prototype

A more efficient traditional pattern is to put shared methods on the constructor's prototype.

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, my name is ${this.name}.`;
};
```

Now:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");
```

Both objects can use:

```js
user1.sayHello();
user2.sayHello();
```

But the method itself is shared.

```js
console.log(user1.sayHello === user2.sayHello);
```

Output:

```text
true
```

This is a major reason prototypes matter.

The object does not need to store a separate copy of the method.

Instead, JavaScript searches the prototype chain when the property is not found directly on the object.

---

# 13. Property Lookup With Constructors

Consider:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, my name is ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

When you access:

```js
user.name
```

JavaScript finds `name` directly on:

```js
user
```

But when you access:

```js
user.sayHello
```

JavaScript does not find `sayHello` directly on `user`.

It searches the prototype:

```text
user
  ↓
User.prototype
```

and finds:

```js
User.prototype.sayHello
```

This is prototype-based inheritance in action.

---

# 14. Constructor Function and `instanceof`

The `instanceof` operator checks whether an object's prototype chain contains a constructor's `prototype`.

Example:

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");

console.log(user instanceof User);
```

Output:

```text
true
```

Conceptually:

```text
user
  ↓
User.prototype
```

Therefore:

```js
user instanceof User
```

is `true`.

You can also check:

```js
console.log(user instanceof Object);
```

Output:

```text
true
```

because the prototype chain eventually reaches:

```js
Object.prototype
```

---

# 15. `constructor` Property

The prototype object normally has a `constructor` property pointing back to the constructor function.

Example:

```js
function User(name) {
  this.name = name;
}

console.log(User.prototype.constructor === User);
```

Output:

```text
true
```

After creating an instance:

```js
const user = new User("Osama Abu Motlaq");

console.log(user.constructor === User);
```

Output:

```text
true
```

The lookup works approximately like:

```text
user
  ↓
User.prototype
  ↓
constructor
  ↓
User
```

This is another example of prototype-chain property lookup.

---

# 16. Constructor Return Behavior

Constructors have special return behavior when called with `new`.

Consider:

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

The constructor does not explicitly return anything.

The newly created instance is returned automatically.

But explicit returns require careful attention.

---

## Returning a Primitive

```js
function User(name) {
  this.name = name;
  return 42;
}

const user = new User("Osama Abu Motlaq");

console.log(user.name);
```

Output:

```text
Osama Abu Motlaq
```

The primitive return value:

```js
42
```

is ignored.

---

## Returning an Object

If the constructor explicitly returns an object:

```js
function User(name) {
  this.name = name;

  return {
    custom: true
  };
}

const user = new User("Osama Abu Motlaq");

console.log(user);
```

The explicitly returned object replaces the normally created instance.

Therefore:

```js
console.log(user.name);
```

returns:

```text
undefined
```

while:

```js
console.log(user.custom);
```

returns:

```text
true
```

### Important rule

When using `new`:

```text
Primitive return → ignored
Object/function return → replaces the new instance
No return → new instance is returned
```

---

# 17. `new.target`

JavaScript provides `new.target` to determine whether a function was called with `new`.

Example:

```js
function User(name) {
  console.log(new.target);
  this.name = name;
}

new User("Osama Abu Motlaq");
```

Inside the constructor, `new.target` refers to:

```js
User
```

If the function is called normally:

```js
User("Osama Abu Motlaq");
```

then:

```js
new.target
```

is:

```js
undefined
```

This allows a constructor function to detect whether it was invoked using `new`.

---

# 18. Enforcing Constructor Usage

Older JavaScript code sometimes manually checks `new.target`:

```js
function User(name) {
  if (!new.target) {
    throw new TypeError(
      "User must be called with new"
    );
  }

  this.name = name;
}
```

Now:

```js
new User("Osama Abu Motlaq");
```

works.

But:

```js
User("Osama Abu Motlaq");
```

throws an error.

This makes accidental omission of `new` easier to detect.

---

# 19. Constructor Functions vs Factory Functions

A **constructor function** normally uses `new`.

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

A **factory function** is a normal function that creates and returns an object.

```js
function createUser(name) {
  return {
    name
  };
}

const user = createUser("Osama Abu Motlaq");
```

### Main difference

Constructor:

```js
new User(...)
```

Factory:

```js
createUser(...)
```

Constructor functions rely on:

```text
new
this
prototype
```

Factory functions can simply use:

```text
object literals
closures
composition
```

Neither pattern is universally better.

Modern JavaScript often favors factories, classes, modules, and composition depending on the problem.

---

# 20. Constructor Functions vs Factory Functions

Compare the two patterns.

### Constructor

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}

const user = new User(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

### Factory

```js
function createUser(name, role) {
  return {
    name,
    role
  };
}

const user = createUser(
  "Osama Abu Motlaq",
  "Frontend Developer"
);
```

The factory does not depend on:

```js
new
```

or constructor-style `this`.

This can make factory functions easier to reason about in many modern JavaScript applications.

---

# 21. Constructor Functions and Shared Methods

Consider:

```js
function User(name) {
  this.name = name;
  this.sayHello = function () {
    return `Hello, ${this.name}.`;
  };
}
```

Every instance receives its own:

```js
sayHello
```

function.

Instead:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

Now the method is shared.

This pattern is fundamental to understanding JavaScript's prototype system.

---

# 22. Constructor Functions and Memory

Suppose you create many objects:

```js
const users = [
  new User("Osama Abu Motlaq"),
  new User("Osama Abu Motlaq"),
  new User("Osama Abu Motlaq")
];
```

If methods are created inside the constructor:

```js
function User(name) {
  this.name = name;

  this.sayHello = function () {
    return `Hello, ${this.name}.`;
  };
}
```

each instance receives a separate function.

With prototype methods:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

all instances can use the same function.

This is one of the practical advantages of prototypes.

---

# 23. Constructor Functions and Object Identity

Each call to `new` creates a different object.

```js
function User(name) {
  this.name = name;
}

const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

console.log(user1 === user2);
```

Output:

```text
false
```

Although both contain similar data, they are different object instances.

```text
user1 → Object A
user2 → Object B
```

---

# 24. Constructor Functions With Arrays

A constructor can initialize arrays as instance properties.

```js
function User(name) {
  this.name = name;
  this.skills = [];
}

const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

user1.skills.push("React");

console.log(user1.skills);
console.log(user2.skills);
```

Output:

```text
["React"]
[]
```

This is important.

Each constructor invocation creates a new array:

```js
this.skills = [];
```

Therefore the arrays are independent.

Do not accidentally create shared mutable state outside the constructor unless that sharing is intentional.

---

# 25. Constructor Functions and `Object.getPrototypeOf()`

You can inspect the prototype of an instance:

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");

console.log(
  Object.getPrototypeOf(user) === User.prototype
);
```

Output:

```text
true
```

This is more precise than thinking that `new` simply creates a plain object.

It creates an object whose internal prototype relationship points to the constructor's prototype.

---

# 26. Arrow Functions Cannot Be Constructors

Arrow functions cannot be used with `new`.

This does not work:

```js
const User = (name) => {
  this.name = name;
};

const user = new User("Osama Abu Motlaq");
```

JavaScript throws a `TypeError`.

Why?

Arrow functions do not have the internal constructor behavior required by `new`.

They also do not have their own dynamic `this`.

Therefore:

```js
const User = (name) => {};
```

should not be used as a constructor.

Use a normal function:

```js
function User(name) {
  this.name = name;
}
```

or modern `class` syntax:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

---

# 27. Constructor Functions and Classes

Modern JavaScript provides `class` syntax:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

You create an instance with:

```js
const user = new User("Osama Abu Motlaq");
```

Notice the same keyword:

```js
new
```

and the same general concept:

```text
create instance
      ↓
initialize instance
      ↓
connect instance to prototype
```

JavaScript classes are built on top of the language's prototype system.

Therefore, learning constructor functions and prototypes helps explain what classes are actually doing.

The next stages will make this relationship clearer.

---

# 28. Constructor Functions and `class` Are Not Identical Syntax

It is tempting to think:

```js
function User(name) {
  this.name = name;
}
```

and:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

are exactly the same.

They are not identical language features.

However, they use the same fundamental object model involving:

```text
objects
prototypes
prototype chains
new
this
```

The `class` syntax provides a cleaner and more structured way to express many object-oriented patterns.

We will study it in:

```text
06-classes.md
```

---

# 29. Common Mistakes

## Mistake 1: Forgetting `new`

```js
const user = User("Osama Abu Motlaq");
```

If `User` is intended to be a constructor, this is incorrect.

Use:

```js
const user = new User("Osama Abu Motlaq");
```

---

## Mistake 2: Using an Arrow Function

Incorrect:

```js
const User = (name) => {
  this.name = name;
};
```

Arrow functions cannot be constructors.

---

## Mistake 3: Creating Methods Inside Every Instance Unnecessarily

This works:

```js
function User(name) {
  this.name = name;

  this.sayHello = function () {
    return `Hello, ${this.name}.`;
  };
}
```

But if the method does not need to be unique per instance, a prototype method is usually preferable:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

---

## Mistake 4: Returning an Object Accidentally

Be careful with:

```js
function User(name) {
  this.name = name;

  return {
    name: "Different value"
  };
}
```

The returned object replaces the instance created by `new`.

---

## Mistake 5: Confusing `User` With an Instance

These are different:

```js
User
```

and:

```js
new User("Osama Abu Motlaq")
```

The first is the constructor function.

The second is an instance created by the constructor.

Conceptually:

```text
User
 │
 │ constructor function
 │
 ▼
new User(...)
 │
 │ creates
 ▼
user
```

---

# 30. Best Practices

### 1. Use PascalCase

Prefer:

```js
function User() {}
```

over:

```js
function user() {}
```

when the function is intended to be used as a constructor.

### 2. Use `new` consistently

If a function is designed as a constructor:

```js
new User(...)
```

should be the standard calling convention.

### 3. Keep instance state on `this`

For example:

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}
```

### 4. Put shared methods on the prototype

Instead of:

```js
function User(name) {
  this.name = name;

  this.sayHello = function () {};
}
```

prefer:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {};
```

when appropriate.

### 5. Understand `new` instead of treating it as magic

The most important concepts are:

```text
new
↓
new object
↓
prototype connection
↓
this binding
↓
constructor execution
↓
instance returned
```

### 6. Prefer modern patterns when appropriate

Constructor functions are important for understanding JavaScript, but modern code may use:

```text
classes
factory functions
modules
composition
plain objects
```

depending on the problem.

---

# 31. Quick Reference

| Concept              | Meaning                                                           |
| -------------------- | ----------------------------------------------------------------- |
| Constructor function | Function intended to create and initialize objects                |
| `new`                | Invokes constructor semantics                                     |
| `this`               | Refers to the new instance during a constructor call              |
| `prototype`          | Object used as the prototype for created instances                |
| `instanceof`         | Checks whether a prototype appears in an object's prototype chain |
| `new.target`         | Identifies whether a function was called with `new`               |
| PascalCase           | Conventional naming style for constructors                        |
| Prototype method     | Shared method accessible by instances                             |
| Factory function     | Function that creates and returns an object without `new`         |

---

# 32. Mental Model

When you see:

```js
function User(name) {
  this.name = name;
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
              │
              └── name
                  "Osama Abu Motlaq"
```

And mentally expand:

```js
new User("Osama Abu Motlaq")
```

into:

```text
Create a new object
        ↓
Link it to User.prototype
        ↓
Call User with this = new object
        ↓
Initialize its properties
        ↓
Return the new instance
```

This mental model is more important than memorizing constructor syntax.

---

# 33. React Relevance

**Relevance to modern React: Low to Medium.**

You generally will not write React components using constructor functions today.

Modern React primarily uses:

```js
function Component() {
  return <div>Hello</div>;
}
```

and hooks such as:

```js
useState()
useEffect()
useContext()
```

However, constructor functions remain valuable for understanding JavaScript itself.

They help you understand:

* `this`
* `new`
* objects
* prototypes
* prototype chains
* `instanceof`
* classes
* object identity
* method sharing

This knowledge becomes especially useful when reading older JavaScript code, understanding libraries, debugging unfamiliar code, or preparing for JavaScript interviews.

For your React/Next.js path, you do **not** need to build projects using constructor functions.

But you should understand how they work.

---

# 34. Key Takeaways

1. A constructor function is a normal function intended to be called with `new`.

2. Constructor functions traditionally use PascalCase:

```js
function User() {}
```

3. `new` performs several important operations:

   * creates a new object,
   * connects it to the constructor's prototype,
   * calls the constructor with `this` bound to the new object,
   * returns the resulting instance unless an object/function is explicitly returned.

4. Constructor parameters are used to initialize instance properties:

```js
function User(name) {
  this.name = name;
}
```

5. Every instance created with:

```js
new User(...)
```

is connected to:

```js
User.prototype
```

6. Shared methods can be placed on the prototype:

```js
User.prototype.sayHello = function () {};
```

7. `instanceof` uses the prototype chain to determine whether an object is an instance of a constructor.

8. `new.target` can detect whether a function was called with `new`.

9. Arrow functions cannot be used as constructors.

10. Constructor functions are an important foundation for understanding JavaScript's prototype-based object model.

11. Modern `class` syntax provides a more structured syntax for object-oriented programming while still relying on JavaScript's prototype model.

---

## Next Topic

**`05-prototypes.md`**

The next topic goes deeper into the mechanism that makes constructor functions powerful:

```text
Object
   ↓
[[Prototype]]
   ↓
Prototype Chain
   ↓
Constructor.prototype
   ↓
Shared Methods
   ↓
Inheritance
```
