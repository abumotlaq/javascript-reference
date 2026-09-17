# JavaScript Prototypes Deep Dive

## Overview

JavaScript uses prototypes as a fundamental mechanism for object inheritance and property lookup.

Unlike class-based languages where inheritance is traditionally described through classes, JavaScript objects can directly inherit from other objects through an internal prototype relationship.

The key concepts are:

* Prototype objects
* Prototype chains
* `[[Prototype]]`
* `Object.getPrototypeOf()`
* `Object.setPrototypeOf()`
* `Object.create()`
* `__proto__`
* `prototype` on constructor functions
* Constructor functions
* Classes
* Inheritance
* Property lookup
* Method lookup
* Shadowing
* `hasOwn()`
* `in`
* `instanceof`
* `constructor`
* Prototype pollution

Understanding prototypes is important because:

```text
Objects
Classes
Inheritance
Methods
instanceof
Property lookup
JavaScript internals
```

all depend heavily on the prototype system.

---

# What Is a Prototype?

A prototype is another object that an object can inherit properties and methods from.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

Every ordinary object has an internal prototype relationship.

Conceptually:

```text
user
  |
  v
Prototype Object
```

The internal relationship is represented by the specification-level internal slot:

```text
[[Prototype]]
```

---

# `[[Prototype]]`

The internal prototype of an object can be inspected with:

```js
Object.getPrototypeOf()
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const prototype =
  Object.getPrototypeOf(user);

console.log(prototype);
```

For ordinary object literals, this is typically:

```js
Object.prototype
```

So:

```js
Object.getPrototypeOf(user) ===
Object.prototype
```

is usually:

```text
true
```

---

# Prototype Chain

Objects can inherit from objects that themselves inherit from other objects.

Example:

```text
user
  |
  v
Object.prototype
  |
  v
null
```

This is a prototype chain.

Property lookup can travel through this chain.

---

# Property Lookup

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  user.toString()
);
```

The object itself does not define:

```text
toString
```

JavaScript continues searching its prototype.

Conceptually:

```text
user
 |
 | toString not found
 v
Object.prototype
 |
 | toString found
 v
Function
```

The method can then be called.

---

# Property Lookup Algorithm

A simplified lookup process is:

```text
Start at object
      |
      v
Property exists?
   |       |
  Yes      No
   |       |
   v       v
Return    Check [[Prototype]]
             |
             v
        Prototype exists?
          |          |
         Yes         No
          |           |
          v           v
     Search again    undefined
```

---

# Own Properties

An own property belongs directly to the object.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.hasOwn(
    user,
    "name"
  )
);
```

Result:

```text
true
```

---

# Inherited Properties

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  "toString" in user
);
```

Result:

```text
true
```

The property is not an own property.

It is inherited through the prototype chain.

---

# `Object.hasOwn()`

Use:

```js
Object.hasOwn()
```

when you want to check only the object's own properties.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.hasOwn(
    user,
    "name"
  )
);

console.log(
  Object.hasOwn(
    user,
    "toString"
  )
);
```

Output:

```text
true
false
```

---

# The `in` Operator

The `in` operator checks the object and its prototype chain.

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  "name" in user
);

console.log(
  "toString" in user
);
```

Output:

```text
true
true
```

---

# `hasOwn()` vs `in`

Compare:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.hasOwn(
    user,
    "toString"
  )
);

console.log(
  "toString" in user
);
```

Result:

```text
false
true
```

The difference is:

```text
Object.hasOwn()
→ own properties only

in
→ own + inherited properties
```

---

# `Object.prototype`

Most ordinary objects inherit from:

```js
Object.prototype
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.getPrototypeOf(user) ===
    Object.prototype
);
```

The result is normally:

```text
true
```

---

# `Object.prototype` Methods

Common methods inherited through `Object.prototype` include:

```text
toString
valueOf
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  user.toString()
);
```

---

# Prototype Chain Ends at `null`

The top-level ordinary object prototype eventually points to:

```js
null
```

Conceptually:

```text
user
 |
 v
Object.prototype
 |
 v
null
```

You can inspect it:

```js
console.log(
  Object.getPrototypeOf(
    Object.prototype
  )
);
```

Result:

```text
null
```

---

# Creating an Object With `Object.create()`

`Object.create()` allows you to explicitly choose an object's prototype.

Example:

```js
const userPrototype = {
  sayHello() {
    return "Hello";
  },
};

const user =
  Object.create(
    userPrototype
  );

user.name =
  "Osama Abu Motlaq";

console.log(
  user.sayHello()
);
```

The relationship is:

```text
user
 |
 v
userPrototype
 |
 v
Object.prototype
 |
 v
null
```

Depending on the exact prototype object used.

---

# `Object.create(null)`

You can create an object with no prototype:

```js
const dictionary =
  Object.create(null);

dictionary.name =
  "Osama Abu Motlaq";

console.log(
  Object.getPrototypeOf(
    dictionary
  )
);
```

Result:

```text
null
```

This object does not inherit from `Object.prototype`.

---

# Prototype-Free Objects

Because a prototype-free object has no inherited properties:

```js
const dictionary =
  Object.create(null);

console.log(
  "toString" in dictionary
);
```

Result:

```text
false
```

This pattern can be useful for specialized dictionary-like data structures.

---

# `__proto__`

Objects may expose the legacy accessor:

```js
__proto__
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  user.__proto__
);
```

