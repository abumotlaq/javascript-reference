# Symbols

`Symbol` is a **primitive data type** in JavaScript introduced with **ES6 (ECMAScript 2015)**.

A Symbol represents a value that is **unique and immutable**.

Symbols are mainly used when you need a property key that should not accidentally conflict with ordinary string property names.

They are also an important part of JavaScript's internal protocols.

Symbols are used in features such as:

* Unique object properties
* Custom object behavior
* Iterables
* `Symbol.iterator`
* `Symbol.toStringTag`
* `Symbol.toPrimitive`
* Other well-known JavaScript protocols

---

# 1. Creating a Symbol

Create a Symbol using:

```js id="n4v8ql"
const id = Symbol();
```

Every call to `Symbol()` creates a new unique Symbol.

For example:

```js id="u5m2fa"
const first = Symbol();
const second = Symbol();

console.log(first === second);
```

Output:

```text id="w6a9dr"
false
```

Even though both Symbols were created in exactly the same way, they are different values.

---

# 2. Symbols Are Unique

This is the most important characteristic of Symbols.

```js id="g8l0te"
const first = Symbol("id");
const second = Symbol("id");

console.log(first === second);
```

Output:

```text id="a1k7vp"
false
```

The descriptions are both:

```text
id
```

but the Symbols themselves are different.

Think of them as:

```text
Symbol("id") → unique Symbol A
Symbol("id") → unique Symbol B
```

The description does not determine Symbol identity.

---

# 3. Symbol Descriptions

You can optionally provide a description:

```js id="t7p3cz"
const id = Symbol("user id");
```

The description is useful for debugging and understanding the purpose of the Symbol.

You can retrieve it using:

```js id="q0v6de"
console.log(id.description);
```

Output:

```text id="n6j2qa"
user id
```

The description does **not** make Symbols equal.

```js id="f4e8uk"
const first = Symbol("user id");
const second = Symbol("user id");

console.log(first === second);
```

Output:

```text id="g5x3am"
false
```

---

# 4. `typeof` Symbol

Symbols are a primitive data type.

```js id="b8j5pm"
const id = Symbol("id");

console.log(typeof id);
```

Output:

```text id="w7z0kx"
symbol
```

The result of:

```js id="z3q1vh"
typeof id
```

is:

```text
symbol
```

---

# 5. Symbols Are Primitive Values

JavaScript has several primitive types:

```text id="9x7q1f"
string
number
bigint
boolean
undefined
null
symbol
```

Symbol belongs to this primitive category.

```js id="j4r8sm"
const id = Symbol("id");
```

`id` is not an object.

It is a primitive Symbol value.

---

# 6. Symbols as Object Property Keys

One of the most important uses of Symbols is creating object properties.

```js id="s6x1nb"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};
```

The Symbol is used as a property key:

```js id="h2k5vd"
user[id]
```

returns:

```text id="m8p4cq"
123
```

Notice the brackets:

```js id="a9z2xr"
[id]
```

This is a computed property name.

---

# 7. Why Use a Symbol as a Property Key?

Suppose you have:

```js id="p3w7ks"
const user = {
  name: "Osama Abu Motlaq",
  id: 123,
};
```

Another part of the application could accidentally create:

```js id="q5n8mc"
user.id = "something else";
```

There is a possibility of property-name collision because `"id"` is an ordinary string key.

A Symbol provides a unique key:

```js id="v0r6hs"
const internalId = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [internalId]: 123,
};
```

Another Symbol with the same description is still different:

```js id="f9x2lp"
const anotherId = Symbol("id");

console.log(internalId === anotherId);
```

Output:

```text id="c7w4ay"
false
```

Therefore, the two properties do not collide.

---

# 8. Accessing Symbol Properties

If you have the Symbol reference:

```js id="z1c5nm"
const id = Symbol("id");

const user = {
  [id]: 123,
};
```

You can access the property with:

```js id="0v3q8f"
console.log(user[id]);
```

