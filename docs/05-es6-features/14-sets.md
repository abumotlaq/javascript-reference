# JavaScript Sets

> A deep reference to the `Set` data structure in modern JavaScript.

---

## 1. What Is a `Set`?

A `Set` is a built-in JavaScript data structure used to store a collection of **unique values**.

Unlike an array, a `Set` does not keep duplicate values.

```js
const skills = new Set();

skills.add("JavaScript");
skills.add("React");
skills.add("Next.js");
```

The Set contains:

```text
JavaScript
React
Next.js
```

If you add the same value again:

```js
skills.add("React");
```

the Set still contains only one `"React"`.

The central idea is:

```text
Set → unique values
```

---

# 2. Creating a Set

Create an empty Set with:

```js
const skills = new Set();
```

You can check its size:

```js
console.log(skills.size);
```

Output:

```text
0
```

---

# 3. Creating a Set with Initial Values

You can pass an iterable to the `Set` constructor.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);
```

The Set contains:

```text
JavaScript
React
Next.js
```

---

# 4. Duplicate Values Are Automatically Removed

```js
const skills = new Set([
  "JavaScript",
  "React",
  "React",
  "JavaScript",
  "Next.js",
]);
```

The resulting Set contains:

```text
JavaScript
React
Next.js
```

Its size is:

```js
console.log(skills.size);
```

Output:

```text
3
```

This is one of the primary reasons to use a Set.

---

# 5. Adding Values with `add()`

Use `.add(value)` to add a value.

```js
const skills = new Set();

skills.add("JavaScript");
skills.add("React");
skills.add("Next.js");
```

You can add different value types:

```js
const values = new Set();

values.add("Osama Abu Motlaq");
values.add(25);
values.add(true);
values.add(null);
values.add(undefined);
```

A Set can contain different JavaScript value types.

---

# 6. `add()` Returns the Set

The `.add()` method returns the Set itself.

Therefore, calls can be chained:

```js
const skills = new Set();

skills
  .add("HTML")
  .add("CSS")
  .add("JavaScript")
  .add("React");
```

This works because each call returns the same Set.

---

# 7. Checking for a Value with `has()`

Use `.has(value)` to determine whether a value exists.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);

console.log(skills.has("React"));
```

Output:

```text
true
```

And:

```js
console.log(skills.has("Vue"));
```

Output:

```text
false
```

The result is always a boolean.

---

# 8. Removing Values with `delete()`

Use `.delete(value)` to remove a value.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);

skills.delete("React");

console.log(skills.has("React"));
```

Output:

```text
false
```

`delete()` returns a boolean:

```js
const removed = skills.delete("React");

console.log(removed);
```

If the value existed:

```text
true
```

If it did not:

```text
false
```

---

# 9. Removing All Values with `clear()`

Use `.clear()` to remove everything.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);

skills.clear();

console.log(skills.size);
```

Output:

```text
0
```

---

# 10. The `size` Property

Use `.size` to determine how many values are in a Set.

```js
const skills = new Set([
  "HTML",
  "CSS",
  "JavaScript",
  "React",
]);

console.log(skills.size);
```

Output:

```text
4
```

There is no `.length` property for Set.

Use:

```js
skills.size
```

not:

```js
skills.length
```

---

# 11. Set vs Array

An Array:

```js
const skills = [
  "React",
  "JavaScript",
  "React",
];
```

can contain duplicates.

A Set:

```js
const skills = new Set([
  "React",
  "JavaScript",
  "React",
]);
```

automatically removes duplicates.

The result is:

```text
React
JavaScript
```

Mental model:

```text
Array → ordered collection where duplicates are allowed

Set → collection of unique values
```

---

# 12. Converting an Array to a Set

A common use case is removing duplicate primitive values from an array.

```js
const skills = [
  "React",
  "JavaScript",
  "React",
  "CSS",
  "JavaScript",
];

const uniqueSkills = new Set(skills);

console.log(uniqueSkills);
```

Result:

```text
Set(3) {
  "React",
  "JavaScript",
  "CSS"
}
```

---

# 13. Converting a Set Back to an Array

Use spread syntax:

```js
const skills = new Set([
  "React",
  "JavaScript",
  "CSS",
]);

const array = [...skills];

console.log(array);
```

Result:

```js
[
  "React",
  "JavaScript",
  "CSS"
]
```

You can also use:

```js
const array = Array.from(skills);
```

Both approaches are common.

---

# 14. The Classic Unique-Array Pattern

A very common pattern is:

```js
const uniqueValues = [...new Set(values)];
```

Example:

```js
const skills = [
  "React",
  "JavaScript",
  "React",
  "Next.js",
  "JavaScript",
];

const uniqueSkills = [...new Set(skills)];

console.log(uniqueSkills);
```

Result:

```js
[
  "React",
  "JavaScript",
  "Next.js"
]
```

The process is:

```text
Array
  ↓
new Set()
  ↓
duplicates removed
  ↓
spread (...)
  ↓
Array
```

---

# 15. Set Preserves Insertion Order

A Set remembers the order in which unique values were inserted.

```js
const skills = new Set();

skills.add("JavaScript");
skills.add("React");
skills.add("Next.js");
```

Iteration produces:

```text
JavaScript
React
Next.js
```

Adding an existing value does not create another entry or move it.

```js
skills.add("React");
```

The order remains:

```text
JavaScript
React
Next.js
```

---

# 16. Deleting and Re-Adding a Value

If a value is deleted and then added again, it is inserted at the end.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);

skills.delete("JavaScript");
skills.add("JavaScript");
```

The order becomes:

```text
React
Next.js
JavaScript
```

---

# 17. Iterating Over a Set

A Set is iterable.

Therefore, you can use `for...of`:

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);

for (const skill of skills) {
  console.log(skill);
}
```

Output:

```text
JavaScript
React
Next.js
```

Unlike a Map, each iteration produces a single value.

```text
Set → value

Map → [key, value]
```

---

# 18. `values()`

Use `.values()` to get an iterator over the Set's values.

```js
const skills = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);

for (const skill of skills.values()) {
  console.log(skill);
}
```

Output:

```text
JavaScript
React
Next.js
```

---

# 19. `keys()`

Set also provides `.keys()`:

```js
for (const skill of skills.keys()) {
  console.log(skill);
}
```

For a Set, this produces the same values as `.values()`.

Why?

Because a Set has no separate keys and values.

Its values themselves act as both.

Conceptually:

```text
Set:
value → value
```

---

# 20. `entries()`

Set also provides `.entries()`:

```js
for (const entry of skills.entries()) {
  console.log(entry);
}
```

Each result is:

```js
[
  value,
  value
]
```

For example:

```text
["JavaScript", "JavaScript"]
["React", "React"]
["Next.js", "Next.js"]
```

This may look strange, but it exists for compatibility with APIs and patterns designed around key-value collections.

For normal Set iteration, prefer:

```js
for (const value of skills)
```

---

# 21. Set's Default Iterator

A Set is iterable.

Its default iterator is equivalent to:

```js
set.values()
```

Therefore:

```js
for (const skill of skills) {
  console.log(skill);
}
```

behaves conceptually like:

```js
for (const skill of skills.values()) {
  console.log(skill);
}
```

This connects Set directly to the iterable and iterator protocols.

---

# 22. Set and the Iterable Protocol

A Set implements:

```js
Symbol.iterator
```

Therefore it works with:

* `for...of`
* spread syntax
* destructuring
* APIs that accept iterables

Example:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

const array = [...skills];

console.log(array);
```

The relationship is:

```text
Set
 ↓
Symbol.iterator
 ↓
Iterator
 ↓
values
 ↓
for...of
```

---

# 23. `forEach()` on a Set

Set provides `.forEach()`:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

skills.forEach((skill) => {
  console.log(skill);
});
```

Output:

```text
React
Next.js
```

The callback receives the value.

Set's `forEach()` callback technically receives:

```js
(value, value, set)
```

Example:

```js
skills.forEach((value, secondValue, currentSet) => {
  console.log(value === secondValue);
});
```

Output:

```text
true
true
```

The duplicated value arguments exist for consistency with Map's callback signature.

---

# 24. Set Uses SameValueZero Equality

Set determines whether a value already exists using **SameValueZero** equality.

This has important consequences.

For example:

```js
const values = new Set();

values.add(NaN);
values.add(NaN);

console.log(values.size);
```

Output:

```text
1
```

A Set considers the two `NaN` values equivalent.

---

