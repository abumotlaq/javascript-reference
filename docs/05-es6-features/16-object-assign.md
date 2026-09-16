# JavaScript `Object.assign()`

> A deep reference to `Object.assign()`, including object copying, merging, property overwriting, shallow copies, references, mutation, and practical use cases.

---

# 1. What Is `Object.assign()`?

`Object.assign()` is a static method used to copy **enumerable own properties** from one or more source objects into a target object.

Basic syntax:

```js
Object.assign(target, source);
```

Example:

```js
const target = {
  name: "Osama Abu Motlaq",
};

const source = {
  role: "Frontend Developer",
};

Object.assign(target, source);

console.log(target);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

The properties from `source` were copied into `target`.

---

# 2. Basic Syntax

The complete syntax is:

```js
Object.assign(target, ...sources);
```

For example:

```js
const target = {};

const first = {
  name: "Osama Abu Motlaq",
};

const second = {
  role: "Frontend Developer",
};

Object.assign(target, first, second);

console.log(target);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

Multiple source objects can be provided.

---

# 3. The Target Object

The first argument is always the **target**.

```js
Object.assign(target, source);
```

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const information = {
  role: "Developer",
};

Object.assign(user, information);
```

The `user` object is modified.

After the operation:

```js
console.log(user);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Developer"
}
```

---

# 4. `Object.assign()` Mutates the Target

This is one of the most important things to understand.

Consider:

```js
const target = {
  name: "Osama Abu Motlaq",
};

const source = {
  role: "Developer",
};

Object.assign(target, source);
```

`target` itself has changed.

It is not automatically creating a new target object.

Mental model:

```text
Before:

target
  ↓
{ name: "Osama Abu Motlaq" }


Object.assign(target, source)


After:

target
  ↓
{
  name: "Osama Abu Motlaq",
  role: "Developer"
}
```

---

# 5. Returning the Target

`Object.assign()` returns the target object.

Example:

```js
const target = {
  name: "Osama Abu Motlaq",
};

const source = {
  role: "Developer",
};

const result = Object.assign(target, source);

console.log(result === target);
```

Output:

```text
true
```

The returned object is the same target reference.

---

# 6. Creating a New Object with `Object.assign()`

You can avoid mutating an existing object by using an empty object as the target:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const role = {
  role: "Frontend Developer",
};

const result = Object.assign({}, user, role);

console.log(result);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

The original `user` remains unchanged.

This pattern is historically common for shallow object copying and merging.

---

# 7. `Object.assign()` as a Shallow Copy

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Developer",
};

const copy = Object.assign({}, user);
```

Now:

```js
console.log(copy);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Developer"
}
```

`copy` is a different object:

```js
console.log(copy === user);
```

Output:

```text
false
```

But this is only a **shallow copy**.

---

# 8. What Does Shallow Copy Mean?

A shallow copy creates a new outer object but does not recursively clone nested objects.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
  profile: {
    role: "Frontend Developer",
  },
};

const copy = Object.assign({}, user);
```

The outer objects are different:

```js
console.log(copy === user);
```

Output:

```text
false
```

But the nested objects are the same reference:

```js
console.log(copy.profile === user.profile);
```

Output:

```text
true
```

This distinction is extremely important.

---

# 9. Visualizing a Shallow Copy

Original:

```text
user
 ↓
{
  name: "Osama Abu Motlaq",
  profile ─────→ { role: "Frontend Developer" }
}
```

After:

```js
const copy = Object.assign({}, user);
```

you have:

```text
user
 ↓
{
  name: "Osama Abu Motlaq",
  profile ─────────┐
}
                  │
                  ↓
             { role: "Frontend Developer" }