For ordinary objects, this commonly exposes their prototype.

However:

```text
__proto__
```

is legacy-oriented and should generally not be the preferred API for prototype manipulation.

Prefer:

```text
Object.getPrototypeOf()
Object.setPrototypeOf()
Object.create()
```

---

# Reading a Prototype

Preferred approach:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const prototype =
  Object.getPrototypeOf(user);

console.log(
  prototype
);
```

---

# Changing a Prototype

JavaScript provides:

```js
Object.setPrototypeOf()
```

Example:

```js
const userPrototype = {
  greet() {
    return "Hello";
  },
};

const user = {
  name: "Osama Abu Motlaq",
};

Object.setPrototypeOf(
  user,
  userPrototype
);

console.log(
  user.greet()
);
```

The resulting chain becomes:

```text
user
 |
 v
userPrototype
 |
 v
Object.prototype
 |
 v
null
```

---

# Why `Object.setPrototypeOf()` Should Be Used Carefully

Changing an object's prototype after creation can interfere with engine optimizations.

For performance-sensitive code, it is generally better to create objects with the intended prototype from the beginning.

Prefer:

```js
const user =
  Object.create(
    userPrototype
  );
```

over repeatedly changing prototypes later:

```js
Object.setPrototypeOf(
  user,
  userPrototype
);
```

---

# Prototype Methods

Consider:

```js
const userPrototype = {
  greet() {
    return `Hello, ${this.name}!`;
  },
};

const user =
  Object.create(
    userPrototype
  );

user.name =
  "Osama Abu Motlaq";

console.log(
  user.greet()
);
```

The method is stored on the prototype.

The data property:

```text
name
```

belongs to the instance.

The method:

```text
greet
```

comes from the prototype.

---

# Sharing Methods

Suppose many objects use the same behavior.

Without a shared prototype:

```js
const firstUser = {
  name: "Osama Abu Motlaq",

  greet() {
    return `Hello, ${this.name}!`;
  },
};

const secondUser = {
  name: "Osama Abu Motlaq - Developer",

  greet() {
    return `Hello, ${this.name}!`;
  },
};
```

Each object contains its own function value.

With a prototype:

```js
const userPrototype = {
  greet() {
    return `Hello, ${this.name}!`;
  },
};

const firstUser =
  Object.create(
    userPrototype
  );

const secondUser =
  Object.create(
    userPrototype
  );

firstUser.name =
  "Osama Abu Motlaq";

secondUser.name =
  "Osama Abu Motlaq - Developer";
```

Both objects can use the same prototype method.

---

# Prototype Method Uses Dynamic `this`

Consider:

```js
const userPrototype = {
  greet() {
    return `Hello, ${this.name}!`;
  },
};

const firstUser =
  Object.create(
    userPrototype
  );

const secondUser =
  Object.create(
    userPrototype
  );

firstUser.name =
  "Osama Abu Motlaq";

secondUser.name =
  "Osama Abu Motlaq - Developer";

console.log(
  firstUser.greet()
);

console.log(
  secondUser.greet()
);
```

The same prototype method is used.

But:

```text
this
```

depends on which object invokes the method.

---

# Prototype Property Shadowing

An object can define its own property with the same name as an inherited property.

Example:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

console.log(
  user.role
);
```

JavaScript finds:

```text
prototype.role
```

Now define an own property:

```js
user.role =
  "Computer Science Student";
```

The object now has its own `role`.

Property lookup finds the own property first.

---

# Shadowing Diagram

```text
user
 |
 ├── role → "Computer Science Student"
 |
 v
prototype
 |
 └── role → "Frontend Developer"
```

The inherited property still exists.

It is simply shadowed by the own property.

---

# Reading the Prototype Property

```js
console.log(
  Object.getPrototypeOf(
    user
  ).role
);
```

This explicitly accesses the prototype's property.

---

# `delete` Reveals the Prototype Property

Example:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.role =
  "Computer Science Student";

console.log(
  user.role
);

delete user.role;

console.log(
  user.role
);
```

The output changes because deleting the own property exposes the inherited property again.

---

# Property Lookup Does Not Copy Properties

Consider:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );
```

The value of:

```js
user.role
```

is accessible through inheritance.

But the property is not copied into `user`.

You can verify:

```js
console.log(
  Object.hasOwn(
    user,
    "role"
  )
);
```

Result:

```text
false
```

---

# `Object.keys()` and Inherited Properties

`Object.keys()` returns enumerable own properties.

Example:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

console.log(
  Object.keys(user)
);
```

The result contains:

```text
name
```

The inherited `role` is not included.

---

# `for...in` and Inherited Enumerable Properties

`for...in` can iterate over enumerable properties from the object and its prototype chain.

Example:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

for (
  const key in user
) {
  console.log(key);
}
```

Depending on enumerability, inherited properties can appear.

To restrict processing to own properties:

```js
for (
  const key in user
) {
  if (
    Object.hasOwn(
      user,
      key
    )
  ) {
    console.log(key);
  }
}
```

---

# Constructor Functions

Before modern `class` syntax became common, constructor functions were a standard way to create object instances.

Example:

```js
function User(name) {
  this.name = name;
}
```

When called with:

```js
new User(
  "Osama Abu Motlaq"
);
```

the new object is linked to:

```js
User.prototype
```

---

# Constructor Prototype

Every regular function used as a constructor has a `prototype` property.

