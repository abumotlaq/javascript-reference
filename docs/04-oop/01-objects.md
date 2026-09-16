# JavaScript Objects

Objects are one of the most important concepts in JavaScript.

An object is a data structure that allows you to group related **data** and **behavior** together.

Objects are used everywhere in JavaScript:

* User data
* Products
* API responses
* Configuration
* Application state
* DOM elements
* Built-in JavaScript features
* Classes and class instances

Understanding objects is essential before learning JavaScript OOP.

---

## 1. What Is an Object?

An object is a collection of **key-value pairs**.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  age: 24,
  role: "Frontend Developer",
};
```

The object contains three properties:

```text
name → "Osama Abu Motlaq"
age  → 24
role → "Frontend Developer"
```

The general structure is:

```javascript
const objectName = {
  key: value,
  key: value,
};
```

Each key identifies a value.

---

# 2. Creating Objects

The most common way to create an object is with an object literal.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

An object can contain different types of values:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  age: 24,
  isStudent: true,
  skills: ["JavaScript", "React", "Next.js"],
};
```

Objects can store:

* Strings
* Numbers
* Booleans
* Arrays
* Other objects
* Functions
* `null`
* `undefined`
* Other JavaScript values

---

# 3. Object Properties

A property is a named value stored inside an object.

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

The property name is called the **key**.

The value associated with that key is the **property value**.

Conceptually:

```text
Object
│
├── name → "Osama Abu Motlaq"
└── age  → 24
```

---

# 4. Accessing Properties

There are two primary ways to access object properties:

1. Dot notation
2. Bracket notation

---

## 4.1 Dot Notation

Dot notation is the most common syntax.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(user.name);
console.log(user.role);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

The syntax is:

```javascript
object.property
```

---

## 4.2 Bracket Notation

Bracket notation uses a string containing the property name.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(user["name"]);
console.log(user["role"]);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

The syntax is:

```javascript
object["property"]
```

---

# 5. Dot Notation vs Bracket Notation

Dot notation:

```javascript
user.name;
```

Bracket notation:

```javascript
user["name"];
```

Both access the same property.

However, bracket notation becomes particularly useful when the property name is stored in a variable.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const property = "role";

console.log(user[property]);
```

Output:

```text
Frontend Developer
```

This would not work the same way:

```javascript
user.property;
```

JavaScript would look for a property literally named:

```text
property
```

rather than using the value stored in the variable.

---

# 6. Dynamic Property Access

Bracket notation allows dynamic property access.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  location: "Gaza",
};

const selectedProperty = "role";

console.log(user[selectedProperty]);
```

Output:

```text
Frontend Developer
```

This is very useful when working with:

* Forms
* API data
* Tables
* Configuration
* Dynamic UI
* User-selected fields

For example:

```javascript
const field = "email";

const user = {
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
};

console.log(user[field]);
```

---

# 7. Adding Properties

Objects are mutable by default.

You can add a new property after creating the object.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

user.role = "Frontend Developer";
```

Now:

```javascript
console.log(user);
```

The object contains:

```text
name → "Osama Abu Motlaq"
role → "Frontend Developer"
```

You can also use bracket notation:

```javascript
user["location"] = "Gaza";
```

---

# 8. Modifying Properties

Existing properties can be changed.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

user.role = "Full Stack Developer";
```

The value of `role` has changed.

```javascript
console.log(user.role);
```

Output:

```text
Full Stack Developer
```

The property itself still exists; only its value changed.

---

# 9. Deleting Properties

The `delete` operator removes a property.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

delete user.role;
```

Now:

```javascript
console.log(user);
```

The `role` property no longer exists.

Use `delete` carefully in performance-sensitive or heavily structured application code. In many application scenarios, creating a new object without a property is preferable to mutating an existing object.

---

# 10. Checking Whether a Property Exists

You can use the `in` operator.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log("name" in user);
console.log("email" in user);
```

Output:

```text
true
false
```

Another approach is:

```javascript
Object.hasOwn(user, "name");
```

This checks whether the property belongs directly to the object.

```javascript
console.log(Object.hasOwn(user, "name"));
```

Output:

```text
true
```

---

# 11. Undefined Does Not Necessarily Mean Missing

Consider:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  email: undefined,
};
```

Now:

```javascript
console.log(user.email);
```

returns:

```text
undefined
```

But the property actually exists.

```javascript
console.log("email" in user);
```

returns:

```text
true
```

This demonstrates an important distinction:

```text
Property exists
        │
        └── value may be undefined
```

versus:

```text
Property does not exist
```

For checking ownership, prefer:

```javascript
Object.hasOwn(user, "email");
```

---

# 12. Nested Objects

Objects can contain other objects.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  address: {
    city: "Gaza",
    country: "Palestine",
  },
};
```

Access nested properties:

```javascript
console.log(user.address.city);
console.log(user.address.country);
```

Output:

```text
Gaza
Palestine
```

The structure is:

```text
user
│
├── name
│
└── address
    ├── city
    └── country
```

Nested objects are extremely common in API responses.

---

# 13. Objects Containing Arrays

An object can contain arrays.

```javascript
const developer = {
  name: "Osama Abu Motlaq",
  skills: ["JavaScript", "React", "Next.js"],
};
```

Access the array:

```javascript
console.log(developer.skills);
```

Access an individual item:

```javascript
console.log(developer.skills[0]);
```

Output:

```text
JavaScript
```

You can combine object and array access:

```javascript
developer.skills[1];
```

Output:

```text
React
```

---

# 14. Objects Containing Functions

Objects can store functions.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet: function () {
    return `Hello, ${this.name}!`;
  },
};
```

The function is a property of the object.

Because the function represents behavior associated with the object, it is commonly called a **method**.

Call it:

```javascript
console.log(user.greet());
```

Output:

```text
Hello, Osama Abu Motlaq!
```

Modern JavaScript usually uses method shorthand:

```javascript
const user = {
  name: "Osama Abu Motlaq",

  greet() {
    return `Hello, ${this.name}!`;
  },
};
```

We will study methods and `this` in greater detail in later files.

---

# 15. Objects Are Reference Values

This is one of the most important concepts about JavaScript objects.

Consider:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

const anotherUser = user;
```

Both variables now refer to the same object.

Conceptually:

```text
user ──────────┐
               │
               ▼
          ┌──────────────┐
          │    object    │
          │ name: Osama  │
          └──────────────┘
               ▲
               │
anotherUser ───┘
```

Changing the object through one variable affects what the other variable sees:

```javascript
anotherUser.name = "Osama Abu Motlaq";

console.log(user.name);
```

Both variables refer to the same object.

---

# 16. Objects Are Not Copied by Assignment

This does not create a new object:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

const copy = user;
```

Instead:

```text
user ────────┐
             ▼
          Object
             ▲
             │
copy ────────┘
```

The assignment copies the **reference**, not the object's contents.

This is different from primitive values.

For example:

```javascript
let firstName = "Osama Abu Motlaq";
let secondName = firstName;

secondName = "Another Value";
```

Changing `secondName` does not change `firstName`.

Primitive values behave differently from objects.

---

# 17. Creating a Shallow Copy

The spread syntax can create a new object.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const copy = {
  ...user,
};
```

Now:

```text
user ──→ Object A

copy ──→ Object B
```

The objects are different:

```javascript
console.log(user === copy);
```

Output:

```text
false
```

But the top-level property values have been copied.

---

# 18. Shallow Copy and Nested Objects

Spread syntax performs a **shallow copy**.

Consider:

```javascript
const user = {
  name: "Osama Abu Motlaq",

  address: {
    city: "Gaza",
  },
};

const copy = {
  ...user,
};
```

The top-level objects are different:

```javascript
console.log(user === copy);
```

Output:

```text
false
```

But the nested `address` object is still shared:

```javascript
console.log(user.address === copy.address);
```

Output:

```text
true
```

Conceptually:

```text
user ──→ Object A
          │
          └── address ──┐
                        │
copy ──→ Object B       │
          │             │
          └── address ──┘
```

This is why shallow copying is important to understand when working with nested state in React.

---

# 19. Deep Copy

For supported data types, `structuredClone()` can create a deep copy.