# 25. `0` and `-0`

Set treats:

```js
0
```

and:

```js
-0
```

as the same value.

```js
const values = new Set();

values.add(0);
values.add(-0);

console.log(values.size);
```

Output:

```text
1
```

---

# 26. Primitive Values and Equality

For primitive values, normal value identity is usually straightforward.

```js
const values = new Set([
  "React",
  "React",
  1,
  1,
  true,
  true,
]);

console.log(values.size);
```

Output:

```text
3
```

The Set contains:

```text
"React"
1
true
```

---

# 27. Objects Are Compared by Reference

This is one of the most important Set concepts.

Consider:

```js
const users = new Set();

const user = {
  name: "Osama Abu Motlaq",
};

users.add(user);
```

This works:

```js
console.log(users.has(user));
```

Output:

```text
true
```

But this does not:

```js
console.log(
  users.has({
    name: "Osama Abu Motlaq",
  })
);
```

Output:

```text
false
```

The objects have the same contents but are different references.

---

# 28. Object Reference Identity

Consider:

```js
const first = {
  name: "Osama Abu Motlaq",
};

const second = {
  name: "Osama Abu Motlaq",
};

console.log(first === second);
```

Output:

```text
false
```

Therefore:

```js
const users = new Set();

users.add(first);
users.add(second);

console.log(users.size);
```

Output:

```text
2
```

The Set sees two different object references.

---

# 29. Adding the Same Object Reference

If you add the exact same object reference twice:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const users = new Set();

users.add(user);
users.add(user);
```

The size is:

```js
console.log(users.size);
```

Output:

```text
1
```

The Set recognizes that both additions refer to the same object.

---

# 30. Set Does Not Perform Deep Equality

A Set does not inspect object contents to determine whether two objects are "the same."

This:

```js
const first = {
  id: 1,
};

const second = {
  id: 1,
};
```

does not mean:

```js
first === second
```

because the references differ.

Therefore:

```js
const set = new Set([first, second]);

console.log(set.size);
```

Output:

```text
2
```

If you need uniqueness based on a property such as `id`, you need to design the data structure around that requirement.

---

# 31. Set of Functions

Functions can also be Set values.

```js
const saveUser = () => {
  console.log("Saving user...");
};

const actions = new Set();

actions.add(saveUser);

console.log(actions.has(saveUser));
```

Output:

```text
true
```

Another function with identical code would still be a different function reference.

---

# 32. Set Can Store Mixed Types

A Set can contain different JavaScript values:

```js
const values = new Set([
  "Osama Abu Motlaq",
  25,
  true,
  null,
  undefined,
  Symbol("id"),
]);
```

This is valid.

However, mixing unrelated types can reduce readability.

Use a Set when the values represent a coherent conceptual collection.

---

# 33. Set vs `Array.includes()`

Suppose you need to check membership:

```js
const skills = [
  "React",
  "Next.js",
  "JavaScript",
];

console.log(skills.includes("React"));
```

This works.

A Set provides:

```js
const skills = new Set([
  "React",
  "Next.js",
  "JavaScript",
]);

console.log(skills.has("React"));
```

The choice depends on the problem.

If you already have an Array and only perform occasional checks, `includes()` may be perfectly appropriate.

If the collection fundamentally represents unique membership and you frequently add/remove/check values, Set is often a better model.

---

# 34. Set vs Array for Membership

Conceptually:

```text
Array:
"Is this value somewhere in this list?"

Set:
"Is this value a member of this collection?"
```

That semantic distinction can make code easier to understand.

---

# 35. Set Does Not Have `map()`

A Set does not have:

```js
set.map()
```

like an Array does.

This is invalid:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

skills.map((skill) => skill.toUpperCase());
```

If you need Array methods, convert the Set:

```js
const result = [...skills].map((skill) =>
  skill.toUpperCase()
);
```

---

# 36. Filtering a Set

You can convert it to an Array, filter it, and optionally create another Set.

```js
const skills = new Set([
  "React",
  "Next.js",
  "Node.js",
  "Express",
]);

const frontendSkills = new Set(
  [...skills].filter(
    (skill) =>
      skill === "React" ||
      skill === "Next.js"
  )
);

console.log(frontendSkills);
```

Result:

```text
React
Next.js
```

The important idea is:

```text
Set
 ↓
Array
 ↓
Array method
 ↓
Set
```

---

# 37. Transforming Set Values

You can use the same pattern for transformation:

```js
const skills = new Set([
  "react",
  "next.js",
]);

const formattedSkills = new Set(
  [...skills].map((skill) => skill.toUpperCase())
);

console.log(formattedSkills);
```

Result:

```text
REACT
NEXT.JS
```

---

# 38. Set and Array Conversion

### Array → Set

```js
const set = new Set(array);
```

### Set → Array

```js
const array = [...set];
```

or:

```js
const array = Array.from(set);
```

This is one of the most common Set workflows.

---

# 39. Set Operations

Sets naturally support mathematical concepts such as:

* Union
* Intersection
* Difference
* Symmetric difference
* Subset relationships

Modern JavaScript provides Set methods for several of these operations in environments that support the current Set methods.

For example, conceptually:

```text
A ∪ B → Union

A ∩ B → Intersection

A − B → Difference
```

---

# 40. Union

The union of two Sets contains all values from both Sets.

```js
const frontend = new Set([
  "HTML",
  "CSS",
  "JavaScript",
]);

const react = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);
```

The union conceptually produces:

```text
HTML
CSS
JavaScript
React
Next.js
```

In modern JavaScript environments:

```js
const allSkills = frontend.union(react);
```

The original Sets are not modified.

---

# 41. Intersection

The intersection contains values present in both Sets.

```js
const frontend = new Set([
  "HTML",
  "CSS",
  "JavaScript",
]);

const react = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);
```

The intersection is:

```text
JavaScript
```

In modern JavaScript environments:

```js
const commonSkills = frontend.intersection(react);
```

---

# 42. Difference

The difference contains values present in the first Set but not the second.

```js
const frontend = new Set([
  "HTML",
  "CSS",
  "JavaScript",
]);

const react = new Set([
  "JavaScript",
  "React",
  "Next.js",
]);
```

Conceptually:

```js
frontend.difference(react);
```

produces:

```text
HTML
CSS
```

The direction matters.

```js
react.difference(frontend);
```

produces:

```text
React
Next.js
```

---

# 43. Symmetric Difference

The symmetric difference contains values that belong to exactly one of the Sets.

Given:

```text
A = {1, 2, 3}
B = {3, 4, 5}
```

The symmetric difference is:

```text
{1, 2, 4, 5}
```

In modern JavaScript:

```js
const result = A.symmetricDifference(B);
```

The shared value `3` is excluded.

---

# 44. `isSubsetOf()`

A Set is a subset of another Set if every value in the first Set also exists in the second.

```js
const frontend = new Set([
  "HTML",
  "CSS",
]);

const skills = new Set([
  "HTML",
  "CSS",
  "JavaScript",
  "React",
]);
```

Then:

```js
console.log(frontend.isSubsetOf(skills));
```

Output:

```text
true
```

---

# 45. `isSupersetOf()`

A Set is a superset if it contains every value from another Set.

```js
console.log(skills.isSupersetOf(frontend));
```

Output:

```text
true
```

---

# 46. `isDisjointFrom()`

Two Sets are disjoint if they have no values in common.

```js
const frontend = new Set([
  "React",
  "Next.js",
]);

const backend = new Set([
  "Node.js",
  "Express",
]);
```

Then:

```js
console.log(
  frontend.isDisjointFrom(backend)
);
```

Output:

```text
true
```

---

# 47. Set Operations Do Not Mutate the Original Sets

Consider:

```js
const first = new Set([1, 2]);
const second = new Set([2, 3]);

const combined = first.union(second);
```

The original Sets remain unchanged:

```text
first  → {1, 2}

second → {2, 3}

combined → {1, 2, 3}
```

This is important when working with immutable data patterns.

---

# 48. Compatibility Note for Set Operations

The newer mathematical Set methods are part of modern JavaScript.

If you work in an older runtime or browser environment, verify support before relying on methods such as:

```js
union()
intersection()
difference()
symmetricDifference()
isSubsetOf()
isSupersetOf()
isDisjointFrom()
```

For maximum compatibility, the same operations can be implemented using iteration and `has()`.

---

# 49. Manual Union

A compatible approach is:

```js
function union(first, second) {
  const result = new Set(first);

  for (const value of second) {
    result.add(value);
  }

  return result;
}
```