Example:

```js
function User(name) {
  this.name = name;
}

console.log(
  User.prototype
);
```

This is different from:

```js
Object.getPrototypeOf(
  user
)
```

The distinction is important.

---

# `prototype` vs `[[Prototype]]`

These are not the same thing.

Constructor function:

```js
function User() {}
```

has:

```text
User.prototype
```

An object instance:

```js
const user =
  new User();
```

has an internal:

```text
[[Prototype]]
```

relationship.

The normal constructor relationship is:

```text
user.[[Prototype]]
        |
        v
User.prototype
```

---

# Constructor Example

```js
function User(name) {
  this.name = name;
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

console.log(
  Object.getPrototypeOf(
    user
  ) === User.prototype
);
```

Result:

```text
true
```

---

# Adding Methods to the Constructor Prototype

Instead of creating a new method on every instance:

```js
function User(name) {
  this.name = name;

  this.showName =
    function () {
      console.log(
        this.name
      );
    };
}
```

you can place the method on the prototype:

```js
function User(name) {
  this.name = name;
}

User.prototype.showName =
  function () {
    console.log(
      this.name
    );
  };
```

Now instances share the same method function through the prototype.

---

# Prototype Method Sharing

```js
function User(name) {
  this.name = name;
}

User.prototype.showName =
  function () {
    console.log(
      this.name
    );
  };

const firstUser =
  new User(
    "Osama Abu Motlaq"
  );

const secondUser =
  new User(
    "Osama Abu Motlaq - Developer"
  );

console.log(
  firstUser.showName ===
    secondUser.showName
);
```

Result:

```text
true
```

The same function is found through the shared prototype.

---

# Instance Properties vs Prototype Properties

```js
function User(name) {
  this.name = name;
}

User.prototype.role =
  "Frontend Developer";
```

Now:

```js
const user =
  new User(
    "Osama Abu Motlaq"
  );
```

The structure is conceptually:

```text
user
 |
 ├── name
 |
 v
User.prototype
 |
 └── role
```

---

# Constructor Property

A constructor function's prototype object normally has a:

```text
constructor
```

property pointing back to the constructor function.

Example:

```js
function User(name) {
  this.name = name;
}

console.log(
  User.prototype.constructor ===
    User
);
```

Result:

```text
true
```

---

# Constructor Through an Instance

```js
function User(name) {
  this.name = name;
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

console.log(
  user.constructor ===
    User
);
```

Result:

```text
true
```

The lookup works through:

```text
user
  |
  v
User.prototype
  |
  v
constructor
  |
  v
User
```

---

# Constructor Is Not a Proof of Origin

Be careful with:

```js
user.constructor
```

It is an inherited property by default.

It can be overwritten:

```js
function User(name) {
  this.name = name;
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

user.constructor =
  "Not a constructor";

console.log(
  user.constructor
);
```

Therefore, `constructor` should not be treated as a secure identity mechanism.

---

# `instanceof`

The `instanceof` operator checks whether a constructor's `prototype` exists in the object's prototype chain.

Example:

```js
function User(name) {
  this.name = name;
}

const user =
  new User(
    "Osama Abu Motlaq"
  );

console.log(
  user instanceof User
);
```

Result:

```text
true
```

---

# `instanceof` and the Prototype Chain

Suppose:

```js
function User() {}
function Developer() {}

Developer.prototype =
  Object.create(
    User.prototype
  );

const developer =
  new Developer();
```

The chain can be represented as:

```text
developer
   |
   v
Developer.prototype
   |
   v
User.prototype
   |
   v
Object.prototype
   |
   v
null
```

Therefore:

```js
developer instanceof Developer
```

is:

```text
true
```

and:

```js
developer instanceof User
```

is also:

```text
true
```

because `User.prototype` exists in the chain.

---

# `instanceof Object`

Because ordinary objects usually inherit from `Object.prototype`:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  user instanceof Object
);
```

Result:

```text
true
```

---

# `Object.getPrototypeOf()` vs `instanceof`

These answer different questions.

```js
Object.getPrototypeOf(user)
```

asks:

```text
What is this object's immediate prototype?
```

While:

```js
user instanceof SomeConstructor
```

asks whether:

```text
SomeConstructor.prototype
```

exists somewhere in the object's prototype chain.

---

# `isPrototypeOf()`

An object can check whether it exists in another object's prototype chain.

```js
const prototype = {
  greet() {
    return "Hello";
  },
};

const user =
  Object.create(
    prototype
  );

console.log(
  prototype.isPrototypeOf(
    user
  )
);
```

Result:

```text
true
```

---

# Multi-Level Prototype Chains

Consider:

```js
const grandParent = {
  level: "grandparent",
};

const parent =
  Object.create(
    grandParent
  );

parent.parentValue =
  "parent";

const child =
  Object.create(
    parent
  );

child.childValue =
  "child";
```

The chain is:

```text
child
  |
  v
parent
  |
  v
grandParent
  |
  v
Object.prototype
  |
  v
null
```

---

# Lookup Through Multiple Levels

```js
console.log(
  child.childValue
);

console.log(
  child.parentValue
);

console.log(
  child.level
);
```

JavaScript searches:

```text
child
  ↓
parent
  ↓
grandParent
  ↓
Object.prototype
  ↓
null
```

---

# Property Lookup Stops at the First Match

Consider:

```js
const grandParent = {
  role: "Parent Role",
};

