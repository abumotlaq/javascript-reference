# JavaScript Generators

Generators are special JavaScript functions that can **pause execution, produce a value, and resume later**.

They are built around the `function*` syntax and the `yield` keyword.

Generators are closely related to iterators:

```text
Generator Function
       ↓
Generator Object
       ↓
Iterator
       ↓
next()
       ↓
{ value, done }
```

Unlike normal functions, generators do not necessarily run from beginning to end in one call.

A generator can:

1. Start executing.
2. Reach `yield`.
3. Pause.
4. Return a value.
5. Resume when `next()` is called.
6. Continue until another `yield` or `return`.
7. Eventually become completed.

Generators are useful for:

* Creating iterators
* Lazy sequences
* Large data processing
* Custom iteration
* Stateful sequences
* Controlling execution
* Understanding advanced JavaScript iteration

---

# 1. What Is a Generator?

A generator is a special kind of function declared using:

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

The `*` identifies the function as a generator function.

Calling it:

```js
const generator = numbers();
```

does **not** immediately execute the function body.

Instead, it returns a **generator object**.

```js
console.log(generator);
```

The generator object is both:

* An iterator
* An iterable

---

# 2. Generator Functions vs Normal Functions

Consider a normal function:

```js
function getNumber() {
  return 10;
}
```

Calling:

```js
const result = getNumber();
```

immediately executes the function.

The function reaches:

```js
return 10;
```

and finishes.

A generator behaves differently:

```js
function* getNumber() {
  yield 10;
}
```

Calling:

```js
const generator = getNumber();
```

creates a generator object.

The generator body does not execute until:

```js
generator.next();
```

is called.

---

# 3. The Basic Generator Example

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}
```

Create the generator:

```js
const generator = numbers();
```

Call:

```js
console.log(generator.next());
```

Output:

```text
{ value: 10, done: false }
```

Call it again:

```js
console.log(generator.next());
```

Output:

```text
{ value: 20, done: false }
```

Again:

```js
console.log(generator.next());
```

Output:

```text
{ value: 30, done: false }
```

Finally:

```js
console.log(generator.next());
```

Output:

```text
{ value: undefined, done: true }
```

---

# 4. What Does `yield` Do?

The `yield` keyword:

1. Produces a value.
2. Pauses the generator.
3. Allows the generator to resume later.

Example:

```js
function* numbers() {
  yield 10;
  yield 20;
}
```

Execution works conceptually like this:

```text
numbers()
    ↓
Generator created
    ↓
next()
    ↓
yield 10
    ↓
Pause
    ↓
next()
    ↓
yield 20
    ↓
Pause
    ↓
next()
    ↓
done: true
```

This is fundamentally different from a normal function that executes continuously until it returns.

---

# 5. Generators Are Lazy

Generator functions are **lazy**.

Consider:

```js
function* numbers() {
  console.log("First");
  yield 10;

  console.log("Second");
  yield 20;

  console.log("Third");
  yield 30;
}
```

Create the generator:

```js
const generator = numbers();
```

Nothing is printed yet.

Now:

```js
generator.next();
```

prints:

```text
First
```

and returns:

```js
{
  value: 10,
  done: false
}
```

Calling:

```js
generator.next();
```

prints:

```text
Second
```

and returns:

```js
{
  value: 20,
  done: false
}
```

The generator only executes the amount of code necessary to reach the next `yield`.

---

# 6. Generator State

Generators automatically preserve their execution state.

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}
```

After:

```js
const generator = numbers();

generator.next();
```

the generator is paused after:

```js
yield 10;
```

Calling:

```js
generator.next();
```

resumes execution from that point.

It does **not** restart the function.

Conceptually:

```text
Start
  ↓
yield 10
  ↓
PAUSED
  ↓
resume
  ↓
yield 20
  ↓
PAUSED
```

This preserved execution state is one of the most important characteristics of generators.

---

# 7. Generator Object

Calling a generator function:

```js
function* numbers() {
  yield 10;
}

const generator = numbers();
```

returns a generator object.

The generator object provides:

```js
next()
```

and can also be used as an iterable.

You can therefore do:

```js
for (const number of generator) {
  console.log(number);
}
```

---

# 8. Generators Are Iterators

A generator object implements the iterator protocol.

