# JavaScript Iterators

Iterators are objects that provide a standard way to access values one at a time.

They are a fundamental part of modern JavaScript because many language features, including `for...of`, spread syntax, destructuring, `Array.from()`, `Map`, `Set`, and generators, rely on the **iterator protocol**.

Understanding iterators is important because they explain how JavaScript moves through sequences of values.

---

## 1. What Is an Iterator?

An **iterator** is an object that provides a `next()` method.

The `next()` method returns an object containing:

```js
{
  value: ...,
  done: ...
}
```

Example:

```js
const iterator = {
  next() {
    return {
      value: "Osama Abu Motlaq",
      done: false
    };
  }
};

console.log(iterator.next());
```

Output:

```text
{
  value: "Osama Abu Motlaq",
  done: false
}
```

The iterator is responsible for determining:

1. What value should be returned next?
2. Whether iteration has finished.

---

# 2. The Iterator Protocol

JavaScript defines a standard contract called the **iterator protocol**.

An object follows the iterator protocol if it provides a `next()` method that returns an object with:

```js
{
  value: ...,
  done: ...
}
```

For example:

```js
const iterator = {
  next() {
    return {
      value: 10,
      done: false
    };
  }
};
```

Calling:

```js
iterator.next();
```

returns:

```js
{
  value: 10,
  done: false
}
```

### Iterator Protocol

The basic structure is:

```text
Iterator
   │
   └── next()
          │
          ↓
   { value, done }
```

The protocol defines the interface.

It does not dictate how the iterator internally stores or calculates its values.

---

# 3. Understanding `value`

The `value` property contains the current value produced by the iterator.

Example:

```js
const iterator = {
  next() {
    return {
      value: 100,
      done: false
    };
  }
};

console.log(iterator.next().value);
```

Output:

```text
100
```

The value can be almost anything:

```js
{
  value: "Osama Abu Motlaq",
  done: false
}
```

Or:

```js
{
  value: { name: "Osama Abu Motlaq" },
  done: false
}
```

Or:

```js
{
  value: [10, 20, 30],
  done: false
}
```

---

# 4. Understanding `done`

The `done` property tells JavaScript whether the iterator has finished.

```js
{
  value: 10,
  done: false
}
```

means:

> There is a value available and iteration has not finished.

While:

```js
{
  value: undefined,
  done: true
}
```

means:

> Iteration has finished.

Example:

```js
const iterator = {
  next() {
    return {
      value: 10,
      done: true
    };
  }
};
```

Once `done` is `true`, the iterator is considered exhausted.

---

# 5. A Simple Custom Iterator

Let's create an iterator that produces:

```text
1
2
3
```

```js
function createNumberIterator() {
  let current = 1;

  return {
    next() {
      if (current <= 3) {
        return {
          value: current++,
          done: false
        };
      }

      return {
        value: undefined,
        done: true
      };
    }
  };
}
```

Create the iterator:

```js
const iterator = createNumberIterator();
```

Use it manually:

```js
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

---

# 6. How the Iterator Remembers Its Position

The important part of the previous example is:

```js
let current = 1;
```

This variable stores the iterator's current position.

When this runs:

```js
value: current++
```

the current value is returned and then `current` is increased.

So the sequence becomes:

```text
current = 1
    ↓
next() → 1
    ↓
current = 2
    ↓
next() → 2
    ↓
current = 3
    ↓
next() → 3
    ↓
current = 4
    ↓
next() → done
```

The state is preserved because the iterator closes over `current`.

This is an example of a **closure**.

---

# 7. Iterator and Closure

The iterator example uses a closure:

```js
function createNumberIterator() {
  let current = 1;

  return {
    next() {
      return {
        value: current++,
        done: current > 3
      };
    }
  };
}
```

The returned object still has access to:

```js
current
```

even though `createNumberIterator()` has already finished executing.

This is one of the practical relationships between:

* Functions
* Closures
* State
* Iterators

---

# 8. Iterator vs Iterable

This distinction is one of the most important concepts in JavaScript.

An **iterator** has:

```js
next()
```

An **iterable** has:

```js
[Symbol.iterator]()
```

which returns an iterator.

### Iterator

```js
const iterator = {
  next() {
    return {
      value: 10,
      done: false
    };
  }
};
```

### Iterable

```js
const iterable = {
  [Symbol.iterator]() {
    return iterator;
  }
};
```

The relationship is:

```text
Iterable
   │
   │ [Symbol.iterator]()
   ↓