const parent =
  Object.create(
    grandParent
  );

parent.role =
  "Child Role";

const child =
  Object.create(
    parent
  );
```

Now:

```js
console.log(
  child.role
);
```

JavaScript finds the property in:

```text
parent
```

and stops.

It does not continue to `grandParent`.

---

# Prototype Mutation

You can modify a prototype object.

Example:

```js
const userPrototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    userPrototype
  );

console.log(
  user.role
);

userPrototype.role =
  "JavaScript Developer";

console.log(
  user.role
);
```

The object sees the updated inherited value because it still references the same prototype object.

---

# Prototype Mutation Affects All Instances

```js
function User(name) {
  this.name = name;
}

User.prototype.role =
  "Frontend Developer";

const firstUser =
  new User(
    "Osama Abu Motlaq"
  );

const secondUser =
  new User(
    "Osama Abu Motlaq - Developer"
  );

User.prototype.role =
  "JavaScript Developer";

console.log(
  firstUser.role
);

console.log(
  secondUser.role
);
```

Both instances observe the updated prototype property unless they have own properties that shadow it.

---

# Prototype Shadowing

```js
function User(name) {
  this.name = name;
}

User.prototype.role =
  "Frontend Developer";

const firstUser =
  new User(
    "Osama Abu Motlaq"
  );

const secondUser =
  new User(
    "Osama Abu Motlaq - Developer"
  );

firstUser.role =
  "JavaScript Developer";
```

Now:

```text
firstUser
 ├── role → JavaScript Developer
 |
 v
User.prototype
 └── role → Frontend Developer

secondUser
 |
 v
User.prototype
 └── role → Frontend Developer
```

---

# Classes and Prototypes

Classes do not replace prototypes.

They provide a cleaner syntax built on JavaScript's prototype-based object model.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  showName() {
    console.log(
      this.name
    );
  }
}
```

Conceptually:

```text
User
 |
 └── prototype
       |
       └── showName
```

An instance:

```js
const user =
  new User(
    "Osama Abu Motlaq"
  );
```

is linked to:

```text
User.prototype
```

---

# Class Prototype Verification

```js
class User {
  showName() {}
}

const user =
  new User();

console.log(
  Object.getPrototypeOf(
    user
  ) ===
    User.prototype
);
```

Result:

```text
true
```

---

# Class Methods Are Prototype Methods

Consider:

```js
class User {
  showName() {
    console.log(
      this.name
    );
  }
}

const firstUser =
  new User();

const secondUser =
  new User();

console.log(
  firstUser.showName ===
    secondUser.showName
);
```

Result:

```text
true
```

The method is shared through the prototype.

---

# Class Fields Are Different

Example:

```js
class User {
  name =
    "Osama Abu Motlaq";

  showName = () => {
    console.log(
      this.name
    );
  };
}
```

The arrow function field is created per instance rather than being a shared prototype method.

Conceptually:

```text
Instance A
 |
 └── showName → Function A

Instance B
 |
 └── showName → Function B
```

This differs from a normal class method:

```js
class User {
  showName() {}
}
```

where the method is shared through the prototype.

---

# Inheritance With Classes

```js
class User {
  constructor(name) {
    this.name = name;
  }

  showName() {
    return this.name;
  }
}

class Developer extends User {
  showRole() {
    return "Frontend Developer";
  }
}

const developer =
  new Developer(
    "Osama Abu Motlaq"
  );
```

The prototype chain is conceptually:

```text
developer
   |
   v
Developer.prototype
   |
   v
User.prototype
   |
   v
Object.prototype
   |
   v
null
```

---

# `extends` and Prototypes

When:

```js
class Developer extends User {}
```

is used, the derived class prototype is connected to the parent class prototype.

This allows:

```js
developer.showName()
```

to find the method on:

```text
User.prototype
```

---

# Prototype Inheritance Without Classes

The same basic inheritance idea can be expressed directly:

```js
const userPrototype = {
  showName() {
    return this.name;
  },
};

const developerPrototype =
  Object.create(
    userPrototype
  );

developerPrototype.showRole =
  function () {
    return "Frontend Developer";
  };

const developer =
  Object.create(
    developerPrototype
  );

developer.name =
  "Osama Abu Motlaq";

console.log(
  developer.showName()
);

console.log(
  developer.showRole()
);
```

This shows the underlying prototype mechanism more directly.

---

# Function Prototype Chain

Functions themselves are objects.

Consider:

```js
function User() {}

console.log(
  Object.getPrototypeOf(
    User
  )
);
```

A normal function object itself inherits from:

```text
Function.prototype
```

This is different from:

```js
User.prototype
```

which is the object intended to become the prototype of instances created with:

```js
new User()
```

---

# Two Different Prototype Relationships

For:

```js
function User() {}
```

there are two important relationships.

The function object:

```text
User
 |
 v
Function.prototype
```

The constructor's prototype object:

```text
User.prototype
```

And when creating an instance:

```text
user
 |
 v
User.prototype
```

These are not the same relationship.

---

# Function vs Function Prototype

Example:

```js
function User() {}

console.log(
  Object.getPrototypeOf(
    User
  ) ===
    Function.prototype
);

console.log(
  Object.getPrototypeOf(
    new User()
  ) ===
    User.prototype
);
```

Both expressions are:

```text
true
```

but they describe different objects and relationships.

---

# Prototype Chain Inspection

