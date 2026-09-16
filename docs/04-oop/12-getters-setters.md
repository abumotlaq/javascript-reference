# JavaScript Getters and Setters

Getters and setters are special methods that allow objects and classes to control how properties are **read** and **written**.

They are called **accessor properties**.

Instead of writing:

```js
object.getName();
object.setName("Osama Abu Motlaq");
```

you can expose property-like access:

```js
object.name;
object.name = "Osama Abu Motlaq";
```

while still executing logic internally.

Basic example:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}

const osama = new User("Osama Abu Motlaq");

console.log(osama.name);

osama.name = "Osama Abu Motlaq";

console.log(osama.name);
```

The important idea is:

```text
Read property
    ↓
getter runs

Write property
    ↓
setter runs
```

---

# 1. What Is a Getter?

A getter is a special method defined with the `get` keyword.

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
```

You access it like a normal property:

```js
const osama = new User("Osama Abu Motlaq");

console.log(osama.name);
```

You do **not** write:

```js
console.log(osama.name());
```

The getter is invoked automatically when the property is read.

---

# 2. What Is a Setter?

A setter is a special method defined with the `set` keyword.

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  set name(value) {
    this.#name = value;
  }
}
```

You assign to it like a normal property:

```js
osama.name = "Osama Abu Motlaq";
```

JavaScript automatically invokes:

```js
set name(value)
```

---

# 3. Getter and Setter Together

The most common pattern is to use both.

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}

const osama = new User("Osama Abu Motlaq");

console.log(osama.name);

osama.name = "Osama Abu Motlaq";

console.log(osama.name);
```

Conceptually:

```text
osama.name
     ↓
get name()

osama.name = value
     ↓
set name(value)
```

---

# 4. Why Use Getters and Setters?

The main benefit is **controlled property access**.

Without a setter:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

External code can assign anything:

```js
osama.name = 123;
osama.name = null;
osama.name = {};
```

With a setter, validation can happen automatically.

```js
class User {
  #name;

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new TypeError("Name must be a non-empty string.");
    }

    this.#name = value.trim();
  }
}
```

Now:

```js
const osama = new User("Osama Abu Motlaq");

osama.name = "Osama Abu Motlaq";
```

works.

But:

```js
osama.name = 123;
```

throws an error.

---

# 5. Getter Syntax

Inside a class:

```js
get propertyName() {
  return value;
}
```

Example:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
```

The getter should normally return a value.

---

# 6. Setter Syntax

Inside a class:

```js
set propertyName(value) {
  // logic
}
```

Example:

```js
class User {
  #name;

  set name(value) {
    this.#name = value;
  }
}
```

A setter receives exactly **one argument**.

This is important:

```js
set name(value) {}
```

is valid.

But a setter cannot have multiple parameters:

```js
set name(firstName, lastName) {}
```

This is invalid syntax.

If multiple values need to be assigned, use an object:

```js
set name(value) {
  // process value
}
```

or use a normal method.

---

# 7. Getters Are Accessed Like Properties

Consider:

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
```

You write:

```js
osama.name;
```

not:

```js
osama.name();
```

This distinction is fundamental.

A getter provides **property-like syntax** for computed or controlled values.

---

# 8. Getters Can Compute Values

A getter does not have to return a stored field.

It can calculate a value.

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const osama = new User("Osama", "Abu Motlaq");

console.log(osama.fullName);
```

Output:

```text
Osama Abu Motlaq
```

There is no:

```js
this.fullName
```

stored property.

The value is calculated when:

```js
osama.fullName
```

is accessed.

---

# 9. Computed Getters

Getters are particularly useful for values derived from existing state.

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(10, 5);

console.log(rectangle.area);
```

Output:

```text
50
```

You do not need:

```js
rectangle.getArea();
```

The property-like syntax makes the API easier to read:

```js
rectangle.area;
```

---

# 10. Getters Should Usually Be Side-Effect Free

A getter is generally expected to behave like reading a value.

Good:

```js
get fullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

Bad design:

```js
get fullName() {
  console.log("Performing database request...");
  // network request
  // mutate state
  // perform unrelated side effects
}
```

A getter may execute code, but consumers naturally expect property access to be inexpensive and free of surprising side effects.

A useful principle:

> Reading a property should not unexpectedly change application state or perform expensive external operations.

---

# 11. Setters Are Useful for Validation

Setters are commonly used to enforce rules.

```js
class User {
  #age;