Iterator
   │
   │ next()
   ↓
{ value, done }
```

---

# 9. The Iterable Protocol

An object follows the **iterable protocol** if it has a method at:

```js
Symbol.iterator
```

That method must return an iterator.

Example:

```js
const collection = {
  [Symbol.iterator]() {
    return {
      next() {
        return {
          value: 1,
          done: false
        };
      }
    };
  }
};
```

Now:

```js
collection[Symbol.iterator]()
```

returns an iterator.

The iterator can then be used through its:

```js
next()
```

method.

---

# 10. `Symbol.iterator`

`Symbol.iterator` is a built-in well-known Symbol.

It identifies the standard method used to obtain an iterator from an iterable object.

Example:

```js
const numbers = [10, 20, 30];

console.log(numbers[Symbol.iterator]);
```

The array provides a function at:

```js
numbers[Symbol.iterator]
```

Calling it:

```js
const iterator = numbers[Symbol.iterator]();
```

produces an iterator.

Now:

```js
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: 30, done: false }
```

---

# 11. Arrays Are Iterable

Arrays are built-in iterables.

```js
const numbers = [10, 20, 30];
```

You can manually obtain the iterator:

```js
const iterator = numbers[Symbol.iterator]();
```

Then:

```js
console.log(iterator.next());
```

Output:

```text
{ value: 10, done: false }
```

Again:

```js
console.log(iterator.next());
```

Output:

```text
{ value: 20, done: false }
```

Again:

```js
console.log(iterator.next());
```

Output:

```text
{ value: 30, done: false }
```

Finally:

```js
console.log(iterator.next());
```

Output:

```text
{ value: undefined, done: true }
```

---

# 12. Strings Are Iterable

Strings are also iterable.

```js
const name = "Osama";
```

You can obtain a string iterator:

```js
const iterator = name[Symbol.iterator]();
```

Then:

```js
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: "O", done: false }
{ value: "s", done: false }
{ value: "a", done: false }
```

Strings can therefore be used with:

```js
for...of
```

```js
for (const character of "Osama") {
  console.log(character);
}
```

---

# 13. Sets Are Iterable

`Set` objects are iterable.

```js
const numbers = new Set([10, 20, 30]);
```

Get the iterator:

```js
const iterator = numbers[Symbol.iterator]();
```

Then:

```js
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: 30, done: false }
{ value: undefined, done: true }
```

---

# 14. Maps Are Iterable

`Map` objects are also iterable.

```js
const scores = new Map([
  ["Osama Abu Motlaq", 90],
  ["JavaScript", 95]
]);
```

The default Map iterator produces entries.

```js
const iterator = scores[Symbol.iterator]();

console.log(iterator.next());
```

Output:

```text
{
  value: ["Osama Abu Motlaq", 90],
  done: false
}
```

Next:

```js
console.log(iterator.next());
```

Output:

```text
{
  value: ["JavaScript", 95],
  done: false
}
```

---

# 15. `for...of` Uses Iterators

The `for...of` loop works with iterable values.

Example:

```js
const numbers = [10, 20, 30];

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

Conceptually, the process is similar to:

```js
const iterator = numbers[Symbol.iterator]();

let result = iterator.next();

while (!result.done) {
  console.log(result.value);

  result = iterator.next();
}
```

You normally use:

```js
for...of
```

instead of manually calling `next()`.

However, understanding the manual version explains how `for...of` works.

---

# 16. `for...of` and the Iterable Protocol

When JavaScript sees:

```js
for (const value of collection) {
  console.log(value);
}
```

it needs an iterator.

Conceptually:

```text
collection
    ↓
collection[Symbol.iterator]()
    ↓
iterator
    ↓
iterator.next()
    ↓
{ value, done }
```

The loop continues calling:

```js
next()
```

until:

```js
done === true
```

---

# 17. Creating a Custom Iterable

Let's create an object that can be used with `for...of`.

```js
const numbers = {
  start: 1,
  end: 3,

  [Symbol.iterator]() {
    let current = this.start;

    return {
      next: () => {
        if (current <= this.end) {
          return {
            value: current++,
            done: false
          };
        }

        return {
          value: undefined,
          done: true
        };
      }
    };
  }
};
```

Now:

```js
for (const number of numbers) {
  console.log(number);
}
```

Output:

```text
1
2
3
```

This object is iterable because it implements:

```js
[Symbol.iterator]()
```

The returned object is the iterator because it implements:

```js
next()
```

---

# 18. Iterable and Iterator in One Object

An object can be both an iterable and an iterator.

For example:

```js
const iterator = {
  current: 1,

  next() {
    if (this.current <= 3) {
      return {
        value: this.current++,
        done: false
      };
    }

    return {
      value: undefined,
      done: true
    };
  },

  [Symbol.iterator]() {
    return this;
  }
};
```

Now:

```js
iterator[Symbol.iterator]()
```

returns:

```js
iterator
```

because:

```js
return this;
```

The object implements both protocols.

It has:

```js
next()
```

and:

```js
[Symbol.iterator]()
```

---

# 19. Why Would an Object Be Both?

This pattern is useful when the object itself represents a single iterator.

Example:

```js
const counter = {
  current: 1,

  next() {
    if (this.current <= 3) {
      return {
        value: this.current++,
        done: false
      };
    }

    return {
      value: undefined,
      done: true
    };
  },

  [Symbol.iterator]() {
    return this;
  }
};
```

Now:

```js
for (const value of counter) {
  console.log(value);
}
```

Output:

```text
1
2
3
```

However, this design means the object maintains one shared iteration state.

Calling iteration again does not necessarily start from the beginning.

---

# 20. Independent Iterators

Most collection-like iterables return a **new iterator** each time.

```js
const numbers = [10, 20, 30];

const iteratorA = numbers[Symbol.iterator]();
const iteratorB = numbers[Symbol.iterator]();
```

Now:

```js
console.log(iteratorA.next().value);
console.log(iteratorA.next().value);

console.log(iteratorB.next().value);
```

Output:

```text
10
20
10
```

Why?

Because:

```text
iteratorA → position 2
iteratorB → position 1
```

Each iterator has independent state.

---

# 21. Exhausting an Iterator

An iterator can become exhausted.

```js
const numbers = [10, 20];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: undefined, done: true }
```

Calling `next()` again:

```js
console.log(iterator.next());
```

still produces:

```text
{ value: undefined, done: true }
```

The iterator does not automatically restart.

To iterate again, create a new iterator:

```js
const newIterator = numbers[Symbol.iterator]();
```

---

# 22. Iterators and `break`

`for...of` can stop early.

```js
const numbers = [10, 20, 30, 40];

for (const number of numbers) {
  if (number === 30) {
    break;
  }

  console.log(number);
}
```

Output:

```text
10
20
```

When a `for...of` loop stops early, JavaScript can call the iterator's:

```js
return()
```

method if the iterator provides one.

This allows an iterator to perform cleanup when iteration ends early.

---

# 23. The Optional `return()` Method

An iterator can provide:

```js
return()
```

for cleanup.

Example:

```js
const iterable = {
  [Symbol.iterator]() {
    let current = 1;

    return {
      next() {
        if (current <= 3) {
          return {
            value: current++,
            done: false
          };
        }

        return {
          value: undefined,
          done: true
        };
      },

      return() {
        console.log("Iterator closed.");

        return {
          value: undefined,
          done: true
        };
      }
    };
  }
};
```

If iteration stops early:

```js
for (const value of iterable) {
  console.log(value);

  break;
}
```

the iterator can receive the opportunity to clean up through:

```js
return()
```

This becomes particularly useful for resource-management scenarios.

---

# 24. Iterators and `for...in`

Do not confuse:

```js
for...of
```

with:

```js
for...in
```

### `for...of`

Iterates over **values** from an iterable.

```js
const numbers = [10, 20, 30];

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

### `for...in`

Iterates over **enumerable property keys**.

```js
const numbers = [10, 20, 30];

for (const index in numbers) {
  console.log(index);
}
```

Output:

```text
0
1
2
```

### Important distinction

```text
for...of → values
for...in → property keys
```

---

# 25. Plain Objects Are Not Iterable by Default

Consider:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};
```

This does not work:

```js
for (const value of user) {
  console.log(value);
}
```

You will get a `TypeError` because ordinary objects do not implement the iterable protocol by default.

You can instead use:

```js
Object.keys(user)
```

```js
Object.values(user)
```

or:

```js
Object.entries(user)
```

For example:

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

---

# 26. `Object.entries()` and Iteration

`Object.entries()` returns an array.

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};
```

Then:

```js
console.log(Object.entries(user));
```

Output:

```text
[
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"]
]
```

Because the returned value is an array, it is iterable:

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

This combines:

* `Object.entries()`
* Iterables
* `for...of`
* Destructuring

---

# 27. Iterators and Array Destructuring

Destructuring can consume iterables.

```js
const numbers = [10, 20, 30];

const [first, second] = numbers;

console.log(first);
console.log(second);
```

Output:

```text
10
20
```

The array is iterable, so destructuring can consume its iterator.

Conceptually:

```text
numbers
   ↓
Symbol.iterator
   ↓
iterator
   ↓
next()
   ↓
10
   ↓
next()
   ↓
20
```

---

# 28. Destructuring Can Work with Other Iterables

Because destructuring works with iterables, it also works with `Set`.

```js
const numbers = new Set([10, 20, 30]);

const [first, second] = numbers;

