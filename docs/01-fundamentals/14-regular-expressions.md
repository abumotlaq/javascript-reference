# Regular Expressions

Regular expressions provide patterns for searching, validating, and replacing text.

## Creating a Regular Expression

```js
const pattern = /javascript/i;
const anotherPattern = new RegExp("javascript", "i");
```

## test

```js
const pattern = /javascript/i;

console.log(pattern.test("JavaScript is useful."));
```

## match

```js
const text = "JavaScript JavaScript";
const matches = text.match(/javascript/gi);

console.log(matches);
```

## search

```js
const text = "JavaScript";
console.log(text.search(/script/i));
```

## replace

```js
const text = "JavaScript JavaScript";
const result = text.replace(/javascript/gi, "JS");

console.log(result);
```

## Character Classes

```js
console.log(/\d/.test("123"));
console.log(/\w/.test("JavaScript"));
console.log(/\s/.test("hello world"));
```

## Quantifiers

```js
console.log(/^\d{4}$/.test("2026"));
console.log(/^\d+$/.test("12345"));
```

## Anchors

```js
console.log(/^JavaScript/.test("JavaScript reference"));
console.log(/reference$/.test("JavaScript reference"));
```

## Groups

```js
const pattern = /(JavaScript) (React)/;
const match = "JavaScript React".match(pattern);

console.log(match);
```

## Named Groups

```js
const pattern = /(?<first>JavaScript) (?<second>React)/;
const match = "JavaScript React".match(pattern);

console.log(match.groups);
```

## Practical Validation

```js
function isSimpleEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

console.log(isSimpleEmail("osama@example.com"));
```

Regular expressions are useful for simple syntax checks, but complex validation rules often require normal JavaScript logic as well.

## Common Flags

- `g` for global matching
- `i` for case-insensitive matching
- `m` for multiline matching
- `s` for dot-all behavior
- `u` for Unicode behavior