Therefore:

```js
const generator = numbers();
```

supports:

```js
generator.next();
```

For example:

```js
function* numbers() {
  yield 10;
  yield 20;
}

const generator = numbers();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: false }
{ value: undefined, done: true }
```

This is the same result structure used by normal iterators.

---

# 9. Generators Are Iterable

Generator objects also implement the iterable protocol.

That means:

```js
const generator = numbers();
```

can be used with:

```js
for...of
```

Example:

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

for (const number of numbers()) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

The generator automatically provides the necessary iteration behavior.

---

# 10. Generator + `for...of`

This:

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

for (const number of numbers()) {
  console.log(number);
}
```

conceptually performs repeated calls to:

```js
generator.next();
```

until:

```js
done === true
```

So the relationship is:

```text
for...of
    ↓
generator
    ↓
next()
    ↓
yielded value
    ↓
next()
    ↓
yielded value
    ↓
done
```

---

# 11. Multiple `yield` Statements

A generator can contain many `yield` expressions.

```js
function* profile() {
  yield "Osama Abu Motlaq";
  yield "Frontend Developer";
  yield "React";
  yield "Next.js";
}
```

Use it:

```js
const generator = profile();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
```

Output:

```text
Osama Abu Motlaq
Frontend Developer
React
Next.js
```

Each `next()` advances the generator to the next `yield`.

---

# 12. `yield` vs `return`

`yield` and `return` behave differently.

### `yield`

```js
function* numbers() {
  yield 10;
  yield 20;
}
```

Each `yield` produces another value while keeping the generator resumable.

### `return`

```js
function* numbers() {
  yield 10;
  return 20;
}
```

The `return` completes the generator.

Example:

```js
const generator = numbers();

console.log(generator.next());
console.log(generator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: true }
```

Notice:

```js
done: true
```

The generator has finished.

---

# 13. `return` Ends the Generator

Consider:

```js
function* numbers() {
  yield 10;
  return 20;
  yield 30;
}
```

The `yield 30` is never reached.

```js
const generator = numbers();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

Output:

```text
{ value: 10, done: false }
{ value: 20, done: true }
{ value: undefined, done: true }
```

Once the generator is completed, later `next()` calls remain completed.

---

# 14. `yield` Is an Expression

`yield` can produce a value to the caller and can also receive a value from the next `next()` call.

Example:

```js
function* example() {
  const value = yield 10;

  console.log(value);
}
```

Start the generator:

```js
const generator = example();
```

First:

```js
console.log(generator.next());
```

Output:

```text
{ value: 10, done: false }
```

The generator is paused at:

```js
yield 10
```

---

# 15. Passing a Value into `yield`

Now call:

```js
generator.next(50);
```

The value `50` becomes the result of the paused `yield` expression.

Therefore:

```js
const value = yield 10;
```

effectively receives:

```text
value = 50
```

The generator then prints:

```text
50
```

This creates a two-way communication mechanism:

```text
Generator
    │
    │ yield value
    ↓
Caller
    │
    │ next(value)
    ↓
Generator
```

---

# 16. The First `next()` Argument

A common mistake is expecting this:

```js
generator.next(100);
```

to provide `100` to the first `yield`.

It does not.

Example:

```js
function* example() {
  const value = yield 10;

  console.log(value);
}

const generator = example();

generator.next(100);
```

The `100` is ignored because the generator has not paused at a `yield` yet.

The first `next()` starts execution.

You need:

```js
generator.next();
```

first.

Then:

```js
generator.next(100);
```

to send `100` into the paused `yield`.

---

# 17. Complete Two-Way Generator Example

```js
function* calculator() {
  const first = yield "Enter the first number";

  const second = yield "Enter the second number";

  return first + second;
}
```

Start:

```js
const generator = calculator();

console.log(generator.next());
```

Output:

```text
{
  value: "Enter the first number",
  done: false
}
```

Send the first value:

```js
console.log(generator.next(10));
```

Output:

```text
{
  value: "Enter the second number",
  done: false
}
```

Send the second value:

```js
console.log(generator.next(20));
```

Output:

```text
{
  value: 30,
  done: true
}
```

The generator can therefore receive values as well as produce them.

---

# 18. `yield*`

The:

```js
yield*
```