Output:

```text id="3t9m2j"
123
```

You cannot access it using:

```js id="1r6k9s"
user.id;
```

because that looks for a string property named `"id"`.

---

# 9. Symbol Keys Are Not the Same as String Keys

Consider:

```js id="e8x4zn"
const id = Symbol("id");

const user = {
  id: "public",
  [id]: "private",
};
```

This object contains two different properties:

```text id="8z6y3w"
"id"       → "public"
Symbol(id) → "private"
```

Therefore:

```js id="6y2s5x"
console.log(user.id);
```

produces:

```text
public
```

while:

```js id="q9f3mk"
console.log(user[id]);
```

produces:

```text
private
```

They are completely different property keys.

---

# 10. Symbols Are Not Automatically Converted to Strings

Consider:

```js id="m5s2vx"
const id = Symbol("id");
```

This is not allowed:

```js id="w7k3qn"
const text = "User: " + id;
```

It throws a `TypeError`.

JavaScript intentionally prevents accidental conversion of Symbols to strings in many contexts.

Instead, explicitly convert it if needed:

```js id="r4n8cs"
const text = String(id);

console.log(text);
```

Output:

```text id="d7p1vz"
Symbol(id)
```

You can also use:

```js id="a2x6hm"
id.toString();
```

---

# 11. Symbol and Template Literals

This also fails:

```js id="y8v4qk"
const id = Symbol("id");

const text = `User: ${id}`;
```

Symbol values cannot be implicitly converted to strings through this interpolation.

If you intentionally want the textual representation:

```js id="e6j1xr"
const text = `User: ${String(id)}`;
```

Result:

```text id="k3p7wd"
User: Symbol(id)
```

This behavior helps prevent accidental misuse of Symbols.

---

# 12. Symbol Properties and `Object.keys()`

Symbol properties are not returned by:

```js id="h7n2vb"
Object.keys(object);
```

For example:

```js id="q8m4sx"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

console.log(Object.keys(user));
```

Output:

```js id="v6c1ka"
["name"]
```

The Symbol property is not included.

This is an important characteristic of Symbol-keyed properties.

---

# 13. Symbol Properties and `Object.getOwnPropertySymbols()`

To retrieve an object's own Symbol keys, use:

```js id="n9x5jt"
Object.getOwnPropertySymbols(object);
```

Example:

```js id="c4z8pl"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

const symbols = Object.getOwnPropertySymbols(user);

console.log(symbols);
```

The result contains:

```text id="a6y2wr"
[Symbol(id)]
```

You can then use the returned Symbol:

```js id="p3m7ks"
console.log(user[symbols[0]]);
```

Output:

```text id="t5q9vx"
123
```

---

# 14. `Reflect.ownKeys()`

If you want both string keys and Symbol keys, use:

```js id="d2h6qb"
Reflect.ownKeys(object);
```

Example:

```js id="v5k8xm"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

console.log(Reflect.ownKeys(user));
```

The result contains both:

```text id="j8w3nc"
["name", Symbol(id)]
```

This makes `Reflect.ownKeys()` useful when you need to inspect all own property keys.

---

# 15. Symbols and `for...in`

Symbol properties are not enumerated by:

```js id="r7p1mf"
for (const key in object) {
  // ...
}
```

For example:

```js id="z6c4yt"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

for (const key in user) {
  console.log(key);
}
```

Output:

```text id="e3w9qa"
name
```

The Symbol property is not included.

---

# 16. Symbols and Object Spread

Object spread copies enumerable own Symbol properties as well as enumerable string properties.

```js id="u4p8zs"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

const copy = {
  ...user,
};
```

The copied object contains the Symbol property.

```js id="f1x6kc"
console.log(copy[id]);
```

Output:

```text id="y9q3md"
123
```

This is an important difference from APIs such as `Object.keys()`.

---

# 17. Symbols and `Object.assign()`

`Object.assign()` also copies enumerable own Symbol properties.

