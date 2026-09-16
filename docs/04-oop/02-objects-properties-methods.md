# Object Properties and Methods

JavaScript objects are built from **properties**.

A property associates a **key** with a value.

That value can be:

* A primitive value
* An object
* An array
* A function
* Another complex value

When a property contains a function that represents behavior, it is commonly called a **method**.

Understanding properties and methods is essential before learning `this`, prototypes, constructors, and classes.

---

# 1. Object Properties

An object property consists of a key and a value.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  age: 24,
  role: "Frontend Developer",
};
```

The object has three properties:

```text
name → "Osama Abu Motlaq"
age  → 24
role → "Frontend Developer"
```

The general structure is:

```javascript
const object = {
  key: value,
};
```

---

# 2. Property Keys

Object property keys are usually strings or symbols.

When using an ordinary string key:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

the key is:

```text
"name"
```

You can also explicitly write it as a string:

```javascript
const user = {
  "name": "Osama Abu Motlaq",
};
```

These are equivalent.

---

# 3. Numeric Property Keys

JavaScript also allows numeric-looking property names.

```javascript
const scores = {
  1: 100,
  2: 90,
};
```

When accessed with bracket notation:

```javascript
console.log(scores[1]);
```

Output:

```text
100
```

Property keys that are not Symbols are ultimately represented as strings.

Therefore:

```javascript
scores[1];
```

and:

```javascript
scores["1"];
```

refer to the same property.

---

# 4. Symbol Property Keys

Symbols provide unique property keys.

```javascript
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};
```

Access the Symbol property using the same Symbol:

```javascript
console.log(user[id]);
```

A Symbol property is not accessed using the string:

```javascript
user["id"];
```

because:

```text
Symbol("id") !== "id"
```

Symbols are useful when you need unique property keys and for certain advanced JavaScript protocols.

---

# 5. Dot Notation

Dot notation is used when the property name is a valid identifier and known ahead of time.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(user.name);
console.log(user.role);
```

The syntax is:

```javascript
object.property
```

Dot notation is concise and easy to read.

---

# 6. Bracket Notation

Bracket notation allows you to use a property name dynamically.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const key = "role";

console.log(user[key]);
```

Output:

```text
Frontend Developer
```

JavaScript evaluates the expression inside the brackets.

```javascript
user[key];
```

means:

```text
Evaluate key
     ↓
"role"
     ↓
user["role"]
```

---

# 7. Property Names That Require Bracket Notation

Some property names cannot be accessed with ordinary dot notation.

For example:

```javascript
const user = {
  "first-name": "Osama Abu Motlaq",
};
```

This is invalid:

```javascript
user.first-name;
```

JavaScript interprets it as an operation involving subtraction.

Use:

```javascript
user["first-name"];
```

Bracket notation is also required for property names containing spaces:

```javascript
const user = {
  "display name": "Osama Abu Motlaq",
};

console.log(user["display name"]);
```

---

# 8. Adding Properties

Properties can be added after an object is created.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

user.role = "Frontend Developer";
```

You can also use bracket notation:

```javascript
user["location"] = "Gaza";
```

The object now contains:

```text
name
role
location
```

---

# 9. Updating Properties

Assigning a value to an existing property changes its value.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

user.role = "Full Stack Developer";
```

The `role` property now contains:

```text
"Full Stack Developer"
```

There is no separate "update" syntax.

Assignment handles both:

```text
property does not exist
        ↓
     create it

property exists
        ↓
     update it
```

---

# 10. Deleting Properties

The `delete` operator removes an object property.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

delete user.role;
```

After deletion:

```javascript
console.log("role" in user);
```

Output:

```text
false
```

`delete` removes the property itself, not merely its value.

---

# 11. Property Value of `undefined`

These two objects are different:

```javascript
const user1 = {};

const user2 = {
  role: undefined,
};
```

For both:

```javascript
console.log(user1.role);
console.log(user2.role);
```

the result is:

```text
undefined
```

But the property exists only on `user2`.

```javascript
console.log(Object.hasOwn(user1, "role"));
```

Output:

```text
false
```

While:

```javascript
console.log(Object.hasOwn(user2, "role"));
```

Output:

```text
true
```

This distinction is important when processing API data and configuration objects.

---

# 12. Checking Properties

The `in` operator checks whether a property exists anywhere on the object's prototype chain.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

console.log("name" in user);
```

Output:

```text
true
```

For checking an object's own property specifically:

```javascript
console.log(Object.hasOwn(user, "name"));
```

Output:

```text
true
```

These checks are not always equivalent because inherited properties can also be found by `in`.

---

# 13. Own Properties

An **own property** is a property directly stored on the object itself.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

`name` is an own property.

You can verify this:

```javascript
console.log(Object.hasOwn(user, "name"));
```

Output:

```text
true
```

---

# 14. Inherited Properties

Objects can also access properties inherited through their prototype.

For example:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

An ordinary object can access methods such as:

```javascript
user.toString();
```

Even though `toString` was not explicitly defined inside `user`.

It is inherited through the prototype chain.

Conceptually:

```text
user
 │
 ├── name
 │
 ▼
Object.prototype
 │
 ├── toString()
 ├── hasOwnProperty()
 └── ...
```

The prototype chain will be covered in detail in `05-prototypes.md`.

---

# 15. Property Lookup

When JavaScript evaluates:

```javascript
user.name;
```

it performs a property lookup.

Conceptually:

```text
Does user have "name"?
        │
       Yes
        │
        ▼
    return value
```

If the property does not exist directly:

```text
Does user have "toString"?
        │
       No
        │
        ▼
Search user prototype
        │
       Yes
        │
        ▼
    return method
```

If JavaScript reaches the end of the prototype chain without finding the property:

```text
undefined
```

This lookup mechanism is fundamental to JavaScript's object model.

---

# 16. Methods

A method is a function stored as an object property.

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

Calling the method:

```javascript
console.log(user.greet());
```

Output:

```text
Hello, Osama Abu Motlaq!
```

---

# 17. Method Shorthand

Modern JavaScript provides method shorthand.

Instead of:

```javascript
const user = {
  greet: function () {
    return "Hello";
  },
};
```

you can write:

```javascript
const user = {
  greet() {
    return "Hello";
  },
};
```

The second form is preferred for ordinary object methods.

---

# 18. Methods Can Accept Parameters

Methods can receive parameters just like normal functions.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet(message) {
    return `${message}, ${this.name}!`;
  },
};
```

Call the method:

```javascript
console.log(user.greet("Welcome"));
```

Output:

```text
Welcome, Osama Abu Motlaq!
```

A method is still a function, so concepts such as parameters, arguments, return values, closures, and scope still apply.

---

# 19. Methods Can Modify Object State

Methods can modify properties of their object.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  loginCount: 0,

  login() {
    this.loginCount += 1;
  },
};
```

Call the method:

```javascript
user.login();
user.login();

console.log(user.loginCount);
```

Output:

```text
2
```

The method changes the object's state.

The `this` keyword is responsible for referring to the object in this method call.

The behavior of `this` will be studied separately in:

```text
03-this-keyword.md
```

---

# 20. Methods Can Return Objects

A method can return any JavaScript value, including another object.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  getProfile() {
    return {
      name: this.name,
      role: "Frontend Developer",
    };
  },
};
```

Then:

```javascript
console.log(user.getProfile());
```

returns an object.

This pattern appears frequently in application code.

---

# 21. Methods Can Call Other Methods