  constructor(age) {
    this.age = age;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new TypeError("Age must be a non-negative integer.");
    }

    this.#age = value;
  }
}
```

Now:

```js
const osama = new User(25);

console.log(osama.age);
```

works.

But:

```js
osama.age = -10;
```

throws an error.

---

# 12. Setters Can Normalize Data

A setter can normalize values before storing them.

```js
class User {
  #name;

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value.trim();
  }
}

const osama = new User("  Osama Abu Motlaq  ");

console.log(osama.name);
```

Output:

```text
Osama Abu Motlaq
```

The setter centralizes the normalization logic.

---

# 13. Getter Without a Setter

A property can have a getter but no setter.

```js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

Now:

```js
console.log(osama.fullName);
```

works.

But:

```js
osama.fullName = "Osama Abu Motlaq";
```

does not have a setter to handle the assignment.

In strict mode, assigning to a getter-only property throws a `TypeError`.

Class bodies are strict mode, so this matters for classes.

The correct design may be to update the underlying values instead:

```js
osama.firstName = "Osama";
osama.lastName = "Abu Motlaq";
```

---

# 14. Setter Without a Getter

A setter can exist without a getter.

```js
class User {
  #name;

  set name(value) {
    this.#name = value;
  }
}
```

The property can be written:

```js
osama.name = "Osama Abu Motlaq";
```

but there is no getter to read it through:

```js
osama.name;
```

This can be useful for write-only-style interfaces, although it is less common.

---

# 15. Getters and Setters with Private Fields

This is one of the most useful patterns.

```js
class User {
  #email;

  constructor(email) {
    this.email = email;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (!value.includes("@")) {
      throw new TypeError("Invalid email address.");
    }

    this.#email = value;
  }
}
```

External code sees:

```js
osama.email;
```

and:

```js
osama.email = "example@example.com";
```

But internally:

```text
public property: email
        ↓
private storage: #email
```

This gives the class control over its internal state.

---

# 16. Getters and Setters Are Accessor Properties

JavaScript distinguishes between two major types of object properties.

### Data property

A normal property stores a value:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

### Accessor property

A getter/setter defines behavior for reading and writing:

```js
const user = {
  get name() {
    return "Osama Abu Motlaq";
  }
};
```

The important conceptual difference is:

```text
Data property
    ↓
stores a value

Accessor property
    ↓
defines get/set behavior
```

---

# 17. Object Literal Getters

Getters and setters are not limited to classes.

They can be used in object literals.

```js
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(user.fullName);
```

Output:

```text
Osama Abu Motlaq
```

---

# 18. Object Literal Setters

Example:

```js
const user = {
  _name: "",

  set name(value) {
    this._name = value.trim();
  }
};

user.name = "  Osama Abu Motlaq  ";

console.log(user._name);
```

Output:

```text
Osama Abu Motlaq
```

Remember that:

```js
_name
```

is still a normal public property.

The underscore is only a naming convention.

---

# 19. Property Descriptors

Accessor properties can be understood through property descriptors.

For example:

```js
const user = {
  firstName: "Osama",

  get name() {
    return this.firstName;
  }
};
```

Inspecting the descriptor:

```js
console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);
```

produces a descriptor conceptually similar to:

```js
{
  get: [Function: get name],
  set: undefined,
  enumerable: true,
  configurable: true
}
```

Accessor descriptors use:

```text
get
set
enumerable
configurable
```

instead of:

```text
value
writable
enumerable
configurable
```

This is an important distinction.

---

# 20. Data vs Accessor Descriptors

### Data descriptor

```js
{
  value: "Osama Abu Motlaq",
  writable: true,
  enumerable: true,
  configurable: true
}
```

### Accessor descriptor

```js
{
  get: function,
  set: function,
  enumerable: true,
  configurable: true
}
```

A property descriptor is either fundamentally a **data descriptor** or an **accessor descriptor**.

Do not mix:

```text
value / writable
```

with:

```text
get / set
```

in the same descriptor.

---

# 21. Defining Getters with `Object.defineProperty()`

You can create accessor properties programmatically.

