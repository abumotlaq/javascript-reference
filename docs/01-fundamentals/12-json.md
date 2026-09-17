# JSON

JSON is a text format commonly used to exchange structured data between a JavaScript application and a server.

## JSON.stringify

```js
const user = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

const json = JSON.stringify(user);
console.log(json);
```

## JSON.parse

```js
const json = '{"name":"Osama Abu Motlaq","role":"Frontend Developer"}';
const user = JSON.parse(json);

console.log(user.name);
```

## Arrays and JSON

```js
const skills = ["JavaScript", "React", "Next.js"];
const json = JSON.stringify(skills);
const restored = JSON.parse(json);

console.log(restored);
```

## Nested Data

```js
const profile = {
  user: {
    name: "Osama Abu Motlaq",
    skills: ["JavaScript", "React"],
  },
};

const json = JSON.stringify(profile);
const restored = JSON.parse(json);
```

## Unsupported Values

```js
const value = {
  name: "Osama Abu Motlaq",
  missing: undefined,
  method() {},
};

console.log(JSON.stringify(value));
```

Functions and `undefined` object properties are not represented as normal JSON values.

## Safe Parsing

```js
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

console.log(safeParse('{"valid":true}'));
console.log(safeParse("invalid"));
```

## JSON and Data Transfer

```js
const payload = {
  name: "Osama Abu Motlaq",
  role: "Frontend Developer",
};

fetch("https://example.com/api", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```

The Fetch API is covered in the Web Platform section.
