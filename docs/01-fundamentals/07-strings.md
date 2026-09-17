# Strings

Strings represent text values. JavaScript strings are immutable, so string operations return new strings instead of changing the original string.

## Creating Strings

```js
const single = 'JavaScript';
const double = "JavaScript";
const template = `JavaScript`;
```

## Length and Indexing

```js
const text = "JavaScript";

console.log(text.length);
console.log(text[0]);
console.log(text.at(-1));
```

## Common String Methods

```js
const text = "JavaScript";

console.log(text.toUpperCase());
console.log(text.toLowerCase());
console.log(text.includes("Script"));
console.log(text.startsWith("Java"));
console.log(text.endsWith("Script"));
```

## Searching

```js
const text = "JavaScript is powerful";

console.log(text.indexOf("Script"));
console.log(text.lastIndexOf("a"));
console.log(text.includes("powerful"));
```

## Extracting Text

```js
const text = "JavaScript";

console.log(text.slice(0, 4));
console.log(text.substring(4, 10));
```

## Replacing Text

```js
const text = "JavaScript JavaScript";

console.log(text.replace("JavaScript", "JS"));
console.log(text.replaceAll("JavaScript", "JS"));
```

## Trimming

```js
const input = "   Osama Abu Motlaq   ";

console.log(input.trim());
console.log(input.trimStart());
console.log(input.trimEnd());
```

## Splitting and Joining

```js
const skills = "JavaScript,React,Next.js";
const list = skills.split(",");
const text = list.join(" | ");
```

## Concatenation

```js
const firstName = "Osama";
const lastName = "Abu Motlaq";

const fullName = firstName + " " + lastName;
```

Template literals are covered in the ES6+ section.

## Comparing Strings

```js
console.log("a" === "a");
console.log("a" < "b");
```

String comparisons are based on Unicode code unit values.

## Escape Characters

```js
const message = "He said \"Hello\".";
const path = "C:\\Users\\Osama";
const line = "First line\nSecond line";
```

## Common Pitfalls

- Strings are immutable.
- `slice()` does not mutate the original string.
- `replace()` replaces the first matching occurrence unless a suitable pattern is used.
- `split()` returns an array.
- String comparisons are case-sensitive.