An object method can call another method on the same object.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  getName() {
    return this.name;
  },

  greet() {
    return `Hello, ${this.getName()}!`;
  },
};
```

Calling:

```javascript
console.log(user.greet());
```

Output:

```text
Hello, Osama Abu Motlaq!
```

Again, `this` is important because:

```javascript
this.getName();
```

refers to the current object in this method call.

---

# 22. Methods Are Function Values

A method is not a fundamentally different type of value from a function.

Consider:

```javascript
const user = {
  greet() {
    return "Hello";
  },
};
```

You can retrieve the function:

```javascript
const greetFunction = user.greet;
```

Now `greetFunction` refers to the function value.

However, calling the extracted function can change the `this` behavior:

```javascript
greetFunction();
```

This is one reason `this` requires careful study.

The important distinction is:

```text
user.greet()
```

versus:

```text
greetFunction()
```

The function may be the same, but the **call site** is different.

---

# 23. Property Shorthand

If a variable and property have the same name, JavaScript allows shorthand syntax.

```javascript
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const user = {
  name,
  role,
};
```

This is equivalent to:

```javascript
const user = {
  name: name,
  role: role,
};
```

Property shorthand is very common in modern JavaScript and React.

---

# 24. Computed Property Names

Property names can be generated dynamically.

```javascript
const propertyName = "role";

const user = {
  name: "Osama Abu Motlaq",
  [propertyName]: "Frontend Developer",
};
```

The resulting object is effectively:

```javascript
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

The expression inside `[]` is evaluated first.

---

# 25. Getters

A getter defines a property whose value is calculated when it is accessed.

```javascript
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
```

Access it like a property:

```javascript
console.log(user.fullName);
```

Not:

```javascript
user.fullName();
```

The getter allows property-like syntax while executing logic internally.

Getters become especially useful with classes and encapsulation.

---

# 26. Setters

A setter controls what happens when a property is assigned.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  set username(value) {
    this.name = value.trim();
  },
};
```

Use it like a normal property assignment:

```javascript
user.username = "Osama Abu Motlaq";
```

The setter executes automatically.

Getters and setters will be covered in more depth later in the OOP section.

---

# 27. Property Descriptors

Every own property has a set of internal attributes called **property descriptors**.

For ordinary data properties, the main attributes are:

```text
value
writable
enumerable
configurable
```

Example:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

Inspect the descriptor:

```javascript
console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);
```

Conceptually, you get:

```javascript
{
  value: "Osama Abu Motlaq",
  writable: true,
  enumerable: true,
  configurable: true
}
```

These attributes control how the property behaves.

---

# 28. `value`

The `value` descriptor contains the property's current value.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

The descriptor contains:

```javascript
{
  value: "Osama Abu Motlaq"
}
```

---

# 29. `writable`

`writable` determines whether the property's value can be changed through ordinary assignment.

Example:

```javascript
const user = {};

Object.defineProperty(user, "name", {
  value: "Osama Abu Motlaq",
  writable: false,
});
```

Now:

```javascript
user.name = "Osama Abu Motlaq";
```

does not change the property.

In strict mode, attempting the assignment throws a `TypeError`.

---

# 30. `enumerable`

`enumerable` controls whether the property appears in common enumeration operations.

For example:

```javascript
const user = {};

Object.defineProperty(user, "name", {
  value: "Osama Abu Motlaq",
  enumerable: false,
});
```

Now:

```javascript
console.log(Object.keys(user));
```

does not include `name`.

The property still exists:

```javascript
console.log(user.name);
```

Output:

```text
Osama Abu Motlaq
```

It is simply non-enumerable.

---

# 31. `configurable`

`configurable` controls whether the property's descriptor can be changed and whether the property can be deleted.

```javascript
const user = {};

Object.defineProperty(user, "name", {
  value: "Osama Abu Motlaq",
  configurable: false,
});
```

The property cannot later be reconfigured normally.

This descriptor is especially relevant when working with advanced JavaScript APIs and libraries.

---

# 32. `Object.defineProperty()`

`Object.defineProperty()` allows you to define a property with explicit descriptor settings.

```javascript
const user = {};