console.log(first);
console.log(second);
```

Output:

```text
10
20
```

The important requirement is not:

> "It must be an array."

The requirement is:

> "It must provide an iterator."

---

# 29. Iterators and the Spread Operator

The spread syntax:

```js
...
```

can consume iterables.

Example:

```js
const numbers = new Set([10, 20, 30]);

const array = [...numbers];

console.log(array);
```

Output:

```text
[10, 20, 30]
```

Conceptually:

```text
Set
 ↓
Symbol.iterator
 ↓
Iterator
 ↓
next()
 ↓
10, 20, 30
 ↓
new Array
```

This is why spread works with:

* Arrays
* Strings
* Sets
* Maps
* Other iterables

---

# 30. Strings and Spread

Because strings are iterable:

```js
const name = "Osama";

const characters = [...name];

console.log(characters);
```

Output:

```text
["O", "s", "a", "m", "a"]
```

The spread operator consumes the string's iterator.

---

# 31. Maps and Spread

```js
const scores = new Map([
  ["Osama Abu Motlaq", 90],
  ["JavaScript", 95]
]);

const entries = [...scores];

console.log(entries);
```

Output:

```text
[
  ["Osama Abu Motlaq", 90],
  ["JavaScript", 95]
]
```

Again, the Map's iterator provides the values.

---

# 32. `Array.from()` and Iterables

`Array.from()` can create an array from an iterable.

```js
const numbers = new Set([10, 20, 30]);

const array = Array.from(numbers);

console.log(array);
```

Output:

```text
[10, 20, 30]
```

It can also work with strings:

```js
const characters = Array.from("Osama");

console.log(characters);
```

Output:

```text
["O", "s", "a", "m", "a"]
```

---

# 33. Custom Iterable + Spread

Our custom iterable can also work with spread syntax.

```js
const numbers = {
  start: 1,
  end: 3,

  [Symbol.iterator]() {
    let current = this.start;

    return {
      next: () => {
        if (current <= this.end) {
          return {
            value: current++,
            done: false
          };
        }

        return {
          value: undefined,
          done: true
        };
      }
    };
  }
};
```

Now:

```js
console.log([...numbers]);
```

Output:

```text
[1, 2, 3]
```

The same iterable can therefore work with:

```js
for...of
```

and:

```js
...
```

because both understand the iterable protocol.

---

# 34. Iterators and `Map`

A Map has multiple useful iterator methods.

```js
const scores = new Map([
  ["Osama Abu Motlaq", 90],
  ["JavaScript", 95]
]);
```

### Default iterator

```js
scores[Symbol.iterator]()
```

is equivalent to:

```js
scores.entries()
```

### Keys

```js
scores.keys()
```

### Values

```js
scores.values()
```

### Entries

```js
scores.entries()
```

Example:

```js
for (const [key, value] of scores) {
  console.log(key, value);
}
```

This works because Map's default iterator produces entries.

---

# 35. Set Iterator

A Set provides:

```js
values()
```

and:

```js
keys()
```

and:

```js
entries()
```

For example:

```js
const numbers = new Set([10, 20, 30]);

for (const value of numbers) {
  console.log(value);
}
```

Output:

```text
10
20
30
```

The default Set iterator produces values.

---

# 36. Typed Arrays Are Iterable

Typed arrays such as:

```js
Uint8Array
```

are also iterable.

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

This is another example of JavaScript's iterator protocol providing a common interface across different data structures.

---

# 37. Iterators Are Not Necessarily Arrays

An iterator is not an array.

For example:

```js
const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();
```

Here:

```js
Array.isArray(iterator);
```

returns:

```text
false
```

The iterator is an object that provides:

```js
next()
```

It does not need to store the values as an array.

---

# 38. Lazy Iteration

One important advantage of iterators is that values can be produced **on demand**.

Consider:

```js
function createCounter() {
  let current = 1;

  return {
    next() {
      return {
        value: current++,
        done: false
      };
    }
  };
}
```

The iterator does not need to create an array containing:

```text
1, 2, 3, 4, 5, ...
```

It can produce a value only when:

```js
next()
```

is called.

This idea is called **lazy evaluation** or **lazy iteration**.

---

# 39. Why Lazy Iteration Matters

Imagine a sequence containing millions of values.

Creating all values immediately could consume significant memory.

An iterator can produce values one at a time.

Conceptually:

```text
Request value
     ↓
Generate value
     ↓
Consume value
     ↓
Request next value
     ↓
Generate next value
```

This can be much more memory-efficient for large or potentially infinite sequences.

---

# 40. Infinite Iterators

Iterators do not have to finish.

For example:

```js
const counter = {
  current: 1,

  next() {
    return {
      value: this.current++,
      done: false
    };
  }
};
```

This iterator can keep producing:

```text
1
2
3
4
5
...
```

However, you must not use an infinite iterator in an unrestricted `for...of` loop:

```js
for (const value of counter) {
  console.log(value);
}
```

This would continue indefinitely if the object is also made iterable.

Instead, control the iteration:

```js
let count = 0;

