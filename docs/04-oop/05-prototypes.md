# Prototypes

Prototypes are one of the most important concepts in JavaScript's object model.

JavaScript does not use classical inheritance in the same way as languages such as Java or C++. Instead, JavaScript objects can inherit behavior through a **prototype chain**.

Understanding prototypes explains:

* How objects inherit properties and methods.
* Why `user.toString()` works even when `toString` is not inside `user`.
* How constructor functions share methods.
* How `instanceof` works.
* How `class` syntax works internally.
* Why JavaScript is described as a prototype-based language.

The most important idea is:

> When JavaScript cannot find a property on an object, it can continue searching through that object's prototype chain.

---

# 1. What Is a Prototype?

A **prototype** is an object that another object can use as a source of inherited properties and methods.

Consider:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

The object `user` has its own property:

```js
user.name
```

But it can also access methods that are not directly defined on it:

```js
user.toString();
```

Where does `toString()` come from?

It is inherited through the prototype chain.

Conceptually:

```text
user
  ↓
Object.prototype
  ↓
null
```

`toString` exists on:

```js
Object.prototype
```

not directly on:

```js
user
```

---

# 2. JavaScript Objects Have an Internal Prototype

Every ordinary JavaScript object has an internal `[[Prototype]]` relationship.

You cannot directly write:

```js
user.[[Prototype]]
```

because `[[Prototype]]` is an internal specification-level mechanism.

You can inspect it using:

```js
Object.getPrototypeOf(user);
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq"
};

console.log(Object.getPrototypeOf(user));
```

For a normal object literal, the result is:

```text
Object.prototype
```

Conceptually:

```text
user
  │
  │ [[Prototype]]
  ▼
Object.prototype
  │
  ▼
null
```

---

# 3. The Prototype Chain

The **prototype chain** is the sequence of objects JavaScript searches when looking for a property.

Example:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

When you execute:

```js
user.name
```

JavaScript first checks:

```text
user
```

It finds:

```text
name
```

and stops.

But when you execute:

```js
user.toString()
```

JavaScript checks:

```text
user
```

It does not find:

```text
toString
```

So JavaScript continues to:

```text
Object.prototype
```

There it finds:

```text
toString
```

The lookup can be visualized as:

```text
user
 ↓
Object.prototype
 ↓
null
```

This is the prototype chain.

---

# 4. Property Lookup

Prototype inheritance becomes clearer when you understand property lookup.

Consider:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

When JavaScript evaluates:

```js
user.name
```

it essentially performs:

```text
1. Look for "name" on user.
2. Found it.
3. Return its value.
```

Now:

```js
user.toString
```

Conceptually:

```text
1. Look for "toString" on user.
2. Not found.
3. Look at user.[[Prototype]].
4. Look for "toString" there.
5. Found it on Object.prototype.
6. Return the function.
```

This process continues until:

```text
null
```

is reached.

---

# 5. `Object.getPrototypeOf()`

The recommended modern way to inspect an object's prototype is:

```js
Object.getPrototypeOf(object)
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq"
};

console.log(
  Object.getPrototypeOf(user) === Object.prototype
);
```

Output:

```text
true
```

This demonstrates that the object created using an object literal normally inherits from:

```js
Object.prototype
```

---

# 6. `Object.setPrototypeOf()`

JavaScript also provides:

```js
Object.setPrototypeOf()
```

to change an object's prototype.

Example:

```js
const developer = {
  code() {
    return "Writing JavaScript";
  }
};

const user = {
  name: "Osama Abu Motlaq"
};

Object.setPrototypeOf(user, developer);

console.log(user.code());
```

Output:

```text
Writing JavaScript
```

Why?

Because:

```text
user
 ↓
developer
```

When JavaScript cannot find:

```js
user.code
```

on `user`, it checks the prototype:

```js
developer
```

and finds `code`.

---

# 7. Why `Object.setPrototypeOf()` Should Usually Be Avoided

Although it works, changing prototypes dynamically with:

```js
Object.setPrototypeOf()
```

can negatively affect JavaScript engine optimizations.

For normal application code, it is usually better to establish the prototype relationship when creating the object.

For example:

```js
Object.create(prototype)
```

or constructor/class patterns.

Use `Object.setPrototypeOf()` when you specifically need to modify an existing object's prototype and understand the implications.

---

# 8. `Object.create()`

`Object.create()` creates a new object with a specified prototype.

Example:

```js
const developer = {
  code() {
    return "Writing JavaScript";
  }
};

const user = Object.create(developer);

user.name = "Osama Abu Motlaq";

console.log(user.code());
```

Output:

```text
Writing JavaScript
```

The relationship is:

```text
user
 ↓
developer
 ↓
Object.prototype
 ↓
null
```

In this example, `developer` becomes the prototype of `user`.

---

# 9. Creating an Object With `null` Prototype

You can create an object with no prototype:

```js
const data = Object.create(null);
```

Its prototype is:

```text
null
```

Therefore:

```js
Object.getPrototypeOf(data) === null
```

is:

```text
true
```

Such objects do not inherit methods from `Object.prototype`.

For example:

```js
const data = Object.create(null);

console.log(data.toString);
```

The result is:

```text
undefined
```

because there is no prototype containing `toString`.

This can be useful for specialized dictionary-like structures where inherited properties are undesirable.

---

# 10. `Object.prototype`

Most ordinary JavaScript objects eventually inherit from:

```js
Object.prototype
```

For example:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

The chain is approximately:

```text
user
 ↓
Object.prototype
 ↓
null
```

`Object.prototype` provides commonly inherited methods such as:

```js
toString()
hasOwnProperty()
valueOf()
isPrototypeOf()
propertyIsEnumerable()
```

Modern code should generally prefer:

```js
Object.hasOwn(object, property)
```

over:

```js
object.hasOwnProperty(property)
```

especially when working with objects that may have unusual prototypes.

---

# 11. Constructor Functions and Prototypes

Prototypes become especially important with constructor functions.

Consider:

```js
function User(name) {
  this.name = name;
}
```

JavaScript gives the function a:

```js
User.prototype
```

object.

You can add a method:

```js
User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

Now create an instance:

```js
const user = new User("Osama Abu Motlaq");
```

The relationship is:

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

works even though `sayHello` is not an own property of `user`.

---

# 12. Why Prototype Methods Are Shared

Consider:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

Create two instances:

```js
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

Both instances find the same function through:

```js
User.prototype
```

Conceptually:

```text
user1 ──┐
        ├──→ User.prototype.sayHello
user2 ──┘
```

This is one of the major benefits of prototypes.

---

# 13. Own Properties vs Inherited Properties

An object can have:

1. **Own properties**
2. **Inherited properties**

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

`name` is an own property:

```js
Object.hasOwn(user, "name");
```

Output:

```text
true
```

But `sayHello` is inherited:

```js
Object.hasOwn(user, "sayHello");
```

Output:

```text
false
```

Yet:

```js
user.sayHello
```

still works.

Why?

Because property lookup continues through the prototype chain.

---

# 14. The `in` Operator

The `in` operator checks whether a property exists anywhere in the object's property chain.

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {};

const user = new User("Osama Abu Motlaq");

console.log("name" in user);
console.log("sayHello" in user);
```

Output:

```text
true
true
```

Why is `sayHello` true?

Because it exists on:

```js
User.prototype
```

even though it is not an own property.

Compare:

```js
Object.hasOwn(user, "sayHello");
```

which returns:

```text
false
```

### Important distinction

```text
Object.hasOwn()
→ own properties only

in
→ own + inherited properties
```

---

# 15. `hasOwnProperty()` and Prototypes

Older JavaScript code commonly uses:

```js
object.hasOwnProperty("name")
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq"
};

console.log(user.hasOwnProperty("name"));
```

Output:

```text
true
```

However, this method itself comes from:

```js
Object.prototype
```

Therefore, it can be shadowed:

```js
const user = {
  name: "Osama Abu Motlaq",
  hasOwnProperty: () => false
};

console.log(user.hasOwnProperty("name"));
```

This returns:

```text
false
```

even though `name` is an own property.

For modern code, prefer:

```js
Object.hasOwn(user, "name");
```

---

# 16. Overriding Inherited Properties

An object can define its own property with the same name as an inherited property.

Example:

```js
const developer = {
  role: "Developer"
};

const user = Object.create(developer);

user.role = "Frontend Developer";

console.log(user.role);
```

Output:

```text
Frontend Developer
```

The lookup finds:

```js
user.role
```

before reaching:

```js
developer.role
```

The own property effectively shadows the inherited property.

Conceptually:

```text
user
 └── role: "Frontend Developer"
       ↑
       found first

developer
 └── role: "Developer"
