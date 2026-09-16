# JavaScript Maps

> A deep reference to the `Map` data structure in modern JavaScript.

---

## 1. What Is a `Map`?

A `Map` is a built-in JavaScript data structure used to store **key-value pairs**.

Each entry contains:

```text
key → value
```

Example:

```js
const users = new Map();

users.set("Osama Abu Motlaq", 25);
users.set("Frontend", "React");
```

A `Map` can store any JavaScript value as a key:

* Strings
* Numbers
* Booleans
* Objects
* Arrays
* Functions
* Symbols
* Other Maps
* `null`
* `undefined`

This is one of the main differences between `Map` and a traditional JavaScript object.

---

# 2. Creating a `Map`

Use the `Map` constructor:

```js
const users = new Map();
```

Initially, the Map is empty.

You can check its size:

```js
console.log(users.size);
```

Output:

```text
0
```

---

# 3. Adding Entries with `set()`

Use `.set(key, value)` to add an entry.

```js
const users = new Map();

users.set("Osama Abu Motlaq", "Frontend Developer");
users.set("React", "Library");
users.set("Next.js", "Framework");
```

The Map now contains:

```text
"Osama Abu Motlaq" → "Frontend Developer"
"React"            → "Library"
"Next.js"          → "Framework"
```

---

# 4. Getting Values with `get()`

Use `.get(key)` to retrieve a value.

```js
const users = new Map();

users.set("Osama Abu Motlaq", "Frontend Developer");

console.log(users.get("Osama Abu Motlaq"));
```

Output:

```text
Frontend Developer
```

If the key does not exist:

```js
console.log(users.get("Unknown"));
```

Output:

```text
undefined
```

---

# 5. Checking for a Key with `has()`

Use `.has(key)` to check whether a key exists.

```js
const users = new Map();

users.set("Osama Abu Motlaq", "Frontend Developer");

console.log(users.has("Osama Abu Motlaq"));
console.log(users.has("React"));
```

Output:

```text
true
false
```

This is usually better than calling `get()` when you only need to know whether an entry exists.

---

# 6. Removing Entries with `delete()`

Use `.delete(key)` to remove an entry.

```js
const users = new Map();

users.set("Osama Abu Motlaq", "Frontend Developer");
users.set("React", "Library");

users.delete("React");

console.log(users.has("React"));
```

Output:

```text
false
```

`delete()` returns a boolean:

```js
const removed = users.delete("React");

console.log(removed);
```

If the entry existed:

```text
true
```

If it did not exist:

```text
false
```

---

# 7. Removing All Entries with `clear()`

Use `.clear()` to remove every entry.

```js
const users = new Map();

users.set("Osama Abu Motlaq", "Frontend Developer");
users.set("React", "Library");

users.clear();

console.log(users.size);
```

Output:

```text
0
```

---

# 8. The `size` Property

Use `.size` to get the number of entries.

```js
const skills = new Map();

skills.set("HTML", "Markup");
skills.set("CSS", "Styling");
skills.set("JavaScript", "Programming");
skills.set("React", "UI Library");

console.log(skills.size);
```

Output:

```text
4
```

Unlike arrays, `Map` uses:

```js
map.size
```

not:

```js
map.length
```

---

# 9. Initializing a Map with Data

A `Map` can be created with an iterable of key-value pairs.

```js
const skills = new Map([
  ["HTML", "Markup"],
  ["CSS", "Styling"],
  ["JavaScript", "Programming"],
  ["React", "UI Library"],
]);
```

Each inner array represents:

```text
[key, value]
```

You can retrieve values normally:

```js
console.log(skills.get("React"));
```

Output:

```text
UI Library
```

---

# 10. Map Keys Can Be Any Value

This is one of the most important features of `Map`.

An object can be a key:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const userRoles = new Map();

userRoles.set(user, "admin");

console.log(userRoles.get(user));
```

Output:

```text
admin
```

An array can also be a key:

```js
const skills = ["React", "Next.js"];

const map = new Map();

map.set(skills, "Frontend");

console.log(map.get(skills));
```

Output:

```text
Frontend
```

A function can also be a key:

```js
const calculate = () => 10 + 20;

const operations = new Map();

operations.set(calculate, "Addition");

console.log(operations.get(calculate));
```

Output:

```text
Addition
```

---

# 11. Object Keys and Reference Identity

When objects are used as Map keys, JavaScript compares them by **reference identity**.

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const map = new Map();

map.set(user, "Developer");
```

This works:

```js
console.log(map.get(user));
```

Output:

```text
Developer
```

