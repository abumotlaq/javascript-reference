# for...of

The `for...of` loop is a modern JavaScript loop used to iterate over the **values of an iterable**.

It was introduced with **ES6 (ECMAScript 2015)**.

The basic syntax is:

```js
for (const value of iterable) {
  // code
}
```

`for...of` is especially useful with:

* Arrays
* Strings
* Sets
* Maps
* Typed arrays
* Other iterable objects

It is widely used in modern JavaScript and is important for React development.

---

# 1. The Basic Idea

Consider an array:

```js
const skills = ["JavaScript", "React", "Next.js"];
```

You can iterate over its values using:

```js
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

The variable `skill` receives each value one at a time.

Conceptually:

```text
First iteration → "JavaScript"
Second iteration → "React"
Third iteration → "Next.js"
```

---

# 2. Syntax

The general syntax is:

```js
for (const value of iterable) {
  // body
}
```

There are three important parts:

```js
for (const value of iterable) {
  // body
}
```

### `for`

Starts the loop.

### `const value`

Creates a variable that receives the current value.

### `of`

Tells JavaScript to iterate over the values produced by the iterable.

### `iterable`

The object being iterated.

For example:

```js
const skills = ["JavaScript", "React", "Next.js"];

for (const skill of skills) {
  console.log(skill);
}
```

Here:

```text
skill → current value
skills → iterable
```

---

# 3. `for...of` with Arrays

Arrays are one of the most common uses.

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];

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

Each iteration gives you an **array value**.

---

# 4. `for...of` Gives Values

This is the most important concept to understand.

Given:

```js
const skills = ["JavaScript", "React", "Next.js"];
```

`for...of` gives:

```text
JavaScript
React
Next.js
```

It does not directly give:

```text
0
1
2
```

It gives the values stored at those positions.

---

# 5. Compare `for...of` with a Traditional `for` Loop

Traditional loop:

```js
const skills = ["JavaScript", "React", "Next.js"];

for (let i = 0; i < skills.length; i++) {
  console.log(skills[i]);
}
```

`for...of`:

```js
const skills = ["JavaScript", "React", "Next.js"];

for (const skill of skills) {
  console.log(skill);
}
```

Both produce:

```text
JavaScript
React
Next.js
```

But `for...of` is simpler when you only need the values.

---

# 6. When Should You Use a Traditional `for` Loop?

A traditional `for` loop is useful when you need the index or more control over the iteration.

For example:

```js
const skills = ["JavaScript", "React", "Next.js"];

for (let i = 0; i < skills.length; i++) {
  console.log(`${i}: ${skills[i]}`);
}
```

Output:

```text
0: JavaScript
1: React
2: Next.js
```

With `for...of`, you can get the index separately using `entries()`:

```js
for (const [index, skill] of skills.entries()) {
  console.log(`${index}: ${skill}`);
}
```

Output:

```text
0: JavaScript
1: React
2: Next.js
```

---

# 7. `for...of` with Strings

Strings are iterable.

```js
const name = "Osama Abu Motlaq";

for (const character of name) {
  console.log(character);
}
```

Each iteration produces a character.

For a simple string, the output is conceptually:

```text
O
s
a
m
a

A
b
u

M
o
t
l
a
q
```

This is possible because strings implement the iterable protocol.

---

# 8. Why Strings Work with `for...of`

A string is not an array.

You cannot say:

```js
const name = "Osama Abu Motlaq";

name.map(...);
```

because strings do not have the array `map()` method.

But strings are **iterable**, so this works:

```js
for (const character of name) {
  console.log(character);
}
```

This distinction is important:

> Being iterable does not mean being an array.

---

# 9. `for...of` with Sets

A `Set` stores unique values.

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

The loop receives the values in the Set.

---

# 10. Duplicate Values in a Set

Because a Set only stores unique values:

```js
const skills = new Set([
  "React",
  "React",
  "JavaScript",
]);