Object.defineProperty(user, "name", {
  value: "Osama Abu Motlaq",
  writable: true,
  enumerable: true,
  configurable: true,
});
```

This gives precise control over property behavior.

For normal application objects, object literals are usually simpler:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

Use descriptors when you actually need their behavior.

---

# 33. Default Descriptor Values

A common source of confusion is that descriptor defaults differ depending on how the property is created.

With an object literal:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

the ordinary data property is effectively:

```javascript
{
  value: "Osama Abu Motlaq",
  writable: true,
  enumerable: true,
  configurable: true
}
```

But with:

```javascript
Object.defineProperty(user, "name", {
  value: "Osama Abu Motlaq",
});
```

unspecified descriptor attributes default to `false`.

Conceptually:

```javascript
{
  value: "Osama Abu Motlaq",
  writable: false,
  enumerable: false,
  configurable: false
}
```

This difference is important.

---

# 34. Accessor Descriptors

Properties do not always store a direct value.

They can instead use:

```text
get
set
```

For example:

```javascript
const user = {
  firstName: "Osama",
  lastName: "Abu Motlaq",
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

Now:

```javascript
console.log(user.fullName);
```

Output:

```text
Osama Abu Motlaq
```

This is called an **accessor property**.

---

# 35. Data Properties vs Accessor Properties

There are two important property descriptor categories.

### Data Property

Stores a value:

```javascript
{
  value: "Osama Abu Motlaq",
  writable: true,
  enumerable: true,
  configurable: true
}
```

### Accessor Property

Uses getter/setter functions:

```javascript
{
  get() {},
  set() {},
  enumerable: true,
  configurable: true
}
```

A property descriptor should not define both a data value (`value`/`writable`) and accessor functions (`get`/`set`) at the same time.

---

# 36. `Object.getOwnPropertyDescriptor()`

This method retrieves the descriptor of one own property.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

const descriptor =
  Object.getOwnPropertyDescriptor(user, "name");

console.log(descriptor);
```

This is useful for inspecting how a property is configured.

---

# 37. `Object.getOwnPropertyDescriptors()`

This method retrieves descriptors for all own properties.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(
  Object.getOwnPropertyDescriptors(user)
);
```

It returns an object containing a descriptor for each own property.

This can be useful when preserving property descriptors while copying or transforming objects.

---

# 38. `Object.defineProperties()`

You can define multiple properties at once.

```javascript
const user = {};

Object.defineProperties(user, {
  name: {
    value: "Osama Abu Motlaq",
    writable: true,
    enumerable: true,
    configurable: true,
  },

  role: {
    value: "Frontend Developer",
    writable: true,
    enumerable: true,
    configurable: true,
  },
});
```

For normal application code, object literals are usually easier to read.

---

# 39. Enumerating Object Properties

JavaScript provides several ways to inspect properties.

### `Object.keys()`

Returns enumerable own string keys.

```javascript
Object.keys(user);
```

### `Object.values()`

Returns enumerable own values.

```javascript
Object.values(user);
```

### `Object.entries()`

Returns enumerable own key-value pairs.

```javascript
Object.entries(user);
```

### `Object.getOwnPropertyNames()`

Returns all own string property names, including non-enumerable properties.

### `Object.getOwnPropertySymbols()`

Returns own Symbol properties.

Understanding the difference becomes important when working with property descriptors and prototypes.

---

# 40. Object Method `hasOwn`

The recommended modern way to check an own property is:

```javascript
Object.hasOwn(user, "name");
```

It is preferable to relying on:

```javascript
user.hasOwnProperty("name");
```

because an object can have a property named `hasOwnProperty`, or it may not inherit from `Object.prototype`.

For example:

```javascript
const user = Object.create(null);

console.log(Object.hasOwn(user, "name"));
```

`Object.hasOwn()` works without requiring an inherited `hasOwnProperty` method.

---

# 41. Methods and Prototype Sharing

When a method is defined directly inside an object literal:

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return `Hello, ${this.name}!`;
  },
};
```

the method is an own property of that particular object.

This is different from methods defined on a constructor's or class's prototype.

For example, class methods are normally placed on the class prototype.

That distinction becomes important when learning:

```text
Constructor Functions
        ↓