You can walk a prototype chain manually:

```js
const user = {
  name: "Osama Abu Motlaq",
};

let current =
  user;

while (
  current !== null
) {
  console.log(
    current
  );

  current =
    Object.getPrototypeOf(
      current
    );
}
```

The traversal eventually reaches:

```text
null
```

---

# Finding a Property's Origin

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

function findPropertyOwner(
  object,
  property
) {
  let current = object;

  while (
    current !== null
  ) {
    if (
      Object.hasOwn(
        current,
        property
      )
    ) {
      return current;
    }

    current =
      Object.getPrototypeOf(
        current
      );
  }

  return null;
}

console.log(
  findPropertyOwner(
    user,
    "toString"
  )
);
```

The function finds the prototype object that owns the property.

---

# Property Descriptors and Prototypes

Property descriptors also apply to prototype properties.

Example:

```js
const prototype = {
  role: "Frontend Developer",
};

console.log(
  Object.getOwnPropertyDescriptor(
    prototype,
    "role"
  )
);
```

Descriptors contain information such as:

```text
value
writable
enumerable
configurable
```

---

# Defining Prototype Methods

You can define methods with descriptors:

```js
const userPrototype = {};

Object.defineProperty(
  userPrototype,
  "showName",
  {
    value() {
      return this.name;
    },

    enumerable: false,
    configurable: true,
    writable: true,
  }
);
```

This demonstrates that prototype methods are ordinary properties of a prototype object.

---

# Freezing a Prototype

You can freeze a prototype:

```js
const userPrototype = {
  role: "Frontend Developer",

  showRole() {
    return this.role;
  },
};

Object.freeze(
  userPrototype
);
```

After freezing, existing properties cannot normally be modified, removed, or reconfigured.

Objects inheriting from it still exist, but their own properties remain independent.

---

# Sealing a Prototype

```js
const userPrototype = {
  role: "Frontend Developer",
};

Object.seal(
  userPrototype
);
```

A sealed object cannot have properties added or removed, though writable existing properties may still be changed.

---

# Prototype Pollution

Prototype pollution is a security problem where attacker-controlled data changes a prototype in a way that affects unrelated objects.

A dangerous pattern can involve dynamic property assignment such as:

```js
target[
  userProvidedKey
][
  userProvidedProperty
] =
  userProvidedValue;
```

without validating the property path.

The exact vulnerability depends on the surrounding code and data flow.

---

# Why Prototype Pollution Is Dangerous

Suppose code accidentally modifies:

```js
Object.prototype
```

Then unrelated objects may observe unexpected inherited properties.

Conceptually:

```text
Object.prototype
       |
       +── malicious property
       |
       v
Many ordinary objects
```

This can alter application behavior in unexpected ways.

---

# Avoid Modifying `Object.prototype`

Do not casually write:

```js
Object.prototype.isDeveloper =
  true;
```

This affects the prototype chain of ordinary objects.

For example:

```js
const user = {};

console.log(
  user.isDeveloper
);
```

The property can now appear inherited.

---

# Protect Against Prototype Pollution

Validate dynamic property paths before assigning deeply nested data.

Prefer predictable data structures.

Example:

```js
const settings = {
  theme: "dark",
};
```

Instead of blindly applying arbitrary user-controlled keys to nested objects.

---

# `Object.create(null)` for Dictionaries

For some dictionary use cases:

```js
const dictionary =
  Object.create(null);

dictionary["__proto__"] =
  "value";
```

Because there is no inherited `Object.prototype`, the object behaves differently from a normal object.

However, this does not automatically make every dynamic assignment safe.

Input validation remains important.

---

# Prototype Pollution and `__proto__`

The legacy `__proto__` accessor has historically contributed to prototype-related security issues when used incorrectly.

Avoid treating user-controlled property names as trusted.

For example, do not blindly merge arbitrary objects into sensitive structures without understanding the merge behavior.

---

# Safe Data Handling

Prefer explicit structures:

```js
const userPreferences = {
  theme: "dark",
  language: "javascript",
};
```

Validate data before inserting it into application state.

When a key is expected to come from a fixed set:

```js
const allowedKeys = new Set([
  "theme",
  "language",
]);
```

you can validate it:

```js
function isAllowedKey(
  key
) {
  return allowedKeys.has(
    key
  );
}
```

---

# Prototype Chain and `in`

Consider:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

console.log(
  "role" in user
);

console.log(
  Object.hasOwn(
    user,
    "role"
  )
);
```

Output:

```text
true
false
```

This distinction is essential when validating object data.

---

# Prototype Chain and `Object.keys()`

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

console.log(
  Object.keys(user)
);
```

Only the own enumerable property:

```text
name
```

is returned.

---

# Prototype Chain and `Object.entries()`

```js
console.log(
  Object.entries(user)
);
```

Again, only own enumerable properties are returned.

Inherited properties are not included.

---

# Prototype Chain and Spread

Object spread copies own enumerable properties.

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

const copy = {
  ...user,
};

console.log(copy);
```

The inherited `role` is not copied.

---

# Prototype Chain and `Object.assign()`

`Object.assign()` also copies own enumerable properties from source objects.

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

const copy =
  Object.assign(
    {},
    user
  );

console.log(copy);
```

Inherited properties are not copied.

---

# Deep Prototype Chain Example

```js
const levelOne = {
  one: 1,
};

const levelTwo =
  Object.create(
    levelOne
  );