```

---

# 17. Shadowing

This behavior is called **property shadowing**.

Example:

```js
const prototypeObject = {
  role: "Developer"
};

const user = Object.create(prototypeObject);

console.log(user.role);
```

Output:

```text
Developer
```

Now:

```js
user.role = "Frontend Developer";
```

The object has its own `role`.

Therefore:

```js
console.log(user.role);
```

returns:

```text
Frontend Developer
```

The inherited property still exists:

```js
prototypeObject.role
```

but it is hidden by the object's own property during normal lookup.

---

# 18. Deleting a Shadowing Property

Consider:

```js
const prototypeObject = {
  role: "Developer"
};

const user = Object.create(prototypeObject);

user.role = "Frontend Developer";

console.log(user.role);
```

Output:

```text
Frontend Developer
```

Now delete the own property:

```js
delete user.role;
```

Then:

```js
console.log(user.role);
```

Output:

```text
Developer
```

Why?

The own property disappeared, so JavaScript continues searching the prototype chain.

---

# 19. Prototype Chain Example

Consider:

```js
const base = {
  level: 1
};

const middle = Object.create(base);

middle.level = 2;

const user = Object.create(middle);

user.name = "Osama Abu Motlaq";
```

The prototype chain is:

```text
user
 ↓
middle
 ↓
base
 ↓
Object.prototype
 ↓
null
```

Now:

```js
user.name
```

is found on:

```text
user
```

```js
user.level
```

is found on:

```text
middle
```

If `middle.level` did not exist, JavaScript would continue to:

```text
base
```

This demonstrates that prototype chains can contain multiple levels.

---

# 20. Prototype Chain Search

When evaluating:

```js
object.property
```

JavaScript conceptually follows this process:

```text
Does object have property?
       │
       ├── Yes → return it
       │
       └── No
            ↓
Does prototype have property?
       │
       ├── Yes → return it
       │
       └── No
            ↓
Continue through prototype chain
            ↓
Reach null
            ↓
Return undefined
```

This is the foundation of JavaScript property inheritance.

---

# 21. Prototype Chain and Methods

The same lookup process applies to methods.

Example:

```js
const user = {
  name: "Osama Abu Motlaq"
};

user.toString();
```

JavaScript searches:

```text
user
 ↓
Object.prototype
```

and finds:

```js
Object.prototype.toString
```

Therefore the method can be called.

The method does not need to physically exist inside every object.

---

# 22. `instanceof`

The `instanceof` operator is closely related to prototypes.

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

Conceptually, JavaScript checks whether:

```text
User.prototype
```

appears somewhere in:

```text
user's prototype chain
```

The chain is:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

Since `User.prototype` is present:

```js
user instanceof User
```

is `true`.

---

# 23. `instanceof` Is About the Prototype Chain

Consider:

```js
const developer = {
  role: "Frontend Developer"
};

const user = Object.create(developer);
```

Now:

```js
console.log(user instanceof Object);
```

is normally:

```text
true
```

because the chain eventually reaches:

```js
Object.prototype
```

But:

```js
console.log(user instanceof User);
```

would only be `true` if:

```js
User.prototype
```

were part of the chain.

This is why `instanceof` should be understood in terms of prototypes rather than simply constructor names.

---

# 24. `prototype` vs `[[Prototype]]`

This distinction is extremely important.

These two concepts are related but different:

```js
User.prototype
```

and:

```text
object.[[Prototype]]
```

### `prototype`

A normal function has a `prototype` property.

For example:

```js
function User() {}

console.log(User.prototype);
```

This object is used as the prototype of instances created with:

```js
new User()
```

### `[[Prototype]]`

An object has an internal `[[Prototype]]` relationship.

You can inspect it with:

```js
Object.getPrototypeOf(object);
```

For example:

```js
function User() {}

const user = new User();

console.log(
  Object.getPrototypeOf(user) === User.prototype
);
```

Output:

```text
true
```

So:

```text
User.prototype
```

is an object.

While:

```text
user.[[Prototype]]
```

is the internal relationship pointing to that object.

---

# 25. A Common Source of Confusion

Do not think:

```text
object.prototype
```

is the same thing as:

```text
object's prototype
```

For normal objects, the property:

```js
user.prototype
```

usually does not exist.

Instead:

```js
Object.getPrototypeOf(user)
```

returns the object's actual prototype.

For constructor functions:

```js
User.prototype
```

does exist.

This distinction is critical.

---

# 26. The `__proto__` Property

JavaScript also exposes a legacy accessor commonly written as:

```js
object.__proto__
```

For example:

```js
const user = {};