Usage:

```js
const first = new Set([1, 2]);
const second = new Set([2, 3]);

const result = union(first, second);

console.log([...result]);
```

Output:

```text
[1, 2, 3]
```

---

# 50. Manual Intersection

```js
function intersection(first, second) {
  const result = new Set();

  for (const value of first) {
    if (second.has(value)) {
      result.add(value);
    }
  }

  return result;
}
```

Usage:

```js
const first = new Set([1, 2, 3]);
const second = new Set([2, 3, 4]);

console.log(
  [...intersection(first, second)]
);
```

Output:

```text
[2, 3]
```

---

# 51. Manual Difference

```js
function difference(first, second) {
  const result = new Set();

  for (const value of first) {
    if (!second.has(value)) {
      result.add(value);
    }
  }

  return result;
}
```

Usage:

```js
const first = new Set([1, 2, 3]);
const second = new Set([2, 3]);

console.log(
  [...difference(first, second)]
);
```

Output:

```text
[1]
```

---

# 52. Practical Example: Unique Skills

Suppose data contains repeated skills:

```js
const skills = [
  "React",
  "JavaScript",
  "React",
  "Next.js",
  "JavaScript",
  "CSS",
];
```

Create unique skills:

```js
const uniqueSkills = [...new Set(skills)];
```

Result:

```text
React
JavaScript
Next.js
CSS
```

This is a very common real-world use of Set.

---

# 53. Practical Example: Selected IDs

A Set can represent a collection of selected IDs:

```js
const selectedIds = new Set();

selectedIds.add(101);
selectedIds.add(102);
selectedIds.add(103);
```

Check selection:

```js
console.log(selectedIds.has(102));
```

Output:

```text
true
```

Remove selection:

```js
selectedIds.delete(102);
```

This is often more expressive than using an Array when uniqueness is the main requirement.

---

# 54. Practical Example: Preventing Duplicate Processing

Suppose you process identifiers:

```js
const processedIds = new Set();

function process(id) {
  if (processedIds.has(id)) {
    return;
  }

  processedIds.add(id);

  console.log(`Processing ${id}`);
}
```

Now:

```js
process(1);
process(1);
process(2);
```

The first `1` is processed, but the second is ignored.

The Set acts as a membership registry.

---

# 55. Practical Example: Tracking Visited Nodes

Sets are frequently useful in graph and tree algorithms.

```js
const visited = new Set();

function visit(node) {
  if (visited.has(node)) {
    return;
  }

  visited.add(node);

  console.log("Visited:", node);
}
```

This prevents processing the same reference multiple times.

The pattern is:

```text
Check → Add → Process
```

---

# 56. Set with Object References

Consider a collection of objects:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const users = new Set();

users.add(user);
```

You can check the exact reference:

```js
console.log(users.has(user));
```

Output:

```text
true
```

But another object with the same contents is different:

```js
console.log(
  users.has({
    name: "Osama Abu Motlaq",
  })
);
```

Output:

```text
false
```

---

# 57. Set and Mutation of Objects

A Set stores a reference to an object.

```js
const user = {
  name: "Osama Abu Motlaq",
};

const users = new Set();

users.add(user);

user.name = "Updated";

console.log(users.has(user));
```

Output:

```text
true
```

The object reference has not changed.

The Set does not clone the object.

---

# 58. Set and JSON

JSON has no native Set type.

Therefore:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

console.log(
  JSON.stringify(skills)
);
```

produces:

```text
{}
```

If you need JSON-compatible data, convert the Set to an Array:

```js
const json = JSON.stringify([
  ...skills,
]);
```

Result:

```json
["React","Next.js"]
```

---

# 59. Set in React State

A Set can be stored in React state:

```js
const [selectedIds, setSelectedIds] = useState(
  new Set()
);
```

However, do not mutate the existing Set directly.

Avoid:

```js
selectedIds.add(1);

setSelectedIds(selectedIds);
```

The reference is still the same.

Prefer:

```js
setSelectedIds((previous) => {
  const next = new Set(previous);

  next.add(1);

  return next;
});
```

The important React principle is:

```text
Create a new Set when updating state.
```

---

# 60. Toggling a Value in a React Set

A common pattern is selecting and deselecting IDs.

