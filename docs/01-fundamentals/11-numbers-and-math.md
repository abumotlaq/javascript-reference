# Numbers and Math

JavaScript uses the `Number` type for most numeric values and also supports `BigInt` for arbitrary-precision integers.

## Number Values

```js
const integer = 42;
const decimal = 3.14;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;
```

## Numeric Checks

```js
console.log(Number.isInteger(42));
console.log(Number.isFinite(42));
console.log(Number.isNaN(NaN));
```

## Parsing Numbers

```js
console.log(Number("42"));
console.log(parseInt("42px", 10));
console.log(parseFloat("3.14px"));
```

## Rounding

```js
console.log(Math.round(4.6));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.trunc(4.9));
```

## Math Methods

```js
console.log(Math.abs(-10));
console.log(Math.max(10, 20, 30));
console.log(Math.min(10, 20, 30));
console.log(Math.pow(2, 3));
console.log(Math.sqrt(25));
```

## Random Numbers

```js
const random = Math.random();
console.log(random);
```

Random integers in a range:

```js
function randomInteger(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

console.log(randomInteger(1, 10));
```

## Floating-Point Precision

```js
console.log(0.1 + 0.2);
```

Binary floating-point representation can produce precision differences. Avoid assuming decimal arithmetic is exact.

## Number Formatting

```js
const price = 1234.5678;

console.log(price.toFixed(2));
console.log(price.toString());
```

## BigInt

```js
const largeNumber = 9007199254740993n;
console.log(largeNumber);
```

Do not mix `BigInt` and `Number` directly in arithmetic.

```js
const count = 10n;
const number = 5;

console.log(Number(count) + number);
```