console.log(user.__proto__ === Object.prototype);
```

Output:

```text
true
```

However, `__proto__` is considered legacy syntax for most code.

Prefer:

```js
Object.getPrototypeOf(user);
```

to inspect a prototype.

And prefer:

```js
Object.setPrototypeOf(user, prototype);
```

when you explicitly need to modify it.

---

# 27. `__proto__` in Object Literals

There is a special object-literal behavior involving:

```js
__proto__
```

For example:

```js
const developer = {
  code() {
    return "Writing JavaScript";
  }
};

const user = {
  __proto__: developer,
  name: "Osama Abu Motlaq"
};
```

Here, the object's prototype is set to `developer`.

Then:

```js
console.log(user.code());
```

works.

However, this syntax is easy to confuse with an ordinary property named `__proto__`.

For general code, prefer explicit prototype APIs when the prototype relationship is the important part.

---

# 28. `Object.prototype.isPrototypeOf()`

You can ask whether an object appears in another object's prototype chain.

Example:

```js
const developer = {
  code() {
    return "Writing JavaScript";
  }
};

const user = Object.create(developer);

console.log(developer.isPrototypeOf(user));
```

Output:

```text
true
```

This means:

```text
developer
```

appears somewhere in:

```text
user's prototype chain
```

---

# 29. `Object.create()` and Constructor Functions

Constructor functions and `Object.create()` demonstrate the same prototype concept in different ways.

Constructor:

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

The resulting relationship is:

```text
user
 ↓
User.prototype
```

With `Object.create()`:

```js
const user = Object.create(User.prototype);

user.name = "Osama Abu Motlaq";
```

The relationship is also:

```text
user
 ↓
User.prototype
```

The constructor call additionally performs initialization through the function.

This helps explain what `new` does.

---

# 30. Manually Reproducing Part of `new`

Consider:

```js
function User(name) {
  this.name = name;
}

const user = new User("Osama Abu Motlaq");
```

Conceptually, much of the behavior can be represented as:

```js
const user = Object.create(User.prototype);

User.call(user, "Osama Abu Motlaq");
```

This is not a complete implementation of `new`, but it demonstrates two critical operations:

```text
Object.create(User.prototype)
        ↓
prototype connection

User.call(user, ...)
        ↓
constructor execution with this = user
```

This is a powerful mental model for understanding constructor functions.

---

# 31. Prototype Methods Can Use `this`

Consider:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

When you call:

```js
const user = new User("Osama Abu Motlaq");

user.sayHello();
```

`this` inside `sayHello` refers to:

```js
user
```

not:

```js
User.prototype
```

Why?

Because the method is called as:

```js
user.sayHello()
```

The receiver of the call is `user`.

This connects prototype methods directly to the `this` rules discussed in `03-this-keyword.md`.

---

# 32. Prototype Methods Are Not Copied Into Instances

Consider:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

You might imagine:

```js
user
```

contains:

```js
{
  name: "Osama Abu Motlaq",
  sayHello: function () {}
}
```

But that is not what happens.

The object primarily has:

```js
{
  name: "Osama Abu Motlaq"
}
```

and its prototype provides:

```js
sayHello
```

The relationship is:

```text
user
 ├── name
 │
 └── [[Prototype]]
       ↓
   User.prototype
       └── sayHello
```

This distinction is fundamental.

---

# 33. Checking Own Properties

You can inspect own properties with:

```js
Object.keys(user);
```

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {};

const user = new User("Osama Abu Motlaq");

console.log(Object.keys(user));
```

Output:

```text
["name"]
```

The inherited method does not appear because:

```js
sayHello
```

is not an own property of `user`.

---

# 34. Prototype Properties Can Be Data Too

Prototypes do not only contain methods.

They can contain ordinary properties.

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.type = "user";

const user = new User("Osama Abu Motlaq");

console.log(user.type);
```

Output:

```text
user
```

The property is inherited.

```js
Object.hasOwn(user, "type");
```

returns:

```text
false
```

while:

```js
"type" in user
```

returns:

```text
true
```

---

# 35. Be Careful With Mutable Prototype Properties

This pattern can cause bugs:

```js
function User(name) {
  this.name = name;
}