copy
 ↓
{
  name: "Osama Abu Motlaq",
  profile ─────────┘
}
```

Both objects point to the same nested `profile`.

---

# 10. Nested Reference Problem

Because the nested object is shared:

```js
copy.profile.role = "Full Stack Developer";
```

the original object is affected:

```js
console.log(user.profile.role);
```

Output:

```text
Full Stack Developer
```

Why?

Because:

```js
copy.profile === user.profile
```

is `true`.

---

# 11. `Object.assign()` Does Not Deep Clone

This does **not** create a completely independent object:

```js
const copy = Object.assign({}, original);
```

It only copies the first level.

For deep cloning of supported data, modern JavaScript provides:

```js
structuredClone()
```

Example:

```js
const original = {
  name: "Osama Abu Motlaq",
  profile: {
    role: "Developer",
  },
};

const copy = structuredClone(original);

console.log(copy.profile === original.profile);
```

Output:

```text
false
```

`structuredClone()` has different semantics and broader support for certain built-in data types.

---

# 12. Copying Properties

Suppose:

```js
const source = {
  name: "Osama Abu Motlaq",
  role: "Developer",
  experience: 2,
};

const copy = Object.assign({}, source);
```

All enumerable own properties are copied:

```text
name
role
experience
```

The result is:

```js
{
  name: "Osama Abu Motlaq",
  role: "Developer",
  experience: 2
}
```

---

# 13. Own Properties

`Object.assign()` copies **own properties** of the source object.

Example:

```js
const prototype = {
  role: "Developer",
};

const user = Object.create(prototype);

user.name = "Osama Abu Motlaq";

const copy = Object.assign({}, user);

console.log(copy);
```

Output:

```text
{
  name: "Osama Abu Motlaq"
}
```

The inherited `role` property is not copied.

---

# 14. Enumerable Properties

`Object.assign()` copies properties that are:

```text
own
+
enumerable
```

For example:

```js
const user = {
  name: "Osama Abu Motlaq",
};

Object.defineProperty(user, "secret", {
  value: "hidden",
  enumerable: false,
});

const copy = Object.assign({}, user);

console.log(copy);
```

Output:

```text
{
  name: "Osama Abu Motlaq"
}
```

The non-enumerable property is not copied.

---

# 15. What Does "Enumerable" Mean?

An enumerable property is one that participates in common property enumeration operations.

For example:

```js
Object.keys(object);
```

returns enumerable own string-keyed properties.

So:

```js
Object.assign({}, object);
```

is conceptually similar to copying the object's enumerable own properties.

---

# 16. Property Descriptors Are Not Fully Preserved

Suppose:

```js
const source = {};

Object.defineProperty(source, "name", {
  value: "Osama Abu Motlaq",
  writable: false,
  enumerable: true,
  configurable: false,
});
```

Now:

```js
const copy = Object.assign({}, source);
```

The value is copied, but the original property descriptor is not preserved in the same way.

The copied property becomes a normal property on the target according to the target's property creation semantics.

This means:

```text
Object.assign()
→ copies property values
→ does not clone complete property descriptors
```

---

# 17. Getters Can Be Invoked

This is an important detail.

Consider:

```js
const source = {
  get name() {
    console.log("Getter called");
    return "Osama Abu Motlaq";
  },
};

const copy = Object.assign({}, source);
```

The getter is accessed while copying.

Therefore:

```text
Getter called
```

is printed.

The target receives the resulting value rather than necessarily receiving the same accessor definition.

---

# 18. Setters on the Target

If the target already has a setter, assigning a source property can trigger it.

Example:

```js
const target = {
  set name(value) {
    console.log("Received:", value);
  },
};

const source = {
  name: "Osama Abu Motlaq",
};

Object.assign(target, source);
```

The target setter can run.

This is another reason to understand that `Object.assign()` performs assignment into the target rather than simply copying raw internal descriptors.

---

# 19. Merging Objects

One common use of `Object.assign()` is merging objects.

```js
const basicInfo = {
  name: "Osama Abu Motlaq",
};

const professionalInfo = {
  role: "Frontend Developer",
};

const user = Object.assign(
  {},
  basicInfo,
  professionalInfo
);

console.log(user);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

---

# 20. Multiple Sources

You can merge many objects:

```js
const result = Object.assign(
  {},
  objectA,
  objectB,
  objectC
);
```

Properties are processed from left to right.

This makes source order important.

---

# 21. Later Sources Override Earlier Sources

Consider:

```js
const first = {
  role: "Frontend Developer",
};

const second = {
  role: "Full Stack Developer",
};

const result = Object.assign(
  {},
  first,
  second
);
```

The result is:

```js
{
  role: "Full Stack Developer"
}
```

The later source overwrites the earlier property.

Mental model:

```text
first
  ↓
role = Frontend Developer

second
  ↓
role = Full Stack Developer

result
  ↓
role = Full Stack Developer
```

---

# 22. Property Overwrite Order

This:

```js
Object.assign(
  {},
  first,
  second,
  third
);
```

means:

```text
first
 ↓
second overwrites conflicts
 ↓
third overwrites conflicts
```

Therefore:

> The rightmost source wins when property keys conflict.

---

# 23. Example of Configuration Merging

```js
const defaults = {
  theme: "light",
  language: "English",
};

const userPreferences = {
  theme: "dark",
};

const settings = Object.assign(
  {},
  defaults,
  userPreferences
);

console.log(settings);
```

Output:

```text
{
  theme: "dark",
  language: "English"
}
```

The user's preference overrides the default.

---

# 24. Important: This Is Still Shallow Merging

Consider:

```js
const defaults = {
  display: {
    theme: "light",
    fontSize: 16,
  },
};

const preferences = {
  display: {
    theme: "dark",
  },
};

const settings = Object.assign(
  {},
  defaults,
  preferences
);
```

The result is:

```js
{
  display: {
    theme: "dark",
  }
}
```

The nested `fontSize` was not preserved.

Why?

Because the entire `display` property was replaced.

`Object.assign()` does not recursively merge nested objects.

---

# 25. Shallow Merge vs Deep Merge

### Shallow merge

```js
Object.assign(
  {},
  objectA,
  objectB
);
```

Only the top level is merged.

### Deep merge

A deep merge recursively combines nested structures.

`Object.assign()` does **not** perform deep merging.

This distinction is critical.

---

# 26. `Object.assign()` vs Object Spread

Modern JavaScript often uses:

```js
const copy = {
  ...original,
};
```

instead of:

```js
const copy = Object.assign(
  {},
  original
);
```

For simple shallow copies, they are often equivalent in intention.

Example:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Developer",
};

const copyA = Object.assign({}, user);

const copyB = {
  ...user,
};
```

Both create shallow copies.

---

# 27. Object Spread for Merging

Instead of:

```js
const result = Object.assign(
  {},
  first,
  second
);
```

you can write:

```js
const result = {
  ...first,
  ...second,
};
```

This is usually more readable in modern JavaScript.

---

# 28. `Object.assign()` vs Spread

| Feature                         | `Object.assign()` | Object spread      |
| ------------------------------- | ----------------- | ------------------ |
| Shallow copy                    | Yes               | Yes                |
| Shallow merge                   | Yes               | Yes                |
| Mutates target                  | Yes               | No existing target |
| Creates new object by default   | No                | Yes                |
| Multiple sources                | Yes               | Yes                |
| Common modern syntax            | Less common       | Very common        |
| Can assign into existing target | Yes               | No                 |

Example:

```js
Object.assign(target, source);
```

mutates `target`.

Whereas:

```js
const result = {
  ...target,
  ...source,
};
```

creates a new object.

---

# 29. Important Difference: Existing Target

This is where `Object.assign()` has capabilities that spread syntax does not directly replace.

You can do:

```js
Object.assign(existingObject, source);
```

This explicitly updates the existing object.

Object spread instead creates another object:

```js
const updated = {
  ...existingObject,
  ...source,
};
```

This distinction matters in APIs and mutation-sensitive code.

---

# 30. React Relevance

This distinction is especially important in React.

React commonly relies on creating new object references when updating state.

For example:

```js
setUser({
  ...user,
  role: "Frontend Developer",
});
```

This creates a new object.

You could technically use:

```js
setUser(
  Object.assign(
    {},
    user,
    {
      role: "Frontend Developer",
    }
  )
);
```

but spread syntax is usually clearer.

Avoid directly mutating React state:

```js
Object.assign(user, {
  role: "Frontend Developer",
});
```

and then expecting React to treat the mutation as a proper state update.

---

# 31. Object.assign() and Immutability

`Object.assign()` itself is not immutable.

This:

```js
Object.assign(
  user,
  {
    role: "Developer",
  }
);
```

mutates `user`.

But this:

```js
const updatedUser = Object.assign(
  {},
  user,
  {
    role: "Developer",
  }
);
```

creates a new outer object.

The distinction is:

```text
Object.assign(target, ...)
→ target is mutated