```js
function toggleSelected(id) {
  setSelectedIds((previous) => {
    const next = new Set(previous);

    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    return next;
  });
}
```

The logic is:

```text
Already selected?
        │
   ┌────┴────┐
  Yes        No
   │          │
 delete      add
```

This is a useful practical pattern for React.

---

# 61. Set in React Rendering

React can render a Set after converting it into an iterable sequence:

```js
const skills = new Set([
  "React",
  "Next.js",
  "JavaScript",
]);
```

You could use:

```jsx
{[...skills].map((skill) => (
  <li key={skill}>{skill}</li>
))}
```

The Set itself is not the reason `.map()` works.

The spread operation creates an Array first:

```text
Set
 ↓
[...skills]
 ↓
Array
 ↓
.map()
```

---

# 62. Set and React Keys

A Set can help ensure unique values before rendering:

```js
const skills = [
  "React",
  "React",
  "Next.js",
];

const uniqueSkills = [...new Set(skills)];
```

Then:

```jsx
{uniqueSkills.map((skill) => (
  <li key={skill}>{skill}</li>
))}
```

This can help when the data itself contains duplicate primitive values.

However, uniqueness requirements should ideally be handled at the data-modeling level when appropriate.

---

# 63. Set in Next.js

Set is a general JavaScript feature and can be useful in Next.js for:

* Deduplicating data
* Tracking processed items
* Filtering unique values
* Permission sets
* Selection state
* Lookup membership
* Server-side data processing
* Graph/tree traversal

However, when data crosses a serialization boundary, convert the Set to a serializable representation such as an Array when necessary.

---

# 64. Set and Database Results

Suppose database results contain repeated categories:

```js
const categories = [
  "Frontend",
  "Backend",
  "Frontend",
  "Frontend",
  "Backend",
];
```

You can derive unique categories:

```js
const uniqueCategories = [
  ...new Set(categories),
];
```

Result:

```text
Frontend
Backend
```

This can be useful when preparing data for filters or UI controls.

---

# 65. Set vs Map

The easiest distinction is:

### Set

```text
value
value
value
```

Example:

```js
const skills = new Set([
  "React",
  "Next.js",
]);
```

### Map

```text
key → value
key → value
```

Example:

```js
const skillTypes = new Map([
  ["React", "Library"],
  ["Next.js", "Framework"],
]);
```

Mental model:

```text
Set → "Is this value present?"

Map → "What value belongs to this key?"
```

---

# 66. Set vs Object

An Object is usually appropriate for structured records:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

A Set is appropriate when the main requirement is membership:

```js
const permissions = new Set([
  "read",
  "write",
  "delete",
]);
```

The data model is different.

---

# 67. Set vs Array: Decision Guide

Use an Array when:

* Order is central.
* Duplicates are meaningful.
* You need array methods frequently.
* You need indexing.
* You need `length`.

Use a Set when:

* Values must be unique.
* Membership checks are common.
* You add/remove individual values.
* Index-based access is not required.
* The collection represents membership.

---

# 68. Set Does Not Support Indexing

This does not work:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

console.log(skills[0]);
```

Output:

```text
undefined
```

A Set is not an indexed collection.

If you need index-based access, use an Array.

You can convert:

```js
const firstSkill = [...skills][0];
```

But repeatedly doing this may indicate that an Array is the better data structure.

---

# 69. Set Is Not a Replacement for Every Array

Do not automatically convert every Array to a Set.

For example:

```js
const steps = [
  "Install Node.js",
  "Create project",
  "Install dependencies",
  "Run application",
];
```

Order and possible repetition may matter.

An Array is the natural structure.

A Set would remove the ability to express duplicate values and does not provide indexing.

---

# 70. Set and Memory

A Set stores references to objects when objects are added.

```js
const user = {
  name: "Osama Abu Motlaq",
};

const users = new Set();