User.prototype.skills = [];
```

Now every instance can access the same array:

```js
const user1 = new User("Osama Abu Motlaq");
const user2 = new User("Osama Abu Motlaq");

user1.skills.push("React");

console.log(user2.skills);
```

Output:

```text
["React"]
```

Why?

Because the array exists on:

```js
User.prototype
```

and both objects inherit the same array.

For per-instance mutable data, initialize it inside the constructor:

```js
function User(name) {
  this.name = name;
  this.skills = [];
}
```

Now each instance gets its own array.

---

# 36. Prototype Chain and `null`

Every prototype chain eventually ends at:

```js
null
```

For ordinary objects:

```text
object
 ↓
Object.prototype
 ↓
null
```

For constructor-created objects:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

When JavaScript reaches `null`, property lookup stops.

If the property was not found:

```js
object.missingProperty
```

returns:

```js
undefined
```

---

# 37. Built-in Objects Also Use Prototypes

Prototypes are not only for custom objects.

JavaScript's built-in types use prototypes too.

For example:

```js
const message = "Hello";
```

You can call:

```js
message.toUpperCase();
```

The method comes from:

```js
String.prototype
```

Similarly:

```js
const numbers = [1, 2, 3];

numbers.map(...);
```

uses methods from:

```js
Array.prototype
```

And:

```js
const user = {};
```

inherits from:

```js
Object.prototype
```

This means prototypes are part of JavaScript's core runtime model.

---

# 38. Common Prototype Chains

### Plain Object

```text
{}
 ↓
Object.prototype
 ↓
null
```

### Array

```text
[]
 ↓
Array.prototype
 ↓
Object.prototype
 ↓
null
```

### Function

Functions are objects too and have their own prototype chain.

### Constructor Instance

```text
new User()
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

Understanding these chains makes JavaScript behavior much easier to predict.

---

# 39. Arrays and Prototypes

Consider:

```js
const numbers = [1, 2, 3];
```

You can call:

```js
numbers.map(number => number * 2);
```

But `map` is not copied into every array individually.

It is available through:

```js
Array.prototype
```

Conceptually:

```text
numbers
 ↓
Array.prototype
 ↓
Object.prototype
 ↓
null
```

This is why all arrays can use methods such as:

```js
map()
filter()
find()
reduce()
forEach()
includes()
```

without every array storing a separate copy of each method.

---

# 40. Strings and Prototypes

Consider:

```js
const message = "JavaScript";
```

You can call:

```js
message.toUpperCase();
```

Methods such as:

```js
toUpperCase()
toLowerCase()
includes()
slice()
```

are associated with:

```js
String.prototype
```

JavaScript temporarily treats primitive strings appropriately when accessing their methods.

This is one reason prototype knowledge helps explain behavior that otherwise appears magical.

---

# 41. Modifying Built-in Prototypes

JavaScript technically allows you to modify built-in prototypes:

```js
Array.prototype.customMethod = function () {
  return "Custom behavior";
};
```

Then:

```js
const numbers = [1, 2, 3];

numbers.customMethod();
```

can work.

However, modifying built-in prototypes is generally discouraged in application code.

It can:

* create unexpected behavior,
* conflict with libraries,
* make code harder to understand,
* create maintenance problems,
* interfere with future language features.

Prefer utility functions or other explicit abstractions.

---

# 42. Prototype Pollution

Prototype pollution is a security-related problem where an attacker or unsafe code modifies an object's prototype in an unintended way.

For example, dangerous code involving dynamic object manipulation can potentially affect:

```js
Object.prototype
```

and consequently many objects.

This is particularly relevant when processing untrusted input and deeply merging objects.

The important defensive principles are:

* Validate untrusted input.
* Avoid unsafe deep-merge implementations.
* Be careful with dynamic property paths.
* Avoid modifying `Object.prototype`.
* Keep dependencies updated.
* Use safe APIs and libraries.

Prototype pollution is an advanced security topic, but understanding prototypes is necessary before the problem makes sense.

---

# 43. Prototypes and Classes

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

The method:

```js
sayHello()
```

is associated with:

```js
User.prototype
```

You can verify this:

```js
console.log(
  User.prototype.hasOwnProperty("sayHello")
);
```

Output:

```text
true
```

And:

```js
console.log(
  Object.hasOwn(user, "sayHello")
);
```

Output:

```text
false
```

So the class syntax still uses the prototype model.

This is why understanding prototypes before studying classes is so important.

---

# 44. Constructor Function → Prototype → Instance