Object.assign({}, ...)
→ new object is created
```

---

# 32. Arrays Can Be Targets

Arrays are objects, so they can technically be targets.

Example:

```js
const target = [1, 2];

const source = {
  2: 3,
};

Object.assign(target, source);

console.log(target);
```

Output:

```text
[1, 2, 3]
```

However, using `Object.assign()` with arrays should be deliberate.

For normal array operations, array-specific methods and spread syntax are usually clearer.

---

# 33. Arrays Can Be Sources

Arrays have enumerable numeric properties.

Example:

```js
const source = ["a", "b", "c"];

const result = Object.assign({}, source);

console.log(result);
```

Output:

```text
{
  0: "a",
  1: "b",
  2: "c"
}
```

The array indexes become object property keys.

---

# 34. Strings Can Be Sources

Primitive values can be used as sources.

For example:

```js
const result = Object.assign(
  {},
  "abc"
);

console.log(result);
```

The string's enumerable character properties are copied.

Conceptually:

```text
{
  0: "a",
  1: "b",
  2: "c"
}
```

Other primitive values generally contribute no enumerable own properties.

---

# 35. `null` and `undefined` Sources

`null` and `undefined` source arguments are ignored.

Example:

```js
const result = Object.assign(
  {},
  null,
  undefined,
  {
    name: "Osama Abu Motlaq",
  }
);

console.log(result);
```

Output:

```text
{
  name: "Osama Abu Motlaq"
}
```

This can be useful when sources are optional.

---

# 36. Primitive Target Values

The target must be converted to an object when necessary.

For example:

```js
const result = Object.assign(
  "abc",
  {
    extra: true,
  }
);
```

The primitive target is boxed into an object wrapper.

In normal application code, however, the most useful target is an actual object.

---

# 37. `Object.assign()` and Symbols

`Object.assign()` also copies enumerable own Symbol-keyed properties.

Example:

```js
const key = Symbol("role");

const source = {
  [key]: "Developer",
};

const copy = Object.assign({}, source);

console.log(copy[key]);
```

Output:

```text
Developer
```

This connects directly to the behavior of Symbols discussed earlier.

---

# 38. Non-Enumerable Symbol Properties

If a Symbol property is non-enumerable, it will not be copied by `Object.assign()`.

Example:

```js
const key = Symbol("secret");

const source = {};

Object.defineProperty(source, key, {
  value: "hidden",
  enumerable: false,
});

const copy = Object.assign({}, source);

console.log(copy[key]);
```

Output:

```text
undefined
```

The property was not enumerable.

---

# 39. `Object.assign()` Does Not Copy the Prototype

Consider:

```js
const source = Object.create({
  greet() {
    return "Hello";
  },
});

source.name = "Osama Abu Motlaq";

const copy = Object.assign({}, source);
```

The `name` property is copied.

The prototype relationship is not copied.

Therefore:

```js
console.log(copy.greet);
```

is:

```text
undefined
```

The copy does not inherit from the same prototype.

---

# 40. Object.assign() and Class Instances

Suppose:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const user = new User("Osama Abu Motlaq");

const copy = Object.assign({}, user);
```