for (const skill of skills) {
  console.log(skill);
}
```

Output:

```text
React
JavaScript
```

The duplicate `"React"` was removed by the Set itself.

---

# 11. `for...of` with Maps

Maps store key-value pairs.

```js
const user = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);
```

Iterating over a Map:

```js
for (const entry of user) {
  console.log(entry);
}
```

Output:

```text
["name", "Osama Abu Motlaq"]
["role", "Frontend Developer"]
```

Each iteration produces an array containing:

```text
[key, value]
```

---

# 12. Destructuring with `for...of`

Because Map entries are arrays, you can destructure them directly.

```js
const user = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);

for (const [key, value] of user) {
  console.log(`${key}: ${value}`);
}
```

Output:

```text
name: Osama Abu Motlaq
role: Frontend Developer
```

This is a very common modern JavaScript pattern.

It combines:

* `for...of`
* Map
* Array destructuring
* Template literals

---

# 13. `Map.keys()`

You can iterate over Map keys:

```js
const user = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);

for (const key of user.keys()) {
  console.log(key);
}
```

Output:

```text
name
role
```

---

# 14. `Map.values()`

You can iterate over Map values:

```js
const user = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);

for (const value of user.values()) {
  console.log(value);
}
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

---

# 15. `Map.entries()`

`entries()` returns key-value pairs.

```js
const user = new Map([
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
]);

for (const [key, value] of user.entries()) {
  console.log(key, value);
}
```

This is effectively the same iteration provided by:

```js
for (const [key, value] of user) {
  // ...
}
```

for a normal Map.

---

# 16. `for...of` with Typed Arrays

Typed arrays are iterable as well.

For example:

```js
const numbers = new Uint8Array([10, 20, 30]);

for (const number of numbers) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

You may encounter typed arrays in:

* Binary data
* Performance-sensitive applications
* Web APIs
* File processing
* Low-level browser operations

They are less important for everyday React development, but they demonstrate that `for...of` works with many iterable structures.

---

# 17. What Is an Iterable?

An **iterable** is an object that provides a way for JavaScript to produce its values one at a time.

Common built-in iterables include:

```text
Array
String
Set
Map
Typed Arrays
```

The important idea is:

```text
Iterable
   ↓
Can produce values sequentially
   ↓
Can be consumed by for...of
```

---

# 18. The Iterable Protocol

JavaScript defines a standard protocol for iterables.

An object is iterable when it provides a method at:

```js
Symbol.iterator
```

For example:

```js
const skills = ["JavaScript", "React", "Next.js"];

console.log(typeof skills[Symbol.iterator]);
```

Output:

```text
function
```

The presence of this method means the array can provide an iterator.

You do not normally need to manually call `Symbol.iterator` when using `for...of`.

---

# 19. The Relationship Between Iterable and Iterator

These concepts are related but different.

### Iterable

An object that can provide an iterator.

### Iterator

An object that produces values one at a time.

Conceptually:

```text
Iterable
   ↓
Symbol.iterator()
   ↓
Iterator
   ↓
next()
   ↓
{ value, done }
```

For everyday JavaScript, you can think of `for...of` as handling this process for you.

The detailed iterator protocol belongs to the dedicated `iterators` topic later in this section.

---

# 20. What `for...of` Does Internally

You normally write:

```js
for (const skill of skills) {
  console.log(skill);
}
```

Conceptually, JavaScript does something similar to:

```text
1. Get an iterator from the iterable.
2. Ask the iterator for the next value.
3. Assign that value to the loop variable.
4. Execute the loop body.
5. Ask for the next value.
6. Repeat until done.
```

The iterator eventually returns:

```js
{
  value: ...,
  done: true
}
```

At that point, the loop ends.

You normally do not need to implement this manually.

---

# 21. `for...of` vs `for...in`

This distinction is extremely important.

## `for...of`

Iterates over **values**.

```js
const skills = ["JavaScript", "React", "Next.js"];

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

---

## `for...in`

Iterates over **property keys**.

```js
const skills = ["JavaScript", "React", "Next.js"];

for (const index in skills) {
  console.log(index);
}
```

Output:

```text
0
1
2
```

Therefore:

```text
for...of → values
for...in → property keys
```

This is one of the most important rules to remember.

---

# 22. Why `for...in` Is Usually Not Preferred for Arrays

You might see:

```js
const skills = ["JavaScript", "React", "Next.js"];

for (const index in skills) {
  console.log(skills[index]);
}
```

It may appear to work.