```js
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq"
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.firstName} ${this.lastName}`;
  }
});

console.log(user.fullName);
```

Output:

```text
Osama Abu Motlaq
```

This is useful when working with descriptors dynamically.

However, class syntax and object literal syntax are usually clearer for normal application code.

---

# 22. Defining a Setter with `Object.defineProperty()`

Example:

```js
const user = {
  _name: ""
};

Object.defineProperty(user, "name", {
  get() {
    return this._name;
  },

  set(value) {
    this._name = value.trim();
  }
});

user.name = "  Osama Abu Motlaq  ";

console.log(user.name);
```

Output:

```text
Osama Abu Motlaq
```

---

# 23. Getter `this`

Inside a getter, `this` refers to the object on which the property is accessed.

```js
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(user.fullName);
```

Here:

```js
this
```

refers to:

```js
user
```

The getter follows normal method-style `this` behavior.

---

# 24. Setter `this`

The same principle applies to setters.

```js
class User {
  #name;

  set name(value) {
    this.#name = value;
  }

  get name() {
    return this.#name;
  }
}
```

When:

```js
osama.name = "Osama Abu Motlaq";
```

executes, `this` inside the setter refers to:

```js
osama
```

Therefore:

```js
this.#name
```

belongs to that instance.

---

# 25. Getter/Setter Name Collision with Fields

Be careful when using the same name for a public class field and an accessor.

For example, this design is problematic:

```js
class User {
  name;

  get name() {
    return this.#name;
  }
}
```

A class should have a clear distinction between its storage and accessor names.

A common pattern is:

```js
class User {
  #name;

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}
```

The public API is:

```text
name
```

The internal storage is:

```text
#name
```

---

# 26. Avoid Recursive Getters

A common mistake is:

```js
class User {
  get name() {
    return this.name;
  }
}
```

What happens?

```text
name getter
    ↓
this.name
    ↓
name getter
    ↓
this.name
    ↓
infinite recursion
```

Eventually JavaScript throws a stack overflow error.

Use separate storage:

```js
class User {
  #name;

  get name() {
    return this.#name;
  }
}
```

---

# 27. Avoid Recursive Setters

The same problem can happen with setters.

Incorrect:

```js
class User {
  set name(value) {
    this.name = value;
  }
}
```

The setter calls itself indefinitely.

Correct:

```js
class User {
  #name;

  set name(value) {
    this.#name = value;
  }
}
```

---

# 28. Getter Names Should Represent Values

A getter should usually represent something that behaves conceptually like a value.

Good:

```js
get fullName() {}
get area() {}
get isActive() {}
get total() {}
```

Less appropriate:

```js
get saveToDatabase() {}
get sendEmail() {}
get deleteAccount() {}
```

Operations that perform actions are usually clearer as methods:

```js
saveToDatabase() {}
sendEmail() {}
deleteAccount() {}
```

A useful rule:

> Use getters for values; use methods for actions.

---

# 29. Getters for Boolean State

Getters can make boolean state easy to read.

```js
class User {
  #active = false;

  get isActive() {
    return this.#active;
  }

  activate() {
    this.#active = true;
  }
}

const osama = new User();

console.log(osama.isActive);

osama.activate();

console.log(osama.isActive);
```

Output:

```text
false
true
```

The API reads naturally:

```js
if (osama.isActive) {
  // ...
}
```

---

# 30. Setters for State Transitions

A setter can control how a value changes.

```js
class User {
  #role;

  constructor(role) {
    this.role = role;
  }

  get role() {
    return this.#role;
  }

  set role(value) {
    const validRoles = ["developer", "designer"];

    if (!validRoles.includes(value)) {
      throw new TypeError("Invalid role.");
    }

    this.#role = value;
  }
}
```

Now:

```js
const osama = new User("developer");

osama.role = "designer";
```

works.

But:

```js
osama.role = "invalid";
```

throws an error.

---

# 31. Getters Can Depend on Multiple Properties

A getter can combine multiple pieces of state.

```js
class Product {
  constructor(price, quantity) {
    this.price = price;
    this.quantity = quantity;
  }

  get total() {
    return this.price * this.quantity;
  }
}

const product = new Product(50, 3);