```javascript
const user = {
  name: "Osama Abu Motlaq",

  address: {
    city: "Gaza",
  },
};

const copy = structuredClone(user);
```

Now:

```javascript
console.log(user === copy);
```

Output:

```text
false
```

And:

```javascript
console.log(user.address === copy.address);
```

Output:

```text
false
```

The nested object was copied as well.

However, `structuredClone()` has type-specific limitations and should not be treated as a universal replacement for every serialization or cloning strategy.

---

# 20. Object Equality

Objects are compared by reference.

Consider:

```javascript
const user1 = {
  name: "Osama Abu Motlaq",
};

const user2 = {
  name: "Osama Abu Motlaq",
};
```

Even though their contents look identical:

```javascript
console.log(user1 === user2);
```

Output:

```text
false
```

Why?

Because they are two different objects.

```text
user1 → Object A

user2 → Object B
```

Therefore:

```javascript
user1 === user2;
```

asks whether both variables refer to the same object.

---

# 21. Same Object, Same Reference

Now:

```javascript
const user1 = {
  name: "Osama Abu Motlaq",
};

const user2 = user1;

console.log(user1 === user2);
```

Output:

```text
true
```

Both variables refer to the same object.

This distinction is fundamental:

```text
Same contents
    ≠
Same object
```

---

# 22. Object Destructuring

Destructuring allows you to extract properties from an object.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const { name, role } = user;

console.log(name);
console.log(role);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

Instead of:

```javascript
const name = user.name;
const role = user.role;
```

you can use:

```javascript
const { name, role } = user;
```

Destructuring is heavily used in modern JavaScript and React.

For example:

```javascript
function UserCard({ name, role }) {
  return `${name} - ${role}`;
}
```

This is one reason understanding objects is particularly important before learning React deeply.

---

# 23. Renaming During Destructuring

You can assign a property to a different variable name.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

const { name: userName } = user;

console.log(userName);
```

Output:

```text
Osama Abu Motlaq
```

The syntax:

```javascript
const { propertyName: newVariableName } = object;
```

---

# 24. Default Values in Destructuring

You can provide a default value.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

const { role = "Frontend Developer" } = user;

console.log(role);
```

Output:

```text
Frontend Developer
```

The default is used when the property value is `undefined`.

---

# 25. Object Spread

The spread syntax can copy and combine objects.

```javascript
const personalInfo = {
  name: "Osama Abu Motlaq",
};

const professionalInfo = {
  role: "Frontend Developer",
};

const user = {
  ...personalInfo,
  ...professionalInfo,
};
```

Result:

```javascript
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

If the same property appears multiple times, the later value wins:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  role: "Full Stack Developer",
};
```

The resulting `role` is:

```text
Full Stack Developer
```

This behavior is important when updating objects immutably.

---

# 26. Object Methods

JavaScript provides the global `Object` utility with many useful methods.

### `Object.keys()`

Returns an array containing the object's own enumerable property keys.

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(Object.keys(user));
```

Output:

```text
["name", "role"]
```

---

### `Object.values()`

Returns the property values.

```javascript
console.log(Object.values(user));
```

Output:

```text
["Osama Abu Motlaq", "Frontend Developer"]
```

---

### `Object.entries()`

Returns key-value pairs.

```javascript
console.log(Object.entries(user));
```

Conceptually:

```text
[
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"]
]
```

These methods are especially useful when iterating over objects.

---

# 27. Object Property Shorthand

When a variable and property have the same name, JavaScript allows shorthand syntax.

Instead of:

```javascript
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const user = {
  name: name,
  role: role,
};
```

You can write:

```javascript
const name = "Osama Abu Motlaq";
const role = "Frontend Developer";

const user = {
  name,
  role,
};
```

JavaScript interprets this as:

```javascript
{
  name: name,
  role: role
}
```

This is common in modern JavaScript and React.

---

# 28. Computed Property Names

JavaScript allows property names to be generated dynamically.

```javascript
const property = "role";

const user = {
  name: "Osama Abu Motlaq",
  [property]: "Frontend Developer",
};
```

The resulting object contains:

```javascript
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