The complete relationship is:

```text
Constructor Function
        │
        │ prototype
        ▼
   User.prototype
        ▲
        │ [[Prototype]]
        │
      instance
```

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

Think:

```text
User
 │
 └── prototype ──→ User.prototype
                       │
                       └── sayHello()

user
 │
 ├── name
 │
 └── [[Prototype]] ──→ User.prototype
```

---

# 45. Prototype vs Inheritance

Prototype-based inheritance means an object can access behavior through another object in its prototype chain.

Example:

```js
const developer = {
  code() {
    return "Writing JavaScript";
  }
};

const user = Object.create(developer);

user.name = "Osama Abu Motlaq";
```

Here:

```text
user
 ↓
developer
```

`user` inherits access to:

```js
code()
```

This is different from copying the method.

The method remains on the prototype object.

---

# 46. Prototype Inheritance Is Delegation

A useful mental model is **delegation**.

When an object does not have a property itself, it delegates the lookup to its prototype.

Example:

```text
user
 │
 │ "Do you have code?"
 ▼
developer
 │
 │ "Yes."
 ▼
code()
```

Therefore prototype inheritance can be understood as:

> "If I do not have this property, look somewhere else in my prototype chain."

This is often a better mental model than imagining that properties are physically copied from parent objects.

---

# 47. Prototype Chain vs Object Composition

Prototype inheritance is not the only way to reuse behavior.

JavaScript also supports composition.

For example:

```js
const canCode = {
  code() {
    return "Writing JavaScript";
  }
};

function createUser(name) {
  return {
    name,
    ...canCode
  };
}
```

Here the method is copied into the created object rather than inherited through a prototype.

Another approach is delegation through prototypes:

```js
const user = Object.create(canCode);
```

Both are possible.

Modern JavaScript applications frequently use composition because it can make relationships explicit and flexible.

---

# 48. Common Mistakes

## Mistake 1: Confusing `prototype` With `[[Prototype]]`

Remember:

```js
User.prototype
```

is a property of the constructor function.

While:

```js
Object.getPrototypeOf(user)
```

returns the object's prototype.

---

## Mistake 2: Assuming Methods Are Copied

If:

```js
User.prototype.sayHello = function () {};
```

then:

```js
user.sayHello
```

does not mean the function was copied into `user`.

It is inherited through the prototype chain.

---

## Mistake 3: Using Mutable Prototype Data

Avoid:

```js
User.prototype.skills = [];
```

for per-instance state.

Use:

```js
function User(name) {
  this.name = name;
  this.skills = [];
}
```

instead.

---

## Mistake 4: Modifying Built-in Prototypes

Avoid:

```js
Array.prototype.customMethod = ...
```

unless you have a very specific reason and understand the consequences.

---

## Mistake 5: Thinking `instanceof` Checks Constructor History

`instanceof` is fundamentally based on the prototype chain.

If the prototype relationship changes, `instanceof` behavior can change as well.

---

# 49. Best Practices

### 1. Understand property lookup

Always know that JavaScript can search:

```text
object
 ↓
prototype
 ↓
prototype's prototype
 ↓
...
 ↓
null
```

### 2. Use `Object.getPrototypeOf()` for inspection

Prefer:

```js
Object.getPrototypeOf(object);
```

over relying on legacy:

```js
object.__proto__;
```

### 3. Use `Object.hasOwn()` for own-property checks

Prefer:

```js
Object.hasOwn(object, "property");
```

when you need to determine whether a property belongs directly to the object.

### 4. Put shared behavior on prototypes when using constructor functions

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};
```

### 5. Keep instance-specific mutable data on the instance

Example:

```js
function User(name) {
  this.name = name;
  this.skills = [];
}
```

### 6. Avoid unnecessary prototype manipulation

Do not use:

```js
Object.setPrototypeOf()
```

as a general-purpose object composition technique.

### 7. Avoid modifying built-in prototypes

Prefer explicit utility functions or application-level abstractions.

---

# 50. Quick Reference

| Concept                   | Meaning                                                                        |
| ------------------------- | ------------------------------------------------------------------------------ |
| Prototype                 | Object used as a source of inherited properties and methods                    |
| `[[Prototype]]`           | Internal relationship between an object and its prototype                      |
| `Object.getPrototypeOf()` | Reads an object's prototype                                                    |
| `Object.setPrototypeOf()` | Changes an object's prototype                                                  |
| `Object.create()`         | Creates an object with a specified prototype                                   |
| `User.prototype`          | Prototype object used by instances created with `new User()`                   |
| Prototype chain           | Sequence of prototype objects searched during property lookup                  |
| `Object.hasOwn()`         | Checks for an own property                                                     |
| `in`                      | Checks own and inherited properties                                            |
| `instanceof`              | Checks whether a constructor's prototype exists in an object's prototype chain |
| `__proto__`               | Legacy accessor for an object's prototype                                      |
| `Object.prototype`        | Common ancestor prototype for ordinary objects                                 |
| Shadowing                 | An own property hides an inherited property with the same name                 |

---

# 51. Mental Model

When you see:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  return `Hello, ${this.name}.`;
};

const user = new User("Osama Abu Motlaq");
```