However, `for...in` is designed for enumerating object properties, not for normal array value iteration.

For arrays, prefer:

```js
for (const skill of skills) {
  console.log(skill);
}
```

when you need the values.

---

# 23. `for...of` with Plain Objects

This does **not** work:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

for (const value of user) {
  console.log(value);
}
```

It throws a `TypeError` because ordinary objects are not iterable by default.

If you want to iterate over object values, use:

```js
for (const value of Object.values(user)) {
  console.log(value);
}
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

Or:

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

Output:

```text
name Osama Abu Motlaq
role Frontend Developer
```

---

# 24. `Object.keys()` with `for...of`

To iterate over object keys:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

for (const key of Object.keys(user)) {
  console.log(key);
}
```

Output:

```text
name
role
```

`Object.keys()` returns an array.

Since arrays are iterable, `for...of` can iterate over it.

The process is:

```text
Object
   ↓
Object.keys()
   ↓
Array of keys
   ↓
for...of
   ↓
Each key
```

---

# 25. `Object.values()` with `for...of`

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

for (const value of Object.values(user)) {
  console.log(value);
}
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

Again:

```js
Object.values(user)
```

returns an array.

Therefore `for...of` can iterate over it.

---

# 26. `Object.entries()` with `for...of`

This is especially useful when you need both keys and values.

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```

Output:

```text
name: Osama Abu Motlaq
role: Frontend Developer
```

This combines:

* `Object.entries()`
* `for...of`
* Array destructuring
* Template literals

This is a very useful modern JavaScript pattern.

---

# 27. `break` with `for...of`

You can stop a `for...of` loop using `break`.

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
];

for (const skill of skills) {
  if (skill === "Next.js") {
    break;
  }

  console.log(skill);
}
```

Output:

```text
JavaScript
React
```

When `skill` becomes `"Next.js"`, `break` immediately ends the loop.

---

# 28. `continue` with `for...of`

You can skip the current iteration using `continue`.

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];

for (const skill of skills) {
  if (skill === "React") {
    continue;
  }

  console.log(skill);
}
```

Output:

```text
JavaScript
Next.js
```

`continue` means:

> Skip the rest of the current iteration and move to the next value.

---

# 29. `for...of` with Conditional Logic

You can combine it with normal control flow.

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];

for (const skill of skills) {
  if (skill === "React") {
    console.log("React found");
  }
}
```

Output:

```text
React found
```

The loop itself does not replace `if`.

It simply provides a convenient way to iterate.

---

# 30. `for...of` and `const`

A common pattern is:

```js
for (const skill of skills) {
  console.log(skill);
}
```

This works because each iteration gets its own loop binding.

You can use `const` safely even though the value changes between iterations.

Conceptually:

```text
Iteration 1 → skill = "JavaScript"
Iteration 2 → skill = "React"
Iteration 3 → skill = "Next.js"
```

Each iteration has a new binding.

---

# 31. Using `let` with `for...of`

You can also write:

```js
for (let skill of skills) {
  console.log(skill);
}
```

However, if you do not need to reassign `skill` inside the loop, prefer:

```js
for (const skill of skills) {
  console.log(skill);
}
```

Using `const` communicates that the loop variable itself is not reassigned within the iteration body.

---

# 32. Reassigning the Loop Variable

With `let`:

```js
for (let skill of skills) {
  skill = skill.toUpperCase();

  console.log(skill);
}
```

This changes the local loop variable.

It does **not** automatically change the original array element.

For example:

```js
const skills = ["JavaScript", "React"];

for (let skill of skills) {
  skill = skill.toUpperCase();
}

console.log(skills);
```

The array remains:

```js
[
  "JavaScript",
  "React"
]
```

Changing the loop variable is not the same as mutating the original collection.

---

# 33. Mutating Objects During `for...of`

If the iterable contains objects, the situation is different.

```js
const users = [
  {
    name: "Osama Abu Motlaq",
    role: "Frontend Developer",
  },
];