The result is a plain object containing the instance's enumerable own properties.

It is not another `User` instance.

Therefore:

```js
console.log(copy instanceof User);
```

Output:

```text
false
```

---

# 41. Object.assign() Does Not Preserve Class Identity

This is an important limitation.

```js
const copy = Object.assign({}, instance);
```

does not mean:

```text
"Clone this class instance."
```

It means:

```text
"Copy enumerable own properties into this target."
```

Methods on the prototype are not copied.

---

# 42. Copying into an Existing Object

Sometimes mutation is exactly what you want.

Example:

```js
const settings = {
  theme: "light",
};

Object.assign(settings, {
  language: "English",
});

console.log(settings);
```

Output:

```text
{
  theme: "light",
  language: "English"
}
```

This can be useful when an existing object is intentionally being updated.

---

# 43. Freezing and Object.assign()

Suppose:

```js
const target = Object.freeze({
  name: "Osama Abu Motlaq",
});
```

Then:

```js
Object.assign(target, {
  role: "Developer",
});
```

cannot successfully add the property.

In strict contexts, attempting to modify a frozen object can throw a `TypeError`.

This demonstrates again that `Object.assign()` performs actual assignments to the target.

---

# 44. Sealed Objects

If the target is sealed:

```js
const target = Object.seal({
  name: "Osama Abu Motlaq",
});
```

you cannot add new properties.

Therefore:

```js
Object.assign(target, {
  role: "Developer",
});
```

cannot add `role`.

Existing writable properties can still be updated depending on their descriptors.

---

# 45. Read-Only Properties

Suppose:

```js
const target = {};

Object.defineProperty(target, "name", {
  value: "Osama Abu Motlaq",
  writable: false,
  enumerable: true,
});
```

Then:

```js
Object.assign(target, {
  name: "Developer",
});
```

attempts to write to a non-writable property.

In strict execution contexts, this can result in a `TypeError`.

---

# 46. Property Key Conversion

Object property keys are strings or Symbols.

If a source contains properties that become keys through normal object semantics, `Object.assign()` operates using those property keys.

Example:

```js
const source = {
  1: "one",
};

const target = {};

Object.assign(target, source);

console.log(target["1"]);
```

Output:

```text
one
```

The numeric-looking property key is represented as a string property key.

---

# 47. Error During Assignment

If assigning one source property causes an error, the operation can stop at that point.

Example situations include:

* A non-writable target property
* A throwing setter
* Other assignment-related exceptions

This means `Object.assign()` is not an atomic transaction.

Some properties may already have been copied before an error occurs.

---

# 48. Practical Example: Updating User Data

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const updatedUser = Object.assign(
  {},
  user,
  {
    role: "Full Stack Developer",
  }
);

console.log(updatedUser);
```

Output:

```text
{
  name: "Osama Abu Motlaq",
  role: "Full Stack Developer"
}
```

The original object remains unchanged.

---

# 49. Practical Example: Defaults

```js
const defaults = {
  theme: "light",
  language: "English",
  notifications: true,
};

const preferences = {
  theme: "dark",
};

const settings = Object.assign(
  {},
  defaults,
  preferences
);

console.log(settings);
```

Output:

```text
{
  theme: "dark",
  language: "English",
  notifications: true
}
```

This is a common shallow-merge pattern.

---

# 50. Practical Example: Adding Metadata

```js
const user = {
  name: "Osama Abu Motlaq",
};

const metadata = {
  createdBy: "system",
};