The square brackets tell JavaScript to evaluate the expression.

---

# 29. Object Immutability

Objects are mutable by default.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

user.name = "Osama Abu Motlaq";
```

The object can still be modified even though the variable was declared with `const`.

This is because `const` prevents reassignment of the variable, not mutation of the object.

This is valid:

```javascript
const user = {};

user.name = "Osama Abu Motlaq";
```

This is not:

```javascript
const user = {};

user = {};
```

The second example attempts to reassign the variable.

---

# 30. `Object.freeze()`

`Object.freeze()` prevents modifications to an object at the top level.

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

Object.freeze(user);
```

Attempting to modify the property will not succeed.

However, `Object.freeze()` is shallow.

Nested objects can still be mutable unless they are also frozen.

This distinction is important:

```text
Object.freeze()
      ↓
Shallow protection
      ↓
Nested objects are not automatically frozen
```

---

# 31. Objects and the `const` Keyword

This is a common interview question.

Why can this work?

```javascript
const user = {
  name: "Osama Abu Motlaq",
};

user.name = "Osama Abu Motlaq";
```

But this does not?

```javascript
user = {};
```

Because `const` protects the **binding**, not the contents of the object.

Conceptually:

```text
const user
    │
    └── binding cannot point to another object

Current object
    │
    └── may still be mutable
```

Unless additional mechanisms such as `Object.freeze()` are used.

---

# 32. Objects and Functions

Functions are objects in JavaScript.

For example:

```javascript
function greet() {
  return "Hello";
}
```

Functions can have properties:

```javascript
greet.description = "Greeting function";
```

Then:

```javascript
console.log(greet.description);
```

This is possible because functions are special callable objects.

This becomes useful when understanding JavaScript's object model more deeply.

---

# 33. Objects and Prototypes

Objects in JavaScript are connected to the **prototype system**.

For example:

```javascript
const user = {
  name: "Osama Abu Motlaq",
};
```

The object has a prototype.

You can inspect it with:

```javascript
Object.getPrototypeOf(user);
```

The prototype provides inherited behavior.

For example, ordinary objects inherit methods such as:

```javascript
toString()
```

through the prototype chain.

The prototype system will be covered in depth in:

```text
05-prototypes.md
```

Do not confuse:

```text
object properties
```

with:

```text
prototype properties
```

They are related, but not identical.

---

# 34. Objects as Application Data

Objects are heavily used to represent real application data.

For example:

```javascript
const project = {
  title: "Portfolio Website",
  description: "A personal developer portfolio",
  technologies: ["React", "Next.js"],
  featured: true,
};
```

This structure can represent a project in a portfolio application.

An array can contain many objects:

```javascript
const projects = [
  {
    title: "Portfolio Website",
    technologies: ["React", "Next.js"],
  },
  {
    title: "E-Commerce Application",
    technologies: ["React", "Vite"],
  },
];
```

This pattern is extremely common in React.

You can then transform the data:

```javascript
projects.map((project) => project.title);
```

---

# 35. Objects and API Responses

APIs commonly return JSON objects.

Example:

```json
{
  "name": "Osama Abu Motlaq",
  "role": "Frontend Developer",
  "skills": ["JavaScript", "React", "Next.js"]
}
```

After parsing JSON, JavaScript works with it as an object:

```javascript
const user = JSON.parse(jsonData);

console.log(user.name);
```

Understanding objects is therefore essential for frontend and backend JavaScript development.

---

# 36. Object vs Array

Arrays are technically objects in JavaScript.

```javascript
const skills = ["JavaScript", "React", "Next.js"];

console.log(typeof skills);
```

Output:

```text
object
```

However, arrays are specialized objects designed for ordered collections.

Use an object when the data is primarily identified by named properties:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

Use an array when the data is primarily an ordered collection:

```javascript
const skills = ["JavaScript", "React", "Next.js"];
```

---

# 37. Common Mistakes

## Mistake 1: Confusing a Reference with a Copy

Incorrect assumption:

```javascript
const copy = user;
```

This does not create an independent object.

---

## Mistake 2: Comparing Objects by Contents

This returns `false`:

```javascript
{} === {};
```

Because they are different object references.

---

## Mistake 3: Assuming `const` Makes an Object Immutable

It does not.

```javascript
const user = {};

user.name = "Osama Abu Motlaq";
```

is valid.

---

## Mistake 4: Using Dot Notation for Dynamic Keys

Given:

```javascript
const key = "name";
```

This:

```javascript
user.key;
```

looks for a property named `key`.

Use:

```javascript
user[key];
```

when the property name is dynamic.

---

## Mistake 5: Assuming Spread Creates a Deep Copy

This:

```javascript
const copy = { ...user };
```

creates a shallow copy.

Nested objects can still be shared.

---

# 38. Best Practices

### Use meaningful property names

Prefer:

```javascript
const user = {
  firstName: "Osama Abu Motlaq",
};
```

over:

```javascript
const user = {
  x: "Osama Abu Motlaq",
};
```

---

### Keep related data together

Good:

```javascript
const user = {
  name: "Osama Abu Motlaq",
  email: "osama@example.com",
  role: "Frontend Developer",
};
```

---

### Avoid unnecessary nesting

Do not create deeply nested structures without a real reason.

Deep structures make access and updates harder.

---

### Understand mutation

Know when you are modifying an existing object and when you are creating a new object.

This distinction is particularly important in React.

---

### Prefer clear object structures

Objects should represent meaningful concepts rather than becoming random collections of unrelated values.

---

# 39. Quick Reference

| Operation          | Syntax                        |
| ------------------ | ----------------------------- |
| Create object      | `const user = {}`             |
| Access property    | `user.name`                   |
| Dynamic access     | `user[key]`                   |
| Add property       | `user.role = "Developer"`     |
| Modify property    | `user.role = "Developer"`     |
| Delete property    | `delete user.role`            |
| Check property     | `"name" in user`              |
| Check own property | `Object.hasOwn(user, "name")` |
| Get keys           | `Object.keys(user)`           |
| Get values         | `Object.values(user)`         |
| Get entries        | `Object.entries(user)`        |
| Copy object        | `{ ...user }`                 |
| Deep clone         | `structuredClone(user)`       |
| Get prototype      | `Object.getPrototypeOf(user)` |
| Freeze object      | `Object.freeze(user)`         |
| Destructure        | `const { name } = user`       |

---

# 40. Mental Model

Think of an object as a container:

```text
                 JavaScript Object
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    Property       Property         Method
       │              │               │
      name           role            greet()
       │              │               │
       ▼              ▼               ▼
    "Osama"       "Developer"       behavior
```

But remember that JavaScript objects are more than simple containers.

They participate in a prototype-based object system:

```text
Object Instance
      │
      ▼
   Prototype
      │
      ▼
   Prototype
      │
      ▼
     null
```

This prototype chain is the foundation for JavaScript's inheritance model.

---

# Key Takeaways

* An object is a collection of key-value pairs.
* Properties represent data stored on an object.
* Methods represent behavior associated with an object.
* Objects can contain nested objects and arrays.
* Use dot notation for known property names.
* Use bracket notation for dynamic property names.
* Objects are reference values.
* Assignment copies the reference, not the object.
* Object equality is based on reference identity.
* Spread syntax creates a shallow copy.
* `structuredClone()` can create a deep copy for supported values.
* `const` prevents reassignment of the variable but does not make the object immutable.
* Objects can be destructured.
* Objects can be combined using spread syntax.
* `Object.keys()`, `Object.values()`, and `Object.entries()` are useful for working with object data.
* Functions are special callable objects.
* Arrays are specialized objects.
* JavaScript objects participate in the prototype chain.
* Objects are fundamental to React, Node.js, APIs, and modern JavaScript applications.

---

## Next Topic

The next file is:

```text
02-object-properties-methods.md
```

It will focus specifically on:

* Object properties in greater depth
* Methods
* Method shorthand
* Adding and removing methods
* Property descriptors
* Enumerable properties
* Writable properties
* Configurable properties
* `Object.defineProperty()`
* `Object.getOwnPropertyDescriptor()`
* Own vs inherited properties
* Practical object design
