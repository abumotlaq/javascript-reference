# Date and Time

JavaScript provides the `Date` object for working with dates and times.

## Current Date and Time

```js
const now = new Date();
console.log(now);
```

## Creating Dates

```js
const dateFromString = new Date("2026-01-15T10:30:00Z");
const dateFromParts = new Date(2026, 0, 15, 10, 30);
```

Months passed to the multi-argument constructor are zero-based.

## Timestamps

```js
const now = Date.now();
const date = new Date(now);

console.log(now);
console.log(date);
```

## Reading Date Parts

```js
const date = new Date();

console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDate());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
```

## UTC Values

```js
const date = new Date();

console.log(date.getUTCFullYear());
console.log(date.getUTCMonth());
console.log(date.getUTCDate());
```

## Formatting

```js
const date = new Date("2026-01-15T10:30:00Z");

console.log(date.toISOString());
console.log(date.toUTCString());
console.log(date.toDateString());
```

## Comparing Dates

```js
const first = new Date("2026-01-10");
const second = new Date("2026-01-15");

console.log(first < second);
```

## Date Arithmetic

```js
const start = new Date("2026-01-01");
const end = new Date("2026-01-10");

const difference = end - start;
const days = difference / (1000 * 60 * 60 * 24);

console.log(days);
```

## Invalid Dates

```js
const date = new Date("invalid");

console.log(Number.isNaN(date.getTime()));
```

## Time Zones

ISO strings ending in `Z` represent UTC. Date parsing and display can otherwise involve the local time zone. For complex date and time requirements, dedicated date-time libraries or the modern Temporal API may be appropriate depending on runtime support.