syntax delegates iteration to another iterable or generator.

Example:

```js
function* first() {
  yield 10;
  yield 20;
}

function* second() {
  yield* first();
  yield 30;
}
```

Now:

```js
for (const number of second()) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

The `second()` generator delegates to `first()`.

---

# 19. `yield*` with Arrays

`yield*` can delegate to any iterable.

```js
function* numbers() {
  yield* [10, 20, 30];
}
```

Then:

```js
console.log([...numbers()]);
```

Output:

```text
[10, 20, 30]
```

This works because arrays are iterable.

---

# 20. `yield*` with Strings

Strings are iterable too.

```js
function* characters() {
  yield* "Osama";
}
```

Then:

```js
console.log([...characters()]);
```

Output:

```text
["O", "s", "a", "m", "a"]
```

---

# 21. `yield*` with Sets

```js
function* numbers() {
  yield* new Set([10, 20, 30]);
}
```

Then:

```js
console.log([...numbers()]);
```

Output:

```text
[10, 20, 30]
```

Again, `yield*` works because `Set` is iterable.

---

# 22. `yield*` vs Multiple `yield`

Without `yield*`:

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}
```

With `yield*`:

```js
function* numbers() {
  yield* [10, 20, 30];
}
```

Both produce:

```text
10
20
30
```

The second version delegates iteration to the array.

---

# 23. Delegating Between Generators

Consider:

```js
function* frontend() {
  yield "React";
  yield "Next.js";
}

function* backend() {
  yield "Node.js";
  yield "Express.js";
}

function* fullStack() {
  yield* frontend();
  yield* backend();
}
```

Now:

```js
for (const technology of fullStack()) {
  console.log(technology);
}
```

Output:

```text
React
Next.js
Node.js
Express.js
```

This is useful for composing multiple sequences.

---

# 24. Generator Composition

Generators can be combined.

```js
function* projects() {
  yield "Portfolio";
  yield "E-Commerce";
}

function* technologies() {
  yield "React";
  yield "Next.js";
}

function* developerProfile() {
  yield* projects();
  yield* technologies();
}
```

Then:

```js
console.log([...developerProfile()]);
```

Output:

```text
[
  "Portfolio",
  "E-Commerce",
  "React",
  "Next.js"
]
```

This is one of the practical uses of `yield*`.

---

# 25. Lazy Sequences

Generators are useful for lazy sequences.

Consider:

```js
function* numbers() {
  let current = 1;

  while (true) {
    yield current++;
  }
}
```

This generator represents an infinite sequence:

```text
1
2
3
4
5
...
```

But it does not create all these values in memory.

It generates each value only when requested.

---

# 26. Consuming an Infinite Generator Safely

Do not do this:

```js
for (const number of numbers()) {
  console.log(number);
}
```

The loop would never finish.

Instead:

```js
const generator = numbers();

for (let i = 0; i < 5; i++) {
  console.log(generator.next().value);
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

The generator only produced five values.

---

# 27. Generator for a Range

A useful example:

```js
function* range(start, end) {
  for (let current = start; current <= end; current++) {
    yield current;
  }
}
```

Use it:

```js
for (const number of range(1, 5)) {
  console.log(number);
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

The generator does not need to construct an array first.

---

# 28. Range with Spread

Because the generator is iterable:

```js
const numbers = [...range(1, 5)];

console.log(numbers);
```

Output:

```text
[1, 2, 3, 4, 5]
```

The spread operator consumes the generator.

---

# 29. Range with Destructuring

Generators can also be consumed by destructuring.

```js
const [first, second, third] = range(10, 20);

console.log(first);
console.log(second);
console.log(third);
```

Output:

```text
10
11
12
```

Only the required values need to be consumed.

---

# 30. Generators and Lazy Processing

Consider a large sequence.

A normal approach might create:

```js
const numbers = [
  1,
  2,
  3,
  // potentially millions of values
];
```

A generator can instead produce:

```js
function* numbers() {
  let current = 1;

  while (current <= 1000000) {
    yield current++;
  }
}
```

Values are produced on demand.

This can reduce the memory required for representing the sequence itself.

However, if you immediately do:

```js
const allNumbers = [...numbers()];
```

you are materializing the entire sequence into an array.

The memory advantage is therefore lost for that operation.

---

# 31. Generator State with Local Variables

Generators preserve local variables between pauses.

```js
function* counter() {
  let count = 1;

  while (count <= 3) {
    yield count;
    count++;
  }
}
```

Call:

```js
const generator = counter();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

Output:

```text
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
```

The variable:

```js
count
```

survives between `next()` calls.

The generator preserves its execution context.

---

# 32. Generator State Is Not Shared Automatically

Every call to the generator function creates a new generator instance.

```js
function* counter() {
  let count = 1;

  while (count <= 3) {
    yield count++;
  }
}
```

Create two:

```js
const first = counter();
const second = counter();
```

Now:

```js
console.log(first.next().value);
console.log(first.next().value);

console.log(second.next().value);
```

Output:

```text
1
2
1
```

Each generator has independent state.

---

# 33. Generator Methods

A generator object provides:

```js
next()
```

It also supports:

```js
return()
```

and:

```js
throw()
```

These methods allow more control over the generator.

---

# 34. `generator.return()`

Calling:

```js
generator.return(value)
```

forces the generator to finish.

Example:

```js
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

const generator = numbers();

console.log(generator.next());

console.log(generator.return("Finished"));
```

Output:

```text
{ value: 10, done: false }
{ value: "Finished", done: true }
```

The generator is now completed.

---

# 35. `generator.return()` Prevents Later Yields

After:

```js
generator.return();
```

the generator is finished.

```js
console.log(generator.next());
```

returns:

```text
{ value: undefined, done: true }
```

The remaining `yield` statements are not executed.

---

# 36. `finally` and `generator.return()`

Generators can use `try...finally` for cleanup.

```js
function* example() {
  try {
    yield 10;
    yield 20;
  } finally {
    console.log("Cleanup");
  }
}
```

Now:

```js
const generator = example();

console.log(generator.next());

generator.return();
```

The `finally` block executes.

This is useful when a generator manages resources or requires cleanup.

---

# 37. `generator.throw()`

A generator also provides:

```js
generator.throw(error)
```

This injects an exception at the generator's current paused location.

Example:

```js
function* example() {
  try {
    yield 10;
  } catch (error) {
    console.log(error.message);
  }
}
```

Use:

```js
const generator = example();

generator.next();

generator.throw(new Error("Something went wrong"));
```

Output:

```text
Something went wrong
```

The generator can catch the injected error with `try...catch`.

---

# 38. `next()`, `return()`, and `throw()`

A generator object provides three important control methods:

| Method          | Purpose                                         |
| --------------- | ----------------------------------------------- |
| `next(value)`   | Resume execution and optionally provide a value |
| `return(value)` | Complete the generator                          |
| `throw(error)`  | Throw an error inside the generator             |

Example:

```js
generator.next();
generator.return();
generator.throw(error);
```

These methods provide advanced control over generator execution.

---

# 39. Generator Execution Model

Consider:

```js
function* example() {
  console.log("A");

  yield 10;

  console.log("B");

  yield 20;

  console.log("C");
}
```

Create:

```js
const generator = example();
```

Nothing executes.

First:

```js
generator.next();
```

Execution:

```text
A
yield 10
PAUSE
```

Second:

```js
generator.next();
```

Execution:

```text
B
yield 20
PAUSE
```

Third:

```js
generator.next();
```

Execution:

```text
C
END
```

This execution model is the key to understanding generators.

---

# 40. Generator Function Does Not Execute Immediately

This is important:

```js
function* example() {
  console.log("Running");
}
```

Calling:

```js
const generator = example();
```

does not print:

```text
Running
```

The body starts when:

```js
generator.next();
```

is called.

This differs from a normal function.

---

# 41. Generator Function Syntax

Basic syntax:

```js
function* generatorName() {
  yield value;
}
```

The `*` can also appear with spacing:

```js
function *generatorName() {
  yield value;
}
```

Both are valid.

The common style is:

```js
function* generatorName() {
  // ...
}
```

---

# 42. Generator Expressions

Generators can also be created from generator expressions.

Example:

```js
const numbers = function* () {
  yield 10;
  yield 20;
};
```

Then:

```js
const generator = numbers();

console.log(generator.next());
```

Output:

```text
{ value: 10, done: false }
```

---

# 43. Generator Methods in Objects

Objects can have generator methods.

```js
const collection = {
  *numbers() {
    yield 10;
    yield 20;
    yield 30;
  }
};
```

Use:

```js
for (const number of collection.numbers()) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

---

# 44. Generator Methods in Classes

Classes can also define generator methods.

```js
class NumberCollection {
  *numbers() {
    yield 10;
    yield 20;
    yield 30;
  }
}
```

Use:

```js
const collection = new NumberCollection();

for (const number of collection.numbers()) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

---

# 45. A Class Can Be Iterable Using a Generator

A class can implement `Symbol.iterator` with a generator method.

```js
class NumberCollection {
  constructor(numbers) {
    this.numbers = numbers;
  }

  *[Symbol.iterator]() {
    yield* this.numbers;
  }
}
```

Now:

```js
const collection = new NumberCollection([10, 20, 30]);

for (const number of collection) {
  console.log(number);
}
```

Output:

```text
10
20
30
```

The generator greatly simplifies custom iterable implementations.

---

# 46. Generator as `Symbol.iterator`

The previous example demonstrates an important pattern:

```js
*[Symbol.iterator]() {
  yield* this.numbers;
}
```

This means:

```text
The object is iterable
        ↓
Symbol.iterator is a generator method
        ↓
The generator produces the values
```

This is often cleaner than manually implementing:

```js
{
  next() {
    // ...
  }
}
```

---

# 47. Generator Delegation

Consider:

```js
function* frontend() {
  yield "React";
  yield "Next.js";
}

function* profile() {
  yield "Osama Abu Motlaq";

  yield* frontend();

  yield "Full Stack JavaScript";
}
```

Now:

```js
console.log([...profile()]);
```

Output:

```text
[
  "Osama Abu Motlaq",
  "React",
  "Next.js",
  "Full Stack JavaScript"
]
```

The `profile()` generator delegates part of its iteration to `frontend()`.

---

# 48. Generator Return Values and `yield*`

`yield*` can also receive the return value of another generator.

Example:

```js
function* inner() {
  yield 10;
  return 50;
}

function* outer() {
  const result = yield* inner();

  yield result;
}
```

Now:

```js
console.log([...outer()]);
```

Output:

```text
[10, 50]
```

The `yield*` expression evaluates to the delegated generator's final return value.

This is an advanced feature and is rarely needed in ordinary React development, but it is important for understanding generator composition.

---

# 49. Generator vs Iterator

A manually created iterator might look like:

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
  }
};
```

A generator can express the same sequence more naturally:

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

### Difference

```text
Manual Iterator
→ You implement next()
→ You manage done
→ You manage state manually

Generator
→ JavaScript manages much of this
→ You use yield
→ State is automatically preserved
```

---

# 50. Generator vs Normal Function

| Feature                      | Normal Function | Generator           |
| ---------------------------- | --------------- | ------------------- |
| Syntax                       | `function`      | `function*`         |
| Starts executing when called | Yes             | No                  |
| Uses `return`                | Yes             | Yes                 |
| Uses `yield`                 | No              | Yes                 |
| Can pause                    | No              | Yes                 |
| Can resume                   | No              | Yes                 |
| Returns                      | Normal value    | Generator object    |
| Provides `next()`            | No              | Yes                 |
| Iterable                     | No              | Generator object is |
| Lazy execution               | No              | Yes                 |

---

# 51. Generator vs Async Function

Do not confuse:

```js
function*
```

with:

```js
async function
```

They solve different problems.

### Generator

```js
function* numbers() {
  yield 10;
}
```

Focuses on:

* Pausing execution
* Resuming execution
* Iteration
* Lazy sequences

### Async Function

```js
async function getData() {
  const response = await fetch("/api/data");
  return response.json();
}
```

Focuses on:

* Asynchronous operations
* Promises
* Waiting for asynchronous results

---

# 52. Async Generators

JavaScript also supports **async generators**.

Syntax:

```js
async function* numbers() {
  yield 10;
  yield 20;
}
```

Async generators produce values asynchronously.

They are consumed using:

```js
for await...of
```

Example:

```js
async function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

async function run() {
  for await (const number of numbers()) {
    console.log(number);
  }
}

run();
```

This combines:

* Generators
* Iterators
* Promises
* Async iteration

Async generators are an advanced topic.

---

# 53. Generator Use Case: Pagination

Generators can represent pages of data conceptually.

```js
function* pages() {
  yield "Page 1";
  yield "Page 2";
  yield "Page 3";
}
```

Consume them:

```js
for (const page of pages()) {
  console.log(page);
}
```

In real applications, asynchronous generators can be more useful when each page must be fetched asynchronously.

The important concept is that the generator can model a sequence of results without requiring all results to exist simultaneously.

---

# 54. Generator Use Case: Tree Traversal

Generators can be used to traverse data structures.

For example, a simplified tree traversal could be expressed using:

```js
function* traverse(node) {
  if (!node) {
    return;
  }

  yield node.value;

  yield* traverse(node.left);
  yield* traverse(node.right);
}
```

This demonstrates a powerful combination:

* Recursion
* Generators
* `yield`
* `yield*`

The caller can consume the tree one value at a time.

---

# 55. Generator Use Case: Filtering Lazy Data

A generator can implement lazy filtering.

```js
function* filterEven(numbers) {
  for (const number of numbers) {
    if (number % 2 === 0) {
      yield number;
    }
  }
}
```

Use:

```js
const numbers = [1, 2, 3, 4, 5, 6];

for (const number of filterEven(numbers)) {
  console.log(number);
}
```

Output:

```text
2
4
6
```

The generator only yields values that satisfy the condition.

---

# 56. Generator Composition for Pipelines

Generators can be combined to build lazy processing pipelines.

```js
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

function* doubled(values) {
  for (const value of values) {
    yield value * 2;
  }
}

function* even(values) {
  for (const value of values) {
    if (value % 2 === 0) {
      yield value;
    }
  }
}
```

Compose them:

```js
const result = even(doubled(numbers()));
```

Consume:

```js
console.log([...result]);
```

Output:

```text
[2, 4, 6, 8, 10]
```

Each stage can process values lazily.

---

# 57. Generators and Memory

Generators can be memory-efficient because they can produce values on demand.

Example:

```js
function* numbers(limit) {
  for (let number = 1; number <= limit; number++) {
    yield number;
  }
}
```

The generator does not need to create:

```js
const values = [];
```

containing every number first.

However, remember:

```js
[...numbers(1000000)]
```

creates a large array.

Generators provide lazy production; they do not magically make every operation memory-efficient.

---

# 58. Common Mistake: Calling the Generator Function Expecting a Value

This:

```js
function* numbers() {
  yield 10;
}

const value = numbers();

console.log(value);
```

does not produce:

```text
10
```

It produces a generator object.

You need:

```js
const generator = numbers();

console.log(generator.next().value);
```

Output:

```text
10
```

---

# 59. Common Mistake: Expecting Immediate Execution

This:

```js
function* example() {
  console.log("Running");
}

example();
```

does not print:

```text
Running
```

The generator function must be advanced:

```js
const generator = example();

generator.next();
```

Now:

```text
Running
```

is printed.

---

# 60. Common Mistake: Forgetting That Generators Are State-Based

Consider:

```js
function* numbers() {
  yield 10;
  yield 20;
}
```

This:

```js
const generator = numbers();

console.log(generator.next().value);
console.log(generator.next().value);
```

produces:

```text
10
20
```

But:

```js
console.log(generator.next().value);
```

after that produces:

```text
undefined
```

because the generator is exhausted.

---

# 61. Common Mistake: Reusing an Exhausted Generator

This:

```js
const generator = numbers();

console.log([...generator]);
console.log([...generator]);
```

does not produce the values twice.

Output:

```text
[10, 20]
[]
```

The generator was consumed by the first operation.

To start again:

```js
console.log([...numbers()]);
console.log([...numbers()]);
```

Output:

```text
[10, 20]
[10, 20]
```

Each call creates a new generator.

---

# 62. Common Mistake: Confusing `yield` with `return`

Consider:

```js
function* example() {
  yield 10;
  yield 20;
}
```

Both values are part of the generator's iteration sequence.

But:

```js
function* example() {
  yield 10;
  return 20;
}
```

produces:

```text
10
```

through normal iteration.

The `return` value signals completion.

This distinction becomes particularly important when using:

```js
for...of
```

because normal `for...of` iteration does not expose a generator's final `return` value as an iteration value.

---

# 63. Common Mistake: Using Generators Everywhere

Generators are powerful, but they are not necessary for most application code.

For ordinary React development, you will usually use:

```js
map()
filter()
reduce()
for...of
async/await
```

before reaching for generators.

Use generators when their ability to:

* Pause
* Resume
* Produce values lazily
* Compose sequences

actually solves a problem.

---

# 64. Generators and React

Generators are **not a core React feature**.

Modern React applications generally use:

* Function components
* Hooks
* Promises
* `async/await`
* Array methods
* Iterables

You should understand generators as part of advanced JavaScript rather than as a React-specific requirement.

For your React learning path, the important concepts are:

```text
Iterable
Iterator
for...of
Symbol.iterator
Generators
```

But manual generator implementation is lower priority than:

```text
Functions
Closures
Promises
async/await
Array methods
Objects
Modules
Destructuring
Spread
```

---

# 65. Generators and Next.js

Generators can technically be used in Next.js because they are standard JavaScript.

For example:

```js
function* createIds() {
  yield 1;
  yield 2;
  yield 3;
}
```

But ordinary Next.js application code rarely requires custom generators.

More common patterns are:

```js
async function getData() {
  const response = await fetch("/api/data");

  return response.json();
}
```

and:

```js
const projects = data.map((project) => {
  // ...
});
```

Therefore, generators are useful for deeper JavaScript knowledge but should not replace learning the core patterns used in React and Next.js.

---

# 66. Generator Mental Model

The most useful mental model is:

```text
Generator Function
        ↓
generator()
        ↓
Generator Object
        ↓
next()
        ↓
execute until yield
        ↓
{ value, done }
        ↓
PAUSE
        ↓
next()
        ↓
resume
```

A generator is essentially a resumable function that also behaves like an iterator.

---

# 67. Complete Example

Consider:

```js
function* profile() {
  console.log("Starting");

  yield "Osama Abu Motlaq";

  console.log("Role");

  yield "Frontend Developer";

  console.log("Technologies");

  yield "React";

  yield "Next.js";

  console.log("Finished");
}
```

Create:

```js
const generator = profile();
```

At this point:

```text
Nothing has executed.
```

First:

```js
generator.next();
```

Execution:

```text
Starting
```

Result:

```js
{
  value: "Osama Abu Motlaq",
  done: false
}
```

Second:

```js
generator.next();
```

Execution:

```text
Role
```

Result:

```js
{
  value: "Frontend Developer",
  done: false
}
```

Third:

```js
generator.next();
```

Execution:

```text
Technologies
```

Result:

```js
{
  value: "React",
  done: false
}
```

Fourth:

```js
generator.next();
```

Result:

```js
{
  value: "Next.js",
  done: false
}
```

Fifth:

```js
generator.next();
```

Execution:

```text
Finished
```

Result:

```js
{
  value: undefined,
  done: true
}
```

This demonstrates the complete lifecycle.

---

# 68. Generator Lifecycle

A generator can be understood as moving through these states:

```text
Created
   ↓
Suspended
   ↓
Running
   ↓
Suspended
   ↓
Running
   ↓
Completed
```

More precisely:

```text
generator()
     ↓
created but not started
     ↓
next()
     ↓
running
     ↓
yield
     ↓
suspended
     ↓
next()
     ↓
running
     ↓
return / end
     ↓
completed
```

Once completed, normal `next()` calls continue returning:

```js
{
  value: undefined,
  done: true
}
```

---

# 69. Generator and Iterator Relationship

This is the key connection to the previous chapter.

A manually created iterator:

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

A generator:

```js
function* numbers() {
  yield 10;
}
```

The generator object behaves as an iterator:

```js
const iterator = numbers();

iterator.next();
```

Therefore:

```text
Generator
    ↓
implements
    ↓
Iterator protocol
```

And because generator objects are iterable:

```text
Generator
    ↓
Iterator + Iterable
```

---

# 70. Best Practices

### 1. Use generators when lazy sequences are useful

Generators are excellent when values should be produced on demand.

---

### 2. Prefer simple loops when they are clearer

Do not use a generator just because it is technically possible.

Simple code is usually better:

```js
for (const number of numbers) {
  console.log(number);
}
```

---

### 3. Use generators for custom iteration logic

They are particularly useful for:

* Ranges
* Tree traversal
* Graph traversal
* Lazy transformations
* Custom sequences
* Iterator composition

---

### 4. Use `yield*` for delegation

Instead of manually forwarding every value:

```js
function* combined() {
  yield 1;
  yield 2;
  yield 3;
}
```

you can delegate:

```js
function* combined() {
  yield* anotherGenerator();
}
```

when appropriate.

---

### 5. Be careful with infinite generators

Always ensure the consumer has a stopping condition.

---

### 6. Remember that generators are consumable

Once a generator has been exhausted, create a new generator if you need to iterate again.

---

### 7. Do not confuse generators with asynchronous programming

Generators can pause execution, but they are not a replacement for:

```js
Promise
async/await
```

---

# 71. Quick Reference

## Generator function

```js
function* numbers() {
  yield 10;
  yield 20;
}
```

## Create generator

```js
const generator = numbers();
```

## Get next value

```js
generator.next();
```

## Send a value into generator

```js
generator.next(value);
```

## Stop generator

```js
generator.return();
```

## Throw an error into generator

```js
generator.throw(error);
```

## Delegate to another iterable

```js
yield* iterable;
```

## Iterate generator

```js
for (const value of generator) {
  console.log(value);
}
```

## Convert to array

```js
const values = [...generator];
```

---

# 72. Generator vs Iterator vs Iterable

| Concept            | Main Feature          | Example               |
| ------------------ | --------------------- | --------------------- |
| Iterable           | `[Symbol.iterator]()` | Array                 |
| Iterator           | `next()`              | Array iterator        |
| Generator function | `function*`           | `function* numbers()` |
| Generator object   | `next()`, iterable    | `numbers()`           |

The relationship:

```text
Iterable
    ↓
[Symbol.iterator]()
    ↓
Iterator
    ↓
next()
```

A generator provides a convenient way to create an object that behaves as both:

```text
Iterator + Iterable
```

---

# 73. Final Mental Model

Think of a normal function like this:

```text
Call
 ↓
Execute
 ↓
Return
 ↓
Finished
```

A generator behaves more like this:

```text
Call
 ↓
Create generator
 ↓
next()
 ↓
Execute
 ↓
yield
 ↓
Pause
 ↓
next()
 ↓
Resume
 ↓
yield
 ↓
Pause
 ↓
next()
 ↓
Finish
```

The most important keywords are:

```js
function*
yield
yield*
```

And the most important methods are:

```js
next()
return()
throw()
```

---

# Key Takeaways

1. A generator function is declared with `function*`.
2. Calling a generator function returns a generator object instead of immediately executing the body.
3. Generator execution begins when `next()` is called.
4. `yield` produces a value and pauses execution.
5. Calling `next()` resumes execution from where it paused.
6. Generator objects implement the iterator protocol.
7. Generator objects are also iterable.
8. `for...of` can consume generator objects.
9. Generators preserve their execution state.
10. `yield` can both produce and receive values.
11. The first `next()` argument is not passed into the first `yield`.
12. `yield*` delegates iteration to another iterable or generator.
13. Generators are useful for lazy sequences.
14. Generators can represent potentially infinite sequences.
15. `return()` completes a generator.
16. `throw()` injects an error into a generator.
17. Generators can be used to build custom iterables more easily.
18. Async generators combine generators with asynchronous iteration.
19. Generators are an advanced JavaScript feature, not a core React requirement.
20. Understanding generators completes an important part of the JavaScript iterator model.

---

## Final Rule

Remember this relationship:

```text
function*
    ↓
Generator Object
    ↓
next()
    ↓
yield
    ↓
{ value, done }
    ↓
pause
    ↓
next()
    ↓
resume
```

And remember the difference:

```text
Iterator
→ Produces values through next()

Iterable
→ Provides an iterator through Symbol.iterator

Generator
→ A convenient JavaScript mechanism for creating
  iterators that can pause and resume
```

Once you understand this model, `for...of`, `Symbol.iterator`, generators, spread syntax, destructuring, and other iterable-based JavaScript features become much easier to reason about.