```js id="m2k7rv"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

const copy = Object.assign({}, user);

console.log(copy[id]);
```

Output:

```text id="c8w5nx"
123
```

---

# 18. Global Symbol Registry

Normally:

```js id="a7f2mk"
Symbol("id") !== Symbol("id");
```

However, JavaScript provides a **global Symbol registry**.

You can use:

```js id="x5n9qp"
Symbol.for("id");
```

Example:

```js id="j3c8vs"
const first = Symbol.for("user-id");
const second = Symbol.for("user-id");

console.log(first === second);
```

Output:

```text id="w6m1kr"
true
```

Unlike `Symbol()`:

```js id="e4p7zc"
Symbol.for("user-id")
```

looks up the key in the global Symbol registry.

If the key does not exist, JavaScript creates and registers a Symbol.

---

# 19. `Symbol()` vs `Symbol.for()`

This distinction is important.

### `Symbol()`

Creates a new unique Symbol every time:

```js id="s8q2hf"
Symbol("id") === Symbol("id");
```

Result:

```text
false
```

### `Symbol.for()`

Uses the global Symbol registry:

```js id="n5w7ka"
Symbol.for("id") === Symbol.for("id");
```

Result:

```text
true
```

Mental model:

```text id="u9r4cj"
Symbol("id")
→ always creates a new Symbol

Symbol.for("id")
→ find or create a shared registered Symbol
```

---

# 20. Getting the Registry Key

If you have a Symbol created using `Symbol.for()`:

```js id="k6v3px"
const id = Symbol.for("user-id");
```

you can retrieve its registry key:

```js id="b9n1ws"
console.log(Symbol.keyFor(id));
```

Output:

```text id="r5q8mz"
user-id
```

For a Symbol that was not registered:

```js id="p4x7vc"
const id = Symbol("user-id");

console.log(Symbol.keyFor(id));
```

The result is:

```text
undefined
```

---

# 21. Symbol Registry Is Different from Symbol Description

Consider:

```js id="c8m2jd"
const first = Symbol("user-id");
const second = Symbol.for("user-id");
```

Both may display:

```text
Symbol(user-id)
```

But they are not the same.

```js id="w5k9qs"
console.log(first === second);
```

Output:

```text
false
```

The first has a description.

The second is registered globally.

Do not confuse the description with registry identity.

---

# 22. Well-Known Symbols

JavaScript defines several built-in Symbols called **well-known Symbols**.

They allow objects to customize certain built-in JavaScript behaviors.

Examples include:

```text id="0n7x2m"
Symbol.iterator
Symbol.asyncIterator
Symbol.toPrimitive
Symbol.toStringTag
Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.match
Symbol.replace
Symbol.search
Symbol.split
```

You do not need to memorize all of them.

The most important ones for everyday JavaScript are:

```text id="4q8v1a"
Symbol.iterator
Symbol.toPrimitive
Symbol.toStringTag
```

---

# 23. `Symbol.iterator`

`Symbol.iterator` defines how an object can provide values for iteration.

This is why structures such as:

```text id="3f7y8m"
Array
String
Set
Map
```

work with:

```js id="h5c2nz"
for...of
```

For example:

```js id="r8m1vx"
const skills = ["JavaScript", "React", "Next.js"];

for (const skill of skills) {
  console.log(skill);
}
```

The array provides an iterator through:

```js id="y4k6pq"
skills[Symbol.iterator]
```

The detailed iterator protocol is covered in the dedicated iterators topic.

---

# 24. Creating a Custom Iterable

An object can define its own `Symbol.iterator`.

Example:

```js id="c5n8wt"
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

```text id="z7q3mp"
Osama Abu Motlaq
Frontend Developer
```

The important idea is:

```js id="d1v6ks"
[Symbol.iterator]
```

defines how the object participates in iteration.

This is an advanced use of Symbols.

---

# 25. `Symbol.toPrimitive`

`Symbol.toPrimitive` allows an object to control how it behaves when JavaScript needs to convert it into a primitive value.

Example:

```js id="x8m2qa"
const user = {
  name: "Osama Abu Motlaq",

  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return this.name;
    }

    return 1;
  },
};