console.log(product.total);
```

Output:

```text
150
```

The total is derived rather than stored.

This can prevent duplicated state.

Instead of storing:

```text
price
quantity
total
```

you can store:

```text
price
quantity
```

and calculate:

```text
total
```

when needed.

---

# 32. Avoid Storing Redundant Derived State

Suppose:

```js
class Product {
  constructor(price, quantity) {
    this.price = price;
    this.quantity = quantity;
    this.total = price * quantity;
  }
}
```

Now if:

```js
product.quantity = 5;
```

the stored `total` may become incorrect.

A getter can avoid this:

```js
class Product {
  constructor(price, quantity) {
    this.price = price;
    this.quantity = quantity;
  }

  get total() {
    return this.price * this.quantity;
  }
}
```

Now:

```js
product.quantity = 5;

console.log(product.total);
```

always calculates the current value.

This is an important design benefit.

---

# 33. Getters and Performance

A getter looks like a simple property:

```js
object.total;
```

but it executes code.

Therefore, do not assume that property access is always a simple memory lookup.

For example:

```js
get expensiveValue() {
  return performExpensiveCalculation();
}
```

may perform significant work every time it is accessed.

For expensive calculations, consider:

* caching,
* memoization,
* an explicit method,
* precomputation,
* or another appropriate design.

Property-like syntax should not hide unexpectedly expensive behavior.

---

# 34. Getters and Asynchronous Operations

Avoid using getters for asynchronous operations.

This is a poor API:

```js
get userData() {
  return fetch("/api/user");
}
```

Now:

```js
const data = osama.userData;
```

looks like a simple property read but actually starts asynchronous work.

A method communicates the operation more clearly:

```js
getUserData() {
  return fetch("/api/user");
}
```

Then:

```js
const data = await osama.getUserData();
```

The API clearly communicates that work is being performed.

---

# 35. Getters and Setters with Inheritance

Getters and setters can be inherited like other class members.

```js
class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

class Developer extends User {}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.name);
```

The child can use the inherited getter.

---

# 36. Overriding a Getter

A subclass can override an inherited getter.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  get description() {
    return `User: ${this.name}`;
  }
}

class Developer extends User {
  get description() {
    return `Developer: ${this.name}`;
  }
}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.description);
```

Output:

```text
Developer: Osama Abu Motlaq
```

---

# 37. Calling a Parent Getter with `super`

A child getter can extend a parent getter.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  get description() {
    return `User: ${this.name}`;
  }
}

class Developer extends User {
  get description() {
    return `${super.description} - JavaScript Developer`;
  }
}

const osama = new Developer("Osama Abu Motlaq");

console.log(osama.description);
```

Output:

```text
User: Osama Abu Motlaq - JavaScript Developer
```

Notice:

```js
super.description
```

does not use parentheses because `description` is an accessor property.

---

# 38. Overriding a Setter

A subclass can also override a setter.

```js
class User {
  #name;

  set name(value) {
    this.#name = value.trim();
  }

  get name() {
    return this.#name;
  }
}

class Developer extends User {
  set name(value) {
    super.name = value.trim().toUpperCase();
  }
}
```

However, when overriding accessors, carefully consider whether the child should preserve the parent's behavior.

Overriding accessors can make class behavior harder to reason about if done unnecessarily.

---

# 39. Getter and Setter Pairing

A getter and setter with the same name form one logical property interface.

```js
class User {
  #name;

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}
```

The external API is:

```js
osama.name;
osama.name = "Osama Abu Motlaq";
```

Internally:

```text
read
 ↓
get name()

write
 ↓
set name(value)
```

This makes the property feel like a normal value while retaining control.

---

# 40. Getters and Setters vs Methods

Consider:

```js
class User {
  getName() {
    return this.#name;
  }

  setName(value) {
    this.#name = value;
  }
}
```

Usage:

```js
osama.getName();
osama.setName("Osama Abu Motlaq");
```

With accessors:

```js
class User {
  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}
