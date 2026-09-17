# Arrays

Arrays are ordered, zero-indexed collections used to store multiple values in a single variable.

## Creating Arrays

```js
const empty = [];
const skills = ["JavaScript", "React", "Next.js"];
const mixed = ["Osama Abu Motlaq", 25, true, null];
```

## Indexing

```js
const skills = ["JavaScript", "React", "Next.js"];

console.log(skills[0]);
console.log(skills[2]);
console.log(skills[skills.length - 1]);
```

## Updating Items

```js
const skills = ["JavaScript", "React", "Next.js"];
skills[1] = "Node.js";
```

## Array Length

```js
const numbers = [10, 20, 30];
console.log(numbers.length);
```

## Adding and Removing Items

```js
const skills = ["JavaScript", "React"];

skills.push("Next.js");
skills.pop();
skills.unshift("HTML");
skills.shift();
```

`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse` mutate the array.

## Non-Mutating Methods

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);
const even = numbers.filter((number) => number % 2 === 0);
const firstLarge = numbers.find((number) => number > 3);
const hasLarge = numbers.some((number) => number > 4);
const allPositive = numbers.every((number) => number > 0);
```

## slice and splice

```js
const numbers = [10, 20, 30, 40];

const copy = numbers.slice(1, 3);
numbers.splice(1, 2);
```

`slice()` returns a new array and does not mutate the original. `splice()` changes the original array.

## Searching

```js
const skills = ["JavaScript", "React", "Next.js"];

console.log(skills.includes("React"));
console.log(skills.indexOf("React"));
console.log(skills.findIndex((skill) => skill === "Next.js"));
```

## Iteration

```js
const skills = ["JavaScript", "React", "Next.js"];

for (const skill of skills) {
  console.log(skill);
}

skills.forEach((skill) => {
  console.log(skill);
});
```

## reduce

```js
const numbers = [10, 20, 30];

const total = numbers.reduce(
  (sum, number) => sum + number,
  0
);
```

## Copying Arrays

```js
const original = [1, 2, 3];
const copy = [...original];
```

The spread syntax creates a shallow copy. Nested objects remain shared references.

## Combining Arrays

```js
const frontend = ["HTML", "CSS"];
const backend = ["Node.js", "Express.js"];

const stack = [...frontend, ...backend];
```

## Array-like Values

DOM collections such as `NodeList` are not always regular arrays. Convert them when array methods are needed.

```js
const elements = document.querySelectorAll("button");
const buttons = Array.from(elements);
```

## Common Pitfalls

- Arrays are objects in JavaScript.
- Array indexes start at `0`.
- `sort()` sorts values as strings by default.
- `slice()` and `splice()` are different.
- Copying an array is shallow.
- Mutating an array can create bugs when other code shares the same reference.