levelTwo.two =
  2;

const levelThree =
  Object.create(
    levelTwo
  );

levelThree.three =
  3;

console.log(
  levelThree.three
);

console.log(
  levelThree.two
);

console.log(
  levelThree.one
);
```

Lookup order:

```text
levelThree
    |
    v
levelTwo
    |
    v
levelOne
```

---

# Prototype Chain Mutation

Suppose:

```js
const firstPrototype = {
  role: "Frontend Developer",
};

const secondPrototype = {
  role: "JavaScript Developer",
};

const user =
  Object.create(
    firstPrototype
  );

console.log(
  user.role
);
```

Now:

```js
Object.setPrototypeOf(
  user,
  secondPrototype
);
```

The lookup path changes.

Now:

```js
console.log(
  user.role
);
```

returns the property from `secondPrototype`.

This demonstrates why prototype mutation changes lookup behavior.

---

# Better Prototype Construction

Instead of changing the prototype later:

```js
const user =
  Object.create(
    firstPrototype
  );

Object.setPrototypeOf(
  user,
  secondPrototype
);
```

prefer creating the object with the intended prototype:

```js
const user =
  Object.create(
    secondPrototype
  );
```

when practical.

---

# Prototype Equality

You can compare prototype references directly:

```js
const prototype = {
  role: "Frontend Developer",
};

const user =
  Object.create(
    prototype
  );

console.log(
  Object.getPrototypeOf(
    user
  ) === prototype
);
```

Result:

```text
true
```

---

# Null Prototype and Equality

```js
const object =
  Object.create(null);

console.log(
  Object.getPrototypeOf(
    object
  ) === null
);
```

Result:

```text
true
```

This gives the object no prototype chain beyond itself.

---

# Prototype Chain and `Object.prototype`

An ordinary object often has this structure:

```text
user
  |
  v
Object.prototype
  |
  v
null
```

A custom prototype can make it:

```text
user
  |
  v
customPrototype
  |
  v
Object.prototype
  |
  v
null
```

A class hierarchy can create:

```text
developer
    |
    v
Developer.prototype
    |
    v
User.prototype
    |
    v
Object.prototype
    |
    v
null
```

---

# Practical Constructor Example

```js
function User(
  name,
  role
) {
  this.name = name;
  this.role = role;
}

User.prototype.showProfile =
  function () {
    return `${this.name} - ${this.role}`;
  };

const user =
  new User(
    "Osama Abu Motlaq",
    "Frontend Developer"
  );

console.log(
  user.showProfile()
);

console.log(
  Object.getPrototypeOf(
    user
  ) === User.prototype
);
```

---

# Practical Class Example

```js
class User {
  constructor(
    name,
    role
  ) {
    this.name = name;
    this.role = role;
  }

  showProfile() {
    return `${this.name} - ${this.role}`;
  }
}

const user =
  new User(
    "Osama Abu Motlaq",
    "Frontend Developer"
  );

console.log(
  user.showProfile()
);

console.log(
  Object.getPrototypeOf(
    user
  ) === User.prototype
);
```

Both examples rely on prototypes.

The class syntax simply provides a more structured syntax for defining constructor behavior and prototype methods.

---

# Prototype Inheritance With `Object.create()`

```js
const userPrototype = {
  showName() {
    return this.name;
  },
};

const developerPrototype =
  Object.create(
    userPrototype
  );

developerPrototype.showRole =
  function () {
    return "Frontend Developer";
  };

const developer =
  Object.create(
    developerPrototype
  );

developer.name =
  "Osama Abu Motlaq";

console.log(
  developer.showName()
);

console.log(
  developer.showRole()
);
```

Chain:

```text
developer
    |
    v
developerPrototype
    |
    v
userPrototype
    |
    v
Object.prototype
    |
    v
null
```

---

# Prototype Chain Debugging

When debugging property lookup:

```js
function explainLookup(
  object,
  property
) {
  let current = object;

  while (
    current !== null
  ) {
    if (
      Object.hasOwn(
        current,
        property
      )
    ) {
      return current;
    }

    current =
      Object.getPrototypeOf(
        current
      );
  }

  return null;
}

const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  explainLookup(
    user,
    "toString"
  )
);

console.log(
  explainLookup(
    user,
    "name"
  )
);
```

This can help visualize where a property actually comes from.

---

# Prototype Chain vs Composition

Prototype inheritance:

```text
Developer
    |
    v
User
```

Composition:

```text
Developer
    |
    +── authentication
    +── storage
    +── logging
```

JavaScript supports both approaches.

For many application architectures, composition can be easier to reason about than deep inheritance.

---

# Prototypes and Classes Are Not the Same Thing

A common misconception is:

```text
JavaScript classes replace prototypes.
```

They do not.

A class instance still has a prototype.

For example:

```js
class User {
  showName() {}
}

const user =
  new User();

console.log(
  Object.getPrototypeOf(
    user
  ) === User.prototype
);
```

The result is:

```text
true
```

---

# Prototype Methods Are Shared

Consider:

```js
class User {
  showName() {
    return this.name;
  }
}

const firstUser =
  new User();

const secondUser =
  new User();

console.log(
  firstUser.showName ===
    secondUser.showName
);
```

Result:

```text
true
```

Both instances resolve the method through the same prototype.

---

# Own Method vs Prototype Method

Own method:

```js
const user = {
  showName() {
    return this.name;
  },
};
```

The function is an own property.

Prototype method:

```js
const prototype = {
  showName() {
    return this.name;
  },
};