But this does not:

```js
console.log(
  map.get({
    name: "Osama Abu Motlaq",
  })
);
```

Output:

```text
undefined
```

Why?

Because these are two different object references:

```js
user !== {
  name: "Osama Abu Motlaq",
};
```

Even though their contents look identical.

The Map stores the original object reference as the key.

---

# 12. Primitive Keys

Primitive values can also be Map keys.

```js
const map = new Map();

map.set("name", "Osama Abu Motlaq");
map.set(1, "One");
map.set(true, "Enabled");
map.set(null, "Null value");
map.set(undefined, "Undefined value");

console.log(map.get("name"));
console.log(map.get(1));
console.log(map.get(true));
```

Output:

```text
Osama Abu Motlaq
One
Enabled
```

---

# 13. `Map` vs Object

Both `Map` and objects can store key-value relationships, but they are designed for different purposes.

### Object

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

Objects are especially useful for representing **entities and structured records**.

### Map

```js
const userRoles = new Map();

userRoles.set("Osama Abu Motlaq", "Frontend Developer");
```

Maps are designed specifically for **key-value collections**.

---

# 14. Important Differences

| Feature       | `Map`             | Object                       |
| ------------- | ----------------- | ---------------------------- |
| Key types     | Any value         | Primarily strings/symbols    |
| Size          | `.size`           | Manual calculation           |
| Key existence | `.has()`          | `Object.hasOwn()`            |
| Add/update    | `.set()`          | Assignment                   |
| Read          | `.get()`          | Property access              |
| Delete        | `.delete()`       | `delete`                     |
| Clear all     | `.clear()`        | Manual                       |
| Iteration     | Directly iterable | Not directly with `for...of` |
| Key order     | Insertion order   | Property ordering rules      |
| Prototype     | `Map.prototype`   | Object prototype by default  |

---

# 15. Updating an Existing Key

Calling `.set()` with an existing key updates its value.

```js
const skills = new Map();

skills.set("React", "Library");

skills.set("React", "UI Library");

console.log(skills.get("React"));
```

Output:

```text
UI Library
```

The Map does not create a second `"React"` key.

---

# 16. Duplicate Keys

Consider:

```js
const map = new Map([
  ["React", "Library"],
  ["React", "Framework"],
]);
```

The final value wins.

```js
console.log(map.get("React"));
```

Output:

```text
Framework
```

The Map contains only one `"React"` key.

---

# 17. Iterating Over a Map

A Map is iterable, so you can use `for...of`.

```js
const skills = new Map([
  ["HTML", "Markup"],
  ["CSS", "Styling"],
  ["JavaScript", "Programming"],
]);

for (const entry of skills) {
  console.log(entry);
}
```

Each iteration produces:

```js
[key, value]
```

For example:

```text
["HTML", "Markup"]
["CSS", "Styling"]
["JavaScript", "Programming"]
```

---

# 18. Destructuring Map Entries

Because each Map entry is an array containing `[key, value]`, you can destructure it.

```js
const skills = new Map([
  ["HTML", "Markup"],
  ["CSS", "Styling"],
  ["JavaScript", "Programming"],
]);

for (const [skill, category] of skills) {
  console.log(skill, category);
}
```

Output:

```text
HTML Markup
CSS Styling
JavaScript Programming
```

This is the most common way to iterate through both keys and values.

---

# 19. `keys()`

Use `.keys()` to get an iterator over the keys.

```js
const skills = new Map([
  ["HTML", "Markup"],
  ["CSS", "Styling"],
  ["JavaScript", "Programming"],
]);

for (const skill of skills.keys()) {
  console.log(skill);
}
```

Output:

```text
HTML
CSS
JavaScript
```

---

# 20. `values()`

Use `.values()` to get an iterator over the values.

```js
for (const category of skills.values()) {
  console.log(category);
}
```

Output:

```text
Markup
Styling
Programming
```

---

# 21. `entries()`

Use `.entries()` to get an iterator containing key-value pairs.

```js
for (const [skill, category] of skills.entries()) {
  console.log(skill, category);
}
```

`entries()` is also the default iterator of a Map.

Therefore:

```js
for (const entry of skills) {
  console.log(entry);
}
```

is effectively using:

```js
skills.entries()
```

---

# 22. Map Is Iterable

A Map implements the iterable protocol.

That means it works with:

* `for...of`
* spread syntax
* destructuring
* other APIs that consume iterables

Example:

```js
const skills = new Map([
  ["React", "UI"],
  ["Next.js", "Framework"],
]);

const entries = [...skills];

console.log(entries);
```