for (const value of counter) {
  console.log(value);

  count++;

  if (count === 5) {
    break;
  }
}
```

---

# 41. Custom Iterable with a Limit

A safer example:

```js
const counter = {
  [Symbol.iterator]() {
    let current = 1;

    return {
      next() {
        if (current <= 5) {
          return {
            value: current++,
            done: false
          };
        }

        return {
          value: undefined,
          done: true
        };
      }
    };
  }
};
```

Now:

```js
for (const value of counter) {
  console.log(value);
}
```

Output:

```text
1
2
3
4
5
```

---

# 42. Iterators and `for...of` with `break`

Because iterators can maintain state, stopping early matters.

```js
const numbers = [10, 20, 30, 40, 50];

for (const number of numbers) {
  if (number === 30) {
    break;
  }

  console.log(number);
}
```

Output:

```text
10
20
```

The iteration does not continue to:

```text
40
50
```

---

# 43. Iterators and `continue`

`continue` skips the current iteration.

```js
const numbers = [10, 20, 30];

for (const number of numbers) {
  if (number === 20) {
    continue;
  }

  console.log(number);
}
```

Output:

```text
10
30
```

The iterator continues from the next value.

---

# 44. Iterators and `async` Code

Normal iterators work with:

```js
for...of
```

Asynchronous iterators use:

```js
for await...of
```

This is a separate protocol called the **async iterable/async iterator protocol**.

Normal iterator:

```js
[Symbol.iterator]
```

Async iterator:

```js
[Symbol.asyncIterator]
```

Example syntax:

```js
for await (const value of asyncIterable) {
  console.log(value);
}
```

Async iterators are especially useful when values arrive asynchronously.

---

# 45. Iterator vs Async Iterator

### Normal Iterator

Uses:

```js
next()
```

and produces:

```js
{
  value,
  done
}
```

Used by:

```js
for...of
```

### Async Iterator

Its `next()` produces a Promise resolving to:

```js
{
  value,
  done
}
```

Used by:

```js
for await...of
```

Conceptually:

```text
Normal:
next()
 ↓
{ value, done }

Async:
next()
 ↓
Promise
 ↓
{ value, done }
```

---

# 46. Generators and Iterators

Generators provide a much easier way to create iterators.

A generator function uses:

```js
function*
```

Example:

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}
```

Calling the generator function:

```js
const iterator = numbers();
```

returns a generator object.

The generator object is an iterator.

```js
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: 30, done: false }
{ value: undefined, done: true }
```

---

# 47. `yield`

The:

```js
yield
```

keyword produces a value and pauses the generator.

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}
```

The generator does not execute all the code immediately.

Instead:

```text
numbers()
   ↓
generator object
   ↓
next()
   ↓
yield 10
   ↓
pause
   ↓
next()
   ↓
yield 20
   ↓
pause
```

This is another example of lazy evaluation.

---

# 48. Generator vs Manual Iterator

Manual iterator:

```js
function createNumbers() {
  let current = 1;

  return {
    next() {
      if (current <= 3) {
        return {
          value: current++,
          done: false
        };
      }

      return {
        value: undefined,
        done: true
      };
    }
  };
}
```

Generator:

```js
function* createNumbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

The generator version is much shorter.

Use:

```js
const iterator = createNumbers();
```

Then:

```js
console.log(iterator.next());
```

Output:

```text
{ value: 1, done: false }
```

Generators automatically handle much of the iterator protocol.

---

# 49. Generators Are Iterable

Generator objects are not only iterators; they are also iterable.

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

const iterator = numbers();
```

You can use:

```js
for (const number of iterator) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

You can also use:

```js
const iterator = numbers();

console.log([...iterator]);
```

Output:

```text
[10, 20, 30]
```

---

# 50. The Complete Iterator Mental Model

The most important structure to remember is:

```text
Iterable
   │
   │ [Symbol.iterator]()
   ↓
Iterator
   │
   │ next()
   ↓
{ value, done }
```

For `for...of`:

```text
for...of
   │
   ↓
[Symbol.iterator]()
   │
   ↓
Iterator
   │
   ├── next()
   ├── next()
   ├── next()
   └── next() → done: true
```

For spread:

```text
[...iterable]
      │
      ↓
Symbol.iterator
      │
      ↓
Iterator
      │
      ↓
Values
      │
      ↓
New Array
```

For destructuring:

```text
const [a, b] = iterable
          │
          ↓
      Iterator
          │
          ↓
       Values
```

---

# 51. Common Built-In Iterables

JavaScript provides many built-in iterables.