const user =
  Object.create(
    prototype
  );
```

The function is inherited.

You can verify:

```js
console.log(
  Object.hasOwn(
    user,
    "showName"
  )
);
```

---

# Prototype Method Overriding

A child prototype can define a method with the same name:

```js
const userPrototype = {
  describe() {
    return "User";
  },
};

const developerPrototype =
  Object.create(
    userPrototype
  );

developerPrototype.describe =
  function () {
    return "Developer";
  };

const developer =
  Object.create(
    developerPrototype
  );

console.log(
  developer.describe()
);
```

The child-level property is found first.

---

# Prototype Method Lookup

```text
developer
   |
   | describe?
   |
   v
developerPrototype
   |
   | describe found
   v
Developer Method
```

The parent method is not called automatically.

The child has shadowed it.

---

# Calling the Parent Prototype Method

You can explicitly access the parent prototype:

```js
const parentResult =
  Object.getPrototypeOf(
    developerPrototype
  ).describe.call(
    developer
  );

console.log(
  parentResult
);
```

This demonstrates how prototype-based inheritance works without class syntax.

---

# `super` Is Prototype-Aware

In classes:

```js
class User {
  describe() {
    return "User";
  }
}

class Developer extends User {
  describe() {
    return `${super.describe()} - Developer`;
  }
}
```

`super` allows access to inherited behavior.

It is not simply an alias for:

```js
this
```

---

# Prototype Pollution Prevention

When merging objects, be careful with untrusted input.

Avoid patterns that blindly copy arbitrary nested paths.

For example:

```js
function unsafeAssign(
  target,
  key,
  value
) {
  target[key] = value;
}
```

The danger grows when the application interprets keys as nested paths and allows access to special prototype-related properties.

---

# Validate Dynamic Keys

```js
const allowedKeys = new Set([
  "name",
  "role",
]);

function setProperty(
  object,
  key,
  value
) {
  if (
    !allowedKeys.has(key)
  ) {
    return false;
  }

  object[key] = value;

  return true;
}
```

Explicitly controlling allowed properties reduces the attack surface.

---

# Avoid Global Prototype Modification

Do not casually change:

```js
Object.prototype
Array.prototype
Function.prototype
```

Example of a dangerous global modification:

```js
Object.prototype.isDeveloper =
  true;
```

This changes behavior for many unrelated objects.

---

# Extending Built-In Prototypes

Although JavaScript allows:

```js
Array.prototype.someMethod =
  function () {};
```

application code should generally avoid modifying built-in prototypes unless there is a strong, controlled reason.

Prototype modifications can:

* Affect unrelated code
* Create naming conflicts
* Change iteration behavior
* Complicate debugging
* Break assumptions made by libraries

---

# Prototype Pollution and Libraries

If a dependency or utility merges untrusted objects incorrectly, it can potentially modify prototype-related properties.

Therefore:

```text
Untrusted Input
      |
      v
Validate
      |
      v
Controlled Object Update
```

is safer than:

```text
Untrusted Input
      |
      v
Blind Deep Merge
```

---

# Prototype Chain Performance

Modern JavaScript engines heavily optimize object property access.

Changing object shapes or prototypes dynamically can interfere with those optimizations.

Potentially expensive patterns include repeatedly changing prototypes:

```js
Object.setPrototypeOf(
  object,
  prototype
);
```

in hot code.

Prefer predictable object structures.

---

# Stable Object Shapes

A predictable structure is easier for engines to optimize.

Example:

```js
function User(
  name,
  role
) {
  this.name = name;
  this.role = role;
}
```

Repeated instances have a consistent structure.

Avoid randomly adding many unrelated properties later when performance is critical.

---

# Prototype Chain Length

Long prototype chains increase the amount of lookup work conceptually.

Example:

```text
Object
  |
  v
Level 1
  |
  v
Level 2
  |
  v
Level 3
  |
  v
Level 4
  |
  v
Object.prototype
```

Normal application code usually does not need extremely deep prototype chains.

Prefer understandable object relationships.

---

# Practical Prototype Inspection

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.getPrototypeOf(
    user
  )
);

console.log(
  Object.getOwnPropertyNames(
    user
  )
);

console.log(
  Object.getOwnPropertyNames(
    Object.getPrototypeOf(
      user
    )
  )
);
```

This can help distinguish:

```text
Own properties
Prototype properties
```

---

# Prototype Chain Walker

```js
function printPrototypeChain(
  object
) {
  let current = object;

  while (
    current !== null
  ) {
    console.log(
      current
    );

    current =
      Object.getPrototypeOf(
        current
      );
  }
}

const user = {
  name: "Osama Abu Motlaq",
};

printPrototypeChain(
  user
);
```

This walks until:

```text
null
```

---

# Practical `instanceof` Example

```js
class User {}

class Developer extends User {}

const developer =
  new Developer();

console.log(
  developer instanceof Developer
);

console.log(
  developer instanceof User
);

console.log(
  developer instanceof Object
);
```

All three can be true because the relevant prototypes exist in the chain.

---

# `instanceof` Is Not a Universal Type Check

For primitives:

```js
console.log(
  10 instanceof Number
);
```

This is:

```text
false
```

because `10` is a primitive number, not a `Number` object.