Result:

```js
[
  ["React", "UI"],
  ["Next.js", "Framework"]
]
```

This connects directly to the `for...of`, iterators, and generators topics.

---

# 23. Converting Map to an Array

Use spread syntax:

```js
const map = new Map([
  ["React", "Library"],
  ["Next.js", "Framework"],
]);

const array = [...map];

console.log(array);
```

Result:

```js
[
  ["React", "Library"],
  ["Next.js", "Framework"]
]
```

You can also use:

```js
const array = Array.from(map);
```

Both approaches produce an array of entries.

---

# 24. Converting Map Keys to an Array

```js
const map = new Map([
  ["React", "Library"],
  ["Next.js", "Framework"],
]);

const keys = [...map.keys()];

console.log(keys);
```

Result:

```js
["React", "Next.js"]
```

---

# 25. Converting Map Values to an Array

```js
const values = [...map.values()];

console.log(values);
```

Result:

```js
["Library", "Framework"]
```

---

# 26. `forEach()` on a Map

Maps provide their own `.forEach()` method.

```js
const skills = new Map([
  ["React", "Library"],
  ["Next.js", "Framework"],
]);

skills.forEach((value, key) => {
  console.log(key, value);
});
```

Output:

```text
React Library
Next.js Framework
```

Notice the argument order:

```js
(value, key)
```

This differs from the `[key, value]` structure commonly used with `for...of`.

---

# 27. `for...of` vs `forEach()`

With `for...of`:

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

With `forEach()`:

```js
map.forEach((value, key) => {
  console.log(key, value);
});
```

The difference is important:

```text
for...of     → [key, value]
forEach()    → (value, key)
```

---

# 28. Map and Insertion Order

Maps preserve insertion order.

```js
const map = new Map();

map.set("first", 1);
map.set("second", 2);
map.set("third", 3);

for (const [key, value] of map) {
  console.log(key, value);
}
```

Output:

```text
first 1
second 2
third 3
```

Updating an existing key does not create a new position.

```js
map.set("first", 100);
```

The order remains:

```text
first
second
third
```

---

# 29. Deleting and Re-Adding a Key

If you delete a key and then add it again, it is inserted at the end.

```js
const map = new Map([
  ["first", 1],
  ["second", 2],
  ["third", 3],
]);

map.delete("first");
map.set("first", 100);
```

The order becomes:

```text
second
third
first
```

This matters when insertion order has meaning.

---

# 30. Map with Objects as Keys

A powerful use case is associating metadata with objects without modifying those objects.

```js
const user = {
  name: "Osama Abu Motlaq",
};

const metadata = new Map();

metadata.set(user, {
  role: "developer",
  active: true,
});

console.log(metadata.get(user));
```

Output:

```js
{
  role: "developer",
  active: true
}
```

The original object remains unchanged.

---

# 31. Map with Functions as Keys

Functions are objects and can therefore be Map keys.

```js
const saveUser = () => {
  console.log("Saving user...");
};

const permissions = new Map();

permissions.set(saveUser, ["create", "update"]);

console.log(permissions.get(saveUser));
```

Result:

```js
["create", "update"]
```

This can be useful when associating configuration or metadata with specific function references.

---

# 32. Map and `NaN`

Unlike many older equality assumptions, Maps can correctly use `NaN` as a key.

```js
const map = new Map();

map.set(NaN, "Not a Number");

console.log(map.get(NaN));
```

Output:

```text
Not a Number
```

Map key matching uses **SameValueZero** equality.

This means:

```js
NaN
```

matches another:

```js
NaN
```

as a Map key.

---

# 33. `0` and `-0`

Maps treat:

```js
0
```

and:

```js
-0
```

as the same key.

```js
const map = new Map();

map.set(0, "zero");

console.log(map.get(-0));
```

Output:

```text
zero
```

---

# 34. `Map` and `undefined`

A Map can distinguish between a missing key and a key whose stored value is `undefined` if you check with `has()`.

```js
const map = new Map();

map.set("status", undefined);

console.log(map.get("status"));
console.log(map.has("status"));
```

Output:

```text
undefined
true
```

Compare:

```js
console.log(map.get("missing"));
console.log(map.has("missing"));
```

Output:

```text
undefined
false
```

This is an important reason to use:

```js
map.has(key)
```

when key existence matters.

---

# 35. Map Chaining

`.set()` returns the Map itself.

Therefore, you can chain calls:

```js
const skills = new Map();

skills
  .set("HTML", "Markup")
  .set("CSS", "Styling")
  .set("JavaScript", "Programming")
  .set("React", "Library");
```