const result = Object.assign(
  {},
  user,
  metadata
);
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  createdBy: "system"
}
```

---

# 51. Common Mistake: Expecting Deep Copy

Incorrect assumption:

```js
const copy = Object.assign({}, original);
```

means:

```text
"Everything is completely independent."
```

It does not.

Nested objects and arrays can still share references.

---

# 52. Common Mistake: Mutating the Original Object

This:

```js
Object.assign(user, updates);
```

mutates `user`.

If you want a new object:

```js
const updatedUser = Object.assign(
  {},
  user,
  updates
);
```

---

# 53. Common Mistake: Expecting Deep Merge

This:

```js
Object.assign(
  {},
  {
    profile: {
      name: "Osama Abu Motlaq",
      role: "Developer",
    },
  },
  {
    profile: {
      role: "Frontend Developer",
    },
  }
);
```

does not produce:

```js
{
  profile: {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  },
}
```

Instead, the entire `profile` property from the second source replaces the first `profile`.

Result:

```js
{
  profile: {
    role: "Frontend Developer",
  },
}
```

---

# 54. Common Mistake: Thinking It Copies Methods from Prototypes

Given:

```js
class User {
  greet() {
    return "Hello";
  }
}
```

this:

```js
Object.assign({}, user);
```

does not copy `greet()` from the prototype.

Only enumerable own properties are copied.

---

# 55. Common Mistake: Confusing `Object.assign()` with `Object.create()`

These methods have completely different purposes.

### `Object.assign()`

Copies properties:

```js
Object.assign(target, source);
```

### `Object.create()`

Creates an object with a specified prototype:

```js
const object = Object.create(prototype);
```

Mental model:

```text
Object.assign()
→ copy properties

Object.create()
→ establish prototype relationship
```

---

# 56. Common Mistake: Confusing `Object.assign()` with Deep Clone

`Object.assign()`:

```text
shallow copy
```

`structuredClone()`:

```text
deep structured clone
```

They solve different problems.

---

# 57. Object.assign() vs `structuredClone()`

| Feature             | `Object.assign()`     | `structuredClone()`             |
| ------------------- | --------------------- | ------------------------------- |
| Purpose             | Copy/merge properties | Deep structured cloning         |
| Shallow             | Yes                   | No                              |
| Deep nested objects | Shared references     | Cloned where supported          |
| Mutates target      | Yes                   | No target object                |
| Prototype preserved | No                    | Not generally as class identity |
| Functions cloned    | No                    | No                              |
| Common use          | Merge/update objects  | Independent structured copy     |

Neither should be treated as a universal clone solution.

---

# 58. Object.assign() vs JSON Cloning

An old pattern is:

```js
const copy = JSON.parse(
  JSON.stringify(original)
);
```

This is not a general-purpose clone mechanism.

It can lose or transform values such as:

* `undefined`
* Functions
* Symbols
* Certain special object types
* Circular references

Modern JavaScript provides:

```js
structuredClone()
```

for many deep-cloning scenarios.

---

# 59. React State Update Pattern

A common React pattern is:

```js
setUser({
  ...user,
  role: "Frontend Developer",
});
```

The equivalent idea using `Object.assign()` is:

```js
setUser(
  Object.assign(
    {},
    user,
    {
      role: "Frontend Developer",
    }
  )
);
```

The spread version is generally preferred because it is concise and directly communicates:

```text
create a new object
+
copy existing properties
+
override this property
```

---

# 60. Why This Matters for React

React often uses reference equality to determine whether state or props have changed.

This:

```js
const updatedUser = {
  ...user,
  role: "Developer",
};
```

creates a new outer reference.

This:

```js
Object.assign(user, {
  role: "Developer",
});
```

keeps the same outer reference.

That difference is important when working with state.

---

# 61. Object.assign() and Functional JavaScript

Although `Object.assign()` can be used in immutable-style patterns:

```js
const updated = Object.assign(
  {},
  original,
  updates
);
```

the method itself is not inherently immutable.

Its behavior depends on the target you provide.

Remember:

```text
target = original
→ mutation