Similarly:

```js
console.log(
  "JavaScript" instanceof String
);
```

is:

```text
false
```

---

# Wrapper Objects

You can create wrapper objects explicitly:

```js
const number =
  new Number(10);

console.log(
  number instanceof Number
);
```

This is:

```text
true
```

But wrapper objects are usually unnecessary in modern JavaScript.

Prefer primitives:

```js
const number = 10;
```

---

# `Object.prototype` Pollution Example

Do not do this in application code:

```js
Object.prototype.role =
  "Frontend Developer";

const first = {};
const second = {};

console.log(
  first.role
);

console.log(
  second.role
);
```

Both objects can inherit the modified property.

This demonstrates why global prototype modification is dangerous.

---

# Safer Per-Object Behavior

Instead:

```js
const first = {
  role: "Frontend Developer",
};

const second = {
  role: "Frontend Developer",
};
```

or use a dedicated prototype when inheritance is intentional.

---

# Prototype and Data Encapsulation

Prototype methods can provide shared behavior:

```js
function User(name) {
  this.name = name;
}

User.prototype.describe =
  function () {
    return `${this.name} is a user.`;
  };
```

The instance owns the data:

```text
name
```

while behavior can be shared:

```text
describe()
```

---

# Prototype vs Copying

Inheritance:

```js
const user =
  Object.create(
    prototype
  );
```

does not copy all prototype properties into `user`.

Instead:

```text
user
  |
  v
prototype
```

Property lookup travels through the relationship.

---

# Explicit Copying

Object spread:

```js
const copy = {
  ...user,
};
```

creates an own-property copy of the source's own enumerable properties.

It does not copy the entire prototype chain.

---

# Prototype Preservation During Copying

If you need to preserve a prototype relationship, object spread alone is not enough.

Example:

```js
const prototype = {
  greet() {
    return "Hello";
  },
};

const user =
  Object.create(
    prototype
  );

user.name =
  "Osama Abu Motlaq";

const copy =
  Object.create(
    Object.getPrototypeOf(
      user
    ),
    Object.getOwnPropertyDescriptors(
      user
    )
  );

console.log(
  copy.greet()
);
```

This creates a new object with the same prototype and own property descriptors.

---

# `Object.getOwnPropertyDescriptors()`

This API returns descriptors for all own properties.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log(
  Object.getOwnPropertyDescriptors(
    user
  )
);
```

This can be useful for advanced object copying and meta-programming patterns.

---

# Prototype Immutability

You can prevent prototype changes with:

```js
Object.preventExtensions(
  object
);
```

or by controlling the object's prototype and structure more strictly.

For strong prototype control:

```js
Object.freeze(
  prototype
);
```

may be appropriate when the prototype should not change.

---

# Prototype Chain Security

Security-sensitive code should avoid assumptions such as:

```js
if (
  object.isAdmin
) {
  // trusted
}
```

An inherited property could affect the result.

For important own-data checks:

```js
if (
  Object.hasOwn(
    object,
    "isAdmin"
  ) &&
  object.isAdmin === true
) {
  // ...
}
```

The exact authorization design should still use trusted server-side state.

---

# Prototype Chain Mental Model

Whenever you access:

```js
object.property
```

think:

```text
1. Check object own properties.
2. If not found, check [[Prototype]].
3. Continue through the prototype chain.
4. Stop at the first match.
5. If nothing matches, produce undefined.
```

This single model explains much of prototype behavior.

---

# Prototype Deep-Dive Summary

The most important ideas are:

* Every ordinary object has an internal `[[Prototype]]` relationship unless deliberately created without one.
* `Object.getPrototypeOf()` reads that relationship.
* `Object.create()` creates an object with a chosen prototype.
* `Object.setPrototypeOf()` can change a prototype but should be used carefully.
* `__proto__` is a legacy accessor and should generally not be preferred.
* Objects can inherit properties and methods through prototype chains.
* Property lookup begins with own properties and moves upward through the chain.
* `Object.hasOwn()` checks only own properties.
* `in` checks own and inherited properties.
* `Object.prototype` is the usual endpoint before `null` for ordinary objects.
* Constructor functions expose a `.prototype` object used by `new`.
* An instance's `[[Prototype]]` commonly points to the constructor's `.prototype`.
* Class methods are prototype methods.
* `extends` creates prototype relationships between class hierarchies.
* Prototype properties can be shadowed by own properties.
* `instanceof` uses the prototype chain to determine constructor relationships.
* Prototype changes affect property lookup.
* Cyclic prototype relationships should be avoided.
* Modifying built-in prototypes can create global side effects.
* Prototype pollution is a serious security concern when handling untrusted dynamic keys.
* Prototype performance depends on stable object structures and predictable relationships.
* Prototypes are the foundation underneath JavaScript's class syntax.

The central model is:

```text
                 Object
                   |
                   v
              [[Prototype]]
                   |
                   v
             Parent Object
                   |
                   v
              [[Prototype]]
                   |
                   v
             Parent Object
                   |
                   v
                 null
```

And for constructor functions:

```text
Constructor Function
        |
        +── prototype ───────┐
                              |
                              v
                         Instance
                              |
                              v
                    [[Prototype]]
                              |
                              v
                    Constructor.prototype
```

Once the distinction between:

```text
prototype
```

and:

```text
[[Prototype]]
```

is clear, JavaScript inheritance becomes much easier to reason about.