console.log(String(user));
```

Output:

```text id="j4v9kc"
Osama Abu Motlaq
```

The object controls its primitive conversion behavior through the well-known Symbol.

This is an advanced feature and is rarely needed in normal React applications.

---

# 26. `Symbol.toStringTag`

`Symbol.toStringTag` allows an object to customize its tag used by `Object.prototype.toString`.

Example:

```js id="p7w3nf"
const user = {
  [Symbol.toStringTag]: "User",
};

console.log(Object.prototype.toString.call(user));
```

Output:

```text id="r2k8xm"
[object User]
```

The Symbol changes the displayed type tag.

---

# 27. Symbols and Encapsulation

Symbol properties are sometimes described as "hidden" properties.

For example:

```js id="n6q4zt"
const internalId = Symbol("internalId");

const user = {
  name: "Osama Abu Motlaq",
  [internalId]: 123,
};
```

The Symbol property does not appear in:

```js id="a3w7kp"
Object.keys(user);
```

But this does **not** mean the property is private.

Someone with access to the object can discover Symbol keys:

```js id="u9m5vc"
Object.getOwnPropertySymbols(user);
```

Therefore:

> Symbols provide unique keys, not true privacy.

For actual private class fields, JavaScript provides:

```js id="e2k6ns"
#privateField
```

---

# 28. Symbols Are Not Security Mechanisms

Do not use Symbols to hide sensitive information.

For example:

```js id="f8r2ma"
const password = Symbol("password");
```

does not make the password secure.

Symbol keys can be discovered with:

```js id="v5q1yd"
Object.getOwnPropertySymbols(object);
```

Symbols are useful for:

* Avoiding naming collisions
* Defining protocols
* Customizing language behavior

They are not a replacement for:

* Authentication
* Authorization
* Encryption
* Access control
* Private storage

---

# 29. Symbols and Property Collision

Suppose two independent pieces of code both want to attach metadata to the same object.

Using strings can cause collisions:

```js id="q3n7hx"
object.metadata = "value";
```

Another library might also use:

```js id="c8v2pm"
object.metadata = "something else";
```

A Symbol can provide a unique key:

```js id="z6m1kr"
const metadataKey = Symbol("metadata");

object[metadataKey] = "value";
```

Another Symbol:

```js id="j5x8qs"
const otherMetadataKey = Symbol("metadata");

object[otherMetadataKey] = "another value";
```

These properties do not collide because:

```js id="p4c9vd"
metadataKey !== otherMetadataKey;
```

---

# 30. Symbols as Metadata Keys

A practical pattern is attaching metadata to an object.

```js id="a1f6wy"
const metadata = Symbol("metadata");

const user = {
  name: "Osama Abu Motlaq",
  [metadata]: {
    source: "application",
  },
};
```

Access it using:

```js id="q8m3zr"
console.log(user[metadata].source);
```

Output:

```text id="d5v7kn"
application
```

The metadata is attached to the object without using an ordinary string property name.

---

# 31. Symbols and Enumeration

It is important to understand that different reflection APIs see different kinds of properties.

Given:

```js id="k7x2mv"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};
```

### `Object.keys()`

Returns enumerable string keys:

```js id="c4p8nd"
Object.keys(user);
```

Result:

```text
["name"]
```

### `Object.getOwnPropertySymbols()`

Returns own Symbol keys:

```js id="u6y1qs"
Object.getOwnPropertySymbols(user);
```

Result:

```text
[Symbol(id)]
```

### `Reflect.ownKeys()`

Returns both:

```js id="m9z5wx"
Reflect.ownKeys(user);
```

Result conceptually:

```text
["name", Symbol(id)]
```

This distinction is important when inspecting or copying objects.

---

# 32. Symbols and `JSON.stringify()`

Symbol-keyed properties are ignored by `JSON.stringify()`.

Example:

```js id="r3w8kc"
const id = Symbol("id");