target = {}
→ new object
```

---

# 62. Performance Considerations

`Object.assign()` must inspect and copy the relevant enumerable own properties from its sources.

For ordinary application objects, this is usually straightforward.

Do not choose between:

```js
Object.assign()
```

and:

```js
spread
```

based on speculative micro-optimizations.

Choose based on:

* Readability
* Mutation requirements
* Semantics
* Project conventions
* Maintainability

---

# 63. When Should You Use `Object.assign()`?

Good use cases include:

* Updating an existing object intentionally
* Merging shallow configuration objects
* Creating shallow copies
* Working with APIs that expect an existing target
* Understanding legacy JavaScript code
* Codebases where `Object.assign()` is the established convention

---

# 64. When Should You Prefer Object Spread?

For modern application code, object spread is often preferable for:

* React state updates
* Creating new objects
* Shallow copies
* Shallow merges
* Immutable update patterns

Example:

```js
const updatedUser = {
  ...user,
  role: "Frontend Developer",
};
```

This is concise and immediately recognizable.

---

# 65. When `Object.assign()` Is More Appropriate

If you explicitly want to mutate an existing object:

```js
Object.assign(
  existingObject,
  updates
);
```

is direct and expressive.

The code communicates:

> "Apply these properties to this existing object."

That is different from:

```js
const updatedObject = {
  ...existingObject,
  ...updates,
};
```

which communicates:

> "Create a new object containing these properties."

---

# 66. Quick Reference

### Copy

```js
const copy = Object.assign({}, source);
```

### Merge

```js
const merged = Object.assign(
  {},
  first,
  second
);
```

### Update existing object

```js
Object.assign(
  target,
  updates
);
```

### Later source wins

```js
Object.assign(
  {},
  first,
  second
);
```

`second` overrides conflicting properties from `first`.

### Shallow copy

```js
Object.assign({}, object);
```

### Symbols

Enumerable own Symbol properties are copied.

### Prototypes

Prototype properties are not copied.

### Nested objects

Nested references are shared.

---

# 67. Mental Model

Think of:

```js
Object.assign(
  target,
  sourceA,
  sourceB
);
```

as:

```text
Start with target
       ↓
copy sourceA's enumerable own properties
       ↓
copy sourceB's enumerable own properties
       ↓
later properties overwrite earlier conflicts
       ↓
return target
```

The most important detail:

```text
It copies properties into the target.
It does not recursively clone objects.
```

---

# 68. Key Takeaways

1. `Object.assign()` is a static object method.
2. It copies enumerable own properties from sources to a target.
3. The first argument is the target.
4. The target is mutated.
5. The method returns the target.
6. Multiple source objects are allowed.
7. Sources are processed from left to right.
8. Later sources overwrite earlier conflicting properties.
9. `Object.assign({}, object)` creates a shallow copy.
10. Nested objects and arrays can still share references.
11. `Object.assign()` does not perform deep cloning.
12. `Object.assign()` does not perform deep merging.
13. Inherited properties are not copied.
14. Non-enumerable properties are not copied.
15. Enumerable own Symbol properties are copied.
16. Property descriptors are not preserved as descriptors.
17. Getters can be invoked during copying.
18. Target setters can be triggered during assignment.
19. Class prototype methods are not copied.
20. Object prototypes are not copied.
21. `Object.assign()` can work with arrays and primitive sources, although ordinary object use is more common.
22. `null` and `undefined` sources are ignored.
23. `Object.assign()` is not inherently immutable.
24. Using `{}` as the target creates a new outer object.
25. Object spread is often clearer for modern immutable-style object updates.
26. `Object.assign()` remains important for understanding JavaScript and existing codebases.
27. For React state, creating a new object with spread is usually the clearer pattern.
28. Choose `Object.assign()` when its explicit target-mutation semantics are useful.

---

# Final Principle

Remember this:

```text
Object.assign(target, ...sources)
```

means:

```text
"Copy enumerable own properties
from the sources
into the target."
```

And remember the three most important rules:

```text
1. The target is mutated.

2. The copy is shallow.

3. Later sources overwrite earlier properties.
```

For modern React and application code, this is often:

```js
const updated = {
  ...original,
  ...updates,
};
```

while `Object.assign()` remains especially valuable when you explicitly need to assign into an existing target or when reading older JavaScript code.