users.add(user);
```

The Set keeps a strong reference to `user`.

If you specifically need weak references to objects, investigate:

```js
WeakSet
```

`WeakSet` is a specialized structure with different semantics and limitations.

---

# 71. Set vs WeakSet

| Feature            | `Set`                   | `WeakSet`                          |
| ------------------ | ----------------------- | ---------------------------------- |
| Values             | Any JavaScript value    | Objects and non-registered symbols |
| Iterable           | Yes                     | No                                 |
| `.size`            | Yes                     | No                                 |
| `.clear()`         | Yes                     | No                                 |
| Membership         | `has()`                 | `has()`                            |
| Garbage collection | Strong references       | Weak object references             |
| Main use           | Unique-value collection | Object membership tracking         |

Use `Set` for general unique collections.

Use `WeakSet` only when its weak-reference behavior is specifically useful.

---

# 72. Common Mistakes

### Mistake 1: Using `.length`

Incorrect:

```js
set.length
```

Correct:

```js
set.size
```

---

### Mistake 2: Expecting indexing

Incorrect:

```js
set[0]
```

A Set does not have indexes.

---

### Mistake 3: Expecting `.map()`

Incorrect:

```js
set.map(...)
```

Convert it to an Array first:

```js
[...set].map(...)
```

---

### Mistake 4: Expecting deep object equality

```js
set.add({ id: 1 });

set.has({ id: 1 });
```

returns:

```text
false
```

because the objects are different references.

---

### Mistake 5: Mutating React state directly

Avoid:

```js
stateSet.add(value);
setState(stateSet);
```

Create a new Set instead.

---

### Mistake 6: Using Set when order/indexing is the real requirement

If your data is fundamentally a list, an Array is usually clearer.

---

### Mistake 7: Assuming Set serializes to JSON

A Set must be converted first.

---

# 73. Best Practices

### 1. Use Set when uniqueness is part of the data model

```js
const permissions = new Set([
  "read",
  "write",
]);
```

---

### 2. Use `has()` for membership

```js
permissions.has("write");
```

---

### 3. Use `size` for the number of values

```js
permissions.size;
```

---

### 4. Use spread or `Array.from()` when Array methods are needed

```js
const values = [...set];
```

---

### 5. Do not rely on object contents for uniqueness

If uniqueness is based on an ID, model that explicitly.

For example, a Map keyed by ID may be more appropriate:

```js
const usersById = new Map();

usersById.set(1, {
  name: "Osama Abu Motlaq",
});
```

---

### 6. Avoid unnecessary conversion

If you only need membership:

```js
set.has(value);
```

is clearer than:

```js
[...set].includes(value);
```

---

### 7. In React, update immutably

Create a new Set rather than mutating the current state.

---

# 74. Set and Iterator Protocol

The concepts from the previous iterator topics connect directly to Set.

A Set provides:

```js
set.values()
```

which returns an iterator.

Its default iterator is:

```js
set[Symbol.iterator]()
```

and this is equivalent to:

```js
set.values()
```

Therefore:

```js
for (const value of set) {
  console.log(value);
}
```

works because `for...of` consumes the Set's iterator.

---

# 75. Manual Set Iterator

You can access the iterator directly:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

const iterator = skills.values();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Conceptually, the results are:

```js
{
  value: "React",
  done: false
}
```

```js
{
  value: "Next.js",
  done: false
}
```

```js
{
  value: undefined,
  done: true
}
```

This is the iterator protocol in action.

---

# 76. Set and Generators

Generators can consume Sets because Sets are iterable.

```js
function* readSkills(skills) {
  for (const skill of skills) {
    yield skill;
  }
}

const skills = new Set([
  "React",
  "Next.js",
]);

const generator = readSkills(skills);

console.log(generator.next().value);
```

Output:

```text
React
```

The relationship is:

```text
Set
 ↓
Iterable
 ↓
Iterator
 ↓
Generator consumes iterator
```

---

# 77. Set and Spread Syntax

Because Set is iterable:

```js
const skills = new Set([
  "React",
  "Next.js",
]);

const copy = new Set([...skills]);
```

The spread operator consumes the Set iterator.

This produces another Set containing the same values.

For object values, the object references are still shared.

---

# 78. Set Is Not Deeply Cloned

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
};

const first = new Set([user]);
const second = new Set(first);

user.name = "Updated";
```

Now:

```js
console.log(
  [...second][0].name
);
```

Output:

```text
Updated
```

The Sets are separate containers, but both contain a reference to the same object.

---

# 79. Shallow Copying a Set

You can create a new Set from another:

```js
const original = new Set([
  "React",
  "Next.js",
]);

const copy = new Set(original);
```

The Set containers are different:

```js
console.log(original === copy);
```

Output:

```text
false
```

But object values inside them are not deeply cloned.

---

# 80. Practical Mental Model

Think of a Set as a membership system:

```text
                 SET
        ┌──────────────────┐
        │ React            │
        │ Next.js          │
        │ JavaScript       │
        │ CSS              │
        └──────────────────┘
                 │
                 ↓
        "Is this value here?"
                 │
                 ↓
              has()
```

The key operation is:

```js
set.has(value);
```

---

# 81. Set vs Map vs Array

| Requirement              | Best starting point |
| ------------------------ | ------------------- |
| Ordered list             | Array               |
| Unique values            | Set                 |
| Key → value association  | Map                 |
| Structured entity        | Object              |
| Weak object membership   | WeakSet             |
| Weak object-key metadata | WeakMap             |

This is a data-structure decision, not simply a syntax decision.

---

# 82. One-Screen Cheat Sheet

```js
// Create
const set = new Set();

// Create with values
const skills = new Set([
  "React",
  "Next.js",
]);

// Add
set.add("JavaScript");

// Check
set.has("JavaScript");

// Delete
set.delete("JavaScript");

// Size
set.size;

// Clear
set.clear();

// Iterate
for (const value of set) {
  console.log(value);
}

// Values
set.values();

// Keys
set.keys();

// Entries
set.entries();

// Set → Array
const array = [...set];

// Array → Set
const newSet = new Set(array);

// Remove duplicates
const unique = [...new Set(array)];
```

---

# 83. Modern Set Operations Cheat Sheet

```js
const first = new Set([1, 2, 3]);
const second = new Set([3, 4, 5]);

// Union
const union = first.union(second);

// Intersection
const intersection = first.intersection(second);

// Difference
const difference = first.difference(second);

// Symmetric difference
const symmetric =
  first.symmetricDifference(second);

// Subset
const subset =
  first.isSubsetOf(second);

// Superset
const superset =
  first.isSupersetOf(second);

// Disjoint
const disjoint =
  first.isDisjointFrom(second);
```

These operations return new Sets or booleans and do not mutate the original Sets.

---

# 84. Final Mental Model

Remember:

```text
Set
│
├── Stores unique values
│
├── add() → add value
│
├── has() → check membership
│
├── delete() → remove value
│
├── clear() → remove everything
│
├── size → number of values
│
├── Is iterable
│
├── values() → value iterator
│
├── keys() → same values for Set
│
├── entries() → [value, value]
│
├── Preserves insertion order
│
├── Uses SameValueZero equality
│
├── Objects are compared by reference
│
├── No indexing
│
├── No built-in Array-style map/filter methods
│
└── Useful for uniqueness and membership
```

---

# Key Takeaways

1. `Set` stores **unique values**.
2. Adding a duplicate value does not create another entry.
3. Use `.add()` to insert values.
4. Use `.has()` to check membership.
5. Use `.delete()` to remove one value.
6. Use `.clear()` to remove everything.
7. Use `.size`, not `.length`.
8. Sets preserve insertion order.
9. Sets are directly iterable with `for...of`.
10. `set.values()` is the default iterator.
11. `set.keys()` produces the same values because Sets do not have separate keys.
12. `set.entries()` produces `[value, value]` pairs.
13. Primitive values are compared using SameValueZero semantics.
14. Objects and functions are compared by reference.
15. Set does not perform deep equality.
16. Set does not provide index-based access.
17. Set does not have Array methods such as `.map()` or `.filter()`.
18. Convert a Set to an Array when you need Array methods.
19. `Set` is excellent for deduplication and membership tracking.
20. `Map` is better when you need a `key → value` relationship.
21. `WeakSet` is a specialized alternative for weak object membership.
22. In React state, create a new Set when updating instead of mutating the existing Set.
23. Sets are iterable, so they connect directly to iterators, `for...of`, spread syntax, and generators.
24. Modern JavaScript provides mathematical Set operations such as union and intersection.
25. Choose Set because the data model requires **uniqueness or membership**, not merely because it is a modern JavaScript feature.

---

## Final Principle

The most important distinction is:

```text
Array
→ "I have a list of values."

Set
→ "I have a collection of unique values."

Map
→ "I associate keys with values."
```

Once this mental model is clear, choosing between `Array`, `Set`, and `Map` becomes much easier.