| Value      | Iterable? | Default iteration      |
| ---------- | --------: | ---------------------- |
| Array      |       Yes | Array values           |
| String     |       Yes | Characters/code points |
| Set        |       Yes | Set values             |
| Map        |       Yes | Key-value entries      |
| TypedArray |       Yes | Typed array values     |
| Generator  |       Yes | Yielded values         |

Ordinary objects are not iterable by default:

```js
const user = {
  name: "Osama Abu Motlaq"
};
```

This does not automatically implement:

```js
Symbol.iterator
```

---

# 52. How to Check Whether Something Is Iterable

You can check whether a value provides an iterator method.

```js
const numbers = [10, 20, 30];

console.log(typeof numbers[Symbol.iterator]);
```

Output:

```text
function
```

For a normal object:

```js
const user = {
  name: "Osama Abu Motlaq"
};

console.log(user[Symbol.iterator]);
```

Output:

```text
undefined
```

Therefore the object is not iterable by default.

---

# 53. Important: `Symbol.iterator` Must Return an Iterator

This is valid:

```js
const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        return {
          value: 10,
          done: true
        };
      }
    };
  }
};
```

But this is invalid:

```js
const iterable = {
  [Symbol.iterator]() {
    return 10;
  }
};
```

Why?

Because:

```js
[Symbol.iterator]()
```

must return an object implementing the iterator protocol.

That means it needs a:

```js
next()
```

method.

---

# 54. Common Mistake: Confusing Iterable and Iterator

Incorrect mental model:

```text
Iterable = Iterator
```

Correct:

```text
Iterable
    ↓
produces
    ↓
Iterator
    ↓
produces values
```

An iterable has:

```js
[Symbol.iterator]()
```

An iterator has:

```js
next()
```

---

# 55. Common Mistake: Using `for...of` on Plain Objects

This causes an error:

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer"
};

for (const value of user) {
  console.log(value);
}
```

A normal object is not iterable.

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

# 56. Common Mistake: Confusing `for...in` with `for...of`

```js
const numbers = [10, 20, 30];
```

This:

```js
for (const value of numbers) {
  console.log(value);
}
```

produces:

```text
10
20
30
```

While:

```js
for (const index in numbers) {
  console.log(index);
}
```

produces:

```text
0
1
2
```

Remember:

```text
for...of → values
for...in → keys
```

---

# 57. Common Mistake: Assuming Every Iterator Restarts

This:

```js
const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
```

leaves the iterator at its current position.

Calling:

```js
iterator.next();
```

does not restart from `10`.

To restart:

```js
const newIterator = numbers[Symbol.iterator]();
```

---

# 58. Common Mistake: Calling `next()` Without Understanding the Result

This:

```js
iterator.next();
```

does not directly return the value.

It returns:

```js
{
  value: ...,
  done: ...
}
```

Therefore:

```js
const result = iterator.next();

console.log(result.value);
console.log(result.done);
```

This distinction is fundamental.

---

# 59. Common Mistake: Creating an Infinite Loop

An iterator that never returns:

```js
done: true
```

can be infinite.

Example:

```js
const counter = {
  current: 1,

  next() {
    return {
      value: this.current++,
      done: false
    };
  }
};
```

If made iterable and consumed without a stopping condition, it can run forever.

Use a controlled condition:

```js
let count = 0;