```

Usage:

```js
osama.name;
osama.name = "Osama Abu Motlaq";
```

The accessor API is often more natural when the operation conceptually represents a property.

---

# 41. When to Use a Method Instead

Use a method when the operation represents an action.

For example:

```js
user.save();
user.delete();
user.sendEmail();
user.calculateSomething();
```

Use a getter when the result behaves like a value:

```js
user.fullName;
user.isActive;
user.total;
user.age;
```

This is not an absolute rule, but it is a useful API-design guideline.

---

# 42. Getters and Setters in React

Getters and setters are **not a major React pattern** in modern function-component development.

Modern React typically uses:

```text
props
state
hooks
event handlers
derived values
```

For example:

```jsx
function UserProfile({ firstName, lastName }) {
  const fullName = `${firstName} ${lastName}`;

  return <h2>{fullName}</h2>;
}
```

You normally do not need a class getter:

```js
get fullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

However, getters and setters remain useful JavaScript knowledge because:

* They are part of the language.
* They appear in libraries and APIs.
* They are relevant to OOP and class design.
* They appear in technical interviews.
* They help you understand JavaScript property descriptors.
* They are useful when working with non-React JavaScript code.

For your React/Next.js path, understand the concept well, but do not over-prioritize it compared with React state, props, hooks, effects, context, routing, and component composition.

---

# 43. Common Mistakes

## Mistake 1: Calling a getter like a method

Wrong:

```js
osama.name();
```

Correct:

```js
osama.name;
```

---

## Mistake 2: Forgetting to return from a getter

Wrong:

```js
get name() {
  this.#name;
}
```

Correct:

```js
get name() {
  return this.#name;
}
```

---

## Mistake 3: Recursive getter

Wrong:

```js
get name() {
  return this.name;
}
```

Use separate storage:

```js
get name() {
  return this.#name;
}
```

---

## Mistake 4: Recursive setter

Wrong:

```js
set name(value) {
  this.name = value;
}
```

Correct:

```js
set name(value) {
  this.#name = value;
}
```

---

## Mistake 5: Assuming `_name` is private

```js
this._name
```

is still public.

Use:

```js
this.#name
```

for a true private field.

---

## Mistake 6: Putting expensive work behind a getter

Avoid surprising behavior such as:

```js
get data() {
  return performLargeCalculation();
}
```

if the computation is expensive and frequently accessed.

---

## Mistake 7: Using getters for actions

Avoid:

```js
get save() {
  // save data
}
```

Prefer:

```js
save() {
  // save data
}
```

---

# 44. Best Practices

### 1. Use getters for value-like concepts

Good:

```js
get fullName()
get total()
get isActive()
```

### 2. Use setters for controlled assignment

Good for:

* validation,
* normalization,
* maintaining invariants,
* controlling state changes.

### 3. Use private fields as internal storage when appropriate

```js
#name
#balance
#email
```

### 4. Avoid surprising side effects in getters

Property access should generally feel like reading state.

### 5. Avoid unnecessarily expensive getters

A getter can hide computation.

### 6. Avoid recursive accessors

Use separate internal storage.

### 7. Use methods for actions

```js
save()
delete()
send()
update()
```

### 8. Keep the public API intuitive

Prefer:

```js
user.fullName
```

when the concept is naturally a value.

---

# 45. Complete Example

```js
class User {
  #name;
  #age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new TypeError("Name must be a non-empty string.");
    }

    this.#name = value.trim();
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new TypeError("Age must be a non-negative integer.");
    }

    this.#age = value;
  }

  get description() {
    return `${this.#name} is ${this.#age} years old.`;
  }
}

const osama = new User("Osama Abu Motlaq", 25);

console.log(osama.name);
console.log(osama.age);
console.log(osama.description);

osama.age = 26;

console.log(osama.description);
```

Output:

```text
Osama Abu Motlaq
25
Osama Abu Motlaq is 25 years old.
Osama Abu Motlaq is 26 years old.
```

The architecture is:

```text
Public API
├── name
├── age
└── description

Internal state
├── #name
└── #age
```

---

# 46. The Property Access Mental Model

When JavaScript sees:

```js
osama.name;
```

and `name` is a getter, think:

```text
osama.name
    ↓
find "name"
    ↓
find accessor property
    ↓
run get name()
    ↓
return result
```

When JavaScript sees:

```js
osama.name = "Osama Abu Motlaq";
```

think:

```text
assignment
    ↓
find "name"
    ↓
find setter
    ↓
run set name(value)
    ↓