Prototypes
        ↓
Classes
```

---

# 42. Method Context

Consider:

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return this.name;
  },
};
```

When called as:

```javascript
user.greet();
```

the call expression provides the object context for `this`.

But:

```javascript
const greet = user.greet;

greet();
```

is a different call.

The function itself did not necessarily change, but the way it was called changed.

This is the foundation of many `this`-related bugs.

The next topic covers this in depth.

---

# 43. Objects Can Contain Multiple Methods

A single object can represent both state and multiple behaviors.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  loginCount: 0,

  login() {
    this.loginCount += 1;
  },

  getLoginCount() {
    return this.loginCount;
  },

  resetLoginCount() {
    this.loginCount = 0;
  },
};
```

The object now contains:

```text
State
 ├── name
 └── loginCount

Behavior
 ├── login()
 ├── getLoginCount()
 └── resetLoginCount()
```

This relationship between state and behavior is central to OOP.

---

# 44. Practical Example

Consider a simple user object:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  isActive: true,

  introduce() {
    return `My name is ${this.name}.`;
  },

  changeRole(newRole) {
    this.role = newRole;
  },
};
```

Usage:

```javascript
console.log(user.introduce());

user.changeRole("Full Stack Developer");

console.log(user.role);
```

Output:

```text
My name is Osama Abu Motlaq.
Full Stack Developer
```

The object contains:

```text
Properties
 ├── name
 ├── role
 └── isActive

Methods
 ├── introduce()
 └── changeRole()
```

This is a simple example of combining state and behavior.

---

# 45. Common Mistakes

## Mistake 1: Confusing Properties with Variables

A property belongs to an object:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

A variable exists independently:

```javascript
const name = "Osama Abu Motlaq";
```

They are not the same concept.

---

## Mistake 2: Forgetting Dynamic Property Access

Given:

```javascript
const key = "role";
```

Use:

```javascript
user[key];
```

not:

```javascript
user.key;
```

---

## Mistake 3: Assuming Every Property Is an Own Property

An object can access inherited properties through its prototype.

Use:

```javascript
Object.hasOwn(object, key);
```

when you specifically need to check ownership.

---

## Mistake 4: Confusing `undefined` with a Missing Property

These can both produce:

```javascript
undefined
```

but they are not equivalent.

Check property existence when the distinction matters.

---

## Mistake 5: Overusing Property Descriptors

You rarely need:

```javascript
Object.defineProperty();
```

for ordinary application objects.

Use normal object syntax unless you need precise property behavior.

---

## Mistake 6: Forgetting That Methods Are Functions

A method is a function value stored as an object property.

Understanding this becomes important when learning callbacks, higher-order functions, and `this`.

---

# 46. Best Practices

### Use clear property names

Prefer:

```javascript
const user = {
  firstName: "Osama Abu Motlaq",
};
```

over unclear names:

```javascript
const user = {
  x: "Osama Abu Motlaq",
};
```

---

### Keep object responsibilities clear

An object should represent a meaningful concept.

Avoid creating objects that contain unrelated data and dozens of unrelated methods.

---

### Use method shorthand

Prefer:

```javascript
const user = {
  greet() {
    return "Hello";
  },
};
```

over:

```javascript
const user = {
  greet: function () {
    return "Hello";
  },
};
```

when defining ordinary methods.

---

### Use bracket notation when it communicates dynamic access

```javascript
const key = "role";

user[key];
```

This makes the dynamic nature of the lookup explicit.

---

### Prefer `Object.hasOwn()`