const user = {
  name: "Osama Abu Motlaq",
  [id]: 123,
};

console.log(JSON.stringify(user));
```

Output:

```text id="j7m2vx"
{"name":"Osama Abu Motlaq"}
```

The Symbol property is not included in the JSON result.

This matters when sending JavaScript objects to APIs.

If information needs to be serialized as JSON, do not rely on Symbol-keyed properties for that data.

---

# 33. Symbols as Object Literal Keys

Symbols can be used directly in object literals:

```js id="h4q9ns"
const id = Symbol("id");

const user = {
  [id]: "Osama Abu Motlaq",
};
```

The brackets are required because the Symbol is an expression.

This connects Symbols directly with computed property names.

---

# 34. Symbols and Destructuring

You can destructure a Symbol-keyed property if you have the Symbol reference.

```js id="w6p1cz"
const id = Symbol("id");

const user = {
  [id]: "Osama Abu Motlaq",
};

const { [id]: name } = user;

console.log(name);
```

Output:

```text id="b8r3xm"
Osama Abu Motlaq
```

The syntax:

```js id="y5q7nv"
{ [id]: name }
```

means:

> Read the property whose key is the Symbol stored in `id`, and assign its value to `name`.

---

# 35. Symbols and `Object.hasOwn()`

You can check for a Symbol-keyed property:

```js id="e2m6qs"
const id = Symbol("id");

const user = {
  [id]: 123,
};

console.log(Object.hasOwn(user, id));
```

Output:

```text id="f7k4wp"
true
```

This works because `id` is the actual property key.

---

# 36. Symbols and `in`

The `in` operator also works with Symbols:

```js id="n5x8cz"
const id = Symbol("id");

const user = {
  [id]: 123,
};

console.log(id in user);
```

Output:

```text id="q3v9mk"
true
```

The Symbol can therefore be used anywhere JavaScript expects a valid property key.

---

# 37. Common Mistakes

## Mistake 1: Expecting Two Symbols with the Same Description to Be Equal

```js id="j8m4qp"
Symbol("id") === Symbol("id");
```

Result:

```text
false
```

The description is not identity.

---

## Mistake 2: Thinking Symbols Are Private

This:

```js id="a7c2nx"
const id = Symbol("id");
```

does not make a property completely inaccessible.

Symbol properties can be found using:

```js id="u4p9mz"
Object.getOwnPropertySymbols(object);
```

Symbols provide uniqueness, not true privacy.

---

## Mistake 3: Expecting `Object.keys()` to Return Symbol Keys

```js id="r5k8vd"
Object.keys(object);
```

does not include Symbol keys.

Use:

```js id="t3n6qx"
Object.getOwnPropertySymbols(object);
```

or:

```js id="w9m2fc"
Reflect.ownKeys(object);
```

---

## Mistake 4: Accidentally Converting Symbols to Strings

This can throw:

```js id="x6q1pz"
"User: " + symbol;
```

Use explicit conversion when you intentionally need a string:

```js id="m8v4ks"
"User: " + String(symbol);
```

---

## Mistake 5: Confusing `Symbol()` and `Symbol.for()`

These are different:

```js id="y2f7nc"
Symbol("id");
```

and:

```js id="d5m9qx"
Symbol.for("id");
```

The first always creates a new Symbol.

The second uses the global Symbol registry.

---

# 38. Best Practices

## 1. Use Symbols when uniqueness matters

Good use:

```js id="k3x8mv"
const internalId = Symbol("internalId");