This works because:

```js
skills.set(...)
```

returns:

```js
skills
```

---

# 36. Map as a Lookup Table

One common use case is fast lookup by a key.

```js
const roles = new Map([
  ["Osama Abu Motlaq", "Frontend Developer"],
  ["React", "Library"],
  ["Next.js", "Framework"],
]);

console.log(roles.get("React"));
```

Output:

```text
Library
```

Instead of searching through an array of objects manually, the Map directly represents the key-value relationship.

---

# 37. Map vs Array of Objects

Consider an array:

```js
const users = [
  {
    id: 1,
    name: "Osama Abu Motlaq",
  },
  {
    id: 2,
    name: "Developer",
  },
];
```

Finding a user by ID might require:

```js
const user = users.find((user) => user.id === 2);
```

A Map can represent the relationship directly:

```js
const users = new Map([
  [1, { name: "Osama Abu Motlaq" }],
  [2, { name: "Developer" }],
]);

const user = users.get(2);
```

The data structure communicates the intention clearly:

```text
ID → User
```

---

# 38. When `Map` Is a Better Choice

Use a Map when:

* You need arbitrary key types.
* You frequently add and remove entries.
* You need direct key-based lookup.
* You need explicit key-value collection semantics.
* You want a directly iterable collection.
* You need object/function references as keys.
* You need reliable insertion-order iteration.

---

# 39. When an Object Is Better

Use an object when you are representing a structured entity:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  experience: "Junior",
};
```

This is not primarily a key-value collection.

It is a **record describing one entity**.

A useful mental distinction is:

```text
Object → "What properties does this thing have?"

Map → "What value is associated with this key?"
```

This is a guideline, not an absolute rule.

---

# 40. Map and `Object.fromEntries()`

A Map can be converted into an object when its keys are suitable property keys.

```js
const map = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);

const object = Object.fromEntries(map);

console.log(object);
```

Result:

```js
{
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
}
```

The reverse operation is also possible.

---

# 41. Object to Map

Use `Object.entries()`:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const map = new Map(Object.entries(user));

console.log(map.get("name"));
```

Output:

```text
Osama Abu Motlaq
```

The conversion flow is:

```text
Object
   ↓
Object.entries()
   ↓
[key, value][]
   ↓
new Map()
```

---

# 42. Map and Destructuring

Because a Map is iterable, its entries can be destructured.

```js
const map = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);

const [[nameKey, nameValue], [roleKey, roleValue]] = map;

console.log(nameKey, nameValue);
console.log(roleKey, roleValue);
```

Output:

```text
name Osama Abu Motlaq
role Frontend Developer
```

Although possible, normal iteration is usually clearer.

---

# 43. Nested Maps

A Map can contain another Map.

```js
const users = new Map();

const osamaData = new Map();

osamaData.set("role", "Frontend Developer");
osamaData.set("experience", "React");

users.set("Osama Abu Motlaq", osamaData);

console.log(
  users.get("Osama Abu Motlaq").get("role")
);
```

Output:

```text
Frontend Developer
```

This is useful for complex relationships, but deeply nested Maps can become difficult to maintain.

---

# 44. Map of Arrays

A Map can store arrays as values.

```js
const skills = new Map();

skills.set("Osama Abu Motlaq", [
  "JavaScript",
  "React",
  "Next.js",
]);

console.log(skills.get("Osama Abu Motlaq"));
```

Result:

```js
[
  "JavaScript",
  "React",
  "Next.js"
]
```

---

# 45. Map of Objects

A Map can also store objects as values.

```js
const users = new Map();

users.set("Osama Abu Motlaq", {
  role: "Frontend Developer",
  active: true,
});

console.log(users.get("Osama Abu Motlaq").role);
```

Output:

```text
Frontend Developer
```

The key identifies the record, while the object stores its details.

---

# 46. Map Does Not Use Property Access

This is incorrect:

```js
const map = new Map();

map.set("name", "Osama Abu Motlaq");

console.log(map.name);
```

Output:

```text
undefined
```

Use:

```js
map.get("name");
```

The Map API is intentionally separate from normal object property access.

---

# 47. Common Mistake: Using `.length`

Incorrect:

```js
const map = new Map();

map.set("React", "Library");

console.log(map.length);
```

Output:

```text
undefined
```

Correct:

```js
console.log(map.size);
```

Output:

```text
1
```

---

# 48. Common Mistake: Forgetting `.get()`

Incorrect:

```js
console.log(map["React"]);
```