When checking ownership:

```javascript
Object.hasOwn(user, "name");
```

This clearly communicates that you want an own property.

---

### Do not use classes just because an object has methods

An object literal can be the simplest and best solution for a small amount of state and behavior.

Classes become useful when you need reusable object construction, shared prototype methods, inheritance, or class-specific semantics.

---

# 47. React Relevance

Object properties and methods are **highly relevant to React**.

React code constantly works with objects.

For example, component props are commonly represented as an object:

```javascript
function UserCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

The props object conceptually contains:

```javascript
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

React state can also contain objects:

```javascript
const [user, setUser] = useState({
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
});
```

Updating object state commonly uses object spread:

```javascript
setUser((currentUser) => ({
  ...currentUser,
  role: "Full Stack Developer",
}));
```

Understanding:

* Object references
* Shallow copies
* Property access
* Destructuring
* Methods
* Immutability

is therefore directly useful when learning React.

---

# 48. Quick Reference

| Concept                    | Syntax                               |
| -------------------------- | ------------------------------------ |
| Create object              | `const user = {}`                    |
| Access property            | `user.name`                          |
| Dynamic access             | `user[key]`                          |
| Add property               | `user.role = "Developer"`            |
| Update property            | `user.role = "Developer"`            |
| Delete property            | `delete user.role`                   |
| Check property             | `"name" in user`                     |
| Check own property         | `Object.hasOwn(user, "name")`        |
| Get keys                   | `Object.keys(user)`                  |
| Get values                 | `Object.values(user)`                |
| Get entries                | `Object.entries(user)`               |
| Get property descriptor    | `Object.getOwnPropertyDescriptor()`  |
| Define property            | `Object.defineProperty()`            |
| Define multiple properties | `Object.defineProperties()`          |
| Get all descriptors        | `Object.getOwnPropertyDescriptors()` |
| Get string property names  | `Object.getOwnPropertyNames()`       |
| Get Symbol properties      | `Object.getOwnPropertySymbols()`     |
| Object method              | `greet() {}`                         |
| Getter                     | `get name() {}`                      |
| Setter                     | `set name(value) {}`                 |

---

# 49. Mental Model

Think of an object as a collection of properties:

```text
Object
│
├── Property
│   ├── key
│   └── value
│
├── Property
│   ├── key
│   └── value
│
└── Method
    └── function
```

But property lookup can extend beyond the object itself:

```text
Object
  │
  │ own properties
  ▼
Prototype
  │
  │ inherited properties
  ▼
Prototype
  │
  ▼
null
```

This leads directly to the next major JavaScript OOP concept:

```text
this
```

because object methods frequently depend on the object from which they are called.

---

# Key Takeaways

* Objects contain properties.
* A property has a key and a value.
* Object keys are strings or Symbols.
* Dot notation is useful for known property names.
* Bracket notation supports dynamic property access.
* Properties can be added, changed, and deleted.
* A property with value `undefined` is not necessarily a missing property.
* `Object.hasOwn()` checks whether a property belongs directly to an object.
* The `in` operator also considers inherited properties.
* Methods are functions stored as object properties.
* Method shorthand is the modern syntax for defining ordinary object methods.
* Methods can access and modify object state.
* The behavior of methods is closely connected to `this`.
* Property descriptors define how properties behave.
* Data properties use `value`, `writable`, `enumerable`, and `configurable`.
* Accessor properties use `get` and `set`.
* `Object.defineProperty()` provides low-level control over property behavior.
* Objects can contain both state and behavior.
* Objects are fundamental to React props and state.
* Understanding object references and shallow copying is essential for React state updates.
* JavaScript's prototype chain determines where inherited properties and methods are found.

---

## Next Topic

```text
03-this-keyword.md
```

The next topic explains one of the most important and frequently misunderstood parts of JavaScript:

**How `this` gets its value based on how a function is called.**