const user = {
  [internalId]: 123,
};
```

---

## 2. Do not use Symbols just to make code look advanced

For ordinary application data:

```js id="s7p2qc"
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};
```

is clearer than creating unnecessary Symbol keys.

---

## 3. Do not use Symbols for sensitive data

Symbols are not a security feature.

---

## 4. Use well-known Symbols when customizing JavaScript behavior

For example:

```js id="v4n9xm"
[Symbol.iterator]
```

is appropriate when you intentionally want to make an object iterable.

---

## 5. Keep Symbol references accessible when you need the property later

Consider:

```js id="q8m3kc"
const id = Symbol("id");

const user = {
  [id]: 123,
};
```

You need the `id` reference to easily access:

```js id="w6p1zr"
user[id];
```

If the Symbol reference is lost, you can still discover the key through reflection, but that is less convenient.

---

# 39. React Importance

**Low to medium priority for everyday React development.**

You should understand what Symbols are, but you do not need to use them regularly in normal React components.

You are more likely to encounter Symbols indirectly through JavaScript itself.

For example:

```js id="e3q7mt"
Symbol.iterator
```

is involved in iteration.

React and its surrounding ecosystem may also use Symbols internally for identification and protocols.

The important learning goal is:

> Understand what a Symbol is and recognize Symbol-based APIs when you encounter them.

You do not need to build your React application around Symbol properties.

---

# 40. Next.js Importance

Symbols are generally **not a high-priority Next.js application feature**.

You should know:

* What a Symbol is
* Why Symbols are unique
* How Symbol keys work
* What well-known Symbols are
* What `Symbol.iterator` does conceptually

Advanced Symbol features such as:

```js id="z5n8kx"
Symbol.toPrimitive
Symbol.toStringTag
```

are much less common in everyday Next.js development.

---

# 41. Relationship to Other JavaScript Topics

Symbols connect directly to several other topics.

### Computed Property Names

```js id="p6x2mq"
const id = Symbol("id");

const user = {
  [id]: "Osama Abu Motlaq",
};
```

### `for...of`

`for...of` depends on the iterable protocol:

```js id="a8v4nc"
Symbol.iterator
```

### Iterators

`Symbol.iterator` is the mechanism through which an object provides an iterator.

### Generators

Generators automatically provide iterable behavior.

### Objects

Symbols can be used as object property keys.

### Reflection

Methods such as:

```js id="k9m3xt"
Object.getOwnPropertySymbols()
Reflect.ownKeys()
```

can inspect Symbol properties.

---

# 42. Quick Reference

## Create a Symbol

```js id="r2v7kc"
const id = Symbol("id");
```

## Check the type

```js id="m5x9qp"
typeof id;
```

Result:

```text
symbol
```

## Use as an object key

```js id="f8n3zw"
const user = {
  [id]: "Osama Abu Motlaq",
};
```

## Access the property

```js id="y6q1vm"
user[id];
```

## Get the description

```js id="c4k8ns"
id.description;
```

## Create a registered Symbol

```js id="t7m2px"
const id = Symbol.for("user-id");
```

## Get a registry key

```js id="w3n9qc"
Symbol.keyFor(id);
```

## Get Symbol keys

```js id="p8x4mk"
Object.getOwnPropertySymbols(object);
```

## Get all own keys

```js id="a6v1zr"
Reflect.ownKeys(object);
```

## Iterable protocol

```js id="q9m5xc"
object[Symbol.iterator];
```

---

# 43. Comparison: `Symbol()` vs `Symbol.for()`

| Feature                       | `Symbol()`  | `Symbol.for()`             |
| ----------------------------- | ----------- | -------------------------- |
| Creates a Symbol              | Yes         | Yes, if needed             |
| Same key produces same Symbol | No          | Yes                        |
| Uses global registry          | No          | Yes                        |
| Has a description             | Yes         | Yes                        |
| `Symbol.keyFor()` works       | No          | Yes                        |
| Typical use                   | Unique keys | Shared registered identity |

Example:

```js id="n7c3vx"
const a = Symbol("id");
const b = Symbol("id");

console.log(a === b);
```

```text
false
```

But:

```js id="h2m8qp"
const a = Symbol.for("id");
const b = Symbol.for("id");