Correct:

```js
console.log(map.get("React"));
```

---

# 49. Common Mistake: Assuming Object-Like Keys

This does not retrieve the value:

```js
const map = new Map();

map.set(
  {
    id: 1,
  },
  "Osama Abu Motlaq"
);

console.log(
  map.get({
    id: 1,
  })
);
```

The result is:

```text
undefined
```

The two objects are different references.

Store the key reference if you need to retrieve it later:

```js
const user = {
  id: 1,
};

map.set(user, "Osama Abu Motlaq");

console.log(map.get(user));
```

---

# 50. Map Does Not Deeply Clone Keys or Values

Maps store references to objects.

```js
const user = {
  name: "Osama Abu Motlaq",
};

const map = new Map();

map.set("user", user);

user.name = "Updated";

console.log(map.get("user").name);
```

Output:

```text
Updated
```

The Map points to the same object.

A Map is a data structure, not a cloning mechanism.

---

# 51. Map and Garbage Collection

When an object is used as a Map key, the Map maintains a reference to that key.

For example:

```js
const map = new Map();

let user = {
  name: "Osama Abu Motlaq",
};

map.set(user, "Developer");
```

Even if another variable no longer references the object, the Map still does.

This matters for memory management.

If you need object-associated metadata without preventing garbage collection of the object, investigate:

```js
WeakMap
```

`WeakMap` is covered separately.

---

# 52. `Map` vs `WeakMap`

| Feature                      | `Map`                        | `WeakMap`                      |
| ---------------------------- | ---------------------------- | ------------------------------ |
| Keys                         | Any value                    | Objects/non-registered symbols |
| Iterable                     | Yes                          | No                             |
| `.size`                      | Yes                          | No                             |
| `.clear()`                   | Yes                          | No                             |
| Garbage collection semantics | Strong references            | Weak object-key references     |
| Common use                   | General key-value collection | Object-associated metadata     |

Use `Map` by default unless you specifically need the semantics provided by `WeakMap`.

---

# 53. Map and Functional Operations

Unlike arrays, Maps do not have built-in methods named:

```js
map()
filter()
reduce()
```

The name can be confusing:

```js
Map
```

is a data structure.

```js
Array.prototype.map()
```

is an array transformation method.

They are completely different concepts.

---

# 54. Filtering a Map

You can convert entries to an array, use array methods, and convert back.

```js
const skills = new Map([
  ["HTML", "Frontend"],
  ["CSS", "Frontend"],
  ["JavaScript", "Frontend"],
  ["Node.js", "Backend"],
]);

const frontendSkills = new Map(
  [...skills].filter(([, category]) => category === "Frontend")
);

console.log(frontendSkills);
```

The result is a new Map containing only the matching entries.

---

# 55. Transforming Map Values

You can use:

```js
[...map]
```

and then array methods.

```js
const prices = new Map([
  ["HTML", 10],
  ["CSS", 20],
  ["JavaScript", 30],
]);

const increasedPrices = new Map(
  [...prices].map(([name, price]) => [
    name,
    price * 2,
  ])
);

console.log(increasedPrices);
```

Result:

```text
HTML       → 20
CSS        → 40
JavaScript → 60
```

---

# 56. Map and `for...of` Are Closely Related

A Map's default iterator is:

```js
map[Symbol.iterator]()
```

which behaves like:

```js
map.entries()
```

Therefore:

```js
for (const entry of map) {
  console.log(entry);
}
```

is based on the iterable/iterator protocols discussed in the previous JavaScript Reference topics.

Mental model:

```text
Map
 ↓
Symbol.iterator
 ↓
Iterator
 ↓
[key, value]
 ↓
for...of
```

---

# 57. Practical Example: Feature Configuration

A Map can be useful when configuration is keyed by identifiers.

```js
const features = new Map([
  ["darkMode", true],
  ["animations", false],
  ["notifications", true],
]);

console.log(features.get("darkMode"));
```

Output:

```text
true
```

You can update a feature:

```js
features.set("animations", true);
```

Check whether it exists:

```js
features.has("animations");
```

Remove it:

```js
features.delete("animations");
```

---

# 58. Practical Example: Counting Values

Maps are useful for counting occurrences.

```js
const skills = [
  "React",
  "JavaScript",
  "React",
  "CSS",
  "JavaScript",
  "React",
];

const counts = new Map();

for (const skill of skills) {
  const currentCount = counts.get(skill) ?? 0;

  counts.set(skill, currentCount + 1);
}

console.log(counts);
```

Conceptually:

```text
React      → 3
JavaScript → 2
CSS        → 1
```

This is a common Map pattern:

```js
const current = map.get(key) ?? 0;

map.set(key, current + 1);
```

---

# 59. Practical Example: Grouping Data

Maps can also represent groups.

```js
const projects = [
  {
    name: "Portfolio",
    category: "Frontend",
  },
  {
    name: "Dashboard",
    category: "Frontend",
  },
  {
    name: "API",
    category: "Backend",
  },
];

const grouped = new Map();

for (const project of projects) {
  const category = project.category;

  if (!grouped.has(category)) {
    grouped.set(category, []);
  }

  grouped.get(category).push(project);
}
```

The conceptual structure becomes:

```text
Frontend → [Portfolio, Dashboard]
Backend  → [API]
```

---

# 60. Map in React

Maps are not a replacement for React state or props.

However, they can be useful inside React applications for specific data structures.

For example:

```js
const selectedUsers = new Map();

selectedUsers.set(1, true);
selectedUsers.set(2, false);
```

A Map might be useful for internal lookup or caching logic.

However, there is an important React consideration:

**React state updates depend on reference identity.**

Mutating an existing Map directly is generally a bad pattern:

```js
map.set("React", true);
setMap(map);
```

The reference is still the same.

Prefer creating a new Map:

```js
setMap((previousMap) => {
  const nextMap = new Map(previousMap);

  nextMap.set("React", true);

  return nextMap;
});
```

The important principle is:

```text
Do not mutate the existing state object.
Create a new Map when updating state.
```

---

# 61. Map in Next.js

Maps can be used anywhere JavaScript runs in a Next.js application.

For example, they can be useful for:

* Server-side data processing
* Lookup tables
* Caching logic
* Grouping data
* Transforming database results
* Temporary in-memory relationships

However, when sending data across a serialization boundary, you must consider whether the receiving side expects a normal object or array.

A Map is not equivalent to JSON:

```js
JSON.stringify(new Map([
  ["name", "Osama Abu Motlaq"],
]));
```

This does not produce the key-value data you might expect.

Convert it first when JSON-compatible data is required:

```js
const map = new Map([
  ["name", "Osama Abu Motlaq"],
]);

const object = Object.fromEntries(map);

console.log(JSON.stringify(object));
```

Result:

```json
{"name":"Osama Abu Motlaq"}
```

---

# 62. Map and JSON

JSON does not have a native Map type.

This means:

```js
const map = new Map([
  ["name", "Osama Abu Motlaq"],
]);

const json = JSON.stringify(map);

console.log(json);
```

Result:

```json
{}
```

If you need to serialize the Map, convert it first.

### Map → Array

```js
const array = [...map];

const json = JSON.stringify(array);
```

### Map → Object

```js
const object = Object.fromEntries(map);

const json = JSON.stringify(object);
```

Choose the representation based on whether your keys need to preserve their original types.

---

# 63. Map with Non-String Keys and Serialization

Consider:

```js
const map = new Map([
  [1, "One"],
  [2, "Two"],
]);
```

Converting to an object:

```js
const object = Object.fromEntries(map);
```

produces property keys that are strings:

```js
{
  "1": "One",
  "2": "Two"
}
```

If preserving the original key types matters, converting to an array of entries is usually more appropriate:

```js
[
  [1, "One"],
  [2, "Two"]
]
```

---

# 64. Performance Considerations

Maps are designed for efficient key-based operations.

Common operations include:

```js
set()
get()
has()
delete()
```

They are generally designed to provide efficient average-case access.

However, do not choose a Map purely because someone says it is "faster."

Choose the data structure based on:

* Semantics
* Key requirements
* Access patterns
* Mutation patterns
* Serialization needs
* Memory behavior
* Readability

Correct data modeling is more important than blindly optimizing.

---

# 65. Map vs Set

These structures solve different problems.

### Map

Stores:

```text
key → value
```

Example:

```js
const users = new Map();

users.set(1, "Osama Abu Motlaq");
```

### Set

Stores unique values:

```text
value
```

Example:

```js
const skills = new Set([
  "React",
  "JavaScript",
]);
```

Mental model:

```text
Map → Associate one thing with another.

Set → Keep unique values.
```

---

# 66. Map vs Array

Use an array when the primary concept is an ordered list:

```js
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
];
```

Use a Map when the primary concept is a key-value relationship:

```js
const skillTypes = new Map([
  ["HTML", "Markup"],
  ["CSS", "Styling"],
  ["JavaScript", "Programming"],
]);
```

---

