# Objects

Objects are collections of keyed properties. They are one of the most important data structures in JavaScript.

## Creating Objects

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
  age: 25,
};
```

## Reading Properties

```js
console.log(user.name);
console.log(user["role"]);
```

## Adding, Updating, and Deleting

```js
user.country = "Palestine";
user.age = 26;
delete user.country;
```

## Nested Objects

```js
const user = {
  name: "Osama Abu Motlaq",
  profile: {
    role: "Frontend Developer",
    skills: ["JavaScript", "React"],
  },
};

console.log(user.profile.role);
```

## Methods

```js
const user = {
  name: "Osama Abu Motlaq",
  greet() {
    return `Hello, ${this.name}`;
  },
};

console.log(user.greet());
```

The `this` keyword gets its own dedicated topic in the OOP section.

## Checking Properties

```js
const user = {
  name: "Osama Abu Motlaq",
};

console.log("name" in user);
console.log(Object.hasOwn(user, "name"));
```

## Object.keys, values, and entries

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));
```

## Converting Objects and Entries

```js
const entries = [
  ["name", "Osama Abu Motlaq"],
  ["role", "Frontend Developer"],
];

const user = Object.fromEntries(entries);
```

## Copying Objects

```js
const original = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const copy = { ...original };
```

Spread syntax creates a shallow copy.

## Object.assign

```js
const target = {};

Object.assign(target, {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
});
```

## References

```js
const first = {
  role: "Frontend Developer",
};

const second = first;
second.role = "Full Stack Developer";

console.log(first.role);
```

Both variables reference the same object.

## Optional Property Access

```js
const user = null;

console.log(user?.profile?.role);
```

Optional chaining is documented in the ES6+ and modern JavaScript section.

## Object Immutability Concepts

```js
const user = {
  name: "Osama Abu Motlaq",
};

Object.freeze(user);
```

`Object.freeze()` prevents direct changes to the object's existing properties, but it is shallow.

## Common Pitfalls

- Objects are reference values.
- Shallow copies do not clone nested objects.
- Property keys are usually strings or symbols.
- Accessing a missing property returns `undefined`.
- `in` also checks inherited properties, while `Object.hasOwn()` checks own properties.