console.log(a === b);
```

```text
true
```

---

# 44. Comparison: String Keys vs Symbol Keys

| Feature                          | String Key | Symbol Key            |
| -------------------------------- | ---------- | --------------------- |
| Common                           | Yes        | Less common           |
| Human-readable                   | Yes        | Not usually           |
| Can collide                      | Yes        | Unique Symbols do not |
| `Object.keys()`                  | Yes        | No                    |
| `for...in`                       | Yes        | No                    |
| `Object.getOwnPropertySymbols()` | No         | Yes                   |
| JSON serialization               | Yes        | No                    |
| Can be used with `object[key]`   | Yes        | Yes                   |
| Useful for protocols             | Sometimes  | Yes                   |

---

# 45. Mental Model

Think of a Symbol as a **unique key**.

```js id="c5x9mr"
const key = Symbol("id");
```

The description:

```text
"id"
```

is only a label for humans.

The actual Symbol is unique:

```text id="v8q2nk"
Symbol("id")
      ↓
unique identity
```

When used as an object key:

```js id="k4m7zs"
const user = {
  [key]: "Osama Abu Motlaq",
};
```

think:

```text id="f1n8qc"
key
 ↓
unique Symbol
 ↓
object property key
 ↓
user[key]
```

---

# 46. The Bigger Picture: Symbols and JavaScript Protocols

One of the deeper reasons Symbols exist is to allow JavaScript to define **protocol hooks** without relying on ordinary property names.

For example:

```js id="j6q3mv"
Symbol.iterator
```

tells JavaScript:

> "This is the method that defines how this object should be iterated."

Similarly:

```js id="s9x2kp"
Symbol.toPrimitive
```

defines:

> "This is how this object should behave when converted to a primitive."

This gives JavaScript a standardized way to customize language behavior.

The important concept is:

```text id="a4m8zc"
Symbol
   ↓
Unique property key
   ↓
Well-known Symbols
   ↓
JavaScript protocols
   ↓
Custom object behavior
```

---

# 47. Key Takeaways

* `Symbol` is a JavaScript primitive type.
* Symbols were introduced in ES6.
* Every call to `Symbol()` creates a unique Symbol.
* Two Symbols with the same description are still different:

  ```js
  Symbol("id") !== Symbol("id")
  ```
* A Symbol can be used as an object property key.
* Symbol keys are commonly written with computed property syntax:

  ```js
  [symbol]
  ```
* Symbol properties do not appear in `Object.keys()`.
* Symbol properties can be retrieved with:

  ```js
  Object.getOwnPropertySymbols()
  ```
* `Reflect.ownKeys()` can retrieve both string and Symbol keys.
* Symbol-keyed properties are ignored by `JSON.stringify()`.
* Symbols are not true private properties.
* Symbols should not be used as a security mechanism.
* `Symbol.for()` uses the global Symbol registry.
* `Symbol.keyFor()` retrieves the registry key of a registered Symbol.
* Well-known Symbols allow objects to customize JavaScript behavior.
* `Symbol.iterator` is especially important because it powers the iterable protocol.
* Symbols are useful to understand, but they are not a high-priority feature for everyday React development.
* The most important Symbol concepts for a React/Next.js developer are:

  1. Unique identity
  2. Symbol property keys
  3. Computed property syntax
  4. `Symbol.iterator`
  5. The concept of well-known Symbols

---

## Learning Priority

**Medium priority for JavaScript fundamentals, low-to-medium priority for everyday React/Next.js development.**

You should be able to read and understand:

```js id="e7p2mc"
const key = Symbol("id");

const user = {
  [key]: "Osama Abu Motlaq",
};

console.log(user[key]);
```

and understand why:

```js id="q4n8vx"
Symbol("id") === Symbol("id");
```

is:

```text
false
```

You should also recognize:

```js id="m6x1zk"
Symbol.iterator
```

as the protocol that makes objects iterable and connects directly to `for...of`.