for (const value of counter) {
  console.log(value);

  count++;

  if (count === 5) {
    break;
  }
}
```

---

# 60. Iterators and React

Iterators are relevant to React because modern React development depends heavily on JavaScript features that consume iterables.

For example:

```js
const projects = [
  "Portfolio",
  "E-Commerce",
  "Dashboard"
];
```

React commonly renders arrays:

```jsx
{projects.map((project) => (
  <li key={project}>{project}</li>
))}
```

The important React connection is not that React requires you to manually create iterators.

Instead, learning iterators strengthens your understanding of the JavaScript iteration model behind:

* Arrays
* `for...of`
* Spread syntax
* Destructuring
* `Map`
* `Set`
* Generators
* Modern JavaScript APIs

---

# 61. Iterators and React State

Spread syntax is extremely common in React:

```js
const updatedProjects = [...projects, newProject];
```

The spread operation relies on iteration.

Similarly, destructuring:

```js
const [count, setCount] = useState(0);
```

uses iterable destructuring semantics.

Understanding iterables therefore helps explain syntax frequently encountered in React.

---

# 62. Iterators and Next.js

Next.js applications also use modern JavaScript heavily.

You will encounter:

```js
for...of
```

```js
const values = [...data];
```

```js
const [first, second] = values;
```

```js
for (const [key, value] of Object.entries(data)) {
  // ...
}
```

You generally will not need to implement custom iterators in ordinary Next.js application code.

However, understanding the protocol helps you understand the JavaScript language features underneath the framework.

---

# 63. When Should You Create a Custom Iterator?

Most application code does not need custom iterators.

Use a custom iterator when you have a sequence that has meaningful iteration behavior.

Examples include:

* Custom collections
* Ranges
* Trees
* Graph traversal
* Streams of values
* Lazy sequences
* Domain-specific data structures

For example, a range abstraction can naturally support:

```js
for (const number of range) {
  console.log(number);
}
```

This can make an API easier to use.

---

# 64. When Should You Prefer Generators?

If you need to create a custom iterator manually, generators are often easier to read.

Manual implementation:

```js
const iterable = {
  [Symbol.iterator]() {
    let current = 1;

    return {
      next() {
        if (current <= 3) {
          return {
            value: current++,
            done: false
          };
        }

        return {
          value: undefined,
          done: true
        };
      }
    };
  }
};
```

Generator:

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

The generator communicates the sequence more directly.

---

# 65. Iterator vs Generator

| Feature                        | Iterator       | Generator      |
| ------------------------------ | -------------- | -------------- |
| Uses `next()`                  | Yes            | Yes            |
| Can be iterable                | Yes            | Yes            |
| Manual implementation possible | Yes            | Not required   |
| Uses `yield`                   | No             | Yes            |
| Maintains state                | Yes            | Yes            |
| Lazy                           | Can be         | Yes            |
| Easier to write                | Usually harder | Usually easier |

A generator is not a different iteration concept.

It is a language feature that makes creating iterators easier.

---

# 66. Iterator vs Array Methods

Do not confuse iterators with array methods.

For example:

```js
numbers.map(...)
```

is an array operation.

While:

```js
numbers[Symbol.iterator]()
```

produces an iterator.

They solve different problems.

### Array method

```js
const doubled = numbers.map((number) => number * 2);
```

Transforms an array.

### Iterator

```js
const iterator = numbers[Symbol.iterator]();
```

Controls sequential access to values.

---

# 67. Iterator vs `forEach`

`forEach()` is an array method:

```js
numbers.forEach((number) => {
  console.log(number);
});
```

`for...of` is based on the iterable protocol:

```js
for (const number of numbers) {
  console.log(number);
}
```

Important difference:

```text
forEach()
→ Array method

for...of
→ Iterable protocol
```

`for...of` can work with Sets, Maps, strings, generators, and custom iterables, not only arrays.

---

# 68. Iterator and Memory Efficiency

An iterator can be useful when you do not need all values simultaneously.

Instead of:

```js
const numbers = [
  1,
  2,
  3,
  // potentially millions of values
];
```

an iterator can generate values as needed.

Conceptually:

```text
Need value 1 → generate 1
Need value 2 → generate 2
Need value 3 → generate 3
```

This is particularly useful for large or lazy data sources.

However, iteration itself does not automatically guarantee better memory usage.

The implementation determines how values are stored and produced.

---

# 69. Iterator Protocol Summary

### Iterator

Must provide:

```js
next()
```

### `next()`

Returns:

```js
{
  value,
  done
}
```

### Iterable

Must provide:

```js
[Symbol.iterator]()
```

### `[Symbol.iterator]`

Returns an iterator.

### `for...of`

Consumes an iterable.

### Spread

Consumes an iterable.

### Destructuring

Can consume an iterable.

### `Array.from()`

Can consume an iterable.

---

# 70. Quick Reference

## Get an iterator

```js
const iterator = iterable[Symbol.iterator]();
```

## Get the next result

```js
iterator.next();
```

## Read the value

```js
iterator.next().value;
```

## Check completion

```js
iterator.next().done;
```

## Iterate

```js
for (const value of iterable) {
  console.log(value);
}
```

## Spread

```js
const values = [...iterable];
```

## Destructure

```js
const [first, second] = iterable;
```

## Convert to array

```js
const values = Array.from(iterable);
```

---

# 71. The Most Important Difference

Memorize this:

```text
Iterable
    ↓
[Symbol.iterator]()
    ↓
Iterator
    ↓
next()
    ↓
{ value, done }
```

Or even shorter:

```text
Iterable → creates Iterator → Iterator produces values
```

This is the core of JavaScript iteration.

---

# 72. Practical Example

Consider:

```js
const projects = {
  items: [
    "Portfolio",
    "E-Commerce",
    "Dashboard"
  ],

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.items.length) {
          return {
            value: this.items[index++],
            done: false
          };
        }

        return {
          value: undefined,
          done: true
        };
      }
    };
  }
};
```

Now:

```js
for (const project of projects) {
  console.log(project);
}
```

Output:

```text
Portfolio
E-Commerce
Dashboard
```

The architecture is:

```text
projects
   ↓
