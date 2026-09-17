# Truthy, Falsy, and Nullish Values

JavaScript evaluates values in boolean contexts. This behavior is used heavily in conditions, logical operators, defaults, and UI code.

## Falsy Values

```js
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

Everything else is truthy, including empty arrays and empty objects.

```js
console.log(Boolean([]));
console.log(Boolean({}));
```

## Truthy and Falsy in Conditions

```js
const username = "Osama Abu Motlaq";

if (username) {
  console.log("Username exists.");
}
```

## Logical AND

```js
const isLoggedIn = true;

isLoggedIn && console.log("Dashboard");
```

## Logical OR

```js
const displayName = "";
const name = displayName || "Osama Abu Motlaq";

console.log(name);
```

Logical OR returns the first truthy operand.

## Nullish Coalescing

```js
const count = 0;
const result = count ?? 10;

console.log(result);
```

`??` falls back only for `null` or `undefined`, not for every falsy value.

## OR vs Nullish Coalescing

```js
const count = 0;

console.log(count || 10);
console.log(count ?? 10);
```

## Conditional Operator

```js
const age = 25;
const status = age >= 18 ? "adult" : "minor";

console.log(status);
```

## Double Negation

```js
const value = "JavaScript";

console.log(!!value);
```

Use this carefully; `Boolean(value)` is usually clearer when explicit conversion is the goal.