for (const user of users) {
  user.role = "Full Stack JavaScript Developer";
}
```

The object itself has been mutated.

The array contains a reference to that object.

Therefore:

```js
console.log(users[0].role);
```

produces:

```text
Full Stack JavaScript Developer
```

This is an important distinction:

```text
Changing a primitive loop variable
≠
Changing an object referenced by the loop variable
```

---

# 34. `for...of` and Array Methods

`for...of` is not always the best way to process an array.

For example, if you want to transform every value:

```js
const skills = ["JavaScript", "React", "Next.js"];

const upperSkills = skills.map((skill) =>
  skill.toUpperCase()
);
```

`map()` communicates the intention:

> Transform every element.

Whereas:

```js
for (const skill of skills) {
  // ...
}
```

is a general-purpose loop.

Use the tool that best expresses the operation.

---

# 35. `for...of` vs `forEach`

Both can iterate over arrays.

### `forEach`

```js
skills.forEach((skill) => {
  console.log(skill);
});
```

### `for...of`

```js
for (const skill of skills) {
  console.log(skill);
}
```

The important difference is that `for...of` works naturally with control flow such as:

```js
break;
continue;
```

You cannot use `break` directly inside a `forEach` callback to stop the `forEach`.

`for...of` is often a better choice when you need:

* `break`
* `continue`
* `await`
* More complex sequential control flow

---

# 36. `for...of` with `async/await`

This is an important practical use case.

Suppose you need to process values sequentially:

```js
const skills = [
  "JavaScript",
  "React",
  "Next.js",
];

async function processSkills() {
  for (const skill of skills) {
    await saveSkill(skill);
  }
}
```

The next iteration waits for:

```js
await saveSkill(skill);
```

to finish.

This makes `for...of` useful when operations must happen sequentially.

Compare this with:

```js
skills.forEach(async (skill) => {
  await saveSkill(skill);
});
```

`forEach` does not wait for the async callback in the way many beginners expect.

For sequential async iteration, `for...of` is usually the clearer choice.

---

# 37. Sequential vs Concurrent Processing

`for...of` with `await` is sequential.

```js
for (const skill of skills) {
  await saveSkill(skill);
}
```

Conceptually:

```text
skill 1
  ↓
wait
  ↓
skill 2
  ↓
wait
  ↓
skill 3
```

If operations are independent and can run concurrently, use:

```js
await Promise.all(
  skills.map((skill) => saveSkill(skill))
);
```

Conceptually:

```text
skill 1 ─┐
skill 2 ─┼─→ run concurrently
skill 3 ─┘
```

This distinction becomes important in asynchronous JavaScript and backend development.

---

# 38. Nested `for...of` Loops

You can nest `for...of` loops.

```js
const categories = [
  ["JavaScript", "TypeScript"],
  ["React", "Next.js"],
];

for (const category of categories) {
  for (const technology of category) {
    console.log(technology);
  }
}
```

Output:

```text
JavaScript
TypeScript
React
Next.js
```

Each loop works with its own iterable.

---

# 39. Creating Your Own Iterable

JavaScript allows you to create custom iterables.

For example:

```js
const user = {
  name: "Osama Abu Motlaq",

  *[Symbol.iterator]() {
    yield this.name;
    yield "Frontend Developer";
  },
};

for (const value of user) {
  console.log(value);
}
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
```

The important part is:

```js
[Symbol.iterator]
```

It makes the object iterable.

This is an advanced topic.

You do not need to create custom iterables for normal React development.

The dedicated `iterators` and `generators` topics will explain this more deeply.

---

# 40. `for...of` and Generator Functions

Generator functions can produce values that `for...of` consumes.

```js
function* skills() {
  yield "JavaScript";
  yield "React";
  yield "Next.js";
}

for (const skill of skills()) {
  console.log(skill);
}
```

Output:

```text
JavaScript
React
Next.js
```

The generator creates an iterable sequence.

This is another advanced use case.

---

# 41. Common Mistakes

## Mistake 1: Using `for...of` on a Plain Object

Incorrect:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

for (const value of user) {
  console.log(value);
}
```

This causes a `TypeError`.

Use:

```js
for (const value of Object.values(user)) {
  console.log(value);
}
```

or:

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

---

## Mistake 2: Confusing `for...of` and `for...in`

Remember:

```text
for...of → values
for...in → property keys
```

For arrays:

```js
for (const value of array) {
  // value
}
```

For object properties:

```js
for (const key in object) {
  // key
}
```

---

## Mistake 3: Expecting the Index

This:

```js
for (const skill of skills) {
  console.log(skill);
}
```

does not give the index.

If you need both:

```js
for (const [index, skill] of skills.entries()) {
  console.log(index, skill);
}
```

---

## Mistake 4: Expecting `for...of` to Return an Array

A loop does not create a transformed array automatically.

This:

```js
for (const skill of skills) {
  console.log(skill);
}
```

only performs an operation for each value.

If you need a new array, consider:

```js
const result = skills.map((skill) => skill.toUpperCase());
```

---

## Mistake 5: Using `await` with `forEach` When You Need Sequential Behavior

Avoid assuming this:

```js
skills.forEach(async (skill) => {
  await saveSkill(skill);
});
```

behaves like:

```js
for (const skill of skills) {
  await saveSkill(skill);
}
```

They have different control-flow behavior.

---

# 42. Best Practices

## 1. Prefer `for...of` when you need values

Good:

```js
for (const skill of skills) {
  console.log(skill);
}
```

---

## 2. Use `entries()` when you need index + value

```js
for (const [index, skill] of skills.entries()) {
  console.log(index, skill);
}
```

---

## 3. Do not use `for...in` for normal array iteration

Prefer:

```js
for (const skill of skills) {
  // ...
}
```

---

## 4. Use array methods when they express intent better

Use:

```js
map()
```

for transformation.

Use:

```js
filter()
```

for selection.

Use:

```js
find()
```

for finding one value.

Use:

```js
some()
```

for checking whether at least one value matches.

Use:

```js
every()
```

for checking whether all values match.

Use:

```js
for...of
```

when you need general sequential control flow.

---

## 5. Use `const` for the loop variable when possible

Prefer:

```js
for (const skill of skills) {
  console.log(skill);
}
```

unless you actually need to reassign the loop variable.

---

# 43. `for...of` in React

`for...of` is valid JavaScript and can be used inside React logic.

For example:

```js
function findSkill(skills, target) {
  for (const skill of skills) {
    if (skill === target) {
      return skill;
    }
  }

  return null;
}
```

You could then use this function from React code.

However, for rendering lists, React commonly uses:

```jsx
{skills.map((skill) => (
  <li key={skill}>{skill}</li>
))}
```

instead of:

```jsx
for (const skill of skills) {
  // ...
}
```

The reason is that JSX rendering naturally works well with array methods such as `map()`.

So:

```text
for...of
→ general JavaScript control flow

map()
→ transformation into renderable elements
```

Understanding `for...of` still matters because React developers frequently write JavaScript logic outside JSX.

---

# 44. `for...of` in Next.js and Node.js

`for...of` is also common in server-side JavaScript.

For example:

```js
async function processUsers(users) {
  for (const user of users) {
    await processUser(user);
  }
}
```

This is useful when each operation depends on the previous one or when sequential processing is intentional.

It is also useful when working with:

* Database records
* API results
* File data
* Request processing
* Server-side business logic

Again, this is standard JavaScript, not a Next.js-specific feature.

---

# 45. Performance Considerations

For ordinary application code, choose the loop based primarily on **clarity and required behavior**, not tiny theoretical differences.

For example:

```js
for (const skill of skills) {
  console.log(skill);
}
```

is clear when you need sequential iteration.

For data transformation:

```js
const result = skills.map((skill) => skill.toUpperCase());
```

is clearer because it communicates the intent directly.

Performance optimization should be based on actual profiling rather than assumptions.

---

# 46. Quick Reference

### Array values

```js
for (const value of array) {
  console.log(value);
}
```

### String characters

```js
for (const character of string) {
  console.log(character);
}
```

### Set values

```js
for (const value of set) {
  console.log(value);
}
```

### Map entries

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

### Object keys

```js
for (const key of Object.keys(object)) {
  console.log(key);
}
```

### Object values

```js
for (const value of Object.values(object)) {
  console.log(value);
}
```

### Object entries

```js
for (const [key, value] of Object.entries(object)) {
  console.log(key, value);
}
```

### Index + value

```js
for (const [index, value] of array.entries()) {
  console.log(index, value);
}
```

