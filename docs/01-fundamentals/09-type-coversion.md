# Type Conversion and Coercion

JavaScript can convert values explicitly or implicitly. Understanding conversion is essential for avoiding unexpected results.

## Explicit String Conversion

```js
console.log(String(123));
console.log(String(true));
console.log(String(null));
```

## Explicit Number Conversion

```js
console.log(Number("42"));
console.log(Number("3.14"));
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
```

Invalid numeric text produces `NaN`.

```js
console.log(Number("hello"));
```

## Boolean Conversion

```js
console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean("text"));
console.log(Boolean(""));
console.log(Boolean(null));
```

Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Objects and arrays are truthy, including empty ones.

## parseInt and parseFloat

```js
console.log(parseInt("42px", 10));
console.log(parseFloat("3.14px"));
```

These functions parse a numeric prefix instead of requiring the whole string to be numeric.

## Unary Plus

```js
console.log(+"42");
console.log(+true);
console.log(+null);
```

## Implicit Coercion

```js
console.log("5" + 2);
console.log("5" - 2);
console.log("5" * 2);
console.log("5" / 2);
```

The `+` operator can perform string concatenation, while arithmetic operators usually convert operands to numbers.

## Equality and Conversion

```js
console.log(5 == "5");
console.log(5 === "5");
```

Prefer strict equality in normal application code because it avoids many implicit conversions.

## NaN

```js
const value = Number("hello");

console.log(value);
console.log(Number.isNaN(value));
```

`NaN` is not equal to itself, so use `Number.isNaN()` for an explicit check.

## null and undefined

```js
console.log(Number(null));
console.log(Number(undefined));
```

`null` converts to `0` in numeric conversion, while `undefined` converts to `NaN`.

## Avoid Accidental Coercion

```js
const input = "10";
const quantity = Number(input);

if (Number.isFinite(quantity)) {
  console.log(quantity * 2);
}
```