update internal state
```

This mental model is more useful than simply memorizing the `get` and `set` keywords.

---

# 47. Getters, Setters, and Encapsulation

Getters and setters are especially powerful when combined with private fields.

```text
             Public API
                 │
        ┌────────┴────────┐
        ↓                 ↓
     getter            setter
        ↓                 ↓
      read              write
        │                 │
        └────────┬────────┘
                 ↓
            private field
                 ↓
               #name
```

For example:

```js
class User {
  #name;

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}
```

The consumer does not need to know that the actual storage is:

```text
#name
```

This is encapsulation.

---

# 48. Data Property vs Accessor Property

A useful comparison:

### Data property

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

The property directly stores:

```text
"Osama Abu Motlaq"
```

### Accessor property

```js
const user = {
  get name() {
    return "Osama Abu Motlaq";
  }
};
```

The property defines behavior for reading.

Therefore:

```text
Data property
    → value

Accessor property
    → get/set behavior
```

---

# 49. Quick Reference

| Concept           | Syntax                | Purpose                          |
| ----------------- | --------------------- | -------------------------------- |
| Getter            | `get name()`          | Control reading                  |
| Setter            | `set name(value)`     | Control writing                  |
| Read getter       | `object.name`         | Automatically invokes getter     |
| Write setter      | `object.name = value` | Automatically invokes setter     |
| Private storage   | `#name`               | Keep internal state private      |
| Object getter     | `get name() {}`       | Accessor in object literal       |
| Object setter     | `set name(value) {}`  | Accessor in object literal       |
| Descriptor getter | `{ get() {} }`        | Define accessor programmatically |
| Descriptor setter | `{ set(value) {} }`   | Define write behavior            |
| Parent getter     | `super.name`          | Access inherited getter          |
| Derived value     | `get total()`         | Compute value from state         |

---

# 50. Getter vs Setter vs Method

| Feature       | Getter          | Setter                | Method                    |
| ------------- | --------------- | --------------------- | ------------------------- |
| Syntax        | `get name()`    | `set name(value)`     | `name()`                  |
| Called with   | `object.name`   | `object.name = value` | `object.name()`           |
| Main purpose  | Read            | Write                 | Perform operation         |
| Returns value | Usually yes     | No meaningful return  | Usually yes, but optional |
| Parameters    | None            | Exactly one           | Zero or more              |
| Typical use   | Derived state   | Validation            | Actions                   |
| Example       | `user.fullName` | `user.name = value`   | `user.save()`             |

---

# 51. Key Takeaways

1. Getters and setters are **accessor properties**.

2. A getter is declared with:

```js
get propertyName() {}
```

3. A setter is declared with:

```js
set propertyName(value) {}
```

4. Getters are accessed like properties:

```js
object.name;
```

5. Setters are triggered by assignment:

```js
object.name = value;
```

6. Getters are useful for computed or derived values.

7. Setters are useful for validation, normalization, and controlled state changes.

8. Getters and setters can be used in both classes and object literals.

9. Private fields pair naturally with accessors:

```js
#name
```

with:

```js
get name()
set name(value)
```

10. Avoid recursive accessors.

11. Getters should generally avoid surprising side effects.

12. Do not hide expensive or asynchronous operations behind property access unless the API design clearly justifies it.

13. Use methods for actions and getters for value-like concepts.

14. Accessor properties use `get` and `set` descriptors rather than `value` and `writable`.

15. Getters and setters are useful for encapsulation, but they are not a major React pattern in modern function-based React.

---

## Final Mental Model

Think of a getter as:

```text
property read
     ↓
run code
     ↓
return value
```

and a setter as:

```text
property assignment
     ↓
run code
     ↓
validate/transform/store value
```

For example:

```js
class User {
  #name;

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== "string") {
      throw new TypeError("Name must be a string.");
    }

    this.#name = value;
  }
}
```

The outside world sees:

```js
osama.name;
osama.name = "Osama Abu Motlaq";
```

while the class controls:

```text
how the value is read
        +
how the value is written
        +
where the value is stored
```

That is the core purpose of getters and setters.

---

## Next Topic

**`13-polymorphism.md` — Polymorphism**

The next topic will explain how different objects can respond to the same method or interface in different ways, including method overriding, inheritance-based polymorphism, duck typing, polymorphic collections, and practical JavaScript examples.