### Stop iteration

```js
for (const value of iterable) {
  if (condition) {
    break;
  }
}
```

### Skip iteration

```js
for (const value of iterable) {
  if (condition) {
    continue;
  }
}
```

### Sequential async processing

```js
for (const value of iterable) {
  await process(value);
}
```

---

# 47. Comparison Table

| Feature                 | `for`               | `for...of`       | `for...in`             | `forEach`               |
| ----------------------- | ------------------- | ---------------- | ---------------------- | ----------------------- |
| Iterates values         | Yes                 | Yes              | No                     | Yes                     |
| Iterates keys/indexes   | Yes                 | With `entries()` | Yes                    | Index provided          |
| Works with arrays       | Yes                 | Yes              | Yes, but not preferred | Yes                     |
| Works with strings      | With indexing       | Yes              | No, not for characters | No                      |
| Works with Set          | No direct iteration | Yes              | No                     | No                      |
| Works with Map          | No direct iteration | Yes              | No                     | No                      |
| `break`                 | Yes                 | Yes              | Yes                    | No                      |
| `continue`              | Yes                 | Yes              | Yes                    | No                      |
| `await` sequentially    | Yes                 | Yes              | Yes                    | Not directly            |
| Best for transformation | Sometimes           | Sometimes        | No                     | Often `map()` is better |
| General control flow    | Excellent           | Excellent        | Object properties      | Limited                 |

---

# 48. Mental Model

Think of `for...of` as:

```text
Iterable
   ↓
Give me the next value
   ↓
Assign it to the loop variable
   ↓
Run the loop body
   ↓
Give me the next value
   ↓
Repeat
   ↓
Stop when there are no more values
```

For example:

```js
const skills = ["JavaScript", "React", "Next.js"];

for (const skill of skills) {
  console.log(skill);
}
```

Mental execution:

```text
skills
  ↓
"JavaScript"
  ↓
skill = "JavaScript"

skills
  ↓
"React"
  ↓
skill = "React"

skills
  ↓
"Next.js"
  ↓
skill = "Next.js"

No more values
  ↓
Loop ends
```

---

# 49. The Most Important Rule

Remember:

```text
for...of → values
for...in → keys
```

Example:

```js
const skills = ["JavaScript", "React", "Next.js"];
```

`for...of`:

```js
for (const skill of skills) {
  console.log(skill);
}
```

gives:

```text
JavaScript
React
Next.js
```

`for...in`:

```js
for (const index in skills) {
  console.log(index);
}
```

gives:

```text
0
1
2
```

If you remember only one thing from this file, remember this distinction.

---

# 50. Key Takeaways

* `for...of` was introduced with ES6.
* It iterates over the **values of an iterable**.
* Arrays are iterable.
* Strings are iterable.
* Sets are iterable.
* Maps are iterable.
* Typed arrays are iterable.
* Plain objects are not iterable by default.
* `Object.keys()`, `Object.values()`, and `Object.entries()` can be used to iterate over object data with `for...of`.
* `for...of` is different from `for...in`.
* `for...of` gives values.
* `for...in` gives property keys.
* `entries()` can provide both index and value.
* `break` and `continue` work naturally with `for...of`.
* `for...of` is useful for sequential asynchronous operations with `await`.
* For array transformations, `map()` may communicate intent better.
* `for...of` is standard JavaScript and is not a React-specific feature.
* Understanding iterables helps you understand why `for...of` works with arrays, strings, Sets, and Maps.
* The detailed iterator protocol is an advanced topic and should be learned separately.

---

## Learning Priority

**High priority for JavaScript and useful for React/Next.js.**

You should be comfortable with:

1. `for...of` syntax
2. Iterating over arrays
3. `for...of` vs `for...in`
4. `Object.keys()` / `Object.values()` / `Object.entries()`
5. `break` and `continue`
6. `entries()` with destructuring
7. Sequential `async/await` with `for...of`
8. The basic idea of iterables

You do **not** need to memorize the internal iterator protocol yet.

First master:

```js
for (const value of iterable) {
  // ...
}
```

Then learn how JavaScript makes an object iterable through `Symbol.iterator` and the iterator protocol in the advanced `iterators` topic.