[Symbol.iterator]()
   ↓
iterator
   ↓
next()
   ↓
"Portfolio"
   ↓
next()
   ↓
"E-Commerce"
   ↓
next()
   ↓
"Dashboard"
   ↓
next()
   ↓
done: true
```

---

# 73. Best Practices

### 1. Prefer built-in iteration tools

Use:

```js
for...of
```

when it clearly expresses the problem.

Do not manually call `next()` unless you need direct iterator control.

---

### 2. Understand the protocol before implementing it

Before creating custom iterables, understand:

```js
Symbol.iterator
```

and:

```js
next()
```

---

### 3. Use generators for complex custom sequences

Generators often provide a clearer implementation:

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

instead of manually managing:

```js
value
done
current
next()
```

---

### 4. Do not confuse `for...of` and `for...in`

Remember:

```text
for...of → values
for...in → keys
```

---

### 5. Do not assume ordinary objects are iterable

Use:

```js
Object.keys()
Object.values()
Object.entries()
```

when appropriate.

---

### 6. Be careful with infinite iterators

Always ensure consumers have a stopping condition when working with potentially infinite sequences.

---

### 7. Keep custom iteration behavior predictable

If an object represents a collection, returning a fresh iterator from:

```js
[Symbol.iterator]()
```

is usually the safer design.

This allows independent iteration states.

---

# 74. Learning Priority for React and Next.js

For a React/Next.js developer, you do **not** need to spend a large amount of time manually implementing iterators.

However, you should understand these concepts:

### High Priority

```text
Iterable
Iterator
Symbol.iterator
for...of
```

You should understand:

```text
for...of
```

and why it works with:

* Arrays
* Strings
* Sets
* Maps
* Generators

### Medium Priority

Understand:

```js
next()
```

and:

```js
{
  value,
  done
}
```

### Lower Priority

Manual custom iterator implementations:

```js
[Symbol.iterator]() {
  return {
    next() {
      // ...
    }
  };
}
```

These are useful for deeper JavaScript knowledge but are not everyday React code.

### Useful Advanced Topic

Generators:

```js
function* generator() {
  yield value;
}
```

They become more relevant when studying advanced JavaScript patterns.

---

# 75. Final Mental Model

Think of an iterable as something that says:

> "I know how to create an iterator."

The iterator says:

> "I know what the next value is."

And `next()` returns:

```js
{
  value,
  done
}
```

The complete relationship is:

```text
┌──────────────────────┐
│       Iterable       │
│                      │
│ [Symbol.iterator]()  │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│       Iterator       │
│                      │
│       next()         │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│   { value, done }    │
└──────────────────────┘
```

And several JavaScript features consume this protocol:

```text
for...of
   │
   ├── Spread syntax (...)
   │
   ├── Destructuring
   │
   ├── Array.from()
   │
   ├── Map / Set iteration
   │
   └── Generators
```

The most important thing to remember is:

```js
iterable[Symbol.iterator]()
```

produces an iterator, and:

```js
iterator.next()
```

produces the next result.

---

# Key Takeaways

1. An **iterator** is an object with a `next()` method.
2. `next()` returns an object containing `value` and `done`.
3. An **iterable** provides `[Symbol.iterator]()`.
4. `[Symbol.iterator]()` must return an iterator.
5. Arrays, strings, Sets, Maps, typed arrays, and generators are iterable.
6. `for...of` consumes iterables through the iterator protocol.
7. Spread syntax can consume iterables.
8. Destructuring can consume iterables.
9. `Array.from()` can consume iterables.
10. Iterators can maintain state between calls.
11. Iterators can be lazy and can represent large or infinite sequences.
12. Generators provide a simpler way to create iterators.
13. `for...of` works with values, while `for...in` works with property keys.
14. Ordinary objects are not iterable by default.
15. Custom iterators are powerful but are not commonly required in everyday React/Next.js development.
16. Understanding the iterator protocol gives you a deeper understanding of modern JavaScript.

---

## Related Topics

To understand iterators fully, these topics are especially important:

* [Destructuring](./03-destructuring.md)
* [Computed Property Names](./08-computed-property-names.md)
* [For...of](./09-for-of.md)
* [Symbols](./10-symbols.md)
* Generators
* Spread Syntax
* Sets
* Maps

---

## Final Rule

When you see:

```js
for (const value of something) {
  // ...
}
```

ask yourself:

```text
Is "something" iterable?
        ↓
Does it provide Symbol.iterator?
        ↓
Does that produce an iterator?
        ↓
Does the iterator provide next()?
        ↓
Does next() produce { value, done }?
```

Once this mental model is clear, JavaScript's iteration system becomes much easier to understand.