# 67. Map vs Object: A Practical Decision

Ask this question:

> Am I modeling an entity or a collection of arbitrary key-value associations?

If modeling an entity:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

If modeling arbitrary associations:

```js
const roles = new Map();

roles.set("Osama Abu Motlaq", "Frontend Developer");
```

This distinction is more useful than memorizing a simple "Map is better than Object" rule.

---

# 68. Common Mistakes

### Mistake 1: Using property syntax

```js
map.name
```

Use:

```js
map.get("name")
```

---

### Mistake 2: Using `.length`

```js
map.length
```

Use:

```js
map.size
```

---

### Mistake 3: Forgetting reference identity

```js
map.set({}, "value");

map.get({});
```

The second object is a different reference.

---

### Mistake 4: Assuming Map is JSON-compatible

```js
JSON.stringify(map);
```

Convert it first.

---

### Mistake 5: Mutating a Map stored in React state

Avoid:

```js
stateMap.set("key", "value");
setStateMap(stateMap);
```

Prefer a new Map.

---

### Mistake 6: Confusing `Map` with `Array.prototype.map()`

They are unrelated concepts.

```js
new Map()
```

is a data structure.

```js
array.map()
```

is an array transformation method.

---

# 69. Best Practices

### 1. Use Map when the problem is naturally key-value based

```js
const usersById = new Map();
```

---

### 2. Use descriptive key semantics

Prefer:

```js
usersById.set(userId, user);
```

over unclear structures.

---

### 3. Use `has()` when existence matters

Do not rely only on:

```js
map.get(key) === undefined
```

because a key may legitimately contain `undefined`.

Use:

```js
map.has(key)
```

---

### 4. Preserve key references when using objects as keys

```js
const user = {};

map.set(user, "metadata");

map.get(user);
```

---

### 5. Convert deliberately when serializing

Use:

```js
Object.fromEntries(map)
```

or:

```js
[...map]
```

depending on your requirements.

---

### 6. Avoid using Map simply because it is newer

A simple object may be clearer:

```js
const user = {
  name: "Osama Abu Motlaq",
};
```

Choose based on the data model.

---

### 7. Be careful with Map mutation in React state

Create a new Map when updating state.

---

# 70. Quick Reference

| Operation           | Syntax                            |
| ------------------- | --------------------------------- |
| Create              | `new Map()`                       |
| Create with entries | `new Map([[key, value]])`         |
| Add/update          | `map.set(key, value)`             |
| Read                | `map.get(key)`                    |
| Check key           | `map.has(key)`                    |
| Delete              | `map.delete(key)`                 |
| Remove all          | `map.clear()`                     |
| Number of entries   | `map.size`                        |
| Keys iterator       | `map.keys()`                      |
| Values iterator     | `map.values()`                    |
| Entries iterator    | `map.entries()`                   |
| Iterate             | `for...of`                        |
| Iterate callback    | `map.forEach()`                   |
| Map → array         | `[...map]`                        |
| Map → object        | `Object.fromEntries(map)`         |
| Object → Map        | `new Map(Object.entries(object))` |

---

# 71. Map Mental Model

Think of a Map as a table:

```text
             MAP
┌──────────────────────────┐
│ Key            Value     │
├──────────────────────────┤
│ "React"        "Library" │
│ "Next.js"      "Framework"│
│ userObject     metadata  │
└──────────────────────────┘
```

The central operation is:

```js
map.get(key)
```

The central relationship is:

```text
key → value
```

---

# 72. Map and the Iterable Protocol

You have now seen several concepts that connect together:

```text
Map
 ↓
implements Symbol.iterator
 ↓
returns an iterator
 ↓
iterator produces [key, value]
 ↓
for...of consumes those values
```

This explains why all of the following work:

```js
for (const entry of map) {
  console.log(entry);
}
```

```js
const entries = [...map];
```

```js
const [[key, value]] = map;
```

The common mechanism is **iteration**.

---

# 73. Map and the Previous Iterator Topic

The previous topic introduced iterators.

A Map exposes iterators through:

```js
map.keys()
map.values()
map.entries()
```

For example:

```js
const map = new Map([
  ["React", "Library"],
]);

const iterator = map.entries();

console.log(iterator.next());
console.log(iterator.next());
```

Conceptually:

```js
{
  value: ["React", "Library"],
  done: false
}
```

then:

```js
{
  value: undefined,
  done: true
}
```

This is the same iterator protocol used by other iterable objects.

---

# 74. Map and Generators

Generators are also iterators and iterables.

This means a generator can consume Map entries:

```js
function* readMap(map) {
  for (const entry of map) {
    yield entry;
  }
}

const map = new Map([
  ["React", "Library"],
  ["Next.js", "Framework"],
]);

const generator = readMap(map);

console.log(generator.next().value);
```

Output:

```js
["React", "Library"]
```

This demonstrates how the ES6 features connect:

```text
Map
 ↓
Iterable
 ↓
Iterator
 ↓
Generator can consume it
```

---

# 75. React Relevance

`Map` is **useful but not a core React concept**.

You should understand it because React applications frequently manipulate collections and lookup structures.

Important React-related areas include:

* State
* Caching
* Lookup tables
* Selection state
* Grouping
* Derived data
* Data normalization

Example:

```js
const [selectedUsers, setSelectedUsers] = useState(
  new Map()
);
```

When updating:

```js
setSelectedUsers((previous) => {
  const next = new Map(previous);

  next.set(1, true);

  return next;
});
```

The key React lesson is not merely how `Map` works.

It is understanding **immutability and reference identity**.

---

# 76. Next.js Relevance

`Map` is a general JavaScript feature and therefore can appear in:

* Server Components
* Route Handlers
* Server-side utilities
* Data transformation
* Caching logic
* Database result processing
* API preparation

However, if data must cross a serialization boundary, prefer a serializable representation such as:

```js
Array
Object
```

when appropriate.

---

# 77. When You Should Actually Use `Map`

A practical decision tree:

```text
Do I need an ordered list?
        │
        ├── Yes → Array
        │
        └── No
             │
             ↓
Do I need unique values only?
             │
             ├── Yes → Set
             │
             └── No
                  │
                  ↓
Do I need key → value associations?
                  │
                  ├── Yes
                  │    │
                  │    ↓
                  │  Are arbitrary key types useful?
                  │    │
                  │    ├── Yes → Map
                  │    └── No → Object may be simpler
                  │
                  └── No → Reconsider the data structure
```

---

# 78. Final Mental Model

Remember these core ideas:

```text
Map
│
├── Stores key → value pairs
│
├── Keys can be any JavaScript value
│
├── set() adds or updates
│
├── get() retrieves
│
├── has() checks existence
│
├── delete() removes one entry
│
├── clear() removes everything
│
├── size gives the number of entries
│
├── keys() returns key iterator
│
├── values() returns value iterator
│
├── entries() returns [key, value] iterator
│
├── Is directly iterable
│
├── Preserves insertion order
│
├── Uses reference identity for object keys
│
└── Is different from both Object and Array.prototype.map()
```

---

# Key Takeaways

1. `Map` is a dedicated key-value collection.
2. A Map can use almost any JavaScript value as a key.
3. Use `.set()` to add or update entries.
4. Use `.get()` to retrieve values.
5. Use `.has()` when checking whether a key exists.
6. Use `.delete()` to remove one entry.
7. Use `.clear()` to remove all entries.
8. Use `.size`, not `.length`.
9. Maps preserve insertion order.
10. Maps are iterable and work naturally with `for...of`.
11. `map.entries()` is the default iteration behavior.
12. Object keys are compared by reference identity.
13. `Map` and `Array.prototype.map()` are completely different concepts.
14. Maps are useful for lookup tables, grouping, counting, and object-associated data.
15. Maps are not directly JSON-compatible.
16. Convert Maps to arrays or objects when serialization requires it.
17. In React state, avoid mutating an existing Map; create a new Map.
18. `Map` is related directly to the iterable and iterator protocols.
19. `WeakMap` is a specialized alternative when weak object-key references are required.
20. Choose `Map` because its data model fits the problem, not simply because it is a modern feature.

---

## One-Screen Cheat Sheet

```js
// Create
const map = new Map();

// Add
map.set("name", "Osama Abu Motlaq");

// Read
map.get("name");

// Check
map.has("name");

// Delete
map.delete("name");

// Size
map.size;

// Clear
map.clear();

// Iterate entries
for (const [key, value] of map) {
  console.log(key, value);
}

// Keys
map.keys();

// Values
map.values();

// Entries
map.entries();

// Convert to array
const entries = [...map];

// Map → Object
const object = Object.fromEntries(map);

// Object → Map
const newMap = new Map(Object.entries(object));
```

---

## Final Principle

The most important idea is not memorizing the API.

Understand the data model:

```text
Object
→ describes an entity

Array
→ represents an ordered collection

Set
→ represents unique values

Map
→ represents key → value associations
```

Once you understand this distinction, choosing the correct data structure becomes much easier.