think:

```text
                    User
                     │
                     │ .prototype
                     ▼
              User.prototype
                     │
                     │
                     ▲
                     │ [[Prototype]]
                     │
                    user
                 ┌───────┐
                 │ name  │
                 └───────┘
                     │
                     │
                     └──── sayHello()
                           found on
                           User.prototype
```

And the complete chain:

```text
user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null
```

When you execute:

```js
user.sayHello();
```

JavaScript conceptually asks:

```text
Does user have sayHello?
        ↓
      No
        ↓
Does User.prototype have sayHello?
        ↓
      Yes
        ↓
Call it with this = user
```

That is the essence of prototype-based behavior.

---

# 52. Why Prototypes Matter

Prototypes are not just an old OOP feature.

They explain fundamental JavaScript behavior.

When you use:

```js
[]
```

you are interacting with:

```js
Array.prototype
```

When you use:

```js
"Hello".toUpperCase()
```

you are interacting with:

```js
String.prototype
```

When you use:

```js
{}
```

you are normally connected to:

```js
Object.prototype
```

When you use:

```js
new User()
```

the resulting object is connected to:

```js
User.prototype
```

When you use:

```js
class User {}
```

the class's instance methods are also associated with:

```js
User.prototype
```

Therefore:

> Prototypes are a fundamental part of JavaScript, not merely an advanced OOP feature.

---

# 53. React Relevance

**Relevance to modern React: Medium for JavaScript fundamentals, Low for day-to-day React code.**

You normally do not manipulate prototypes while building React components.

Modern React code primarily uses:

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

However, prototype knowledge is valuable because JavaScript objects and built-in types are everywhere in React and Next.js applications.

For example:

```js
const projects = [];
```

uses:

```js
Array.prototype
```

and:

```js
projects.map(...)
```

depends on prototype-provided behavior.

Understanding prototypes also helps when:

* reading third-party libraries,
* debugging unfamiliar JavaScript,
* understanding classes,
* understanding inheritance,
* preparing for JavaScript interviews,
* working with older JavaScript code,
* understanding how built-in objects work.

You do **not** need to write prototype-heavy code in your React portfolio.

But you should understand the mechanism.

---

# 54. Key Takeaways

1. A prototype is an object from which another object can inherit properties and methods.

2. JavaScript uses prototype chains for property lookup.

3. A typical object chain looks like:

```text
object
 ↓
Object.prototype
 ↓
null
```

4. An instance created by a constructor function usually has:

```text
instance
 ↓
Constructor.prototype
 ↓
Object.prototype
 ↓
null
```

5. JavaScript searches the prototype chain when a property is not found directly on an object.

6. Prototype methods are shared rather than copied into every instance.

7. `Object.getPrototypeOf()` is the preferred way to inspect an object's prototype.

8. `User.prototype` and an object's `[[Prototype]]` are related but different concepts.

9. `instanceof` works by examining the prototype chain.

10. `Object.hasOwn()` checks only own properties, while `in` includes inherited properties.

11. Avoid placing mutable per-instance data on a shared prototype.

12. Avoid modifying built-in prototypes in normal application code.

13. JavaScript classes still rely on the prototype model.

14. Understanding prototypes is essential for understanding how JavaScript OOP actually works.

---

## Next Topic

**`06-classes.md`**

The next topic introduces JavaScript `class` syntax and connects it directly to everything learned so far:

```text
Objects
   ↓
this
   ↓
Constructor Functions
   ↓
Prototypes
   ↓
Classes
   ↓
Inheritance
```

The goal is not simply to learn class syntax, but to understand what JavaScript classes are doing on top of the prototype system.
